// Returns a Float32Array representing the bounds data for box.
export function boxToArray( bx ) {

	const arr = new Float32Array( 6 );

	arr[ 0 ] = bx.min.x;
	arr[ 1 ] = bx.min.y;
	arr[ 2 ] = bx.min.z;

	arr[ 3 ] = bx.max.x;
	arr[ 4 ] = bx.max.y;
	arr[ 5 ] = bx.max.z;

	return arr;

}

export function arrayToBox( arr, target ) {

	target.min.x = arr[ 0 ];
	target.min.y = arr[ 1 ];
	target.min.z = arr[ 2 ];

	target.max.x = arr[ 3 ];
	target.max.y = arr[ 4 ];
	target.max.z = arr[ 5 ];

	return target;

}

export function getLongestEdgeIndex( bounds ) {

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
export function copyBounds( source, target ) {

	target.set( source );

}

// sets bounds target to the union of bounds a and b
export function unionBounds( a, b, target ) {

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
export function computeSurfaceArea( bounds ) {

	const d0 = bounds[ 3 ] - bounds[ 0 ];
	const d1 = bounds[ 4 ] - bounds[ 1 ];
	const d2 = bounds[ 5 ] - bounds[ 2 ];

	return 2 * ( d0 * d1 + d1 * d2 + d2 * d0 );

}
