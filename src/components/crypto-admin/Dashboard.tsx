import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockData } from '@/data/mockData';
import { format } from 'date-fns';
import { TransactionChart } from './TransactionChart';
import { VerificationLogTable } from './VerificationLogTable';
import { PerformanceStats } from './PerformanceStats';
import { 
  Key, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Calendar,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { transactions, keyMetadata, auditLogs } = mockData;
  
  // Calculate today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayTransactions = transactions.filter(t => 
    t.timestamp >= today
  );
  
  const totalTransactionsToday = todayTransactions.length;
  const verifiedToday = todayTransactions.filter(t => t.verificationStatus === 'success').length;
  const failedToday = todayTransactions.filter(t => t.verificationStatus === 'failed').length;
  
  // Get active key
  const activeKey = keyMetadata.find(k => k.isActive);
  
  // Shorten public key for display
  const shortenKey = (key: string) => `${key.slice(0, 10)}...${key.slice(-8)}`;

  return (
    <div className="space-y-6">
      {/* Key Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Key Status
          </CardTitle>
          <CardDescription>Current active middleware public key</CardDescription>
        </CardHeader>
        <CardContent>
          {activeKey ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Public Key</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {shortenKey(activeKey.publicKey)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Rotation</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(activeKey.rotationDate, 'PPP')}</span>
                  <Badge variant="outline">
                    {Math.ceil((activeKey.rotationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No active key found</p>
          )}
        </CardContent>
      </Card>

      {/* Transaction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactionsToday}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Signatures Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{verifiedToday}</div>
            <p className="text-xs text-muted-foreground">
              {totalTransactionsToday > 0 ? Math.round((verifiedToday / totalTransactionsToday) * 100) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Verifications Today</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedToday}</div>
            <p className="text-xs text-muted-foreground">
              {totalTransactionsToday > 0 ? Math.round((failedToday / totalTransactionsToday) * 100) : 0}% failure rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume (Last 7 Days)</CardTitle>
            <CardDescription>Daily transaction count over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionChart transactions={transactions} />
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Statistics</CardTitle>
            <CardDescription>Average encryption/decryption times (24h)</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceStats auditLogs={auditLogs} />
          </CardContent>
        </Card>
      </div>

      {/* Verification Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Verification Logs</CardTitle>
          <CardDescription>Latest cryptographic verification attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationLogTable auditLogs={auditLogs.slice(0, 10)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;