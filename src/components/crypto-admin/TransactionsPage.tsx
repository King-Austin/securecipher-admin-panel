import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockData } from '@/data/mockData';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  Download,
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const TransactionsPage: React.FC = () => {
  const { transactions } = mockData;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.clientPublicKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate stats
  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter(t => t.verificationStatus === 'success').length;
  const failedTransactions = transactions.filter(t => t.verificationStatus === 'failed').length;
  const pendingTransactions = transactions.filter(t => t.verificationStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Monitor all cryptographic transactions and their verification status</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successfulTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((successfulTransactions / totalTransactions) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((failedTransactions / totalTransactions) * 100)}% failure rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete list of all cryptographic transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID or public key..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Client Public Key</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.slice(0, 20).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-xs">
                      {transaction.id.slice(0, 8)}...{transaction.id.slice(-8)}
                    </TableCell>
                    <TableCell>
                      {format(transaction.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {transaction.clientPublicKey.slice(0, 10)}...{transaction.clientPublicKey.slice(-8)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.transactionType}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.verificationStatus)}
                    </TableCell>
                    <TableCell>{transaction.responseTime}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredTransactions.length > 20 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;