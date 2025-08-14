import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { toggleTheme } from '../app/uiSlice';

const ThemeToggle: React.FC = () => {
  const theme = useSelector((s: RootState) => s.ui.theme);
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(toggleTheme()), [dispatch]);

  return (
    <button onClick={onClick} aria-label="Toggle theme">
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default React.memo(ThemeToggle);
