const store = {
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  cameras: [],
  images: [],
};

const imgContainer = document.getElementById('img-container');

const render = async (imgContainer, state) => {
  imgContainer.innerHTML = Gallery(state);
};

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(imgContainer, store);
};

const splitImagesToGroups = (images) => {
  let images1 = [];
  let images2 = [];
  let images3 = [];

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

const displayImagesOnEachCol = (images) => {
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

const Gallery = (state) => {
  let { images } = state;

  const imagesAfterSplit = splitImagesToGroups(images);

  return `  
  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
    ${displayImagesOnEachCol(imagesAfterSplit[0])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
    ${displayImagesOnEachCol(imagesAfterSplit[1])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
    ${displayImagesOnEachCol(imagesAfterSplit[2])}
  </div>
  `;
};

const rover = 'curiosity';
const cameras = ['fhaz', 'rhaz'];

const url = new URL('http://localhost:3000/getRoverImages');

const query = new URLSearchParams();

query.append('rover', rover);
cameras.forEach((camera) => query.append('cameras', camera));

url.search = query.toString();

const getRoverImages = () => {
  fetch(url)
    .then((res) => res.json())
    .then((images) => {
      updateStore(store, { images });
      console.log(store);
    });
};

getRoverImages();
