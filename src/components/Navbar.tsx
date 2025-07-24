import React from 'react';
import {
  Menu as MantineMenu,
  Button as MantineButton,
  Group,
  Text,
  Divider,
  ActionIcon,
  Burger,
  Drawer,
  Stack,
  Box,
  Badge,
  Paper,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ModeToggle } from './mode-toggle';
import {
  Zap,
  Github,
  Activity,
  BookOpen,
  Settings,
  HelpCircle,
  Sparkles,
  Code,
  BarChart3,
  Download,
  Search,
  GitCompare,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const tools: {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}[] = [
  {
    title: '数据解析',
    href: '#parse',
    description: '解析游戏数据文件，提取有用信息',
    icon: <Code size={16} />,
    badge: '核心',
  },
  {
    title: '数据查询',
    href: '#search',
    description: '快速搜索和查询解析后的数据',
    icon: <Search size={16} />,
  },
  {
    title: '数据对比',
    href: '#compare',
    description: '对比不同数据项的差异和变化',
    icon: <GitCompare size={16} />,
  },
  {
    title: '统计分析',
    href: '#statistics',
    description: '查看数据的统计信息和分布图表',
    icon: <BarChart3 size={16} />,
    badge: '热门',
  },
  {
    title: '数据导出',
    href: '#export',
    description: '将数据导出为各种格式文件',
    icon: <Download size={16} />,
  },
  {
    title: 'API 接口',
    href: '#api',
    description: '开发者友好的 RESTful API 接口',
    icon: <Settings size={16} />,
    badge: '开发',
  },
];

const MenuDropdown = ({
  trigger,
  children,
  width = 320,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: number;
}) => {
  return (
    <MantineMenu
      shadow="xl"
      width={width}
      radius="lg"
      offset={8}
      transitionProps={{
        transition: 'pop-top-left',
        duration: 200,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      styles={{
        dropdown: {
          border: '1px solid hsl(var(--color-border))',
          backgroundColor: 'hsl(var(--color-popover))',
          backdropFilter: 'blur(12px)',
        },
      }}
    >
      <MantineMenu.Target>{trigger}</MantineMenu.Target>
      <MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
    </MantineMenu>
  );
};

const ToolsMenuContent = () => (
  <>
    <MantineMenu.Label>主要工具</MantineMenu.Label>
    <Box p="xs">
      <Paper
        p="md"
        radius="md"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--color-primary) / 0.1), hsl(var(--color-accent)))',
          border: '1px solid hsl(var(--color-border))',
        }}
      >
        <Group gap="sm" mb="xs">
          <Zap size={20} style={{ color: 'hsl(var(--color-primary))' }} />
          <Text fw={600} size="sm" c="hsl(var(--color-foreground))">
            游戏数据解析
          </Text>
        </Group>
        <Text size="xs" c="hsl(var(--color-muted-foreground))">
          高效解析各种游戏数据文件，提供完整的数据分析工具
        </Text>
      </Paper>
    </Box>
    <Divider />
    {tools.slice(0, 3).map((tool) => (
      <MantineMenu.Item
        key={tool.title}
        leftSection={tool.icon}
        rightSection={
          tool.badge && (
            <Badge size="xs" variant="light" color="blue">
              {tool.badge}
            </Badge>
          )
        }
        component="a"
        href={tool.href}
        style={{
          borderRadius: rem(8),
          margin: rem(4),
        }}
      >
        <Box>
          <Text fw={500} size="sm">
            {tool.title}
          </Text>
          <Text size="xs" c="dimmed">
            {tool.description}
          </Text>
        </Box>
      </MantineMenu.Item>
    ))}
  </>
);

