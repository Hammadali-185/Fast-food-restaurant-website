import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Calendar } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const endDate = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '7days':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(startDate.getDate() - 30);
          break;
        case '90days':
          startDate.setDate(startDate.getDate() - 90);
          break;
        default:
          startDate.setDate(startDate.getDate() - 7);
      }

      const result = await window.electronAPI.getAnalytics({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      if (result.success) {
        setAnalytics(result.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#FF3B00', '#FF6600', '#F5C542', '#B30000', '#666666'];

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sales Analytics</h1>
          <p className="text-ui-gray-medium">Track your business performance</p>
        </div>
        
        {/* Date Range Selector */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary-red p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-ui-gray-medium text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">Rs {analytics.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-orange p-3 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-ui-gray-medium text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">{analytics.totalOrders}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-yellow p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-ui-gray-medium text-sm">Avg Order Value</p>
              <p className="text-2xl font-bold text-white">Rs {analytics.avgOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Daily Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF3B00"
                strokeWidth={2}
                dot={{ fill: '#FF3B00' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Orders Chart */}
        <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Daily Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#FF6600" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Top Selling Items</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topItems.slice(0, 5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="name" type="category" stroke="#666" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="quantity" fill="#F5C542" />
            </BarChart>
          </ResponsiveContainer>

          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.topItems.slice(0, 5)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {analytics.topItems.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ui-gray-dark">
              <tr>
                <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Rank</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Item</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Quantity Sold</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium pb-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topItems.map((item, index) => (
                <tr key={index} className="border-b border-ui-gray-dark/50">
                  <td className="py-3 text-white font-bold">#{index + 1}</td>
                  <td className="py-3 text-white">{item.name}</td>
                  <td className="py-3 text-ui-gray-medium">{item.quantity}</td>
                  <td className="py-3 text-white font-bold">Rs {item.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

