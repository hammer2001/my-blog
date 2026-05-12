# 个人网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 Astro + Tailwind CSS 构建一个温暖人文风格的综合个人网站，包含博客、归档、分类、标签、关于、项目展示 7 个页面，支持搜索、评论、RSS 和深色模式。

**Architecture:** Astro 静态站点，内容通过 Markdown 文件管理，Tailwind CSS 定制暖色调主题，Pagefind 提供前端搜索，Giscus 接入评论。所有页面共享 BaseLayout（导航栏 + 页脚 + 深色模式切换）。

**Tech Stack:** Astro 5, Tailwind CSS 4, @astrojs/rss, Pagefind, Giscus

---

## 文件结构

```
my-blog/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── posts/
│   │   │   ├── hello-world.md
│   │   │   ├── example-post.md
│   │   │   └── markdown-guide.md
│   │   └── projects/
│   │       └── sample-project.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── posts/[...slug].astro
│   │   ├── archives.astro
│   │   ├── categories.astro
│   │   ├── categories/[category].astro
│   │   ├── tags.astro
│   │   ├── tags/[tag].astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   └── rss.xml.js
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── Banner.astro
│   │   ├── PostCard.astro
│   │   ├── PostHeader.astro
│   │   ├── TOC.astro
│   │   ├── Comments.astro
│   │   ├── TagCloud.astro
│   │   ├── ProjectCard.astro
│   │   └── SearchBox.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   └── global.css
│   └── assets/
├── public/
│   └── favicon.svg
```

---

### Task 1: 项目脚手架 — 创建 Astro 项目并安装依赖

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`

- [ ] **Step 1: 初始化项目**

```bash
cd "c:/Users/yhwan/Desktop/code-learning/claude/26.5.11 personal web"
npm create astro@latest . -- --skip-houston --template minimal --install
```

- [ ] **Step 2: 安装运行时依赖**

```bash
npm install @astrojs/rss
```

- [ ] **Step 3: 安装开发依赖**

```bash
npm install -D @tailwindcss/vite pagefind
```

- [ ] **Step 4: 确认 package.json 存在且依赖完整**

Run: `node -e "const p = require('./package.json'); console.log(p.dependencies, p.devDependencies)"`

### Task 2: Astro 配置 — 配置 Astro 和 Tailwind 集成

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: 编写 astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
```

### Task 3: Tailwind 主题 — 暖色调设计系统 + 全局样式

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: 编写全局 CSS，导入 Tailwind 并定义暖色主题**

```css
@import "tailwindcss";

@theme {
  --color-warm-50: #fef9f0;
  --color-warm-100: #fdf2e0;
  --color-warm-200: #f5e6d3;
  --color-warm-300: #e8c9a0;
  --color-warm-400: #d4a574;
  --color-warm-500: #c4754b;
  --color-warm-600: #a85a3a;
  --color-warm-700: #8b452d;
  --color-warm-800: #6d3424;
  --color-warm-900: #4a2018;

  --font-serif: 'Noto Serif SC', 'Source Han Serif SC', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 基础样式 */
html {
  font-family: var(--font-sans);
  scroll-behavior: smooth;
}

body {
  @apply bg-warm-50 text-warm-900 antialiased;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark body {
  @apply bg-warm-900 text-warm-100;
}

/* 文章正文排版 */
.prose {
  @apply text-lg leading-relaxed;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  font-family: var(--font-serif);
  @apply font-bold mt-8 mb-4;
}

.prose h2 { @apply text-2xl border-b border-warm-200 pb-2; }
.dark .prose h2 { @apply border-warm-700; }

.prose h3 { @apply text-xl; }

.prose p { @apply mb-4; }

.prose a { @apply text-warm-600 underline underline-offset-2 hover:text-warm-800; }
.dark .prose a { @apply text-warm-400 hover:text-warm-200; }

.prose img { @apply rounded-lg shadow-md my-6 mx-auto; }

.prose blockquote {
  @apply border-l-4 border-warm-400 pl-4 my-4 italic text-warm-700;
}
.dark .prose blockquote { @apply border-warm-500 text-warm-300; }

.prose code {
  @apply bg-warm-200 text-warm-800 rounded px-1.5 py-0.5 text-sm font-mono;
}
.dark .prose code { @apply bg-warm-800 text-warm-200; }

.prose pre {
  @apply rounded-lg p-4 overflow-x-auto my-6;
}

.prose ul, .prose ol { @apply mb-4 pl-6; }
.prose li { @apply mb-1; }

.prose video { @apply rounded-lg shadow-md my-6 w-full; }

.prose hr { @apply border-warm-200 my-8; }
.dark .prose hr { @apply border-warm-700; }

/* 选中文字 */
::selection {
  @apply bg-warm-300 text-warm-900;
}
.dark ::selection {
  @apply bg-warm-600 text-warm-100;
}
```

