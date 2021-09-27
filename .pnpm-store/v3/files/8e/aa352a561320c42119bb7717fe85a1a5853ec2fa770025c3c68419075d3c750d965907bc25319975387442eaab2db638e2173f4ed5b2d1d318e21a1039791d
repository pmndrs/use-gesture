'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var THREE = require('three');
var React = require('react');
var create = require('zustand');
var shallow = require('zustand/shallow');
var Reconciler = require('react-reconciler');
var scheduler = require('scheduler');
var useAsset = require('use-asset');
var mergeRefs = require('react-merge-refs');
var useMeasure = require('react-use-measure');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var create__default = /*#__PURE__*/_interopDefault(create);
var shallow__default = /*#__PURE__*/_interopDefault(shallow);
var Reconciler__default = /*#__PURE__*/_interopDefault(Reconciler);
var mergeRefs__default = /*#__PURE__*/_interopDefault(mergeRefs);
var useMeasure__default = /*#__PURE__*/_interopDefault(useMeasure);

var threeTypes = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const is = {
  obj: a => a === Object(a) && !is.arr(a) && typeof a !== 'function',
  fun: a => typeof a === 'function',
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === void 0,
  arr: a => Array.isArray(a),

  equ(a, b) {
    // Wrong type or one of the two undefined, doesn't match
    if (typeof a !== typeof b || !!a !== !!b) return false; // Atomic, just compare a against b

    if (is.str(a) || is.num(a) || is.obj(a)) return a === b; // Array, shallow compare first to see if it's a match

    if (is.arr(a) && a == b) return true; // Last resort, go through keys

    let i;

    for (i in a) if (!(i in b)) return false;

    for (i in b) if (a[i] !== b[i]) return false;

    return is.und(i) ? a === b : true;
  }

};

function makeId(event) {
  return (event.eventObject || event.object).uuid + '/' + event.index;
}

