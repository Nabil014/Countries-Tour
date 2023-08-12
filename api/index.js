const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const loadDB = require('./src/DBload/DBload.js')

conn.sync({ force: false }).then(async () => {
  try {
    await loadDB()
    server.listen(process.env.DB_PORT, () => {
      console.log(`Listening on port ${process.env.DB_PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
})

function keepBackendActive() {
  console.log('Keeping the backend active...')

  setInterval(() => {
    console.log('Keeping the backend active...')
  }, 600000)
}

keepBackendActive()
