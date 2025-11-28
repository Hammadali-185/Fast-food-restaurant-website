# 🚀 Quick Start Guide

Get your JUSHHH Admin Dashboard up and running!

## Step 1: Install Dependencies (2 minutes)

```bash
cd admin-dashboard
npm install
```

Wait for all packages to download and install.

## Step 2: Get MongoDB Connection String ⚠️ IMPORTANT

The app needs your actual MongoDB Atlas connection string to work.

**Option A: If you have MongoDB Atlas for your website**
1. Go to https://cloud.mongodb.com/
2. Login → Find your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Make sure it has your database name (e.g., `jush`)

**Option B: If you don't have MongoDB Atlas**
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed setup guide
- Create a free cluster (takes 5 minutes)

## Step 3: Run the App (30 seconds)

```bash
npm run dev
```

The app will open. You'll see "Database Disconnected" (red) - that's expected!

## Step 4: Configure Database (1 minute)

1. On the login screen, you'll see "Database Disconnected" (red)
2. The default connection won't work because `cluster0.mongodb.net` is a placeholder
3. You need to update it with your actual MongoDB connection string

**To update:**
- Go to Settings page (you may need to skip login or it will fail)
- Paste your MongoDB connection string
- Click "Save Settings"
- Restart the app

## Step 5: Login (30 seconds)

After restarting with correct MongoDB connection:
- You should see "Connected to Database" (green)
- Use the default credentials:
- **Email:** `admin@jush.com`
- **Password:** `admin123`

## Step 6: Start Managing Orders! 🎉

You're all set! The dashboard is now ready to:
- 📦 Display orders from your website
- 📊 Show sales analytics
- 📤 Generate reports
- 🔔 Send notifications

---

## 🏗️ Building Executable (.exe)

When you're ready to distribute the app:

```bash
npm run build:electron
```

Find your installer in the `release` folder!

---

## 🆘 Need Help?

Check the full [README.md](./README.md) for:
- Detailed setup instructions
- Troubleshooting guide
- Feature documentation
- Security best practices

---

**That's it! You're ready to manage your food ordering business like a pro! 🍔🌯🍟**

