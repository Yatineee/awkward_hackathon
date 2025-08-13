# Mischief 😈 — A Totally Normal Website. Probably.

> A prank web app that looks like a normal login/signup site…  
> until the ads start popping up everywhere.

---

## 🎯 Project Overview

Mischief is a playful HTML/CSS/JS front-end project designed for harmless pranks.  
It mimics a standard login/signup interface, but behind the scenes, it randomly spawns floating ad popups on the screen.

---

## 📂 Folder Structure

project-root/
│
├── fronted/
│ ├── css/
│ │ ├── main.css # Global styling (dark theme + prank popup overrides)
│ │ ├── signin.css # Sign-in page specific styling
│ │ ├── signup.css # Sign-up page specific styling
│ │
│ ├── js/
│ │ ├── ui.js # Utility functions (DOM helpers, toast messages, etc.)
│ │ ├── prank.js # Miscellaneous prank-related functions
│ │ ├── ad-popups.js # Ad popup generation + random scheduling
│ │ └── main.js # Main app logic (module-based)
│ │
│ └── ads/ # Ad images for popups
│
├── pages/
│ ├── index.html # Home page (Welcome screen)
│ ├── signin.html # Login form
│ └── signup.html # Sign-up form
│
└── README.md

markdown
Copy
Edit

---

## 🚀 How It Works

1. **UI Layer**  
   - `main.css` defines the global style.  
   - Separate CSS for `signin.css` / `signup.css` to keep page-specific tweaks.

2. **Main Script (`main.js`)**  
   - Loaded as a **module**:  
     ```html
     <script type="module" src="main.js"></script>
     ```
   - Imports helper functions from `ui.js` and binds events to forms.

3. **Ad Popups (`ad-popups.js`)**  
   - Creates random `<div class="popup">` elements with images + buttons.
   - Positions them randomly on the viewport.
   - Uses `setTimeout` with a random delay to schedule the next popup.

4. **Z-Index Fix**  
   - `.popup` now uses `position: fixed` + `z-index: 2147483647` so it’s always on top.
   - Global CSS overrides ensure images keep aspect ratio and buttons stay visible.

---

## 🛠️ Installation & Run

No build step — just open `index.html` in your browser.
