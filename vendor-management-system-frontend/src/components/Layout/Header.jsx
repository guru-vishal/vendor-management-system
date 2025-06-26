import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed:');
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span>📋 Vendor Management System</span>
          </div>
          <div className="user-info">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt={user?.name}
              className="user-avatar"
            />
            <span>{user?.name}</span>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;