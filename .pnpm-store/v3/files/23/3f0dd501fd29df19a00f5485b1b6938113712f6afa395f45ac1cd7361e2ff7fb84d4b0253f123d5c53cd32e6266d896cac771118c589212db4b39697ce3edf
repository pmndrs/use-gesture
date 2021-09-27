(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.MeshBVHLib = global.MeshBVHLib || {}, global.THREE));
}(this, function (exports, three) { 'use strict';

	// Split strategy constants
	const CENTER = 0;
	const AVERAGE = 1;
	const SAH = 2;

	// Traversal constants
	const NOT_INTERSECTED = 0;
	const INTERSECTED = 1;
	const CONTAINED = 2;

	// SAH cost constants
	// TODO: hone these costs more. The relative difference between them should be the
	// difference in measured time to perform a triangle intersection vs traversing
	// bounds.
	const TRIANGLE_INTERSECT_COST = 1.25;
	const TRAVERSAL_COST = 1;

	class MeshBVHNode {

		constructor() {

			// internal nodes have boundingData, left, right, and splitAxis
			// leaf nodes have offset and count (referring to primitives in the mesh geometry)

		}

	}

	// Returns a Float32Array representing the bounds data for box.
	function boxToArray( bx ) {

		const arr = new Float32Array( 6 );

		arr[ 0 ] = bx.min.x;
		arr[ 1 ] = bx.min.y;
		arr[ 2 ] = bx.min.z;

		arr[ 3 ] = bx.max.x;
		arr[ 4 ] = bx.max.y;
		arr[ 5 ] = bx.max.z;

		return arr;

	}

	function arrayToBox( arr, target ) {

		target.min.x = arr[ 0 ];
		target.min.y = arr[ 1 ];
		target.min.z = arr[ 2 ];

		target.max.x = arr[ 3 ];
		target.max.y = arr[ 4 ];
		target.max.z = arr[ 5 ];

		return target;

	}

	function getLongestEdgeIndex( bounds ) {

		let splitDimIdx = - 1;
		let splitDist = - Infinity;

		for ( let i = 0; i < 3; i ++ ) {

			const dist = bounds[ i + 3 ] - bounds[ i ];
			if ( dist > splitDist ) {

				splitDist = dist;
				splitDimIdx = i;

			}

		}

		return splitDimIdx;

	}

	// copys bounds a into bounds b
	function copyBounds( source, target ) {

		target.set( source );

	}

	// sets bounds target to the union of bounds a and b
	function unionBounds( a, b, target ) {

		let aVal, bVal;
		for ( let d = 0; d < 3; d ++ ) {

			const d3 = d + 3;

			// set the minimum values
			aVal = a[ d ];
			bVal = b[ d ];
			target[ d ] = aVal < bVal ? aVal : bVal;

			// set the max values
			aVal = a[ d3 ];
			bVal = b[ d3 ];
			target[ d3 ] = aVal > bVal ? aVal : bVal;

		}

	}

	// compute bounds surface area
	function computeSurfaceArea( bounds ) {

		const d0 = bounds[ 3 ] - bounds[ 0 ];
		const d1 = bounds[ 4 ] - bounds[ 1 ];
		const d2 = bounds[ 5 ] - bounds[ 2 ];

		return 2 * ( d0 * d1 + d1 * d2 + d2 * d0 );

	}

	// https://en.wikipedia.org/wiki/Machine_epsilon#Values_for_standard_hardware_floating_point_arithmetics
	const FLOAT32_EPSILON = Math.pow( 2, - 24 );

	function ensureIndex( geo ) {

		if ( ! geo.index ) {

			const vertexCount = geo.attributes.position.count;
			const index = new ( vertexCount > 65535 ? Uint32Array : Uint16Array )( vertexCount );
			geo.setIndex( new three.BufferAttribute( index, 1 ) );

			for ( let i = 0; i < vertexCount; i ++ ) {

				index[ i ] = i;

			}

		}

	}

	// Computes the set of { offset, count } ranges which need independent BVH roots. Each
	// region in the geometry index that belongs to a different set of material groups requires
	// a separate BVH root, so that triangles indices belonging to one group never get swapped
	// with triangle indices belongs to another group. For example, if the groups were like this:
	//
	// [-------------------------------------------------------------]
	// |__________________|
	//   g0 = [0, 20]  |______________________||_____________________|
	//                      g1 = [16, 40]           g2 = [41, 60]
	//
	// we would need four BVH roots: [0, 15], [16, 20], [21, 40], [41, 60].
	function getRootIndexRanges( geo ) {

		if ( ! geo.groups || ! geo.groups.length ) {

			return [ { offset: 0, count: geo.index.count / 3 } ];

		}

		const ranges = [];
		const rangeBoundaries = new Set();
		for ( const group of geo.groups ) {

			rangeBoundaries.add( group.start );
			rangeBoundaries.add( group.start + group.count );

		}

		// note that if you don't pass in a comparator, it sorts them lexicographically as strings :-(
		const sortedBoundaries = Array.from( rangeBoundaries.values() ).sort( ( a, b ) => a - b );
		for ( let i = 0; i < sortedBoundaries.length - 1; i ++ ) {

			const start = sortedBoundaries[ i ], end = sortedBoundaries[ i + 1 ];
			ranges.push( { offset: ( start / 3 ), count: ( end - start ) / 3 } );

		}

		return ranges;

	}

	// computes the union of the bounds of all of the given triangles and puts the resulting box in target. If
	// centroidTarget is provided then a bounding box is computed for the centroids of the triangles, as well.
	// These are computed together to avoid redundant accesses to bounds array.
	function getBounds( triangleBounds, offset, count, target, centroidTarget = null ) {

		let minx = Infinity;
		let miny = Infinity;
		let minz = Infinity;
		let maxx = - Infinity;
		let maxy = - Infinity;
		let maxz = - Infinity;

		let cminx = Infinity;
		let cminy = Infinity;
		let cminz = Infinity;
		let cmaxx = - Infinity;
		let cmaxy = - Infinity;
		let cmaxz = - Infinity;

		const includeCentroid = centroidTarget !== null;
		for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

			const cx = triangleBounds[ i + 0 ];
			const hx = triangleBounds[ i + 1 ];
			const lx = cx - hx;
			const rx = cx + hx;
			if ( lx < minx ) minx = lx;
			if ( rx > maxx ) maxx = rx;
			if ( includeCentroid && cx < cminx ) cminx = cx;
			if ( includeCentroid && cx > cmaxx ) cmaxx = cx;

			const cy = triangleBounds[ i + 2 ];
			const hy = triangleBounds[ i + 3 ];
			const ly = cy - hy;
			const ry = cy + hy;
			if ( ly < miny ) miny = ly;
			if ( ry > maxy ) maxy = ry;
			if ( includeCentroid && cy < cminy ) cminy = cy;
			if ( includeCentroid && cy > cmaxy ) cmaxy = cy;

			const cz = triangleBounds[ i + 4 ];
			const hz = triangleBounds[ i + 5 ];
			const lz = cz - hz;
			const rz = cz + hz;
			if ( lz < minz ) minz = lz;
			if ( rz > maxz ) maxz = rz;
			if ( includeCentroid && cz < cminz ) cminz = cz;
			if ( includeCentroid && cz > cmaxz ) cmaxz = cz;

		}

		target[ 0 ] = minx;
		target[ 1 ] = miny;
		target[ 2 ] = minz;

		target[ 3 ] = maxx;
		target[ 4 ] = maxy;
		target[ 5 ] = maxz;

		if ( includeCentroid ) {

			centroidTarget[ 0 ] = cminx;
			centroidTarget[ 1 ] = cminy;
			centroidTarget[ 2 ] = cminz;

			centroidTarget[ 3 ] = cmaxx;
			centroidTarget[ 4 ] = cmaxy;
			centroidTarget[ 5 ] = cmaxz;

		}

	}

	// A stand alone function for retrieving the centroid bounds.
	function getCentroidBounds( triangleBounds, offset, count, centroidTarget ) {

		let cminx = Infinity;
		let cminy = Infinity;
		let cminz = Infinity;
		let cmaxx = - Infinity;
		let cmaxy = - Infinity;
		let cmaxz = - Infinity;

		for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

			const cx = triangleBounds[ i + 0 ];
			if ( cx < cminx ) cminx = cx;
			if ( cx > cmaxx ) cmaxx = cx;

			const cy = triangleBounds[ i + 2 ];
			if ( cy < cminy ) cminy = cy;
			if ( cy > cmaxy ) cmaxy = cy;

			const cz = triangleBounds[ i + 4 ];
			if ( cz < cminz ) cminz = cz;
			if ( cz > cmaxz ) cmaxz = cz;

		}

		centroidTarget[ 0 ] = cminx;
		centroidTarget[ 1 ] = cminy;
		centroidTarget[ 2 ] = cminz;

		centroidTarget[ 3 ] = cmaxx;
		centroidTarget[ 4 ] = cmaxy;
		centroidTarget[ 5 ] = cmaxz;

	}


	// reorders `tris` such that for `count` elements after `offset`, elements on the left side of the split
	// will be on the left and elements on the right side of the split will be on the right. returns the index
	// of the first element on the right side, or offset + count if there are no elements on the right side.
	function partition( index, triangleBounds, offset, count, split ) {

		let left = offset;
		let right = offset + count - 1;
		const pos = split.pos;
		const axisOffset = split.axis * 2;

		// hoare partitioning, see e.g. https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
		while ( true ) {

			while ( left <= right && triangleBounds[ left * 6 + axisOffset ] < pos ) {

				left ++;

			}


			// if a triangle center lies on the partition plane it is considered to be on the right side
			while ( left <= right && triangleBounds[ right * 6 + axisOffset ] >= pos ) {

				right --;

			}

			if ( left < right ) {

				// we need to swap all of the information associated with the triangles at index
				// left and right; that's the verts in the geometry index, the bounds,
				// and perhaps the SAH planes

				for ( let i = 0; i < 3; i ++ ) {

					let t0 = index[ left * 3 + i ];
					index[ left * 3 + i ] = index[ right * 3 + i ];
					index[ right * 3 + i ] = t0;

					let t1 = triangleBounds[ left * 6 + i * 2 + 0 ];
					triangleBounds[ left * 6 + i * 2 + 0 ] = triangleBounds[ right * 6 + i * 2 + 0 ];
					triangleBounds[ right * 6 + i * 2 + 0 ] = t1;

					let t2 = triangleBounds[ left * 6 + i * 2 + 1 ];
					triangleBounds[ left * 6 + i * 2 + 1 ] = triangleBounds[ right * 6 + i * 2 + 1 ];
					triangleBounds[ right * 6 + i * 2 + 1 ] = t2;

				}

				left ++;
				right --;

			} else {

				return left;

			}

		}

	}

	const BIN_COUNT = 32;
	const sahBins = new Array( BIN_COUNT ).fill().map( () => {

		return {

			count: 0,
			bounds: new Float32Array( 6 ),
			rightCacheBounds: new Float32Array( 6 ),
			candidate: 0,

		};

	} );
	const leftBounds = new Float32Array( 6 );

	function getOptimalSplit( nodeBoundingData, centroidBoundingData, triangleBounds, offset, count, strategy ) {

		let axis = - 1;
		let pos = 0;

		// Center
		if ( strategy === CENTER ) {

			axis = getLongestEdgeIndex( centroidBoundingData );
			if ( axis !== - 1 ) {

				pos = ( centroidBoundingData[ axis ] + centroidBoundingData[ axis + 3 ] ) / 2;

			}

		} else if ( strategy === AVERAGE ) {

			axis = getLongestEdgeIndex( nodeBoundingData );
			if ( axis !== - 1 ) {

				pos = getAverage( triangleBounds, offset, count, axis );

			}

		} else if ( strategy === SAH ) {

			const rootSurfaceArea = computeSurfaceArea( nodeBoundingData );
			let bestCost = TRIANGLE_INTERSECT_COST * count;

			// iterate over all axes
			const cStart = offset * 6;
			const cEnd = ( offset + count ) * 6;
			for ( let a = 0; a < 3; a ++ ) {

				const axisLeft = centroidBoundingData[ a ];
				const axisRight = centroidBoundingData[ a + 3 ];
				const axisLength = axisRight - axisLeft;
				const binWidth = axisLength / BIN_COUNT;

				// reset the bins
				for ( let i = 0; i < BIN_COUNT; i ++ ) {

					const bin = sahBins[ i ];
					bin.count = 0;
					bin.candidate = axisLeft + binWidth + i * binWidth;

					const bounds = bin.bounds;
					for ( let d = 0; d < 3; d ++ ) {

						bounds[ d ] = Infinity;
						bounds[ d + 3 ] = - Infinity;

					}

				}

				// iterate over all center positions
				for ( let c = cStart; c < cEnd; c += 6 ) {

					const triCenter = triangleBounds[ c + 2 * a ];
					const relativeCenter = triCenter - axisLeft;

					// in the partition function if the centroid lies on the split plane then it is
					// considered to be on the right side of the split
					let binIndex = ~ ~ ( relativeCenter / binWidth );
					if ( binIndex >= BIN_COUNT ) binIndex = BIN_COUNT - 1;

					const bin = sahBins[ binIndex ];
					bin.count ++;

					const bounds = bin.bounds;
					for ( let d = 0; d < 3; d ++ ) {

						const tCenter = triangleBounds[ c + 2 * d ];
						const tHalf = triangleBounds[ c + 2 * d + 1 ];

						const tMin = tCenter - tHalf;
						const tMax = tCenter + tHalf;

						if ( tMin < bounds[ d ] ) {

							bounds[ d ] = tMin;

						}

						if ( tMax > bounds[ d + 3 ] ) {

							bounds[ d + 3 ] = tMax;

						}

					}

				}

				// cache the unioned bounds from right to left so we don't have to regenerate them each time
				const lastBin = sahBins[ BIN_COUNT - 1 ];
				copyBounds( lastBin.bounds, lastBin.rightCacheBounds );
				for ( let i = BIN_COUNT - 2; i >= 0; i -- ) {

					const bin = sahBins[ i ];
					const nextBin = sahBins[ i + 1 ];
					unionBounds( bin.bounds, nextBin.rightCacheBounds, bin.rightCacheBounds );

				}

				let leftCount = 0;
				for ( let i = 0; i < BIN_COUNT - 1; i ++ ) {

					const bin = sahBins[ i ];
					const binCount = bin.count;
					const bounds = bin.bounds;

					const nextBin = sahBins[ i + 1 ];
					const rightBounds = nextBin.rightCacheBounds;

					// dont do anything with the bounds if the new bounds have no triangles
					if ( binCount !== 0 ) {

						if ( leftCount === 0 ) {

							copyBounds( bounds, leftBounds );

						} else {

							unionBounds( bounds, leftBounds, leftBounds );

						}

					}

					leftCount += binCount;

					// check the cost of this split
					let leftProb = 0;
					let rightProb = 0;

					if ( leftCount !== 0 ) {

						leftProb = computeSurfaceArea( leftBounds ) / rootSurfaceArea;

					}

					const rightCount = count - leftCount;
					if ( rightCount !== 0 ) {

						rightProb = computeSurfaceArea( rightBounds ) / rootSurfaceArea;

					}

					const cost = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (
						leftProb * leftCount + rightProb * rightCount
					);

					if ( cost < bestCost ) {

						axis = a;
						bestCost = cost;
						pos = bin.candidate;

					}

				}

			}

		}

		return { axis, pos };

	}

	// returns the average coordinate on the specified axis of the all the provided triangles
	function getAverage( triangleBounds, offset, count, axis ) {

		let avg = 0;
		for ( let i = offset, end = offset + count; i < end; i ++ ) {

			avg += triangleBounds[ i * 6 + axis * 2 ];

		}

		return avg / count;

	}

	// precomputes the bounding box for each triangle; required for quickly calculating tree splits.
	// result is an array of size tris.length * 6 where triangle i maps to a
	// [x_center, x_delta, y_center, y_delta, z_center, z_delta] tuple starting at index i * 6,
	// representing the center and half-extent in each dimension of triangle i
	function computeTriangleBounds( geo ) {

		const posAttr = geo.attributes.position;
		const posArr = posAttr.array;
		const index = geo.index.array;
		const triCount = index.length / 3;
		const triangleBounds = new Float32Array( triCount * 6 );

		// support for an interleaved position buffer
		const bufferOffset = posAttr.offset || 0;
		let stride = 3;
		if ( posAttr.isInterleavedBufferAttribute ) {

			stride = posAttr.data.stride;

		}

		for ( let tri = 0; tri < triCount; tri ++ ) {

			const tri3 = tri * 3;
			const tri6 = tri * 6;
			const ai = index[ tri3 + 0 ] * stride + bufferOffset;
			const bi = index[ tri3 + 1 ] * stride + bufferOffset;
			const ci = index[ tri3 + 2 ] * stride + bufferOffset;

			for ( let el = 0; el < 3; el ++ ) {

				const a = posArr[ ai + el ];
				const b = posArr[ bi + el ];
				const c = posArr[ ci + el ];

				let min = a;
				if ( b < min ) min = b;
				if ( c < min ) min = c;

				let max = a;
				if ( b > max ) max = b;
				if ( c > max ) max = c;

				// Increase the bounds size by float32 epsilon to avoid precision errors when
				// converting to 32 bit float. Scale the epsilon by the size of the numbers being
				// worked with.
				const halfExtents = ( max - min ) / 2;
				const el2 = el * 2;
				triangleBounds[ tri6 + el2 + 0 ] = min + halfExtents;
				triangleBounds[ tri6 + el2 + 1 ] = halfExtents + ( Math.abs( min ) + halfExtents ) * FLOAT32_EPSILON;

			}

		}

		return triangleBounds;

	}

	function buildTree( geo, options ) {

		// either recursively splits the given node, creating left and right subtrees for it, or makes it a leaf node,
		// recording the offset and count of its triangles and writing them into the reordered geometry index.
		function splitNode( node, offset, count, centroidBoundingData = null, depth = 0 ) {

			if ( ! reachedMaxDepth && depth >= maxDepth ) {

				reachedMaxDepth = true;
				if ( verbose ) {

					console.warn( `MeshBVH: Max depth of ${ maxDepth } reached when generating BVH. Consider increasing maxDepth.` );
					console.warn( this, geo );

				}

			}

			// early out if we've met our capacity
			if ( count <= maxLeafTris || depth >= maxDepth ) {

				node.offset = offset;
				node.count = count;
				return node;

			}

			// Find where to split the volume
			const split = getOptimalSplit( node.boundingData, centroidBoundingData, triangleBounds, offset, count, strategy );
			if ( split.axis === - 1 ) {

				node.offset = offset;
				node.count = count;
				return node;

			}

			const splitOffset = partition( indexArray, triangleBounds, offset, count, split );

			// create the two new child nodes
			if ( splitOffset === offset || splitOffset === offset + count ) {

				node.offset = offset;
				node.count = count;

			} else {

				node.splitAxis = split.axis;

				// create the left child and compute its bounding box
				const left = new MeshBVHNode();
				const lstart = offset;
				const lcount = splitOffset - offset;
				node.left = left;
				left.boundingData = new Float32Array( 6 );

				getBounds( triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData );
				splitNode( left, lstart, lcount, cacheCentroidBoundingData, depth + 1 );

				// repeat for right
				const right = new MeshBVHNode();
				const rstart = splitOffset;
				const rcount = count - lcount;
				node.right = right;
				right.boundingData = new Float32Array( 6 );

				getBounds( triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData );
				splitNode( right, rstart, rcount, cacheCentroidBoundingData, depth + 1 );

			}

			return node;

		}

		ensureIndex( geo );

		const cacheCentroidBoundingData = new Float32Array( 6 );
		const triangleBounds = computeTriangleBounds( geo );
		const indexArray = geo.index.array;
		const maxDepth = options.maxDepth;
		const verbose = options.verbose;
		const maxLeafTris = options.maxLeafTris;
		const strategy = options.strategy;
		let reachedMaxDepth = false;

		const roots = [];
		const ranges = getRootIndexRanges( geo );

		if ( ranges.length === 1 ) {

			const root = new MeshBVHNode();
			const range = ranges[ 0 ];

			if ( geo.boundingBox != null ) {

				root.boundingData = boxToArray( geo.boundingBox );
				getCentroidBounds( triangleBounds, range.offset, range.count, cacheCentroidBoundingData );

			} else {

				root.boundingData = new Float32Array( 6 );
				getBounds( triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData );

			}

			splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
			roots.push( root );

		} else {

			for ( let range of ranges ) {

				const root = new MeshBVHNode();
				root.boundingData = new Float32Array( 6 );
				getBounds( triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData );

				splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
				roots.push( root );

			}

		}

		return roots;

	}

	const BYTES_PER_NODE = 6 * 4 + 4 + 4;

	const IS_LEAFNODE_FLAG = 0xFFFF;

	function buildPackedTree( geo, options ) {

		// boundingData  				: 6 float32
		// right / offset 				: 1 uint32
		// splitAxis / isLeaf + count 	: 1 uint32 / 2 uint16
		const roots = buildTree( geo, options );

		let float32Array;
		let uint32Array;
		let uint16Array;
		const packedRoots = [];
		for ( let i = 0; i < roots.length; i ++ ) {

			const root = roots[ i ];
			let nodeCount = countNodes( root );

			const buffer = new ArrayBuffer( BYTES_PER_NODE * nodeCount );
			float32Array = new Float32Array( buffer );
			uint32Array = new Uint32Array( buffer );
			uint16Array = new Uint16Array( buffer );
			populateBuffer( 0, root );
			packedRoots.push( buffer );

		}

		return packedRoots;

		function countNodes( node ) {

			if ( node.count ) {

				return 1;

			} else {

				return 1 + countNodes( node.left ) + countNodes( node.right );

			}

		}

		function populateBuffer( byteOffset, node ) {

			const stride4Offset = byteOffset / 4;
			const stride2Offset = byteOffset / 2;
			const isLeaf = ! ! node.count;
			const boundingData = node.boundingData;
			for ( let i = 0; i < 6; i ++ ) {

				float32Array[ stride4Offset + i ] = boundingData[ i ];

			}

			if ( isLeaf ) {

				const offset = node.offset;
				const count = node.count;
				uint32Array[ stride4Offset + 6 ] = offset;
				uint16Array[ stride2Offset + 14 ] = count;
				uint16Array[ stride2Offset + 15 ] = IS_LEAFNODE_FLAG;
				return byteOffset + BYTES_PER_NODE;

			} else {

				const left = node.left;
				const right = node.right;
				const splitAxis = node.splitAxis;

				let nextUnusedPointer;
				nextUnusedPointer = populateBuffer( byteOffset + BYTES_PER_NODE, left );

				if ( ( nextUnusedPointer / 4 ) > Math.pow( 2, 32 ) ) {

					throw new Error( 'MeshBVH: Cannot store child pointer greater than 32 bits.' );

				}

				uint32Array[ stride4Offset + 6 ] = nextUnusedPointer / 4;
				nextUnusedPointer = populateBuffer( nextUnusedPointer, right );

				uint32Array[ stride4Offset + 7 ] = splitAxis;
				return nextUnusedPointer;

			}

		}

	}

	class SeparatingAxisBounds {

		constructor() {

			this.min = Infinity;
			this.max = - Infinity;

		}

		setFromPointsField( points, field ) {

			let min = Infinity;
			let max = - Infinity;
			for ( let i = 0, l = points.length; i < l; i ++ ) {

				const p = points[ i ];
				const val = p[ field ];
				min = Math.min( val, min );
				max = Math.max( val, max );

			}

			this.min = min;
			this.max = max;


		}

		setFromPoints( axis, points ) {

			let min = Infinity;
			let max = - Infinity;
			for ( let i = 0, l = points.length; i < l; i ++ ) {

				const p = points[ i ];
				const val = axis.dot( p );
				min = Math.min( val, min );
				max = Math.max( val, max );

			}

			this.min = min;
			this.max = max;

		}

		isSeparated( other ) {

			return this.min > other.max || other.min > this.max;

		}

	}

	SeparatingAxisBounds.prototype.setFromBox = ( function () {

		const p = new three.Vector3();
		return function setFromBox( axis, box ) {

			const boxMin = box.min;
			const boxMax = box.max;
			let min = Infinity;
			let max = - Infinity;
			for ( let x = 0; x <= 1; x ++ ) {

				for ( let y = 0; y <= 1; y ++ ) {

					for ( let z = 0; z <= 1; z ++ ) {

						p.x = boxMin.x * x + boxMax.x * ( 1 - x );
						p.y = boxMin.y * y + boxMax.y * ( 1 - y );
						p.z = boxMin.z * z + boxMax.z * ( 1 - z );

						const val = axis.dot( p );
						min = Math.min( val, min );
						max = Math.max( val, max );

					}

				}

			}

			this.min = min;
			this.max = max;

		};

	} )();

	const areIntersecting = ( function () {

		const cacheSatBounds = new SeparatingAxisBounds();
		return function areIntersecting( shape1, shape2 ) {

			const points1 = shape1.points;
			const satAxes1 = shape1.satAxes;
			const satBounds1 = shape1.satBounds;

			const points2 = shape2.points;
			const satAxes2 = shape2.satAxes;
			const satBounds2 = shape2.satBounds;

			// check axes of the first shape
			for ( let i = 0; i < 3; i ++ ) {

				const sb = satBounds1[ i ];
				const sa = satAxes1[ i ];
				cacheSatBounds.setFromPoints( sa, points2 );
				if ( sb.isSeparated( cacheSatBounds ) ) return false;

			}

			// check axes of the second shape
			for ( let i = 0; i < 3; i ++ ) {

				const sb = satBounds2[ i ];
				const sa = satAxes2[ i ];
				cacheSatBounds.setFromPoints( sa, points1 );
				if ( sb.isSeparated( cacheSatBounds ) ) return false;

			}

		};

	} )();

	const closestPointLineToLine = ( function () {

		// https://github.com/juj/MathGeoLib/blob/master/src/Geometry/Line.cpp#L56
		const dir1 = new three.Vector3();
		const dir2 = new three.Vector3();
		const v02 = new three.Vector3();
		return function closestPointLineToLine( l1, l2, result ) {

			const v0 = l1.start;
			const v10 = dir1;
			const v2 = l2.start;
			const v32 = dir2;

			v02.subVectors( v0, v2 );
			dir1.subVectors( l1.end, l2.start );
			dir2.subVectors( l2.end, l2.start );

			// float d0232 = v02.Dot(v32);
			const d0232 = v02.dot( v32 );

			// float d3210 = v32.Dot(v10);
			const d3210 = v32.dot( v10 );

			// float d3232 = v32.Dot(v32);
			const d3232 = v32.dot( v32 );

			// float d0210 = v02.Dot(v10);
			const d0210 = v02.dot( v10 );

			// float d1010 = v10.Dot(v10);
			const d1010 = v10.dot( v10 );

			// float denom = d1010*d3232 - d3210*d3210;
			const denom = d1010 * d3232 - d3210 * d3210;

			let d, d2;
			if ( denom !== 0 ) {

				d = ( d0232 * d3210 - d0210 * d3232 ) / denom;

			} else {

				d = 0;

			}

			d2 = ( d0232 + d * d3210 ) / d3232;

			result.x = d;
			result.y = d2;

		};

	} )();

	const closestPointsSegmentToSegment = ( function () {

		// https://github.com/juj/MathGeoLib/blob/master/src/Geometry/LineSegment.cpp#L187
		const paramResult = new three.Vector2();
		const temp1 = new three.Vector3();
		const temp2 = new three.Vector3();
		return function closestPointsSegmentToSegment( l1, l2, target1, target2 ) {

			closestPointLineToLine( l1, l2, paramResult );

			let d = paramResult.x;
			let d2 = paramResult.y;
			if ( d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1 ) {

				l1.at( d, target1 );
				l2.at( d2, target2 );

				return;

			} else if ( d >= 0 && d <= 1 ) {

				// Only d2 is out of bounds.
				if ( d2 < 0 ) {

					l2.at( 0, target2 );

				} else {

					l2.at( 1, target2 );

				}

				l1.closestPointToPoint( target2, true, target1 );
				return;

			} else if ( d2 >= 0 && d2 <= 1 ) {

				// Only d is out of bounds.
				if ( d < 0 ) {

					l1.at( 0, target1 );

				} else {

					l1.at( 1, target1 );

				}

				l2.closestPointToPoint( target1, true, target2 );
				return;

			} else {

				// Both u and u2 are out of bounds.
				let p;
				if ( d < 0 ) {

					p = l1.start;

				} else {

					p = l1.end;

				}

				let p2;
				if ( d2 < 0 ) {

					p2 = l2.start;

				} else {

					p2 = l2.end;

				}

				const closestPoint = temp1;
				const closestPoint2 = temp2;
				l1.closestPointToPoint( p2, true, temp1 );
				l2.closestPointToPoint( p, true, temp2 );

				if ( closestPoint.distanceToSquared( p2 ) <= closestPoint2.distanceToSquared( p ) ) {

					target1.copy( closestPoint );
					target2.copy( p2 );
					return;

				} else {

					target1.copy( p );
					target2.copy( closestPoint2 );
					return;

				}

			}

		};

	} )();


	const sphereIntersectTriangle = ( function () {

		// https://stackoverflow.com/questions/34043955/detect-collision-between-sphere-and-triangle-in-three-js
		const closestPointTemp = new three.Vector3();
		const projectedPointTemp = new three.Vector3();
		const planeTemp = new three.Plane();
		const lineTemp = new three.Line3();
		return function sphereIntersectTriangle( sphere, triangle ) {

			const { radius, center } = sphere;
			const { a, b, c } = triangle;

			// phase 1
			lineTemp.start = a;
			lineTemp.end = b;
			const closestPoint1 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
			if ( closestPoint1.distanceTo( center ) <= radius ) return true;

			lineTemp.start = a;
			lineTemp.end = c;
			const closestPoint2 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
			if ( closestPoint2.distanceTo( center ) <= radius ) return true;

			lineTemp.start = b;
			lineTemp.end = c;
			const closestPoint3 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
			if ( closestPoint3.distanceTo( center ) <= radius ) return true;

			// phase 2
			const plane = triangle.getPlane( planeTemp );
			const dp = Math.abs( plane.distanceToPoint( center ) );
			if ( dp <= radius ) {

				const pp = plane.projectPoint( center, projectedPointTemp );
				const cp = triangle.containsPoint( pp );
				if ( cp ) return true;

			}

			return false;

		};

	} )();

	class SeparatingAxisTriangle extends three.Triangle {

		constructor( ...args ) {

			super( ...args );

			this.isSeparatingAxisTriangle = true;
			this.satAxes = new Array( 4 ).fill().map( () => new three.Vector3() );
			this.satBounds = new Array( 4 ).fill().map( () => new SeparatingAxisBounds() );
			this.points = [ this.a, this.b, this.c ];
			this.sphere = new three.Sphere();
			this.needsUpdate = false;

		}

		intersectsSphere( sphere ) {

			return sphereIntersectTriangle( sphere, this );

		}

		update() {

			const a = this.a;
			const b = this.b;
			const c = this.c;
			const points = this.points;

			const satAxes = this.satAxes;
			const satBounds = this.satBounds;

			const axis0 = satAxes[ 0 ];
			const sab0 = satBounds[ 0 ];
			this.getNormal( axis0 );
			sab0.setFromPoints( axis0, points );

			const axis1 = satAxes[ 1 ];
			const sab1 = satBounds[ 1 ];
			axis1.subVectors( a, b );
			sab1.setFromPoints( axis1, points );

			const axis2 = satAxes[ 2 ];
			const sab2 = satBounds[ 2 ];
			axis2.subVectors( b, c );
			sab2.setFromPoints( axis2, points );

			const axis3 = satAxes[ 3 ];
			const sab3 = satBounds[ 3 ];
			axis3.subVectors( c, a );
			sab3.setFromPoints( axis3, points );

			this.sphere.setFromPoints( this.points );
			this.needsUpdate = false;

		}

	}

	SeparatingAxisTriangle.prototype.closestPointToSegment = ( function () {

		const point1 = new three.Vector3();
		const point2 = new three.Vector3();
		const edge = new three.Line3();

		return function distanceToSegment( segment, target1 = null, target2 = null ) {

			const { start, end } = segment;
			const points = this.points;
			let distSq;
			let closestDistanceSq = Infinity;

			// check the triangle edges
			for ( let i = 0; i < 3; i ++ ) {

				const nexti = ( i + 1 ) % 3;
				edge.start.copy( points[ i ] );
				edge.end.copy( points[ nexti ] );

				closestPointsSegmentToSegment( edge, segment, point1, point2 );

				distSq = point1.distanceToSquared( point2 );
				if ( distSq < closestDistanceSq ) {

					closestDistanceSq = distSq;
					if ( target1 ) target1.copy( point1 );
					if ( target2 ) target2.copy( point2 );

				}

			}

			// check end points
			this.closestPointToPoint( start, point1 );
			distSq = start.distanceToSquared( point1 );
			if ( distSq < closestDistanceSq ) {

				closestDistanceSq = distSq;
				if ( target1 ) target1.copy( point1 );
				if ( target2 ) target2.copy( start );

			}

			this.closestPointToPoint( end, point1 );
			distSq = end.distanceToSquared( point1 );
			if ( distSq < closestDistanceSq ) {

				closestDistanceSq = distSq;
				if ( target1 ) target1.copy( point1 );
				if ( target2 ) target2.copy( end );

			}

			return Math.sqrt( closestDistanceSq );

		};

	} )();

	SeparatingAxisTriangle.prototype.intersectsTriangle = ( function () {

		const saTri2 = new SeparatingAxisTriangle();
		const arr1 = new Array( 3 );
		const arr2 = new Array( 3 );
		const cachedSatBounds = new SeparatingAxisBounds();
		const cachedSatBounds2 = new SeparatingAxisBounds();
		const cachedAxis = new three.Vector3();
		return function intersectsTriangle( other ) {

			if ( this.needsUpdate ) {

				this.update();

			}

			if ( ! other.isSeparatingAxisTriangle ) {

				saTri2.copy( other );
				saTri2.update();
				other = saTri2;

			} else if ( other.needsUpdate ) {

				other.update();

			}

			const satBounds1 = this.satBounds;
			const satAxes1 = this.satAxes;
			arr2[ 0 ] = other.a;
			arr2[ 1 ] = other.b;
			arr2[ 2 ] = other.c;
			for ( let i = 0; i < 4; i ++ ) {

				const sb = satBounds1[ i ];
				const sa = satAxes1[ i ];
				cachedSatBounds.setFromPoints( sa, arr2 );
				if ( sb.isSeparated( cachedSatBounds ) ) return false;

			}

			const satBounds2 = other.satBounds;
			const satAxes2 = other.satAxes;
			arr1[ 0 ] = this.a;
			arr1[ 1 ] = this.b;
			arr1[ 2 ] = this.c;
			for ( let i = 0; i < 4; i ++ ) {

				const sb = satBounds2[ i ];
				const sa = satAxes2[ i ];
				cachedSatBounds.setFromPoints( sa, arr1 );
				if ( sb.isSeparated( cachedSatBounds ) ) return false;

			}

			// check crossed axes
			for ( let i = 0; i < 4; i ++ ) {

				const sa1 = satAxes1[ i ];
				for ( let i2 = 0; i2 < 4; i2 ++ ) {

					const sa2 = satAxes2[ i2 ];
					cachedAxis.crossVectors( sa1, sa2 );
					cachedSatBounds.setFromPoints( cachedAxis, arr1 );
					cachedSatBounds2.setFromPoints( cachedAxis, arr2 );
					if ( cachedSatBounds.isSeparated( cachedSatBounds2 ) ) return false;

				}

			}

			return true;

		};

	} )();


	SeparatingAxisTriangle.prototype.distanceToPoint = ( function () {

		const target = new three.Vector3();
		return function distanceToPoint( point ) {

			this.closestPointToPoint( point, target );
			return point.distanceTo( target );

		};

	} )();


	SeparatingAxisTriangle.prototype.distanceToTriangle = ( function () {

		const point = new three.Vector3();
		const point2 = new three.Vector3();
		const cornerFields = [ 'a', 'b', 'c' ];
		const line1 = new three.Line3();
		const line2 = new three.Line3();

		return function distanceToTriangle( other, target1 = null, target2 = null ) {

			if ( this.intersectsTriangle( other ) ) {

				// TODO: This will not result in a point that lies on
				// the intersection line of the triangles
				if ( target1 || target2 ) {

					this.getMidpoint( point );
					other.closestPointToPoint( point, point2 );
					this.closestPointToPoint( point2, point );

					if ( target1 ) target1.copy( point );
					if ( target2 ) target2.copy( point2 );

				}

				return 0;

			}

			let closestDistanceSq = Infinity;

			// check all point distances
			for ( let i = 0; i < 3; i ++ ) {

				let dist;
				const field = cornerFields[ i ];
				const otherVec = other[ field ];
				this.closestPointToPoint( otherVec, point );

				dist = otherVec.distanceToSquared( point );

				if ( dist < closestDistanceSq ) {

					closestDistanceSq = dist;
					if ( target1 ) target1.copy( point );
					if ( target2 ) target2.copy( otherVec );

				}


				const thisVec = this[ field ];
				other.closestPointToPoint( thisVec, point );

				dist = thisVec.distanceToSquared( point );

				if ( dist < closestDistanceSq ) {

					closestDistanceSq = dist;
					if ( target1 ) target1.copy( thisVec );
					if ( target2 ) target2.copy( point );

				}

			}

			for ( let i = 0; i < 3; i ++ ) {

				const f11 = cornerFields[ i ];
				const f12 = cornerFields[ ( i + 1 ) % 3 ];
				line1.set( this[ f11 ], this[ f12 ] );
				for ( let i2 = 0; i2 < 3; i2 ++ ) {

					const f21 = cornerFields[ i2 ];
					const f22 = cornerFields[ ( i2 + 1 ) % 3 ];
					line2.set( other[ f21 ], other[ f22 ] );

					closestPointsSegmentToSegment( line1, line2, point, point2 );

					const dist = point.distanceToSquared( point2 );
					if ( dist < closestDistanceSq ) {

						closestDistanceSq = dist;
						if ( target1 ) target1.copy( point );
						if ( target2 ) target2.copy( point2 );

					}

				}

			}

			return Math.sqrt( closestDistanceSq );

		};

	} )();

	class OrientedBox extends three.Box3 {

		constructor( ...args ) {

			super( ...args );

			this.isOrientedBox = true;
			this.matrix = new three.Matrix4();
			this.invMatrix = new three.Matrix4();
			this.points = new Array( 8 ).fill().map( () => new three.Vector3() );
			this.satAxes = new Array( 3 ).fill().map( () => new three.Vector3() );
			this.satBounds = new Array( 3 ).fill().map( () => new SeparatingAxisBounds() );
			this.alignedSatBounds = new Array( 3 ).fill().map( () => new SeparatingAxisBounds() );
			this.sphere = new three.Sphere();
			this.needsUpdate = false;

		}

		set( min, max, matrix ) {

			super.set( min, max );
			this.matrix = matrix;
			this.needsUpdate = true;

		}

		copy( other ) {

			super.copy( other );
			this.matrix.copy( other.matrix );
			this.needsUpdate = true;

		}

	}

	OrientedBox.prototype.update = ( function () {

		return function update() {

			const matrix = this.matrix;
			const min = this.min;
			const max = this.max;

			const points = this.points;
			for ( let x = 0; x <= 1; x ++ ) {

				for ( let y = 0; y <= 1; y ++ ) {

					for ( let z = 0; z <= 1; z ++ ) {

						const i = ( ( 1 << 0 ) * x ) | ( ( 1 << 1 ) * y ) | ( ( 1 << 2 ) * z );
						const v = points[ i ];
						v.x = x ? max.x : min.x;
						v.y = y ? max.y : min.y;
						v.z = z ? max.z : min.z;

						v.applyMatrix4( matrix );

					}

				}

			}

			this.sphere.setFromPoints( this.points );

			const satBounds = this.satBounds;
			const satAxes = this.satAxes;
			const minVec = points[ 0 ];
			for ( let i = 0; i < 3; i ++ ) {

				const axis = satAxes[ i ];
				const sb = satBounds[ i ];
				const index = 1 << i;
				const pi = points[ index ];

				axis.subVectors( minVec, pi );
				sb.setFromPoints( axis, points );

			}

			const alignedSatBounds = this.alignedSatBounds;
			alignedSatBounds[ 0 ].setFromPointsField( points, 'x' );
			alignedSatBounds[ 1 ].setFromPointsField( points, 'y' );
			alignedSatBounds[ 2 ].setFromPointsField( points, 'z' );

			this.invMatrix.copy( this.matrix ).invert();
			this.needsUpdate = false;

		};

	} )();

	OrientedBox.prototype.intersectsBox = ( function () {

		const aabbBounds = new SeparatingAxisBounds();
		return function intersectsBox( box ) {

			if ( this.needsUpdate ) {

				this.update();

			}

			if ( ! box.intersectsSphere( this.sphere ) ) return false;

			const min = box.min;
			const max = box.max;
			const satBounds = this.satBounds;
			const satAxes = this.satAxes;
			const alignedSatBounds = this.alignedSatBounds;

			aabbBounds.min = min.x;
			aabbBounds.max = max.x;
			if ( alignedSatBounds[ 0 ].isSeparated( aabbBounds ) ) return false;

			aabbBounds.min = min.y;
			aabbBounds.max = max.y;
			if ( alignedSatBounds[ 1 ].isSeparated( aabbBounds ) ) return false;

			aabbBounds.min = min.z;
			aabbBounds.max = max.z;
			if ( alignedSatBounds[ 2 ].isSeparated( aabbBounds ) ) return false;

			for ( let i = 0; i < 3; i ++ ) {

				const axis = satAxes[ i ];
				const sb = satBounds[ i ];
				aabbBounds.setFromBox( axis, box );
				if ( sb.isSeparated( aabbBounds ) ) return false;

			}

			return true;

		};

	} )();

	OrientedBox.prototype.intersectsTriangle = ( function () {

		const saTri = new SeparatingAxisTriangle();
		const pointsArr = new Array( 3 );
		const cachedSatBounds = new SeparatingAxisBounds();
		const cachedSatBounds2 = new SeparatingAxisBounds();
		const cachedAxis = new three.Vector3();
		return function intersectsTriangle( triangle ) {

			if ( this.needsUpdate ) {

				this.update();

			}

			if ( ! triangle.isSeparatingAxisTriangle ) {

				saTri.copy( triangle );
				saTri.update();
				triangle = saTri;

			} else if ( triangle.needsUpdate ) {

				triangle.update();

			}

			const satBounds = this.satBounds;
			const satAxes = this.satAxes;

			pointsArr[ 0 ] = triangle.a;
			pointsArr[ 1 ] = triangle.b;
			pointsArr[ 2 ] = triangle.c;

			for ( let i = 0; i < 3; i ++ ) {

				const sb = satBounds[ i ];
				const sa = satAxes[ i ];
				cachedSatBounds.setFromPoints( sa, pointsArr );
				if ( sb.isSeparated( cachedSatBounds ) ) return false;

			}

			const triSatBounds = triangle.satBounds;
			const triSatAxes = triangle.satAxes;
			const points = this.points;
			for ( let i = 0; i < 3; i ++ ) {

				const sb = triSatBounds[ i ];
				const sa = triSatAxes[ i ];
				cachedSatBounds.setFromPoints( sa, points );
				if ( sb.isSeparated( cachedSatBounds ) ) return false;

			}

			// check crossed axes
			for ( let i = 0; i < 3; i ++ ) {

				const sa1 = satAxes[ i ];
				for ( let i2 = 0; i2 < 4; i2 ++ ) {

					const sa2 = triSatAxes[ i2 ];
					cachedAxis.crossVectors( sa1, sa2 );
					cachedSatBounds.setFromPoints( cachedAxis, pointsArr );
					cachedSatBounds2.setFromPoints( cachedAxis, points );
					if ( cachedSatBounds.isSeparated( cachedSatBounds2 ) ) return false;

				}

			}

			return true;

		};

	} )();

	OrientedBox.prototype.closestPointToPoint = ( function () {

		return function closestPointToPoint( point, target1 ) {

			if ( this.needsUpdate ) {

				this.update();

			}

			target1
				.copy( point )
				.applyMatrix4( this.invMatrix )
				.clamp( this.min, this.max )
				.applyMatrix4( this.matrix );

			return target1;

		};

	} )();

	OrientedBox.prototype.distanceToPoint = ( function () {

		const target = new three.Vector3();
		return function distanceToPoint( point ) {

			this.closestPointToPoint( point, target );
			return point.distanceTo( target );

		};

	} )();


	OrientedBox.prototype.distanceToBox = ( function () {

		const xyzFields = [ 'x', 'y', 'z' ];
		const segments1 = new Array( 12 ).fill().map( () => new three.Line3() );
		const segments2 = new Array( 12 ).fill().map( () => new three.Line3() );

		const point1 = new three.Vector3();
		const point2 = new three.Vector3();

		// early out if we find a value below threshold
		return function distanceToBox( box, threshold = 0, target1 = null, target2 = null ) {

			if ( this.needsUpdate ) {

				this.update();

			}

			if ( this.intersectsBox( box ) ) {

				if ( target1 || target2 ) {

					box.getCenter( point2 );
					this.closestPointToPoint( point2, point1 );
					box.closestPointToPoint( point1, point2 );

					if ( target1 ) target1.copy( point1 );
					if ( target2 ) target2.copy( point2 );

				}

				return 0;

			}

			const threshold2 = threshold * threshold;
			const min = box.min;
			const max = box.max;
			const points = this.points;


			// iterate over every edge and compare distances
			let closestDistanceSq = Infinity;

			// check over all these points
			for ( let i = 0; i < 8; i ++ ) {

				const p = points[ i ];
				point2.copy( p ).clamp( min, max );

				const dist = p.distanceToSquared( point2 );
				if ( dist < closestDistanceSq ) {

					closestDistanceSq = dist;
					if ( target1 ) target1.copy( p );
					if ( target2 ) target2.copy( point2 );

					if ( dist < threshold2 ) return Math.sqrt( dist );

				}

			}

			// generate and check all line segment distances
			let count = 0;
			for ( let i = 0; i < 3; i ++ ) {

				for ( let i1 = 0; i1 <= 1; i1 ++ ) {

					for ( let i2 = 0; i2 <= 1; i2 ++ ) {

						const nextIndex = ( i + 1 ) % 3;
						const nextIndex2 = ( i + 2 ) % 3;

						// get obb line segments
						const index = i1 << nextIndex | i2 << nextIndex2;
						const index2 = 1 << i | i1 << nextIndex | i2 << nextIndex2;
						const p1 = points[ index ];
						const p2 = points[ index2 ];
						const line1 = segments1[ count ];
						line1.set( p1, p2 );


						// get aabb line segments
						const f1 = xyzFields[ i ];
						const f2 = xyzFields[ nextIndex ];
						const f3 = xyzFields[ nextIndex2 ];
						const line2 = segments2[ count ];
						const start = line2.start;
						const end = line2.end;

						start[ f1 ] = min[ f1 ];
						start[ f2 ] = i1 ? min[ f2 ] : max[ f2 ];
						start[ f3 ] = i2 ? min[ f3 ] : max[ f2 ];

						end[ f1 ] = max[ f1 ];
						end[ f2 ] = i1 ? min[ f2 ] : max[ f2 ];
						end[ f3 ] = i2 ? min[ f3 ] : max[ f2 ];

						count ++;

					}

				}

			}

			// check all the other boxes point
			for ( let x = 0; x <= 1; x ++ ) {

				for ( let y = 0; y <= 1; y ++ ) {

					for ( let z = 0; z <= 1; z ++ ) {

						point2.x = x ? max.x : min.x;
						point2.y = y ? max.y : min.y;
						point2.z = z ? max.z : min.z;

						this.closestPointToPoint( point2, point1 );
						const dist = point2.distanceToSquared( point1 );
						if ( dist < closestDistanceSq ) {

							closestDistanceSq = dist;
							if ( target1 ) target1.copy( point1 );
							if ( target2 ) target2.copy( point2 );

							if ( dist < threshold2 ) return Math.sqrt( dist );

						}

					}

				}

			}

			for ( let i = 0; i < 12; i ++ ) {

				const l1 = segments1[ i ];
				for ( let i2 = 0; i2 < 12; i2 ++ ) {

					const l2 = segments2[ i2 ];
					closestPointsSegmentToSegment( l1, l2, point1, point2 );
					const dist = point1.distanceToSquared( point2 );
					if ( dist < closestDistanceSq ) {

						closestDistanceSq = dist;
						if ( target1 ) target1.copy( point1 );
						if ( target2 ) target2.copy( point2 );

						if ( dist < threshold2 ) return Math.sqrt( dist );

					}

				}

			}

			return Math.sqrt( closestDistanceSq );

		};

	} )();

	// sets the vertices of triangle `tri` with the 3 vertices after i
	function setTriangle( tri, i, index, pos ) {

		const ta = tri.a;
		const tb = tri.b;
		const tc = tri.c;

		let i0 = i;
		let i1 = i + 1;
		let i2 = i + 2;
		if ( index ) {

			i0 = index.getX( i );
			i1 = index.getX( i + 1 );
			i2 = index.getX( i + 2 );

		}

		ta.x = pos.getX( i0 );
		ta.y = pos.getY( i0 );
		ta.z = pos.getZ( i0 );

		tb.x = pos.getX( i1 );
		tb.y = pos.getY( i1 );
		tb.z = pos.getZ( i1 );

		tc.x = pos.getX( i2 );
		tc.y = pos.getY( i2 );
		tc.z = pos.getZ( i2 );

	}

	// Ripped and modified From THREE.js Mesh raycast
	// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L115
	var vA = new three.Vector3();
	var vB = new three.Vector3();
	var vC = new three.Vector3();

	var uvA = new three.Vector2();
	var uvB = new three.Vector2();
	var uvC = new three.Vector2();

	var intersectionPoint = new three.Vector3();
	var intersectionPointWorld = new three.Vector3();

	function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

		var intersect;
		if ( material.side === three.BackSide ) {

			intersect = ray.intersectTriangle( pC, pB, pA, true, point );

		} else {

			intersect = ray.intersectTriangle( pA, pB, pC, material.side !== three.DoubleSide, point );

		}

		if ( intersect === null ) return null;

		intersectionPointWorld.copy( point );
		intersectionPointWorld.applyMatrix4( object.matrixWorld );

		var distance = raycaster.ray.origin.distanceTo( intersectionPointWorld );

		if ( distance < raycaster.near || distance > raycaster.far ) return null;

		return {

			// EDITED
			// Including the local-space point so it can be used to accelerate raycasting
			localPoint: point,
			distance: distance,
			point: intersectionPointWorld.clone(),
			object: object
		};

	}

	function checkBufferGeometryIntersection( object, raycaster, ray, position, uv, a, b, c ) {

		vA.fromBufferAttribute( position, a );
		vB.fromBufferAttribute( position, b );
		vC.fromBufferAttribute( position, c );

		var intersection = checkIntersection( object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint );

		if ( intersection ) {

			if ( uv ) {

				uvA.fromBufferAttribute( uv, a );
				uvB.fromBufferAttribute( uv, b );
				uvC.fromBufferAttribute( uv, c );

				intersection.uv = three.Triangle.getUV( intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new three.Vector2( ) );

			}

			const face = {
				a: a,
				b: b,
				c: c,
				normal: new three.Vector3( ),
				materialIndex: 0
			};

			three.Triangle.getNormal( vA, vB, vC, face.normal );

			intersection.face = face;
			intersection.faceIndex = a;

		}

		return intersection;

	}

	// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L258
	function intersectTri( mesh, geo, raycaster, ray, tri, intersections ) {

		const triOffset = tri * 3;
		const a = geo.index.getX( triOffset );
		const b = geo.index.getX( triOffset + 1 );
		const c = geo.index.getX( triOffset + 2 );

		const intersection = checkBufferGeometryIntersection( mesh, raycaster, ray, geo.attributes.position, geo.attributes.uv, a, b, c );

		if ( intersection ) {

			intersection.faceIndex = tri;
			if ( intersections ) intersections.push( intersection );
			return intersection;

		}

		return null;

	}

	function intersectTris( mesh, geo, raycaster, ray, offset, count, intersections ) {

		for ( let i = offset, end = offset + count; i < end; i ++ ) {

			intersectTri( mesh, geo, raycaster, ray, i, intersections );

		}

	}

	function intersectClosestTri( mesh, geo, raycaster, ray, offset, count ) {

		let dist = Infinity;
		let res = null;
		for ( let i = offset, end = offset + count; i < end; i ++ ) {

			const intersection = intersectTri( mesh, geo, raycaster, ray, i );
			if ( intersection && intersection.distance < dist ) {

				res = intersection;
				dist = intersection.distance;

			}

		}

		return res;

	}

	function arrayToBox$1( nodeIndex32, array, target ) {

		target.min.x = array[ nodeIndex32 ];
		target.min.y = array[ nodeIndex32 + 1 ];
		target.min.z = array[ nodeIndex32 + 2 ];

		target.max.x = array[ nodeIndex32 + 3 ];
		target.max.y = array[ nodeIndex32 + 4 ];
		target.max.z = array[ nodeIndex32 + 5 ];

	}

	function iterateOverTriangles(
		offset,
		count,
		geometry,
		intersectsTriangleFunc,
		contained,
		depth,
		triangle
	) {

		const index = geometry.index;
		const pos = geometry.attributes.position;
		for ( let i = offset, l = count + offset; i < l; i ++ ) {

			setTriangle( triangle, i * 3, index, pos );
			triangle.needsUpdate = true;

			if ( intersectsTriangleFunc( triangle, i, contained, depth ) ) {

				return true;

			}

		}

		return false;

	}

	// For speed and readability this script is processed to replace the macro-like calls

	const boundingBox = new three.Box3();
	const boxIntersection = new three.Vector3();
	const xyzFields = [ 'x', 'y', 'z' ];

	function IS_LEAF( n16, uint16Array ) {

		return uint16Array[ n16 + 15 ] === 0xFFFF;

	}

	function OFFSET( n32, uint32Array ) {

		return uint32Array[ n32 + 6 ];

	}

	function COUNT( n32, uint16Array ) {

		return uint16Array[ n32 + 14 ];

	}

	function LEFT_NODE( n32 ) {

		return n32 + 8;

	}

	function RIGHT_NODE( n32, uint32Array ) {

		return uint32Array[ n32 + 6 ];

	}

	function SPLIT_AXIS( n32, uint32Array ) {

		return uint32Array[ n32 + 7 ];

	}

	function BOUNDING_DATA_INDEX( n32 ) {

		return n32;

	}

	function raycast( nodeIndex32, mesh, geometry, raycaster, ray, intersects ) {

		let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

		const isLeaf = IS_LEAF( nodeIndex16, uint16Array );
		if ( isLeaf ) {

			const offset = OFFSET( nodeIndex32, uint32Array );
			const count = COUNT( nodeIndex16, uint16Array );

			intersectTris( mesh, geometry, raycaster, ray, offset, count, intersects );

		} else {

			const leftIndex = LEFT_NODE( nodeIndex32 );
			if ( intersectRay( leftIndex, float32Array, ray, boxIntersection ) ) {

				raycast( leftIndex, mesh, geometry, raycaster, ray, intersects );

			}

			const rightIndex = RIGHT_NODE( nodeIndex32, uint32Array );
			if ( intersectRay( rightIndex, float32Array, ray, boxIntersection ) ) {

				raycast( rightIndex, mesh, geometry, raycaster, ray, intersects );

			}

		}

	}

	function raycastFirst( nodeIndex32, mesh, geometry, raycaster, ray ) {

		let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

		const isLeaf = IS_LEAF( nodeIndex16, uint16Array );
		if ( isLeaf ) {

			const offset = OFFSET( nodeIndex32, uint32Array );
			const count = COUNT( nodeIndex16, uint16Array );
			return intersectClosestTri( mesh, geometry, raycaster, ray, offset, count );

		} else {

			// consider the position of the split plane with respect to the oncoming ray; whichever direction
			// the ray is coming from, look for an intersection among that side of the tree first
			const splitAxis = SPLIT_AXIS( nodeIndex32, uint32Array );
			const xyzAxis = xyzFields[ splitAxis ];
			const rayDir = ray.direction[ xyzAxis ];
			const leftToRight = rayDir >= 0;

			// c1 is the child to check first
			let c1, c2;
			if ( leftToRight ) {

				c1 = LEFT_NODE( nodeIndex32 );
				c2 = RIGHT_NODE( nodeIndex32, uint32Array );

			} else {

				c1 = RIGHT_NODE( nodeIndex32, uint32Array );
				c2 = LEFT_NODE( nodeIndex32 );

			}

			const c1Intersection = intersectRay( c1, float32Array, ray, boxIntersection );
			const c1Result = c1Intersection ? raycastFirst( c1, mesh, geometry, raycaster, ray ) : null;

			// if we got an intersection in the first node and it's closer than the second node's bounding
			// box, we don't need to consider the second node because it couldn't possibly be a better result
			if ( c1Result ) {

				// check if the point is within the second bounds
				const point = c1Result.localPoint[ xyzAxis ];
				const isOutside = leftToRight ?
					point <= float32Array[ c2 + splitAxis ] : // min bounding data
					point >= float32Array[ c2 + splitAxis + 3 ]; // max bounding data

				if ( isOutside ) {

					return c1Result;

				}

			}

			// either there was no intersection in the first node, or there could still be a closer
			// intersection in the second, so check the second node and then take the better of the two
			const c2Intersection = intersectRay( c2, float32Array, ray, boxIntersection );
			const c2Result = c2Intersection ? raycastFirst( c2, mesh, geometry, raycaster, ray ) : null;

			if ( c1Result && c2Result ) {

				return c1Result.distance <= c2Result.distance ? c1Result : c2Result;

			} else {

				return c1Result || c2Result || null;

			}

		}

	}

	const shapecast = ( function () {

		const _box1 = new three.Box3();
		const _box2 = new three.Box3();

		return function shapecast(
			nodeIndex32,
			geometry,
			intersectsBoundsFunc,
			intersectsRangeFunc,
			nodeScoreFunc = null,
			nodeIndexByteOffset = 0, // offset for unique node identifier
			depth = 0
		) {

			// Define these inside the function so it has access to the local variables needed
			// when converting to the buffer equivalents
			function getLeftOffset( nodeIndex32 ) {

				let nodeIndex16 = nodeIndex32 * 2, uint16Array = _uint16Array, uint32Array = _uint32Array;

				// traverse until we find a leaf
				while ( ! IS_LEAF( nodeIndex16, uint16Array ) ) {

					nodeIndex32 = LEFT_NODE( nodeIndex32 );
					nodeIndex16 = nodeIndex32 * 2;

				}

				return OFFSET( nodeIndex32, uint32Array );

			}

			function getRightEndOffset( nodeIndex32 ) {

				let nodeIndex16 = nodeIndex32 * 2, uint16Array = _uint16Array, uint32Array = _uint32Array;

				// traverse until we find a leaf
				while ( ! IS_LEAF( nodeIndex16, uint16Array ) ) {

					// adjust offset to point to the right node
					nodeIndex32 = RIGHT_NODE( nodeIndex32, uint32Array );
					nodeIndex16 = nodeIndex32 * 2;

				}

				// return the end offset of the triangle range
				return OFFSET( nodeIndex32, uint32Array ) + COUNT( nodeIndex16, uint16Array );

			}

			let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

			const isLeaf = IS_LEAF( nodeIndex16, uint16Array );
			if ( isLeaf ) {

				const offset = OFFSET( nodeIndex32, uint32Array );
				const count = COUNT( nodeIndex16, uint16Array );
				return intersectsRangeFunc( offset, count, false, depth, nodeIndexByteOffset + nodeIndex32 );

			} else {

				const left = LEFT_NODE( nodeIndex32 );
				const right = RIGHT_NODE( nodeIndex32, uint32Array );
				let c1 = left;
				let c2 = right;

				let score1, score2;
				let box1, box2;
				if ( nodeScoreFunc ) {

					box1 = _box1;
					box2 = _box2;

					// bounding data is not offset
					arrayToBox$1( BOUNDING_DATA_INDEX( c1 ), float32Array, box1 );
					arrayToBox$1( BOUNDING_DATA_INDEX( c2 ), float32Array, box2 );

					score1 = nodeScoreFunc( box1 );
					score2 = nodeScoreFunc( box2 );

					if ( score2 < score1 ) {

						c1 = right;
						c2 = left;

						const temp = score1;
						score1 = score2;
						score2 = temp;

						box1 = box2;
						// box2 is always set before use below

					}

				}

				// Check box 1 intersection
				if ( ! box1 ) {

					box1 = _box1;
					arrayToBox$1( BOUNDING_DATA_INDEX( c1 ), float32Array, box1 );

				}

				const isC1Leaf = IS_LEAF( c1 * 2, uint16Array );
				const c1Intersection = intersectsBoundsFunc( box1, isC1Leaf, score1, depth + 1, nodeIndexByteOffset + c1 );

				let c1StopTraversal;
				if ( c1Intersection === CONTAINED ) {

					const offset = getLeftOffset( c1 );
					const end = getRightEndOffset( c1 );
					const count = end - offset;

					c1StopTraversal = intersectsRangeFunc( offset, count, true, depth + 1, nodeIndexByteOffset + c1 );

				} else {

					c1StopTraversal =
						c1Intersection &&
						shapecast(
							c1,
							geometry,
							intersectsBoundsFunc,
							intersectsRangeFunc,
							nodeScoreFunc,
							nodeIndexByteOffset,
							depth + 1
						);

				}

				if ( c1StopTraversal ) return true;

				// Check box 2 intersection
				// cached box2 will have been overwritten by previous traversal
				box2 = _box2;
				arrayToBox$1( BOUNDING_DATA_INDEX( c2 ), float32Array, box2 );

				const isC2Leaf = IS_LEAF( c2 * 2, uint16Array );
				const c2Intersection = intersectsBoundsFunc( box2, isC2Leaf, score2, depth + 1, nodeIndexByteOffset + c2 );

				let c2StopTraversal;
				if ( c2Intersection === CONTAINED ) {

					const offset = getLeftOffset( c2 );
					const end = getRightEndOffset( c2 );
					const count = end - offset;

					c2StopTraversal = intersectsRangeFunc( offset, count, true, depth + 1, nodeIndexByteOffset + c2 );

				} else {

					c2StopTraversal =
						c2Intersection &&
						shapecast(
							c2,
							geometry,
							intersectsBoundsFunc,
							intersectsRangeFunc,
							nodeScoreFunc,
							nodeIndexByteOffset,
							depth + 1
						);

				}

				if ( c2StopTraversal ) return true;

				return false;

			}

		};

	} )();

	const intersectsGeometry = ( function () {

		const triangle = new SeparatingAxisTriangle();
		const triangle2 = new SeparatingAxisTriangle();
		const cachedMesh = new three.Mesh();
		const invertedMat = new three.Matrix4();

		const obb = new OrientedBox();
		const obb2 = new OrientedBox();

		return function intersectsGeometry( nodeIndex32, mesh, geometry, otherGeometry, geometryToBvh, cachedObb = null ) {

			let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

			if ( cachedObb === null ) {

				if ( ! otherGeometry.boundingBox ) {

					otherGeometry.computeBoundingBox();

				}

				obb.set( otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh );
				cachedObb = obb;

			}

			const isLeaf = IS_LEAF( nodeIndex16, uint16Array );
			if ( isLeaf ) {

				const thisGeometry = geometry;
				const thisIndex = thisGeometry.index;
				const thisPos = thisGeometry.attributes.position;

				const index = otherGeometry.index;
				const pos = otherGeometry.attributes.position;

				const offset = OFFSET( nodeIndex32, uint32Array );
				const count = COUNT( nodeIndex16, uint16Array );

				// get the inverse of the geometry matrix so we can transform our triangles into the
				// geometry space we're trying to test. We assume there are fewer triangles being checked
				// here.
				invertedMat.copy( geometryToBvh ).invert();

				if ( otherGeometry.boundsTree ) {

					arrayToBox$1( BOUNDING_DATA_INDEX( nodeIndex32 ), float32Array, obb2 );
					obb2.matrix.copy( invertedMat );
					obb2.needsUpdate = true;

					cachedMesh.geometry = otherGeometry;
					const res = otherGeometry.boundsTree.shapecast( cachedMesh, {

						intersectsBounds: box => obb2.intersectsBox( box ),

						intersectsTriangle: tri => {

							tri.a.applyMatrix4( geometryToBvh );
							tri.b.applyMatrix4( geometryToBvh );
							tri.c.applyMatrix4( geometryToBvh );
							tri.needsUpdate = true;

							for ( let i = offset * 3, l = ( count + offset ) * 3; i < l; i += 3 ) {

								// this triangle needs to be transformed into the current BVH coordinate frame
								setTriangle( triangle2, i, thisIndex, thisPos );
								triangle2.needsUpdate = true;
								if ( tri.intersectsTriangle( triangle2 ) ) {

									return true;

								}

							}

							return false;

						}

					} );
					cachedMesh.geometry = null;

					return res;

				} else {

					for ( let i = offset * 3, l = ( count + offset * 3 ); i < l; i += 3 ) {

						// this triangle needs to be transformed into the current BVH coordinate frame
						setTriangle( triangle, i, thisIndex, thisPos );
						triangle.a.applyMatrix4( invertedMat );
						triangle.b.applyMatrix4( invertedMat );
						triangle.c.applyMatrix4( invertedMat );
						triangle.needsUpdate = true;

						for ( let i2 = 0, l2 = index.count; i2 < l2; i2 += 3 ) {

							setTriangle( triangle2, i2, index, pos );
							triangle2.needsUpdate = true;

							if ( triangle.intersectsTriangle( triangle2 ) ) {

								return true;

							}

						}

					}

				}

			} else {

				const left = nodeIndex32 + 8;
				const right = uint32Array[ nodeIndex32 + 6 ];

				arrayToBox$1( BOUNDING_DATA_INDEX( left ), float32Array, boundingBox );
				const leftIntersection =
					cachedObb.intersectsBox( boundingBox ) &&
					intersectsGeometry( left, mesh, geometry, otherGeometry, geometryToBvh, cachedObb );

				if ( leftIntersection ) return true;

				arrayToBox$1( BOUNDING_DATA_INDEX( right ), float32Array, boundingBox );
				const rightIntersection =
					cachedObb.intersectsBox( boundingBox ) &&
					intersectsGeometry( right, mesh, geometry, otherGeometry, geometryToBvh, cachedObb );

				if ( rightIntersection ) return true;

				return false;

			}

		};

	} )();

	function intersectRay( nodeIndex32, array, ray, target ) {

		arrayToBox$1( nodeIndex32, array, boundingBox );
		return ray.intersectBox( boundingBox, target );

	}

	const bufferStack = [];
	let _prevBuffer;
	let _float32Array;
	let _uint16Array;
	let _uint32Array;
	function setBuffer( buffer ) {

		if ( _prevBuffer ) {

			bufferStack.push( _prevBuffer );

		}

		_prevBuffer = buffer;
		_float32Array = new Float32Array( buffer );
		_uint16Array = new Uint16Array( buffer );
		_uint32Array = new Uint32Array( buffer );

	}

	function clearBuffer() {

		_prevBuffer = null;
		_float32Array = null;
		_uint16Array = null;
		_uint32Array = null;

		if ( bufferStack.length ) {

			setBuffer( bufferStack.pop() );

		}

	}

	const SKIP_GENERATION = Symbol( 'skip tree generation' );

	const obb = new OrientedBox();
	const obb2 = new OrientedBox();
	const temp = new three.Vector3();
	const temp1 = new three.Vector3();
	const temp2 = new three.Vector3();
	const tempBox = new three.Box3();
	const triangle = new SeparatingAxisTriangle();
	const triangle2 = new SeparatingAxisTriangle();

	class MeshBVH {

		static serialize( bvh, geometry, copyIndexBuffer = true ) {

			const rootData = bvh._roots;
			const indexAttribute = geometry.getIndex();
			const result = {
				roots: rootData,
				index: copyIndexBuffer ? indexAttribute.array.slice() : indexAttribute.array,
			};

			return result;

		}

		static deserialize( data, geometry, setIndex = true ) {

			const { index, roots } = data;
			const bvh = new MeshBVH( geometry, { [ SKIP_GENERATION ]: true } );
			bvh._roots = roots;

			if ( setIndex ) {

				const indexAttribute = geometry.getIndex();
				if ( indexAttribute === null ) {

					const newIndex = new three.BufferAttribute( data.index, 1, false );
					geometry.setIndex( newIndex );

				} else if ( indexAttribute.array !== index ) {

					indexAttribute.array.set( index );
					indexAttribute.needsUpdate = true;

				}

			}

			return bvh;

		}

		constructor( geometry, options = {} ) {

			if ( ! geometry.isBufferGeometry ) {

				throw new Error( 'MeshBVH: Only BufferGeometries are supported.' );

			} else if ( geometry.index && geometry.index.isInterleavedBufferAttribute ) {

				throw new Error( 'MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.' );

			}

			// default options
			options = Object.assign( {

				strategy: CENTER,
				maxDepth: 40,
				maxLeafTris: 10,
				verbose: true,

				setBoundingBox: true,

				// undocumented options

				// Whether to skip generating the tree. Used for deserialization.
				[ SKIP_GENERATION ]: false

			}, options );
			options.strategy = Math.max( 0, Math.min( 2, options.strategy ) );

			this._roots = null;
			if ( ! options[ SKIP_GENERATION ] ) {

				this._roots = buildPackedTree( geometry, options );

				if ( ! geometry.boundingBox && options.setBoundingBox ) {

					geometry.boundingBox = this.getBoundingBox( new three.Box3() );

				}

			}

			// retain references to the geometry so we can use them it without having to
			// take a geometry reference in every function.
			this.geometry = geometry;

		}

		refit( nodeIndices = null, terminationIndices = null ) {

			if ( nodeIndices && Array.isArray( nodeIndices ) ) {

				nodeIndices = new Set( nodeIndices );

			}

			if ( terminationIndices && Array.isArray( terminationIndices ) ) {

				terminationIndices = new Set( terminationIndices );

			}

			const geometry = this.geometry;
			const indexArr = geometry.index.array;
			const posAttr = geometry.attributes.position;
			const posArr = posAttr.array;

			// support for an interleaved position buffer
			const bufferOffset = posAttr.offset || 0;
			let stride = 3;
			if ( posAttr.isInterleavedBufferAttribute ) {

				stride = posAttr.data.stride;

			}

			let buffer, uint32Array, uint16Array, float32Array;
			let byteOffset = 0;
			const roots = this._roots;
			for ( let i = 0, l = roots.length; i < l; i ++ ) {

				buffer = roots[ i ];
				uint32Array = new Uint32Array( buffer );
				uint16Array = new Uint16Array( buffer );
				float32Array = new Float32Array( buffer );

				_traverse( 0, byteOffset );
				byteOffset += buffer.byteLength;

			}

			function _traverse( node32Index, byteOffset, force = false ) {

				const node16Index = node32Index * 2;
				const isLeaf = uint16Array[ node16Index + 15 ] === IS_LEAFNODE_FLAG;
				if ( isLeaf ) {

					const offset = uint32Array[ node32Index + 6 ];
					const count = uint16Array[ node16Index + 14 ];

					let minx = Infinity;
					let miny = Infinity;
					let minz = Infinity;
					let maxx = - Infinity;
					let maxy = - Infinity;
					let maxz = - Infinity;
					for ( let i = 3 * offset, l = 3 * ( offset + count ); i < l; i ++ ) {

						const index = indexArr[ i ] * stride + bufferOffset;
						const x = posArr[ index + 0 ];
						const y = posArr[ index + 1 ];
						const z = posArr[ index + 2 ];

						if ( x < minx ) minx = x;
						if ( x > maxx ) maxx = x;

						if ( y < miny ) miny = y;
						if ( y > maxy ) maxy = y;

						if ( z < minz ) minz = z;
						if ( z > maxz ) maxz = z;

					}

					if (
						float32Array[ node32Index + 0 ] !== minx ||
						float32Array[ node32Index + 1 ] !== miny ||
						float32Array[ node32Index + 2 ] !== minz ||

						float32Array[ node32Index + 3 ] !== maxx ||
						float32Array[ node32Index + 4 ] !== maxy ||
						float32Array[ node32Index + 5 ] !== maxz
					) {

						float32Array[ node32Index + 0 ] = minx;
						float32Array[ node32Index + 1 ] = miny;
						float32Array[ node32Index + 2 ] = minz;

						float32Array[ node32Index + 3 ] = maxx;
						float32Array[ node32Index + 4 ] = maxy;
						float32Array[ node32Index + 5 ] = maxz;

						return true;

					} else {

						return false;

					}

				} else {

					const left = node32Index + 8;
					const right = uint32Array[ node32Index + 6 ];

					// the indentifying node indices provided by the shapecast function include offsets of all
					// root buffers to guarantee they're unique between roots so offset left and right indices here.
					const offsetLeft = left + byteOffset;
					const offsetRight = right + byteOffset;

					let leftChange = false;
					let forceLeft = force || terminationIndices && terminationIndices.has( offsetLeft );
					let traverseLeft = forceLeft || ( nodeIndices ? nodeIndices.has( offsetLeft ) : true );
					if ( traverseLeft ) {

						leftChange = _traverse( left, byteOffset, forceLeft );

					}

					let rightChange = false;
					let forceRight = force || terminationIndices && terminationIndices.has( offsetRight );
					let traverseRight = forceRight || ( nodeIndices ? nodeIndices.has( offsetRight ) : true );
					if ( traverseRight ) {

						rightChange = _traverse( right, byteOffset, forceRight );

					}

					const didChange = leftChange || rightChange;

					if ( didChange ) {

						for ( let i = 0; i < 3; i ++ ) {

							const lefti = left + i;
							const righti = right + i;
							const minLeftValue = float32Array[ lefti ];
							const maxLeftValue = float32Array[ lefti + 3 ];
							const minRightValue = float32Array[ righti ];
							const maxRightValue = float32Array[ righti + 3 ];

							float32Array[ node32Index + i ] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
							float32Array[ node32Index + i + 3 ] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;

						}

					}

					return didChange;

				}

			}

		}

		traverse( callback, rootIndex = 0 ) {

			const buffer = this._roots[ rootIndex ];
			const uint32Array = new Uint32Array( buffer );
			const uint16Array = new Uint16Array( buffer );
			_traverse( 0 );

			function _traverse( node32Index, depth = 0 ) {

				const node16Index = node32Index * 2;
				const isLeaf = uint16Array[ node16Index + 15 ] === IS_LEAFNODE_FLAG;
				if ( isLeaf ) {

					const offset = uint32Array[ node32Index + 6 ];
					const count = uint16Array[ node16Index + 14 ];
					callback( depth, isLeaf, new Float32Array( buffer, node32Index * 4, 6 ), offset, count );

				} else {

					const left = node32Index + BYTES_PER_NODE / 4;
					const right = uint32Array[ node32Index + 6 ];
					const splitAxis = uint32Array[ node32Index + 7 ];
					const stopTraversal = callback( depth, isLeaf, new Float32Array( buffer, node32Index * 4, 6 ), splitAxis );

					if ( ! stopTraversal ) {

						_traverse( left, depth + 1 );
						_traverse( right, depth + 1 );

					}

				}

			}

		}

		/* Core Cast Functions */
		raycast( mesh, raycaster, ray, intersects ) {

			const geometry = this.geometry;
			const localIntersects = intersects ? [] : null;
			for ( const root of this._roots ) {

				setBuffer( root );
				raycast( 0, mesh, geometry, raycaster, ray, localIntersects );
				clearBuffer();

			}

			if ( intersects ) {

				for ( let i = 0, l = localIntersects.length; i < l; i ++ ) {

					delete localIntersects[ i ].localPoint;

				}

				intersects.push( ...localIntersects );

			}

		}

		raycastFirst( mesh, raycaster, ray ) {

			const geometry = this.geometry;
			let closestResult = null;
			for ( const root of this._roots ) {

				setBuffer( root );
				const result = raycastFirst( 0, mesh, geometry, raycaster, ray );
				clearBuffer();

				if ( result != null && ( closestResult == null || result.distance < closestResult.distance ) ) {

					closestResult = result;

				}

			}

			if ( closestResult ) {

				delete closestResult.localPoint;

			}

			return closestResult;

		}

		intersectsGeometry( mesh, otherGeometry, geomToMesh ) {

			const geometry = this.geometry;
			let result = false;
			for ( const root of this._roots ) {

				setBuffer( root );
				result = intersectsGeometry( 0, mesh, geometry, otherGeometry, geomToMesh );
				clearBuffer();

				if ( result ) {

					break;

				}

			}

			return result;

		}

		shapecast( mesh, callbacks, _intersectsTriangleFunc, _orderNodesFunc ) {

			const geometry = this.geometry;
			if ( callbacks instanceof Function ) {

				if ( _intersectsTriangleFunc ) {

					// Support the previous function signature that provided three sequential index buffer
					// indices here.
					const originalTriangleFunc = _intersectsTriangleFunc;
					_intersectsTriangleFunc = ( tri, index, contained, depth ) => {

						const i3 = index * 3;
						return originalTriangleFunc( tri, i3, i3 + 1, i3 + 2, contained, depth );

					};


				}

				callbacks = {

					boundsTraverseOrder: _orderNodesFunc,
					intersectsBounds: callbacks,
					intersectsTriangle: _intersectsTriangleFunc,
					intersectsRange: null,

				};

				console.warn( 'MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.' );

			}

			let {
				boundsTraverseOrder,
				intersectsBounds,
				intersectsRange,
				intersectsTriangle,
			} = callbacks;

			if ( intersectsRange && intersectsTriangle ) {

				const originalIntersectsRange = intersectsRange;
				intersectsRange = ( offset, count, contained, depth, nodeIndex ) => {

					if ( ! originalIntersectsRange( offset, count, contained, depth, nodeIndex ) ) {

						return iterateOverTriangles( offset, count, geometry, intersectsTriangle, contained, depth, triangle );

					}

					return true;

				};

			} else if ( ! intersectsRange ) {

				if ( intersectsTriangle ) {

					intersectsRange = ( offset, count, contained, depth ) => {

						return iterateOverTriangles( offset, count, geometry, intersectsTriangle, contained, depth, triangle );

					};

				} else {

					intersectsRange = ( offset, count, contained ) => {

						return contained;

					};

				}

			}

			let result = false;
			let byteOffset = 0;
			for ( const root of this._roots ) {

				setBuffer( root );
				result = shapecast( 0, geometry, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset );
				clearBuffer();

				if ( result ) {

					break;

				}

				byteOffset += root.byteLength;

			}

			return result;

		}

		/* Derived Cast Functions */
		intersectsBox( mesh, box, boxToMesh ) {

			obb.set( box.min, box.max, boxToMesh );
			obb.needsUpdate = true;

			return this.shapecast(
				mesh,
				{
					intersectsBounds: box => obb.intersectsBox( box ),
					intersectsTriangle: tri => obb.intersectsTriangle( tri )
				}
			);

		}

		intersectsSphere( mesh, sphere ) {

			return this.shapecast(
				mesh,
				{
					intersectsBounds: box => sphere.intersectsBox( box ),
					intersectsTriangle: tri => tri.intersectsSphere( sphere )
				}
			);

		}

		closestPointToGeometry( mesh, otherGeometry, geometryToBvh, target1 = null, target2 = null, minThreshold = 0, maxThreshold = Infinity ) {

			if ( ! otherGeometry.boundingBox ) {

				otherGeometry.computeBoundingBox();

			}

			obb.set( otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh );
			obb.needsUpdate = true;

			const geometry = this.geometry;
			const pos = geometry.attributes.position;
			const index = geometry.index;
			const otherPos = otherGeometry.attributes.position;
			const otherIndex = otherGeometry.index;

			let tempTarget1 = null;
			let tempTarget2 = null;
			if ( target1 ) {

				tempTarget1 = temp1;

			}

			if ( target2 ) {

				tempTarget2 = temp2;

			}

			let closestDistance = Infinity;
			obb2.matrix.copy( geometryToBvh ).invert();
			this.shapecast(
				mesh,
				{

					boundsTraverseOrder: box => {

						return obb.distanceToBox( box, Math.min( closestDistance, maxThreshold ) );

					},

					intersectsBounds: ( box, isLeaf, score ) => {

						if ( score < closestDistance && score < maxThreshold ) {

							// if we know the triangles of this bounds will be intersected next then
							// save the bounds to use during triangle checks.
							if ( isLeaf ) {

								obb2.min.copy( box.min );
								obb2.max.copy( box.max );
								obb2.needsUpdate = true;

							}

							return true;

						}

						return false;

					},

					intersectsRange: ( offset, count ) => {

						if ( otherGeometry.boundsTree ) {

							// if the other geometry has a bvh then use the accelerated path where we use shapecast to find
							// the closest bounds in the other geometry to check.
							return otherGeometry.boundsTree.shapecast(
								null,
								{
									boundsTraverseOrder: box => {

										return obb2.distanceToBox( box, Math.min( closestDistance, maxThreshold ) );

									},

									intersectsBounds: ( box, isLeaf, score ) => {

										return score < closestDistance && score < maxThreshold;

									},

									intersectsRange: ( otherOffset, otherCount ) => {

										for ( let i2 = otherOffset * 3, l2 = ( otherOffset + otherCount ) * 3; i2 < l2; i2 += 3 ) {

											setTriangle( triangle2, i2, otherIndex, otherPos );
											triangle2.a.applyMatrix4( geometryToBvh );
											triangle2.b.applyMatrix4( geometryToBvh );
											triangle2.c.applyMatrix4( geometryToBvh );
											triangle2.needsUpdate = true;

											for ( let i = offset * 3, l = ( offset + count ) * 3; i < l; i += 3 ) {

												setTriangle( triangle, i, index, pos );
												triangle.needsUpdate = true;

												const dist = triangle.distanceToTriangle( triangle2, tempTarget1, tempTarget2 );
												if ( dist < closestDistance ) {

													if ( target1 ) {

														target1.copy( tempTarget1 );

													}

													if ( target2 ) {

														target2.copy( tempTarget2 );

													}

													closestDistance = dist;

												}

												// stop traversal if we find a point that's under the given threshold
												if ( dist < minThreshold ) {

													return true;

												}

											}

										}

									},
								}
							);

						} else {

							// If no bounds tree then we'll just check every triangle.
							const triCount = otherIndex ? otherIndex.count : otherPos.count;
							for ( let i2 = 0, l2 = triCount; i2 < l2; i2 += 3 ) {

								setTriangle( triangle2, i2, otherIndex, otherPos );
								triangle2.a.applyMatrix4( geometryToBvh );
								triangle2.b.applyMatrix4( geometryToBvh );
								triangle2.c.applyMatrix4( geometryToBvh );
								triangle2.needsUpdate = true;

								for ( let i = offset * 3, l = ( offset + count ) * 3; i < l; i += 3 ) {

									setTriangle( triangle, i, index, pos );
									triangle.needsUpdate = true;

									const dist = triangle.distanceToTriangle( triangle2, tempTarget1, tempTarget2 );
									if ( dist < closestDistance ) {

										if ( target1 ) {

											target1.copy( tempTarget1 );

										}

										if ( target2 ) {

											target2.copy( tempTarget2 );

										}

										closestDistance = dist;

									}

									// stop traversal if we find a point that's under the given threshold
									if ( dist < minThreshold ) {

										return true;

									}

								}

							}

						}

					},

				}

			);

			return closestDistance;

		}

		distanceToGeometry( mesh, geom, matrix, minThreshold, maxThreshold ) {

			return this.closestPointToGeometry( mesh, geom, matrix, null, null, minThreshold, maxThreshold );

		}

		closestPointToPoint( mesh, point, target, minThreshold = 0, maxThreshold = Infinity ) {

			// early out if under minThreshold
			// skip checking if over maxThreshold
			// set minThreshold = maxThreshold to quickly check if a point is within a threshold
			// returns Infinity if no value found
			const minThresholdSq = minThreshold * minThreshold;
			const maxThresholdSq = maxThreshold * maxThreshold;
			let closestDistanceSq = Infinity;
			this.shapecast(

				mesh,
				{

					boundsTraverseOrder: box => {

						temp.copy( point ).clamp( box.min, box.max );
						return temp.distanceToSquared( point );

					},

					intersectsBounds: ( box, isLeaf, score ) => {

						return score < closestDistanceSq && score < maxThresholdSq;

					},

					intersectsTriangle: tri => {

						tri.closestPointToPoint( point, temp );
						const distSq = point.distanceToSquared( temp );
						if ( distSq < closestDistanceSq ) {

							if ( target ) {

								target.copy( temp );

							}

							closestDistanceSq = distSq;

						}

						if ( distSq < minThresholdSq ) {

							return true;

						} else {

							return false;

						}

					},

				}

			);

			return Math.sqrt( closestDistanceSq );

		}

		distanceToPoint( mesh, point, minThreshold, maxThreshold ) {

			return this.closestPointToPoint( mesh, point, null, minThreshold, maxThreshold );

		}

		getBoundingBox( target ) {

			target.makeEmpty();

			const roots = this._roots;
			roots.forEach( buffer => {

				arrayToBox$1( 0, new Float32Array( buffer ), tempBox );
				target.union( tempBox );

			} );

			return target;

		}

	}

	const boundingBox$1 = new three.Box3();
	class MeshBVHRootVisualizer extends three.Object3D {

		get isMesh() {

			return ! this.displayEdges;

		}

		get isLineSegments() {

			return this.displayEdges;

		}

		get isLine() {

			return this.displayEdges;

		}

		constructor( mesh, material, depth = 10, group = 0 ) {

			super();

			this.material = material;
			this.geometry = new three.BufferGeometry();
			this.name = 'MeshBVHRootVisualizer';
			this.depth = depth;
			this.displayParents = false;
			this.mesh = mesh;
			this.displayEdges = true;
			this._group = group;

		}

		raycast() {}

		update() {

			const geometry = this.geometry;
			const boundsTree = this.mesh.geometry.boundsTree;
			const group = this._group;
			geometry.dispose();
			this.visible = false;
			if ( boundsTree ) {

				// count the number of bounds required
				const targetDepth = this.depth - 1;
				const displayParents = this.displayParents;
				let boundsCount = 0;
				boundsTree.traverse( ( depth, isLeaf ) => {

					if ( depth === targetDepth || isLeaf ) {

						boundsCount ++;
						return true;

					} else if ( displayParents ) {

						boundsCount ++;

					}

				}, group );

				// fill in the position buffer with the bounds corners
				let posIndex = 0;
				const positionArray = new Float32Array( 8 * 3 * boundsCount );
				boundsTree.traverse( ( depth, isLeaf, boundingData ) => {

					const terminate = depth === targetDepth || isLeaf;
					if ( terminate || displayParents ) {

						arrayToBox( boundingData, boundingBox$1 );

						const { min, max } = boundingBox$1;
						for ( let x = - 1; x <= 1; x += 2 ) {

							const xVal = x < 0 ? min.x : max.x;
							for ( let y = - 1; y <= 1; y += 2 ) {

								const yVal = y < 0 ? min.y : max.y;
								for ( let z = - 1; z <= 1; z += 2 ) {

									const zVal = z < 0 ? min.z : max.z;
									positionArray[ posIndex + 0 ] = xVal;
									positionArray[ posIndex + 1 ] = yVal;
									positionArray[ posIndex + 2 ] = zVal;

									posIndex += 3;

								}

							}

						}

						return terminate;

					}

				}, group );

				let indexArray;
				let indices;
				if ( this.displayEdges ) {

					// fill in the index buffer to point to the corner points
					indices = new Uint8Array( [
						// x axis
						0, 4,
						1, 5,
						2, 6,
						3, 7,

						// y axis
						0, 2,
						1, 3,
						4, 6,
						5, 7,

						// z axis
						0, 1,
						2, 3,
						4, 5,
						6, 7,
					] );

				} else {

					indices = new Uint8Array( [

						// X-, X+
						0, 1, 2,
						2, 1, 3,

						4, 6, 5,
						6, 7, 5,

						// Y-, Y+
						1, 4, 5,
						0, 4, 1,

						2, 3, 6,
						3, 7, 6,

						// Z-, Z+
						0, 2, 4,
						2, 6, 4,

						1, 5, 3,
						3, 5, 7,

					] );

				}

				if ( positionArray.length > 65535 ) {

					indexArray = new Uint32Array( indices.length * boundsCount );

				} else {

					indexArray = new Uint16Array( indices.length * boundsCount );

				}

				const indexLength = indices.length;
				for ( let i = 0; i < boundsCount; i ++ ) {

					const posOffset = i * 8;
					const indexOffset = i * indexLength;
					for ( let j = 0; j < indexLength; j ++ ) {

						indexArray[ indexOffset + j ] = posOffset + indices[ j ];

					}

				}

				// update the geometry
				geometry.setIndex(
					new three.BufferAttribute( indexArray, 1, false ),
				);
				geometry.setAttribute(
					'position',
					new three.BufferAttribute( positionArray, 3, false ),
				);
				this.visible = true;

			}

		}

	}

	class MeshBVHVisualizer extends three.Group {

		get color() {

			return this.edgeMaterial.color;

		}

		get opacity() {

			return this.edgeMaterial.opacity;

		}

		set opacity( v ) {

			this.edgeMaterial.opacity = v;
			this.meshMaterial.opacity = v;

		}

		constructor( mesh, depth = 10 ) {

			super();

			this.name = 'MeshBVHVisualizer';
			this.depth = depth;
			this.mesh = mesh;
			this.displayParents = false;
			this.displayEdges = true;
			this._roots = [];

			const edgeMaterial = new three.LineBasicMaterial( {
				color: 0x00FF88,
				transparent: true,
				opacity: 0.3,
				depthWrite: false,
			} );

			const meshMaterial = new three.MeshBasicMaterial( {
				color: 0x00FF88,
				transparent: true,
				opacity: 0.3,
				depthWrite: false,
			} );

			meshMaterial.color = edgeMaterial.color;

			this.edgeMaterial = edgeMaterial;
			this.meshMaterial = meshMaterial;

			this.update();

		}

		update() {

			const bvh = this.mesh.geometry.boundsTree;
			const totalRoots = bvh ? bvh._roots.length : 0;
			while ( this._roots.length > totalRoots ) {

				this._roots.pop();

			}

			for ( let i = 0; i < totalRoots; i ++ ) {

				if ( i >= this._roots.length ) {

					const root = new MeshBVHRootVisualizer( this.mesh, this.edgeMaterial, this.depth, i );
					this.add( root );
					this._roots.push( root );

				}

				const root = this._roots[ i ];
				root.depth = this.depth;
				root.mesh = this.mesh;
				root.displayParents = this.displayParents;
				root.displayEdges = this.displayEdges;
				root.material = this.displayEdges ? this.edgeMaterial : this.meshMaterial;
				root.update();

			}

		}

		updateMatrixWorld( ...args ) {

			this.position.copy( this.mesh.position );
			this.rotation.copy( this.mesh.rotation );
			this.scale.copy( this.mesh.scale );

			super.updateMatrixWorld( ...args );

		}

		copy( source ) {

			this.depth = source.depth;
			this.mesh = source.mesh;

		}

		clone() {

			return new MeshBVHVisualizer( this.mesh, this.depth );

		}

		dispose() {

			this.edgeMaterial.dispose();
			this.meshMaterial.dispose();

			const children = this.children;
			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].geometry.dispose();

			}

		}

	}

	// https://stackoverflow.com/questions/1248302/how-to-get-the-size-of-a-javascript-object
	function getPrimitiveSize( el ) {

		switch ( typeof el ) {

			case 'number':
				return 8;
			case 'string':
				return el.length * 2;
			case 'boolean':
				return 4;
			default:
				return 0;

		}

	}

	function isTypedArray( arr ) {

		const regex = /(Uint|Int|Float)(8|16|32)Array/;
		return regex.test( arr.constructor.name );

	}

	function getRootExtremes( bvh, group ) {

		const result = {
			get total() {

				console.warn( 'getRootExtremes: "total" has been replaced by "nodeCount" and will be removed in the next release.' );
				return this.nodeCount;

			},
			nodeCount: 0,
			leafNodeCount: 0,

			depth: {
				min: Infinity, max: - Infinity
			},
			tris: {
				min: Infinity, max: - Infinity
			},
			splits: [ 0, 0, 0 ],
			surfaceAreaScore: 0,
		};

		bvh.traverse( ( depth, isLeaf, boundingData, offsetOrSplit, count ) => {

			const l0 = boundingData[ 0 + 3 ] - boundingData[ 0 ];
			const l1 = boundingData[ 1 + 3 ] - boundingData[ 1 ];
			const l2 = boundingData[ 2 + 3 ] - boundingData[ 2 ];

			const surfaceArea = 2 * ( l0 * l1 + l1 * l2 + l2 * l0 );

			result.nodeCount ++;
			if ( isLeaf ) {

				result.leafNodeCount ++;

				result.depth.min = Math.min( depth, result.depth.min );
				result.depth.max = Math.max( depth, result.depth.max );

				result.tris.min = Math.min( count, result.tris.min );
				result.tris.max = Math.max( count, result.tris.max );

				result.surfaceAreaScore += surfaceArea * TRIANGLE_INTERSECT_COST * count;

			} else {

				result.splits[ offsetOrSplit ] ++;

				result.surfaceAreaScore += surfaceArea * TRAVERSAL_COST;

			}

		}, group );

		// If there are no leaf nodes because the tree hasn't finished generating yet.
		if ( result.tris.min === Infinity ) {

			result.tris.min = 0;
			result.tris.max = 0;

		}

		if ( result.depth.min === Infinity ) {

			result.depth.min = 0;
			result.depth.max = 0;

		}

		return result;

	}

	function getBVHExtremes( bvh ) {

		return bvh._roots.map( ( root, i ) => getRootExtremes( bvh, i ) );

	}

	function estimateMemoryInBytes( obj ) {

		const traversed = new Set();
		const stack = [ obj ];
		let bytes = 0;

		while ( stack.length ) {

			const curr = stack.pop();
			if ( traversed.has( curr ) ) {

				continue;

			}

			traversed.add( curr );

			for ( let key in curr ) {

				if ( ! curr.hasOwnProperty( key ) ) {

					continue;

				}

				bytes += getPrimitiveSize( key );

				const value = curr[ key ];
				if ( value && ( typeof value === 'object' || typeof value === 'function' ) ) {

					if ( isTypedArray( value ) ) {

						bytes += value.byteLength;

					} else if ( value instanceof ArrayBuffer ) {

						bytes += value.byteLength;

					} else {

						stack.push( value );

					}

				} else {

					bytes += getPrimitiveSize( value );

				}


			}

		}

		return bytes;

	}

	const box1 = new three.Box3();
	const box2 = new three.Box3();
	const vec = new three.Vector3();

	class MeshBVHDebug {

		constructor( bvh, geometry ) {

			this.bvh = bvh;
			this.geometry = geometry;

		}

		// Returns a simple, human readable object that represents the BVH.
		getJSONStructure() {

			const { bvh } = this;
			const depthStack = [];

			bvh.traverse( ( depth, isLeaf, boundingData, offset, count ) => {

				const info = {
					bounds: arrayToBox( boundingData, new three.Box3() ),
				};

				if ( isLeaf ) {

					info.count = count;
					info.offset = offset;

				} else {

					info.left = null;
					info.right = null;

				}

				depthStack[ depth ] = info;

				// traversal hits the left then right node
				const parent = depthStack[ depth - 1 ];
				if ( parent ) {

					if ( parent.left === null ) {

						parent.left = info;

					} else {

						parent.right = info;

					}

				}

			} );

			return depthStack[ 0 ];

		}

		validateBounds() {

			const { bvh, geometry } = this;
			const depthStack = [];
			const index = geometry.index;
			const position = geometry.getAttribute( 'position' );
			let passes = true;

			bvh.traverse( ( depth, isLeaf, boundingData, offset, count ) => {

				const info = {
					depth,
					isLeaf,
					boundingData,
					offset,
					count,
				};
				depthStack[ depth ] = info;

				arrayToBox( boundingData, box1 );
				const parent = depthStack[ depth - 1 ];

				if ( isLeaf ) {

					// check triangles
					for ( let i = offset * 3, l = ( offset + count ) * 3; i < l; i += 3 ) {

						const i0 = index.getX( i );
						const i1 = index.getX( i + 1 );
						const i2 = index.getX( i + 2 );

						let isContained;

						vec.fromBufferAttribute( position, i0 );
						isContained = box1.containsPoint( vec );

						vec.fromBufferAttribute( position, i1 );
						isContained = isContained && box1.containsPoint( vec );

						vec.fromBufferAttribute( position, i2 );
						isContained = isContained && box1.containsPoint( vec );

						console.assert( isContained, 'Leaf bounds does not fully contain triangle.' );
						passes = passes && isContained;

					}

				}

				if ( parent ) {

					// check if my bounds fit in my parents
					arrayToBox( boundingData, box2 );

					const isContained = box2.containsBox( box1 );
					console.assert( isContained, 'Parent bounds does not fully contain child.' );
					passes = passes && isContained;

				}

			} );

			return passes;

		}

	}

	const ray = new three.Ray();
	const tmpInverseMatrix = new three.Matrix4();
	const origMeshRaycastFunc = three.Mesh.prototype.raycast;

	function acceleratedRaycast( raycaster, intersects ) {

		if ( this.geometry.boundsTree ) {

			if ( this.material === undefined ) return;

			tmpInverseMatrix.copy( this.matrixWorld ).invert();
			ray.copy( raycaster.ray ).applyMatrix4( tmpInverseMatrix );

			if ( raycaster.firstHitOnly === true ) {

				const res = this.geometry.boundsTree.raycastFirst( this, raycaster, ray );
				if ( res ) intersects.push( res );

			} else {

				this.geometry.boundsTree.raycast( this, raycaster, ray, intersects );

			}

		} else {

			origMeshRaycastFunc.call( this, raycaster, intersects );

		}

	}

	function computeBoundsTree( options ) {

		this.boundsTree = new MeshBVH( this, options );
		return this.boundsTree;

	}

	function disposeBoundsTree() {

		this.boundsTree = null;

	}

	exports.MeshBVH = MeshBVH;
	exports.Visualizer = MeshBVHVisualizer;
	exports.MeshBVHVisualizer = MeshBVHVisualizer;
	exports.MeshBVHDebug = MeshBVHDebug;
	exports.acceleratedRaycast = acceleratedRaycast;
	exports.computeBoundsTree = computeBoundsTree;
	exports.disposeBoundsTree = disposeBoundsTree;
	exports.CENTER = CENTER;
	exports.AVERAGE = AVERAGE;
	exports.SAH = SAH;
	exports.NOT_INTERSECTED = NOT_INTERSECTED;
	exports.INTERSECTED = INTERSECTED;
	exports.CONTAINED = CONTAINED;
	exports.estimateMemoryInBytes = estimateMemoryInBytes;
	exports.getBVHExtremes = getBVHExtremes;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.cjs.map
