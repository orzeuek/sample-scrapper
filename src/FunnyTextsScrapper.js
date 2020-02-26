const DomParser = require('dom-parser');
const http = require('http');

const URL = 'http://bash.org.pl/latest/';

class FunnyTextsScrappingService {
    #scraper;

    /**
     *
     * @param scraper:() => Promise<string>
     */
    constructor(scraper = scrape) {
        this.#scraper = scraper;
    }

    /**
     * @param limit:number
     * @return {Promise<{id:number, content:string}[]>}
     */
    async scrape(limit = 20) {
        const html = await this.#scraper();
        return extractData(html, limit);
    }
}

function scrape() {
    return new Promise((resolve, reject) => {
        const request = http.get(URL, (resStream) => {
            let body = '';
            resStream.on('data', function (chunk) {
                body += chunk;
            });

            resStream.on('end', function () {
                resolve(body);
            });
        });
        request.on('error', (err) => {
            reject(err);
        });
    });
}

function extractData(html, limit) {
    const parser = new DomParser();
    const dom = parser.parseFromString(html);
    return dom.getElementsByClassName('post')
        .slice(0, limit)
        .map(node => ({
                id: Number.parseInt(node.getAttribute('id').replace(/^\D+/, '')),
                content: decodeHTMLEntities(node.getElementsByClassName('post-body').pop().textContent.trim()),
            })
        );
}

/**
 * Stolen from Stackoverflow :)
 */
function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&' + entities[ i ][ 0 ] + ';', 'g'), entities[ i ][ 1 ]);

    return text;
}

module.exports = FunnyTextsScrappingService;
