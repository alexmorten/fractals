import Complex from './Complex.js';

function calculatePixelDistances(width, height, initialValue = 0, threshold, maxIterations = 100, onPixelResult) {
  const onMessageHandler = onMessageReceived.bind(null, onPixelResult);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      console.log(`spawning worker for pixel (${x}, ${y})`);
      const worker = new Worker('./worker.js');
      worker.onmessage = onMessageHandler;
      worker.postMessage({ x, y, initialValue, threshold, maxIterations })
    }
  }
}

function onMessageReceived(onPixelResult, message) {
  const { data: { x, y, distance } } = message;
  console.log(`Worker result: (${x}, ${y}) = ${distance}`);
  onPixelResult({ x, y, distance });
}

export default calculatePixelDistances;
