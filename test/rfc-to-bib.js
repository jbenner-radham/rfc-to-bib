'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const fs = require('fs');
const rfcToBib = require('../lib');
const path = require('path');

chai.use(chaiAsPromised);

describe('rfc-to-bib', function () {
    this.timeout(5000);

    beforeEach(function () {
        let file = path.join(__dirname, 'fixtures/rfc2616.bib');

        this.fixtures = {
            rfc2616: fs.readFileSync(file, {encoding: 'utf8'})
        }
    });

    it('should be a function', function () {
        expect(rfcToBib).to.be.a('function');
    });

    it('should return a promise', function () {
        expect(rfcToBib(2616)).to.be.a('promise');
    });

    it('should return a rejected promise if not provided an argument', function (done) {
        expect(rfcToBib()).to.be.rejectedWith(TypeError).and.notify(done);
    });

    it('should return a rejected promise if provided a non-integer argument', function (done) {
        expect(rfcToBib('2616')).to.be.rejectedWith(TypeError).and.notify(done);
    });

    it('should return a BibTeX for RFC 2616', function (done) {
        expect(rfcToBib(2616)).to.eventually.equal(this.fixtures.rfc2616).and.notify(done);
    });
});
