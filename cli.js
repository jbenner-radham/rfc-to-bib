#!/usr/bin/env node
'use strict';

const app = require('./lib');

const FAILURE = 1;

if (!process.argv[2]) {
    console.error('Please provide an RFC number as an argument.');
    process.exit(FAILURE);
}

let rfc = process.argv[2];

app(rfc);
