/**
 * The following defined constants and descriptions are directly ported from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
 *
 * Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
 *
 * Contributors
 *
 * See: https://developer.mozilla.org/en-US/profiles/Sheppy
 * See: https://developer.mozilla.org/en-US/profiles/fscholz
 * See: https://developer.mozilla.org/en-US/profiles/AtiX
 * See: https://developer.mozilla.org/en-US/profiles/Sebastianz
 *
 * These constants are defined on the WebGLRenderingContext / WebGL2RenderingContext interface
 */
// Clearing buffers
// Constants passed to WebGLRenderingContext.clear() to clear buffer masks
/**
 * Passed to clear to clear the current depth buffer
 * @constant {number}
 */
const GL_DEPTH_BUFFER_BIT = 0x00000100;
/**
 * Passed to clear to clear the current stencil buffer
 * @constant {number}
 */
const GL_STENCIL_BUFFER_BIT = 0x00000400;
/**
 * Passed to clear to clear the current color buffer
 * @constant {number}
 */
const GL_COLOR_BUFFER_BIT = 0x00004000;
// Rendering primitives
// Constants passed to WebGLRenderingContext.drawElements() or WebGLRenderingContext.drawArrays() to specify what kind of primitive to render
/**
 * Passed to drawElements or drawArrays to draw single points
 * @constant {number}
 */
const GL_POINTS = 0x0000;
/**
 * Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it
 * @constant {number}
 */
const GL_LINES = 0x0001;
/**
 * Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment
 * @constant {number}
 */
const GL_LINE_LOOP = 0x0002;
/**
 * Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last
 * @constant {number}
 */
const GL_LINE_STRIP = 0x0003;
/**
 * Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle
 * @constant {number}
 */
const GL_TRIANGLES = 0x0004;
/**
 * Passed to drawElements or drawArrays to draw a connected group of triangles
 * @constant {number}
 */
const GL_TRIANGLE_STRIP = 0x0005;
/**
 * Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan
 * @constant {number}
 */
const GL_TRIANGLE_FAN = 0x0006;
// Blending modes
// Constants passed to WebGLRenderingContext.blendFunc() or WebGLRenderingContext.blendFuncSeparate() to specify the blending mode (for both, RBG and alpha, or separately)
/**
 * Passed to blendFunc or blendFuncSeparate to turn off a component
 * @constant {number}
 */
const GL_ZERO = 0;
/**
 * Passed to blendFunc or blendFuncSeparate to turn on a component
 * @constant {number}
 */
const GL_ONE = 1;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by the source elements color
 * @constant {number}
 */
const GL_SRC_COLOR = 0x0300;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source elements color
 * @constant {number}
 */
const GL_ONE_MINUS_SRC_COLOR = 0x0301;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha
 * @constant {number}
 */
const GL_SRC_ALPHA = 0x0302;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha
 * @constant {number}
 */
const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's alpha
 * @constant {number}
 */
const GL_DST_ALPHA = 0x0304;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's alpha
 * @constant {number}
 */
const GL_ONE_MINUS_DST_ALPHA = 0x0305;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's color
 * @constant {number}
 */
const GL_DST_COLOR = 0x0306;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's color
 * @constant {number}
 */
const GL_ONE_MINUS_DST_COLOR = 0x0307;
/**
 * Passed to blendFunc or blendFuncSeparate to multiply a component by the minimum of source's alpha or one minus the destination's alpha
 * @constant {number}
 */
const GL_SRC_ALPHA_SATURATE = 0x0308;
/**
 * Passed to blendFunc or blendFuncSeparate to specify a constant color blend function
 * @constant {number}
 */
const GL_CONSTANT_COLOR = 0x8001;
/**
 * Passed to blendFunc or blendFuncSeparate to specify one minus a constant color blend function
 * @constant {number}
 */
const GL_ONE_MINUS_CONSTANT_COLOR = 0x8002;
/**
 * Passed to blendFunc or blendFuncSeparate to specify a constant alpha blend function
 * @constant {number}
 */
const GL_CONSTANT_ALPHA = 0x8003;
/**
 * Passed to blendFunc or blendFuncSeparate to specify one minus a constant alpha blend function
 * @constant {number}
 */
const GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004;
// Blending equations
// Constants passed to WebGLRenderingContext.blendEquation() or WebGLRenderingContext.blendEquationSeparate() to control how the blending is calculated (for both, RBG and alpha, or separately)
/**
 * Passed to blendEquation or blendEquationSeparate to set an addition blend function
 * @constant {number}
 */
const GL_FUNC_ADD = 0x8006;
/**
 * Passed to blendEquation or blendEquationSeparate to specify a subtraction blend function (source - destination)
 * @constant {number}
 */
const GL_FUNC_SUBSTRACT = 0x800a;
/**
 * Passed to blendEquation or blendEquationSeparate to specify a reverse subtraction blend function (destination - source)
 * @constant {number}
 */
const GL_FUNC_REVERSE_SUBTRACT = 0x800b;
// Getting GL parameter information
// Constants passed to WebGLRenderingContext.getParameter() to specify what information to return
/**
 * Passed to getParameter to get the current RGB blend function
 * @constant {number}
 */
const GL_BLEND_EQUATION = 0x8009;
/**
 * Passed to getParameter to get the current RGB blend function. Same as BLEND_EQUATION
 * @constant {number}
 */
const GL_BLEND_EQUATION_RGB = 0x8009;
/**
 * Passed to getParameter to get the current alpha blend function. Same as BLEND_EQUATION
 * @constant {number}
 */
const GL_BLEND_EQUATION_ALPHA = 0x883d;
/**
 * Passed to getParameter to get the current destination RGB blend function
 * @constant {number}
 */
const GL_BLEND_DST_RGB = 0x80c8;
/**
 * Passed to getParameter to get the current source RGB blend function
 * @constant {number}
 */
const GL_BLEND_SRC_RGB = 0x80c9;
/**
 * Passed to getParameter to get the current destination alpha blend function
 * @constant {number}
 */
const GL_BLEND_DST_ALPHA = 0x80ca;
/**
 * Passed to getParameter to get the current source alpha blend function
 * @constant {number}
 */
const GL_BLEND_SRC_ALPHA = 0x80cb;
/**
 * Passed to getParameter to return a the current blend color
 * @constant {number}
 */
const GL_BLEND_COLOR = 0x8005;
/**
 * Passed to getParameter to get the array buffer binding
 * @constant {number}
 */
const GL_ARRAY_BUFFER_BINDING = 0x8894;
/**
 * Passed to getParameter to get the current element array buffer
 * @constant {number}
 */
const GL_ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;
/**
 * Passed to getParameter to get the current lineWidth (set by the lineWidth method)
 * @constant {number}
 */
const GL_LINE_WIDTH = 0x0b21;
/**
 * Passed to getParameter to get the current size of a point drawn with gl.POINTS
 * @constant {number}
 */
const GL_ALIASED_POINT_SIZE_RANGE = 0x846d;
/**
 * Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1
 * @constant {number}
 */
const GL_ALIASED_LINE_WIDTH_RANGE = 0x846e;
/**
 * Passed to getParameter to get the current value of cullFace. Should return FRONT, BACK, or FRONT_AND_BACK
 * @constant {number}
 */
const GL_CULL_FACE_MODE = 0x0b45;
/**
 * Passed to getParameter to determine the current value of frontFace. Should return CW or CCW
 * @constant {number}
 */
const GL_FRONT_FACE = 0x0b46;
/**
 * Passed to getParameter to return a length-2 array of floats giving the current depth range
 * @constant {number}
 */
const GL_DEPTH_RANGE = 0x0b70;
/**
 * Passed to getParameter to determine if the depth write mask is enabled
 * @constant {number}
 */
const GL_DEPTH_WRITEMASK = 0x0b72;
/**
 * Passed to getParameter to determine the current depth clear value
 * @constant {number}
 */
const GL_DEPTH_CLEAR_VALUE = 0x0b73;
/**
 * Passed to getParameter to get the current depth function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL
 * @constant {number}
 */
const GL_DEPTH_FUNC = 0x0b74;
/**
 * Passed to getParameter to get the value the stencil will be cleared to
 * @constant {number}
 */
const GL_STENCIL_CLEAR_VALUE = 0x0b91;
/**
 * Passed to getParameter to get the current stencil function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL
 * @constant {number}
 */
const GL_STENCIL_FUNC = 0x0b92;
/**
 * Passed to getParameter to get the current stencil fail function. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP
 * @constant {number}
 */
const GL_STENCIL_FAIL = 0x0b94;
/**
 * Passed to getParameter to get the current stencil fail function should the depth buffer test fail. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP
 * @constant {number}
 */
const GL_STENCIL_PASS_DEPTH_FAIL = 0x0b95;
/**
 * Passed to getParameter to get the current stencil fail function should the depth buffer test pass. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP
 * @constant {number}
 */
const GL_STENCIL_PASS_DEPTH_PASS = 0x0b96;
/**
 * Passed to getParameter to get the reference value used for stencil tests
 * @constant {number}
 */
const GL_STENCIL_REF = 0x0b97;
/**
 * @constant {number}
 */
const GL_STENCIL_VALUE_MASK = 0x0b93;
/**
 * @constant {number}
 */
const GL_STENCIL_WRITEMASK = 0x0b98;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_FUNC = 0x8800;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_FAIL = 0x8801;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_REF = 0x8ca3;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_VALUE_MASK = 0x8ca4;
/**
 * @constant {number}
 */
const GL_STENCIL_BACK_WRITEMASK = 0x8ca5;
/**
 * Returns an Int32Array with four elements for the current viewport dimensions
 * @constant {number}
 */
const GL_VIEWPORT = 0x0ba2;
/**
 * Returns an Int32Array with four elements for the current scissor box dimensions
 * @constant {number}
 */
const GL_SCISSOR_BOX = 0x0c10;
/**
 * @constant {number}
 */
const GL_COLOR_CLEAR_VALUE = 0x0c22;
/**
 * @constant {number}
 */
const GL_COLOR_WRITEMASK = 0x0c23;
/**
 * @constant {number}
 */
const GL_UNPACK_ALIGNMENT = 0x0cf5;
/**
 * @constant {number}
 */
const GL_PACK_ALIGNMENT = 0x0d05;
/**
 * @constant {number}
 */
const GL_MAX_TEXTURE_SIZE = 0x0d33;
/**
 * @constant {number}
 */
const GL_MAX_VIEWPORT_DIMS = 0x0d3a;
/**
 * @constant {number}
 */
const GL_SUBPIXEL_BITS = 0x0d50;
/**
 * @constant {number}
 */
const GL_RED_BITS = 0x0d52;
/**
 * @constant {number}
 */
const GL_GREEN_BITS = 0x0d53;
/**
 * @constant {number}
 */
const GL_BLUE_BITS = 0x0d54;
/**
 * @constant {number}
 */
const GL_ALPHA_BITS = 0x0d55;
/**
 * @constant {number}
 */
const GL_DEPTH_BITS = 0x0d56;
/**
 * @constant {number}
 */
const GL_STENCIL_BITS = 0x0d57;
/**
 * @constant {number}
 */
const GL_POLYGON_OFFSET_UNITS = 0x2a00;
/**
 * @constant {number}
 */
const GL_POLYGON_OFFSET_FACTOR = 0x8038;
/**
 * @constant {number}
 */
