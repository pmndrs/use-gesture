import * as iq from "../../../../dist/iq";

export class QuantizationUsage {
	static drawPixels(pointContainer, width0, width1? : number) {
		var idxi8  = pointContainer.toUint8Array(),
			idxi32 = new Uint32Array(idxi8.buffer);

		width1 = width1 || width0;

		var can        = document.createElement("canvas"),
			can2       = document.createElement("canvas"),
			ctx : any  = can.getContext("2d"),
			ctx2 : any = can2.getContext("2d");

		can.width   = width0;
		can.height  = Math.ceil(idxi32.length / width0);
		can2.width  = width1;
		can2.height = Math.ceil(can.height * width1 / width0);

		ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;
		ctx2.imageSmoothingEnabled = ctx2.mozImageSmoothingEnabled = ctx2.webkitImageSmoothingEnabled = ctx2.msImageSmoothingEnabled = false;

		var imgd = ctx.createImageData(can.width, can.height);

		if (QuantizationUsage._typeOf(imgd.data) == "CanvasPixelArray") {
			var data = imgd.data;
			for (var i = 0, len = data.length; i < len; ++i) {
				data[ i ] = idxi8[ i ];
			}
		}
		else {
			var buf32 = new Uint32Array(imgd.data.buffer);
			buf32.set(idxi32);
		}

		ctx.putImageData(imgd, 0, 0);

		ctx2.drawImage(can, 0, 0, can2.width, can2.height);

		return can2;
	}

	private static _typeOf(val) {
		return Object.prototype.toString.call(val).slice(8, -1);
	}

	private _timeMark(title, callback) {
		var start = Date.now();
		callback();
		console.log(title + ": " + (Date.now() - start));
	}

	private _baseName(src) {
		return src.split("/").pop().split(".");
	}

	public quantize(img : HTMLImageElement, optionColors, optionPaletteQuantizer, optionImageDithering, optionColorDistance) : {palette : iq.utils.Palette, image : iq.utils.PointContainer, time : number, ssim : number, original : iq.utils.PointContainer} {
		var pointBuffer : iq.utils.PointContainer,
			originalPointBuffer : iq.utils.PointContainer,
			paletteQuantizer : iq.palette.IPaletteQuantizer,
			id = this._baseName(img.src)[ 0 ],
			palette : iq.utils.Palette,
			image : iq.utils.PointContainer;

		pointBuffer         = iq.utils.PointContainer.fromHTMLImageElement(img);
		originalPointBuffer = pointBuffer.clone();

		var time = Date.now();

		console.log("image = " + id);
		this._timeMark("...sample", () => {
			var distance : iq.distance.AbstractDistanceCalculator = this._getColorDistanceCalculator(optionColorDistance);

			switch (optionPaletteQuantizer) {
				case 1:
					paletteQuantizer = new iq.palette.NeuQuant(distance, optionColors);
					break;
				case 2:
					paletteQuantizer = new iq.palette.RGBQuant(distance, optionColors);
					break;
				case 3:
					paletteQuantizer = new iq.palette.WuQuant(distance, optionColors);
					break;
				case 4:
					paletteQuantizer = new iq.palette.NeuQuantFloat(distance, optionColors);
					break;
			}
			paletteQuantizer.sample(pointBuffer);
		});

		this._timeMark("...palette", function () {
			palette = paletteQuantizer.quantize();
		});

		this._timeMark("...dither", () => {
			var distance : iq.distance.AbstractDistanceCalculator = this._getColorDistanceCalculator(optionColorDistance);

			var imageQuantizer;
			if (optionImageDithering === -1) {
				imageQuantizer = new iq.image.NearestColor(distance);
			} else if (optionImageDithering === 9) {
				imageQuantizer = new iq.image.ErrorDiffusionRiemersma(distance);
			} else {
				imageQuantizer = new iq.image.ErrorDiffusionArray(distance, optionImageDithering, true, 0, false);
			}

			image = imageQuantizer.quantize(pointBuffer, palette);
		});

		time     = Date.now() - time;
		var ssim = new iq.quality.SSIM().compare(originalPointBuffer, pointBuffer);

		this._checkImageAndPalette(image, palette, optionColors);

		return {
			original : originalPointBuffer,
			image    : image,
			palette  : palette,
			time     : time,
			ssim     : ssim
		};
	}

	private _getColorDistanceCalculator(option) : iq.distance.AbstractDistanceCalculator {
		switch (option) {
			case 1:
				return new iq.distance.Euclidean();
			case 2:
				return new iq.distance.Manhattan();
			case 3:
				return new iq.distance.CIEDE2000();
			case 4:
				return new iq.distance.CIE94Textiles();
			case 5:
				return new iq.distance.CIE94GraphicArts();
			case 6:
				return new iq.distance.EuclideanRgbQuantWOAlpha();
			case 7:
				return new iq.distance.EuclideanRgbQuantWithAlpha();
			case 8:
				return new iq.distance.ManhattanSRGB();
			case 9:
				return new iq.distance.CMETRIC();
			case 10:
				return new iq.distance.PNGQUANT();
			case 11:
				return new iq.distance.ManhattanNommyde();
		}
	}

	private _checkImageAndPalette(image : iq.utils.PointContainer, palette : iq.utils.Palette, colors : number) : void {
		// check palette
		if (palette.getPointContainer().getPointArray().length > colors) {
			throw new Error("Palette contains more colors than allowed");
		}

		// check image
		image.getPointArray().forEach((point : iq.utils.Point) => {
			if (!palette.has(point)) {
				throw new Error("Image contains color not in palette: " + point.r + "," + point.g + "," + point.b + "," + point.a);
			}
		});
	}
}

