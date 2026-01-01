"use client"

import { Product } from "@/app/models/product";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShowProduct(){
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load(id: string) {
            setLoading(true);
            const res = await fetch(`/api/products/${id}`);
            const data: Product = await res.json();
            setProduct(data);
            setLoading(false);
        }

        load(window.location.href.split('/').pop() || "");
    }, []);

    return (
        <div className="p-8 flex flex-col items-center dark:bg-black min-h-screen">
            <Link
                href={"/products"}
                className="mb-6 border rounded-lg px-4 py-1 bg-zinc-900 hover:bg-zinc-600 transition place-self-start">
                    Back
            </Link>
            { loading ? (
                    <Image
                        src={`/Images/loading.gif`}
                        alt="Vercel logomark"
                        width={300}
                        height={300}/>
                    ) :
              !product ? (
                    <h1 className="text-2xl font-bold mb-6">
                        Product not Found
                    </h1>
                ) :
                (
                <>
                    <h1 className="text-2xl font-bold mb-6">
                        {product.name}
                    </h1>
                    <div
                    key={product.id}
                    className="flex flex-col border rounded-lg p-4 bg-zinc-900 hover:bg-zinc-600 transition duration-300 gap-y-5 items-center"
                    >
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <Image
                        className="w-full h-auto object-contain"
                        src={`/Images/${product.product_type?.name ?? "alt"}.png`}
                        alt="Vercel logomark"
                        width={300}
                        height={300}/>
                    <p className="font-bold">${product.price}</p>
                    </div>
                </>
                )}
        </div>
    )
}