'use strict';

/**
 * Extract the last page number from an IETF RFC text.
 *
 * @param {String} body - The RFC text.
 * @returns {Number} - The last page number on the document.
 */
module.exports = function (body) {
    const RADIX = 10;

    let re = /\[Page\ (\d+)\]/g;
    let pages = body.match(re);
    let lastPage = pages[pages.length - 1];
    let lastPageNumber = lastPage.replace('[Page ', '').replace(']', '');

    return parseInt(lastPageNumber, RADIX);
};
