"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getImageMetadata = getImageMetadata;
exports.generateImageData = generateImageData;

var _utils = require("./utils");

var _ = require(".");

var _safeSharp = _interopRequireDefault(require("./safe-sharp"));

var _pluginOptions = require("./plugin-options");

var _reportError = require("./report-error");

/* eslint-disable no-unused-expressions */
const DEFAULT_BLURRED_IMAGE_WIDTH = 20;
const DEFAULT_BREAKPOINTS = [750, 1080, 1366, 1920];
const metadataCache = new Map();

async function getImageMetadata(file, getDominantColor) {
  if (!getDominantColor) {
    // If we don't need the dominant color we can use the cheaper size function
    const {
      width,
      height,
      type
    } = await (0, _.getImageSizeAsync)(file);
    return {
      width,
      height,
      format: type
    };
  }

  let metadata = metadataCache.get(file.internal.contentDigest);

  if (metadata && process.env.NODE_ENV !== `test`) {
    return metadata;
  }

  try {
    const pipeline = (0, _safeSharp.default)(file.absolutePath);
    const {
      width,
      height,
      density,
      format
    } = await pipeline.metadata();
    const {
      dominant
    } = await pipeline.stats(); // Fallback in case sharp doesn't support dominant

    const dominantColor = dominant ? (0, _utils.rgbToHex)(dominant.r, dominant.g, dominant.b) : `#000000`;
    metadata = {
      width,
      height,
      density,
      format,
      dominantColor
    };
    metadataCache.set(file.internal.contentDigest, metadata);
  } catch (err) {
    (0, _reportError.reportError)(`Failed to process image ${file.absolutePath}`, err);
    return {};
  }

  return metadata;
}

function normalizeFormat(format) {
  if (format === `jpeg`) {
    return `jpg`;
  }

  return format;
}

