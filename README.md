# Funny texts scrapper

It's extremely simple API to fetch latest posts from 
http://bash.org.pl/latest/ website. 

## How to run it and use it

```
npm install
npm run test
npm run start
curl -X GET http://127.0.0.1:3000/scrape?limit=2
```

`limit` parameter is optional. 
If empty, then 20 results will be return.
Valid values are 1-20; 
