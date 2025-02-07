import { Sun } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface FormData {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
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
      console.log('Starting login process...');
      // Validate required fields
      if (!formData.username) {
        setError('Phone number is required');
        setLoading(false); // Ensure loading is reset
        return;
      }

      try {
        // First try to get a token (login)
        console.log('Attempting to get token...');
        const tokenResponse = await api.auth.getToken({
          username: formData.username,
          password: formData.username, // Using username as password
        });

        console.log('Token response:', tokenResponse);
        if (tokenResponse.token) {
          // Store the token in localStorage for the axios interceptor
          localStorage.setItem('token', tokenResponse.token);

          // Get user profile
          try {
            console.log('Fetching user profile...');
            const userProfile = await api.profiles.getProfile();
            console.log('User profile:', userProfile);

            if (userProfile.id) {
              // Set userId in localStorage and trigger a storage event
              localStorage.setItem('userId', userProfile.id.toString());
              window.dispatchEvent(new Event('storage'));

              // Small delay to ensure state is updated
              await new Promise(resolve => setTimeout(resolve, 100));

              // If user has completed their profile (has birth details), go to home
              // Otherwise, go to onboarding
              if (
                userProfile.date_of_birth &&
                userProfile.time_of_birth &&
                userProfile.place_of_birth
              ) {
                console.log('Profile complete, redirecting to home');
                // window.location.href = '/';
                console.log('Navigating to home...');
                navigate('/', { replace: true });
              } else {
                console.log('Profile incomplete, redirecting to onboarding');
                // window.location.href = '/onboarding';
                navigate('/onboarding');
              }
            } else {
              console.error('No user ID in profile response');
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
          // For new users, we want to ensure they go through onboarding
          localStorage.setItem('token', response.auth_token);
          
          // Get user profile to set userId
          try {
            const userProfile = await api.profiles.getProfile();
            if (userProfile.id) {
              localStorage.setItem('userId', userProfile.id.toString());
              window.dispatchEvent(new Event('storage'));
              
              // For new users, always go to onboarding
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
      setLoading(false); // Ensure loading is reset
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-[#0B1026] via-[#2B3990] to-[#0B1026] px-4 py-12 sm:px-6 lg:px-8">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {/* Small stars */}
        <div
          className="shadow-glow absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '10%', left: '15%' }}
        />
        <div
          className="shadow-glow absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '50%', left: '75%', animationDelay: '0.5s' }}
        />
        <div
          className="shadow-glow absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '30%', left: '45%', animationDelay: '1s' }}
        />
        <div
          className="shadow-glow absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite,float-1_17s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '70%', left: '25%', animationDelay: '1.5s' }}
        />
        <div
          className="shadow-glow absolute h-1.5 w-1.5 animate-[twinkle_4s_ease-in-out_infinite,float-2_19s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '20%', left: '85%', animationDelay: '2s' }}
        />
        <div
          className="shadow-glow absolute h-1.5 w-1.5 animate-[twinkle_4s_ease-in-out_infinite,float-3_21s_ease-in-out_infinite] rounded-full bg-white/30"
          style={{ top: '80%', left: '65%', animationDelay: '2.5s' }}
        />
        {/* Medium stars */}
        <div
          className="shadow-glow absolute h-2 w-2 animate-[twinkle-slow_4s_ease-in-out_infinite,float-2_22s_ease-in-out_infinite] rounded-full bg-white/40"
          style={{ top: '15%', left: '55%', animationDelay: '0.7s' }}
        />
        <div
          className="shadow-glow absolute h-2 w-2 animate-[twinkle-slow_4s_ease-in-out_infinite,float-3_25s_ease-in-out_infinite] rounded-full bg-white/40"
          style={{ top: '65%', left: '35%', animationDelay: '1.2s' }}
        />
        <div
          className="shadow-glow absolute h-2 w-2 animate-[twinkle-slow_4s_ease-in-out_infinite,float-1_23s_ease-in-out_infinite] rounded-full bg-white/40"
          style={{ top: '40%', left: '85%', animationDelay: '1.7s' }}
        />
        {/* Large stars */}
        <div
          className="shadow-glow absolute h-3 w-3 animate-[twinkle-slow_5s_ease-in-out_infinite,float-3_28s_ease-in-out_infinite] rounded-full bg-white/50"
          style={{ top: '25%', left: '75%', animationDelay: '0.3s' }}
        />
        <div
          className="shadow-glow absolute h-3 w-3 animate-[twinkle-slow_5s_ease-in-out_infinite,float-1_30s_ease-in-out_infinite] rounded-full bg-white/50"
          style={{ top: '75%', left: '15%', animationDelay: '1.8s' }}
        />
      </div>

      <div className="relative w-full max-w-md space-y-8 text-white">
        <div className="absolute left-1/2 top-2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* Outer glow with rainbow pulse */}
          <div className="absolute inset-0 animate-[pulse-rainbow_4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-[2px]" />

          {/* Main container */}
          <div className="group relative h-full w-full rounded-full bg-[#070B14] p-[1px]">
            {/* Rotating border */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#A855F7,#EC4899,#3B82F6,#1E293B)] opacity-60" />
            </div>

            {/* Glass background */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90">
              {/* Deep space effects */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.15),transparent_50%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.15),transparent_50%)]" />

              {/* Ambient glow */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

              {/* Stars */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute left-1/4 top-1/4 animate-[star1_10s_linear_infinite] text-xs text-white/60">
                  ✨
                </div>
                <div className="absolute bottom-1/3 right-1/3 animate-[star2_8s_linear_infinite] text-xs text-white/50">
                  ✨
                </div>
                <div className="absolute left-2/3 top-1/3 animate-[star3_12s_linear_infinite] text-xs text-white/70">
                  ✨
                </div>
              </div>

              {/* Sacred Geometry Icon */}
              <svg
                viewBox="0 0 100 100"
                className="relative z-10 h-12 w-12 animate-[color-shift_8s_ease-in-out_infinite] text-white transition-all duration-700"
              >
                <defs>
                  <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                {/* Outer rotating circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#iconGradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  className="animate-[spin_12s_linear_infinite]"
                />
                {/* Main triangle */}
                <path
                  d="M50 5 L95 90 L5 90 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[pulse_2s_ease-in-out_infinite]"
                />
                {/* Inner circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[spin_4s_linear_infinite]"
                />
                {/* Inner triangle */}
                <path
                  d="M50 25 L75 75 L25 75 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[spin_6s_linear_infinite_reverse]"
                />
                {/* Center dot */}
                <circle cx="50" cy="50" r="4" fill="url(#iconGradient)" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mt-16 text-center font-serif text-2xl font-light tracking-tight text-white">
            vedics.ai
          </h2>
          <h2 className="text-center font-serif text-4xl font-light tracking-tight text-white">
            Welcome Seeker
          </h2>
          <p className="mt-4 text-center text-sm font-light leading-6 text-white/80">
            Begin your journey of self-discovery
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-6 rounded-2xl border border-white/20 bg-black/20 p-8 shadow-light-md backdrop-blur-md transition-all duration-200 hover:bg-black/30">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-white">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-white/20 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 shadow-light-sm transition-all duration-200 hover:bg-gray-50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={formData.username}
                  onChange={e =>
                    setFormData({ ...formData, username: e.target.value, password: e.target.value })
                  }
                />
                <Sun className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oriental-400/0 via-white/10 to-oriental-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/0 dark:via-white/5 dark:to-white/0"></div>
              <span className="mr-2 transition-transform duration-500 group-hover:rotate-[360deg]">
                ✨
              </span>
              Begin Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
