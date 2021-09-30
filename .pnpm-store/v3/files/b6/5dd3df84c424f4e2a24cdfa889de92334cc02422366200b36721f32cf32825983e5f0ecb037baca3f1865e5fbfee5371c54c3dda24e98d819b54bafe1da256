/**
 * @author takahiro / https://github.com/takahirox
 */

import { DataViewEx } from './DataViewEx';
import { DataCreationHelper } from './DataCreationHelper';

function Parser() {
};

Parser.prototype.parsePmd = function ( buffer, leftToRight ) {

	var pmd = {};
	var dv = new DataViewEx( buffer );

	pmd.metadata = {};
	pmd.metadata.format = 'pmd';
	pmd.metadata.coordinateSystem = 'left';

	var parseHeader = function () {

		var metadata = pmd.metadata;
		metadata.magic = dv.getChars( 3 );

		if ( metadata.magic !== 'Pmd' ) {

			throw 'PMD file magic is not Pmd, but ' + metadata.magic;

		}

		metadata.version = dv.getFloat32();
		metadata.modelName = dv.getSjisStringsAsUnicode( 20 );
		metadata.comment = dv.getSjisStringsAsUnicode( 256 );

	};

	var parseVertices = function () {

		var parseVertex = function () {

			var p = {};
			p.position = dv.getFloat32Array( 3 );
			p.normal = dv.getFloat32Array( 3 );
			p.uv = dv.getFloat32Array( 2 );
			p.skinIndices = dv.getUint16Array( 2 );
			p.skinWeights = [ dv.getUint8() / 100 ];
			p.skinWeights.push( 1.0 - p.skinWeights[ 0 ] );
			p.edgeFlag = dv.getUint8();
			return p;

		};

		var metadata = pmd.metadata;
		metadata.vertexCount = dv.getUint32();

		pmd.vertices = [];

		for ( var i = 0; i < metadata.vertexCount; i++ ) {

			pmd.vertices.push( parseVertex() );

		}

	};

	var parseFaces = function () {

		var parseFace = function () {

			var p = {};
			p.indices = dv.getUint16Array( 3 );
			return p;

		};

		var metadata = pmd.metadata;
		metadata.faceCount = dv.getUint32() / 3;

		pmd.faces = [];

		for ( var i = 0; i < metadata.faceCount; i++ ) {

			pmd.faces.push( parseFace() );

		}

	};

	var parseMaterials = function () {

		var parseMaterial = function () {

			var p = {};
			p.diffuse = dv.getFloat32Array( 4 );
			p.shininess = dv.getFloat32();
			p.specular = dv.getFloat32Array( 3 );
			p.ambient = dv.getFloat32Array( 3 );
			p.toonIndex = dv.getInt8();
			p.edgeFlag = dv.getUint8();
			p.faceCount = dv.getUint32() / 3;
			p.fileName = dv.getSjisStringsAsUnicode( 20 );
			return p;

		};

		var metadata = pmd.metadata;
		metadata.materialCount = dv.getUint32();

		pmd.materials = [];

		for ( var i = 0; i < metadata.materialCount; i++ ) {

			pmd.materials.push( parseMaterial() );

		}

	};

	var parseBones = function () {

		var parseBone = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			p.parentIndex = dv.getInt16();
			p.tailIndex = dv.getInt16();
			p.type = dv.getUint8();
			p.ikIndex = dv.getInt16();
			p.position = dv.getFloat32Array( 3 );
			return p;

		};

		var metadata = pmd.metadata;
		metadata.boneCount = dv.getUint16();

		pmd.bones = [];

		for ( var i = 0; i < metadata.boneCount; i++ ) {

			pmd.bones.push( parseBone() );

		}

	};

	var parseIks = function () {

		var parseIk = function () {

			var p = {};
			p.target = dv.getUint16();
			p.effector = dv.getUint16();
			p.linkCount = dv.getUint8();
			p.iteration = dv.getUint16();
			p.maxAngle = dv.getFloat32();

			p.links = [];
			for ( var i = 0; i < p.linkCount; i++ ) {

				var link = {}
				link.index = dv.getUint16();
				p.links.push( link );

			}

			return p;

		};

		var metadata = pmd.metadata;
		metadata.ikCount = dv.getUint16();

		pmd.iks = [];

		for ( var i = 0; i < metadata.ikCount; i++ ) {

			pmd.iks.push( parseIk() );

		}

	};

	var parseMorphs = function () {

		var parseMorph = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			p.elementCount = dv.getUint32();
			p.type = dv.getUint8();

			p.elements = [];
			for ( var i = 0; i < p.elementCount; i++ ) {

				p.elements.push( {
					index: dv.getUint32(),
					position: dv.getFloat32Array( 3 )
				} ) ;

			}

			return p;

		};

		var metadata = pmd.metadata;
		metadata.morphCount = dv.getUint16();

		pmd.morphs = [];

		for ( var i = 0; i < metadata.morphCount; i++ ) {

			pmd.morphs.push( parseMorph() );

		}


	};

	var parseMorphFrames = function () {

		var parseMorphFrame = function () {

			var p = {};
			p.index = dv.getUint16();
			return p;

		};

		var metadata = pmd.metadata;
		metadata.morphFrameCount = dv.getUint8();

		pmd.morphFrames = [];

		for ( var i = 0; i < metadata.morphFrameCount; i++ ) {

			pmd.morphFrames.push( parseMorphFrame() );

		}

	};

	var parseBoneFrameNames = function () {

		var parseBoneFrameName = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 50 );
			return p;

		};

		var metadata = pmd.metadata;
		metadata.boneFrameNameCount = dv.getUint8();

		pmd.boneFrameNames = [];

		for ( var i = 0; i < metadata.boneFrameNameCount; i++ ) {

			pmd.boneFrameNames.push( parseBoneFrameName() );

		}

	};

	var parseBoneFrames = function () {

		var parseBoneFrame = function () {

			var p = {};
			p.boneIndex = dv.getInt16();
			p.frameIndex = dv.getUint8();
			return p;

		};

		var metadata = pmd.metadata;
		metadata.boneFrameCount = dv.getUint32();

		pmd.boneFrames = [];

		for ( var i = 0; i < metadata.boneFrameCount; i++ ) {

			pmd.boneFrames.push( parseBoneFrame() );

		}

	};

	var parseEnglishHeader = function () {

		var metadata = pmd.metadata;
		metadata.englishCompatibility = dv.getUint8();

		if ( metadata.englishCompatibility > 0 ) {

			metadata.englishModelName = dv.getSjisStringsAsUnicode( 20 );
			metadata.englishComment = dv.getSjisStringsAsUnicode( 256 );

		}

	};

	var parseEnglishBoneNames = function () {

		var parseEnglishBoneName = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			return p;

		};

		var metadata = pmd.metadata;

		if ( metadata.englishCompatibility === 0 ) {

			return;

		}

		pmd.englishBoneNames = [];

		for ( var i = 0; i < metadata.boneCount; i++ ) {

			pmd.englishBoneNames.push( parseEnglishBoneName() );

		}

	};

	var parseEnglishMorphNames = function () {

		var parseEnglishMorphName = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			return p;

		};

		var metadata = pmd.metadata;

		if ( metadata.englishCompatibility === 0 ) {

			return;

		}

		pmd.englishMorphNames = [];

		for ( var i = 0; i < metadata.morphCount - 1; i++ ) {

			pmd.englishMorphNames.push( parseEnglishMorphName() );

		}

	};

	var parseEnglishBoneFrameNames = function () {

		var parseEnglishBoneFrameName = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 50 );
			return p;

		};

		var metadata = pmd.metadata;

		if ( metadata.englishCompatibility === 0 ) {

			return;

		}

		pmd.englishBoneFrameNames = [];

		for ( var i = 0; i < metadata.boneFrameNameCount; i++ ) {

			pmd.englishBoneFrameNames.push( parseEnglishBoneFrameName() );

		}

	};

	var parseToonTextures = function () {

		var parseToonTexture = function () {

			var p = {};
			p.fileName = dv.getSjisStringsAsUnicode( 100 );
			return p;

		};

		pmd.toonTextures = [];

		for ( var i = 0; i < 10; i++ ) {

			pmd.toonTextures.push( parseToonTexture() );

		}

	};

	var parseRigidBodies = function () {

		var parseRigidBody = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			p.boneIndex = dv.getInt16();
			p.groupIndex = dv.getUint8();
			p.groupTarget = dv.getUint16();
			p.shapeType = dv.getUint8();
			p.width = dv.getFloat32();
			p.height = dv.getFloat32();
			p.depth = dv.getFloat32();
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 3 );
			p.weight = dv.getFloat32();
			p.positionDamping = dv.getFloat32();
			p.rotationDamping = dv.getFloat32();
			p.restitution = dv.getFloat32();
			p.friction = dv.getFloat32();
			p.type = dv.getUint8();
			return p;

		};

		var metadata = pmd.metadata;
		metadata.rigidBodyCount = dv.getUint32();

		pmd.rigidBodies = [];

		for ( var i = 0; i < metadata.rigidBodyCount; i++ ) {

			pmd.rigidBodies.push( parseRigidBody() );

		}

	};

	var parseConstraints = function () {

		var parseConstraint = function () {

			var p = {};
			p.name = dv.getSjisStringsAsUnicode( 20 );
			p.rigidBodyIndex1 = dv.getUint32();
			p.rigidBodyIndex2 = dv.getUint32();
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 3 );
			p.translationLimitation1 = dv.getFloat32Array( 3 );
			p.translationLimitation2 = dv.getFloat32Array( 3 );
			p.rotationLimitation1 = dv.getFloat32Array( 3 );
			p.rotationLimitation2 = dv.getFloat32Array( 3 );
			p.springPosition = dv.getFloat32Array( 3 );
			p.springRotation = dv.getFloat32Array( 3 );
			return p;

		};

		var metadata = pmd.metadata;
		metadata.constraintCount = dv.getUint32();

		pmd.constraints = [];

		for ( var i = 0; i < metadata.constraintCount; i++ ) {

			pmd.constraints.push( parseConstraint() );

		}

	};

	parseHeader();
	parseVertices();
	parseFaces();
	parseMaterials();
	parseBones();
	parseIks();
	parseMorphs();
	parseMorphFrames();
	parseBoneFrameNames();
	parseBoneFrames();
	parseEnglishHeader();
	parseEnglishBoneNames();
	parseEnglishMorphNames();
	parseEnglishBoneFrameNames();
	parseToonTextures();
	parseRigidBodies();
	parseConstraints();

	if ( leftToRight === true ) this.leftToRightModel( pmd );

	// console.log( pmd ); // for console debug

	return pmd;

};

