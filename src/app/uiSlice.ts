import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

type UIState = {
  search: string;
  page: number;
  theme: Theme;
};

const initialTheme = ((): Theme => {
  const saved = localStorage.getItem('theme');
  return (saved === 'dark' || saved === 'light') ? saved : 'light';
})();

const initialState: UIState = {
  search: '',
  page: 1,
  theme: initialTheme,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload; },
    toggleTheme(state) { state.theme = state.theme === 'light' ? 'dark' : 'light'; },
    setTheme(state, action: PayloadAction<Theme>) { state.theme = action.payload; },
  },
});

export const { setSearch, setPage, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
