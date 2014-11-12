/**
 * Core
 * ------------------------------------------------------------
 */

(function() {

'use strict';

var root = this;


/**
 * jedQuery core function
 * ------------------------------------------------------------
 * @name jedQuery
 * @param {String} selector
 * @return {Object} jedQuery Object
 */

var jedQuery = function(selector) {
  return new Core(selector);
};

jedQuery.version = '0.1.4';


/**
 * ------------------------------------------------------------
 * jedQuery Core function
 * ------------------------------------------------------------
 */

var Core = function(selector) {
  this.constructor = jedQuery;
  this.length = 0;

  var _selector = [];

  if (typeof selector === 'string') {
    var selector_type = selector[0];
    // by id
    if (selector_type === '#') {
      _selector = document.getElementById( selector.slice(1, selector.length) );
      _selector.length = 1;
    }
    else {
      _selector = document.querySelectorAll(selector);
    }
  }

  // for case : jedQuery( document.getElementById('test') )
  else if (typeof selector === 'object') {
    _selector = selector;
    _selector.length = 1;
  }
  else {
    _selector = document.body;
    _selector.length = 1;
    // throw new Error('Wrong selector');
  }

  if (_selector.length) {
    this.length = _selector.length;
  }

  for (var i = 0; i < this.length; i++) {
    if (_selector[i]) {
      this[i] = _selector[i];
    }
    else {
      this[i] = _selector;
    }
  }

  return this;
};


/**
 * ------------------------------------------------------------
 * Define jedQuery core function
 * ------------------------------------------------------------
 */

jedQuery.fn = Core.prototype = {};


/**
 * Extend deep object
 * ------------------------------------------------------------
 * @name jedQuery.extend
 * @param {Object} object for extend
 * @return {Object} merge object
 */

jedQuery.extend = jedQuery.fn.extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          jedQuery.extend(out[key], obj[key]);
        }
        else {
          out[key] = obj[key];
        }
      }
    }
  }

  return out;
};


/**
 * ------------------------------------------------------------
 * Define jedQuery to root scope
 * ------------------------------------------------------------
 */

root.jedQuery = jedQuery;


/**
 * ------------------------------------------------------------
 * Alias of jedQuery
 * ------------------------------------------------------------
 */

// if found jQuery replace with jQuery instead.
if (root.jQuery) {
  root.$ = root.jQuery;
  console.log('Replace with jQuery');
}
else {
  root.$ = root.jedQuery;
}


}).call(this);