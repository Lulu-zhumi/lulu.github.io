# 个人主页模板 · 纯文本长页风格 · 中英双语 · 零依赖

一套可以直接 push 到 GitHub Pages 的个人主页。不需要 Ruby、Jekyll、npm，也没有构建步骤：浏览器打开的就是仓库里的 HTML/CSS/JS。

这一版照着 **Zhian Jia（贾治安）主页** 的排版气质重做：不照抄内容，只取它的骨架。和上一版「卡片式学术主页」相比，最大的变化是**把装饰全部拿掉**——没有导航、没有卡片、没有色块，就是一个单栏长页，像一篇排版干净的 README。

参考页的风格 DNA，这一版都保留了：

| 参考页的做法 | 本模板对应位置 |
| --- | --- |
| 姓名 + 中文名并列的大标题、头像、一行打字机式自我介绍 | `.identity` |
| 一大串纯文本链接清单（CV / 邮箱 / Scholar / ORCID / arXiv / 博客 / 各社交平台…） | `.link-list` |
| 一整段不拆开的研究自述，斜体强调方向关键词 | `.intro` |
| **公式墙**：一组带标签的display 公式 | `.eq-wall` |
| 一段文学／哲学引文（blockquote） | `.quote` |
| 学术活动、科普、书单等补充自述 | `.prose` |
| 一张图 + 一行说明 | `.figure` |
| `Some Resources` 资源区、`---` 分隔线 | `h2` + `hr` |
| `Latest news` 日期时间线，末尾 Older News / Read more | `.news-list` |

额外保留上一版的偏好：**中英双语切换**（右上角两个极小的纯文本链接，不做导航栏）、深浅色跟随系统、响应式、404 页。公式刻意不用 MathJax，纯 HTML/CSS 排版，**离线也能正常显示**。

> 公式墙里那 7 条是**通用数学物理公式，仅作风格示例**，不是任何人的成果。请换成你自己方向的公式。

---

## 目录结构

```text
academic-homepage/
├── index.html                  # 主页面（所有文案都在这里）
├── 404.html                    # 404 页
├── assets/
│   ├── css/style.css           # 样式与主题变量
│   ├── js/main.js              # 语言切换、打字机、版权年份
│   ├── avatar.svg              # 头像占位（首字母 YN）
│   ├── lattice.svg             # 示意图占位（纯 SVG 格点图）
│   └── favicon.svg             # 站点图标
├── _config.yml                 # Jekyll 占位配置（有 .nojekyll，实际不生效）
├── .nojekyll                   # 让 GitHub Pages 跳过 Jekyll 构建，勿删
├── .gitignore
├── CNAME.example               # 自定义域名示例，不用域名可删
└── README.md                   # 本文件
```

站内所有资源都用**相对路径**，所以既支持 `https://用户名.github.io/`，也支持 `https://用户名.github.io/仓库名/`，不用改 base。

---

## 三步上线

1. **建仓库**
   - 想用 `https://用户名.github.io/`：仓库名必须是 `用户名.github.io`（一字不差）。
   - 想用 `https://用户名.github.io/xxx/`：仓库名随意，比如 `homepage`。
2. **放文件**：把本目录里的**全部内容**（包括 `.nojekyll`、`assets/`、点开头的隐藏文件）复制到仓库根目录，然后 commit + push。
   ```bash
   git init
   git add -A
   git commit -m "init personal homepage"
   git branch -M main
   git remote add origin https://github.com/用户名/仓库名.git
   git push -u origin main
   ```
3. **开 Pages**：仓库 → `Settings` → `Pages` → Build and deployment → `Deploy from a branch` → 选 `main` / `root` → Save。等 1–2 分钟即可访问。

---

## 本地预览

