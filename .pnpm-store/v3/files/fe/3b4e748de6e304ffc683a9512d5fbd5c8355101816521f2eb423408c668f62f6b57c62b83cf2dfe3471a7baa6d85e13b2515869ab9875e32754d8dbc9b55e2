# MMD Parser

mmd-parser parses MMD ArrayBuffer/Strings and generates Object.


## Browser

### How to use
```
<script src="./build/mmdparser.js"></script>
<script>
  var parser = new MMDParser.Parser();

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

  function testPmd () {
    console.log('PMD parse test');
    load(
      'https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/mmd/miku/miku_v2.pmd',
      'arraybuffer',
      undefined,
      function (buffer) {
        var pmd = parser.parsePmd(buffer);
        console.log(pmd);
      }
    );
  }

  testPmd();
</script>
```

### methods
* MMDParser.Parser
  * parsePmd(buffer, leftToRight)
  * parsePmx(buffer, leftToRight)
  * parseVmd(buffer, leftToRight)
  * parseVpd(text, leftToRight)
  * mergeVmds(vmds)
  * leftToRightModel(model)
  * leftToRightVmd(vmd)
  * leftToRightVpd(vpd)


## NPM

### How to install
```
$ npm install mmd-parser
```

### How to build
```
$ npm install
$ npm run all
```

### How to load
```
require('mmd-parser');
```


## Copyright

You are allowed to use Crypton's Vocaloid(Hatsune Miku, Kagamine Rin, and so on)
stuffs (MMD models, songs, and so on) only if you follow the guideline set by
Crypton Future Media, INC. for the usage of its characters.

For detail, see http://piapro.net/en_for_creators.html
