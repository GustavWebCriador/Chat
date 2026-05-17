const db = require('./src/database/db')

db.query('SELECT NOW()')
  .then(res => console.log(res.rows))
  .catch(err => console.log(err))