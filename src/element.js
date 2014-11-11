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
   * Add element before inside selector element
   * ------------------------------------------------------------
   * @name jedQuery().prepend
   * @param {String} content for set into element
   * @return {String} content of element with HTML
   */

  prepend: function(str) {
    var el = this[0];
    if (!el) { return undefined; }

    if (str) {
      jedQuery.fetchElement(this, function(el) {
        var new_el = document.createElement('div');
        new_el.innerHTML = str;
        el.insertBefore(new_el.childNodes[0], el.firstChild);
      });
    }
    return this;
  },


  /**
   * Add element after inside selector element
   * ------------------------------------------------------------
   * @name jedQuery().append
   * @param {String} content for set into element
   * @return {String} content of element with HTML
   */

  append: function(str) {
    var el = this[0];
    if (!el) { return undefined; }

    if (str) {
      jedQuery.fetchElement(this, function(el) {
        var new_el = document.createElement('div');
        new_el.innerHTML = str;
        el.appendChild(new_el.childNodes[0]);
      });
    }
    return this;
  },


  /**
   * replace element with other element
   * ------------------------------------------------------------
   * @name jedQuery().replaceWith
   * @param {String} content for set into element
   * @return {Object} jedQuery object for chaining
   */

  replaceWith: function(str) {
    jedQuery.fetchElement(this, function(el) {
      el.outerHTML = str;
    });
    return this;
  },


  /**
   * add element before selector element
   * ------------------------------------------------------------
   * @name jedQuery().before
   * @param {String} content for set into element
   * @return {Object} jedQuery object for chaining
   */

  before: function(str) {
    jedQuery.fetchElement(this, function(el) {
      el.insertAdjacentHTML('beforebegin', str);
    });
    return this;
  },


  /**
   * add element after selector element
   * ------------------------------------------------------------
   * @name jedQuery().after
   * @param {String} content for set into element
   * @return {Object} jedQuery object for chaining
   */

  after: function(str) {
    jedQuery.fetchElement(this, function(el) {
      el.insertAdjacentHTML('afterend', str);
    });
    return this;
  },


  /**
   * find element with in context
   * ------------------------------------------------------------
   * @name jedQuery().find
   * @param {String} selector
   * @return {Object} jedQuery object for chaining
   */
  
  find: function(selector) {
    var matches = [];

    jedQuery.fetchElement(this, function(el) {
      var find_el = el.querySelectorAll(selector);
      for (var i = 0, len = find_el.length; i < len; i++) {
        matches.push(find_el[i]);
      }
    });

    jedQuery.elementStack(this, matches);

    return this;
  },


  /**
   * get previous element of current element
   * ------------------------------------------------------------
   * @name jedQuery().prev
   * @return {Object} jedQuery object for chaining
   */

  prev: function() {

    var el = this[0];

    // prevSibling can include text nodes
    function previousElementSibling(el) {
      do {
        el = el.previousSibling;
      } while ( el && el.nodeType !== 1 );
      return el;
    }

    jedQuery.elementStack(this, [
      el.previousElementSibling || previousElementSibling( el )
    ]);

    return this;

  },


  /**
   * get next element of current element
   * ------------------------------------------------------------
   * @name jedQuery().prev
   * @return {Object} jedQuery object for chaining
   */

  next: function() {

    var el = this[0];

    // nextSibling can include text nodes
    function nextElementSibling(el) {
      do {
        el = el.nextSibling;
      } while ( el && el.nodeType !== 1 );
      return el;
    }

    jedQuery.elementStack(
      this,
      el.nextElementSibling || nextElementSibling( el )
    );

    return this;

  },


  /**
   * get parent of current element
   * ------------------------------------------------------------
   * @name jedQuery().parent
   * @return {Object} jedQuery object for chaining
   */
  
  parent: function() {

    var matches = [];

    jedQuery.fetchElement(this, function(el) {
      matches.push( el.parentNode );
    });

    jedQuery.elementStack(this, matches);

    return this;

  },


  /**
   * get children of current element
   * ------------------------------------------------------------
   * @name jedQuery().children
   * @return {Object} jedQuery object for chaining
   */

  children: function() {
    var children = [];

    jedQuery.fetchElement(this, function(el) {

      for (var i=el.children.length; i--;) {
        // Skip comment nodes on IE8
        if (el.children[i].nodeType !== 8) {
          children.unshift(el.children[i]);
        }
      }

    });

    jedQuery.elementStack(this, children);

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

    jedQuery.elementStack(this, matches);

    return this;
  },


  /**
   * get element siblings
   * ------------------------------------------------------------
   * @name jedQuery().siblings
   * @return {Object} jedQuery object for chaining
   */

  siblings: function() {
    var siblings = [];
    jedQuery.fetchElement(this, function(el) {
      siblings = Array.prototype.slice.call(el.parentNode.children);
      for (var i = siblings.length; i--;) {
        if (siblings[i] === el) {
          siblings.splice(i, 1);
          break;
        }
      }
    });

    jedQuery.elementStack(this, siblings);

    return this;
  },


  /**
   * fetch all element to callback
   * ------------------------------------------------------------
   * @name each
   * @param {Function} callback function for element
   * @return {Object} jedQuery object for chaining
   */

  each: function(callback) {
    jedQuery.fetchElement(this, function(el, i) {
      callback(i, el);
    });
    return this;
  },


  /**
   * Get index of element selector
   * ------------------------------------------------------------
   * @name eq
   * @param {Number} number of element index
   * @return {Object} jedQuery object for chaining
   */

  eq: function(number) {
    jedQuery.elementStack(this, this[number]);
    return this;
  },


  /**
   * clone current element
   * ------------------------------------------------------------
   * @name clone
   * @return {Object} jedQuery object for chaining
   */

  clone: function() {
    var clones = [];
    jedQuery.fetchElement(this, function(el) {
      clones.push( el.cloneNode(true) );
    });

    jedQuery.elementStack(this, clones);
    return this;
  },


  /**
   * get element position
   * ------------------------------------------------------------
   * @name jedQuery().position
   * @return {Object} element position
   */

  position: function() {
    if (this[0]) {
      var el = this[0];
      return {
        left: el.offsetLeft,
        right: el.offsetRight
      };
    }
    else {
      return undefined;
    }
  },


  /**
   * get element offset
   * ------------------------------------------------------------
   * @name jedQuery().offset
   * @return {Object} element offset
   */

  offset: function() {
    if (this[0]) {
      var rect = this[0].getBoundingClientRect();

      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    }
    else {
      return undefined;
    }
  }


});

}).call(this);