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

const splitImagesToGroupsUtil = (images) => {
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

const putImagesOntoEachColUtil = (images) => {
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
  ${putImagesOntoEachColUtil(imagesAfterSplit[0])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
  ${putImagesOntoEachColUtil(imagesAfterSplit[1])}
  </div>

  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
  ${putImagesOntoEachColUtil(imagesAfterSplit[2])}
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

  const imagesAfterSplit = splitImagesToGroupsUtil(images);

  return displayImages(imagesAfterSplit);
};
