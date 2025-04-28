
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
    });
  };
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notifications" className="flex flex-col gap-1">
                <span>Push Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive push notifications for important alerts.
                </span>
              </Label>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing" className="flex flex-col gap-1">
                <span>Marketing Emails</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive emails about new features and market updates.
                </span>
              </Label>
              <Switch id="marketing" />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="theme" className="flex flex-col gap-1">
                <span>Dark Theme</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Use dark theme for the application.
                </span>
              </Label>
              <Switch id="theme" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trading Preferences</CardTitle>
            <CardDescription>
              Configure your trading experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="confirmation" className="flex flex-col gap-1">
                <span>Order Confirmation</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Show confirmation dialog before placing orders.
                </span>
              </Label>
              <Switch id="confirmation" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="realtime" className="flex flex-col gap-1">
                <span>Real-time Data</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Use real-time market data for charts and quotes.
                </span>
              </Label>
              <Switch id="realtime" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </MainLayout>
  );
};

export default Settings;
