const axios = require('axios')
const { Country } = require('../db')

const regularName = (str) => {
  return str.normalize('NFC').replace(/[\u0300-\u036fÅ]/g, '')
}

const loadDB = async () => {
  const full = await Country.count()
  if (!full) {
    const api = await axios.get('https://restcountries.com/v3/all')
    const data = api.data.map((elem) => {
      return {
        id: elem.cca3,
        name: regularName(elem.name.common),
        flag: elem.flags[1],
        continent: elem.continents[0],
        subregion: elem.subregion,
        capital: elem.capital ? elem.capital[0] : 'No tiene capital',
        population: elem.population,
        area: elem.area,
        borders: elem.borders,
      }
    })
    await Country.bulkCreate(data)
    console.log('Se ingresaron todos los paises')
  } else {
    console.log('La base de dato esta cargada')
  }
}
module.exports = loadDB
