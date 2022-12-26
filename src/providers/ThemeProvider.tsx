import React, { useEffect, useState } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [theme, setTheme] = useState(`light`);
  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else {
      localStorage.setItem('theme', `light`);
      setTheme(`light`);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  return <div className={`${theme}`}>{children}</div>;
}
