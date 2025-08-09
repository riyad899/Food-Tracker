import React, { useContext, useState } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';
import { useTheme } from '../../contexts/ThemeContext';

const authAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  },
  item: {
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
  },
  card: {
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
  }
};

export const Registration = () => {
  const { createUser, setUser, googleLogin } = useContext(AuthContext);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkPasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const calculatePasswordStrength = () => {
    let strength = 0;
    if (passwordRequirements.length) strength += 20;
    if (passwordRequirements.uppercase) strength += 20;
    if (passwordRequirements.lowercase) strength += 20;
    if (passwordRequirements.number) strength += 20;
    if (passwordRequirements.specialChar) strength += 20;
    return strength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, confirmPass, ...userProfile } = Object.fromEntries(formData.entries());

    // Clear previous errors
    setErrorMessage('');
    setIsLoading(true);

    // Client-side validation
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPass) {
      setErrorMessage("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      setErrorMessage("Password doesn't meet all requirements");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create user with Firebase authentication
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // 2. Prepare complete user profile data for backend
      const completeProfile = {
        ...userProfile,
        email,
        uid: user.uid, // Firebase UID
        createdAt: new Date().toISOString(),
        role: 'user',
        status: 'active',
        // Include any other fields your backend expects
      };

      // 3. Send data to Node.js backend
      const backendResponse = await axios.post('https://server-sepia-nine.vercel.app/users', completeProfile);

      if (backendResponse.status === 201) {
        // Set user in context if needed
        setUser(user);

        toast.success('🎉 Successfully registered!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error('Failed to save user data to backend');
      }
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';

      if (error.response) {
        // Handle backend-specific errors
        if (error.response.status === 409) {
          errorMessage = 'User already exists in our system';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.code) {
        // Handle Firebase errors
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email already in use. Please use a different email.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address. Please enter a valid email.';
        }
      }

      setErrorMessage(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await googleLogin();
      const user = result.user;

      // Debug: Log user data to see what's available
      console.log('Google user data:', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      });

      // Create user profile with Google data
      const userProfile = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        provider: 'google',
        createdAt: new Date().toISOString(),
        role: 'user',
        status: 'active'
      };

      // Send Google user data to backend
      const response = await axios.post('https://server-sepia-nine.vercel.app/users', userProfile);

      if (response.status === 201 || response.status === 200) {
        toast.success('🎉 Google registration successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error('Failed to save Google user data to backend');
      }
    } catch (error) {
      let errorMessage = 'Google registration failed';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Registration cancelled by user';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked by browser. Please allow popups and try again';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Registration request cancelled';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Google authentication error:', error);
      setErrorMessage(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength();
  const strengthColor = passwordStrength < 40 ? 'red' :
                       passwordStrength < 70 ? 'orange' : 'green';

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
      <ToastContainer />
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 mt-[150px] mb-[20px]">
        {/* Left side - Branding/Illustration */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="hidden lg:block flex-1 text-center"
        >
          <motion.img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
            alt="Registration Illustration"
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
            Create Your Account
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
            Join us today and get started
          </motion.p>
        </motion.div>

        {/* Right side - Registration Form */}
        <motion.div
          variants={authAnimations.card}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <form onSubmit={handleRegister} className={`
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
              variants={authAnimations.container}
              initial="hidden"
              animate="visible"
              className="p-8"
            >
              <motion.h2
                variants={authAnimations.item}
                className={`
                  text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2
                  ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}
              >
                <FaUserPlus className={`
                  ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                `} />
                Register
              </motion.h2>

              {errorMessage && (
                <motion.div
                  variants={authAnimations.item}
                  className={`
                    mb-4 p-3 rounded-lg text-sm
                    ${isDark
                      ? 'bg-red-900/50 text-red-200 border border-red-700'
                      : 'bg-red-100 text-red-700'
                    }
                  `}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errorMessage}
                </motion.div>
              )}

              <motion.div variants={authAnimations.item} className="mb-4">
                <label className={`
                  block text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaUser className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Full Name
                </label>
                <motion.input
                  name="name"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: isDark
                      ? "0 0 0 2px rgba(34, 197, 94, 0.5)"
                      : "0 0 0 2px rgba(18, 74, 47, 0.5)"
                  }}
                  type="text"
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-400 focus:border-green-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                    }
                  `}
                  placeholder="John Doe"
                  required
                />
              </motion.div>

              <motion.div variants={authAnimations.item} className="mb-4">
                <label className={`
                  block text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaEnvelope className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Email Address
                </label>
                <motion.input
                  name="email"
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
                  required
                />
              </motion.div>

              <motion.div variants={authAnimations.item} className="mb-4">
                <label className={`
                  block text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaEnvelope className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Photo URL (Optional)
                </label>
                <motion.input
                  name="photoURL"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: isDark
                      ? "0 0 0 2px rgba(34, 197, 94, 0.5)"
                      : "0 0 0 2px rgba(18, 74, 47, 0.5)"
                  }}
                  type="url"
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-400 focus:border-green-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                    }
                  `}
                  placeholder="https://example.com/photo.jpg"
                />
              </motion.div>

              <motion.div variants={authAnimations.item} className="mb-4">
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
                    name="password"
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
                    required
                    onChange={(e) => checkPasswordRequirements(e.target.value)}
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mt-2">
                  <div className={`
                    w-full rounded-full h-2.5
                    ${isDark ? 'bg-gray-600' : 'bg-gray-200'}
                  `}>
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        passwordStrength < 40
                          ? 'bg-red-500'
                          : passwordStrength < 70
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <div className={`
                    mt-2 text-xs
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside">
                      <li className={passwordRequirements.length ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                        At least 8 characters
                      </li>
                      <li className={passwordRequirements.uppercase ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                        At least one uppercase letter
                      </li>
                      <li className={passwordRequirements.lowercase ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                        At least one lowercase letter
                      </li>
                      <li className={passwordRequirements.number ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                        At least one number
                      </li>
                      <li className={passwordRequirements.specialChar ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={authAnimations.item} className="mb-4">
                <label className={`
                  text-sm font-medium mb-2 flex items-center
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  <FaLock className={`
                    mr-2
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `} />
                  Confirm Password
                </label>
                <div className="relative">
                  <motion.input
                    name="confirmPass"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: isDark
                        ? "0 0 0 2px rgba(34, 197, 94, 0.5)"
                        : "0 0 0 2px rgba(18, 74, 47, 0.5)"
                    }}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`
                      w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all pr-10
                      ${isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-400 focus:border-green-400'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                      }
                    `}
                    placeholder="••••••••"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={authAnimations.item} className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className={`
                    mr-2 rounded transition-colors
                    ${isDark
                      ? 'text-green-400 focus:ring-green-400 bg-gray-700 border-gray-600'
                      : 'text-[#124A2F] focus:ring-[#124A2F]'
                    }
                  `}
                  required
                />
                <label htmlFor="terms" className={`
                  text-sm
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  I agree to the <a href="/terms" className={`
                    transition-colors hover:underline
                    ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                  `}>Terms and Conditions</a>
                </label>
              </motion.div>

              <motion.button
                type="submit"
                variants={authAnimations.item}
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
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              <motion.div
                variants={authAnimations.item}
                className="flex flex-col items-center mt-6"
              >
                <div className="relative w-full my-6">
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
                </div>

                <GoogleButton
                  onClick={handleGoogleSignIn}
                  className="w-full flex justify-center"
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div
                variants={authAnimations.item}
                className={`
                  text-center mt-6
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}
              >
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className={`
                    font-medium transition-colors
                    ${isDark
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-[#124A2F] hover:text-[#0D3521]'
                    }
                  `}
                >
                  Sign in
                </NavLink>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};