const GL_TEXTURE_BINDING_2D = 0x8069;
/**
 * @constant {number}
 */
const GL_SAMPLE_BUFFERS = 0x80a8;
/**
 * @constant {number}
 */
const GL_SAMPLES = 0x80a9;
/**
 * @constant {number}
 */
const GL_SAMPLE_COVERAGE_VALUE = 0x80aa;
/**
 * @constant {number}
 */
const GL_SAMPLE_COVERAGE_INVERT = 0x80ab;
/**
 * @constant {number}
 */
const GL_COMPRESSED_TEXTURE_FORMATS = 0x86a3;
/**
 * @constant {number}
 */
const GL_VENDOR = 0x1f00;
/**
 * @constant {number}
 */
const GL_RENDERER = 0x1f01;
/**
 * @constant {number}
 */
const GL_VERSION = 0x1f02;
/**
 * @constant {number}
 */
const GL_IMPLEMENTATION_COLOR_READ_TYPE = 0x8b9a;
/**
 * @constant {number}
 */
const GL_IMPLEMENTATION_COLOR_READ_FORMAT = 0x8b9b;
/**
 * @constant {number}
 */
const GL_BROWSER_DEFAULT_WEBGL = 0x9244;
// Buffers
// Constants passed to WebGLRenderingContext.bufferData(), WebGLRenderingContext.bufferSubData(), WebGLRenderingContext.bindBuffer(), or WebGLRenderingContext.getBufferParameter()
/**
 * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often
 * @constant {number}
 */
const GL_STATIC_DRAW = 0x88e4;
/**
 * Passed to bufferData as a hint about whether the contents of the buffer are likely to not be used often
 * @constant {number}
 */
const GL_STREAM_DRAW = 0x88e0;
/**
 * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often
 * @constant {number}
 */
const GL_DYNAMIC_DRAW = 0x88e8;
/**
 * Passed to bindBuffer or bufferData to specify the type of buffer being used
 * @constant {number}
 */
const GL_ARRAY_BUFFER = 0x8892;
/**
 * Passed to bindBuffer or bufferData to specify the type of buffer being used
 * @constant {number}
 */
const GL_ELEMENT_ARRAY_BUFFER = 0x8893;
/**
 * Passed to getBufferParameter to get a buffer's size
 * @constant {number}
 */
const GL_BUFFER_SIZE = 0x8764;
/**
 * Passed to getBufferParameter to get the hint for the buffer passed in when it was created
 * @constant {number}
 */
const GL_BUFFER_USAGE = 0x8765;
// Vertex attributes
// Constants passed to WebGLRenderingContext.getVertexAttrib()
/**
 * Passed to getVertexAttrib to read back the current vertex attribute
 * @constant {number}
 */
const GL_CURRENT_VERTEX_ATTRIB = 0x8626;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886a;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889f;
// Culling
// Constants passed to WebGLRenderingContext.cullFace()
/**
 * Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method
 * @constant {number}
 */
const GL_CULL_FACE = 0x0b44;
/**
 * Passed to cullFace to specify that only front faces should be culled
 * @constant {number}
 */
const GL_FRONT = 0x0404;
/**
 * Passed to cullFace to specify that only back faces should be culled
 * @constant {number}
 */
const GL_BACK = 0x0405;
/**
 * Passed to cullFace to specify that front and back faces should be culled
 * @constant {number}
 */
const GL_FRONT_AND_BACK = 0x0408;
// Enabling and disabling
// Constants passed to WebGLRenderingContext.enable() or WebGLRenderingContext.disable()
/**
 * Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method
 * @constant {number}
 */
const GL_BLEND = 0x0be2;
/**
 * Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test
 * @constant {number}
 */
const GL_DEPTH_TEST = 0x0b71;
/**
 * Passed to enable/disable to turn on/off dithering. Can also be used with getParameter to find the current dithering method
 * @constant {number}
 */
const GL_DITHER = 0x0bd0;
/**
 * Passed to enable/disable to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and or solids with highlighted edges. Can also be used with getParameter to query the scissor test
 * @constant {number}
 */
const GL_POLYGON_OFFSET_FILL = 0x8037;
/**
 * Passed to enable/disable to turn on/off the alpha to coverage. Used in multi-sampling alpha channels
 * @constant {number}
 */
const GL_SAMPLE_ALPHA_TO_COVERAGE = 0x809e;
/**
 * Passed to enable/disable to turn on/off the sample coverage. Used in multi-sampling
 * @constant {number}
 */
const GL_SAMPLE_COVERAGE = 0x80a0;
/**
 * Passed to enable/disable to turn on/off the scissor test. Can also be used with getParameter to query the scissor test
 * @constant {number}
 */
const GL_SCISSOR_TEST = 0x0c11;
/**
 * Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test
 * @constant {number}
 */
const GL_STENCIL_TEST = 0x0b90;
// Errors
// Constants returned from WebGLRenderingContext.getError()
/**
 * Returned from getError
 * @constant {number}
 */
const GL_NO_ERROR = 0;
/**
 * Returned from getError
 * @constant {number}
 */
const GL_INVALID_ENUM = 0x0500;
/**
 * Returned from getError
 * @constant {number}
 */
const GL_INVALID_VALUE = 0x0501;
/**
 * Returned from getError
 * @constant {number}
 */
const GL_INVALID_OPERATION = 0x0502;
/**
 * Returned from getError
 * @constant {number}
 */
const GL_OUT_OF_MEMORY = 0x0505;
/**
 * Returned from getError
 * @constant {number}
 */
const GL_CONTEXT_LOST_WEBGL = 0x9242;
// Front face directions
// Constants passed to WebGLRenderingContext.frontFace()
/**
 * Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction,
 * @constant {number}
 */
const GL_CW = 0x0900;
/**
 * Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction
 * @constant {number}
 */
const GL_CCW = 0x0901;
// Hints
// Constants passed to WebGLRenderingContext.hint()
/**
 * There is no preference for this behavior
 * @constant {number}
 */
const GL_DONT_CARE = 0x1100;
/**
 * The most efficient behavior should be used
 * @constant {number}
 */
const GL_FASTEST = 0x1101;
/**
 * The most correct or the highest quality option should be used
 * @constant {number}
 */
const GL_NICEST = 0x1102;
/**
 * Hint for the quality of filtering when generating mipmap images with WebGLRenderingContext.generateMipmap()
 * @constant {number}
 */
const GL_GENERATE_MIPMAP_HINT = 0x8192;
// Data types
/**
 * @constant {number}
 */
const GL_BYTE = 0x1400;
/**
 * @constant {number}
 */
const GL_UNSIGNED_BYTE = 0x1401;
/**
 * @constant {number}
 */
const GL_SHORT = 0x1402;
/**
 * @constant {number}
 */
const GL_UNSIGNED_SHORT = 0x1403;
/**
 * @constant {number}
 */
const GL_INT = 0x1404;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT = 0x1405;
/**
 * @constant {number}
 */
const GL_FLOAT = 0x1406;
// Pixel formats
/**
 * @constant {number}
 */
const GL_DEPTH_COMPONENT = 0x1902;
/**
 * @constant {number}
 */
const GL_ALPHA = 0x1906;
/**
 * @constant {number}
 */
const GL_RGB = 0x1907;
/**
 * @constant {number}
 */
const GL_RGBA = 0x1908;
/**
 * @constant {number}
 */
const GL_LUMINANCE = 0x1909;
/**
 * @constant {number}
 */
const GL_LUMINANCE_ALPHA = 0x190a;
// Pixel types
/**
 * @constant {number}
 */
const GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
/**
 * @constant {number}
 */
const GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
/**
 * @constant {number}
 */
const GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
// Shaders
// Constants passed to WebGLRenderingContext.getShaderParameter()
/**
 * Passed to createShader to define a fragment shader
 * @constant {number}
 */
const GL_FRAGMENT_SHADER = 0x8b30;
/**
 * Passed to createShader to define a vertex shader
 * @constant {number}
 */
const GL_VERTEX_SHADER = 0x8b31;
/**
 * Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error
 * @constant {number}
 */
const GL_COMPILE_STATUS = 0x8b81;
/**
 * Passed to getShaderParamter to determine if a shader was deleted via deleteShader. Returns true if it was, false otherwise
 * @constant {number}
 */
const GL_DELETE_STATUS = 0x8b80;
/**
 * Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error
 * @constant {number}
 */
const GL_LINK_STATUS = 0x8b82;
/**
 * Passed to getProgramParameter after calling validateProgram to determine if it is valid. Returns false if errors were found
 * @constant {number}
 */
const GL_VALIDATE_STATUS = 0x8b83;
/**
 * Passed to getProgramParameter after calling attachShader to determine if the shader was attached correctly. Returns false if errors occurred
 * @constant {number}
 */
const GL_ATTACHED_SHADERS = 0x8b85;
/**
 * Passed to getProgramParameter to get the number of attributes active in a program
 * @constant {number}
 */
const GL_ACTIVE_ATTRIBUTES = 0x8b89;
/**
 * Passed to getProgramParamter to get the number of uniforms active in a program
 * @constant {number}
 */
const GL_ACTIVE_UNIFORMS = 0x8b86;
/**
 * The maximum number of entries possible in the vertex attribute list
 * @constant {number}
 */
const GL_MAX_VERTEX_ATTRIBS = 0x8869;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8dfb;
/**
 * @constant {number}
 */
const GL_MAX_VARYING_VECTORS = 0x8dfc;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8b4d;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8b4c;
/**
 * Implementation dependent number of maximum texture units. At least 8
 * @constant {number}
 */
const GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd;
/**
 * @constant {number}
 */
const GL_SHADER_TYPE = 0x8b4f;
/**
 * @constant {number}
 */
const GL_SHADING_LANGUAGE_VERSION = 0x8b8c;
/**
 * @constant {number}
 */
const GL_CURRENT_PROGRAM = 0x8b8d;
// Depth or stencil tests
// Constants passed to WebGLRenderingContext.stencilFunc()
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn
 * @constant {number}
 */
const GL_NEVER = 0x0200;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn
 * @constant {number}
 */
const GL_ALWAYS = 0x0207;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value
 * @constant {number}
 */
const GL_LESS = 0x0201;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value
 * @constant {number}
 */
const GL_EQUAL = 0x0202;
/**
 *  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value
 * @constant {number}
 */
const GL_LEQUAL = 0x0203;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value
 * @constant {number}
 */
const GL_GREATER = 0x0204;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value
 * @constant {number}
 */
const GL_GEQUAL = 0x0206;
/**
 * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value
 * @constant {number}
 */
const GL_NOTEQUAL = 0x0205;
// Stencil actions
// Constants passed to WebGLRenderingContext.stencilOp()
/**
 * @constant {number}
 */
const GL_KEEP = 0x1e00;
/**
 * @constant {number}
 */
const GL_REPLACE = 0x1e01;
/**
 * @constant {number}
 */
const GL_INCR = 0x1e02;
/**
 * @constant {number}
 */
const GL_DECR = 0x1e03;
/**
 * @constant {number}
 */
const GL_INVERT = 0x150a;
/**
 * @constant {number}
 */
const GL_INCR_WRAP = 0x8507;
/**
 * @constant {number}
 */
