import { Handle, Position, NodeProps } from "@xyflow/react";
import { CpuChipIcon } from "@heroicons/react/24/outline";

const AiDecisionNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl border-2 border-secondary">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <CpuChipIcon className="h-6 w-6 text-secondary" />
          <h2 className="card-title text-sm">AI Decision</h2>
        </div>
        {/* Input handle */}
        <Handle
          type="target"
          position={Position.Left}
          id="data"
          isConnectable={isConnectable}
          className="!bg-secondary"
        />
        {/* Two output handles as per UI/UX blueprint */}
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          isConnectable={isConnectable}
          className="!bg-green-500"
          style={{ top: "33%" }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          isConnectable={isConnectable}
          className="!bg-red-500"
          style={{ top: "66%" }}
        />
      </div>
    </div>
  );
};

export default AiDecisionNode;