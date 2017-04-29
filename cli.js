#!/usr/bin/env node
'use strict';

const rfcToBib = require('./lib');

const EXIT_FAILURE = 1;

if (!process.argv[2]) {
    console.error('Please provide an RFC number as an argument.');
    process.exit(EXIT_FAILURE);
}

let rfc = process.argv[2];

rfcToBib(rfc).then(bib => {
    console.log(bib);
}).catch(error => {
    console.error(error.message);
    process.exit(EXIT_FAILURE);
});
