import Image from "next/image";

export default async function Loading() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center h-screen gap-5">
        <Image
          src="/favicon.svg"
          alt="Loading"
          className="loading-spinner"
          width={100}
          height={100}
        />
      </section>
    </main>
  );
}
