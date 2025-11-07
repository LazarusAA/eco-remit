import { Handle, Position, NodeProps } from "@xyflow/react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const SendUsdtNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl border-2 border-accent">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <BanknotesIcon className="h-6 w-6 text-accent" />
          <h2 className="card-title text-sm">Send USDT</h2>
        </div>
        {/* Inputs on the node card, as per UI/UX blueprint */}
        <div className="text-xs mt-2">
          <p>Recipient: {"{Trigger.data.to}"}</p>
          <p>Amount: 10</p>
        </div>
        {/* Main input handle */}
        <Handle
          type="target"
          position={Position.Left}
          id="exec"
          isConnectable={isConnectable}
          className="!bg-accent"
        />
        {/* Output handle */}
        <Handle
          type="source"
          position={Position.Right}
          id="on-success"
          isConnectable={isConnectable}
          className="!bg-accent"
        />
      </div>
    </div>
  );
};

export default SendUsdtNode;