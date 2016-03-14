'use strict';

/**
 * @param  {Object|Object[]} author
 * @return {string}
 */
module.exports = (author) => {
    return Array.isArray(author) ? author.map(author => author.fullname).join(' and ')
                                 : author.fullname;
};