```bash
cd academic-homepage
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

直接双击 `index.html` 也能看，公式、双语、打字机都不依赖网络。

---

## 自定义域名（可选）

1. 把 `CNAME.example` 改名成 `CNAME`，内容只留一行你的域名，例如 `www.yourdomain.com`。
2. 在域名 DNS 里加一条 CNAME 记录，指向 `用户名.github.io`。
3. Pages 设置里填入该域名，DNS 生效后勾选 `Enforce HTTPS`。

> 用 `用户名.github.io` 默认地址时**不要**放 `CNAME`，否则可能报 404。

---

## 必须替换的占位内容

| 位置 | 占位符 | 换成 |
| --- | --- | --- |
| `index.html` 的 `<title>`、`<meta description>`；`main.js` 顶部 `TEXT` | `Your Name (你的名字)` | 你的中英文姓名、标题、描述 |
| `main.js` 的 `TEXT.en.type` / `TEXT.zh.type` | `I am interested in theoretical physics…` | 你那一行打字机式自我介绍 |
| `.avatar` / `assets/avatar.svg` / `assets/favicon.svg` | `YN` | 你的照片或姓名首字母 |
| `h1` / `.name-alt` | `Your Name` / `你的名字` | 你的中英文姓名 |
| `.link-list` 全部 15 条 | `href="#"`、`your@email.edu`、`Your University` 等 | 你的 CV、邮箱、机构、Scholar、ORCID、arXiv、博客、社交平台；用不到的整条删掉 |
| `.intro` 两大段 | `your field` / `topic A` / `tool 1` 等 | 你自己的研究自述（保留 `<em>` 强调关键词的写法） |
| `.eq-wall` 7 条公式 | Hopf、Bulk–Boundary、TQFT… | **你研究方向的公式**（写法见下节） |
| `.quote` | 爱因斯坦那句 | 你自己喜欢的一句引文与出处 |
| 三段 `.prose` | 学术活动 / 科普 / 书单 | 你自己的活动、平台、书单链接；书名请换成你真正读过的 |
| `.figure` / `assets/lattice.svg` | 格点示意图 | 你自己的图片或 GIF，以及一行说明 |
| `.resource-list` 两条 | `Your Topic ArXiv Daily` | 你真正维护的资源页 |
| `.news-list` 六条 | 2026 年的占位动态 | 你真实的论文、报告、会议、出版动态 |
| `.news-more` / 页脚 | `Older News` / `Your Name` | 归档链接、你的姓名（年份自动更新） |

---

## 双语怎么维护（重要）

每块文案有 **en / zh 两份**，靠 `<html data-lang>` 由 CSS 决定显示哪一份：

```html
<span class="i18n" data-lang="en">Latest news</span>
<span class="i18n" data-lang="zh">最新动态</span>
```

- 短文本：给 `<span>` 加 `class="i18n" data-lang="..."`。
- 整段文字：直接给 `<p>` / `<h1>` / `<cite>` 加这两个属性，写成两个并列元素。
- **新增任何内容都要同时写两份**，否则切到另一种语言时那一块会消失。
- 删区块时两份一起删。
- 公式、日期、`CV` / `ORCID` / `arXiv` 这类通用术语不参与双语，只写一份即可。
- 想让所有人默认看到英文：把 `<head>` 内联脚本里的语言判断改成固定 `lang = 'en'`（同理可固定中文）。
- 打字机文案在 `main.js` 的 `TEXT` 里，也是两份，切换语言时会自动重打。

---

## 新增一条动态

复制下面整段 `<li>` 插进 `<ul class="news-list">`，**en / zh 两份都要写**：

```html
<li>
  <time datetime="2026-12">2026/12/01</time>
  <span class="i18n" data-lang="en">Our paper "A Real Title" is now available on arXiv.</span>
  <span class="i18n" data-lang="zh">论文《一个真实标题》上线 arXiv。</span>
</li>
```

日期用 `YYYY/MM/DD`，和原页一致；`datetime` 属性写机器可读的 `YYYY-MM`。

---

## 公式怎么写（进阶）

默认方案是**纯 HTML**，不加载任何 CDN，所以离线可用、部署零依赖。看 `index.html` 里 `.eq-wall` 的写法：

```html
<div class="eq">
  <span class="eq-label">TQFT</span>
  <span class="eq-body">Cob<sub><i>d</i>+1</sub> → Hilb</span>
</div>
```

可用的排版手段：`<sub>` / `<sup>` 上下标、`<i>` 斜体变量、`<b>` 粗体范畴名，以及 Unicode 符号（`∘ ⊗ Δ η ε ≃ ∝ ∫ ∧ ϱ →` 等）。希腊字母直接在 HTML 里写字符即可，浏览器用衬线字体渲染，视觉上很接近 MathJax 的输出。

**如果要写复杂 LaTeX**（分式、矩阵、多行对齐），在 `index.html` 的 `</head>` 前加这三行，就能用 `$$...$$` 和 `\(...\)`：

```html
<script>
  window.MathJax = { tex: { inlineMath: [['\\(', '\\)']], displayMath: [['$$', '$$']] } };
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

两种方案可以混用：简单的继续手写 HTML，复杂的交给 MathJax。注意引入 CDN 后，离线双击 `index.html` 时那几条 LaTeX 公式会短暂显示源码，联网状态才正常。

---

## 改外观

打开 `assets/css/style.css`，最上面 `:root` 就是全部开关：

- `--link` / `--accent`：链接与强调色（默认 GitHub 蓝 `#0969da`）
- `--bg` / `--fg` / `--muted` / `--line`：底色、正文、次要文字、分隔线
- `--serif` / `--sans` / `--mono`：字体栈（已含常见中文字体）
- `--wrap`：栏宽，默认 860px；想更贴近原页的窄栏可改 760px
- 紧随其后的 `@media (prefers-color-scheme: dark)` 是深色配色，两套一起调才协调

几个关键类：`.eq-wall` 控制公式墙（`.eq-label` 是左侧小标签，`.eq-body` 是公式），`.news-list time` 控制时间线日期那一列的竖线，`h2` 的下边框是 GitHub markdown 味的小标题。响应式断点在 700px：窄屏公式墙和时间线自动改成纵向堆叠。动效（打字机光标）已按 `prefers-reduced-motion` 关闭。

---

## 常见问题

| 现象 | 检查 |
| --- | --- |
| 打开是 404 | 仓库名是否为 `用户名.github.io`；Pages 是否选了 `main` / `root`；是否误放了 `CNAME` |
| 页面没样式 | `assets/` 是否整目录上传；是否把文件放进了多余的二级目录 |
| 中文显示成方块 | 字体栈已含 PingFang / 微软雅黑 / WenQuanYi 等；仍异常可自行引入 Web Font |
| 切换语言后某一块空了 | 该块只写了 en 或只写了 zh，补上另一份 |
| 公式符号显示成乱码 | 确认文件以 UTF-8 保存；`index.html` 里已有 `<meta charset="utf-8">` |
| 改了内容线上没变 | Pages 构建有 1–2 分钟延迟；浏览器强刷（Ctrl/Cmd + Shift + R） |

模板可自由修改、用于个人或实验室主页，无授权限制。
