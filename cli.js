#!/usr/bin/env node
'use strict';

const rfcToBib = require('./lib');
const logError = require('./lib/log-error');

const EXIT_FAILURE = 1;
const RADIX = 10;

let rfc = Number.parseInt(process.argv[2], RADIX);

if (Number.isNaN(rfc)) {
    logError('Please provide an RFC number as an argument.');
    process.exit(EXIT_FAILURE);
}

rfcToBib(rfc).then(bib => {
    console.log(bib);
}).catch(error => {
    logError(error.message);
    process.exit(EXIT_FAILURE);
});
