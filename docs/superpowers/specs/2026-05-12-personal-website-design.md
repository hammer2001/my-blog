# 个人网站设计方案

## 概述

构建一个综合个人网站，模仿 Baokker's Blog 的功能，使用 Astro 静态站点生成器 + Tailwind CSS 构建，温暖人文风格设计。本地开发完成后部署上线。

## 技术栈

| 层 | 选型 | 说明 |
|---|------|------|
| 框架 | Astro | 静态站点生成，内容型网站首选 |
| 样式 | Tailwind CSS | 原子化 CSS，通过 theme.extend 定制暖色调 |
| 内容 | Markdown 文件 | 本地编辑，Git 版本控制 |
| 搜索 | Pagefind | 构建后自动生成索引，纯前端搜索，无需后端 |
| 评论 | Giscus | 基于 GitHub Discussions，无需后端 |
| RSS | Astro 内置 | `@astrojs/rss` |
| 深色模式 | Tailwind dark: + 切换按钮 | 支持用户偏好检测 + 手动切换 |

## 设计风格

- **基调**：温暖人文 — 暖色调（米白/奶油/棕褐），衬线字体标题，类似一本打开的书
- **配色方案**：浅色背景（米白系），暖棕强调色，柔和渐变 Banner
- **字体**：标题使用衬线体（如 Noto Serif SC），正文使用无衬线体
- **深色模式**：深棕/深灰背景，暖金色点缀

## 页面结构（7 个页面）

### 1. 首页 (`/`)
- 顶部 Banner：暖色渐变背景 + 站点标题 + 副标题 + 导航菜单
- 文章卡片列表：封面图（可选）、标题、日期、摘要、分类标签
- 分页导航

### 2. 文章详情页 (`/posts/[slug]/`)
- 文章头图（可选）
- 标题、日期、分类、标签元信息
- Markdown 渲染正文（代码高亮、图片/视频、链接）
- 右侧 TOC 目录导航（桌面端）
- 文末版权声明 + 评论区（Giscus）

### 3. 归档页 (`/archives/`)
- 按年份分组的时间线布局
- 每条显示日期 + 标题链接

### 4. 分类页 (`/categories/`)
- 分类卡片网格，显示分类名 + 文章计数
- 点击进入分类筛选视图（该分类下的文章列表）

### 5. 标签页 (`/tags/`)
- 标签云展示，字号按文章数量加权
- 点击标签筛选相关文章

### 6. 关于页 (`/about/`)
- 头像 + 个人简介
- 联系方式（邮箱/社交链接）
- 可选技术栈展示

### 7. 项目展示页 (`/projects/`)
- 项目卡片网格
- 截图、项目名、简介、技术标签、链接

## 导航结构

主导航：首页 | 归档 | 分类 | 标签 | 关于 | 项目

## 内容组织

- 文章：`src/content/posts/*.md`，Frontmatter 包含 title、date、categories、tags、cover（可选）、summary（可选）
- 项目：`src/content/projects/*.md`，Frontmatter 包含 name、description、image、tags、url
- 静态资源：`src/assets/` 和 `public/`

## 组件树

```
Layout (全局布局：导航栏 + 页脚)
├── HomePage
│   ├── Banner（站点标题/副标题）
│   └── PostCard[]（文章卡片列表）
├── PostDetail
│   ├── PostHeader（头图/标题/元信息）
│   ├── TOC（目录导航）
│   ├── PostBody（Markdown 正文）
│   └── Comments（Giscus）
├── ArchivePage（时间线）
├── CategoriesPage（分类卡片）
├── TagsPage（标签云）
├── AboutPage（个人信息）
└── ProjectsPage（项目卡片）
```

## 项目结构

```
my-blog/
├── src/
│   ├── content/
│   │   ├── posts/          # 文章 .md 文件
│   │   └── projects/       # 项目 .md 文件
│   ├── pages/              # 页面路由
│   │   ├── index.astro
│   │   ├── posts/[...slug].astro
│   │   ├── archives.astro
│   │   ├── categories.astro
│   │   ├── tags.astro
│   │   ├── about.astro
│   │   └── projects.astro
│   ├── components/         # 可复用组件
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   └── global.css
│   └── assets/             # 图片、视频
├── public/                 # favicon 等直接复制的文件
├── tailwind.config.mjs
└── astro.config.mjs
```

## 关键功能实现

### Markdown 内容编写
- 在 `src/content/posts/` 下创建 `.md` 文件
- Frontmatter 声明元数据，正文使用标准 Markdown 语法
- 图片：`![alt](src/assets/xxx.jpg)` 或相对路径
- 视频：Markdown 中嵌入 `<video>` 标签
- 链接：标准 `[text](url)` 语法

### 搜索（Pagefind）
- `astro build` 后运行 Pagefind 索引静态文件
- 纯前端搜索，无需后端服务
- 搜索框放在导航栏或首页

### 评论（Giscus）
- 用户需有 GitHub 仓库开启 Discussions
- 在文章底部嵌入 Giscus `<script>` 组件
- 评论数据存储在 GitHub Discussions 中

### RSS
- 使用 `@astrojs/rss` 在构建时生成 XML
- 放在 `/rss.xml` 路径

### 深色模式
- Tailwind `darkMode: 'class'` 配置
- 切换按钮 toggle `.dark` class 到 `<html>`
- 默认跟随系统 `prefers-color-scheme`

## 部署路径

1. 本地开发：`astro dev`（热更新预览）
2. 构建：`astro build`（生成静态文件到 `dist/`）
3. 部署：待定（GitHub Pages / Vercel / 自购域名）
