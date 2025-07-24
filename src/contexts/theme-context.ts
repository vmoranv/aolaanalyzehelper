import { createContext } from 'react';
import type { ThemeProviderState } from '@/lib/theme-types';

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  mantineColorScheme: 'auto',
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
