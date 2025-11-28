# 🔧 MongoDB Connection Troubleshooting Guide

## Current Issue: Connection Timeout

Your MongoDB Atlas connection string is correct, but we're getting `queryTxt ETIMEOUT` errors.

## ✅ Your Correct Connection String

```
mongodb+srv://hammadk5802_db_user:UG2dlaAugAbZHTHG@cluster0.smk1uum.mongodb.net/jush?retryWrites=true&w=majority&appName=Cluster0
```

## 🚨 Common Causes & Solutions

### 1. **MongoDB Atlas Cluster is Paused** (Most Common)

**Problem:** Free tier clusters automatically pause after inactivity.

**Solution:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login to your account
3. Click "Database" in left sidebar
4. Find your cluster (should show "PAUSED" status)
5. Click "Resume" button
6. Wait 2-3 minutes for cluster to start
7. Try connecting again

### 2. **IP Address Not Whitelisted**

**Problem:** Your IP address is not allowed to connect.

**Solution:**
1. Go to MongoDB Atlas → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"
5. Wait 2-3 minutes for changes to take effect

### 3. **Database User Permissions**

**Problem:** User doesn't have proper permissions.

**Solution:**
1. Go to MongoDB Atlas → "Database Access"
2. Find user `hammadk5802_db_user`
3. Click "Edit" → "Built-in Role"
4. Select "Read and write to any database"
5. Click "Update User"

### 4. **Network/Firewall Issues**

**Problem:** Your network blocks MongoDB connections.

**Solution:**
- Try from a different network (mobile hotspot)
- Check if your firewall blocks port 27017
- Try from a different computer

### 5. **MongoDB Atlas Service Issues**

**Problem:** MongoDB Atlas is experiencing issues.

**Solution:**
- Check [MongoDB Atlas Status](https://status.cloud.mongodb.com/)
- Wait and try again later

## 🧪 Testing Steps

### Step 1: Check Cluster Status
1. Go to MongoDB Atlas
2. Verify cluster is "RUNNING" (not paused)
3. If paused, click "Resume"

### Step 2: Test Connection
```bash
# In admin-dashboard folder
node test-connection.js
```

### Step 3: Check Network Access
1. MongoDB Atlas → Network Access
2. Ensure 0.0.0.0/0 is whitelisted
3. If not, add it

### Step 4: Verify Database User
1. MongoDB Atlas → Database Access
2. Check `hammadk5802_db_user` exists
3. Verify it has "Read and write to any database" role

## 🚀 Quick Fix Commands

### Resume Cluster (if paused)
1. MongoDB Atlas → Database → Resume

### Whitelist IP
1. MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Test Connection
```bash
cd admin-dashboard
node test-connection.js
```

### Run Admin Dashboard
```bash
cd admin-dashboard
npm run dev
```

## 📱 Alternative: Use MongoDB Compass

If the admin dashboard still doesn't work, test with MongoDB Compass:

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use connection string: `mongodb+srv://hammadk5802_db_user:UG2dlaAugAbZHTHG@cluster0.smk1uum.mongodb.net/jush`
3. If Compass connects, the issue is with the admin dashboard
4. If Compass fails, the issue is with MongoDB Atlas setup

## 🎯 Expected Results

### ✅ Success
```
🔄 Testing MongoDB connection...
✅ MongoDB connected successfully!
📋 Available collections: [orders, admins]
✅ Connection test completed successfully!
```

### ❌ Still Failing
If you still get timeouts after checking all the above:

1. **Create a new MongoDB Atlas cluster** (takes 5 minutes)
2. **Use a different network** (mobile hotspot)
3. **Contact MongoDB Atlas support**

## 📞 Need Help?

1. Check MongoDB Atlas documentation
2. Try the MongoDB Community Forums
3. Create a new cluster if needed

---

**Most likely solution: Your cluster is paused. Go to MongoDB Atlas and click "Resume"!** 🚀
