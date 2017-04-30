'use strict';

/**
 * A module to provide a uniform error logging format.
 *
 * @param {String} message - The error to log.
 * @returns {undefined} - Does not return.
 */
module.exports = function (message) {
    const chalk = require('chalk');
    const figures = require('figures');

    console.error(chalk.bold.red(figures.cross, message));
};
