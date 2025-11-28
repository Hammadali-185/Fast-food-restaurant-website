const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const mongoose = require('mongoose');

let mainWindow;
let mongoConnection = null;

// MongoDB Models
const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  phone: String,
  address: String,
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'Pending' },
  orderTime: Date,
  createdAt: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

let Order, Admin;

// Helper function to check if database is connected
function isDatabaseConnected() {
  return Admin && mongoose.connection.readyState === 1;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#1A0000',
    icon: path.join(__dirname, '../assets/icon.png'),
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (mongoConnection) {
      mongoose.connection.close();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers

// Connect to MongoDB
ipcMain.handle('connect-mongodb', async (event, uri) => {
  try {
    if (mongoConnection && mongoose.connection.readyState === 1) {
      return { success: true, message: 'Already connected' };
    }

    console.log('🔄 Connecting to MongoDB with URI:', uri.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    });

    mongoConnection = mongoose.connection;
    
    // Wait for connection to be fully established
    await new Promise((resolve, reject) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.once('open', resolve);
        mongoose.connection.once('error', reject);
      }
    });
    
    // Initialize models
    Order = mongoose.model('Order', orderSchema);
    Admin = mongoose.model('Admin', adminSchema);

    console.log('✅ MongoDB connected successfully');
    return { success: true, message: 'Connected to MongoDB' };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return { success: false, error: error.message };
  }
});

// Admin Authentication
ipcMain.handle('admin-login', async (event, { email, password }) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      console.error('❌ Database not connected for admin login');
      return { success: false, error: 'Database not connected' };
    }

    console.log('🔍 Attempting admin login for:', email);
    const admin = await Admin.findOne({ email, password });
    
    if (admin) {
      console.log('✅ Admin login successful');
      return {
        success: true,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      };
    } else {
      console.log('❌ Admin login failed - invalid credentials');
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return { success: false, error: error.message };
  }
});

// Create default admin (for first-time setup)
ipcMain.handle('create-default-admin', async () => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      console.error('❌ Database not connected for admin creation');
      return { success: false, error: 'Database not connected' };
    }

    console.log('🔍 Checking for existing admin...');
    const existingAdmin = await Admin.findOne({ email: 'admin@jush.com' });
    
    if (!existingAdmin) {
      console.log('👤 Creating default admin...');
      const defaultAdmin = new Admin({
        email: 'admin@jush.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created successfully');
      return { success: true, message: 'Default admin created' };
    }
    
    console.log('✅ Admin already exists');
    return { success: true, message: 'Admin already exists' };
  } catch (error) {
    console.error('❌ Create admin error:', error.message);
    return { success: false, error: error.message };
  }
});

// Get all orders
ipcMain.handle('get-orders', async (event, filters = {}) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('❌ Database not connected for get-orders');
      return { success: false, error: 'Database not connected' };
    }

    let query = {};
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    if (filters.search) {
      query.$or = [
        { customerName: { $regex: filters.search, $options: 'i' } },
        { orderId: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.limit || 100);

    return { success: true, orders };
  } catch (error) {
    console.error('Get orders error:', error);
    return { success: false, error: error.message };
  }
});

// Update order status
ipcMain.handle('update-order-status', async (event, { orderId, status }) => {
  try {
    if (!Order) {
      return { success: false, error: 'Database not connected' };
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (order) {
      return { success: true, order };
    } else {
      return { success: false, error: 'Order not found' };
    }
  } catch (error) {
    console.error('Update order error:', error);
    return { success: false, error: error.message };
  }
});

// Get sales analytics
ipcMain.handle('get-analytics', async (event, { startDate, endDate }) => {
  try {
    if (!Order) {
      return { success: false, error: 'Database not connected' };
    }

    const query = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      },
      status: { $ne: 'Cancelled' }
    };

    const orders = await Order.find(query);

    // Calculate analytics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Group by date
    const dailySales = {};
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!dailySales[date]) {
        dailySales[date] = { date, revenue: 0, orders: 0 };
      }
      dailySales[date].revenue += order.total;
      dailySales[date].orders += 1;
    });

    // Top selling items
    const itemCounts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        }
        itemCounts[item.name].quantity += item.quantity;
        itemCounts[item.name].revenue += item.price * item.quantity;
      });
    });

    const topItems = Object.values(itemCounts)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    return {
      success: true,
      analytics: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        dailySales: Object.values(dailySales),
        topItems
      }
    };
  } catch (error) {
    console.error('Get analytics error:', error);
    return { success: false, error: error.message };
  }
});

// Watch for new orders (polling)
ipcMain.handle('watch-orders', async () => {
  try {
    if (!Order) {
      return { success: false, error: 'Database not connected' };
    }

    // Get the latest order timestamp
    const latestOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastTimestamp = latestOrder ? latestOrder.createdAt : new Date();

    return { success: true, lastTimestamp };
  } catch (error) {
    console.error('Watch orders error:', error);
    return { success: false, error: error.message };
  }
});

// Show desktop notification
ipcMain.handle('show-notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show();
  }
  return { success: true };
});

