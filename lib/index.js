'use strict';

let getAuthorName     = require('./get-author-name');
let getLastPageNumber = require('./get-last-page-number');
let https             = require('https');
let template          = require('lodash.template');
let xml               = require('pixl-xml');

const FAILURE = 1;

if (!process.argv[2]) {
    console.error('Please provide an RFC number as an argument.');
    process.exit(FAILURE);
}

let rfc         = process.argv[2];
let iri         = `https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`;
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


https.get(iri, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed, got response code: ${res.statusCode}`);
        process.exit(FAILURE);
    }

    let body = '';

    res.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        let bibXml = xml.parse(body);
        let author = getAuthorName(bibXml.front.author);
        let rfc    = bibXml.seriesInfo[0].value;
        let month  = bibXml.front.date.month;
        let title  = bibXml.front.title;
        let year   = bibXml.front.date.year;
        let iri    = `https://www.rfc-editor.org/rfc/rfc${rfc}.txt`;

        https.get(iri, res => {
            if (res.statusCode !== 200) {
                console.error(`Failed, got response code: ${res.statusCode}`);
                process.exit(FAILURE);
            }

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            }).on('end', () => {
                let lastPage = getLastPageNumber(body);
                let context  = {
                    author: author,
                    rfc:    rfc,
                    month:  month,
                    title:  title,
                    year:   year,
                    pages:  lastPage
                };

                console.log(template(bibTemplate.trim())(context));
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
