import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNoteApi,
  syncNotesApi,
} from "../api";

const STORAGE_KEY = "sticky_notes_app_data";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadBackendNotes = async () => {
    setIsLoading(true);
    setServerError(null);
    try {
      const data = await fetchNotes();
      setNotes(data);

      // Check if there are local storage notes to migrate
      const savedLocal = localStorage.getItem(STORAGE_KEY);
      if (savedLocal) {
        try {
          const parsedLocal = JSON.parse(savedLocal);
          if (
            Array.isArray(parsedLocal) &&
            parsedLocal.length > 0 &&
            data.length <= 2 // Only migrate if server only has initial default notes
          ) {
            // Check if local notes differ from server notes
            const localHasCustom = parsedLocal.some(
              (n) => !n.id.startsWith("default-")
            );
            if (localHasCustom) {
              const synced = await syncNotesApi(parsedLocal);
              if (synced.notes) {
                setNotes(synced.notes);
              }
            }
          }
        } catch (e) {
          console.warn("Failed parsing legacy localStorage notes:", e);
        }
      }
    } catch (err) {
      console.error("Backend fetch error:", err);
      setServerError("Could not connect to backend server. Using local storage fallback.");
      // Fallback to local storage if server is unreachable
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNotes(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to parse local storage fallback:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBackendNotes();
  }, []);

  // Save to local storage as fallback cache
  useEffect(() => {
    if (notes.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.error("Failed to cache notes in localStorage:", e);
      }
    }
  }, [notes]);

  async function addNote(newNote) {
    try {
      const created = await createNote(newNote);
      setNotes((prevNotes) => [created, ...prevNotes]);
    } catch (err) {
      console.error("Error creating note on backend:", err);
      // Fallback local update if backend fails
      const fallbackNote = {
        ...newNote,
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      };
      setNotes((prevNotes) => [fallbackNote, ...prevNotes]);
    }
  }

  async function deleteNote(id) {
    try {
      await deleteNoteApi(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note on backend:", err);
      // Optimistic local state update fallback
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  }

  async function editNote(id, updatedData) {
    try {
      const updated = await updateNote(id, updatedData);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, ...updated } : note))
      );
    } catch (err) {
      console.error("Error updating note on backend:", err);
      // Optimistic local state update fallback
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, ...updatedData } : note))
      );
    }
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
        {serverError && (
          <div className="status-banner error">
            <span>⚠️ {serverError}</span>
            <button onClick={loadBackendNotes}>Retry Connection</button>
          </div>
        )}

        <CreateArea onAdd={addNote} />

        {isLoading ? (
          <div className="loading-container">
            <CircularProgress style={{ color: "#bc6c25", marginBottom: "16px" }} />
            <p>Loading your saved notes...</p>
          </div>
        ) : filteredNotes.length > 0 ? (
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
