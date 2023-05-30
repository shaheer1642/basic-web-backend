const express = require('express')
const app = express()
const port = 3001
const path = require('path');
const { db_users } = require('./db_module');
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

app.get('/api/getdata/:id', (req, res) => {
  console.log('id api called')
  console.log(req.params)
})
app.get('/api/getdata/:id/:username', (req, res) => {
  console.log('id, username api called')
  console.log(req.params)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})