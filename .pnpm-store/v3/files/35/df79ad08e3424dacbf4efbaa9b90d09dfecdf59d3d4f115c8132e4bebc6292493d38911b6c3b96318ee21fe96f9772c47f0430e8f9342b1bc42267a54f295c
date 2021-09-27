/** @license React v0.26.2
 * react-reconciler-reflection.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';function h(b){for(var a="https://reactjs.org/docs/error-decoder.html?invariant="+b,c=1;c<arguments.length;c++)a+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+b+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}require("react");
function l(b){var a=b,c=b;if(b.alternate)for(;a.return;)a=a.return;else{b=a;do a=b,0!==(a.flags&1026)&&(c=a.return),b=a.return;while(b)}return 3===a.tag?c:null}function m(b){if(l(b)!==b)throw Error(h(188));}
function n(b){var a=b.alternate;if(!a){a=l(b);if(null===a)throw Error(h(188));return a!==b?null:b}for(var c=b,e=a;;){var f=c.return;if(null===f)break;var d=f.alternate;if(null===d){e=f.return;if(null!==e){c=e;continue}break}if(f.child===d.child){for(d=f.child;d;){if(d===c)return m(f),b;if(d===e)return m(f),a;d=d.sibling}throw Error(h(188));}if(c.return!==e.return)c=f,e=d;else{for(var k=!1,g=f.child;g;){if(g===c){k=!0;c=f;e=d;break}if(g===e){k=!0;e=f;c=d;break}g=g.sibling}if(!k){for(g=d.child;g;){if(g===
c){k=!0;c=d;e=f;break}if(g===e){k=!0;e=d;c=f;break}g=g.sibling}if(!k)throw Error(h(189));}}if(c.alternate!==e)throw Error(h(190));}if(3!==c.tag)throw Error(h(188));return c.stateNode.current===c?b:a}exports.doesFiberContain=function(b,a){for(var c=b.alternate;null!==a;){if(a===b||a===c)return!0;a=a.return}return!1};exports.findCurrentFiberUsingSlowPath=n;
exports.findCurrentHostFiber=function(b){b=n(b);if(!b)return null;for(var a=b;;){if(5===a.tag||6===a.tag)return a;if(a.child)a.child.return=a,a=a.child;else{if(a===b)break;for(;!a.sibling;){if(!a.return||a.return===b)return null;a=a.return}a.sibling.return=a.return;a=a.sibling}}return null};
exports.findCurrentHostFiberWithNoPortals=function(b){b=n(b);if(!b)return null;for(var a=b;;){if(5===a.tag||6===a.tag)return a;if(a.child&&4!==a.tag)a.child.return=a,a=a.child;else{if(a===b)break;for(;!a.sibling;){if(!a.return||a.return===b)return null;a=a.return}a.sibling.return=a.return;a=a.sibling}}return null};exports.getContainerFromFiber=function(b){return 3===b.tag?b.stateNode.containerInfo:null};exports.getNearestMountedFiber=l;
exports.getSuspenseInstanceFromFiber=function(b){if(13===b.tag){var a=b.memoizedState;null===a&&(b=b.alternate,null!==b&&(a=b.memoizedState));if(null!==a)return a.dehydrated}return null};exports.isFiberMounted=function(b){return l(b)===b};exports.isFiberSuspenseAndTimedOut=function(b){var a=b.memoizedState;return 13===b.tag&&null!==a&&null===a.dehydrated};exports.isMounted=function(b){return(b=b._reactInternals)?l(b)===b:!1};
