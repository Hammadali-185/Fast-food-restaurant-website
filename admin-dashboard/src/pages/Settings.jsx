import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Database, Bell, User } from 'lucide-react';

const Settings = () => {
  const [mongoURI, setMongoURI] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedURI = localStorage.getItem('mongoURI');
    if (savedURI) {
      setMongoURI(savedURI);
    }

    const savedNotifications = localStorage.getItem('notificationsEnabled');
    if (savedNotifications !== null) {
      setNotificationsEnabled(savedNotifications === 'true');
    }

    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('mongoURI', mongoURI);
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
    localStorage.setItem('soundEnabled', soundEnabled.toString());
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-ui-gray-medium">Configure your admin dashboard</p>
      </div>

      {/* Database Settings */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-red p-2 rounded-lg">
            <Database className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Database Configuration</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-ui-gray-medium text-sm mb-2">MongoDB Connection URI</label>
            <input
              type="text"
              value={mongoURI}
              onChange={(e) => setMongoURI(e.target.value)}
              placeholder="mongodb+srv://username:password@cluster.mongodb.net/database"
              className="w-full px-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white placeholder-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-red font-mono text-sm"
            />
            <p className="text-ui-gray-medium text-xs mt-2">
              Enter your MongoDB Atlas connection string. The app will reconnect on next restart.
            </p>
          </div>

          <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg p-4">
            <p className="text-accent-yellow text-sm">
              ⚠️ <strong>Important:</strong> Keep your database credentials secure. Never share your connection string publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent-orange p-2 rounded-lg">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Desktop Notifications</p>
              <p className="text-ui-gray-medium text-sm">Show system notifications for new orders</p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary-red' : 'bg-ui-gray-dark'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Sound Alerts</p>
              <p className="text-ui-gray-medium text-sm">Play sound when new orders arrive</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                soundEnabled ? 'bg-primary-red' : 'bg-ui-gray-dark'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent-yellow p-2 rounded-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Information</h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-ui-gray-medium text-sm mb-1">Default Admin Credentials</p>
            <div className="bg-ui-gray-dark p-4 rounded-lg">
              <p className="text-white font-mono text-sm">Email: admin@jushhh.com</p>
              <p className="text-white font-mono text-sm">Password: admin123</p>
            </div>
            <p className="text-ui-gray-medium text-xs mt-2">
              Change these credentials in your MongoDB database for security.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full bg-primary-red hover:bg-primary-red-dark text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Settings
      </motion.button>

      {/* Success Message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center"
        >
          <p className="text-green-500 font-medium">✓ Settings saved successfully!</p>
        </motion.div>
      )}

      {/* App Info */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">About</h3>
        <div className="space-y-2 text-sm">
          <p className="text-ui-gray-medium">
            <span className="text-white font-medium">Application:</span> JUSHHH Admin Dashboard
          </p>
          <p className="text-ui-gray-medium">
            <span className="text-white font-medium">Version:</span> 1.0.0
          </p>
          <p className="text-ui-gray-medium">
            <span className="text-white font-medium">Platform:</span> Electron + React + MongoDB
          </p>
          <p className="text-ui-gray-medium">
            <span className="text-white font-medium">© 2025</span> JUSHHH. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

