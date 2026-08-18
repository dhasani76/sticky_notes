const API_BASE = "/api/notes";

export async function fetchNotes() {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error(`Failed to fetch notes (status: ${response.status})`);
  }
  return await response.json();
}

export async function createNote(noteData) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to create note (status: ${response.status})`);
  }

  return await response.json();
}

export async function updateNote(id, noteData) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to update note (status: ${response.status})`);
  }

  return await response.json();
}

export async function deleteNoteApi(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to delete note (status: ${response.status})`);
  }

  return await response.json();
}

export async function syncNotesApi(notes) {
  const response = await fetch(`${API_BASE}/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notes }),
  });

  if (!response.ok) {
    throw new Error(`Failed to sync notes (status: ${response.status})`);
  }

  return await response.json();
}