### Task 4: 布局组件 — BaseLayout、导航栏、页脚、主题切换

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ThemeToggle.astro`

- [ ] **Step 1: 编写 ThemeToggle 组件**

```astro
---
// src/components/ThemeToggle.astro
---

<button
  id="theme-toggle"
  type="button"
  aria-label="切换深色模式"
  class="p-2 rounded-lg hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors cursor-pointer"
>
  <!-- 太阳图标（亮色模式时显示） -->
  <svg id="sun-icon" class="w-5 h-5 hidden dark:block text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
  <!-- 月亮图标（暗色模式时显示） -->
  <svg id="moon-icon" class="w-5 h-5 block dark:hidden text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // 初始化：读取 localStorage 或跟随系统偏好
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  toggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

- [ ] **Step 2: 编写 Nav 导航栏组件**

```astro
---
// src/components/Nav.astro
import ThemeToggle from './ThemeToggle.astro';

const navItems = [
  { label: '首页', href: '/' },
  { label: '归档', href: '/archives' },
  { label: '分类', href: '/categories' },
  { label: '标签', href: '/tags' },
  { label: '关于', href: '/about' },
  { label: '项目', href: '/projects' },
];
---

<header class="sticky top-0 z-50 bg-warm-50/90 dark:bg-warm-900/90 backdrop-blur-sm border-b border-warm-200 dark:border-warm-700">
  <nav class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-200 hover:text-warm-600 transition-colors">
      站点标题
    </a>

    <!-- 桌面端导航 -->
    <ul class="hidden md:flex items-center gap-6">
      {navItems.map(item => (
        <li>
          <a
            href={item.href}
            class="text-sm text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-200 transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
      <li><ThemeToggle /></li>
    </ul>

    <!-- 移动端菜单按钮 -->
    <button id="mobile-menu-btn" type="button" aria-label="菜单" class="md:hidden p-2">
      <svg class="w-6 h-6 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>

  <!-- 移动端下拉菜单 -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-warm-200 dark:border-warm-700 bg-warm-50 dark:bg-warm-900">
    <ul class="flex flex-col px-4 py-3 gap-3">
      {navItems.map(item => (
        <li>
          <a href={item.href} class="block text-sm text-warm-600 dark:text-warm-400 py-1">
            {item.label}
          </a>
        </li>
      ))}
      <li class="pt-2 border-t border-warm-200 dark:border-warm-700"><ThemeToggle /></li>
    </ul>
  </div>
</header>

<script>
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });
</script>
```

- [ ] **Step 3: 编写 Footer 页脚组件**

```astro
---
// src/components/Footer.astro
---

<footer class="border-t border-warm-200 dark:border-warm-700 mt-16">
  <div class="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-warm-500 dark:text-warm-400">
    <p>&copy; {new Date().getFullYear()} 个人网站. Built with Astro.</p>
  </div>
</footer>
```

- [ ] **Step 4: 编写 BaseLayout 布局**

```astro
---
// src/layouts/BaseLayout.astro
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description || title} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Task 5: 内容集合 — 定义文章和项目的数据结构

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/posts/hello-world.md`
- Create: `src/content/posts/example-post.md`
- Create: `src/content/posts/markdown-guide.md`
- Create: `src/content/projects/sample-project.md`

