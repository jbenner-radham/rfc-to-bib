'use strict';

module.exports = function (rfc) {
    const getAuthorName = require('./get-author-name');
    const getLastPageNumber = require('./get-last-page-number');
    const https = require('https');
    const template = require('lodash.template');
    const xml = require('pixl-xml');

    const FAILURE = 1;

    let iri = `https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`;
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

    https.get(iri, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed, got response code: ${response.statusCode}`);
            process.exit(FAILURE);
        }

        let body = '';

        response.on('data', chunk => {
            body += chunk;
        }).on('end', () => {
            let bibXml = xml.parse(body);
            let author = getAuthorName(bibXml.front.author);
            let rfc = bibXml.seriesInfo[0].value;
            let month = bibXml.front.date.month;
            let title = bibXml.front.title;
            let year = bibXml.front.date.year;
            let iri = `https://www.rfc-editor.org/rfc/rfc${rfc}.txt`;

            https.get(iri, response => {
                if (response.statusCode !== 200) {
                    console.error(`Failed, got response code: ${response.statusCode}`);
                    process.exit(FAILURE);
                }

                let body = '';

                response.on('data', chunk => {
                    body += chunk;
                }).on('end', () => {
                    let lastPage = getLastPageNumber(body);
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
            }).on('error', (error) => {
                console.error(`Got error: ${error.message}`);
            });
        });
    }).on('error', (error) => {
        console.error(`Got error: ${error.message}`);
    });
};
