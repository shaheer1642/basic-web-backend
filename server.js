const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Adjust the allowed methods as needed
  optionsSuccessStatus: 204 // Return a 204 No Content status for preflight requests
}));

app.use(bodyParser.json());

app.use('/api', (req, res, next) => {
  console.log('[/api] called. host=', req.get('host'), 'origin=', req.get('origin'))
  next()
})

app.use('/api', require('./routes/students'))


app.get('/api/video/:identifier', async (req, res) => {
  console.log(`[/api/video/:identifier] called`, req.params.identifier)
  const identifier = req.params.identifier

  var videoId = ''
  if (identifier == 'some-random-identifier') videoId = 'u7GlR908Ob0'
  if (!videoId) return res.sendStatus(404)

  const videoInfo = await ytdl.getInfo(videoId);
  const video = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
  if (!video) return res.sendStatus(500)

  res.redirect(video.url)
});

const port = 3001 || process.env.port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
