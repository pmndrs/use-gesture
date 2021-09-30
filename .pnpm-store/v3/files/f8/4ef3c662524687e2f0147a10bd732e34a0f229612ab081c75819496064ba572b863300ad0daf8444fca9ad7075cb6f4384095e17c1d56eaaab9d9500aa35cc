import { LineBasicMaterial, BufferAttribute, Box3, Group, MeshBasicMaterial, Object3D, BufferGeometry } from 'three';
import { arrayToBox } from './Utils/ArrayBoxUtilities.js';

const boundingBox = new Box3();
class MeshBVHRootVisualizer extends Object3D {

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
		this.geometry = new BufferGeometry();
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

					arrayToBox( boundingData, boundingBox );

					const { min, max } = boundingBox;
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
				new BufferAttribute( indexArray, 1, false ),
			);
			geometry.setAttribute(
				'position',
				new BufferAttribute( positionArray, 3, false ),
			);
			this.visible = true;

		}

	}

}

class MeshBVHVisualizer extends Group {

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

		const edgeMaterial = new LineBasicMaterial( {
			color: 0x00FF88,
			transparent: true,
			opacity: 0.3,
			depthWrite: false,
		} );

		const meshMaterial = new MeshBasicMaterial( {
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


export default MeshBVHVisualizer;