const GL_DECR_WRAP = 0x8508;
// Textures
// Constants passed to WebGLRenderingContext.texParameteri(), WebGLRenderingContext.texParameterf(), WebGLRenderingContext.bindTexture(), WebGLRenderingContext.texImage2D(), and others
/**
 * @constant {number}
 */
const GL_NEAREST = 0x2600;
/**
 * @constant {number}
 */
const GL_LINEAR = 0x2601;
/**
 * @constant {number}
 */
const GL_NEAREST_MIPMAP_NEAREST = 0x2700;
/**
 * @constant {number}
 */
const GL_LINEAR_MIPMAP_NEAREST = 0x2701;
/**
 * @constant {number}
 */
const GL_NEAREST_MIPMAP_LINEAR = 0x2702;
/**
 * @constant {number}
 */
const GL_LINEAR_MIPMAP_LINEAR = 0x2703;
/**
 * @constant {number}
 */
const GL_TEXTURE_MAG_FILTER = 0x2800;
/**
 * @constant {number}
 */
const GL_TEXTURE_MIN_FILTER = 0x2801;
/**
 * @constant {number}
 */
const GL_TEXTURE_WRAP_S = 0x2802;
/**
 * @constant {number}
 */
const GL_TEXTURE_WRAP_T = 0x2803;
/**
 * @constant {number}
 */
const GL_TEXTURE_2D = 0x0de1;
/**
 * @constant {number}
 */
const GL_TEXTURE = 0x1702;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP = 0x8513;
/**
 * @constant {number}
 */
const GL_TEXTURE_BINDING_CUBE_MAP = 0x8514;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
/**
 * @constant {number}
 */
const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a;
/**
 * @constant {number}
 */
const GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE0 = 0x84c0;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE1 = 0x84c1;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE2 = 0x84c2;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE3 = 0x84c3;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE4 = 0x84c4;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE5 = 0x84c5;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE6 = 0x84c6;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE7 = 0x84c7;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE8 = 0x84c8;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE9 = 0x84c9;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE10 = 0x84ca;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE11 = 0x84cb;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE12 = 0x84cc;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE13 = 0x84cd;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE14 = 0x84ce;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE15 = 0x84cf;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE16 = 0x84d0;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE17 = 0x84d1;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE18 = 0x84d2;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE19 = 0x84d3;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE20 = 0x84d4;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE21 = 0x84d5;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE22 = 0x84d6;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE23 = 0x84d7;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE24 = 0x84d8;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE25 = 0x84d9;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE26 = 0x84da;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE27 = 0x84db;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE28 = 0x84dc;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE29 = 0x84dd;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE30 = 0x84de;
/**
 * A texture unit
 * @constant {number}
 */
const GL_TEXTURE31 = 0x84df;
/**
 * The current active texture unit
 * @constant {number}
 */
const GL_ACTIVE_TEXTURE = 0x84e0;
/**
 * @constant {number}
 */
const GL_REPEAT = 0x2901;
/**
 * @constant {number}
 */
const GL_CLAMP_TO_EDGE = 0x812f;
/**
 * @constant {number}
 */
const GL_MIRRORED_REPEAT = 0x8370;
// Uniform types
/**
 * @constant {number}
 */
const GL_FLOAT_VEC2 = 0x8b50;
/**
 * @constant {number}
 */
const GL_FLOAT_VEC3 = 0x8b51;
/**
 * @constant {number}
 */
const GL_FLOAT_VEC4 = 0x8b52;
/**
 * @constant {number}
 */
const GL_INT_VEC2 = 0x8b53;
/**
 * @constant {number}
 */
const GL_INT_VEC3 = 0x8b54;
/**
 * @constant {number}
 */
const GL_INT_VEC4 = 0x8b55;
/**
 * @constant {number}
 */
const GL_BOOL = 0x8b56;
/**
 * @constant {number}
 */
const GL_BOOL_VEC2 = 0x8b57;
/**
 * @constant {number}
 */
const GL_BOOL_VEC3 = 0x8b58;
/**
 * @constant {number}
 */
const GL_BOOL_VEC4 = 0x8b59;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT2 = 0x8b5a;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT3 = 0x8b5b;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT4 = 0x8b5c;
/**
 * @constant {number}
 */
const GL_SAMPLER_2D = 0x8b5e;
/**
 * @constant {number}
 */
const GL_SAMPLER_CUBE = 0x8b60;
// Shader precision-specified types
/**
 * @constant {number}
 */
const GL_LOW_FLOAT = 0x8df0;
/**
 * @constant {number}
 */
const GL_MEDIUM_FLOAT = 0x8df1;
/**
 * @constant {number}
 */
const GL_HIGH_FLOAT = 0x8df2;
/**
 * @constant {number}
 */
const GL_LOW_INT = 0x8df3;
/**
 * @constant {number}
 */
const GL_MEDIUM_INT = 0x8df4;
/**
 * @constant {number}
 */
const GL_HIGH_INT = 0x8df5;
// Framebuffers and renderbuffers
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER = 0x8d40;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER = 0x8d41;
/**
 * @constant {number}
 */
const GL_RGBA4 = 0x8056;
/**
 * @constant {number}
 */
const GL_RGB5_A1 = 0x8057;
/**
 * @constant {number}
 */
const GL_RGB565 = 0x8d62;
/**
 * @constant {number}
 */
const GL_DEPTH_COMPONENT16 = 0x81a5;
/**
 * @constant {number}
 */
const GL_STENCIL_INDEX = 0x1901;
/**
 * @constant {number}
 */
const GL_STENCIL_INDEX8 = 0x8d48;
/**
 * @constant {number}
 */
const GL_DEPTH_STENCIL = 0x84f9;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_WIDTH = 0x8d42;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_HEIGHT = 0x8d43;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8d44;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_RED_SIZE = 0x8d50;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_GREEN_SIZE = 0x8d51;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_BLUE_SIZE = 0x8d52;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_ALPHA_SIZE = 0x8d53;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_DEPTH_SIZE = 0x8d54;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_STENCIL_SIZE = 0x8d55;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8cd0;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8cd1;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8cd2;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8cd3;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT0 = 0x8ce0;
/**
 * @constant {number}
 */
const GL_DEPTH_ATTACHMENT = 0x8d00;
/**
 * @constant {number}
 */
const GL_STENCIL_ATTACHMENT = 0x8d20;
/**
 * @constant {number}
 */
const GL_DEPTH_STENCIL_ATTACHMENT = 0x821a;
/**
 * @constant {number}
 */
const GL_NONE = 0;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_COMPLETE = 0x8cd5;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8cd6;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8cd7;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8cd9;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_UNSUPPORTED = 0x8cdd;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_BINDING = 0x8ca6;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_BINDING = 0x8ca7;
/**
 * @constant {number}
 */
const GL_MAX_RENDERBUFFER_SIZE = 0x84e8;
/**
 * @constant {number}
 */
const GL_INVALID_FRAMEBUFFER_OPERATION = 0x0506;
// Pixel storage modes
// Constants passed to WebGLRenderingContext.pixelStorei()
/**
 * @constant {number}
 */
const GL_UNPACK_FLIP_Y_WEBGL = 0x9240;
/**
 * @constant {number}
 */
const GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
/**
 * @constant {number}
 */
const GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
// Additional constants defined WebGL 2
// These constants are defined on the WebGL2RenderingContext interface. All WebGL 1 constants are also available in a WebGL 2 context
// Getting GL parameter information
// Constants passed to WebGLRenderingContext.getParameter() to specify what information to return
/**
 * @constant {number}
 */
const GL_READ_BUFFER = 0x0c02;
/**
 * @constant {number}
 */
const GL_UNPACK_ROW_LENGTH = 0x0cf2;
/**
 * @constant {number}
 */
const GL_UNPACK_SKIP_ROWS = 0x0cf3;
/**
 * @constant {number}
 */
const GL_UNPACK_SKIP_PIXELS = 0x0cf4;
/**
 * @constant {number}
 */
const GL_PACK_ROW_LENGTH = 0x0d02;
/**
 * @constant {number}
 */
const GL_PACK_SKIP_ROWS = 0x0d03;
/**
 * @constant {number}
 */
const GL_PACK_SKIP_PIXELS = 0x0d04;
/**
 * @constant {number}
 */
const GL_TEXTURE_BINDING_3D = 0x806a;
/**
 * @constant {number}
 */
const GL_UNPACK_SKIP_IMAGES = 0x806d;
/**
 * @constant {number}
 */
const GL_UNPACK_IMAGE_HEIGHT = 0x806e;
/**
 * @constant {number}
 */
const GL_MAX_3D_TEXTURE_SIZE = 0x8073;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENTS_VERTICES = 0x80e8;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENTS_INDICES = 0x80e9;
/**
 * @constant {number}
 */
const GL_MAX_TEXTURE_LOD_BIAS = 0x84fd;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_COMPONENTS = 0x8b49;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_COMPONENTS = 0x8b4a;
/**
 * @constant {number}
 */
const GL_MAX_ARRAY_TEXTURE_LAYERS = 0x88ff;
/**
 * @constant {number}
 */
const GL_MIN_PROGRAM_TEXEL_OFFSET = 0x8904;
/**
 * @constant {number}
 */
const GL_MAX_PROGRAM_TEXEL_OFFSET = 0x8905;
/**
 * @constant {number}
 */
const GL_MAX_VARYING_COMPONENTS = 0x8b4b;
/**
 * @constant {number}
 */
const GL_FRAGMENT_SHADER_DERIVATIVE_HINT = 0x8b8b;
/**
 * @constant {number}
 */
const GL_RASTERIZER_DISCARD = 0x8c89;
/**
 * @constant {number}
 */
const GL_VERTEX_ARRAY_BINDING = 0x85b5;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_OUTPUT_COMPONENTS = 0x9122;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_INPUT_COMPONENTS = 0x9125;
/**
 * @constant {number}
 */
const GL_MAX_SERVER_WAIT_TIMEOUT = 0x9111;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENT_INDEX = 0x8d6b;
// Textures
// Constants passed to WebGLRenderingContext.texParameteri(), WebGLRenderingContext.texParameterf(), WebGLRenderingContext.bindTexture(), WebGLRenderingContext.texImage2D(), and others
/**
 * @constant {number}
 */
const GL_RED = 0x1903;
/**
 * @constant {number}
 */
const GL_RGB8 = 0x8051;
/**
 * @constant {number}
 */
const GL_RGBA8 = 0x8058;
/**
 * @constant {number}
 */
const GL_RGB10_A2 = 0x8059;
/**
 * @constant {number}
 */
const GL_TEXTURE_3D = 0x806f;
/**
 * @constant {number}
 */
const GL_TEXTURE_WRAP_R = 0x8072;
/**
 * @constant {number}
 */
const GL_TEXTURE_MIN_LOD = 0x813a;
/**
 * @constant {number}
 */
const GL_TEXTURE_MAX_LOD = 0x813b;
/**
 * @constant {number}
 */
const GL_TEXTURE_BASE_LEVEL = 0x813c;
/**
 * @constant {number}
 */
const GL_TEXTURE_MAX_LEVEL = 0x813d;
/**
 * @constant {number}
 */
const GL_TEXTURE_COMPARE_MODE = 0x884c;
/**
 * @constant {number}
 */
const GL_TEXTURE_COMPARE_FUNC = 0x884d;
/**
 * @constant {number}
 */
const GL_SRGB = 0x8c40;
/**
 * @constant {number}
 */
