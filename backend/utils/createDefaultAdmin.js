const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    // Check if any admin exists
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      console.log('🔧 Creating default admin user...');
      
      const defaultAdmin = new Admin({
        email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@jush.com',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
        name: 'JUSH Admin',
        role: 'admin',
        permissions: ['view_orders', 'update_orders', 'manage_admins', 'view_analytics']
      });

      await defaultAdmin.save();
      
      console.log('✅ Default admin created successfully!');
      console.log(`📧 Email: ${defaultAdmin.email}`);
      console.log(`🔑 Password: ${process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'}`);
      console.log('⚠️  Please change the password after first login!');
    } else {
      console.log('👤 Admin users already exist, skipping default admin creation');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

module.exports = createDefaultAdmin;
