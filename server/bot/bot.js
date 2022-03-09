const fs = require('fs')

function run(db) {
  let data = null;
  try {
    data = fs.readFileSync('bot/PixelArrayData.txt', 'utf8');
  }
  catch (err) {
    console.log(err);
    return;
  }
  const board = data.split('\n').map((row) => {
    return row.split(' ');
  });
  if (board.length != 50 && board[0].length != 50) {
    console.log('Invalid PixelArrayData.txt file');
    process.exit;
  }
  const pixels = Array.from(Array(50), () => Array(50).fill('#ffffff'));
  const clicks = new Array();
  var timeInc = 864000;
  let numClicks = 0;
  for (let i = 0; i < 50; ++i) {
    for (let j = 0; j < 50; ++j) {
      if (Number('0x' + board[i][j].slice(1)) > Number('0xcccccc')) {
        continue;
      }
      ++numClicks;
    }
  }
  var curEpochTime = Date.now() - timeInc*numClicks;
  for (let i = 0; i < 50; ++i) {
    for (let j = 0; j < 50; ++j) {
      if (Number('0x' + board[i][j].slice(1)) > Number('0xcccccc')) {
        continue;
      }
      pixels[i][j] = board[i][j];
      clicks.push({
        index: i + ',' + j,
        color: board[i][j],
        time: curEpochTime,
      });
      curEpochTime += timeInc;
    }
  }
  db.ref('pixels/array').set(pixels);
  db.ref('history/currentSize').set(clicks.length);
  db.ref('history/clicks').set(clicks);
  console.log('bot successfuly generated pixels');
}

module.exports = { run }