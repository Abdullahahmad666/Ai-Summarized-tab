export {}; // make this a module

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}
