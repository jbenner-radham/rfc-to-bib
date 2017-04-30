rfc-to-bib
==========
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

A library and CLI tool to generate [BibTeX](http://www.bibtex.org/) records for [IETF](https://www.ietf.org/) RFCs.

Install
-------

### CLI
```sh
$ npm install --global rfc-to-bib # Or alternately: `yarn global add rfc-to-bib`
```

### API
```sh
$ npm install --save rfc-to-bib # Or alternately: `yarn add rfc-to-bib`
```

Usage
-----

### CLI
```sh
$ rfc-to-bib --help

  A CLI tool to generate BibTeX records of IETF RFCs.

  Usage
      $ rfc-to-bib <rfc>

  Options
      --help, -h
      --version, -v

  Examples
      $ rfc-to-bib 2616
      $ rfc-to-bib 2616 > rfc2616.bib
```

### API
```js
const rfcToBib = require('rfc-to-bib');

let rfc = 2616;

rfcToBib(rfc).then(bib => {
    console.log(bib);
}).catch(error => {
    console.error(error.message);
});
```

Testing
-------
```sh
$ npm test # Or alternately: `yarn test`
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/travis/jbenner-radham/rfc-to-bib.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/jbenner-radham/rfc-to-bib
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/jbenner-radham/rfc-to-bib/blob/master/LICENSE
[NPM PAGE]: https://www.npmjs.com/package/rfc-to-bib
[NPM VERSION BADGE]: https://img.shields.io/npm/v/rfc-to-bib.svg?style=flat-square
