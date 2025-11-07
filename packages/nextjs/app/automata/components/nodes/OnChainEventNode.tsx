import { Handle, Position, NodeProps } from "@xyflow/react";
import { BoltIcon } from "@heroicons/react/24/outline";

// A simple DaisyUI card for the node
const OnChainEventNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl border-2 border-primary">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <BoltIcon className="h-6 w-6 text-primary" />
          <h2 className="card-title text-sm">On-Chain Event</h2>
        </div>
        <p className="text-xs text-base-content/70">On Transfer at 0x...</p>
        {/* Output handle as per UI/UX blueprint */}
        <Handle
          type="source"
          position={Position.Right}
          id="data"
          isConnectable={isConnectable}
          className="!bg-primary"
        />
      </div>
    </div>
  );
};

export default OnChainEventNode;