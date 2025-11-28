import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
      setIsAuthenticated(true);
    }
    
    // Connect to MongoDB
    connectToDatabase();
    
    setLoading(false);
  }, []);

  const connectToDatabase = async () => {
    try {
      // Try to get MongoDB URI from localStorage, or use the actual MongoDB Atlas URI
      const mongoURI = localStorage.getItem('mongoURI') || 
        'mongodb+srv://<username>:<password>@<cluster-url>/jush?retryWrites=true&w=majority&appName=<clusterName>';
      
      console.log('Attempting to connect to MongoDB...');
      const result = await window.electronAPI.connectMongoDB(mongoURI);
      
      if (result.success) {
        setIsConnected(true);
        console.log('✅ Connected to MongoDB successfully');
        
        // Wait a moment for connection to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create default admin if needed
        console.log('🔍 Creating default admin...');
        const adminResult = await window.electronAPI.createDefaultAdmin();
        if (adminResult.success) {
          console.log('✅ Default admin ready:', adminResult.message);
        } else {
          console.error('❌ Admin creation failed:', adminResult.error);
        }
      } else {
        console.error('❌ MongoDB connection failed:', result.error);
        setIsConnected(false);
        
        // Show user-friendly error
        if (result.error.includes('ENOTFOUND')) {
          console.error('💡 Tip: Check if your MongoDB Atlas cluster URL is correct');
          console.error('💡 Tip: Verify your internet connection');
        } else if (result.error.includes('ETIMEOUT')) {
          console.error('💡 Tip: Your MongoDB Atlas cluster might be paused');
          console.error('💡 Tip: Go to MongoDB Atlas and click "Resume"');
        }
      }
    } catch (error) {
      console.error('❌ Database connection error:', error);
      setIsConnected(false);
    }
  };

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    setIsAuthenticated(true);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const handleLogout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-red mx-auto mb-4"></div>
          <p className="text-ui-gray-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isConnected={isConnected} />;
  }

  return (
    <div className="flex h-screen bg-background-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header admin={admin} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

