# Source Analysis — tnloc-persona-next

> Phân tích tại commit `c25d50f` (branch `feat/inova`), 2026-10-08.

## 1. Tổng quan

Trang portfolio cá nhân (About + Stories/blog), port từ bản Vue/Nuxt sang **Next.js 13.3 (Pages Router)**, render tĩnh (SSG) từ file Markdown trong `content/`.

| Hạng mục | Giá trị |
|---|---|
| Framework | Next.js 13.3.0, React 18.2, TypeScript 5.0 (`strict`) |
| Styling | Tailwind 3.3 + `@tailwindcss/typography`, SCSS (`styles/`), font IBM Plex Mono |
| Content | Markdown + front-matter (`gray-matter`) → HTML (`unified` / `remark-rehype` / `rehype-stringify`) |
| State | Redux (legacy `createStore`) + `redux-persist` + `redux-thunk` |
| Theme | `next-themes` (dark mode qua class / `data-mode`) |
| Monitoring | LogRocket |
| Build/deploy | `next build && next export` (static), hỗ trợ `basePath` |
| Quy mô | ~20 file TS/TSX, ~1.1k LOC code, 33 commits |

## 2. Cấu trúc thư mục

```
pages/            Routes (Pages Router)
  _app.tsx        Provider Redux + PersistGate + ThemeProvider + LogRocket
  index.tsx       "/"            — trang About (SSG)
  post/index.tsx  "/post"        — danh sách bài viết (SSG)
  post/[id].tsx   "/post/:id"    — chi tiết bài viết (SSG, fallback: false)
  api/hello.ts    "/api/hello"   — boilerplate, không dùng
lib/contents.ts   Đọc + parse Markdown (getPostData, getSortedPostsData, getAllPostIds)
components/
  layouts/        Blank (wrapper <main>), MainLayout (Header + main + Footer)
  commons/        Header, Footer, SocialBar, LightSwitcher, List, TimelineList,
                  about/Title, post/ListItem
content/{en,vi}/  articles, education, working_experience, projects, skill, text, bookmarks
redux/            store + 1 reducer "settings" (securityHash)
utils/            formatDate, kiểu Obj
styles/           globals.scss, global-dark.scss, Home.module.css
public/           ảnh, CV pdf
```

## 3. Luồng dữ liệu

```
content/en/**/*.md
   │  fs.readFileSync + gray-matter (front-matter)
   │  unified: remark-parse → remark-rehype → rehype-stringify (allowDangerousHtml)
   ▼
lib/contents.ts  → { ...frontMatter, id, contentHtml, createdAt, updatedAt }
   │  getSortedPostsData: sort giảm dần theo createdAt
   ▼
getStaticProps (build time)
   ▼
Component  → useEffect → setState(JSX) → dangerouslySetInnerHTML
```

### Trang `/` ([pages/index.tsx](../pages/index.tsx))
| Section | Nguồn | Component |
|---|---|---|
| Hero | hard-code | `Title` |
| Intro | `content/en/text/shortIntro.md` | `List` |
| 01 Education | `content/en/education/*` | `TimelineList` |
| 02 Skills | `content/en/skill/index.md` | `List` |
| 03 Working experiences | `content/en/working_experience/*` | `TimelineList` |
| 04 Projects | `content/en/projects/*` | `TimelineList` |

### Front-matter đang dùng
| Field | Dùng ở | Ghi chú |
|---|---|---|
| `title` | tất cả | |
| `date` | TimelineList | chuỗi hiển thị, vd `'Oct 2020 - Jun 2021'` |
| `createdAt` | sort, post list | YAML date; thiếu → `null` → sort không ổn định |
| `updatedAt` | post detail | fallback = `createdAt` |
| `description`, `img`, `alt` | post list / detail | |

### Biến môi trường ([next.config.js](../next.config.js), [.env.example](../.env.example))
`SITE`, `SITE_TITLE`, `LOGROCKET_APP_ID`, `GOOGLE_ANALYTICS_KEY`, `BASE_PATH`, `BLOG_URL`, `CV_LINK`. `AVATAR_URL` có trong `.env.example` nhưng không được dùng; `SITE`, `SITE_TITLE`, `GOOGLE_ANALYTICS_KEY` được khai báo nhưng không có code đọc.

