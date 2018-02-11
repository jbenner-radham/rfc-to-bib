'use strict';

/**
 * Fetch the BibXML for an RFC.
 *
 * @param {Number} rfc - The RFC to fetch BibXML for.
 * @returns {Promise} - A promise which delivers the RFC BibXML.
 */
module.exports = function (rfc) {
    const got = require('got');
    const sprintf = require('sprintf-js').sprintf;

    const template = 'https://www.rfc-editor.org/refs/bibxml/reference.RFC.%04d.xml'
    const url = sprintf(template, rfc);

    return got(url);
};
