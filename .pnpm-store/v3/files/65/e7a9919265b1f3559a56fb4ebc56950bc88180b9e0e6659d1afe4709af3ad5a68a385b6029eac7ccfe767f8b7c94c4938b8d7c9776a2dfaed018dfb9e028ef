import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { CanvasTexture } from 'three';
import { useGizmoContext } from './GizmoHelper.js';

function Axis({
  color,
  rotation
}) {
  return /*#__PURE__*/React.createElement("group", {
    rotation: rotation
  }, /*#__PURE__*/React.createElement("mesh", {
    position: [0.4, 0, 0]
  }, /*#__PURE__*/React.createElement("boxGeometry", {
    args: [0.8, 0.05, 0.05]
  }), /*#__PURE__*/React.createElement("meshBasicMaterial", {
    color: color,
    toneMapped: false
  })));
}

function AxisHead({
  onClick,
  font,
  disabled,
  arcStyle,
  label,
  labelColor,
  ...props
}) {
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(32, 32, 16, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = arcStyle;
    context.fill();

    if (label) {
      context.font = font;
      context.textAlign = 'center';
      context.fillStyle = labelColor;
      context.fillText(label, 32, 41);
    }

    return new CanvasTexture(canvas);
  }, [arcStyle, label, labelColor, font]);
  const [active, setActive] = React.useState(false);
  const scale = (label ? 1 : 0.75) * (active ? 1.2 : 1);

  const handlePointerOver = e => {
    e.stopPropagation();
    setActive(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    setActive(false);
  };

  return /*#__PURE__*/React.createElement("sprite", _extends({
    scale: scale,
    onPointerOver: !disabled ? handlePointerOver : undefined,
    onPointerOut: !disabled ? onClick || handlePointerOut : undefined
  }, props), /*#__PURE__*/React.createElement("spriteMaterial", {
    map: texture,
    alphaTest: 0.3,
    opacity: label ? 1 : 0.75,
    toneMapped: false
  }));
}

const GizmoViewport = ({
  hideNegativeAxes,
  disabled,
  font = '18px Inter var, Arial, sans-serif',
  axisColors = ['#ff3653', '#0adb50', '#2c8fdf'],
  labelColor = '#000',
  onClick,
  ...props
}) => {
  const [colorX, colorY, colorZ] = axisColors;
  const {
    tweenCamera,
    raycast
  } = useGizmoContext();
  const axisHeadProps = {
    font,
    disabled,
    labelColor,
    raycast,
    onClick,
    onPointerDown: !disabled ? e => {
      tweenCamera(e.object.position);
      e.stopPropagation();
    } : undefined
  };
  return /*#__PURE__*/React.createElement("group", _extends({
    scale: 40
  }, props), /*#__PURE__*/React.createElement(Axis, {
    color: colorX,
    rotation: [0, 0, 0]
  }), /*#__PURE__*/React.createElement(Axis, {
    color: colorY,
    rotation: [0, 0, Math.PI / 2]
  }), /*#__PURE__*/React.createElement(Axis, {
    color: colorZ,
    rotation: [0, -Math.PI / 2, 0]
  }), /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorX,
    position: [1, 0, 0],
    label: "X"
  }, axisHeadProps)), /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorY,
    position: [0, 1, 0],
    label: "Y"
  }, axisHeadProps)), /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorZ,
    position: [0, 0, 1],
    label: "Z"
  }, axisHeadProps)), !hideNegativeAxes && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorX,
    position: [-1, 0, 0]
  }, axisHeadProps)), /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorY,
    position: [0, -1, 0]
  }, axisHeadProps)), /*#__PURE__*/React.createElement(AxisHead, _extends({
    arcStyle: colorZ,
    position: [0, 0, -1]
  }, axisHeadProps))), /*#__PURE__*/React.createElement("ambientLight", {
    intensity: 0.5
  }), /*#__PURE__*/React.createElement("pointLight", {
    position: [10, 10, 10],
    intensity: 0.5
  }));
};

export { GizmoViewport };
