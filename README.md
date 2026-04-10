# 🌿 Holistic Harmony

> A web application focused on mental health and overall wellbeing through traditional Indian practices — Yoga, Mudras, and Ayurveda.

---

## 📌 Project Description

**Holistic Harmony** is a responsive, interactive web application that helps users explore ancient Indian wellness practices for stress relief, relaxation, and a better lifestyle.

The app dynamically fetches real yoga pose data from a public API and presents it alongside curated custom datasets on Mudras and Ayurveda tips — all wrapped in a clean, nature-inspired UI.

---

## 🌐 Live Demo

🔗 [View Deployed Project](https://shreyasingh2606.github.io/holistic-harmony/)

---

## 🖼️ Preview

| Home | Yoga Poses | Mudras | Ayurveda |
|------|------------|--------|----------|
| Hero section with CTA | Cards fetched live from API | Custom curated dataset | Daily wellness tips |

---

## 🔌 API Used

| API | Endpoint | Purpose |
|-----|----------|---------|
| [Yoga API](https://yoga-api-nzy4.onrender.com) | `GET /v1/poses` | Fetch all yoga poses with images, benefits, level, and Sanskrit names |

Additional endpoints available:
- `/v1/poses?level=Beginner` — filter by difficulty
- `/v1/poses?id=5` — fetch single pose by ID
- `/v1/categories` — fetch yoga categories

---

## 📊 Additional Data (Custom Datasets)

Since the API only covers yoga poses, two custom JavaScript datasets were created:

### Mudras (Hand Gestures)
6 traditional mudras including Gyan, Prana, Apan, Shuni, Surya, and Vayu — each with their Sanskrit name, benefits, and wellness tag.

### Ayurveda Tips
8 daily wellness practices organized by time of day (Morning, Midday, Evening) — including Oil Pulling, Abhyanga, Pranayama breathing, Triphala, and Ashwagandha.

---

## 🚀 Features

### Core Features
- ✅ **Live API Integration** — Yoga poses fetched dynamically using `fetch()`
- ✅ **Loading State** — Animated spinner shown during data fetch
- ✅ **Error Handling** — Friendly error message + Retry button on API failure
- ✅ **Search** — Search poses by name, Sanskrit name, or benefits (uses `.filter()`)
- ✅ **Filter** — Filter by difficulty level: Beginner / Intermediate / Expert (uses `.filter()`)
- ✅ **Sort** — Sort poses A→Z or Z→A (uses `.sort()`)
- ✅ **Pose Detail Modal** — Click any card to see full pose info in a modal overlay
- ✅ **Mudras Section** — Custom data rendered as interactive cards
- ✅ **Ayurveda Section** — Daily tips displayed in styled tip cards
- ✅ **Responsive UI** — Mobile, tablet, and desktop friendly
- ✅ **Hamburger Menu** — Collapsible nav for smaller screens
- ✅ **No Results State** — Shown when search/filter returns empty

### UI / UX
- Organic, earthy color palette (sage green, terracotta, cream)
- Cormorant Garamond + DM Sans typeface pairing
- Smooth animations and hover interactions
- Sticky, blurred navbar
- Floating decorative background circles

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, responsive layout (CSS Grid & Flexbox) |
| Vanilla JavaScript (ES6+) | Logic, DOM manipulation, API calls |
| Fetch API | HTTP requests to the Yoga API |
| Google Fonts | Cormorant Garamond + DM Sans |
| GitHub Pages | Deployment |

---

## 🧠 Array HOFs Used

All search, filter, and sort operations use JavaScript Array Higher-Order Functions — no traditional `for` or `while` loops:

```js
// Search — Array.filter()
allPoses.filter(pose =>
  pose.english_name.toLowerCase().includes(query)
);

// Filter by level — Array.filter()
result.filter(pose => pose.difficulty_level === level);

// Sort A→Z — Array.sort()
result.sort((a, b) => a.english_name.localeCompare(b.english_name));
```

---

## 📁 Project Structure

```
holistic-harmony/
│
├── index.html       # Main HTML file — structure and layout
├── style.css        # All styles — variables, components, responsive rules
├── script.js        # API fetch, render logic, HOFs, event listeners
└── README.md        # Project documentation
```

---

## ⚙️ Setup & Running Locally

No build tools or dependencies required — this is a plain HTML/CSS/JS project.

**Steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/ShreyaSingh2606/holistic-harmony.git
   ```

2. Navigate into the project folder:
   ```bash
   cd holistic-harmony
   ```

3. Open `index.html` in your browser:
   - Double-click the file, **or**
   - Use Live Server in VS Code (recommended for auto-reload)

> ⚠️ The Yoga API (`https://yoga-api-nzy4.onrender.com`) is a free hosted service. If it takes a moment to respond on first load, that's normal — free-tier services may have a cold start delay.

---

## 🚀 Deployment

The project is deployed using **GitHub Pages**.

**To deploy your own fork:**

1. Push all files to the `main` branch of your GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save** — your site will be live at:
   ```
   https://<your-username>.github.io/holistic-harmony/
   ```

---

## 📅 Milestones

| Milestone | Description | Status |
|-----------|-------------|--------|
| Milestone 1 | Project planning, API selection, README setup | ✅ Done |
| Milestone 2 | API integration, dynamic rendering, loading states, responsiveness | ✅ Done |
| Milestone 3 | Search, filter, sort using HOFs; modal interactions; Mudra & Ayurveda sections | ✅ Done |
| Milestone 4 | Codebase cleanup, README update, deployment | ✅ Done |

---

## ✅ Best Practices Followed

- Modular JS functions (fetch, render, filter, modal all separated)
- DRY principle — reusable `createPoseCard()` builder
- Graceful error handling for API failures
- Semantic HTML with `aria-label` for accessibility
- CSS custom properties (variables) for consistent theming
- Meaningful commit messages
- Responsive-first design tested across screen sizes

---

## 👩‍💻 Author

**Shreya Singh**
- GitHub: [@ShreyaSingh2606](https://github.com/ShreyaSingh2606)

---

## 📄 License

This project was created as part of an academic assignment. All yoga data is sourced from the [Yoga API](https://github.com/alexcumplido/yoga-api) by alexcumplido.
