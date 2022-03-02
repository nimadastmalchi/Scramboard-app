// This file holds all necessary procedures for initializing 
// the firebase database if it is empty

function validatePixels(pixelsRef, numRows, numCols) {
  pixelsRef.get().then((data) => {
    const val = data.val();
    console.log("Value of pixels: " + val);
    if (val == null) {
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

function validateHistory(historyRef) {
  historyRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log("history snapshot exists");
      const historyVal = snapshot.val();
      if (historyVal.currentSize != null && historyVal.clicks != null) {
        console.log("valid history snapshot");
        return;
      }
    }
    // at this point, historyRef is not valid.
    console.log("invalid hisotry snapshot");
    var myDate = new Date();
    var pstDate = myDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    historyRef.set({
      currentSize: 1,
      clicks: [["0,0", "#ffffff", pstDate]]
    });
  });
}

module.exports = { validatePixels, validateHistory }