import { Vector3, BufferAttribute, Box3 } from 'three';
import { CENTER } from './Constants.js';
import { BYTES_PER_NODE, IS_LEAFNODE_FLAG, buildPackedTree } from './buildFunctions.js';
import { OrientedBox } from './Utils/OrientedBox.js';
import { SeparatingAxisTriangle } from './Utils/SeparatingAxisTriangle.js';
import { setTriangle } from './Utils/TriangleUtils.js';
import {
	raycast,
	raycastFirst,
	shapecast,
	intersectsGeometry,
	setBuffer,
	clearBuffer,
} from './castFunctions.js';
import { arrayToBox, iterateOverTriangles } from './Utils/BufferNodeUtils.js';

const SKIP_GENERATION = Symbol( 'skip tree generation' );

const obb = new OrientedBox();
const obb2 = new OrientedBox();
const temp = new Vector3();
const temp1 = new Vector3();
const temp2 = new Vector3();
const tempBox = new Box3();
const triangle = new SeparatingAxisTriangle();
const triangle2 = new SeparatingAxisTriangle();

export default class MeshBVH {

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

				const newIndex = new BufferAttribute( data.index, 1, false );
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

				geometry.boundingBox = this.getBoundingBox( new Box3() );

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

			arrayToBox( 0, new Float32Array( buffer ), tempBox );
			target.union( tempBox );

		} );

		return target;

	}

}
