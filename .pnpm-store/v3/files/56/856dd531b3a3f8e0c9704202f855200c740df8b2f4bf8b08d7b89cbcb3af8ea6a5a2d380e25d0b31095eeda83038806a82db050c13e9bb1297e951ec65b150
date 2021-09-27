import { Box3, Vector3 } from 'three';
import { arrayToBox } from './Utils/ArrayBoxUtilities.js';
const box1 = new Box3();
const box2 = new Box3();
const vec = new Vector3();

export class MeshBVHDebug {

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
				bounds: arrayToBox( boundingData, new Box3() ),
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
