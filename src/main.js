const service = require('./Service');

const container = new service.Container();
const server = container.httpService.listen(3000, () => {
    console.log('App listening at port %s', server.address().port);
});
