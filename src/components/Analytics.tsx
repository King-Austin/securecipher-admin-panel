import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockData } from '../data/mockData';
import { format, subDays, startOfDay } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 29 - i));
    const dayTransactions = mockData.transactions.filter(t => 
      startOfDay(t.timestamp).getTime() === date.getTime()
    );
    return {
      date: format(date, 'MMM dd'),
      total: dayTransactions.length,
      success: dayTransactions.filter(t => t.verificationStatus === 'success').length,
      failed: dayTransactions.filter(t => t.verificationStatus === 'failed').length,
    };
  });

  const chartData = {
    labels: last30Days.map(d => d.date),
    datasets: [
      {
        label: 'Total Transactions',
        data: last30Days.map(d => d.total),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary))',
        tension: 0.4,
      },
      {
        label: 'Successful',
        data: last30Days.map(d => d.success),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
      {
        label: 'Failed',
        data: last30Days.map(d => d.failed),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed analytics and trends</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Trends (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} options={options} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-3xl font-bold text-primary mt-2">{mockData.transactions.length}</p>
          <p className="text-sm text-muted-foreground">All time</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Success Rate</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {Math.round((mockData.transactions.filter(t => t.verificationStatus === 'success').length / mockData.transactions.length) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Overall</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Avg Response Time</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {Math.round(mockData.transactions.reduce((acc, t) => acc + t.responseTime, 0) / mockData.transactions.length)}ms
          </p>
          <p className="text-sm text-muted-foreground">Average</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Active Keys</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {mockData.keyMetadata.filter(k => k.isActive).length}
          </p>
          <p className="text-sm text-muted-foreground">Currently active</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;