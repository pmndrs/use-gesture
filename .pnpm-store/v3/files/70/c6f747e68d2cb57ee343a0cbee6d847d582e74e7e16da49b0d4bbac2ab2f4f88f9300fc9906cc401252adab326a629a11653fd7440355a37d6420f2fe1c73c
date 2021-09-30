import { Box3 } from 'three';
import MeshBVH from '../MeshBVH.js';

export class GenerateMeshBVHWorker {

	constructor() {

		this.running = false;
		this.worker = new Worker( './generateAsync.worker.js' );

	}

	generate( geometry, options = {} ) {

		if ( this.running ) {

			throw new Error( 'GenerateMeshBVHWorker: Already running job.' );

		}

		const { worker } = this;
		this.running = true;

		return new Promise( ( resolve, reject ) => {

			worker.onmessage = e => {

				this.running = false;
				worker.onmessage = null;
				const { serialized, position, error } = e.data;

				if ( error ) {

					reject( new Error( error ) );

				} else {

					const bvh = MeshBVH.deserialize( serialized, geometry, false );
					const boundsOptions = Object.assign( {

						setBoundingBox: true,

					}, options );

					// we need to replace the arrays because they're neutered entirely by the
					// webworker transfer.
					geometry.attributes.position.array = position;
					if ( geometry.index ) {

						geometry.index.array = serialized.index;

					}

					if ( boundsOptions.setBoundingBox ) {

						geometry.boundingBox = bvh.getBoundingBox( new Box3() );

					}

					resolve( bvh );

				}


			};

			const index = geometry.index ? geometry.index.array : null;
			const position = geometry.attributes.position.array;

			if ( position.isInterleavedBufferAttribute || index && index.isInterleavedBufferAttribute ) {

				throw new Error( 'GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.' );

			}

			const transferrables = [ position ];
			if ( index ) {

				transferrables.push( index );

			}

			worker.postMessage( {

				index,
				position,
				options,

			}, transferrables.map( arr => arr.buffer ) );

		} );

	}

	terminate() {

		this.worker.terminate();

	}

}
