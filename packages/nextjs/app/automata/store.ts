import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

// Define the shape of our store's state
export type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null; // For the config panel
  isDataMapModalOpen: boolean;
  dataMapModalTarget: { nodeId: string; field: string } | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  setSelectedNodeId: (id: string | null) => void;
  openDataMapModal: (nodeId: string, field: string) => void;
  closeDataMapModal: () => void;
  updateNodeData: (nodeId: string, newData: any) => void;
  updateNodeStatus: (nodeId: string, status: 'idle' | 'pending' | 'success' | 'fail' | 'success_temp' | 'fail_temp') => void;
  executeWorkflow: (startNodeId: string, data: any) => Promise<void>;
  runNode: (nodeId: string, inputData: any) => Promise<void>;
};

// Create the store
export const useAutomataStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isDataMapModalOpen: false,
  dataMapModalTarget: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    // Check if the connection is for execution flow
    const isExecution = ['true', 'false', 'on-success'].includes(connection.sourceHandle || '');
    
    const newEdge: Edge = {
      ...connection,
      type: isExecution ? 'executionEdge' : 'dataEdge',
      animated: false, // Default to not animated
    };
    
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },

  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },

  setEdges: (edges: Edge[]) => {
    set({ edges });
  },

  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  openDataMapModal: (nodeId: string, field: string) => {
    set({ isDataMapModalOpen: true, dataMapModalTarget: { nodeId, field } });
  },

  closeDataMapModal: () => {
    set({ isDataMapModalOpen: false, dataMapModalTarget: null });
  },

  updateNodeData: (nodeId: string, newData: any) => {
    set({
      nodes: get().nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: newData }
          : node
      ),
    });
  },

  updateNodeStatus: (nodeId: string, status: 'idle' | 'pending' | 'success' | 'fail' | 'success_temp' | 'fail_temp') => {
    const node = get().nodes.find(n => n.id === nodeId);
    if (node) {
      get().updateNodeData(nodeId, { ...node.data, status });
    }
  },

  executeWorkflow: async (startNodeId: string, data: any) => {
    const { nodes, edges } = get();
    const startNode = nodes.find(n => n.id === startNodeId);
    
    if (!startNode) return;

    // Find all outgoing edges from this node
    const outgoingEdges = edges.filter(edge => edge.source === startNodeId);

    // Handle conditional logic for AI decision nodes
    if (startNode.type === 'ai-decision') {
      const result = data.result?.toLowerCase();
      const matchingEdge = outgoingEdges.find(edge => edge.sourceHandle === result);
      
      if (matchingEdge) {
        await get().runNode(matchingEdge.target, data.originalData || data);
      }
    } else {
      // For other nodes, execute all outgoing edges
      for (const edge of outgoingEdges) {
        await get().runNode(edge.target, data);
      }
    }
  },

  runNode: async (nodeId: string, inputData: any) => {
    const { nodes, updateNodeStatus, executeWorkflow } = get();
    const node = nodes.find(n => n.id === nodeId);
    
    if (!node) return;

    // Set node to pending state
    updateNodeStatus(nodeId, 'pending');

    try {
      switch (node.type) {
        case 'ai-decision': {
          const prompt = node.data.prompt;
          
          if (!prompt) {
            throw new Error('AI Decision node missing prompt configuration');
          }

          const response = await fetch('/api/ai-decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, data: inputData }),
          });

          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'AI Decision failed');
          }

          // Show success animation
          updateNodeStatus(nodeId, 'success_temp');
          
          // Wait a bit for animation, then continue workflow
          setTimeout(async () => {
            updateNodeStatus(nodeId, 'success');
            await executeWorkflow(nodeId, { 
              result: result.result.toLowerCase(), 
              originalData: inputData 
            });
          }, 1500);
          
          break;
        }

        case 'send-usdt': {
          let recipient = node.data.recipient || '';
          const amount = node.data.amount;

          if (!amount) {
            throw new Error('Send USDT node missing amount configuration');
          }

          // Handle data mapping for recipient
          if (recipient.includes('{{Trigger.data.to}}')) {
            recipient = inputData.to || recipient;
          }

          const response = await fetch('/api/relay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'sendUsdt', 
              params: { to: recipient, amount } 
            }),
          });

          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Send USDT failed');
          }

          // Show success animation
          updateNodeStatus(nodeId, 'success_temp');
          
          // Wait a bit for animation, then continue workflow
          setTimeout(async () => {
            updateNodeStatus(nodeId, 'success');
            await executeWorkflow(nodeId, inputData);
          }, 1500);
          
          break;
        }

        case 'mint-nft': {
          let recipient = node.data.recipient || '';

          // Handle data mapping for recipient
          if (recipient.includes('{{Trigger.data.to}}')) {
            recipient = inputData.to || recipient;
          }

          if (!recipient) {
            throw new Error('Mint NFT node missing recipient');
          }

          const response = await fetch('/api/relay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'mintBadge', 
              params: { to: recipient } 
            }),
          });

          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Mint NFT failed');
          }

          // Show success animation
          updateNodeStatus(nodeId, 'success_temp');
          
          // Wait a bit for animation, then continue workflow
          setTimeout(async () => {
            updateNodeStatus(nodeId, 'success');
            await executeWorkflow(nodeId, inputData);
          }, 1500);
          
          break;
        }

        default:
          console.warn(`Unknown node type: ${node.type}`);
          updateNodeStatus(nodeId, 'idle');
      }
    } catch (error) {
      console.error(`Error executing node ${nodeId}:`, error);
      updateNodeStatus(nodeId, 'fail_temp');
      
      // Clear fail animation after delay
      setTimeout(() => {
        updateNodeStatus(nodeId, 'fail');
      }, 1500);
    }
  },
}));