import React from 'react';
import { AuditLog } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, Cpu } from 'lucide-react';

interface PerformanceStatsProps {
  auditLogs: AuditLog[];
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({ auditLogs }) => {
  // Filter logs from last 24 hours
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentLogs = auditLogs.filter(log => log.timestamp >= last24Hours);

  // Calculate average times
  const encryptionTimes = recentLogs
    .filter(log => log.action === 'AES_ENCRYPT' && log.encryptionTime)
    .map(log => log.encryptionTime!);
  
  const decryptionTimes = recentLogs
    .filter(log => log.action === 'AES_DECRYPT' && log.decryptionTime)
    .map(log => log.decryptionTime!);

  const avgEncryptionTime = encryptionTimes.length > 0 
    ? encryptionTimes.reduce((a, b) => a + b, 0) / encryptionTimes.length 
    : 0;

  const avgDecryptionTime = decryptionTimes.length > 0 
    ? decryptionTimes.reduce((a, b) => a + b, 0) / decryptionTimes.length 
    : 0;

  // Calculate performance metrics (lower is better, so we invert for progress bars)
  const encryptionPerformance = Math.max(0, 100 - (avgEncryptionTime * 10));
  const decryptionPerformance = Math.max(0, 100 - (avgDecryptionTime * 12));
  const overallPerformance = (encryptionPerformance + decryptionPerformance) / 2;

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Overall Performance</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {overallPerformance.toFixed(1)}%
          </span>
        </div>
        <Progress value={overallPerformance} className="h-2" />
      </div>

      {/* Encryption Performance */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">AES Encryption</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{avgEncryptionTime.toFixed(2)}ms</div>
            <div className="text-xs text-muted-foreground">avg</div>
          </div>
        </div>
        <Progress value={encryptionPerformance} className="h-2" />
        <div className="text-xs text-muted-foreground">
          Based on {encryptionTimes.length} operations in last 24h
        </div>
      </div>

      {/* Decryption Performance */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">AES Decryption</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{avgDecryptionTime.toFixed(2)}ms</div>
            <div className="text-xs text-muted-foreground">avg</div>
          </div>
        </div>
        <Progress value={decryptionPerformance} className="h-2" />
        <div className="text-xs text-muted-foreground">
          Based on {decryptionTimes.length} operations in last 24h
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{encryptionTimes.length}</div>
          <div className="text-xs text-muted-foreground">Encryptions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{decryptionTimes.length}</div>
          <div className="text-xs text-muted-foreground">Decryptions</div>
        </div>
      </div>
    </div>
  );
};