import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, RotateCcw, Download } from 'lucide-react';
import { mockData } from '../data/mockData';
import { format } from 'date-fns';

const KeyManagement = () => {
  const shortenKey = (key: string) => `${key.substring(0, 40)}...${key.substring(key.length - 20)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Key Management</h1>
        <p className="text-muted-foreground">Manage cryptographic keys and rotation schedules</p>
      </div>

      <div className="grid gap-6">
        {mockData.keyMetadata.map((key) => (
          <Card key={key.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                {key.isActive ? 'Active Key' : 'Inactive Key'}
                {key.isActive && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">ACTIVE</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Public Key</label>
                <code className="block text-xs bg-muted p-2 rounded mt-1 break-all">
                  {shortenKey(key.publicKey)}
                </code>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{format(key.createdAt, 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Rotation</label>
                  <p className="text-sm">{format(key.rotationDate, 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Rotate Key
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate New Key</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Generate a new RSA-2048 key pair for cryptographic operations.
          </p>
          <Button className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Generate New Key Pair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;