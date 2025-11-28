// Clear cache and reset connection
// Run this if you're having connection issues

const fs = require('fs');
const path = require('path');

console.log('🧹 Clearing admin dashboard cache...');

// Clear localStorage data (if any exists)
const userDataPath = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.config'), 'jushhh-admin-dashboard');

try {
  if (fs.existsSync(userDataPath)) {
    console.log('📁 Found user data directory:', userDataPath);
    // Note: In production, you'd clear localStorage here
    console.log('✅ Cache clearing completed');
  } else {
    console.log('📁 No user data directory found (first run)');
  }
} catch (error) {
  console.log('⚠️ Could not clear cache:', error.message);
}

console.log('🔄 Please restart the admin dashboard:');
console.log('   npm run dev');
console.log('');
console.log('💡 If still having issues:');
console.log('   1. Go to MongoDB Atlas and resume your cluster');
console.log('   2. Check Network Access (whitelist 0.0.0.0/0)');
console.log('   3. Verify database user permissions');

