/**
 * Blocking theme bootstrap for FOUC prevention.
 * Keep in sync with ThemeProvider storage/resolution rules.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=(s==="light"||s==="dark")?s:(d?"dark":"light");var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t}catch(e){}})();`;
