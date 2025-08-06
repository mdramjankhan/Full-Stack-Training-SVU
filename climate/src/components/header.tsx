import { useTheme } from "@/context/theme-provide"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    const {theme, setTheme} = useTheme();
    const isDark = theme === 'dark';
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center h-16 justify-between px-4">
            <Link to='/'>
                <img src={theme == 'dark' ? '/logo.png' : '/logo2.png'} alt="climate-logo"
                 className="h-8 w-8"
                />
            </Link>
        </div>

        <div className={`flex items-center cursor-pointer ${isDark ? 'text-white' : 'text-black'} 
            transition-transform duration-500 ease-in-out ${isDark ? 'rotate-180' : 'rotate-180'}
            
        `}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            {
                isDark?(
                    <Sun onClick={() => setTheme('light')} className="h-6 w-6 text-yellow-500 rotate-180 transition-all"></Sun>
                ):(
                    <Moon onClick={() => setTheme('dark')} className="h-6 w-6 text-blue-500 rotate-180 transition-all"></Moon>
                )
            }

        </div>
    </header>
  )
}
