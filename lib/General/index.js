const convert2dArrayToColor = (matrixArray, backgroundColor, drawColor) =>
  matrixArray.map((row) =>
    row.map((value) => (value ? drawColor : backgroundColor))
  );

export { convert2dArrayToColor };
