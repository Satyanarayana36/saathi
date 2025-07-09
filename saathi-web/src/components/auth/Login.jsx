import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const demoCredentials = [
    { label: 'Demo User', email: 'user@demo.com', password: 'demo123' },
    { label: 'Demo Admin', email: 'admin@demo.com', password: 'admin123' }
  ];

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="card bg-white/90 backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to continue your safety journey</p>
          </div>

          {/* Demo Credentials */}
          <motion.div
            className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Quick Demo Access:</h3>
            <div className="space-y-2">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(demo.email, demo.password)}
                  className="w-full text-left text-sm bg-white/70 hover:bg-white p-2 rounded-lg transition-colors text-blue-700"
                >
                  <span className="font-medium">{demo.label}:</span> {demo.email}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-primary-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  className="mt-2 text-sm text-red-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-primary-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  className="mt-2 text-sm text-red-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => toast.info('Password reset feature coming soon!')}
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Register Link */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-8 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>Encrypted Data</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Login;