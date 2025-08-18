import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const Security = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">Security settings and monitoring</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">SSL/TLS Certificate</span>
              </div>
              <span className="text-green-600 text-sm">Valid</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Key Rotation</span>
              </div>
              <span className="text-green-600 text-sm">On Schedule</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Failed Login Attempts</span>
              </div>
              <span className="text-yellow-600 text-sm">3 in last hour</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Two-Factor Authentication</label>
              <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Automatic Key Rotation</label>
              <p className="text-sm text-muted-foreground">Rotate keys every 30 days</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Failed Login Lockout</label>
              <p className="text-sm text-muted-foreground">Lock accounts after 5 failed attempts</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Audit Logging</label>
              <p className="text-sm text-muted-foreground">Log all security events</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive" className="w-full">
            Revoke All Active Keys
          </Button>
          <Button variant="outline" className="w-full">
            Force Password Reset for All Users
          </Button>
          <Button variant="outline" className="w-full">
            Export Security Audit Log
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;