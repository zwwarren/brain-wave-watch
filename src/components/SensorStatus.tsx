import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity, Battery } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

export const SensorStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [signalStrength, setSignalStrength] = useState(85);
  const [batteryLevel, setBatteryLevel] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional connection issues
      if (Math.random() < 0.05) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 2000);
      }
      
      // Simulate signal strength variations
      setSignalStrength(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(100, prev + change));
      });

      // Simulate battery drain
      setBatteryLevel(prev => Math.max(0, prev - 0.01));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getSignalStatus = () => {
    if (!isConnected) return 'offline';
    if (signalStrength > 70) return 'healthy';
    if (signalStrength > 40) return 'warning';
    return 'critical';
  };

  const getBatteryStatus = () => {
    if (batteryLevel > 50) return 'healthy';
    if (batteryLevel > 20) return 'warning';
    return 'critical';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatusIndicator
        status={isConnected ? 'healthy' : 'critical'}
        label="Sensor Connection"
        value={isConnected ? 'CONNECTED' : 'DISCONNECTED'}
      />
      
      <StatusIndicator
        status={getSignalStatus()}
        label="Signal Strength"
        value={`${Math.round(signalStrength)}%`}
      />
      
      <StatusIndicator
        status={getBatteryStatus()}
        label="Battery Level"
        value={`${Math.round(batteryLevel)}%`}
      />
    </div>
  );
};