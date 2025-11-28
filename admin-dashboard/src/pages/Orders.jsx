import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Eye } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
    
    // Poll for new orders every 5 seconds
    const interval = setInterval(() => {
      fetchOrders(true); // Silent refresh
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const result = await window.electronAPI.getOrders({ limit: 100 });
      
      if (result.success) {
        const newOrders = result.orders;
        
        // Check for new orders and show notification
        if (orders.length > 0 && newOrders.length > orders.length) {
          const latestOrder = newOrders[0];
          window.electronAPI.showNotification({
            title: '🔔 New Order Received!',
            body: `Order from ${latestOrder.customerName} - Rs ${latestOrder.total.toFixed(2)}`
          });
          
          // Play notification sound (optional)
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGe77OeeUhAMUKfj8LVjHAY4kdfyzHksBSR3x/DdkEAKFF606OuoVRQKRp/g8r5sIQUrgs7y2Yk2CBhnu+znm1IQDFCn4/C1YxwGOJHX8sx5LAUkd8fw3ZBAC');
          audio.play().catch(() => {});
        }
        
        setOrders(newOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      if (!silent) setLoading(false);
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
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result = await window.electronAPI.updateOrderStatus({
        orderId,
        status: newStatus
      });

      if (result.success) {
        // Update local state
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        
        // Update selected order if modal is open
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-pending';
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Orders Management</h1>
          <p className="text-ui-gray-medium">View and manage all orders in real-time</p>
        </div>
        <button
          onClick={() => fetchOrders()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name or order ID..."
              className="w-full pl-10 pr-4 py-2 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white placeholder-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-ui-gray-medium" />
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
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ui-gray-dark">
              <tr>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Order ID</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Customer</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Phone</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Items</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Total</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Status</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Time</th>
                <th className="text-left text-ui-gray-medium text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-ui-gray-dark/50 hover:bg-ui-gray-dark/30"
                >
                  <td className="px-6 py-4 text-white font-mono text-sm">
                    #{order.orderId?.slice(-8) || order._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-white">{order.customerName}</td>
                  <td className="px-6 py-4 text-ui-gray-medium">{order.phone}</td>
                  <td className="px-6 py-4 text-ui-gray-medium">{order.items?.length || 0} items</td>
                  <td className="px-6 py-4 text-white font-bold">Rs {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`${getStatusBadge(order.status)} border-none cursor-pointer`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-ui-gray-medium text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="p-2 hover:bg-primary-red rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5 text-ui-gray-medium hover:text-white" />
                    </button>
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

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-ui-gray-medium hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-ui-gray-medium text-sm">Order ID</p>
                  <p className="text-white font-mono">#{selectedOrder.orderId?.slice(-8) || selectedOrder._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-ui-gray-medium text-sm">Status</p>
                  <span className={getStatusBadge(selectedOrder.status)}>{selectedOrder.status}</span>
                </div>
                <div>
                  <p className="text-ui-gray-medium text-sm">Customer</p>
                  <p className="text-white">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-ui-gray-medium text-sm">Phone</p>
                  <p className="text-white">{selectedOrder.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-ui-gray-medium text-sm">Address</p>
                  <p className="text-white">{selectedOrder.address}</p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between bg-ui-gray-dark p-3 rounded-lg">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-ui-gray-medium text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-bold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-ui-gray-dark pt-4">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>Rs {selectedOrder.total.toFixed(2)}</span>
                </div>
                <p className="text-ui-gray-medium text-sm mt-2">
                  Payment: {selectedOrder.paymentMethod}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Orders;

