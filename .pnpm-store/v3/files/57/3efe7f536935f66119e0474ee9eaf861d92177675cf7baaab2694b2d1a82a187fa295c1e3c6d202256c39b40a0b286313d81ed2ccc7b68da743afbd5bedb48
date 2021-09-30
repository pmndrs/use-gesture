import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useGizmoContext } from './GizmoHelper.js';
import { Vector3, CanvasTexture } from 'three';

const colors = {
  bg: '#f0f0f0',
  hover: '#999',
  text: 'black',
  stroke: 'black'
};
const defaultFaces = ['Right', 'Left', 'Top', 'Bottom', 'Front', 'Back'];

const makePositionVector = xyz => new Vector3(...xyz).multiplyScalar(0.38);

const corners = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]].map(makePositionVector);
const cornerDimensions = [0.25, 0.25, 0.25];
const edges = [[1, 1, 0], [1, 0, 1], [1, 0, -1], [1, -1, 0], [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1], [-1, 1, 0], [-1, 0, 1], [-1, 0, -1], [-1, -1, 0]].map(makePositionVector);
const edgeDimensions = edges.map(edge => edge.toArray().map(axis => axis == 0 ? 0.5 : 0.25));

const FaceMaterial = ({
  hover,
  index,
  font = '20px Inter var, Arial, sans-serif',
  faces = defaultFaces,
  color = colors.bg,
  hoverColor = colors.hover,
  textColor = colors.text,
  strokeColor = colors.stroke,
  opacity = 1
}) => {
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = strokeColor;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.font = font;
    context.textAlign = 'center';
    context.fillStyle = textColor;
    context.fillText(faces[index].toUpperCase(), 64, 76);
    return new CanvasTexture(canvas);
  }, [index, font, color, textColor, strokeColor]);
  return /*#__PURE__*/React.createElement("meshLambertMaterial", {
    map: texture,
    attachArray: "material",
    color: hover ? hoverColor : 'white',
    transparent: true,
    opacity: opacity
  });
};

const FaceCube = props => {
  const {
    tweenCamera,
    raycast
  } = useGizmoContext();
  const [hover, setHover] = React.useState(null);

  const handlePointerOut = e => {
    e.stopPropagation();
    setHover(null);
  };

  const handleClick = e => {
    e.stopPropagation();
    tweenCamera(e.face.normal);
  };

  const handlePointerMove = e => {
    e.stopPropagation();
    setHover(Math.floor(e.faceIndex / 2));
  };

  return /*#__PURE__*/React.createElement("mesh", {
    raycast: raycast,
    onPointerOut: handlePointerOut,
    onPointerMove: handlePointerMove,
    onClick: props.onClick || handleClick
  }, [...Array(6)].map((_, index) => /*#__PURE__*/React.createElement(FaceMaterial, _extends({
    key: index,
    index: index,
    hover: hover === index
  }, props))), /*#__PURE__*/React.createElement("boxGeometry", null));
};

const EdgeCube = ({
  onClick,
  dimensions,
  position,
  hoverColor = colors.hover
}) => {
  const {
    tweenCamera,
    raycast
  } = useGizmoContext();
  const [hover, setHover] = React.useState(false);

  const handlePointerOut = e => {
    e.stopPropagation();
    setHover(false);
  };

  const handlePointerOver = e => {
    e.stopPropagation();
    setHover(true);
  };

  const handleClick = e => {
    e.stopPropagation();
    tweenCamera(position);
  };

  return /*#__PURE__*/React.createElement("mesh", {
    scale: 1.01,
    position: position,
    raycast: raycast,
    onPointerOver: handlePointerOver,
    onPointerOut: handlePointerOut,
    onClick: onClick || handleClick
  }, /*#__PURE__*/React.createElement("meshBasicMaterial", {
    color: hover ? hoverColor : 'white',
    transparent: true,
    opacity: 0.6,
    visible: hover
  }), /*#__PURE__*/React.createElement("boxGeometry", {
    args: dimensions
  }));
};

const GizmoViewcube = props => {
  return /*#__PURE__*/React.createElement("group", {
    scale: [60, 60, 60]
  }, /*#__PURE__*/React.createElement(FaceCube, props), edges.map((edge, index) => /*#__PURE__*/React.createElement(EdgeCube, _extends({
    key: index,
    position: edge,
    dimensions: edgeDimensions[index]
  }, props))), corners.map((corner, index) => /*#__PURE__*/React.createElement(EdgeCube, _extends({
    key: index,
    position: corner,
    dimensions: cornerDimensions
  }, props))), /*#__PURE__*/React.createElement("ambientLight", {
    intensity: 0.5
  }), /*#__PURE__*/React.createElement("pointLight", {
    position: [10, 10, 10],
    intensity: 0.5
  }));
};

export { GizmoViewcube };
