import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  TrendingUp, 
  History, 
  FileText, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-ui-surface-dark border-r border-ui-gray-dark flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-ui-gray-dark">
        <h1 
          className="text-3xl font-bold"
          style={{
            fontFamily: 'Dancing Script, cursive',
            color: 'var(--primary-red)',
            textShadow: '2px 2px 0px var(--accent-yellow)'
          }}
        >
          JUSHHH
        </h1>
        <p className="text-ui-gray-medium text-sm mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-red text-white shadow-lg'
                  : 'text-ui-gray-medium hover:bg-ui-gray-dark hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-ui-gray-dark">
        <div className="text-xs text-ui-gray-medium text-center">
          <p>JUSHHH Admin v1.0.0</p>
          <p className="mt-1">© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

