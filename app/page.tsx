import { getCategories, getProducts } from "@/app/lib/dummyjson";
import SortFilterBar from "@/app/components/SortFilterBar";
import ProductCard from "@/app/components/ProductCard";

export const revalidate = 120;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: "asc" | "desc" }>;
}) {
  const sp = await searchParams;

  const [categories, data] = await Promise.all([
    getCategories(),
    getProducts({
      category: sp.category,
      sort: sp.sort,
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Products
        </h1>
        <p className="mt-1 text-sm text-white">
          Browse products, filter by category, and sort by price.
        </p>
      </div>

      {/* Filter + Sort */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <SortFilterBar
          categories={categories}
          selectedCategory={sp.category ?? ""}
          sort={sp.sort ?? ""}
        />
      </div>

      {/* Grid */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
