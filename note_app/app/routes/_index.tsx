import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import NoteCard from "~/components/NoteCard";
import SearchBar from "~/components/SearchBar";
import { getAllNotes, deleteNote, searchNotes } from "~/utils/db";
import type { Note } from "~/types/note";

export const meta: MetaFunction = () => {
  return [
    { title: "NoteEase - Your Personal Note Taking App" },
    { name: "description", content: "A simple and intuitive notes application" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(() => getAllNotes());
  const [searchResults, setSearchResults] = useState<Note[]>(notes);

  // Get unique categories from all notes
  const categories = Array.from(
    new Set(notes.flatMap((note) => note.categories))
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
      setNotes(getAllNotes());
    }
  };

  const handleSearch = (query: string, category?: string) => {
    const results = searchNotes(query, category);
    setSearchResults(results);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
        <button
          onClick={() => navigate("/notes/new")}
          className="rounded-full bg-blue-500 p-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6">
        <SearchBar
          categories={categories}
          onSearch={handleSearch}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No notes found. Create your first note!
          </div>
        )}
      </div>
    </div>
  );
}
