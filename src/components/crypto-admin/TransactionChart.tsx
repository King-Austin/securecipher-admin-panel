import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '@/data/mockData';
import { format, subDays, startOfDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionChartProps {
  transactions: Transaction[];
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  // Generate data for the last 7 days
  const generateChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 6 - i));
      return {
        date,
        label: format(date, 'MMM dd'),
        transactions: 0,
        successful: 0,
        failed: 0,
      };
    });

    // Count transactions per day
    transactions.forEach(transaction => {
      const transactionDate = startOfDay(transaction.timestamp);
      const dayData = last7Days.find(day => 
        day.date.getTime() === transactionDate.getTime()
      );
      
      if (dayData) {
        dayData.transactions++;
        if (transaction.verificationStatus === 'success') {
          dayData.successful++;
        } else {
          dayData.failed++;
        }
      }
    });

    return last7Days;
  };

  const chartData = generateChartData();

  const data = {
    labels: chartData.map(day => day.label),
    datasets: [
      {
        label: 'Successful',
        data: chartData.map(day => day.successful),
        backgroundColor: 'hsl(var(--primary))',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
      },
      {
        label: 'Failed',
        data: chartData.map(day => day.failed),
        backgroundColor: 'hsl(var(--destructive))',
        borderColor: 'hsl(var(--destructive))',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--foreground))',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
      },
      y: {
        stacked: true,
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
};