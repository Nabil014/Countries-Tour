import { useEffect } from "react";
import { useRoute } from "wouter";
import countriesStore from "../store/countriesStore";
import loader from "../assets/loader-eclipse.svg"
import errorIcon from "../assets/icon-error.svg"
import arrowLeft from "../assets/arrow-left.svg"

export default function CountryDetails () {
  const { fetchCountry, country, isLoading, error } = countriesStore()
  const param = useRoute("/country/:id")

  document.title = `${country?.name} Details`

  useEffect(() => {
    fetchCountry(param[1].id)
  }, [fetchCountry])

  if (isLoading) <img className="absolute top-0 bottom-0 left-0 right-0 m-auto" src={loader} alt="loader"></img>
  if (error) (<div className="fixed inset-0 flex items-center justify-center gap-x-4"> <img src={errorIcon} alt="errorIcon" className="w-20" /> <p className="self-center font-mono text-xl font-semibold text-white"> Country not found</p></div>)

  return (
    <div>
      {
        country ?
          < div className="flex flex-col h-screen">
            <div className="flex items-center p-6 gap-x-14">
              <img src={arrowLeft} className="w-10 cursor-pointer" alt="icon-arrowLeft" onClick={() => window.history.back()} />
              <h1 className="text-3xl text-white ">{country.name} Details</h1>
            </div>
            <div className="flex gap-x-5 h-[85%] items-center text-white ">
              <div className="flex justify-center w-1/2">
                <img src={country.flag} alt={country.name} className="w-[350px] h-[250px] rounded-lg" />
              </div>
              <div className="flex flex-col w-1/2 text-xl font-semibold gap-y-4">
                <p>Capital: {country.capital ?? "No capital"}</p>
                <p>Continent: {country.continent}</p>
                <p>Population: {country.population}</p>
                <p>Area: {country.area}</p>
                <p>Activities:</p>
                <ul>
                  {
                    country.activities.length > 0 && country.activities.map((activity, index) => (
                      <li key={index}>{activity.name}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          : <img className="absolute top-0 bottom-0 left-0 right-0 m-auto" src={loader} alt="loader"></img>
      }
    </div>
  )
}
