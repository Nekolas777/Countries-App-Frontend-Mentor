export const saveTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
}

export const getTheme = () => {
  return localStorage.getItem('theme');
}

export const removeTheme = () => {
  localStorage.removeItem('theme');
}

export const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const applySystemTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
};