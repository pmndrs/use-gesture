var imageList = {
	"alpha"     : [
		"children-745674_1920.png",
		"alpha.png",
		"AlphaBall.png",
		"AlphaEdge.png",
		"alphatest.png",
		"cherries-realistic.png",
		"dice-trans.png",
		"pnggrad16rgba.png",
		"tumblr_moyw62RyQo1s5jjtzo1_500.png",
		"Wilber-huge-alpha.png"
	],
	"gradients" : [
		"colorpan2.png",
		"dithgrads.png",
		"grad_default.png",
		"grad.png",
		"grad5.png",
		"grad6.png",
		"grad7.png",
		"grad8.png",
		"pnggrad8rgb.png",
		"sculptmap.png"
	],
	"graphics"  : [
		"baseball.jpg",
		"bebop.jpg",
		"minecraft.png",
		"penguins.png",
		"pool.png",
		"rose.png",
		"smb3.png",
		"super1.png",
		"super2.png"
	],
	"photos1"   : [
		"biking.jpg",
		"bluff.jpg",
		"cloudplane.jpg",
		"compcube.jpg",
		"fishie2.jpg",
		"kitteh1.jpg",
		"medusa.jpg",
		"pheasant.jpg",
		"photoman.jpg",
		"rainbow.jpg",
		"redpanda.jpg"
	],
	"photos2"   : [
		"book-shelf-349934_1920.jpg",
		"children-602977_1920.png",
		"old-books-436498_1920.png",
		"pens-93177_1920.png",
		"baby.jpg",
		"chopsuey.jpg",
		"fish.jpg",
		"kitteh2.jpg",
		"quantfrog.png",
		"treefrog.jpg",
		"quantfrog_small.png"
	]
};

var result = [];

for (var folder in imageList) {
	if (imageList.hasOwnProperty(folder)) {
		var folderData = {
			id    : "image-list-" + folder,
			open  : true,
			value : folder,
			data  : []
		};

		imageList[ folder ].forEach(file => {
			folderData.data.push({
				file   : file,
				folder : folder,
				id     : "image-list-" + folder + "-" + file
			})
		});

		result.push(folderData);
	}
}

export var imageData = result;

