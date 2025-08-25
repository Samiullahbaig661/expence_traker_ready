import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Component_css/signup_page.css'; // Separate CSS
import {signup} from "../auth"

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') calculatePasswordStrength(value);

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'confirmPassword' && formData.password) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.password ? 'Passwords do not match' : ''
      }));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[passwordStrength] || 'Very Weak';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ff4757', '#ff6b7a', '#ffa502', '#2ed573', '#1dd1a1'];
    return colors[passwordStrength] || '#ff4757';
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2) newErrors.firstName = 'Minimum 2 characters required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) newErrors.firstName = 'Only letters and spaces allowed';

    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    else if (formData.lastName.trim().length < 2) newErrors.lastName = 'Minimum 2 characters required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) newErrors.lastName = 'Only letters and spaces allowed';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim()))
      newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (passwordStrength < 4) newErrors.password = 'Please create a stronger password';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

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
      await signup(formData.firstName, formData.lastName, formData.email, formData.password);
     setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setPasswordStrength(0);
      // Redirect to Sign In page
      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error);
      setSubmitStatus('error');
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className="signup-container">
      {submitStatus && (
        <div className={`toast-notification ${submitStatus}`}>
          <div className="toast-content">
            <div className={`toast-icon ${submitStatus}`}>
              {submitStatus === 'success' ? '✓' : '⚠'}
            </div>
            <div className="toast-text">
              <div className="toast-title">{submitStatus === 'success' ? 'Success!' : 'Error!'}</div>
              <div className="toast-message">
                {submitStatus === 'success'
                  ? 'Your account has been created successfully! 🎉'
                  : 'Please check your information and try again.'}
              </div>
            </div>
          </div>
          <div className={`toast-progress ${submitStatus}`}></div>
        </div>
      )}

      <div className="form-wrapper">
        <div className="form-header">
          <h1>Create Your Account</h1>
          <p>Join thousands of users and start your journey today</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('firstName')}
                onBlur={handleBlur}
                className={`form-input ${focusedField === 'firstName' ? 'focused' : ''} ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('lastName')}
                onBlur={handleBlur}
                className={`form-input ${focusedField === 'lastName' ? 'focused' : ''} ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`form-input ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              className={`form-input ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''}`}
              placeholder="Create a strong password"
            />
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className="strength-fill" style={{ width: `${(passwordStrength / 5) * 100}%`, backgroundColor: getPasswordStrengthColor() }}></div>
                </div>
                <div className="strength-label" style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthLabel()}
                </div>
              </div>
            )}
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={handleBlur}
              className={`form-input ${focusedField === 'confirmPassword' ? 'focused' : ''} ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? <div className="loading-spinner"></div> : 'Create Account'}
          </button>

          <div className="form-footer">
            <p>Already have an account? <span onClick={() => navigate('/signin')} className="login-link">Sign in</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
