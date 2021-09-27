/*!
 * Sitemap
 * Copyright(c) 2011 Eugene Kalinin
 * MIT Licensed
 */

var _ = require('underscore');

/**
 * Exit with the given `str`.
 *
 * @param {String} str
 */
exports.abort = function (str) {
  console.error(str);
  process.exit(1);
};

/**
 * Escapes special characters in text.
 *
 * @param {String} text
 */
exports.htmlEscape = function (text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

/**
 *  Pads the left-side of a string with a specific
 *  set of characters.
 *
 *  @param {Object} n
 *  @param {Number} len
 *  @param {String} chr
 */
exports.lpad = function (n, len, chr) {
  var res = n.toString()
    , chr = chr || '0'
    , leading = (res.substr(0, 1) === '-');

  //If left side of string is a minus sign (negative number), we want to ignore that in the padding process
  if (leading) {
    res = res.substr(1); //cut-off the leading '-'
  }

  while (res.length < len) {
    res = chr + res;
  }

  if (leading) { //If we initially cutoff the leading '-', we add it again here
    res = '-' + res;
  }

  return res;
};

/**
 *
 * @param {Array} arr
 */
exports.distinctArray = function (arr) {
  var hash = {}
    , res = []
    , arr_length = arr.length;
  while (arr_length--) {
    hash[arr[arr_length]] = true;
  }
  for (key in hash) {
    res.push(key);
  }
  return res;
};

exports.chunkArray = function (arr, chunkSize) {
  var lists = _.groupBy(arr, function (element, index) {
    return Math.floor(index / chunkSize);
  });
  lists = _.toArray(lists);
  return lists;
};

exports.getTimestamp = function () {
  return (new Date()).getTime();
};

exports.getTimestampFromDate = function (dt, bRealtime) {
  var timestamp = [dt.getUTCFullYear(), exports.lpad(dt.getUTCMonth() + 1, 2),
    exports.lpad(dt.getUTCDate(), 2)].join('-');

  // Indicate that lastmod should include minutes and seconds (and timezone)
  if (bRealtime && bRealtime === true) {
    timestamp += 'T';
    timestamp += [exports.lpad(dt.getUTCHours(), 2),
      exports.lpad(dt.getUTCMinutes(), 2),
      exports.lpad(dt.getUTCSeconds(), 2)
    ].join(':');
    timestamp += 'Z';
  }

  return timestamp;
};
