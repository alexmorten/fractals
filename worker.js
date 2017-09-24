const global = this;

global.onmessage = function onMessageReceived(message) {
  const { data: { x, y, initialValue, threshold, maxIterations } } = message;
  const distance = distanceFromMandelbrotSet(x, y, initialValue, threshold, maxIterations);
  global.postMessage({ x, y, distance });
}

function distanceFromMandelbrotSet(x, y, initialValue, threshhold, maxIterations) {
  return x + y;
}
