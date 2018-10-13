module.exports = (label) => {
  const lbl = label || '';
  let running = false;
  let startMemory = null;
  let endMemory = null;

  const inpsectHeap = () => (
    process.memoryUsage().heapUsed
  );

  const start = () => {
    if (!running) {
      startMemory = inpsectHeap();
      running = true;
    }
  };

  const stop = () => {
    if (running) {
      endMemory = inpsectHeap();
      running = false;
    }
  };

  const clear = () => {
    startMemory = null;
    endMemory = null;
    running = false;
  };

  const isRunning = () => running;

  const isStopped = () => endMemory !== null;

  const diff = () => (endMemory - startMemory);

  const bytes = () => {
    if (endMemory !== null) {
      return diff() % 1024;
    }
    return null;
  };

  const kilobytes = () => {
    if (endMemory !== null) {
      return Math.floor(diff() / 1024) % 1024;
    }
    return null;
  };

  const megabytes = () => {
    if (endMemory !== null) {
      return Math.floor(diff() / (1024 * 1024));
    }
    return null;
  };

  const format = (f) => {
    if (endMemory !== null) {
      const template = f || '%label: %mb MB, %kb KB, %b bytes';
      return template
        .replace('%label', lbl)
        .replace('%mb', megabytes())
        .replace('%kb', kilobytes())
        .replace('%b', bytes());
    }
    return null;
  };

  return {
    start,
    stop,
    clear,
    isRunning,
    isStopped,
    bytes,
    kilobytes,
    megabytes,
    format
  };
};