const GL_SRGB8 = 0x8c41;
/**
 * @constant {number}
 */
const GL_SRGB8_ALPHA8 = 0x8c43;
/**
 * @constant {number}
 */
const GL_COMPARE_REF_TO_TEXTURE = 0x884e;
/**
 * @constant {number}
 */
const GL_RGBA32F = 0x8814;
/**
 * @constant {number}
 */
const GL_RGB32F = 0x8815;
/**
 * @constant {number}
 */
const GL_RGBA16F = 0x881a;
/**
 * @constant {number}
 */
const GL_RGB16F = 0x881b;
/**
 * @constant {number}
 */
const GL_TEXTURE_2D_ARRAY = 0x8c1a;
/**
 * @constant {number}
 */
const GL_TEXTURE_BINDING_2D_ARRAY = 0x8c1d;
/**
 * @constant {number}
 */
const GL_R11F_G11F_B10F = 0x8c3a;
/**
 * @constant {number}
 */
const GL_RGB9_E5 = 0x8c3d;
/**
 * @constant {number}
 */
const GL_RGBA32UI = 0x8d70;
/**
 * @constant {number}
 */
const GL_RGB32UI = 0x8d71;
/**
 * @constant {number}
 */
const GL_RGBA16UI = 0x8d76;
/**
 * @constant {number}
 */
const GL_RGB16UI = 0x8d77;
/**
 * @constant {number}
 */
const GL_RGBA8UI = 0x8d7c;
/**
 * @constant {number}
 */
const GL_RGB8UI = 0x8d7d;
/**
 * @constant {number}
 */
const GL_RGBA32I = 0x8d82;
/**
 * @constant {number}
 */
const GL_RGB32I = 0x8d83;
/**
 * @constant {number}
 */
const GL_RGBA16I = 0x8d88;
/**
 * @constant {number}
 */
const GL_RGB16I = 0x8d89;
/**
 * @constant {number}
 */
const GL_RGBA8I = 0x8d8e;
/**
 * @constant {number}
 */
const GL_RGB8I = 0x8d8f;
/**
 * @constant {number}
 */
const GL_RED_INTEGER = 0x8d94;
/**
 * @constant {number}
 */
const GL_RGB_INTEGER = 0x8d98;
/**
 * @constant {number}
 */
const GL_RGBA_INTEGER = 0x8d99;
/**
 * @constant {number}
 */
const GL_R8 = 0x8229;
/**
 * @constant {number}
 */
const GL_RG8 = 0x822b;
/**
 * @constant {number}
 */
const GL_R16F = 0x822d;
/**
 * @constant {number}
 */
const GL_R32F = 0x822e;
/**
 * @constant {number}
 */
const GL_RG16F = 0x822f;
/**
 * @constant {number}
 */
const GL_RG32F = 0x8230;
/**
 * @constant {number}
 */
const GL_R8I = 0x8231;
/**
 * @constant {number}
 */
const GL_R8UI = 0x8232;
/**
 * @constant {number}
 */
const GL_R16I = 0x8233;
/**
 * @constant {number}
 */
const GL_R16UI = 0x8234;
/**
 * @constant {number}
 */
const GL_R32I = 0x8235;
/**
 * @constant {number}
 */
const GL_R32UI = 0x8236;
/**
 * @constant {number}
 */
const GL_RG8I = 0x8237;
/**
 * @constant {number}
 */
const GL_RG8UI = 0x8238;
/**
 * @constant {number}
 */
const GL_RG16I = 0x8239;
/**
 * @constant {number}
 */
const GL_RG16UI = 0x823a;
/**
 * @constant {number}
 */
const GL_RG32I = 0x823b;
/**
 * @constant {number}
 */
const GL_RG32UI = 0x823c;
/**
 * @constant {number}
 */
const GL_R8_SNORM = 0x8f94;
/**
 * @constant {number}
 */
const GL_RG8_SNORM = 0x8f95;
/**
 * @constant {number}
 */
const GL_RGB8_SNORM = 0x8f96;
/**
 * @constant {number}
 */
const GL_RGBA8_SNORM = 0x8f97;
/**
 * @constant {number}
 */
const GL_RGB10_A2UI = 0x906f;
/**
 * @constant {number}
 */
const GL_TEXTURE_IMMUTABLE_FORMAT = 0x912f;
/**
 * @constant {number}
 */
const GL_TEXTURE_IMMUTABLE_LEVELS = 0x82df;
// Pixel types
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_2_10_10_10_REV = 0x8368;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_5_9_9_9_REV = 0x8c3e;
/**
 * @constant {number}
 */
const GL_FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_24_8 = 0x84fa;
/**
 * @constant {number}
 */
const GL_HALF_FLOAT = 0x140b;
/**
 * @constant {number}
 */
const GL_RG = 0x8227;
/**
 * @constant {number}
 */
const GL_RG_INTEGER = 0x8228;
/**
 * @constant {number}
 */
const GL_INT_2_10_10_10_REV = 0x8d9f;
// Queries
/**
 * @constant {number}
 */
const GL_CURRENT_QUERY = 0x8865;
/**
 * @constant {number}
 */
const GL_QUERY_RESULT = 0x8866;
/**
 * @constant {number}
 */
const GL_QUERY_RESULT_AVAILABLE = 0x8867;
/**
 * @constant {number}
 */
const GL_ANY_SAMPLES_PASSED = 0x8c2f;
/**
 * @constant {number}
 */
const GL_ANY_SAMPLES_PASSED_CONSERVATIVE = 0x8d6a;
// Draw buffers
/**
 * @constant {number}
 */
const GL_MAX_DRAW_BUFFERS = 0x8824;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER0 = 0x8825;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER1 = 0x8826;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER2 = 0x8827;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER3 = 0x8828;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER4 = 0x8829;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER5 = 0x882a;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER6 = 0x882b;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER7 = 0x882c;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER8 = 0x882d;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER9 = 0x882e;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER10 = 0x882f;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER11 = 0x8830;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER12 = 0x8831;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER13 = 0x8832;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER14 = 0x8833;
/**
 * @constant {number}
 */
const GL_DRAW_BUFFER15 = 0x8834;
/**
 * @constant {number}
 */
const GL_MAX_COLOR_ATTACHMENTS = 0x8cdf;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT1 = 0x8ce1;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT2 = 0x8ce2;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT3 = 0x8ce3;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT4 = 0x8ce4;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT5 = 0x8ce5;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT6 = 0x8ce6;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT7 = 0x8ce7;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT8 = 0x8ce8;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT9 = 0x8ce9;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT10 = 0x8cea;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT11 = 0x8ceb;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT12 = 0x8cec;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT13 = 0x8ced;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT14 = 0x8cee;
/**
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT15 = 0x8cef;
// Samplers
/**
 * @constant {number}
 */
const GL_SAMPLER_3D = 0x8b5f;
/**
 * @constant {number}
 */
const GL_SAMPLER_2D_SHADOW = 0x8b62;
/**
 * @constant {number}
 */
const GL_SAMPLER_2D_ARRAY = 0x8dc1;
/**
 * @constant {number}
 */
const GL_SAMPLER_2D_ARRAY_SHADOW = 0x8dc4;
/**
 * @constant {number}
 */
const GL_SAMPLER_CUBE_SHADOW = 0x8dc5;
/**
 * @constant {number}
 */
const GL_INT_SAMPLER_2D = 0x8dca;
/**
 * @constant {number}
 */
const GL_INT_SAMPLER_3D = 0x8dcb;
/**
 * @constant {number}
 */
const GL_INT_SAMPLER_CUBE = 0x8dcc;
/**
 * @constant {number}
 */
const GL_INT_SAMPLER_2D_ARRAY = 0x8dcf;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_SAMPLER_2D = 0x8dd2;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_SAMPLER_3D = 0x8dd3;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_SAMPLER_CUBE = 0x8dd4;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8dd7;
/**
 * @constant {number}
 */
const GL_MAX_SAMPLES = 0x8d57;
/**
 * @constant {number}
 */
const GL_SAMPLER_BINDING = 0x8919;
// Buffers
/**
 * @constant {number}
 */
const GL_PIXEL_PACK_BUFFER = 0x88eb;
/**
 * @constant {number}
 */
const GL_PIXEL_UNPACK_BUFFER = 0x88ec;
/**
 * @constant {number}
 */
const GL_PIXEL_PACK_BUFFER_BINDING = 0x88ed;
/**
 * @constant {number}
 */
const GL_PIXEL_UNPACK_BUFFER_BINDING = 0x88ef;
/**
 * @constant {number}
 */
const GL_COPY_READ_BUFFER = 0x8f36;
/**
 * @constant {number}
 */
const GL_COPY_WRITE_BUFFER = 0x8f37;
/**
 * @constant {number}
 */
const GL_COPY_READ_BUFFER_BINDING = 0x8f36;
/**
 * @constant {number}
 */
const GL_COPY_WRITE_BUFFER_BINDING = 0x8f37;
// Data types
/**
 * @constant {number}
 */
const GL_FLOAT_MAT2X3 = 0x8b65;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT2X4 = 0x8b66;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT3X2 = 0x8b67;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT3X4 = 0x8b68;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT4X2 = 0x8b69;
/**
 * @constant {number}
 */
const GL_FLOAT_MAT4X3 = 0x8b6a;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_VEC2 = 0x8dc6;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_VEC3 = 0x8dc7;
/**
 * @constant {number}
 */
const GL_UNSIGNED_INT_VEC4 = 0x8dc8;
/**
 * @constant {number}
 */
const GL_UNSIGNED_NORMALIZED = 0x8c17;
/**
 * @constant {number}
 */
const GL_SIGNED_NORMALIZED = 0x8f9c;
// Vertex attributes
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_INTEGER = 0x88fd;
/**
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_DIVISOR = 0x88fe;
// Transform feedback
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BUFFER_MODE = 0x8c7f;
/**
 * @constant {number}
 */
const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 0x8c80;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_VARYINGS = 0x8c83;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BUFFER_START = 0x8c84;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BUFFER_SIZE = 0x8c85;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8c88;
/**
 * @constant {number}
 */
const GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 0x8c8a;
/**
 * @constant {number}
 */
const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 0x8c8b;
/**
 * @constant {number}
 */
const GL_INTERLEAVED_ATTRIBS = 0x8c8c;
/**
 * @constant {number}
 */
const GL_SEPARATE_ATTRIBS = 0x8c8d;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BUFFER = 0x8c8e;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BUFFER_BINDING = 0x8c8f;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK = 0x8e22;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_PAUSED = 0x8e23;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_ACTIVE = 0x8e24;
/**
 * @constant {number}
 */
const GL_TRANSFORM_FEEDBACK_BINDING = 0x8e25;
// Framebuffers and renderbuffers
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 0x8210;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 0x8211;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE = 0x8212;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 0x8213;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 0x8214;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 0x8215;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 0x8216;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 0x8217;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_DEFAULT = 0x8218;
/**
 * @constant {number}
 */
const GL_DEPTH24_STENCIL8 = 0x88f0;
/**
 * @constant {number}
 */
const GL_DRAW_FRAMEBUFFER_BINDING = 0x8ca6;
/**
 * @constant {number}
 */
const GL_READ_FRAMEBUFFER = 0x8ca8;
/**
 * @constant {number}
 */
