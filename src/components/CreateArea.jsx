import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

const COLOR_OPTIONS = ["yellow", "green", "blue", "pink", "orange"];

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "yellow",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleColorSelect(color) {
    setNote((prevNote) => ({
      ...prevNote,
      color,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (!note.title.trim() && !note.content.trim()) {
      return;
    }
    
    onAdd({
      ...note,
      title: note.title.trim(),
      content: note.content.trim(),
    });

    setNote({
      title: "",
      content: "",
      color: "yellow",
    });
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="create-area-container">
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            aria-label="Note Title"
            autoFocus
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          aria-label="Note Content"
        />

        {isExpanded && (
          <div className="color-picker">
            <span style={{ fontSize: "0.85rem", color: "#6c757d", marginRight: "4px" }}>
              Theme:
            </span>
            {COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                className={`color-option ${c} ${note.color === c ? "selected" : ""}`}
                onClick={() => handleColorSelect(c)}
                aria-label={`Select ${c} color theme`}
              />
            ))}
          </div>
        )}

        <Zoom in={isExpanded}>
          <Fab type="submit" size="medium" className="create-note-fab" aria-label="Add note">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
