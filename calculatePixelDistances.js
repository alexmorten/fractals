function calculatePixelDistances({ width, height, initialValue = 0, threshold, maxIterations = 100, onPixelResult }) {
  const numberOfWorkers = 16;
  const onMessageHandler = onMessageReceived.bind(null, onPixelResult);
  let x = 0;
  let y = 0;

  for (let i = 0; i < numberOfWorkers; i++) {
    // console.log(`spawning worker #${i}`);
    const worker = new Worker('./worker.js');
    worker.onmessage = onMessageHandler;
    scheduleRow(worker);
  }

  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     const worker = new Worker('./worker.js');
  //   }
  // }

  function onMessageReceived(onPixelResult, message) {
    const { data: { solutions} } = message;
    // console.log(`Worker result: (${x}, ${y}) = ${distance}`);
    for (var i = 0; i < solutions.length; i++) {
    onPixelResult(solutions[i]);
    }
    scheduleRow(message.srcElement);
  }

  function schedulePixel(worker) {
    if (y >= height) {
      worker.terminate();
      return;
    }

    // console.log(`scheduling pixel (${x}, ${y})`);
    worker.postMessage({ x, y, initialValue, threshold, maxIterations });
    x += 1;
    if (x >= width) {
      x = 0;
      y += 1;
    }
  }
  function scheduleRow(worker){
    if (y >= height) {
      worker.terminate();
      return;
    }
    var points = [];
    while (x<width) {
      points.push({y:y,x:x});
      x += 1;
    }
    worker.postMessage({points:points,initialValue, threshold, maxIterations })

      x = 0;
      y += 1;

  }
}

export default calculatePixelDistances;
