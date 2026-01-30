import CarouselClient from "../../components/CarouselClient";
import { getProduct } from "@/app/lib/dummyjson";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  const images = product.images?.length ? product.images : [product.thumbnail];

  const availability =
    product.availabilityStatus ??
    (product.stock && product.stock > 0 ? "In Stock" : "Out of Stock");

  const inStock = availability.toLowerCase().includes("in stock");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-white/80">
        <Link
          href="/"
          className="hover:text-white transition"
        >
          Products
        </Link>

        <span className="text-white/40">/</span>

        <Link
          href={`/?category=${product.category}`}
          className="capitalize hover:text-white transition"
        >
          {product.category}
        </Link>

        <span className="text-white/40">/</span>

        <span className="font-medium text-white">
          {product.title}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT */}
        <section>
          <CarouselClient images={images} title={product.title} />
        </section>

        {/* RIGHT */}
        <aside className="h-fit lg:sticky lg:top-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700",
                ].join(" ")}
              >
                {availability}
              </span>

              {product.stock != null && (
                <span className="text-xs text-gray-500">
                  Stock: <span className="font-semibold">{product.stock}</span>
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {product.category}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                Add to cart
              </button>
              <button className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
                Checkout
              </button>
            </div>

          </div>
        </aside>
      </div>
    </main>
  );
}
