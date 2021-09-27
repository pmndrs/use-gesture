function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { MAX_QUERY_SIZE } from './constants';
import { SearchIcon } from './icons/SearchIcon';
import { ResetIcon } from './icons/ResetIcon';
import { LoadingIcon } from './icons/LoadingIcon';
export function SearchBox(props) {
  var _props$getFormProps = props.getFormProps({
    inputElement: props.inputRef.current
  }),
      onSubmit = _props$getFormProps.onSubmit,
      onReset = _props$getFormProps.onReset;

  return React.createElement(React.Fragment, null, React.createElement("form", {
    action: "",
    role: "search",
    noValidate: true,
    className: "DocSearch-Form",
    onSubmit: onSubmit,
    onReset: onReset
  }, React.createElement("label", _extends({
    className: "DocSearch-MagnifierLabel"
  }, props.getLabelProps()), React.createElement(SearchIcon, null)), React.createElement("div", {
    className: "DocSearch-LoadingIndicator"
  }, React.createElement(LoadingIcon, null)), React.createElement("input", _extends({
    className: "DocSearch-Input",
    ref: props.inputRef
  }, props.getInputProps({
    autoFocus: props.autoFocus,
    inputElement: props.inputRef.current,
    type: 'search',
    maxLength: MAX_QUERY_SIZE
  }))), React.createElement("button", {
    type: "reset",
    title: "Clear the query",
    className: "DocSearch-Reset",
    hidden: !props.state.query,
    onClick: onReset
  }, React.createElement(ResetIcon, null))), React.createElement("button", {
    className: "DocSearch-Cancel",
    onClick: props.onClose
  }, "Cancel"));
}