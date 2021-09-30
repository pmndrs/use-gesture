var React = require('react');
var commonTags = require('common-tags');

var generateHtml = function generateHtml(str) {
  return {
    __html: commonTags.oneLine(str)
  };
};

function onRenderBody(_ref) {
  var setHeadComponents = _ref.setHeadComponents;
  setHeadComponents([React.createElement("style", {
    key: "gatsby-image-style",
    dangerouslySetInnerHTML: generateHtml(".gatsby-image-wrapper{position:relative;overflow:hidden}.gatsby-image-wrapper img{bottom:0;height:100%;left:0;margin:0;max-width:none;padding:0;position:absolute;right:0;top:0;width:100%;object-fit:cover}.gatsby-image-wrapper [data-main-image]{opacity:0;transform:translateZ(0);transition:opacity .25s linear;will-change:opacity}.gatsby-image-wrapper-constrained{display:inline-block;vertical-align:top}")
  }), React.createElement("noscript", {
    key: "gatsby-image-style-noscript",
    dangerouslySetInnerHTML: generateHtml("<style>" + ".gatsby-image-wrapper noscript [data-main-image]{opacity:1!important}.gatsby-image-wrapper [data-placeholder-image]{opacity:0!important}" + "</style>")
  }), React.createElement("script", {
    key: "gatsby-image-style-script",
    type: "module",
    dangerouslySetInnerHTML: generateHtml("const e=\"undefined\"!=typeof HTMLImageElement&&\"loading\"in HTMLImageElement.prototype;e&&document.body.addEventListener(\"load\",(function(e){if(void 0===e.target.dataset.mainImage)return;if(void 0===e.target.dataset.gatsbyImageSsr)return;const t=e.target;let a=null,n=t;for(;null===a&&n;)void 0!==n.parentNode.dataset.gatsbyImageWrapper&&(a=n.parentNode),n=n.parentNode;const o=a.querySelector(\"[data-placeholder-image]\"),r=new Image;r.src=t.currentSrc,r.decode().catch((()=>{})).then((()=>{t.style.opacity=1,o&&(o.style.opacity=0,o.style.transition=\"opacity 500ms linear\")}))}),!0);")
  })]);
}

exports.onRenderBody = onRenderBody;
