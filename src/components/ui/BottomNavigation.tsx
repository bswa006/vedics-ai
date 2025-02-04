import { Home, User, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface BottomNavigationProps {}

export function BottomNavigation({}: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';
  const isChat = location.pathname === '/chat';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="relative bg-gradient-to-r from-[#0B1026] via-[#2B3990] to-[#0B1026] overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {/* Small stars */}
          <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '10%', left: '15%' }} />
          <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '50%', left: '75%', animationDelay: '0.5s' }} />
          <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite]" style={{ top: '30%', left: '45%', animationDelay: '1s' }} />
          {/* Medium stars */}
          <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-[twinkle-slow_4s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '45%', left: '35%', animationDelay: '0.7s' }} />
          <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-[twinkle-slow_4s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '60%', left: '90%', animationDelay: '1.8s' }} />
        </div>

        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${isHome ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Home size={20} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => navigate('/chat')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${isChat ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <MessageCircle size={20} />
            <span className="text-xs font-medium">Ask Anything</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${isProfile ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <User size={20} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
