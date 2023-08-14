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
  setInterval(function () {
    // Hacer una solicitud a una página o endpoint de tu sitio
    // Esto podría ser un archivo HTML, una API o cualquier recurso
    fetch('https://countries-tour-backend.onrender.com/api/countries')
  }, 600000)
}

keepBackendActive()
