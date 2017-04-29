#!/usr/bin/env node
'use strict';

const rfcToBib = require('./lib');
const logError = require('./lib/log-error');
const meow = require('meow');

const EXIT_FAILURE = 1;
const RADIX = 10;

let rfc = Number.parseInt(process.argv[2], RADIX);

const cli = meow(`
    Usage
        $ rfc-to-bib <rfc>

    Options
        --help, -h
        --version, -v

    Examples
        $ rfc-to-bib 2616
        $ rfc-to-bib 2616 > rfc2616.bib
`, {
    alias: {
        h: 'help',
        v: 'version'
    }
});

if (Number.isNaN(rfc)) {
    cli.showHelp();
}

rfcToBib(rfc).then(bib => {
    console.log(bib);
}).catch(error => {
    logError(error.message);
    process.exit(EXIT_FAILURE);
});
