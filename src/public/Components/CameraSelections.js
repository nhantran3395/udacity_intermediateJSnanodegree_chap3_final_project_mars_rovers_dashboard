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
