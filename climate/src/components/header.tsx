import { useTheme } from "@/context/theme-provide"
import { Link } from "react-router-dom";

export default function Header() {
    const {theme, setTheme} = useTheme();
    const isDark = theme === 'dark';
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center h-16 justify-between px-4">
            <Link to='/'>
                <img src={theme == 'dark' ? '/logo.png' : '/logo2.png'} alt="climate-logo"
                 className=""
                />
            </Link>
        </div>
    </header>
  )
}
