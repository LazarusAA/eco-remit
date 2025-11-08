"use client";

import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useShallow } from "zustand/react/shallow";
import { useAutomataStore } from "../store";

const TestRunButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [mockData, setMockData] = useState<string>('{\n  "from": "0x...",\n  "to": "0x...",\n  "value": "1000000000000000000"\n}');
  const [error, setError] = useState<string>("");

  const { nodes, executeWorkflow } = useAutomataStore(
    useShallow((state) => ({
      nodes: state.nodes,
      executeWorkflow: state.executeWorkflow,
    }))
  );

  // Filter only OnChainEvent nodes that are configured
  const triggerNodes = nodes.filter(
    (n) => n.type === "onchain-event" && n.data.contractAddress && n.data.eventName
  );

  const handleTestRun = async () => {
    setError("");
    
    if (!selectedNodeId) {
      setError("Please select a trigger node");
      return;
    }

    try {
      // Parse the mock data JSON
      const parsedData = JSON.parse(mockData);
      
      // Execute the workflow with mock data
      console.log("🧪 Test Run - Triggering workflow with mock data:", parsedData);
      await executeWorkflow(selectedNodeId, parsedData);
      
      // Close modal on success
      setIsModalOpen(false);
      setError("");
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your mock data.");
      } else {
        setError((err as Error).message || "Failed to execute workflow");
      }
    }
  };

  // Don't show button if no trigger nodes are configured
  if (triggerNodes.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Test Run Button */}
      <button
        className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 z-20 shadow-lg"
        onClick={() => setIsModalOpen(true)}
        title="Test Run Workflow"
      >
        <PlayIcon className="h-6 w-6" />
      </button>

      {/* Test Run Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Test Run Workflow</h3>
            
            {/* Select Trigger Node */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Select Trigger Node</span>
              </label>
              <select
                className="select select-bordered"
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
              >
                <option value="">Choose a trigger node...</option>
                {triggerNodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {(node.data.eventName as string)} on {(node.data.contractAddress as string)?.slice(0, 6)}...
                    {(node.data.contractAddress as string)?.slice(-4)}
                  </option>
                ))}
              </select>
            </div>

            {/* Mock Event Data Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Mock Event Data (JSON)</span>
                <span className="label-text-alt">Example: Transfer event args</span>
              </label>
              <textarea
                className="textarea textarea-bordered font-mono text-sm h-48"
                placeholder='{\n  "from": "0x...",\n  "to": "0x...",\n  "value": "1000000000000000000"\n}'
                value={mockData}
                onChange={(e) => setMockData(e.target.value)}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {/* Help Text */}
            <div className="alert alert-info mb-4">
              <div className="text-sm">
                <p className="font-semibold mb-1">💡 Quick Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide event arguments as JSON</li>
                  <li>For Transfer: include <code>from</code>, <code>to</code>, and <code>value</code></li>
                  <li>For Approval: include <code>owner</code>, <code>spender</code>, and <code>value</code></li>
                  <li>Use your own address for testing AI conditions</li>
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleTestRun}>
                Run Test
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
};

export default TestRunButton;

