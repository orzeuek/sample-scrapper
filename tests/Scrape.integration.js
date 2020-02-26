const chai = require('chai');
const fs = require('fs');
const FunnyTextsScrapper = require('../src/FunnyTextsScrapper');

describe('[integration] FunnyTextsScrappingService', function () {
    it('should get latests texts from bash.org.pl', async () => {
        const result = await new FunnyTextsScrapper(
            FunnyTextsScrapper.scrape
        ).scrape(3);

        chai.expect(result.length).to.be.equal(3);
        result.forEach(row => chai.expect(row.hasOwnProperty('content')));
        result.forEach(row => chai.expect(row.hasOwnProperty('id')));
    });
});


describe('[unit] FunnyTextsScrappingService', function () {
    it('should get latests texts from mocked bash.org.pl', async () => {
        const scrapeMock = () => fs.readFileSync(`${__dirname}/fixtures/sample.html`, 'utf8');

        const result = await new FunnyTextsScrapper(scrapeMock).scrape(3);

        chai.expect(result).to.deep.equal([
            {
                "content": "<kosa> mam takie ambitne plany na przyszły rok\n \n <kosa> że chyba już z nich zrezygnuję",
                "id": 4863215
            },
            {
                "content": "<kurdej> format mp3 to taki fastfood dla muzyki",
                "id": 4863030
            },
            {
                "content": "<dorszulec> powiedziałam mu, że jego blog jest całkiem nieźle napisany\n \n <dorszulec> tylko że ma za dużo przymiotników, a za mało przecinków\n \n <dorszulec> wymieniliśmy kilka komentarzy\n \n <dorszulec> dyskusja skończyła się oczywiście na wspólnym zastanawianiu się, kto jest nazistą",
                "id": 4863226
            }
        ]);
    });
});
