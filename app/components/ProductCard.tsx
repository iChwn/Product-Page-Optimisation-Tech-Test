import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/app/lib/dummyjson";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      prefetch
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition
                 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
        {product.title}
      </h3>

      {/* Description */}
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
        {product.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          ${product.price}
        </span>

        <span className="text-xs font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">
          View details 
        </span>
      </div>
    </Link>
  );
}
