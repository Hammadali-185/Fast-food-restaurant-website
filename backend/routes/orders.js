const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// Create a new order (for website)
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      subtotal,
      tax = 0,
      total,
      paymentMethod = 'cash',
      notes = '',
      specialInstructions = '',
      deliveryFee = 0
    } = req.body;

    // Validate required fields
    if (!customerName || !phone || !address || !items || !total) {
      return res.status(400).json({ 
        error: 'Missing required fields: customerName, phone, address, items, total' 
      });
    }

    // Generate unique order ID
    const orderId = `JUSH-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create new order
    const order = new Order({
      orderId,
      customerName,
      phone,
      address,
      items,
      subtotal,
      tax,
      total,
      paymentMethod,
      notes,
      specialInstructions,
      deliveryFee,
      deliveryAddress: address
    });

    await order.save();

    // Emit real-time update to admin clients
    const io = req.app.get('io');
    io.to('admin-room').emit('new-order', order);

    res.status(201).json({
      success: true,
      order: {
        id: order._id,
        orderId: order.orderId,
        status: order.status,
        total: order.total,
        orderTime: order.orderTime
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ orderTime: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['pending', 'confirmed', 'in-progress', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.statusUpdatedAt = new Date();
    await order.save();

    // Emit real-time update
    const io = req.app.get('io');
    io.to('admin-room').emit('order-updated', order);

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Get order statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      inProgressOrders,
      readyOrders,
      deliveredOrders,
      totalRevenue,
      todayRevenue
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderTime: { $gte: today, $lt: tomorrow } }),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'in-progress' }),
      Order.countDocuments({ status: 'ready' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
      Order.aggregate([
        { $match: { orderTime: { $gte: today, $lt: tomorrow } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        todayOrders,
        pendingOrders,
        inProgressOrders,
        readyOrders,
        deliveredOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        todayRevenue: todayRevenue[0]?.total || 0
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Delete order (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.to('admin-room').emit('order-deleted', { id: req.params.id });

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
