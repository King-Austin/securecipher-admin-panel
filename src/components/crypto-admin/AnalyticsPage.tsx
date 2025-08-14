import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockData } from '@/data/mockData';
import { TransactionChart } from './TransactionChart';
import { PerformanceStats } from './PerformanceStats';
import { 
  TrendingUp, 
  TrendingDown,
  Activity,
  Shield,
  Clock,
  Users,
  Server,
  AlertTriangle
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { transactions, auditLogs } = mockData;

  // Calculate analytics data
  const totalTransactions = transactions.length;
  const successRate = Math.round((transactions.filter(t => t.verificationStatus === 'success').length / totalTransactions) * 100);
  const averageResponseTime = Math.round(transactions.reduce((acc, t) => acc + t.responseTime, 0) / totalTransactions);
  const uniqueClients = new Set(transactions.map(t => t.clientPublicKey)).size;

  // Weekly comparison (mock data for trend)
  const weeklyGrowth = 12.5;
  const performanceImprovement = 8.3;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into system performance and security metrics</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +{weeklyGrowth}% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successRate}%</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +2.1% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime}ms</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              -{performanceImprovement}% faster
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Clients</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueClients}</div>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <TrendingUp className="h-3 w-3" />
              +{Math.round(uniqueClients * 0.15)} new this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume Trend</CardTitle>
            <CardDescription>Daily transaction count over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionChart transactions={transactions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>System performance over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceStats auditLogs={auditLogs} />
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Current system status and health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <Badge variant="default" className="bg-green-100 text-green-800">Normal</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">45% - Optimal performance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
            <CardDescription>Security alerts and threat monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">No active threats detected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">2 minor warnings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">All systems secure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Latest system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-yellow-800">Key rotation due soon</p>
                  <p className="text-xs text-yellow-600">Next rotation in 5 days</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-blue-800">Security scan completed</p>
                  <p className="text-xs text-blue-600">All systems secure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;