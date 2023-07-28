import { useEffect, useState } from "react"
import countriesStore from "../store/countriesStore"
import Card from "./Card"
import loader from '../assets/loader-eclipse.svg'
import errorIcon from '../assets/icon-error.svg'
import Pagination from "./Pagination/Pagination"

export default function Countries () {
  const { fetchData, data, isLoading, error, getActivities } = countriesStore()
  const [currentItems, setCurrentItems] = useState([])

  const itemsPage = (items) => {
    setCurrentItems(items)
  }

  useEffect(() => {
    fetchData()
    getActivities()

  }, [])

  return (
    <div>
      <div className="grid min-h-[70vh] md:min-h-[65vh] grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-14">

        {isLoading && <img className="absolute top-0 bottom-0 left-0 right-0 m-auto" src={loader} alt="loader"></img>}
        {
          !error && currentItems?.map(country => (
            <Card key={country.id} name={country.name} capital={country.capital} flag={country.flag} id={country.id} population={country.population} activities={country.activities} continent={country.continent} />
          ))
        }
        {
          error && (<div className="fixed inset-0 flex items-center justify-center gap-x-4"> <img src={errorIcon} alt="errorIcon" className="w-20" /> <p className="self-center font-mono text-xl font-semibold text-white"> Country not found</p></div>)
        }
      </div>
      <div className={`py-10 ${currentItems.length < 8 && 'hidden'}`}>
        <Pagination totalItems={data?.length} sendItems={itemsPage} />
      </div>
    </div>
  )
}
