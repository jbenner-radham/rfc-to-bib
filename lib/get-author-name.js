'use strict';

/**
 * An object representing an RFC author.
 *
 * @typedef {Object} Author
 * @property {String} initials - The author's initials.
 * @property {String} surname - The author's surname.
 * @property {String} fullname - The author's formatted full name.
 * @property {String} organization - The organization the author represents.
 */

/**
 * Get an author name citation from an object or an array of objects.
 *
 * @param {Author|Author[]} author - The author object or an array of objects.
 * @returns {String} - The author name citation.
 */
module.exports = function (author) {
    return Array.isArray(author) ? author.map(author => author.fullname).join(' and ')
                                 : author.fullname;
};
