(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
  typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.troika_three_utils = {}, global.THREE));
}(this, (function (exports, three) { 'use strict';

  /**
   * Regular expression for matching the `void main() {` opener line in GLSL.
   * @type {RegExp}
   */
  var voidMainRegExp = /\bvoid\s+main\s*\(\s*\)\s*{/g;

  /**
   * Recursively expands all `#include <xyz>` statements within string of shader code.
   * Copied from three's WebGLProgram#parseIncludes for external use.
   *
   * @param {string} source - The GLSL source code to evaluate
   * @return {string} The GLSL code with all includes expanded
   */
  function expandShaderIncludes( source ) {
    var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
    function replace(match, include) {
      var chunk = three.ShaderChunk[include];
      return chunk ? expandShaderIncludes(chunk) : match
    }
    return source.replace( pattern, replace )
  }

  /*
   * This is a direct copy of MathUtils.generateUUID from Three.js, to preserve compatibility with three
   * versions before 0.113.0 as it was changed from Math to MathUtils in that version.
   * https://github.com/mrdoob/three.js/blob/dd8b5aa3b270c17096b90945cd2d6d1b13aaec53/src/math/MathUtils.js#L16
   */

  var _lut = [];

  for (var i = 0; i < 256; i++) {
    _lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }

  function generateUUID() {

    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    var uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
      _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
      _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
      _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

    // .toUpperCase() here flattens concatenated strings to save heap memory space.
    return uuid.toUpperCase()

  }

  // Local assign polyfill to avoid importing troika-core
  var assign = Object.assign || function(/*target, ...sources*/) {
    var arguments$1 = arguments;

    var target = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
      var source = arguments$1[i];
      if (source) {
        for (var prop in source) {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        }
      }
    }
    return target
  };


  var epoch = Date.now();
  var CONSTRUCTOR_CACHE = new WeakMap();
  var SHADER_UPGRADE_CACHE = new Map();

  // Material ids must be integers, but we can't access the increment from Three's `Material` module,
  // so let's choose a sufficiently large starting value that should theoretically never collide.
  var materialInstanceId = 1e10;

  /**
   * A utility for creating a custom shader material derived from another material's
   * shaders. This allows you to inject custom shader logic and transforms into the
   * builtin ThreeJS materials without having to recreate them from scratch.
   *
   * @param {THREE.Material} baseMaterial - the original material to derive from
   *
   * @param {Object} options - How the base material should be modified.
   * @param {Object} options.defines - Custom `defines` for the material
   * @param {Object} options.extensions - Custom `extensions` for the material, e.g. `{derivatives: true}`
   * @param {Object} options.uniforms - Custom `uniforms` for use in the modified shader. These can
   *        be accessed and manipulated via the resulting material's `uniforms` property, just like
   *        in a ShaderMaterial. You do not need to repeat the base material's own uniforms here.
   * @param {String} options.timeUniform - If specified, a uniform of this name will be injected into
   *        both shaders, and it will automatically be updated on each render frame with a number of
   *        elapsed milliseconds. The "zero" epoch time is not significant so don't rely on this as a
   *        true calendar time.
   * @param {String} options.vertexDefs - Custom GLSL code to inject into the vertex shader's top-level
   *        definitions, above the `void main()` function.
   * @param {String} options.vertexMainIntro - Custom GLSL code to inject at the top of the vertex
   *        shader's `void main` function.
   * @param {String} options.vertexMainOutro - Custom GLSL code to inject at the end of the vertex
   *        shader's `void main` function.
   * @param {String} options.vertexTransform - Custom GLSL code to manipulate the `position`, `normal`,
   *        and/or `uv` vertex attributes. This code will be wrapped within a standalone function with
   *        those attributes exposed by their normal names as read/write values.
   * @param {String} options.fragmentDefs - Custom GLSL code to inject into the fragment shader's top-level
   *        definitions, above the `void main()` function.
   * @param {String} options.fragmentMainIntro - Custom GLSL code to inject at the top of the fragment
   *        shader's `void main` function.
   * @param {String} options.fragmentMainOutro - Custom GLSL code to inject at the end of the fragment
   *        shader's `void main` function. You can manipulate `gl_FragColor` here but keep in mind it goes
   *        after any of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), so if you
   *        want those to apply to your changes use `fragmentColorTransform` instead.
   * @param {String} options.fragmentColorTransform - Custom GLSL code to manipulate the `gl_FragColor`
   *        output value. Will be injected near the end of the `void main` function, but before any
   *        of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), and before the
   *        `fragmentMainOutro`.
   * @param {function<{vertexShader,fragmentShader}>:{vertexShader,fragmentShader}} options.customRewriter - A function
   *        for performing custom rewrites of the full shader code. Useful if you need to do something
   *        special that's not covered by the other builtin options. This function will be executed before
   *        any other transforms are applied.
   * @param {boolean} options.chained - Set to `true` to prototype-chain the derived material to the base
   *        material, rather than the default behavior of copying it. This allows the derived material to
   *        automatically pick up changes made to the base material and its properties. This can be useful
   *        where the derived material is hidden from the user as an implementation detail, allowing them
   *        to work with the original material like normal. But it can result in unexpected behavior if not
   *        handled carefully.
   *
   * @return {THREE.Material}
   *
   * The returned material will also have two new methods, `getDepthMaterial()` and `getDistanceMaterial()`,
   * which can be called to get a variant of the derived material for use in shadow casting. If the
   * target mesh is expected to cast shadows, then you can assign these to the mesh's `customDepthMaterial`
   * (for directional and spot lights) and/or `customDistanceMaterial` (for point lights) properties to
   * allow the cast shadow to honor your derived shader's vertex transforms and discarded fragments. These
   * will also set a custom `#define IS_DEPTH_MATERIAL` or `#define IS_DISTANCE_MATERIAL` that you can look
   * for in your derived shaders with `#ifdef` to customize their behavior for the depth or distance
   * scenarios, e.g. skipping antialiasing or expensive shader logic.
   */
  function createDerivedMaterial(baseMaterial, options) {
    // Generate a key that is unique to the content of these `options`. We'll use this
    // throughout for caching and for generating the upgraded shader code. This increases
    // the likelihood that the resulting shaders will line up across multiple calls so
    // their GL programs can be shared and cached.
    var optionsKey = getKeyForOptions(options);

    // First check to see if we've already derived from this baseMaterial using this
    // unique set of options, and if so reuse the constructor to avoid some allocations.
    var ctorsByDerivation = CONSTRUCTOR_CACHE.get(baseMaterial);
    if (!ctorsByDerivation) {
      CONSTRUCTOR_CACHE.set(baseMaterial, (ctorsByDerivation = Object.create(null)));
    }
    if (ctorsByDerivation[optionsKey]) {
      return new ctorsByDerivation[optionsKey]()
    }

    var privateBeforeCompileProp = "_onBeforeCompile" + optionsKey;

    // Private onBeforeCompile handler that injects the modified shaders and uniforms when
    // the renderer switches to this material's program
    var onBeforeCompile = function (shaderInfo) {
      baseMaterial.onBeforeCompile.call(this, shaderInfo);

      // Upgrade the shaders, caching the result by incoming source code
      var cacheKey = optionsKey + '|||' + shaderInfo.vertexShader + '|||' + shaderInfo.fragmentShader;
      var upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey];
      if (!upgradedShaders) {
        var upgraded = upgradeShaders(shaderInfo, options, optionsKey);
        upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey] = upgraded;
      }

      // Inject upgraded shaders and uniforms into the program
      shaderInfo.vertexShader = upgradedShaders.vertexShader;
      shaderInfo.fragmentShader = upgradedShaders.fragmentShader;
      assign(shaderInfo.uniforms, this.uniforms);

      // Inject auto-updating time uniform if requested
      if (options.timeUniform) {
        shaderInfo.uniforms[options.timeUniform] = {
          get value() {return Date.now() - epoch}
        };
      }

      // Users can still add their own handlers on top of ours
      if (this[privateBeforeCompileProp]) {
        this[privateBeforeCompileProp](shaderInfo);
      }
    };

    var DerivedMaterial = function DerivedMaterial() {
      return derive(options.chained ? baseMaterial : baseMaterial.clone())
    };

    var derive = function(base) {
      // Prototype chain to the base material
      var derived = Object.create(base, descriptor);

      // Store the baseMaterial for reference; this is always the original even when cloning
      Object.defineProperty(derived, 'baseMaterial', { value: baseMaterial });

      // Needs its own ids
      Object.defineProperty(derived, 'id', { value: materialInstanceId++ });
      derived.uuid = generateUUID();

      // Merge uniforms, defines, and extensions
      derived.uniforms = assign({}, base.uniforms, options.uniforms);
      derived.defines = assign({}, base.defines, options.defines);
      derived.defines[("TROIKA_DERIVED_MATERIAL_" + optionsKey)] = ''; //force a program change from the base material
      derived.extensions = assign({}, base.extensions, options.extensions);

      // Don't inherit EventDispatcher listeners
      derived._listeners = undefined;

      return derived
    };

    var descriptor = {
      constructor: {value: DerivedMaterial},
      isDerivedMaterial: {value: true},

      customProgramCacheKey: {
        writable: true,
        configurable: true,
        value: function () {
          return optionsKey
        }
      },

      onBeforeCompile: {
        get: function get() {
          return onBeforeCompile
        },
        set: function set(fn) {
          this[privateBeforeCompileProp] = fn;
        }
      },

      copy: {
        writable: true,
        configurable: true,
        value: function (source) {
          baseMaterial.copy.call(this, source);
          if (!baseMaterial.isShaderMaterial && !baseMaterial.isDerivedMaterial) {
            assign(this.extensions, source.extensions);
            assign(this.defines, source.defines);
            assign(this.uniforms, three.UniformsUtils.clone(source.uniforms));
          }
          return this
        }
      },

      clone: {
        writable: true,
        configurable: true,
        value: function () {
          var newBase = new baseMaterial.constructor();
          return derive(newBase).copy(this)
        }
      },

      /**
       * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
       * transformations and discarded fragments.
       */
      getDepthMaterial: {
        writable: true,
        configurable: true,
        value: function() {
          var depthMaterial = this._depthMaterial;
          if (!depthMaterial) {
            depthMaterial = this._depthMaterial = createDerivedMaterial(
              baseMaterial.isDerivedMaterial
                ? baseMaterial.getDepthMaterial()
                : new three.MeshDepthMaterial({ depthPacking: three.RGBADepthPacking }),
              options
            );
            depthMaterial.defines.IS_DEPTH_MATERIAL = '';
            depthMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
          }
          return depthMaterial
        }
      },

      /**
       * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
       * transformations and discarded fragments.
       */
      getDistanceMaterial: {
        writable: true,
        configurable: true,
        value: function() {
          var distanceMaterial = this._distanceMaterial;
          if (!distanceMaterial) {
            distanceMaterial = this._distanceMaterial = createDerivedMaterial(
              baseMaterial.isDerivedMaterial
                ? baseMaterial.getDistanceMaterial()
                : new three.MeshDistanceMaterial(),
              options
            );
            distanceMaterial.defines.IS_DISTANCE_MATERIAL = '';
            distanceMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
          }
          return distanceMaterial
        }
      },

      dispose: {
        writable: true,
        configurable: true,
        value: function value() {
          var ref = this;
          var _depthMaterial = ref._depthMaterial;
          var _distanceMaterial = ref._distanceMaterial;
          if (_depthMaterial) { _depthMaterial.dispose(); }
          if (_distanceMaterial) { _distanceMaterial.dispose(); }
          baseMaterial.dispose.call(this);
        }
      }
    };

    ctorsByDerivation[optionsKey] = DerivedMaterial;
    return new DerivedMaterial()
  }


  function upgradeShaders(ref, options, key) {
    var vertexShader = ref.vertexShader;
    var fragmentShader = ref.fragmentShader;

    var vertexDefs = options.vertexDefs;
    var vertexMainIntro = options.vertexMainIntro;
    var vertexMainOutro = options.vertexMainOutro;
    var vertexTransform = options.vertexTransform;
    var fragmentDefs = options.fragmentDefs;
    var fragmentMainIntro = options.fragmentMainIntro;
    var fragmentMainOutro = options.fragmentMainOutro;
    var fragmentColorTransform = options.fragmentColorTransform;
    var customRewriter = options.customRewriter;
    var timeUniform = options.timeUniform;

    vertexDefs = vertexDefs || '';
    vertexMainIntro = vertexMainIntro || '';
    vertexMainOutro = vertexMainOutro || '';
    fragmentDefs = fragmentDefs || '';
    fragmentMainIntro = fragmentMainIntro || '';
    fragmentMainOutro = fragmentMainOutro || '';

    // Expand includes if needed
    if (vertexTransform || customRewriter) {
      vertexShader = expandShaderIncludes(vertexShader);
    }
    if (fragmentColorTransform || customRewriter) {
      // We need to be able to find postprocessing chunks after include expansion in order to
      // put them after the fragmentColorTransform, so mark them with comments first. Even if
      // this particular derivation doesn't have a fragmentColorTransform, other derivations may,
      // so we still mark them.
      fragmentShader = fragmentShader.replace(
        /^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,
        '\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n'
      );
      fragmentShader = expandShaderIncludes(fragmentShader);
    }

    // Apply custom rewriter function
    if (customRewriter) {
      var res = customRewriter({vertexShader: vertexShader, fragmentShader: fragmentShader});
      vertexShader = res.vertexShader;
      fragmentShader = res.fragmentShader;
    }

    // The fragmentColorTransform needs to go before any postprocessing chunks, so extract
    // those and re-insert them into the outro in the correct place:
    if (fragmentColorTransform) {
      var postChunks = [];
      fragmentShader = fragmentShader.replace(
        /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm, // [^]+? = non-greedy match of any chars including newlines
        function (match) {
          postChunks.push(match);
          return ''
        }
      );
      fragmentMainOutro = fragmentColorTransform + "\n" + (postChunks.join('\n')) + "\n" + fragmentMainOutro;
    }

    // Inject auto-updating time uniform if requested
    if (timeUniform) {
      var code = "\nuniform float " + timeUniform + ";\n";
      vertexDefs = code + vertexDefs;
      fragmentDefs = code + fragmentDefs;
    }

    // Inject a function for the vertexTransform and rename all usages of position/normal/uv
    if (vertexTransform) {
      // Hoist these defs to the very top so they work in other function defs
      vertexShader = "vec3 troika_position_" + key + ";\nvec3 troika_normal_" + key + ";\nvec2 troika_uv_" + key + ";\n" + vertexShader + "\n";
      vertexDefs = vertexDefs + "\nvoid troikaVertexTransform" + key + "(inout vec3 position, inout vec3 normal, inout vec2 uv) {\n  " + vertexTransform + "\n}\n";
      vertexMainIntro = "\ntroika_position_" + key + " = vec3(position);\ntroika_normal_" + key + " = vec3(normal);\ntroika_uv_" + key + " = vec2(uv);\ntroikaVertexTransform" + key + "(troika_position_" + key + ", troika_normal_" + key + ", troika_uv_" + key + ");\n" + vertexMainIntro + "\n";
      vertexShader = vertexShader.replace(/\b(position|normal|uv)\b/g, function (match, match1, index, fullStr) {
        return /\battribute\s+vec[23]\s+$/.test(fullStr.substr(0, index)) ? match1 : ("troika_" + match1 + "_" + key)
      });
    }

    // Inject defs and intro/outro snippets
    vertexShader = injectIntoShaderCode(vertexShader, key, vertexDefs, vertexMainIntro, vertexMainOutro);
    fragmentShader = injectIntoShaderCode(fragmentShader, key, fragmentDefs, fragmentMainIntro, fragmentMainOutro);

    return {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    }
  }

  function injectIntoShaderCode(shaderCode, id, defs, intro, outro) {
    if (intro || outro || defs) {
      shaderCode = shaderCode.replace(voidMainRegExp, ("\n" + defs + "\nvoid troikaOrigMain" + id + "() {")
      );
      shaderCode += "\nvoid main() {\n  " + intro + "\n  troikaOrigMain" + id + "();\n  " + outro + "\n}";
    }
    return shaderCode
  }


  function optionsJsonReplacer(key, value) {
    return key === 'uniforms' ? undefined : typeof value === 'function' ? value.toString() : value
  }

  var _idCtr = 0;
  var optionsHashesToIds = new Map();
  function getKeyForOptions(options) {
    var optionsHash = JSON.stringify(options, optionsJsonReplacer);
    var id = optionsHashesToIds.get(optionsHash);
    if (id == null) {
      optionsHashesToIds.set(optionsHash, (id = ++_idCtr));
    }
    return id
  }

  // Copied from threejs WebGLPrograms.js so we can resolve builtin materials to their shaders
  // TODO how can we keep this from getting stale?
  var MATERIAL_TYPES_TO_SHADERS = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distanceRGBA',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'toon',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    MeshMatcapMaterial: 'matcap',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite'
  };

  /**
   * Given a Three.js `Material` instance, find the shaders/uniforms that will be
   * used to render that material.
   *
   * @param material - the Material instance
   * @return {object} - the material's shader info: `{uniforms:{}, fragmentShader:'', vertexShader:''}`
   */
  function getShadersForMaterial(material) {
    var builtinType = MATERIAL_TYPES_TO_SHADERS[material.type];
    return builtinType ? three.ShaderLib[builtinType] : material //TODO fallback for unknown type?
  }

  /**
   * Find all uniforms and their types within a shader code string.
   *
   * @param {string} shader - The shader code to parse
   * @return {object} mapping of uniform names to their glsl type
   */
  function getShaderUniformTypes(shader) {
    var uniformRE = /\buniform\s+(int|float|vec[234])\s+([A-Za-z_][\w]*)/g;
    var uniforms = Object.create(null);
    var match;
    while ((match = uniformRE.exec(shader)) !== null) {
      uniforms[match[2]] = match[1];
    }
    return uniforms
  }

  /**
   * Helper for smoothing out the `m.getInverse(x)` --> `m.copy(x).invert()` conversion
   * that happened in ThreeJS r123.
   * @param {Matrix4} srcMatrix
   * @param {Matrix4} [tgtMatrix]
   */
  function invertMatrix4(srcMatrix, tgtMatrix) {
    if ( tgtMatrix === void 0 ) tgtMatrix = new three.Matrix4();

    if (typeof tgtMatrix.invert === 'function') {
      tgtMatrix.copy(srcMatrix).invert();
    } else {
      tgtMatrix.getInverse(srcMatrix);
    }
    return tgtMatrix
  }

  /*
  Input geometry is a cylinder with r=1, height in y dimension from 0 to 1,
  divided into a reasonable number of height segments.
  */

  var vertexDefs = "\nuniform vec3 pointA;\nuniform vec3 controlA;\nuniform vec3 controlB;\nuniform vec3 pointB;\nuniform float radius;\nvarying float bezierT;\n\nvec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {\n  float t2 = 1.0 - t;\n  float b0 = t2 * t2 * t2;\n  float b1 = 3.0 * t * t2 * t2;\n  float b2 = 3.0 * t * t * t2;\n  float b3 = t * t * t;\n  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;\n}\n\nvec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {\n  float t2 = 1.0 - t;\n  return -3.0 * p1 * t2 * t2 +\n    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +\n    c2 * (6.0 * t2 * t - 3.0 * t * t) +\n    3.0 * p2 * t * t;\n}\n";

  var vertexTransform = "\nfloat t = position.y;\nbezierT = t;\nvec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);\nvec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));\n\n// Make \"sideways\" always perpendicular to the camera ray; this ensures that any twists\n// in the cylinder occur where you won't see them: \nvec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);\nif (bezierDir == viewDirection) {\n  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));\n}\nvec3 sideways = normalize(cross(bezierDir, viewDirection));\nvec3 upish = normalize(cross(sideways, bezierDir));\n\n// Build a matrix for transforming this disc in the cylinder:\nmat4 discTx;\ndiscTx[0].xyz = sideways * radius;\ndiscTx[1].xyz = bezierDir * radius;\ndiscTx[2].xyz = upish * radius;\ndiscTx[3].xyz = bezierCenterPos;\ndiscTx[3][3] = 1.0;\n\n// Apply transform, ignoring original y\nposition = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;\nnormal = normalize(mat3(discTx) * normal);\n";

  var fragmentDefs = "\nuniform vec3 dashing;\nvarying float bezierT;\n";

  var fragmentMainIntro = "\nif (dashing.x + dashing.y > 0.0) {\n  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);\n  if (dashFrac > dashing.x) {\n    discard;\n  }\n}\n";

  // Debugging: separate color for each of the 6 sides:
  // const fragmentColorTransform = `
  // float sideNum = floor(vUV.x * 6.0);
  // vec3 mixColor = sideNum < 1.0 ? vec3(1.0, 0.0, 0.0) :
  //   sideNum < 2.0 ? vec3(0.0, 1.0, 1.0) :
  //   sideNum < 3.0 ? vec3(1.0, 1.0, 0.0) :
  //   sideNum < 4.0 ? vec3(0.0, 0.0, 1.0) :
  //   sideNum < 5.0 ? vec3(0.0, 1.0, 0.0) :
  //   vec3(1.0, 0.0, 1.0);
  // gl_FragColor.xyz = mix(gl_FragColor.xyz, mixColor, 0.5);
  // `



  function createBezierMeshMaterial(baseMaterial) {
    return createDerivedMaterial(
      baseMaterial,
      {
        chained: true,
        uniforms: {
          pointA: {value: new three.Vector3()},
          controlA: {value: new three.Vector3()},
          controlB: {value: new three.Vector3()},
          pointB: {value: new three.Vector3()},
          radius: {value: 0.01},
          dashing: {value: new three.Vector3()} //on, off, offset
        },
        vertexDefs: vertexDefs,
        vertexTransform: vertexTransform,
        fragmentDefs: fragmentDefs,
        fragmentMainIntro: fragmentMainIntro
      }
    )
  }

  var geometry = null;

  var defaultBaseMaterial = /*#__PURE__*/new three.MeshStandardMaterial({color: 0xffffff, side: three.DoubleSide});


  /**
   * A ThreeJS `Mesh` that bends a tube shape along a 3D cubic bezier path. The bending is done
   * by deforming a straight cylindrical geometry in the vertex shader based on a set of four
   * control point uniforms. It patches the necessary GLSL into the mesh's assigned `material`
   * automatically.
   *
   * The cubiz bezier path is determined by its four `Vector3` properties:
   * - `pointA`
   * - `controlA`
   * - `controlB`
   * - `pointB`
   *
   * The tube's radius is controlled by its `radius` property, which defaults to `0.01`.
   *
   * You can also give the tube a dashed appearance with two properties:
   *
   * - `dashArray` - an array of two numbers, defining the length of "on" and "off" parts of
   *   the dash. Each is a 0-1 ratio of the entire path's length. (Actually this is the `t` length
   *   used as input to the cubic bezier function, not its visible length.)
   * - `dashOffset` - offset of where the dash starts. You can animate this to make the dashes move.
   *
   * Note that the dashes will appear like a hollow tube, not solid. This will be more apparent on
   * thicker tubes.
   *
   * TODO: proper geometry bounding sphere and raycasting
   * TODO: allow control of the geometry's segment counts
   */
  var BezierMesh = /*@__PURE__*/(function (Mesh) {
    function BezierMesh() {
      Mesh.call(
        this, BezierMesh.getGeometry(),
        defaultBaseMaterial
      );

      this.pointA = new three.Vector3();
      this.controlA = new three.Vector3();
      this.controlB = new three.Vector3();
      this.pointB = new three.Vector3();
      this.radius = 0.01;
      this.dashArray = new three.Vector2();
      this.dashOffset = 0;

      // TODO - disabling frustum culling until I figure out how to customize the
      //  geometry's bounding sphere that gets used
      this.frustumCulled = false;
    }

    if ( Mesh ) BezierMesh.__proto__ = Mesh;
    BezierMesh.prototype = Object.create( Mesh && Mesh.prototype );
    BezierMesh.prototype.constructor = BezierMesh;

    var prototypeAccessors = { material: { configurable: true },customDepthMaterial: { configurable: true },customDistanceMaterial: { configurable: true } };

    // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
    // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
    BezierMesh.getGeometry = function getGeometry () {
      return geometry || (geometry =
        new three.CylinderBufferGeometry(1, 1, 1, 6, 64).translate(0, 0.5, 0)
      )
    };

    prototypeAccessors.material.get = function () {
      var derivedMaterial = this._derivedMaterial;
      var baseMaterial = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = defaultBaseMaterial.clone());
      if (!derivedMaterial || derivedMaterial.baseMaterial !== baseMaterial) {
        derivedMaterial = this._derivedMaterial = createBezierMeshMaterial(baseMaterial);
        // dispose the derived material when its base material is disposed:
        baseMaterial.addEventListener('dispose', function onDispose() {
          baseMaterial.removeEventListener('dispose', onDispose);
          derivedMaterial.dispose();
        });
      }
      return derivedMaterial
    };
    prototypeAccessors.material.set = function (baseMaterial) {
      this._baseMaterial = baseMaterial;
    };

    // Create and update material for shadows upon request:
    prototypeAccessors.customDepthMaterial.get = function () {
      return this.material.getDepthMaterial()
    };
    prototypeAccessors.customDistanceMaterial.get = function () {
      return this.material.getDistanceMaterial()
    };

    BezierMesh.prototype.onBeforeRender = function onBeforeRender (shaderInfo) {
      var ref = this.material;
      var uniforms = ref.uniforms;
      var ref$1 = this;
      var pointA = ref$1.pointA;
      var controlA = ref$1.controlA;
      var controlB = ref$1.controlB;
      var pointB = ref$1.pointB;
      var radius = ref$1.radius;
      var dashArray = ref$1.dashArray;
      var dashOffset = ref$1.dashOffset;
      uniforms.pointA.value.copy(pointA);
      uniforms.controlA.value.copy(controlA);
      uniforms.controlB.value.copy(controlB);
      uniforms.pointB.value.copy(pointB);
      uniforms.radius.value = radius;
      uniforms.dashing.value.set(dashArray.x, dashArray.y, dashOffset || 0);
    };

    BezierMesh.prototype.raycast = function raycast (raycaster, intersects) {
      // TODO - just fail for now
    };

    Object.defineProperties( BezierMesh.prototype, prototypeAccessors );

    return BezierMesh;
  }(three.Mesh));

  exports.BezierMesh = BezierMesh;
  exports.createDerivedMaterial = createDerivedMaterial;
  exports.expandShaderIncludes = expandShaderIncludes;
  exports.getShaderUniformTypes = getShaderUniformTypes;
  exports.getShadersForMaterial = getShadersForMaterial;
  exports.invertMatrix4 = invertMatrix4;
  exports.voidMainRegExp = voidMainRegExp;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
