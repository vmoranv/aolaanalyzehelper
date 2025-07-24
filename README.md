# 奥拉星技能属性解析器

一个用于解析奥拉星游戏JavaScript文件中技能属性数据的React+TypeScript+Vite项目。

## 功能特性

- 🚀 自动获取并解析奥拉星游戏数据
- 🔍 实时搜索和过滤技能属性
- 📱 响应式设计，支持移动端
- ⚡ 基于Vite的快速开发体验
- 🛡️ 完整的TypeScript类型支持
- 🎨 现代化的UI界面

## 解析数据

项目会自动从 `http://aola.100bt.com/h5/js/gamemain.js` 获取并解析以下格式的数据：

```javascript
PMAttributeMap._skillAttributeData = [
  [0, '普通'],
  [1, '格斗'],
  [2, '飞行'],
  [3, '毒'],
  [4, '爬行'],
  [5, '土'],
  [6, '虫'],
  [7, '数码'],
  [8, '机械'],
  [9, '火'],
  [10, '水'],
  [11, '木'],
  [12, '电'],
  [13, '神秘'],
  [14, '冰'],
  [15, '上古'],
  // ... 更多属性
];
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
pnpm dev
```

### 构建项目

```bash
npm run build
# 或
pnpm build
```

### 预览构建结果

```bash
npm run preview
# 或
pnpm preview
```

## 部署到Vercel

1. 将项目推送到GitHub仓库
2. 在Vercel中导入项目
3. 自动部署完成

或者使用Vercel CLI：

```bash
npm install -g vercel
vercel
```

## 项目结构

```
src/
├── api/                    # API逻辑
│   ├── skill-attributes.ts # 技能属性解析
│   └── health.ts          # 健康检查
├── components/            # React组件
│   └── SkillAttributeViewer.tsx
├── services/             # 服务层
│   └── aolaApi.ts       # API调用封装
├── App.tsx              # 主应用组件
└── main.tsx            # 应用入口
```

## 核心功能

### 数据解析

- 智能正则表达式匹配多种代码格式
- 自动清理JavaScript注释
- 安全的数据解析（避免使用eval）
- 完整的类型验证

### 用户界面

- 实时搜索和过滤
- 响应式网格布局
- 状态指示器
- 错误处理和用户反馈

### 技术栈

- **前端**: React 19 + TypeScript + Vite
- **样式**: CSS-in-JS (styled-jsx)
- **状态管理**: React Hooks
- **构建工具**: Vite
- **部署**: Vercel

## API说明

### fetchSkillAttributes()

获取技能属性数据

**返回格式:**

```typescript
{
  success: boolean;
  data: [number, string][];  // [ID, 名称] 格式的数组
  count: number;
  timestamp: string;
}
```

### checkHealth()

检查应用健康状态

**返回格式:**

```typescript
{
  success: boolean;
  status: string;
  service: string;
  version: string;
  timestamp: string;
}
```

## 开发说明

### 添加新功能

1. 在 `src/api/` 中添加新的解析逻辑
2. 在 `src/services/` 中封装API调用
3. 在 `src/components/` 中创建UI组件
4. 更新类型定义

### 错误处理

项目包含完整的错误处理机制：

- 网络请求错误
- 数据解析错误
- 类型验证错误
- 用户友好的错误提示

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！
