/*!
 * JedQuery version 0.1.2
 * Inspiration by http://youmightnotneedjquery.com (https://github.com/HubSpot/YouMightNotNeedjQuery)
 * Copyright 2014-Preset
 * Author: Ratchagarn Naewbuntad
 * Licensed under MIT
 */
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
   * find element with in context
   * ------------------------------------------------------------
   * @name jedQuery().find
   * @param {String} selector
   * @return {Object} jedQuery object for chaining
   */
  
  find: function(selector) {
    var count = 0,
        matches = [];

    jedQuery.fetchElement(this, function(el) {
      var find_el = el.querySelectorAll(selector);
      for (var i = 0, len = find_el.length; i < len; i++) {
        matches.push(find_el[i]);
      }
    }.bind(this));

    // remove old element
    jedQuery.cleanElement(this);

    matches.forEach(function(el) {

      if (jedQuery.uniqueElement(this, el)) {
        this[count] = el;
        count++;
      }

    }.bind(this));

    // update length
    this.length = count;

    return this;
  },


  /**
   * Add class to element
   * ------------------------------------------------------------
   * @name jedQuery().addClass
   * @param {String} class name for add to element
   * @return {Object} jedQuery object for chaining
   */

  addClass: function(class_name) {

    jedQuery.fetchElement(this, function(el) {
      if (el) {
        if (el.classList) {
          el.classList.add(class_name);
        }
        else {
          el.className += ' ' + class_name;
        }
      }
    });

    return this;
  },


  /**
   * check element has specific class or not
   * ------------------------------------------------------------
   * @name jedQuery().hadClass
   * @param {String} class name for add to element
   * @return {Boolean} check class exitst or not
   */
  
  hasClass: function(class_name) {

    var result = false;

    jedQuery.fetchElement(this, function(el) {
      if (el.classList) {
         result = el.classList.contains(class_name);
      }
      else {
        result = new RegExp('(^| )' + class_name + '( |$)', 'gi').test(el.className);
      }
    });

    return result;
  },


  /**
   * remove class in element
   * ------------------------------------------------------------
   * @name jedQuery().removeClass
   * @param {String} class name for add to element
   * @return {Object} jedQuery object for chaining
   */
  
  removeClass: function(class_name) {

    jedQuery.fetchElement(this, function(el) {
      if (el.classList) {
        el.classList.remove(class_name);
      }
      else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + class_name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    });

    return this;
  },


  /**
   * toggle class in element
   * ------------------------------------------------------------
   * @name jedQuery().toggleClass
   * @param {String} class name for add to element
   * @return {Object} jedQuery object for chaining
   */
  
  toggleClass: function(class_name) {

    jedQuery.fetchElement(this, function(el) {
      if (el.classList) {
        el.classList.toggle(class_name);
      }
      else {
        var classes = el.className.split(' '),
            existingIndex = -1;

        for (var i = classes.length; i--;) {
          if (classes[i] === class_name) {
            existingIndex = i;
          }
        }

        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        }
        else {
          classes.push(class_name);
        }
        el.className = classes.join(' ');
      }
    });

    return this;
  },


  /**
   * get/set element attributes
   * ------------------------------------------------------------
   * @name jedQuery().attr
   * @param {String} attribute name
   * @param {String} attribute value
   * @return {String/Number/Object/Function/Boolean} desc
   */
  
  attr: function(name, value) {
    var el = this[0];
    if (!el) { return undefined; }

    // get attribute
    if (value == null) {
      return el.getAttribute(name);
    }

    // set attribute
    else {
      jedQuery.fetchElement(this, function(el) {
        el.setAttribute(name, value);
      });
      return this;
    }

  },
  


  /**
   * hide element
   * ------------------------------------------------------------
   * @name jedQuery().hide
   * @return {Object} jedQuery object for chaining
   */
  
  hide: function() {
    jedQuery.fetchElement(this, function(el) {
      el.style.display = 'none';
    });
    return this;
  },


  /**
   * show element
   * ------------------------------------------------------------
   * @name jedQuery().show
   * @return {Object} jedQuery object for chaining
   */
  
  show: function() {
    jedQuery.fetchElement(this, function(el) {
      el.style.display = '';
    });
    return this;
  },


  /**
   * Remove element from DOM
   * ------------------------------------------------------------
   * @name jedQuery().remove();
   */
  
  remove: function() {
    jedQuery.fetchElement(this, function(el) {
      el.parentNode.removeChild(el);
    });
  },
  


  /**
   * empty content of element
   * ------------------------------------------------------------
   * @name jedQuery().empty
   * @return {Object} jedQuery object for chaining
   */
  
  empty: function() {
    jedQuery.fetchElement(this, function(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    });
    return this;
  },


  /**
   * get/set content of element without HTML
   * ------------------------------------------------------------
   * @name jedQuery().text
   * @param {String} content for set into element
   * @return {String} content of element without HTML
   */
  
  text: function(str) {
    var el = this[0];
    if (!el) { return undefined; }

    if (str == null) {
      return el.textContent || el.innerText;
    }
    else {

      jedQuery.fetchElement(this, function(el) {
        if (el.textContent) {
          el.textContent = str;
        }
        else {
          el.innerText = str;
        }
      });

      return this;
    }
  },


  /**
   * get/set content of element with HTML
   * ------------------------------------------------------------
   * @name jedQuery().html
   * @param {String} content for set into element
   * @return {String} content of element with HTML
   */
  
  html: function(str) {
    var el = this[0];
    if (!el) { return undefined; }

    if (str == null) {
      return el.innerHTML;
    }
    else {

      jedQuery.fetchElement(this, function(el) {
        el.innerHTML = str;
      });

      return this;
    }
  },


  /**
   * get parent of current element
   * ------------------------------------------------------------
   * @name jedQuery().parent
   * @return {Object} jedQuery object for chaining
   */
  
  parent: function() {

    var parents = [],
        count = 0;

    jedQuery.fetchElement(this, function(el) {
      parents.push( el.parentNode );
    });

    // remove old element
    jedQuery.cleanElement(this);

    parents.forEach(function(el) {

      if (jedQuery.uniqueElement(this, el)) {
        this[count] = el;
        count++;
      }

    }.bind(this));

    this.length = count;

    return this;

  },


  /**
   * Fine parent not that closest current this element
   * ------------------------------------------------------------
   * @name jedQuery().closest
   * @param {String} selector
   * @return {Object} jedQuery object for chaining
   */
  
  closest: function(selector) {

    if (selector == null) {
      return this;
    }

    var selector_type = selector[0],
        matches = [],
        count = 0;

    selector = selector.slice(1, selector.length);

    // class
    if (selector_type !== '.' && selector_type !== '#') {
      throw new Error('Wrong selector for closest');
    }

    var _closest = function(el) {

      if (!el.parentNode) {
        return el;
      }

      var current_el = el.parentNode,
          el_to_stack = null;

      // by class
      if (selector_type === '.' && current_el.className) {
        if ( current_el.className.split(' ').indexOf( selector ) > -1 ) {
          el_to_stack = current_el;
        }
      }

      // by ID
      else if (selector_type === '#' && current_el.id) {
        if (current_el.id === selector) {
          el_to_stack = current_el;
        }
      }

      if (el_to_stack) {
        matches.push(el_to_stack);
      }
      else {
        _closest(current_el);
      }

    };

    jedQuery.fetchElement(this, function(el) {
      _closest(el);
    });

    // remove old element
    jedQuery.cleanElement(this);

    matches.forEach(function(el) {

      if (jedQuery.uniqueElement(this, el)) {
        this[count] = el;
        count++;
      }

    }.bind(this));

    this.length = count;

    return this;
  }

});

}).call(this);
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