import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockData } from '@/data/mockData';
import { format } from 'date-fns';
import { 
  Key, 
  RotateCcw, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const KeyManagement: React.FC = () => {
  const { keyMetadata } = mockData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Key Management</h1>
          <p className="text-muted-foreground">Manage cryptographic keys and rotation schedules</p>
        </div>
        <Button className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Force Rotation
        </Button>
      </div>

      {/* Active Key Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Active Key
          </CardTitle>
          <CardDescription>Currently active cryptographic key</CardDescription>
        </CardHeader>
        <CardContent>
          {keyMetadata.find(k => k.isActive) && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Public Key</p>
                <p className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                  {keyMetadata.find(k => k.isActive)?.publicKey}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Key Size</p>
                  <p className="text-lg font-semibold">2048 bits</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Algorithm</p>
                  <p className="text-lg font-semibold">RSA-OAEP</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Rotation Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Rotation Schedule
          </CardTitle>
          <CardDescription>Automatic key rotation timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyMetadata.map((key, index) => (
              <div key={key.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${key.isActive ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <div>
                    <p className="font-mono text-sm">
                      {key.publicKey.slice(0, 20)}...{key.publicKey.slice(-10)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {format(key.createdAt, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {key.isActive ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Next: {format(key.rotationDate, 'MMM dd')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Security Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Strength</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">High</div>
            <p className="text-xs text-muted-foreground">2048-bit RSA encryption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Until Rotation</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.ceil((keyMetadata.find(k => k.isActive)?.rotationDate.getTime()! - Date.now()) / (1000 * 60 * 60 * 24))}
            </div>
            <p className="text-xs text-muted-foreground">Automatic rotation scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Warning</div>
            <p className="text-xs text-muted-foreground">Rotation due soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KeyManagement;