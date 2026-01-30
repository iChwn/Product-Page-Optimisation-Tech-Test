"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = { slug: string; name: string };

export default function SortFilterBar({
  categories,
  selectedCategory,
  sort,
}: {
  categories: Category[];
  selectedCategory: string;
  sort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Category */}
        <div className="w-full sm:w-64">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Category
          </label>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setParam("category", e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Chevron */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div className="w-full sm:w-64">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Sort by price
          </label>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Default</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right: Clear button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
