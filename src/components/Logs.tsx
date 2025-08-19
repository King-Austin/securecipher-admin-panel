import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  transaction_id: string;
  event_type: string;
  details: Record<string, any>;
  actor: string;
  timestamp: string;
  prev_hash: string;
  record_hash: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;

  useEffect(() => {
    const storedLogs = localStorage.getItem('dashboardData');
    if (storedLogs) {
      const parsed = JSON.parse(storedLogs);
      if (Array.isArray(parsed.audit_logs)) {
        setLogs(parsed.audit_logs);
      }
    }
  }, []);

  const filteredLogs = logs.filter(log => 
    log.transaction_id.includes(searchTerm) || 
    log.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">System audit and activity logs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Timestamp</th>
                  <th className="text-left p-2">Transaction ID</th>
                  <th className="text-left p-2">Event Type</th>
                  <th className="text-left p-2">Actor</th>
                  <th className="text-left p-2">Details</th>
                  <th className="text-left p-2">Record Hash</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map(log => (
                  <tr key={log.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}</td>
                    <td className="p-2"><code className="text-xs bg-muted px-1 py-0.5 rounded">{log.transaction_id}</code></td>
                    <td className="p-2">{log.event_type}</td>
                    <td className="p-2">{log.actor}</td>
                    <td className="p-2">
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {JSON.stringify(log.details)}
                      </code>
                    </td>
                    <td className="p-2">
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {log.record_hash.substring(0, 10)}...{log.record_hash.slice(-6)}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">{currentPage} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
