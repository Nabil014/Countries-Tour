import { useEffect, useState } from "react"
import countriesStore from "../store/countriesStore"
import Dropdown from "./Dropdown"
import { useLocation } from "wouter"
import Swal from 'sweetalert2'
import { RiCloseCircleLine } from 'react-icons/ri'

export default function CreateActivity () {
  const { data, postActivity, fetchData } = countriesStore()
  const [location, setLocation] = useLocation()

  useEffect(() => {
    fetchData()
  }, [])

  const difficulties = [1, 2, 3, 4, 5]
  const durations = Array.from({ length: 24 }, (_, index) => (index + 1))
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false)
  const [isSeasonOpen, setIsSeasonOpen] = useState(false)
  const [isDurationOpen, setIsDurationOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  const [activity, setActivity] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  })

  const handleOnClose = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    const firstLetter = value.charAt(0).toUpperCase()
    const restOfValue = value.slice(1).toLowerCase()
    const newValue = firstLetter + restOfValue
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: newValue,
    }))
  }

  const handleOptionSelect = (option, field) => {
    if (field === "countries") {
      const selectedCountry = data.find((country) => country.name === option)
      const isCountrySelected = activity.countries.some((country) => country === selectedCountry.id)
      if (isCountrySelected) return
      setActivity((prevActivity) => ({
        ...prevActivity,
        [field]: [...activity.countries, selectedCountry.id]
      }))
    } else {
      setActivity((prevActivity) => ({
        ...prevActivity,
        [field]: option
      }))
    }
  }

  const handleRemoveCountry = (countryId) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      countries: activity.countries.filter((country) => country !== countryId)
    }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (activity.name === '' || activity.difficulty === '' || activity.duration === '' || activity.season === '') {
      setIsError(true)
    } else {
      setIsError(false)
      postActivity(activity)
      setActivity({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
      })
      Swal.fire({
        title: 'Activity created successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      setLocation('/')
    }
  }


  return (
    <main
      id="container"
      onClick={handleOnClose}
    >
      <section >
        <h1 className="flex items-center justify-center pt-10 text-4xl font-bold text-center text-white gap-x-4">Create<p className="bg-[#b8ebf5] rounded-lg rotate-6 hover:rotate-3 transition-all text-[#121d4e] p-2 ">Activity</p> </h1>
        <form className="flex flex-col items-center p-10 gap-y-3">

          <label className="text-[#e2e0e0]">Name:</label>
          <input
            type="text"
            name="name"
            value={activity.name}
            placeholder="Futbol, Tenis..."
            onChange={handleChange}
            className="p-2 rounded w-52"
          />
          <label className="text-[#e2e0e0]" >Difficulty level:</label>
          <div onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}>
            <Dropdown
              field="difficulty"
              selectedOption={activity.difficulty}
              options={difficulties}
              selectOption={handleOptionSelect}
              isOpen={isDifficultyOpen}
              setIsOpen={setIsDifficultyOpen}
              placeholder="Select difficulty"
            />
          </div>
          <label className="text-[#e2e0e0]" >Season:</label>
          <div onClick={() => setIsSeasonOpen(!isSeasonOpen)}>
            <Dropdown
              field="season"
              placeholder="Select season"
              selectedOption={activity.season}
              options={seasons}
              selectOption={handleOptionSelect}
              isOpen={isSeasonOpen}
              setIsOpen={setIsSeasonOpen}
            />
          </div>
          <label className="text-[#e2e0e0]" >Duration (hours):</label>
          <div onClick={() => setIsDurationOpen(!isDurationOpen)}>
            <Dropdown
              field="duration"
              placeholder="Select duration"
              selectedOption={activity.duration}
              options={durations}
              selectOption={handleOptionSelect}
              isOpen={isDurationOpen}
              setIsOpen={setIsDurationOpen}
            />
          </div>
          <label className="text-[#e2e0e0]" >Countries:</label>
          <div onClick={() => setIsCountryOpen(!isCountryOpen)}>
            <Dropdown
              field="countries"
              placeholder="Select country"
              selectedOption={activity.country}
              options={data?.map((country) => country.name)}
              selectOption={(option) => handleOptionSelect(option, "countries")}
              isOpen={isCountryOpen}
              setIsOpen={setIsCountryOpen}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            {activity.countries.map((selectedCountry) => (
              <div key={selectedCountry} className="flex items-center justify-center p-1 bg-gray-200 rounded gap-x-3 w-max">
                {data.find((country) => country.id === selectedCountry)?.name}
                <button className="flex items-center justify-center text-red-600" onClick={() => handleRemoveCountry(selectedCountry)}><RiCloseCircleLine /> </button>
              </div>
            ))}
          </div>
        </form>
        {
          isError && <p className='flex justify-center text-white bg-red-500'>All fields are required</p>
        }
        <div className='flex justify-center'>
          <button className=' py-2 px-5 mb-2 flex justify-center items-center text-[#e2e0e0] mx-auto border border-[#024755] hover:bg-[#e2e0e0] font-semibold hover:text-[#024755] transition-colors rounded' onClick={handleSubmit}>Create</button>
        </div>
      </section>
    </main>
  )
}