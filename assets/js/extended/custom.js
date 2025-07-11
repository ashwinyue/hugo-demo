// Hugo博客自定义JavaScript增强
// 基于PaperMod主题的功能扩展

(function() {
    'use strict';

    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initCustomFeatures();
    });

    function initCustomFeatures() {
        // 初始化所有自定义功能
        initSmoothScroll();
        initImageLazyLoad();
        initReadingProgress();
        initBackToTop();
        initCodeBlockEnhancement();
        initSearchEnhancement();
        initTocEnhancement();
        initThemeToggleEnhancement();
    }

    // 平滑滚动
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 图片懒加载
    function initImageLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // 阅读进度条
    function initReadingProgress() {
        const progressBar = createProgressBar();
        if (!progressBar) return;

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);

        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }

        function createProgressBar() {
            if (document.querySelector('.reading-progress')) return null;
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'reading-progress-container';
            progressContainer.innerHTML = '<div class="reading-progress"></div>';
            
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .reading-progress-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: rgba(0,0,0,0.1);
                    z-index: 1000;
                }
                .reading-progress {
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    width: 0%;
                    transition: width 0.3s ease;
                }
                [data-theme="dark"] .reading-progress-container {
                    background: rgba(255,255,255,0.1);
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(progressContainer);
            
            return progressContainer.querySelector('.reading-progress');
        }
    }

    // 增强返回顶部按钮
    function initBackToTop() {
        const backToTopBtn = document.querySelector('#top-link');
        if (!backToTopBtn) return;

        // 添加平滑滚动
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 添加滚动显示/隐藏效果
        let isVisible = false;
        window.addEventListener('scroll', function() {
            const shouldShow = window.pageYOffset > 300;
            
            if (shouldShow && !isVisible) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(20px)';
                isVisible = false;
            }
        });
    }

    // 代码块增强
    function initCodeBlockEnhancement() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            // 添加语言标签
            const language = block.className.match(/language-(\w+)/);
            if (language) {
                const languageLabel = document.createElement('span');
                languageLabel.className = 'code-language';
                languageLabel.textContent = language[1].toUpperCase();
                
                const pre = block.parentElement;
                pre.style.position = 'relative';
                pre.appendChild(languageLabel);
                
                // 添加语言标签样式
                if (!document.querySelector('#code-language-style')) {
                    const style = document.createElement('style');
                    style.id = 'code-language-style';
                    style.textContent = `
                        .code-language {
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                            background: rgba(255,255,255,0.1);
                            color: #fff;
                            padding: 0.25rem 0.5rem;
                            border-radius: 4px;
                            font-size: 0.75rem;
                            font-weight: 500;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
    }

    // 搜索功能增强
    function initSearchEnhancement() {
        const searchInput = document.querySelector('#searchbox');
        if (!searchInput) return;

        // 添加搜索快捷键
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.blur();
            }
        });

        // 添加搜索提示
        if (!searchInput.placeholder) {
            searchInput.placeholder = '搜索文章... (Ctrl+K)';
        }
    }

    // 目录增强
    function initTocEnhancement() {
        const toc = document.querySelector('.toc');
        if (!toc) return;

        // 高亮当前阅读的章节
        const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
        const tocLinks = toc.querySelectorAll('a');
        
        if (headings.length === 0 || tocLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // 移除所有活动状态
                    tocLinks.forEach(link => link.classList.remove('active'));
                    
                    // 添加当前活动状态
                    const activeLink = toc.querySelector(`a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });

        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });

        // 添加目录活动状态样式
        if (!document.querySelector('#toc-active-style')) {
            const style = document.createElement('style');
            style.id = 'toc-active-style';
            style.textContent = `
                .toc a.active {
                    color: var(--primary-color, #2563eb) !important;
                    font-weight: 600;
                }
                .toc a.active::before {
                    transform: rotate(90deg) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 主题切换增强
    function initThemeToggleEnhancement() {
        const themeToggle = document.querySelector('#theme-toggle');
        if (!themeToggle) return;

        // 添加切换动画
        themeToggle.addEventListener('click', function() {
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });

        // 系统主题检测
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                const currentTheme = localStorage.getItem('pref-theme');
                if (currentTheme === 'auto') {
                    // 如果设置为自动，则跟随系统主题
                    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
                    setTimeout(() => {
                        document.body.style.transition = '';
                    }, 300);
                }
            });
        }
    }

    // 工具函数：防抖
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 工具函数：节流
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 性能监控（开发环境）
    if (window.location.hostname === 'localhost') {
        console.log('🚀 Hugo博客自定义功能已加载');
        
        // 性能指标
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('📊 页面加载性能:', {
                    'DNS查询': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart) + 'ms',
                    'TCP连接': Math.round(perfData.connectEnd - perfData.connectStart) + 'ms',
                    '页面加载': Math.round(perfData.loadEventEnd - perfData.navigationStart) + 'ms',
                    'DOM解析': Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart) + 'ms'
                });
            }, 1000);
        });
    }

})();