# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Fixed
- Fixed Surface Area Heuristic (SAH) split strategy to function correctly, improve build performance, and produce more optimal bounds and improved a memory footprint.

### Added
- Return "surfaceAreaCost" in returned `getBVHExtremes` object to compare BVH structure quality.
- Support for `displayEdges`, `meshMaterial`, and `edgeMaterial` to MeshBVHVisualizer to enable displaying bounds as solid meshes.

### Changed
- Deprecated the `getBVHExtremes` "total" return value in favor of `nodeCount`.

## [0.4.2] - 2021-08-04
### Fixed
- Case where `intersectsRangeFunc` could be passed the incorrect node id in shapecast.
- Bug in `distanceToGeometry` and `closestPointToGeometry` which would likely result in some closest points being missed. This fix greatly degrades performance in the case where the passed geometry does not have a BVH. It is recommended that the passed in geometry include a computed bounds tree.
- Cases where passed in geometry that did not include an index buffer could throw an error when calling functions like `closestPointToGeometry`.
- Case where raycastFirst would return the incorrect result.
- Greatly improved `MeshBVHVisualizer` render and update performance.
- Case where MeshBVHVisualizer would not correctly display a BVH for geometry with multiple groups.

### Added
- `distanceToGeometry` and `closestPointToGeometry` fast path when the passed in geometry has a bounds tree.
- Support for position BufferAttribute to be interleaved.

## [0.4.1] - 2021-06-21
### Changed
- package.json "main" field to use a .cjs file extension

## [0.4.0] - 2021-06-11
### Added
- `MeshBVH.refit` function to refit the bounds to modified vertices.
- `setBoundingBox` MeshBVH construction option.
- `MeshBVH.getBoundingBox` function.
- `intersectsRange` callback option to `MeshBVH.shapecast`.

### Changed
- Removed `src/worker/generateAsync.js` function. Use `GenerateMeshBVHWorker` instead.
- Use `type: module` in package.json to enable use of es6 modules in node.
- Add `sideEffects: false` to package.json.
- Remove ability to generate an unpacked BVH.
- Improved "closestPointToPoint" performance slightly.
- `MeshBVH.shapecast` to take an object of callback functions instead of a list of function arguments and the triangle intersection callback has been changed to take a single triangle index. See README for new API. Calls using the old function will log a warning.

### Fixed
- `MeshBVHVisualizer` not using the new geometry BVH if one was generated.
- `MeshBVHVisualizer` not using the new mesh if it was set.
- Case where passing in null `intersectsTriangleFunc` to `MeshBVH.shapecast` could throw an error.
- Case where the buffer being raycast against was not cleared correctly if a BVH had multiple roots.

## [0.3.7] - 2021-03-06
### Fixed
- Include built umd file including v0.3.6 changes.

## [0.3.6] - 2021-03-03
### Fixed
- Incorrect face index would be returned from intersection (related to three.js bug fixed in v0.126.1).

## [0.3.5] - 2021-02-28
### Fixed
- Case where `raycastFirst` failed to return a valid result.

## [0.3.4] - 2021-02-25
### Changed
- Raycast result to return a custom intersection object aligned with three.js v0.126.0.

## [0.3.3] - 2021-01-24
### Added
- `depth` argument to `intersectsBoundsFunc` and `intersectsTriangleFunc` of `shapecast`.
- "webvr" and "webxr" tags.
- `closestPointToSegment` function to the triangle object used during shapecast which can be used for capsule intersection detection.

## [0.3.2] - 2020-12-23
### Fixed
- Case where float 32 rounding error could result in leaf bounds not completely containing the triangles by expanding the bounds by an estimation of the error.

### Changed
- `Shapecast` `intersectsBoundsFunc` to return one of the `NOT_INTERSECTED`, `INTERSECTED`, or `CONTAINED` constants. Returning `true` and `false` currently retains the old functionality.

## [0.3.1] - 2020-12-14
### Added
- Performance improvements when computing distance to geometry.
- `shapecast` to the docs.
- `MeshBVHVisualizer` to exports.

### Fixed
- Cloning the bvh visualizer causing an error.
- Bug with shapecast function where one node would not be checked when using the node score function.

### Changed
- Change the bvh visualizer so it automatically copies the local position and rotation of the target mesh.

## [0.3.0] - 2020-12-01
### Added
- `generateAsync` function in the `/src/worker` folder to help generate BVHs asynchronously with WebWorkers.

### Changed
- three.js version to use v0.123.0, change `Matrix4.getInverse` to `Matrix4.invert`.

## [0.2.0] - 2020-02-07
### Added
- MeshBVH.serialize and deserialize functions so the bvh can be computed and transferred from a webworker.
- `lazyGeneration` (defaults to true) option for faster tree initialization.
- Support for a buffer-packed tree if `lazyGeneration` is false or a tree has been deserialized for a more smaller memory footprint.

### Changed
- CENTER tree computation to improve raycast performance and create more balanced trees.

## [0.1.5] - 2020-01-03
### Fixed
- Uglify warning for inline defined functions.

## [0.1.4] - 2019-08-31
### Changed
- Changed three.js peer dependency version from ^ to >= to prevent warnings.

## [0.1.3] - 2019-05-24
### Added
- Use the BufferGeometry bounding box if it exists and set it if it does not.

### Changed
- Use the center of the triangles bounding box instead of the average of the vertices as the triangles center when binning the polygons.

## [0.1.2] - 2019-03-17
### Fixed
- Bug where `closestPointToGeometry` would throw an error when target vectors were provided because a function name was misspelled.

## [0.1.1] - 2019-03-16
### Added
- API for performing intersecting boxes, spheres, and geometry.
- API for checking the distance to geometry and points.

### Fixed
- Fixed issue where an index buffer of the incorrect type was created if there were more than 2^16 vertices.
- Fixed MeshBVHVisualizer not visualizing all the groups in the bvh.

## [0.1.0] - 2019-02-28
### Added
- Error conditions when using `InterleavedAttributeBuffers` for both index and position geometry attributes.
- The geometry index attribute is modified when building the `MeshBVH`. And index attribute is created on geometry if it does not exist.

### Fixed
- Fix the bounds tree not respecting groups

## [0.0.2] - 2019-01-05
### Added
- Add included files array to package.json.
