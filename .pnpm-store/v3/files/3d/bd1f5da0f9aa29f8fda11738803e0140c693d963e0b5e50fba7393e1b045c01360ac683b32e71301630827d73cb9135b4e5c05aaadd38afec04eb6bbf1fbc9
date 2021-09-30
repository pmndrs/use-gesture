(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("iq", [], factory);
	else if(typeof exports === 'object')
		exports["iq"] = factory();
	else
		root["iq"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * iq.ts - Image Quantization Library
	 */
	var constants = __webpack_require__(1);
	exports.constants = constants;
	var conversion = __webpack_require__(3);
	exports.conversion = conversion;
	var distance = __webpack_require__(12);
	exports.distance = distance;
	var palette = __webpack_require__(20);
	exports.palette = palette;
	var image = __webpack_require__(30);
	exports.image = image;
	var quality = __webpack_require__(35);
	exports.quality = quality;
	var utils = __webpack_require__(37);
	exports.utils = utils;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * constants.ts - part of Image Quantization Library
	 */
	var bt709 = __webpack_require__(2);
	exports.bt709 = bt709;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * constants.ts - part of Image Quantization Library
	 */
	"use strict";
	/**
	 * sRGB (based on ITU-R Recommendation BT.709)
	 * http://en.wikipedia.org/wiki/SRGB
	 */
	var Y;
	(function (Y) {
	    Y[Y["RED"] = 0.2126] = "RED";
	    Y[Y["GREEN"] = 0.7152] = "GREEN";
	    Y[Y["BLUE"] = 0.0722] = "BLUE";
	    Y[Y["WHITE"] = 1] = "WHITE";
	})(Y || (Y = {}));
	exports.Y = Y;
	var x;
	(function (x) {
	    x[x["RED"] = 0.64] = "RED";
	    x[x["GREEN"] = 0.3] = "GREEN";
	    x[x["BLUE"] = 0.15] = "BLUE";
	    x[x["WHITE"] = 0.3127] = "WHITE";
	})(x || (x = {}));
	exports.x = x;
	var y;
	(function (y) {
	    y[y["RED"] = 0.33] = "RED";
	    y[y["GREEN"] = 0.6] = "GREEN";
	    y[y["BLUE"] = 0.06] = "BLUE";
	    y[y["WHITE"] = 0.329] = "WHITE";
	})(y || (y = {}));
	exports.y = y;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * iq.ts - Image Quantization Library
	 */
	var rgb2xyz_1 = __webpack_require__(4);
	exports.rgb2xyz = rgb2xyz_1.rgb2xyz;
	var rgb2hsl_1 = __webpack_require__(5);
	exports.rgb2hsl = rgb2hsl_1.rgb2hsl;
	var rgb2lab_1 = __webpack_require__(7);
	exports.rgb2lab = rgb2lab_1.rgb2lab;
	var lab2xyz_1 = __webpack_require__(9);
	exports.lab2xyz = lab2xyz_1.lab2xyz;
	var lab2rgb_1 = __webpack_require__(10);
	exports.lab2rgb = lab2rgb_1.lab2rgb;
	var xyz2lab_1 = __webpack_require__(8);
	exports.xyz2lab = xyz2lab_1.xyz2lab;
	var xyz2rgb_1 = __webpack_require__(11);
	exports.xyz2rgb = xyz2rgb_1.xyz2rgb;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * rgb2xyz.ts - part of Image Quantization Library
	 */
	function correctGamma(n) {
	    return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
	}
	function rgb2xyz(r, g, b) {
	    // gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
	    r = correctGamma(r / 255);
	    g = correctGamma(g / 255);
	    b = correctGamma(b / 255);
	    // Observer. = 2°, Illuminant = D65
	    return {
	        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
	        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
	        z: r * 0.0193 + g * 0.1192 + b * 0.9505
	    };
	}
	exports.rgb2xyz = rgb2xyz;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * rgb2hsl.ts - part of Image Quantization Library
	 */
	var arithmetic_1 = __webpack_require__(6);
	/**
	 * Calculate HSL from RGB
	 * Hue is in degrees [0..360]
	 * Lightness: [0..1]
	 * Saturation: [0..1]
	 * http://web.archive.org/web/20060914040436/http://local.wasp.uwa.edu.au/~pbourke/colour/hsl/
	 */
	function rgb2hsl(r, g, b) {
	    var min = arithmetic_1.min3(r, g, b), max = arithmetic_1.max3(r, g, b), delta = max - min, l = (min + max) / 510;
	    var s = 0;
	    if (l > 0 && l < 1)
	        s = delta / (l < 0.5 ? (max + min) : (510 - max - min));
	    var h = 0;
	    if (delta > 0) {
	        if (max === r) {
	            h = (g - b) / delta;
	        }
	        else if (max === g) {
	            h = (2 + (b - r) / delta);
	        }
	        else {
	            h = (4 + (r - g) / delta);
	        }
	        h *= 60;
	        if (h < 0)
	            h += 360;
	    }
	    return { h: h, s: s, l: l };
	}
	exports.rgb2hsl = rgb2hsl;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	function degrees2radians(n) {
	    return n * (Math.PI / 180);
	}
	exports.degrees2radians = degrees2radians;
	function max3(a, b, c) {
	    var m = a;
	    (m < b) && (m = b);
	    (m < c) && (m = c);
	    return m;
	}
	exports.max3 = max3;
	function min3(a, b, c) {
	    var m = a;
	    (m > b) && (m = b);
	    (m > c) && (m = c);
	    return m;
	}
	exports.min3 = min3;
	function intInRange(value, low, high) {
	    if (value > high)
	        value = high;
	    if (value < low)
	        value = low;
	    return value | 0;
	}
	exports.intInRange = intInRange;
	function inRange0to255Rounded(n) {
	    n = Math.round(n);
	    if (n > 255)
	        n = 255;
	    else if (n < 0)
	        n = 0;
	    return n;
	}
	exports.inRange0to255Rounded = inRange0to255Rounded;
	function inRange0to255(n) {
	    if (n > 255)
	        n = 255;
	    else if (n < 0)
	        n = 0;
	    return n;
	}
	exports.inRange0to255 = inRange0to255;
	function stableSort(arrayToSort, callback) {
	    var type = typeof arrayToSort[0];
	    var sorted;
	    if (type === "number" || type === "string") {
	        var ord_1 = Object.create(null);
	        for (var i = 0, l = arrayToSort.length; i < l; i++) {
	            var val = arrayToSort[i];
	            if (ord_1[val] || ord_1[val] === 0)
	                continue;
	            ord_1[val] = i;
	        }
	        sorted = arrayToSort.sort(function (a, b) {
	            return callback(a, b) || ord_1[a] - ord_1[b];
	        });
	    }
	    else {
	        var ord2_1 = arrayToSort.slice(0);
	        sorted = arrayToSort.sort(function (a, b) {
	            return callback(a, b) || ord2_1.indexOf(a) - ord2_1.indexOf(b);
	        });
	    }
	    return sorted;
	}
	exports.stableSort = stableSort;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * rgb2lab.ts - part of Image Quantization Library
	 */
	var rgb2xyz_1 = __webpack_require__(4);
	var xyz2lab_1 = __webpack_require__(8);
	function rgb2lab(r, g, b) {
	    var xyz = rgb2xyz_1.rgb2xyz(r, g, b);
	    return xyz2lab_1.xyz2lab(xyz.x, xyz.y, xyz.z);
	}
	exports.rgb2lab = rgb2lab;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * xyz2lab.ts - part of Image Quantization Library
	 */
	var refX = 0.95047, //ref_X =  95.047   Observer= 2°, Illuminant= D65
	refY = 1.00000, //ref_Y = 100.000
	refZ = 1.08883; //ref_Z = 108.883
	function pivot(n) {
	    return n > 0.008856 ? Math.pow(n, 1 / 3) : (7.787 * n + 16 / 116);
	}
	function xyz2lab(x, y, z) {
	    x = pivot(x / refX);
	    y = pivot(y / refY);
	    z = pivot(z / refZ);
	    if ((116 * y) - 16 < 0)
	        throw new Error("xxx");
	    return {
	        L: Math.max(0, (116 * y) - 16),
	        a: 500 * (x - y),
	        b: 200 * (y - z)
	    };
	}
	exports.xyz2lab = xyz2lab;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * lab2xyz.ts - part of Image Quantization Library
	 */
	var refX = 0.95047, //ref_X =  95.047   Observer= 2°, Illuminant = D65
	refY = 1.00000, //ref_Y = 100.000
	refZ = 1.08883; //ref_Z = 108.883
	function pivot(n) {
	    return n > 0.206893034 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787;
	}
	function lab2xyz(L, a, b) {
	    var y = (L + 16) / 116, x = a / 500 + y, z = y - b / 200;
	    return {
	        x: refX * pivot(x),
	        y: refY * pivot(y),
	        z: refZ * pivot(z)
	    };
	}
	exports.lab2xyz = lab2xyz;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * lab2rgb.ts - part of Image Quantization Library
	 */
	var lab2xyz_1 = __webpack_require__(9);
	var xyz2rgb_1 = __webpack_require__(11);
	function lab2rgb(L, a, b) {
	    var xyz = lab2xyz_1.lab2xyz(L, a, b);
	    return xyz2rgb_1.xyz2rgb(xyz.x, xyz.y, xyz.z);
	}
	exports.lab2rgb = lab2rgb;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * xyz2rgb.ts - part of Image Quantization Library
	 */
	var arithmetic_1 = __webpack_require__(6);
	// gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
	function correctGamma(n) {
	    return n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n;
	}
	function xyz2rgb(x, y, z) {
	    // Observer. = 2°, Illuminant = D65
	    var r = correctGamma(x * 3.2406 + y * -1.5372 + z * -0.4986), g = correctGamma(x * -0.9689 + y * 1.8758 + z * 0.0415), b = correctGamma(x * 0.0557 + y * -0.2040 + z * 1.0570);
	    return {
	        r: arithmetic_1.inRange0to255Rounded(r * 255),
	        g: arithmetic_1.inRange0to255Rounded(g * 255),
	        b: arithmetic_1.inRange0to255Rounded(b * 255)
	    };
	}
	exports.xyz2rgb = xyz2rgb;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * iq.ts - Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	exports.AbstractDistanceCalculator = abstractDistanceCalculator_1.AbstractDistanceCalculator;
	var cie94_1 = __webpack_require__(14);
	exports.CIE94Textiles = cie94_1.CIE94Textiles;
	exports.CIE94GraphicArts = cie94_1.CIE94GraphicArts;
	var ciede2000_1 = __webpack_require__(15);
	exports.CIEDE2000 = ciede2000_1.CIEDE2000;
	var cmetric_1 = __webpack_require__(16);
	exports.CMETRIC = cmetric_1.CMETRIC;
	var euclidean_1 = __webpack_require__(17);
	exports.AbstractEuclidean = euclidean_1.AbstractEuclidean;
	exports.Euclidean = euclidean_1.Euclidean;
	exports.EuclideanRgbQuantWOAlpha = euclidean_1.EuclideanRgbQuantWOAlpha;
	exports.EuclideanRgbQuantWithAlpha = euclidean_1.EuclideanRgbQuantWithAlpha;
	var manhattan_1 = __webpack_require__(18);
	exports.AbstractManhattan = manhattan_1.AbstractManhattan;
	exports.Manhattan = manhattan_1.Manhattan;
	exports.ManhattanSRGB = manhattan_1.ManhattanSRGB;
	exports.ManhattanNommyde = manhattan_1.ManhattanNommyde;
	var pngQuant_1 = __webpack_require__(19);
	exports.PNGQUANT = pngQuant_1.PNGQUANT;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var AbstractDistanceCalculator = (function () {
	    function AbstractDistanceCalculator() {
	        this._setDefaults();
	        // set default maximal color component deltas (255 - 0 = 255)
	        this.setWhitePoint(255, 255, 255, 255);
	    }
	    AbstractDistanceCalculator.prototype.setWhitePoint = function (r, g, b, a) {
	        this._whitePoint = {
	            r: (r > 0) ? 255 / r : 0,
	            g: (g > 0) ? 255 / g : 0,
	            b: (b > 0) ? 255 / b : 0,
	            a: (a > 0) ? 255 / a : 0
	        };
	        this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
	    };
	    AbstractDistanceCalculator.prototype.calculateNormalized = function (colorA, colorB) {
	        return this.calculateRaw(colorA.r, colorA.g, colorA.b, colorA.a, colorB.r, colorB.g, colorB.b, colorB.a) / this._maxDistance;
	    };
	    AbstractDistanceCalculator.prototype._setDefaults = function () {
	    };
	    return AbstractDistanceCalculator;
	}());
	exports.AbstractDistanceCalculator = AbstractDistanceCalculator;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * cie94.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	var rgb2lab_1 = __webpack_require__(7);
	var arithmetic_1 = __webpack_require__(6);
	/**
	 * CIE94 method of delta-e
	 * http://en.wikipedia.org/wiki/Color_difference#CIE94
	 */
	var AbstractCIE94 = (function (_super) {
	    __extends(AbstractCIE94, _super);
	    function AbstractCIE94() {
	        _super.apply(this, arguments);
	    }
	    AbstractCIE94.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var lab1 = rgb2lab_1.rgb2lab(arithmetic_1.inRange0to255(r1 * this._whitePoint.r), arithmetic_1.inRange0to255(g1 * this._whitePoint.g), arithmetic_1.inRange0to255(b1 * this._whitePoint.b)), lab2 = rgb2lab_1.rgb2lab(arithmetic_1.inRange0to255(r2 * this._whitePoint.r), arithmetic_1.inRange0to255(g2 * this._whitePoint.g), arithmetic_1.inRange0to255(b2 * this._whitePoint.b));
	        var dL = lab1.L - lab2.L, dA = lab1.a - lab2.a, dB = lab1.b - lab2.b, c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b), c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b), dC = c1 - c2;
	        var deltaH = dA * dA + dB * dB - dC * dC;
	        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
	        var dAlpha = (a2 - a1) * this._whitePoint.a * this._kA;
	        // TODO: add alpha channel support
	        return Math.sqrt(Math.pow(dL / this._Kl, 2) +
	            Math.pow(dC / (1.0 + this._K1 * c1), 2) +
	            Math.pow(deltaH / (1.0 + this._K2 * c1), 2) +
	            Math.pow(dAlpha, 2));
	    };
	    return AbstractCIE94;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.AbstractCIE94 = AbstractCIE94;
	var CIE94Textiles = (function (_super) {
	    __extends(CIE94Textiles, _super);
	    function CIE94Textiles() {
	        _super.apply(this, arguments);
	    }
	    CIE94Textiles.prototype._setDefaults = function () {
	        this._Kl = 2.0;
	        this._K1 = 0.048;
	        this._K2 = 0.014;
	        this._kA = 0.25 * 50 / 255;
	    };
	    return CIE94Textiles;
	}(AbstractCIE94));
	exports.CIE94Textiles = CIE94Textiles;
	var CIE94GraphicArts = (function (_super) {
	    __extends(CIE94GraphicArts, _super);
	    function CIE94GraphicArts() {
	        _super.apply(this, arguments);
	    }
	    CIE94GraphicArts.prototype._setDefaults = function () {
	        this._Kl = 1.0;
	        this._K1 = 0.045;
	        this._K2 = 0.015;
	        this._kA = 0.25 * 100 / 255;
	    };
	    return CIE94GraphicArts;
	}(AbstractCIE94));
	exports.CIE94GraphicArts = CIE94GraphicArts;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * ciede2000.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	var rgb2lab_1 = __webpack_require__(7);
	var arithmetic_1 = __webpack_require__(6);
	/**
	 * CIEDE2000 algorithm - Adapted from Sharma et al's MATLAB implementation at
	 * http://www.ece.rochester.edu/~gsharma/ciede2000/
	 */
	var CIEDE2000 = (function (_super) {
	    __extends(CIEDE2000, _super);
	    function CIEDE2000() {
	        _super.apply(this, arguments);
	    }
	    CIEDE2000.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var lab1 = rgb2lab_1.rgb2lab(arithmetic_1.inRange0to255(r1 * this._whitePoint.r), arithmetic_1.inRange0to255(g1 * this._whitePoint.g), arithmetic_1.inRange0to255(b1 * this._whitePoint.b)), lab2 = rgb2lab_1.rgb2lab(arithmetic_1.inRange0to255(r2 * this._whitePoint.r), arithmetic_1.inRange0to255(g2 * this._whitePoint.g), arithmetic_1.inRange0to255(b2 * this._whitePoint.b)), dA = (a2 - a1) * this._whitePoint.a * CIEDE2000._kA, dE2 = this.calculateRawInLab(lab1, lab2);
	        return Math.sqrt(dE2 + dA * dA);
	    };
	    CIEDE2000.prototype.calculateRawInLab = function (Lab1, Lab2) {
	        // Get L,a,b values for color 1
	        var L1 = Lab1.L, a1 = Lab1.a, b1 = Lab1.b;
	        // Get L,a,b values for color 2
	        var L2 = Lab2.L, a2 = Lab2.a, b2 = Lab2.b;
	        // Calculate Cprime1, Cprime2, Cabbar
	        var C1 = Math.sqrt(a1 * a1 + b1 * b1), C2 = Math.sqrt(a2 * a2 + b2 * b2), pow_a_C1_C2_to_7 = Math.pow((C1 + C2) / 2.0, 7.0), G = 0.5 * (1.0 - Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + CIEDE2000._pow25to7))), //25^7
	        a1p = (1.0 + G) * a1, a2p = (1.0 + G) * a2, C1p = Math.sqrt(a1p * a1p + b1 * b1), C2p = Math.sqrt(a2p * a2p + b2 * b2), C1pC2p = C1p * C2p, 
	        // Angles in Degree.
	        h1p = CIEDE2000._calculatehp(b1, a1p), h2p = CIEDE2000._calculatehp(b2, a2p), h_bar = Math.abs(h1p - h2p), dLp = L2 - L1, dCp = C2p - C1p, dHp = CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p), ahp = CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p), T = CIEDE2000._calculateT(ahp), aCp = (C1p + C2p) / 2.0, aLp_minus_50_square = Math.pow((L1 + L2) / 2.0 - 50.0, 2.0), S_L = 1.0 + (.015 * aLp_minus_50_square) / Math.sqrt(20.0 + aLp_minus_50_square), S_C = 1.0 + .045 * aCp, S_H = 1.0 + .015 * T * aCp, R_T = CIEDE2000._calculateRT(ahp, aCp), dLpSL = dLp / S_L, // S_L * kL, where kL is 1.0
	        dCpSC = dCp / S_C, // S_C * kC, where kC is 1.0
	        dHpSH = dHp / S_H; // S_H * kH, where kH is 1.0
	        return Math.pow(dLpSL, 2) + Math.pow(dCpSC, 2) + Math.pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
	    };
	    CIEDE2000._calculatehp = function (b, ap) {
	        var hp = Math.atan2(b, ap);
	        if (hp >= 0)
	            return hp;
	        return hp + CIEDE2000._deg360InRad;
	    };
	    CIEDE2000._calculateRT = function (ahp, aCp) {
	        var aCp_to_7 = Math.pow(aCp, 7.0), R_C = 2.0 * Math.sqrt(aCp_to_7 / (aCp_to_7 + CIEDE2000._pow25to7)), // 25^7
	        delta_theta = CIEDE2000._deg30InRad * Math.exp(-Math.pow((ahp - CIEDE2000._deg275InRad) / CIEDE2000._deg25InRad, 2.0));
	        return -Math.sin(2.0 * delta_theta) * R_C;
	    };
	    CIEDE2000._calculateT = function (ahp) {
	        return 1.0 - .17 * Math.cos(ahp - CIEDE2000._deg30InRad) + .24 * Math.cos(ahp * 2.0) + .32 * Math.cos(ahp * 3.0 + CIEDE2000._deg6InRad) - .2 * Math.cos(ahp * 4.0 - CIEDE2000._deg63InRad);
	    };
	    CIEDE2000._calculate_ahp = function (C1pC2p, h_bar, h1p, h2p) {
	        var hpSum = h1p + h2p;
	        if (C1pC2p == 0)
	            return hpSum;
	        if (h_bar <= CIEDE2000._deg180InRad)
	            return hpSum / 2.0;
	        if (hpSum < CIEDE2000._deg360InRad)
	            return (hpSum + CIEDE2000._deg360InRad) / 2.0;
	        return (hpSum - CIEDE2000._deg360InRad) / 2.0;
	    };
	    CIEDE2000._calculate_dHp = function (C1pC2p, h_bar, h2p, h1p) {
	        var dhp;
	        if (C1pC2p == 0) {
	            dhp = 0;
	        }
	        else if (h_bar <= CIEDE2000._deg180InRad) {
	            dhp = h2p - h1p;
	        }
	        else if (h2p <= h1p) {
	            dhp = h2p - h1p + CIEDE2000._deg360InRad;
	        }
	        else {
	            dhp = h2p - h1p - CIEDE2000._deg360InRad;
	        }
	        return 2.0 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2.0);
	    };
	    /**
	     * Weight in distance: 0.25
	     * Max DeltaE: 100
	     * Max DeltaA: 255
	     */
	    CIEDE2000._kA = 0.25 * 100 / 255;
	    CIEDE2000._pow25to7 = Math.pow(25, 7);
	    CIEDE2000._deg360InRad = arithmetic_1.degrees2radians(360);
	    CIEDE2000._deg180InRad = arithmetic_1.degrees2radians(180);
	    CIEDE2000._deg30InRad = arithmetic_1.degrees2radians(30);
	    CIEDE2000._deg6InRad = arithmetic_1.degrees2radians(6);
	    CIEDE2000._deg63InRad = arithmetic_1.degrees2radians(63);
	    CIEDE2000._deg275InRad = arithmetic_1.degrees2radians(275);
	    CIEDE2000._deg25InRad = arithmetic_1.degrees2radians(25);
	    return CIEDE2000;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.CIEDE2000 = CIEDE2000;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * cmetric.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	/**
	 * TODO: Name it: http://www.compuphase.com/cmetric.htm
	 */
	var CMETRIC = (function (_super) {
	    __extends(CMETRIC, _super);
	    function CMETRIC() {
	        _super.apply(this, arguments);
	    }
	    CMETRIC.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var rmean = (r1 + r2) / 2 * this._whitePoint.r, r = (r1 - r2) * this._whitePoint.r, g = (g1 - g2) * this._whitePoint.g, b = (b1 - b2) * this._whitePoint.b, dE = ((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8)), dA = (a2 - a1) * this._whitePoint.a;
	        return Math.sqrt(dE + dA * dA);
	    };
	    return CMETRIC;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.CMETRIC = CMETRIC;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * euclidean.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	var bt709_1 = __webpack_require__(2);
	/**
	 * Euclidean color distance
	 */
	var AbstractEuclidean = (function (_super) {
	    __extends(AbstractEuclidean, _super);
	    function AbstractEuclidean() {
	        _super.apply(this, arguments);
	    }
	    AbstractEuclidean.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var dR = r2 - r1, dG = g2 - g1, dB = b2 - b1, dA = a2 - a1;
	        return Math.sqrt(this._kR * dR * dR + this._kG * dG * dG + this._kB * dB * dB + this._kA * dA * dA);
	    };
	    return AbstractEuclidean;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.AbstractEuclidean = AbstractEuclidean;
	var Euclidean = (function (_super) {
	    __extends(Euclidean, _super);
	    function Euclidean() {
	        _super.apply(this, arguments);
	    }
	    Euclidean.prototype._setDefaults = function () {
	        this._kR = 1;
	        this._kG = 1;
	        this._kB = 1;
	        this._kA = 1;
	    };
	    return Euclidean;
	}(AbstractEuclidean));
	exports.Euclidean = Euclidean;
	/**
	 * Euclidean color distance (RgbQuant modification w Alpha)
	 */
	var EuclideanRgbQuantWithAlpha = (function (_super) {
	    __extends(EuclideanRgbQuantWithAlpha, _super);
	    function EuclideanRgbQuantWithAlpha() {
	        _super.apply(this, arguments);
	    }
	    EuclideanRgbQuantWithAlpha.prototype._setDefaults = function () {
	        this._kR = bt709_1.Y.RED;
	        this._kG = bt709_1.Y.GREEN;
	        this._kB = bt709_1.Y.BLUE;
	        // TODO: what is the best coefficient below?
	        this._kA = 1;
	    };
	    return EuclideanRgbQuantWithAlpha;
	}(AbstractEuclidean));
	exports.EuclideanRgbQuantWithAlpha = EuclideanRgbQuantWithAlpha;
	/**
	 * Euclidean color distance (RgbQuant modification w/o Alpha)
	 */
	var EuclideanRgbQuantWOAlpha = (function (_super) {
	    __extends(EuclideanRgbQuantWOAlpha, _super);
	    function EuclideanRgbQuantWOAlpha() {
	        _super.apply(this, arguments);
	    }
	    EuclideanRgbQuantWOAlpha.prototype._setDefaults = function () {
	        this._kR = bt709_1.Y.RED;
	        this._kG = bt709_1.Y.GREEN;
	        this._kB = bt709_1.Y.BLUE;
	        this._kA = 0;
	    };
	    return EuclideanRgbQuantWOAlpha;
	}(AbstractEuclidean));
	exports.EuclideanRgbQuantWOAlpha = EuclideanRgbQuantWOAlpha;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * manhattanNeuQuant.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	var bt709_1 = __webpack_require__(2);
	/**
	 * Manhattan distance (NeuQuant modification) - w/o sRGB coefficients
	 */
	var AbstractManhattan = (function (_super) {
	    __extends(AbstractManhattan, _super);
	    function AbstractManhattan() {
	        _super.apply(this, arguments);
	    }
	    AbstractManhattan.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var dR = r2 - r1, dG = g2 - g1, dB = b2 - b1, dA = a2 - a1;
	        if (dR < 0)
	            dR = 0 - dR;
	        if (dG < 0)
	            dG = 0 - dG;
	        if (dB < 0)
	            dB = 0 - dB;
	        if (dA < 0)
	            dA = 0 - dA;
	        return this._kR * dR + this._kG * dG + this._kB * dB + this._kA * dA;
	    };
	    return AbstractManhattan;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.AbstractManhattan = AbstractManhattan;
	var Manhattan = (function (_super) {
	    __extends(Manhattan, _super);
	    function Manhattan() {
	        _super.apply(this, arguments);
	    }
	    Manhattan.prototype._setDefaults = function () {
	        this._kR = 1;
	        this._kG = 1;
	        this._kB = 1;
	        this._kA = 1;
	    };
	    return Manhattan;
	}(AbstractManhattan));
	exports.Manhattan = Manhattan;
	/**
	 * Manhattan distance (Nommyde modification)
	 * https://github.com/igor-bezkrovny/image-quantization/issues/4#issuecomment-235155320
	 */
	var ManhattanNommyde = (function (_super) {
	    __extends(ManhattanNommyde, _super);
	    function ManhattanNommyde() {
	        _super.apply(this, arguments);
	    }
	    ManhattanNommyde.prototype._setDefaults = function () {
	        this._kR = 0.4984;
	        this._kG = 0.8625;
	        this._kB = 0.2979;
	        // TODO: what is the best coefficient below?
	        this._kA = 1;
	    };
	    return ManhattanNommyde;
	}(AbstractManhattan));
	exports.ManhattanNommyde = ManhattanNommyde;
	/**
	 * Manhattan distance (sRGB coefficients)
	 */
	var ManhattanSRGB = (function (_super) {
	    __extends(ManhattanSRGB, _super);
	    function ManhattanSRGB() {
	        _super.apply(this, arguments);
	    }
	    ManhattanSRGB.prototype._setDefaults = function () {
	        this._kR = bt709_1.Y.RED;
	        this._kG = bt709_1.Y.GREEN;
	        this._kB = bt709_1.Y.BLUE;
	        // TODO: what is the best coefficient below?
	        this._kA = 1;
	    };
	    return ManhattanSRGB;
	}(AbstractManhattan));
	exports.ManhattanSRGB = ManhattanSRGB;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * pngQuant.ts - part of Image Quantization Library
	 */
	var abstractDistanceCalculator_1 = __webpack_require__(13);
	/**
	 * TODO: check quality of this distance equation
	 * TODO: ask author for usage rights
	 * taken from:
	 * {@link http://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space/8796867#8796867}
	 * {@link https://github.com/pornel/pngquant/blob/cc39b47799a7ff2ef17b529f9415ff6e6b213b8f/lib/pam.h#L148}
	 */
	var PNGQUANT = (function (_super) {
	    __extends(PNGQUANT, _super);
	    function PNGQUANT() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Author's comments
	     * px_b.rgb = px.rgb + 0*(1-px.a) // blend px on black
	     * px_b.a   = px.a   + 1*(1-px.a)
	     * px_w.rgb = px.rgb + 1*(1-px.a) // blend px on white
	     * px_w.a   = px.a   + 1*(1-px.a)
	
	     * px_b.rgb = px.rgb              // difference same as in opaque RGB
	     * px_b.a   = 1
	     * px_w.rgb = px.rgb - px.a       // difference simplifies to formula below
	     * px_w.a   = 1
	
	     * (px.rgb - px.a) - (py.rgb - py.a)
	     * (px.rgb - py.rgb) + (py.a - px.a)
	     *
	     */
	    PNGQUANT.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
	        var alphas = (a2 - a1) * this._whitePoint.a;
	        return this._colordifference_ch(r1 * this._whitePoint.r, r2 * this._whitePoint.r, alphas) +
	            this._colordifference_ch(g1 * this._whitePoint.g, g2 * this._whitePoint.g, alphas) +
	            this._colordifference_ch(b1 * this._whitePoint.b, b2 * this._whitePoint.b, alphas);
	    };
	    PNGQUANT.prototype._colordifference_ch = function (x, y, alphas) {
	        // maximum of channel blended on white, and blended on black
	        // premultiplied alpha and backgrounds 0/1 shorten the formula
	        var black = x - y, white = black + alphas;
	        return black * black + white * white;
	    };
	    return PNGQUANT;
	}(abstractDistanceCalculator_1.AbstractDistanceCalculator));
	exports.PNGQUANT = PNGQUANT;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var neuquant_1 = __webpack_require__(21);
	exports.NeuQuant = neuquant_1.NeuQuant;
	var neuquantFloat_1 = __webpack_require__(25);
	exports.NeuQuantFloat = neuquantFloat_1.NeuQuantFloat;
	var rgbquant_1 = __webpack_require__(26);
	exports.RGBQuant = rgbquant_1.RGBQuant;
	var colorHistogram_1 = __webpack_require__(27);
	exports.ColorHistogram = colorHistogram_1.ColorHistogram;
	var wuQuant_1 = __webpack_require__(29);
	exports.WuQuant = wuQuant_1.WuQuant;
	exports.WuColorCube = wuQuant_1.WuColorCube;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * NeuQuant Neural-Net Quantization Algorithm
	 * ------------------------------------------
	 *
	 * Copyright (c) 1994 Anthony Dekker
	 *
	 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
	 * "Kohonen neural networks for optimal colour quantization" in "Network:
	 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
	 * the algorithm.
	 *
	 * Any party obtaining a copy of these files from the author, directly or
	 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
	 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
	 * this software and documentation files (the "Software"), including without
	 * limitation the rights to use, copy, modify, merge, publish, distribute,
	 * sublicense, and/or sell copies of the Software, and to permit persons who
	 * receive copies from any such party to do so, with the only requirement being
	 * that this copyright notice remain intact.
	 */
	"use strict";
	/**
	 * @preserve TypeScript port:
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * neuquant.ts - part of Image Quantization Library
	 */
	var palette_1 = __webpack_require__(22);
	var point_1 = __webpack_require__(24);
	// bias for colour values
	var networkBiasShift = 3;
	var Neuron = (function () {
	    function Neuron(defaultValue) {
	        this.r = this.g = this.b = this.a = defaultValue;
	    }
	    /**
	     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
	     * @example
	     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
	     */
	    Neuron.prototype.toPoint = function () {
	        return point_1.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
	    };
	    Neuron.prototype.subtract = function (r, g, b, a) {
	        this.r -= r | 0;
	        this.g -= g | 0;
	        this.b -= b | 0;
	        this.a -= a | 0;
	    };
	    return Neuron;
	}());
	var NeuQuant = (function () {
	    function NeuQuant(colorDistanceCalculator, colors) {
	        if (colors === void 0) { colors = 256; }
	        this._distance = colorDistanceCalculator;
	        this._pointArray = [];
	        this._sampleFactor = 1;
	        this._networkSize = colors;
	        this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
	    }
	    NeuQuant.prototype.sample = function (pointBuffer) {
	        this._pointArray = this._pointArray.concat(pointBuffer.getPointArray());
	    };
	    NeuQuant.prototype.quantize = function () {
	        this._init();
	        this._learn();
	        return this._buildPalette();
	    };
	    NeuQuant.prototype._init = function () {
	        this._freq = [];
	        this._bias = [];
	        this._radPower = [];
	        this._network = [];
	        for (var i = 0; i < this._networkSize; i++) {
	            this._network[i] = new Neuron((i << (networkBiasShift + 8)) / this._networkSize | 0);
	            // 1/this._networkSize
	            this._freq[i] = NeuQuant._initialBias / this._networkSize | 0;
	            this._bias[i] = 0;
	        }
	    };
	    /**
	     * Main Learning Loop
	     */
	    NeuQuant.prototype._learn = function () {
	        var sampleFactor = this._sampleFactor;
	        var pointsNumber = this._pointArray.length;
	        if (pointsNumber < NeuQuant._minpicturebytes)
	            sampleFactor = 1;
	        var alphadec = 30 + (sampleFactor - 1) / 3 | 0, pointsToSample = pointsNumber / sampleFactor | 0;
	        var delta = pointsToSample / NeuQuant._nCycles | 0, alpha = NeuQuant._initAlpha, radius = (this._networkSize >> 3) * NeuQuant._radiusBias;
	        var rad = radius >> NeuQuant._radiusBiasShift;
	        if (rad <= 1)
	            rad = 0;
	        for (var i = 0; i < rad; i++) {
	            this._radPower[i] = alpha * (((rad * rad - i * i) * NeuQuant._radBias) / (rad * rad)) >>> 0;
	        }
	        var step;
	        if (pointsNumber < NeuQuant._minpicturebytes) {
	            step = 1;
	        }
	        else if (pointsNumber % NeuQuant._prime1 != 0) {
	            step = NeuQuant._prime1;
	        }
	        else if ((pointsNumber % NeuQuant._prime2) != 0) {
	            step = NeuQuant._prime2;
	        }
	        else if ((pointsNumber % NeuQuant._prime3) != 0) {
	            step = NeuQuant._prime3;
	        }
	        else {
	            step = NeuQuant._prime4;
	        }
	        for (var i = 0, pointIndex = 0; i < pointsToSample;) {
	            var point = this._pointArray[pointIndex], b = point.b << networkBiasShift, g = point.g << networkBiasShift, r = point.r << networkBiasShift, a = point.a << networkBiasShift, neuronIndex = this._contest(b, g, r, a);
	            this._alterSingle(alpha, neuronIndex, b, g, r, a);
	            if (rad !== 0)
	                this._alterNeighbour(rad, neuronIndex, b, g, r, a);
	            /* alter neighbours */
	            pointIndex += step;
	            if (pointIndex >= pointsNumber)
	                pointIndex -= pointsNumber;
	            i++;
	            if (delta === 0)
	                delta = 1;
	            if (i % delta === 0) {
	                alpha -= (alpha / alphadec) | 0;
	                radius -= (radius / NeuQuant._radiusDecrease) | 0;
	                rad = radius >> NeuQuant._radiusBiasShift;
	                if (rad <= 1)
	                    rad = 0;
	                for (var j = 0; j < rad; j++)
	                    this._radPower[j] = alpha * (((rad * rad - j * j) * NeuQuant._radBias) / (rad * rad)) >>> 0;
	            }
	        }
	    };
	    NeuQuant.prototype._buildPalette = function () {
	        var palette = new palette_1.Palette();
	        this._network.forEach(function (neuron) {
	            palette.add(neuron.toPoint());
	        });
	        palette.sort();
	        return palette;
	    };
	    /**
	     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
	     */
	    NeuQuant.prototype._alterNeighbour = function (rad, i, b, g, r, al) {
	        var lo = i - rad;
	        if (lo < -1)
	            lo = -1;
	        var hi = i + rad;
	        if (hi > this._networkSize)
	            hi = this._networkSize;
	        var j = i + 1, k = i - 1, m = 1;
	        while (j < hi || k > lo) {
	            var a = this._radPower[m++] / NeuQuant._alphaRadBias;
	            if (j < hi) {
	                var p = this._network[j++];
	                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
	            }
	            if (k > lo) {
	                var p = this._network[k--];
	                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
	            }
	        }
	    };
	    /**
	     * Move neuron i towards biased (b,g,r) by factor alpha
	     */
	    NeuQuant.prototype._alterSingle = function (alpha, i, b, g, r, a) {
	        alpha /= NeuQuant._initAlpha;
	        /* alter hit neuron */
	        var n = this._network[i];
	        n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
	    };
	    /**
	     * Search for biased BGR values
	     * description:
	     *    finds closest neuron (min dist) and updates freq
	     *    finds best neuron (min dist-bias) and returns position
	     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
	     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
	     *
	     * Original distance equation:
	     *        dist = abs(dR) + abs(dG) + abs(dB)
	     */
	    NeuQuant.prototype._contest = function (b, g, r, a) {
	        var multiplier = (255 * 4) << networkBiasShift;
	        var bestd = ~(1 << 31), bestbiasd = bestd, bestpos = -1, bestbiaspos = bestpos;
	        for (var i = 0; i < this._networkSize; i++) {
	            var n = this._network[i], dist = this._distance.calculateNormalized(n, { r: r, g: g, b: b, a: a }) * multiplier | 0;
	            if (dist < bestd) {
	                bestd = dist;
	                bestpos = i;
	            }
	            var biasdist = dist - ((this._bias[i]) >> (NeuQuant._initialBiasShift - networkBiasShift));
	            if (biasdist < bestbiasd) {
	                bestbiasd = biasdist;
	                bestbiaspos = i;
	            }
	            var betafreq = (this._freq[i] >> NeuQuant._betaShift);
	            this._freq[i] -= betafreq;
	            this._bias[i] += (betafreq << NeuQuant._gammaShift);
	        }
	        this._freq[bestpos] += NeuQuant._beta;
	        this._bias[bestpos] -= NeuQuant._betaGamma;
	        return bestbiaspos;
	    };
	    /*
	     four primes near 500 - assume no image has a length so large
	     that it is divisible by all four primes
	     */
	    NeuQuant._prime1 = 499;
	    NeuQuant._prime2 = 491;
	    NeuQuant._prime3 = 487;
	    NeuQuant._prime4 = 503;
	    NeuQuant._minpicturebytes = NeuQuant._prime4;
	    // no. of learning cycles
	    NeuQuant._nCycles = 100;
	    // defs for freq and bias
	    NeuQuant._initialBiasShift = 16;
	    // bias for fractions
	    NeuQuant._initialBias = (1 << NeuQuant._initialBiasShift);
	    NeuQuant._gammaShift = 10;
	    // gamma = 1024
	    // TODO: why gamma is never used?
	    //private static _gamma : number     = (1 << NeuQuant._gammaShift);
	    NeuQuant._betaShift = 10;
	    NeuQuant._beta = (NeuQuant._initialBias >> NeuQuant._betaShift);
	    // beta = 1/1024
	    NeuQuant._betaGamma = (NeuQuant._initialBias << (NeuQuant._gammaShift - NeuQuant._betaShift));
	    /*
	     * for 256 cols, radius starts
	     */
	    NeuQuant._radiusBiasShift = 6;
	    // at 32.0 biased by 6 bits
	    NeuQuant._radiusBias = 1 << NeuQuant._radiusBiasShift;
	    // and decreases by a factor of 1/30 each cycle
	    NeuQuant._radiusDecrease = 30;
	    /* defs for decreasing alpha factor */
	    // alpha starts at 1.0
	    NeuQuant._alphaBiasShift = 10;
	    // biased by 10 bits
	    NeuQuant._initAlpha = (1 << NeuQuant._alphaBiasShift);
	    /* radBias and alphaRadBias used for radpower calculation */
	    NeuQuant._radBiasShift = 8;
	    NeuQuant._radBias = 1 << NeuQuant._radBiasShift;
	    NeuQuant._alphaRadBiasShift = NeuQuant._alphaBiasShift + NeuQuant._radBiasShift;
	    NeuQuant._alphaRadBias = 1 << NeuQuant._alphaRadBiasShift;
	    return NeuQuant;
	}());
	exports.NeuQuant = NeuQuant;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * palette.ts - part of Image Quantization Library
	 */
	"use strict";
	var pointContainer_1 = __webpack_require__(23);
	var rgb2hsl_1 = __webpack_require__(5);
	// TODO: make paletteArray via pointBuffer, so, export will be available via pointBuffer.exportXXX
	var hueGroups = 10;
	function hueGroup(hue, segmentsNumber) {
	    var maxHue = 360, seg = maxHue / segmentsNumber, half = seg / 2;
	    for (var i = 1, mid = seg - half; i < segmentsNumber; i++, mid += seg) {
	        if (hue >= mid && hue < mid + seg)
	            return i;
	    }
	    return 0;
	}
	exports.hueGroup = hueGroup;
	var Palette = (function () {
	    function Palette() {
	        this._pointArray = [];
	        this._i32idx = {};
	        this._pointContainer = new pointContainer_1.PointContainer();
	        this._pointContainer.setHeight(1);
	        this._pointArray = this._pointContainer.getPointArray();
	    }
	    Palette.prototype.add = function (color) {
	        this._pointArray.push(color);
	        this._pointContainer.setWidth(this._pointArray.length);
	    };
	    Palette.prototype.has = function (color) {
	        for (var i = this._pointArray.length - 1; i >= 0; i--) {
	            if (color.uint32 === this._pointArray[i].uint32)
	                return true;
	        }
	        return false;
	    };
	    // TOTRY: use HUSL - http://boronine.com/husl/ http://www.husl-colors.org/ https://github.com/husl-colors/husl
	    Palette.prototype.getNearestColor = function (colorDistanceCalculator, color) {
	        return this._pointArray[this.getNearestIndex(colorDistanceCalculator, color) | 0];
	    };
	    Palette.prototype.getPointContainer = function () {
	        return this._pointContainer;
	    };
	    // TOTRY: use HUSL - http://boronine.com/husl/
	    /*
	     public nearestIndexByUint32(i32) {
	     var idx : number = this._nearestPointFromCache("" + i32);
	     if (idx >= 0) return idx;
	
	     var min = 1000,
	     rgb = [
	     (i32 & 0xff),
	     (i32 >>> 8) & 0xff,
	     (i32 >>> 16) & 0xff,
	     (i32 >>> 24) & 0xff
	     ],
	     len = this._pointArray.length;
	
	     idx = 0;
	     for (var i = 0; i < len; i++) {
	     var dist = Utils.distEuclidean(rgb, this._pointArray[i].rgba);
	
	     if (dist < min) {
	     min = dist;
	     idx = i;
	     }
	     }
	
	     this._i32idx[i32] = idx;
	     return idx;
	     }
	     */
	    Palette.prototype._nearestPointFromCache = function (key) {
	        return typeof this._i32idx[key] === "number" ? this._i32idx[key] : -1;
	    };
	    Palette.prototype.getNearestIndex = function (colorDistanceCalculator, point) {
	        var idx = this._nearestPointFromCache("" + point.uint32);
	        if (idx >= 0)
	            return idx;
	        var minimalDistance = Number.MAX_VALUE;
	        idx = 0;
	        for (var i = 0, l = this._pointArray.length; i < l; i++) {
	            var p = this._pointArray[i], distance = colorDistanceCalculator.calculateRaw(point.r, point.g, point.b, point.a, p.r, p.g, p.b, p.a);
	            if (distance < minimalDistance) {
	                minimalDistance = distance;
	                idx = i;
	            }
	        }
	        this._i32idx[point.uint32] = idx;
	        return idx;
	    };
	    /*
	     public reduce(histogram : ColorHistogram, colors : number) {
	     if (this._pointArray.length > colors) {
	     var idxi32 = histogram.getImportanceSortedColorsIDXI32();
	
	     // quantize histogram to existing palette
	     var keep = [], uniqueColors = 0, idx, pruned = false;
	
	     for (var i = 0, len = idxi32.length; i < len; i++) {
	     // palette length reached, unset all remaining colors (sparse palette)
	     if (uniqueColors >= colors) {
	     this.prunePal(keep);
	     pruned = true;
	     break;
	     } else {
	     idx = this.nearestIndexByUint32(idxi32[i]);
	     if (keep.indexOf(idx) < 0) {
	     keep.push(idx);
	     uniqueColors++;
	     }
	     }
	     }
	
	     if (!pruned) {
	     this.prunePal(keep);
	     }
	     }
	     }
	
	     // TODO: check usage, not tested!
	     public prunePal(keep : number[]) {
	     var colors = this._pointArray.length;
	     for (var colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
	     if (keep.indexOf(colorIndex) < 0) {
	
	     if(colorIndex + 1 < colors) {
	     this._pointArray[ colorIndex ] = this._pointArray [ colors - 1 ];
	     }
	     --colors;
	     //this._pointArray[colorIndex] = null;
	     }
	     }
	     console.log("colors pruned: " + (this._pointArray.length - colors));
	     this._pointArray.length = colors;
	     this._i32idx = {};
	     }
	     */
	    // TODO: group very low lum and very high lum colors
	    // TODO: pass custom sort order
	    // TODO: sort criteria function should be placed to HueStats class
	    Palette.prototype.sort = function () {
	        this._i32idx = {};
	        this._pointArray.sort(function (a, b) {
	            var hslA = rgb2hsl_1.rgb2hsl(a.r, a.g, a.b), hslB = rgb2hsl_1.rgb2hsl(b.r, b.g, b.b);
	            // sort all grays + whites together
	            var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + hueGroup(hslA.h, hueGroups), hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + hueGroup(hslB.h, hueGroups);
	            /*
	             var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + Utils.hueGroup(hslA.h, hueGroups);
	             var hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + Utils.hueGroup(hslB.h, hueGroups);
	             */
	            var hueDiff = hueB - hueA;
	            if (hueDiff)
	                return -hueDiff;
	            /*
	             var lumDiff = Utils.lumGroup(+hslB.l.toFixed(2)) - Utils.lumGroup(+hslA.l.toFixed(2));
	             if (lumDiff) return -lumDiff;
	             */
	            var lA = a.getLuminosity(true), lB = b.getLuminosity(true);
	            if (lB - lA !== 0)
	                return lB - lA;
	            var satDiff = ((hslB.s * 100) | 0) - ((hslA.s * 100) | 0);
	            if (satDiff)
	                return -satDiff;
	            return 0;
	        });
	    };
	    return Palette;
	}());
	exports.Palette = Palette;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * pointContainer.ts - part of Image Quantization Library
	 */
	var point_1 = __webpack_require__(24);
	/**
	 * v8 optimizations done.
	 * fromXXX methods are static to move out polymorphic code from class instance itself.
	 */
	var PointContainer = (function () {
	    function PointContainer() {
	        this._width = 0;
	        this._height = 0;
	        this._pointArray = [];
	    }
	    PointContainer.prototype.getWidth = function () {
	        return this._width;
	    };
	    PointContainer.prototype.getHeight = function () {
	        return this._height;
	    };
	    PointContainer.prototype.setWidth = function (width) {
	        this._width = width;
	    };
	    PointContainer.prototype.setHeight = function (height) {
	        this._height = height;
	    };
	    PointContainer.prototype.getPointArray = function () {
	        return this._pointArray;
	    };
	    PointContainer.prototype.clone = function () {
	        var clone = new PointContainer();
	        clone._width = this._width;
	        clone._height = this._height;
	        for (var i = 0, l = this._pointArray.length; i < l; i++) {
	            clone._pointArray[i] = point_1.Point.createByUint32(this._pointArray[i].uint32 | 0); // "| 0" is added for v8 optimization
	        }
	        return clone;
	    };
	    PointContainer.prototype.toUint32Array = function () {
	        var l = this._pointArray.length, uint32Array = new Uint32Array(l);
	        for (var i = 0; i < l; i++) {
	            uint32Array[i] = this._pointArray[i].uint32;
	        }
	        return uint32Array;
	    };
	    PointContainer.prototype.toUint8Array = function () {
	        return new Uint8Array(this.toUint32Array().buffer);
	    };
	    PointContainer.fromHTMLImageElement = function (img) {
	        var width = img.naturalWidth, height = img.naturalHeight;
	        var canvas = document.createElement("canvas");
	        canvas.width = width;
	        canvas.height = height;
	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
	        return PointContainer.fromHTMLCanvasElement(canvas);
	    };
	    PointContainer.fromHTMLCanvasElement = function (canvas) {
	        var width = canvas.width, height = canvas.height;
	        var ctx = canvas.getContext("2d"), imgData = ctx.getImageData(0, 0, width, height);
	        return PointContainer.fromImageData(imgData);
	    };
	    PointContainer.fromNodeCanvas = function (canvas) {
	        return PointContainer.fromHTMLCanvasElement(canvas);
	    };
	    PointContainer.fromImageData = function (imageData) {
	        var width = imageData.width, height = imageData.height;
	        return PointContainer.fromCanvasPixelArray(imageData.data, width, height);
	        /*
	         var buf8;
	         if (Utils.typeOf(imageData.data) == "CanvasPixelArray")
	         buf8 = new Uint8Array(imageData.data);
	         else
	         buf8 = imageData.data;
	
	         this.fromUint32Array(new Uint32Array(buf8.buffer), width, height);
	         */
	    };
	    PointContainer.fromArray = function (byteArray, width, height) {
	        var uint8array = new Uint8Array(byteArray);
	        return PointContainer.fromUint8Array(uint8array, width, height);
	    };
	    PointContainer.fromCanvasPixelArray = function (data, width, height) {
	        return PointContainer.fromArray(data, width, height);
	    };
	    PointContainer.fromUint8Array = function (uint8array, width, height) {
	        return PointContainer.fromUint32Array(new Uint32Array(uint8array.buffer), width, height);
	    };
	    PointContainer.fromUint32Array = function (uint32array, width, height) {
	        var container = new PointContainer();
	        container._width = width;
	        container._height = height;
	        for (var i = 0, l = uint32array.length; i < l; i++) {
	            container._pointArray[i] = point_1.Point.createByUint32(uint32array[i] | 0); // "| 0" is added for v8 optimization
	        }
	        return container;
	    };
	    return PointContainer;
	}());
	exports.PointContainer = PointContainer;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * point.ts - part of Image Quantization Library
	 */
	var bt709_1 = __webpack_require__(2);
	/**
	 * v8 optimized class
	 * 1) "constructor" should have initialization with worst types
	 * 2) "set" should have |0 / >>> 0
	 */
	var Point = (function () {
	    function Point() {
	        this.uint32 = -1 >>> 0;
	        this.r = this.g = this.b = this.a = 0;
	        this.rgba = new Array(4);
	        /*[ this.r , this.g , this.b , this.a ]*/
	        this.rgba[0] = 0;
	        this.rgba[1] = 0;
	        this.rgba[2] = 0;
	        this.rgba[3] = 0;
	        /*
	         this.Lab = {
	         L : 0.0,
	         a : 0.0,
	         b : 0.0
	         };
	         */
	    }
	    Point.createByQuadruplet = function (quadruplet) {
	        var point = new Point();
	        point.r = quadruplet[0] | 0;
	        point.g = quadruplet[1] | 0;
	        point.b = quadruplet[2] | 0;
	        point.a = quadruplet[3] | 0;
	        point._loadUINT32();
	        point._loadQuadruplet();
	        //point._loadLab();
	        return point;
	    };
	    Point.createByRGBA = function (red, green, blue, alpha) {
	        var point = new Point();
	        point.r = red | 0;
	        point.g = green | 0;
	        point.b = blue | 0;
	        point.a = alpha | 0;
	        point._loadUINT32();
	        point._loadQuadruplet();
	        //point._loadLab();
	        return point;
	    };
	    Point.createByUint32 = function (uint32) {
	        var point = new Point();
	        point.uint32 = uint32 >>> 0;
	        point._loadRGBA();
	        point._loadQuadruplet();
	        //point._loadLab();
	        return point;
	    };
	    Point.prototype.from = function (point) {
	        this.r = point.r;
	        this.g = point.g;
	        this.b = point.b;
	        this.a = point.a;
	        this.uint32 = point.uint32;
	        this.rgba[0] = point.r;
	        this.rgba[1] = point.g;
	        this.rgba[2] = point.b;
	        this.rgba[3] = point.a;
	        /*
	         this.Lab.L = point.Lab.L;
	         this.Lab.a = point.Lab.a;
	         this.Lab.b = point.Lab.b;
	         */
	    };
	    /*
	     * TODO:
	     Luminance from RGB:
	
	     Luminance (standard for certain colour spaces): (0.2126*R + 0.7152*G + 0.0722*B) [1]
	     Luminance (perceived option 1): (0.299*R + 0.587*G + 0.114*B) [2]
	     Luminance (perceived option 2, slower to calculate):  sqrt( 0.241*R^2 + 0.691*G^2 + 0.068*B^2 ) ? sqrt( 0.299*R^2 + 0.587*G^2 + 0.114*B^2 ) (thanks to @MatthewHerbst) [http://alienryderflex.com/hsp.html]
	     */
	    Point.prototype.getLuminosity = function (useAlphaChannel) {
	        var r = this.r, g = this.g, b = this.b;
	        if (useAlphaChannel) {
	            r = Math.min(255, 255 - this.a + this.a * r / 255);
	            g = Math.min(255, 255 - this.a + this.a * g / 255);
	            b = Math.min(255, 255 - this.a + this.a * b / 255);
	        }
	        //var luma = this.r * Point._RED_COEFFICIENT + this.g * Point._GREEN_COEFFICIENT + this.b * Point._BLUE_COEFFICIENT;
	        /*
	         if(useAlphaChannel) {
	         luma = (luma * (255 - this.a)) / 255;
	         }
	         */
	        return r * bt709_1.Y.RED + g * bt709_1.Y.GREEN + b * bt709_1.Y.BLUE;
	    };
	    Point.prototype._loadUINT32 = function () {
	        this.uint32 = (this.a << 24 | this.b << 16 | this.g << 8 | this.r) >>> 0;
	    };
	    Point.prototype._loadRGBA = function () {
	        this.r = this.uint32 & 0xff;
	        this.g = (this.uint32 >>> 8) & 0xff;
	        this.b = (this.uint32 >>> 16) & 0xff;
	        this.a = (this.uint32 >>> 24) & 0xff;
	    };
	    Point.prototype._loadQuadruplet = function () {
	        this.rgba[0] = this.r;
	        this.rgba[1] = this.g;
	        this.rgba[2] = this.b;
	        this.rgba[3] = this.a;
	        /*
	         var xyz = rgb2xyz(this.r, this.g, this.b);
	         var lab = xyz2lab(xyz.x, xyz.y, xyz.z);
	         this.lab.l = lab.l;
	         this.lab.a = lab.a;
	         this.lab.b = lab.b;
	         */
	    };
	    return Point;
	}());
	exports.Point = Point;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * NeuQuantFloat Neural-Net Quantization Algorithm
	 * ------------------------------------------
	 *
	 * Copyright (c) 1994 Anthony Dekker
	 *
	 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
	 * "Kohonen neural networks for optimal colour quantization" in "Network:
	 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
	 * the algorithm.
	 *
	 * Any party obtaining a copy of these files from the author, directly or
	 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
	 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
	 * this software and documentation files (the "Software"), including without
	 * limitation the rights to use, copy, modify, merge, publish, distribute,
	 * sublicense, and/or sell copies of the Software, and to permit persons who
	 * receive copies from any such party to do so, with the only requirement being
	 * that this copyright notice remain intact.
	 */
	/**
	 * @preserve TypeScript port:
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * neuquant.ts - part of Image Quantization Library
	 */
	var palette_1 = __webpack_require__(22);
	var point_1 = __webpack_require__(24);
	// bias for colour values
	var networkBiasShift = 3;
	var NeuronFloat = (function () {
	    function NeuronFloat(defaultValue) {
	        this.r = this.g = this.b = this.a = defaultValue;
	    }
	    /**
	     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
	     * @example
	     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
	     */
	    NeuronFloat.prototype.toPoint = function () {
	        return point_1.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
	    };
	    NeuronFloat.prototype.subtract = function (r, g, b, a) {
	        this.r -= r;
	        this.g -= g;
	        this.b -= b;
	        this.a -= a;
	    };
	    return NeuronFloat;
	}());
	var NeuQuantFloat = (function () {
	    function NeuQuantFloat(colorDistanceCalculator, colors) {
	        if (colors === void 0) { colors = 256; }
	        this._distance = colorDistanceCalculator;
	        this._pointArray = [];
	        this._sampleFactor = 1;
	        this._networkSize = colors;
	        this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
	    }
	    NeuQuantFloat.prototype.sample = function (pointBuffer) {
	        this._pointArray = this._pointArray.concat(pointBuffer.getPointArray());
	    };
	    NeuQuantFloat.prototype.quantize = function () {
	        this._init();
	        this._learn();
	        return this._buildPalette();
	    };
	    NeuQuantFloat.prototype._init = function () {
	        this._freq = [];
	        this._bias = [];
	        this._radPower = [];
	        this._network = [];
	        for (var i = 0; i < this._networkSize; i++) {
	            this._network[i] = new NeuronFloat((i << (networkBiasShift + 8)) / this._networkSize);
	            // 1/this._networkSize
	            this._freq[i] = NeuQuantFloat._initialBias / this._networkSize;
	            this._bias[i] = 0;
	        }
	    };
	    /**
	     * Main Learning Loop
	     */
	    NeuQuantFloat.prototype._learn = function () {
	        var sampleFactor = this._sampleFactor;
	        var pointsNumber = this._pointArray.length;
	        if (pointsNumber < NeuQuantFloat._minpicturebytes)
	            sampleFactor = 1;
	        var alphadec = 30 + (sampleFactor - 1) / 3, pointsToSample = pointsNumber / sampleFactor;
	        var delta = pointsToSample / NeuQuantFloat._nCycles | 0, alpha = NeuQuantFloat._initAlpha, radius = (this._networkSize >> 3) * NeuQuantFloat._radiusBias;
	        var rad = radius >> NeuQuantFloat._radiusBiasShift;
	        if (rad <= 1)
	            rad = 0;
	        for (var i = 0; i < rad; i++) {
	            this._radPower[i] = alpha * (((rad * rad - i * i) * NeuQuantFloat._radBias) / (rad * rad));
	        }
	        var step;
	        if (pointsNumber < NeuQuantFloat._minpicturebytes) {
	            step = 1;
	        }
	        else if (pointsNumber % NeuQuantFloat._prime1 != 0) {
	            step = NeuQuantFloat._prime1;
	        }
	        else if ((pointsNumber % NeuQuantFloat._prime2) != 0) {
	            step = NeuQuantFloat._prime2;
	        }
	        else if ((pointsNumber % NeuQuantFloat._prime3) != 0) {
	            step = NeuQuantFloat._prime3;
	        }
	        else {
	            step = NeuQuantFloat._prime4;
	        }
	        for (var i = 0, pointIndex = 0; i < pointsToSample;) {
	            var point = this._pointArray[pointIndex], b = point.b << networkBiasShift, g = point.g << networkBiasShift, r = point.r << networkBiasShift, a = point.a << networkBiasShift, neuronIndex = this._contest(b, g, r, a);
	            this._alterSingle(alpha, neuronIndex, b, g, r, a);
	            if (rad != 0)
	                this._alterNeighbour(rad, neuronIndex, b, g, r, a);
	            /* alter neighbours */
	            pointIndex += step;
	            if (pointIndex >= pointsNumber)
	                pointIndex -= pointsNumber;
	            i++;
	            if (delta == 0)
	                delta = 1;
	            if (i % delta == 0) {
	                alpha -= (alpha / alphadec);
	                radius -= (radius / NeuQuantFloat._radiusDecrease);
	                rad = radius >> NeuQuantFloat._radiusBiasShift;
	                if (rad <= 1)
	                    rad = 0;
	                for (var j = 0; j < rad; j++)
	                    this._radPower[j] = alpha * (((rad * rad - j * j) * NeuQuantFloat._radBias) / (rad * rad));
	            }
	        }
	    };
	    NeuQuantFloat.prototype._buildPalette = function () {
	        var palette = new palette_1.Palette();
	        this._network.forEach(function (neuron) {
	            palette.add(neuron.toPoint());
	        });
	        palette.sort();
	        return palette;
	    };
	    /**
	     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
	     */
	    NeuQuantFloat.prototype._alterNeighbour = function (rad, i, b, g, r, al) {
	        var lo = i - rad;
	        if (lo < -1)
	            lo = -1;
	        var hi = i + rad;
	        if (hi > this._networkSize)
	            hi = this._networkSize;
	        var j = i + 1, k = i - 1, m = 1;
	        while (j < hi || k > lo) {
	            var a = this._radPower[m++] / NeuQuantFloat._alphaRadBias;
	            if (j < hi) {
	                var p = this._network[j++];
	                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
	            }
	            if (k > lo) {
	                var p = this._network[k--];
	                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
	            }
	        }
	    };
	    /**
	     * Move neuron i towards biased (b,g,r) by factor alpha
	     */
	    NeuQuantFloat.prototype._alterSingle = function (alpha, i, b, g, r, a) {
	        alpha /= NeuQuantFloat._initAlpha;
	        /* alter hit neuron */
	        var n = this._network[i];
	        n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
	    };
	    /**
	     * Search for biased BGR values
	     * description:
	     *    finds closest neuron (min dist) and updates freq
	     *    finds best neuron (min dist-bias) and returns position
	     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
	     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
	     *
	     * Original distance equation:
	     *        dist = abs(dR) + abs(dG) + abs(dB)
	     */
	    NeuQuantFloat.prototype._contest = function (b, g, r, al) {
	        var multiplier = (255 * 4) << networkBiasShift;
	        var bestd = ~(1 << 31), bestbiasd = bestd, bestpos = -1, bestbiaspos = bestpos;
	        for (var i = 0; i < this._networkSize; i++) {
	            var n = this._network[i], dist = this._distance.calculateNormalized(n, { r: r, g: g, b: b, a: al }) * multiplier;
	            if (dist < bestd) {
	                bestd = dist;
	                bestpos = i;
	            }
	            var biasdist = dist - ((this._bias[i]) >> (NeuQuantFloat._initialBiasShift - networkBiasShift));
	            if (biasdist < bestbiasd) {
	                bestbiasd = biasdist;
	                bestbiaspos = i;
	            }
	            var betafreq = (this._freq[i] >> NeuQuantFloat._betaShift);
	            this._freq[i] -= betafreq;
	            this._bias[i] += (betafreq << NeuQuantFloat._gammaShift);
	        }
	        this._freq[bestpos] += NeuQuantFloat._beta;
	        this._bias[bestpos] -= NeuQuantFloat._betaGamma;
	        return bestbiaspos;
	    };
	    /*
	     four primes near 500 - assume no image has a length so large
	     that it is divisible by all four primes
	     */
	    NeuQuantFloat._prime1 = 499;
	    NeuQuantFloat._prime2 = 491;
	    NeuQuantFloat._prime3 = 487;
	    NeuQuantFloat._prime4 = 503;
	    NeuQuantFloat._minpicturebytes = NeuQuantFloat._prime4;
	    // no. of learning cycles
	    NeuQuantFloat._nCycles = 100;
	    // defs for freq and bias
	    NeuQuantFloat._initialBiasShift = 16;
	    // bias for fractions
	    NeuQuantFloat._initialBias = (1 << NeuQuantFloat._initialBiasShift);
	    NeuQuantFloat._gammaShift = 10;
	    // gamma = 1024
	    // TODO: why gamma is never used?
	    //private static _gamma : number     = (1 << NeuQuantFloat._gammaShift);
	    NeuQuantFloat._betaShift = 10;
	    NeuQuantFloat._beta = (NeuQuantFloat._initialBias >> NeuQuantFloat._betaShift);
	    // beta = 1/1024
	    NeuQuantFloat._betaGamma = (NeuQuantFloat._initialBias << (NeuQuantFloat._gammaShift - NeuQuantFloat._betaShift));
	    /*
	     * for 256 cols, radius starts
	     */
	    NeuQuantFloat._radiusBiasShift = 6;
	    // at 32.0 biased by 6 bits
	    NeuQuantFloat._radiusBias = 1 << NeuQuantFloat._radiusBiasShift;
	    // and decreases by a factor of 1/30 each cycle
	    NeuQuantFloat._radiusDecrease = 30;
	    /* defs for decreasing alpha factor */
	    // alpha starts at 1.0
	    NeuQuantFloat._alphaBiasShift = 10;
	    // biased by 10 bits
	    NeuQuantFloat._initAlpha = (1 << NeuQuantFloat._alphaBiasShift);
	    /* radBias and alphaRadBias used for radpower calculation */
	    NeuQuantFloat._radBiasShift = 8;
	    NeuQuantFloat._radBias = 1 << NeuQuantFloat._radBiasShift;
	    NeuQuantFloat._alphaRadBiasShift = NeuQuantFloat._alphaBiasShift + NeuQuantFloat._radBiasShift;
	    NeuQuantFloat._alphaRadBias = 1 << NeuQuantFloat._alphaRadBiasShift;
	    return NeuQuantFloat;
	}());
	exports.NeuQuantFloat = NeuQuantFloat;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2015, Leon Sorokin
	 * All rights reserved. (MIT Licensed)
	 *
	 * RgbQuant.js - an image quantization lib
	 */
	"use strict";
	/**
	 * @preserve TypeScript port:
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * rgbquant.ts - part of Image Quantization Library
	 */
	var palette_1 = __webpack_require__(22);
	var point_1 = __webpack_require__(24);
	var colorHistogram_1 = __webpack_require__(27);
	var arithmetic_1 = __webpack_require__(6);
	var RemovedColor = (function () {
	    function RemovedColor(index, color, distance) {
	        this.index = index;
	        this.color = color;
	        this.distance = distance;
	    }
	    return RemovedColor;
	}());
	// TODO: make input/output image and input/output palettes with instances of class Point only!
	var RGBQuant = (function () {
	    function RGBQuant(colorDistanceCalculator, colors, method) {
	        if (colors === void 0) { colors = 256; }
	        if (method === void 0) { method = 2; }
	        this._distance = colorDistanceCalculator;
	        // desired final palette size
	        this._colors = colors;
	        // histogram to accumulate
	        this._histogram = new colorHistogram_1.ColorHistogram(method, colors);
	        this._initialDistance = 0.01;
	        this._distanceIncrement = 0.005;
	    }
	    // gathers histogram info
	    RGBQuant.prototype.sample = function (image) {
	        /*
	         var pointArray = image.getPointArray(), max = [0, 0, 0, 0], min = [255, 255, 255, 255];
	
	         for (var i = 0, l = pointArray.length; i < l; i++) {
	         var color = pointArray[i];
	         for (var componentIndex = 0; componentIndex < 4; componentIndex++) {
	         if (max[componentIndex] < color.rgba[componentIndex]) max[componentIndex] = color.rgba[componentIndex];
	         if (min[componentIndex] > color.rgba[componentIndex]) min[componentIndex] = color.rgba[componentIndex];
	         }
	         }
	         var rd = max[0] - min[0], gd = max[1] - min[1], bd = max[2] - min[2], ad = max[3] - min[3];
	         this._distance.setWhitePoint(rd, gd, bd, ad);
	
	         this._initialDistance = (Math.sqrt(rd * rd + gd * gd + bd * bd + ad * ad) / Math.sqrt(255 * 255 + 255 * 255 + 255 * 255)) * 0.01;
	         */
	        this._histogram.sample(image);
	    };
	    // reduces histogram to palette, remaps & memoizes reduced colors
	    RGBQuant.prototype.quantize = function () {
	        var idxi32 = this._histogram.getImportanceSortedColorsIDXI32();
	        if (idxi32.length === 0) {
	            throw new Error("No colors in image");
	        }
	        var palette = this._buildPalette(idxi32);
	        palette.sort();
	        return palette;
	    };
	    // reduces similar colors from an importance-sorted Uint32 rgba array
	    RGBQuant.prototype._buildPalette = function (idxi32) {
	        // reduce histogram to create initial palette
	        // build full rgb palette
	        var palette = new palette_1.Palette(), colorArray = palette.getPointContainer().getPointArray(), usageArray = new Array(idxi32.length);
	        for (var i = 0; i < idxi32.length; i++) {
	            colorArray.push(point_1.Point.createByUint32(idxi32[i]));
	            usageArray[i] = 1;
	        }
	        var len = colorArray.length, memDist = [];
	        var palLen = len, thold = this._initialDistance;
	        // palette already at or below desired length
	        while (palLen > this._colors) {
	            memDist.length = 0;
	            // iterate palette
	            for (var i = 0; i < len; i++) {
	                if (usageArray[i] === 0)
	                    continue;
	                var pxi = colorArray[i];
	                //if (!pxi) continue;
	                for (var j = i + 1; j < len; j++) {
	                    if (usageArray[j] === 0)
	                        continue;
	                    var pxj = colorArray[j];
	                    //if (!pxj) continue;
	                    var dist = this._distance.calculateNormalized(pxi, pxj);
	                    if (dist < thold) {
	                        // store index,rgb,dist
	                        memDist.push(new RemovedColor(j, pxj, dist));
	                        usageArray[j] = 0;
	                        palLen--;
	                    }
	                }
	            }
	            // palette reduction pass
	            // console.log("palette length: " + palLen);
	            // if palette is still much larger than target, increment by larger initDist
	            thold += (palLen > this._colors * 3) ? this._initialDistance : this._distanceIncrement;
	        }
	        // if palette is over-reduced, re-add removed colors with largest distances from last round
	        if (palLen < this._colors) {
	            // sort descending
	            arithmetic_1.stableSort(memDist, function (a, b) {
	                return b.distance - a.distance;
	            });
	            var k = 0;
	            while (palLen < this._colors && k < memDist.length) {
	                var removedColor = memDist[k];
	                // re-inject rgb into final palette
	                usageArray[removedColor.index] = 1;
	                palLen++;
	                k++;
	            }
	        }
	        var colors = colorArray.length;
	        for (var colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
	            if (usageArray[colorIndex] === 0) {
	                if (colorIndex !== colors - 1) {
	                    colorArray[colorIndex] = colorArray[colors - 1];
	                }
	                --colors;
	            }
	        }
	        colorArray.length = colors;
	        return palette;
	    };
	    return RGBQuant;
	}());
	exports.RGBQuant = RGBQuant;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2015, Leon Sorokin
	 * All rights reserved. (MIT Licensed)
	 *
	 * ColorHistogram.js - an image quantization lib
	 */
	"use strict";
	/**
	 * @preserve TypeScript port:
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * colorHistogram.ts - part of Image Quantization Library
	 */
	var hueStatistics_1 = __webpack_require__(28);
	var arithmetic_1 = __webpack_require__(6);
	var ColorHistogram = (function () {
	    function ColorHistogram(method, colors) {
	        // 1 = by global population, 2 = subregion population threshold
	        this._method = method;
	        // if > 0, enables hues stats and min-color retention per group
	        this._minHueCols = colors << 2; //opts.minHueCols || 0;
	        // # of highest-frequency colors to start with for palette reduction
	        this._initColors = colors << 2;
	        // HueStatistics instance
	        this._hueStats = new hueStatistics_1.HueStatistics(ColorHistogram._hueGroups, this._minHueCols);
	        this._histogram = Object.create(null);
	    }
	    ColorHistogram.prototype.sample = function (pointBuffer) {
	        switch (this._method) {
	            case 1:
	                this._colorStats1D(pointBuffer);
	                break;
	            case 2:
	                this._colorStats2D(pointBuffer);
	                break;
	        }
	    };
	    ColorHistogram.prototype.getImportanceSortedColorsIDXI32 = function () {
	        var _this = this;
	        // TODO: fix typing issue in stableSort func
	        var sorted = arithmetic_1.stableSort(Object.keys(this._histogram), function (a, b) { return _this._histogram[b] - _this._histogram[a]; });
	        if (sorted.length === 0) {
	            return [];
	        }
	        var idxi32;
	        switch (this._method) {
	            case 1:
	                var initialColorsLimit = Math.min(sorted.length, this._initColors), last = sorted[initialColorsLimit - 1], freq = this._histogram[last];
	                idxi32 = sorted.slice(0, initialColorsLimit);
	                // add any cut off colors with same freq as last
	                var pos = initialColorsLimit, len = sorted.length;
	                while (pos < len && this._histogram[sorted[pos]] == freq)
	                    idxi32.push(sorted[pos++]);
	                // inject min huegroup colors
	                this._hueStats.injectIntoArray(idxi32);
	                break;
	            case 2:
	                idxi32 = sorted;
	                break;
	            default:
	                // TODO: rethink errors
	                throw new Error("Incorrect method");
	        }
	        // int32-ify values
	        return idxi32.map(function (v) {
	            return +v;
	        });
	    };
	    // global top-population
	    ColorHistogram.prototype._colorStats1D = function (pointBuffer) {
	        var histG = this._histogram, pointArray = pointBuffer.getPointArray(), len = pointArray.length;
	        for (var i = 0; i < len; i++) {
	            var col = pointArray[i].uint32;
	            // collect hue stats
	            this._hueStats.check(col);
	            if (col in histG)
	                histG[col]++;
	            else
	                histG[col] = 1;
	        }
	    };
	    // population threshold within subregions
	    // FIXME: this can over-reduce (few/no colors same?), need a way to keep
	    // important colors that dont ever reach local thresholds (gradients?)
	    ColorHistogram.prototype._colorStats2D = function (pointBuffer) {
	        var _this = this;
	        var width = pointBuffer.getWidth(), height = pointBuffer.getHeight(), pointArray = pointBuffer.getPointArray();
	        var boxW = ColorHistogram._boxSize[0], boxH = ColorHistogram._boxSize[1], area = boxW * boxH, boxes = this._makeBoxes(width, height, boxW, boxH), histG = this._histogram;
	        boxes.forEach(function (box) {
	            var effc = Math.round((box.w * box.h) / area) * ColorHistogram._boxPixels;
	            if (effc < 2)
	                effc = 2;
	            var histL = {};
	            _this._iterateBox(box, width, function (i) {
	                var col = pointArray[i].uint32;
	                // collect hue stats
	                _this._hueStats.check(col);
	                if (col in histG)
	                    histG[col]++;
	                else if (col in histL) {
	                    if (++histL[col] >= effc)
	                        histG[col] = histL[col];
	                }
	                else
	                    histL[col] = 1;
	            });
	        });
	        // inject min huegroup colors
	        this._hueStats.injectIntoDictionary(histG);
	    };
	    // iterates @bbox within a parent rect of width @wid; calls @fn, passing index within parent
	    ColorHistogram.prototype._iterateBox = function (bbox, wid, fn) {
	        var b = bbox, i0 = b.y * wid + b.x, i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1), incr = wid - b.w + 1;
	        var cnt = 0, i = i0;
	        do {
	            fn.call(this, i);
	            i += (++cnt % b.w == 0) ? incr : 1;
	        } while (i <= i1);
	    };
	    /**
	     *    partitions a rectangle of width x height into
	     *    array of boxes stepX x stepY (or less)
	     */
	    ColorHistogram.prototype._makeBoxes = function (width, height, stepX, stepY) {
	        var wrem = width % stepX, hrem = height % stepY, xend = width - wrem, yend = height - hrem, boxesArray = [];
	        for (var y = 0; y < height; y += stepY)
	            for (var x = 0; x < width; x += stepX)
	                boxesArray.push({ x: x, y: y, w: (x == xend ? wrem : stepX), h: (y == yend ? hrem : stepY) });
	        return boxesArray;
	    };
	    ColorHistogram._boxSize = [64, 64];
	    ColorHistogram._boxPixels = 2;
	    ColorHistogram._hueGroups = 10;
	    return ColorHistogram;
	}());
	exports.ColorHistogram = ColorHistogram;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * hueStatistics.ts - part of Image Quantization Library
	 */
	var rgb2hsl_1 = __webpack_require__(5);
	var palette_1 = __webpack_require__(22);
	var HueGroup = (function () {
	    function HueGroup() {
	        this.num = 0;
	        this.cols = [];
	    }
	    return HueGroup;
	}());
	var HueStatistics = (function () {
	    function HueStatistics(numGroups, minCols) {
	        this._numGroups = numGroups;
	        this._minCols = minCols;
	        this._stats = [];
	        for (var i = 0; i <= numGroups; i++) {
	            this._stats[i] = new HueGroup();
	        }
	        this._groupsFull = 0;
	    }
	    HueStatistics.prototype.check = function (i32) {
	        if (this._groupsFull == this._numGroups + 1) {
	            this.check = function () {
	            };
	        }
	        var r = (i32 & 0xff), g = (i32 >>> 8) & 0xff, b = (i32 >>> 16) & 0xff, hg = (r == g && g == b) ? 0 : 1 + palette_1.hueGroup(rgb2hsl_1.rgb2hsl(r, g, b).h, this._numGroups), gr = this._stats[hg], min = this._minCols;
	        gr.num++;
	        if (gr.num > min)
	            return;
	        if (gr.num == min)
	            this._groupsFull++;
	        if (gr.num <= min)
	            this._stats[hg].cols.push(i32);
	    };
	    HueStatistics.prototype.injectIntoDictionary = function (histG) {
	        for (var i = 0; i <= this._numGroups; i++) {
	            if (this._stats[i].num <= this._minCols) {
	                this._stats[i].cols.forEach(function (col) {
	                    if (!histG[col])
	                        histG[col] = 1;
	                    else
	                        histG[col]++;
	                });
	            }
	        }
	    };
	    HueStatistics.prototype.injectIntoArray = function (histG) {
	        for (var i = 0; i <= this._numGroups; i++) {
	            if (this._stats[i].num <= this._minCols) {
	                this._stats[i].cols.forEach(function (col) {
	                    if (histG.indexOf(col) == -1)
	                        histG.push(col);
	                });
	            }
	        }
	    };
	    return HueStatistics;
	}());
	exports.HueStatistics = HueStatistics;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * wuQuant.ts - part of Image Quantization Library
	 */
	var palette_1 = __webpack_require__(22);
	var point_1 = __webpack_require__(24);
	function createArray1D(dimension1) {
	    var a = [];
	    for (var k = 0; k < dimension1; k++) {
	        a[k] = 0;
	    }
	    return a;
	}
	function createArray4D(dimension1, dimension2, dimension3, dimension4) {
	    var a = new Array(dimension1);
	    for (var i = 0; i < dimension1; i++) {
	        a[i] = new Array(dimension2);
	        for (var j = 0; j < dimension2; j++) {
	            a[i][j] = new Array(dimension3);
	            for (var k = 0; k < dimension3; k++) {
	                a[i][j][k] = new Array(dimension4);
	                for (var l = 0; l < dimension4; l++) {
	                    a[i][j][k][l] = 0;
	                }
	            }
	        }
	    }
	    return a;
	}
	function createArray3D(dimension1, dimension2, dimension3) {
	    var a = new Array(dimension1);
	    for (var i = 0; i < dimension1; i++) {
	        a[i] = new Array(dimension2);
	        for (var j = 0; j < dimension2; j++) {
	            a[i][j] = new Array(dimension3);
	            for (var k = 0; k < dimension3; k++) {
	                a[i][j][k] = 0;
	            }
	        }
	    }
	    return a;
	}
	function fillArray3D(a, dimension1, dimension2, dimension3, value) {
	    for (var i = 0; i < dimension1; i++) {
	        a[i] = [];
	        for (var j = 0; j < dimension2; j++) {
	            a[i][j] = [];
	            for (var k = 0; k < dimension3; k++) {
	                a[i][j][k] = value;
	            }
	        }
	    }
	}
	function fillArray1D(a, dimension1, value) {
	    for (var i = 0; i < dimension1; i++) {
	        a[i] = value;
	    }
	}
	var WuColorCube = (function () {
	    function WuColorCube() {
	    }
	    return WuColorCube;
	}());
	exports.WuColorCube = WuColorCube;
	var WuQuant = (function () {
	    function WuQuant(colorDistanceCalculator, colors, significantBitsPerChannel) {
	        if (colors === void 0) { colors = 256; }
	        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
	        this._distance = colorDistanceCalculator;
	        this._setQuality(significantBitsPerChannel);
	        this._initialize(colors);
	    }
	    WuQuant.prototype.sample = function (image) {
	        var pointArray = image.getPointArray();
	        for (var i = 0, l = pointArray.length; i < l; i++) {
	            this._addColor(pointArray[i]);
	        }
	        this._pixels = this._pixels.concat(pointArray);
	    };
	    WuQuant.prototype.quantize = function () {
	        this._preparePalette();
	        var palette = new palette_1.Palette();
	        // generates palette
	        for (var paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
	            if (this._sums[paletteIndex] > 0) {
	                var sum = this._sums[paletteIndex], r = this._reds[paletteIndex] / sum, g = this._greens[paletteIndex] / sum, b = this._blues[paletteIndex] / sum, a = this._alphas[paletteIndex] / sum;
	                var color = point_1.Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);
	                palette.add(color);
	            }
	        }
	        palette.sort();
	        return palette;
	    };
	    WuQuant.prototype._preparePalette = function () {
	        // preprocess the colors
	        this._calculateMoments();
	        var next = 0, volumeVariance = createArray1D(this._colors);
	        // processes the cubes
	        for (var cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
	            // if cut is possible; make it
	            if (this._cut(this._cubes[next], this._cubes[cubeIndex])) {
	                volumeVariance[next] = this._cubes[next].volume > 1 ? this._calculateVariance(this._cubes[next]) : 0.0;
	                volumeVariance[cubeIndex] = this._cubes[cubeIndex].volume > 1 ? this._calculateVariance(this._cubes[cubeIndex]) : 0.0;
	            }
	            else {
	                // the cut was not possible, revert the index
	                volumeVariance[next] = 0.0;
	                cubeIndex--;
	            }
	            next = 0;
	            var temp = volumeVariance[0];
	            for (var index = 1; index <= cubeIndex; ++index) {
	                if (volumeVariance[index] > temp) {
	                    temp = volumeVariance[index];
	                    next = index;
	                }
	            }
	            if (temp <= 0.0) {
	                this._colors = cubeIndex + 1;
	                break;
	            }
	        }
	        var lookupRed = [], lookupGreen = [], lookupBlue = [], lookupAlpha = [];
	        // precalculates lookup tables
	        for (var k = 0; k < this._colors; ++k) {
	            var weight = WuQuant._volume(this._cubes[k], this._weights);
	            if (weight > 0) {
	                lookupRed[k] = (WuQuant._volume(this._cubes[k], this._momentsRed) / weight) | 0;
	                lookupGreen[k] = (WuQuant._volume(this._cubes[k], this._momentsGreen) / weight) | 0;
	                lookupBlue[k] = (WuQuant._volume(this._cubes[k], this._momentsBlue) / weight) | 0;
	                lookupAlpha[k] = (WuQuant._volume(this._cubes[k], this._momentsAlpha) / weight) | 0;
	            }
	            else {
	                lookupRed[k] = 0;
	                lookupGreen[k] = 0;
	                lookupBlue[k] = 0;
	                lookupAlpha[k] = 0;
	            }
	        }
	        this._reds = createArray1D(this._colors + 1);
	        this._greens = createArray1D(this._colors + 1);
	        this._blues = createArray1D(this._colors + 1);
	        this._alphas = createArray1D(this._colors + 1);
	        this._sums = createArray1D(this._colors + 1);
	        // scans and adds colors
	        for (var index = 0, l = this._pixels.length; index < l; index++) {
	            var color = this._pixels[index];
	            var match = -1;
	            var bestMatch = match, bestDistance = Number.MAX_VALUE;
	            for (var lookup = 0; lookup < this._colors; lookup++) {
	                var foundRed = lookupRed[lookup], foundGreen = lookupGreen[lookup], foundBlue = lookupBlue[lookup], foundAlpha = lookupAlpha[lookup];
	                var distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);
	                //var distance = this._distance.calculateRaw(Utils.Point.createByRGBA(foundRed, foundGreen, foundBlue, foundAlpha), color);
	                //deltaRed   = color.r - foundRed,
	                //deltaGreen = color.g - foundGreen,
	                //deltaBlue  = color.b - foundBlue,
	                //deltaAlpha = color.a - foundAlpha,
	                //distance   = deltaRed * deltaRed + deltaGreen * deltaGreen + deltaBlue * deltaBlue + deltaAlpha * deltaAlpha;
	                if (distance < bestDistance) {
	                    bestDistance = distance;
	                    bestMatch = lookup;
	                }
	            }
	            this._reds[bestMatch] += color.r;
	            this._greens[bestMatch] += color.g;
	            this._blues[bestMatch] += color.b;
	            this._alphas[bestMatch] += color.a;
	            this._sums[bestMatch]++;
	        }
	    };
	    WuQuant.prototype._addColor = function (color) {
	        var bitsToRemove = 8 - this._significantBitsPerChannel, indexRed = (color.r >> bitsToRemove) + 1, indexGreen = (color.g >> bitsToRemove) + 1, indexBlue = (color.b >> bitsToRemove) + 1, indexAlpha = (color.a >> bitsToRemove) + 1;
	        //if(color.a > 10) {
	        this._weights[indexAlpha][indexRed][indexGreen][indexBlue]++;
	        this._momentsRed[indexAlpha][indexRed][indexGreen][indexBlue] += color.r;
	        this._momentsGreen[indexAlpha][indexRed][indexGreen][indexBlue] += color.g;
	        this._momentsBlue[indexAlpha][indexRed][indexGreen][indexBlue] += color.b;
	        this._momentsAlpha[indexAlpha][indexRed][indexGreen][indexBlue] += color.a;
	        this._moments[indexAlpha][indexRed][indexGreen][indexBlue] += this._table[color.r] + this._table[color.g] + this._table[color.b] + this._table[color.a];
	        //			}
	    };
	    /**
	     * Converts the histogram to a series of _moments.
	     */
	    WuQuant.prototype._calculateMoments = function () {
	        var area = [], areaRed = [], areaGreen = [], areaBlue = [], areaAlpha = [], area2 = [];
	        var xarea = createArray3D(this._sideSize, this._sideSize, this._sideSize), xareaRed = createArray3D(this._sideSize, this._sideSize, this._sideSize), xareaGreen = createArray3D(this._sideSize, this._sideSize, this._sideSize), xareaBlue = createArray3D(this._sideSize, this._sideSize, this._sideSize), xareaAlpha = createArray3D(this._sideSize, this._sideSize, this._sideSize), xarea2 = createArray3D(this._sideSize, this._sideSize, this._sideSize);
	        for (var alphaIndex = 1; alphaIndex <= this._alphaMaxSideIndex; ++alphaIndex) {
	            fillArray3D(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
	            fillArray3D(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
	            fillArray3D(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
	            fillArray3D(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
	            fillArray3D(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
	            fillArray3D(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);
	            for (var redIndex = 1; redIndex <= this._maxSideIndex; ++redIndex) {
	                fillArray1D(area, this._sideSize, 0);
	                fillArray1D(areaRed, this._sideSize, 0);
	                fillArray1D(areaGreen, this._sideSize, 0);
	                fillArray1D(areaBlue, this._sideSize, 0);
	                fillArray1D(areaAlpha, this._sideSize, 0);
	                fillArray1D(area2, this._sideSize, 0);
	                for (var greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
	                    var line = 0, lineRed = 0, lineGreen = 0, lineBlue = 0, lineAlpha = 0, line2 = 0.0;
	                    for (var blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
	                        line += this._weights[alphaIndex][redIndex][greenIndex][blueIndex];
	                        lineRed += this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex];
	                        lineGreen += this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex];
	                        lineBlue += this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex];
	                        lineAlpha += this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex];
	                        line2 += this._moments[alphaIndex][redIndex][greenIndex][blueIndex];
	                        area[blueIndex] += line;
	                        areaRed[blueIndex] += lineRed;
	                        areaGreen[blueIndex] += lineGreen;
	                        areaBlue[blueIndex] += lineBlue;
	                        areaAlpha[blueIndex] += lineAlpha;
	                        area2[blueIndex] += line2;
	                        xarea[redIndex][greenIndex][blueIndex] = xarea[redIndex - 1][greenIndex][blueIndex] + area[blueIndex];
	                        xareaRed[redIndex][greenIndex][blueIndex] = xareaRed[redIndex - 1][greenIndex][blueIndex] + areaRed[blueIndex];
	                        xareaGreen[redIndex][greenIndex][blueIndex] = xareaGreen[redIndex - 1][greenIndex][blueIndex] + areaGreen[blueIndex];
	                        xareaBlue[redIndex][greenIndex][blueIndex] = xareaBlue[redIndex - 1][greenIndex][blueIndex] + areaBlue[blueIndex];
	                        xareaAlpha[redIndex][greenIndex][blueIndex] = xareaAlpha[redIndex - 1][greenIndex][blueIndex] + areaAlpha[blueIndex];
	                        xarea2[redIndex][greenIndex][blueIndex] = xarea2[redIndex - 1][greenIndex][blueIndex] + area2[blueIndex];
	                        this._weights[alphaIndex][redIndex][greenIndex][blueIndex] = this._weights[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea[redIndex][greenIndex][blueIndex];
	                        this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsRed[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaRed[redIndex][greenIndex][blueIndex];
	                        this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsGreen[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaGreen[redIndex][greenIndex][blueIndex];
	                        this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsBlue[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaBlue[redIndex][greenIndex][blueIndex];
	                        this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsAlpha[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaAlpha[redIndex][greenIndex][blueIndex];
	                        this._moments[alphaIndex][redIndex][greenIndex][blueIndex] = this._moments[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea2[redIndex][greenIndex][blueIndex];
	                    }
	                }
	            }
	        }
	    };
	    /**
	     * Computes the volume of the cube in a specific moment.
	     */
	    WuQuant._volumeFloat = function (cube, moment) {
	        return (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
	            moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
	            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
	            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
	            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
	            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
	            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
	            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
	            (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
	                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
	                moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
	                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
	                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
	                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
	                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] -
	                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	    };
	    /**
	     * Computes the volume of the cube in a specific moment.
	     */
	    WuQuant._volume = function (cube, moment) {
	        return WuQuant._volumeFloat(cube, moment) | 0;
	    };
	    /**
	     * Splits the cube in given position][and color direction.
	     */
	    WuQuant._top = function (cube, direction, position, moment) {
	        var result;
	        switch (direction) {
	            case WuQuant.alpha:
	                result = (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
	                    moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
	                    moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
	                    moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
	                    (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
	                        moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
	                        moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
	                        moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	                break;
	            case WuQuant.red:
	                result = (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMaximum] -
	                    moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMaximum] -
	                    moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMaximum]) -
	                    (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMinimum] -
	                        moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMinimum]);
	                break;
	            case WuQuant.green:
	                result = (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMaximum] -
	                    moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMaximum] -
	                    moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMaximum]) -
	                    (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMinimum] -
	                        moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMinimum]);
	                break;
	            case WuQuant.blue:
	                result = (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][position] -
	                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][position] -
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][position] +
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][position]) -
	                    (moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][position] -
	                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][position] -
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][position] +
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][position]);
	                break;
	            default:
	                throw new Error("impossible");
	        }
	        return result | 0;
	    };
	    /**
	     * Splits the cube in a given color direction at its minimum.
	     */
	    WuQuant._bottom = function (cube, direction, moment) {
	        switch (direction) {
	            case WuQuant.alpha:
	                return (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
	                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
	                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	            case WuQuant.red:
	                return (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
	                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
	                    (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
	                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	            case WuQuant.green:
	                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
	                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
	                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
	                    (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
	                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	            case WuQuant.blue:
	                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
	                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
	                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]) -
	                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
	                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
	            default:
	                // TODO: why here is return 0, and in this._top there is no default at all (now it is throw error)?
	                return 0;
	        }
	    };
	    /**
	     * Calculates statistical variance for a given cube.
	     */
	    WuQuant.prototype._calculateVariance = function (cube) {
	        var volumeRed = WuQuant._volume(cube, this._momentsRed), volumeGreen = WuQuant._volume(cube, this._momentsGreen), volumeBlue = WuQuant._volume(cube, this._momentsBlue), volumeAlpha = WuQuant._volume(cube, this._momentsAlpha), volumeMoment = WuQuant._volumeFloat(cube, this._moments), volumeWeight = WuQuant._volume(cube, this._weights), distance = volumeRed * volumeRed + volumeGreen * volumeGreen + volumeBlue * volumeBlue + volumeAlpha * volumeAlpha;
	        return volumeMoment - (distance / volumeWeight);
	    };
	    /**
	     * Finds the optimal (maximal) position for the cut.
	     */
	    WuQuant.prototype._maximize = function (cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight) {
	        var bottomRed = WuQuant._bottom(cube, direction, this._momentsRed) | 0, bottomGreen = WuQuant._bottom(cube, direction, this._momentsGreen) | 0, bottomBlue = WuQuant._bottom(cube, direction, this._momentsBlue) | 0, bottomAlpha = WuQuant._bottom(cube, direction, this._momentsAlpha) | 0, bottomWeight = WuQuant._bottom(cube, direction, this._weights) | 0;
	        var result = 0.0, cutPosition = -1;
	        for (var position = first; position < last; ++position) {
	            // determines the cube cut at a certain position
	            var halfRed = bottomRed + WuQuant._top(cube, direction, position, this._momentsRed), halfGreen = bottomGreen + WuQuant._top(cube, direction, position, this._momentsGreen), halfBlue = bottomBlue + WuQuant._top(cube, direction, position, this._momentsBlue), halfAlpha = bottomAlpha + WuQuant._top(cube, direction, position, this._momentsAlpha), halfWeight = bottomWeight + WuQuant._top(cube, direction, position, this._weights);
	            // the cube cannot be cut at bottom (this would lead to empty cube)
	            if (halfWeight != 0) {
	                var halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha, temp = halfDistance / halfWeight;
	                halfRed = wholeRed - halfRed;
	                halfGreen = wholeGreen - halfGreen;
	                halfBlue = wholeBlue - halfBlue;
	                halfAlpha = wholeAlpha - halfAlpha;
	                halfWeight = wholeWeight - halfWeight;
	                if (halfWeight != 0) {
	                    halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
	                    temp += halfDistance / halfWeight;
	                    if (temp > result) {
	                        result = temp;
	                        cutPosition = position;
	                    }
	                }
	            }
	        }
	        return { max: result, position: cutPosition };
	    };
	    // Cuts a cube with another one.
	    WuQuant.prototype._cut = function (first, second) {
	        var direction;
	        var wholeRed = WuQuant._volume(first, this._momentsRed), wholeGreen = WuQuant._volume(first, this._momentsGreen), wholeBlue = WuQuant._volume(first, this._momentsBlue), wholeAlpha = WuQuant._volume(first, this._momentsAlpha), wholeWeight = WuQuant._volume(first, this._weights), red = this._maximize(first, WuQuant.red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight), green = this._maximize(first, WuQuant.green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight), blue = this._maximize(first, WuQuant.blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight), alpha = this._maximize(first, WuQuant.alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
	        if (alpha.max >= red.max && alpha.max >= green.max && alpha.max >= blue.max) {
	            direction = WuQuant.alpha;
	            // cannot split empty cube
	            if (alpha.position < 0)
	                return false;
	        }
	        else {
	            if (red.max >= alpha.max && red.max >= green.max && red.max >= blue.max) {
	                direction = WuQuant.red;
	            }
	            else if (green.max >= alpha.max && green.max >= red.max && green.max >= blue.max) {
	                direction = WuQuant.green;
	            }
	            else {
	                direction = WuQuant.blue;
	            }
	        }
	        second.redMaximum = first.redMaximum;
	        second.greenMaximum = first.greenMaximum;
	        second.blueMaximum = first.blueMaximum;
	        second.alphaMaximum = first.alphaMaximum;
	        // cuts in a certain direction
	        switch (direction) {
	            case WuQuant.red:
	                second.redMinimum = first.redMaximum = red.position;
	                second.greenMinimum = first.greenMinimum;
	                second.blueMinimum = first.blueMinimum;
	                second.alphaMinimum = first.alphaMinimum;
	                break;
	            case WuQuant.green:
	                second.greenMinimum = first.greenMaximum = green.position;
	                second.redMinimum = first.redMinimum;
	                second.blueMinimum = first.blueMinimum;
	                second.alphaMinimum = first.alphaMinimum;
	                break;
	            case WuQuant.blue:
	                second.blueMinimum = first.blueMaximum = blue.position;
	                second.redMinimum = first.redMinimum;
	                second.greenMinimum = first.greenMinimum;
	                second.alphaMinimum = first.alphaMinimum;
	                break;
	            case WuQuant.alpha:
	                second.alphaMinimum = first.alphaMaximum = alpha.position;
	                second.blueMinimum = first.blueMinimum;
	                second.redMinimum = first.redMinimum;
	                second.greenMinimum = first.greenMinimum;
	                break;
	        }
	        // determines the volumes after cut
	        first.volume = (first.redMaximum - first.redMinimum) * (first.greenMaximum - first.greenMinimum) * (first.blueMaximum - first.blueMinimum) * (first.alphaMaximum - first.alphaMinimum);
	        second.volume = (second.redMaximum - second.redMinimum) * (second.greenMaximum - second.greenMinimum) * (second.blueMaximum - second.blueMinimum) * (second.alphaMaximum - second.alphaMinimum);
	        // the cut was successful
	        return true;
	    };
	    WuQuant.prototype._initialize = function (colors) {
	        this._colors = colors;
	        // creates all the _cubes
	        this._cubes = [];
	        // initializes all the _cubes
	        for (var cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
	            this._cubes[cubeIndex] = new WuColorCube();
	        }
	        // resets the reference minimums
	        this._cubes[0].redMinimum = 0;
	        this._cubes[0].greenMinimum = 0;
	        this._cubes[0].blueMinimum = 0;
	        this._cubes[0].alphaMinimum = 0;
	        // resets the reference maximums
	        this._cubes[0].redMaximum = this._maxSideIndex;
	        this._cubes[0].greenMaximum = this._maxSideIndex;
	        this._cubes[0].blueMaximum = this._maxSideIndex;
	        this._cubes[0].alphaMaximum = this._alphaMaxSideIndex;
	        this._weights = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._momentsRed = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._momentsBlue = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._moments = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
	        this._table = [];
	        for (var tableIndex = 0; tableIndex < 256; ++tableIndex) {
	            this._table[tableIndex] = tableIndex * tableIndex;
	        }
	        this._pixels = [];
	    };
	    WuQuant.prototype._setQuality = function (significantBitsPerChannel) {
	        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
	        this._significantBitsPerChannel = significantBitsPerChannel;
	        this._maxSideIndex = 1 << this._significantBitsPerChannel;
	        this._alphaMaxSideIndex = this._maxSideIndex;
	        this._sideSize = this._maxSideIndex + 1;
	        this._alphaSideSize = this._alphaMaxSideIndex + 1;
	    };
	    WuQuant.alpha = 3;
	    WuQuant.red = 2;
	    WuQuant.green = 1;
	    WuQuant.blue = 0;
	    return WuQuant;
	}());
	exports.WuQuant = WuQuant;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var nearestColor_1 = __webpack_require__(31);
	exports.NearestColor = nearestColor_1.NearestColor;
	var array_1 = __webpack_require__(32);
	exports.ErrorDiffusionArray = array_1.ErrorDiffusionArray;
	exports.ErrorDiffusionArrayKernel = array_1.ErrorDiffusionArrayKernel;
	var riemersma_1 = __webpack_require__(33);
	exports.ErrorDiffusionRiemersma = riemersma_1.ErrorDiffusionRiemersma;


/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	var NearestColor = (function () {
	    function NearestColor(colorDistanceCalculator) {
	        this._distance = colorDistanceCalculator;
	    }
	    NearestColor.prototype.quantize = function (pointBuffer, palette) {
	        var pointArray = pointBuffer.getPointArray(), width = pointBuffer.getWidth(), height = pointBuffer.getHeight();
	        for (var y = 0; y < height; y++) {
	            for (var x = 0, idx = y * width; x < width; x++, idx++) {
	                // Image pixel
	                var point = pointArray[idx];
	                // Reduced pixel
	                point.from(palette.getNearestColor(this._distance, point));
	            }
	        }
	        return pointBuffer;
	    };
	    return NearestColor;
	}());
	exports.NearestColor = NearestColor;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var point_1 = __webpack_require__(24);
	var arithmetic_1 = __webpack_require__(6);
	// TODO: is it the best name for this enum "kernel"?
	(function (ErrorDiffusionArrayKernel) {
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FloydSteinberg"] = 0] = "FloydSteinberg";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FalseFloydSteinberg"] = 1] = "FalseFloydSteinberg";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Stucki"] = 2] = "Stucki";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Atkinson"] = 3] = "Atkinson";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Jarvis"] = 4] = "Jarvis";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Burkes"] = 5] = "Burkes";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Sierra"] = 6] = "Sierra";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["TwoSierra"] = 7] = "TwoSierra";
	    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["SierraLite"] = 8] = "SierraLite";
	})(exports.ErrorDiffusionArrayKernel || (exports.ErrorDiffusionArrayKernel = {}));
	var ErrorDiffusionArrayKernel = exports.ErrorDiffusionArrayKernel;
	// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
	var ErrorDiffusionArray = (function () {
	    function ErrorDiffusionArray(colorDistanceCalculator, kernel, serpentine, minimumColorDistanceToDither, calculateErrorLikeGIMP) {
	        if (serpentine === void 0) { serpentine = true; }
	        if (minimumColorDistanceToDither === void 0) { minimumColorDistanceToDither = 0; }
	        if (calculateErrorLikeGIMP === void 0) { calculateErrorLikeGIMP = false; }
	        this._setKernel(kernel);
	        this._distance = colorDistanceCalculator;
	        this._minColorDistance = minimumColorDistanceToDither;
	        this._serpentine = serpentine;
	        this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
	    }
	    // adapted from http://jsbin.com/iXofIji/2/edit by PAEz
	    // fixed version. it doesn't use image pixels as error storage, also it doesn't have 0.3 + 0.3 + 0.3 + 0.3 = 0 error
	    ErrorDiffusionArray.prototype.quantize = function (pointBuffer, palette) {
	        var pointArray = pointBuffer.getPointArray(), originalPoint = new point_1.Point(), width = pointBuffer.getWidth(), height = pointBuffer.getHeight(), errorLines = [];
	        var dir = 1, maxErrorLines = 1;
	        // initial error lines (number is taken from dithering kernel)
	        for (var i = 0; i < this._kernel.length; i++) {
	            var kernelErrorLines = this._kernel[i][2] + 1;
	            if (maxErrorLines < kernelErrorLines)
	                maxErrorLines = kernelErrorLines;
	        }
	        for (var i = 0; i < maxErrorLines; i++) {
	            this._fillErrorLine(errorLines[i] = [], width);
	        }
	        for (var y = 0; y < height; y++) {
	            // always serpentine
	            if (this._serpentine)
	                dir = dir * -1;
	            var lni = y * width, xStart = dir == 1 ? 0 : width - 1, xEnd = dir == 1 ? width : -1;
	            // cyclic shift with erasing
	            this._fillErrorLine(errorLines[0], width);
	            // TODO: why it is needed to cast types here?
	            errorLines.push(errorLines.shift());
	            var errorLine = errorLines[0];
	            for (var x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
	                // Image pixel
	                var point = pointArray[idx], 
	                //originalPoint = new Utils.Point(),
	                error = errorLine[x];
	                originalPoint.from(point);
	                var correctedPoint = point_1.Point.createByRGBA(arithmetic_1.inRange0to255Rounded(point.r + error[0]), arithmetic_1.inRange0to255Rounded(point.g + error[1]), arithmetic_1.inRange0to255Rounded(point.b + error[2]), arithmetic_1.inRange0to255Rounded(point.a + error[3]));
	                // Reduced pixel
	                var palettePoint = palette.getNearestColor(this._distance, correctedPoint);
	                point.from(palettePoint);
	                // dithering strength
	                if (this._minColorDistance) {
	                    var dist = this._distance.calculateNormalized(point, palettePoint);
	                    if (dist < this._minColorDistance)
	                        continue;
	                }
	                // Component distance
	                var er = void 0, eg = void 0, eb = void 0, ea = void 0;
	                if (this._calculateErrorLikeGIMP) {
	                    er = correctedPoint.r - palettePoint.r;
	                    eg = correctedPoint.g - palettePoint.g;
	                    eb = correctedPoint.b - palettePoint.b;
	                    ea = correctedPoint.a - palettePoint.a;
	                }
	                else {
	                    er = originalPoint.r - palettePoint.r;
	                    eg = originalPoint.g - palettePoint.g;
	                    eb = originalPoint.b - palettePoint.b;
	                    ea = originalPoint.a - palettePoint.a;
	                }
	                var dStart = dir == 1 ? 0 : this._kernel.length - 1, dEnd = dir == 1 ? this._kernel.length : -1;
	                for (var i = dStart; i !== dEnd; i += dir) {
	                    var x1 = this._kernel[i][1] * dir, y1 = this._kernel[i][2];
	                    if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
	                        var d = this._kernel[i][0], e = errorLines[y1][x1 + x];
	                        e[0] = e[0] + er * d;
	                        e[1] = e[1] + eg * d;
	                        e[2] = e[2] + eb * d;
	                        e[3] = e[3] + ea * d;
	                    }
	                }
	            }
	        }
	        return pointBuffer;
	    };
	    ErrorDiffusionArray.prototype._fillErrorLine = function (errorLine, width) {
	        // shrink
	        if (errorLine.length > width) {
	            errorLine.length = width;
	        }
	        // reuse existing arrays
	        var l = errorLine.length;
	        for (var i = 0; i < l; i++) {
	            var error = errorLine[i];
	            error[0] = error[1] = error[2] = error[3] = 0;
	        }
	        // create missing arrays
	        for (var i = l; i < width; i++) {
	            errorLine[i] = [0.0, 0.0, 0.0, 0.0];
	        }
	    };
	    ErrorDiffusionArray.prototype._setKernel = function (kernel) {
	        switch (kernel) {
	            case ErrorDiffusionArrayKernel.FloydSteinberg:
	                this._kernel = [
	                    [7 / 16, 1, 0],
	                    [3 / 16, -1, 1],
	                    [5 / 16, 0, 1],
	                    [1 / 16, 1, 1]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.FalseFloydSteinberg:
	                this._kernel = [
	                    [3 / 8, 1, 0],
	                    [3 / 8, 0, 1],
	                    [2 / 8, 1, 1]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.Stucki:
	                this._kernel = [
	                    [8 / 42, 1, 0],
	                    [4 / 42, 2, 0],
	                    [2 / 42, -2, 1],
	                    [4 / 42, -1, 1],
	                    [8 / 42, 0, 1],
	                    [4 / 42, 1, 1],
	                    [2 / 42, 2, 1],
	                    [1 / 42, -2, 2],
	                    [2 / 42, -1, 2],
	                    [4 / 42, 0, 2],
	                    [2 / 42, 1, 2],
	                    [1 / 42, 2, 2]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.Atkinson:
	                this._kernel = [
	                    [1 / 8, 1, 0],
	                    [1 / 8, 2, 0],
	                    [1 / 8, -1, 1],
	                    [1 / 8, 0, 1],
	                    [1 / 8, 1, 1],
	                    [1 / 8, 0, 2]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.Jarvis:
	                this._kernel = [
	                    [7 / 48, 1, 0],
	                    [5 / 48, 2, 0],
	                    [3 / 48, -2, 1],
	                    [5 / 48, -1, 1],
	                    [7 / 48, 0, 1],
	                    [5 / 48, 1, 1],
	                    [3 / 48, 2, 1],
	                    [1 / 48, -2, 2],
	                    [3 / 48, -1, 2],
	                    [5 / 48, 0, 2],
	                    [3 / 48, 1, 2],
	                    [1 / 48, 2, 2]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.Burkes:
	                this._kernel = [
	                    [8 / 32, 1, 0],
	                    [4 / 32, 2, 0],
	                    [2 / 32, -2, 1],
	                    [4 / 32, -1, 1],
	                    [8 / 32, 0, 1],
	                    [4 / 32, 1, 1],
	                    [2 / 32, 2, 1],
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.Sierra:
	                this._kernel = [
	                    [5 / 32, 1, 0],
	                    [3 / 32, 2, 0],
	                    [2 / 32, -2, 1],
	                    [4 / 32, -1, 1],
	                    [5 / 32, 0, 1],
	                    [4 / 32, 1, 1],
	                    [2 / 32, 2, 1],
	                    [2 / 32, -1, 2],
	                    [3 / 32, 0, 2],
	                    [2 / 32, 1, 2]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.TwoSierra:
	                this._kernel = [
	                    [4 / 16, 1, 0],
	                    [3 / 16, 2, 0],
	                    [1 / 16, -2, 1],
	                    [2 / 16, -1, 1],
	                    [3 / 16, 0, 1],
	                    [2 / 16, 1, 1],
	                    [1 / 16, 2, 1]
	                ];
	                break;
	            case ErrorDiffusionArrayKernel.SierraLite:
	                this._kernel = [
	                    [2 / 4, 1, 0],
	                    [1 / 4, -1, 1],
	                    [1 / 4, 0, 1]
	                ];
	                break;
	            default:
	                throw new Error("ErrorDiffusionArray: unknown kernel = " + kernel);
	        }
	    };
	    return ErrorDiffusionArray;
	}());
	exports.ErrorDiffusionArray = ErrorDiffusionArray;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hilbertCurve_1 = __webpack_require__(34);
	var point_1 = __webpack_require__(24);
	var arithmetic_1 = __webpack_require__(6);
	var ErrorDiffusionRiemersma = (function () {
	    function ErrorDiffusionRiemersma(colorDistanceCalculator, errorQueueSize, errorPropagation) {
	        if (errorQueueSize === void 0) { errorQueueSize = 16; }
	        if (errorPropagation === void 0) { errorPropagation = 1; }
	        this._distance = colorDistanceCalculator;
	        this._errorPropagation = errorPropagation;
	        this._errorQueueSize = errorQueueSize;
	        this._max = this._errorQueueSize;
	        this._createWeights();
	    }
	    ErrorDiffusionRiemersma.prototype.quantize = function (pointBuffer, palette) {
	        var _this = this;
	        var curve = new hilbertCurve_1.HilbertCurveBase(), pointArray = pointBuffer.getPointArray(), width = pointBuffer.getWidth(), height = pointBuffer.getHeight(), errorQueue = [];
	        var head = 0;
	        for (var i = 0; i < this._errorQueueSize; i++) {
	            errorQueue[i] = { r: 0, g: 0, b: 0, a: 0 };
	        }
	        curve.walk(width, height, function (x, y) {
	            var p = pointArray[x + y * width];
	            var r = p.r, g = p.g, b = p.b, a = p.a;
	            for (var i = 0; i < _this._errorQueueSize; i++) {
	                var weight = _this._weights[i], e = errorQueue[(i + head) % _this._errorQueueSize];
	                r += e.r * weight;
	                g += e.g * weight;
	                b += e.b * weight;
	                a += e.a * weight;
	            }
	            var correctedPoint = point_1.Point.createByRGBA(arithmetic_1.inRange0to255Rounded(r), arithmetic_1.inRange0to255Rounded(g), arithmetic_1.inRange0to255Rounded(b), arithmetic_1.inRange0to255Rounded(a));
	            var quantizedPoint = palette.getNearestColor(_this._distance, correctedPoint);
	            // update head and calculate tail
	            head = (head + 1) % _this._errorQueueSize;
	            var tail = (head + _this._errorQueueSize - 1) % _this._errorQueueSize;
	            // update error with new value
	            errorQueue[tail].r = p.r - quantizedPoint.r;
	            errorQueue[tail].g = p.g - quantizedPoint.g;
	            errorQueue[tail].b = p.b - quantizedPoint.b;
	            errorQueue[tail].a = p.a - quantizedPoint.a;
	            // update point
	            p.from(quantizedPoint);
	        });
	        return pointBuffer;
	    };
	    ErrorDiffusionRiemersma.prototype._createWeights = function () {
	        this._weights = [];
	        var multiplier = Math.exp(Math.log(this._max) / (this._errorQueueSize - 1));
	        for (var i = 0, next = 1; i < this._errorQueueSize; i++) {
	            this._weights[i] = (((next + 0.5) | 0) / this._max) * this._errorPropagation;
	            next *= multiplier;
	        }
	    };
	    return ErrorDiffusionRiemersma;
	}());
	exports.ErrorDiffusionRiemersma = ErrorDiffusionRiemersma;


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	var Direction;
	(function (Direction) {
	    Direction[Direction["NONE"] = 0] = "NONE";
	    Direction[Direction["UP"] = 1] = "UP";
	    Direction[Direction["LEFT"] = 2] = "LEFT";
	    Direction[Direction["RIGHT"] = 3] = "RIGHT";
	    Direction[Direction["DOWN"] = 4] = "DOWN";
	})(Direction || (Direction = {}));
	// Check code against double-entrance into walk (walk=> callback => walk)
	var HilbertCurveBase = (function () {
	    function HilbertCurveBase() {
	    }
	    HilbertCurveBase.prototype.walk = function (width, height, visitorCallback) {
	        this._x = 0;
	        this._y = 0;
	        this._d = 0;
	        this._width = width;
	        this._height = height;
	        this._callback = visitorCallback;
	        var maxBound = Math.max(width, height);
	        this._level = (Math.log(maxBound) / Math.log(2) + 1) | 0;
	        this._walkHilbert(Direction.UP);
	        this._visit(Direction.NONE);
	    };
	    HilbertCurveBase.prototype._walkHilbert = function (direction) {
	        if (this._level < 1)
	            return;
	        this._level--;
	        switch (direction) {
	            case Direction.LEFT:
	                this._walkHilbert(Direction.UP);
	                this._visit(Direction.RIGHT);
	                this._walkHilbert(Direction.LEFT);
	                this._visit(Direction.DOWN);
	                this._walkHilbert(Direction.LEFT);
	                this._visit(Direction.LEFT);
	                this._walkHilbert(Direction.DOWN);
	                break;
	            case Direction.RIGHT:
	                this._walkHilbert(Direction.DOWN);
	                this._visit(Direction.LEFT);
	                this._walkHilbert(Direction.RIGHT);
	                this._visit(Direction.UP);
	                this._walkHilbert(Direction.RIGHT);
	                this._visit(Direction.RIGHT);
	                this._walkHilbert(Direction.UP);
	                break;
	            case Direction.UP:
	                this._walkHilbert(Direction.LEFT);
	                this._visit(Direction.DOWN);
	                this._walkHilbert(Direction.UP);
	                this._visit(Direction.RIGHT);
	                this._walkHilbert(Direction.UP);
	                this._visit(Direction.UP);
	                this._walkHilbert(Direction.RIGHT);
	                break;
	            case Direction.DOWN:
	                this._walkHilbert(Direction.RIGHT);
	                this._visit(Direction.UP);
	                this._walkHilbert(Direction.DOWN);
	                this._visit(Direction.LEFT);
	                this._walkHilbert(Direction.DOWN);
	                this._visit(Direction.DOWN);
	                this._walkHilbert(Direction.LEFT);
	                break;
	            default:
	                break;
	        }
	        this._level++;
	    };
	    HilbertCurveBase.prototype._visit = function (direction) {
	        if (this._x >= 0 && this._x < this._width && this._y >= 0 && this._y < this._height) {
	            this._callback(this._x, this._y, this._d);
	            this._d++;
	        }
	        switch (direction) {
	            case Direction.LEFT:
	                this._x--;
	                break;
	            case Direction.RIGHT:
	                this._x++;
	                break;
	            case Direction.UP:
	                this._y--;
	                break;
	            case Direction.DOWN:
	                this._y++;
	                break;
	        }
	    };
	    return HilbertCurveBase;
	}());
	exports.HilbertCurveBase = HilbertCurveBase;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * iq.ts - Image Quantization Library
	 */
	var ssim_1 = __webpack_require__(36);
	exports.SSIM = ssim_1.SSIM;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var bt709_1 = __webpack_require__(2);
	// based on https://github.com/rhys-e/structural-similarity
	// http://en.wikipedia.org/wiki/Structural_similarity
	var K1 = 0.01, K2 = 0.03;
	var SSIM = (function () {
	    function SSIM() {
	    }
	    SSIM.prototype.compare = function (image1, image2) {
	        if (image1.getHeight() !== image2.getHeight() || image1.getWidth() !== image2.getWidth()) {
	            throw new Error("Images have different sizes!");
	        }
	        var bitsPerComponent = 8, L = (1 << bitsPerComponent) - 1, c1 = Math.pow((K1 * L), 2), c2 = Math.pow((K2 * L), 2);
	        var numWindows = 0, mssim = 0.0;
	        //calculate ssim for each window
	        this._iterate(image1, image2, function (lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) {
	            //calculate variance and covariance
	            var sigxy = 0.0, sigsqx = 0.0, sigsqy = 0.0;
	            for (var i = 0; i < lumaValues1.length; i++) {
	                sigsqx += Math.pow((lumaValues1[i] - averageLumaValue1), 2);
	                sigsqy += Math.pow((lumaValues2[i] - averageLumaValue2), 2);
	                sigxy += (lumaValues1[i] - averageLumaValue1) * (lumaValues2[i] - averageLumaValue2);
	            }
	            var numPixelsInWin = lumaValues1.length - 1;
	            sigsqx /= numPixelsInWin;
	            sigsqy /= numPixelsInWin;
	            sigxy /= numPixelsInWin;
	            //perform ssim calculation on window
	            var numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2), denominator = (Math.pow(averageLumaValue1, 2) + Math.pow(averageLumaValue2, 2) + c1) * (sigsqx + sigsqy + c2), ssim = numerator / denominator;
	            mssim += ssim;
	            numWindows++;
	        });
	        return mssim / numWindows;
	    };
	    SSIM.prototype._iterate = function (image1, image2, callback) {
	        var windowSize = 8, width = image1.getWidth(), height = image1.getHeight();
	        for (var y = 0; y < height; y += windowSize) {
	            for (var x = 0; x < width; x += windowSize) {
	                // avoid out-of-width/height
	                var windowWidth = Math.min(windowSize, width - x), windowHeight = Math.min(windowSize, height - y);
	                var lumaValues1 = this._calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight), lumaValues2 = this._calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight), averageLuma1 = this._calculateAverageLuma(lumaValues1), averageLuma2 = this._calculateAverageLuma(lumaValues2);
	                callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
	            }
	        }
	    };
	    SSIM.prototype._calculateLumaValuesForWindow = function (image, x, y, width, height) {
	        var pointArray = image.getPointArray(), lumaValues = [];
	        var counter = 0;
	        for (var j = y; j < y + height; j++) {
	            var offset = j * image.getWidth();
	            for (var i = x; i < x + width; i++) {
	                var point = pointArray[offset + i];
	                lumaValues[counter] = point.r * bt709_1.Y.RED + point.g * bt709_1.Y.GREEN + point.b * bt709_1.Y.BLUE;
	                counter++;
	            }
	        }
	        return lumaValues;
	    };
	    SSIM.prototype._calculateAverageLuma = function (lumaValues) {
	        var sumLuma = 0.0;
	        for (var i = 0; i < lumaValues.length; i++) {
	            sumLuma += lumaValues[i];
	        }
	        return sumLuma / lumaValues.length;
	    };
	    return SSIM;
	}());
	exports.SSIM = SSIM;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @preserve
	 * Copyright 2015-2016 Igor Bezkrovnyi
	 * All rights reserved. (MIT Licensed)
	 *
	 * iq.ts - Image Quantization Library
	 */
	var arithmetic = __webpack_require__(6);
	exports.arithmetic = arithmetic;
	var hueStatistics_1 = __webpack_require__(28);
	exports.HueStatistics = hueStatistics_1.HueStatistics;
	var palette_1 = __webpack_require__(22);
	exports.Palette = palette_1.Palette;
	var point_1 = __webpack_require__(24);
	exports.Point = point_1.Point;
	var pointContainer_1 = __webpack_require__(23);
	exports.PointContainer = pointContainer_1.PointContainer;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=iq.js.map