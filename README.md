# 📝 Sticky Notes App

A full-stack React sticky notes application built with **React 18**, **Vite**, **Express**, and **Material-UI**.

---

## ✨ Features

- 📌 **Create & Delete Notes**: Easily add notes with titles and content.
- ✏️ **Inline Editing**: Click the edit icon on any note card to update titles and content.
- 🎨 **Color Themes**: Customize note backgrounds using 5 color themes (Yellow, Green, Blue, Pink, and Orange).
- 🔍 **Real-Time Search**: Search through your notes by title or content keywords from the header bar.
- ♿ **Accessible**: Includes ARIA labels and focus management for keyboard and screen reader accessibility.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 18](https://react.dev/)
- **Backend Server**: [Express.js](https://expressjs.com/) (Node.js REST API)
- **Database / Persistence**: JSON storage engine (`server/data/notes.json`)
- **Build Tool**: [Vite](https://vitejs.dev/) with Proxy
- **UI Components & Icons**: [Material-UI (MUI v6)](https://mui.com/)
- **Styling**: CSS3 (Variables, Grid, Flexbox, Animations)

---

## 🔌 API Endpoints

The backend server exposes the following REST API endpoints under `/api/notes`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/notes` | Retrieves all saved notes |
| `POST` | `/api/notes` | Creates a new note (`{ title, content, color }`) |
| `PUT` | `/api/notes/:id` | Updates an existing note by ID |
| `DELETE` | `/api/notes/:id` | Deletes a note by ID |
| `POST` | `/api/notes/sync` | Bulk synchronizes notes |

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

Start both the Node.js backend server and Vite frontend server concurrently:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both the Express server (port 5000) and Vite dev server (port 5173) concurrently. |
| `npm run server` | Runs only the Node.js Express backend server. |
| `npm run build` | Builds the frontend app for production to the `dist` folder. |
| `npm run preview` | Locally previews the production build. |

---

## 📁 Project Structure

```text
sticky_notes/
├── index.html            # Vite HTML entry point
├── vite.config.js        # Vite configuration with API proxy
├── package.json          # Package dependencies & scripts
├── public/               # Static assets
├── server/
│   ├── index.js          # Express REST API server
│   └── data/
│       └── notes.json    # Disk database storing saved notes
└── src/
    ├── index.jsx         # React application root
    ├── api.js            # Frontend HTTP client helper for backend REST API
    ├── styles.css        # Modern CSS design system & utility classes
    └── components/
        ├── App.jsx       # Main application layout & backend state integration
        ├── Header.jsx    # Branding header & search bar
        ├── CreateArea.jsx# Note input form & color selector
        ├── Note.jsx      # Sticky note card with inline editing
        └── Footer.jsx    # Sticky footer layout
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
