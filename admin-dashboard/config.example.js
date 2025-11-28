// Configuration file for JUSHHH Admin Dashboard
// Copy this file to config.js and update with your actual values

export const config = {
  // MongoDB Atlas Connection String
  // Get this from your MongoDB Atlas dashboard
  MONGODB_URI: 'mongodb+srv://<username>:<password>@<cluster-url>/jush?retryWrites=true&w=majority',
  
  // Default Admin Credentials
  // These will be created automatically if they don't exist
  DEFAULT_ADMIN: {
    email: 'admin@jush.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  
  // JWT Configuration
  JWT_SECRET: 'jush-admin-super-secret-key-2024',
  JWT_EXPIRE: '7d',
  
  // App Configuration
  NODE_ENV: 'development'
};

// Instructions:
// 1. Copy this file: cp config.example.js config.js
// 2. Update the MONGODB_URI with your actual MongoDB Atlas connection string
// 3. The connection string should look like:
//    mongodb+srv://username:password@your-cluster.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
// 4. Make sure your MongoDB Atlas cluster is running and accessible
// 5. Ensure your IP is whitelisted in MongoDB Atlas Network Access
