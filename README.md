# JUSH Restaurant Order Management System

A complete food ordering platform with a **customer web app** and **real-time admin panel**.

## 🏗️ System Architecture

1️⃣ **Customer orders from website** → 
2️⃣ **Website sends order to backend API** (Node.js/Express) →
3️⃣ **Backend saves order to MongoDB Atlas** →
4️⃣ **Admin panel fetches orders from MongoDB via API** →
5️⃣ **Admin sees new orders in real time**

## 🚀 Features

### **Customer Web App**
- **Modern UI**: Mobile-first responsive design
- **Menu Pages**: Burgers, Fries, Shawarma, Beverages
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Customer info form, order placement
- **Real-time**: Orders sent directly to backend API

### **Admin Panel**
- **Real-time Orders**: Live updates via WebSocket
- **Order Management**: Update status (Pending → In Progress → Ready → Delivered)
- **Desktop Notifications**: Browser notifications for new orders
- **Clean Interface**: Simple, efficient order management

### **Backend API**
- **RESTful API**: Complete order management endpoints
- **WebSocket Support**: Real-time order updates
- **MongoDB Atlas**: Cloud database integration
- **CORS Enabled**: Cross-origin requests supported

## 🛠️ Tech Stack

- **Frontend**: React.js + TailwindCSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Real-time**: Socket.IO
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

## 🔧 Installation & Setup

### **1. Backend Setup**

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your MongoDB Atlas credentials

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### **2. Customer Web App**

```bash
# Navigate to root folder
cd ..

# Install dependencies
npm install

# Start the customer web app
npm start
```

The customer app will run on `http://localhost:3000`

### **3. Admin Panel**

```bash
# Navigate to admin folder
cd admin

# Install dependencies
npm install

# Start the admin panel
npm start
```

The admin panel will run on `http://localhost:3001`

## 🌐 API Endpoints

### **Orders**
- `POST /api/orders` - Create new order (customer checkout)
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/overview` - Get order statistics

### **Health Check**
- `GET /api/health` - Server health status

## 🔌 WebSocket Events

### **Client → Server**
- `join-admin-room` - Join admin room for real-time updates

### **Server → Client**
- `new-order` - New order received
- `order-updated` - Order status updated

## 📱 Default Admin Credentials

When you first start the backend, it creates a default admin:
- **Email**: admin@jush.com
- **Password**: admin123

**⚠️ Change the password after first login!**

## 🎯 How It Works

1. **Customer visits website** (`http://localhost:3000`)
2. **Customer browses menu** and adds items to cart
3. **Customer checks out** with their information
4. **Order is sent** to backend API (`POST /api/orders`)
5. **Backend saves order** to MongoDB Atlas
6. **Admin panel receives** real-time update via WebSocket
7. **Admin updates order status** (Pending → In Progress → Ready → Delivered)
8. **Status updates sync** in real-time across all connected clients

## 🚀 Deployment

### **Backend (Render.com, Railway, Heroku)**
```bash
# Deploy backend to cloud
# Update CORS_ORIGIN in .env to your frontend URL
```

### **Customer Web App (Vercel, Netlify)**
```bash
# Deploy customer app to cloud
# Update API URL in CartPage.tsx to your backend URL
```

### **Admin Panel (Vercel, Netlify)**
```bash
# Deploy admin panel to cloud
# Update API_URL in App.js to your backend URL
```

## 🔧 Configuration

### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jush
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### **Customer App (CartPage.tsx)**
```javascript
const response = await axios.post('YOUR_BACKEND_URL/api/orders', orderData);
```

### **Admin Panel (App.js)**
```javascript
const API_URL = 'YOUR_BACKEND_URL/api';
const newSocket = io('YOUR_BACKEND_URL');
```

## 📊 Database Schema

### **Orders Collection**
```javascript
{
  orderId: String,           // Unique order ID
  customerName: String,      // Customer name
  phone: String,            // Customer phone
  address: String,          // Delivery address
  items: Array,             // Order items
  total: Number,            // Order total
  status: String,           // Order status
  paymentMethod: String,    // Payment method
  createdAt: Date           // Order timestamp
}
```

## 🆓 Free & Lifetime Ready

- **MongoDB Atlas**: Free forever tier
- **Render/Railway**: Free hosting tiers
- **Vercel/Netlify**: Free hosting for frontend
- **No local database** installation required
- **Cloud-based** and scalable

## 🎨 Customization

- **Colors**: Update TailwindCSS classes
- **Menu Items**: Modify data in component files
- **Styling**: All CSS is in TailwindCSS classes
- **Branding**: Update logos, colors, and text

## 📝 License

MIT License - feel free to use this project for your restaurant!

## 🤝 Support

If you need help setting up or customizing the system, feel free to reach out!
