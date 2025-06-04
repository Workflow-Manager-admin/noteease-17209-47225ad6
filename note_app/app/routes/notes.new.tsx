import { useNavigate } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import NoteForm from "~/components/NoteForm";
import { createNote } from "~/utils/db";
import type { NoteFormData } from "~/types/note";

export const meta: MetaFunction = () => {
  return [
    { title: "Create New Note - NoteEase" },
    { name: "description", content: "Create a new note in NoteEase" },
  ];
};

export default function NewNote() {
  const navigate = useNavigate();

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categories = JSON.parse(formData.get("categories") as string);

    const noteData: NoteFormData = {
      title,
      content,
      categories,
    };

    createNote(noteData);
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create New Note</h1>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
}
