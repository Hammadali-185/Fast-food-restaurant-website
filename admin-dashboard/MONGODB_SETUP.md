# 🗄️ MongoDB Atlas Setup Guide

## ⚠️ Current Issue

The app is trying to connect to `cluster0.mongodb.net` which doesn't exist or the credentials are incorrect.

## 🔧 Solution: Get Your Actual MongoDB Atlas Connection String

### Option 1: Use Your Existing MongoDB Atlas Database (Recommended)

Since you already have a MongoDB Atlas database for your website, use the SAME database for the admin dashboard.

#### Steps:

1. **Go to MongoDB Atlas**
   - Visit: https://cloud.mongodb.com/
   - Login with your account

2. **Find Your Cluster**
   - Click on "Database" in the left sidebar
   - You should see your cluster (it might be named something like "Cluster0", "jush-cluster", etc.)

3. **Get Connection String**
   - Click the "Connect" button on your cluster
   - Select "Connect your application"
   - Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@your-actual-cluster.xxxxx.mongodb.net/jush?retryWrites=true&w=majority
   ```

4. **Replace Placeholders**
   - Replace `<username>` with: `hammadk5802_db_user`
   - Replace `<password>` with: `UG2dlaAugAbZHTHG`
   - The final string should look like:
   ```
   mongodb+srv://hammadk5802_db_user:UG2dlaAugAbZHTHG@your-actual-cluster.xxxxx.mongodb.net/jush?retryWrites=true&w=majority
   ```

5. **Update the Admin Dashboard**
   - Open the app
   - Go to Settings page
   - Paste your connection string in the "MongoDB Connection URI" field
   - Click "Save Settings"
   - Restart the app

### Option 2: Create a New MongoDB Atlas Cluster (If you don't have one)

1. **Sign up for MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create Cluster"
   - Wait 3-5 minutes for cluster to be created

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `hammadk5802_db_user`
   - Password: `UG2dlaAugAbZHTHG`
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with `UG2dlaAugAbZHTHG`

6. **Update Both Apps**
   - Update the connection string in:
     - Admin Dashboard (Settings page)
     - Your website backend (backend/.env file)

## 🚀 Quick Fix for Testing

If you want to test the app immediately without MongoDB Atlas, you can:

### Use Local MongoDB (Advanced)

1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use this connection string:
   ```
   mongodb://localhost:27017/jush
   ```
4. Update in Settings page

## ✅ Verify Connection

After updating the connection string:

1. Restart the admin dashboard
2. Look for "Connected to Database" (green) on login screen
3. If red, check:
   - Internet connection
   - Connection string is correct
   - MongoDB Atlas cluster is running
   - IP is whitelisted
   - Database user has correct permissions

## 🆘 Still Having Issues?

### Common Problems:

1. **ENOTFOUND Error**
   - ❌ Problem: Cluster URL is wrong
   - ✅ Solution: Get correct URL from MongoDB Atlas

2. **Authentication Failed**
   - ❌ Problem: Wrong username/password
   - ✅ Solution: Verify credentials in MongoDB Atlas

3. **Timeout Error**
   - ❌ Problem: IP not whitelisted
   - ✅ Solution: Add 0.0.0.0/0 to Network Access

4. **Connection Refused**
   - ❌ Problem: Cluster is paused or deleted
   - ✅ Solution: Resume or recreate cluster

## 📝 Important Notes

- **Use the SAME database** for both your website and admin dashboard
- The database name should be `jush` (or whatever you're using in your website)
- Keep your connection string secure - don't share it publicly
- The free tier (M0) is sufficient for testing and small businesses

## 🎯 Expected Result

Once connected correctly, you should see:
- ✅ Green "Connected to Database" on login screen
- ✅ Able to login with admin@jushhh.com / admin123
- ✅ Orders from your website appearing in the dashboard

---

**Need more help? Check the MongoDB Atlas documentation: https://docs.atlas.mongodb.com/**

