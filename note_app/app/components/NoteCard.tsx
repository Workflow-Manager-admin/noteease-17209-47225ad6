import { Link } from "@remix-run/react";
import type { Note } from "~/types/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/notes/${note.id}`} className="block">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {truncateContent(note.content)}
        </p>
        {note.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {note.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(note.id);
        }}
        className="absolute right-2 top-2 hidden rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 group-hover:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
