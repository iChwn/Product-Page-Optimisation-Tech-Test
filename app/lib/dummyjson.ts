import apiList from "../constant/apiUrl";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus?: string;
  stock?: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const BASE = process.env.NEXT_PUBLIC_URL_SERVER;

export async function getCategories(): Promise<
  { slug: string; name: string; url: string }[]
> {
  const res = await fetch(`${BASE + apiList.productCategories}`, {
    next: { revalidate: 60 * 10 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProducts(opts: {
  category?: string;
  sort?: "asc" | "desc";
}): Promise<ProductsResponse> {
  const { category, sort } = opts;

  const baseUrl = category
    ? `${BASE + apiList.productCategory}/${encodeURIComponent(category)}`
    : `${BASE + apiList.products}`;

  const url = new URL(baseUrl);
  // sorting by price via API query params
  if (sort) {
    url.searchParams.set("sortBy", "price");
    url.searchParams.set("order", sort);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 * 2 }, // 2 menit cache
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string) {
  const url = `${BASE + apiList.products}/${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    next: { revalidate: 60 * 10 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch product. status=${res.status} url=${url} body=${body.slice(0, 200)}`
    );
  }

  return res.json();
}

