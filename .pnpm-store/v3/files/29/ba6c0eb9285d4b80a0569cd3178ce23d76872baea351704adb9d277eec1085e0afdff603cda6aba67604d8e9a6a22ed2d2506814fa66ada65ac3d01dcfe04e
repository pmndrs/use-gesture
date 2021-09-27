import { Triangle, Vector3, Line3, Sphere } from 'three';
import { SeparatingAxisBounds } from './SeparatingAxisBounds.js';
import { closestPointsSegmentToSegment, sphereIntersectTriangle } from './MathUtilities.js';

export class SeparatingAxisTriangle extends Triangle {

	constructor( ...args ) {

		super( ...args );

		this.isSeparatingAxisTriangle = true;
		this.satAxes = new Array( 4 ).fill().map( () => new Vector3() );
		this.satBounds = new Array( 4 ).fill().map( () => new SeparatingAxisBounds() );
		this.points = [ this.a, this.b, this.c ];
		this.sphere = new Sphere();
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

	const point1 = new Vector3();
	const point2 = new Vector3();
	const edge = new Line3();

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
	const cachedAxis = new Vector3();
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

	const target = new Vector3();
	return function distanceToPoint( point ) {

		this.closestPointToPoint( point, target );
		return point.distanceTo( target );

	};

} )();


SeparatingAxisTriangle.prototype.distanceToTriangle = ( function () {

	const point = new Vector3();
	const point2 = new Vector3();
	const cornerFields = [ 'a', 'b', 'c' ];
	const line1 = new Line3();
	const line2 = new Line3();

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

