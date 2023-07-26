const { Router } = require('express')
const bodyParser = require('body-parser')
const { getById, getCountry } = require('../controllers/Country')
const { activityPost, getActivities } = require('../controllers/Activity')

const router = Router()

router.use(bodyParser.json())

router.get('/api/countries/:id', getById)
router.get('/api/countries', getCountry)

router.post('/api/activities', activityPost)
router.get('/api/activities', getActivities)

module.exports = router
