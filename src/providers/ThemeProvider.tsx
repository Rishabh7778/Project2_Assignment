import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useSelector((s: RootState) => s.ui.theme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <>{children}</>;
};