Parser.prototype.parsePmx = function ( buffer, leftToRight ) {

	var pmx = {};
	var dv = new DataViewEx( buffer );

	pmx.metadata = {};
	pmx.metadata.format = 'pmx';
	pmx.metadata.coordinateSystem = 'left';

	var parseHeader = function () {

		var metadata = pmx.metadata;
		metadata.magic = dv.getChars( 4 );

		// Note: don't remove the last blank space.
		if ( metadata.magic !== 'PMX ' ) {

			throw 'PMX file magic is not PMX , but ' + metadata.magic;

		}

		metadata.version = dv.getFloat32();

		if ( metadata.version !== 2.0 && metadata.version !== 2.1 ) {

			throw 'PMX version ' + metadata.version + ' is not supported.';

		}

		metadata.headerSize = dv.getUint8();
		metadata.encoding = dv.getUint8();
		metadata.additionalUvNum = dv.getUint8();
		metadata.vertexIndexSize = dv.getUint8();
		metadata.textureIndexSize = dv.getUint8();
		metadata.materialIndexSize = dv.getUint8();
		metadata.boneIndexSize = dv.getUint8();
		metadata.morphIndexSize = dv.getUint8();
		metadata.rigidBodyIndexSize = dv.getUint8();
		metadata.modelName = dv.getTextBuffer();
		metadata.englishModelName = dv.getTextBuffer();
		metadata.comment = dv.getTextBuffer();
		metadata.englishComment = dv.getTextBuffer();

	};

	var parseVertices = function () {

		var parseVertex = function () {

			var p = {};
			p.position = dv.getFloat32Array( 3 );
			p.normal = dv.getFloat32Array( 3 );
			p.uv = dv.getFloat32Array( 2 );

			p.auvs = [];

			for ( var i = 0; i < pmx.metadata.additionalUvNum; i++ ) {

				p.auvs.push( dv.getFloat32Array( 4 ) );

			}

			p.type = dv.getUint8();

			var indexSize = metadata.boneIndexSize;

			if ( p.type === 0 ) {  // BDEF1

				p.skinIndices = dv.getIndexArray( indexSize, 1 );
				p.skinWeights = [ 1.0 ];

			} else if ( p.type === 1 ) {  // BDEF2

				p.skinIndices = dv.getIndexArray( indexSize, 2 );
				p.skinWeights = dv.getFloat32Array( 1 );
				p.skinWeights.push( 1.0 - p.skinWeights[ 0 ] );

			} else if ( p.type === 2 ) {  // BDEF4

				p.skinIndices = dv.getIndexArray( indexSize, 4 );
				p.skinWeights = dv.getFloat32Array( 4 );

			} else if ( p.type === 3 ) {  // SDEF

				p.skinIndices = dv.getIndexArray( indexSize, 2 );
				p.skinWeights = dv.getFloat32Array( 1 );
				p.skinWeights.push( 1.0 - p.skinWeights[ 0 ] );

				p.skinC = dv.getFloat32Array( 3 );
				p.skinR0 = dv.getFloat32Array( 3 );
				p.skinR1 = dv.getFloat32Array( 3 );

				// SDEF is not supported yet and is handled as BDEF2 so far.
				// TODO: SDEF support
				p.type = 1;

			} else {

				throw 'unsupport bone type ' + p.type + ' exception.';

			}

			p.edgeRatio = dv.getFloat32();
			return p;

		};

		var metadata = pmx.metadata;
		metadata.vertexCount = dv.getUint32();

		pmx.vertices = [];

		for ( var i = 0; i < metadata.vertexCount; i++ ) {

			pmx.vertices.push( parseVertex() );

		}

	};

	var parseFaces = function () {

		var parseFace = function () {

			var p = {};
			p.indices = dv.getIndexArray( metadata.vertexIndexSize, 3, true );
			return p;

		};

		var metadata = pmx.metadata;
		metadata.faceCount = dv.getUint32() / 3;

		pmx.faces = [];

		for ( var i = 0; i < metadata.faceCount; i++ ) {

			pmx.faces.push( parseFace() );

		}

	};

	var parseTextures = function () {

		var parseTexture = function () {

			return dv.getTextBuffer();

		};

		var metadata = pmx.metadata;
		metadata.textureCount = dv.getUint32();

		pmx.textures = [];

		for ( var i = 0; i < metadata.textureCount; i++ ) {

			pmx.textures.push( parseTexture() );

		}

	};

	var parseMaterials = function () {

		var parseMaterial = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.diffuse = dv.getFloat32Array( 4 );
			p.specular = dv.getFloat32Array( 3 );
			p.shininess = dv.getFloat32();
			p.ambient = dv.getFloat32Array( 3 );
			p.flag = dv.getUint8();
			p.edgeColor = dv.getFloat32Array( 4 );
			p.edgeSize = dv.getFloat32();
			p.textureIndex = dv.getIndex( pmx.metadata.textureIndexSize );
			p.envTextureIndex = dv.getIndex( pmx.metadata.textureIndexSize );
			p.envFlag = dv.getUint8();
			p.toonFlag = dv.getUint8();

			if ( p.toonFlag === 0 ) {

				p.toonIndex = dv.getIndex( pmx.metadata.textureIndexSize );

			} else if ( p.toonFlag === 1 ) {

				p.toonIndex = dv.getInt8();

			} else {

				throw 'unknown toon flag ' + p.toonFlag + ' exception.';

			}

			p.comment = dv.getTextBuffer();
			p.faceCount = dv.getUint32() / 3;
			return p;

		};

		var metadata = pmx.metadata;
		metadata.materialCount = dv.getUint32();

		pmx.materials = [];

		for ( var i = 0; i < metadata.materialCount; i++ ) {

			pmx.materials.push( parseMaterial() );

		}

	};

	var parseBones = function () {

		var parseBone = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.position = dv.getFloat32Array( 3 );
			p.parentIndex = dv.getIndex( pmx.metadata.boneIndexSize );
			p.transformationClass = dv.getUint32();
			p.flag = dv.getUint16();

			if ( p.flag & 0x1 ) {

				p.connectIndex = dv.getIndex( pmx.metadata.boneIndexSize );

			} else {

				p.offsetPosition = dv.getFloat32Array( 3 );

			}

			if ( p.flag & 0x100 || p.flag & 0x200 ) {

				// Note: I don't think Grant is an appropriate name
				//       but I found that some English translated MMD tools use this term
				//       so I've named it Grant so far.
				//       I'd rename to more appropriate name from Grant later.
				var grant = {};

				grant.isLocal = ( p.flag & 0x80 ) !== 0 ? true : false;
				grant.affectRotation = ( p.flag & 0x100 ) !== 0 ? true : false;
				grant.affectPosition = ( p.flag & 0x200 ) !== 0 ? true : false;
				grant.parentIndex = dv.getIndex( pmx.metadata.boneIndexSize );
				grant.ratio = dv.getFloat32();

				p.grant = grant;

			}

			if ( p.flag & 0x400 ) {

				p.fixAxis = dv.getFloat32Array( 3 );

			}

			if ( p.flag & 0x800 ) {

				p.localXVector = dv.getFloat32Array( 3 );
				p.localZVector = dv.getFloat32Array( 3 );

			}

			if ( p.flag & 0x2000 ) {

				p.key = dv.getUint32();

			}

			if ( p.flag & 0x20 ) {

				var ik = {};

				ik.effector = dv.getIndex( pmx.metadata.boneIndexSize );
				ik.target = null;
				ik.iteration = dv.getUint32();
				ik.maxAngle = dv.getFloat32();
				ik.linkCount = dv.getUint32();
				ik.links = [];

				for ( var i = 0; i < ik.linkCount; i++ ) {

					var link = {};
					link.index = dv.getIndex( pmx.metadata.boneIndexSize );
					link.angleLimitation = dv.getUint8();

					if ( link.angleLimitation === 1 ) {

						link.lowerLimitationAngle = dv.getFloat32Array( 3 );
						link.upperLimitationAngle = dv.getFloat32Array( 3 );

					}

					ik.links.push( link );

				}

				p.ik = ik;
			}

			return p;

		};

		var metadata = pmx.metadata;
		metadata.boneCount = dv.getUint32();

		pmx.bones = [];

		for ( var i = 0; i < metadata.boneCount; i++ ) {

			pmx.bones.push( parseBone() );

		}

	};

	var parseMorphs = function () {

		var parseMorph = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.panel = dv.getUint8();
			p.type = dv.getUint8();
			p.elementCount = dv.getUint32();
			p.elements = [];

			for ( var i = 0; i < p.elementCount; i++ ) {

				if ( p.type === 0 ) {  // group morph

					var m = {};
					m.index = dv.getIndex( pmx.metadata.morphIndexSize );
					m.ratio = dv.getFloat32();
					p.elements.push( m );

				} else if ( p.type === 1 ) {  // vertex morph

					var m = {};
					m.index = dv.getIndex( pmx.metadata.vertexIndexSize, true );
					m.position = dv.getFloat32Array( 3 );
					p.elements.push( m );

				} else if ( p.type === 2 ) {  // bone morph

					var m = {};
					m.index = dv.getIndex( pmx.metadata.boneIndexSize );
					m.position = dv.getFloat32Array( 3 );
					m.rotation = dv.getFloat32Array( 4 );
					p.elements.push( m );

				} else if ( p.type === 3 ) {  // uv morph

					var m = {};
					m.index = dv.getIndex( pmx.metadata.vertexIndexSize, true );
					m.uv = dv.getFloat32Array( 4 );
					p.elements.push( m );

				} else if ( p.type === 4 ) {  // additional uv1

					// TODO: implement

				} else if ( p.type === 5 ) {  // additional uv2

					// TODO: implement

				} else if ( p.type === 6 ) {  // additional uv3

					// TODO: implement

				} else if ( p.type === 7 ) {  // additional uv4

					// TODO: implement

				} else if ( p.type === 8 ) {  // material morph

					var m = {};
					m.index = dv.getIndex( pmx.metadata.materialIndexSize );
					m.type = dv.getUint8();
					m.diffuse = dv.getFloat32Array( 4 );
					m.specular = dv.getFloat32Array( 3 );
					m.shininess = dv.getFloat32();
					m.ambient = dv.getFloat32Array( 3 );
					m.edgeColor = dv.getFloat32Array( 4 );
					m.edgeSize = dv.getFloat32();
					m.textureColor = dv.getFloat32Array( 4 );
					m.sphereTextureColor = dv.getFloat32Array( 4 );
					m.toonColor = dv.getFloat32Array( 4 );
					p.elements.push( m );

				}

			}

			return p;

		};

		var metadata = pmx.metadata;
		metadata.morphCount = dv.getUint32();

		pmx.morphs = [];

		for ( var i = 0; i < metadata.morphCount; i++ ) {

			pmx.morphs.push( parseMorph() );

		}

	};

	var parseFrames = function () {

		var parseFrame = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.type = dv.getUint8();
			p.elementCount = dv.getUint32();
			p.elements = [];

			for ( var i = 0; i < p.elementCount; i++ ) {

				var e = {};
				e.target = dv.getUint8();
				e.index = ( e.target === 0 ) ? dv.getIndex( pmx.metadata.boneIndexSize ) : dv.getIndex( pmx.metadata.morphIndexSize );
				p.elements.push( e );

			}

			return p;

		};

		var metadata = pmx.metadata;
		metadata.frameCount = dv.getUint32();

		pmx.frames = [];

		for ( var i = 0; i < metadata.frameCount; i++ ) {

			pmx.frames.push( parseFrame() );

		}

	};

	var parseRigidBodies = function () {

		var parseRigidBody = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.boneIndex = dv.getIndex( pmx.metadata.boneIndexSize );
			p.groupIndex = dv.getUint8();
			p.groupTarget = dv.getUint16();
			p.shapeType = dv.getUint8();
			p.width = dv.getFloat32();
			p.height = dv.getFloat32();
			p.depth = dv.getFloat32();
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 3 );
			p.weight = dv.getFloat32();
			p.positionDamping = dv.getFloat32();
			p.rotationDamping = dv.getFloat32();
			p.restitution = dv.getFloat32();
			p.friction = dv.getFloat32();
			p.type = dv.getUint8();
			return p;

		};

		var metadata = pmx.metadata;
		metadata.rigidBodyCount = dv.getUint32();

		pmx.rigidBodies = [];

		for ( var i = 0; i < metadata.rigidBodyCount; i++ ) {

			pmx.rigidBodies.push( parseRigidBody() );

		}

	};

	var parseConstraints = function () {

		var parseConstraint = function () {

			var p = {};
			p.name = dv.getTextBuffer();
			p.englishName = dv.getTextBuffer();
			p.type = dv.getUint8();
			p.rigidBodyIndex1 = dv.getIndex( pmx.metadata.rigidBodyIndexSize );
			p.rigidBodyIndex2 = dv.getIndex( pmx.metadata.rigidBodyIndexSize );
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 3 );
			p.translationLimitation1 = dv.getFloat32Array( 3 );
			p.translationLimitation2 = dv.getFloat32Array( 3 );
			p.rotationLimitation1 = dv.getFloat32Array( 3 );
			p.rotationLimitation2 = dv.getFloat32Array( 3 );
			p.springPosition = dv.getFloat32Array( 3 );
			p.springRotation = dv.getFloat32Array( 3 );
			return p;

		};

		var metadata = pmx.metadata;
		metadata.constraintCount = dv.getUint32();

		pmx.constraints = [];

		for ( var i = 0; i < metadata.constraintCount; i++ ) {

			pmx.constraints.push( parseConstraint() );

		}

	};

	parseHeader();
	parseVertices();
	parseFaces();
	parseTextures();
	parseMaterials();
	parseBones();
	parseMorphs();
	parseFrames();
	parseRigidBodies();
	parseConstraints();

	if ( leftToRight === true ) this.leftToRightModel( pmx );

	// console.log( pmx ); // for console debug

	return pmx;

};

