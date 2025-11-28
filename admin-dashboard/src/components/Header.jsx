import React from 'react';
import { Bell, LogOut, User } from 'lucide-react';

const Header = ({ admin, onLogout }) => {
  return (
    <header className="bg-ui-surface-dark border-b border-ui-gray-dark px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {admin?.name || 'Admin'}!</h2>
          <p className="text-ui-gray-medium text-sm mt-1">Manage your orders and track performance</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-ui-gray-dark transition-colors">
            <Bell className="w-6 h-6 text-ui-gray-medium" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-red rounded-full"></span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 px-4 py-2 bg-ui-gray-dark rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">{admin?.name || 'Admin'}</p>
              <p className="text-ui-gray-medium text-xs">{admin?.email}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-primary-red hover:text-white text-ui-gray-medium transition-colors"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

