import { Card } from '@/components/ui/card';
import { TransactionChart } from './TransactionChart';
import { VerificationLogTable } from './VerificationLogTable';
import { PerformanceStats } from './PerformanceStats';
import { mockData } from '../data/mockData';
import { format } from 'date-fns';

const Dashboard = () => {
  const today = new Date();
  const todayTransactions = mockData.transactions.filter(t => 
    t.timestamp.toDateString() === today.toDateString()
  );

  const totalToday = todayTransactions.length;
  const verifiedToday = todayTransactions.filter(t => t.verificationStatus === 'success').length;
  const failedToday = todayTransactions.filter(t => t.verificationStatus === 'failed').length;

  const activeKey = mockData.keyMetadata.find(k => k.isActive);
  const shortenKey = (key: string) => `${key.substring(0, 20)}...${key.substring(key.length - 10)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Cryptographic activity overview</p>
      </div>

      {/* Key Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Key Status</h3>
        {activeKey && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Public Key:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{shortenKey(activeKey.publicKey)}</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Next Rotation:</span>
              <span className="text-sm font-medium">{format(activeKey.rotationDate, 'MMM dd, yyyy')}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Transaction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-3xl font-bold text-primary mt-2">{totalToday}</p>
          <p className="text-sm text-muted-foreground">Today</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Verified Signatures</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{verifiedToday}</p>
          <p className="text-sm text-muted-foreground">{totalToday > 0 ? Math.round((verifiedToday / totalToday) * 100) : 0}% success rate</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Failed Verifications</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{failedToday}</p>
          <p className="text-sm text-muted-foreground">{totalToday > 0 ? Math.round((failedToday / totalToday) * 100) : 0}% failure rate</p>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionChart />
        <PerformanceStats />
      </div>

      <VerificationLogTable />
    </div>
  );
};

export default Dashboard;