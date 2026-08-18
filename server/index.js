import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "notes.json");

app.use(cors());
app.use(express.json());

// Ensure data directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialNotes = [
      {
        id: "default-1",
        title: "Welcome to Sticky Notes! 📝",
        content: "Click the add button above to create new notes. Choose color themes, search, edit, or delete notes anytime!",
        color: "yellow",
        createdAt: new Date().toISOString(),
      },
      {
        id: "default-2",
        title: "Pro Tip 💡",
        content: "Your notes are now saved to the backend database server! They will stay saved even if you restart your computer or clear your browser cache.",
        color: "green",
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialNotes, null, 2), "utf-8");
  }
}

function readNotes() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading notes file:", error);
    return [];
  }
}

function writeNotes(notes) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing notes file:", error);
    return false;
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET all notes
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST a new note
app.post("/api/notes", (req, res) => {
  const { title = "", content = "", color = "yellow" } = req.body;

  if (!title.trim() && !content.trim()) {
    return res.status(400).json({ error: "Note must have a title or content" });
  }

  const newNote = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    color: color || "yellow",
    createdAt: new Date().toISOString(),
  };

  const notes = readNotes();
  notes.unshift(newNote);
  
  if (writeNotes(notes)) {
    res.status(201).json(newNote);
  } else {
    res.status(500).json({ error: "Failed to save note to server storage" });
  }
});

// PUT update existing note
app.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, color } = req.body;

  const notes = readNotes();
  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title !== undefined ? title.trim() : notes[noteIndex].title,
    content: content !== undefined ? content.trim() : notes[noteIndex].content,
    color: color !== undefined ? color : notes[noteIndex].color,
    updatedAt: new Date().toISOString(),
  };

  if (writeNotes(notes)) {
    res.json(notes[noteIndex]);
  } else {
    res.status(500).json({ error: "Failed to update note in server storage" });
  }
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  
  const existingNote = notes.find((n) => n.id === id);
  if (!existingNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes = notes.filter((n) => n.id !== id);

  if (writeNotes(notes)) {
    res.json({ message: "Note deleted successfully", id });
  } else {
    res.status(500).json({ error: "Failed to delete note from server storage" });
  }
});

// POST bulk sync notes (e.g., from local storage migration)
app.post("/api/notes/sync", (req, res) => {
  const { notes } = req.body;
  if (!Array.isArray(notes)) {
    return res.status(400).json({ error: "Notes must be an array" });
  }

  if (writeNotes(notes)) {
    res.json({ message: "Notes synchronized successfully", notes });
  } else {
    res.status(500).json({ error: "Failed to sync notes" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sticky Notes Server running on http://localhost:${PORT}`);
});
