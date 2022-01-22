const app = require('./src/app');

const APP_PORT = process.env.PORT || 4000;
const DB_PORT = process.env.DB_HOST

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`)
  console.log(`App is listening on port ${DB_PORT}`)
  console.log(`App is listening on port ${process.env}`)
})