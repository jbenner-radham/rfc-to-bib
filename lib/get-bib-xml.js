'use strict';

/**
 * Fetch the BibXML for an RFC.
 *
 * @param {Number} rfc - The RFC to fetch BibXML for.
 * @returns {Promise} - A promise which delivers the RFC BibXML.
 */
module.exports = function (rfc) {
    const got = require('got');

    return got(`https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`);
};
