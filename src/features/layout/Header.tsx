import { LogOut, Moon, Sun } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout: (() => void) | undefined;
  userId: number | null | undefined;
}

export function Header({ darkMode, setDarkMode, onLogout, userId }: HeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-[#0B1026] via-[#2B3990] to-[#0B1026] overflow-hidden z-10">
      {/* Animated stars background */}
      <div className="absolute inset-0 opacity-30">
        {/* Small stars */}
        <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '10%', left: '15%' }} />
        <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '50%', left: '75%', animationDelay: '0.5s' }} />
        <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite]" style={{ top: '30%', left: '45%', animationDelay: '1s' }} />
        <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '70%', left: '25%', animationDelay: '1.5s' }} />
        <div className="absolute h-1 w-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '20%', left: '85%', animationDelay: '2s' }} />
        {/* Medium stars */}
        <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-[twinkle-slow_4s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite]" style={{ top: '45%', left: '35%', animationDelay: '0.7s' }} />
        <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-[twinkle-slow_4s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '15%', left: '65%', animationDelay: '1.2s' }} />
        <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-[twinkle-slow_4s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '60%', left: '90%', animationDelay: '1.8s' }} />
        {/* Large stars with glow effect */}
        <div className="absolute h-2 w-2 bg-white rounded-full animate-[pulse_2s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite] shadow-glow" style={{ top: '25%', left: '55%', animationDelay: '0.3s' }} />
        <div className="absolute h-2 w-2 bg-white rounded-full animate-[pulse_2s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite] shadow-glow" style={{ top: '75%', left: '40%', animationDelay: '1.4s' }} />
      </div>
      
      <div className="max-w-lg mx-auto px-4 py-5 relative">
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <div className="flex gap-3">
            {userId && onLogout && (
              <button
                onClick={onLogout}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 hover:from-blue-600/40 hover:via-purple-600/40 hover:to-pink-600/40 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 hover:from-blue-600/40 hover:via-purple-600/40 hover:to-pink-600/40 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(124,58,237,0.1)]"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
