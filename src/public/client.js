const store = {
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  cameras: [],
  images: [],
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

const putImagesOntoEachCol = (images) => {
  let imgs = '';

  images.forEach((image) => {
    imgs += `
        <img
        src=${image.img_src}
        class="w-100 shadow-1-strong rounded mb-4"
        alt=""
      />
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

  const isGalleryLoading = images.length === 0;

  if (isGalleryLoading) {
    return displaySpinners();
  }

  const imagesAfterSplit = splitImagesToGroups(images);

  return displayImages(imagesAfterSplit);
};

const render = async (imgContainer, state) => {
  imgContainer.innerHTML = Gallery(state);
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

  render(imgContainer, store);

  fetch(url)
    .then((res) => res.json())
    .then((images) => {
      updateStore(store, { images });
    });
};

window.addEventListener('load', () => {
  const rover = 'curiosity';

  const cameras = [
    'fhaz',
    'rhaz',
    'mast',
    'chemcam',
    'mahli',
    'mardi',
    'navcam',
  ];

  render(imgContainer, store);
  getRoverImages(rover, cameras);
});

const formSelectCameras = document.forms['form-select-cameras'];

formSelectCameras.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);

  const cameras = Object.keys(data);
  getRoverImages('curiosity', cameras);
});
