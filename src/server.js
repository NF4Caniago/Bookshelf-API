/* eslint-disable indent */
// indent di laptop saya default 4 spasi jadi saya disable
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });
    server.route(routes);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
