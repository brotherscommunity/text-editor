import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="grid place-items-center h-[50vh]">
        <div className="w-full flex flex-col items-center">
          <p className="text-2xl text-black font-medium text-center">
            Could not find requested resource 😔
          </p>
          <Link href="/" className="mt-5 text-base text-blue-600 font-semibold">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
