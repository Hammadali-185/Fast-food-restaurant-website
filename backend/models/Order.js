const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order identification
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Customer information
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  // Order items
  items: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  }],
  
  // Order totals and payment
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
    default: 'cash'
  },
  
  // Order status and tracking
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // Timestamps
  orderTime: {
    type: Date,
    default: Date.now
  },
  estimatedDelivery: {
    type: Date
  },
  statusUpdatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Additional information
  notes: {
    type: String,
    default: ''
  },
  specialInstructions: {
    type: String,
    default: ''
  },
  
  // Delivery information
  deliveryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  deliveryAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for better performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderTime: -1 });
orderSchema.index({ customerName: 1 });

// Virtual for formatted order time
orderSchema.virtual('formattedOrderTime').get(function() {
  return this.orderTime.toLocaleString();
});

// Method to update status
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.statusUpdatedAt = new Date();
  return this.save();
};

// Static method to get orders by status
orderSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ orderTime: -1 });
};

// Static method to get today's orders
orderSchema.statics.getTodaysOrders = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return this.find({
    orderTime: {
      $gte: today,
      $lt: tomorrow
    }
  }).sort({ orderTime: -1 });
};

module.exports = mongoose.model('Order', orderSchema);
