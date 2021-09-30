# hicat :cat:

![image](https://user-images.githubusercontent.com/74385/102151429-f6ccdd80-3ec6-11eb-84a4-68358ac2bc3b.png)

`cat` with syntax highlighting. The language is auto-detected through the file
extension.

```sh
hicat index.js
```

Pipe something to `hicat`. The language will be inferred from the contents.

```sh
curl http://example.com | hicat
```

If hicat fails to detect a language, specify it using `-l LANG`.

````sh
curl http://example.com | hicat -l xml
``

[![Status](https://travis-ci.org/rstacruz/hicat.svg?branch=master)](https://travis-ci.org/rstacruz/hicat)

## Installation

```sh
npm install -g hicat
````

[![npm version](https://badge.fury.io/js/hicat.svg)](https://npmjs.org/package/hicat "View this project on npm")

Usage:

    $ hicat --help

      Usage:
          hicat [options] FILE
          ... | hicat [options]

      Options:
          -h, --help         print usage information
          -v, --version      show version info and exit
          -l, --lang LANG    use a given language
              --languages    list available languages
              --no-pager     disable the pager

## Tips and tricks

Add an alias to your `~/.bashrc` to save a few keystrokes.

```sh
alias hi=hicat
```

## Btw

[highlight.js] powers the syntax highlighter engine.

## Thanks

**hicat** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[mit license]: https://mit-license.org/
[contributors]: https://github.com/rstacruz/hicat/contributors
[highlight.js]: https://highlightjs.org
