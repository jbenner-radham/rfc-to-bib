'use strict';

module.exports = function (rfc) {
    const got = require('got');

    let iri = `https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`;

    return got(iri);
};
