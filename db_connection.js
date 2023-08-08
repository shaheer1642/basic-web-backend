const DB = require('pg');

const db = new DB.Client({
    connectionString: process.env.DATABASE_URL,
})

db.connect().then(async res => {
    console.log('DB connected')
}).catch(err => {
    console.log('DB Connection failure.\n' + err)
    process.exit()
});

db.on('error', err => {
    console.log('DB error', err)
})

module.exports = { db };