function removeInteractivity(store, object) {
  const {
    internal
  } = store.getState(); // Removes every trace of an object from the data store

  internal.interaction = internal.interaction.filter(o => o !== object);
  internal.initialHits = internal.initialHits.filter(o => o !== object);
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
    }
  });
}
function createEvents(store) {
  const temp = new THREE__namespace.Vector3();
  /** Sets up defaultRaycaster */

  function prepareRay(event) {
    var _raycaster$computeOff;

    const state = store.getState();
    const {
      raycaster,
      mouse,
      camera,
      size
    } = state; // https://github.com/pmndrs/react-three-fiber/pull/782
    // Events trigger outside of canvas when moved

    const {
      offsetX,
      offsetY
    } = (_raycaster$computeOff = raycaster.computeOffsets == null ? void 0 : raycaster.computeOffsets(event, state)) != null ? _raycaster$computeOff : event;
    const {
      width,
      height
    } = size;
    mouse.set(offsetX / width * 2 - 1, -(offsetY / height) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
  }
  /** Calculates delta */


  function calculateDistance(event) {
    const {
      internal
    } = store.getState();
    const dx = event.offsetX - internal.initialClick[0];
    const dy = event.offsetY - internal.initialClick[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  /** Returns true if an instance has a valid pointer-event registered, this excludes scroll, clicks etc */


  function filterPointerEvents(objects) {
    return objects.filter(obj => ['Move', 'Over', 'Enter', 'Out', 'Leave'].some(name => {
      var _r3f$handlers;

      return (_r3f$handlers = obj.__r3f.handlers) == null ? void 0 : _r3f$handlers['onPointer' + name];
    }));
  }

  function intersect(filter) {
    const state = store.getState();
    const {
      raycaster,
      internal
    } = state; // Skip event handling when noEvents is set

    if (!raycaster.enabled) return [];
    const seen = new Set();
    const intersections = []; // Allow callers to eliminate event objects

    const eventsObjects = filter ? filter(internal.interaction) : internal.interaction; // Intersect known handler objects and filter against duplicates

    let intersects = raycaster.intersectObjects(eventsObjects, true).filter(item => {
      const id = makeId(item);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    }); // https://github.com/mrdoob/three.js/issues/16031
    // Allow custom userland intersect sort order

    if (raycaster.filter) intersects = raycaster.filter(intersects, state);

    for (const intersect of intersects) {
      let eventObject = intersect.object; // Bubble event up

      while (eventObject) {
        var _r3f;

        const handlers = (_r3f = eventObject.__r3f) == null ? void 0 : _r3f.handlers;
        if (handlers) intersections.push({ ...intersect,
          eventObject
        });
        eventObject = eventObject.parent;
      }
    }

    return intersections;
  }
  /**  Creates filtered intersects and returns an array of positive hits */


  function patchIntersects(intersections, event) {
    const {
      internal
    } = store.getState(); // If the interaction is captured, make all capturing targets  part of the
    // intersect.

    if ('pointerId' in event && internal.capturedMap.has(event.pointerId)) {
      intersections.push(...internal.capturedMap.get(event.pointerId).values());
    }

    return intersections;
  }
  /**  Handles intersections by forwarding them to handlers */


  function handleIntersects(intersections, event, callback) {
    const {
      raycaster,
      mouse,
      camera,
      internal
    } = store.getState(); // If anything has been found, forward it to the event listeners

    if (intersections.length) {
      const unprojectedPoint = temp.set(mouse.x, mouse.y, 0).unproject(camera);
      const delta = event.type === 'click' ? calculateDistance(event) : 0;

      const releasePointerCapture = id => event.target.releasePointerCapture(id);

      const localState = {
        stopped: false
      };

      for (const hit of intersections) {
        const hasPointerCapture = id => {
          var _internal$capturedMap, _internal$capturedMap2;

          return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
        };

        const setPointerCapture = id => {
          if (internal.capturedMap.has(id)) {
            // if the pointerId was previously captured, we add the hit to the
            // event capturedMap.
            internal.capturedMap.get(id).set(hit.eventObject, hit);
          } else {
            // if the pointerId was not previously captured, we create a map
            // containing the hitObject, and the hit. hitObject is used for
            // faster access.
            internal.capturedMap.set(id, new Map([[hit.eventObject, hit]]));
          } // Call the original event now
          event.target.setPointerCapture(id);
        }; // Add native event props


        let extractEventProps = {};

        for (let prop in Object.getPrototypeOf(event)) {
          let property = event[prop]; // Only copy over atomics, leave functions alone as these should be
          // called as event.nativeEvent.fn()

          if (typeof property !== 'function') extractEventProps[prop] = property;
        }

        let raycastEvent = { ...hit,
          ...extractEventProps,
          spaceX: mouse.x,
          spaceY: mouse.y,
          intersections,
          stopped: localState.stopped,
          delta,
          unprojectedPoint,
          ray: raycaster.ray,
          camera: camera,
          // Hijack stopPropagation, which just sets a flag
          stopPropagation: () => {
            // https://github.com/pmndrs/react-three-fiber/issues/596
            // Events are not allowed to stop propagation if the pointer has been captured
            const capturesForPointer = 'pointerId' in event && internal.capturedMap.get(event.pointerId); // We only authorize stopPropagation...

            if ( // ...if this pointer hasn't been captured
            !capturesForPointer || // ... or if the hit object is capturing the pointer
            capturesForPointer.has(hit.eventObject)) {
              raycastEvent.stopped = localState.stopped = true; // Propagation is stopped, remove all other hover records
              // An event handler is only allowed to flush other handlers if it is hovered itself

              if (internal.hovered.size && Array.from(internal.hovered.values()).find(i => i.eventObject === hit.eventObject)) {
                // Objects cannot flush out higher up objects that have already caught the event
                const higher = intersections.slice(0, intersections.indexOf(hit));
                cancelPointer([...higher, hit]);
              }
            }
          },
          // there should be a distinction between target and currentTarget
          target: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          currentTarget: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          sourceEvent: event,
          // deprecated
          nativeEvent: event
        }; // Call subscribers

        callback(raycastEvent); // Event bubbling may be interrupted by stopPropagation

        if (localState.stopped === true) break;
      }
    }

    return intersections;
  }

  function cancelPointer(hits) {
    const {
      internal
    } = store.getState();
    Array.from(internal.hovered.values()).forEach(hoveredObj => {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call onPointerOut and delete the object from the hovered-elements map
      if (!hits.length || !hits.find(hit => hit.object === hoveredObj.object && hit.index === hoveredObj.index)) {
        const eventObject = hoveredObj.eventObject;
        const handlers = eventObject.__r3f.handlers;
        internal.hovered.delete(makeId(hoveredObj));

        if (handlers) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj,
            intersections: hits || []
          };
          handlers.onPointerOut == null ? void 0 : handlers.onPointerOut(data);
          handlers.onPointerLeave == null ? void 0 : handlers.onPointerLeave(data);
        }
      }
    });
  }

  const handlePointer = name => {
    // Deal with cancelation
    switch (name) {
      case 'onPointerLeave':
      case 'onPointerCancel':
        return () => cancelPointer([]);

      case 'onLostPointerCapture':
        return event => {
          if ('pointerId' in event) {
            // this will be a problem if one target releases the pointerId
            // and another one is still keeping it, as the line below
            // indifferently deletes all capturing references.
            store.getState().internal.capturedMap.delete(event.pointerId);
          }

          cancelPointer([]);
        };
    } // Any other pointer goes here ...


    return event => {
      const {
        onPointerMissed,
        internal
      } = store.getState();
      prepareRay(event); // Get fresh intersects

      const isPointerMove = name === 'onPointerMove';
      const filter = isPointerMove ? filterPointerEvents : undefined;
      const hits = patchIntersects(intersect(filter), event); // Take care of unhover

      if (isPointerMove) cancelPointer(hits);
      handleIntersects(hits, event, data => {
        const eventObject = data.eventObject;
        const handlers = eventObject.__r3f.handlers; // Check presence of handlers

        if (!handlers) return;

        if (isPointerMove) {
          // Move event ...
          if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
            // When enter or out is present take care of hover-state
            const id = makeId(data);
            const hoveredItem = internal.hovered.get(id);

            if (!hoveredItem) {
              // If the object wasn't previously hovered, book it and call its handler
              internal.hovered.set(id, data);
              handlers.onPointerOver == null ? void 0 : handlers.onPointerOver(data);
              handlers.onPointerEnter == null ? void 0 : handlers.onPointerEnter(data);
            } else if (hoveredItem.stopped) {
              // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
              data.stopPropagation();
            }
          } // Call mouse move


          handlers.onPointerMove == null ? void 0 : handlers.onPointerMove(data);
        } else {
          // All other events ...
          const handler = handlers == null ? void 0 : handlers[name];

          if (handler) {
            // Forward all events back to their respective handlers with the exception of click events,
            // which must use the initial target
            if (name !== 'onClick' && name !== 'onContextMenu' && name !== 'onDoubleClick' || internal.initialHits.includes(eventObject)) {
              handler(data);
              pointerMissed(event, internal.interaction.filter(object => object !== eventObject));
            }
          }
        }
      }); // Save initial coordinates on pointer-down

      if (name === 'onPointerDown') {
        internal.initialClick = [event.offsetX, event.offsetY];
        internal.initialHits = hits.map(hit => hit.eventObject);
      } // If a click yields no results, pass it back to the user as a miss


      if ((name === 'onClick' || name === 'onContextMenu' || name === 'onDoubleClick') && !hits.length) {
        if (calculateDistance(event) <= 2) {
          pointerMissed(event, internal.interaction);
          if (onPointerMissed) onPointerMissed(event);
        }
      }
    };
  };

  function pointerMissed(event, objects) {
    objects.forEach(object => {
      var _r3f$handlers2;

      return (_r3f$handlers2 = object.__r3f.handlers) == null ? void 0 : _r3f$handlers2.onPointerMissed == null ? void 0 : _r3f$handlers2.onPointerMissed(event);
    });
  }

  return {
    handlePointer
  };
}

// Type guard to tell a store from a portal
const isStore = def => def && !!def.getState;

const getContainer = (container, child) => {
  var _container$__r3f$root, _container$__r3f;

  return {
    // If the container is not a root-store then it must be a THREE.Object3D into which part of the
    // scene is portalled into. Now there can be two variants of this, either that object is part of
    // the regular jsx tree, in which case it already has __r3f with a valid root attached, or it lies
    // outside react, in which case we must take the root of the child that is about to be attached to it.
    root: isStore(container) ? container : (_container$__r3f$root = (_container$__r3f = container.__r3f) == null ? void 0 : _container$__r3f.root) != null ? _container$__r3f$root : child.__r3f.root,
    // The container is the eventual target into which objects are mounted, it has to be a THREE.Object3D
    container: isStore(container) ? container.getState().scene : container
  };
};

const DEFAULT = '__default';
const EMPTY = {};
const FILTER = ['children', 'key', 'ref'];
let catalogue = {};

let extend = objects => void (catalogue = { ...catalogue,
  ...objects
}); // Each object in the scene carries a small LocalState descriptor


function prepare(object, state) {
  const instance = object;

  if (state != null && state.instance || !instance.__r3f) {
    instance.__r3f = {
      root: null,
      memoizedProps: {},
      objects: [],
      ...state
    };
  }

  return object;
}

