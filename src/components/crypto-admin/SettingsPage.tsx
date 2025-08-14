import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Key, 
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'SecureCipher Crypto Admin',
    timezone: 'UTC',
    language: 'en',
    
    // Security Settings
    sessionTimeout: 30,
    maxFailedAttempts: 5,
    passwordComplexity: true,
    twoFactorAuth: true,
    
    // Key Management
    keyRotationInterval: 90,
    autoRotation: true,
    keySize: 2048,
    algorithm: 'RSA-OAEP',
    
    // Notifications
    emailNotifications: true,
    securityAlerts: true,
    performanceAlerts: false,
    maintenanceNotifications: true,
    
    // System
    logLevel: 'INFO',
    retentionPeriod: 365,
    backupFrequency: 'daily'
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Configuration Exported",
      description: "Settings have been exported to a backup file.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Configuration Import",
      description: "Please select a configuration file to import.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure system settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleImport} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({...settings, systemName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Authentication and access control configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxFailedAttempts">Max Failed Login Attempts</Label>
                  <Input
                    id="maxFailedAttempts"
                    type="number"
                    value={settings.maxFailedAttempts}
                    onChange={(e) => setSettings({...settings, maxFailedAttempts: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="passwordComplexity">Enforce Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">Require strong passwords with mixed characters</p>
                  </div>
                  <Switch
                    id="passwordComplexity"
                    checked={settings.passwordComplexity}
                    onCheckedChange={(checked) => setSettings({...settings, passwordComplexity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys">
          <Card>
            <CardHeader>
              <CardTitle>Key Management</CardTitle>
              <CardDescription>Cryptographic key configuration and rotation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="keyRotationInterval">Key Rotation Interval (days)</Label>
                  <Input
                    id="keyRotationInterval"
                    type="number"
                    value={settings.keyRotationInterval}
                    onChange={(e) => setSettings({...settings, keyRotationInterval: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keySize">Key Size (bits)</Label>
                  <Select value={settings.keySize.toString()} onValueChange={(value) => setSettings({...settings, keySize: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024">1024 bits</SelectItem>
                      <SelectItem value="2048">2048 bits</SelectItem>
                      <SelectItem value="4096">4096 bits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="algorithm">Encryption Algorithm</Label>
                  <Select value={settings.algorithm} onValueChange={(value) => setSettings({...settings, algorithm: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RSA-OAEP">RSA-OAEP</SelectItem>
                      <SelectItem value="RSA-PSS">RSA-PSS</SelectItem>
                      <SelectItem value="ECDSA">ECDSA</SelectItem>
                      <SelectItem value="EdDSA">EdDSA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoRotation">Automatic Key Rotation</Label>
                  <p className="text-sm text-muted-foreground">Automatically rotate keys based on the configured interval</p>
                </div>
                <Switch
                  id="autoRotation"
                  checked={settings.autoRotation}
                  onCheckedChange={(checked) => setSettings({...settings, autoRotation: checked})}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Force Key Rotation
                </Button>
                <Button variant="outline">Generate New Key Pair</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical security events and threats</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="performanceAlerts">Performance Alerts</Label>
                    <p className="text-sm text-muted-foreground">System performance and resource usage warnings</p>
                  </div>
                  <Switch
                    id="performanceAlerts"
                    checked={settings.performanceAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, performanceAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceNotifications">Maintenance Notifications</Label>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance and system updates</p>
                  </div>
                  <Switch
                    id="maintenanceNotifications"
                    checked={settings.maintenanceNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, maintenanceNotifications: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Logging, backup, and system maintenance configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => setSettings({...settings, logLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEBUG">Debug</SelectItem>
                      <SelectItem value="INFO">Info</SelectItem>
                      <SelectItem value="WARNING">Warning</SelectItem>
                      <SelectItem value="ERROR">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Log Retention Period (days)</Label>
                  <Input
                    id="retentionPeriod"
                    type="number"
                    value={settings.retentionPeriod}
                    onChange={(e) => setSettings({...settings, retentionPeriod: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;