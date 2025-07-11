# Hugo 微信文章自动发布系统 Makefile
# 提供便捷的命令来管理和启动各种功能

.PHONY: help install start-hugo start-interactive publish-article demo clean setup

# 默认目标
help:
	@echo "🚀 Hugo 微信文章自动发布系统"
	@echo ""
	@echo "可用命令:"
	@echo "  make install          - 安装所有依赖包"
	@echo "  make setup            - 初始化环境和权限设置"
	@echo "  make start-hugo       - 启动 Hugo 开发服务器"
	@echo "  make start-interactive - 启动交互式发布助手"
	@echo "  make demo             - 运行演示脚本"
	@echo "  make publish URL=<url> STYLE=<style> - 发布单篇文章"
	@echo "  make clean            - 清理临时文件"
	@echo "  make help             - 显示此帮助信息"
	@echo ""
	@echo "示例:"
	@echo "  make publish URL='https://mp.weixin.qq.com/s/xxx' STYLE=summary"
	@echo "  make start-interactive"

# 安装依赖
install:
	@echo "📦 安装 Python 依赖包..."
	pip3 install --break-system-packages requests selenium webdriver-manager beautifulsoup4 lxml
	@echo "✅ 依赖安装完成"

# 环境设置
setup: install
	@echo "🔧 设置脚本执行权限..."
	chmod +x python-wechat-mcp/quick_publish.sh
	chmod +x python-wechat-mcp/interactive_publish.py
	chmod +x python-wechat-mcp/auto_publish_hugo.py
	@echo "✅ 环境设置完成"

# 启动 Hugo 开发服务器
start-hugo:
	@echo "🌐 启动 Hugo 开发服务器..."
	hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313/hugo-demo/

# 启动交互式发布助手
start-interactive:
	@echo "🤖 启动交互式发布助手..."
	cd python-wechat-mcp && python3 interactive_publish.py

# 发布单篇文章 (需要提供 URL 和 STYLE 参数)
publish:
	@if [ -z "$(URL)" ]; then \
		echo "❌ 错误: 请提供文章URL"; \
		echo "用法: make publish URL='https://mp.weixin.qq.com/s/xxx' STYLE=summary"; \
		exit 1; \
	fi
	@echo "📝 发布文章: $(URL)"
	@echo "📋 笔记风格: $(or $(STYLE),summary)"
	./python-wechat-mcp/quick_publish.sh "$(URL)" "$(or $(STYLE),summary)"

# 运行演示
demo:
	@echo "🎬 运行演示脚本..."
	cd python-wechat-mcp && python3 demo_auto_push.py

# 清理临时文件
clean:
	@echo "🧹 清理临时文件..."
	find . -name "*.pyc" -delete
	find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	find . -name ".DS_Store" -delete 2>/dev/null || true
	@echo "✅ 清理完成"

# 快速启动 (组合命令)
quick-start: setup start-interactive

# 检查环境
check:
	@echo "🔍 检查环境状态..."
	@echo "Python 版本:"
	@python3 --version
	@echo "Hugo 版本:"
	@hugo version
	@echo "Git 状态:"
	@git status --porcelain
	@echo "✅ 环境检查完成"

# 显示项目状态
status:
	@echo "📊 项目状态:"
	@echo "文章数量: $$(find content/posts -name '*.md' | wc -l)"
	@echo "最新文章: $$(ls -t content/posts/*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo '无')"
	@echo "Git 分支: $$(git branch --show-current)"
	@echo "未提交更改: $$(git status --porcelain | wc -l)"