## 4. Vấn đề phát hiện

Mức độ: 🔴 lỗi chức năng/build · 🟠 ảnh hưởng UX/SEO · 🟡 code smell/dọn dẹp.

### 🔴 Chức năng / build

1. **Link CV không bao giờ hiển thị** — [header.tsx:8](../components/commons/header.tsx#L8) đọc `process.env.CV_URL`, nhưng `next.config.js` chỉ expose `CV_LINK`. Next không inline biến ngoài `env` config → luôn `undefined`. Thêm nữa, label của link CV đang ghi nhầm là `Blog`.
2. **`next/image` thiếu `width`/`height` và có thể thiếu `src`** — [post/[id].tsx:42](../pages/post/[id].tsx#L42): `<Image src={postData.img} />` với src dạng string bắt buộc phải có `width`+`height` (hoặc `fill`). Bài `hello.md` và `my-first-custom-keyboard.md` không có `img` → `src` undefined → lỗi khi render. Hiện route `/post` đang bị ẩn khỏi Header nên chưa lộ, nhưng `getStaticPaths` vẫn build tất cả bài.
3. **`getStaticProps` nuốt lỗi** — [post/index.tsx:129](../pages/post/index.tsx#L129), [post/[id].tsx:97](../pages/post/[id].tsx#L97): `.catch(err => console.log(err))` trả về `undefined` → Next báo lỗi khó hiểu thay vì lỗi gốc. Bỏ `.catch` (và `Promise.all` thừa) để lỗi thật nổi lên.
4. **Dependency không khai báo trực tiếp** — `unified`, `remark-parse`, `redux`, `redux-thunk` được import nhưng không có trong `package.json` (chỉ có nhờ transitive deps trong lockfile). Ngược lại `remark`, `remark-html`, `rehype-parse`, `rehype-sanitize`, `to-vfile`, `@reduxjs/toolkit`, `linkees`, `scss`, `date-fns`, `@next/mdx`, `concurrently` được khai báo nhưng không import ở đâu.

### 🟠 UX / SEO

5. **HTML tĩnh rỗng nội dung** — `List`, `TimelineList`, `PostIndex` dựng JSX trong `useEffect` rồi `setState`. `useEffect` không chạy khi SSG → file HTML export không chứa intro/skills/experience/projects/post list; nội dung chỉ xuất hiện sau hydrate. Mất lợi ích chính của SSG (SEO, first paint). Fix: render trực tiếp từ props (hoặc `useMemo`), bỏ state.
6. **Animation `data-aos` không hoạt động** — khắp nơi dùng `data-aos="fade-up"` nhưng thư viện AOS không được cài/khởi tạo → attribute chết.
7. **Link `/contact` 404** — [socialBar.tsx:19](../components/commons/socialBar.tsx#L19) trỏ tới route không tồn tại (và bỏ qua `basePath`).
8. **Ảnh hero hard-code, không qua `basePath`** — [post/index.tsx:86](../pages/post/index.tsx#L86) dùng `<img src="/img/...">`; khi deploy với `BASE_PATH` ≠ `/` ảnh sẽ vỡ.
9. **Nội dung `vi` không được dùng** — toàn bộ `getStaticProps` hard-code `/content/en/`. Bản `vi` cũng đã lệch (thiếu `KingfoodMart.md`, `kingfoodmart.md`, `upgraded-my-first-custom-keyboard.md`).
10. **LightSwitcher** — icon có `onClick` nhưng không phải `<button>` → không focus/không dùng bàn phím được, không có `aria-label`. So sánh `theme == 'dark'` bỏ qua trường hợp `theme === 'system'` (biến `currentTheme` đã tính nhưng không dùng). Thiếu guard `mounted` → hydration mismatch icon.

### 🟡 Code smell / dọn dẹp

11. **LogRocket.init gọi mỗi lần render `_app`** và cả khi `LOGROCKET_APP_ID` rỗng; nên chỉ init 1 lần phía client khi có ID.
12. **Redux gần như không dùng** — chỉ có `settings.securityHash`, không component nào đọc/ghi. `persistConfig.whitelist` liệt kê `auth`, `authSocial`, `booking` không tồn tại (copy từ project khác). `PersistGate` còn chặn render phía client cho tới khi rehydrate. Có thể xoá toàn bộ `redux/` + 4 deps.
13. **Component trùng lặp** — [post/listItem.tsx](../components/commons/post/listItem.tsx) là bản copy y hệt `List` và không được dùng. Nhánh `contents?.allPostsData` trong `List` cũng là dead code (và truyền sai shape cho `dangerouslySetInnerHTML`).
14. **Thiếu `key`** khi push JSX trong `List` / `ListItem` → React warning.
15. **`console.log` sót lại** trong `getStaticPaths`/`getStaticProps`/render của post pages.
16. **`getStaticPaths` tự đọc `fs`** trong khi `lib/contents.ts` đã có `getAllPostIds` làm đúng việc đó.
17. **`getSortedPostsData` đọc mọi file trong thư mục** — không lọc `.md`; một file khác (vd `.DS_Store`, `.gitkeep`) sẽ làm `getPostData` throw.
18. **`// @ts-ignore` trên props page** — mất type-safety dù bật `strict`; nên khai báo type props.
19. **Boilerplate thừa**: `pages/api/hello.ts` (không dùng được với `next export`), `styles/Home.module.css`, `content/hello.md`, `content/readme.md` (copy README Nuxt/Next), `tailwind.config.js` có `./app/**` không tồn tại, `tsconfig.paths` đặt sai chỗ (ngoài `compilerOptions` → vô hiệu).
20. **Footer** link về repo bản Vue và text "©2021 … Protoype Dec 2022" (typo `Protoype`).
21. **Next.js 13.3 đã cũ** — `next export` deprecated từ 13.3 (thay bằng `output: 'export'` trong config); `swcMinify` mặc định từ 13.

### Bảo mật
- `allowDangerousHtml: true` + `dangerouslySetInnerHTML`: chấp nhận được vì nguồn là Markdown do chủ repo viết. Nếu sau này nhận nội dung từ bên ngoài, bật `rehype-sanitize` (đã có sẵn trong deps).
- Không có secret trong repo; `.env` đã được gitignore. Email/social link public là chủ ý.

## 5. Đề xuất ưu tiên

| # | Việc | Effort | Tác động |
|---|---|---|---|
| 1 | Render nội dung trực tiếp từ props (bỏ `useEffect`+`useState`) ở `List`/`TimelineList`/`PostIndex` | S | SEO + first paint |
| 2 | Sửa `CV_URL` ↔ `CV_LINK` và label | XS | Link CV hoạt động |
| 3 | Sửa `<Image>` ở post detail (`width/height` hoặc `<img>`, guard khi thiếu `img`) | XS | Tránh vỡ khi bật lại `/post` |
| 4 | Bỏ `.catch(console.log)` trong `getStaticProps`, xoá `console.log` | XS | Lỗi build rõ ràng |
| 5 | Đồng bộ `package.json`: thêm deps đang import, gỡ deps không dùng | S | Build reproducible |
| 6 | Xoá Redux + PersistGate, `listItem.tsx`, `api/hello.ts`, boilerplate | S | Ít code, ít bundle |
| 7 | Lọc `.md` trong `lib/contents.ts`, dùng `getAllPostIds` ở `getStaticPaths` | XS | Robust |
| 8 | Quyết địfnh i18n: bỏ `content/vi` hoặc thêm Next i18n routing | M | |
| 9 | Cài AOS hoặc bỏ `data-aos`; sửa LightSwitcher thành `<button>` | S | UX / a11y |
| 10 | Nâng Next.js (14/15), chuyển sang `output: 'export'` | M | Bảo trì |
