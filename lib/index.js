'use strict';

/**
 * Generates BibTeX records for IETF RFCs by fetching the relevant BibXML and
 * RFC then extracting the required info.
 *
 * @param {Number} rfc - The RFC to fetch and generate the BibTeX for.
 * @returns {Promise} - A promise which delivers the BibTeX string.
 */
module.exports = function (rfc) {
    const codeBlock = require('common-tags').codeBlock;
    const getAuthorName = require('./get-author-name');
    const getBibXml = require('./get-bib-xml');
    const getLastPageNumber = require('./get-last-page-number');
    const getRfcTxt = require('./get-rfc-txt');
    const template = require('lodash.template');
    const xml = require('pixl-xml');

    if (!Number.isInteger(rfc)) {
        return Promise.reject(new TypeError('A numeric argument is required.'));
    }

    let bibTemplate = codeBlock`
        @techreport{rfc<%= rfc %>,
            author       = {<%= author %>},
            title        = {<%= title %>},
            howpublished = {Internet Requests for Comments},
            type         = {RFC},
            number       = <%= rfc %>,
            pages        = {1-<%= pages %>},
            year         = <%= year %>,
            month        = <%= month %>,
            issn         = {2070-1721},
            publisher    = {RFC Editor},
            institution  = {RFC Editor},
            url          = {http://www.rfc-editor.org/rfc/rfc<%= rfc %>.txt}
        }
    `;

    return Promise.all([getBibXml(rfc), getRfcTxt(rfc)]).then(responses => {
        let [bibXml, rfcTxt] = responses;
        let bib = xml.parse(bibXml.body);
        let author = getAuthorName(bib.front.author);
        let rfc = bib.seriesInfo[0].value;
        let month = bib.front.date.month;
        let title = bib.front.title;
        let year = bib.front.date.year;
        let pages = getLastPageNumber(rfcTxt.body);
        let context = {author, rfc, month, title, year, pages};
        let renderBib = template(bibTemplate);

        return renderBib(context);
    });
};
