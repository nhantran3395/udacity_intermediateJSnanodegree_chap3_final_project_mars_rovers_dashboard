require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/getRoverImages', async (req, res) => {
  const { rover, cameras } = req.body;

  try {
    const images = await Promise.allSettled(
      cameras.map((camera) =>
        fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?camera=${camera}&api_key=${process.env.API_KEY_NASA_OPEN_APIS}`,
        ),
      ),
    )
      .then((results) =>
        Promise.allSettled(results.map((result) => result.value.json())),
      )
      .then((results) =>
        results.map((result) => result.value.latest_photos).flat(),
      );

    res.send(images);
  } catch (err) {
    console.log('error:', err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
