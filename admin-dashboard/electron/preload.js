const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // MongoDB
  connectMongoDB: (uri) => ipcRenderer.invoke('connect-mongodb', uri),
  
  // Authentication
  adminLogin: (credentials) => ipcRenderer.invoke('admin-login', credentials),
  createDefaultAdmin: () => ipcRenderer.invoke('create-default-admin'),
  
  // Orders
  getOrders: (filters) => ipcRenderer.invoke('get-orders', filters),
  updateOrderStatus: (data) => ipcRenderer.invoke('update-order-status', data),
  watchOrders: () => ipcRenderer.invoke('watch-orders'),
  
  // Analytics
  getAnalytics: (dateRange) => ipcRenderer.invoke('get-analytics', dateRange),
  
  // Notifications
  showNotification: (data) => ipcRenderer.invoke('show-notification', data),
  
  // Platform info
  platform: process.platform
});

