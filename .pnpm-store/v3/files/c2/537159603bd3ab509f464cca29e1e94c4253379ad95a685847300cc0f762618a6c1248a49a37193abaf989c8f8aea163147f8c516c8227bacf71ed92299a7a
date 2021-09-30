/**
 * Module Dependencies
 */

var direction = process.argv[2] || 'next';
var html = '<body>hi<article><em>whatever</em>omg<strong></strong></article>bye</body>';
var parser = require('mini-html-parser');
var dom = parser(html).parse();
var iterator = require('./');
var chalk = require('chalk');
var current = chalk.cyan.underline.bold;
var method = chalk.green.bold;

process.stdout.write('\u001B[2J\u001B[0;0f');

var it = iterator(dom).revisit(false);
!!process.argv[2] ? it.closing() : it.opening();
color(it);

traverse(direction);

function traverse(dir) {
  var dirs = [].slice.call(arguments);
  var remaining = dirs.pop();
  var limit = 100;
  var node;

  if (!dirs.length) {
    node = it[remaining]();
    if (node) color(it, remaining)
  }

  for (var i = 0, len = dirs.length; i < len; i++) {
    node = it[dirs[i]]();
    color(it, dir[i]);
  };

  while (node && limit--) {
    node = it[remaining]();
    if (node) color(it, remaining);
  }
}

function color(it, dir) {
  var node = it.node || it.node;
  var type = node.nodeType;
  var name = node.nodeName.toLowerCase();
  var out = '';

  if (3 == type) {
    out = node.nodeValue;
  } else if (1 == type) {
    out = it.atClosing() ? '</' + name + '>' : '<' + name + '>';
  }

  var prefix = !dir ? '  it.node: ' : 'it.' + dir + '(): ';
  console.log(method(prefix) + html.replace(out, current(out)));

  return true;
}



