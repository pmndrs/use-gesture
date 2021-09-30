
var props = require('..');

describe('props(str, prefix)', function(){
  it('should prefix properties', function(){
    props('foo + bar', '$.')
    .should.equal('$.foo + $.bar');

    props('[foo, bar, baz].join("foo bar baz")', '$.')
    .should.equal('[$.foo, $.bar, $.baz].join("foo bar baz")');
  })

  it('should prefix methods', function(){
    props('first() + last() + classes.join()', '$.')
    .should.equal('$.first() + $.last() + $.classes.join()');
  })

  it('should ignore global constructs', function(){
    props('Math.round(n) * JSON.stringify(blob)', '$.')
    .should.equal('Math.round($.n) * JSON.stringify($.blob)');
  })
})

describe('props(str, fn)', function(){
  it('should map properties', function(){
    props('foo + bar', function(_){ return '$.' + _ })
    .should.equal('$.foo + $.bar');

    props('[foo, bar, baz].join("foo bar baz")', function(_){ return '$.' + _ })
    .should.equal('[$.foo, $.bar, $.baz].join("foo bar baz")');
  })

  it('should map methods', function(){
    props('first() + last() + classes.join()', function(_){ return '$.' + _ })
    .should.equal('$.first() + $.last() + $.classes.join()');
  })
})
