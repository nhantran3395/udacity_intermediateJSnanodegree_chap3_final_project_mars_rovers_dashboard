require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const logger = require('./Logger/Logger');

const fetchRoverImagesFromEachSelectedCamera = require('./RoverImagesApiUtil/RoverImagesApiUtil');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/getRoverImages', async (req, res) => {
  const { rover, cameras } = req.body;
  let images = [];

  try {
    images = await fetchRoverImagesFromEachSelectedCamera(rover, cameras);
  } catch (error) {
    logger.error(error);
  }

  res.send(images);
});

app.listen(port, () =>
  logger.info(`NASA Mars Rovers API Server listening on port ${port}!`),
);