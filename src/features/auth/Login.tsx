import { Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { theme } from '../../styles/theme';

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
              localStorage.setItem('userId', userProfile.id.toString());
              window.dispatchEvent(new Event('storage'));

              await new Promise(resolve => setTimeout(resolve, 100));

              if (
                userProfile.date_of_birth &&
                userProfile.time_of_birth &&
                userProfile.place_of_birth
              ) {
                navigate('/', { replace: true });
              } else {
                navigate('/onboarding');
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
              localStorage.setItem('userId', userProfile.id.toString());
              window.dispatchEvent(new Event('storage'));
              navigate('/onboarding', { replace: true });
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
    <div className="relative min-h-screen overflow-hidden bg-midnightIndigo">
      {/* Background gradient */}
      <div 
        className="pointer-events-none absolute inset-0" 
        style={{ background: theme.gradients.background }}
      />
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -left-4 top-0 h-64 w-64 rounded-full bg-celestialLilac/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className="absolute -right-4 bottom-0 h-64 w-64 rounded-full bg-vedicSaffron/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
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
              <div 
                className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#7F7ACA]/50 p-[2px]"
              >
                <motion.div 
                  className="h-full w-full rounded-full bg-[#2A2B3B] p-4"
                  animate={loading ? {
                    scale: [1, 0.98, 1],
                    opacity: [1, 0.8, 1]
                  } : { scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: loading ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  <motion.div 
                    className="h-full w-full rounded-full bg-[#7F7ACA]/20"
                    animate={loading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      duration: 2,
                      repeat: loading ? Infinity : 0,
                      ease: 'linear'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: 'tween',
                delay: parseFloat(theme.animations.transition.normal) / 1000, 
                duration: parseFloat(theme.animations.transition.normal) / 1000 
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
                duration: parseFloat(theme.animations.transition.normal) / 1000 
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
              duration: parseFloat(theme.animations.transition.normal) / 1000 
            }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div 
                className={`border border-statusRed/20 bg-statusRed/10 p-3 text-center text-sm text-statusRed ${theme.typography.body.fontFamily}`}
                style={{ 
                  borderRadius: theme.borderRadius.lg,
                  fontWeight: theme.typography.body.weights.medium 
                }}
              >
                {error}
              </div>
            )}

            <div 
              className="space-y-6 rounded-xl border border-celestialLilac/20 bg-white/5 backdrop-blur-xl"
              style={{ 
                padding: theme.spacing['2xl'],
                boxShadow: `0 8px 32px ${theme.colors.celestialLilac}10`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <div>
                <label 
                  htmlFor="username"
                  aria-label={t('login.phoneNumber')}
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-2 pl-11 text-white placeholder-gray-500 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
                    placeholder="Enter your phone number"
                    value={formData.username}
                    onChange={e =>
                      setFormData({ ...formData, username: e.target.value, password: e.target.value })
                    }
                  />
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7F7ACA]" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-[#7F7ACA] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
              >
                <motion.span
                  animate={loading ? {
                    opacity: [1, 0.7, 1],
                    scale: [1, 0.98, 1]
                  } : { opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    repeat: loading ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  {loading ? 'Signing in...' : 'Begin Journey'}
                </motion.span>
                <motion.div 
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: theme.gradients.accent,
                    transition: `opacity ${parseFloat(theme.animations.transition.normal) / 1000}s ease-in-out`
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                />
                <motion.span 
                  className="ml-2"
                  animate={loading ? {
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                  style={{
                    display: 'inline-block',
                    transformOrigin: 'center'
                  }}
                >
                  ✨
                </motion.span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default Login;
