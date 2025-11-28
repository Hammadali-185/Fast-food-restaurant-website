import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, startDate, endDate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await window.electronAPI.getOrders({ limit: 500 });
      
      if (result.success) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Order History</h1>
        <p className="text-ui-gray-medium">View and search through all past orders</p>
      </div>

      {/* Filters */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white placeholder-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          {/* Start Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-ui-gray-medium text-sm">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ui-gray-dark">
              <tr>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Order ID</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Date</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Customer</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Items</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Total</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Payment</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-ui-gray-dark/50 hover:bg-ui-gray-dark/30"
                >
                  <td className="px-6 py-4 text-white font-mono text-sm">
                    #{order.orderId?.slice(-8) || order._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-ui-gray-medium text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-white">{order.customerName}</td>
                  <td className="px-6 py-4 text-ui-gray-medium">{order.items?.length || 0}</td>
                  <td className="px-6 py-4 text-white font-bold">Rs {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-ui-gray-medium">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(order.status)}>{order.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ui-gray-medium">No orders found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-ui-gray-dark rounded-lg hover:bg-primary-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === index + 1
                  ? 'bg-primary-red text-white'
                  : 'bg-ui-gray-dark text-ui-gray-medium hover:bg-ui-gray-medium hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-ui-gray-dark rounded-lg hover:bg-primary-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default History;

