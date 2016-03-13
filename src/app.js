'use strict';

import fs from 'fs';
import https from 'https';
import getAuthor from './lib/getAuthor';
import getLastPageNumber from './lib/getLastPageNumber';
import template from 'lodash.template';
import xml from 'pixl-xml';

const FAILURE = 1;

if (!process.argv[2]) {
    console.error('Please provide an RFC number as an argument.');
    process.exit(FAILURE);
}

let rfc = process.argv[2];
let iri = `https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`;

https.get(iri, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed, got response code: ${res.statusCode}`);
        process.exit(FAILURE);
    }

    let body = '';

    res.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        let bibXml      = xml.parse(body);
        let author      = getAuthor(bibXml.front.author);
        let rfc         = bibXml.seriesInfo[0].value;
        let month       = bibXml.front.date.month;
        let title       = bibXml.front.title;
        let year        = bibXml.front.date.year;
        let bibTemplate = fs.readFileSync('src/rfc-template.bib');
        let iri         = `https://www.rfc-editor.org/rfc/rfc${rfc}.txt`;

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

                console.log(template(bibTemplate)(context));
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
