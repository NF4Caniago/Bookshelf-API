/* eslint-disable indent */
// indent di laptop saya default 4 spasi jadi saya disable

const {addBookHandler} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
];

module.exports = routes;
