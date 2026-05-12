---
title: "Markdown 写作示例"
date: 2026-05-12
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
