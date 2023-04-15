import { useState } from 'react';

function FontDesigner({
  height = 6,
  width = 4,
  backgroundColor = '000000',
  drawColor = '2D59CD',
}) {
  const blankSlate = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );
  const [ledMatrix, setLedMatrix] = useState(blankSlate);
  const [fontArray, setFontArray] = useState('');

  const handleClick = (x, y) => {
    const newMatrix = ledMatrix.map((row) => [...row]);
    if (newMatrix[y][x] === true) {
      newMatrix[y][x] = false;
    } else {
      newMatrix[y][x] = true;
    }
    setLedMatrix(newMatrix);
  };

  const handleGenerateClick = () => {
    console.log('FONT MATRIX', ledMatrix);
    setFontArray(JSON.stringify(ledMatrix));
  };
  const handleClearClick = () => {
    console.log('FONT MATRIX', ledMatrix);
    setLedMatrix(blankSlate);
    setFontArray('');
  };

  return (
    <div className='flex'>
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
      <div className='flex flex-col'>
        <button
          className='bg-blue-200 p-3 rounded-md m-4'
          onClick={handleGenerateClick}
        >
          Generate
        </button>
        <button
          className='bg-blue-200 p-3 rounded-md m-4'
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
      <textarea
        readOnly
        rows={6}
        className={'font-normal text-sm w-60 text'}
        value={fontArray}
      />
    </div>
  );
}
export default FontDesigner;
