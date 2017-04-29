'use strict';

module.exports = function (message) {
    const chalk = require('chalk');
    const figures = require('figures');

    console.error(chalk.bold.red(figures.cross, message));
};
