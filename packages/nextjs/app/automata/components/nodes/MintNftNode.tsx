import { Handle, Position, NodeProps } from "@xyflow/react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const MintNftNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl border-2 border-success">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <PhotoIcon className="h-6 w-6 text-success" />
          <h2 className="card-title text-sm">Mint NFT</h2>
        </div>
        <div className="text-xs mt-2">
          <p>Recipient: {"{Trigger.data.to}"}</p>
        </div>
        {/* Main input handle */}
        <Handle
          type="target"
          position={Position.Left}
          id="exec"
          isConnectable={isConnectable}
          className="!bg-success"
        />
      </div>
    </div>
  );
};

export default MintNftNode;