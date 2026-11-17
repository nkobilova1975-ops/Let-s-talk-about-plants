import {useCallback, useEffect, useState} from 'react';
import {getStorage, setStorage} from '../utils/storage';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'greennest_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = getStorage<Theme | null>(STORAGE_KEY, null);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setStorage(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {theme, setTheme, toggleTheme};
}
