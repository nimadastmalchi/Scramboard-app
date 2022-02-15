// This file holds all necessary procedures for initializing 
// the firebase database if it is empty

function validatePixels(pixelsRef, numRows, numCols) {
  pixelsRef.get().then((data) => {
    val = data.val();
    console.log("Value of pixels: " + val);
    if (val === null) {
      const pixels = Array.from(Array(numRows), () => Array(numCols).fill('#ffffff'));
      for (let i = 0; i < numRows; ++i) {
        for (let j = 0; j < numCols; ++j) {
          pixels[i][j] = "#fff";
        }
      }
      pixelsRef.set({
        num_rows: numRows,
        num_cols: numCols,
        array: pixels,
      });
    }
  });
}

module.exports = { validatePixels }