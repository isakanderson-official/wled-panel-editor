import font from '@/ledFont';
import { convert2dArrayToColor } from '@/lib/General';
import { joinMatrixsHorizontally, pad2dArray, sendData } from '@/lib/Led';
import { useEffect, useState } from 'react';

function LEDMatrix({
  height = 8,
  width = 32,
  backgroundColor = '000000',
  initalDrawColor = 'ff1985',
}) {
  const blankSlate = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );
  const [drawColor, setDrawColor] = useState(initalDrawColor);
  const [ledMatrix, setLedMatrix] = useState(blankSlate);
  const [textInput, setTextInput] = useState('123456');
  const [colorInput, setColorInput] = useState(initalDrawColor);
  const [brightness, setBrightness] = useState(10);
  const [errors, setErrors] = useState({
    maxLength: '',
    brightness: '',
  });
  const [leftPadding, setLeftPadding] = useState(0);

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
    console.log(value);
    if (value.length < textInput.length) {
      setErrors((errors) => ({ ...errors, maxLength: '' }));
    } else if (errors.maxLength.length) {
      return;
    }
    setTextInput(value);
  };

  const handleBrightnessInput = (event) => {
    const { value } = event.target;
    console.log(value);

    if (value > 100) {
      setErrors((errors) => ({
        ...errors,
        brightness: 'Max Brightness Reached',
      }));
      return;
    }
    if (value.length < brightness.length) {
      setErrors((errors) => ({ ...errors, brightness: '' }));
    } else if (errors?.brightness?.length) {
      return;
    }
    setBrightness(value);
  };

  const handleColorInput = (event) => {
    const { value } = event.target;
    console.log(value);
    if (value.length < textInput.length) {
      setErrors((errors) => ({ ...errors, maxLength: '' }));
    } else if (errors.maxLength.length) {
      return;
    }
    setColorInput(value);
    if (value.length === 6) {
      setDrawColor(value);
    }
  };

  useEffect(() => {
    //Calculate New Matrix Array baised off of text and custom font
    const arrayOfFontValues = [];
    const inputSplitArray = textInput.split('');
    if (inputSplitArray.length < 1) {
      setLedMatrix(blankSlate);
      return;
    }
    for (const character of inputSplitArray) {
      let transformedChar =
        typeof character === 'number'
          ? Number(character)
          : String(character).toLowerCase();
      const characterArray = font[transformedChar];
      if (!characterArray) {
        console.error('That character is not found in the selected font');
        return;
        // throw new Error('That character is not found in the selected font');
      }
      characterArray;
      arrayOfFontValues.push(characterArray);
    }
    ({ arrayOfFontValues });
    const joinedTextArrays = joinMatrixsHorizontally(arrayOfFontValues);
    try {
      const padded = pad2dArray(
        joinedTextArrays,
        width,
        height,
        leftPadding + 1
      );
      ({ joinedTextArrays });
      ({ padded });
      setLedMatrix(padded);
    } catch (err) {
      console.error('No more space!');
      setErrors((errors) => ({ ...errors, maxLength: 'No more space!' }));
    }
  }, [textInput]);

  // This Converts our true false values to our background and drawColor hex values and sends to WLED
  useEffect(() => {
    const convertedArray = convert2dArrayToColor(
      ledMatrix,
      backgroundColor,
      drawColor
    );

    sendData(convertedArray, brightness);
  }, [ledMatrix, drawColor, brightness]);

  return (
    <div className='text-base'>
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
      <div className='flex gap-2'>
        <div>
          <p>Type Number Here</p>
          <input
            className='bg-gray-200 py-2 px-4'
            onChange={handleTextInput}
            value={textInput}
          />
        </div>
        <div>
          <p>Type Hex Color Code Here</p>
          <input
            className='bg-gray-200 py-2 px-4'
            onChange={handleColorInput}
            value={colorInput}
          />
        </div>
        <div>
          <p>Set Brightness (max 100%)</p>
          <input
            className='bg-gray-200 py-2 px-4'
            onChange={handleBrightnessInput}
            value={brightness}
            type='number'
          />
        </div>
      </div>
    </div>
  );
}
export default LEDMatrix;
