const { Activity, Country } = require('../db')

const activityPost = async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body
  console.log(req.body)
  try {
    if (name || difficulty || duration || season || countries.length === 3) {
      const [activity, created] = await Activity.findOrCreate({
        where: {
          name,
          difficulty,
          duration,
          season,
        },
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      })
      await activity.setCountries(countries)
      return res.status(200).send({ status: 'success', data: activity })
    }
  } catch (error) {
    return res.status(400).send({ status: 'error', data: error })
  }
}

const getActivities = async (req, res) => {
  const activities = await Activity.findAll({ include: Country })
  try {
    res.status(200).send({ status: 'success', data: activities })
  } catch (error) {
    res.status(400).send({ status: 'error', data: error })
  }
}

module.exports = { activityPost, getActivities }
