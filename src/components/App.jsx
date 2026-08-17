import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const STORAGE_KEY = "sticky_notes_app_data";

const DEFAULT_NOTES = [
  {
    id: "default-1",
    title: "Welcome to Sticky Notes! 📝",
    content: "Click the add button above to create new notes. Choose color themes, search, edit, or delete notes anytime!",
    color: "yellow",
  },
  {
    id: "default-2",
    title: "Pro Tip 💡",
    content: "Your notes are automatically saved to your browser's local storage so you won't lose them when you refresh.",
    color: "green",
  },
];

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load notes from localStorage:", e);
    }
    return DEFAULT_NOTES;
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes to localStorage:", e);
    }
  }, [notes]);

  function addNote(newNote) {
    const noteWithId = {
      ...newNote,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    };
    setNotes((prevNotes) => [noteWithId, ...prevNotes]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function editNote(id, updatedData) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, ...updatedData } : note))
    );
  }

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (note.title && note.title.toLowerCase().includes(query)) ||
      (note.content && note.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="app-container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="main-content">
        <CreateArea onAdd={addNote} />
        
        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((noteItem) => (
              <Note
                key={noteItem.id}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                color={noteItem.color}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <NoteAddIcon className="empty-state-icon" />
            <h3>{searchQuery ? "No matching notes found" : "No notes yet"}</h3>
            <p>
              {searchQuery
                ? "Try searching for a different keyword."
                : "Create your first sticky note using the form above!"}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
