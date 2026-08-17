import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function Note({ id, title, content, color, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title, content });

  function handleDelete() {
    onDelete(id);
  }

  function handleSave() {
    if (!editedNote.title.trim() && !editedNote.content.trim()) {
      onDelete(id);
      return;
    }
    onEdit(id, editedNote);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedNote({ title, content });
    setIsEditing(false);
  }

  return (
    <div className={`note ${color || "yellow"}`}>
      {isEditing ? (
        <div>
          <input
            className="note-edit-input"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            placeholder="Title"
            aria-label="Edit note title"
          />
          <textarea
            className="note-edit-textarea"
            rows={3}
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            placeholder="Content"
            aria-label="Edit note content"
          />
          <div className="note-actions">
            <button className="note-btn save-btn" onClick={handleSave} aria-label="Save note changes">
              <CheckIcon fontSize="small" style={{ marginRight: "4px" }} /> Save
            </button>
            <button className="note-btn" onClick={handleCancel} aria-label="Cancel editing">
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            {title && <h2>{title}</h2>}
            {content && <p>{content}</p>}
          </div>
          <div className="note-actions">
            <button className="note-btn" onClick={() => setIsEditing(true)} aria-label="Edit note">
              <EditOutlinedIcon fontSize="small" />
            </button>
            <button className="note-btn delete-btn" onClick={handleDelete} aria-label="Delete note">
              <DeleteOutlineIcon fontSize="small" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
