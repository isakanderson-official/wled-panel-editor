const sendData = async (matrixArray) => {
  const combinedMatrix = matrixArray?.reduce((acc, val) => acc.concat(val), []);

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      on: true,
      bri: 9,
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
      console.log('row log', row);
    }
    result.push(row);
    console.log('results', result);
  }
  return result;
};

const pad2dArray = (arr, width, height, leftPad) => {
  console.log({ arr });
  if (!arr.length) return [];
  const padWidth = width - arr[0].length;
  const padHeight = height - arr.length;
  // Pad the right side of each row with false values
  const paddedArray = arr?.map((row) =>
    Array(leftPad)
      .fill(false)
      .concat(row, Array(padWidth - leftPad).fill(false))
  );

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