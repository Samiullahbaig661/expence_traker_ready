import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginSignupToggle = () => {
  const [activeMode, setActiveMode] = useState('login'); // 'login' or 'signup'
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModeSwitch = (mode) => {
    if (mode !== activeMode && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveMode(mode);
        setIsAnimating(false);
      }, 150);
    }
  };

  return (
    <div className="toggle-container">
      <div className="toggle-wrapper style-5">
        <div className="morph-toggle">
          <div className={`morph-bg ${activeMode}`}></div>
        <Link 
            to="/signin" 
            className={`morph-btn ${activeMode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('login')}
          >
            <div className="morph-content">
              <div className="morph-icon-wrapper">
                <span className="morph-icon">🔑</span>
              </div>
              <div className="morph-text">
                <span className="morph-title">SignIn</span>
                <span className="morph-desc">Welcome back!</span>
              </div>
            </div>
          </Link>

          <Link 
            to="/signup" 
            className={`morph-btn ${activeMode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('signup')}
          >
            <div className="morph-content">
              <div className="morph-icon-wrapper">
                <span className="morph-icon">🎯</span>
              </div>
              <div className="morph-text">
                <span className="morph-title">Sign Up</span>
                <span className="morph-desc">Join our community!</span>
              </div>
            </div>
          </Link>

        </div>
      </div>

    

      <style jsx>{`
        .toggle-container {
          // min-height: 100vh;
          // background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          // padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          // display: flex;
          // flex-direction: column;
          gap: 60px;
          align-items: center;
          margin-top : 25px;
        }

        .toggle-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          // gap: 20px;
          // width: 100%;
          // max-width: 500px;
        }

        .toggle-wrapper h3 {
          color: white;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 10px;
        }

        /* Style 1: Modern Tab Toggle */
        .tab-toggle {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 6px;
          display: flex;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .tab-slider {
          position: absolute;
          top: 6px;
          left: 6px;
          width: calc(50% - 6px);
          height: calc(100% - 12px);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .tab-slider.signup {
          transform: translateX(100%);
        }

        .tab-btn {
          flex: 1;
          padding: 16px 24px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 12px;
          transition: color 0.3s ease;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-btn.active {
          color: white;
        }

        .tab-icon {
          font-size: 16px;
        }

        /* Style 2: Glassmorphism Toggle */
        .glass-toggle {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(30px);
          border-radius: 24px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 8px;
        }

        .glass-slider {
          position: absolute;
          top: 8px;
          left: 8px;
          width: calc(50% - 12px);
          height: calc(100% - 16px);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 18px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-slider.signup {
          transform: translateX(calc(100% + 8px));
        }

        .glass-btn {
          flex: 1;
          padding: 20px 16px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 18px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .glass-icon {
          font-size: 24px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .glass-btn.active .glass-icon {
          opacity: 1;
        }

        .glass-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .main-text {
          color: white;
          font-size: 16px;
          font-weight: 600;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .glass-btn.active .main-text {
          opacity: 1;
        }
       
        .morph-btn {
              text-decoration: none !important; /* underline hatayega */
               color: inherit; /* text ka color button wale style se match karega */
           }
        .sub-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        /* Style 3: Neon Glow Toggle */
        .neon-toggle {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neon-btn {
          padding: 18px 30px;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .neon-btn.login {
          border-color: #00d4ff;
        }

        .neon-btn.signup {
          border-color: #ff006e;
        }

        .neon-btn.active.login {
          box-shadow: 
            0 0 20px #00d4ff,
            0 0 40px #00d4ff,
            inset 0 0 20px rgba(0, 212, 255, 0.1);
          background: rgba(0, 212, 255, 0.1);
        }

        .neon-btn.active.signup {
          box-shadow: 
            0 0 20px #ff006e,
            0 0 40px #ff006e,
            inset 0 0 20px rgba(255, 0, 110, 0.1);
          background: rgba(255, 0, 110, 0.1);
        }

        .neon-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .neon-icon {
          font-size: 18px;
        }

        .neon-text {
          color: white;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* Style 4: 3D Flip Toggle */
        .flip-toggle {
          perspective: 1000px;
          width: 300px;
          height: 200px;
        }

        .flip-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .flip-container.signup {
          transform: rotateY(180deg);
        }

        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          overflow: hidden;
        }

        .flip-back {
          transform: rotateY(180deg);
        }

        .flip-btn {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: white;
          transition: transform 0.2s ease;
        }

        .flip-btn:hover {
          transform: scale(1.05);
        }

        .flip-icon {
          font-size: 32px;
        }

        .flip-title {
          font-size: 20px;
          font-weight: 700;
        }

        .flip-subtitle {
          font-size: 12px;
          opacity: 0.8;
        }

        /* Style 5: Gradient Morphing Toggle */
        .morph-toggle {
          position: relative;
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 2px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .morph-bg {
          position: absolute;
          top: 8px;
          left: 8px;
          width: calc(50% - 12px);
          height: calc(100% - 16px);
          border-radius: 18px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
        }

        .morph-bg.login {
          opacity: 1;
          background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        }

        .morph-bg.signup {
          opacity: 1;
          background: linear-gradient(135deg, #ff006e 0%, #cc0055 100%);
          transform: translateX(calc(100% + 8px));
        }

        .morph-btn {
          flex: 1;
          padding: 10px 6px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 18px;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .morph-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .morph-icon-wrapper {
          width: 30px;
          height: 30px;
          margin-left: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .morph-btn.active .morph-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .morph-icon {
          font-size: 18px;
        }

        .morph-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .morph-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .morph-btn.active .morph-title {
          opacity: 1;
        }

        .morph-desc {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        /* Current Mode Display */
        .current-mode {
          margin-top: 40px;
        }

        .mode-display {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .mode-display.login {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(0, 212, 255, 0.05);
        }

        .mode-display.signup {
          border-color: rgba(255, 0, 110, 0.3);
          background: rgba(255, 0, 110, 0.05);
        }

        .mode-icon {
          font-size: 32px;
        }

        .mode-text h4 {
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .mode-text p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .toggle-container {
            padding: 20px 10px;
            gap: 40px;
          }

          .toggle-wrapper {
            max-width: 100%;
          }

          .neon-toggle {
            flex-direction: column;
            gap: 12px;
          }

          .flip-toggle {
            width: 250px;
            height: 160px;
          }

          .glass-btn, .morph-btn {
            padding: 16px 12px;
          }

          .morph-content, .glass-btn {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSignupToggle;