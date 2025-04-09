import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Switch } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    platform_name: "",
    support_email: "",
  });
  const [securitySettings, setSecuritySettings] = useState({
    minimum_password_length: 0,
    two_factor_auth: false,
    ssl_encryption: false,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: false,
    push_notifications: false,
    sms_notifications: false,
    notification_frequency: 24,
  });
  const [integrationSettings, setIntegrationSettings] = useState({
    google_calendar: false,
    slack_integration: false,
    zoom_integration: false,
    api_key: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [generalRes, securityRes, notificationRes, integrationRes] = await Promise.all([
          axios.get("http://localhost:5000/get_general_settings"),
          axios.get("http://localhost:5000/get_security_settings"),
          axios.get("http://localhost:5000/get_notifications_settings"),
          axios.get("http://localhost:5000/get_integration_settings"),
        ]);

        setGeneralSettings(generalRes.data);
        setSecuritySettings(securityRes.data);
        setNotificationSettings(notificationRes.data);
        setIntegrationSettings(integrationRes.data);
      } catch (err) {
        setError("Failed to fetch settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveGeneralSettings = async () => {
    try {
      await axios.post("http://localhost:5000/store_general_settings", {
        platform_name: generalSettings.platform_name,
        support_email: generalSettings.support_email,
      });
      alert("General settings saved successfully!");
    } catch (err) {
      alert("Failed to save general settings.");
    }
  };

  const handleSaveSecuritySettings = async () => {
    try {
      await axios.post("http://localhost:5000/store_security_settings", {
        minimum_password_length: securitySettings.minimum_password_length,
        two_factor_auth: securitySettings.two_factor_auth,
        ssl_encryption: securitySettings.ssl_encryption,
      });
      alert("Security settings saved successfully!");
    } catch (err) {
      alert("Failed to save security settings.");
    }
  };

  const handleSaveNotificationSettings = async () => {
    try {
      await axios.post("http://localhost:5000/store_notifications_settings", {
        email_notifications: notificationSettings.email_notifications,
        push_notifications: notificationSettings.push_notifications,
        sms_notifications: notificationSettings.sms_notifications,
        notification_frequency: notificationSettings.notification_frequency,
      });
      alert("Notification settings saved successfully!");
    } catch (err) {
      alert("Failed to save notification settings.");
    }
  };

  const handleSaveIntegrationSettings = async () => {
    try {
      await axios.post("http://localhost:5000/store_integration_settings", {
        google_calendar: integrationSettings.google_calendar,
        slack_integration: integrationSettings.slack_integration,
        zoom_integration: integrationSettings.zoom_integration,
        api_key: integrationSettings.api_key,
      });
      alert("Integration settings saved successfully!");
    } catch (err) {
      alert("Failed to save integration settings.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Settings | Admin Dashboard</title>
        <meta name="description" content="Manage system-wide settings for the Eunoia platform" />
      </Helmet>
      <DashboardShell>
        <DashboardHeader heading="Settings" text="Manage system-wide settings for the Eunoia platform." />
        <Tabs defaultValue="general">
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
                <CardDescription>Manage general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    value={generalSettings.platform_name}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platform_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={generalSettings.support_email}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, support_email: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
                <Button onClick={handleSaveGeneralSettings} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security settings for the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input
                    id="min-password-length"
                    type="number"
                    value={securitySettings.minimum_password_length}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, minimum_password_length: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="two-factor-auth"
                    checked={securitySettings.two_factor_auth}
                    onChange={() => setSecuritySettings({ ...securitySettings, two_factor_auth: !securitySettings.two_factor_auth })}
                  />
                  <Label htmlFor="two-factor-auth">Require Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ssl-encryption"
                    checked={securitySettings.ssl_encryption}
                    onChange={() => setSecuritySettings({ ...securitySettings, ssl_encryption: !securitySettings.ssl_encryption })}
                  />
                  <Label htmlFor="ssl-encryption">SSL Encryption</Label>
                </div>
                <Button onClick={handleSaveSecuritySettings} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system-wide notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email_notifications}
                    onChange={() => setNotificationSettings({ ...notificationSettings, email_notifications: !notificationSettings.email_notifications })}
                  />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.push_notifications}
                    onChange={() => setNotificationSettings({ ...notificationSettings, push_notifications: !notificationSettings.push_notifications })}
                  />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.sms_notifications}
                    onChange={() => setNotificationSettings({ ...notificationSettings, sms_notifications: !notificationSettings.sms_notifications })}
                  />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency (hours)</Label>
                  <Input
                    id="notification-frequency"
                    type="number"
                    value={notificationSettings.notification_frequency}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, notification_frequency: e.target.value })}
                  />
                </div>
                <Button onClick={handleSaveNotificationSettings} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Manage third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="google-calendar"
                    checked={integrationSettings.google_calendar}
                    onChange={() => setIntegrationSettings({ ...integrationSettings, google_calendar: !integrationSettings.google_calendar })}
                  />
                  <Label htmlFor="google-calendar">Google Calendar Integration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="slack-integration"
                    checked={integrationSettings.slack_integration}
                    onChange={() => setIntegrationSettings({ ...integrationSettings, slack_integration: !integrationSettings.slack_integration })}
                  />
                  <Label htmlFor="slack-integration">Slack Integration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="zoom-integration"
                    checked={integrationSettings.zoom_integration}
                    onChange={() => setIntegrationSettings({ ...integrationSettings, zoom_integration: !integrationSettings.zoom_integration })}
                  />
                  <Label htmlFor="zoom-integration">Zoom Integration</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={integrationSettings.api_key}
                    onChange={(e) => setIntegrationSettings({ ...integrationSettings, api_key: e.target.value })}
                  />
                </div>
                <Button onClick={handleSaveIntegrationSettings} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  );
}
