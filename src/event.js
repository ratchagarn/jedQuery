/**
 * Element handler
 * ------------------------------------------------------------
 */

(function() {

'use strict';

var root = this,
    jedQuery = root.jedQuery;


jedQuery.extend(jedQuery.fn, {

  /**
   * Attach event to element
   * ------------------------------------------------------------
   * @name jedQuery().on
   * @param {String} event name
   * @param {Function} function for handler event
   * @return {Object} jedQuery object for chaining
   */
  
  on: function(name, handler) {

    jedQuery.fetchElement(this, function(el) {

      if (el.addEventListener) {
        el.addEventListener(name, handler);
      } else {
        el.attachEvent('on' + name, function(){
          handler.call(el);
        });
      }

    });

  },


  /**
   * Remove event from element
   * ------------------------------------------------------------
   * @name jedQuery().off
   * @param {String} event name
   * @return {Object} jedQuery object for chaining
   */
  
  off: function(name) {

    jedQuery.fetchElement(this, function(el) {

      if (el.removeEventListener) {
        el.removeEventListener(name);
      }
      else {
        el.detachEvent('on' + name);
      }

    });

  }
  

});


}).call(this);