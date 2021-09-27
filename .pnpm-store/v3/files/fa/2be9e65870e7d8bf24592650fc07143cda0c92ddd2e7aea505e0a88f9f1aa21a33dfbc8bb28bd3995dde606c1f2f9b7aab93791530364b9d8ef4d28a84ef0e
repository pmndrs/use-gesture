/*----------------------------------------
 * objectFitPolyfill 2.3.5
 *
 * Basic, no-frills version -
 * Defaults to object-fit: cover and object-position: 50% 50%
 *
 * Made by Constance Chen
 * Released under the ISC license
 *
 * https://github.com/constancecchen/object-fit-polyfill
 *--------------------------------------*/

(function() {
  'use strict';

  // if the page is being rendered on the server, don't continue
  if (typeof window === 'undefined') return;

  // Workaround for Edge 16-18, which only implemented object-fit for <img> tags
  var edgeMatch = window.navigator.userAgent.match(/Edge\/(\d{2})\./);
  var edgeVersion = edgeMatch ? parseInt(edgeMatch[1], 10) : null;
  var edgePartialSupport = edgeVersion
    ? edgeVersion >= 16 && edgeVersion <= 18
    : false;

  // If the browser does support object-fit, we don't need to continue
  var hasSupport = 'objectFit' in document.documentElement.style !== false;
  if (hasSupport && !edgePartialSupport) {
    window.objectFitPolyfill = function() {
      return false;
    };
    return;
  }

  /**
   * Check the container's parent element to make sure it will
   * correctly handle and clip absolutely positioned children
   *
   * @param {node} $container - parent element
   */
  var checkParentContainer = function($container) {
    var styles = window.getComputedStyle($container, null);
    var position = styles.getPropertyValue('position');
    var overflow = styles.getPropertyValue('overflow');
    var display = styles.getPropertyValue('display');

    if (!position || position === 'static') {
      $container.style.position = 'relative';
    }
    if (overflow !== 'hidden') {
      $container.style.overflow = 'hidden';
    }
    // Guesstimating that people want the parent to act like full width/height wrapper here.
    // Mostly attempts to target <picture> elements, which default to inline.
    if (!display || display === 'inline') {
      $container.style.display = 'block';
    }
    if ($container.clientHeight === 0) {
      $container.style.height = '100%';
    }

    // Add a CSS class hook, in case people need to override styles for any reason.
    if ($container.className.indexOf('object-fit-polyfill') === -1) {
      $container.className = $container.className + ' object-fit-polyfill';
    }
  };

  /**
   * Check for pre-set max-width/height, min-width/height,
   * positioning, or margins, which can mess up image calculations
   *
   * @param {node} $media - img/video element
   */
  var checkMediaProperties = function($media) {
    var styles = window.getComputedStyle($media, null);
    var constraints = {
      'max-width': 'none',
      'max-height': 'none',
      'min-width': '0px',
      'min-height': '0px',
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto',
      'margin-top': '0px',
      'margin-right': '0px',
      'margin-bottom': '0px',
      'margin-left': '0px',
    };

    for (var property in constraints) {
      var constraint = styles.getPropertyValue(property);

      if (constraint !== constraints[property]) {
        $media.style[property] = constraints[property];
      }
    }
  };

  /**
   * Calculate & set object-fit
   *
   * @param {node} $media - img/video/picture element
   */
  var objectFit = function($media) {
    // If necessary, make the parent container work with absolutely positioned elements
    var $container = $media.parentNode;
    checkParentContainer($container);

    // Check for any pre-set CSS which could mess up image calculations
    checkMediaProperties($media);

    // Mathematically figure out which side needs covering, and add CSS positioning & centering
    $media.style.position = 'absolute';
    $media.style.height = '100%';
    $media.style.width = 'auto';

    if ($media.clientWidth > $container.clientWidth) {
      $media.style.top = '0';
      $media.style.marginTop = '0';
      $media.style.left = '50%';
      $media.style.marginLeft = $media.clientWidth / -2 + 'px';
    } else {
      $media.style.width = '100%';
      $media.style.height = 'auto';
      $media.style.left = '0';
      $media.style.marginLeft = '0';
      $media.style.top = '50%';
      $media.style.marginTop = $media.clientHeight / -2 + 'px';
    }
  };

  /**
   * Initialize plugin
   *
   * @param {node} media - Optional specific DOM node(s) to be polyfilled
   */
  var objectFitPolyfill = function(media) {
    if (typeof media === 'undefined' || media instanceof Event) {
      // If left blank, or a default event, all media on the page will be polyfilled.
      media = document.querySelectorAll('[data-object-fit]');
    } else if (media && media.nodeName) {
      // If it's a single node, wrap it in an array so it works.
      media = [media];
    } else if (typeof media === 'object' && media.length && media[0].nodeName) {
      // If it's an array of DOM nodes (e.g. a jQuery selector), it's fine as-is.
      media = media;
    } else {
      // Otherwise, if it's invalid or an incorrect type, return false to let people know.
      return false;
    }

    for (var i = 0; i < media.length; i++) {
      if (!media[i].nodeName) continue;

      var mediaType = media[i].nodeName.toLowerCase();

      if (mediaType === 'img') {
        if (edgePartialSupport) continue; // Edge supports object-fit for images (but nothing else), so no need to polyfill

        if (media[i].complete) {
          objectFit(media[i]);
        } else {
          media[i].addEventListener('load', function() {
            objectFit(this);
          });
        }
      } else if (mediaType === 'video') {
        if (media[i].readyState > 0) {
          objectFit(media[i]);
        } else {
          media[i].addEventListener('loadedmetadata', function() {
            objectFit(this);
          });
        }
      } else {
        objectFit(media[i]);
      }
    }

    return true;
  };

  if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', objectFitPolyfill);
  } else {
    // `DOMContentLoaded` has already fired
    objectFitPolyfill();
  }

  window.addEventListener('resize', objectFitPolyfill);

  window.objectFitPolyfill = objectFitPolyfill;
})();
