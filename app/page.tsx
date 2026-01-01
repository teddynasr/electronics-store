import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link 
        href={"/products"}
        className="border-1 rounded-lg p-3 bg-zinc-900 hover:bg-zinc-600 transition duration-300">
          View Products
      </Link>
    </div>
  );
}