function createRenderer(roots) {
  function applyProps(instance, newProps, oldProps = {}, accumulative = false) {
    var _instance$__r3f, _root$getState, _instance$__r3f2;

    // Filter equals, events and reserved props
    const localState = (_instance$__r3f = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f : {};
    const root = localState.root;
    const rootState = (_root$getState = root == null ? void 0 : root.getState == null ? void 0 : root.getState()) != null ? _root$getState : {};
    const sameProps = [];
    const handlers = [];
    const newMemoizedProps = {};
    let i = 0;
    Object.entries(newProps).forEach(([key, entry]) => {
      // we don't want children, ref or key in the memoized props
      if (FILTER.indexOf(key) === -1) {
        newMemoizedProps[key] = entry;
      }
    });

    if (localState.memoizedProps && localState.memoizedProps.args) {
      newMemoizedProps.args = localState.memoizedProps.args;
    }

    if (localState.memoizedProps && localState.memoizedProps.attach) {
      newMemoizedProps.attach = localState.memoizedProps.attach;
    }

    if (instance.__r3f) {
      instance.__r3f.memoizedProps = newMemoizedProps;
    }

    let objectKeys = Object.keys(newProps);

    for (i = 0; i < objectKeys.length; i++) {
      if (is.equ(newProps[objectKeys[i]], oldProps[objectKeys[i]])) {
        sameProps.push(objectKeys[i]);
      } // Event-handlers ...
      //   are functions, that
      //   start with "on", and
      //   contain the name "Pointer", "Click", "DoubleClick", "ContextMenu", or "Wheel"


      if (is.fun(newProps[objectKeys[i]]) && /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(objectKeys[i])) {
        handlers.push(objectKeys[i]);
      }
    } // Catch props that existed, but now exist no more ...


    const leftOvers = [];

    if (accumulative) {
      objectKeys = Object.keys(oldProps);

      for (i = 0; i < objectKeys.length; i++) {
        if (!newProps.hasOwnProperty(objectKeys[i])) {
          leftOvers.push(objectKeys[i]);
        }
      }
    }

    const toFilter = [...sameProps, ...FILTER]; // Instances use "object" as a reserved identifier

    if ((_instance$__r3f2 = instance.__r3f) != null && _instance$__r3f2.instance) toFilter.push('object');
    const filteredProps = { ...newProps
    }; // Removes sameProps and reserved props from newProps

    objectKeys = Object.keys(filteredProps);

    for (i = 0; i < objectKeys.length; i++) {
      if (toFilter.indexOf(objectKeys[i]) > -1) {
        delete filteredProps[objectKeys[i]];
      }
    } // Collect all new props


    const filteredPropsEntries = Object.entries(filteredProps); // Prepend left-overs so they can be reset or removed
    // Left-overs must come first!

    for (i = 0; i < leftOvers.length; i++) {
      if (leftOvers[i] !== 'children') {
        filteredPropsEntries.unshift([leftOvers[i], DEFAULT + 'remove']);
      }
    }

    if (filteredPropsEntries.length > 0) {
      filteredPropsEntries.forEach(([key, value]) => {
        if (!handlers.includes(key)) {
          let currentInstance = instance;
          let targetProp = currentInstance[key];

          if (key.includes('-')) {
            const entries = key.split('-');
            targetProp = entries.reduce((acc, key) => acc[key], instance); // If the target is atomic, it forces us to switch the root

            if (!(targetProp && targetProp.set)) {
              const [name, ...reverseEntries] = entries.reverse();
              currentInstance = reverseEntries.reverse().reduce((acc, key) => acc[key], instance);
              key = name;
            }
          } // https://github.com/mrdoob/three.js/issues/21209
          // HMR/fast-refresh relies on the ability to cancel out props, but threejs
          // has no means to do this. Hence we curate a small collection of value-classes
          // with their respective constructor/set arguments
          // For removed props, try to set default values, if possible


          if (value === DEFAULT + 'remove') {
            if (targetProp && targetProp.constructor) {
              // use the prop constructor to find the default it should be
              value = new targetProp.constructor(newMemoizedProps.args);
            } else if (currentInstance.constructor) {
              // create a blank slate of the instance and copy the particular parameter.
              // @ts-ignore
              const defaultClassCall = new currentInstance.constructor(currentInstance.__r3f.memoizedProps.args);
              value = defaultClassCall[targetProp]; // destory the instance

              if (defaultClassCall.dispose) {
                defaultClassCall.dispose();
              }
            } else {
              // instance does not have constructor, just set it to 0
              value = 0;
            }
          } // Special treatment for objects with support for set/copy, and layers


          if (targetProp && targetProp.set && (targetProp.copy || targetProp instanceof THREE__namespace.Layers)) {
            // If value is an array
            if (Array.isArray(value)) {
              if (targetProp.fromArray) {
                targetProp.fromArray(value);
              } else {
                targetProp.set(...value);
              }
            } // Test again target.copy(class) next ...
            else if (targetProp.copy && value && value.constructor && targetProp.constructor.name === value.constructor.name) {
                targetProp.copy(value);
              } // If nothing else fits, just set the single value, ignore undefined
              // https://github.com/react-spring/react-three-fiber/issues/274
              else if (value !== undefined) {
                  const isColor = targetProp instanceof THREE__namespace.Color; // Allow setting array scalars

                  if (!isColor && targetProp.setScalar) targetProp.setScalar(value); // Layers have no copy function, we must therefore copy the mask property
                  else if (targetProp instanceof THREE__namespace.Layers && value instanceof THREE__namespace.Layers) targetProp.mask = value.mask; // Otherwise just set ...
                    else targetProp.set(value); // Auto-convert sRGB colors, for now ...
                  // https://github.com/react-spring/react-three-fiber/issues/344

                  if (!rootState.linear && isColor) targetProp.convertSRGBToLinear();
                } // Else, just overwrite the value

          } else {
            currentInstance[key] = value; // Auto-convert sRGB textures, for now ...
            // https://github.com/react-spring/react-three-fiber/issues/344

            if (!rootState.linear && currentInstance[key] instanceof THREE__namespace.Texture) currentInstance[key].encoding = THREE__namespace.sRGBEncoding;
          }

          invalidateInstance(instance);
        }
      }); // Preemptively delete the instance from the containers interaction

      if (accumulative && root && instance.raycast && localState.handlers) {
        localState.handlers = undefined;
        const index = rootState.internal.interaction.indexOf(instance);
        if (index > -1) rootState.internal.interaction.splice(index, 1);
      } // Prep interaction handlers


      if (handlers.length) {
        if (accumulative && root && instance.raycast) {
          rootState.internal.interaction.push(instance);
        } // Add handlers to the instances handler-map


        localState.handlers = handlers.reduce((acc, key) => ({ ...acc,
          [key]: newProps[key]
        }), {});
      } // Call the update lifecycle when it is being updated, but only when it is part of the scene


      if (instance.parent) updateInstance(instance);
    }
  }

  function invalidateInstance(instance) {
    var _instance$__r3f3, _instance$__r3f3$root;

    const state = (_instance$__r3f3 = instance.__r3f) == null ? void 0 : (_instance$__r3f3$root = _instance$__r3f3.root) == null ? void 0 : _instance$__r3f3$root.getState == null ? void 0 : _instance$__r3f3$root.getState();
    if (state && state.internal.frames === 0) state.invalidate();
  }

  function updateInstance(instance) {
    instance.onUpdate == null ? void 0 : instance.onUpdate(instance);
  }

  function createInstance(type, {
    args = [],
    ...props
  }, root, hostContext, internalInstanceHandle) {
    let name = `${type[0].toUpperCase()}${type.slice(1)}`;
    let instance; // https://github.com/facebook/react/issues/17147
    // Portals do not give us a root, they are themselves treated as a root by the reconciler
    // In order to figure out the actual root we have to climb through fiber internals :(

    if (!isStore(root) && internalInstanceHandle) {
      const fn = node => {
        if (!node.return) return node.stateNode && node.stateNode.containerInfo;else return fn(node.return);
      };

      root = fn(internalInstanceHandle);
    } // Assert that by now we have a valid root


    if (!root || !isStore(root)) throw `No valid root for ${name}!`;

    if (type === 'primitive') {
      if (props.object === undefined) throw `Primitives without 'object' are invalid!`;
      const object = props.object;
      instance = prepare(object, {
        root,
        instance: true
      });
    } else {
      const target = catalogue[name] || THREE__namespace[name];
      if (!target) throw `${name} is not part of the THREE namespace! Did you forget to extend? See: https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#using-3rd-party-objects-declaratively`;
      const isArgsArr = is.arr(args); // Instanciate new object, link it to the root

      instance = prepare(isArgsArr ? new target(...args) : new target(args), {
        root,
        // append memoized props with args so it's not forgotten
        memoizedProps: {
          args: isArgsArr && args.length === 0 ? null : args
        }
      });
    } // Auto-attach geometries and materials


    if (!('attachFns' in props)) {
      if (name.endsWith('Geometry')) {
        props = {
          attach: 'geometry',
          ...props
        };
      } else if (name.endsWith('Material')) {
        props = {
          attach: 'material',
          ...props
        };
      }
    } // It should NOT call onUpdate on object instanciation, because it hasn't been added to the
    // view yet. If the callback relies on references for instance, they won't be ready yet, this is
    // why it passes "true" here


    applyProps(instance, props, {});
    return instance;
  }

  function appendChild(parentInstance, child) {
    let addedAsChild = false;

    if (child) {
      // The attach attribute implies that the object attaches itself on the parent
      if (child.attachArray) {
        if (!is.arr(parentInstance[child.attachArray])) parentInstance[child.attachArray] = [];
        parentInstance[child.attachArray].push(child);
      } else if (child.attachObject) {
        if (!is.obj(parentInstance[child.attachObject[0]])) parentInstance[child.attachObject[0]] = {};
        parentInstance[child.attachObject[0]][child.attachObject[1]] = child;
      } else if (child.attach && !is.fun(child.attach)) {
        parentInstance[child.attach] = child;
      } else if (is.arr(child.attachFns)) {
        const [attachFn] = child.attachFns;

        if (is.str(attachFn) && is.fun(parentInstance[attachFn])) {
          parentInstance[attachFn](child);
        } else if (is.fun(attachFn)) {
          attachFn(child, parentInstance);
        }
      } else if (child.isObject3D) {
        // add in the usual parent-child way
        parentInstance.add(child);
        addedAsChild = true;
      }

      if (!addedAsChild) {
        // This is for anything that used attach, and for non-Object3Ds that don't get attached to props;
        // that is, anything that's a child in React but not a child in the scenegraph.
        parentInstance.__r3f.objects.push(child);

        child.parent = parentInstance;
      }

      updateInstance(child);
      invalidateInstance(child);
    }
  }

  function insertBefore(parentInstance, child, beforeChild) {
    let added = false;

    if (child) {
      if (child.attachArray) {
        const array = parentInstance[child.attachArray];
        if (!is.arr(array)) parentInstance[child.attachArray] = [];
        array.splice(array.indexOf(beforeChild), 0, child);
      } else if (child.attachObject || child.attach && !is.fun(child.attach)) {
        // attach and attachObject don't have an order anyway, so just append
        return appendChild(parentInstance, child);
      } else if (child.isObject3D) {
        child.parent = parentInstance;
        child.dispatchEvent({
          type: 'added'
        });
        const restSiblings = parentInstance.children.filter(sibling => sibling !== child);
        const index = restSiblings.indexOf(beforeChild);
        parentInstance.children = [...restSiblings.slice(0, index), child, ...restSiblings.slice(index)];
        added = true;
      }

      if (!added) {
        parentInstance.__r3f.objects.push(child);

        child.parent = parentInstance;
      }

      updateInstance(child);
      invalidateInstance(child);
    }
  }

  function removeRecursive(array, parent, dispose = false) {
    if (array) [...array].forEach(child => removeChild(parent, child, dispose));
  }

  function removeChild(parentInstance, child, dispose) {
    if (child) {
      var _child$__r3f2;

      if (parentInstance.__r3f.objects) {
        const oldLength = parentInstance.__r3f.objects.length;
        parentInstance.__r3f.objects = parentInstance.__r3f.objects.filter(x => x !== child);
        const newLength = parentInstance.__r3f.objects.length; // was it in the list?

        if (newLength < oldLength) {
          // we had also set this, so we must clear it now
          child.parent = null;
        }
      } // Remove attachment


      if (child.attachArray) {
        parentInstance[child.attachArray] = parentInstance[child.attachArray].filter(x => x !== child);
      } else if (child.attachObject) {
        delete parentInstance[child.attachObject[0]][child.attachObject[1]];
      } else if (child.attach && !is.fun(child.attach)) {
        parentInstance[child.attach] = null;
      } else if (is.arr(child.attachFns)) {
        const [, detachFn] = child.attachFns;

        if (is.str(detachFn) && is.fun(parentInstance[detachFn])) {
          parentInstance[detachFn](child);
        } else if (is.fun(detachFn)) {
          detachFn(child, parentInstance);
        }
      } else if (child.isObject3D) {
        var _child$__r3f;

        parentInstance.remove(child); // Remove interactivity

        if ((_child$__r3f = child.__r3f) != null && _child$__r3f.root) {
          removeInteractivity(child.__r3f.root, child);
        }
      } // Allow objects to bail out of recursive dispose alltogether by passing dispose={null}
      // Never dispose of primitives because their state may be kept outside of React!
      // In order for an object to be able to dispose it has to have
      //   - a dispose method,
      //   - it cannot be an <instance object={...} />
      //   - it cannot be a THREE.Scene, because three has broken it's own api
      //
      // Since disposal is recursive, we can check the optional dispose arg, which will be undefined
      // when the reconciler calls it, but then carry our own check recursively


      const isInstance = (_child$__r3f2 = child.__r3f) == null ? void 0 : _child$__r3f2.instance;
      const shouldDispose = dispose === undefined ? child.dispose !== null && !isInstance : dispose; // Remove nested child objects. Primitives should not have objects and children that are
      // attached to them declaratively ...

      if (!isInstance) {
        var _child$__r3f3;

        removeRecursive((_child$__r3f3 = child.__r3f) == null ? void 0 : _child$__r3f3.objects, child, shouldDispose);
        removeRecursive(child.children, child, shouldDispose);
      } // Remove references


      if (child.__r3f) {
        delete child.__r3f.root;
        delete child.__r3f.objects;
        delete child.__r3f.handlers;
        delete child.__r3f.memoizedProps;
        if (!isInstance) delete child.__r3f;
      } // Dispose item whenever the reconciler feels like it


      if (shouldDispose && child.dispose && child.type !== 'Scene') {
        scheduler.unstable_runWithPriority(scheduler.unstable_IdlePriority, () => child.dispose());
      }

      invalidateInstance(parentInstance);
    }
  }

  function switchInstance(instance, type, newProps, fiber) {
    const parent = instance.parent;
    if (!parent) return;
    const newInstance = createInstance(type, newProps, instance.__r3f.root); // https://github.com/pmndrs/react-three-fiber/issues/1348
    // When args change the instance has to be re-constructed, which then
    // forces r3f to re-parent the children and non-scene objects

    if (instance.children) {
      instance.children.forEach(child => appendChild(newInstance, child));
      instance.children = [];
    }

    instance.__r3f.objects.forEach(child => appendChild(newInstance, child));

    instance.__r3f.objects = [];
    removeChild(parent, instance);
    appendChild(parent, newInstance) // This evil hack switches the react-internal fiber node
    // https://github.com/facebook/react/issues/14983
    // https://github.com/facebook/react/pull/15021
    ;
    [fiber, fiber.alternate].forEach(fiber => {
      if (fiber !== null) {
        fiber.stateNode = newInstance;

        if (fiber.ref) {
          if (typeof fiber.ref === 'function') fiber.ref(newInstance);else fiber.ref.current = newInstance;
        }
      }
    });
  }

  const reconciler = Reconciler__default['default']({
    now: scheduler.unstable_now,
    createInstance,
    removeChild,
    appendChild,
    appendInitialChild: appendChild,
    insertBefore,
    warnsIfNotActing: true,
    supportsMutation: true,
    isPrimaryRenderer: false,
    // @ts-ignore
    scheduleTimeout: is.fun(setTimeout) ? setTimeout : undefined,
    // @ts-ignore
    cancelTimeout: is.fun(clearTimeout) ? clearTimeout : undefined,
    // @ts-ignore
    setTimeout: is.fun(setTimeout) ? setTimeout : undefined,
    // @ts-ignore
    clearTimeout: is.fun(clearTimeout) ? clearTimeout : undefined,
    noTimeout: -1,
    appendChildToContainer: (parentInstance, child) => {
      const {
        container,
        root
      } = getContainer(parentInstance, child); // Link current root to the default scene

      container.__r3f.root = root;
      appendChild(container, child);
    },
    removeChildFromContainer: (parentInstance, child) => {
      const {
        container
      } = getContainer(parentInstance, child);
      removeChild(container, child);
    },
    insertInContainerBefore: (parentInstance, child, beforeChild) => {
      const {
        container
      } = getContainer(parentInstance, child);
      insertBefore(container, child, beforeChild);
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, fiber) {
      if (instance.__r3f.instance && newProps.object && newProps.object !== instance) {
        // <instance object={...} /> where the object reference has changed
        switchInstance(instance, type, newProps, fiber);
      } else {
        // This is a data object, let's extract critical information about it
        const {
          args: argsNew = [],
          ...restNew
        } = newProps;
        const {
          args: argsOld = [],
          ...restOld
        } = oldProps; // If it has new props or arguments, then it needs to be re-instanciated

        const hasNewArgs = argsNew.some((value, index) => is.obj(value) ? Object.entries(value).some(([key, val]) => val !== argsOld[index][key]) : value !== argsOld[index]);

        if (hasNewArgs) {
          // Next we create a new instance and append it again
          switchInstance(instance, type, newProps, fiber);
        } else {
          // Otherwise just overwrite props
          applyProps(instance, restNew, restOld, true);
        }
      }
    },

    hideInstance(instance) {
      if (instance.isObject3D) {
        instance.visible = false;
        invalidateInstance(instance);
      }
    },

    unhideInstance(instance, props) {
      if (instance.isObject3D && props.visible == null || props.visible) {
        instance.visible = true;
        invalidateInstance(instance);
      }
    },

    hideTextInstance() {
      throw new Error('Text is not allowed in the R3F tree.');
    },

    getPublicInstance(instance) {
      // TODO: might fix switchInstance (?)
      return instance;
    },

    getRootHostContext(rootContainer) {
      return EMPTY;
    },

    getChildHostContext(parentHostContext) {
      return EMPTY;
    },

    createTextInstance() {},

    finalizeInitialChildren(instance) {
      // https://github.com/facebook/react/issues/20271
      // Returning true will trigger commitMount
      return !!instance.__r3f.handlers;
    },

    commitMount(instance)
    /*, type, props*/
    {
      // https://github.com/facebook/react/issues/20271
      // This will make sure events are only added once to the central container
      if (instance.raycast && instance.__r3f.handlers) instance.__r3f.root.getState().internal.interaction.push(instance);
    },

    prepareUpdate() {
      return EMPTY;
    },

    shouldDeprioritizeSubtree() {
      return false;
    },

    prepareForCommit() {
      return null;
    },

    preparePortalMount(...args) {// noop
    },

    resetAfterCommit() {// noop
    },

    shouldSetTextContent() {
      return false;
    },

    clearContainer() {
      return false;
    }

  });
  return {
    reconciler,
    applyProps
  };
}

const isRenderer = def => def && !!def.render;
const isOrthographicCamera = def => def && def.isOrthographicCamera;
const context = /*#__PURE__*/React__namespace.createContext(null);

const createStore = (applyProps, invalidate, advance, props) => {
  const {
    gl,
    size,
    shadows = false,
    linear = false,
    flat = false,
    vr = false,
    orthographic = false,
    frameloop = 'always',
    dpr = 1,
    performance,
    clock = new THREE__namespace.Clock(),
    raycaster: raycastOptions,
    camera: cameraOptions,
    onPointerMissed
  } = props; // Set shadowmap

  if (shadows) {
    gl.shadowMap.enabled = true;
    if (typeof shadows === 'object') Object.assign(gl.shadowMap, shadows);else gl.shadowMap.type = THREE__namespace.PCFSoftShadowMap;
  } // Set color management


  if (!linear) {
    if (!flat) gl.toneMapping = THREE__namespace.ACESFilmicToneMapping;
    gl.outputEncoding = THREE__namespace.sRGBEncoding;
  } // clock.elapsedTime is updated using advance(timestamp)


  if (frameloop === 'never') {
    clock.stop();
    clock.elapsedTime = 0;
  }

  const rootState = create__default['default']((set, get) => {
    // Create custom raycaster
    const raycaster = new THREE__namespace.Raycaster();
    const {
      params,
      ...options
    } = raycastOptions || {};
    applyProps(raycaster, {
      enabled: true,
      ...options,
      params: { ...raycaster.params,
        ...params
      }
    }, {}); // Create default camera

    const isCamera = cameraOptions instanceof THREE__namespace.Camera;
    const camera = isCamera ? cameraOptions : orthographic ? new THREE__namespace.OrthographicCamera(0, 0, 0, 0, 0.1, 1000) : new THREE__namespace.PerspectiveCamera(75, 0, 0.1, 1000);

    if (!isCamera) {
      camera.position.z = 5;
      if (cameraOptions) applyProps(camera, cameraOptions, {}); // Always look at center by default

      camera.lookAt(0, 0, 0);
    }

    function setDpr(dpr) {
      return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], window.devicePixelRatio), dpr[1]) : dpr;
    }

    const initialDpr = setDpr(dpr);
    const position = new THREE__namespace.Vector3();
    const defaultTarget = new THREE__namespace.Vector3();

    function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
      const {
        width,
        height
      } = size;
      const aspect = width / height;
      const distance = camera.getWorldPosition(position).distanceTo(target);

      if (isOrthographicCamera(camera)) {
        return {
          width: width / camera.zoom,
          height: height / camera.zoom,
          factor: 1,
          distance,
          aspect
        };
      } else {
        const fov = camera.fov * Math.PI / 180; // convert vertical fov to radians

        const h = 2 * Math.tan(fov / 2) * distance; // visible height

        const w = h * (width / height);
        return {
          width: w,
          height: h,
          factor: width / w,
          distance,
          aspect
        };
      }
    }

    let performanceTimeout = undefined;

    const setPerformanceCurrent = current => set(state => ({
      performance: { ...state.performance,
        current
      }
    }));

    return {
      gl,
      set,
      get,
      invalidate: () => invalidate(get()),
      advance: (timestamp, runGlobalEffects) => advance(timestamp, runGlobalEffects, get()),
      linear,
      flat,
      scene: prepare(new THREE__namespace.Scene()),
      camera,
      controls: null,
      raycaster,
      clock,
      mouse: new THREE__namespace.Vector2(),
      vr,
      frameloop,
      onPointerMissed,
      performance: {
        current: 1,
        min: 0.5,
        max: 1,
        debounce: 200,
        ...performance,
        regress: () => {
          const state = get(); // Clear timeout

          if (performanceTimeout) clearTimeout(performanceTimeout); // Set lower bound performance

          if (state.performance.current !== state.performance.min) setPerformanceCurrent(state.performance.min); // Go back to upper bound performance after a while unless something regresses meanwhile

          performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state.performance.debounce);
        }
      },
      size: {
        width: 0,
        height: 0
      },
      viewport: {
        initialDpr,
        dpr: initialDpr,
        width: 0,
        height: 0,
        aspect: 0,
        distance: 0,
        factor: 0,
        getCurrentViewport
      },
      setSize: (width, height) => {
        const size = {
          width,
          height
        };
        set(state => ({
          size,
          viewport: { ...state.viewport,
            ...getCurrentViewport(camera, defaultTarget, size)
          }
        }));
      },
      setDpr: dpr => set(state => ({
        viewport: { ...state.viewport,
          dpr: setDpr(dpr)
        }
      })),
      events: {
        connected: false
      },
      internal: {
        active: false,
        priority: 0,
        frames: 0,
        lastProps: props,
        interaction: [],
        hovered: new Map(),
        subscribers: [],
        initialClick: [0, 0],
        initialHits: [],
        capturedMap: new Map(),
        subscribe: (ref, priority = 0) => {
          set(({
            internal
          }) => ({
            internal: { ...internal,
              // If this subscription was given a priority, it takes rendering into its own hands
              // For that reason we switch off automatic rendering and increase the manual flag
              // As long as this flag is positive (there could be multiple render subscription)
              // ..there can be no internal rendering at all
              priority: internal.priority + (priority > 0 ? 1 : 0),
              // Register subscriber and sort layers from lowest to highest, meaning,
              // highest priority renders last (on top of the other frames)
              subscribers: [...internal.subscribers, {
                ref,
                priority
              }].sort((a, b) => a.priority - b.priority)
            }
          }));
          return () => {
            set(({
              internal
            }) => ({
              internal: { ...internal,
                // Decrease manual flag if this subscription had a priority
                priority: internal.priority - (priority > 0 ? 1 : 0),
                // Remove subscriber from list
                subscribers: internal.subscribers.filter(s => s.ref !== ref)
              }
            }));
          };
        }
      }
    };
  }); // Resize camera and renderer on changes to size and pixelratio

  rootState.subscribe(() => {
    const {
      camera,
      size,
      viewport,
      internal
    } = rootState.getState(); // https://github.com/pmndrs/react-three-fiber/issues/92
    // Do not mess with the camera if it belongs to the user

    if (!(internal.lastProps.camera instanceof THREE__namespace.Camera)) {
      if (isOrthographicCamera(camera)) {
        camera.left = size.width / -2;
        camera.right = size.width / 2;
        camera.top = size.height / 2;
        camera.bottom = size.height / -2;
      } else {
        camera.aspect = size.width / size.height;
      }

      camera.updateProjectionMatrix(); // https://github.com/pmndrs/react-three-fiber/issues/178
      // Update matrix world since the renderer is a frame late

      camera.updateMatrixWorld();
    } // Update renderer


    gl.setPixelRatio(viewport.dpr);
    gl.setSize(size.width, size.height);
  }, state => [state.viewport.dpr, state.size], shallow__default['default']);
  const state = rootState.getState(); // Update size

  if (size) state.setSize(size.width, size.height); // Invalidate on any change

  rootState.subscribe(state => invalidate(state)); // Return root state

  return rootState;
};

