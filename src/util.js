/**
 * jedQuery Util
 * ------------------------------------------------------------
 */

(function() {

'use strict';

var root = this,
    jedQuery = root.jedQuery;


jedQuery.extend(jedQuery, {

  elementStack: function(context, matches) {
    var count = 0,
        new_context = {};

    // remove old element
    for (var i = 0, len = context.length; i < len; i++) {
      delete context[i];
    }


    if (matches instanceof Array) {
      matches.forEach(function(el) {

        if (jedQuery.uniqueElement(context, el)) {
          context[count] = el;
          count++;
        }

      });
    }
    else if (matches) {
      context[0] = matches;
      count = 1;
    }

    // update length
    context.length = count;
    return context;
  },

  fetchElement: function(context, callback) {
    for (var i = 0, len = context.length; i < len; i++) {
      callback(context[i], i);
    }
  },

  uniqueElement: function(context, new_element) {
    var unique = true;
    for (var i = 0, len = context.length; i < len; i++) {
      if (context[i] === new_element) {
        unique = false;
        break;
      }
    }
    return unique;
  },

  // http://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression
  camelCase: function(input, key) {
    if (key == null) { key = '-'; }

    if (input.indexOf(key) > -1) {
      return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
      });
    }
    else {
      return input;
    }
  },


  /**
   * blank function for use as default callback function
   * ------------------------------------------------------------
   * @name jedQuery.noop
   */

  noop: function() {},


  /**
   * loop object or array to callback
   * ------------------------------------------------------------
   * @name jedQuery.map
   * @param {Array|Object} array or object for loop
   * @param {Function} callback function for array or object
   */

  map: function(obj, callback) {
    if (obj instanceof Array) {
      obj.forEach(function(item, key) {
        callback(item, key);
      });
    }
    else {
      for (var key in obj) {
        var item = obj[key];
        callback(item, key);
      }
    }
  },


  /**
   * check contains element
   * ------------------------------------------------------------
   * @name jedQuery.contains
   * @return {Boolean} TRUE/FALSE
   */

  contains: function(el, child) {
    if (el !== child && el.contains(child)) {
      return true;
    }
    else {
      return false;
    }
  }
  

});


}).call(this);