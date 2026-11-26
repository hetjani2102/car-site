# 🏎️ Ferrari Scuderia — Maranello Automotive Showcase & Atelier

A modern, high-performance web experience inspired by the official design language of **Scuderia Ferrari**. Engineered with cinematic video backdrops, an interactive Web Audio V12 acoustic engine simulator, a real-time Atelier color configurator, and dynamic racing telemetry.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-FF2800?style=for-the-badge&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## ✨ Key Features

### 🎬 1. Cinematic 1080p Hero & Video Channel Switcher
* **Live Channel Switcher:** Switch between 1080p full-screen video streams in real time without page reload:
  * **12Cilindri World Premiere** — The new naturally aspirated 6.5L atmospheric V12 flagship.
  * **499P Le Mans Hypercar** — Official FIA WEC championship livery and track highlights.
  * **SS2026 Campaign** — Lifestyle and Maranello collection reveal.
* **Ambient Sound Toggle:** Navigation bar equalizer toggle with animated audio wave bars.
* **Italian Tricolore Accent:** Official green-white-red badge and Maranello metadata ribbon.

### 📊 2. Racing Telemetry HUD
* Real-time technical telemetry floating display:
  * **0–100 km/h:** 2.9 seconds (0–200 in 7.9s)
  * **Max Power:** 830 CV @ 9,250 RPM
  * **Top Speed:** >340 km/h (Active mobile aerodynamic flaps)
  * **Displacement:** 6,496 cc F140HD 65° V12

### 🔊 3. Interactive V12 Acoustic Test Bench & Tachometer
* **Real-time Web Audio Synthesizer:** Pure mathematical sound synthesis generating multi-harmonic naturally aspirated V12 cylinder firing frequencies directly in the browser—no static audio samples needed.
* **Digital Tachometer & F1 Shift Lights:**
  * Displays RPM dynamically from 1,000 idle to 9,500 RPM redline.
  * 10-LED shift light cluster progressing through **Green → Amber → Red → Blinking Blue** F1 rev-limiter mode.
  * Realistic exhaust overrun crackle and pop upon accelerator release.

### 🎨 4. Tailor-Made Atelier Livery Studio
* Interactive exterior paint configurator previewing iconic Maranello colorways:
  * 🔴 **Rosso Corsa** (`FER 322`) — Three-layer racing gloss.
  * 🟡 **Giallo Modena** (`FER 102`) — Maranello canary gloss.
  * ⚫ **Nero Daytona** (`FER 901`) — Metallic diamond mica.
  * ⚪ **Bianco Avus** (`FER 100`) — Solid tri-coat pearl.
  * 🔵 **Blu Tour de France** (`FER 522`) — Heritage metallic tint.
* Dynamically updates paint dossiers, ceramic clearcoat specifications, and ambient floor neon underglow.

### 🏁 5. Filterable Model Lineup
* Category filter tabs: **All Models**, **Hypercars**, **V12 Berlinetta**, **Hybrid Supercar**, and **GT & Spider**.
* Featured lineup cards:
  * **Ferrari 12Cilindri** (830 CV • Naturally Aspirated V12)
  * **Ferrari 499P** (500 kW • 3x Le Mans Hypercar Champion)
  * **Ferrari SF90 Stradale** (1,000 CV • V8 PHEV)
  * **Ferrari F8 Tributo** (720 CV • Twin-Turbo V8)
  * **Ferrari Roma Spider** (620 CV • Grand Tourer)
  * **Ferrari Daytona SP3** (840 CV • Icona Series)

### 🏆 6. Dedicated Ferrari 499P Le Mans Dossier
* In-depth engineering breakdown of the 3-time 24 Hours of Le Mans winner.
* Powertrain architecture: 120° structural twin-turbo V6, 800V ERS front electric axle, brake-by-wire energy recovery, and Xtrac 7-speed transverse gearbox.

### 📅 7. VIP Test Drive & Concierge Modal
* Bespoke appointment booking with model picker and global dealership selection:
  * *Maranello HQ Flagship*, *Milan*, *London Mayfair*, *New York Park Ave*, *Tokyo Ginza*, *Dubai Downtown*.
* Generates an official VIP reservation reference pass (`FER-XXXXXX`).

---

## 📂 Project Architecture

```
car-site/
├── index.html            # Main flagship landing page
├── models.html           # Full vehicle lineup and showroom
├── 499.html              # Dedicated 499P Le Mans Hypercar showcase
├── innovation.html       # Aerodynamics & hybrid engineering dossier
├── heritage.html         # Racing dynasty timeline & historic milestones
├── gallery.html          # Full-screen photo vault with lightbox
├── contact.html          # Global dealerships & concierge inquiry
├── server.js             # Lightweight Node.js streaming HTTP server
├── README.md             # Project documentation
├── css/
│   └── style.css         # Complete supercar design system & animations
├── js/
│   └── main.js           # Audio synthesis, telemetry, video switcher & UI logic
└── assets/
    ├── images/           # High-resolution car photography & livery renders
    └── videos/           # 1080p reveal and track footage
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hetjani2102/car-site.git
   cd car-site
   ```

2. **Start the local streaming server:**
   ```bash
   node server.js
   ```

3. **Open in your browser:**
   ```
   http://localhost:3000
   ```

> **Note on `server.js`:** The custom Node.js server implements HTTP 206 Partial Content (Range requests) to ensure seamless video streaming, instant seeking, and zero buffering for high-definition 1080p MP4 assets.

---

## 🛠️ Technology Stack

* **Markup:** Semantic HTML5 with accessibility considerations.
* **Styling:** CSS3, Custom Properties (CSS variables), Glassmorphism (`backdrop-filter`), CSS Grid, Flexbox, Keyframe Animations.
* **Typography:** `Montserrat` (aerodynamic uppercase), `Space Grotesk` (motorsport telemetry), `Cinzel` (heritage serif).
* **Scripting:** Pure Vanilla JavaScript (ES6+), Web Audio API (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`, `GainNode`).
* **Icons:** [Font Awesome 6](https://fontawesome.com/).

---

## 📜 Disclaimer

This project is a non-commercial, educational design and web development showcase celebrating Ferrari automotive design. All trademarks, logos, and brand names are the property of Ferrari S.p.A. and their respective owners.
