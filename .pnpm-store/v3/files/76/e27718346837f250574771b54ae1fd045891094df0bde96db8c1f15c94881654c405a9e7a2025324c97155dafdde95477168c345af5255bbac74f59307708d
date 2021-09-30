///<reference path="../lib/webix/webix.d.ts"/>
import {initialize} from "./controller/ui";
import {leftPanel} from "./ui/leftPanel/leftPanel";
import {rightPanel} from "./ui/rightPanel/rightPanel";

webix.ready(function () {

	webix.ui({
		type : "line",
		cols : [
			{
				width  : 500,
				header : "Settings & Folders", headerHeight : 45,
				body   : leftPanel
			},
			{ view : "resizer" },
			rightPanel
		]
	});

	initialize();

});
