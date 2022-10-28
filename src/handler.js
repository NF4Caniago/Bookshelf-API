/* eslint-disable max-len */
/* eslint-disable indent */
// indent di laptop saya default 4 spasi jadi saya disable
const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name, year, author, summary,
        publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
        return (h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400));
    }
    if (readPage > pageCount) {
        return (h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400));
    }
    const id = nanoid(16);
    let finished = false;
    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    if (pageCount === readPage) {
        finished = true;
    }
    const newBook = {
        name, year, author, summary,
        publisher, pageCount, readPage, reading,
        id, finished, insertedAt, updatedAt,
    };
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        return (h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201));
    }
    return (h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    }).code(500));
};

const getAllBooks = (request, h) => {
    const {name, reading, finished} = request.query;
    let filterBooks = books;
    if (name) {
        filterBooks = filterBooks.filter(
            (b) => b.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (reading == 1 || reading == 0) {
        filterBooks = filterBooks.filter((b) => b.reading == reading);
    }
    if (finished == 1 || finished == 0) {
        filterBooks = filterBooks.filter((b) => b.finished == finished);
    }
    const resBooks = filterBooks.map(({id, name, publisher}) => (
        {
            id: id,
            name: name,
            publisher: publisher,
        }));
    return (h.response({
        status: 'success',
        data: {
            books: resBooks,
        },
    }).code(200));
};

const getBookById = (request, h) => {
    const {id} = request.params;
    const book = books.filter((book) => book.id === id)[0];
    if (book !== undefined) {
        return (h.response({
            status: 'success',
            data: {
                book: book,
            },
        }).code(200));
    }
    return (h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404));
};

const editBookById = (request, h) => {
    const {id} = request.params;
    const {
        name, year, author, summary,
        publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
        return (h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400));
    }
    if (readPage > pageCount) {
        return (h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400));
    }
    const index = books.findIndex((b) => b.id === id);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author,
            summary, publisher, pageCount,
            readPage, reading,
        };
        return (h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200));
    }
    return (h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404));
};

const deleteBook = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        return (h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })).code(200);
    }
    return (h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })).code(404);
};

module.exports = {
    addBookHandler,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBook,
};
