# @chainsafe/prometheus-gc-stats

> Report Nodejs Garbage Collection stats using Prometheus

[![NPM Version][npm-image]][npm-url]

## Usage

This module has a peer dependency on [`prom-client`](https://github.com/siimon/prom-client). Currently, 10 is supported.

Collection of GC stats is automatically started when calling `gcStats` and is stopped when calling the returned function.

Example:

```ts
import prometheus from 'prom-client';
import { gcStats } from '@chainsafe/prometheus-gc-stats';

prometheus.collectDefaultMetrics();
const stopGcStats = gcStats(prometheus.register);

// eventually
stopGcStats()
```

### `node:v8`

The module doing the GC stats collecting is [`node:v8`](https://nodejs.org/api/v8.html). This module uses features that require Nodejs v18+.

## Metrics exposed

This module exposes 3 metrics:

1. `nodejs_gc_runs_total`: Counts the number of time GC is invoked
2. `nodejs_gc_pause_seconds_total`: Time spent in GC in seconds
3. `nodejs_gc_reclaimed_bytes_total`: The number of bytes GC has freed

You can add a prefix to metric names using options:

```js
const stopGcStats = gcStats(prometheus.register, {
  prefix: 'my_application_',
});
```

## Credits

Thanks to @tcolgate and @SimenB for the original implementation.

[npm-url]: https://npmjs.org/package/@chainsafe/prometheus-gc-stats
[npm-image]: https://img.shields.io/npm/v/@chainsafe/prometheus-gc-stats.svg
