# APEX-01 // RISHIK MADURI - Enterprise Systems Integrated Workspace

[![SAP Certified](https://img.shields.io/badge/SAP-Certified_Associate-00E5FF?style=flat-square&logo=sap)](https://www.credly.com/badges/9e33eaa4-6ff1-4b29-a8fd-79ef407da686)
[![License](https://img.shields.io/badge/License-MIT-7C4DFF?style=flat-square)](LICENSE)
[![U.S. Citizen](https://img.shields.io/badge/Work_Auth-U.S._Citizen-00E676?style=flat-square)](https://rishik-portfolio-psi.vercel.app/)

Welcome to **APEX-01**, a state-of-the-art interactive developer console and portfolio workspace designed specifically to showcase **Rishik Maduri's** credentials as a **SAP Certified Associate - Back-End Developer (ABAP Cloud)**. 

Inspired by professional integrated development environments (IDEs) and enterprise network command centers, the workspace delivers a gamified, high-fidelity experience to recruiters and engineering managers, illustrating technical proficiency in SAP technology, modern cloud architecture, and responsive front-end design.

---

## 🚀 Quick Start

Ensure you have Node.js installed locally.

```bash
# Clone the repository
git clone https://github.com/rishik7575/RISHIK_PORTFOLIO.git

# Navigate to project directory
cd RISHIK_PORTFOLIO

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open the local address printed in the terminal (typically `http://localhost:5173`) in your web browser.

---

## 📦 Production Builds

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

Vite compiles optimized production assets directly into the `dist/` directory, which is ready for static hosting deployment (Vercel, Netlify, AWS S3, etc.).

---

## 🎨 Design System & Aesthetics

The portfolio utilizes a **futuristic cybernetic design system** built entirely on vanilla CSS:
- **Harmonious Palettes**: Structured around deep space tones (`#02060c` / `#090d16`) with high-contrast active accents:
  - **Developer Theme**: Vibrant cyan (`#00e5ff`) with glowing cyan shadows (`rgba(0, 229, 255, 0.45)`).
  - **Recruiter Theme**: Royal purple (`#7c4dff`) with royal purple glows (`rgba(124, 77, 255, 0.45)`).
- **Backdrop Blurs & Glassmorphism**: Cards and panels feature semi-transparent background color filters (`rgba(13, 20, 38, 0.45)`) combined with `backdrop-filter: blur(24px)` to mimic premium frosted-glass console layouts.
- **Holographic Mouse-Reactive Cards**: Selected cards (such as the verification badges) feature mouse-aware translation and reflective gradient overlays that shift dynamically in response to cursor hover.
- **Root-Level Scaling**: Incorporates a responsive root layout using relative unit scaling (`rem`) anchored to custom screen size media queries.

---

## 💎 Workspace Core Features

### 1. Interactive Dual-Audience Mode UI
A central sliding toggle in the top metrics bar changes the context of the entire application:
- **Developer View**: Exposes raw, technical details. Includes a VS-Code style folder structure, an active line-numbers sidebar, code simulation editors, console logs, and database metrics.
- **Recruiter View**: Compresses technical information into a business-impact format. Highlights work authorization parameters (U.S. Citizenship, no sponsorship required), direct one-click actions (PDF Resume download, Mail trigger, LinkedIn Profile), verified Credly badges, and high-level case study blocks.

### 2. System Boot & Initialization Sequence
- Provides a simulated booting console on entry.
- Renders an inline vector radial SVG logo spinner alongside real-time compiling log readouts (`CONNECTING TO SAP BTP NODE...`, `MOUNTING CDS SCHEMAS...`, `INITIALIZING COMPILER PARSING...`).
- Dismisses the boot screen automatically when the initialization progress reaches 100%, syncing with the main IDE workspace.

### 3. VS-Code Inspired File Explorer (Sidebar & Tabs)
- A fully functional left sidebar explorer tree containing files (`profile.abap`, `why_rishik.md`, `sap_landscape.yaml`, `certifications.sec`, `projects.rap`, `achievements.json`, `roadmap.future`, `terminal.sh`).
- Clicking files switches the active editor tab at the top and transitions between panels with a slide-and-fade animation.
- Tab close triggers and responsive horizontal scroll prevent tab squishing on narrower browser viewports.

### 4. Interactive RAP Transaction Engine (Live Simulation Lab)
Located inside `profile.abap`, this feature demonstrates the data flow of the SAP RESTful Application Programming Model (RAP):
- **ABAP Code Sandbox**: Renders simulated ABAP syntax defining a CDS view projection entity (`ZI_STUDENT`).
- **Interactive Execution Trigger**: Clicking **EXECUTE REQUEST** starts a live simulation:
  1. A laser radar-sweep animation runs on the engine canvas.
  2. Data flow arrows light up sequentially showing the request path: `Fiori Client (UI)` ➔ `OData Service (API)` ➔ `Behavior Definition (CTRL)` ➔ `RAP Business Object (BO)` ➔ `CDS View Entity (DATA)` ➔ `SAP HANA DB (DB)`.
  3. Displays live execution readouts: status code `sy-subrc: 0`, mock queries runtime (in milliseconds), and response size parameters.
  4. Dynamically populates a database output results table showing processed rows of student data.
  5. Outputs simulated ABAP runtime logs in a console panel at the bottom of the lab.

### 5. Interactive SAP Architecture Topology Map
Located inside `sap_landscape.yaml`, this integrates a visual systems topology:
- **Scalable Vector Graphics (SVG)**: Renders a vector-drawn infrastructure diagram connecting SAP Fiori, SAP BTP Cloud, API Gateways, Cloud Connectors, Security/DCL systems, S/4HANA Application Core, and SAP HANA DB.
- **Drawer Inspector**: Clicking any system node activates a glowing boundary indicator on the node and slides open an inspector drawer on the right. This drawer displays:
  - Component description and system role.
  - Protocols used (e.g., HTTPS, RFC, SQL, OData v4).
  - Cloud parameters.
  - Rishik's stack involvement (specific components implemented).

### 6. Digital Verification Chamber (Security Vault)
Located inside `certifications.sec`, this features a secure badge decryption simulator:
- Displays an inline vector-designed official SAP Certification badge.
- Clicking **VERIFY CREDENTIAL** runs a laser scanning sequence with system logs showing signature checks.
- Once verified, the vector badge fades out and reveals a high-fidelity **SAP Certified Associate Certificate** image featuring a holographic cursor shine.
- Dynamically reveals verification metadata and action buttons to **Verify Live on Credly** or download the **Original PDF**.

### 7. Interactive Terminal Shell
Located inside `terminal.sh`, this exposes a responsive command-line simulator:
- A custom command parser supporting various console commands:
  - `help`: Lists all valid commands.
  - `about`: Prints Rishik's profile information.
  - `skills`: Lists technical competencies categorized by SAP core, Platform, and utilities.
  - `cert`: Outputs verification codes for the SAP ABAP Cloud Certification.
  - `contact`: Outputs email and LinkedIn channels.
  - `clear`: Empties the console outputs.

---

## 🛠️ Responsive Layout Controls

To ensure visual excellence across all client viewports (Desktops, Laptops, Tablets, and Mobile Phones), the CSS structure implements:
- **Fluid Grid Reflows**: Grids adapt automatically using `grid-template-columns: repeat(auto-fit, minmax(..., 1fr))` to rearrange card configurations gracefully without vertical compression.
- **Metric Widgets Auto-alignment**: Stacking of metric widgets is disabled on mobile viewports; they are displayed as a compact horizontal 3-column row with small paddings and font sizes to keep key numbers visible.
- **Flexible Button Wrappers**: The direct contact action buttons use `flex-wrap: wrap` and `flex: 1 1 120px` to shift cleanly onto two lines on narrow viewports without spilling out of container cards.
- **Mobile Explorer Sidebar Drawer**: On viewports `<= 768px`, the left explorer sidebar is hidden and acts as a sliding navigation drawer triggered by a custom top header menu button, complete with outside click dismissal.
- **Mobile Sidebar Bottom Alignment**: The sidebar bottom aligns cleanly at `64px` on mobile viewports to prevent overlaps with the taller mobile status bar.
- **Smart Text Shortening**: Uses CSS `content` properties on narrow viewports (`<= 480px`) to shorten long text values (e.g. shortening "Developer View" to "Dev View") and prevent wrap breaks.

---

## 💻 Tech Stack & Performance

- **Build Tool**: Vite (v6.2.0+)
- **Languages**: HTML5, CSS3 (Vanilla Custom Properties), JavaScript (Vanilla ES6 modules)
- **Dependency-free**: Constructed without heavy rendering frameworks (such as React, Vue, or Angular) or bulky CSS toolkits (such as Tailwind). This minimizes bundle size, rendering blocking times, and yields near-instantaneous load times (Vite compilation completes in <450ms).
