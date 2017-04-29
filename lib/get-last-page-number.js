'use strict';

/**
 * @param {String} body
 * @returns {Number}
 */
module.exports = function (body) {
    const RADIX = 10;

    let re = /\[Page\ (\d+)\]/g;
    let pages = body.match(re);
    let lastPage = pages[pages.length - 1];
    let lastPageNumber = lastPage.replace('[Page ', '').replace(']', '');

    return parseInt(lastPageNumber, RADIX);
};
