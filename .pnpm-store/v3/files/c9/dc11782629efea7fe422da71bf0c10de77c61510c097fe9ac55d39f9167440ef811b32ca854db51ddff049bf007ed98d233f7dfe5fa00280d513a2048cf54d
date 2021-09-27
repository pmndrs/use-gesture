/**
 * @author takahiro / https://github.com/takahirox
 */

function DataCreationHelper () {
};

DataCreationHelper.prototype = {

	constructor: DataCreationHelper,

	leftToRightVector3: function ( v ) {

		v[ 2 ] = -v[ 2 ];

	},

	leftToRightQuaternion: function ( q ) {

		q[ 0 ] = -q[ 0 ];
		q[ 1 ] = -q[ 1 ];

	},

	leftToRightEuler: function ( r ) {

		r[ 0 ] = -r[ 0 ];
		r[ 1 ] = -r[ 1 ];

	},

	leftToRightIndexOrder: function ( p ) {

		var tmp = p[ 2 ];
		p[ 2 ] = p[ 0 ];
		p[ 0 ] = tmp;

	},

	leftToRightVector3Range: function ( v1, v2 ) {

		var tmp = -v2[ 2 ];
		v2[ 2 ] = -v1[ 2 ];
		v1[ 2 ] = tmp;

	},

	leftToRightEulerRange: function ( r1, r2 ) {

		var tmp1 = -r2[ 0 ];
		var tmp2 = -r2[ 1 ];
		r2[ 0 ] = -r1[ 0 ];
		r2[ 1 ] = -r1[ 1 ];
		r1[ 0 ] = tmp1;
		r1[ 1 ] = tmp2;

	}

};

export { DataCreationHelper }
