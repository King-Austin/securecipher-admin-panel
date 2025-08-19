import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuditLog {
  id: string;
  transaction_id: string;
  event_type: string;
  actor: string;
  timestamp: string;
  encryptionTime?: number;
  decryptionTime?: number;
  status?: 'success' | 'failed';
  details?: any;
}

export const PerformanceStats = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAuditLogs(parsed.audit_logs || []);
    }
  }, []);

  // last 24 hours
  const last24HourLogs = auditLogs.filter(log => {
    const logTime = new Date(log.timestamp);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return logTime >= twentyFourHoursAgo;
  });

  const encryptionTimes = last24HourLogs
    .filter(log => log.encryptionTime)
    .map(log => log.encryptionTime!);

  const decryptionTimes = last24HourLogs
    .filter(log => log.decryptionTime)
    .map(log => log.decryptionTime!);

  const avgEncryption = encryptionTimes.length > 0
    ? encryptionTimes.reduce((a, b) => a + b, 0) / encryptionTimes.length
    : 0;

  const avgDecryption = decryptionTimes.length > 0
    ? decryptionTimes.reduce((a, b) => a + b, 0) / decryptionTimes.length
    : 0;

  const successCount = last24HourLogs.filter(log => log.status === 'success').length;
  const failedCount = last24HourLogs.filter(log => log.status === 'failed').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Stats (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
            <span className="text-sm font-medium">Avg AES Encryption Time</span>
            <span className="text-lg font-bold text-primary">{avgEncryption.toFixed(2)}ms</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
            <span className="text-sm font-medium">Avg AES Decryption Time</span>
            <span className="text-lg font-bold text-primary">{avgDecryption.toFixed(2)}ms</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
            <span className="text-sm font-medium">Total Operations</span>
            <span className="text-lg font-bold text-primary">{last24HourLogs.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
            <span className="text-sm font-medium">Success / Failed</span>
            <span className="text-lg font-bold text-primary">
              {successCount} / {failedCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
