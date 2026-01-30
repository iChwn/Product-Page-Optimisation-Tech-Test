"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function CarouselClient({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const imgs = useMemo(() => images.filter(Boolean), [images]);
  const [idx, setIdx] = useState(0);

  if (!imgs.length) return null;
  const hasMany = imgs.length > 1;

  const prev = () => setIdx((v) => (v - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((v) => (v + 1) % imgs.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">
        <Image
          src={imgs[idx]}
          alt={`${title} image ${idx + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute px-5 py-2.5 left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-lg shadow-sm ring-1 ring-black/5 hover:bg-white"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute px-5 py-2.5 right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-lg shadow-sm ring-1 ring-black/5 hover:bg-white"
              aria-label="Next image"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {idx + 1}/{imgs.length}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imgs.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIdx(i)}
              className={[
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl",
                i === idx ? "border-2 border-blue-500" : "border-2 hover:border-gray-300",
              ].join(" ")}
              aria-label={`Select image ${i + 1}`}
              type="button"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
