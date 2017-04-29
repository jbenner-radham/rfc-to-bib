'use strict';

/**
 * @param {Object|Object[]} author
 * @return {String}
 */
module.exports = function (author) {
    return Array.isArray(author) ? author.map(author => author.fullname).join(' and ')
                                 : author.fullname;
};
