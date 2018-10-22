# memory-diff

[![build:?](https://travis-ci.org/js-shelf/memory-diff.svg?branch=master)](https://travis-ci.org/js-shelf/memory-diff) [![npm](https://img.shields.io/npm/v/memory-diff.svg)](https://www.npmjs.com/package/memory-diff) [![npm](https://img.shields.io/npm/dm/memory-diff.svg)](https://www.npmjs.com/package/memory-diff) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/memory-diff)

A simple object that enables recording heap memory that is consumed by some function/code and format the result.

## Install
```
npm install --save memory-diff
```

## Usage

### Creation
```js
const memoryDiffFn = require('memory-diff');
const memoryDiff = memoryDiffFn('test-function');
```

### .start()
starts recording heap memory size.

```js
memoryDiff.start();
```

### .stop()
stops recording heap memory size.

```js
memoryDiff.stop();
```

### .megabytes()
return the MB part in the recorded memory

```js
console.log(memoryDiff.megabytes()); // 3
```

### .kilobytes()
return the KB part in the recorded memory

```js
console.log(memoryDiff.kilobytes()); // 7
```

### .bytes()
return the Bytes part in the recorded memory

```js
console.log(memoryDiff.bytes()); // 588
```

### .isRunning()
checks if the memoryDiff is running and hasn't been stopped

```js
console.log(memoryDiff.isRunning()); // false
```

### .isStopped()
checks if the memoryDiff has been stopped

```js
console.log(memoryDiff.isStopped()); // true
```

### .format(template)
formats the recorded memory using a custom or default template. The function replaces the memory size fractions placeholders in a string. Placeholders are:

* `%label` for the memoryDiff label.
* `%mb` for Megabytes.
* `%kb` for Kilobytes.
* `%b` for Bytes.

```js
// using the default template
console.log(memoryDiff.format()); // memory-test: 3 MB, 7 KB, 588 bytes

// using a custom template
const custom = '%label [%mb MB - %kb KB - %b B ]';
console.log(memoryDiff.format(custom)); // memory-test [3 MB - 7 KB - 588 B ]
```

### .clear()
clears the memoryDiff values. Can be started again to record new values.

```js
memoryDiff.clear();
console.log(memoryDiff.megabytes()); // null
```

### Example
```js
const test = () => {
  memoryDiff.start();
  const arr = Array(1000000).fill('test');
  memoryDiff.stop();
};
test();
console.log(memoryDiff.format()); // 'test: 8 MB, 115 KB, 56 bytes'
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/js-shelf/memory-diff/blob/master/LICENSE)
