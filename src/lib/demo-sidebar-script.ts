/**
 * Blocking demo-sidebar bootstrap to avoid collapse preference flicker.
 * Keep in sync with DemoShell storage key/rules.
 */
export const DEMO_SIDEBAR_STORAGE_KEY = "helpnova-demo-sidebar-collapsed";

export const DEMO_SIDEBAR_INIT_SCRIPT = `(function(){try{var v=localStorage.getItem("${DEMO_SIDEBAR_STORAGE_KEY}");document.documentElement.dataset.demoSidebar=v==="1"?"collapsed":"expanded"}catch(e){document.documentElement.dataset.demoSidebar="expanded"}})();`;
