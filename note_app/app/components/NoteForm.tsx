import { Form } from "@remix-run/react";
import { useState } from "react";
import type { Note } from "~/types/note";

interface NoteFormProps {
  note?: Note;
  onSubmit: (formData: FormData) => void;
}

export default function NoteForm({ note, onSubmit }: NoteFormProps) {
  const [categories, setCategories] = useState<string[]>(
    note?.categories || []
  );
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newCategory) {
      e.preventDefault();
      addCategory();
    }
  };

  return (
    <Form
      method={note ? "put" : "post"}
      className="space-y-4"
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        formData.set("categories", JSON.stringify(categories));
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={note?.title}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows={8}
          defaultValue={note?.content}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="newCategory"
          className="block text-sm font-medium text-gray-700"
        >
          Categories
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              {category}
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="ml-2 text-blue-500 hover:text-blue-700"
                aria-label={`Remove category ${category}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add category"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addCategory}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            disabled={!newCategory}
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {note ? "Update Note" : "Create Note"}
        </button>
      </div>
    </Form>
  );
}
