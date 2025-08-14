import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/data/mockData';
import { VerificationLogTable } from './VerificationLogTable';
import { 
  FileText, 
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const LogsPage: React.FC = () => {
  const { auditLogs } = mockData;

  // Calculate stats
  const totalLogs = auditLogs.length;
  const successfulLogs = auditLogs.filter(log => log.status === 'success').length;
  const failedLogs = auditLogs.filter(log => log.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Verification Logs</h1>
          <p className="text-muted-foreground">Detailed audit trail of all cryptographic operations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Log Entries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Operations</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successfulLogs}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((successfulLogs / totalLogs) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Operations</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedLogs}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((failedLogs / totalLogs) * 100)}% failure rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Audit Logs
          </CardTitle>
          <CardDescription>Complete audit trail of all cryptographic operations</CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationLogTable auditLogs={auditLogs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsPage;