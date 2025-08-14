import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockData } from '@/data/mockData';
import { format } from 'date-fns';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  Activity,
  Zap,
  Clock,
  AlertCircle
} from 'lucide-react';

const SecurityPage: React.FC = () => {
  const { auditLogs } = mockData;

  // Mock security metrics
  const securityMetrics = {
    threatLevel: 'Low',
    activeSessions: 12,
    failedAttempts: 3,
    encryptionStrength: '256-bit AES',
    lastScan: new Date(),
    vulnerabilities: 0,
    patchLevel: 'Current'
  };

  const securityEvents = [
    { id: 1, type: 'authentication', message: 'Successful admin login', severity: 'info', timestamp: new Date() },
    { id: 2, type: 'encryption', message: 'Key rotation completed', severity: 'success', timestamp: new Date(Date.now() - 3600000) },
    { id: 3, type: 'alert', message: 'Multiple failed login attempts detected', severity: 'warning', timestamp: new Date(Date.now() - 7200000) },
    { id: 4, type: 'system', message: 'Security scan completed - no issues found', severity: 'success', timestamp: new Date(Date.now() - 86400000) }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>;
      case 'warning':
        return <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor system security, threats, and compliance status</p>
        </div>
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Run Security Scan
        </Button>
      </div>

      {/* Security Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">System Secure</AlertTitle>
        <AlertDescription className="text-green-700">
          All security systems are operational. Last scan completed {format(securityMetrics.lastScan, 'PPpp')}.
        </AlertDescription>
      </Alert>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.threatLevel}</div>
            <p className="text-xs text-muted-foreground">All systems secure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.activeSessions}</div>
            <p className="text-xs text-muted-foreground">Authorized connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{securityMetrics.failedAttempts}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.vulnerabilities}</div>
            <p className="text-xs text-muted-foreground">None detected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Configuration
            </CardTitle>
            <CardDescription>Current security settings and encryption standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">Encryption Algorithm</p>
                  <p className="text-sm text-muted-foreground">AES-256-GCM</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">Key Management</p>
                  <p className="text-sm text-muted-foreground">Hardware Security Module</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">Secure</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">TLS Version</p>
                  <p className="text-sm text-muted-foreground">TLS 1.3</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">Latest</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">Certificate Status</p>
                  <p className="text-sm text-muted-foreground">Valid until Dec 2024</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">Valid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Security Events
            </CardTitle>
            <CardDescription>Recent security-related activities and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  {getSeverityIcon(event.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{event.message}</p>
                      {getSeverityBadge(event.severity)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(event.timestamp, 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Status
          </CardTitle>
          <CardDescription>Regulatory compliance and security standards adherence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">FIPS 140-2</p>
                <p className="text-sm text-muted-foreground">Level 3 Compliance</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Compliant</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">SOC 2 Type II</p>
                <p className="text-sm text-muted-foreground">Security Controls</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Certified</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">ISO 27001</p>
                <p className="text-sm text-muted-foreground">Information Security</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Certified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;