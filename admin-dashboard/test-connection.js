// Test MongoDB Connection Script
// Run this to test if your MongoDB connection string works

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://<username>:<password>@<cluster-url>/jush?retryWrites=true&w=majority&appName=<clusterName>';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in log
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test basic operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check if your MongoDB Atlas cluster is running');
      console.log('2. Verify the cluster URL is correct');
      console.log('3. Make sure your IP is whitelisted in MongoDB Atlas');
      console.log('4. Check your internet connection');
    }
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Authentication tips:');
      console.log('1. Verify the database username');
      console.log('2. Verify the database password');
      console.log('3. Check if the database user has proper permissions');
    }
    
    process.exit(1);
  }
}

testConnection();
