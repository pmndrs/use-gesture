var sys = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
	console.log("State: " + this.readyState);

	if (this.readyState == 4) {
		console.log("Complete.\nBody length: " + this.responseText.length);
		console.log("Body:\n" + this.responseText);
	}
};

xhr.open("GET", "http://driverdan.com");
xhr.send();
