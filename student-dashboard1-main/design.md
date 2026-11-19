```markdown
# DESIGN.md
# Student Dashboard & Scan-to-Verify ID – UI/UX Design Document

## 1. Project Overview

The Student Dashboard is a modern, responsive web application designed to help college students access their academic information in one place and present a scannable, physical-style digital ID card for instant identity verification.

## 2. Design Goals

- Create a modern, minimal college dashboard.
- Design a realistic, physical-style Digital Student ID Card with a scannable QR code.
- Provide a clean, distraction-free public verification page when the QR code is scanned on mobile devices.
- Build everything using reusable React card components.
- Support desktop, tablet, and mobile screens seamlessly.

## 3. Design Theme & Color Palette

**Theme:** Modern and Minimal  
**Design Style:** Professional SaaS Dashboard + Realistic Physical ID Card

| Element | Color |
|---|---|
| Primary | `#2563EB` |
| Secondary | `#1E40AF` |
| Background | `#F8FAFC` |
| Card Background | `#FFFFFF` |
| Main Text | `#0F172A` |
| Secondary Text | `#64748B` |
| Success (Verified Active) | `#16A34A` |
| Warning | `#F59E0B` |
| Error (Invalid / Expired) | `#DC2626` |
| Border | `#E2E8F0` |

## 4. Typography

**Primary Font:** Inter

- Page Heading: `24–30px`
- Section Heading: `18–20px`
- Card Heading: `16px`
- Body Text: `14–16px`
- Small / Label Text: `12px`

## 5. Dashboard Layout

### A. Sidebar (Authenticated Portal)
Navigation items:
1. Dashboard
2. My Profile
3. My ID Card
4. Attendance
5. Academic Results
6. Timetable
7. Notifications
8. Settings
9. Logout

**Design Requirements:**
- Fixed collapsible sidebar on desktop; slide-over drawer on mobile.
- Active navigation item highlighted in `#2563EB`.
- Lucide React icons.

### B. Top Header
- College logo and portal name.
- Search bar (optional), notification icon, student avatar, name, and profile dropdown.

### C. Public Verification Layout (`/verify/:studentId`)
- Standalone mobile-first layout **without** the dashboard sidebar so external scanners (security, library, faculty) view only verified student details cleanly.

## 6. Page & Component Specifications

### A. Dashboard Page (`/`)
- **Welcome Section:** Personalized greeting, student name, department, academic year, and current date.
- **Statistics Cards (4x `StatCard`):** Attendance Percentage, Total Subjects, CGPA, and Unread Notifications.
- **Quick Access Section:** Shortcut cards for My ID Card, My Profile, Attendance, Results, Timetable, and Notifications.
- **Recent Activity:** Latest academic updates, announcements, and exam notices.

### B. Digital Student ID Card Page (`/id-card`)
Styled to resemble a standard vertical or horizontal physical college ID card (`340px` width on mobile/desktop preview with crisp rounded corners and subtle elevation):
- **Front Side:**
  - College header banner (`#2563EB`) with college logo and institution name.
  - Centered student photograph with clean border ring.
  - Student full name, Register Number, Department, and Academic Year.
  - Embedded **QR Code** pointing to `/verify/:studentId` plus student signature.
- **Back Side:**
  - College address and contact details.
  - Emergency contact number and blood group.
  - Card validity period and institutional terms.
- **Actions:** Flip Front/Back toggle, Download as PDF, and Print Card.

### C. Scanned Student Verification Page (`/verify/:studentId`)
Triggered when scanning the QR code on the ID card:
- **Status Header:** Prominent green `"Verified Active Student"` banner (`#16A34A`) or red `"Record Not Found / Expired"` alert (`#DC2626`).
- **Identity Card:** Student photo, full name, register number, department, year/semester, blood group, and validity status.
- **Academic Snapshot:** Current attendance status and institutional email.

### D. Student Profile, Attendance, Results & Timetable Pages
- **Profile (`/profile`):** Structured personal, academic, and address cards.
- **Attendance (`/attendance`):** Overall percentage card + subject-wise `ProgressBar` cards showing working, present, and absent days.
- **Results (`/results`):** Summary KPI cards + tabular breakdown of internal marks, external marks, grades, and CGPA.
- **Timetable (`/timetable`):** Day-wise schedule cards with time slots, subjects, faculty names, and clas