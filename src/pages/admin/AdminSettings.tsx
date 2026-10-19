import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Bell, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your admin preferences and account settings.</p>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="User" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="admin@orderflow.com" type="email" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                <div>
                  <p className="font-medium">New Orders</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for new customer orders.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                <div>
                  <p className="font-medium">Payment Failures</p>
                  <p className="text-sm text-muted-foreground">Get notified when a payment fails.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">Important system and security notifications.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Security</CardTitle>
              <CardDescription>Manage your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Leave blank to keep current" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4 pt-4 pb-8"
      >
        <Button onClick={handleSave} disabled={isSaving} className="w-32">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="outline">Reset</Button>
      </motion.div>
    </div>
  );
}
