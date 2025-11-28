import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Poll for new orders every 10 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const result = await window.electronAPI.getOrders({ limit: 10 });
      
      if (result.success) {
        const orders = result.orders;
        setRecentOrders(orders);

        // Calculate stats
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const completedOrders = orders.filter(o => o.status === 'Completed').length;

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
          completedOrders
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-primary-red',
      change: '+12%'
    },
    {
      title: 'Total Revenue',
      value: `Rs ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-accent-orange',
      change: '+8%'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-accent-yellow',
      change: `${stats.pendingOrders} active`
    },
    {
      title: 'Completed',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: 'Today'
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-pending';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-ui-gray-medium">Overview of your restaurant operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6 hover:border-primary-red transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-ui-gray-medium text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Orders</h2>
          <button className="text-primary-red hover:text-primary-red-dark text-sm font-medium">
            View All
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-ui-gray-medium mx-auto mb-3" />
            <p className="text-ui-gray-medium">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ui-gray-dark">
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Order ID</th>
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Customer</th>
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Items</th>
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Total</th>
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Status</th>
                  <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-ui-gray-dark/50 hover:bg-ui-gray-dark/30">
                    <td className="py-4 text-white font-mono text-sm">
                      #{order.orderId?.slice(-6) || order._id.slice(-6)}
                    </td>
                    <td className="py-4 text-white">{order.customerName}</td>
                    <td className="py-4 text-ui-gray-medium text-sm">
                      {order.items?.length || 0} items
                    </td>
                    <td className="py-4 text-white font-bold">Rs {order.total.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-ui-gray-medium text-sm">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