const GL_DRAW_FRAMEBUFFER = 0x8ca9;
/**
 * @constant {number}
 */
const GL_READ_FRAMEBUFFER_BINDING = 0x8caa;
/**
 * @constant {number}
 */
const GL_RENDERBUFFER_SAMPLES = 0x8cab;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 0x8cd4;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 0x8d56;
// Uniforms
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER = 0x8a11;
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER_BINDING = 0x8a28;
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER_START = 0x8a29;
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER_SIZE = 0x8a2a;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_BLOCKS = 0x8a2b;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_BLOCKS = 0x8a2d;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_UNIFORM_BLOCKS = 0x8a2e;
/**
 * @constant {number}
 */
const GL_MAX_UNIFORM_BUFFER_BINDINGS = 0x8a2f;
/**
 * @constant {number}
 */
const GL_MAX_UNIFORM_BLOCK_SIZE = 0x8a30;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 0x8a31;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 0x8a33;
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT = 0x8a34;
/**
 * @constant {number}
 */
const GL_ACTIVE_UNIFORM_BLOCKS = 0x8a36;
/**
 * @constant {number}
 */
const GL_UNIFORM_TYPE = 0x8a37;
/**
 * @constant {number}
 */
const GL_UNIFORM_SIZE = 0x8a38;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_INDEX = 0x8a3a;
/**
 * @constant {number}
 */
const GL_UNIFORM_OFFSET = 0x8a3b;
/**
 * @constant {number}
 */
const GL_UNIFORM_ARRAY_STRIDE = 0x8a3c;
/**
 * @constant {number}
 */
const GL_UNIFORM_MATRIX_STRIDE = 0x8a3d;
/**
 * @constant {number}
 */
const GL_UNIFORM_IS_ROW_MAJOR = 0x8a3e;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_BINDING = 0x8a3f;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_DATA_SIZE = 0x8a40;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_ACTIVE_UNIFORMS = 0x8a42;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8a43;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8a44;
/**
 * @constant {number}
 */
const GL_UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
// Sync objects
/**
 * @constant {number}
 */
const GL_OBJECT_TYPE = 0x9112;
/**
 * @constant {number}
 */
const GL_SYNC_CONDITION = 0x9113;
/**
 * @constant {number}
 */
const GL_SYNC_STATUS = 0x9114;
/**
 * @constant {number}
 */
const GL_SYNC_FLAGS = 0x9115;
/**
 * @constant {number}
 */
const GL_SYNC_FENCE = 0x9116;
/**
 * @constant {number}
 */
const GL_SYNC_GPU_COMMANDS_COMPLETE = 0x9117;
/**
 * @constant {number}
 */
const GL_UNSIGNALED = 0x9118;
/**
 * @constant {number}
 */
const GL_SIGNALED = 0x9119;
/**
 * @constant {number}
 */
const GL_ALREADY_SIGNALED = 0x911a;
/**
 * @constant {number}
 */
const GL_TIMEOUT_EXPIRED = 0x911b;
/**
 * @constant {number}
 */
const GL_CONDITION_SATISFIED = 0x911c;
/**
 * @constant {number}
 */
const GL_WAIT_FAILED = 0x911d;
/**
 * @constant {number}
 */
const GL_SYNC_FLUSH_COMMANDS_BIT = 0x00000001;
// Miscellaneous constants
/**
 * @constant {number}
 */
const GL_COLOR = 0x1800;
/**
 * @constant {number}
 */
const GL_DEPTH = 0x1801;
/**
 * @constant {number}
 */
const GL_STENCIL = 0x1802;
/**
 * @constant {number}
 */
const GL_MIN = 0x8007;
/**
 * @constant {number}
 */
const GL_MAX = 0x8008;
/**
 * @constant {number}
 */
const GL_DEPTH_COMPONENT24 = 0x81a6;
/**
 * @constant {number}
 */
const GL_STREAM_READ = 0x88e1;
/**
 * @constant {number}
 */
const GL_STREAM_COPY = 0x88e2;
/**
 * @constant {number}
 */
const GL_STATIC_READ = 0x88e5;
/**
 * @constant {number}
 */
const GL_STATIC_COPY = 0x88e6;
/**
 * @constant {number}
 */
const GL_DYNAMIC_READ = 0x88e9;
/**
 * @constant {number}
 */
const GL_DYNAMIC_COPY = 0x88ea;
/**
 * @constant {number}
 */
const GL_DEPTH_COMPONENT32F = 0x8cac;
/**
 * @constant {number}
 */
const GL_DEPTH32F_STENCIL8 = 0x8cad;
/**
 * @constant {number}
 */
const GL_INVALID_INDEX = 0xffffffff;
/**
 * @constant {number}
 */
const GL_TIMEOUT_IGNORED = -1;
/**
 * @constant {number}
 */
const GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 0x9247;
// Constants defined in WebGL extensions
// ANGLE_instanced_arrays
// The ANGLE_instanced_arrays extension is part of the WebGL API and allows to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type
/**
 * Describes the frequency divisor used for instanced rendering
 * @constant {number}
 */
const GL_VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE = 0x88fe;
// WEBGL_debug_renderer_info
// The WEBGL_debug_renderer_info extension is part of the WebGL API and exposes two constants with information about the graphics driver for debugging purposes
/**
 * Passed to getParameter to get the vendor string of the graphics driver
 * @constant {number}
 */
const GL_UNMASKED_VENDOR_WEBGL = 0x9245;
/**
 * Passed to getParameter to get the renderer string of the graphics driver
 * @constant {number}
 */
const GL_UNMASKED_RENDERER_WEBGL = 0x9246;
// EXT_texture_filter_anisotropic
// The EXT_texture_filter_anisotropic extension is part of the WebGL API and exposes two constants for anisotropic filtering (AF)
/**
 * Returns the maximum available anisotropy
 * @constant {number}
 */
const GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84ff;
/**
 * Passed to texParameter to set the desired maximum anisotropy for a texture
 * @constant {number}
 */
const GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84fe;
// WEBGL_compressed_texture_s3tc
// The WEBGL_compressed_texture_s3tc extension is part of the WebGL API and exposes four S3TC compressed texture formats
/**
 * A DXT1-compressed image in an RGB image format
 * @constant {number}
 */
const GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83f0;
/**
 * A DXT1-compressed image in an RGB image format with a simple on/off alpha value
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83f1;
/**
 * A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83f2;
/**
 * A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3 compression in how the alpha compression is done
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83f3;
// WEBGL_compressed_texture_s3tc_srgb
// The WEBGL_compressed_texture_s3tc_srgb extension is part of the WebGL API and exposes four S3TC compressed texture formats for the sRGB colorspace
/**
 * A DXT1-compressed image in an sRGB image format
 * @constant {number}
 */
const GL_COMPRESSED_SRGB_S3TC_DXT1_EXT = 0x8c4c;
/**
 * A DXT1-compressed image in an sRGB image format with a simple on/off alpha value
 * @constant {number}
 */
const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 0x8c4d;
/**
 * A DXT3-compressed image in an sRGBA image format
 * @constant {number}
 */
const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 0x8c4e;
/**
 * A DXT5-compressed image in an sRGBA image format
 * @constant {number}
 */
const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 0x8c4f;
// WEBGL_compressed_texture_etc
// The WEBGL_compressed_texture_etc extension is part of the WebGL API and exposes 10 ETC/EAC compressed texture formats
/**
 * One-channel (red) unsigned format compression
 * @constant {number}
 */
const GL_COMPRESSED_R11_EAC = 0x9270;
/**
 * One-channel (red) signed format compression
 * @constant {number}
 */
const GL_COMPRESSED_SIGNED_R11_EAC = 0x9271;
/**
 * Two-channel (red and green) unsigned format compression
 * @constant {number}
 */
const GL_COMPRESSED_RG11_EAC = 0x9272;
/**
 * Two-channel (red and green) signed format compression
 * @constant {number}
 */
const GL_COMPRESSED_SIGNED_RG11_EAC = 0x9273;
/**
 * Compresses RBG8 data with no alpha channel
 * @constant {number}
 */
const GL_COMPRESSED_RGB8_ETC2 = 0x9274;
/**
 * Compresses RGBA8 data. The RGB part is encoded the same as RGB_ETC2, but the alpha part is encoded separately
 * @constant {number}
 */
const GL_COMPRESSED_RGBA8_ETC2_EAC = 0x9275;
/**
 * Compresses sRBG8 data with no alpha channel
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ETC2 = 0x9276;
/**
 * Compresses sRGBA8 data. The sRGB part is encoded the same as SRGB_ETC2, but the alpha part is encoded separately
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 0x9277;
/**
 * Similar to RGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent
 * @constant {number}
 */
const GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9278;
/**
 * Similar to SRGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9279;
// WEBGL_compressed_texture_pvrtc
// The WEBGL_compressed_texture_pvrtc extension is part of the WebGL API and exposes four PVRTC compressed texture formats
/**
 * RGB compression in 4-bit mode. One block for each 4×4 pixels
 * @constant {number}
 */
const GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8c00;
/**
 * RGBA compression in 4-bit mode. One block for each 4×4 pixels
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8c02;
/**
 * RGB compression in 2-bit mode. One block for each 8×4 pixels
 * @constant {number}
 */
const GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8c01;
/**
 * RGBA compression in 2-bit mode. One block for each 8×4 pixels
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8c03;
// WEBGL_compressed_texture_etc1
// The WEBGL_compressed_texture_etc1 extension is part of the WebGL API and exposes the ETC1 compressed texture format
/**
 * Compresses 24-bit RGB data with no alpha channel
 * @constant {number}
 */
const GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8d64;
// WEBGL_compressed_texture_atc
// The WEBGL_compressed_texture_atc extension is part of the WebGL API and exposes 3 ATC compressed texture formats. ATC is a proprietary compression algorithm for compressing textures on handheld devices
/**
 * Compresses RGB textures with no alpha channel
 * @constant {number}
 */
const GL_COMPRESSED_RGB_ATC_WEBGL = 0x8c92;
/**
 * Compresses RGBA textures using explicit alpha encoding (useful when alpha transitions are sharp)
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8c92;
/**
 * Compresses RGBA textures using interpolated alpha encoding (useful when alpha transitions are gradient)
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87ee;
// WEBGL_compressed_texture_astc
// The WEBGL_compressed_texture_astc extension is part of the WebGL API and exposes Adaptive Scalable Texture Compression (ASTC) compressed texture formats to WebGL
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
// https://developer.nvidia.com/astc-texture-compression-for-game-assets
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 4x4
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_4X4_KHR = 0x93b0;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 5x4
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_5X4_KHR = 0x93b1;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 5x5
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_5X5_KHR = 0x93b2;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 6x5
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_6X5_KHR = 0x93b3;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 6x6
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_6X6_KHR = 0x93b4;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 8x5
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_8X5_KHR = 0x93b5;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 8x6
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_8X6_KHR = 0x93b6;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 8x8
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_8X8_KHR = 0x93b7;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 10x5
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_10X5_KHR = 0x93b8;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 10x6
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_10X6_KHR = 0x93b9;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 10x8
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_10X8_KHR = 0x93ba;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 10x10
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_10X10_KHR = 0x93bb;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 12x10
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_12X10_KHR = 0x93bc;
/**
 * Compresses RGBA textures using ASTC compression in a blocksize of 12x12
 * @constant {number}
 */
