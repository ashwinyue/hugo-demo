# Hugo 博客网站

这是一个使用 Hugo 静态网站生成器和 GitHub Pages 构建的博客网站。

## 特性

- 🚀 使用 Hugo 快速构建
- 🎨 采用 PaperMod 主题
- 📱 响应式设计
- 🔄 自动部署到 GitHub Pages
- 📝 支持 Markdown 写作
- 🏷️ 支持标签和分类
- 🔍 内置搜索功能

## 本地开发

### 前提条件

- 安装 Hugo (Extended版本)
- 安装 Git

### 安装 Hugo

在 macOS 上使用 Homebrew：
```bash
brew install hugo
```

### 克隆项目

```bash
git clone https://github.com/solariswu/hugo-demo.git
cd hugo-demo
git submodule update --init --recursive
```

### 本地运行

```bash
hugo server --buildDrafts
```

然后在浏览器中访问 `http://localhost:1313/hugo-demo/`

## 创建新文章

```bash
hugo new content posts/your-post-title.md
```

编辑生成的 Markdown 文件，将 `draft: true` 改为 `draft: false` 来发布文章。

## 部署到 GitHub Pages

1. 在 GitHub 上创建一个名为 `hugo-demo` 的仓库
2. 将代码推送到 GitHub：
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/solariswu/hugo-demo.git
   git push -u origin main
   ```
3. 在 GitHub 仓库设置中启用 Pages，选择 "GitHub Actions" 作为源
4. GitHub Actions 会自动构建和部署网站

## 配置

主要配置文件是 `hugo.toml`，你可以在其中修改：

- 网站标题和描述
- 作者信息
- 社交媒体链接
- 菜单项
- 主题设置

## 主题

本项目使用 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主题。

## 许可证

MIT License