// Direct MongoDB connection test
// This bypasses any caching or localStorage issues

const mongoose = require('mongoose');

// Your actual MongoDB connection string
const MONGODB_URI = 'mongodb+srv://hammadk5802_db_user:UG2dlaAugAbZHTHG@cluster0.smk1uum.mongodb.net/jush?retryWrites=true&w=majority&appName=Cluster0';

async function directTest() {
  console.log('🔄 Direct MongoDB connection test...');
  console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
  
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000
    });
    
    console.log('✅ Connected successfully!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📋 Collections:', collections.map(c => c.name));
    
    // Test admin collection
    const adminCollection = db.collection('admins');
    const adminCount = await adminCollection.countDocuments();
    console.log('👤 Admin users:', adminCount);
    
    // Test orders collection
    const ordersCollection = db.collection('orders');
    const orderCount = await ordersCollection.countDocuments();
    console.log('📦 Orders:', orderCount);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully!');
    console.log('');
    console.log('🎯 Your MongoDB Atlas is working correctly!');
    console.log('💡 The admin dashboard should work now.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ETIMEOUT') || error.message.includes('ENOTFOUND')) {
      console.log('');
      console.log('🚨 Most likely causes:');
      console.log('1. MongoDB Atlas cluster is PAUSED');
      console.log('2. IP address not whitelisted');
      console.log('3. Network/firewall blocking connection');
      console.log('');
      console.log('🔧 Quick fixes:');
      console.log('1. Go to MongoDB Atlas → Resume cluster');
      console.log('2. Go to Network Access → Add 0.0.0.0/0');
      console.log('3. Try from different network (mobile hotspot)');
    }
    
    process.exit(1);
  }
}

directTest();
