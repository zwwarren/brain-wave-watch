import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TraumaAlertProps {
  isVisible: boolean;
  severity: 'low' | 'moderate' | 'high';
  onDismiss: () => void;
}

export const TraumaAlert = ({ isVisible, severity, onDismiss }: TraumaAlertProps) => {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    if (isVisible) {
      setTimestamp(new Date());
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const severityConfig = {
    low: {
      icon: Shield,
      color: 'border-status-warning bg-status-warning/10 text-status-warning',
      title: 'Mild Impact Detected',
      animation: 'animate-data-stream'
    },
    moderate: {
      icon: AlertTriangle,
      color: 'border-status-warning bg-status-warning/20 text-status-warning',
      title: 'Moderate Impact Detected',
      animation: 'animate-pulse-glow'
    },
    high: {
      icon: AlertTriangle,
      color: 'border-status-critical bg-status-critical/20 text-status-critical',
      title: 'High Impact Detected - Immediate Attention Required',
      animation: 'animate-alert-flash'
    }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={cn(
      "fixed top-4 right-4 max-w-md p-4 border-2 rounded-lg shadow-medical z-50",
      config.color,
      config.animation
    )}>
      <div className="flex items-start gap-3">
        <Icon className="w-6 h-6 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{config.title}</h3>
          <p className="text-sm opacity-90 mt-1">
            Brain wave anomaly detected at {timestamp.toLocaleTimeString()}
          </p>
          <div className="mt-2 text-xs font-mono opacity-75">
            Severity: {severity.toUpperCase()} | Location: Frontal Cortex
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};