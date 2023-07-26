const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await Country.findByPk(id.toUpperCase(), {
      include: Activity,
    })
    if (!response) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Country not found', data: response })
    }
    res.json({ status: 'success', data: response })
  } catch (error) {
    next(error)
  }
}

const getCountry = async (req, res, next) => {
  const { name } = req.query
  try {
    if (!name) {
      const response = await Country.findAll({ include: Activity })
      return res.status(200).json({ status: 'success', data: response })
    }
    const response = await Country.findAll({
      include: Activity,
      where: {
        name: {
          [Op.iLike]: '%' + name + '%',
        },
      },
    })
    if (response.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Country not found', data: response })
    }
    res.status(200).json({ status: 'success', data: response })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getById,
  getCountry,
}
