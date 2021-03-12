'use strict';

const noop = () => {};

module.exports = {
    trace: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
    fatal: noop,
    silent: noop,
    child: noop,
    bindings: noop,
    flush: noop,
    level: 'none',
    isLevelEnabled: noop,
};
