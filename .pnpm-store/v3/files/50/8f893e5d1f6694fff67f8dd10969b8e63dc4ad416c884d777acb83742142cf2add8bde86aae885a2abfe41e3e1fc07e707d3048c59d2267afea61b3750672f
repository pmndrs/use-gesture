import {QuantizationUsage} from "./usage";

var quantizeResult = null;

export function initialize() {
	document.body.ondrop = event=> {
		event.preventDefault();

		var files = event.dataTransfer.files;
		for (var i = 0; i < files.length; i++) {
			processDrag(files[ i ]);
		}
		//readfiles(event.dataTransfer.files);
		console.log(event);
	};

	document.body.ondragover = event=> {
		event.preventDefault();
	};
}

export function update(quantize : boolean) {
	if (quantize) {
		var imageFoldersControl = (<webix.ui.grouplist>$$("image"));
		var selectedId          = imageFoldersControl.getSelectedId(true);
		if (selectedId.length > 0) {
			var node = imageFoldersControl.getItemNode(selectedId[ 0 ]);
			if (node) {
				var img : HTMLImageElement = (<any>node).firstElementChild;

				if (img.tagName === "IMG") {
					var colors                 = parseInt((<webix.ui.richselect>$$("option-colors")).getValue(), 10),
						paletteQuantizerMethod = parseInt((<webix.ui.richselect>$$("option-palette")).getValue(), 10),
						imageQuantizerMethod   = parseInt((<webix.ui.richselect>$$("option-image")).getValue(), 10) - 2,
						colorDistanceMethod    = parseInt((<webix.ui.richselect>$$("option-distance")).getValue(), 10);

					quantizeResult = (new QuantizationUsage()).quantize(img, colors, paletteQuantizerMethod, imageQuantizerMethod, colorDistanceMethod);
				}
			}
		}
	}

	if (quantizeResult) {
		fillClickToCompare(quantizeResult);
		fillOriginalVsQuantized(quantizeResult);
	}
}

function fillOriginalVsQuantized(result) {
	var prefix = "id-imageView2-";
	// CLEANUP
	//container.innerHTML = "";
	$$("imageView2-statistics").getNode().firstElementChild.innerHTML = " (SSIM: " + result.ssim.toFixed(2) + ", Time: " + result.time + " )";

	// DRAW ORIGINAL IMAGE
	var canvas          = QuantizationUsage.drawPixels(result.original, result.original.getWidth());
	canvas.id           = prefix + "original-image";
	canvas.className    = "image-semi-transparent-background";
	//canvas.style.display = "none";
	var container       = $$("imageView2-image-original").getNode().firstElementChild;
	container.innerHTML = "";
	container.appendChild(canvas);

	// DRAW REDUCED/DITHERED IMAGE
	canvas              = QuantizationUsage.drawPixels(result.image, result.image.getWidth());
	canvas.id           = prefix + "reduced-image";
	canvas.className    = "image-semi-transparent-background";
	container           = $$("imageView2-image-quantized").getNode().firstElementChild;
	container.innerHTML = "";
	container.appendChild(canvas);

	// DRAW PALETTE
	canvas              = QuantizationUsage.drawPixels(result.palette.getPointContainer(), 16, 128);
	container           = $$("imageView2-palette").getNode().firstElementChild;
	container.innerHTML = "";
	container.appendChild(canvas);
}

function fillClickToCompare(result) {
	var prefix                                                        = "id-imageView2-";
	// CLEANUP
	$$("imageView1-statistics").getNode().firstElementChild.innerHTML = " (SSIM: " + result.ssim.toFixed(2) + ", Time: " + result.time + " )";

	// DRAW ORIGINAL IMAGE
	var canvasOriginal           = QuantizationUsage.drawPixels(result.original, result.original.getWidth());
	canvasOriginal.id            = prefix + "original-image";
	canvasOriginal.className     = "image-semi-transparent-background";
	canvasOriginal.style.display = "none";
	var container                = $$("imageView1-image").getNode().firstElementChild;
	container.innerHTML          = "";
	container.appendChild(canvasOriginal);

	// DRAW REDUCED/DITHERED IMAGE
	var canvasReduced       = QuantizationUsage.drawPixels(result.image, result.image.getWidth());
	canvasReduced.id        = prefix + "reduced-image";
	canvasReduced.className = "image-semi-transparent-background";
	container               = $$("imageView1-image").getNode().firstElementChild;
	container.appendChild(canvasReduced);

	// Add Container handlers
	container.onmousedown = () => {
		canvasOriginal.style.display = "";
		canvasReduced.style.display  = "none";
	};
	container.onmouseup   = () => {
		canvasOriginal.style.display = "none";
		canvasReduced.style.display  = "";
	};

	// DRAW PALETTE
	var canvasPalette   = QuantizationUsage.drawPixels(result.palette.getPointContainer(), 16, 128);
	container           = $$("imageView1-palette").getNode().firstElementChild;
	container.innerHTML = "";
	container.appendChild(canvasPalette);
}

function processDrag(file) {
	var reader    = new FileReader();
	reader.onload = function (event) {
		(<webix.ui.grouplist>$$("image")).add({
			id      : 'image-' + file.name,
			dataUrl : (<any>event.target).result
		});
	};

	reader.readAsDataURL(file);
}
