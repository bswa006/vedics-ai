import { Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { isProfileComplete } from '../../utils/profile';
import { theme } from '../../styles/theme';
import { useGoogleLogin } from '@react-oauth/google';

interface FormData {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async response => {
      setError('');
      setLoading(true);

      try {
        const tokenResponse = await api.auth.googleLogin({
          access_token: response.access_token,
        });

        if (tokenResponse.token) {
          localStorage.setItem('token', tokenResponse.token);

          try {
            const userProfile = await api.profiles.getProfile();
            if (userProfile.id) {
              // Store both token and userId
              localStorage.setItem('userId', userProfile.user.id);

              if (isProfileComplete(userProfile)) {
                navigate('/', { replace: true });
              } else {
                navigate('/onboarding', { replace: true });
              }
            }
          } catch (error) {
            console.error('Failed to get user profile:', error);
            setError('Failed to get user profile');
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Google login error:', error);
        setError('Failed to login with Google');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.username) {
        setError(t('login.errors.phoneRequired'));
        return;
      }

      try {
        // First try to get a token (login)
        const tokenResponse = await api.auth.getToken({
          username: formData.username,
          password: formData.username, // Using username as password
        });

        if (tokenResponse.token) {
          localStorage.setItem('token', tokenResponse.token);

          try {
            const userProfile = await api.profiles.getProfile();
            if (userProfile.id) {
              // Store both token and userId
              localStorage.setItem('userId', userProfile.user.id);

              if (isProfileComplete(userProfile)) {
                navigate('/', { replace: true });
              } else {
                navigate('/onboarding', { replace: true });
              }
            } else {
              setError('Failed to get user profile');
              localStorage.removeItem('token');
            }
          } catch (profileError) {
            console.error('Error fetching user profile:', profileError);
            setError('Failed to get user profile');
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        // If login fails, create a new user
        const response: any = await api.auth.createUser({
          username: formData.username,
          password: formData.username, // Using username as password
        });

        if (response.id && response.auth_token) {
          localStorage.setItem('token', response.auth_token);

          try {
            const userProfile = await api.profiles.getProfile();
            if (userProfile.id) {
              // Store userId
              localStorage.setItem('userId', userProfile.user.id);
              
              // For new users, always check profile completion
              if (isProfileComplete(userProfile)) {
                navigate('/', { replace: true });
              } else {
                navigate('/onboarding', { replace: true });
              }
            }
          } catch (error) {
            console.error('Failed to get user profile:', error);
            setError('Failed to get user profile');
          }
        } else {
          setError('Failed to create user');
        }
      }
    } catch (generalError) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-midnightIndigo relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.background }}
      />
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-celestialLilac/30 absolute -left-4 top-0 h-64 w-64 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-vedicSaffron/30 absolute -right-4 bottom-0 h-64 w-64 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and title */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: parseFloat(theme.animations.transition.normal) / 1000 }}
              className="mx-auto h-24 w-24"
            >
              <div className="group relative h-full w-full overflow-hidden rounded-full">
                {/* Deep space background */}
                <div className="absolute inset-0 rounded-full bg-[#1A1B2B]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5B43C]/20 via-[#7F7ACA]/20 to-transparent" />
                </div>

                {/* Main border ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    padding: '2px',
                    background: 'linear-gradient(45deg, #7F7ACA, #F5B43C, #7F7ACA)',
                    maskImage: 'linear-gradient(black, black)',
                    WebkitMaskImage: 'linear-gradient(black, black)',
                  }}
                  animate={{
                    rotate: loading ? 360 : 0,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="h-full w-full rounded-full bg-[#1A1B2B]" />
                </motion.div>

                {/* Planetary system */}
                <div className="absolute inset-1">
                  {/* Orbiting planets */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* First planet - Largest */}
                    <motion.div
                      className="absolute h-3.5 w-3.5 rounded-full"
                      style={{
                        top: '12%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle at 30% 30%, #F5B43C, #F5B43C66)',
                        boxShadow: '0 0 6px #F5B43C33',
                      }}
                      animate={{
                        scale: loading ? [0.85, 1.15, 0.85] : 0.85,
                        opacity: loading ? [0.5, 0.7, 0.5] : 0.5,
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1],
                      }}
                    />

                    {/* Second planet - Small */}
                    <motion.div
                      className="absolute h-2 w-2 rounded-full"
                      style={{
                        bottom: '18%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle at 70% 30%, #7F7ACA, #7F7ACA66)',
                        boxShadow: '0 0 4px #7F7ACA33',
                      }}
                      animate={{
                        scale: loading ? [0.9, 1.1, 0.9] : 0.9,
                        opacity: loading ? [0.4, 0.6, 0.4] : 0.4,
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.7,
                        times: [0, 0.5, 1],
                      }}
                    />
                  </motion.div>

                  {/* Counter-rotating planets */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Third planet - Tiny with subtle gradient */}
                    <motion.div
                      className="absolute h-1.5 w-1.5 rounded-full"
                      style={{
                        left: '18%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(45deg, #F5B43C66, #7F7ACA66)',
                        boxShadow: '0 0 4px rgba(245,180,60,0.2)',
                      }}
                      animate={{
                        scale: loading ? [1, 1.25, 1] : 1,
                        opacity: loading ? [0.3, 0.5, 0.3] : 0.3,
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.2,
                        times: [0, 0.5, 1],
                      }}
                    />

                    {/* Fourth planet - Medium with soft gradient */}
                    <motion.div
                      className="absolute h-2.5 w-2.5 rounded-full"
                      style={{
                        right: '15%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(-45deg, #7F7ACA66, #F5B43C66)',
                        boxShadow: '0 0 5px rgba(127,122,202,0.2)',
                      }}
                      animate={{
                        scale: loading ? [0.8, 1.1, 0.8] : 0.8,
                        opacity: loading ? [0.45, 0.65, 0.45] : 0.45,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                        times: [0, 0.5, 1],
                      }}
                    />
                  </motion.div>

                  {/* Stars */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`star-${i}`}
                      className="absolute h-1 w-1 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? '#F5B43C' : '#7F7ACA',
                        boxShadow: i % 2 === 0 ? '0 0 5px #F5B43C' : '0 0 5px #7F7ACA',
                      }}
                      animate={{
                        opacity: loading ? [0.4, 0.8, 0.4] : 0.4,
                        scale: loading ? [1, 1.5, 1] : 1,
                      }}
                      transition={{
                        duration: 1 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'tween',
                delay: parseFloat(theme.animations.transition.normal) / 1000,
                duration: parseFloat(theme.animations.transition.normal) / 1000,
              }}
              className="mt-6 text-3xl font-medium tracking-tight text-white"
            >
              Welcome to Vedics.ai
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'tween',
                delay: parseFloat(theme.animations.transition.normal) / 1000,
                duration: parseFloat(theme.animations.transition.normal) / 1000,
              }}
              className="mt-2 text-sm text-gray-200"
              style={{ fontWeight: theme.typography.body.weights.regular }}
            >
              {t('login.subtitle')}
            </motion.p>
          </div>

          {/* Login form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'tween',
              delay: parseFloat(theme.animations.transition.normal) / 1000,
              duration: parseFloat(theme.animations.transition.normal) / 1000,
            }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div
                className="rounded-lg border border-[#7F7ACA]/20 bg-[#7F7ACA]/10 p-3 text-center text-sm text-white"
                style={{
                  fontFamily: theme.typography.body.fontFamily,
                  fontWeight: theme.typography.body.weights.medium,
                }}
              >
                {error}
              </div>
            )}

            <div
              className="border-celestialLilac/20 space-y-4 rounded-xl border bg-white/5 backdrop-blur-xl"
              style={{
                padding: theme.spacing.lg,
                boxShadow: `0 8px 32px ${theme.colors.celestialLilac}10`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div>
                <label
                  htmlFor="username"
                  aria-label={t('login.phoneNumber')}
                  className="mb-1 block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    className="block w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-1.5 pl-11 text-white placeholder-gray-500 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
                    placeholder="Enter your phone number"
                    value={formData.username}
                    onChange={e => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, username: value, password: value });
                      }
                    }}
                  />
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7F7ACA]" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-[#7F7ACA] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <motion.span
                  className="rounded-lg"
                  animate={{
                    opacity: loading ? [1, 0.7, 1] : 1,
                    scale: loading ? [1, 0.98, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: loading ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  {loading ? 'Signing in...' : 'Begin Journey'}
                </motion.span>
                <motion.div
                  className="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover:opacity-100"
                  style={{
                    background: theme.gradients.accent,
                    transition: `opacity ${parseFloat(theme.animations.transition.normal) / 1000}s ease-in-out`,
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                />
                <motion.span
                  className="ml-2"
                  animate={{
                    rotate: loading ? 360 : 0,
                    scale: loading ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotate: {
                      duration: 2,
                      repeat: loading ? Infinity : 0,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 1.5,
                      repeat: loading ? Infinity : 0,
                      ease: 'easeInOut',
                    },
                  }}
                  style={{
                    display: 'inline-block',
                    transformOrigin: 'center',
                  }}
                >
                  ✨
                </motion.span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-midnightIndigo px-2 text-gray-400">
                  {t('login.orContinueWith')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => googleLogin()}
              disabled={loading}
              className="relative flex w-full items-center justify-center space-x-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>{loading ? t('common.loading') : t('login.continueWithGoogle')}</span>
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default Login;
