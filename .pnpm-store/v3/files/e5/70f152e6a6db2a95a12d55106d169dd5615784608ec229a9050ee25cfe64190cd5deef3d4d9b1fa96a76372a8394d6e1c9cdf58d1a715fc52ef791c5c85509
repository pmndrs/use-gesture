"use strict";

exports.__esModule = true;
exports.TransformOptionsType = exports.PotraceType = exports.PotraceTurnPolicyType = exports.DuotoneGradientType = exports.AVIFOptionsType = exports.WebPOptionsType = exports.BlurredOptionsType = exports.JPGOptionsType = exports.PNGOptionsType = exports.ImageCropFocusType = exports.ImageFitType = exports.ImagePlaceholderType = exports.ImageLayoutType = exports.ImageFormatType = void 0;

var _graphql = require("gatsby/graphql");

var _potrace = require("potrace");

const sharp = require(`./safe-sharp`);

const DEFAULT_PNG_COMPRESSION_SPEED = 4;
const ImageFormatType = new _graphql.GraphQLEnumType({
  name: `ImageFormat`,
  values: {
    NO_CHANGE: {
      value: ``
    },
    AUTO: {
      value: ``
    },
    JPG: {
      value: `jpg`
    },
    PNG: {
      value: `png`
    },
    WEBP: {
      value: `webp`
    },
    AVIF: {
      value: `avif`
    }
  }
});
exports.ImageFormatType = ImageFormatType;
const ImageLayoutType = new _graphql.GraphQLEnumType({
  name: `ImageLayout`,
  values: {
    FIXED: {
      value: `fixed`
    },
    FULL_WIDTH: {
      value: `fullWidth`
    },
    CONSTRAINED: {
      value: `constrained`
    }
  }
});
exports.ImageLayoutType = ImageLayoutType;
const ImagePlaceholderType = new _graphql.GraphQLEnumType({
  name: `ImagePlaceholder`,
  values: {
    DOMINANT_COLOR: {
      value: `dominantColor`
    },
    TRACED_SVG: {
      value: `tracedSVG`
    },
    BLURRED: {
      value: `blurred`
    },
    NONE: {
      value: `none`
    }
  }
});
exports.ImagePlaceholderType = ImagePlaceholderType;
const ImageFitType = new _graphql.GraphQLEnumType({
  name: `ImageFit`,
  values: {
    COVER: {
      value: sharp.fit.cover
    },
    CONTAIN: {
      value: sharp.fit.contain
    },
    FILL: {
      value: sharp.fit.fill
    },
    INSIDE: {
      value: sharp.fit.inside
    },
    OUTSIDE: {
      value: sharp.fit.outside
    }
  }
});
exports.ImageFitType = ImageFitType;
const ImageCropFocusType = new _graphql.GraphQLEnumType({
  name: `ImageCropFocus`,
  values: {
    CENTER: {
      value: sharp.gravity.center
    },
    NORTH: {
      value: sharp.gravity.north
    },
    NORTHEAST: {
      value: sharp.gravity.northeast
    },
    EAST: {
      value: sharp.gravity.east
    },
    SOUTHEAST: {
      value: sharp.gravity.southeast
    },
    SOUTH: {
      value: sharp.gravity.south
    },
    SOUTHWEST: {
      value: sharp.gravity.southwest
    },
    WEST: {
      value: sharp.gravity.west
    },
    NORTHWEST: {
      value: sharp.gravity.northwest
    },
    ENTROPY: {
      value: sharp.strategy.entropy
    },
    ATTENTION: {
      value: sharp.strategy.attention
    }
  }
});
exports.ImageCropFocusType = ImageCropFocusType;
const PNGOptionsType = new _graphql.GraphQLInputObjectType({
  name: `PNGOptions`,
  fields: () => {
    return {
      quality: {
        type: _graphql.GraphQLInt
      },
      compressionSpeed: {
        type: _graphql.GraphQLInt,
        defaultValue: DEFAULT_PNG_COMPRESSION_SPEED
      }
    };
  }
});
exports.PNGOptionsType = PNGOptionsType;
const JPGOptionsType = new _graphql.GraphQLInputObjectType({
  name: `JPGOptions`,
  fields: () => {
    return {
      quality: {
        type: _graphql.GraphQLInt
      },
      progressive: {
        type: _graphql.GraphQLBoolean,
        defaultValue: true
      }
    };
  }
});
exports.JPGOptionsType = JPGOptionsType;
const BlurredOptionsType = new _graphql.GraphQLInputObjectType({
  name: `BlurredOptions`,
  fields: () => {
    return {
      width: {
        type: _graphql.GraphQLInt,
        description: `Width of the generated low-res preview. Default is 20px`
      },
      toFormat: {
        type: ImageFormatType,
        description: `Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this`
      }
    };
  }
});
exports.BlurredOptionsType = BlurredOptionsType;
const WebPOptionsType = new _graphql.GraphQLInputObjectType({
  name: `WebPOptions`,
  fields: () => {
    return {
      quality: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
exports.WebPOptionsType = WebPOptionsType;
const AVIFOptionsType = new _graphql.GraphQLInputObjectType({
  name: `AVIFOptions`,
  fields: () => {
    return {
      quality: {
        type: _graphql.GraphQLInt
      },
      lossless: {
        type: _graphql.GraphQLBoolean
      },
      speed: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
exports.AVIFOptionsType = AVIFOptionsType;
const DuotoneGradientType = new _graphql.GraphQLInputObjectType({
  name: `DuotoneGradient`,
  fields: () => {
    return {
      highlight: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      shadow: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      opacity: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
exports.DuotoneGradientType = DuotoneGradientType;
const PotraceTurnPolicyType = new _graphql.GraphQLEnumType({
  name: `PotraceTurnPolicy`,
  values: {
    TURNPOLICY_BLACK: {
      value: _potrace.Potrace.TURNPOLICY_BLACK
    },
    TURNPOLICY_WHITE: {
      value: _potrace.Potrace.TURNPOLICY_WHITE
    },
    TURNPOLICY_LEFT: {
      value: _potrace.Potrace.TURNPOLICY_LEFT
    },
    TURNPOLICY_RIGHT: {
      value: _potrace.Potrace.TURNPOLICY_RIGHT
    },
    TURNPOLICY_MINORITY: {
      value: _potrace.Potrace.TURNPOLICY_MINORITY
    },
    TURNPOLICY_MAJORITY: {
      value: _potrace.Potrace.TURNPOLICY_MAJORITY
    }
  }
});
exports.PotraceTurnPolicyType = PotraceTurnPolicyType;
const PotraceType = new _graphql.GraphQLInputObjectType({
  name: `Potrace`,
  fields: () => {
    return {
      turnPolicy: {
        type: PotraceTurnPolicyType
      },
      turdSize: {
        type: _graphql.GraphQLFloat
      },
      alphaMax: {
        type: _graphql.GraphQLFloat
      },
      optCurve: {
        type: _graphql.GraphQLBoolean
      },
      optTolerance: {
        type: _graphql.GraphQLFloat
      },
      threshold: {
        type: _graphql.GraphQLInt
      },
      blackOnWhite: {
        type: _graphql.GraphQLBoolean
      },
      color: {
        type: _graphql.GraphQLString
      },
      background: {
        type: _graphql.GraphQLString
      }
    };
  }
});
exports.PotraceType = PotraceType;
const TransformOptionsType = new _graphql.GraphQLInputObjectType({
  name: `TransformOptions`,
  fields: () => {
    return {
      grayscale: {
        type: _graphql.GraphQLBoolean,
        defaultValue: false
      },
      duotone: {
        type: DuotoneGradientType,
        defaultValue: false
      },
      rotate: {
        type: _graphql.GraphQLInt,
        defaultValue: 0
      },
      trim: {
        type: _graphql.GraphQLFloat,
        defaultValue: false
      },
      cropFocus: {
        type: ImageCropFocusType,
        defaultValue: sharp.strategy.attention
      },
      fit: {
        type: ImageFitType,
        defaultValue: sharp.fit.cover
      }
    };
  }
});
exports.TransformOptionsType = TransformOptionsType;