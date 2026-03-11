import React, { useMemo, useState } from "react";

const sampleData = [
  { type: "Patient", label: "Rahul Sharma" },
  { type: "Patient", label: "Anitha Raj" },
  { type: "Doctor", label: "Dr Karthik Menon" },
  { type: "Doctor", label: "Dr Priya Nair" },
  { type: "Token", label: "#12" },
  { type: "Token", label: "#45" }
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return sampleData.filter((item) => item.label.toLowerCase().includes(lower));
  }, [query]);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        placeholder="Search patients, tokens, doctors..."
        className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
      />
      {open && results.length > 0 && (
        <div className="absolute right-0 z-30 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-56 overflow-y-auto py-1 text-xs text-slate-700">
            {results.map((item, idx) => (
              <li
                key={`${item.type}-${item.label}-${idx}`}
                className="flex items-center justify-between px-3 py-1.5 hover:bg-slate-50"
              >
                <span>{item.label}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {item.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

