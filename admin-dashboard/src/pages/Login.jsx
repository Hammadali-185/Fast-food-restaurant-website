import React, { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, isConnected }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await window.electronAPI.adminLogin({ email, password });

      if (result.success) {
        onLogin(result.admin);
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1
            className="text-6xl font-bold mb-2"
            style={{
              fontFamily: 'Dancing Script, cursive',
              color: 'var(--primary-red)',
              textShadow: '3px 3px 0px var(--accent-yellow)'
            }}
          >
            JUSHHH
          </h1>
          <p className="text-ui-gray-medium text-lg">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

          {/* Connection Status */}
          <div className={`mb-6 p-3 rounded-lg flex items-center gap-2 ${
            isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              {isConnected ? 'Connected to Database' : 'Database Disconnected'}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-500 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-ui-gray-medium text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white placeholder-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-red"
                  placeholder="admin@jush.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-ui-gray-medium text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white placeholder-ui-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-red"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isConnected}
              className="w-full bg-primary-red hover:bg-primary-red-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-6 p-4 bg-ui-gray-dark/50 rounded-lg">
            <p className="text-ui-gray-medium text-xs text-center">
              Default credentials: <br />
              <span className="text-white font-mono">admin@jush.com</span> / <span className="text-white font-mono">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