const GL_COMPRESSED_RGBA_ASTC_12X12_KHR = 0x93bd;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 4x4
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR = 0x93d0;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 5x4
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR = 0x93d1;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 5x5
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR = 0x93d2;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 6x5
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR = 0x93d3;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 6x6
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR = 0x93d4;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 8x5
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR = 0x93d5;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 8x6
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR = 0x93d6;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 8x8
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR = 0x93d7;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 10x5
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR = 0x93d8;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 10x6
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR = 0x93d9;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 10x8
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR = 0x93da;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 10x10
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR = 0x93db;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 12x10
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR = 0x93dc;
/**
 * Compresses SRGB8 textures using ASTC compression in a blocksize of 12x12
 * @constant {number}
 */
const GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR = 0x93dd;
// WEBGL_depth_texture
// The WEBGL_depth_texture extension is part of the WebGL API and defines 2D depth and depth-stencil textures
/**
 * Unsigned integer type for 24-bit depth texture data
 * @constant {number}
 */
const GL_UNSIGNED_INT_24_8_WEBGL = 0x84fa;
// OES_texture_half_float
// The OES_texture_half_float extension is part of the WebGL API and adds texture formats with 16- (aka half float) and 32-bit floating-point components
/**
 * Half floating-point type (16-bit)
 * @constant {number}
 */
const GL_HALF_FLOAT_OES = 0x8d61;
// WEBGL_color_buffer_float
// The WEBGL_color_buffer_float extension is part of the WebGL API and adds the ability to render to 32-bit floating-point color buffers
/**
 * RGBA 32-bit floating-point color-renderable format
 * @constant {number}
 */
const GL_RGBA32F_EXT = 0x8814;
/**
 * RGB 32-bit floating-point color-renderable format
 * @constant {number}
 */
const GL_RGB32F_EXT = 0x8815;
/**
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT = 0x8211;
/**
 * @constant {number}
 */
const GL_UNSIGNED_NORMALIZED_EXT = 0x8c17;
// EXT_blend_minmax
// The EXT_blend_minmax extension is part of the WebGL API and extends blending capabilities by adding two new blend equations: the minimum or maximum color components of the source and destination colors
/**
 * Produces the minimum color components of the source and destination colors
 * @constant {number}
 */
const GL_MIN_EXT = 0x8007;
/**
 * Produces the maximum color components of the source and destination colors
 * @constant {number}
 */
const GL_MAX_EXT = 0x8008;
// EXT_sRGB
// The EXT_sRGB extension is part of the WebGL API and adds sRGB support to textures and framebuffer objects
/**
 * Unsized sRGB format that leaves the precision up to the driver
 * @constant {number}
 */
const GL_SRGB_EXT = 0x8c40;
/**
 * Unsized sRGB format with unsized alpha component
 * @constant {number}
 */
const GL_SRGB_ALPHA_EXT = 0x8c42;
/**
 * Sized (8-bit) sRGB and alpha formats
 * @constant {number}
 */
const GL_SRGB8_ALPHA8_EXT = 0x8c43;
/**
 * Returns the framebuffer color encoding
 * @constant {number}
 */
const GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT = 0x8210;
// OES_standard_derivatives
// The OES_standard_derivatives extension is part of the WebGL API and adds the GLSL derivative functions dFdx, dFdy, and fwidth
/**
 * Indicates the accuracy of the derivative calculation for the GLSL built-in functions: dFdx, dFdy, and fwidth
 * @constant {number}
 */
const GL_FRAGMENT_SHADER_DERIVATIVE_HINT_OES = 0x8b8b;
// WEBGL_draw_buffers
// The WEBGL_draw_buffers extension is part of the WebGL API and enables a fragment shader to write to several textures, which is useful for deferred shading, for example
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT0_WEBGL = 0x8ce0;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT1_WEBGL = 0x8ce1;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT2_WEBGL = 0x8ce2;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT3_WEBGL = 0x8ce3;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT4_WEBGL = 0x8ce4;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT5_WEBGL = 0x8ce5;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT6_WEBGL = 0x8ce6;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT7_WEBGL = 0x8ce7;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT8_WEBGL = 0x8ce8;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT9_WEBGL = 0x8ce9;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT10_WEBGL = 0x8cea;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT11_WEBGL = 0x8ceb;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT12_WEBGL = 0x8cec;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT13_WEBGL = 0x8ced;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT14_WEBGL = 0x8cee;
/**
 * Framebuffer color attachment point
 * @constant {number}
 */
const GL_COLOR_ATTACHMENT15_WEBGL = 0x8cef;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER0_WEBGL = 0x8825;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER1_WEBGL = 0x8826;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER2_WEBGL = 0x8827;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER3_WEBGL = 0x8828;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER4_WEBGL = 0x8829;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER5_WEBGL = 0x882a;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER6_WEBGL = 0x882b;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER7_WEBGL = 0x882c;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER8_WEBGL = 0x882d;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER9_WEBGL = 0x882e;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER10_WEBGL = 0x882f;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER11_WEBGL = 0x8830;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER12_WEBGL = 0x8831;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER13_WEBGL = 0x8832;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER14_WEBGL = 0x8833;
/**
 * Draw buffer
 * @constant {number}
 */
const GL_DRAW_BUFFER15_WEBGL = 0x8834;
/**
 * Maximum number of framebuffer color attachment points
 * @constant {number}
 */
const GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8cdf;
/**
 * Maximum number of draw buffers
 * @constant {number}
 */
const GL_MAX_DRAW_BUFFERS_WEBGL = 0x8824;
// OES_vertex_array_object
// The OES_vertex_array_object extension is part of the WebGL API and provides vertex array objects (VAOs) which encapsulate vertex array states. These objects keep pointers to vertex data and provide names for different sets of vertex data
/**
 * The bound vertex array object (VAO)
 * @constant {number}
 */
const GL_VERTEX_ARRAY_BINDING_OES = 0x85b5;
// EXT_disjoint_timer_query
// The EXT_disjoint_timer_query extension is part of the WebGL API and provides a way to measure the duration of a set of GL commands, without stalling the rendering pipeline
/**
 * The number of bits used to hold the query result for the given target
 * @constant {number}
 */
const GL_QUERY_COUNTER_BITS_EXT = 0x8864;
/**
 * The currently active query
 * @constant {number}
 */
const GL_CURRENT_QUERY_EXT = 0x8865;
/**
 * The query result
 * @constant {number}
 */
const GL_QUERY_RESULT_EXT = 0x8866;
/**
 * A Boolean indicating whether or not a query result is available
 * @constant {number}
 */
const GL_QUERY_RESULT_AVAILABLE_EXT = 0x8867;
/**
 * Elapsed time (in nanoseconds)
 * @constant {number}
 */
const GL_TIME_ELAPSED_EXT = 0x88bf;
/**
 * The current time
 * @constant {number}
 */
const GL_TIMESTAMP_EXT = 0x8e28;
/**
 * A Boolean indicating whether or not the GPU performed any disjoint operation
 * @constant {number}
 */
const GL_GPU_DISJOINT_EXT = 0x8fbb;
// Constants defined in WebGL draft extensions
// KHR_parallel_shader_compile
// The KHR_parallel_shader_compile extension is part of the WebGL draft API and provides multithreaded asynchronous shader compilation
/**
 * Query to determine if the compilation process is complete
 * @constant {number}
 */
const GL_COMPLETION_STATUS_KHR = 0x91b1;

