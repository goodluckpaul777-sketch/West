"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-zinc-400 text-sm mb-6">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-xl"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
