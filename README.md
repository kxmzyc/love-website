# Love Website - 六一儿童节情侣纪念网站

一个浪漫的六一儿童节情侣纪念网站，包含回忆时间轴、相册、音乐播放器、互动小游戏和告白页面。

## 项目结构

```
love-website/
├── index.html          # 开场首页
├── memories.html       # 回忆时间轴
├── gallery.html        # 照片相册
├── about.html          # 关于她
├── music.html          # 音乐与互动
├── ending.html         # 告白结尾页
├── css/
│   ├── global.css      # 全局样式
│   └── style.css       # 页面样式
├── js/
│   ├── global.js       # 全局功能
│   └── script.js       # 页面交互
├── images/             # 照片目录
└── music/              # 音乐目录
```

## 如何修改内容

### 修改照片

将照片放入 `images/` 目录：

| 文件名 | 用途 | 建议尺寸 |
|--------|------|----------|
| `avatar.jpg` | about.html 头像 | 正方形，最小 400x400px |
| `cover.jpg` | 音乐播放器封面 | 正方形，300x300px |
| `1.jpg` ~ `5.jpg` | 时间轴配图 | 宽度 800px 以上 |
| `photo1.jpg` ~ `photo12.jpg` | 相册照片 | 宽度 800px 以上 |

图片优化建议：
- 每张照片压缩到 **500KB 以内**（推荐使用 [squoosh.app](https://squoosh.app)）
- 格式推荐 JPG（照片）或 WebP（更小体积）
- 头像图片必须是正方形，否则会变形

### 修改文字

| 要修改的内容 | 文件 | 位置说明 |
|-------------|------|----------|
| 首页"送给 [她的名字]" | `index.html` | 搜索 `[她的名字]` |
| 打字机文字 | `index.html` | 搜索 `strings:` 数组 |
| 时间轴日期和描述 | `memories.html` | 搜索 `timeline-item` |
| 关于她的标签 | `about.html` | 搜索 `tag-item` |
| 便利贴内容 | `about.html` | 搜索 `note-card` |
| 相册描述 | `gallery.html` | 搜索 `caption` 和 `photos` 数组 |
| 认识日期（天数计算） | `about.html` | 搜索 `2024-03-01` |
| 结尾告白文字 | `ending.html` | 搜索 `line-1` 到 `line-6` |
| 结尾署名 | `ending.html` | 搜索 `[你的名字]` |

### 修改音乐

将 MP3 文件放入 `music/` 目录，命名为 `love.mp3`。

修改歌曲信息显示：打开 `music.html`，搜索 `song-name` 和 `song-artist`。

## 部署到 GitHub Pages

### 步骤

1. 在 GitHub 创建新仓库（如 `love-website`）

2. 本地初始化并推送：
```bash
cd love-website
git init
git add .
git commit -m "first commit: love website"
git branch -M main
git remote add origin https://github.com/你的用户名/love-website.git
git push -u origin main
```

3. 开启 GitHub Pages：
   - 进入仓库 → Settings → Pages
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`，目录选 `/ (root)`
   - 点击 Save

4. 等待 1-2 分钟，访问：
```
https://你的用户名.github.io/love-website/
```

### 后续更新

修改文件后：
```bash
git add .
git commit -m "update content"
git push
```

GitHub Pages 会自动重新部署。

## 技术栈

- 纯 HTML / CSS / JavaScript（无框架）
- Google Fonts（Ma Shan Zheng + Pacifico）
- AOS.js（滚动动画）
- Typed.js（打字机效果）
- tsParticles（粒子背景）
- Canvas（星空 + 烟花）
