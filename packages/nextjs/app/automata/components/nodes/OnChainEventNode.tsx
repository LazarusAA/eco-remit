import { Handle, Position, NodeProps } from "@xyflow/react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { useAutomataStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

// A simple DaisyUI card for the node
const OnChainEventNode = ({ id, data, isConnectable }: NodeProps) => {
  const status = data.status || 'idle';
  const [processedLogs, setProcessedLogs] = useState(new Set<string>());
  
  const { executeWorkflow } = useAutomataStore(
    useShallow((state) => ({
      executeWorkflow: state.executeWorkflow,
    }))
  );

  // Use the hook to listen for events - hardcoded to "LoyaltyBadge" contract
  // The user can configure the eventName in the ConfigPanel
  const isConfigured = data.contractAddress && data.eventName;
  
  const {
    data: events,
    isLoading,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyBadge",
    eventName: data.eventName || "Transfer",
    // @ts-ignore - Watch for new events in real-time
    watch: !!isConfigured,
    // @ts-ignore - Only enable if configured
    enabled: !!isConfigured,
  });

  // Process new events and trigger workflows
  useEffect(() => {
    if (!events || events.length === 0 || !isConfigured) return;

    events.forEach((event) => {
      // Create a unique log ID from transaction hash and log index
      const logId = `${event.transactionHash}-${event.logIndex}`;
      
      if (!processedLogs.has(logId)) {
        // Mark this log as processed
        setProcessedLogs((prev) => new Set(prev).add(logId));
        
        // Trigger the workflow with the event args
        console.log('🔥 New event detected, triggering workflow:', event.args);
        executeWorkflow(id, event.args);
      }
    });
  }, [events, id, executeWorkflow, isConfigured, processedLogs]);

  const nodeClasses = clsx(
    'card card-compact w-64 bg-base-100 shadow-xl border-2 border-primary',
    {
      'border-primary': status === 'idle',
      'animate-pulse-blue !border-info': status === 'pending',
      'animate-glow-green !border-success': status === 'success_temp',
      'animate-glow-red !border-error': status === 'fail_temp',
      '!border-success': status === 'success',
      '!border-error': status === 'fail',
    },
  );

  useEffect(() => {
    if (status === 'success_temp' || status === 'fail_temp') {
      const timer = setTimeout(() => {
        console.log('Clearing temp state for node ' + data.id);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, data.id]);

  return (
    <div className={nodeClasses}>
      <div className="card-body">
        <div className="flex items-center gap-3">
          <BoltIcon className="h-6 w-6 text-primary" />
          <h2 className="card-title text-sm">On-Chain Event</h2>
        </div>
        <p className="text-xs text-base-content/70">
          {data.eventName && data.contractAddress
            ? `On ${data.eventName} at ${data.contractAddress.slice(0, 6)}...${data.contractAddress.slice(-4)}`
            : "Configure event in panel →"}
        </p>
        {isConfigured && isLoading && (
          <p className="text-xs text-info">Watching for events...</p>
        )}
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