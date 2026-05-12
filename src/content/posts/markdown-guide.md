---
title: "如何撰写文章"
date: 2026-05-11
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
