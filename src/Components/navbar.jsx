import React, { useState, useEffect } from 'react';
import { Home, DollarSign, PieChart, Settings, Menu, X, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Component_css/navbar.css';
import LoginSignupToggle from '../button/login/signupbutt';
import LogoutButton from '../button/logout';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: DollarSign, label: 'Add Transaction', href: '/add-transaction' },
    { icon: PieChart, label: 'Transactions', href: '/total-transaction' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <nav className="navbar">
      <div className="background-overlay">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo-container">
            <div className="logo-icon">
              <DollarSign size={24} color="#8b5cf6" />
            </div>
            <span className="logo-text">ExpenseTracker</span>
          </div>

          {!isMobile && (
            <div className="desktop-menu">
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} className="nav-item">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {!isMobile && (
            <div className="user-actions">
              <button className="notification-btn">
                <Bell size={24} />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-avatar">
                <User size={20} color="white" />
              </div>
              {isAuthenticated ? (<LogoutButton onClick={onLogout}></LogoutButton> 
              ) : (
                <LoginSignupToggle />
              )}
            </div>
          )}

          {isMobile && (
            <button
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {isMobile && (
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="user-avatar">
                  <User size={20} color="white" />
                </div>
                <span>Profile</span>
              </div>
              <button className="notification-btn">
                <Bell size={24} />
                <span className="notification-badge">3</span>
              </button>
              {isAuthenticated ? (
                <button className="logout-btn" >
                  Logout
                </button>
              ) : (
                <LoginSignupToggle />
                
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;