"use client";

import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-zinc-400 text-sm mb-6">Could not find requested resource</p>
      <a
        href="/"
        className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
      >
        Return Home
      </a>
    </div>
  );
}