function createSubs(callback, subs) {
  const index = subs.length;
  subs.push(callback);
  return () => void subs.splice(index, 1);
}

let i;
let globalEffects = [];
let globalAfterEffects = [];
let globalTailEffects = [];
const addEffect = callback => createSubs(callback, globalEffects);
const addAfterEffect = callback => createSubs(callback, globalAfterEffects);
const addTail = callback => createSubs(callback, globalTailEffects);

function run(effects, timestamp) {
  for (i = 0; i < effects.length; i++) effects[i](timestamp);
}

function render$1(timestamp, state) {
  // Run local effects
  let delta = state.clock.getDelta(); // In frameloop='never' mode, clock times are updated using the provided timestamp

  if (state.frameloop === 'never' && typeof timestamp === 'number') {
    delta = timestamp - state.clock.elapsedTime;
    state.clock.oldTime = state.clock.elapsedTime;
    state.clock.elapsedTime = timestamp;
  } // Call subscribers (useFrame)


  for (i = 0; i < state.internal.subscribers.length; i++) state.internal.subscribers[i].ref.current(state, delta); // Render content


  if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera); // Decrease frame count

  state.internal.frames = Math.max(0, state.internal.frames - 1);
  return state.frameloop === 'always' ? 1 : state.internal.frames;
}

