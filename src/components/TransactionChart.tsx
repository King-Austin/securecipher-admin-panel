import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockData } from '../data/mockData';
import { format, subDays, startOfDay } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const TransactionChart = () => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dayTransactions = mockData.transactions.filter(t => 
      startOfDay(t.timestamp).getTime() === date.getTime()
    );
    return {
      date: format(date, 'MMM dd'),
      count: dayTransactions.length
    };
  });

  const chartData = {
    labels: last7Days.map(d => d.date),
    datasets: [
      {
        label: 'Daily Transactions',
        data: last7Days.map(d => d.count),
        backgroundColor: 'hsl(var(--primary))',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
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
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};