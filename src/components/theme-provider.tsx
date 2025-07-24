import { useEffect, useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import type { MantineColorScheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import '@mantine/core/styles.css';
import type { Theme, ThemeProviderProps } from '@/lib/theme-types';
import { ThemeProviderContext } from '@/contexts/theme-context';

// 创建Mantine主题配置
const mantineTheme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily:
    '"Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  colors: {
    // 自定义颜色调色板，与Tailwind保持一致
    blue: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6', // primary
      '#2563eb', // primary-hover
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a',
    ],
  },
  components: {
    Menu: {
      styles: {
        dropdown: {
          border: '1px solid var(--mantine-color-gray-3)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.75rem',
          padding: '0.5rem',
        },
        item: {
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 150ms ease',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-1)',
          },
          '&[data-hovered]': {
            backgroundColor: 'var(--mantine-color-blue-0)',
            color: 'var(--mantine-color-blue-7)',
          },
        },
        label: {
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--mantine-color-gray-6)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '0.5rem 1rem 0.25rem',
        },
      },
    },
    Button: {
      styles: {
        root: {
          borderRadius: '0.5rem',
          fontWeight: 500,
          transition: 'all 150ms ease',
        },
      },
    },
  },
});

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const systemColorScheme = useColorScheme();
  const [mantineColorScheme, setMantineColorScheme] = useLocalStorage<MantineColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'auto',
  });

  // 计算实际的颜色方案
  const getActualColorScheme = (): MantineColorScheme => {
    if (theme === 'system') {
      return systemColorScheme;
    }
    return theme as MantineColorScheme;
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let actualTheme: string;
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      actualTheme = theme;
    }

    root.classList.add(actualTheme);

    // 同步Mantine的颜色方案
    const newMantineScheme = theme === 'system' ? 'auto' : (theme as MantineColorScheme);
    if (newMantineScheme !== mantineColorScheme) {
      setMantineColorScheme(newMantineScheme);
    }
  }, [theme, mantineColorScheme, setMantineColorScheme]);

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
    mantineColorScheme: getActualColorScheme(),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <MantineProvider
        theme={mantineTheme}
        forceColorScheme={theme === 'system' ? undefined : (theme as 'light' | 'dark')}
      >
        {children}
      </MantineProvider>
    </ThemeProviderContext.Provider>
  );
}
