"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require("./constants"),
    DEFAULT_OPTIONS = _require.DEFAULT_OPTIONS,
    EMPTY_ALT = _require.EMPTY_ALT,
    imageClass = _require.imageClass,
    imageBackgroundClass = _require.imageBackgroundClass,
    imageWrapperClass = _require.imageWrapperClass;

var visitWithParents = require("unist-util-visit-parents");

var getDefinitions = require("mdast-util-definitions");

var path = require("path");

var queryString = require("query-string");

var isRelativeUrl = require("is-relative-url");

var _ = require("lodash");

var _require2 = require("gatsby-plugin-sharp"),
    fluid = _require2.fluid,
    stats = _require2.stats,
    traceSVG = _require2.traceSVG;

var Promise = require("bluebird");

var cheerio = require("cheerio");

var _require3 = require("gatsby-core-utils"),
    slash = _require3.slash;

var chalk = require("chalk"); // If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.


module.exports = function (_ref, pluginOptions) {
  var files = _ref.files,
      markdownNode = _ref.markdownNode,
      markdownAST = _ref.markdownAST,
      pathPrefix = _ref.pathPrefix,
      getNode = _ref.getNode,
      reporter = _ref.reporter,
      cache = _ref.cache,
      compiler = _ref.compiler;

  var options = _.defaults({}, pluginOptions, {
    pathPrefix: pathPrefix
  }, DEFAULT_OPTIONS);

  var findParentLinks = function findParentLinks(_ref2) {
    var children = _ref2.children;
    return children.some(function (node) {
      return node.type === "html" && !!node.value.match(/<a /) || node.type === "link";
    });
  }; // Get all the available definitions in the markdown tree


  var definitions = getDefinitions(markdownAST); // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)

  var rawHtmlNodes = [];
  visitWithParents(markdownAST, ["html", "jsx"], function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    rawHtmlNodes.push({
      node: node,
      inLink: inLink
    });
  }); // This will only work for markdown syntax image tags

  var markdownImageNodes = [];
  visitWithParents(markdownAST, ["image", "imageReference"], function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    markdownImageNodes.push({
      node: node,
      inLink: inLink
    });
  });

  var getImageInfo = function getImageInfo(uri) {
    var _queryString$parseUrl = queryString.parseUrl(uri),
        url = _queryString$parseUrl.url,
        query = _queryString$parseUrl.query;

    return {
      ext: path.extname(url).split(".").pop(),
      url: url,
      query: query
    };
  };

  var getImageCaption = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(node, overWrites) {
      var getCaptionString, captionString;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getCaptionString = function getCaptionString() {
                var captionOptions = Array.isArray(options.showCaptions) ? options.showCaptions : options.showCaptions === true ? ["title", "alt"] : false;

                if (captionOptions) {
                  for (var _iterator = _createForOfIteratorHelperLoose(captionOptions), _step; !(_step = _iterator()).done;) {
                    var option = _step.value;

                    switch (option) {
                      case "title":
                        if (node.title) {
                          return node.title;
                        }

                        break;

                      case "alt":
                        if (overWrites.alt) {
                          return overWrites.alt;
                        }

                        if (node.alt) {
                          return node.alt;
                        }

                        break;
                    }
                  }
                }

                return "";
              };

              captionString = getCaptionString();

              if (!(!options.markdownCaptions || !compiler)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", _.escape(captionString));

            case 4:
              _context.t0 = compiler;
              _context.next = 7;
              return compiler.parseString(captionString);

            case 7:
              _context.t1 = _context.sent;
              return _context.abrupt("return", _context.t0.generateHTML.call(_context.t0, _context.t1));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getImageCaption(_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image


  var generateImagesAndUpdateNode = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(node, resolve, inLink, overWrites) {
      var parentNode, imagePath, imageNode, fluidResult, originalImg, fallbackSrc, srcSet, presentationWidth, srcSplit, fileName, fileNameNoExt, defaultAlt, isEmptyAlt, alt, title, loading, imageStyle, imageTag, formatConfigs, enabledFormatConfigs, sourcesHtmlPromises, sourcesHtml, placeholderImageData, args, _require4, Potrace, argsKeys, tracedSVG, ratio, wrapperStyle, imageCaption, removeBgImage, imageStats, bgImage, rawHTML;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (overWrites === void 0) {
                overWrites = {};
              }

              // Check if this markdownNode has a File parent. This plugin
              // won't work if the image isn't hosted locally.
              parentNode = getNode(markdownNode.parent);

              if (!(parentNode && parentNode.dir)) {
                _context3.next = 6;
                break;
              }

              imagePath = slash(path.join(parentNode.dir, getImageInfo(node.url).url));
              _context3.next = 7;
              break;

            case 6:
              return _context3.abrupt("return", null);

            case 7:
              imageNode = _.find(files, function (file) {
                if (file && file.absolutePath) {
                  return file.absolutePath === imagePath;
                }

                return null;
              });

              if (!(!imageNode || !imageNode.absolutePath)) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", resolve());

            case 10:
              _context3.next = 12;
              return fluid({
                file: imageNode,
                args: options,
                reporter: reporter,
                cache: cache
              });

            case 12:
              fluidResult = _context3.sent;

              if (fluidResult) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", resolve());

            case 15:
              originalImg = fluidResult.originalImg;
              fallbackSrc = fluidResult.src;
              srcSet = fluidResult.srcSet;
              presentationWidth = fluidResult.presentationWidth; // Generate default alt tag

              srcSplit = getImageInfo(node.url).url.split("/");
              fileName = srcSplit[srcSplit.length - 1];
              fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
              defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, " ");
              isEmptyAlt = node.alt === EMPTY_ALT;
              alt = isEmptyAlt ? "" : _.escape(overWrites.alt ? overWrites.alt : node.alt ? node.alt : defaultAlt);
              title = node.title ? _.escape(node.title) : alt;
              loading = options.loading;

              if (!["lazy", "eager", "auto"].includes(loading)) {
                reporter.warn(reporter.stripIndent("\n        " + chalk.bold(loading) + " is an invalid value for the " + chalk.bold("loading") + " option. Please pass one of \"lazy\", \"eager\" or \"auto\".\n      "));
              }

              imageStyle = "\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      vertical-align: middle;\n      position: absolute;\n      top: 0;\n      left: 0;".replace(/\s*(\S+:)\s*/g, "$1"); // Create our base image tag

              imageTag = ("\n      <img\n        class=\"" + imageClass + "\"\n        alt=\"" + alt + "\"\n        title=\"" + title + "\"\n        src=\"" + fallbackSrc + "\"\n        srcset=\"" + srcSet + "\"\n        sizes=\"" + fluidResult.sizes + "\"\n        style=\"" + imageStyle + "\"\n        loading=\"" + loading + "\"\n      />\n    ").trim();
              formatConfigs = [{
                propertyName: "withAvif",
                format: "AVIF"
              }, {
                propertyName: "withWebp",
                format: "WEBP"
              }];
              enabledFormatConfigs = formatConfigs.filter(function (_ref5) {
                var propertyName = _ref5.propertyName;
                return options[propertyName];
              });

              if (!enabledFormatConfigs.length) {
                _context3.next = 40;
                break;
              }

              sourcesHtmlPromises = enabledFormatConfigs.map( /*#__PURE__*/function () {
                var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref6) {
                  var format, propertyName, formatFluidResult;
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          format = _ref6.format, propertyName = _ref6.propertyName;
                          _context2.next = 3;
                          return fluid({
                            file: imageNode,
                            args: _.defaults({
                              toFormat: format
                            }, // override options if it's an object, otherwise just pass through defaults
                            options[propertyName] === true ? {} : options[propertyName], options),
                            reporter: reporter
                          });

                        case 3:
                          formatFluidResult = _context2.sent;

                          if (formatFluidResult) {
                            _context2.next = 6;
                            break;
                          }

                          return _context2.abrupt("return", null);

                        case 6:
                          return _context2.abrupt("return", ("\n            <source\n              srcset=\"" + formatFluidResult.srcSet + "\"\n              sizes=\"" + formatFluidResult.sizes + "\"\n              type=\"" + formatFluidResult.srcSetType + "\"\n            />\n          ").trim());

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x7) {
                  return _ref7.apply(this, arguments);
                };
              }());
              _context3.next = 36;
              return Promise.all(sourcesHtmlPromises);

            case 36:
              sourcesHtml = _context3.sent.filter(function (sourceHtml) {
                return sourceHtml !== null;
              });

              if (sourcesHtml.length) {
                _context3.next = 39;
                break;
              }

              return _context3.abrupt("return", resolve());

            case 39:
              imageTag = ("\n        <picture>\n          " + sourcesHtml.join("") + "\n          <source\n            srcset=\"" + srcSet + "\"\n            sizes=\"" + fluidResult.sizes + "\"\n            type=\"" + fluidResult.srcSetType + "\"\n          />\n          <img\n            class=\"" + imageClass + "\"\n            src=\"" + fallbackSrc + "\"\n            alt=\"" + alt + "\"\n            title=\"" + title + "\"\n            loading=\"" + loading + "\"\n            style=\"" + imageStyle + "\"\n          />\n        </picture>\n      ").trim();

            case 40:
              placeholderImageData = fluidResult.base64; // if options.tracedSVG is enabled generate the traced SVG and use that as the placeholder image

              if (!options.tracedSVG) {
                _context3.next = 50;
                break;
              }

              args = typeof options.tracedSVG === "object" ? options.tracedSVG : {}; // Translate Potrace constants (e.g. TURNPOLICY_LEFT, COLOR_AUTO) to the values Potrace expects

              _require4 = require("potrace"), Potrace = _require4.Potrace;
              argsKeys = Object.keys(args);
              args = argsKeys.reduce(function (result, key) {
                var value = args[key];
                result[key] = Potrace.hasOwnProperty(value) ? Potrace[value] : value;
                return result;
              }, {});
              _context3.next = 48;
              return traceSVG({
                file: imageNode,
                args: args,
                fileArgs: args,
                cache: cache,
                reporter: reporter
              });

            case 48:
              tracedSVG = _context3.sent;
              // Escape single quotes so the SVG data can be used in inline style attribute with single quotes
              placeholderImageData = tracedSVG.replace(/'/g, "\\'");

            case 50:
              ratio = 1 / fluidResult.aspectRatio * 100 + "%";
              wrapperStyle = typeof options.wrapperStyle === "function" ? options.wrapperStyle(fluidResult) : options.wrapperStyle; // Construct new image node w/ aspect ratio placeholder

              _context3.t0 = options.showCaptions;

              if (!_context3.t0) {
                _context3.next = 57;
                break;
              }

              _context3.next = 56;
              return getImageCaption(node, overWrites);

            case 56:
              _context3.t0 = _context3.sent;

            case 57:
              imageCaption = _context3.t0;
              removeBgImage = false;

              if (!options.disableBgImageOnAlpha) {
                _context3.next = 64;
                break;
              }

              _context3.next = 62;
              return stats({
                file: imageNode,
                reporter: reporter
              });

            case 62:
              imageStats = _context3.sent;
              if (imageStats && imageStats.isTransparent) removeBgImage = true;

            case 64:
              if (options.disableBgImage) {
                removeBgImage = true;
              }

              bgImage = removeBgImage ? "" : " background-image: url('" + placeholderImageData + "'); background-size: cover;";
              rawHTML = ("\n  <span\n    class=\"" + imageBackgroundClass + "\"\n    style=\"padding-bottom: " + ratio + "; position: relative; bottom: 0; left: 0;" + bgImage + " display: block;\"\n  ></span>\n  " + imageTag + "\n  ").trim(); // Make linking to original image optional.

              if (!inLink && options.linkImagesToOriginal) {
                rawHTML = ("\n  <a\n    class=\"gatsby-resp-image-link\"\n    href=\"" + originalImg + "\"\n    style=\"display: block\"\n    target=\"_blank\"\n    rel=\"noopener\"\n  >\n    " + rawHTML + "\n  </a>\n    ").trim();
              }

              rawHTML = ("\n    <span\n      class=\"" + imageWrapperClass + "\"\n      style=\"position: relative; display: block; margin-left: auto; margin-right: auto; max-width: " + presentationWidth + "px; " + (imageCaption ? "" : wrapperStyle) + "\"\n    >\n      " + rawHTML + "\n    </span>\n    ").trim(); // Wrap in figure and use title as caption

              if (imageCaption) {
                rawHTML = ("\n  <figure class=\"gatsby-resp-image-figure\" style=\"" + wrapperStyle + "\">\n    " + rawHTML + "\n    <figcaption class=\"gatsby-resp-image-figcaption\">" + imageCaption + "</figcaption>\n  </figure>\n      ").trim();
              }

              return _context3.abrupt("return", rawHTML);

            case 71:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function generateImagesAndUpdateNode(_x3, _x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  return Promise.all( // Simple because there is no nesting in markdown
  markdownImageNodes.map(function (_ref8) {
    var node = _ref8.node,
        inLink = _ref8.inLink;
    return new Promise(function (resolve) {
      var overWrites = {};
      var refNode;

      if (!node.hasOwnProperty("url") && node.hasOwnProperty("identifier")) {
        // consider as imageReference node
        refNode = node;
        node = definitions(refNode.identifier); // pass original alt from referencing node

        overWrites.alt = refNode.alt;

        if (!node) {
          // no definition found for image reference,
          // so there's nothing for us to do.
          return resolve();
        }
      }

      var fileType = getImageInfo(node.url).ext; // Ignore gifs as we can't process them,
      // svgs as they are already responsive by definition

      if (isRelativeUrl(node.url) && fileType !== "gif" && fileType !== "svg") {
        return generateImagesAndUpdateNode(node, resolve, inLink, overWrites).then(function (rawHTML) {
          if (rawHTML) {
            // Replace the image or ref node with an inline HTML node.
            if (refNode) {
              node = refNode;
            }

            node.type = "html";
            node.value = rawHTML;
          }

          return resolve(node);
        });
      } else {
        // Image isn't relative so there's nothing for us to do.
        return resolve();
      }
    });
  })).then(function (markdownImageNodes) {
    return (// HTML image node stuff
      Promise.all( // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(function (_ref9) {
        var node = _ref9.node,
            inLink = _ref9.inLink;
        return (// eslint-disable-next-line no-async-promise-executor
          new Promise( /*#__PURE__*/function () {
            var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {
              var $, imageRefs, _i, _imageRefs, thisImg, formattedImgTag, fileType, rawHTML;

              return _regenerator.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (node.value) {
                        _context4.next = 2;
                        break;
                      }

                      return _context4.abrupt("return", resolve());

                    case 2:
                      $ = cheerio.load(node.value);

                      if (!($("img").length === 0)) {
                        _context4.next = 5;
                        break;
                      }

                      return _context4.abrupt("return", resolve());

                    case 5:
                      imageRefs = [];
                      $("img").each(function () {
                        // eslint-disable-next-line @babel/no-invalid-this
                        imageRefs.push($(this));
                      });
                      _i = 0, _imageRefs = imageRefs;

                    case 8:
                      if (!(_i < _imageRefs.length)) {
                        _context4.next = 29;
                        break;
                      }

                      thisImg = _imageRefs[_i];
                      // Get the details we need.
                      formattedImgTag = {};
                      formattedImgTag.url = thisImg.attr("src");
                      formattedImgTag.title = thisImg.attr("title");
                      formattedImgTag.alt = thisImg.attr("alt");

                      if (formattedImgTag.url) {
                        _context4.next = 16;
                        break;
                      }

                      return _context4.abrupt("return", resolve());

                    case 16:
                      fileType = getImageInfo(formattedImgTag.url).ext; // Ignore gifs as we can't process them,
                      // svgs as they are already responsive by definition

                      if (!(isRelativeUrl(formattedImgTag.url) && fileType !== "gif" && fileType !== "svg")) {
                        _context4.next = 26;
                        break;
                      }

                      _context4.next = 20;
                      return generateImagesAndUpdateNode(formattedImgTag, resolve, inLink);

                    case 20:
                      rawHTML = _context4.sent;

                      if (!rawHTML) {
                        _context4.next = 25;
                        break;
                      }

                      // Replace the image string
                      thisImg.replaceWith(rawHTML);
                      _context4.next = 26;
                      break;

                    case 25:
                      return _context4.abrupt("return", resolve());

                    case 26:
                      _i++;
                      _context4.next = 8;
                      break;

                    case 29:
                      // Replace the image node with an inline HTML node.
                      node.type = "html";
                      node.value = $("body").html(); // fix for cheerio v1

                      return _context4.abrupt("return", resolve(node));

                    case 32:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));

            return function (_x8, _x9) {
              return _ref10.apply(this, arguments);
            };
          }())
        );
      })).then(function (htmlImageNodes) {
        return markdownImageNodes.concat(htmlImageNodes).filter(function (node) {
          return !!node;
        });
      })
    );
  });
};