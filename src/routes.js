/* eslint-disable indent */
// indent di laptop saya default 4 spasi jadi saya disable

const {
    addBookHandler,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBook,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook,
    },
];

module.exports = routes;
