import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, signInWithGoogle } from '../auth'; // Import Firebase auth functions
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import '../Component_css/Signin_page.css'; // Fixed CSS import

const SigninPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Set auth persistence based on rememberMe
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await login(formData.email, formData.password);
      setSubmitStatus('success');
      setFormData({ email: '', password: '' });
      setRememberMe(false);
      // No manual redirect needed; App.jsx handles /total-transaction
    } catch (error) {
      console.error('Login error:', error);
      setSubmitStatus('error');
      let errorMessage = 'Failed to sign in. Please try again.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithGoogle();
      setSubmitStatus('success');
      // No manual redirect needed; App.jsx handles /total-transaction
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setSubmitStatus('error');
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Google Sign-In was cancelled.';
      }
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setSubmitStatus('forgot');
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const getToastMessage = () => {
    switch (submitStatus) {
      case 'success':
        return { title: 'Welcome Back!', message: 'Redirecting...', type: 'success' };
      case 'error':
        return { title: 'Error', message: errors.form || 'Please try again.', type: 'error' };
      case 'forgot':
        return { title: 'Reset Link Sent', message: 'Check your email', type: 'info' };
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      {submitStatus && (
        <div className={`toast-notification ${getToastMessage().type}`}>
          <div className="toast-content">
            <div className={`toast-icon ${getToastMessage().type}`}>
              {getToastMessage().type === 'success' && '✓'}
              {getToastMessage().type === 'error' && '⚠'}
              {getToastMessage().type === 'info' && 'ℹ'}
            </div>
            <div className="toast-text">
              <div className="toast-title">{getToastMessage().title}</div>
              <div className="toast-message">{getToastMessage().message}</div>
            </div>
          </div>
          <div className={`toast-progress ${getToastMessage().type}`}></div>
        </div>
      )}

      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🚀</div>
            <span className="logo-text">AppName</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <div className="social-login">
          <button className="social-btn google" onClick={handleGoogleSignIn} disabled={isSubmitting}>
            <div className="social-icon">G</div>Continue with Google
          </button>
          <button className="social-btn github" onClick={() => alert('GitHub Sign-In not implemented')} disabled={isSubmitting}>
            <div className="social-icon">⚡</div>Continue with GitHub
          </button>
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with email</span>
          <div className="divider-line"></div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`form-input ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                className={`form-input ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} disabled={isSubmitting}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
            {errors.form && <div className="error-message">{errors.form}</div>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={isSubmitting} />
              Remember me
            </label>
            <button type="button" className="forgot-link" onClick={handleForgotPassword} disabled={isSubmitting}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className={`login-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/signup" className="signup-link">Create one</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;