import { useContext, useEffect, useState } from 'react'
import countriesStore from '../store/countriesStore'
import { PaginationContext } from '../context/paginationContext'
import { SearchContext } from '../context/searchContext'
import Dropdown from './Dropdown'

export default function Filters () {
  const { sortedByContinent, activities, sortedByActivity } = countriesStore()

  const { setCurrentPage } = useContext(PaginationContext)
  const { search } = useContext(SearchContext)

  const continents = ['All Continents', 'Europe', 'Asia', 'Africa', 'South America', 'North America', 'Oceania']
  const [selectedContinent, setSelectedContinent] = useState(continents[0])
  const [selectedActivity, setSelectedActivity] = useState('Activities')
  const [isContinentOpen, setIsContinentOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)


  const handleContinentSelect = (option) => {
    setSelectedContinent(option)
    sortedByContinent(option)
    setCurrentPage(1)
    setIsContinentOpen(false)
  }

  const activitiesOptions = ['All Activities'].concat(activities?.map(activity => activity.name))

  const handleActivitySelect = (option) => {
    setSelectedActivity(option)
    sortedByActivity(option)
    setCurrentPage(1)
    setIsActivityOpen(false)

  }

  useEffect(() => {
    setSelectedContinent(continents[0])
  }, [search])


  return (
    <div className='flex gap-3 md:gap-x-10'>
      <Dropdown selectedOption={selectedContinent} options={continents} selectOption={handleContinentSelect} setIsOpen={setIsContinentOpen} isOpen={isContinentOpen} />
      <Dropdown selectedOption={selectedActivity} options={activitiesOptions} selectOption={handleActivitySelect} setIsOpen={setIsActivityOpen} isOpen={isActivityOpen} />
    </div>
  )
}