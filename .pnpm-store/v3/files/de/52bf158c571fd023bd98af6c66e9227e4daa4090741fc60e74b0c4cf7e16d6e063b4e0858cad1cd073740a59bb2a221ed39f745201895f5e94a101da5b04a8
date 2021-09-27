/**
 * Module Dependencies
 */

var assert = require('assert');

try {
  var iterator = require('dom-iterator');
  var parse = require('domify');
} catch (e) {
  var iterator = require('../');
  var parse = function(str) { return require('mini-html-parser')(str).parse(); };
}


/**
 * Tests
 */

describe('iterator', function() {
  var dom, i, article;

  beforeEach(function() {
    dom = parse('<body>hi<article><em>whatever</em>omg<strong></strong></article>bye</body>');
    article = dom.childNodes[1];
  });

  describe('(dom)', function() {

    it('should iterate from the top', function() {
      i = iterator(dom);
      assert('<body>' == format(i));
      assert('hi' == format(i.next(), i));
      assert('<article>' == format(i.next(), i));
      assert('<em>' == format(i.next(), i));
      assert('whatever' == format(i.next(), i));
      assert('</em>' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('<strong>' == format(i.next(), i));
      assert('</strong>' == format(i.next(), i));
      assert('</article>' == format(i.next(), i));
      assert('bye' == format(i.next(), i));
      assert('</body>' == format(i.next(), i));
      assert(null == i.next());
      assert(null == i.next());
      assert(null == i.next());
      assert('</body>' == format(i));
      assert('bye' == format(i.prev(), i));
      assert('</article>' == format(i.prev(), i));
    });

    it('should iterate from the middle (opening)', function() {
      i = iterator(article);

      assert('<article>' == format(i));
      assert('hi' == format(i.prev(), i));
      assert('<body>' == format(i.prev(), i));
      assert(null == i.prev());

      i.reset();

      assert('<article>' == format(i));
      assert('<em>' == format(i.next(), i));
      assert('whatever' == format(i.next(), i));
      assert('</em>' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('<strong>' == format(i.next(), i));
      assert('</strong>' == format(i.next(), i));
      assert('</article>' == format(i.next(), i));
      assert('bye' == format(i.next(), i));
      assert('</body>' == format(i.next(), i));
      assert(null == i.next());
    });


    it('should iterate from the middle (closing)', function() {
      i = iterator(article).closing();

      assert('</article>' == format(i));
      assert('bye' == format(i.next(), i));
      assert('</body>' == format(i.next(), i));
      assert(null == i.next());

      i.reset();

      assert('</article>' == format(i));
      assert('</strong>' == format(i.prev(), i));
      assert('<strong>' == format(i.prev(), i));
      assert('omg' == format(i.prev(), i));
      assert('</em>' == format(i.prev(), i));
      assert('whatever' == format(i.prev(), i));
      assert('<em>' == format(i.prev(), i));
      assert('<article>' == format(i.prev(), i));
      assert('hi' == format(i.prev(), i));
      assert('<body>' == format(i.prev(), i));
      assert(null == i.prev());
    });

    it('should iterate from the bottom', function() {
      i = iterator(dom).closing();
      assert('</body>' == format(i));
      assert('bye' == format(i.prev(), i));
      assert('</article>' == format(i.prev(), i));
      assert('</strong>' == format(i.prev(), i));
      assert('<strong>' == format(i.prev(), i));
      assert('omg' == format(i.prev(), i));
      assert('</em>' == format(i.prev(), i));
      assert('whatever' == format(i.prev(), i));
      assert('<em>' == format(i.prev(), i));
      assert('<article>' == format(i.prev(), i));
      assert('hi' == format(i.prev(), i));
      assert('<body>' == format(i.prev(), i));
      assert(null == i.prev());
      assert(null == i.prev());
      assert(null == i.prev());
      assert('<body>' == format(i));
      assert('hi' == format(i.next(), i));
      assert('<article>' == format(i.next(), i));
    });
  });

  describe('(dom, root)', function() {
    it('should support roots to limit iterator (opening)', function() {
      i = iterator(article.firstChild, article);
      assert('<em>' == format(i));
      assert(null == i.prev());
      assert(null == i.prev());
      assert('<em>' == format(i));
      assert('whatever' == format(i.next(), i));
      assert('</em>' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('<strong>' == format(i.next(), i));
      assert('</strong>' == format(i.next(), i));
      assert(null == i.next());
      assert(null == i.next());
      assert('</strong>' == format(i));
    });

    it('should support roots to limit iterator (closing)', function() {
      i = iterator(article.lastChild, article).closing();
      assert('</strong>' == format(i));
      assert(null == i.next());
      assert(null == i.next());
      assert('<strong>' == format(i.prev(), i));
      assert('omg' == format(i.prev(), i));
      assert('</em>' == format(i.prev(), i));
      assert('whatever' == format(i.prev(), i));
      assert('<em>' == format(i.prev(), i));
      assert(null == i.prev());
      assert(null == i.prev());
      assert('<em>' == format(i));
    });

    it('should not throw an Error when given a falsey DOM node', function() {
      var dom = parse('<blockquote></blockquote>');
      var it = iterator(dom.firstChild, dom);
      assert(null == it.next());
    });
  });

  describe('atOpening() & atClosing()', function() {
    it('should accurately return atOpening() or atClosing()', function() {
      i = iterator(dom);
      assert(i.atOpening());
      i.next(); // hi
      assert(i.atOpening());
      i.next(); // article
      assert(i.atOpening());
      i.next(); // em
      assert(i.atOpening());
      i.next(); // whatever
      assert(i.atOpening());
      i.next(); // /em
      assert(i.atClosing());
      i.next(); // omg
      assert(i.atOpening());
      i.next(); // strong
      assert(i.atOpening());
      i.next(); // /strong
      assert(i.atClosing());
      i.next(); // /article
      assert(i.atClosing());
      i.next(); // bye
      assert(i.atOpening());
      i.next(); // /body
      assert(i.atClosing());
      i.next(); // /body
      assert(i.atClosing());
      i.next(); // /body
      assert(i.atClosing());
    });
  });

  describe('revisit(false)', function() {
    it('from top: should ignore the element if you pass it again', function() {
      i = iterator(dom).revisit(false);
      assert('<body>' == format(i));
      assert('hi' == format(i.next(), i));
      assert('<article>' == format(i.next(), i));
      assert('<em>' == format(i.next(), i));
      assert('whatever' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('<strong>' == format(i.next(), i));
      assert('bye' == format(i.next(), i));
      assert(null == i.next());
      assert(null == i.next());
      assert(null == i.next());
      assert('bye' == format(i));
      assert('</article>' == format(i.prev(), i));
      assert('</strong>' == format(i.prev(), i));
      assert('omg' == format(i.prev(), i));
    });

    it('from bottom: should ignore the element if you pass it again', function() {
      i = iterator(dom).revisit(false).closing();
      assert('</body>' == format(i));
      assert('bye' == format(i.prev(), i));
      assert('</article>' == format(i.prev(), i));
      assert('</strong>' == format(i.prev(), i));
      assert('omg' == format(i.prev(), i));
      assert('</em>' == format(i.prev(), i));
      assert('whatever' == format(i.prev(), i));
      assert('hi' == format(i.prev(), i));
      assert(null == i.prev());
      assert(null == i.prev());
      assert(null == i.prev());
      assert('hi' == format(i));
      assert('<article>' == format(i.next(), i));
      assert('<em>' == format(i.next(), i));
      assert('whatever' == format(i.next(), i));
    });
  });

  describe('peak', function() {

    it('should allow you to peak in front', function() {
      i = iterator(dom);
      assert('hi' == i.peak().nodeValue);
      assert('BODY' == i.node.nodeName);
      assert('hi' == i.next().nodeValue);
    });

    it('should allow you to peak behind', function() {
      i = iterator(article).closing();
      assert('STRONG' == i.peak(-1).nodeName);
      assert('ARTICLE' == i.node.nodeName);
      assert('STRONG' == i.prev().nodeName);
    });

    it('should allow you to peak forward multiple nodes', function() {
      i = iterator(dom);
      assert('EM' == i.peak(3).nodeName);
      assert('BODY' == i.node.nodeName);
      assert('hi' == i.next().nodeValue);
    });

    it('should allow you to peak behind multiple nodes', function() {
      i = iterator(article).closing();
      assert('omg' == i.peak(-3).nodeValue);
      assert('ARTICLE' == i.node.nodeName);
      assert('STRONG' == i.prev().nodeName);
    });
  });

  describe('it.{next,prev}(expr)', function() {
    it('should work with numbers', function() {
      i = iterator(dom);
      assert('hi' == format(i.next(3), i));
      assert('<article>' == format(i.next(1), i));
      assert('<em>' == format(i.next(1), i));
      assert('whatever' == format(i.next(3), i));
      assert('</em>' == format(i.next(1), i));
      assert('<strong>' == format(i.next(1), i));
      assert('</strong>' == format(i.next(1), i));
      assert('omg' == format(i.prev(3), i));
      assert('whatever' == format(i.prev(3), i));
      assert('hi' == format(i.prev(3), i));
    });

    it('should work with strings', function() {
      i = iterator(dom);
      assert('omg' == i.next('nodeValue == "omg"').nodeValue);
      assert('bye' == i.next('nodeType == 3 && nodeValue == "bye"').nodeValue);
      assert('omg' == i.prev('nodeType == 3 && nodeValue == "omg"').nodeValue);
      assert('BODY' == i.prev('nodeType == 1 && nodeName == "BODY"').nodeName);
      assert(null == i.prev('nodeType == 1 && nodeName == "BODY"'));
      assert('<body>' == format(i));
    });

    it('should work with functions', function() {
      i = iterator(dom);
      assert('omg' == i.next(function(node) { return node.nodeValue == 'omg'; }).nodeValue);
      assert('BODY' == i.prev(function(node) { return node.nodeName == 'BODY'; }).nodeName);
    });
  });

  describe('it.select(expr)', function() {
    it('should work with numbers', function() {
      i = iterator(dom)
        .select(3)
        .select(8);

      assert('<body>' == format(i));
      assert('hi' == format(i.next(), i));
      assert('whatever' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('bye' == format(i.next(), i));
      assert(null == i.next());
      assert('bye' == format(i));
      assert('omg' == format(i.prev(), i));
      assert('whatever' == format(i.prev(), i));
      assert('hi' == format(i.prev(), i));
      assert(null == i.prev());
      assert('hi' == format(i));
    });

    it('should work with strings', function() {
      i = iterator(dom)
        .select('nodeValue == "omg"')
        .select('nodeName == "ARTICLE"');

      assert('<body>' == format(i));
      assert('<article>' == format(i.next(), i));
      assert('omg' == format(i.next(), i));
      assert('</article>' == format(i.next(), i));
      assert(null == i.next());
      assert('</article>' == format(i));
    });
  });

describe('it.reject(expr)', function() {
  it('should work with numbers', function() {
    i = iterator(dom)
      .reject(1)
      .reject(8);

    assert('<body>' == format(i));
    assert('hi' == format(i.next(), i));
    assert('whatever' == format(i.next(), i));
    assert('omg' == format(i.next(), i));
    assert('bye' == format(i.next(), i));
    assert(null == i.next());
    assert('bye' == format(i));
    assert('omg' == format(i.prev(), i));
    assert('whatever' == format(i.prev(), i));
    assert('hi' == format(i.prev(), i));
    assert(null == i.prev());
    assert('hi' == format(i));
  });

  it('should work with strings', function() {
    i = iterator(dom)
      .reject('nodeValue == "omg"')
      .reject('nodeName == "ARTICLE"');

    assert('<body>' == format(i));
    assert('hi' == format(i.next(), i));
    assert('<em>' == format(i.next(), i));
    assert('whatever' == format(i.next(), i));
    assert('</em>' == format(i.next(), i));
    assert('<strong>' == format(i.next(), i));
    assert('</strong>' == format(i.next(), i));
    assert('bye' == format(i.next(), i));
    assert('</body>' == format(i.next(), i));
    assert(null == i.next());
    assert(null == i.next());
    assert(null == i.next());
    assert('</body>' == format(i));
    assert('bye' == format(i.prev(), i));
    assert('</strong>' == format(i.prev(), i));
  });
});

  function format(node, it) {
    if (arguments.length == 1) it = node, node = it.node;
    var name = node.nodeName.toLowerCase();
    var type = node.nodeType;
    var closing = it.atClosing();
    var out = null;

    if (3 == type) {
      out = node.nodeValue;
    } else if (1 == type) {
      out = it.atClosing() ? '</' + name + '>' : '<' + name + '>';
    }

    return out;
  }

});