- [ ] **Step 1: 编写内容集合配置**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
```

- [ ] **Step 2: 编写示例文章 hello-world.md**

```md
---
title: "你好，世界"
date: 2026-05-01
categories: ["生活"]
tags: ["随笔", "博客"]
summary: "这是我的第一篇博客文章，记录搭建个人网站的过程与心得。"
---

## 开始

一直想拥有一个自己的个人网站，今天终于迈出了第一步。

这个网站使用 Astro 构建，选择了一套温暖的颜色方案，希望给来访的朋友一种舒适、放松的阅读体验。

## 我会写些什么

- **技术笔记**：编程学习过程中的记录和总结
- **读书感想**：阅读后的思考和感悟
- **生活随笔**：日常生活中的点滴记录

> 写作是思考的延伸。通过文字，我们更好地理解自己和世界。

期待在这里与你相遇。
```

- [ ] **Step 3: 编写示例文章 example-post.md**

```md
---
title: "Markdown 写作示例"
date: 2026-05-08
categories: ["技术"]
tags: ["Markdown", "教程"]
summary: "这篇示例展示了 Markdown 的各种写作格式，包括标题、图片、代码块、视频嵌入和链接。"
cover: ""
---

## Markdown 基本语法

Markdown 是一种轻量级的标记语言，让你可以专注于内容本身。

### 代码块

```python
def greet(name: str) -> str:
    return f"你好，{name}！"

print(greet("世界"))
```

### 插入图片

图片放在 `src/assets/` 目录下，然后在文章中引用：

![示例图片](/src/assets/example.jpg)

### 插入视频

<video controls>
  <source src="/src/assets/demo.mp4" type="video/mp4">
  你的浏览器不支持视频标签。
</video>

### 插入链接

- [Astro 官方文档](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)

### 列表

1. 第一项
2. 第二项
3. 第三项

- 无序列表项
- 另一项

### 引用

> 学而不思则罔，思而不学则殆。 —— 《论语》

### 表格

| 功能 | 状态 |
|------|------|
| 博客文章 | 已完成 |
| 评论系统 | 待配置 |
| RSS 订阅 | 已完成 |
```

- [ ] **Step 4: 编写功能指南文章 markdown-guide.md**

```md
---
title: "如何撰写文章"
date: 2026-05-10
categories: ["技术"]
tags: ["指南", "写作"]
summary: "本文说明如何在本站撰写和发布文章，包括 Frontmatter 配置、图片上传、视频嵌入和链接插入。"
---

## 快速开始

在 `src/content/posts/` 目录下创建一个 `.md` 文件，填入 Frontmatter 和正文即可。

### Frontmatter 配置

```yaml
---
title: "文章标题"
date: 2026-05-10
categories: ["分类1", "分类2"]
tags: ["标签1", "标签2"]
summary: "文章摘要，会显示在首页卡片上"
cover: "/src/assets/cover.jpg"  # 可选：文章封面图
---
```

### 插入图片

1. 将图片文件放入 `src/assets/` 目录
2. 在 Markdown 中引用：`![图片描述](/src/assets/文件名.jpg)`

### 插入视频

使用 HTML 的 `<video>` 标签：

```html
<video controls>
  <source src="/src/assets/视频文件.mp4" type="video/mp4">
</video>
```

### 插入链接

Markdown 链接：`[链接文字](https://example.com)`

HTML 链接（新窗口打开）：`<a href="https://example.com" target="_blank">链接文字</a>`
```

- [ ] **Step 5: 编写示例项目 sample-project.md**

```md
---
name: "个人网站"
description: "使用 Astro + Tailwind CSS 构建的个人博客网站，温暖人文风格。"
tags: ["Astro", "Tailwind CSS", "TypeScript"]
url: "https://github.com/example/my-blog"
order: 1
---
```

- [ ] **Step 6: 验证内容集合类型正确**

Run: `npx astro check`
Expected: No type errors (可能需要先运行一次 dev 来触发类型生成)

### Task 6: 首页 — Banner + 文章卡片列表 + 分页

**Files:**
- Create: `src/components/Banner.astro`
- Create: `src/components/PostCard.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: 编写 Banner 组件**

