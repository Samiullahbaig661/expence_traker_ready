import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth from firebase.js
import { useNavigate } from 'react-router-dom'; // Optional: for redirect

const LogoutButton = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Optional: for redirect

  const handleClick = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating logout...');
      await signOut(auth);
      console.log('User logged out successfully');
      if (onLogout) onLogout();
      navigate('/signin'); // Redirect to signin page
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="logout-btn"
      onClick={handleClick}
      disabled={isLoading}
    >
      <div className="btn-content">
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Logout</span>
          </>
        )}
      </div>
      
      <style jsx>{`
        .logout-btn {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
          min-width: 140px;
          height: 50px;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
          background: linear-gradient(45deg, #dc2626, #b91c1c);
        }
        
        .logout-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }
        
        .logout-btn:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
        
        .logout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .logout-btn:hover::before {
          left: 100%;
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }
        
        .logout-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }
        
        .logout-btn:hover .logout-icon {
          transform: translateX(3px);
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .btn-content span {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </button>
  );
};

export default LogoutButton;