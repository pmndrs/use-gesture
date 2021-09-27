# three-mesh-bvh

[![npm version](https://img.shields.io/npm/v/three-mesh-bvh.svg?style=flat-square)](https://www.npmjs.com/package/three-mesh-bvh)
[![lgtm code quality](https://img.shields.io/lgtm/grade/javascript/g/gkjohnson/three-mesh-bvh.svg?style=flat-square&label=code-quality)](https://lgtm.com/projects/g/gkjohnson/three-mesh-bvh/)
[![build](https://img.shields.io/github/workflow/status/gkjohnson/three-mesh-bvh/Node.js%20CI?style=flat-square&label=build)](https://github.com/gkjohnson/three-mesh-bvh/actions)


A BVH implementation to speed up raycasting and enable spatial queries against three.js meshes.

![screenshot](./docs/example-sm.gif)

Casting 500 rays against an 80,000 polygon model at 60fps!

[Raycasting demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/raycast.html)

[Sculpting demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/sculpt.html)

[Clipped edges demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html)

[Triangle painting demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/collectTriangles.html)

[Sphere physics collision demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/physics.html)

[Player movement demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/characterMovement.html)

[Lasso selection demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/selection.html)

[Point cloud interesection demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/pointCloudIntersection.html)

[Distance comparison demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/distancecast.html)

[Shape intersection demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/shapecast.html)

[WebWorker generation demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/asyncGenerate.html)

[BVH options inspector demo](https://gkjohnson.github.io/three-mesh-bvh/example/bundle/inspector.html)

# Use

Using pre-made functions

```js
// Import via ES6 modules
import * as THREE from 'three';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

// Or UMD
const { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } = window.MeshBVHLib;


// Add the extension functions
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// Generate geometry and associated BVH
const geom = new THREE.TorusKnotBufferGeometry( 10, 3, 400, 100 );
const mesh = new THREE.Mesh( geom, material );
geom.computeBoundsTree();
```

Or manually building the BVH

```js
// Import via ES6 modules
import * as THREE from 'three';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

// Or UMD
const { MeshBVH, acceleratedRaycast } = window.MeshBVHLib;


// Add the raycast function. Assumes the BVH is available on
// the `boundsTree` variable
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// ...

// Generate the BVH and use the newly generated index
geom.boundsTree = new MeshBVH( geom );
```

And then raycasting

```js
// Setting "firstHitOnly" to true means the Mesh.raycast function will use the
// bvh "raycastFirst" function to return a result more quickly.
const raycaster = new THREE.Raycaster();
raycaster.firstHitOnly = true;
raycaster.intersectObjects( [ mesh ] );
```

## Querying the BVH Directly

```js
import * as THREE from 'three';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

let mesh, geometry;
const invMat = new THREE.Matrix4();

// instantiate the geometry

// ...

const bvh = new MeshBVH( geometry );
invMat.copy( mesh.matrixWorld ).invert();

// raycasting
// ensure the ray is in the local space of the geometry being cast against
raycaster.ray.applyMatrix4( invMat );
const hit = bvh.raycastFirst( mesh, raycaster, raycaster.ray );

// spherecasting
// ensure the sphere is in the lcoal space of hte geometry being cast against
sphere.applyMatrix4( invMat );
const intersects = bvh.intersectsSphere( mesh, sphere );
```

## Serialization and Deserialization

```js
const geometry = new KnotBufferGeometry( 1, 0.5, 40, 10 );
const bvh = new MeshBVH( geometry );
const serialized = MeshBVH.serialize( bvh, geometry );

// ...

const deserializedBVH = MeshBVH.deserialize( serialized, geometry );
geometry.boundsTree = deserializedBVH;
```

## Asynchronous Generation

_NOTE WebWorker syntax is inconsistently supported across bundlers and sometimes not supported at all so the GenereateMeshBVHWorker class is not exported from the package root. If needed the code from `src/worker` can be copied and modified to accomodate a particular build process._

```js
import { GenerateMeshBVHWorker } from 'three-mesh-bvh/src/workers/GenerateMeshBVHWorker.js';

// ...

const geometry = new KnotBufferGeometry( 1, 0.5, 40, 10 );
const worker = new GenerateMeshBVHWorker();
worker.generate( geometry ).then( bvh => {

    geometry.boundsTree = bvh;

} );
```

# Exports

## Split Strategy Constants

#### CENTER

Option for splitting each BVH node down the center of the longest axis of the bounds.

This is the fastest construction option and will yield a good, performant bounds.

#### AVERAGE

Option for splitting each BVH node at the average point along the longest axis for all triangle centroids in the bounds.

This strategy may be better than `CENTER` with some geometry.

#### SAH

Option to use a Surface Area Heuristic to split the bounds more optimally. This SAH implementation tests 32 discrete splits in each node along each axis to determine which split is the lowest cost.

This is the slowest construction option but will yield the best bounds of the three options and use the least memory.

## Shapecast Intersection Constants

#### NOT_INTERSECTED

Indicates the shape did not intersect the given bounding box.

#### INTERSECTED

Indicates the shape did intersect the given bounding box.

#### CONTAINED

Indicate the shape entirely contains the given bounding box.

## MeshBVH

The MeshBVH generation process modifies the geometry's index bufferAttribute in place to save memory. The BVH construction will use the geometry's boundingBox if it exists or set it if it does not. The BVH will no longer work correctly if the index buffer is modified.

### static .serialize

```js
static serialize( bvh : MeshBVH, geometry : BufferGeometry, copyIndexBuffer = true : Boolean ) : SerializedBVH
```

Generates a representation of the complete bounds tree and the geometry index buffer which can be used to recreate a bounds tree using the [deserialize](#static-deserialize) function. The `serialize` and `deserialize` functions can be used to generate a MeshBVH asynchronously in a background web worker to prevent the main thread from stuttering.

`bvh` is the MeshBVH to be serialized and `geometry` is the bufferGeometry used to generate and raycast against using the `bvh`.

If `copyIndexBuffer` is true then a copy of the `geometry.index.array` is made which is slower but useful is the geometry index is intended to be modified.

### static .deserialize

```js
static deserialize( data : SerializedBVH, geometry : BufferGeometry, setIndex = true : Boolean ) : MeshBVH
```

Returns a new MeshBVH instance from the serialized data. `geometry` is the geometry used to generate the original bvh `data` was derived from. If `setIndex` is true then the buffer for the `geometry.index` attribute is set from the serialized data attribute or created if an index does not exist.

_NOTE: In order for the bounds tree to be used for casts the geometry index attribute must be replaced by the data in the SeralizedMeshBVH object._

_NOTE: The returned MeshBVH is a fully generated, buffer packed BVH instance to improve memory footprint and uses the same buffers passed in on the `data.root` property._

### .constructor

```js
constructor( geometry : BufferGeometry, options : Object )
```

Constructs the bounds tree for the given geometry and produces a new index attribute buffer. A reference to the passed geometry is retained. The available options are

```js
{
    // Which split strategy to use when constructing the BVH.
    strategy: CENTER,

    // The maximum depth to allow the tree to build to.
    // Setting this to a smaller trades raycast speed for better construction
    // time and less memory allocation.
    maxDepth: 40,

    // The number of triangles to aim for in a leaf node. Setting this to a lower
    // number can improve raycast performance but increase construction time and
    // memory footprint.
    maxLeafTris: 10,

    // If true then the bounding box for the geometry is set once the BVH
    // has been constructed.
    setBoundingBox: true,

    // Print out warnings encountered during tree construction.
    verbose: true,

}
```

*NOTE: The geometry's index attribute array is modified in order to build the bounds tree. If the geometry has no index then one is added.*

### .raycast

```js
raycast( mesh : Mesh, raycaster : Raycaster, ray : Ray, intersects : Array ) : Array<RaycastHit>
```

Adds all raycast triangle hits in unsorted order to the `intersects` array. It is expected that `ray` is in the frame of the mesh being raycast against and that the geometry on `mesh` is the same as the one used to generate the bvh.

### .raycastFirst

```js
raycastFirst( mesh : Mesh, raycaster : Raycaster, ray : Ray ) : RaycastHit
```

Returns the first raycast hit in the model. This is typically much faster than returning all hits.

### .intersectsSphere

```js
intersectsSphere( mesh : Mesh, sphere : Sphere ) : Boolean
```

Returns whether or not the mesh instersects the given sphere.

### .intersectsBox

```js
intersectsBox( mesh : Mesh, box : Box3, boxToBvh : Matrix4 ) : Boolean
```

Returns whether or not the mesh intersects the given box.

The `boxToBvh` parameter is the transform of the box in the meshs frame.

### .intersectsGeometry

```js
intersectsGeometry( mesh : Mesh, geometry : BufferGeometry, geometryToBvh : Matrix4 ) : Boolean
```

Returns whether or not the mesh intersects the given geometry.

The `geometryToBvh` parameter is the transform of the geometry in the mesh's frame.

Performance improves considerably if the provided geometry _also_ has a `boundsTree`.

### .closestPointToPoint

```js
closestPointToPoint(
	mesh : Mesh,
	point : Vector3,
	target : Vector3,
	minThreshold : Number = 0,
	maxThreshold : Number = Infinity
) : Number
```

Returns the closest distance from the point to the mesh and puts the closest point on the mesh in `target`.

If a point is found that is closer than `minThreshold` then the function will return that result early. Any triangles or points outside of `maxThreshold` are ignored.

### .closestPointToGeometry

```js
closestPointToGeometry(
	mesh : Mesh,
	geometry : BufferGeometry,
	geometryToBvh : Matrix4,
	target1 : Vector3 = null,
	target2 : Vector3 = null,
	minThreshold : Number = 0,
	maxThreshold : Number = Infinity
) : Number
```

Returns the closest distance from the geometry to the mesh and puts the closest point on the mesh in `target1` and the closest point on the other geometry in `target2` in the frame of the BVH.

The `geometryToBvh` parameter is the transform of the geometry in the mesh's frame.

If a point is found that is closer than `minThreshold` then the function will return that result early. Any triangles or points outside of `maxThreshold` are ignored.

_Note that this function can be very slow if `geometry` does not have a `geometry.boundsTree` computed._

### .shapecast

```js
shapecast(
	mesh : Mesh,

	callbacks : {

		traverseBoundsOrder : (
			box: Box3
		) => Number = null,

		intersectsBounds : (
			box : Box3,
			isLeaf : Boolean,
			score : Number | undefined,
			depth : Number,
			nodeIndex : Number
		) => NOT_INTERSECTED | INTERSECTED | CONTAINED,

		intersectsRange : (
			triangleOffset : Number,
			triangleCount : Number
			contained : Boolean,
			depth : Number,
			nodeIndex : Number
		) => Boolean = null,

		intersectsTriangle : (
			triangle : Triangle,
			triangleIndex : Number,
			contained : Boolean,
			depth : Number
		) => Boolean = null,

	}

) : Boolean
```

A generalized cast function that can be used to implement intersection logic for custom shapes. This is used internally for [intersectsBox](#intersectsBox) and [intersectsSphere](#intersectsSphere). The function returns as soon as a triangle has been reported as intersected and returns `true` if a triangle has been intersected. The bounds are traversed in depth first order calling `traverseBoundsOrder`, `intersectsBoundsFunc`, `intersectsRange`, and intersectsTriangle for each node and using the results to determine traversal depth. The `depth` value passed to callbacks indicates the depth of the bounds the provided box or bounds belongs to unless the triangles are indicated to be `CONTAINED`, in which case depth is the depth of the parent bounds that were contained. It can be used to precompute, cache, and then read information about a parent bound to improve performance while traversing.

`mesh` is the is the object this BVH is representing.

`callbacks` is a list of callback functions (defined below) used for traversing the tree. All functions except for `intersectsBounds` are optional.

`traverseBoundsOrder` takes the axis aligned bounding box representing an internal node local to the bvh and returns a score (often distance) used to determine whether the left or right node should be traversed first. The shape with the lowest score is traversed first.

`intersectsBounds` takes the axis aligned bounding box representing an internal node local to the bvh, whether or not the node is a leaf, and the score calculated by `orderNodesFunc`, the node depth, and the node index (for use with the [refit](#refit) function) and returns a constant indicating whether or not the bounds is intersected or contained meaning traversal should continue. If `CONTAINED` is returned then and optimization is triggered allowing the range and / or triangle intersection callbacks to be run immediately rather than traversing the rest of the child bounds.

`intersectsRange` takes a triangle offset and count representing the number of triangles to be iterated over. 1 triangle from this range represents 3 values in the geometry's index buffer. If this function returns true then traversal is stopped and `intersectsTriangle` is not called if provided.

`intersectsTriangle` takes a triangle and the index buffer indices used by the triangle from the geometry and returns whether or not the triangle has been intersected with. If the triangle is reported to be intersected the traversal ends and the `shapecast` function completes. If multiple triangles need to be collected or intersected return false here and push results onto an array. `contained` is set to `true` if one of the parent bounds was marked as entirely contained in the `intersectsBoundsFunc` function.


### .refit

```js
refit(
	traversedNodeIndices : Array<Number> | Set<Number> = null,
	endNodeIndices : Array<Number> | Set<Number> = null
) : void
```

Refit the node bounds to the current triangle positions. This is quicker than regenerating a new BVH but will not be optimal after significant changes to the vertices. `traversedNodeIndices` is a set of node indices (provided by the [shapecast](#shapecast) function) that need to be refit including all internal nodes. `endNodeIndices` is the set of nodes that traversal ended at and that triangles need to be updated for. If neither index set is provided then the whole BVH is updated which is significantly slower than surgically updating the nodes that need to be updated.

Here's how to get the set of indices that need to be refit:

```js
const traversedNodeIndices = new Set();
const endNodeIndices = new Set();
bvh.shapecast(

	mesh,
	{

		intersectsBounds: ( box, isLeaf, score, depth, nodeIndex ) => {

			if ( /* intersects shape */ ) {

				traversedNodeIndices.add( nodeIndex );
				return INTERSECTED;

			}

			return NOT_INTERSECTED;

		},

		intersectsRange: ( offset, count, contained, depth, nodeIndex ) => {

			// collect triangles to update
			endNodeIndices.add( nodeIndex );

		}

	}

);

// update the positions of the triangle vertices

bvh.refit( traversedNodeIndices, endNodeIndices );
```

### .getBoundingBox

```js
getBoundingBox( target : Box3 ) : Box3
```

Get the bounding box of the geometry computed from the root node bounds of the BVH. Significantly faster than `BufferGeometry.computeBoundingBox`.

## SerializedBVH

### .roots

```js
roots : Array< ArrayBuffer >
```

### .index

```js
index : TypedArray
```

## MeshBVHVisualizer

Displays a view of the bounds tree up to the given depth of the tree. Update() must be called after any fields that affect visualization geometry are changed.

_Note: The visualizer is expected to be a sibling of the mesh being visualized._

### .depth

```js
depth : Number
```

The depth to traverse and visualize the tree to.

### .color

```js
color = 0x00FF88 : THREE.Color
```

The color to render the bounding volume with.

### .opacity

```js
opacity = 0.3 : Number
```

The opacity to render the bounding volume with.

### .displayParents

```js
displayParents = false : Boolean
```

Whether or not to display the parent bounds.

### .displayEdges

```js
displayEdges = true : Boolean
```

If true displays the bounds as edges other displays the bounds as solid meshes.

### .edgeMaterial

```js
edgeMaterial : LineBasicMaterial
```

The material to use when rendering edges.

### .meshMaterial

```js
meshMaterial : MeshBasicMaterial
```

The material to use when rendering as a sold meshes.

### .constructor

```js
constructor( mesh: THREE.Mesh, depth = 10 : Number )
```

Instantiates the helper with a depth and mesh to visualize.

### .update

```js
update() : void
```

Updates the display of the bounds tree in the case that the bounds tree has changed or the depth parameter has changed.

### .dispose

```js
dispose() : void
```

Disposes of the material used.

## Extensions

### Raycaster.firstHitOnly

```js
firstHitOnly = false : Boolean
```

The the `Raycaster` member `firstHitOnly` is set to true then the [.acceleratedRaycast](#acceleratedRaycast) function will call the [.raycastFirst](#raycastFirst) function to retrieve hits which is generally faster.

### .computeBoundsTree

```js
computeBoundsTree( options : Object ) : void
```

A pre-made BufferGeometry extension function that builds a new BVH, assigns it to `boundsTree`, and applies the new index buffer to the geometry. Comparable to `computeBoundingBox` and `computeBoundingSphere`.

```js
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
```

### .disposeBoundsTree

```js
disposeBoundsTree() : void
```

A BufferGeometry extension function that disposes of the BVH.

```js
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
```

### .acceleratedRaycast

```js
acceleratedRaycast( ... )
```

An accelerated raycast function with the same signature as `THREE.Mesh.raycast`. Uses the BVH for raycasting if it's available otherwise it falls back to the built-in approach.

If the raycaster object being used has a property `firstHitOnly` set to `true`, then the raycasting will terminate as soon as it finds the closest intersection to the ray's origin and return only that intersection. This is typically several times faster than searching for all intersections.

```js
THREE.Mesh.prototype.raycast = acceleratedRaycast;
```

## GenerateMeshBVHWorker

Helper class for generating a MeshBVH for a given geometry in asynchronously in a worker. The geometry position and index buffer attribute `ArrayBuffers` are transferred to the Worker while the BVH is being generated meaning the geometry will be unavailable to use while the BVH is being processed unless `SharedArrayBuffers` are used. They will be automatically replaced when the MeshBVH is finished generating.

_NOTE It's best to reuse a single instance of this class to avoid the overhead of instantiating a new Worker._

### .running

```js
running : Boolean;
```

Flag indicating whether or not a BVH is already being generated in the worker.

### .generate

```js
generate( geometry : BufferGeometry, options : Object ) : Promise< MeshBVH >;
```

Generates a MeshBVH instance for the given geometry with the given options in a WebWorker. Returns a promise that resolves with the generated MeshBVH. This function will throw an error if it is already running.

### .terminate

```js
terminate() : Boolean;
```

Terminates the worker.

## Debug Functions

### estimateMemoryInBytes

```js
estimateMemoryInBytes( bvh : MeshBVH ) : Number
```

Roughly estimates the amount of memory in bytes a BVH is using.

### getBVHExtremes

```js
getBVHExtremes( bvh : MeshBVH ) : Array< Object >
```

Measures the min and max extremes of the tree including node depth, leaf triangle count, and number of splits on different axes to show how well a tree is structured. Returns an array of extremes for each group root for the bvh. The objects are structured like so:

```js
{
	// The total number of nodes in the tree including leaf nodes.
	nodeCount: Number,

	// The total number of leaf nodes in the tree.
	leafNodeCount: Number,

	// A total tree score based on the surface area heuristic score
	// useful for comparing the quality and performance capability
	// of the bounds tree. Lower score is better and based on the surface
	// area of bounds and how many triangles are stored within.
	surfaceAreaScore: Number,

	// The min and max of leaf nodes in the tree.
	depth: { min: Number, max: Number },

	// The min and max number of triangles contained within the
	// bounds the leaf nodes.
	tris: { min: Number, max: Number },

	// The number of splits on any given axis.
	splits: [ Number, Number, Number ]
}
```

## Extra Functions

List of functions stored in the `src/workers/` and are not exported via index.js because they require extra effort to integrate with some build processes. UMD variants of these functions are not provided.

### generateAsync

```js
generateAsync( geometry : BufferGeometry, options : Object ) : Promise<MeshBVH>
```

Generates a BVH for the given geometry in a WebWorker so it can be created asynchronously. A Promise is returned that resolves with the generated BVH. During the generation the `geometry.attributes.position` array and `geometry.index` array (if it exists) are transferred to the worker so the geometry will not be usable until the BVH generation is complete and the arrays are transferred back.

## Gotchas

- This is intended to be used with complicated, high-poly meshes. With less complex meshes, the benefits are negligible.
- A bounds tree can be generated for either an indexed or non-indexed `BufferGeometry`, but an index will
  be produced and retained as a side effect of the construction.
- The bounds hierarchy is _not_ dynamic, so geometry that uses morph targets or skinning cannot be used.
- If the geometry is changed then a new bounds tree will need to be generated.
- [InterleavedBufferAttributes](https://threejs.org/docs/#api/en/core/InterleavedBufferAttribute) are not supported with the geometry index buffer attribute.
- A separate bounds tree is generated for each [geometry group](https://threejs.org/docs/#api/en/objects/Group), which could result in poorer raycast performance on geometry with lots of groups.
- Due to errors related to floating point precision it is recommended that geometry be centered using `BufferGeometry.center()` before creating the BVH if the geometry is sufficiently large or off center so bounds tightly contain the geometry as much as possible.
