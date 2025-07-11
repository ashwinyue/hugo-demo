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

## 🚀 自动推送功能

### 使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 初始化环境（首次使用）
make setup

# 启动交互式发布助手
make start-interactive

# 发布单篇文章
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=summary

# 启动Hugo服务器
make start-hugo
```

### 传统方式

```bash
# 快速发布（Shell脚本）
./python-wechat-mcp/quick_publish.sh "https://mp.weixin.qq.com/s/xxx" "summary"

# 或使用Python脚本
python3 python-wechat-mcp/auto_publish_hugo.py --url "https://mp.weixin.qq.com/s/xxx" --style summary --auto-push
```

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

## 详细使用指南

- [Makefile使用指南](MAKEFILE_GUIDE.md) - 通过make命令管理项目（推荐）
- [Hugo集成功能使用指南](MCP_HUGO_USAGE_GUIDE.md) - 详细的功能说明和使用方法
- [快速参考卡片](QUICK_REFERENCE.md) - 常用命令和故障排除
- [自动推送功能说明](PUSH_AUTOMATION_README.md) - 一键发布的完整指南
- [自动发布详细指南](AUTO_PUBLISH_GUIDE.md) - 脚本使用和配置说明

## 许可证

MIT License