import font from '@/ledFont';
import { convert2dArrayToColor } from '@/lib/General';
import { joinMatrixsHorizontally, pad2dArray, sendData } from '@/lib/Led';
import { useEffect, useState } from 'react';

function LEDMatrix({
  height = 8,
  width = 32,
  backgroundColor = '000000',
  drawColor = '2D59CD',
}) {
  const blankSlate = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );
  const [ledMatrix, setLedMatrix] = useState(blankSlate);
  const [textInput, setTextInput] = useState('');

  const handleClick = (x, y) => {
    const newMatrix = ledMatrix.map((row) => [...row]);
    if (newMatrix[y][x] === true) {
      newMatrix[y][x] = false;
    } else {
      newMatrix[y][x] = true;
    }
    setLedMatrix(newMatrix);
  };

  const handleTextInput = (event) => {
    const { value } = event.target;
    setTextInput(value);
    console.log(value);
  };

  useEffect(() => {
    //Calculate New Matrix Array baised off of text and custom font
    const inputSplitArray = textInput.split('');
    if (inputSplitArray.length < 1) {
      setLedMatrix(blankSlate);
      return;
    }
    const arrayOfFontValues = [];
    for (const character of inputSplitArray) {
      const characterArray = font[character];
      if (!characterArray) return;
      console.log(characterArray);
      arrayOfFontValues.push(characterArray);
    }
    console.log({ arrayOfFontValues });
    const joinedTextArrays = joinMatrixsHorizontally(arrayOfFontValues);

    const padded = pad2dArray(joinedTextArrays, width, height, 1);
    console.log({ joinedTextArrays });
    console.log({ padded });
    setLedMatrix(padded);
  }, [textInput]);

  // This Converts our true false values to our background and drawColor hex values and sends to WLED
  useEffect(() => {
    const convertedArray = convert2dArrayToColor(
      ledMatrix,
      backgroundColor,
      drawColor
    );

    sendData(convertedArray);
  }, [ledMatrix]);

  return (
    <>
      <div>
        {ledMatrix.map((row, y) => (
          <div key={`row ${y}`} id={y} className='flex'>
            {row.map((pixel, x) => {
              return (
                <div
                  key={`col ${x}`}
                  className={`w-6 h-6  border-white border-2`}
                  style={{
                    backgroundColor: `#${pixel ? drawColor : backgroundColor}`,
                  }}
                  onClick={() => handleClick(x, y)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <input
        className='bg-gray-200 py-2 px-4'
        onChange={handleTextInput}
        value={textInput}
      />
    </>
  );
}
export default LEDMatrix;
