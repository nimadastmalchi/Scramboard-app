const fs = require('fs')

function run(db) {
  let data = null;
  try {
    data = fs.readFileSync('bot/PixelArrayData.txt', 'utf8');
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  const board = data.split('\n').map((row) => {
    return row.split(' ');
  });
  if (board.length != 50 && board[0].length != 50) {
    console.log('Invalid PixelArrayData.txt file');
    process.exit;
  }
  db.ref('pixels/array').set(board);
  db.ref('history/currentSize').set(2500);
  const clicks = Array(2500);
  var timeInc = 864000;
  var curEpochTime = Date.now() - timeInc*2500;
  for (let i = 0; i < 50; ++i) {
    for (let j = 0; j < 50; ++j) {
      clicks[i*50 + j] = {
        index: i + ',' + j,
        color: board[i][j],
        time: curEpochTime,
      }
      curEpochTime += timeInc;
    }
  }
  db.ref('history/clicks').set(clicks);
  console.log('bot successfuly generated pixels');
}

module.exports = { run }