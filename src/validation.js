/* eslint-disable indent */
// indent di laptop saya default 4 spasi jadi saya disable

// validasi name null or not
const isNameNull = (name, errMessage) => {
    if (!name) {
        const response = {
            status: 'fail',
            message: errMessage,
        };
        return response;
    };
    return false;
};

const isPagecountValid = (pageCount, readPage, errMessage) => {
    if (readPage > pageCount) {
        const response = {
            status: 'fail',
            message: errMessage,
        };
        return response;
    }
    return false;
};

exports.module = {isNameNull, isPagecountValid};
