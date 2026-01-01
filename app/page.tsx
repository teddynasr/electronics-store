import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
      <Link 
        href={"/products"}
        className="border-1 rounded-lg p-3 text-black hover:text-white hover:bg-zinc-600 transition duration-300 dark:bg-zinc-900 dark:text-white">
          View Products
      </Link>
    </div>
  );
}
