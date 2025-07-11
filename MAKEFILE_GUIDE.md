# Makefile 使用指南

## 📋 概述

本项目提供了完整的 Makefile 支持，让您可以通过简单的 `make` 命令来管理整个 Hugo 微信文章自动发布系统。

## 🚀 快速开始

### 1. 首次使用

```bash
# 查看所有可用命令
make help

# 初始化环境（安装依赖 + 设置权限）
make setup
```

### 2. 日常使用

```bash
# 启动交互式发布助手（推荐）
make start-interactive

# 或者直接发布单篇文章
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=summary
```

## 📚 命令详解

### 基础命令

| 命令 | 功能 | 说明 |
|------|------|------|
| `make help` | 显示帮助信息 | 查看所有可用命令和使用示例 |
| `make install` | 安装依赖包 | 安装所有必需的 Python 包 |
| `make setup` | 环境初始化 | 安装依赖 + 设置脚本权限 |
| `make clean` | 清理临时文件 | 删除 .pyc、__pycache__ 等临时文件 |

### 启动命令

| 命令 | 功能 | 说明 |
|------|------|------|
| `make start-hugo` | 启动 Hugo 服务器 | 在 http://localhost:1313/hugo-demo/ 启动开发服务器 |
| `make start-interactive` | 启动交互式助手 | 通过对话方式发布文章 |
| `make demo` | 运行演示脚本 | 展示系统功能的演示 |

### 发布命令

```bash
# 基本用法
make publish URL="文章链接" STYLE="笔记风格"

# 示例
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=summary
make publish URL="https://mp.weixin.qq.com/s/yyy" STYLE=detailed
```

**支持的笔记风格：**
- `summary` - 摘要式笔记
- `detailed` - 详细分析
- `mind_map` - 思维导图
- `key_points` - 要点提取

### 检查命令

| 命令 | 功能 | 说明 |
|------|------|------|
| `make check` | 环境检查 | 检查 Python、Hugo、Git 版本和状态 |
| `make status` | 项目状态 | 显示文章数量、最新文章、Git 状态等 |

## 🎯 使用场景

### 场景1：首次使用

```bash
# 1. 初始化环境
make setup

# 2. 启动交互式助手
make start-interactive

# 3. 在助手中输入微信文章链接
```

### 场景2：批量发布

```bash
# 发布多篇文章
make publish URL="https://mp.weixin.qq.com/s/article1" STYLE=summary
make publish URL="https://mp.weixin.qq.com/s/article2" STYLE=detailed
make publish URL="https://mp.weixin.qq.com/s/article3" STYLE=mind_map
```

### 场景3：开发调试

```bash
# 启动 Hugo 服务器查看效果
make start-hugo

# 在另一个终端发布文章
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=summary

# 检查项目状态
make status
```

### 场景4：维护清理

```bash
# 清理临时文件
make clean

# 检查环境状态
make check

# 重新设置环境
make setup
```

## 🔧 高级用法

### 组合命令

```bash
# 快速启动（设置环境 + 启动助手）
make quick-start

# 发布后立即查看
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=summary && make start-hugo
```

### 自定义参数

```bash
# 使用默认风格（summary）
make publish URL="https://mp.weixin.qq.com/s/xxx"

# 指定特定风格
make publish URL="https://mp.weixin.qq.com/s/xxx" STYLE=detailed
```

## 🛠️ 故障排除

### 常见问题

1. **权限错误**
   ```bash
   make setup  # 重新设置权限
   ```

2. **依赖缺失**
   ```bash
   make install  # 重新安装依赖
   ```

3. **环境检查**
   ```bash
   make check  # 检查环境状态
   ```

4. **清理重置**
   ```bash
   make clean && make setup  # 清理后重新设置
   ```

### 错误信息

- `❌ 错误: 请提供文章URL` - 使用 publish 命令时必须提供 URL 参数
- `command not found: make` - 需要安装 make 工具
- `No such file or directory` - 确保在项目根目录执行命令

## 📝 最佳实践

1. **首次使用务必运行 `make setup`**
2. **推荐使用 `make start-interactive` 进行交互式发布**
3. **定期运行 `make clean` 清理临时文件**
4. **使用 `make status` 监控项目状态**
5. **发布前用 `make check` 检查环境**

## 🔗 相关文档

- [自动推送指南](PUSH_AUTOMATION_README.md)
- [详细使用指南](AUTO_PUBLISH_GUIDE.md)
- [快速参考](QUICK_REFERENCE.md)
- [MCP Hugo 使用指南](MCP_HUGO_USAGE_GUIDE.md)

---

💡 **提示**: 使用 `make help` 随时查看最新的命令列表和使用示例！