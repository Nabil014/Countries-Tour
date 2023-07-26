const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 24,
        },
      },
      season: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['Summer', 'Autumn', 'Winter', 'Spring']],
        },
      },
    },
    {
      timestamps: false,
    }
  )
}
