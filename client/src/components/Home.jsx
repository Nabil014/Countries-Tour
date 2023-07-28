import SearchBar from "./SearchBar";
import Countries from "./Countries";
import Filters from "./Filters";
import { Link } from "wouter";

export default function Home () {

  return (
    <div className="mx-auto max-w-8xl">

      <header className="flex items-center text-sm md:text-lg justify-center rounded-xl mx-auto p-10 bg-gradient-to-r from-[#000933c4] via-[#0d4f8dad] to-[#000933c4] my-10 gap-y-4 flex-col">
        <SearchBar />
        <Filters />
      </header>

      <main  >
        <Countries />
      </main>
    </div>
  )
}
