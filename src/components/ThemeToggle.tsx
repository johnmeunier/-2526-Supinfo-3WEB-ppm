import { useThemeContext } from "@/services/themeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Basculer vers le mode ${isDark ? "clair" : "sombre"}`}
      className="theme-toggle"
      title={`Basculer vers le mode ${isDark ? "clair" : "sombre"}`}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
