import { useTheme } from "@/context/theme-provide";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex items-center h-16 justify-between px-4">
                {/* Logo image  */}
                <Link to="/">
                    <img
                        src={isDark ? "/logo-light.png" : "/logo-dark.png"}
                        alt="climate-logo"
                        className="h-14 w-auto cursor-pointer"
                    />
                </Link>

                {/* theme changing toggle button  */}
                <button
                    type="button"
                    aria-label="Toggle theme"
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                    {isDark ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                        <Moon className="h-5 w-5 text-blue-500" />
                    )}
                </button>
            </div>
        </header>
    );
}