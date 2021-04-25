const isCameraSelectedPreviously = (state, currentCamera) => {
  const cameras = state.get('cameras');
  return cameras.includes(currentCamera.get('name'));
};

const displaySelections = (rover) => {
  let selections = '';

  let roverCameras = null;

  switch (rover) {
    case CURIOSITY.get('name'):
      roverCameras = CURIOSITY_CAMERAS;
      break;

    case OPPORTUNITY.get('name'):
      roverCameras = OPPORTUNITY_CAMERAS;
      break;

    case SPIRIT.get('name'):
      roverCameras = SPIRIT_CAMERAS;
      break;

    default:
      throw new Error('Rover is not valid');
  }

  roverCameras.forEach((camera, idx) => {
    const name = camera.get('name');
    const fullName = camera.get('fullName');
    const selected = isCameraSelectedPreviously(store, camera) ? 'checked' : '';

    selections += `
      <div class="form-check mb-3" id="check-${idx}-form-select-cameras">
        <input
          class="form-check-input"
          type="checkbox"
          name=${name}
          ${selected}
        />
        <label class="form-check-label text-light" for="defaultCheck1">
          ${name} (${fullName})
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
  const rover = state.get('rover');
  return displaySelections(rover);
};
