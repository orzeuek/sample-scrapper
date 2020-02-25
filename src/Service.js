const express = require('express');
const Scraper = require('./FunnyTextsScrapper');

class Service {

    get httpService() {
        const app = express();
        app.get('/healthcheck', healtcheckHandler);
        app.get('/scrape', scrapeHandler);
        return app;
    }

}

function healtcheckHandler(req, res) {
    res.send({
        status: 'ok'
    });
}

async function scrapeHandler(req, res) {
    const handler = new Scraper();
    res.send(await handler.scrape(req.query.limit || 20));
}

module.exports.Container = Service;
