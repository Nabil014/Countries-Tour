import { useContext, useEffect, useState } from 'react'
import countriesStore from '../store/countriesStore'
import { PaginationContext } from '../context/paginationContext'
import { SearchContext } from '../context/searchContext'
import Dropdown from './Dropdown'

export default function Filters () {
  const { sortedByContinent, activities, sortedByActivity, sortedByPopulation, data } = countriesStore()

  const { setCurrentPage } = useContext(PaginationContext)
  const { search } = useContext(SearchContext)

  const continents = ['All Continents', 'Europe', 'Asia', 'Africa', 'South America', 'North America', 'Oceania']
  const populationOptions = ['Asc', 'Desc']
  const [selectedContinent, setSelectedContinent] = useState(continents[0])
  const [selectedActivity, setSelectedActivity] = useState('Activities')
  const [selectedPopulation, setSelectedPopulation] = useState('Population')
  const [isContinentOpen, setIsContinentOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [isPopulationOpen, setIsPopulationOpen] = useState(false)

  const handleContinentSelect = (option) => {
    setSelectedContinent(option)
    sortedByContinent(option)
    setCurrentPage(1)
    setIsContinentOpen(false)
    setSelectedPopulation('Population')
  }

  const activitiesOptions = ['All Activities'].concat(activities?.map(activity => activity.name))

  const handleActivitySelect = (option) => {
    setSelectedActivity(option)
    sortedByActivity(option)
    setCurrentPage(1)
    setIsActivityOpen(false)
  }

  const handlePopulationSelect = (option) => {
    setSelectedPopulation(option)
    sortedByPopulation(option)
    setCurrentPage(1)
    setIsPopulationOpen(false)
  }

  useEffect(() => {
    setSelectedContinent(continents[0])

  }, [search])


  return (
    <div className='flex gap-3 md:gap-x-10'>
      <Dropdown selectedOption={selectedContinent} options={continents} selectOption={handleContinentSelect} setIsOpen={setIsContinentOpen} isOpen={isContinentOpen} />
      <Dropdown selectedOption={selectedActivity} options={activitiesOptions} selectOption={handleActivitySelect} setIsOpen={setIsActivityOpen} isOpen={isActivityOpen} />
      <Dropdown selectedOption={selectedPopulation} options={populationOptions} selectOption={handlePopulationSelect} setIsOpen={setIsPopulationOpen} isOpen={isPopulationOpen} />
    </div>
  )
}