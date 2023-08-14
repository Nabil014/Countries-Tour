const { Router } = require('express')
const bodyParser = require('body-parser')
const { getById, getCountry } = require('../controllers/Country')
const { activityPost, getActivities } = require('../controllers/Activity')
const axios = require('axios')

const router = Router()

router.use(bodyParser.json())

function keepBackendActive() {
  setInterval(async function () {
    try {
      const response = await axios.get('http://localhost:3001/api/countries')
      console.log('Backend is active')
    } catch (error) {
      console.error(error)
    }
  }, 600000) // 600000 = 10 min
}

keepBackendActive()

router.get('/api/countries/:id', getById)
router.get('/api/countries', getCountry)

router.post('/api/activities', activityPost)
router.get('/api/activities', getActivities)

module.exports = router