const FeaturesMenuContent = () => (
  <>
    <MantineMenu.Label>全部功能</MantineMenu.Label>
    <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: rem(4), padding: rem(4) }}>
      {tools.map((tool) => (
        <MantineMenu.Item
          key={tool.title}
          leftSection={tool.icon}
          rightSection={
            tool.badge && (
              <Badge size="xs" variant="light" color="blue">
                {tool.badge}
              </Badge>
            )
          }
          component="a"
          href={tool.href}
          style={{
            borderRadius: rem(8),
            padding: rem(12),
          }}
        >
          <Box>
            <Text fw={500} size="sm">
              {tool.title}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={2}>
              {tool.description}
            </Text>
          </Box>
        </MantineMenu.Item>
      ))}
    </Box>
  </>
);

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <UnstyledButton component="a" href="#home">
          <Group gap="md">
            <Box
              style={{
                width: rem(44),
                height: rem(44),
                borderRadius: rem(14),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid hsl(var(--color-background))',
                transition: 'all 150ms ease',
              }}
              className="bg-blue-400 dark:bg-blue-600 shadow-lg shadow-blue-400/30 dark:shadow-blue-600/40"
            >
              <Sparkles size={26} style={{ color: '#ffffff' }} />
            </Box>
            <Box>
              <Text
                fw={800}
                size="xl"
                style={{
                  color: 'hsl(var(--color-foreground))',
                  fontSize: rem(22),
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                奥拉星
              </Text>
              <Text
                size="sm"
                fw={500}
                style={{
                  color: 'hsl(var(--color-muted-foreground))',
                  marginTop: rem(-2),
                  fontSize: rem(13),
                  letterSpacing: '0.02em',
                }}
              >
                解析助手
              </Text>
            </Box>
          </Group>
        </UnstyledButton>

        {/* Desktop Navigation */}
        <Group gap="xs" visibleFrom="md">
          <MenuDropdown
            trigger={
              <UnstyledButton
                style={{
                  padding: `${rem(8)} ${rem(16)}`,
                  borderRadius: rem(8),
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(4),
                  color: 'hsl(var(--color-foreground))',
                  fontSize: rem(14),
                  fontWeight: 500,
                  transition: 'all 150ms ease',
                }}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                工具
                <ChevronDown size={14} />
              </UnstyledButton>
            }
            width={400}
          >
            <ToolsMenuContent />
          </MenuDropdown>

          <MenuDropdown
            trigger={
              <UnstyledButton
                style={{
                  padding: `${rem(8)} ${rem(16)}`,
                  borderRadius: rem(8),
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(4),
                  color: 'hsl(var(--color-foreground))',
                  fontSize: rem(14),
                  fontWeight: 500,
                  transition: 'all 150ms ease',
                }}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                功能
                <ChevronDown size={14} />
              </UnstyledButton>
            }
            width={500}
          >
            <FeaturesMenuContent />
          </MenuDropdown>

          <UnstyledButton
            component="a"
            href="#docs"
            style={{
              padding: `${rem(8)} ${rem(16)}`,
              borderRadius: rem(8),
              display: 'flex',
              alignItems: 'center',
              gap: rem(8),
              color: 'hsl(var(--color-foreground))',
              fontSize: rem(14),
              fontWeight: 500,
              transition: 'all 150ms ease',
            }}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <BookOpen size={16} />
            文档
          </UnstyledButton>

          <UnstyledButton
            component="a"
            href="#help"
            style={{
              padding: `${rem(8)} ${rem(16)}`,
              borderRadius: rem(8),
              display: 'flex',
              alignItems: 'center',
              gap: rem(8),
              color: 'hsl(var(--color-foreground))',
              fontSize: rem(14),
              fontWeight: 500,
              transition: 'all 150ms ease',
            }}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <HelpCircle size={16} />
            帮助
          </UnstyledButton>
        </Group>

        {/* Desktop Actions */}
        <Group gap="sm" visibleFrom="md">
          <ModeToggle />
          <ActionIcon
            variant="subtle"
            size="lg"
            component="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'hsl(var(--color-foreground))',
              transition: 'all 150ms ease',
            }}
            className="hover:bg-accent"
          >
            <Github size={18} />
          </ActionIcon>
          <MantineButton
            leftSection={<Activity size={16} />}
            size="sm"
            radius="md"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-primary-hover)))',
              boxShadow: '0 2px 8px hsl(var(--color-primary) / 0.3)',
            }}
          >
            开始使用
          </MantineButton>
        </Group>

        {/* Mobile Menu Button */}
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="md" size="sm" />
      </div>

      {/* Mobile Navigation */}
      <Drawer
        opened={mobileOpened}
        onClose={closeMobile}
        size="100%"
        padding="md"
        hiddenFrom="md"
        zIndex={1000000}
        styles={{
          content: {
            backgroundColor: 'hsl(var(--color-background))',
          },
        }}
      >
        <Stack gap="lg">
          <Text fw={600} size="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: '0.1em' }}>
            主要功能
          </Text>

          <Stack gap="xs">
            {tools.slice(0, 4).map((tool) => (
              <UnstyledButton
                key={tool.title}
                component="a"
                href={tool.href}
                onClick={closeMobile}
                style={{
                  padding: rem(16),
                  borderRadius: rem(12),
                  border: '1px solid hsl(var(--color-border))',
                  transition: 'all 150ms ease',
                }}
                className="hover:bg-accent"
              >
                <Group gap="md">
                  <Box
                    style={{
                      width: rem(40),
                      height: rem(40),
                      borderRadius: rem(8),
                      backgroundColor: 'hsl(var(--color-accent))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tool.icon}
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Text fw={500} size="sm">
                      {tool.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {tool.description}
                    </Text>
                  </Box>
                  {tool.badge && (
                    <Badge size="xs" variant="light" color="blue">
                      {tool.badge}
                    </Badge>
                  )}
                </Group>
              </UnstyledButton>
            ))}
          </Stack>

          <Divider />

          <Group justify="space-between">
            <Text fw={500} size="sm">
              主题设置
            </Text>
            <ModeToggle />
          </Group>

          <MantineButton
            variant="subtle"
            leftSection={<Github size={16} />}
            component="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            justify="start"
            fullWidth
          >
            GitHub 仓库
          </MantineButton>

          <MantineButton
            leftSection={<Activity size={16} />}
            size="md"
            radius="md"
            fullWidth
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-primary-hover)))',
              boxShadow: '0 2px 8px hsl(var(--color-primary) / 0.3)',
            }}
          >
            开始使用
          </MantineButton>
        </Stack>
      </Drawer>
    </header>
  );
};