function createLoop(roots) {
  let running = false;
  let repeat;

  function loop(timestamp) {
    running = true;
    repeat = 0; // Run effects

    run(globalEffects, timestamp); // Render all roots

    roots.forEach(root => {
      const state = root.store.getState(); // If the frameloop is invalidated, do not run another frame

      if (state.internal.active && (state.frameloop === 'always' || state.internal.frames > 0)) repeat += render$1(timestamp, state);
    }); // Run after-effects

    run(globalAfterEffects, timestamp); // Keep on looping if anything invalidates the frameloop

    if (repeat > 0) return requestAnimationFrame(loop); // Tail call effects, they are called when rendering stops
    else run(globalTailEffects, timestamp); // Flag end of operation

    running = false;
  }

  function invalidate(state) {
    if (!state) return roots.forEach(root => invalidate(root.store.getState()));
    if (state.vr || !state.internal.active || state.frameloop === 'never') return; // Increase frames, do not go higher than 60

    state.internal.frames = Math.min(60, state.internal.frames + 1); // If the render-loop isn't active, start it

    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }

  function advance(timestamp, runGlobalEffects = true, state) {
    if (runGlobalEffects) run(globalEffects, timestamp);
    if (!state) roots.forEach(root => render$1(timestamp, root.store.getState()));else render$1(timestamp, state);
    if (runGlobalEffects) run(globalAfterEffects, timestamp);
  }

  return {
    loop,
    invalidate,
    advance
  };
}

