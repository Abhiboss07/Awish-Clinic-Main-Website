# <p align="center">🌿 Awish Clinic — Premium Clinic Platform 🌿</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/React_Pointer-Touch_Ready-emerald?style=for-the-badge&logo=react&logoColor=white" alt="React Pointer Events" />
</p>

<p align="center">
  A state-of-the-art, visually symmetrical, and luxury-tier medical aesthetic application engineered for <b>Awish Clinic</b>. Designed around patient trust, board-certified transparency, and high-performance user experience.
</p>

---

## 🎨 Premium Redesign & Symmetrical System

Every detail on the platform has been designed around **curated warm palettes** (ivory background, sleek emerald branding, soft beige and grey boundaries) and **symmetrical visual weight** to establish an elite clinical identity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Header Navigation Bar                           │
│     Home   |   Clinic Environment   |   About Us   |   Meet The Team   │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   │                                    │
│       50% Left Editorial          │       50% Right Media Canvas       │
│    - Location & Quality Badges    │    - US-FDA Treatment Suites       │
│    - Large Typography Headings    │    - Touch Draggable Comparison    │
│    - Symmetrical Stats Slabs      │    - Glassmorphic Float Details    │
│                                   │                                    │
├───────────────────────────────────┴────────────────────────────────────┤
│                    Symmetrical 4-Column Directory                      │
│     About   |   Patient Directory   |   Care Segments   |   Reach      │
├────────────────────────────────────────────────────────────────────────┤
│                       Specialized Concern Tag Cloud                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Featured Interactive Innovations

### 📸 Draggable Before/After Comparison Slider
* **Zero Dependencies:** Developed completely from scratch using high-performance **React Pointer Events** for seamless 60FPS dragging.
* **Touch-Responsive:** Fully optimized for mobile viewports, responsive tracking, and tablet slides.
* **Luxury Glass Control Handle:** Utilizes refined glassmorphic controls with backdrop filters and micro-scale animations.

### 🏛️ Symmetrical Pages & Balanced Grids
* **Clinic Environment (`/clinic`):** Houses dynamic clinical care highlights and a symmetrical **Our Clinic Environment** 3-column spaces gallery, featuring Reception Lounges, FDA Treatment Suites, and soundproof Consulting Offices.
* **About Us (`/about`):** Re-engineered into a highly tailored, story-focused journey documenting the clinic's foundation since 2015. Features a clean 3-column core values grid and an exactly balanced 2-column co-founders spotlight section.
* **Our Medical Team (`/team`):** Eliminates awkward layout gaps by placing our co-founders (Dr. Vijay Kumar and Dr. Pooja Varshney) in a perfectly balanced 2-column doctor grid (`sm:grid-cols-2`). Profiles feature interactive zoom canvases and tags highlighting their clinical specialties.
* **Services Directory (`/services`):** Symmetrical treatments directory utilizing advanced flexbox height locks (`flex flex-col h-full` and `justify-between`). Taglines, titles, descriptions, specialty tag pills, and CTA links align in perfect horizontal rows across all columns.

### ✉️ Floating Glass Booking Form
* **Premium Overlay Style:** Structured into a floating glass-morphic container, incorporating **Full Name** and **Phone Number** fields.
* **Fully Functional API:** Directly integrated with `/api/bookings` for secure data submission and real-time candidate verification, automatically triggering a WhatsApp confirmation chat on success.

### 🗺️ Clinic Locations Directory
* **Symmetrical Split Layout:** Left side displays comprehensive feature lists using clean inline SVGs, while the right side displays premium location cards (`Sarita Vihar`, `Gurugram`, `East Patel Nagar`, `Jaipur`).
* **Micro-Interactive Elements:** Cards dynamically lift (`.hover-lift-premium`) on hover and present immediate directions pins and click-to-call actions.

### 🍃 Elegant Global Motion & Easing
* **Luxury Easing Curves:** Global interactive transitions utilize a premium cubic-bezier easing `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo) for professional fluidity.
* **On-Load Fade Reveals:** Implements elegant rises (`.fade-up-reveal`) and smooth media zooms (`.luxury-image-zoom`) to guide patient focus naturally.

---

## 🛠️ Technology & Architecture

* **Framework:** Next.js (App Router, pre-rendered static routes)
* **Compiler:** Turbopack (Optimized page chunks and lightning-fast builds)
* **Code Standard:** TypeScript (Strict static types and interface schemas)
* **Styles:** TailwindCSS & Custom Vanilla CSS Tokens
* **Navigation Sync:** Uniform active header links and symmetrical footer quick links

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### 2. Run Locally in Development Mode
Start the local Next.js development server with real-time hot-reloading:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to inspect the application.

### 3. Compilation & Build
Compile and bundle the application for production deployment. This triggers typescript verification and static route pre-rendering:
```bash
npm run build
```

### 4. Launch Production Server
Relaunch the compiled production application:
```bash
npm run start
```
