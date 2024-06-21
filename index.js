const player = require("play-sound")(opts = {});

function getDurationInSeconds(input) {
  let splat = input.split(":").map(s => Number.parseInt(s));
  let seconds = 0;
  if (splat.length === 3) {
    seconds += splat.shift() * 60 * 60;
  }
  if (splat.length === 2) {
    seconds += splat.shift() * 60;
  }
  seconds += splat.shift();
  return seconds;
}

function dateDiff(d1, d2) {
  return d1.getTime() - d2.getTime();
}

function sleepAsync(durationMs) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, durationMs);
  })
}

function displayProgress(remainingDuration, step) {
  let stepStr = "-";
  if (step % 4 === 1) {
    stepStr = "\\";
  }
  if (step % 4 === 2) {
    stepStr = "|";
  }
  if (step % 4 === 3) {
    stepStr = "/";
  }
  process.stdout.write(`   ${stepStr} ${remainingDuration.toISOString().substr(11, 8)}    \r`);
}

async function timerAsync(durationS) {
  const start = new Date();
  let step = 0;
  const end = new Date(start.getTime() + durationS * 1000);

  while (new Date <= end) {
    await sleepAsync(500);
    displayProgress(new Date(dateDiff(end, new Date())), step++);
  }
}

async function runAsync() {
  const input = process.argv[2];
  const duration = getDurationInSeconds(input);
  await timerAsync(duration);
  console.log("                                     ");
  player.play("done.mp3");
}

runAsync().then();