import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AuditLog } from '@/data/mockData';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationLogTableProps {
  auditLogs: AuditLog[];
}

export const VerificationLogTable: React.FC<VerificationLogTableProps> = ({ auditLogs }) => {
  const shortenKey = (key: string) => `${key.slice(0, 8)}...${key.slice(-6)}`;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Client Public Key</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Processing Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">
                {format(log.timestamp, 'MMM dd, HH:mm:ss')}
              </TableCell>
              <TableCell>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {shortenKey(log.clientPublicKey)}
                </code>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{log.action}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {log.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge 
                    variant={log.status === 'success' ? 'default' : 'destructive'}
                  >
                    {log.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {log.action === 'AES_ENCRYPT' && log.encryptionTime && (
                  <span className="text-sm text-muted-foreground">
                    {log.encryptionTime.toFixed(2)}ms
                  </span>
                )}
                {log.action === 'AES_DECRYPT' && log.decryptionTime && (
                  <span className="text-sm text-muted-foreground">
                    {log.decryptionTime.toFixed(2)}ms
                  </span>
                )}
                {log.action === 'SIGNATURE_VERIFY' && (
                  <span className="text-sm text-muted-foreground">
                    {(Math.random() * 5 + 1).toFixed(2)}ms
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};