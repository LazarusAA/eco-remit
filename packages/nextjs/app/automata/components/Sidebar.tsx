"use client";

import { DragEvent } from "react";
import { BoltIcon, CpuChipIcon, BanknotesIcon, PhotoIcon } from "@heroicons/react/24/outline";

// Define the node types available in the sidebar
const nodeTypes = [
  {
    type: "onchain-event", // This 'type' must match the custom node type
    label: "On-Chain Event",
    icon: BoltIcon,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    type: "ai-decision",
    label: "AI Decision",
    icon: CpuChipIcon,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    type: "send-usdt",
    label: "Send USDT",
    icon: BanknotesIcon,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    type: "mint-nft",
    label: "Mint NFT",
    icon: PhotoIcon,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

// Sidebar component with draggable nodes
const Sidebar = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    // Set the data to be transferred
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 h-full bg-base-200 p-4 overflow-y-auto shadow-lg z-10">
      <h2 className="text-xl font-bold mb-4">Nodes</h2>
      <div className="space-y-3">
        {nodeTypes.map(node => {
          const IconComponent = node.icon;
          return (
            <div
              key={node.type}
              draggable
              onDragStart={event => onDragStart(event, node.type)}
              className={`card ${node.bgColor} shadow-md cursor-move hover:shadow-lg transition-all active:scale-95`}
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${node.color}`} />
                  <span className="font-medium text-sm">{node.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;