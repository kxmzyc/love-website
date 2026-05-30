# Love Website

六一儿童节情侣纪念网站，包含时间轴、相册、音乐播放器、互动小游戏和告白页面。

## 关于项目

这是一个六页静态网站，作为六一儿童节的礼物送给她。首页用飘浮爱心粒子和打字机动画迎接她；时间轴页按时间顺序展示恋爱中的关键记忆；拍立得风格相册支持分类筛选和灯箱浏览；"关于她"页面收集了她的性格标签和一个实时天数计数器；音乐页把黑胶唱片播放器和点击爱心、烟花彩蛋结合在一起；结尾页在星空 Canvas 背景下逐行揭示告白信。所有页面共享淡入淡出切换动画和一个由 global.js 动态注入的全局导航栏。

## 快速开始

### 环境要求

- 浏览器（Chrome、Edge、Safari 或 Firefox）
- Git（可选，用于部署到 GitHub Pages）

### 安装

```bash
git clone https://github.com/你的用户名/love-website.git
cd love-website
```

直接用浏览器打开 `index.html` 即可本地预览，无需构建工具或服务器。

## 使用方式

打开 `index.html`，点击粉色大按钮进入。网站共六个页面：

1. **首页** — 打字机文字逐句出现，点击按钮进入
2. **时间轴** — 5 张卡片左右交替排列，滚动时触发 AOS 动画
3. **相册** — 12 张拍立得风格照片，支持分类筛选，点击打开灯箱（支持滑动/键盘切换）
4. **关于她** — 性格标签气泡、"已认识 X 天"滚动计数器、便利贴记忆卡片
5. **音乐** — 黑胶唱片播放器、点击冒爱心区域、"你愿意陪我吗"逃跑按钮、Canvas 烟花
6. **结尾** — 星空 Canvas 背景，6 段告白文字依次淡入，点击屏幕出现流星

右下角悬浮音乐按钮在所有页面（音乐页除外）播放背景音乐，状态通过 localStorage 跨页面保持。

## 项目结构

```
love-website/
├── index.html              # 首页（粒子背景 + 打字机）
├── memories.html           # 时间轴（AOS 滚动动画）
├── gallery.html            # 相册（拍立得网格 + 灯箱 + 筛选）
├── about.html              # 关于她（标签 + 计数器 + 便利贴）
├── music.html              # 音乐与互动（播放器 + 爱心 + 烟花）
├── ending.html             # 告白结尾（星空 Canvas + 逐行揭示）
├── css/
│   ├── global.css          # CSS 变量、字体、重置、动画关键帧
│   └── style.css           # 页面级布局
├── js/
│   ├── global.js           # 导航栏、页面切换、加载动画、音乐、爱心飘落
│   └── script.js           # 滚动动画观察器
├── images/                 # 照片目录（替换为你的照片）
│   ├── avatar.jpg          #   → about.html 头像
│   ├── cover.jpg           #   → music.html 专辑封面
│   ├── 1.jpg … 5.jpg       #   → memories.html 时间轴配图
│   └── photo1.jpg … photo12.jpg  # → gallery.html 相册
└── music/
    └── love.mp3            # 背景音乐
```

## 技术栈

- **HTML5 / CSS3 / 原生 JavaScript** — 无框架依赖
- [Google Fonts](https://fonts.google.com) — Ma Shan Zheng（中文手写体）+ Pacifico（英文花体）
- [AOS.js](https://michalsnik.github.io/aos/) — 滚动触发的淡入/滑动/缩放动画
- [Typed.js](https://github.com/mattboldt/typed.js/) — 首页打字机效果
- [tsParticles](https://particles.js.org) — 首页爱心和星星粒子
- **Canvas API** — 结尾页星空背景 + 音乐页烟花

## 自定义内容

### 替换照片

将照片放入 `images/` 目录，按以下命名：

| 文件名 | 用途 | 建议 |
|--------|------|------|
| `avatar.jpg` | about.html 头像 | 正方形，最小 400×400px |
| `cover.jpg` | music.html 专辑封面 | 正方形，300×300px |
| `1.jpg` … `5.jpg` | memories.html 时间轴 | 横版，宽度 ≥800px |
| `photo1.jpg` … `photo12.jpg` | gallery.html 相册 | 横版，宽度 ≥800px |

每张照片压缩到 500KB 以内（推荐 [squoosh.app](https://squoosh.app)）。

### 修改文字

打开对应 `.html` 文件，用 Ctrl+F 搜索以下关键词：

| 要修改的内容 | 文件 | 搜索 |
|-------------|------|------|
| 她的名字 | `index.html` | `[她的名字]` |
| 打字机文字 | `index.html` | `strings:` |
| 时间轴日期和故事 | `memories.html` | `timeline-item` |
| 性格标签 | `about.html` | `tag-item` |
| 认识日期 | `about.html` | `2024-03-01` |
| 便利贴内容 | `about.html` | `note-card` |
| 相册描述 | `gallery.html` | `caption` 和 `photos` |
| 歌曲名和歌手 | `music.html` | `song-name` |
| 结尾告白文字 | `ending.html` | `line-1` 到 `line-6` |
| 结尾署名 | `ending.html` | `[你的名字]` |

### 替换音乐

将 MP3 文件放入 `music/love.mp3`，然后在 `music.html` 中修改歌曲名和歌手名。

## 部署

本项目为 GitHub Pages 设计。

1. 在 GitHub 创建新仓库（如 `love-website`）
2. 推送代码：

```bash
cd love-website
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/love-website.git
git push -u origin main
```

3. 开启 GitHub Pages：**Settings → Pages → Source: Deploy from a branch → main, / (root) → Save**
4. 等待 1-2 分钟后访问 `https://你的用户名.github.io/love-website/`

修改内容后重新 `git add . && git commit -m "update" && git push`，GitHub Pages 会自动重新部署。
