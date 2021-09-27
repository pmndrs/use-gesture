var MMDParser = require('../build/mmdparser');
var CharsetEncoder = require('charset-encoder-js').CharsetEncoder;
var parser = new MMDParser.Parser();
var encoder = new CharsetEncoder();
var pmdUrl = 'https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/mmd/miku/miku_v2.pmd';
var vmdUrl = 'https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/mmd/vmds/wavefile_v2.vmd';
var vpdUrl = 'https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/mmd/vpds/01.vpd';
var XMLHttpRequest = require('xhr2').XMLHttpRequest;

function load (url, responseType, mimeType, onLoad, onProgress, onError) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.addEventListener('load', function (event) {
    var response = event.target.response;
    if (this.status === 200) {
      onLoad(response);
    } else if (this.status === 0) {
      console.warn('HTTP Status 0 received.');
      onLoad(response);
    } else {
      console.warn('HTTP Status ' + this.status + ' received.');
      onError(event);
    }
  }, false);
  if (onProgress !== undefined) request.addEventListener('progress', onProgress, false);
  if (onError !== undefined) request.addEventListener('error', onError, false);
  request.responseType = responseType;
  if (mimeType !== undefined) request.overrideMimeType(mimeType)
  request.send(null);
  console.log('downloading: ' + url);
}

function onProgress (event) {
  if (event.lengthComputable) {
    var percentComplete = event.loaded / event.total * 100;
    //console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
}

function onError (event) {
  console.error('downloading has failed.');
  console.log(event);
}

function testPmd () {
  console.log('PMD parse test');
  load(
    pmdUrl,
    'arraybuffer',
    undefined,
    function (buffer) {
      var pmd = parser.parsePmd(buffer);
      console.log(pmd.metadata);
      console.log('');
      testVmd();
    }
  );
}

function testVmd () {
  console.log('VMD parse test');
  load(
    vmdUrl,
    'arraybuffer',
    undefined,
    function (buffer) {
      var vmd = parser.parseVmd(buffer);
      console.log(vmd.metadata);
      console.log('');
      testVpd();
    }
  );
}

function testVpd () {
  console.log('VPD parse test');
  load(
    vpdUrl,
    'arraybuffer',
    undefined,
    function (buffer) {
      var text = encoder.s2u(new Uint8Array(buffer));
      var vpd = parser.parseVpd(text);
      console.log(vpd.metadata);
      console.log('');
    }
  );
}

testPmd();
