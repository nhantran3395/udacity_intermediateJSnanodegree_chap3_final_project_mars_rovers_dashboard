const fetchRoverImagesFromEachSelectedCamera = require('./RoverImagesApiUtil');

describe('test fetch rover image by each selected camera', () => {
  test('should throw error when called with invalid rover name', async () => {
    await expect(
      fetchRoverImagesFromEachSelectedCamera('', []),
    ).rejects.toThrow(Error);

    await expect(
      fetchRoverImagesFromEachSelectedCamera('', []),
    ).rejects.toThrow('rover name is invalid!');
  });

  test('should throw error when called with cameras that is not in list form', async () => {
    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', ''),
    ).rejects.toThrow(Error);

    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', ''),
    ).rejects.toThrow('cameras must be in list form');
  });

  test('should throw error when called with empty list of camera', async () => {
    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', []),
    ).rejects.toThrow(Error);

    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', []),
    ).rejects.toThrow('please select at least 1 camera');
  });

  test('should throw error when there is 1 or more camera that is not valid for rover', async () => {
    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', ['fhaz', 'pancam']),
    ).rejects.toThrow(Error);

    await expect(
      fetchRoverImagesFromEachSelectedCamera('curiosity', ['fhaz', 'pancam']),
    ).rejects.toThrow('1 or more cameras selected is not valid for rover');

    await expect(
      fetchRoverImagesFromEachSelectedCamera('spirit', [
        'fhaz',
        'rhaz',
        'mast',
      ]),
    ).rejects.toThrow('1 or more cameras selected is not valid for rover');
  });

  test('should return data when rover and cameras are correct', async () => {
    const images = await fetchRoverImagesFromEachSelectedCamera('spirit', [
      'fhaz',
      'rhaz',
    ]);

    expect(images).toBeInstanceOf(Array);
  });
});