Parser.prototype.parseVmd = function ( buffer, leftToRight ) {

	var vmd = {};
	var dv = new DataViewEx( buffer );

	vmd.metadata = {};
	vmd.metadata.coordinateSystem = 'left';

	var parseHeader = function () {

		var metadata = vmd.metadata;
		metadata.magic = dv.getChars( 30 );

		if ( metadata.magic !== 'Vocaloid Motion Data 0002' ) {

			throw 'VMD file magic is not Vocaloid Motion Data 0002, but ' + metadata.magic;

		}

		metadata.name = dv.getSjisStringsAsUnicode( 20 );

	};

	var parseMotions = function () {

		var parseMotion = function () {

			var p = {};
			p.boneName = dv.getSjisStringsAsUnicode( 15 );
			p.frameNum = dv.getUint32();
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 4 );
			p.interpolation = dv.getUint8Array( 64 );
			return p;

		};

		var metadata = vmd.metadata;
		metadata.motionCount = dv.getUint32();

		vmd.motions = [];
		for ( var i = 0; i < metadata.motionCount; i++ ) {

			vmd.motions.push( parseMotion() );

		}

	};

	var parseMorphs = function () {

		var parseMorph = function () {

			var p = {};
			p.morphName = dv.getSjisStringsAsUnicode( 15 );
			p.frameNum = dv.getUint32();
			p.weight = dv.getFloat32();
			return p;

		};

		var metadata = vmd.metadata;
		metadata.morphCount = dv.getUint32();

		vmd.morphs = [];
		for ( var i = 0; i < metadata.morphCount; i++ ) {

			vmd.morphs.push( parseMorph() );

		}

	};

	var parseCameras = function () {

		var parseCamera = function () {

			var p = {};
			p.frameNum = dv.getUint32();
			p.distance = dv.getFloat32();
			p.position = dv.getFloat32Array( 3 );
			p.rotation = dv.getFloat32Array( 3 );
			p.interpolation = dv.getUint8Array( 24 );
			p.fov = dv.getUint32();
			p.perspective = dv.getUint8();
			return p;

		};

		var metadata = vmd.metadata;
		metadata.cameraCount = dv.getUint32();

		vmd.cameras = [];
		for ( var i = 0; i < metadata.cameraCount; i++ ) {

			vmd.cameras.push( parseCamera() );

		}

	};

	parseHeader();
	parseMotions();
	parseMorphs();
	parseCameras();

	if ( leftToRight === true ) this.leftToRightVmd( vmd );

	// console.log( vmd ); // for console debug

	return vmd;

};

