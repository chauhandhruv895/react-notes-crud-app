import React, { useState } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome Note", content: "Create, edit, or delete notes below." }
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    setError("");

    if (editingId !== null) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? { ...note, title: title.trim(), content: content.trim() }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim()
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setError("");
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setContent("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Notes App</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">{editingId !== null ? "Update Note" : "Add Note"}</button>
          {editingId !== null && (
            <button type="button" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {notes.map((note) => (
            <li key={note.id} style={{ border: "1px solid #ddd", padding: 14, borderRadius: 8 }}>
              <h3 style={{ margin: "0 0 6px" }}>{note.title}</h3>
              <p style={{ margin: "0 0 10px" }}>{note.content}</p>
              <button onClick={() => handleEdit(note)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
