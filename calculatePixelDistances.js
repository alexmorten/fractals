function calculatePixelDistances({ width, height, initialValue = 0, threshold, maxIterations = 100, onPixelResult }) {
  const numberOfWorkers = 4;
  const onMessageHandler = onMessageReceived.bind(null, onPixelResult);
  let x = 0;
  let y = 0;

  for (let i = 0; i < numberOfWorkers; i++) {
    // console.log(`spawning worker #${i}`);
    const worker = new Worker('./worker.js');
    worker.onmessage = onMessageHandler;
    schedulePixel(worker);
  }

  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     const worker = new Worker('./worker.js');
  //   }
  // }

  function onMessageReceived(onPixelResult, message) {
    const { data: { x, y, distance } } = message;
    // console.log(`Worker result: (${x}, ${y}) = ${distance}`);
    onPixelResult({ x, y, distance });
    schedulePixel(message.srcElement);
  }

  function schedulePixel(worker) {
    if (y == height) {
      worker.terminate();
      return;
    }

    // console.log(`scheduling pixel (${x}, ${y})`);
    worker.postMessage({ x, y, initialValue, threshold, maxIterations });
    x += 2;
    if (x === width) {
      x = 0;
      y += 2;
    }
  }
}

export default calculatePixelDistances;
