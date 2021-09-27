import {imageData} from "../../data/imageList";
import {update} from "../../controller/ui";

export var imageFoldersPanel = {
	id       : "image",
	view     : "grouplist",
	type     : {
		height : 84
	},
	//autoheight : true,
	//height : 800,
	template : function (obj : any) {
		if (obj.dataUrl) {
			return "<img style=\"height: 84px\" src=\"" + obj.dataUrl + "\"/>"
		} else if (obj.folder && obj.file) {
			return "<img style=\"height: 84px\" src=\"images/" + obj.folder + "/" + obj.file + "\"/>"
		} else {
			return "<div style=\"line-height: 84px\">" + obj.value + "</div>";
		}
	},
	select   : true,
	//scroll : false,
	data     : imageData,
	on       : {
		"onafterselect" : (id) => {
			update(true);
		}
	},
	ready    : function () {  //select USA
		//this.select(0);
	}

	/*
	 select:true,
	 on:{ "onafterselect":country_selected },
	 type:{ height: 84 },
	 ready:function(){  //select USA
	 this.select(6);
	 }
	 */
};