function createPointerEvents(store) {
  const {
    handlePointer
  } = createEvents(store);
  const names = {
    onClick: ['click', false],
    onContextMenu: ['contextmenu', false],
    onDoubleClick: ['dblclick', false],
    onWheel: ['wheel', true],
    onPointerDown: ['pointerdown', true],
    onPointerUp: ['pointerup', true],
    onPointerLeave: ['pointerleave', true],
    onPointerMove: ['pointermove', true],
    onPointerCancel: ['pointercancel', true],
    onLostPointerCapture: ['lostpointercapture', true]
  };
  return {
    connected: false,
    handlers: Object.keys(names).reduce((acc, key) => ({ ...acc,
      [key]: handlePointer(key)
    }), {}),
    connect: target => {
      var _events$handlers;

      const {
        set,
        events
      } = store.getState();
      events.disconnect == null ? void 0 : events.disconnect();
      set(state => ({
        events: { ...state.events,
          connected: target
        }
      }));
      Object.entries((_events$handlers = events == null ? void 0 : events.handlers) != null ? _events$handlers : []).forEach(([name, event]) => {
        const [eventName, passive] = names[name];
        target.addEventListener(eventName, event, {
          passive
        });
      });
    },
    disconnect: () => {
      const {
        set,
        events
      } = store.getState();

      if (events.connected) {
        var _events$handlers2;

        Object.entries((_events$handlers2 = events.handlers) != null ? _events$handlers2 : []).forEach(([name, event]) => {
          if (events && events.connected instanceof HTMLElement) {
            const [eventName] = names[name];
            events.connected.removeEventListener(eventName, event);
          }
        });
        set(state => ({
          events: { ...state.events,
            connected: false
          }
        }));
      }
    }
  };
}

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React__namespace.useLayoutEffect : React__namespace.useEffect;

