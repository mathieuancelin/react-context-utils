/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, no-console: 0 */

import * as Bootstrap from './bootstrap';

Bootstrap.setupEnv();

const tests = [
  require('./basic.spec.js'),
];
