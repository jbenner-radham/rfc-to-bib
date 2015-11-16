import fs from 'fs';
import https from 'https';
import template from 'lodash.template';
import xml from 'pixl-xml';

let rfc = 2616;
let iri = `https://www.rfc-editor.org/refs/bibxml/reference.RFC.${rfc}.xml`;

https.get(iri, (res) => {
    //console.log(`Got response: ${res.statusCode}`);
    let body = '';

    res.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        let bibXml = xml.parse(body);
        let json = JSON.stringify(bibXml, null, 4);
        console.log(body);
        console.log(json);

        let author = bibXml.front.author.map(author => author.fullname).join(' and ');
        let rfc = bibXml.seriesInfo[0].value;
        let month = bibXml.front.date.month;
        let title = bibXml.front.title;
        let year = bibXml.front.date.year;
        let bibTemplate = fs.readFileSync('src/rfc-template.bib');
        //console.log(rfc);
        
        let re = /\[Page\ (\d+)\]/g;
        let iri = `https://www.rfc-editor.org/rfc/rfc${rfc}.txt`;
        
        https.get(iri, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            }).on('end', () => {
                //console.log(body)
                //console.log(JSON.stringify(body.match(re), null, 4));
                let pages = body.match(re);
                let lastPage = pages[pages.length - 1];
                console.log(lastPage);
                let num = lastPage.replace('[Page ', '').replace(']', '');
                console.log(parseInt(num, 10));
            });
        }).on('error', err => {
            console.log(`Got error: ${err.message}`);
        })

        console.log(template(bibTemplate)({author: author, rfc: rfc, month: month, title: title, year: year}));
    });
}).on('error', function(e) {
    console.log(`Got error: ${e.message}`);
});