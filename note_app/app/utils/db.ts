import type { Note, NoteFormData } from "~/types/note";

const STORAGE_KEY = "noteease-notes";

export const getAllNotes = (): Note[] => {
  if (typeof window === "undefined") return [];
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const createNote = (noteData: NoteFormData): Note => {
  const notes = getAllNotes();
  const newNote: Note = {
    id: crypto.randomUUID(),
    ...noteData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newNote, ...notes]));
  return newNote;
};

export const updateNote = (id: string, noteData: NoteFormData): Note | null => {
  const notes = getAllNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) return null;
  
  const updatedNote: Note = {
    ...notes[noteIndex],
    ...noteData,
    updatedAt: new Date().toISOString(),
  };
  
  notes[noteIndex] = updatedNote;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return updatedNote;
};

export const deleteNote = (id: string): boolean => {
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  return true;
};

export const searchNotes = (query: string, category?: string): Note[] => {
  const notes = getAllNotes();
  const normalizedQuery = query.toLowerCase();
  
  return notes.filter(note => {
    const matchesQuery = !query || 
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.content.toLowerCase().includes(normalizedQuery);
      
    const matchesCategory = !category || 
      note.categories.includes(category);
      
    return matchesQuery && matchesCategory;
  });
};
