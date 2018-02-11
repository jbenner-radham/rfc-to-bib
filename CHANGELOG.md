Changelog
=========
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[Unreleased]
------------
### Fixed
- Fix for RFC numbers which are less than 4-digits long returning a 404 error. _([Issue #3](https://github.com/jbenner-radham/rfc-to-bib/issues/3))_
- Fix for earlier RFCs which displayed their pages as "[page %d]" instead of "[Page %d]".
- Fix for RFC titles which have unescaped octothorpes. _([Issue #4](https://github.com/jbenner-radham/rfc-to-bib/issues/4))_

[0.2.1] - 2017-06-11
--------------------
### Added
- Expanded JSDoc comments.

### Changed
- Added descriptions for flags in the CLI "help" output.
- Increased test timeout to 60 seconds.
- Updated npm dependencies.

### Fixed
- Fix for incorrect RFC number being reported in BibTeX for some RFCs.

[0.2.0] - 2017-04-30
--------------------
### Added
- Can be used as a library as well as a CLI tool now.
- Added ESLint linting.
- Added CLI flags for `--help` and `--version`.
- Expanded code coverage.
- Added UNIX manpages.

### Changed
- Architectural refactor.
- Updated npm dependencies.
- Changed over from `npm-shrinkwrap.json` to `yarn.lock` for the project lock file.
- Updated the `CHANGELOG.md` to [Keep a Changelog](http://keepachangelog.com/) v3 format.
- Enhanced CLI error handling.
- Invoking the CLI app without an argument now displays the "help" message.
- Now requires Node v6+.

[0.1.3] - 2017-04-27
--------------------
### Changed
- Updated npm dependencies.

### Fixed
- Fix for BibTeX template file not being found.

[0.1.2] - 2016-03-14
--------------------
### Added
- Added 'should parse "176" from "[Page 176]"' test.
- Added missing change log info for the last release.

[0.1.1] - 2016-03-14
--------------------
### Changed
- Updated the `README.md` install instructions.

0.1.0 - 2016-03-14
------------------
### Added
- Initial release.

[Unreleased]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.2.1...HEAD
[0.2.1]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.1.3...0.2.0
[0.1.3]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/jbenner-radham/rfc-to-bib/compare/0.1.0...0.1.1
