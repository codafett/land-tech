#!/usr/bin/env node

import argsUtils from './utils/argsUtils/argsUtils';

const cliOptions = argsUtils.extractOptions(process.argv);

console.log(cliOptions);
