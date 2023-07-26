import { Link } from 'wouter'

export default function Card ({ id, name, flag, continent }) {

  return (
    <Link href={`/country/${id}`}>
      <article className="relative text-white backdrop-opacity-20 backdrop-invert h-72 w-[270px] rounded-xl hover:bg-white/75  hover:text-[#000933] hover:shadow-[#ffd79ca6] hover:shadow-[0_0_7px_2px] hover:-translate-y-4 transition-all cursor-pointer">
        <header className="flex flex-col items-center gap-4 ">
          <img src={flag} alt="flag" className="flex w-[200px] h-[150px] -translate-y-4" />
        </header>
        <footer className="flex flex-col gap-2 p-4 text-center">
          <h3 className="text-2xl font-bold">{name}</h3>
          <span>{continent}</span>
        </footer>
      </article>
    </Link>
  )
}
