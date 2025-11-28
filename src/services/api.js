import axios from 'axios';
import { io } from 'socket.io-client';

class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.token = localStorage.getItem('admin_token');
    this.socket = null;
    
    // Create axios instance
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to include token
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication methods
  async login(email, password) {
    try {
      const response = await this.api.post('/auth/login', { email, password });
      const { token, admin } = response.data;
      
      this.token = token;
      localStorage.setItem('admin_token', token);
      
      return { success: true, admin };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async verifyToken() {
    try {
      const response = await this.api.get('/auth/verify');
      return { success: true, admin: response.data.admin };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Token verification failed' };
    }
  }

  // Order methods
  async getOrders(params = {}) {
    try {
      const response = await this.api.get('/orders', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch orders' 
      };
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await this.api.get(`/orders/${orderId}`);
      return { success: true, order: response.data.order };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch order' 
      };
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const response = await this.api.patch(`/orders/${orderId}/status`, { status });
      return { success: true, order: response.data.order };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update order status' 
      };
    }
  }

  async getOrderStats() {
    try {
      const response = await this.api.get('/orders/stats/overview');
      return { success: true, stats: response.data.stats };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch statistics' 
      };
    }
  }

  async deleteOrder(orderId) {
    try {
      await this.api.delete(`/orders/${orderId}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to delete order' 
      };
    }
  }

  // Admin methods
  async getProfile() {
    try {
      const response = await this.api.get('/admin/profile');
      return { success: true, admin: response.data.admin };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch profile' 
      };
    }
  }

  async updateProfile(data) {
    try {
      const response = await this.api.patch('/admin/profile', data);
      return { success: true, admin: response.data.admin };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update profile' 
      };
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      await this.api.patch('/admin/change-password', { currentPassword, newPassword });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to change password' 
      };
    }
  }

  // WebSocket connection for real-time updates
  connectSocket(onNewOrder, onOrderUpdate, onOrderDeleted) {
    if (this.socket) {
      this.socket.disconnect();
    }

    const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    this.socket = io(socketURL, {
      auth: {
        token: this.token
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socket.emit('join-admin-room');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('new-order', (order) => {
      console.log('New order received:', order);
      if (onNewOrder) onNewOrder(order);
    });

    this.socket.on('order-updated', (order) => {
      console.log('Order updated:', order);
      if (onOrderUpdate) onOrderUpdate(order);
    });

    this.socket.on('order-deleted', (data) => {
      console.log('Order deleted:', data);
      if (onOrderDeleted) onOrderDeleted(data);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.api.get('/health');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Health check failed' 
      };
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
