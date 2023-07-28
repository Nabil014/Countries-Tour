import { Router, Route } from 'wouter'
import CountryDetails from "./components/CountryDetails"
import Home from "./components/Home"
import { PaginationProvider } from "./context/paginationContext"
import { SearchProvider } from "./context/searchContext"
import bg from '../src/assets/bg.svg'
import CreateActivity from './components/CreateActivity'


function App () {

  return (
    <Router>
      <div className='flex-grow'>
        <section className="fixed top-0 bottom-0 left-0 right-0 -z-10">
          <img src={bg} alt="bg" className="object-cover w-full h-full" />
        </section>
        <PaginationProvider>
          <SearchProvider>
            <Route path={"/"} component={Home} />
          </SearchProvider>
        </PaginationProvider>
        <Route path={"/country/:id"} component={CountryDetails} />
        <Route path={'/create'} component={CreateActivity} />
      </div>
      <footer className='mb-3'>
        <p className='flex items-center justify-center text-center text-gray-300 gap-x-3'>Powered by <a target='_blank' rel='noreferrer' href="https://nabil-allis.vercel.app/" className='relative px-2 text-pink-500 transition-all hover:bg-pink-600 hover:text-white hover:scale-125 '>Nabil Allis</a></p>
      </footer>

    </Router>
  )
}

export default App
