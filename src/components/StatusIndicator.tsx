import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  label: string;
  value?: string;
  className?: string;
}

export const StatusIndicator = ({ status, label, value, className }: StatusIndicatorProps) => {
  const statusConfig = {
    healthy: {
      color: 'bg-status-healthy',
      text: 'text-status-healthy',
      animation: 'animate-pulse-glow'
    },
    warning: {
      color: 'bg-status-warning',
      text: 'text-status-warning',
      animation: 'animate-data-stream'
    },
    critical: {
      color: 'bg-status-critical',
      text: 'text-status-critical',
      animation: 'animate-alert-flash'
    },
    offline: {
      color: 'bg-status-offline',
      text: 'text-status-offline',
      animation: ''
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-medical-surface border border-medical-border rounded-lg",
      className
    )}>
      <div className={cn(
        "w-3 h-3 rounded-full",
        config.color,
        config.animation
      )} />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {value && (
          <p className={cn("text-lg font-mono font-semibold", config.text)}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
};