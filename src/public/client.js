class Camera {
  constructor(name, fullName) {
    this.name = name;
    this.fullName = fullName;
  }
}

class Rover {
  constructor(name, landingDate, launchDate, status, cameras) {
    this.name = name;
    this.landingDate = landingDate;
    this.launchDate = launchDate;
    this.status = status;
    this.cameras = cameras;
  }
}

const ROVER_STATUS = {
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

const FHAZ = new Camera('FHAZ', 'Front Hazard Avoidance Camera');
const RHAZ = new Camera('RHAZ', 'Rear Hazard Avoidance Camera');
const MAST = new Camera('MAST', 'Mast Camera');
const CHEMCAM = new Camera('CHEMCAM', 'Chemistry and Camera Complex');
const MAHLI = new Camera('MAHLI', 'Mars Hand Lens Imager');
const MARDI = new Camera('MARDI', 'Mars Descent Imager');
const NAVCAM = new Camera('NAVCAM', 'Navigation Camera');
const PANCAM = new Camera('PANCAM', 'Panoramic Camera');
const MINITES = new Camera(
  'MINITES',
  'Minitature Thermal Emission Spectrometer (Mini-TES)',
);

const CURIOSITY_CAMERAS = [FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM];
const OPPORTUNITY_CAMERAS = [FHAZ, RHAZ, NAVCAM, PANCAM, MINITES];
const SPIRIT_CAMERAS = [FHAZ, RHAZ, NAVCAM, PANCAM, MINITES];

const CURIOSITY = new Rover(
  'Curiosity',
  '2012-08-06',
  '2011-11-26',
  ROVER_STATUS.ACTIVE,
  CURIOSITY_CAMERAS,
);

const OPPORTUNITY = new Rover(
  'Opportunity',
  '2004-01-25',
  '2003-07-07',
  ROVER_STATUS.COMPLETE,
  OPPORTUNITY_CAMERAS,
);

const SPIRIT = new Rover(
  'Spirit',
  '2004-01-04',
  '2003-06-10',
  ROVER_STATUS.COMPLETE,
  SPIRIT_CAMERAS,
);

const store = {
  rover: CURIOSITY.name,
  cameras: CURIOSITY.cameras.map((camera) => camera.name),
  images: null,
};

const imgContainer = document.getElementById('img-container');

const splitImagesToGroups = (images) => {
  const images1 = [];
  const images2 = [];
  const images3 = [];

  images.forEach((image, idx) => {
    if (idx % 3 === 0) {
      images1.push(image);
    }

    if (idx % 3 === 1) {
      images2.push(image);
    }

    if (idx % 3 === 2) {
      images3.push(image);
    }
  });

  return [images1, images2, images3];
};

const displaySpinners = () => `
  <div class="mx-auto d-flex align-items-center justify-content-center">
    <div class="spinner-grow text-primary m-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow text-primary m-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow text-primary m-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`;

const displayImageNotFound = () => `
  <div class="mx-auto d-flex align-items-center justify-content-center flex-column">
    <img src="./Assets/img/moon-rover.svg" class="img-thumbnail mb-5" alt="uh oh image not found" style="width:200px">
    <span class="text-light">Uh oh the images cannot be found.</span> <br>
    <span class="text-light">Please try again with different camaras or different rover.</span>
  </div>
`;

const displayServerError = () => `
  <div class="mx-auto d-flex align-items-center justify-content-center flex-column">
    <img src="./Assets/img/server-error.svg" class="img-thumbnail mb-5" alt="uh oh server error" style="width:200px">
    <span class="text-light">Uh oh look like there is something wrong with our server.</span> <br>
    <span class="text-light">Please try again later.</span>
  </div>
`;

const putImagesOntoEachCol = (images) => {
  let imgs = '';

  images.forEach((image) => {
    imgs += `
    <div class="img-box mb-4">
      <img
        src=${image.img_src}
        class="w-100 shadow-1-strong rounded"
        alt=""
      />
      <div class="overlay d-flex flex-column align-items-center justify-content-center">
        <span class="text-light">Photo taken on ${image.earth_date}</span> 
        <span class="text-light">Camera: ${image.camera.name}</span>
      </div>
    </div>
    `;
  });

  return imgs;
};

const displayImages = (imagesAfterSplit) => `
  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
  ${putImagesOntoEachCol(imagesAfterSplit[0])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
  ${putImagesOntoEachCol(imagesAfterSplit[1])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
  ${putImagesOntoEachCol(imagesAfterSplit[2])}
  </div>
`;

const Gallery = (state) => {
  const { images } = state;

  if (images instanceof Error) {
    return displayServerError();
  }

  const isGalleryLoading = images === null;
  const isImageNotFound = !isGalleryLoading ? images.length === 0 : null;

  if (isGalleryLoading) {
    return displaySpinners();
  }

  if (isImageNotFound) {
    return displayImageNotFound();
  }

  const imagesAfterSplit = splitImagesToGroups(images);

  return displayImages(imagesAfterSplit);
};

const cameraSelectionContainer = document.getElementById(
  'camera-selection-container',
);

const isCameraSelectedPreviously = (state, currentCamera) => {
  const { cameras } = state;

  return cameras.includes(currentCamera.name);
};

const displaySelections = (rover) => {
  let selections = '';

  let roverCameras = null;

  switch (rover) {
    case CURIOSITY.name:
      roverCameras = CURIOSITY_CAMERAS;
      break;

    case OPPORTUNITY.name:
      roverCameras = OPPORTUNITY_CAMERAS;
      break;

    case SPIRIT.name:
      roverCameras = SPIRIT_CAMERAS;
      break;

    default:
      throw new Error('Rover is not valid');
  }

  roverCameras.forEach((camera, idx) => {
    selections += `
    <div class="form-check mb-3" id="check-${idx}-form-select-cameras">
      <input
        class="form-check-input"
        type="checkbox"
        name=${camera.name}
        ${isCameraSelectedPreviously(store, camera) ? 'checked' : ''}
      />
      <label class="form-check-label text-light" for="defaultCheck1">
        ${camera.name} (${camera.fullName})
      </label>
    </div>
  `;
  });

  selections += `
  <div class="invalid-feedback">
  Please select at least 1 camera to continue
  </div>
  `;

  return selections;
};

const CameraSelections = (state) => {
  const { rover } = state;
  return displaySelections(rover);
};

const render = async (imgContainer, state) => {
  imgContainer.innerHTML = Gallery(state);
  cameraSelectionContainer.innerHTML = CameraSelections(state);
};

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(imgContainer, store);
};

