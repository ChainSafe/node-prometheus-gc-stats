import assert from 'node:assert';
import { describe, it } from 'node:test';
import prometheus from 'prom-client';
import { gcStats } from '../src/index.js';

describe('sanity tests', () => {
  it('should generate metrics data', async function () {
    const collectionInterval = 2000;
    const close = gcStats(prometheus.register, { collectionInterval });

    let x = {};
    for (let i = 0; i < 100000; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/restrict-plus-operands
      x = { ['foo' + i]: i };
    }
    await new Promise((r) => setTimeout(r, 4000));
    close();

    const metricsStr = await prometheus.register.metrics();
    assert.match(
      metricsStr,
      /Scavenge/,
      'Expected the metrics string to contain Scavenge data',
    );
  });
});
