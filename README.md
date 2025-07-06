# 🧠 Life OS - Hệ Điều Hành Cuộc Sống

<div align="center">
  <img src="/placeholder.svg?height=120&width=120" alt="Life OS Logo" width="120" height="120">
  <h3>Quản lý toàn diện công việc và cuộc sống của bạn</h3>
  <p>
    <strong>Next.js</strong> · <strong>TypeScript</strong> · <strong>Tailwind CSS</strong> · <strong>MIT License</strong>
  </p>
</div>

---

## 🌟 Tính năng chính

### 📊 Dashboard thông minh
- Thống kê thời gian thực tiến độ công việc và thói quen
- Lời chào theo thời gian + câu nói động lực
- Biểu đồ năng suất trực quan

### 🎯 Quản lý công việc kiểu ClickUp
- Task nâng cao: khách hàng, liên kết, tags
- 3 chế độ xem: List, Kanban, Calendar
- Ưu tiên màu sắc & progress bar
- Liên kết nhanh: Google Drive, GitHub, Figma

### 📅 Lịch tương tác
- Xem lịch theo tháng
- Click chọn ngày để xem tasks
- Color coding theo độ ưu tiên
- Responsive trên mọi thiết bị

### ⏰ Pomodoro nổi bật
- Kéo thả timer tự do
- Chế độ Pomodoro, Deep Work, Short Burst
- Tùy chỉnh thời gian & âm thanh

### 🏠 Không gian làm việc
- 3 Spaces mặc định: Công ty, Dự án ngoài, Học tập
- Tasks riêng, thống kê riêng

### 👤 Hồ sơ cá nhân
- Tên, email, số điện thoại, địa chỉ,...
- Kỹ năng và kinh nghiệm
- Tải avatar & chỉnh sửa trực tiếp

### ⚙️ Cài đặt toàn diện
- Giao diện: Light / Dark / System
- Ngôn ngữ: Tiếng Việt / English
- Thông báo: Email, Push, Desktop

### 🌙 Dark Mode hoàn hảo
- Auto switch theo hệ thống
- Text rõ ràng, không bị mờ
- Chuyển mượt mà

### 📱 Responsive
- Thiết kế mobile-first
- Thân thiện cảm ứng
- Tương thích mọi nền tảng

---

## 🚀 Công nghệ sử dụng

### Frontend
- **Next.js 15** – App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** – Component hiện đại
- **Lucide React** – Icon đẹp, nhẹ

### Styling & Animation
- CSS Grid & Flexbox
- Animations mượt
- Glassmorphism
- Gradient backgrounds

### State Management
- React hooks (useState, useEffect,...)
- LocalStorage
- Context API

---

## 📦 Cài đặt

### Yêu cầu:
- Node.js 18+
- pnpm / npm / yarn
- Git

### Các bước:
```bash
git clone https://github.com/your-username/life-os.git
cd life-os
pnpm install
pnpm dev
Truy cập http://localhost:3000

Build production:
bash
Sao chép
Chỉnh sửa
pnpm build
pnpm start
📁 Cấu trúc thư mục
life-os/
├── app/                    # App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── space/
│   ├── profile/
│   ├── settings/
│   └── calendar/
├── components/
│   ├── ui/
│   ├── dashboard.tsx
│   ├── sidebar.tsx
│   ├── space-view.tsx
│   ├── clickup-*.tsx
│   ├── calendar-*.tsx
│   ├── profile-view.tsx
│   ├── settings-view.tsx
│   └── floating-*.tsx
├── hooks/
├── lib/
├── public/
├── types/
life-os/
├── app/                    # App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── space/
│   ├── profile/
│   ├── settings/
│   └── calendar/
├── components/
│   ├── ui/
│   ├── dashboard.tsx
│   ├── sidebar.tsx
│   ├── space-view.tsx
│   ├── clickup-*.tsx
│   ├── calendar-*.tsx
│   ├── profile-view.tsx
│   ├── settings-view.tsx
│   └── floating-*.tsx
├── hooks/
├── lib/
├── public/
├── types/
🎨 Design System
Màu sắc
Primary: #22c55e (Green)

Secondary: #3b82f6 (Blue)

Accent: #8b5cf6 (Purple)

Warning: #f97316

Error: #ef4444

Typography
Font: Inter

Kích thước: 12px–48px

Font weight: 400–700

Spacing
Đơn vị cơ bản: 4px

Tỷ lệ tăng: 4px, 8px,..., 48px

Breakpoints
sm: 640px

md: 768px

lg: 1024px

xl: 1280px

2xl: 1536px

🔧 Tuỳ chỉnh nhanh
Thêm Space mới:
Cập nhật components/space-view.tsx

Thêm route app/space/[slug]/page.tsx

Cập nhật navigation

Thêm trường Task:
Sửa TaskData interface

Update các thành phần: ClickUpTaskDialog, ClickUpTaskCard

Tuỳ chỉnh Theme:
globals.css: CSS Variables

tailwind.config.ts: Color tokens

🤝 Đóng góp
Chúng tôi hoan nghênh mọi đóng góp:

bash
Sao chép
Chỉnh sửa
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
Mở Pull Request nhé!

Coding Standards
TypeScript chuẩn

ESLint + Prettier

Component: PascalCase

File: kebab-case

Comment khó hiểu: bằng tiếng Việt

📝 Roadmap
v2.0 (Đang phát triển)
✅ Supabase/PostgreSQL

✅ NextAuth.js

✅ WebSocket updates

✅ Multi-user

✅ File uploads

✅ Notifications

✅ Mobile app

v2.1 (Tương lai)
🤖 AI gợi ý task

📈 Báo cáo nâng cao

🔗 Tích hợp Google Calendar, Slack

⚙️ Workflow automation

📁 Import/Export

🎨 Template dự án

🐛 Báo lỗi
Vui lòng tạo Issue kèm:

Mô tả lỗi

Steps to reproduce

Ảnh chụp màn hình

Browser/OS version

Lỗi trong Console

📄 License
Dự án phát hành dưới giấy phép MIT License.

👨‍💻 Tác giả
Quách Thành Long
📧 quachthanhlong@example.com
🔗 GitHub: @quachthanhlong
🔗 LinkedIn: Quách Thành Long

🙏 Cảm ơn
Next.js – React framework tuyệt vời

Tailwind CSS – CSS framework hiện đại

Shadcn/ui – Bộ component chuyên nghiệp

Lucide – Icon library đẹp & nhẹ

Vercel – Hosting platform đỉnh cao
