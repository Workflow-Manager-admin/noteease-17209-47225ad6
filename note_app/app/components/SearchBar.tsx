import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  initialCategory?: string;
  categories: string[];
  onSearch: (query: string, category?: string) => void;
}

export default function SearchBar({
  initialQuery = "",
  initialCategory = "",
  categories,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query, category || undefined);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, category, onSearch]);

  return (
    <Form className="flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="w-48">
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </Form>
  );
}
