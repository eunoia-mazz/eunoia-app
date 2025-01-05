import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the MindfulMe platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Settings"
          text="Manage system-wide settings for the MindfulMe platform."
        />
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage general platform settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Eunoia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue="team.eunoia.ai@gmail.com"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
                <Button>Save General Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security settings for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="min-password-length"
                    type="number"
                    defaultValue="8"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor-auth" />
                  <Label htmlFor="two-factor-auth">
                    Require Two-Factor Authentication
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ssl-encryption" defaultChecked />
                  <Label htmlFor="ssl-encryption">SSL Encryption</Label>
                </div>
                <Button>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system-wide notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push-notifications" defaultChecked />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-notifications" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">
                    Notification Frequency (hours)
                  </Label>
                  <Input
                    id="notification-frequency"
                    type="number"
                    defaultValue="24"
                  />
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>
                  Manage third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="google-calendar" />
                  <Label htmlFor="google-calendar">
                    Google Calendar Integration
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="slack-integration" />
                  <Label htmlFor="slack-integration">Slack Integration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="zoom-integration" />
                  <Label htmlFor="zoom-integration">Zoom Integration</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    defaultValue="••••••••••••••••"
                  />
                </div>
                <Button>Save Integration Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  );
}
