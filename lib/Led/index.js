const sendData = async (matrixArray, brightness = 10) => {
  const combinedMatrix = matrixArray?.reduce((acc, val) => acc.concat(val), []);

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      on: true,
      bri: brightness,
      seg: { id: 0, i: combinedMatrix },
    }),
  };

  fetch('http://192.168.3.135/json/state', options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

const joinMatrixsHorizontally = (arr = []) => {
  const space2dArray = [[false], [false], [false], [false], [false], [false]];

  for (let i = arr.length - 1; i >= 0; i--) {
    arr.splice(i + 1, 0, space2dArray);
  }

  let result = [];
  for (let i = 0; i < arr[0]?.length; i++) {
    let row = [];
    for (let j = 0; j < arr?.length; j++) {
      row = row.concat(arr[j][i]);
      'row log', row;
    }
    result.push(row);
    'results', result;
  }
  return result;
};

const pad2dArray = (arr, width, height, leftPad) => {
  ({ arr });
  if (!arr.length) return [];
  const padWidth = width - arr[0].length;
  const padHeight = height - arr.length;
  // Pad the right side of each row with false values
  const paddedArray = arr?.map((row) => {
    const remainingLength = padWidth - leftPad;

    if (remainingLength < 0) {
      // Throw max space taken error
      throw new Error('No more space on matrix');
    }

    console.log({ remainingLength });

    const finalArray = Array(leftPad)
      .fill(false)
      .concat(row, Array(padWidth - leftPad).fill(false));
    return finalArray;
  });

  // Pad the top and bottom of the array with arrays of false values
  const topPadding = Array(Math.floor(padHeight / 2)).fill(
    Array(width).fill(false)
  );
  const bottomPadding = Array(Math.ceil(padHeight / 2)).fill(
    Array(width).fill(false)
  );
  const fullyPaddedArray = topPadding.concat(paddedArray, bottomPadding);

  return fullyPaddedArray;
};

export { sendData, joinMatrixsHorizontally, pad2dArray };
