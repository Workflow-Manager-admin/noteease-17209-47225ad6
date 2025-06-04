import { useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import NoteForm from "~/components/NoteForm";
import { getAllNotes, updateNote } from "~/utils/db";
import type { Note, NoteFormData } from "~/types/note";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Note - NoteEase" },
    { name: "description", content: "Edit your note in NoteEase" },
  ];
};

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (!id) return;
    const notes = getAllNotes();
    const foundNote = notes.find(n => n.id === id);
    if (foundNote) {
      setNote(foundNote);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = (formData: FormData) => {
    if (!id) return;

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categories = JSON.parse(formData.get("categories") as string);

    const noteData: NoteFormData = {
      title,
      content,
      categories,
    };

    updateNote(id, noteData);
    navigate("/");
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
      <NoteForm note={note} onSubmit={handleSubmit} />
    </div>
  );
}