Parser.prototype.parseVpd = function ( text, leftToRight ) {

	var vpd = {};

	vpd.metadata = {};
	vpd.metadata.coordinateSystem = 'left';

	vpd.bones = [];

	var commentPatternG = /\/\/\w*(\r|\n|\r\n)/g;
	var newlinePattern = /\r|\n|\r\n/;

	var lines = text.replace( commentPatternG, '' ).split( newlinePattern );

	function throwError () {

		throw 'the file seems not vpd file.';

	};

	function checkMagic () {

		if ( lines[ 0 ] !== 'Vocaloid Pose Data file' ) {

			throwError();

		}

	};

	function parseHeader () {

		if ( lines.length < 4 ) {

			throwError();

		}

		vpd.metadata.parentFile = lines[ 2 ];
		vpd.metadata.boneCount = parseInt( lines[ 3 ] );

	};

	function parseBones () {

		var boneHeaderPattern = /^\s*(Bone[0-9]+)\s*\{\s*(.*)$/;
		var boneVectorPattern = /^\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*;/;
		var boneQuaternionPattern = /^\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*;/;
		var boneFooterPattern = /^\s*}/;

		var bones = vpd.bones;
		var n = null;
		var v = null;
		var q = null;

		for ( var i = 4; i < lines.length; i++ ) {

			var line = lines[ i ];

			var result;

			result = line.match( boneHeaderPattern );

			if ( result !== null ) {

				if ( n !== null ) {

					throwError();

				}

				n = result[ 2 ];

			}

			result = line.match( boneVectorPattern );

			if ( result !== null ) {

				if ( v !== null ) {

					throwError();

				}

				v = [

					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )

				];

			}

			result = line.match( boneQuaternionPattern );

			if ( result !== null ) {

				if ( q !== null ) {

					throwError();

				}

				q = [

					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] ),
					parseFloat( result[ 4 ] )

				];


			}

			result = line.match( boneFooterPattern );

			if ( result !== null ) {

				if ( n === null || v === null || q === null ) {

					throwError();

				}

				bones.push( {

					name: n,
					translation: v,
					quaternion: q

				} );

				n = null;
				v = null;
				q = null;

			}

		}

		if ( n !== null || v !== null || q !== null ) {

			throwError();

		}

	};

	checkMagic();
	parseHeader();
	parseBones();

	if ( leftToRight === true ) this.leftToRightVpd( vpd );

	// console.log( vpd );  // for console debug

	return vpd;

};

