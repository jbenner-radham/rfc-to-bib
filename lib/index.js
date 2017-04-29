'use strict';

module.exports = function (rfc) {
    const getAuthorName = require('./get-author-name');
    const getBibXml = require('./get-bib-xml');
    const getLastPageNumber = require('./get-last-page-number');
    const got = require('got');
    const template = require('lodash.template');
    const xml = require('pixl-xml');

    let bibTemplate = `
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

    getBibXml(rfc).then((response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed, got response code: ${response.statusCode}`);
            process.exit(1);
        }

        let bibXml = xml.parse(response.body);
        let author = getAuthorName(bibXml.front.author);
        let rfc = bibXml.seriesInfo[0].value;
        let month = bibXml.front.date.month;
        let title = bibXml.front.title;
        let year = bibXml.front.date.year;
        let iri = `https://www.rfc-editor.org/rfc/rfc${rfc}.txt`;

        got(iri).then((response) => {
            if (response.statusCode !== 200) {
                console.error(`Failed, got response code: ${response.statusCode}`);
                process.exit(1);
            }

            let lastPage = getLastPageNumber(response.body);
            let context = {
                author: author,
                rfc: rfc,
                month: month,
                title: title,
                year: year,
                pages: lastPage
            };

            console.log(template(bibTemplate.trim())(context));
        });
    });
};
