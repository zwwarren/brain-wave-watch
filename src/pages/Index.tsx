import { useState, useEffect } from 'react';
import { Activity, Brain, AlertTriangle, History } from 'lucide-react';
import { BrainWaveChart } from '@/components/BrainWaveChart';
import { StatusIndicator } from '@/components/StatusIndicator';
import { TraumaAlert } from '@/components/TraumaAlert';
import { SensorStatus } from '@/components/SensorStatus';

const Index = () => {
  const [traumaAlert, setTraumaAlert] = useState<{
    visible: boolean;
    severity: 'low' | 'moderate' | 'high';
  }>({ visible: false, severity: 'low' });
  
  const [traumaCount, setTraumaCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    // Simulate trauma detection
    const traumaInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const severities: ('low' | 'moderate' | 'high')[] = ['low', 'moderate', 'high'];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        
        setTraumaAlert({ visible: true, severity });
        setTraumaCount(prev => prev + 1);
      }
    }, 5000);

    // Session timer
    const timeInterval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(traumaInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-medical">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-lg animate-pulse-glow">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Brain Wave Monitor</h1>
              <p className="text-muted-foreground">Real-time neural activity & trauma detection</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Session Time</p>
            <p className="text-2xl font-mono font-bold text-primary">{formatTime(sessionTime)}</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatusIndicator
            status="healthy"
            label="Neural Activity"
            value="NORMAL"
          />
          
          <StatusIndicator
            status={traumaCount > 5 ? 'warning' : 'healthy'}
            label="Trauma Events"
            value={traumaCount.toString()}
          />
          
          <StatusIndicator
            status="healthy"
            label="Data Quality"
            value="98.5%"
          />
          
          <StatusIndicator
            status="healthy"
            label="Processing Rate"
            value="1000 Hz"
          />
        </div>

        {/* Sensor Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Sensor Status
          </h2>
          <SensorStatus />
        </div>

        {/* Brain Wave Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Brain Wave Activity
          </h2>
          <div className="relative">
            <BrainWaveChart />
            <div className="absolute top-4 right-4 bg-medical-surface/90 px-3 py-2 rounded border border-medical-border">
              <div className="text-xs text-muted-foreground">Real-time EEG</div>
              <div className="text-sm font-mono text-primary">Active</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alert History
            </h2>
            <div className="bg-medical-surface border border-medical-border rounded-lg p-4">
              <div className="space-y-3">
                {traumaCount === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No trauma events detected</p>
                ) : (
                  Array.from({ length: Math.min(5, traumaCount) }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-medical-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-status-warning rounded-full"></div>
                        <span className="text-sm">Trauma event #{traumaCount - i}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(Date.now() - (i * 60000)).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              System Metrics
            </h2>
            <div className="bg-medical-surface border border-medical-border rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-lg font-mono text-foreground">{formatTime(sessionTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Samples/sec</p>
                  <p className="text-lg font-mono text-status-healthy">1000</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-lg font-mono text-foreground">{traumaCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-mono text-status-healthy">98.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trauma Alert Overlay */}
      <TraumaAlert
        isVisible={traumaAlert.visible}
        severity={traumaAlert.severity}
        onDismiss={() => setTraumaAlert(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
};

export default Index;