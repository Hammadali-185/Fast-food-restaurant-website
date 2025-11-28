# JUSHHH Admin Dashboard

A full-featured desktop admin dashboard application for managing food orders, built with Electron, React, and MongoDB Atlas.

![JUSHHH Admin Dashboard](https://img.shields.io/badge/Version-1.0.0-red)
![Platform](https://img.shields.io/badge/Platform-Electron-blue)
![License](https://img.shields.io/badge/License-ISC-green)

## 🚀 Features

### Core Functionality
- **🔐 Secure Admin Login** - Email/password authentication with MongoDB
- **📦 Real-time Order Management** - View, update, and track orders as they come in
- **📈 Sales Analytics** - Interactive charts and graphs for business insights
- **🕓 Order History** - Complete order history with advanced filters and pagination
- **📤 Export Reports** - Generate CSV and PDF reports for any date range
- **🔔 Desktop Notifications** - Get instant alerts for new orders
- **🎨 Dark Theme UI** - Beautiful, modern interface matching your brand

### Technical Features
- Real-time order polling (updates every 5-10 seconds)
- MongoDB Atlas cloud database integration
- Responsive design for desktop screens
- Offline-capable with local caching
- Cross-platform support (Windows, Mac, Linux)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free tier available) - [Sign up](https://www.mongodb.com/cloud/atlas)

## 🛠️ Installation

### 1. Clone or Download the Project

```bash
cd admin-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Electron
- React & React Router
- TailwindCSS
- Recharts (for analytics)
- Mongoose (MongoDB ODM)
- jsPDF (for PDF export)
- And more...

### 3. Configure MongoDB Connection

⚠️ **IMPORTANT:** The app needs a valid MongoDB Atlas connection string to work.

#### Get Your MongoDB Atlas Connection String

**If you already have MongoDB Atlas for your website:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login and find your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@your-cluster.xxxxx.mongodb.net/jush`)
5. Make sure it uses the database name `jush` (or your database name)

**If you don't have MongoDB Atlas yet:**
1. See the detailed guide: [MONGODB_SETUP.md](./MONGODB_SETUP.md)
2. Create a free cluster (takes 5 minutes)
3. Get your connection string

#### Update Connection String in the App

1. Launch the app (even if it shows "Database Disconnected")
2. Login with default credentials (admin@jushhh.com / admin123) - it may fail, that's OK
3. Go to Settings page
4. Paste your actual MongoDB connection string
5. Click "Save Settings"
6. Restart the app

**Note:** The connection string now uses your actual MongoDB Atlas cluster URL: `cluster0.smk1uum.mongodb.net`

⚠️ **If you get connection timeouts, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions.**

### 4. Default Admin Credentials

The app automatically creates a default admin account:
- **Email:** `admin@jush.com`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials in your MongoDB database for production use!

## 🚀 Running the Application

### Development Mode

Run the app in development mode with hot reload:

```bash
npm run dev
```

This will:
1. Start the Vite development server on `http://localhost:5173`
2. Launch the Electron app
3. Open DevTools for debugging

### Production Mode

Build and run the production version:

```bash
npm run build
npm start
```

## 📦 Building Executable (.exe / .dmg)

### Build for Windows (.exe)

```bash
npm run build:electron
```

This will create an installer in the `release` folder:
- `JUSHHH Admin Dashboard Setup 1.0.0.exe` - Windows installer

### Build for Mac (.dmg)

On macOS, run:

```bash
npm run build:electron
```

This will create:
- `JUSHHH Admin Dashboard-1.0.0.dmg` - Mac installer

### Build for Linux (.AppImage)

On Linux, run:

```bash
npm run build:electron
```

This will create:
- `JUSHHH Admin Dashboard-1.0.0.AppImage` - Linux installer

## 📖 User Guide

### First Time Setup

1. **Launch the Application**
   - Double-click the installed app or run `npm run dev`

2. **Login**
   - Use the default credentials:
     - Email: `admin@jushhh.com`
     - Password: `admin123`

3. **Verify Database Connection**
   - Check the green "Connected to Database" indicator on the login screen
   - If red, go to Settings and verify your MongoDB URI

### Dashboard Overview

#### 📊 Dashboard Page
- View real-time statistics (Total Orders, Revenue, Pending, Completed)
- See recent orders at a glance
- Auto-refreshes every 10 seconds

#### 📦 Orders Page
- View all active orders
- Change order status (Pending → In Progress → Completed)
- Search orders by customer name or order ID
- Filter by status
- View detailed order information
- Real-time updates every 5 seconds
- Desktop notifications for new orders

#### 📈 Analytics Page
- View sales trends with interactive charts
- Daily sales line chart
- Daily orders bar chart
- Top-selling items analysis
- Revenue breakdown
- Filter by date range (7 days, 30 days, 90 days)

#### 🕓 History Page
- Complete order history
- Advanced filters:
  - Search by customer/order ID
  - Filter by status
  - Date range selection
- Pagination (10 orders per page)
- Quick date filters (Today, Last 7 Days, Last 30 Days, This Month)

#### 📤 Reports Page
- Generate detailed reports
- Export formats: CSV and PDF
- Report types:
  - **Sales Report:** Order summaries with customer details
  - **Items Report:** Detailed item breakdown
- Custom date range selection
- Quick filters for common periods

#### ⚙️ Settings Page
- Configure MongoDB connection
- Enable/disable desktop notifications
- Enable/disable sound alerts
- View admin credentials
- App information

### Managing Orders

1. **View New Orders**
   - New orders appear automatically in the Orders page
   - You'll receive a desktop notification
   - Orders are highlighted in the list

2. **Update Order Status**
   - Click the status dropdown on any order
   - Select new status: Pending, In Progress, Completed, or Cancelled
   - Status updates immediately in the database

3. **View Order Details**
   - Click the eye icon (👁️) next to any order
   - See complete order information:
     - Customer details
     - Delivery address
     - Ordered items with quantities
     - Payment method
     - Total amount

### Generating Reports

1. **Go to Reports Page**
2. **Select Report Type**
   - Sales Report: Overview of all orders
   - Items Report: Detailed item-level data

3. **Choose Date Range**
   - Use calendar inputs or quick filters
   - Leave empty for all-time data

4. **Export**
   - Click "Download CSV" for spreadsheet format
   - Click "Download PDF" for formatted report

## 🔧 Troubleshooting

### Database Connection Issues

**Problem:** "Database Disconnected" on login screen

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running
3. Check if your IP is whitelisted in MongoDB Atlas
4. Verify connection string in Settings
5. Ensure database user has proper permissions

### Orders Not Appearing

**Problem:** Orders from website not showing in admin panel

**Solutions:**
1. Verify both website and admin use the same MongoDB database
2. Check the database name in connection string
3. Ensure orders collection exists
4. Check MongoDB Atlas logs for errors

### Notifications Not Working

**Problem:** No desktop notifications for new orders

**Solutions:**
1. Enable notifications in Settings
2. Grant notification permissions to the app (check OS settings)
3. Ensure app is running and not minimized
4. Check if "Do Not Disturb" is enabled on your system

### Build Errors

**Problem:** `npm run build:electron` fails

**Solutions:**
1. Delete `node_modules` and run `npm install` again
2. Ensure you have write permissions in the project folder
3. Check if antivirus is blocking electron-builder
4. Try running as administrator (Windows)

## 🔒 Security Best Practices

1. **Change Default Credentials**
   - Update admin email and password in MongoDB
   - Never use default credentials in production

2. **Secure MongoDB Connection**
   - Use strong database passwords
   - Whitelist only necessary IP addresses
   - Enable MongoDB Atlas encryption

3. **Keep App Updated**
   - Regularly update dependencies
   - Check for security patches

4. **Backup Your Data**
   - Enable MongoDB Atlas automated backups
   - Export important reports regularly

## 📁 Project Structure

```
admin-dashboard/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script for IPC
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx  # Navigation sidebar
│   │   └── Header.jsx   # Top header bar
│   ├── pages/
│   │   ├── Login.jsx    # Login page
│   │   ├── Dashboard.jsx # Main dashboard
│   │   ├── Orders.jsx   # Orders management
│   │   ├── Analytics.jsx # Sales analytics
│   │   ├── History.jsx  # Order history
│   │   ├── Reports.jsx  # Report generation
│   │   └── Settings.jsx # App settings
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS config
└── README.md            # This file
```

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router DOM
- **Styling:** TailwindCSS, Framer Motion
- **Desktop:** Electron
- **Database:** MongoDB Atlas, Mongoose
- **Charts:** Recharts
- **Icons:** Lucide React
- **PDF Export:** jsPDF
- **Build Tool:** Vite
- **Package Manager:** npm

## 📝 Available Scripts

```bash
npm run dev              # Run in development mode
npm run build            # Build React app
npm run build:electron   # Build executable (.exe/.dmg)
npm run preview          # Preview production build
```

## 🐛 Known Issues

1. **Windows Defender Warning:** First-time Windows builds may trigger SmartScreen. This is normal for unsigned apps.
2. **Mac Gatekeeper:** Mac users may need to right-click and select "Open" for first launch.
3. **Large Build Size:** Electron apps are typically 100-200MB due to bundled Chromium.

## 🤝 Support

For issues or questions:
1. Check this README thoroughly
2. Review the Troubleshooting section
3. Check MongoDB Atlas documentation
4. Contact your development team

## 📄 License

ISC License - Copyright © 2025 JUSHHH

## 🎉 Congratulations!

You now have a fully functional admin dashboard for your food ordering business. The app will help you:
- ✅ Manage orders efficiently
- ✅ Track business performance
- ✅ Generate detailed reports
- ✅ Make data-driven decisions

**Happy managing! 🍔🌯🍟🥤**

