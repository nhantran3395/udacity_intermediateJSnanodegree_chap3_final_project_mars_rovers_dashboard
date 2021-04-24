// Set up global store with Curiosity as default rover, all cameras of Curiosity as default camera selections
const store = {
  rover: CURIOSITY.name,
  cameras: CURIOSITY.cameras.map((camera) => camera.name),
  images: null,
};

const imgContainer = document.getElementById('img-container');

const cameraSelectionContainer = document.getElementById(
  'camera-selection-container',
);

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
