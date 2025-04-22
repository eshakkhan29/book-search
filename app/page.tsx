"use client";
import BooksWrapper from "@/components/BooksWrapper";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="space-y-10">
      {/* header */}
      <Header setQuery={setQuery} />

      {/* books */}
      <BooksWrapper query={query} />
    </div>
  );
}
