'use strict';

/**
 * Fetch an IETF RFC text document.
 *
 * @param {Number} rfc - The RFC to fetch.
 * @returns {Promise} - A promise which delivers the RFC document string.
 */
module.exports = function (rfc) {
    const got = require('got');

    return got(`https://www.rfc-editor.org/rfc/rfc${rfc}.txt`);
};
