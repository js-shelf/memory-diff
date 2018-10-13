const { expect } = require('chai');
const { stub } = require('sinon');
const memoryDiffFn = require('./index');

describe('memory-diff', () => {
  const memoryDiff = memoryDiffFn('memory-test');

  describe('.start()', () => {
    it('should start recording memory', () => {
      stub(process, 'memoryUsage').returns({ heapUsed: 5741048 });
      memoryDiff.start();
      expect(memoryDiff.isRunning()).to.equal(true);
      process.memoryUsage.restore();
    });

    it('should not start recording again if started', () => {
      memoryDiff.start();
      expect(memoryDiff.isRunning()).to.equal(true);
    });
  });

  describe('.stop()', () => {
    it('should stop memory recording', () => {
      stub(process, 'memoryUsage').returns({ heapUsed: 8894532 });
      memoryDiff.stop();
      expect(memoryDiff.isRunning()).to.equal(false);
      expect(memoryDiff.isStopped()).to.equal(true);
      process.memoryUsage.restore();
    });

    it('should do nothing if recording is stopped', () => {
      memoryDiff.stop();
      expect(memoryDiff.isRunning()).to.equal(false);
    });
  });

  describe('.megabytes()', () => {
    it('should get the mb part of memory', () => {
      expect(memoryDiff.megabytes()).to.equal(3);
    });

    it('should return null if recording is not stopped', () => {
      const nullDiff = memoryDiffFn('test-diff');
      expect(nullDiff.megabytes()).to.equal(null);
    });
  });

  describe('.kilobytes()', () => {
    it('should get the kb part of memory', () => {
      expect(memoryDiff.kilobytes()).to.equal(7);
    });

    it('should return null if recording is not stopped', () => {
      const nullDiff = memoryDiffFn('test-diff');
      expect(nullDiff.kilobytes()).to.equal(null);
    });
  });

  describe('.bytes()', () => {
    it('should get the bytes part of memory', () => {
      expect(memoryDiff.bytes()).to.equal(588);
    });

    it('should return null if recording is not stopped', () => {
      const nullDiff = memoryDiffFn('test-diff');
      expect(nullDiff.bytes()).to.equal(null);
    });
  });

  describe('.format()', () => {
    it('should format memory diff with default template', () => {
      expect(memoryDiff.format()).to.equal(
        'memory-test: 3 MB, 7 KB, 588 bytes'
      );
    });

    it('should format diff with a custom template', () => {
      expect(memoryDiff.format('%label [%mb MB - %kb KB - %b B ]'))
        .to.equal('memory-test [3 MB - 7 KB - 588 B ]');
    });

    it('should return null if recording is not stopped', () => {
      const nullDiff = memoryDiffFn('');
      expect(nullDiff.format()).to.equal(null);
    });
  });

  describe('.clear()', () => {
    it('should clear the recorder', () => {
      memoryDiff.clear();
      expect(memoryDiff.megabytes()).to.equal(null);
    });
  });
});