Parser.prototype.mergeVmds = function ( vmds ) {

	var v = {};
	v.metadata = {};
	v.metadata.name = vmds[ 0 ].metadata.name;
	v.metadata.coordinateSystem = vmds[ 0 ].metadata.coordinateSystem;
	v.metadata.motionCount = 0;
	v.metadata.morphCount = 0;
	v.metadata.cameraCount = 0;
	v.motions = [];
	v.morphs = [];
	v.cameras = [];

	for ( var i = 0; i < vmds.length; i++ ) {

		var v2 = vmds[ i ];

		v.metadata.motionCount += v2.metadata.motionCount;
		v.metadata.morphCount += v2.metadata.morphCount;
		v.metadata.cameraCount += v2.metadata.cameraCount;

		for ( var j = 0; j < v2.metadata.motionCount; j++ ) {

			v.motions.push( v2.motions[ j ] );

		}

		for ( var j = 0; j < v2.metadata.morphCount; j++ ) {

			v.morphs.push( v2.morphs[ j ] );

		}

		for ( var j = 0; j < v2.metadata.cameraCount; j++ ) {

			v.cameras.push( v2.cameras[ j ] );

		}

	}

	return v;

};

Parser.prototype.leftToRightModel = function ( model ) {

	if ( model.metadata.coordinateSystem === 'right' ) {

		return;

	}

	model.metadata.coordinateSystem = 'right';

	var helper = new DataCreationHelper();

	for ( var i = 0; i < model.metadata.vertexCount; i++ ) {

		helper.leftToRightVector3( model.vertices[ i ].position );
		helper.leftToRightVector3( model.vertices[ i ].normal );

	}

	for ( var i = 0; i < model.metadata.faceCount; i++ ) {

		helper.leftToRightIndexOrder( model.faces[ i ].indices );

	}

	for ( var i = 0; i < model.metadata.boneCount; i++ ) {

		helper.leftToRightVector3( model.bones[ i ].position );

	}

	// TODO: support other morph for PMX
	for ( var i = 0; i < model.metadata.morphCount; i++ ) {

		var m = model.morphs[ i ];

		if ( model.metadata.format === 'pmx' && m.type !== 1 ) {

			// TODO: implement
			continue;

		}

		for ( var j = 0; j < m.elements.length; j++ ) {

			helper.leftToRightVector3( m.elements[ j ].position );

		}

	}

	for ( var i = 0; i < model.metadata.rigidBodyCount; i++ ) {

		helper.leftToRightVector3( model.rigidBodies[ i ].position );
		helper.leftToRightEuler( model.rigidBodies[ i ].rotation );

	}

	for ( var i = 0; i < model.metadata.constraintCount; i++ ) {

		helper.leftToRightVector3( model.constraints[ i ].position );
		helper.leftToRightEuler( model.constraints[ i ].rotation );
		helper.leftToRightVector3Range( model.constraints[ i ].translationLimitation1, model.constraints[ i ].translationLimitation2 );
		helper.leftToRightEulerRange( model.constraints[ i ].rotationLimitation1, model.constraints[ i ].rotationLimitation2 );

	}

};

Parser.prototype.leftToRightVmd = function ( vmd ) {

	if ( vmd.metadata.coordinateSystem === 'right' ) {

		return;

	}

	vmd.metadata.coordinateSystem = 'right';

	var helper = new DataCreationHelper();

	for ( var i = 0; i < vmd.metadata.motionCount; i++ ) {

		helper.leftToRightVector3( vmd.motions[ i ].position );
		helper.leftToRightQuaternion( vmd.motions[ i ].rotation );

	}

	for ( var i = 0; i < vmd.metadata.cameraCount; i++ ) {

		helper.leftToRightVector3( vmd.cameras[ i ].position );
		helper.leftToRightEuler( vmd.cameras[ i ].rotation );

	}

};

Parser.prototype.leftToRightVpd = function ( vpd ) {

	if ( vpd.metadata.coordinateSystem === 'right' ) {

		return;

	}

	vpd.metadata.coordinateSystem = 'right';

	var helper = new DataCreationHelper();

	for ( var i = 0; i < vpd.bones.length; i++ ) {

		helper.leftToRightVector3( vpd.bones[ i ].translation );
		helper.leftToRightQuaternion( vpd.bones[ i ].quaternion );

	}

};

export { Parser }
