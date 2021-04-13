const fetch = require('node-fetch');

const LIST_OF_POSSIBLE_ROVER = ['curiosity', 'opportunity', 'spirit'];

const LIST_OF_POSSIBLE_CAMERAS_FOR_CURIOSITY = [
  'fhaz',
  'rhaz',
  'mast',
  'chemcam',
  'mahli',
  'mardi',
  'navcam',
];

const LIST_OF_POSSIBLE_CAMERAS_FOR_OPPORTUNITY = [
  'fhaz',
  'rhaz',
  'navcam',
  'pancam',
  'minites',
];

const LIST_OF_POSSIBLE_CAMERAS_FOR_SPIRIT = [
  'fhaz',
  'rhaz',
  'navcam',
  'pancam',
  'minites',
];

const checkArrayIsSubsetUtil = (arrayToCheck, arrayTarget) =>
  arrayToCheck.every((val) => arrayTarget.includes(val));

const checkCamerasIsValidUtil = (cameras, listOfPossbileCameras) =>
  checkArrayIsSubsetUtil(cameras, listOfPossbileCameras);

const roverAndCamerasInputValidator = (rover, cameras) => {
  const roverLowerCased = rover.toLowerCase();

  if (!LIST_OF_POSSIBLE_ROVER.includes(roverLowerCased)) {
    throw new Error('rover name is invalid!');
  }

  if (!Array.isArray(cameras)) {
    throw new Error('cameras must be in list form');
  }

  if (cameras.length === 0) {
    throw new Error('please select at least 1 camera');
  }

  let isCamerasSupported = true;

  if (roverLowerCased === 'curiosity') {
    if (
      !checkCamerasIsValidUtil(cameras, LIST_OF_POSSIBLE_CAMERAS_FOR_CURIOSITY)
    ) {
      isCamerasSupported = false;
    }
  }

  if (roverLowerCased === 'opportunity') {
    if (
      !checkCamerasIsValidUtil(
        cameras,
        LIST_OF_POSSIBLE_CAMERAS_FOR_OPPORTUNITY,
      )
    ) {
      isCamerasSupported = false;
    }
  }

  if (roverLowerCased === 'spirit') {
    if (
      !checkCamerasIsValidUtil(cameras, LIST_OF_POSSIBLE_CAMERAS_FOR_SPIRIT)
    ) {
      isCamerasSupported = false;
    }
  }

  if (!isCamerasSupported) {
    throw new Error('1 or more cameras selected is not valid for rover');
  }
};

/**
 * @description Fetch latest photos of rovers by each camera
 * @param {String} rover - name of rover to fetch photo
 * @param {String[]} cameras - list of cameras to fetch photo
 * @returns {Object[]} - json data of photos
 */
const fetchRoverImagesFromEachSelectedCamera = async (rover, cameras) => {
  roverAndCamerasInputValidator(rover, cameras);

  let images = [];

  images = await Promise.allSettled(
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

  return images;
};

module.exports = fetchRoverImagesFromEachSelectedCamera;
