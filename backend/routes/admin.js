const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Get current admin profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
      createdAt: req.admin.createdAt
    }
  });
});

// Update admin profile
router.patch('/profile', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (name) {
      req.admin.name = name;
    }

    await req.admin.save();

    res.json({
      success: true,
      admin: {
        id: req.admin._id,
        email: req.admin.email,
        name: req.admin.name,
        role: req.admin.role,
        lastLogin: req.admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.patch('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    // Verify current password
    const isCurrentPasswordValid = await req.admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    req.admin.password = newPassword;
    await req.admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Get all admins (super admin only)
router.get('/users', async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const admins = await Admin.find({}, { password: 0 })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      admins
    });

  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Create new admin (super admin only)
router.post('/users', async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { email, password, name, role = 'staff' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const newAdmin = new Admin({
      email,
      password,
      name,
      role
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        isActive: newAdmin.isActive,
        createdAt: newAdmin.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Update admin (super admin only)
router.patch('/users/:id', async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, role, isActive } = req.body;
    const adminId = req.params.id;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    if (name) admin.name = name;
    if (role) admin.role = role;
    if (typeof isActive === 'boolean') admin.isActive = isActive;

    await admin.save();

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isActive: admin.isActive
      }
    });

  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Delete admin (super admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const adminId = req.params.id;

    // Prevent self-deletion
    if (adminId === req.admin._id.toString()) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

module.exports = router;