```astro
---
// src/components/Banner.astro
---

<section class="relative bg-gradient-to-br from-warm-200 via-warm-100 to-warm-50 dark:from-warm-800 dark:via-warm-900 dark:to-warm-900 py-20 md:py-28 border-b border-warm-200 dark:border-warm-700">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-5xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-4">
      站点标题
    </h1>
    <p class="text-lg text-warm-500 dark:text-warm-400 max-w-xl mx-auto">
      思考 · 记录 · 分享 — 一个温暖的个人空间
    </p>
  </div>
</section>
```

- [ ] **Step 2: 编写 PostCard 组件**

```astro
---
// src/components/PostCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'posts'>;
}

const { post } = Astro.props;
const { title, date, categories, tags, summary, cover } = post.data;
const href = `/posts/${post.id}/`;
---

<article class="group bg-white dark:bg-warm-800 rounded-xl shadow-sm hover:shadow-md border border-warm-200 dark:border-warm-700 overflow-hidden transition-all duration-200">
  {cover && (
    <a href={href} class="block aspect-[16/9] overflow-hidden">
      <img src={cover} alt={title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </a>
  )}
  <div class="p-6">
    <div class="flex items-center gap-3 text-xs text-warm-500 dark:text-warm-400 mb-3">
      <time datetime={date.toISOString()}>
        {date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
      {categories.length > 0 && (
        <span class="flex items-center gap-1">
          <span class="text-warm-300">·</span>
          {categories.map(cat => (
            <a href={`/categories/${cat}/`} class="hover:text-warm-600 dark:hover:text-warm-200 transition-colors">
              {cat}
            </a>
          ))}
        </span>
      )}
    </div>
    <h2 class="text-xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-2 group-hover:text-warm-600 dark:group-hover:text-warm-300 transition-colors">
      <a href={href}>{title}</a>
    </h2>
    {summary && (
      <p class="text-sm text-warm-500 dark:text-warm-400 leading-relaxed mb-3 line-clamp-2">{summary}</p>
    )}
    {tags.length > 0 && (
      <div class="flex flex-wrap gap-2">
        {tags.map(tag => (
          <a href={`/tags/${tag}/`} class="text-xs px-2 py-0.5 rounded-full bg-warm-100 dark:bg-warm-700 text-warm-600 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-600 transition-colors">
            #{tag}
          </a>
        ))}
      </div>
    )}
  </div>
</article>
```

- [ ] **Step 3: 编写首页**

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Banner from '../components/Banner.astro';
import PostCard from '../components/PostCard.astro';

const posts = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="首页" description="个人网站 — 思考 · 记录 · 分享">
  <Banner />
  <section class="max-w-5xl mx-auto px-4 py-12">
    {posts.length === 0 ? (
      <p class="text-center text-warm-500 py-20">还没有文章，开始写第一篇吧。</p>
    ) : (
      <div class="grid gap-8 md:grid-cols-2">
        {posts.map(post => <PostCard post={post} />)}
      </div>
    )}
  </section>
</BaseLayout>
```

### Task 7: 文章详情页 — 正文渲染 + TOC + 评论

**Files:**
- Create: `src/pages/posts/[...slug].astro`
- Create: `src/components/PostHeader.astro`
- Create: `src/components/TOC.astro`
- Create: `src/components/Comments.astro`

- [ ] **Step 1: 编写 PostHeader 组件**

```astro
---
// src/components/PostHeader.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'posts'>;
}

const { post } = Astro.props;
const { title, date, categories, tags, cover } = post.data;
---

<header class="mb-8">
  <h1 class="text-3xl md:text-4xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-4">
    {title}
  </h1>
  <div class="flex flex-wrap items-center gap-3 text-sm text-warm-500 dark:text-warm-400 mb-4">
    <time datetime={date.toISOString()}>
      {date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
    </time>
    {categories.map(cat => (
      <a href={`/categories/${cat}/`} class="px-2 py-0.5 rounded-full bg-warm-200 dark:bg-warm-700 text-warm-700 dark:text-warm-200 text-xs hover:bg-warm-300 transition-colors">
        {cat}
      </a>
    ))}
  </div>
  {tags.length > 0 && (
    <div class="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <a href={`/tags/${tag}/`} class="text-xs text-warm-500 hover:text-warm-700 dark:text-warm-400 dark:hover:text-warm-200 transition-colors">
          #{tag}
        </a>
      ))}
    </div>
  )}
  {cover && (
    <img src={cover} alt={title} class="w-full rounded-xl shadow-md mb-8" />
  )}
