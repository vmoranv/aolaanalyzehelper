import { Moon, Sun, Monitor } from 'lucide-react';
import { Menu, ActionIcon, rem } from '@mantine/core';
import { useTheme } from '@/hooks/use-theme';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Menu
      shadow="md"
      width={160}
      radius="md"
      transitionProps={{
        transition: 'pop-top-right',
        duration: 150,
      }}
      styles={{
        dropdown: {
          border: '1px solid hsl(var(--color-border))',
          backgroundColor: 'hsl(var(--color-popover))',
        },
      }}
    >
      <Menu.Target>
        <ActionIcon
          variant="outline"
          size="lg"
          style={{
            borderColor: 'hsl(var(--color-border))',
            backgroundColor: 'hsl(var(--color-background))',
            color: 'hsl(var(--color-foreground))',
            transition: 'all 150ms ease',
          }}
          className="hover:bg-accent"
        >
          <Sun
            size={18}
            style={{
              transform: theme === 'dark' ? 'scale(0) rotate(-90deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 200ms ease',
            }}
          />
          <Moon
            size={18}
            style={{
              position: 'absolute',
              transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)',
              transition: 'all 200ms ease',
            }}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<Sun size={16} />}
          onClick={() => setTheme('light')}
          style={{
            borderRadius: rem(6),
            backgroundColor: theme === 'light' ? 'hsl(var(--color-accent))' : 'transparent',
          }}
        >
          浅色模式
        </Menu.Item>
        <Menu.Item
          leftSection={<Moon size={16} />}
          onClick={() => setTheme('dark')}
          style={{
            borderRadius: rem(6),
            backgroundColor: theme === 'dark' ? 'hsl(var(--color-accent))' : 'transparent',
          }}
        >
          深色模式
        </Menu.Item>
        <Menu.Item
          leftSection={<Monitor size={16} />}
          onClick={() => setTheme('system')}
          style={{
            borderRadius: rem(6),
            backgroundColor: theme === 'system' ? 'hsl(var(--color-accent))' : 'transparent',
          }}
        >
          跟随系统
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
