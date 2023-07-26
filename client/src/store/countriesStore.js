import { create } from 'zustand'
import axios from 'axios'

const countriesStore = create((set, get) => ({
  data: null,
  isLoading: true,
  error: null,
  allCountries: [],
  country: null,
  activities: [],
  fetchData: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/api/countries')
      set({
        data: response.data.data,
        isLoading: false,
        allCountries: response.data.data,
      })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
  fetchCountry: async (id) => {
    try {
      set({ isLoading: true })
      const response = await axios.get(`/api/countries/${id}`)
      set({ country: response.data.data })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  searchFetch: async (search) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`/api/countries?name=${search}`)
      set({ data: response.data.data, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
  sortedByContinent: async (continent) => {
    set({ isLoading: true, error: null })
    const allCountries = get().allCountries
    const continentFiltered =
      continent === 'All'
        ? allCountries
        : allCountries.filter((country) => country.continent === continent)
    set({ isLoading: false, error: null, data: continentFiltered })
  },
  getActivities: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get('/api/activities')
      set({ isLoading: false, activities: response.data.data })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  postActivity: async (activity) => {
    set({ isLoading: true })
    try {
      await axios.post('/api/activities', activity)
      set({ isLoading: false })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  sortedByActivity: async (activity) => {
    set({ isLoading: true, error: null })
    const allCountries = get().allCountries
    const allActivities = allCountries.filter(
      (country) => country.activities.length > 0
    )
    const activityFiltered =
      activity === 'All Activities'
        ? allActivities
        : allCountries.filter((country) =>
            country.activities.find((act) => act.name === activity)
          )
    set({ isLoading: false, error: null, data: activityFiltered })
  },
}))

export default countriesStore
