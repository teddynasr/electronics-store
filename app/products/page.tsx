"use client";

import { useState, useEffect } from "react";
import { Product } from "../models/product";
import Image from "next/image";
import { PagedResult } from "../models/pagedResult";
import Link from "next/link";

export default function ShowProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setDisabled(true);
      const res = await fetch(`/api/products?pageIndex=${pageIndex}&pageSize=${pageSize}`);
      const pagedProducts: PagedResult<Product> = await res.json();
      setProducts(pagedProducts.items);
      setTotalProducts(pagedProducts.total);
      setDisabled(false);
      setLoading(false);
    }

    fetchProducts();
  }, [pageIndex, pageSize]);

  const nextPage = () => setPageIndex((prev) => prev + 1);
  const prevPage = () => setPageIndex((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-8 flex flex-col items-center dark:bg-black min-h-screen">
      <div 
        className="flex relative min-w-full justify-center">
          <Link
                href={"/"}
                className="absolute top-0 left-0 mb-6 border rounded-lg px-4 py-1 bg-zinc-900 hover:bg-zinc-600 transition">
                    Home
            </Link>
          <h1 className="text-2xl font-bold mb-6">Products</h1>
        </div>

      {loading ? (
        <Image
          src={`/Images/loading.gif`}
          alt="Vercel logomark"
          width={300}
          height={300}/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex flex-col border rounded-lg p-4 bg-zinc-900 hover:bg-zinc-600 transition duration-300 gap-y-5 items-center"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <Image
                className="w-full h-auto object-contain"
                src={`/Images/${product.product_type?.name ?? "alt"}.png`}
                alt={product.name}
                width={300}
                height={300}
              />
              <p className="font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="relative flex justify-center mt-6 gap-4">
        <button
          onClick={prevPage}
          disabled={disabled || pageIndex === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <Image src="/Images/left.svg" alt="left arrow" width={24} height={24} />
        </button>

        <span className="px-4 py-2 font-medium">Page {pageIndex}</span>

        <button
          onClick={nextPage}
          disabled={disabled || pageIndex === Math.ceil(totalProducts/pageSize)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <Image src="/Images/right.svg" alt="right arrow" width={24} height={24} />
        </button>

        <div
          style={{
            position: "absolute",
            left: "100%",
            marginLeft: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <select
            value={pageSize}
            onChange={(e) => 
              {
                setPageSize(Math.max(Number(e.target.value), 1));
                setPageIndex(1);
              }}
            disabled={disabled}
            className="px-4 py-2 border rounded bg-white text-black disabled:opacity-50"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

    </div>
  );
}
