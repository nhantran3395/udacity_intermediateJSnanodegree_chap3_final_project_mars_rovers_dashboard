/**
 * @description Represents a camera
 * @constructor
 * @param {string} name - The short name of the camera
 * @param {string} fullName - The full name of the camera
 */
class Camera {
  constructor(name, fullName) {
    this.name = name;
    this.fullName = fullName;
  }
}

/**
 * @description Represents a rover
 * @constructor
 * @param {string} name - The name of the rover
 * @param {string} landingDate - The landing date of the rover on Mars
 * @param {string} lauchDate - The lauch date of the rover
 * @param {ROVER_STATUS} status - The rover 's current status
 * @param {Array<Camera>} cameras - The list of cameras that this rover can have
 */
class Rover {
  constructor(name, landingDate, launchDate, status, cameras) {
    this.name = name;
    this.landingDate = landingDate;
    this.launchDate = launchDate;
    this.status = status;
    this.cameras = cameras;
  }
}

/**
 * @enum Give possible status of a rover
 */
const ROVER_STATUS = {
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

/**
 * @constant FHAZ A camera variant
 */
const FHAZ = new Camera('FHAZ', 'Front Hazard Avoidance Camera');

/**
 * @constant RHAZ A camera variant
 */
const RHAZ = new Camera('RHAZ', 'Rear Hazard Avoidance Camera');

/**
 * @constant MAST A camera variant
 */
const MAST = new Camera('MAST', 'Mast Camera');

/**
 * @constant CHEMCAM A camera variant
 */
const CHEMCAM = new Camera('CHEMCAM', 'Chemistry and Camera Complex');

/**
 * @constant MAHLI A camera variant
 */
const MAHLI = new Camera('MAHLI', 'Mars Hand Lens Imager');

/**
 * @constant MARDI A camera variant
 */
const MARDI = new Camera('MARDI', 'Mars Descent Imager');

/**
 * @constant NAVCAM A camera variant
 */
const NAVCAM = new Camera('NAVCAM', 'Navigation Camera');

/**
 * @constant PANCAM A camera variant
 */
const PANCAM = new Camera('PANCAM', 'Panoramic Camera');

/**
 * @constant MINITES camera variant
 */
const MINITES = new Camera(
  'MINITES',
  'Minitature Thermal Emission Spectrometer (Mini-TES)',
);

/**
 * @constant CURIOSITY_CAMERAS List of all possible cameras that rover Curiosity can have
 */
const CURIOSITY_CAMERAS = [FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM];

/**
 * @constant OPPORTUNITY_CAMERAS List of all possible cameras that rover Opportunity can have
 */
const OPPORTUNITY_CAMERAS = [FHAZ, RHAZ, NAVCAM, PANCAM, MINITES];

/**
 * @constant SPIRIT_CAMERAS List of all possible cameras that rover Spirit can have
 */
const SPIRIT_CAMERAS = [FHAZ, RHAZ, NAVCAM, PANCAM, MINITES];

/**
 * @constant CURIOSITY Rover Curiosity
 */
const CURIOSITY = new Rover(
  'Curiosity',
  '2012-08-06',
  '2011-11-26',
  ROVER_STATUS.ACTIVE,
  CURIOSITY_CAMERAS,
);

/**
 * @constant OPPORTUNITY Rover Opportunity
 */
const OPPORTUNITY = new Rover(
  'Opportunity',
  '2004-01-25',
  '2003-07-07',
  ROVER_STATUS.COMPLETE,
  OPPORTUNITY_CAMERAS,
);

/**
 * @constant SPIRIT Rover Spirit
 */
const SPIRIT = new Rover(
  'Spirit',
  '2004-01-04',
  '2003-06-10',
  ROVER_STATUS.COMPLETE,
  SPIRIT_CAMERAS,
);
