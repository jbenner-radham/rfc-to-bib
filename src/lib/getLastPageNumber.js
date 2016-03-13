'use strict';

/**
 * @param  {string} body
 * @return {number}
 */
module.exports = (body) => {
    let re             = /\[Page\ (\d+)\]/g;
    let pages          = body.match(re);
    let lastPage       = pages[pages.length - 1];
    let lastPageNumber = lastPage.replace('[Page ', '').replace(']', '');

    return parseInt(lastPageNumber, 10);
};
