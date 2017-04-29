rfc-to-bib
==========
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

A CLI tool to generate [BibTeX](http://www.bibtex.org/) records of IETF RFCs.

Install
-------
```sh
$ npm install -g rfc-to-bib
```

Usage
-----
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

Testing
-------
```sh
$ npm test
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
