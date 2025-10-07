"use client";

import Image from "next/image";
import Link from "next/link";

export default function CatPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Cute Cat</h1>
      <Image
        src="https://placekitten.com/600/400"
        alt="A cute cat"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </main>
  );
}
