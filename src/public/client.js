// Set up global store with Curiosity as default rover, all cameras of Curiosity as default camera selections
let store = Immutable.Map({
  rover: CURIOSITY.get('name'),
  cameras: CURIOSITY.get('cameras').map((camera) => camera.get('name')),
  images: null,
});

const imgContainer = document.getElementById('img-container');

const cameraSelectionContainer = document.getElementById(
  'camera-selection-container',
);

const render = async (imgContainer, cameraSelectionContainer, state) => {
  imgContainer.innerHTML = Gallery(state);
  cameraSelectionContainer.innerHTML = CameraSelections(state);
};

const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(imgContainer, cameraSelectionContainer, store);
};

const getRoverImages = (rover, cameras) => {
  const url = new URL('http://localhost:3000/getRoverImages');
  const query = new URLSearchParams();

  query.append('rover', rover);

  cameras.forEach((camera) => query.append('cameras', camera));
  url.search = query.toString();

  fetch(url)
    .then((res) => res.json())
    .then((imagesRaw) => {
      const images = Immutable.List(
        imagesRaw.map((imageRaw) => Immutable.Map(imageRaw)),
      );
      updateStore(store, Immutable.Map({ images }));
    })
    .catch((error) => {
      updateStore(store, Immutable.Map({ images: error }));
    });
};

window.addEventListener('load', () => {
  render(imgContainer, cameraSelectionContainer, store);
  getRoverImages(store.get('rover'), store.get('cameras'));
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

  const cameras = Immutable.List(Object.keys(data));

  updateStore(store, Immutable.Map({ images: null, cameras }));
  getRoverImages(store.get('rover'), store.get('cameras'));
});

const roverSelectButtons = document.querySelectorAll(
  '#accordion-button-select-rover',
);

roverSelectButtons.forEach((button) =>
  button.addEventListener('click', (event) => {
    const roverSelection = event.target.value;

    switch (roverSelection) {
      case CURIOSITY.get('name').toLowerCase():
        updateStore(
          store,
          Immutable.Map({
            rover: CURIOSITY.get('name'),
            cameras: CURIOSITY.get('cameras').map((camera) =>
              camera.get('name'),
            ),
            images: null,
          }),
        );
        getRoverImages(store.get('rover'), store.get('cameras'));
        break;

      case OPPORTUNITY.get('name').toLowerCase():
        updateStore(
          store,
          Immutable.Map({
            rover: OPPORTUNITY.get('name'),
            cameras: OPPORTUNITY.get('cameras').map((camera) =>
              camera.get('name'),
            ),
            images: null,
          }),
        );
        getRoverImages(store.get('rover'), store.get('cameras'));
        break;

      case SPIRIT.get('name').toLowerCase():
        updateStore(
          store,
          Immutable.Map({
            rover: SPIRIT.get('name'),
            cameras: SPIRIT.get('cameras').map((camera) => camera.get('name')),
            images: null,
          }),
        );
        getRoverImages(store.get('rover'), store.get('cameras'));
        break;

      default:
        throw new Error('Rover is not valid');
    }
  }),
);
