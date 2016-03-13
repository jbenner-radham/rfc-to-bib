'use strict';

let expect = require('chai').expect;

describe('getAuthorName', () => {
    let getAuthorName = require('../src/lib/getAuthor');

    it('should return a string from of an array of authors', () => {
        let authors = [
            {fullname: 'J. Benner', initials: 'J.', organization: '', surname: 'Benner'},
            {fullname: 'T. Benner', initials: 'T.', organization: '', surname: 'Benner'},
            {fullname: 'A. Benner', initials: 'A.', organization: '', surname: 'Benner'}
        ];
        let control = 'J. Benner and T. Benner and A. Benner';

        expect(getAuthorName(authors)).to.equal(control);
    });
});
