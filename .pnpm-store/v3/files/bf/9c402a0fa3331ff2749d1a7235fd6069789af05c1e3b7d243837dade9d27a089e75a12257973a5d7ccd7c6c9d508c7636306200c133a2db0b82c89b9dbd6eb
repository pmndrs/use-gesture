var urljoin = require('../lib/url-join');

describe('url join', function () {
  it('should work for simple case', function () {
    urljoin('http://www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should work for simple case with new syntax', function () {
    urljoin(['http://www.google.com/', 'foo/bar', '?test=123'])
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should work for hashbang urls', function () {
    urljoin(['http://www.google.com', '#!', 'foo/bar', '?test=123'])
      .should.eql('http://www.google.com/#!/foo/bar?test=123');
  });

  it('should be able to join protocol', function () {
    urljoin('http:', 'www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should be able to join protocol with slashes', function () {
    urljoin('http://', 'www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should remove extra slashes', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should support anchors in urls', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa')
      .should.eql('http://www.google.com/foo/bar?test=123#faaaaa');
  });

  it('should support protocol-relative urls', function () {
    urljoin('//www.google.com', 'foo/bar', '?test=123')
      .should.eql('//www.google.com/foo/bar?test=123')
  });

  it('should merge multiple query params properly', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?key=456')
      .should.eql('http://www.google.com/foo/bar?test=123&key=456');

    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?boom=value', '&key=456')
      .should.eql('http://www.google.com/foo/bar?test=123&boom=value&key=456');
  });
});
