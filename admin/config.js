// Admin Panel Configuration
// This file should NOT be committed to Git
// Add 'admin/config.js' to .gitignore

const ADMIN_CONFIG = {
    // Update these credentials and keep this file private
    credentials: [
        {
            username: 'admin-beliz',
            password: 'Beliz832.', // Updated password
            role: 'admin',
            lastLogin: null
        }
    ],
    
    // Security settings
    security: {
        maxLoginAttempts: 3,
        lockoutDuration: 15, // minutes
        sessionTimeout: 120 // minutes
    },
    
    // Email settings (for future use)
    email: {
        smtp: {
            host: '',
            port: 587,
            secure: false,
            user: '',
            pass: ''
        }
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.ADMIN_CONFIG = ADMIN_CONFIG;
} 