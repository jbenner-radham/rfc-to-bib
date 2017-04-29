'use strict';

/**
 * @param {Number} rfc
 * @returns {Promise}
 */
module.exports = function (rfc) {
    const got = require('got');

    return got(`https://www.rfc-editor.org/rfc/rfc${rfc}.txt`);
};