function Block({
  set
}) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null));
    return () => set(false);
  }, []);
  return null;
}

class ErrorBoundary extends React__namespace.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: false
    };
  }

  componentDidCatch(error) {
    this.props.set(error);
  }

  render() {
    return this.state.error ? null : this.props.children;
  }

}

ErrorBoundary.getDerivedStateFromError = () => ({
  error: true
});

const Canvas = /*#__PURE__*/React__namespace.forwardRef(function Canvas({
  children,
  fallback,
  tabIndex,
  resize,
  id,
  style,
  className,
  events,
  ...props
}, forwardedRef) {
  const [containerRef, size] = useMeasure__default['default']({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = React__namespace.useRef(null);
  const [block, setBlock] = React__namespace.useState(false);
  const [error, setError] = React__namespace.useState(false); // Suspend this component if block is a promise (2nd run)

  if (block) throw block; // Throw exception outwards if anything within canvas throws

  if (error) throw error; // Execute JSX in the reconciler as a layout-effect

  useIsomorphicLayoutEffect(() => {
    if (size.width > 0 && size.height > 0) {
      render( /*#__PURE__*/React__namespace.createElement(ErrorBoundary, {
        set: setError
      }, /*#__PURE__*/React__namespace.createElement(React__namespace.Suspense, {
        fallback: /*#__PURE__*/React__namespace.createElement(Block, {
          set: setBlock
        })
      }, children)), canvasRef.current, { ...props,
        size,
        events: events || createPointerEvents
      });
    }
  }, [size, children]);
  useIsomorphicLayoutEffect(() => {
    const container = canvasRef.current;
    return () => unmountComponentAtNode(container);
  }, []);
  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: containerRef,
    id: id,
    className: className,
    tabIndex: tabIndex,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React__namespace.createElement("canvas", {
    ref: mergeRefs__default['default']([canvasRef, forwardedRef]),
    style: {
      display: 'block'
    }
  }, fallback));
});

function useThree(selector = state => state, equalityFn) {
  const useStore = React__namespace.useContext(context);
  if (!useStore) throw `R3F hooks can only be used within the Canvas component!`;
  return useStore(selector, equalityFn);
}
function useFrame(callback, renderPriority = 0) {
  const {
    subscribe
  } = React__namespace.useContext(context).getState().internal; // Update ref

  const ref = React__namespace.useRef(callback);
  React__namespace.useLayoutEffect(() => void (ref.current = callback), [callback]); // Subscribe/unsub

  React__namespace.useLayoutEffect(() => {
    const unsubscribe = subscribe(ref, renderPriority);
    return () => unsubscribe();
  }, [renderPriority, subscribe]);
  return null;
}

function buildGraph(object) {
  const data = {
    nodes: {},
    materials: {}
  };

  if (object) {
    object.traverse(obj => {
      if (obj.name) {
        data.nodes[obj.name] = obj;
      }

      if (obj.material && !data.materials[obj.material.name]) {
        data.materials[obj.material.name] = obj.material;
      }
    });
  }

  return data;
}

function useGraph(object) {
  return React__namespace.useMemo(() => buildGraph(object), [object]);
}

function loadingFn(extensions, onProgress) {
  return function (Proto, ...input) {
    // Construct new loader and run extensions
    const loader = new Proto();
    if (extensions) extensions(loader); // Go through the urls and load them

    return Promise.all(input.map(input => new Promise((res, reject) => loader.load(input, data => {
      if (data.scene) Object.assign(data, buildGraph(data.scene));
      res(data);
    }, onProgress, error => reject(`Could not load ${input}: ${error.message}`)))));
  };
}

function useLoader(Proto, input, extensions, onProgress) {
  // Use suspense to load async assets
  const keys = Array.isArray(input) ? input : [input];
  const results = useAsset.useAsset(loadingFn(extensions, onProgress), Proto, ...keys); // Return the object/s

  return Array.isArray(input) ? results : results[0];
}

useLoader.preload = function (Proto, input, extensions) {
  const keys = Array.isArray(input) ? input : [input];
  return useAsset.useAsset.preload(loadingFn(extensions), Proto, ...keys);
};

useLoader.clear = function (Proto, input) {
  const keys = Array.isArray(input) ? input : [input];
  return useAsset.useAsset.clear(Proto, ...keys);
};

const roots = new Map();
const modes = ['legacy', 'blocking', 'concurrent'];
const {
  invalidate,
  advance
} = createLoop(roots);
const {
  reconciler,
  applyProps
} = createRenderer();

const createRendererInstance = (gl, canvas) => isRenderer(gl) ? gl : new THREE__namespace.WebGLRenderer({
  powerPreference: 'high-performance',
  canvas: canvas,
  antialias: true,
  alpha: true,
  ...gl
});

function render(element, canvas, {
  gl,
  size,
  mode = modes[1],
  events,
  onCreated,
  ...props
} = {}) {
  var _store;

  // Allow size to take on container bounds initially
  if (!size) {
    var _canvas$parentElement, _canvas$parentElement2, _canvas$parentElement3, _canvas$parentElement4;

    size = {
      width: (_canvas$parentElement = (_canvas$parentElement2 = canvas.parentElement) == null ? void 0 : _canvas$parentElement2.clientWidth) != null ? _canvas$parentElement : 0,
      height: (_canvas$parentElement3 = (_canvas$parentElement4 = canvas.parentElement) == null ? void 0 : _canvas$parentElement4.clientHeight) != null ? _canvas$parentElement3 : 0
    };
  }

  let root = roots.get(canvas);
  let fiber = root == null ? void 0 : root.fiber;
  let store = root == null ? void 0 : root.store;
  let state = (_store = store) == null ? void 0 : _store.getState();

  if (fiber && state) {
    const lastProps = state.internal.lastProps; // When a root was found, see if any fundamental props must be changed or exchanged
    // Check pixelratio

    if (props.dpr !== undefined && !is.equ(lastProps.dpr, props.dpr)) state.setDpr(props.dpr); // Check size

    if (!is.equ(lastProps.size, size)) state.setSize(size.width, size.height); // For some props we want to reset the entire root
    // Changes to the color-space

    const linearChanged = props.linear !== lastProps.linear;

    if (linearChanged) {
      unmountComponentAtNode(canvas);
      fiber = undefined;
    }
  }

  if (!fiber) {
    // If no root has been found, make one
    // Create gl
    const glRenderer = createRendererInstance(gl, canvas); // Enable VR if requested

    if (props.vr) {
      glRenderer.xr.enabled = true;
      glRenderer.setAnimationLoop(timestamp => advance(timestamp, true));
    } // Create store


    store = createStore(applyProps, invalidate, advance, {
      gl: glRenderer,
      size,
      ...props
    });
    const state = store.getState(); // Create renderer

    fiber = reconciler.createContainer(store, modes.indexOf(mode), false, null); // Map it

    roots.set(canvas, {
      fiber,
      store
    }); // Store events internally

    if (events) state.set({
      events: events(store)
    });
  }

  if (store && fiber) {
    reconciler.updateContainer( /*#__PURE__*/React__namespace.createElement(Provider, {
      store: store,
      element: element,
      onCreated: onCreated,
      target: canvas
    }), fiber, null, () => undefined);
    return store;
  } else {
    throw 'Error creating root!';
  }
}

function Provider({
  store,
  element,
  onCreated,
  target
}) {
  React__namespace.useEffect(() => {
    const state = store.getState(); // Flag the canvas active, rendering will now begin

    state.set(state => ({
      internal: { ...state.internal,
        active: true
      }
    })); // Connect events

    state.events.connect == null ? void 0 : state.events.connect(target); // Notifiy that init is completed, the scene graph exists, but nothing has yet rendered

    if (onCreated) onCreated(state);
  }, []);
  return /*#__PURE__*/React__namespace.createElement(context.Provider, {
    value: store
  }, element);
}

function unmountComponentAtNode(canvas, callback) {
  const root = roots.get(canvas);
  const fiber = root == null ? void 0 : root.fiber;

  if (fiber) {
    const state = root == null ? void 0 : root.store.getState();
    if (state) state.internal.active = false;
    reconciler.updateContainer(null, fiber, null, () => {
      if (state) {
        setTimeout(() => {
          var _state$gl, _state$gl$renderLists, _state$gl2;

          state.events.disconnect == null ? void 0 : state.events.disconnect();
          (_state$gl = state.gl) == null ? void 0 : (_state$gl$renderLists = _state$gl.renderLists) == null ? void 0 : _state$gl$renderLists.dispose == null ? void 0 : _state$gl$renderLists.dispose();
          (_state$gl2 = state.gl) == null ? void 0 : _state$gl2.forceContextLoss == null ? void 0 : _state$gl2.forceContextLoss();
          dispose(state);
          roots.delete(canvas);
          if (callback) callback(canvas);
        }, 500);
      }
    });
  }
}

function dispose(obj) {
  if (obj.dispose && obj.type !== 'Scene') obj.dispose();

  for (const p in obj) {
    var _dispose, _ref;
    (_dispose = (_ref = p).dispose) == null ? void 0 : _dispose.call(_ref);
    delete obj[p];
  }
}

const act = reconciler.act;
const hasSymbol = is.fun(Symbol) && Symbol.for;
const REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;

function createPortal(children, container, implementation, key = null) {
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children,
    containerInfo: prepare(container),
    implementation
  };
}

reconciler.injectIntoDevTools({
  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
  rendererPackageName: '@react-three/fiber',
  version: '17.0.2'
});

exports.Canvas = Canvas;
exports.ReactThreeFiber = threeTypes;
exports._roots = roots;
exports.act = act;
exports.addAfterEffect = addAfterEffect;
exports.addEffect = addEffect;
exports.addTail = addTail;
exports.advance = advance;
exports.applyProps = applyProps;
exports.context = context;
exports.createPortal = createPortal;
exports.dispose = dispose;
exports.events = createPointerEvents;
exports.extend = extend;
exports.invalidate = invalidate;
exports.reconciler = reconciler;
exports.render = render;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.useFrame = useFrame;
exports.useGraph = useGraph;
exports.useLoader = useLoader;
exports.useThree = useThree;
