import { LogOut, Moon, Sun } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout: () => void;
}

export function Header({ darkMode, setDarkMode, onLogout }: HeaderProps) {
  return (
    <div className="bg-oriental-800">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <LanguageSwitcher />
          <div className="flex gap-2">
            <button
              onClick={onLogout}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
            <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-lg transition-all"
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