const getRoverImages = (rover, cameras) => {
  const url = new URL('http://localhost:3000/getRoverImages');
  const query = new URLSearchParams();

  query.append('rover', rover);
  cameras.forEach((camera) => query.append('cameras', camera));
  url.search = query.toString();

  fetch(url)
    .then((res) => res.json())
    .then((images) => {
      updateStore(store, { images });
    })
    .catch((error) => {
      updateStore(store, { images: new Error() });
    });
};

window.addEventListener('load', () => {
  render(imgContainer, store);
  getRoverImages(store.rover, store.cameras);
});

const formSelectCameras = document.forms['form-select-cameras'];

const isObjectEmptyUtil = (obj) => {
  for (var i in obj) return false;
  return true;
};

const isCameraSelectionsValid = (selection) => {
  const firstCheck1FormSelectCameras = document.getElementById(
    'check-1-form-select-cameras',
  );

  if (isObjectEmptyUtil(selection)) {
    firstCheck1FormSelectCameras.classList.add('is-invalid');
    return false;
  }

  firstCheck1FormSelectCameras.classList.remove('is-invalid');
  return true;
};

formSelectCameras.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);

  if (!isCameraSelectionsValid(data)) return;

  const cameras = Object.keys(data);

  updateStore(store, { images: null, cameras });
  getRoverImages(store.rover, store.cameras);
});

const roverSelectButtons = document.querySelectorAll(
  '#accordion-button-select-rover',
);

roverSelectButtons.forEach((button) =>
  button.addEventListener('click', (event) => {
    const roverSelection = event.target.value;

    switch (roverSelection) {
      case CURIOSITY.name.toLowerCase():
        updateStore(store, {
          rover: CURIOSITY.name,
          cameras: CURIOSITY.cameras.map((camera) => camera.name),
          images: null,
        });
        getRoverImages(store.rover, store.cameras);
        break;

      case OPPORTUNITY.name.toLowerCase():
        updateStore(store, {
          rover: OPPORTUNITY.name,
          cameras: OPPORTUNITY.cameras.map((camera) => camera.name),
          images: null,
        });
        getRoverImages(store.rover, store.cameras);
        break;

      case SPIRIT.name.toLowerCase():
        updateStore(store, {
          rover: SPIRIT.name,
          cameras: SPIRIT.cameras.map((camera) => camera.name),
          images: null,
        });
        getRoverImages(store.rover, store.cameras);
        break;

      default:
        throw new Error('Rover is not valid');
    }
  }),
);