async function generateImageData({
  file,
  args,
  pathPrefix,
  reporter,
  cache
}) {
  args = (0, _pluginOptions.mergeDefaults)(args);
  const {
    layout = `constrained`,
    placeholder = `dominantColor`,
    tracedSVGOptions = {},
    transformOptions = {},
    quality,
    backgroundColor
  } = args;
  args.formats = args.formats || [`auto`, `webp`];

  if (layout === `fullWidth`) {
    var _args$breakpoints;

    args.breakpoints = (_args$breakpoints = args.breakpoints) !== null && _args$breakpoints !== void 0 && _args$breakpoints.length ? args.breakpoints : DEFAULT_BREAKPOINTS;
  }

  const {
    fit = `cover`,
    cropFocus = _safeSharp.default.strategy.attention,
    duotone
  } = transformOptions;

  if (duotone && (!duotone.highlight || !duotone.shadow)) {
    reporter.warn(`Invalid duotone option specified for ${file.absolutePath}, ignoring. Please pass an object to duotone with the keys "highlight" and "shadow" set to the corresponding hex values you want to use.`);
  }

  const metadata = await getImageMetadata(file, placeholder === `dominantColor`);

  if ((args.width || args.height) && layout === `fullWidth`) {
    reporter.warn(`Specifying fullWidth images will ignore the width and height arguments, you may want a constrained image instead. Otherwise, use the breakpoints argument.`);
    args.width = metadata === null || metadata === void 0 ? void 0 : metadata.width;
    args.height = undefined;
  }

  if (!args.width && !args.height && metadata.width) {
    args.width = metadata.width;
  }

  if (args.aspectRatio) {
    if (args.width && args.height) {
      reporter.warn(`Specifying aspectRatio along with both width and height will cause aspectRatio to be ignored.`);
    } else if (args.width) {
      args.height = args.width / args.aspectRatio;
    } else if (args.height) {
      args.width = args.height * args.aspectRatio;
    }
  }

  const formats = new Set(args.formats);
  let useAuto = formats.has(``) || formats.has(`auto`) || formats.size === 0;

  if (formats.has(`jpg`) && formats.has(`png`)) {
    reporter.warn(`Specifying both "jpg" and "png" formats is not supported and will be ignored. Please use "auto" instead.`);
    useAuto = true;
  }

  let primaryFormat;

  if (useAuto) {
    primaryFormat = normalizeFormat((metadata === null || metadata === void 0 ? void 0 : metadata.format) || file.extension);
  } else if (formats.has(`png`)) {
    primaryFormat = `png`;
  } else if (formats.has(`jpg`)) {
    primaryFormat = `jpg`;
  } else if (formats.has(`webp`)) {
    primaryFormat = `webp`;
  } else if (formats.has(`avif`)) {
    reporter.warn(`Image ${file.relativePath} specified only AVIF format, with no fallback format. This will mean your site cannot be viewed in all browsers.`);
    primaryFormat = `avif`;
  }

  const optionsMap = {
    jpg: args.jpgOptions,
    png: args.pngOptions,
    webp: args.webpOptions,
    avif: args.avifOptions
  };
  const options = primaryFormat ? optionsMap[primaryFormat] : undefined;
  const imageSizes = (0, _utils.calculateImageSizes)({
    file,
    layout,
    ...args,
    imgDimensions: metadata,
    reporter
  });
  const sharedOptions = {
    quality,
    ...transformOptions,
    fit,
    cropFocus,
    background: backgroundColor
  };
  const transforms = imageSizes.sizes.map(outputWidth => {
    const width = Math.round(outputWidth);
    const transform = (0, _pluginOptions.createTransformObject)({ ...sharedOptions,
      ...options,
      width,
      height: Math.round(width / imageSizes.aspectRatio),
      toFormat: primaryFormat
    });

    if (pathPrefix) {
      transform.pathPrefix = pathPrefix;
    }

    return transform;
  });
  const images = (0, _.batchQueueImageResizing)({
    file,
    transforms,
    reporter
  });
  const srcSet = (0, _utils.getSrcSet)(images);
  const sizes = args.sizes || (0, _utils.getSizes)(imageSizes.unscaledWidth, layout);
  const primaryIndex = layout === `fullWidth` ? imageSizes.sizes.length - 1 // The largest image
  : imageSizes.sizes.findIndex(size => size === Math.round(imageSizes.unscaledWidth));

  if (primaryIndex === -1) {
    reporter.error(`No image of the specified size found. Images may not have been processed correctly.`);
    return undefined;
  }

  const primaryImage = images[primaryIndex];

  if (!(images !== null && images !== void 0 && images.length)) {
    return undefined;
  }

  const imageProps = {
    layout,
    placeholder: undefined,
    backgroundColor,
    images: {
      fallback: {
        src: primaryImage.src,
        srcSet,
        sizes
      },
      sources: []
    }
  };

  if (primaryFormat !== `avif` && formats.has(`avif`)) {
    var _imageProps$images$so;

    const transforms = imageSizes.sizes.map(outputWidth => {
      const width = Math.round(outputWidth);
      const transform = (0, _pluginOptions.createTransformObject)({ ...sharedOptions,
        ...args.avifOptions,
        width,
        height: Math.round(width / imageSizes.aspectRatio),
        toFormat: `avif`
      });

      if (pathPrefix) {
        transform.pathPrefix = pathPrefix;
      }

      return transform;
    });
    const avifImages = (0, _.batchQueueImageResizing)({
      file,
      transforms,
      reporter
    });
    (_imageProps$images$so = imageProps.images.sources) === null || _imageProps$images$so === void 0 ? void 0 : _imageProps$images$so.push({
      srcSet: (0, _utils.getSrcSet)(avifImages),
      type: `image/avif`,
      sizes
    });
  }

  if (primaryFormat !== `webp` && formats.has(`webp`)) {
    var _imageProps$images$so2;

    const transforms = imageSizes.sizes.map(outputWidth => {
      const width = Math.round(outputWidth);
      const transform = (0, _pluginOptions.createTransformObject)({ ...sharedOptions,
        ...args.webpOptions,
        width,
        height: Math.round(width / imageSizes.aspectRatio),
        toFormat: `webp`
      });

      if (pathPrefix) {
        transform.pathPrefix = pathPrefix;
      }

      return transform;
    });
    const webpImages = (0, _.batchQueueImageResizing)({
      file,
      transforms,
      reporter
    });
    (_imageProps$images$so2 = imageProps.images.sources) === null || _imageProps$images$so2 === void 0 ? void 0 : _imageProps$images$so2.push({
      srcSet: (0, _utils.getSrcSet)(webpImages),
      type: `image/webp`,
      sizes
    });
  }

  if (placeholder === `blurred`) {
    var _args$blurredOptions, _args$blurredOptions2;

    const placeholderWidth = ((_args$blurredOptions = args.blurredOptions) === null || _args$blurredOptions === void 0 ? void 0 : _args$blurredOptions.width) || DEFAULT_BLURRED_IMAGE_WIDTH;
    const {
      src: fallback
    } = await (0, _.base64)({
      file,
      args: { ...sharedOptions,
        ...options,
        toFormatBase64: (_args$blurredOptions2 = args.blurredOptions) === null || _args$blurredOptions2 === void 0 ? void 0 : _args$blurredOptions2.toFormat,
        width: placeholderWidth,
        height: Math.round(placeholderWidth / imageSizes.aspectRatio)
      },
      reporter
    });
    imageProps.placeholder = {
      fallback
    };
  } else if (placeholder === `tracedSVG`) {
    const fallback = await (0, _.traceSVG)({
      file,
      args: tracedSVGOptions,
      fileArgs: args,
      cache,
      reporter
    });
    imageProps.placeholder = {
      fallback
    };
  } else if (metadata !== null && metadata !== void 0 && metadata.dominantColor) {
    imageProps.backgroundColor = metadata.dominantColor;
  }

  primaryImage.aspectRatio = primaryImage.aspectRatio || 1;

  switch (layout) {
    case `fixed`:
      imageProps.width = imageSizes.presentationWidth;
      imageProps.height = imageSizes.presentationHeight;
      break;

    case `fullWidth`:
      imageProps.width = 1;
      imageProps.height = 1 / primaryImage.aspectRatio;
      break;

    case `constrained`:
      imageProps.width = args.width || primaryImage.width || 1;
      imageProps.height = (imageProps.width || 1) / primaryImage.aspectRatio;
  }

  return imageProps;
}