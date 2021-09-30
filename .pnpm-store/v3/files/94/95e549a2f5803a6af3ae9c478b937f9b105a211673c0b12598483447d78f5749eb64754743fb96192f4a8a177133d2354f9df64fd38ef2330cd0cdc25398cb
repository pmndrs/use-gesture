# [@webgpu/glslang](https://www.npmjs.com/package/@webgpu/glslang)

This is a GLSL-to-SPIR-V compiler for the Web and Node.
It is a WebAssembly build of [glslang](https://github.com/KhronosGroup/glslang).

There are several build configurations:

* `dist/web-min-nocompute`: Build for web with only vertex/fragment support
  and **no GLSL compilation messages**.
* `dist/web-devel-nocompute`: Build for web with only vertex/fragment support.
* `dist/web-devel`: Build for web with all features.
* `dist/node-devel`: Build for Node with non-async startup and all features.
  (To use this, just import `@webgpu/glslang`.)

## Re-building

You shouldn't need to do this, but here is how you can regenerate the files in
`dist/`. This should work on macOS (**with GNU Bison**) and on Linux.

### Setup

- Make sure Emscripten is on the path (e.g. with emsdk, do `source emsdk_env.sh` first).
- Make sure you have a recent version of GNU Bison installed.
- Install brotli, cmake, and any other necessary build tools.

### Build

- Optionally, clean by deleting `build/`.
- Run `build.sh`.
