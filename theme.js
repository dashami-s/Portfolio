(function () {
  const THEME_KEY = "dashami_theme_pref";
  const STYLE_KEY = "dashami_theme_style_v1";
  const STYLE_SEQUENCE = ["sage", "ember", "ocean"];
  const STYLE_LABELS = {
    sage: "Sage",
    ember: "Ember",
    ocean: "Ocean"
  };

  function updateThemeToggleUI(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (toggle) {
      toggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function updateThemeStyleUI(style) {
    const label = STYLE_LABELS[style] || STYLE_LABELS.sage;
    document.querySelectorAll("[data-theme-style-toggle]").forEach(function (toggle) {
      toggle.textContent = `Style: ${label}`;
      toggle.setAttribute("aria-label", `Cycle portfolio style. Current style: ${label}`);
    });
  }

  function updateThemeColorMeta() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      return;
    }

    const styles = getComputedStyle(document.documentElement);
    const color = styles.getPropertyValue("--bg").trim() || "#16584e";
    meta.setAttribute("content", color);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    updateThemeToggleUI(theme);
    updateThemeColorMeta();
  }

  function applyThemeStyle(style) {
    const safeStyle = STYLE_SEQUENCE.includes(style) ? style : "sage";
    document.documentElement.setAttribute("data-theme-style", safeStyle);
    updateThemeStyleUI(safeStyle);
    updateThemeColorMeta();
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getInitialThemeStyle() {
    const saved = localStorage.getItem(STYLE_KEY);
    return STYLE_SEQUENCE.includes(saved) ? saved : "sage";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const initialTheme = getInitialTheme();
    const initialStyle = getInitialThemeStyle();
    applyTheme(initialTheme);
    applyThemeStyle(initialStyle);

    document.querySelectorAll("[data-theme-toggle]").forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });

    document.querySelectorAll("[data-theme-style-toggle]").forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme-style") || "sage";
        const currentIndex = STYLE_SEQUENCE.indexOf(current);
        const next = STYLE_SEQUENCE[(currentIndex + 1) % STYLE_SEQUENCE.length];
        localStorage.setItem(STYLE_KEY, next);
        applyThemeStyle(next);
      });
    });
  });
})();
