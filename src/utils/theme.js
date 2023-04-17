export const setMode = (mode) => {
  localStorage.setItem('theme', mode);
  document.documentElement.className = mode;
};

export const keepMode = () => {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setMode('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setMode('light')
    }
  } else {
    setMode('theme-dark')
  }
};