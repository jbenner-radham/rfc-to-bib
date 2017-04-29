'use strict';

/**
 * @param {Number} rfc
 * @returns {Promise}
 */
module.exports = function (rfc) {
    const got = require('got');

    return got(`https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`);
};
