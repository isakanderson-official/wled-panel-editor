import { useEffect, useState } from 'react';

function FontDesigner({
  height = 6,
  width = 4,
  backgroundColor = '000000',
  drawColor = '2D59CD',
  maxHeight = 8,
  maxWidth = 30,
}) {
  const [editorWidth, setEditorWidth] = useState(width);
  const [editorHeight, setEditorHeight] = useState(height);
  const [canvas, setCanvas] = useState([]);
  const [fontArray, setFontArray] = useState('');

  const handleCanvasSizeChange = (event, maxHeight, maxWidth) => {
    const { value, name } = event.target;
    switch (name) {
      case 'editorHeight':
        if (value > maxHeight) {
          console.error('Max Height Reached');
          return;
        }
        setEditorHeight(value);
        break;
      case 'editorWidth':
        if (value > maxWidth) {
          console.error('Max Width Reached');
          return;
        }
        setEditorWidth(value);
        break;

      default:
        break;
    }
  };

  const setBlankSlate = () => {
    const blankSlate = Array.from({ length: editorHeight }, () =>
      Array.from({ length: editorWidth }, () => false)
    );
    setCanvas(blankSlate);
  };

  const handleClick = (x, y) => {
    const newMatrix = canvas.map((row) => [...row]);
    if (newMatrix[y][x] === true) {
      newMatrix[y][x] = false;
    } else {
      newMatrix[y][x] = true;
    }
    setCanvas(newMatrix);
  };

  const handleGenerateClick = () => {
    'FONT MATRIX', canvas;
    setFontArray(JSON.stringify(canvas));
  };
  const handleClearClick = () => {
    'FONT MATRIX', canvas;
    setBlankSlate();
    setFontArray('');
  };

  useEffect(() => {
    setBlankSlate();
  }, []);

  useEffect(() => {
    setBlankSlate();
  }, [editorHeight, editorWidth]);

  return (
    <div className='flex flex-col gap-2 text-base'>
      <label>Canvas Width</label>
      <input
        name='editorWidth'
        className='border-2 broder-gray-200 w-32'
        value={editorWidth}
        onChange={(e) => handleCanvasSizeChange(e, maxHeight, maxWidth)}
        type='number'
      />
      <label>Canvas Height</label>
      <input
        name='editorHeight'
        className='border-2 broder-gray-200 w-32'
        value={editorHeight}
        onChange={(e) => handleCanvasSizeChange(e, maxHeight, maxWidth)}
        type='number'
      />
      {/* GRID */}
      <div>
        {canvas.map((row, y) => (
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
