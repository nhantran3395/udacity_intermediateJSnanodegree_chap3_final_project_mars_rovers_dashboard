const isCameraSelectedPreviously = (cameras, currentCamera) =>
  cameras.includes(currentCamera.get('name'));

const displaySelections = (rover, cameras) => {
  let selections = '';

  let roverPossibleCameras = null;

  switch (rover) {
    case CURIOSITY.get('name'):
      roverPossibleCameras = CURIOSITY_CAMERAS;
      break;

    case OPPORTUNITY.get('name'):
      roverPossibleCameras = OPPORTUNITY_CAMERAS;
      break;

    case SPIRIT.get('name'):
      roverPossibleCameras = SPIRIT_CAMERAS;
      break;

    default:
      throw new Error('Rover is not valid');
  }

  roverPossibleCameras.forEach((camera, idx) => {
    const name = camera.get('name');
    const fullName = camera.get('fullName');
    const selected = isCameraSelectedPreviously(cameras, camera)
      ? 'checked'
      : '';

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
  const cameras = state.get('cameras');

  return displaySelections(rover, cameras);
};
