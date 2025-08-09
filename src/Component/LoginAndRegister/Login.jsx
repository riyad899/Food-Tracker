import React, { useContext, useState } from 'react';
import GoogleButton from 'react-google-button';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';
import { useTheme } from '../../contexts/ThemeContext';

export const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      toast.success('🎉 Successfully logged in!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      let errorMessage = 'Login failed';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'User not found';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      }

      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await googleLogin();
      console.log('Google login user data:', {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid
      });

      toast.success('🎉 Google login successful!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      let errorMessage = 'Google login failed';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled by user';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked by browser. Please allow popups and try again';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Login request cancelled';
      }

      console.error('Google login error:', err);
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        min-h-screen flex items-center justify-center p-4 transition-all duration-300
        ${isDark
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-[#124A2F] to-[#0D3521]'
        }
      `}
    >
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 mt-[100px]">
        {/* Left side - Branding/Illustration */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="hidden lg:block flex-1 text-center"
        >
          <motion.img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            className="w-full max-w-md mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.h1
            className={`
              text-4xl font-bold mt-6
              ${isDark ? 'text-gray-100' : 'text-white'}
            `}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            className={`
              text-lg mt-2
              ${isDark ? 'text-gray-300' : 'text-gray-200'}
            `}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to access your account
          </motion.p>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <form onSubmit={handleLogin} className={`
            rounded-2xl shadow-xl overflow-hidden
            ${isDark ? 'bg-gray-800' : 'bg-white'}
          `}>
            <div className={`
              p-1
              ${isDark
                ? 'bg-gradient-to-r from-gray-700 to-gray-600'
                : 'bg-gradient-to-r from-[#124A2F] to-[#1a6d45]'
              }
            `}></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8"
            >
              <motion.h2
                variants={itemVariants}
                className={`
                  text-3xl font-bold text-center mb-8
                  ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}
              >
                Sign In
              </motion.h2>

              {error && (
                <motion.div
                  variants={itemVariants}
                  className={`
                    mb-4 p-3 rounded-lg text-sm
                    ${isDark
                      ? 'bg-red-900/50 text-red-200 border border-red-700'
                      : 'bg-red-100 text-red-700'
                    }
                  `}
                >
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mb-6">
                <label className={`
                  block text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaUser className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Email
                </label>
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: isDark
                      ? "0 0 0 2px rgba(34, 197, 94, 0.5)"
                      : "0 0 0 2px rgba(18, 74, 47, 0.5)"
                  }}
                  type="email"
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-400 focus:border-green-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                    }
                  `}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className={`
                  block text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaLock className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: isDark
                        ? "0 0 0 2px rgba(34, 197, 94, 0.5)"
                        : "0 0 0 2px rgba(18, 74, 47, 0.5)"
                    }}
                    type={showPassword ? "text" : "password"}
                    className={`
                      w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all pr-10
                      ${isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-400 focus:border-green-400'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                      }
                    `}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={`
                      absolute inset-y-0 right-0 pr-3 flex items-center transition-colors
                      ${isDark
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-500 hover:text-[#124A2F]'
                      }
                    `}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-end mb-6">
                <NavLink
                  to="/forgot-password"
                  className={`
                    text-sm transition-colors
                    ${isDark
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-[#124A2F] hover:text-[#0D3521]'
                    }
                  `}
                >
                  Forgot password?
                </NavLink>
              </motion.div>

              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: isDark
                    ? "0 4px 12px rgba(34, 197, 94, 0.3)"
                    : "0 4px 12px rgba(18, 74, 47, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-70
                  ${isDark
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600'
                    : 'bg-gradient-to-r from-[#124A2F] to-[#1a6d45] text-white'
                  }
                `}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Login'}
              </motion.button>

              <motion.div variants={itemVariants} className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className={`
                    w-full border-t
                    ${isDark ? 'border-gray-600' : 'border-gray-300'}
                  `}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`
                    px-2
                    ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}
                  `}>Or continue with</span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center"
              >
                <GoogleButton
                  onClick={handleGoogleSignIn}
                  className="w-full flex justify-center"
                  disabled={loading}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`
                  text-center mt-6
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}
              >
                Don't have an account?{' '}
                <NavLink
                  to="/register"
                  className={`
                    font-medium transition-colors
                    ${isDark
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-[#124A2F] hover:text-[#0D3521]'
                    }
                  `}
                >
                  Sign up
                </NavLink>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};