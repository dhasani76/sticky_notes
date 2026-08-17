# 📝 Sticky Notes App

A React sticky notes application built with **React 18**, **Vite**, and **Material-UI**.

---

## ✨ Features

- 📌 **Create & Delete Notes**: Easily add notes with titles and content.
- ✏️ **Inline Editing**: Click the edit icon on any note card to update titles and content.
- 🎨 **Color Themes**: Customize note backgrounds using 5 color themes (Yellow, Green, Blue, Pink, and Orange).
- 🔍 **Real-Time Search**: Search through your notes instantly by title or content keywords from the header bar.
- 💾 **Persistent Storage**: All notes automatically sync to browser `localStorage` so your data persists across page reloads.
- 📱 **Responsive Grid Layout**: CSS Grid layout (`auto-fill`) with hover micro-animations and sticky footer.
- ♿ **Accessible**: Includes ARIA labels and focus management for keyboard and screen reader accessibility.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components & Icons**: [Material-UI (MUI v6)](https://mui.com/)
- **Styling**: CSS3 (Variables, Grid, Flexbox, Animations)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed on your system.

### Installation

1. Clone or download the repository to your local machine.
2. Open a terminal in the project directory:
   ```bash
   cd sticky_notes
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with instant HMR. |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run preview` | Locally previews the production build. |

---

## 📁 Project Structure

```text
sticky_notes/
├── index.html            # Vite HTML entry point
├── vite.config.js        # Vite configuration
├── package.json          # Package dependencies & scripts
├── public/               # Static assets
└── src/
    ├── index.jsx         # React application root
    ├── styles.css        # Modern CSS design system & utility classes
    └── components/
        ├── App.jsx       # Main application layout & persistent state
        ├── Header.jsx    # Branding header & search bar
        ├── CreateArea.jsx# Note input form & color selector
        ├── Note.jsx      # Sticky note card with inline editing
        └── Footer.jsx    # Sticky footer layout
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
