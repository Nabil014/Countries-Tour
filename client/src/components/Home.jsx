import SearchBar from "./SearchBar";
import Countries from "./Countries";
import Filters from "./Filters";
import { IoCreateOutline } from 'react-icons/io5'
import { Link } from "wouter";

export default function Home () {

  return (
    <div className="mx-auto max-w-8xl">

      <header className="flex items-center text-sm md:text-lg justify-center rounded-xl mx-auto p-10 bg-gradient-to-r from-[#000933c4] via-[#0d4f8dad] to-[#000933c4] my-10 flex-col gap-y-3 ">
        <SearchBar />
        <div className="flex flex-row gap-3 md:gap-x-10">

          <Filters />
          <Link href={'/create'}>
            <button className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-200 rounded-md hover:bg-gray-300">
              <IoCreateOutline /> Create Activity
            </button>
          </Link>
        </div>
      </header>

      <main  >
        <Countries />
      </main>
    </div>
  )
}