export { GL_ACTIVE_ATTRIBUTES, GL_ACTIVE_TEXTURE, GL_ACTIVE_UNIFORMS, GL_ACTIVE_UNIFORM_BLOCKS, GL_ALIASED_LINE_WIDTH_RANGE, GL_ALIASED_POINT_SIZE_RANGE, GL_ALPHA, GL_ALPHA_BITS, GL_ALREADY_SIGNALED, GL_ALWAYS, GL_ANY_SAMPLES_PASSED, GL_ANY_SAMPLES_PASSED_CONSERVATIVE, GL_ARRAY_BUFFER, GL_ARRAY_BUFFER_BINDING, GL_ATTACHED_SHADERS, GL_BACK, GL_BLEND, GL_BLEND_COLOR, GL_BLEND_DST_ALPHA, GL_BLEND_DST_RGB, GL_BLEND_EQUATION, GL_BLEND_EQUATION_ALPHA, GL_BLEND_EQUATION_RGB, GL_BLEND_SRC_ALPHA, GL_BLEND_SRC_RGB, GL_BLUE_BITS, GL_BOOL, GL_BOOL_VEC2, GL_BOOL_VEC3, GL_BOOL_VEC4, GL_BROWSER_DEFAULT_WEBGL, GL_BUFFER_SIZE, GL_BUFFER_USAGE, GL_BYTE, GL_CCW, GL_CLAMP_TO_EDGE, GL_COLOR, GL_COLOR_ATTACHMENT0, GL_COLOR_ATTACHMENT0_WEBGL, GL_COLOR_ATTACHMENT1, GL_COLOR_ATTACHMENT10, GL_COLOR_ATTACHMENT10_WEBGL, GL_COLOR_ATTACHMENT11, GL_COLOR_ATTACHMENT11_WEBGL, GL_COLOR_ATTACHMENT12, GL_COLOR_ATTACHMENT12_WEBGL, GL_COLOR_ATTACHMENT13, GL_COLOR_ATTACHMENT13_WEBGL, GL_COLOR_ATTACHMENT14, GL_COLOR_ATTACHMENT14_WEBGL, GL_COLOR_ATTACHMENT15, GL_COLOR_ATTACHMENT15_WEBGL, GL_COLOR_ATTACHMENT1_WEBGL, GL_COLOR_ATTACHMENT2, GL_COLOR_ATTACHMENT2_WEBGL, GL_COLOR_ATTACHMENT3, GL_COLOR_ATTACHMENT3_WEBGL, GL_COLOR_ATTACHMENT4, GL_COLOR_ATTACHMENT4_WEBGL, GL_COLOR_ATTACHMENT5, GL_COLOR_ATTACHMENT5_WEBGL, GL_COLOR_ATTACHMENT6, GL_COLOR_ATTACHMENT6_WEBGL, GL_COLOR_ATTACHMENT7, GL_COLOR_ATTACHMENT7_WEBGL, GL_COLOR_ATTACHMENT8, GL_COLOR_ATTACHMENT8_WEBGL, GL_COLOR_ATTACHMENT9, GL_COLOR_ATTACHMENT9_WEBGL, GL_COLOR_BUFFER_BIT, GL_COLOR_CLEAR_VALUE, GL_COLOR_WRITEMASK, GL_COMPARE_REF_TO_TEXTURE, GL_COMPILE_STATUS, GL_COMPLETION_STATUS_KHR, GL_COMPRESSED_R11_EAC, GL_COMPRESSED_RG11_EAC, GL_COMPRESSED_RGB8_ETC2, GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2, GL_COMPRESSED_RGBA8_ETC2_EAC, GL_COMPRESSED_RGBA_ASTC_10X10_KHR, GL_COMPRESSED_RGBA_ASTC_10X5_KHR, GL_COMPRESSED_RGBA_ASTC_10X6_KHR, GL_COMPRESSED_RGBA_ASTC_10X8_KHR, GL_COMPRESSED_RGBA_ASTC_12X10_KHR, GL_COMPRESSED_RGBA_ASTC_12X12_KHR, GL_COMPRESSED_RGBA_ASTC_4X4_KHR, GL_COMPRESSED_RGBA_ASTC_5X4_KHR, GL_COMPRESSED_RGBA_ASTC_5X5_KHR, GL_COMPRESSED_RGBA_ASTC_6X5_KHR, GL_COMPRESSED_RGBA_ASTC_6X6_KHR, GL_COMPRESSED_RGBA_ASTC_8X5_KHR, GL_COMPRESSED_RGBA_ASTC_8X6_KHR, GL_COMPRESSED_RGBA_ASTC_8X8_KHR, GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL, GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL, GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG, GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG, GL_COMPRESSED_RGBA_S3TC_DXT1_EXT, GL_COMPRESSED_RGBA_S3TC_DXT3_EXT, GL_COMPRESSED_RGBA_S3TC_DXT5_EXT, GL_COMPRESSED_RGB_ATC_WEBGL, GL_COMPRESSED_RGB_ETC1_WEBGL, GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG, GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG, GL_COMPRESSED_RGB_S3TC_DXT1_EXT, GL_COMPRESSED_SIGNED_R11_EAC, GL_COMPRESSED_SIGNED_RG11_EAC, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR, GL_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC, GL_COMPRESSED_SRGB8_ETC2, GL_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2, GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, GL_COMPRESSED_SRGB_S3TC_DXT1_EXT, GL_COMPRESSED_TEXTURE_FORMATS, GL_CONDITION_SATISFIED, GL_CONSTANT_ALPHA, GL_CONSTANT_COLOR, GL_CONTEXT_LOST_WEBGL, GL_COPY_READ_BUFFER, GL_COPY_READ_BUFFER_BINDING, GL_COPY_WRITE_BUFFER, GL_COPY_WRITE_BUFFER_BINDING, GL_CULL_FACE, GL_CULL_FACE_MODE, GL_CURRENT_PROGRAM, GL_CURRENT_QUERY, GL_CURRENT_QUERY_EXT, GL_CURRENT_VERTEX_ATTRIB, GL_CW, GL_DECR, GL_DECR_WRAP, GL_DELETE_STATUS, GL_DEPTH, GL_DEPTH24_STENCIL8, GL_DEPTH32F_STENCIL8, GL_DEPTH_ATTACHMENT, GL_DEPTH_BITS, GL_DEPTH_BUFFER_BIT, GL_DEPTH_CLEAR_VALUE, GL_DEPTH_COMPONENT, GL_DEPTH_COMPONENT16, GL_DEPTH_COMPONENT24, GL_DEPTH_COMPONENT32F, GL_DEPTH_FUNC, GL_DEPTH_RANGE, GL_DEPTH_STENCIL, GL_DEPTH_STENCIL_ATTACHMENT, GL_DEPTH_TEST, GL_DEPTH_WRITEMASK, GL_DITHER, GL_DONT_CARE, GL_DRAW_BUFFER0, GL_DRAW_BUFFER0_WEBGL, GL_DRAW_BUFFER1, GL_DRAW_BUFFER10, GL_DRAW_BUFFER10_WEBGL, GL_DRAW_BUFFER11, GL_DRAW_BUFFER11_WEBGL, GL_DRAW_BUFFER12, GL_DRAW_BUFFER12_WEBGL, GL_DRAW_BUFFER13, GL_DRAW_BUFFER13_WEBGL, GL_DRAW_BUFFER14, GL_DRAW_BUFFER14_WEBGL, GL_DRAW_BUFFER15, GL_DRAW_BUFFER15_WEBGL, GL_DRAW_BUFFER1_WEBGL, GL_DRAW_BUFFER2, GL_DRAW_BUFFER2_WEBGL, GL_DRAW_BUFFER3, GL_DRAW_BUFFER3_WEBGL, GL_DRAW_BUFFER4, GL_DRAW_BUFFER4_WEBGL, GL_DRAW_BUFFER5, GL_DRAW_BUFFER5_WEBGL, GL_DRAW_BUFFER6, GL_DRAW_BUFFER6_WEBGL, GL_DRAW_BUFFER7, GL_DRAW_BUFFER7_WEBGL, GL_DRAW_BUFFER8, GL_DRAW_BUFFER8_WEBGL, GL_DRAW_BUFFER9, GL_DRAW_BUFFER9_WEBGL, GL_DRAW_FRAMEBUFFER, GL_DRAW_FRAMEBUFFER_BINDING, GL_DST_ALPHA, GL_DST_COLOR, GL_DYNAMIC_COPY, GL_DYNAMIC_DRAW, GL_DYNAMIC_READ, GL_ELEMENT_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER_BINDING, GL_EQUAL, GL_FASTEST, GL_FLOAT, GL_FLOAT_32_UNSIGNED_INT_24_8_REV, GL_FLOAT_MAT2, GL_FLOAT_MAT2X3, GL_FLOAT_MAT2X4, GL_FLOAT_MAT3, GL_FLOAT_MAT3X2, GL_FLOAT_MAT3X4, GL_FLOAT_MAT4, GL_FLOAT_MAT4X2, GL_FLOAT_MAT4X3, GL_FLOAT_VEC2, GL_FLOAT_VEC3, GL_FLOAT_VEC4, GL_FRAGMENT_SHADER, GL_FRAGMENT_SHADER_DERIVATIVE_HINT, GL_FRAGMENT_SHADER_DERIVATIVE_HINT_OES, GL_FRAMEBUFFER, GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE, GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE, GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING, GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT, GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE, GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT, GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE, GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE, GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME, GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE, GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE, GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE, GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE, GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER, GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL, GL_FRAMEBUFFER_BINDING, GL_FRAMEBUFFER_COMPLETE, GL_FRAMEBUFFER_DEFAULT, GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT, GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS, GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT, GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE, GL_FRAMEBUFFER_UNSUPPORTED, GL_FRONT, GL_FRONT_AND_BACK, GL_FRONT_FACE, GL_FUNC_ADD, GL_FUNC_REVERSE_SUBTRACT, GL_FUNC_SUBSTRACT, GL_GENERATE_MIPMAP_HINT, GL_GEQUAL, GL_GPU_DISJOINT_EXT, GL_GREATER, GL_GREEN_BITS, GL_HALF_FLOAT, GL_HALF_FLOAT_OES, GL_HIGH_FLOAT, GL_HIGH_INT, GL_IMPLEMENTATION_COLOR_READ_FORMAT, GL_IMPLEMENTATION_COLOR_READ_TYPE, GL_INCR, GL_INCR_WRAP, GL_INT, GL_INTERLEAVED_ATTRIBS, GL_INT_2_10_10_10_REV, GL_INT_SAMPLER_2D, GL_INT_SAMPLER_2D_ARRAY, GL_INT_SAMPLER_3D, GL_INT_SAMPLER_CUBE, GL_INT_VEC2, GL_INT_VEC3, GL_INT_VEC4, GL_INVALID_ENUM, GL_INVALID_FRAMEBUFFER_OPERATION, GL_INVALID_INDEX, GL_INVALID_OPERATION, GL_INVALID_VALUE, GL_INVERT, GL_KEEP, GL_LEQUAL, GL_LESS, GL_LINEAR, GL_LINEAR_MIPMAP_LINEAR, GL_LINEAR_MIPMAP_NEAREST, GL_LINES, GL_LINE_LOOP, GL_LINE_STRIP, GL_LINE_WIDTH, GL_LINK_STATUS, GL_LOW_FLOAT, GL_LOW_INT, GL_LUMINANCE, GL_LUMINANCE_ALPHA, GL_MAX, GL_MAX_3D_TEXTURE_SIZE, GL_MAX_ARRAY_TEXTURE_LAYERS, GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL, GL_MAX_COLOR_ATTACHMENTS, GL_MAX_COLOR_ATTACHMENTS_WEBGL, GL_MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS, GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS, GL_MAX_COMBINED_UNIFORM_BLOCKS, GL_MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS, GL_MAX_CUBE_MAP_TEXTURE_SIZE, GL_MAX_DRAW_BUFFERS, GL_MAX_DRAW_BUFFERS_WEBGL, GL_MAX_ELEMENTS_INDICES, GL_MAX_ELEMENTS_VERTICES, GL_MAX_ELEMENT_INDEX, GL_MAX_EXT, GL_MAX_FRAGMENT_INPUT_COMPONENTS, GL_MAX_FRAGMENT_UNIFORM_BLOCKS, GL_MAX_FRAGMENT_UNIFORM_COMPONENTS, GL_MAX_FRAGMENT_UNIFORM_VECTORS, GL_MAX_PROGRAM_TEXEL_OFFSET, GL_MAX_RENDERBUFFER_SIZE, GL_MAX_SAMPLES, GL_MAX_SERVER_WAIT_TIMEOUT, GL_MAX_TEXTURE_IMAGE_UNITS, GL_MAX_TEXTURE_LOD_BIAS, GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT, GL_MAX_TEXTURE_SIZE, GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS, GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS, GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS, GL_MAX_UNIFORM_BLOCK_SIZE, GL_MAX_UNIFORM_BUFFER_BINDINGS, GL_MAX_VARYING_COMPONENTS, GL_MAX_VARYING_VECTORS, GL_MAX_VERTEX_ATTRIBS, GL_MAX_VERTEX_OUTPUT_COMPONENTS, GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS, GL_MAX_VERTEX_UNIFORM_BLOCKS, GL_MAX_VERTEX_UNIFORM_COMPONENTS, GL_MAX_VERTEX_UNIFORM_VECTORS, GL_MAX_VIEWPORT_DIMS, GL_MEDIUM_FLOAT, GL_MEDIUM_INT, GL_MIN, GL_MIN_EXT, GL_MIN_PROGRAM_TEXEL_OFFSET, GL_MIRRORED_REPEAT, GL_NEAREST, GL_NEAREST_MIPMAP_LINEAR, GL_NEAREST_MIPMAP_NEAREST, GL_NEVER, GL_NICEST, GL_NONE, GL_NOTEQUAL, GL_NO_ERROR, GL_OBJECT_TYPE, GL_ONE, GL_ONE_MINUS_CONSTANT_ALPHA, GL_ONE_MINUS_CONSTANT_COLOR, GL_ONE_MINUS_DST_ALPHA, GL_ONE_MINUS_DST_COLOR, GL_ONE_MINUS_SRC_ALPHA, GL_ONE_MINUS_SRC_COLOR, GL_OUT_OF_MEMORY, GL_PACK_ALIGNMENT, GL_PACK_ROW_LENGTH, GL_PACK_SKIP_PIXELS, GL_PACK_SKIP_ROWS, GL_PIXEL_PACK_BUFFER, GL_PIXEL_PACK_BUFFER_BINDING, GL_PIXEL_UNPACK_BUFFER, GL_PIXEL_UNPACK_BUFFER_BINDING, GL_POINTS, GL_POLYGON_OFFSET_FACTOR, GL_POLYGON_OFFSET_FILL, GL_POLYGON_OFFSET_UNITS, GL_QUERY_COUNTER_BITS_EXT, GL_QUERY_RESULT, GL_QUERY_RESULT_AVAILABLE, GL_QUERY_RESULT_AVAILABLE_EXT, GL_QUERY_RESULT_EXT, GL_R11F_G11F_B10F, GL_R16F, GL_R16I, GL_R16UI, GL_R32F, GL_R32I, GL_R32UI, GL_R8, GL_R8I, GL_R8UI, GL_R8_SNORM, GL_RASTERIZER_DISCARD, GL_READ_BUFFER, GL_READ_FRAMEBUFFER, GL_READ_FRAMEBUFFER_BINDING, GL_RED, GL_RED_BITS, GL_RED_INTEGER, GL_RENDERBUFFER, GL_RENDERBUFFER_ALPHA_SIZE, GL_RENDERBUFFER_BINDING, GL_RENDERBUFFER_BLUE_SIZE, GL_RENDERBUFFER_DEPTH_SIZE, GL_RENDERBUFFER_GREEN_SIZE, GL_RENDERBUFFER_HEIGHT, GL_RENDERBUFFER_INTERNAL_FORMAT, GL_RENDERBUFFER_RED_SIZE, GL_RENDERBUFFER_SAMPLES, GL_RENDERBUFFER_STENCIL_SIZE, GL_RENDERBUFFER_WIDTH, GL_RENDERER, GL_REPEAT, GL_REPLACE, GL_RG, GL_RG16F, GL_RG16I, GL_RG16UI, GL_RG32F, GL_RG32I, GL_RG32UI, GL_RG8, GL_RG8I, GL_RG8UI, GL_RG8_SNORM, GL_RGB, GL_RGB10_A2, GL_RGB10_A2UI, GL_RGB16F, GL_RGB16I, GL_RGB16UI, GL_RGB32F, GL_RGB32F_EXT, GL_RGB32I, GL_RGB32UI, GL_RGB565, GL_RGB5_A1, GL_RGB8, GL_RGB8I, GL_RGB8UI, GL_RGB8_SNORM, GL_RGB9_E5, GL_RGBA, GL_RGBA16F, GL_RGBA16I, GL_RGBA16UI, GL_RGBA32F, GL_RGBA32F_EXT, GL_RGBA32I, GL_RGBA32UI, GL_RGBA4, GL_RGBA8, GL_RGBA8I, GL_RGBA8UI, GL_RGBA8_SNORM, GL_RGBA_INTEGER, GL_RGB_INTEGER, GL_RG_INTEGER, GL_SAMPLER_2D, GL_SAMPLER_2D_ARRAY, GL_SAMPLER_2D_ARRAY_SHADOW, GL_SAMPLER_2D_SHADOW, GL_SAMPLER_3D, GL_SAMPLER_BINDING, GL_SAMPLER_CUBE, GL_SAMPLER_CUBE_SHADOW, GL_SAMPLES, GL_SAMPLE_ALPHA_TO_COVERAGE, GL_SAMPLE_BUFFERS, GL_SAMPLE_COVERAGE, GL_SAMPLE_COVERAGE_INVERT, GL_SAMPLE_COVERAGE_VALUE, GL_SCISSOR_BOX, GL_SCISSOR_TEST, GL_SEPARATE_ATTRIBS, GL_SHADER_TYPE, GL_SHADING_LANGUAGE_VERSION, GL_SHORT, GL_SIGNALED, GL_SIGNED_NORMALIZED, GL_SRC_ALPHA, GL_SRC_ALPHA_SATURATE, GL_SRC_COLOR, GL_SRGB, GL_SRGB8, GL_SRGB8_ALPHA8, GL_SRGB8_ALPHA8_EXT, GL_SRGB_ALPHA_EXT, GL_SRGB_EXT, GL_STATIC_COPY, GL_STATIC_DRAW, GL_STATIC_READ, GL_STENCIL, GL_STENCIL_ATTACHMENT, GL_STENCIL_BACK_FAIL, GL_STENCIL_BACK_FUNC, GL_STENCIL_BACK_PASS_DEPTH_FAIL, GL_STENCIL_BACK_PASS_DEPTH_PASS, GL_STENCIL_BACK_REF, GL_STENCIL_BACK_VALUE_MASK, GL_STENCIL_BACK_WRITEMASK, GL_STENCIL_BITS, GL_STENCIL_BUFFER_BIT, GL_STENCIL_CLEAR_VALUE, GL_STENCIL_FAIL, GL_STENCIL_FUNC, GL_STENCIL_INDEX, GL_STENCIL_INDEX8, GL_STENCIL_PASS_DEPTH_FAIL, GL_STENCIL_PASS_DEPTH_PASS, GL_STENCIL_REF, GL_STENCIL_TEST, GL_STENCIL_VALUE_MASK, GL_STENCIL_WRITEMASK, GL_STREAM_COPY, GL_STREAM_DRAW, GL_STREAM_READ, GL_SUBPIXEL_BITS, GL_SYNC_CONDITION, GL_SYNC_FENCE, GL_SYNC_FLAGS, GL_SYNC_FLUSH_COMMANDS_BIT, GL_SYNC_GPU_COMMANDS_COMPLETE, GL_SYNC_STATUS, GL_TEXTURE, GL_TEXTURE0, GL_TEXTURE1, GL_TEXTURE10, GL_TEXTURE11, GL_TEXTURE12, GL_TEXTURE13, GL_TEXTURE14, GL_TEXTURE15, GL_TEXTURE16, GL_TEXTURE17, GL_TEXTURE18, GL_TEXTURE19, GL_TEXTURE2, GL_TEXTURE20, GL_TEXTURE21, GL_TEXTURE22, GL_TEXTURE23, GL_TEXTURE24, GL_TEXTURE25, GL_TEXTURE26, GL_TEXTURE27, GL_TEXTURE28, GL_TEXTURE29, GL_TEXTURE3, GL_TEXTURE30, GL_TEXTURE31, GL_TEXTURE4, GL_TEXTURE5, GL_TEXTURE6, GL_TEXTURE7, GL_TEXTURE8, GL_TEXTURE9, GL_TEXTURE_2D, GL_TEXTURE_2D_ARRAY, GL_TEXTURE_3D, GL_TEXTURE_BASE_LEVEL, GL_TEXTURE_BINDING_2D, GL_TEXTURE_BINDING_2D_ARRAY, GL_TEXTURE_BINDING_3D, GL_TEXTURE_BINDING_CUBE_MAP, GL_TEXTURE_COMPARE_FUNC, GL_TEXTURE_COMPARE_MODE, GL_TEXTURE_CUBE_MAP, GL_TEXTURE_CUBE_MAP_NEGATIVE_X, GL_TEXTURE_CUBE_MAP_NEGATIVE_Y, GL_TEXTURE_CUBE_MAP_NEGATIVE_Z, GL_TEXTURE_CUBE_MAP_POSITIVE_X, GL_TEXTURE_CUBE_MAP_POSITIVE_Y, GL_TEXTURE_CUBE_MAP_POSITIVE_Z, GL_TEXTURE_IMMUTABLE_FORMAT, GL_TEXTURE_IMMUTABLE_LEVELS, GL_TEXTURE_MAG_FILTER, GL_TEXTURE_MAX_ANISOTROPY_EXT, GL_TEXTURE_MAX_LEVEL, GL_TEXTURE_MAX_LOD, GL_TEXTURE_MIN_FILTER, GL_TEXTURE_MIN_LOD, GL_TEXTURE_WRAP_R, GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T, GL_TIMEOUT_EXPIRED, GL_TIMEOUT_IGNORED, GL_TIMESTAMP_EXT, GL_TIME_ELAPSED_EXT, GL_TRANSFORM_FEEDBACK, GL_TRANSFORM_FEEDBACK_ACTIVE, GL_TRANSFORM_FEEDBACK_BINDING, GL_TRANSFORM_FEEDBACK_BUFFER, GL_TRANSFORM_FEEDBACK_BUFFER_BINDING, GL_TRANSFORM_FEEDBACK_BUFFER_MODE, GL_TRANSFORM_FEEDBACK_BUFFER_SIZE, GL_TRANSFORM_FEEDBACK_BUFFER_START, GL_TRANSFORM_FEEDBACK_PAUSED, GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN, GL_TRANSFORM_FEEDBACK_VARYINGS, GL_TRIANGLES, GL_TRIANGLE_FAN, GL_TRIANGLE_STRIP, GL_UNIFORM_ARRAY_STRIDE, GL_UNIFORM_BLOCK_ACTIVE_UNIFORMS, GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES, GL_UNIFORM_BLOCK_BINDING, GL_UNIFORM_BLOCK_DATA_SIZE, GL_UNIFORM_BLOCK_INDEX, GL_UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER, GL_UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER, GL_UNIFORM_BUFFER, GL_UNIFORM_BUFFER_BINDING, GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT, GL_UNIFORM_BUFFER_SIZE, GL_UNIFORM_BUFFER_START, GL_UNIFORM_IS_ROW_MAJOR, GL_UNIFORM_MATRIX_STRIDE, GL_UNIFORM_OFFSET, GL_UNIFORM_SIZE, GL_UNIFORM_TYPE, GL_UNMASKED_RENDERER_WEBGL, GL_UNMASKED_VENDOR_WEBGL, GL_UNPACK_ALIGNMENT, GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, GL_UNPACK_FLIP_Y_WEBGL, GL_UNPACK_IMAGE_HEIGHT, GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, GL_UNPACK_ROW_LENGTH, GL_UNPACK_SKIP_IMAGES, GL_UNPACK_SKIP_PIXELS, GL_UNPACK_SKIP_ROWS, GL_UNSIGNALED, GL_UNSIGNED_BYTE, GL_UNSIGNED_INT, GL_UNSIGNED_INT_10F_11F_11F_REV, GL_UNSIGNED_INT_24_8, GL_UNSIGNED_INT_24_8_WEBGL, GL_UNSIGNED_INT_2_10_10_10_REV, GL_UNSIGNED_INT_5_9_9_9_REV, GL_UNSIGNED_INT_SAMPLER_2D, GL_UNSIGNED_INT_SAMPLER_2D_ARRAY, GL_UNSIGNED_INT_SAMPLER_3D, GL_UNSIGNED_INT_SAMPLER_CUBE, GL_UNSIGNED_INT_VEC2, GL_UNSIGNED_INT_VEC3, GL_UNSIGNED_INT_VEC4, GL_UNSIGNED_NORMALIZED, GL_UNSIGNED_NORMALIZED_EXT, GL_UNSIGNED_SHORT, GL_UNSIGNED_SHORT_4_4_4_4, GL_UNSIGNED_SHORT_5_5_5_1, GL_UNSIGNED_SHORT_5_6_5, GL_VALIDATE_STATUS, GL_VENDOR, GL_VERSION, GL_VERTEX_ARRAY_BINDING, GL_VERTEX_ARRAY_BINDING_OES, GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING, GL_VERTEX_ATTRIB_ARRAY_DIVISOR, GL_VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE, GL_VERTEX_ATTRIB_ARRAY_ENABLED, GL_VERTEX_ATTRIB_ARRAY_INTEGER, GL_VERTEX_ATTRIB_ARRAY_NORMALIZED, GL_VERTEX_ATTRIB_ARRAY_POINTER, GL_VERTEX_ATTRIB_ARRAY_SIZE, GL_VERTEX_ATTRIB_ARRAY_STRIDE, GL_VERTEX_ATTRIB_ARRAY_TYPE, GL_VERTEX_SHADER, GL_VIEWPORT, GL_WAIT_FAILED, GL_ZERO };
