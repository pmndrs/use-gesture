var expect      = require('chai').expect,
	dataLab2RGB = require('./dataLab2RGB.json'),
	dataRGB2Lab = require('./dataRGB2Lab.json'),
	iq          = require('../../../dist/iq'),
	rgb2lab     = iq.conversion.rgb2lab,
	lab2rgb     = iq.conversion.lab2rgb;

describe('lab2xyz and back', function () {

	dataLab2RGB.forEach(item => {
		it(`Colors: Lab = ${item.Lab.L}, ${item.Lab.a}, ${item.Lab.b}`, () => {
			var xyz = iq.conversion.lab2xyz(item.Lab.L, item.Lab.a, item.Lab.b),
				lab = iq.conversion.xyz2lab(xyz.x, xyz.y, xyz.z);
			expect(deepRound(lab, 4)).to.be.deep.equal(deepRound(item.Lab, 4));
		});
	});
});

describe('rgb2xyz and back', function () {

	dataRGB2Lab.forEach(item => {
		it(`Colors: rgb = ${item.rgb.r}, ${item.rgb.g}, ${item.rgb.b}`, () => {
			var xyz = iq.conversion.rgb2xyz(item.rgb.r, item.rgb.g, item.rgb.b),
				rgb = iq.conversion.xyz2rgb(xyz.x, xyz.y, xyz.z);
			expect(deepRound(rgb, 4)).to.be.deep.equal(deepRound(item.rgb, 4));
		});
	});
});

describe('xyz2lab and back', function () {

	dataLab2RGB.forEach(item => {
		const xyz = iq.conversion.lab2xyz(item.Lab.L, item.Lab.a, item.Lab.b);
		it(`Colors: xyz = ${xyz.x}, ${xyz.y}, ${xyz.z}`, () => {
			var lab    = iq.conversion.xyz2lab(xyz.x, xyz.y, xyz.z),
				newXyz = iq.conversion.lab2xyz(lab.L, lab.a, lab.b);
			expect(deepRound(newXyz, 4)).to.be.deep.equal(deepRound(xyz, 4));
		});
	});
});

describe('xyz2rgb and back', function () {

	dataRGB2Lab.forEach(item => {
		const xyz = iq.conversion.rgb2xyz(item.rgb.r, item.rgb.g, item.rgb.b);
		it(`Colors: xyz = ${xyz.x}, ${xyz.y}, ${xyz.z}`, () => {
			var rgb    = iq.conversion.xyz2rgb(xyz.x, xyz.y, xyz.z),
				newXyz = iq.conversion.rgb2xyz(rgb.r, rgb.g, rgb.b);
			expect(deepRound(newXyz, 4)).to.be.deep.equal(deepRound(xyz, 4));
		});
	});
});

describe('rgb2lab', function () {

	dataRGB2Lab.forEach(item => {
		const Lab = item.Lab,
			  rgb = item.rgb;

		it(`Colors: Lab = ${Lab.L}, ${Lab.a}, ${Lab.b}, rgb = ${rgb.r}, ${rgb.g}, ${rgb.b}`, () => {
			var labCalculated = rgb2lab(rgb.r, rgb.g, rgb.b);
			expect(deepRound(labCalculated, 4)).to.be.deep.equal(deepRound(Lab, 4));
		});
	});
});

describe('lab2rgb', function () {

	dataLab2RGB.forEach(item => {
		const Lab = item.Lab,
			  rgb = item.rgb;
		it(`Colors: Lab = ${Lab.L}, ${Lab.a}, ${Lab.b}, rgb = ${rgb.r}, ${rgb.g}, ${rgb.b}`, () => {
			var rgbCalculated = lab2rgb(Lab.L, Lab.a, Lab.b);
			expect(deepRound(rgbCalculated, 4)).to.be.deep.equal(deepRound(rgb, 4));
		});
	});
});

function deepRound (obj, digitsAfterPoint) {
	Object.keys(obj).forEach(propertyName => {
		var n          = obj[propertyName],
			multiplier = Math.pow(10, digitsAfterPoint);
		obj[propertyName] = Math.round(n * multiplier) / multiplier;
	})
}

function roundLike (n, likeThisValue) {
	var s             = likeThisValue.toString(),
		pointPosition = s.indexOf('.');

	if (pointPosition < 0) {
		return Math.round(n);
	}

	var digitsAfterPoint = s.length - pointPosition - 1,
		multiplier       = Math.pow(10, digitsAfterPoint);
	return Math.round(n * multiplier) / multiplier;
}

