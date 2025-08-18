import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">System Name</label>
              <Input defaultValue="SecureCipher Admin" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Administrator Email</label>
              <Input defaultValue="admin@securecypher.com" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Timezone</label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="cet">Central European Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">Receive email alerts for security events</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Failed Transaction Alerts</label>
              <p className="text-sm text-muted-foreground">Alert when transaction failure rate exceeds 5%</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Key Rotation Reminders</label>
              <p className="text-sm text-muted-foreground">Remind 7 days before key rotation</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Transaction Log Retention (days)</label>
            <Input type="number" defaultValue="90" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Audit Log Retention (days)</label>
            <Input type="number" defaultValue="365" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Key History Retention (days)</label>
            <Input type="number" defaultValue="730" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Export Configuration
          </Button>
          <Button variant="outline" className="w-full">
            Import Configuration
          </Button>
          <Button variant="outline" className="w-full">
            Clear Cache
          </Button>
          <Button variant="destructive" className="w-full">
            Reset to Factory Defaults
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;