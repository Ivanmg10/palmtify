"use client";

import Link from "next/link";

export default function Error() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center h-screen gap-5">
        <h1 className="text-5xl font-bold">
          Error al recuperar el artista/album
        </h1>
        <Link
          className="border-2 border-[#b3b3b3] rounded-full p-3 text-center hover:bg-[#b3b3b3] hover:text-black transition-all duration-300"
          href="/"
        >
          Volver a la página principal
        </Link>
      </section>
    </main>
  );
}