</header>
```

- [ ] **Step 2: 编写 TOC 目录组件**

```astro
---
// src/components/TOC.astro
interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

const { headings } = Astro.props;
const items = headings.filter(h => h.depth >= 2 && h.depth <= 3);
---

{items.length > 0 && (
  <nav class="hidden lg:block sticky top-24 w-56 shrink-0 self-start ml-4">
    <h4 class="text-sm font-semibold text-warm-600 dark:text-warm-300 mb-3">目录</h4>
    <ul class="space-y-1.5 text-sm border-l-2 border-warm-200 dark:border-warm-700">
      {items.map(heading => (
        <li class="pl-3" style={`padding-left: ${(heading.depth - 1) * 12}px`}>
          <a
            href={`#${heading.slug}`}
            class="text-warm-500 dark:text-warm-400 hover:text-warm-700 dark:hover:text-warm-200 transition-colors"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 3: 编写 Comments 评论组件**

```astro
---
// src/components/Comments.astro
interface Props {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

const { repo, repoId, category, categoryId } = Astro.props;
---

{repo && repoId && category && categoryId ? (
  <section class="mt-12 pt-8 border-t border-warm-200 dark:border-warm-700">
    <h3 class="text-xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-6">评论</h3>
    <div class="giscus"></div>
    <script src="https://giscus.app/client.js"
      data-repo={repo}
      data-repo-id={repoId}
      data-category={category}
      data-category-id={categoryId}
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async>
    </script>
  </section>
) : (
  <section class="mt-12 pt-8 border-t border-warm-200 dark:border-warm-700">
    <p class="text-sm text-warm-400 text-center">
      评论功能尚未配置。部署后请设置 Giscus。
    </p>
  </section>
)}
```

- [ ] **Step 4: 编写文章详情页**

```astro
---
// src/pages/posts/[...slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostHeader from '../../components/PostHeader.astro';
import TOC from '../../components/TOC.astro';
import Comments from '../../components/Comments.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.summary || post.data.title}>
  <article class="max-w-5xl mx-auto px-4 py-12">
    <div class="flex gap-8">
      <div class="min-w-0 flex-1 max-w-3xl mx-auto">
        <PostHeader post={post} />
        <div class="prose">
          <Content />
        </div>

        <!-- 版权声明 -->
        <div class="mt-12 p-4 rounded-lg bg-warm-100 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 text-sm text-warm-500 dark:text-warm-400">
          <p>&copy; {post.data.date.getFullYear()} 个人网站. 转载请注明出处。</p>
        </div>

        <Comments />
      </div>

      <TOC headings={headings} />
    </div>
  </article>
</BaseLayout>
```

### Task 8: 归档页 — 年份时间线

**Files:**
- Create: `src/pages/archives.astro`

- [ ] **Step 1: 编写归档页**

```astro
---
// src/pages/archives.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const allPosts = await getCollection('posts');
const posts = allPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

// 按年份分组
const groupedByYear: Record<number, typeof posts> = {};
for (const post of posts) {
  const year = post.data.date.getFullYear();
  (groupedByYear[year] ||= []).push(post);
}
const years = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);
---

<BaseLayout title="归档" description="文章归档 — 按时间线浏览所有文章">
  <section class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-8">归档</h1>

    {years.map(year => (
      <section class="mb-10">
        <h2 class="text-2xl font-bold font-[family-name:var(--font-serif)] text-warm-600 dark:text-warm-300 mb-4">{year}</h2>
        <ul class="space-y-3">
          {groupedByYear[year]!.map(post => (
            <li class="flex items-baseline gap-4 pb-3 border-b border-warm-100 dark:border-warm-800">
              <time datetime={post.data.date.toISOString()} class="text-sm text-warm-400 dark:text-warm-500 whitespace-nowrap">
                {post.data.date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
              </time>
              <a href={`/posts/${post.id}/`} class="text-warm-800 dark:text-warm-200 hover:text-warm-600 dark:hover:text-warm-300 transition-colors">
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    ))}

    {years.length === 0 && (
      <p class="text-center text-warm-500 py-20">还没有文章。</p>
    )}
  </section>
</BaseLayout>
```

### Task 9: 分类页 — 分类卡片 + 分类筛选

**Files:**
- Create: `src/pages/categories.astro`
- Create: `src/pages/categories/[category].astro`

- [ ] **Step 1: 编写分类列表页**

```astro
---
// src/pages/categories.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const posts = await getCollection('posts');

// 统计每个分类的文章数
const categoryMap = new Map<string, number>();
for (const post of posts) {
  for (const cat of post.data.categories) {
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  }
}
const categories = [...categoryMap.entries()].sort((a, b) => b[1] - a[1]);
---

<BaseLayout title="分类" description="文章分类 — 按主题浏览">
  <section class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-8">分类</h1>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(([name, count]) => (
        <a
          href={`/categories/${name}/`}
          class="group p-6 rounded-xl bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700 hover:shadow-md transition-all"
        >
          <h2 class="text-lg font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 group-hover:text-warm-600 transition-colors">
            {name}
          </h2>
          <p class="text-sm text-warm-500 mt-1">{count} 篇文章</p>
        </a>
      ))}
    </div>

    {categories.length === 0 && (
      <p class="text-center text-warm-500 py-20">还没有分类。</p>
    )}
  </section>
</BaseLayout>
```

- [ ] **Step 2: 编写分类筛选页**

```astro
---
// src/pages/categories/[category].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const cats = new Set<string>();
  for (const post of posts) {
    for (const cat of post.data.categories) cats.add(cat);
  }
  return [...cats].map(cat => ({ params: { category: cat } }));
}

const { category } = Astro.params;
const allPosts = await getCollection('posts');
const posts = allPosts
  .filter(p => p.data.categories.includes(category!))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title={`分类：${category}`} description={`浏览 ${category} 分类下的所有文章`}>
  <section class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-2">
      分类：{category}
    </h1>
    <p class="text-warm-500 mb-8">{posts.length} 篇文章</p>

    <div class="grid gap-8 md:grid-cols-2">
      {posts.map(post => <PostCard post={post} />)}
    </div>
  </section>
</BaseLayout>
```

### Task 10: 标签页 — 标签云 + 标签筛选

**Files:**
- Create: `src/pages/tags.astro`
- Create: `src/pages/tags/[tag].astro`
- Create: `src/components/TagCloud.astro`

- [ ] **Step 1: 编写 TagCloud 组件**

```astro
---
// src/components/TagCloud.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
const tagMap = new Map<string, number>();
for (const post of posts) {
  for (const tag of post.data.tags) {
    tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
  }
}
const tags = [...tagMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
const maxCount = Math.max(...tags.map(([, c]) => c), 1);
---

<div class="flex flex-wrap gap-3 justify-center">
  {tags.map(([name, count]) => {
    const size = 0.7 + (count / maxCount) * 1.3; // 0.7rem ~ 2rem
    return (
      <a
        href={`/tags/${name}/`}
        style={`font-size: ${size}rem`}
        class="text-warm-500 dark:text-warm-400 hover:text-warm-700 dark:hover:text-warm-200 transition-colors"
      >
        {name}
      </a>
    );
  })}
</div>
```

- [ ] **Step 2: 编写标签列表页**

```astro
---
// src/pages/tags.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import TagCloud from '../components/TagCloud.astro';
---

<BaseLayout title="标签" description="标签云 — 按关键词浏览文章">
  <section class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-8 text-center">标签</h1>
    <TagCloud />
  </section>
</BaseLayout>
```

- [ ] **Step 3: 编写标签筛选页**

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }
  return [...tags].map(tag => ({ params: { tag } }));
}

const { tag } = Astro.params;
const allPosts = await getCollection('posts');
const posts = allPosts
  .filter(p => p.data.tags.includes(tag!))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title={`标签：${tag}`} description={`浏览标签为 ${tag} 的所有文章`}>
  <section class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-2">
      标签：#{tag}
    </h1>
    <p class="text-warm-500 mb-8">{posts.length} 篇文章</p>

    <div class="grid gap-8 md:grid-cols-2">
      {posts.map(post => <PostCard post={post} />)}
    </div>
  </section>
</BaseLayout>
```

### Task 11: 关于页 — 个人介绍 + 联系方式

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: 编写关于页**

```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="关于" description="关于我和这个网站">
  <section class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-8">关于</h1>

    <div class="flex flex-col sm:flex-row gap-8 items-start">
      <!-- 头像占位 -->
      <div class="w-32 h-32 rounded-full bg-warm-200 dark:bg-warm-700 flex items-center justify-center text-4xl shrink-0">
        👤
      </div>

      <div class="space-y-4 text-warm-700 dark:text-warm-300 leading-relaxed">
        <p>你好，欢迎来到我的个人网站。</p>
        <p>这里记录我的思考、学习和生活。喜欢阅读、编程和探索新事物。</p>

        <div class="pt-4 space-y-2">
          <h3 class="font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-200">联系方式</h3>
          <p>
            📧 <a href="mailto:your-email@example.com" class="text-warm-600 dark:text-warm-400 hover:underline">your-email@example.com</a>
          </p>
          <p>
            💻 <a href="https://github.com/your-username" target="_blank" class="text-warm-600 dark:text-warm-400 hover:underline">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

### Task 12: 项目展示页 — 项目卡片网格

**Files:**
- Create: `src/pages/projects.astro`
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: 编写 ProjectCard 组件**

```astro
---
// src/components/ProjectCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { name, description, tags, url, image } = project.data;
---

<div class="group rounded-xl bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700 overflow-hidden hover:shadow-md transition-all">
  {image ? (
    <div class="aspect-[16/9] overflow-hidden">
      <img src={image} alt={name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
  ) : (
    <div class="aspect-[16/9] bg-gradient-to-br from-warm-200 to-warm-100 dark:from-warm-700 dark:to-warm-800 flex items-center justify-center">
      <span class="text-4xl">📂</span>
    </div>
  )}
  <div class="p-5">
    <h3 class="text-lg font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-2">
      {url ? <a href={url} target="_blank" class="hover:text-warm-600 transition-colors">{name}</a> : name}
    </h3>
    <p class="text-sm text-warm-500 dark:text-warm-400 mb-3">{description}</p>
    {tags.length > 0 && (
      <div class="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span class="text-xs px-2 py-0.5 rounded-full bg-warm-100 dark:bg-warm-700 text-warm-600 dark:text-warm-300">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
</div>
```

- [ ] **Step 2: 编写项目展示页**

```astro
---
// src/pages/projects.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';

const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="项目" description="项目作品展示">
  <section class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold font-[family-name:var(--font-serif)] text-warm-800 dark:text-warm-100 mb-8">项目</h1>

    {projects.length === 0 ? (
      <p class="text-center text-warm-500 py-20">还没有项目展示。</p>
    ) : (
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => <ProjectCard project={project} />)}
      </div>
    )}
  </section>
</BaseLayout>
```

### Task 13: RSS 订阅 — 生成 RSS XML

**Files:**
- Create: `src/pages/rss.xml.js`

- [ ] **Step 1: 编写 RSS 生成页面**

```js
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: '个人网站',
    description: '思考 · 记录 · 分享',
    site: context.site || 'https://example.com',
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary || '',
      link: `/posts/${post.id}/`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
```

### Task 14: 搜索 — Pagefind 前端搜索

**Files:**
- Create: `src/components/SearchBox.astro`

- [ ] **Step 1: 编写 SearchBox 组件**

```astro
---
// src/components/SearchBox.astro
---

<div id="search" class="relative">
  <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-warm-100 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 focus-within:border-warm-400 transition-colors">
    <svg class="w-4 h-4 text-warm-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      id="search-input"
      type="text"
      placeholder="搜索文章..."
      class="bg-transparent border-none outline-none text-sm text-warm-800 dark:text-warm-200 placeholder-warm-400 w-full"
    />
  </div>
  <div id="search-results" class="hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-warm-800 rounded-xl border border-warm-200 dark:border-warm-700 shadow-lg max-h-80 overflow-y-auto z-50">
  </div>
</div>

<script>
  function initSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    let pagefindReady = false;
    let pending = '';

    input.addEventListener('input', async () => {
      const term = input.value.trim();
      if (!term) { results.classList.add('hidden'); results.innerHTML = ''; return; }
      if (!pagefindReady) { pending = term; return; }
      doSearch(term);
    });

    async function doSearch(term: string) {
      try {
        const search = await (window as any).pagefind.search(term);
        if (!search?.results?.length) {
          results.classList.remove('hidden');
          results.innerHTML = '<div class="p-4 text-sm text-warm-400 text-center">没有找到相关文章</div>';
          return;
        }
        const html = (await Promise.all(search.results.slice(0, 8).map(async (r: any) => {
          const data = await r.data();
          return `<a href="${data.url}" class="block p-3 hover:bg-warm-50 dark:hover:bg-warm-700 border-b border-warm-100 dark:border-warm-700 last:border-0">
            <div class="text-sm font-medium text-warm-800 dark:text-warm-200">${data.meta?.title || data.url}</div>
            <div class="text-xs text-warm-400 mt-0.5 truncate">${data.excerpt || ''}</div>
          </a>`;
        }))).join('');
        results.innerHTML = html;
        results.classList.remove('hidden');
      } catch {
        results.classList.add('hidden');
      }
    }

    // 等待 Pagefind 加载
    async function waitPagefind() {
      while (!(window as any).pagefind) {
        await new Promise(r => setTimeout(r, 200));
      }
      pagefindReady = true;
      if (pending) { doSearch(pending); pending = ''; }
    }
    waitPagefind();

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('#search')) {
        results.classList.add('hidden');
      }
    });
  }

  initSearch();
</script>
```

- [ ] **Step 2: 将搜索框添加到 Nav 组件中**

Modify `src/components/Nav.astro`: 在桌面端导航 `<ul>` 之前、站点标题之后加入 `<SearchBox />`。文件顶部 import 中加入：

```astro
import SearchBox from './SearchBox.astro';
```

并在桌面端导航 ul 前插入：

```astro
<div class="hidden md:block w-48"><SearchBox /></div>
```

### Task 15: 收尾工作 — favicon + 构建验证

**Files:**
- Create: `public/favicon.svg`
- Create: `.gitignore`

- [ ] **Step 1: 创建 favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y="0.9em" font-size="80">📝</text>
</svg>
```

Save to `public/favicon.svg`.

- [ ] **Step 2: 确保 .gitignore 配置正确**

Run: `cat .gitignore` 检查是否包含 `dist/` 和 `node_modules/`

如不存在，写入：

```
dist/
node_modules/
.env
.superpowers/
```

- [ ] **Step 3: 本地构建验证**

```bash
npx astro build
```
Expected: 构建成功，`dist/` 目录生成。

- [ ] **Step 4: 验证本地预览**

```bash
npx astro dev
```
Expected: 访问 `http://localhost:4321` 能看到完整的网站，包括首页、文章详情、归档、分类、标签、关于、项目页面。

---

## 自检清单

| 检查项 | 状态 |
|--------|------|
| 7 个页面全部实现（首页、文章详情、归档、分类、标签、关于、项目） | ✅ Task 6-12 |
| 暖色调 Tailwind 主题配置 | ✅ Task 3 |
| 深色模式切换 | ✅ Task 4 |
| 文章 Markdown 渲染（代码高亮、图片、视频、链接） | ✅ Task 7 |
| 搜索功能（Pagefind） | ✅ Task 14 |
| 评论系统（Giscus） | ✅ Task 7 |
| RSS 订阅 | ✅ Task 13 |
| 响应式设计（手机/平板/桌面） | ✅ 各组件中均已包含 |
| 分类/标签筛选页 | ✅ Task 9, 10 |
| 归档时间线 | ✅ Task 8 |
| 项目展示 | ✅ Task 12 |
