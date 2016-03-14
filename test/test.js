'use strict';

let expect = require('chai').expect;

describe('getAuthorName', () => {
    let getAuthorName     = require('../src/lib/get-author-name');
    let getLastPageNumber = require('../src/lib/get-last-page-number');

    it('should return a string from of an array of authors', () => {
        let authors = [
            {fullname: 'J. Benner', initials: 'J.', organization: '', surname: 'Benner'},
            {fullname: 'T. Benner', initials: 'T.', organization: '', surname: 'Benner'},
            {fullname: 'A. Benner', initials: 'A.', organization: '', surname: 'Benner'}
        ];
        let control = 'J. Benner and T. Benner and A. Benner';

        expect(getAuthorName(authors)).to.equal(control);
    });

    it('should return a string from of an author object', () => {
        let author  = {fullname: 'J. Benner', initials: 'J.', organization: '', surname: 'Benner'};
        let control = 'J. Benner';

        expect(getAuthorName(author)).to.equal(control);
    });

    it('should parse "176" from "[Page 176]"', () => {
        let page = '[Page 176]';

        expect(getLastPageNumber(page)).to.equal(176);
    });
});
