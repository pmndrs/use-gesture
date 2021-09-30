/*
@license
webix UI v.2.4.5
This software is allowed to use under GPL or you need to obtain Commercial License 
 to use it in non-GPL project. Please contact sales@webix.com for details
*/
if (!window.webix) 
	webix={};

//check some rule, show message as error if rule is not correct
webix.assert = function(test, message){
	if (!test){
		webix.assert_error(message);
	}
};

webix.assert_config = function(obj){
	var coll = obj.cells || obj.rows || obj.elements || obj.cols;
	if (coll)
		for (var i=0; i<coll.length; i++)
			if (coll[i] === null || typeof coll[i] === "undefined")
				webix.assert_error("You have trailing comma or Null element in collection's configuration");
};

webix.assert_error = function(message){
	//jshint debug:true
	webix.log("error",message);
	if (webix.message && typeof message == "string")
		webix.message({ type:"debug", text:message, expire:-1 });
	if (webix.debug !== false)
		debugger;
};

//entry point for analitic scripts
webix.assert_core_ready = function(){
	if (window.webix_on_core_ready)	
		window.webix_on_core_ready();
};

webix.assert_level = 0;

webix.assert_level_in = function(){
	webix.assert_level++;
	if (webix.assert_level == 100)
		webix.assert_error("Attempt to copy object with self reference");
};
webix.assert_level_out = function(){
	webix.assert_level--;
};

/*
	Common helpers
*/
webix.version="2.4.5";
webix.codebase="./";
webix.name = "core";

//coding helpers
webix.clone = function(source){
	var f = webix.clone._function;
	f.prototype = source;
	return new f();
};
webix.clone._function = function(){};

//copies methods and properties from source to the target
webix.extend = function(base, source, force){
	webix.assert(base,"Invalid mixing target");
	webix.assert(source,"Invalid mixing source");

	if (base._webix_proto_wait){
		webix.PowerArray.insertAt.call(base._webix_proto_wait, source,1);
		return base;
	}
	
	//copy methods, overwrite existing ones in case of conflict
	for (var method in source)
		if (!base[method] || force)
			base[method] = source[method];
		
	//in case of defaults - preffer top one
	if (source.defaults)
		webix.extend(base.defaults, source.defaults);
	
	//if source object has init code - call init against target
	if (source.$init)	
		source.$init.call(base);
				
	return base;	
};

//copies methods and properties from source to the target from all levels
webix.copy = function(source){
	webix.assert(source,"Invalid mixing target");
	webix.assert_level_in();

	var target;
	if(arguments.length>1){
		target = arguments[0];
		source = arguments[1];
	} else 
		target = (webix.isArray(source)?[]:{});

	for (var method in source){
		if(source[method] && typeof source[method] == "object" && !webix.isDate(source[method])){
			target[method] = (webix.isArray(source[method])?[]:{});
			webix.copy(target[method],source[method]);
		}else{
			target[method] = source[method];
		}
	}

	webix.assert_level_out();
	return target;	
};


webix.single = function(source){ 
	var instance = null;
	var t = function(config){
		if (!instance)
			instance = new source({});
			
		if (instance._reinit)
			instance._reinit.apply(instance, arguments);
		return instance;
	};
	return t;
};

webix.protoUI = function(){
	if (webix.debug_proto)
		webix.log("UI registered: "+arguments[0].name);
		
	var origins = arguments;
	var selfname = origins[0].name;
	
	var t = function(data){
		if (!t)
			return webix.ui[selfname].prototype;

		var origins = t._webix_proto_wait;
		if (origins){
			var params = [origins[0]];
			
			for (var i=1; i < origins.length; i++){
				params[i] = origins[i];

				if (params[i]._webix_proto_wait)
					params[i] = params[i].call(webix, params[i].name);

				if (params[i].prototype && params[i].prototype.name)
					webix.ui[params[i].prototype.name] = params[i];
			}
			webix.ui[selfname] = webix.proto.apply(webix, params);

			if (t._webix_type_wait)	
				for (var i=0; i < t._webix_type_wait.length; i++)
					webix.type(webix.ui[selfname], t._webix_type_wait[i]);
				
			t = origins = null;	
		}
			
		if (this != webix)
			return new webix.ui[selfname](data);
		else 
			return webix.ui[selfname];
	};
	t._webix_proto_wait = Array.prototype.slice.call(arguments, 0);
	return (webix.ui[selfname]=t);
};

webix.proto = function(){
	 
	if (webix.debug_proto)
		webix.log("Proto chain:"+arguments[0].name+"["+arguments.length+"]");

	var origins = arguments;
	var compilation = origins[0];
	var has_constructor = !!compilation.$init;
	var construct = [];
	
	webix.assert(compilation,"Invalid mixing target");
		
	for (var i=origins.length-1; i>0; i--) {
		webix.assert(origins[i],"Invalid mixing source");
		if (typeof origins[i]== "function")
			origins[i]=origins[i].prototype;
		if (origins[i].$init) 
			construct.push(origins[i].$init);
		if (origins[i].defaults){ 
			var defaults = origins[i].defaults;
			if (!compilation.defaults)
				compilation.defaults = {};
			for (var def in defaults)
				if (webix.isUndefined(compilation.defaults[def]))
					compilation.defaults[def] = defaults[def];
		}
		if (origins[i].type && compilation.type){
			for (var def in origins[i].type)
				if (!compilation.type[def])
					compilation.type[def] = origins[i].type[def];
		}
			
		for (var key in origins[i]){
			if (!compilation[key] && compilation[key] !== false)
				compilation[key] = origins[i][key];
		}
	}
	
	if (has_constructor)
		construct.push(compilation.$init);
	
	
	compilation.$init = function(){
		for (var i=0; i<construct.length; i++)
			construct[i].apply(this, arguments);
	};
	if (compilation.$skin)
		compilation.$skin();

	var result = function(config){
		this.$ready=[];
		webix.assert(this.$init,"object without init method");
		this.$init(config);
		if (this._parseSettings)
			this._parseSettings(config, this.defaults);
		for (var i=0; i < this.$ready.length; i++)
			this.$ready[i].call(this);
	};
	result.prototype = compilation;
	
	compilation = origins = null;
	return result;
};
//creates function with specified "this" pointer
webix.bind=function(functor, object){ 
	return function(){ return functor.apply(object,arguments); };  
};

//loads module from external js file
webix.require=function(module, callback, master){
	if (webix.require.disabled){
		if (callback)
			callback.call(master||this);
		return;
	}

	if (typeof module != "string"){
		var count = module.length||0;
		var callback_origin = callback;

		if (!count){
			for (var file in module) count++;
			callback = function(){ count--; if (count === 0) callback_origin.apply(this, arguments); };
			for (var file in module)
				webix.require(file, callback, master);
		} else {
			callback = function(){
				if (count){
					count--;
					webix.require(module[module.length - count - 1], callback, master);
				} else 
					return callback_origin.apply(this, arguments);
				
			};
			callback();
		}
		return;
	}

	if (webix._modules[module] !== true){
		if (module.substr(-4) == ".css") {
			var link = webix.html.create("LINK",{  type:"text/css", rel:"stylesheet", href:webix.codebase+module});
			document.head.appendChild(link);
			if (callback)
				callback.call(master||window);
			return;
		}

		var step = arguments[4];

		//load and exec the required module
		if (!callback){
			//sync mode
			webix.exec( webix.ajax().sync().get(webix.codebase+module).responseText );
			webix._modules[module]=true;
		} else {

			if (!webix._modules[module]){	//first call
				webix._modules[module] = [[callback, master]];

				webix.ajax(webix.codebase+module, function(text){
					webix.exec(text);	//evaluate code
					var calls = webix._modules[module];	//callbacks
					webix._modules[module] = true;
					for (var i=0; i<calls.length; i++)
						calls[i][0].call(calls[i][1]||window, !i);	//first callback get true as parameter
				});
			} else	//module already loading
				webix._modules[module].push([callback, master]);
		}
	} else 
		if (callback) callback.call(master);
};
webix._modules = {};	//hash of already loaded modules

//evaluate javascript code in the global scoope
webix.exec=function(code){
	if (window.execScript)	//special handling for IE
		window.execScript(code);
	else window.eval(code);
};

webix.wrap = function(code, wrap){
	if (!code) return wrap;
	return function(){
		var result = code.apply(this, arguments);
		wrap.apply(this,arguments);
		return result;
	};
};

//check === undefined
webix.isUndefined=function(a){
	return typeof a == "undefined";
};
//delay call to after-render time
webix.delay=function(method, obj, params, delay){
	return window.setTimeout(function(){
		if(!(obj&&obj.$destructed)){
			var ret = method.apply(obj,(params||[]));
			method = obj = params = null;
			return ret;
		}
	},delay||1);
};

webix.once=function(method){
	var flag = true;
	return function(){
		if (flag){
			flag = false;
			method.apply(this, arguments);
		}
	};
};

//common helpers

//generates unique ID (unique per window, nog GUID)
webix.uid = function(){
	if (!this._seed) this._seed=(new Date()).valueOf();	//init seed with timestemp
	this._seed++;
	return this._seed;
};
//resolve ID as html object
webix.toNode = function(node){
	if (typeof node == "string") return document.getElementById(node);
	return node;
};
//adds extra methods for the array
webix.toArray = function(array){ 
	return webix.extend((array||[]),webix.PowerArray, true);
};
//resolve function name
webix.toFunctor=function(str, scope){ 
	if (typeof(str)=="string"){
		var method = str.replace("()","");
		if (scope && scope[method]) return scope[method];
		return window[method] || eval(str);
	}
	return str;
};
/*checks where an object is instance of Array*/
webix.isArray = function(obj) {
	return Array.isArray?Array.isArray(obj):(Object.prototype.toString.call(obj) === '[object Array]');
};
webix.isDate = function(obj){
	return obj instanceof Date;
};

//dom helpers

//hash of attached events
webix._events = {};
//attach event to the DOM element
webix.event=function(node,event,handler,master){
	node = webix.toNode(node);
	webix.assert(node, "Invalid node as target for webix.event");
	
	var id = webix.uid();
	if (master) 
		handler=webix.bind(handler,master);	
		
	webix._events[id]=[node,event,handler];	//store event info, for detaching
		
	//use IE's of FF's way of event's attaching
	if (node.addEventListener)
		node.addEventListener(event, handler, arguments[4]);
	else if (node.attachEvent)
		node.attachEvent("on"+event, webix._events[id][2] = function(){
			return handler.apply(node, arguments);	//IE8 fix
		});

	return id;	//return id of newly created event, can be used in eventRemove
};

//remove previously attached event
webix.eventRemove=function(id){
	
	if (!id) return;
	webix.assert(this._events[id],"Removing non-existing event");
		
	var ev = webix._events[id];
	//browser specific event removing
	if (ev[0].removeEventListener)
		ev[0].removeEventListener(ev[1],ev[2],false);
	else if (ev[0].detachEvent)
		ev[0].detachEvent("on"+ev[1],ev[2]);

		
	delete this._events[id];	//delete all traces
};


//debugger helpers
//anything starting from error or log will be removed during code compression

//add message in the log
webix.log = function(type,message,details){
	if (arguments.length == 1){
		message = type;
		type = "log";
	}
	/*jsl:ignore*/
	if (window.console && window.console.log){
		type=type.toLowerCase();
		if (window.console[type])
			window.console[type](message||"unknown error");
		else
			window.console.log(type +": "+message);

		if (details) 
			window.console.log(details);
	}	
	/*jsl:end*/
};
//register rendering time from call point 
webix.log_full_time = function(name){
	webix._start_time_log = new Date();
	webix.log("Timing start ["+name+"]");
	window.setTimeout(function(){
		var time = new Date();
		webix.log("Timing end ["+name+"]:"+(time.valueOf()-webix._start_time_log.valueOf())/1000+"s");
	},1);
};
//register execution time from call point
webix.log_time = function(name){
	var fname = "_start_time_log"+name;
	if (!webix[fname]){
		webix[fname] = new Date();
		webix.log("Info","Timing start ["+name+"]");
	} else {
		var time = new Date();
		webix.log("Info","Timing end ["+name+"]:"+(time.valueOf()-webix[fname].valueOf())/1000+"s");
		webix[fname] = null;
	}
};
webix.debug_code = function(code){
	code.call(webix);
};
//event system
webix.EventSystem={
	$init:function(){
		if (!this._evs_events){
			this._evs_events = {};		//hash of event handlers, name => handler
			this._evs_handlers = {};	//hash of event handlers, ID => handler
			this._evs_map = {};
		}
	},
	//temporary block event triggering
	blockEvent : function(){
		this._evs_events._block = true;
	},
	//re-enable event triggering
	unblockEvent : function(){
		this._evs_events._block = false;
	},
	mapEvent:function(map){
		webix.extend(this._evs_map, map, true);
	},
	on_setter:function(config){
		if(config){
			for(var i in config){
				var method = webix.toFunctor(config[i], this.$scope);
				var sub = i.indexOf("->");
				if (sub !== -1){
					this[i.substr(0,sub)].attachEvent(i.substr(sub+2), webix.bind(method, this));
				} else
					this.attachEvent(i, method);
			}
		}
	},
	//trigger event
	callEvent:function(type,params){
		if (this._evs_events._block) return true;
		
		type = type.toLowerCase();
		var event_stack =this._evs_events[type.toLowerCase()];	//all events for provided name
		var return_value = true;

		if (webix.log)
			if ((webix.debug || this.debug) && !webix.debug_blacklist[type])	//can slowdown a lot
				webix.log("info","["+this.name+"@"+((this._settings||{}).id)+"] event:"+type,params);
		
		if (event_stack)
			for(var i=0; i<event_stack.length; i++){
				/*
					Call events one by one
					If any event return false - result of whole event will be false
					Handlers which are not returning anything - counted as positive
				*/
				if (event_stack[i].apply(this,(params||[]))===false) return_value=false;
			}
		if (this._evs_map[type]){
			var target = this._evs_map[type];
			target.$eventSource = this;
			if (!target.callEvent(type,params))
				return_value =	false;
			target.$eventSource = null;
		}

		return return_value;
	},
	//assign handler for some named event
	attachEvent:function(type,functor,id){
		webix.assert(functor, "Invalid event handler for "+type);

		type=type.toLowerCase();
		
		id=id||webix.uid(); //ID can be used for detachEvent
		functor = webix.toFunctor(functor, this.$scope);	//functor can be a name of method

		var event_stack=this._evs_events[type]||webix.toArray();
		//save new event handler
		if (arguments[3])
			event_stack.unshift(functor);
		else
			event_stack.push(functor);
		this._evs_events[type]=event_stack;
		this._evs_handlers[id]={ f:functor,t:type };
		
		return id;
	},
	//remove event handler
	detachEvent:function(id){
		if(!this._evs_handlers[id]){
			return;
		}
		var type=this._evs_handlers[id].t;
		var functor=this._evs_handlers[id].f;
		
		//remove from all collections
		var event_stack=this._evs_events[type];
		event_stack.remove(functor);
		delete this._evs_handlers[id];
	},
	hasEvent:function(type){
		type=type.toLowerCase();
		var stack = this._evs_events[type];
		return (stack && stack.length) ? true : false;
	}
};

webix.extend(webix, webix.EventSystem, true);

//array helper
//can be used by webix.toArray()
webix.PowerArray={
	//remove element at specified position
	removeAt:function(pos,len){
		if (pos>=0) this.splice(pos,(len||1));
	},
	//find element in collection and remove it 
	remove:function(value){
		this.removeAt(this.find(value));
	},	
	//add element to collection at specific position
	insertAt:function(data,pos){
		if (!pos && pos!==0)	//add to the end by default
			this.push(data);
		else {	
			var b = this.splice(pos,(this.length-pos));
			this[pos] = data;
			this.push.apply(this,b); //reconstruct array without loosing this pointer
		}
	},
	//return index of element, -1 if it doesn't exists
	find:function(data){ 
		for (var i=0; i<this.length; i++) 
			if (data==this[i]) return i;
		return -1; 
	},
	//execute some method for each element of array
	each:function(functor,master){
		for (var i=0; i < this.length; i++)
			functor.call((master||this),this[i]);
	},
	//create new array from source, by using results of functor 
	map:function(functor,master){
		for (var i=0; i < this.length; i++)
			this[i]=functor.call((master||this),this[i]);
		return this;
	}, 
	filter:function(functor, master){
		for (var i=0; i < this.length; i++)
			if (!functor.call((master||this),this[i])){
				this.splice(i,1);
				i--;
			}
		return this;
	}
};

webix.env = {};

// webix.env.transform 
// webix.env.transition
(function(){
	webix.env.strict = !!window.webix_strict;

	if (navigator.userAgent.indexOf("Mobile")!=-1 || navigator.userAgent.indexOf("Windows Phone")!=-1)
		webix.env.mobile = true;
	if (webix.env.mobile || navigator.userAgent.indexOf("iPad")!=-1 || navigator.userAgent.indexOf("Android")!=-1)
		webix.env.touch = true;
	if (navigator.userAgent.indexOf('Opera')!=-1)
		webix.env.isOpera=true;
	else{
		//very rough detection, but it is enough for current goals
		webix.env.isIE=!!document.all || (navigator.userAgent.indexOf("Trident") !== -1);
		if (webix.env.isIE){
			var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
			if (version == 8)
				webix.env.isIE8 = true;
		}
		webix.env.isFF=(navigator.userAgent.indexOf("Firefox")!=-1);
		webix.env.isWebKit=(navigator.userAgent.indexOf("KHTML")!=-1);
		webix.env.isSafari=webix.env.isWebKit && (navigator.userAgent.indexOf('Mac')!=-1);
	}

	if(navigator.userAgent.toLowerCase().indexOf("android")!=-1){
		webix.env.isAndroid = true;
		if(navigator.userAgent.toLowerCase().indexOf("trident")){
			webix.env.isAndroid = false;
			webix.env.isIEMobile = true;
		}
	}

	webix.env.transform = false;
	webix.env.transition = false;

	var found_index = -1;
	var js_list =  ['', 'webkit', 'Moz', 'O', 'ms'];
	var css_list = ['', '-webkit-', '-Moz-', '-o-', '-ms-'];

	
	var d = document.createElement("DIV");
	for (var j=0; j < js_list.length; j++) {
		var name = js_list[j] ? (js_list[j]+"Transform") : "transform";
		if(typeof d.style[name] != 'undefined'){
			found_index = j;
			break;
		}
	}


	if (found_index > -1){
		webix.env.cssPrefix = css_list[found_index];
		var jp = webix.env.jsPrefix = js_list[found_index];

		webix.env.transform = jp ? jp+"Transform" : "transform";
		webix.env.transition = jp ? jp+"Transition" : "transition";
		webix.env.transitionDuration = jp ? jp+"TransitionDuration" : "transitionDuration";

		d.style[webix.env.transform] = "translate3d(0,0,0)";
		webix.env.translate = (d.style[webix.env.transform])?"translate3d":"translate";
		webix.env.transitionEnd = ((webix.env.cssPrefix == '-Moz-')?"transitionend":(jp ? jp+"TransitionEnd" : "transitionend"));
	}

})();


webix.env.svg = (function(){
	return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
})();


//html helpers
webix.html={
	_native_on_selectstart:0,
	denySelect:function(){
		if (!webix._native_on_selectstart)
			webix._native_on_selectstart = document.onselectstart;
		document.onselectstart = webix.html.stopEvent;
	},
	allowSelect:function(){
		if (webix._native_on_selectstart !== 0){
			document.onselectstart = webix._native_on_selectstart||null;
		}
		webix._native_on_selectstart = 0;

	},
	index:function(node){
		var k=0;
		//must be =, it is not a comparation!
		while ((node = node.previousSibling)) k++;
		return k;
	},
	_style_cache:{},
	createCss:function(rule){
		var text = "";
		for (var key in rule)
			text+= key+":"+rule[key]+";";
		
		var name = this._style_cache[text];
		if (!name){
			name = "s"+webix.uid();
			this.addStyle("."+name+"{"+text+"}");
			this._style_cache[text] = name;
		}
		return name;
	},
	addStyle:function(rule){
		var style = this._style_element;
		if(!style){
			style = this._style_element = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.setAttribute("media", "screen");
			document.getElementsByTagName("head")[0].appendChild(style);
		}
		/*IE8*/
		if (style.styleSheet)
			style.styleSheet.cssText += rule;
		else
			style.appendChild(document.createTextNode(rule));
	},
	create:function(name,attrs,html){
		attrs = attrs || {};
		var node = document.createElement(name);
		for (var attr_name in attrs)
			node.setAttribute(attr_name, attrs[attr_name]);
		if (attrs.style)
			node.style.cssText = attrs.style;
		if (attrs["class"])
			node.className = attrs["class"];
		if (html)
			node.innerHTML=html;
		return node;
	},
	//return node value, different logic for different html elements
	getValue:function(node){
		node = webix.toNode(node);
		if (!node) return "";
		return webix.isUndefined(node.value)?node.innerHTML:node.value;
	},
	//remove html node, can process an array of nodes at once
	remove:function(node){
		if (node instanceof Array)
			for (var i=0; i < node.length; i++)
				this.remove(node[i]);
		else if (node && node.parentNode)
			node.parentNode.removeChild(node);
	},
	//insert new node before sibling, or at the end if sibling doesn't exist
	insertBefore: function(node,before,rescue){
		if (!node) return;
		if (before && before.parentNode)
			before.parentNode.insertBefore(node, before);
		else
			rescue.appendChild(node);
	},
	//return custom ID from html element 
	//will check all parents starting from event's target
	locate:function(e,id){
		var trg;
		if (e.tagName)
			trg = e;
		else {
			e=e||event;
			trg=e.target||e.srcElement;
		}
		
		while (trg){
			if (trg.getAttribute){	//text nodes has not getAttribute
				var test = trg.getAttribute(id);
				if (test) return test;
			}
			trg=trg.parentNode;
		}	
		return null;
	},
	//returns position of html element on the page
	offset:function(elem) {
		if (elem.getBoundingClientRect) { //HTML5 method
			var box = elem.getBoundingClientRect();
			var body = document.body;
			var docElem = document.documentElement;
			var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
			var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
			var clientTop = docElem.clientTop || body.clientTop || 0;
			var clientLeft = docElem.clientLeft || body.clientLeft || 0;
			var top  = box.top +  scrollTop - clientTop;
			var left = box.left + scrollLeft - clientLeft;
			return { y: Math.round(top), x: Math.round(left), width:elem.offsetWidth, height:elem.offsetHeight };
		} else { //fallback to naive approach
			var top=0, left=0;
			while(elem) {
				top = top + parseInt(elem.offsetTop,10);
				left = left + parseInt(elem.offsetLeft,10);
				elem = elem.offsetParent;
			}
			return { y: top, x: left, width:elem.offsetHeight, height:elem.offsetWidth };
		}
	},
	//returns relative position of event
	posRelative:function(ev){
		ev = ev || event;
		if (!webix.isUndefined(ev.offsetX))
			return { x:ev.offsetX, y:ev.offsetY };	//ie, webkit
		else
			return { x:ev.layerX, y:ev.layerY };	//firefox
	},
	//returns position of event
	pos:function(ev){
		ev = ev || event;
		if (ev.touches && ev.touches[0])
			ev = ev.touches[0];

		if(ev.pageX || ev.pageY)	//FF, KHTML
			return {x:ev.pageX, y:ev.pageY};
		//IE
		var d  =  ((webix.env.isIE)&&(document.compatMode != "BackCompat"))?document.documentElement:document.body;
		return {
			x:ev.clientX + d.scrollLeft - d.clientLeft,
			y:ev.clientY + d.scrollTop  - d.clientTop
		};
	},
	//prevent event action
	preventEvent:function(e){
		if (e && e.preventDefault) e.preventDefault();
		if(e) e.returnValue = false;
		return webix.html.stopEvent(e);
	},
	//stop event bubbling
	stopEvent:function(e){
		(e||event).cancelBubble=true;
		return false;
	},
	//add css class to the node
	addCss:function(node,name,check){
		if (!check || node.className.indexOf(name) === -1)
			node.className+=" "+name;
	},
	//remove css class from the node
	removeCss:function(node,name){
		node.className=node.className.replace(RegExp(" "+name,"g"),"");
	}
};

webix.ready = function(code){
	if (this._ready) code.call();
	else this._ready_code.push(code);
};
webix.debug_ready = webix.ready; //same command but will work only in dev. build
webix._ready_code = [];

//autodetect codebase folder
(function(){
	var temp = document.getElementsByTagName("SCRIPT");	//current script, most probably
	webix.assert(temp.length,"Can't locate codebase");
	if (temp.length){
		//full path to script
		temp = (temp[temp.length-1].getAttribute("src")||"").split("/");
		//get folder name
		temp.splice(temp.length-1, 1);
		webix.codebase = temp.slice(0, temp.length).join("/")+"/";
	}

	var ready = function(){
		if(webix.env.isIE)
			document.body.className += " webix_ie";
		webix.callEvent("onReady",[]);
	};

	var doit = function(){
		webix._ready = true;

		//global plugins
		if (window.webix_ready && webix.isArray(webix_ready))
			webix._ready_code = webix_ready.concat(webix._ready_code);

		for (var i=0; i < webix._ready_code.length; i++)
			webix._ready_code[i].call();
		webix._ready_code=[];
	};

	webix.attachEvent("onReady", function(force){
		if (force) 
			doit();
		else 
			webix.delay(doit);
	});

	if (document.readyState == "complete") ready();
	else webix.event(window, "load", ready);
	
})();

webix.locale=webix.locale||{};


webix.assert_core_ready();


webix.ready(function(){
	webix.event(document.body,"click", function(e){
		webix.callEvent("onClick",[e||event]);
	});
});
webix.editStop = function(){
	webix.callEvent("onEditEnd", []);
};


webix.debug_blacklist={
	onmousemoving:1
};
//Bazed on Promiz
//A fast Promises/A+ library 
//Author:   https://github.com/Zolmeister/promiz
//License:  MIT

/* jshint ignore:start */
(function (self) {
  var now = typeof setImmediate !== 'undefined' ? setImmediate : function(cb) {
    setTimeout(cb, 0)
  }
  
  /**
   * @constructor
   */
  function promise(fn, er) {
    var self = this

    self.promise = self
    self.state = 'pending'
    self.val = null
    self.fn = fn || null
    self.er = er || null
    self.next = [];
  }

  promise.prototype.resolve = function (v) {
    var self = this
    if (self.state === 'pending') {
      self.val = v
      self.state = 'resolving'

      now(function () {
        self.fire()
      })
    }
  }

  promise.prototype.reject = function (v) {
    var self = this
    if (self.state === 'pending') {
      self.val = v
      self.state = 'rejecting'

      now(function () {
        self.fire()
      })
    }
  }

  promise.prototype.then = function (fn, er) {
    var self = this
    var p = new promise(fn, er)
    self.next.push(p)
    if (self.state === 'resolved') {
      p.resolve(self.val)
    }
    if (self.state === 'rejected') {
      p.reject(self.val)
    }
    return p
  }
  promise.prototype.fail = function (er) {
    return this.then(null, er)
  }
  promise.prototype.finish = function (type) {
    var self = this
    self.state = type

    if (self.state === 'resolved') {
      for (var i = 0; i < self.next.length; i++)
        self.next[i].resolve(self.val);
    }

    if (self.state === 'rejected') {
      for (var i = 0; i < self.next.length; i++)
        self.next[i].reject(self.val);

      if (webix.assert && !self.next.length)
        throw(self.val);
    }
  }

  // ref : reference to 'then' function
  // cb, ec, cn : successCallback, failureCallback, notThennableCallback
  promise.prototype.thennable = function (ref, cb, ec, cn, val) {
    var self = this
    val = val || self.val
    if (typeof val === 'object' && typeof ref === 'function') {
      try {
        // cnt protects against abuse calls from spec checker
        var cnt = 0
        ref.call(val, function(v) {
          if (cnt++ !== 0) return
          cb(v)
        }, function (v) {
          if (cnt++ !== 0) return
          ec(v)
        })
      } catch (e) {
        ec(e)
      }
    } else {
      cn(val)
    }
  }

  promise.prototype.fire = function () {
    var self = this
    // check if it's a thenable
    var ref;
    try {
      ref = self.val && self.val.then
    } catch (e) {
      self.val = e
      self.state = 'rejecting'
      return self.fire()
    }

    self.thennable(ref, function (v) {
      self.val = v
      self.state = 'resolving'
      self.fire()
    }, function (v) {
      self.val = v
      self.state = 'rejecting'
      self.fire()
    }, function (v) {
      self.val = v
      
      if (self.state === 'resolving' && typeof self.fn === 'function') {
        try {
          self.val = self.fn.call(undefined, self.val)
        } catch (e) {
          self.val = e
          return self.finish('rejected')
        }
      }

      if (self.state === 'rejecting' && typeof self.er === 'function') {
        try {
          self.val = self.er.call(undefined, self.val)
          self.state = 'resolving'
        } catch (e) {
          self.val = e
          return self.finish('rejected')
        }
      }

      if (self.val === self) {
        self.val = TypeError()
        return self.finish('rejected')
      }

      self.thennable(ref, function (v) {
        self.val = v
        self.finish('resolved')
      }, function (v) {
        self.val = v
        self.finish('rejected')
      }, function (v) {
        self.val = v
        self.state === 'resolving' ? self.finish('resolved') : self.finish('rejected')
      })

    })
  }

  promise.prototype.done = function () {
    if (this.state = 'rejected' && !this.next) {
      throw this.val
    }
    return null
  }

  promise.prototype.nodeify = function (cb) {
    if (typeof cb === 'function') return this.then(function (val) {
        try {
          cb(null, val)
        } catch (e) {
          setImmediate(function () {
            throw e
          })
        }

        return val
      }, function (val) {
        try {
          cb(val)
        } catch (e) {
          setImmediate(function () {
            throw e
          })
        }

        return val
      })

    return this
  }

  promise.prototype.spread = function (fn, er) {
    return this.all().then(function (list) {
      return typeof fn === 'function' && fn.apply(null, list)
    }, er)
  }
  
  promise.prototype.all = function() {
    var self = this
    return this.then(function(list){
      var p = new promise()
      if(!(list instanceof Array)) {
        p.reject(TypeError)
        return p
      }
      
      var cnt = 0
      var target = list.length
      
      function done() {
        if (++cnt === target) p.resolve(list)
      }
      
      for(var i=0, l=list.length; i<l; i++) {
        var value = list[i]
        var ref;
        
        try {
          ref = value && value.then
        } catch (e) {
          p.reject(e)
          break
        }
        
        (function(i){
          self.thennable(ref, function(val){
            list[i] = val
            done()
          }, function(val){
            list[i] = val
            done()
          }, function(){
            done()
          }, value)
        })(i)
      }

      return p
    })
  }

  // self object gets globalalized/exported
  var promiz = {

    all:function(list){
      var p = new promise(null, null);
      p.resolve(list);
      return p.all();
    },
    // promise factory
    defer: function () {
      return new promise(null, null)
    },

    // calls a function and resolved as a promise
    fcall: function() {
      var def = new promise()
      var args = Array.apply([], arguments)
      var fn = args.shift()
      try {
        var val = fn.apply(null, args)
        def.resolve(val)
      } catch(e) {
        def.reject(e)
      }

      return def
    },

    // calls a node-style function (eg. expects callback as function(err, callback))
    nfcall: function() {
      var def = new promise()
      var args = Array.apply([], arguments)
      var fn = args.shift()
      try {

        // Add our custom promise callback to the end of the arguments
        args.push(function(err, val){
          if(err) {
            return def.reject(err)
          }
          return def.resolve(val)
        })
        fn.apply(null, args)
      } catch (e) {
        def.reject(e)
      }

      return def
    }
  }
  
  self.promise = promiz
})(webix);
/* jshint ignore:end */

(function(){

	var token = "";
	var config = {
		timeout:30,
		parseDates:true,
		multicall:true
	};

	var queue = [];
	var nexttimer;

	function call_remote(url, name, args){
		var pack = { name: name, data:args, key:token };
		var defer = webix.promise.defer();

		queue.push([url, pack, defer]);

		if (!nexttimer)
			nexttimer = setTimeout(next_timer_call,1);

		defer.sync = function(){
			pack.sync = true;
			return call_remote_sync(url, pack);
		};

		return defer;
	}

	function next_timer_call(){
		var megapack = [];
		var megaqueue = [];
		var megaurl = "";
		

		for (var i=0; i<queue.length; i++){
			var pack = queue[i];
			if (!pack[1].sync){
				if (config.multicall){
					megaurl = pack[0];
					megapack.push(pack[1]);
					megaqueue.push(pack);
				} else 
					call_remote_async.apply(this, pack);
			}
		}

		queue = [];
		nexttimer = false;

		if (config.multicall && megapack.length)
			call_remote_async(megaurl,	
				{ data:megapack, key:token, multicall:true },
				megaqueue
			);
	}

	function resolve(defer, data){
		if (config.multicall)
			for (var i = 0; i < defer.length; i++)
				defer[i][2].resolve(data[i]);
		else
			defer.resolve(data);
	}

	function reject(defer, data){
		if (config.multicall)
			for (var i = 0; i < defer.length; i++)
				defer[i][2].reject(data);
		else
			defer.reject(data);
	}

	function call_remote_async(url, pack, defer){
		var ajax = webix.ajax();
		pack.data = ajax.stringify(pack.data);
		ajax.post(url, pack).then(function(text){
			var data = parse_responce(text.text());
			if (!data)
				reject(defer, text.text());
			else
				resolve(defer, data.data);
		}, function(x){
			reject(defer, x);
		});

		webix.callEvent("onRemoteCall", [defer, pack]);
	}

	function call_remote_sync(url, pack, args){
		var ajax = webix.ajax();
		webix.callEvent("onRemoteCall", [null, pack]);
		pack.data = ajax.stringify(pack.data);
		return parse_responce( ajax.sync().post(url, pack).responseText ).data;
	}

	function parse_responce(text){
		return webix.DataDriver.json.toObject.call(config, text);
	}

	var t = webix.remote = function(api, url, obj, prefix){
		if (!url){
			var scripts = document.getElementsByTagName("script");
			url = scripts[scripts.length - 1].src;
		}

		obj = obj || t;
		prefix = prefix || "";

		for (var key in api){
			if (key == "$key")
				token = api.$key;
			else if (key.indexOf("$") === 0)
				t[key] = api[key];
			else if (typeof api[key] == "object"){
				var sub = obj[key] = {};
				t(api[key], url, sub, key+".");
			} else
				obj[key] = api_helper(url, prefix+key); 
		}
	};

	var api_helper = function(url, key){
		return function(){
			return call_remote(url, key, [].splice.call(arguments,0));
		};
	};

	t.config = config;
	t.flush = next_timer_call;


})();


/*
	UI:DataView
*/


webix.skin={};

webix.skin.air = {
	topLayout:"wide",
	//bar in accordion
	barHeight:34,			//!!!Set the same in skin.less!!!
	tabbarHeight: 36,
	rowHeight:34,
	toolbarHeight:22,
	listItemHeight:28,		//list, grouplist, dataview, etc.
	inputHeight:34,
	inputPadding: 2,
	menuHeight: 34,
	menuMargin:0,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:4, form:8  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:8  },
	//space between tabs in tabbar
	tabMargin:0,

	calendarHeight: 70,
	padding:0,

	optionHeight: 27
};
webix.skin["aircompact"] = {
	topLayout:"wide",
	//bar in accordion
	barHeight:24,			//!!!Set the same in skin.less!!!
	tabbarHeight: 26,
	rowHeight:26,
	toolbarHeight:22,
	listItemHeight:28,		//list, grouplist, dataview, etc. 
	inputHeight:29,
	inputPadding: 2,
	menuHeight: 25,
	menuMargin:0,
	labelTopHeight: 16,
	
	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:4, form:8  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:8  },
	//space between tabs in tabbar
	tabMargin:0,

	calendarHeight: 70,
	padding:0,

	optionHeight: 23
};

webix.skin.web = {
	name:"web",
	topLayout:"space",
	//bar in accordion
	barHeight:28,			//!!!Set the same in skin.less!!!
	tabbarHeight: 30,
	rowHeight:30,
	toolbarHeight:22,
	listItemHeight:28,		//list, grouplist, dataview, etc. 
	inputHeight:28,
	inputPadding: 2,
	menuMargin: 0,
	menuHeight: 27,
	labelTopHeight: 16,
	//accordionMargin: 9,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:4, form:8, accordion: 9  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:8, accordion:0  },
	//space between tabs in tabbar
	tabMargin:3,
	tabTopOffset:3,

	calendarHeight: 70,
	padding:0,

	optionHeight: 22
};
webix.skin.clouds = {
	topLayout:"wide",
	//bar in accordion
	barHeight:36,			//!!!Set the same in skin.less!!!
	tabbarHeight: 46,
	rowHeight:34,
	toolbarHeight:22,
	listItemHeight:32,		//list, grouplist, dataview, etc.
	inputHeight:30,
	inputPadding: 2,
	menuHeight: 34,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:4, form:8  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:8  },
	//space between tabs in tabbar
	tabMargin:2,
	tabOffset:0,
	tabBottomOffset: 10,


	calendarHeight: 70,
	padding:0
};
webix.skin.terrace = {
	topLayout:"space",
	//bar in accordion
	barHeight:37,			//!!!Set the same in skin.less!!!
	tabbarHeight: 39,
	rowHeight:38,
	toolbarHeight:22,
	listItemHeight:28,		//list, grouplist, dataview, etc.
	inputHeight:30,
	inputPadding: 2,
	menuMargin: 0,
	menuHeight: 32,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:20, wide:20, clean:0, head:4, line:-1, toolbar:4, form:8},
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:20, wide:0, clean:0, head:0, line:0, toolbar:4, form:8 },
	tabMargin:2,
	tabOffset:0,


	calendarHeight: 70,
	//space between tabs in tabbar
	padding:17,

	optionHeight: 24
};
webix.skin.metro = {
	topLayout:"space",
	//bar in accordion
	barHeight:36,			//!!!Set the same in skin.less!!!
	tabbarHeight: 46,
	rowHeight:34,
	toolbarHeight:36,
	listItemHeight:32,		//list, grouplist, dataview, etc.
	inputHeight:30,
	buttonHeight: 45,
	inputPadding: 2,
	menuHeight: 36,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:4, form:8, accordion: 9  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:0, form:8, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:2,
	tabOffset:0,
	tabBottomOffset: 10,

	calendarHeight: 70,
	padding:0,

	optionHeight: 23
};
webix.skin.light = {
	topLayout:"space",
	//bar in accordion
	barHeight:36,			//!!!Set the same in skin.less!!!
	tabbarHeight: 46,
	rowHeight:32,
	toolbarHeight:36,
	listItemHeight:32,		//list, grouplist, dataview, etc.
	inputHeight:34,
	buttonHeight: 45,
	inputPadding: 3,
	menuHeight: 36,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:15, wide:15, clean:0, head:4, line:-1, toolbar:4, form:8, accordion: 10  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:15, wide:0, clean:0, head:0, line:0, toolbar:0, form:8, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:2,
	tabOffset:0,
	tabBottomOffset: 10,

	calendarHeight: 70,
	padding:0,

	optionHeight: 27
};
webix.skin.glamour = {
	topLayout:"space",
	//bar in accordion
	barHeight:39,			//!!!Set the same in skin.less!!!
	tabbarHeight: 39,
	rowHeight:32,
	toolbarHeight:39,
	listItemHeight:32,		//list, grouplist, dataview, etc.
	inputHeight:34,
	buttonHeight: 34,
	inputPadding: 3,
	menuHeight: 36,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:15, wide:15, clean:0, head:4, line:-1, toolbar:4, form:8, accordion: 10  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:15, wide:0, clean:0, head:0, line:0, toolbar:3, form:8, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:1,
	tabOffset:0,
	tabBottomOffset: 1,

	calendarHeight: 70,
	padding:0,

	optionHeight: 27
};
webix.skin.touch = {
	topLayout:"space",
	//bar in accordion
	barHeight:42,			//!!!Set the same in skin.less!!!
	tabbarHeight: 50,
	rowHeight:42,
	toolbarHeight: 42,
	listItemHeight:42,		//list, grouplist, dataview, etc.
	inputHeight:42,
	inputPadding: 4,
	menuHeight: 42,
	labelTopHeight: 24,
	unitHeaderHeight: 34,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:4, clean:0, head:4, line:-1, toolbar:0, form:0, accordion: 9  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:8, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:2,
	tabOffset:0,
	tabBottomOffset: 10,
	calendar:{headerHeight: 70, timepickerHeight:35, height: 310, width: 300},
	padding:0,
	customCheckbox: true,
	customRadio: true,

	optionHeight: 32
};
webix.skin.flat = {
	topLayout:"space",
	//bar in accordion
	barHeight:45,			//!!!Set the same in skin.less!!!
	tabbarHeight: 45,
	rowHeight:34,
	toolbarHeight:45,
	listItemHeight:34,		//list, grouplist, dataview, etc.
	inputHeight: 38,
	buttonHeight: 38,
	inputPadding: 3,
	menuHeight: 34,
	labelTopHeight: 22,
	propertyItemHeight: 28,

	//margin - distance between cells
	layoutMargin:{ space:10, wide:10, clean:0, head:4, line:-1, toolbar:4, form:8, accordion: 10  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:10, wide:0, clean:0, head:0, line:0, toolbar:5, form:17, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:4,
	tabOffset: 0,
	tabBottomOffset: 6,
	tabTopOffset:1,

	customCheckbox: true,
	customRadio: true,

	calendarHeight: 70,
	padding:0,
	accordionType: "accordion",

	optionHeight: 29
};
webix.skin.compact = {
	topLayout:"space",
	//bar in accordion
	barHeight:34,			//!!!Set the same in skin.less!!!
	tabbarHeight: 34,
	rowHeight:24,
	toolbarHeight:34,
	listItemHeight:28,		//list, grouplist, dataview, etc.
	inputHeight: 30,
	buttonHeight: 30,
	inputPadding: 3,
	menuHeight: 28,
	labelTopHeight: 16,

	//margin - distance between cells
	layoutMargin:{ space:5, wide:5, clean:0, head:4, line:-1, toolbar:4, form:4, accordion: 5  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ space:5, wide:0, clean:0, head:0, line:0, toolbar:3, form:12, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:3,
	tabOffset: 0,
	tabBottomOffset: 3,
	tabTopOffset:1,

	customCheckbox: true,
	customRadio: true,


	calendarHeight: 70,
	padding:0,
	accordionType: "accordion",

	optionHeight: 23
};
webix.skin.material = {
	topLayout:"space",
	//bar in accordion
	barHeight:45,			//!!!Set the same in skin.less!!!
	tabbarHeight:47,
	rowHeight:38,
	toolbarHeight:22,
	listItemHeight:34,		//list, grouplist, dataview, etc.
	inputHeight:38,
	buttonHeight:38,
	inputPadding: 2,
	menuMargin: 0,
	menuHeight: 34,
	labelTopHeight: 16,
	propertyItemHeight: 34,

	//margin - distance between cells
	layoutMargin:{ material:10, space:10, wide:10, clean:0, head:4, line:-1, toolbar:4, form:16, accordion: 0  },
	//padding - distance insede cell between cell border and cell content
	layoutPadding:{ material:10, space:10, wide:0, clean:0, head:0, line:0, toolbar:4, form:16, accordion: 0  },
	//space between tabs in tabbar
	tabMargin:0,
	tabOffset: 0,
	tabBottomOffset: 0,
	tabTopOffset:0,

	customCheckbox: true,
	customRadio: true,

	calendarHeight: 70,
	padding:0,
	accordionType: "accordion"
};

webix.skin.set = function(name){
	webix.assert(webix.skin[name], "Incorrect skin name: "+name);

	webix.skin.$active = webix.skin[name];
	webix.skin.$name = name;
	if (webix.ui){
		for (var key in webix.ui){
			var view = webix.ui[key];
			if (view && view.prototype && view.prototype.$skin)
				view.prototype.$skin(view.prototype);
		}
	}		
};
webix.skin.set(window.webix_skin || "flat");

/*
	Behavior:Destruction
	
	@export
		destructor
*/



webix.Destruction = {
	$init:function(){
		//register self in global list of destructors
		webix.destructors.push(this);
	},
	//will be called automatically on unload, can be called manually
	//simplifies job of GC
	destructor:function(){
		var config = this._settings;

		if (this._last_editor)
			this.editCancel();

		if(this.callEvent)
			this.callEvent("onDestruct",[]);

		this.destructor=function(){}; //destructor can be called only once

		//destroy child and related cells
		if (this.getChildViews){
			var cells = this.getChildViews();
			if (cells)
				for (var i=0; i < cells.length; i++)
					cells[i].destructor();

			if (this._destroy_with_me)
				for (var i=0; i < this._destroy_with_me.length; i++)
					this._destroy_with_me[i].destructor();
		}

		delete webix.ui.views[config.id];

		//html collection
		this._htmlmap  = null;
		this._htmlrows = null;
		this._html = null;


		if (this._contentobj) {
			this._contentobj.innerHTML="";
			this._contentobj._htmlmap = null;
		}

		//removes view container
		if (this._viewobj&&this._viewobj.parentNode){
			this._viewobj.parentNode.removeChild(this._viewobj);
		}

		if (this.data && this.data.destructor)
			this.data.destructor();

		if (this.unbind)
			this.unbind();

		this.data = null;
		this._viewobj = this.$view = this._contentobj = this._dataobj = null;
		this._evs_events = this._evs_handlers = {};

		//remove focus from destructed view
		if (webix.UIManager._view == this)
			webix.UIManager._view = null;

		var url = config.url;
		if (url && url.$proxy && url.release)
			url.release();

		this.$scope = null;
		// this flag is checked in delay method
		this.$destructed = true;
	}
};
//global list of destructors
webix.destructors = [];
webix.event(window,"unload",function(){
	webix.callEvent("unload", []);
	webix._final_destruction = true;
	
	//call all registered destructors
	for (var i=0; i<webix.destructors.length; i++)
		webix.destructors[i].destructor();
	webix.destructors = [];
	webix.ui._popups = webix.toArray();
	
	//detach all known DOM events
	for (var a in webix._events){
		var ev = webix._events[a];
		if (ev[0].removeEventListener)
			ev[0].removeEventListener(ev[1],ev[2],false);
		else if (ev[0].detachEvent)
			ev[0].detachEvent("on"+ev[1],ev[2]);
		delete webix._events[a];
	}
});

/*
	Behavior:Settings
	
	@export
		customize
		config
*/

/*
	Template - handles html templates
*/



(function(){

var _cache = {};
var _csp_cache = {};
var newlines = new RegExp("(\\r\\n|\\n)","g");
var quotes   = new RegExp("(\\\")","g");
var slashes  = new RegExp("(\\\\)","g");
var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
var badChars = /[&<>"'`]/g;
var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};


webix.template = function(str){
	if (typeof str == "function") return str;
	if (_cache[str])
		return _cache[str];
		
	str=(str||"").toString();			
	if (str.indexOf("->")!=-1){
		var teststr = str.split("->");
		switch(teststr[0]){
			case "html": 	//load from some container on the page
				str = webix.html.getValue(teststr[1]);
				break;
			case "http": 	//load from external file
				str = new webix.ajax().sync().get(teststr[1],{uid:webix.uid()}).responseText;
				break;
			default:
				//do nothing, will use template as is
				break;
		}
	}
		
	//supported idioms
	// {obj.attr} => named attribute or value of sub-tag in case of xml
	str=(str||"").toString();		

	// Content Security Policy enabled
	if(webix.env.strict){
		if (!_csp_cache[str]){
			_csp_cache[str] = [];

			// get an array of objects (not sorted by position)
			var temp_res = [];
			str.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,function(search,s1,s2,s3,pos){
					temp_res.push({pos: pos, str: search, fn: function(obj,common){
						return obj[s1]?s2:s3;
					}});
			});
			str.replace(/\{common\.([^}\(]*)\}/g,function(search,s,pos){
				temp_res.push({pos: pos, str: search, fn: function(obj,common){
					return common[s]||'';
				}});
			});
			str.replace(/\{common\.([^\}\(]*)\(\)\}/g,function(search,s,pos){
				temp_res.push({pos: pos, str: search, fn: function(obj,common){
					return (common[s]?common[s].apply(this, arguments):"");
				}});
			});
			str.replace(/\{obj\.([^:}]*)\}/g,function(search,s,pos){
				temp_res.push({pos: pos, str: search, fn: function(obj,common){
					return obj[s];
				}});
			});
			str.replace("{obj}",function(search,s,pos){
				temp_res.push({pos: pos, str: search, fn: function(obj,common){
					return obj;
				}});
			});
			str.replace(/#([^#'";, ]+)#/gi,function(search,s,pos){
				if(s.charAt(0)=="!"){
					temp_res.push({pos: pos, str: search, fn: function(obj,common){
						return webix.template.escape(obj[s.substr(1)]);
					}});
				}
				else{
					temp_res.push({pos: pos, str: search, fn: function(obj,common){
						return obj[s];
					}});
				}

			});

			// sort template parts by position
			temp_res.sort(function(a,b){
				return (a.pos > b.pos)?1:-1;
			});

			// create an array of functions that return parts of html string
			if(temp_res.length){
				var lastPos = 0;
				var addStr = function(str,n0,n1){
					_csp_cache[str].push(function(){
						return str.slice(n0,n1);
					});
				};
				for(var i = 0; i< temp_res.length; i++){
					var pos = temp_res[i].pos;
					addStr(str,lastPos,pos);
					_csp_cache[str].push(temp_res[i].fn);
					lastPos = pos + temp_res[i].str.length;
				}
				addStr(str,lastPos,str.length);
			}
			else
				_csp_cache[str].push(function(){return str;});
		}
		return function(){
			var s = "";
			for(var i=0; i < _csp_cache[str].length;i++){
				s += _csp_cache[str][i].apply(this,arguments);
			}
			return s;
		};
	}

	str=str.replace(slashes,"\\\\");
	str=str.replace(newlines,"\\n");
	str=str.replace(quotes,"\\\"");

	str=str.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,"\"+(obj.$1?\"$2\":\"$3\")+\"");
	str=str.replace(/\{common\.([^}\(]*)\}/g,"\"+(common.$1||'')+\"");
	str=str.replace(/\{common\.([^\}\(]*)\(\)\}/g,"\"+(common.$1?common.$1.apply(this, arguments):\"\")+\"");
	str=str.replace(/\{obj\.([^}]*)\}/g,"\"+(obj.$1)+\"");
	str=str.replace("{obj}","\"+obj+\"");
	str=str.replace(/#([^#'";, ]+)#/gi,function(str, key){
		if (key.charAt(0)=="!")
			return "\"+webix.template.escape(obj."+key.substr(1)+")+\"";
		else
			return "\"+(obj."+key+")+\"";
	});

	try {
		_cache[str] = Function("obj","common","return \""+str+"\";");
	} catch(e){
		webix.assert_error("Invalid template:"+str);
	}

	return _cache[str];
};



webix.template.escape  = function(str){
	if (str === webix.undefined || str === null) return "";
	return (str.toString() || "" ).replace(badChars, escapeChar);
};
webix.template.empty=function(){	return "";	};
webix.template.bind =function(value){	return webix.bind(webix.template(value),this); };


	/*
		adds new template-type
		obj - object to which template will be added
		data - properties of template
	*/
webix.type=function(obj, data){ 
	if (obj._webix_proto_wait){
		if (!obj._webix_type_wait)
			obj._webix_type_wait = [];
				obj._webix_type_wait.push(data);
		return;
	}
		
	//auto switch to prototype, if name of class was provided
	if (typeof obj == "function")
		obj = obj.prototype;
	if (!obj.types){
		obj.types = { "default" : obj.type };
		obj.type.name = "default";
	}
	
	var name = data.name;
	var type = obj.type;
	if (name)
		type = obj.types[name] = webix.clone(data.baseType?obj.types[data.baseType]:obj.type);
	
	for(var key in data){
		if (key.indexOf("template")===0)
			type[key] = webix.template(data[key]);
		else
			type[key]=data[key];
	}

	return name;
};

})();


webix.Settings={
	$init:function(){
		/* 
			property can be accessed as this.config.some
			in same time for inner call it have sense to use _settings
			because it will be minified in final version
		*/
		this._settings = this.config= {}; 
	},
	define:function(property, value){
		if (typeof property == "object")
			return this._parseSeetingColl(property);
		return this._define(property, value);
	},
	_define:function(property,value){
		//method with name {prop}_setter will be used as property setter
		//setter is optional
		var setter = this[property+"_setter"];
		return (this._settings[property]=setter?setter.call(this,value,property):value);
	},
	//process configuration object
	_parseSeetingColl:function(coll){
		if (coll){
			for (var a in coll)				//for each setting
				this._define(a,coll[a]);		//set value through config
		}
	},
	//helper for object initialization
	_parseSettings:function(obj,initial){
		//initial - set of default values
		var settings = {}; 
		if (initial)
			settings = webix.extend(settings,initial);
					
		//code below will copy all properties over default one
		if (typeof obj == "object" && !obj.tagName)
			webix.extend(settings,obj, true);	
		//call config for each setting
		this._parseSeetingColl(settings);
	},
	_mergeSettings:function(config, defaults){
		for (var key in defaults)
			switch(typeof config[key]){
				case "object": 
					config[key] = this._mergeSettings((config[key]||{}), defaults[key]);
					break;
				case "undefined":
					config[key] = defaults[key];
					break;
				default:	//do nothing
					break;
			}
		return config;
	}
};
/* 
	ajax operations 
	
	can be used for direct loading as
		webix.ajax(ulr, callback)
	or
		webix.ajax().getItem(url)
		webix.ajax().post(url)

*/





webix.proxy = function(name, source){
	webix.assert(webix.proxy[name], "Invalid proxy name: "+name);

	var copy = webix.copy(webix.proxy[name]);
	copy.source = source;
	if (copy.init) copy.init();
	return copy;
};

webix.proxy.post = {
	$proxy:true,
	load:function(view, callback){
		webix.ajax().bind(view).post(this.source, this.params || {}, callback);
	}
};

webix.proxy.sync = {
	$proxy:true,
	load:function(view, callback){
		webix.ajax().sync().bind(view).get(this.source, null, callback);
	}
};

webix.proxy.connector = {
	$proxy:true,

	connectorName:"!nativeeditor_status",
	load:function(view, callback){
		webix.ajax(this.source, callback, view);
	},
	saveAll:function(view, updates, dp, callback){
		var url = this.source;

		var data = {};
		var ids = [];
		for (var i = 0; i < updates.length; i++) {
			var action = updates[i];
			ids.push(action.id);

			for (var j in action.data)
				if (j.indexOf("$")!==0)
					data[action.id+"_"+j] = action.data[j];
			data[action.id+"_"+this.connectorName] = action.operation;
		}

		data.ids = ids.join(",");
		data.webix_security = webix.securityKey;
	
		url += (url.indexOf("?") == -1) ? "?" : "&";
		url += "editing=true";

		webix.ajax().post(url, data, callback);
	},
	result:function(state, view, dp, text, data, loader){
		data = data.xml();
		if (!data)
			return dp._processError(null, text, data, loader);
		

		var actions = data.data.action;
		if (!actions.length)
			actions = [actions];


		var hash = [];

		for (var i = 0; i < actions.length; i++) {
			var obj = actions[i];
			hash.push(obj);

			obj.status = obj.type;
			obj.id = obj.sid;
			obj.newid = obj.tid;

			dp.processResult(obj, obj, {text:text, data:data, loader:loader});
		}

		return hash;
	}
};

webix.proxy.debug = {
	$proxy:true,
	load:function(){},
	save:function(v,u,d,c){
		webix.delay(function(){
			window.console.log("[DP] "+u.id+" -> "+u.operation, u.data);
			var data = {
				id:u.data.id,
				newid:u.data.id,
				status:u.data.operation
			};
			d.processResult(data, data);
		});
	}
};

webix.proxy.rest = {
	$proxy:true,
	load:function(view, callback){
		webix.ajax(this.source, callback, view);
	},
	save:function(view, update, dp, callback){
		var url = this.source;
		url += url.charAt(url.length-1) == "/" ? "" : "/";
		var mode = update.operation;

		var data = update.data;
		if (mode == "insert") delete data.id;

		//call rest URI
		if (mode == "update"){
			webix.ajax().put(url + data.id, data, callback);
		} else if (mode == "delete") {
			webix.ajax().del(url + data.id, data, callback);
		} else {
			webix.ajax().post(url, data, callback);
		}
	}
};


webix.proxy.faye = {
	$proxy:true,
	init:function(){
		this.clientId = this.clientId || webix.uid();
	},
	load:function(view){
		var selfid = this.clientId;

		this.client.subscribe(this.source, function(update){
			if (update.clientId == selfid) return;

			webix.dp(view).ignore(function(){
				if (update.operation == "delete")
					view.remove(update.data.id);
				else if (update.operation == "insert")
					view.add(update.data);
				else if (update.operation == "update"){
					var item = view.getItem(update.data.id);
					if (item){
						webix.extend(item, update.data, true);
						view.refresh(item.id);
					}
				}
			});
		});
	},
	save:function(view, update, dp, callback){
		update.clientId = this.clientId;
		this.client.publish(this.source, update);
	}
};

//indexdb->database/collection
webix.proxy.indexdb = {
	$proxy:true,
	create:function(db, config, version, callback){
		this.source = db + "/";
		this._get_db(callback, version, function(e){
			var db = e.target.result;
			for (var key in config){
				var data = config[key];
				var store = db.createObjectStore(key, { keyPath: "id", autoIncrement:true });
				for (var i = 0; i < data.length; i++)
					store.put(data[i]);
			}
		});
	},
	_get_db:function(callback, version, upgrade){
		if (this.source.indexOf("/") != -1){
			var parts = this.source.split("/");
			this.source = parts[1];
			version = version || parts[2];

			var _index = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

			var db;
			if (version)
				db = _index.open(parts[0], version);
			else
				db = _index.open(parts[0]);

			if (upgrade)
				db.onupgradeneeded = upgrade;
			db.onerror = function(){ };
			db.onblocked = function(){ };
			db.onsuccess = webix.bind(function(e){
				this.db =  e.target.result;
				if (callback)
					callback.call(this);
			},this);
		} else if (this.db)
			callback.call(this);
		else 
			webix.delay(this._get_db, this, [callback], 50);
	},

	load:function(view, callback){
		this._get_db(function(){
			var store = this.db.transaction(this.source).objectStore(this.source);
			var data = [];

			store.openCursor().onsuccess = function(e) {
				var result = e.target.result;
				if(result){
					data.push(result.value);
					result["continue"]();
				} else {
					view.parse(data);
					webix.ajax.$callback(view, callback, "[]", data);
				}
			};
		});
	},
	save:function(view, update, dp, callback){
		this._get_db(function(){
			var mode = update.operation;
			var data = update.data;
			var id = update.id;

			var store = this.db.transaction([this.source], "readwrite").objectStore(this.source);

			var req;
			if (mode == "delete")
	            req = store["delete"](id);
	       	else if (mode == "update")
	       		req = store.put(data);
	       	else if (mode == "insert"){
	       		delete data.id;
	       		req = store.add(data);
	       	}

			req.onsuccess = function(e) {
				var result = { status: mode, id:update.id };
				if (mode == "insert")
					result.newid = e.target.result;
				dp.processResult(result, result);
			};
		});
	}
};

webix.ajax = function(url,params,call,master){
	//if parameters was provided - made fast call
	if (arguments.length!==0)
		return (new webix.ajax()).get(url,params,call,master);

	if (!this.getXHR) return new webix.ajax(); //allow to create new instance without direct new declaration

	return this;
};
webix.ajax.count = 0;
webix.ajax.prototype={
	master:null,
	//creates xmlHTTP object
	getXHR:function(){
		if (webix.env.isIE){
			return new ActiveXObject("Microsoft.xmlHTTP");
		}
		else 
			return new XMLHttpRequest();
	},
	stringify:function(obj){
		var origin = Date.prototype.toJSON;
		Date.prototype.toJSON = function(){
			return webix.i18n.parseFormatStr(this);
		};

		var result;
		if (obj instanceof Date)
			result = obj.toJSON();
		else
			result = JSON.stringify(obj);

		Date.prototype.toJSON = origin;
		return result;
	},
	/*
		send data to the server
		params - hash of properties which will be added to the url
		call - callback, can be an array of functions
	*/
	_send:function(url,params,call, master, mode){
		if (params && (webix.isArray(params) || (typeof (params.success || params.error || params) == "function"))){
			master = call;
			call = params;
			params = null;
		}

		var defer = webix.promise.defer();

		var x=this.getXHR();
		if (!webix.isArray(call))
			call = [call];

		call.push({ success: function(t, d){ defer.resolve(d);	},
					error: function(t, d){ defer.reject(x);	}});

		var headers = this._header || {};
		if (mode !== 'GET')
			headers['Content-type'] = 'application/x-www-form-urlencoded';

		if (!webix.callEvent("onBeforeAjax", [mode, url, params, x, headers])) return;

		//add extra params to the url
		if (typeof params == "object"){
			var t=[];
			for (var a in params){
				var value = params[a];
				if (value === null || value === webix.undefined)
					value = "";
			    if(typeof value==="object")
			        value = this.stringify(value);
				t.push(a+"="+encodeURIComponent(value));// utf-8 escaping
		 	}
			params=t.join("&");
		}

		if (params && mode==='GET'){
			url=url+(url.indexOf("?")!=-1 ? "&" : "?")+params;
			params = null;
		}

		x.open(mode, url, !this._sync);

		var type = this._response;
		if (type) x.responseType = type;

		//if header was provided - use it
		for (var key in headers)
			x.setRequestHeader(key, headers[key]);
		
		//async mode, define loading callback
		 var self=this;
		 this.master = this.master || master;
		 x.onreadystatechange = function(){
			if (!x.readyState || x.readyState == 4){
				if (webix.debug_time) webix.log_full_time("data_loading");	//log rendering time

				webix.ajax.count++;
				if (call && self && !x.aborted){
					//IE8 and IE9, handling .abort call
					if (webix._xhr_aborted.find(x) != -1)
						return webix._xhr_aborted.remove(x);

					var owner = self.master||self;

					var is_error = x.status >= 400;
					var text, data;
					if (x.responseType != "blob"){
						text = x.responseText||"";
						data = self._data(x);
					} else {
						text = "";
						data = x.response;
					}

					webix.ajax.$callback(owner, call, text, data, x, is_error);
				}
				if (self) self.master=null;
				call=self=master=null;	//anti-leak
			}
		 };

		//IE can use sync mode sometimes, fix it
		if (!this._sync)
			setTimeout(function(){
				if (!x.aborted){
					//abort handling in IE9
					if (webix._xhr_aborted.find(x) != -1)
						webix._xhr_aborted.remove(x);
					else
						x.send(params||null);
				}
			}, 1);
		else
			x.send(params||null);

		if (this.master && this.master._ajax_queue)
			this.master._ajax_queue.push(x);

		return this._sync?x:defer; //return XHR, which can be used in case of sync. mode
	},
	_data:function(x){
		return {
			xml:function(){ try{ return webix.DataDriver.xml.tagToObject(webix.DataDriver.xml.toObject(x.responseText, this)); }
				catch(e){
					webix.log(x.responseText);
					webix.log(e.toString()); webix.assert_error("Invalid xml data for parsing"); 
				}
			},
			rawxml:function(){ return x.responseXML; },
			text:function(){ return x.responseText; },
			json:function(){
				try{
					if(webix.env.strict){
						return JSON.parse(x.responseText);
					}
					else{
						eval("webix.temp = "+x.responseText); var t = webix.temp; webix.temp = null; return t;
					}

				}
				catch(e){ 
					webix.log(x.responseText);
					webix.log(e.toString()); webix.assert_error("Invalid json data for parsing"); 
				}
			}
		};
	},
	//GET request
	get:function(url,params,call){
		return this._send(url,params,call, 0, "GET");
	},
	//POST request
	post:function(url,params,call){
		return this._send(url,params,call, 0, "POST");
	},
	//PUT request
	put:function(url,params,call){
		return this._send(url,params,call, 0, "PUT");
	},
	//POST request
	del:function(url,params,call){
		return this._send(url,params,call, 0, "DELETE");
	},

	sync:function(){
		this._sync = true;
		return this;
	},
	response:function(value){
		this._response = value;
		return this;
	},
	//deprecated, remove in 3.0
	//[DEPRECATED]
	header:function(header){
		webix.assert(false, "ajax.header is deprecated in favor of ajax.headers");
		this._header = header;
		return this;
	},
	headers:function(header){
		this._header = webix.extend(this._header||{},header);
		return this;
	},
	bind:function(master){
		this.master = master;
		return this;
	}
};
webix.ajax.$callback = function(owner, call, text, data, x, is_error){
	if (owner.$destructed) return;
	if (x === -1 && data && typeof data.json == "function")
		data = data.json();

	if (is_error)
		webix.callEvent("onAjaxError", [x]);

	if (!webix.isArray(call))
		call = [call];

	if (!is_error)
		for (var i=0; i < call.length; i++){
			if (call[i]){
				var before = call[i].before;
				if (before)
					before.call(owner, text, data, x);
			}
		}

	for (var i=0; i < call.length; i++)	//there can be multiple callbacks
		if (call[i]){
			var method = (call[i].success||call[i]);
			if (is_error)
				method = call[i].error;
			if (method && method.call)
				method.call(owner,text,data,x);
		}
};

/*submits values*/
webix.send = function(url, values, method, target){
	var form = webix.html.create("FORM",{
		"target":(target||"_self"),
		"action":url,
		"method":(method||"POST")
	},"");
	for (var k in values) {
		var field = webix.html.create("INPUT",{"type":"hidden","name": k,"value": values[k]},"");
		form.appendChild(field);
	}
	form.style.display = "none";
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
};


webix.AtomDataLoader={
	$init:function(config){
		//prepare data store
		this.data = {}; 
		this.waitData = webix.promise.defer();

		if (config){
			this._settings.datatype = config.datatype||"json";
			this.$ready.push(this._load_when_ready);
		}
	},
	_load_when_ready:function(){
		this._ready_for_data = true;
		
		if (this._settings.url)
			this.url_setter(this._settings.url);
		if (this._settings.data)
			this.data_setter(this._settings.data);
	},
	url_setter:function(value){
		if (typeof value == "string" && value.indexOf("->") != -1){
			var parts = value.split("->");
			value = webix.proxy(parts[0], parts[1]);
		}

		if (!this._ready_for_data) return value;
		this.load(value, this._settings.datatype);	
		return value;
	},
	data_setter:function(value){
		if (!this._ready_for_data) return value;
		this.parse(value, this._settings.datatype);
		return true;
	},
	//loads data from external URL
	load:function(url,call){
		var details = arguments[2] || null;

		this.callEvent("onBeforeLoad",[]);
		if (typeof call == "string"){	//second parameter can be a loading type or callback
			//we are not using setDriver as data may be a non-datastore here
			this.data.driver = webix.DataDriver[call];
			call = arguments[2];
		} else if (!this.data.driver)
			this.data.driver = webix.DataDriver.json;

		//load data by async ajax call
		//loading_key - can be set by component, to ignore data from old async requests
		var callback = [{
			success: this._onLoad,
			error: this._onLoadError
		}];
		
		if (call){
			if (webix.isArray(call))
				callback.push.apply(callback,call);
			else
				callback.push(call);
		}
		
		//proxy	
		if (typeof url == "string" && url.indexOf("->") != -1){
			var parts = url.split("->");
			url = webix.proxy(parts[0], parts[1]);
		}
		if (url.$proxy && url.load)
			return url.load(this, callback, details);

		//promize
		if (typeof url === "function"){
			return url(details).then(
				webix.bind(function(data){
					webix.ajax.$callback(this, callback, "", data, -1);
				}, this),
				webix.bind(function(x){
					webix.ajax.$callback(this, callback, "", null, x, true);
				}, this)
			);
		}

		//normal url
		return webix.ajax(url,callback,this);
	},
	//loads data from object
	parse:function(data,type){
		//[webix.remote]
		if (data && data.then && typeof data.then == "function"){
			return data.then(webix.bind(function(data){ 
				if (data && typeof data.json == "function")
					data = data.json();
				this.parse(data, type); 
			}, this));
		}

		//loading data from other component
		if (data && data.sync && this.sync)
			return this.sync(data);

		this.callEvent("onBeforeLoad",[]);
		this.data.driver = webix.DataDriver[type||"json"];
		this._onLoad(data,null);
	},
	//default after loading callback
	_onLoad:function(text, response, loader){
		var driver = this.data.driver;
		var data;
		if (loader === -1)
			data = response;
		else
			data = driver.toObject(text, response);

		if (data)
			this.data = driver.getDetails(driver.getRecords(data)[0]);
		else 
			this._onLoadError(text,response,loader);

		this.callEvent("onAfterLoad",[]);
		this.waitData.resolve();
	},
	_onLoadError:function(text, xml, xhttp){
		this.callEvent("onAfterLoad",[]);
		this.callEvent("onLoadError",arguments);
		webix.callEvent("onLoadError", [text, xml, xhttp, this]);
	},
	_check_data_feed:function(data){
		if (!this._settings.dataFeed || this._ignore_feed || !data) return true;
		var url = this._settings.dataFeed;
		if (typeof url == "function")
			return url.call(this, (data.id||data), data);
		url = url+(url.indexOf("?")==-1?"?":"&")+"action=get&id="+encodeURIComponent(data.id||data);
		this.callEvent("onBeforeLoad",[]);
		webix.ajax(url, function(text,xml,loader){
			this._ignore_feed=true;
			var driver = webix.DataDriver.json;
			var data = driver.toObject(text, xml);
			if (data)
				this.setValues(driver.getDetails(driver.getRecords(data)[0]));
			else
				this._onLoadError(text,xml,loader);
			this._ignore_feed=false;
			this.callEvent("onAfterLoad",[]);
		}, this);
		return false;
	}
};

/*
	Abstraction layer for different data types
*/

webix.DataDriver={};
webix.DataDriver.json={
	//convert json string to json object if necessary
	toObject:function(data){
		if (!data) return null;
		if (typeof data == "string"){
			try{
				if (this.parseDates){
					var isodate = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
					data = JSON.parse(data, function(key, value){
						if (typeof value == "string"){
							if (isodate.test(value))
								return new Date(value);
						}
						return value;
					});
				} else {
					if(webix.env.strict){
						data =JSON.parse(data);
					}
					else{
						eval("webix.temp="+data);
						data = webix.temp;
					}

				}
			} catch(e){
				webix.assert_error(e);
				return null;
			}
		}

		return data;
	},
	//get array of records
	getRecords:function(data){
		if (data && data.data)
			data = data.data;

		if (data && !webix.isArray(data))
			return [data];
		return data;
	},
	//get hash of properties for single record
	getDetails:function(data){
		if (typeof data == "string")
			return { id:(data||webix.uid()), value:data };
		return data;
	},
	getOptions:function(data){
		return data.collections;
	},
	//get count of data and position at which new data need to be inserted
	getInfo:function(data){
		return { 
		 _size:(data.total_count||0),
		 _from:(data.pos||0),
		 _parent:(data.parent||0),
		 _config:(data.config),
		 _key:(data.webix_security)
		};
	},
	child:"data",
	parseDates:false
};

webix.DataDriver.html={
	/*
		incoming data can be
		 - ID of parent container
		 - HTML text
	*/
	toObject:function(data){
		if (typeof data == "string"){
		 var t=null;
		 if (data.indexOf("<")==-1)	//if no tags inside - probably its an ID
			t = webix.toNode(data);
		 if (!t){
			t=document.createElement("DIV");
			t.innerHTML = data;
		 }
		 
		 return t.firstChild;
		}
		return data;
	},
	//get array of records
	getRecords:function(node){
		return node.getElementsByTagName(this.tag);
	},
	//get hash of properties for single record
	getDetails:function(data){
		return webix.DataDriver.xml.tagToObject(data);
	},
	getOptions:function(){ 
		return false;
	},
	//dyn loading is not supported by HTML data source
	getInfo:function(data){
		return { 
		 _size:0,
		 _from:0
		};
	},
	tag: "LI"
};

webix.DataDriver.jsarray={
	//eval jsarray string to jsarray object if necessary
	toObject:function(data){
		if (typeof data == "string"){
			if(webix.env.strict){
				return JSON.parse(data);
			}
			else{
				eval ("webix.temp="+data);
				return webix.temp;
			}

		}
		return data;
	},
	//get array of records
	getRecords:function(data){
		return data;
	},
	//get hash of properties for single record, in case of array they will have names as "data{index}"
	getDetails:function(data){
		var result = {};
		for (var i=0; i < data.length; i++)
		 result["data"+i]=data[i];
		if (this.idColumn !== null)
			result.id = data[this.idColumn];
		 
		return result;
	},
	getOptions:function(){ return false; },
	//dyn loading is not supported by js-array data source
	getInfo:function(data){
		return { 
		 _size:0,
		 _from:0
		};
	},
	idColumn:null
};

webix.DataDriver.csv={
	//incoming data always a string
	toObject:function(data){
		return data;
	},
	//get array of records
	getRecords:function(data){
		return data.split(this.row);
	},
	//get hash of properties for single record, data named as "data{index}"
	getDetails:function(data){
		data = this.stringToArray(data);
		var result = {};
		for (var i=0; i < data.length; i++) 
			result["data"+i]=data[i];

		if (this.idColumn !== null)
			result.id = data[this.idColumn];
		 
		return result;
	},
	getOptions:function(){ return false; },
	//dyn loading is not supported by csv data source
	getInfo:function(data){
		return { 
		 _size:0,
		 _from:0
		};
	},
	//split string in array, takes string surrounding quotes in account
	stringToArray:function(data){
		data = data.split(this.cell);
		for (var i=0; i < data.length; i++)
		 data[i] = data[i].replace(/^[ \t\n\r]*(\"|)/g,"").replace(/(\"|)[ \t\n\r]*$/g,"");
		return data;
	},
	idColumn:null,
	row:"\n",	//default row separator
	cell:","	//default cell separator
};

webix.DataDriver.xml={
	_isValidXML:function(data){
		if (!data || !data.documentElement)
			return null;
		if (data.getElementsByTagName("parsererror").length)
			return null;
		return data;
	},
	//convert xml string to xml object if necessary
	toObject:function(text, response){
		var data = response ? (response.rawxml ? response.rawxml() : response) :null;
		if (this._isValidXML(data))
			return data;
		if (typeof text == "string")
			data = this.fromString(text.replace(/^[\s]+/,""));
		else
			data = text;

		if (this._isValidXML(data))
			return data;
		return null;
	},
	//get array of records
	getRecords:function(data){
		return this.xpath(data,this.records);
	},
	records:"/*/item",
	child:"item",
	config:"/*/config",
	//get hash of properties for single record
	getDetails:function(data){
		return this.tagToObject(data,{});
	},
	getOptions:function(){ 
		return false;
	},
	//get count of data and position at which new data_loading need to be inserted
	getInfo:function(data){
		
		var config = this.xpath(data, this.config);
		if (config.length)
			config = this.assignTypes(this.tagToObject(config[0],{}));
		else 
			config = null;

		return { 
		 _size:(data.documentElement.getAttribute("total_count")||0),
		 _from:(data.documentElement.getAttribute("pos")||0),
		 _parent:(data.documentElement.getAttribute("parent")||0),
		 _config:config,
		 _key:(data.documentElement.getAttribute("webix_security")||null)
		};
	},
	//xpath helper
	xpath:function(xml,path){
		if (window.XPathResult){	//FF, KHTML, Opera
		 var node=xml;
		 if(xml.nodeName.indexOf("document")==-1)
		 xml=xml.ownerDocument;
		 var res = [];
		 var col = xml.evaluate(path, node, null, XPathResult.ANY_TYPE, null);
		 var temp = col.iterateNext();
		 while (temp){ 
			res.push(temp);
			temp = col.iterateNext();
		}
		return res;
		}	
		else {
			var test = true;
			try {
				if (typeof(xml.selectNodes)=="undefined")
					test = false;
			} catch(e){ /*IE7 and below can't operate with xml object*/ }
			//IE
			if (test)
				return xml.selectNodes(path);
			else {
				//there is no interface to do XPath
				//use naive approach
				var name = path.split("/").pop();

				return xml.getElementsByTagName(name);
			}
		}
	},
	assignTypes:function(obj){
		for (var k in obj){
			var test = obj[k];
			if (typeof test == "object")
				this.assignTypes(test);
			else if (typeof test == "string"){
				if (test === "") 
					continue;
				if (test == "true")
					obj[k] = true;
				else if (test == "false")
					obj[k] = false;
				else if (test == test*1)
					obj[k] = obj[k]*1;
			}
		}
		return obj;
	},
	//convert xml tag to js object, all subtags and attributes are mapped to the properties of result object
	tagToObject:function(tag,z){
		var isArray = tag.nodeType == 1 && tag.getAttribute("stack");
		var hasSubTags = 0;

		if (!isArray){
			z=z||{};
			

			//map attributes
			var a=tag.attributes;
			if(a && a.length)
				for (var i=0; i<a.length; i++){
			 		z[a[i].name]=a[i].value;
			 		var hasSubTags = 1;
			 	}

			//map subtags
			var b=tag.childNodes;
			for (var i=0; i<b.length; i++)
				if (b[i].nodeType==1){
					var name = b[i].tagName;
					if (z[name]){
						if (typeof z[name].push != "function")
							z[name] = [z[name]];
						z[name].push(this.tagToObject(b[i],{}));
					} else
						z[name]=this.tagToObject(b[i],{});	//sub-object for complex subtags
					hasSubTags = 2;
				}

			if (!hasSubTags)
				return this.nodeValue(tag);
			//each object will have its text content as "value" property
			//only if has not sub tags
			if (hasSubTags < 2)
				z.value = z.value||this.nodeValue(tag);

		} else {
			z = [];
			var b=tag.childNodes;
			for (var i=0; i<b.length; i++)
				if (b[i].nodeType==1)
					z.push(this.tagToObject(b[i],{}));
		}

		return z;
	},
	//get value of xml node 
	nodeValue:function(node){
		if (node.firstChild){
			return node.firstChild.wholeText || node.firstChild.data;
		}
		return "";
	},
	//convert XML string to XML object
	fromString:function(xmlString){
		try{
			if (window.DOMParser)		// FF, KHTML, Opera
				return (new DOMParser()).parseFromString(xmlString,"text/xml");
			if (window.ActiveXObject){	// IE, utf-8 only 
				var temp=new ActiveXObject("Microsoft.xmlDOM");
				temp.loadXML(xmlString);
				return temp;
			}
		} catch(e){
			webix.assert_error(e);
			return null;
		}
		webix.assert_error("Load from xml string is not supported");
	}
};


webix.debug_code(function(){
	webix.debug_load_event = webix.attachEvent("onLoadError", function(text, xml, xhttp, owner){
		text = text || "[EMPTY DATA]";
		var error_text = "Data loading error, check console for details";
		if (text.indexOf("<?php") === 0)
			error_text = "PHP support missed";
		else if (text.indexOf("WEBIX_ERROR:") === 0)
			error_text = text.replace("WEBIX_ERROR:","");

		if (webix.message)
			webix.message({
				type:"debug",
				text:error_text,
				expire:-1
			});
		if (window.console){
			var logger = window.console;
			logger.log("Data loading error");
			logger.log("Object:", owner);
			logger.log("Response:", text);
			logger.log("XHTTP:", xhttp);
		}
	});

	webix.ready(function(){
		var path = document.location.href;
		if (path.indexOf("file:")===0){
			if (webix.message)
				webix.message({
					type:"error", 
					text:"Please open sample by http,<br>not as file://",
					expire:-1
				});
			else 
				window.alert("Please open sample by http, not as file://");
		}
	});
	
});


//UI interface
webix.BaseBind = {
	bind:function(target, rule, format){
		if (!this.attachEvent)
			webix.extend(this, webix.EventSystem);

		if (typeof target == 'string')
			target = webix.$$(target);
			
		if (target._initBindSource) target._initBindSource();
		if (this._initBindSource) this._initBindSource();

		
			
		if (!target.getBindData)
			webix.extend(target, webix.BindSource);

		this._bind_ready();

		target.addBind(this._settings.id, rule, format);
		this._bind_source = target._settings.id;

		if (webix.debug_bind)
			webix.log("[bind] "+this.name+"@"+this._settings.id+" <= "+target.name+"@"+target._settings.id);

		var target_id = this._settings.id;
		//FIXME - check for touchable is not the best solution, to detect necessary event
		this._bind_refresh_handler = this.attachEvent(this.touchable?"onAfterRender":"onBindRequest", function(){
			return target.getBindData(target_id);
		});

		if (this.refresh && this.isVisible(this._settings.id))
			this.refresh();
	},
	unbind:function(){
		if (this._bind_source){
			var target = webix.$$(this._bind_source);
			if (target)
				target.removeBind(this._settings.id);
			this.detachEvent(this._bind_refresh_handler);
			this._bind_source = null;
		}
	},
	_bind_ready:function(){
		var config = this._settings;
		if (this.filter){
			var key = config.id;
			this.data._on_sync = webix.bind(function(){
				webix.$$(this._bind_source)._bind_updated[key] = false;
			}, this);
		}

		var old_render = this.render;
		this.render = function(){
			if (this._in_bind_processing) return;
			
			this._in_bind_processing = true;
			var result = this.callEvent("onBindRequest");
			this._in_bind_processing = false;
			
			return old_render.apply(this, ((result === false)?arguments:[]));
		};

		if (this.getValue||this.getValues)
			this.save = function(){
				if (this.validate && !this.validate()) return false;
				webix.$$(this._bind_source).setBindData((this.getValue?this.getValue:this.getValues()),this._settings.id);
				//reset form, so it will be counted as saved
				if (this.setDirty)
					this.setDirty(false);
			};

		//we want to refresh list after data loading if it has master link
		//in same time we do not want such operation for dataFeed components
		//as they are reloading data as response to the master link
		if (!config.dataFeed && this.loadNext)
			this.data.attachEvent("onStoreLoad", webix.bind(function(){
				if (this._bind_source)
					webix.$$(this._bind_source)._bind_updated[this._settings.id] = false;
			}, this));

		this._bind_ready = function(){};
	}
};

//bind interface
webix.BindSource = {
	$init:function(){
		this._bind_hash = {};		//rules per target
		this._bind_updated = {};	//update flags
		this._ignore_binds = {};
		
		//apply specific bind extension
		this._bind_specific_rules(this);
	},
	saveBatch:function(code){
		this._do_not_update_binds = true;
		code.call(this);
		this._do_not_update_binds = false;
		this._update_binds();
	},
	setBindData:function(data, key){
		//save called, updating master data
		if (key)
			this._ignore_binds[key] = true;

		if (webix.debug_bind)
				webix.log("[bind:save] "+this.name+"@"+this._settings.id+" <= "+"@"+key);
		if (this.setValue)
			this.setValue(data);
		else if (this.setValues)
			this.setValues(data);
		else {
			var id = this.getCursor();
			if (id)
				this.updateItem(id, data);
			else
				this.add(data);
		}
		this.callEvent("onBindUpdate", [data, key]);		
		if (this.save)
			this.save();
		
		if (key)
			this._ignore_binds[key] = false;
	},
	//fill target with data
	getBindData:function(key, update){
		//fire only if we have data updates from the last time
		if (this._bind_updated[key]) return false;
		var target = webix.$$(key);
		//fill target only when it visible
		if (target.isVisible(target._settings.id)){
			this._bind_updated[key] = true;
			if (webix.debug_bind)
				webix.log("[bind:request] "+this.name+"@"+this._settings.id+" => "+target.name+"@"+target._settings.id);
			this._bind_update(target, this._bind_hash[key][0], this._bind_hash[key][1]); //trigger component specific updating logic
			if (update && target.filter)
				target.refresh();
		}
	},
	//add one more bind target
	addBind:function(source, rule, format){
		this._bind_hash[source] = [rule, format];
	},
	removeBind:function(source){
		delete this._bind_hash[source];
		delete this._bind_updated[source];
		delete this._ignore_binds[source];
	},
	//returns true if object belong to "collection" type
	_bind_specific_rules:function(obj){
		if (obj.filter)
			webix.extend(this, webix.CollectionBind);
		else if (obj.setValue)
			webix.extend(this, webix.ValueBind);
		else
			webix.extend(this, webix.RecordBind);
	},
	//inform all binded objects, that source data was updated
	_update_binds:function(){
		if (!this._do_not_update_binds)
			for (var key in this._bind_hash){
				if (this._ignore_binds[key]) continue;
				this._bind_updated[key] = false;
				this.getBindData(key, true);
			}
	},
	//copy data from source to the target
	_bind_update_common:function(target, rule, data){
		if (target.setValue)
			target.setValue((data&&rule)?data[rule]:data);
		else if (!target.filter){
			if (!data && target.clear)
				target.clear();
			else {
				if (target._check_data_feed(data))
					target.setValues(webix.clone(data));
			}
		} else {
			target.data.silent(function(){
				this.filter(rule,data);
			});
		}
		target.callEvent("onBindApply", [data,rule,this]);
	}
};


//pure data objects
webix.DataValue = webix.proto({
	name:"DataValue",
	isVisible:function(){ return true; },
	$init:function(config){ 
		if (!config || webix.isUndefined(config.value))
			this.data = config||"";

		var id = (config&&config.id)?config.id:webix.uid();
		this._settings = { id:id };
		webix.ui.views[id] = this;
	},
	setValue:function(value){
		this.data = value;
		this.callEvent("onChange", [value]);
	},
	getValue:function(){
		return this.data;
	},
	refresh:function(){ this.callEvent("onBindRequest"); }
}, webix.EventSystem, webix.BaseBind);

webix.DataRecord = webix.proto({
	name:"DataRecord",
	isVisible:function(){ return true; },
	$init:function(config){
		this.data = config||{}; 
		var id = (config&&config.id)?config.id:webix.uid();
		this._settings = { id:id };
		webix.ui.views[id] = this;
	},
	getValues:function(){
		return this.data;
	},
	setValues:function(data, update){
		this.data = update?webix.extend(this.data, data, true):data;
		this.callEvent("onChange", [data]);
	},
	refresh:function(){ this.callEvent("onBindRequest"); }
}, webix.EventSystem, webix.BaseBind, webix.AtomDataLoader, webix.Settings);


webix.ValueBind={
	$init:function(){
		this.attachEvent("onChange", this._update_binds);
	},
	_bind_update:function(target, rule, format){
		rule = rule || "value";
		var data = this.getValue()||"";
		if (format) data = format(data);
		
		if (target.setValue)
			target.setValue(data);
		else if (!target.filter){
			var pod = {}; pod[rule] = data;
			if (target._check_data_feed(data))
				target.setValues(pod);
		} else{
			target.data.silent(function(){
				this.filter(rule,data);
			});
		}
		target.callEvent("onBindApply", [data,rule,this]);
	}
};

webix.RecordBind={
	$init:function(){
		this.attachEvent("onChange", this._update_binds);		
	},
	_bind_update:function(target, rule, format){
		var data = this.getValues()||null;
		if (format)
			data = format(data);
		this._bind_update_common(target, rule, data);
	}
};

webix.CollectionBind={
	$init:function(){
		this._cursor = null;
		this.attachEvent("onSelectChange", function(data){
			var sel = this.getSelectedId();
			this.setCursor(sel?(sel.id||sel):null);
		});
		this.attachEvent("onAfterCursorChange", this._update_binds);		
		this.attachEvent("onAfterDelete", function(id){
			if (id == this.getCursor())
				this.setCursor(null);
		});
		this.data.attachEvent("onStoreUpdated", webix.bind(function(id, data, mode){
			//paint - ignored
			//delete - handled by onAfterDelete above
			if (id && id == this.getCursor() && mode != "paint" && mode != "delete")
				this._update_binds();
			
		},this));
		this.data.attachEvent("onClearAll", webix.bind(function(){
			this._cursor = null;
		},this));
		this.data.attachEvent("onIdChange", webix.bind(function(oldid, newid){
			if (this._cursor == oldid){
				this._cursor = newid;
				this._update_binds();
			}
		},this));
	},
	refreshCursor:function(){
		if (this._cursor)
			this.callEvent("onAfterCursorChange",[this._cursor]);
	},
	setCursor:function(id){
		if (id == this._cursor || (id !== null && !this.getItem(id))) return;
		
		this.callEvent("onBeforeCursorChange", [this._cursor]);
		this._cursor = id;
		this.callEvent("onAfterCursorChange",[id]);
	},
	getCursor:function(){
		return this._cursor;
	},
	_bind_update:function(target, rule, format){
		if (rule == "$level" && this.data.getBranch)
			return (target.data || target).importData(this.data.getBranch(this.getCursor()));

		var data = this.getItem(this.getCursor())|| this._settings.defaultData || null;
		if (rule == "$data"){
			if (typeof format === "function")
				return format.call(target, data, this);
			else
				return target.data.importData(data?data[format]:[]);
		}

		if (format)
			data = format(data);
		this._bind_update_common(target, rule, data);
	}
};	



/*
	REnders single item. 
	Can be used for elements without datastore, or with complex custom rendering logic
	
	@export
		render
*/



webix.AtomRender={
	//convert item to the HTML text
	_toHTML:function(obj){
		if (obj.$empty )
			return "";
		return this._settings.template(obj, this);
	},
	//render self, by templating data object
	render:function(){
		if (this.isVisible(this._settings.id)){
			if (webix.debug_render)
				webix.log("Render: "+this.name+"@"+this._settings.id);
			if (!this.callEvent || this.callEvent("onBeforeRender",[this.data])){
				if (this.data && !this._settings.content)
					this._dataobj.innerHTML = this._toHTML(this.data);
				if (this.callEvent) this.callEvent("onAfterRender",[]);
			}
			return true;
		}
		return false;
	},
	sync:function(source){
		this._backbone_sync = false;
		if (source.name != "DataStore"){
			if (source.data && source.name == "DataStore"){
				source = source.data;
			} else {
				this._backbone_sync = true;
			}
		}
			

		if (this._backbone_sync)
			source.bind("change", webix.bind(function(data){
				if (data.id == this.data.id){
					this.data = data.attributes;
					this.refresh();
				}
			}, this));
		else
			source.attachEvent("onStoreUpdated", webix.bind(function(id){
				if (!id || id == this.data.id){
					this.data = source.pull[id];
					this.refresh();
				}
			}, this));
	},
	template_setter:webix.template
};

webix.SingleRender=webix.proto({
    template_setter:function(value){
		this.type.template=webix.template(value);
	},
	//convert item to the HTML text
	_toHTML:function(obj){
		var type = this.type;
		return (type.templateStart?type.templateStart(obj,type):"") + type.template(obj,type) + (type.templateEnd?type.templateEnd(obj,type):"");
	},
	customize:function(obj){
		webix.type(this,obj);
	}
}, webix.AtomRender);

webix.UIManager = {
	_view: null,
	_hotkeys: {},
	_focus_time:0,
	_controls: {
		'enter': 13,
		'tab': 9,
		'esc': 27,
		'escape': 27,
		'up': 38,
		'down': 40,
		'left': 37,
		'right': 39,
		'pgdown': 34,
		'pagedown': 34,
		'pgup': 33,
		'pageup': 33,
		'end': 35,
		'home': 36,
		'delete': 46,
		'backspace': 8,
		'space': 32,
		'meta': 91,
		'win': 91,
		'mac': 91
	},
	_enable: function() {
		// attaching events here
		webix.event(document.body, "click", webix.bind(this._focus_click, this));
		webix.event(document, "keydown", webix.bind(this._keypress, this));
		if (document.body.addEventListener)
			document.body.addEventListener("focus", webix.bind(this._focus_tab, this), true);

		webix.destructors.push(this);
	},
	destructor:function(){
		webix.UIManager._view = null;
	},
	getFocus: function() {
		return this._view;
	},
	_focus_action:function(view){
		this._focus_was_there = this._focus_was_there || view._settings.id;
	},
	setFocus: function(view, only_api){
		//view can be empty
		view = webix.$$(view);
		//unfocus if view is hidden
		if (view && !view.$view) view = null;
		this._focus_time = new Date();
		
		if (this._view === view) return true;
		if (this._view && this._view.callEvent)
			this._view.callEvent("onBlur", [this._view]);

		if (view && view.callEvent)
			view.callEvent("onFocus", [view, this._view]);
		webix.callEvent("onFocusChange", [view, this._view]);

		if (this._view && this._view.blur && !only_api) this._view.blur();
		this._view = view;
		if (view && view.focus && !only_api) view.focus();
		return true;
	},
	hasFocus: function(view) {
		return (view === this._view) ? true : false;
	},
	_focus: function(e, dont_clear) {
		var view = webix.html.locate(e, "view_id") || this._focus_was_there;

		//if html was repainted we can miss the view, so checking last processed one
		view = webix.$$(view);
		this._focus_was_there = null;

		if (view == this._view) return;

		if (!dont_clear)
			this._focus_was_there = null;
		
		if (view){
			view = webix.$$(view);
			if (this.canFocus(view))
				this.setFocus(view);
		} else if (!dont_clear)
			this.setFocus(null);

		return true;
	},
	_focus_click:function(e){
		// if it was onfocus/onclick less then 100ms behore then we ignore it
		if ((new Date())-this._focus_time < 100) return false;
		return this._focus(e);
	},
	_focus_tab: function(e) {
		return this._focus(e, true);
	},
	canFocus:function(view){
		return view.isVisible() && view.isEnabled();
	},

	_moveChildFocus: function(check_view){
		var focus = this.getFocus();
		//we have not focus inside of closing item
		if (check_view && !this._is_child_of(check_view, focus))
			return false;

		if (!this._focus_logic("getPrev", check_view))
			this.setFocus(this.getPrev(check_view));
		else 
			this._view = null;
	},

	_is_child_of: function(parent, child) {
		if (!parent) return false;
		if (!child) return false;
		while (child) {
			if (child === parent) return true;
			child = child.getParentView();
		}
		return false;
	},
	_keypress_timed:function(){
		if (this && this.callEvent)
			this.callEvent("onTimedKeyPress",[]);
	},
	_keypress: function(e) {
		var code = e.which || e.keyCode;
		if(code>95 && code< 112)
			code -= 48; //numpad support
		var ctrl = e.ctrlKey;
		var shift = e.shiftKey;
		var alt = e.altKey;
		var meta = e.metaKey;
		var codeid = this._keycode(code, ctrl, shift, alt, meta);
		var view = this.getFocus();
		if (view && view.callEvent) {
			if (view.callEvent("onKeyPress", [code,e]) === false)
				webix.html.preventEvent(e);
			if (view.hasEvent("onTimedKeyPress")){
				clearTimeout(view._key_press_timeout);
				view._key_press_timeout = webix.delay(this._keypress_timed, view, [], (view._settings.keyPressTimeout||250));
			}
		}

		if (this.tabControl){
			// tab pressed
			if (code === 9 && !ctrl && !alt && !meta) {
				this._focus_logic(!shift ? "getNext" : "getPrev");
				webix.html.preventEvent(e);
			}
		}

		codeid = this._keycode(String.fromCharCode(code), ctrl, shift, alt, meta);
		//flag, that some non-special key was pressed
		var is_any = !ctrl && !alt && !meta && (code!=9)&&(code!=27)&&(code!=13);

		if (this._check_keycode(codeid, is_any, e) === false) {
			webix.html.preventEvent(e);
			return false;
		}
	},

	// dir - getNext or getPrev
	_focus_logic: function(dir) {
		if (!this.getFocus()) return null;

		dir = dir || "getNext";
		var next = this.getFocus();
		var start = next;
		var marker = webix.uid();

		while (true) {
			next = this[dir](next);
			// view with focus ability
			if (next && next._settings.tabFocus && this.canFocus(next))
				return this.setFocus(next);

			// elements with focus ability not found
			if (next === start || next.$fmarker == marker)
				return null;
			
			//prevents infinity loop
			next.$fmarker = marker;
		}
	},

	getTop: function(id) {
		var next, view = webix.$$(id);

		while (view && (next = view.getParentView()))
			view = next;
		return view;
	},

	getNext: function(view, _inner_call) {
		var cells = view.getChildViews();
		//tab to first children
		if (cells.length && !_inner_call) return cells[0];

		//unique case - single view without child and parent
		var parent = view.getParentView();
		if (!parent)
			return view;

		var p_cells = parent.getChildViews();
		if (p_cells.length){
			var index = webix.PowerArray.find.call(p_cells, view)+1;
			while (index < p_cells.length) {
				//next visible child
				if (this.canFocus(p_cells[index])) 
					return p_cells[index];

				index++;
			}
		} 

		//sibling of parent
		return this.getNext(parent, true);
	},

	getPrev: function(view, _inner_call) {
		var cells = view.getChildViews();
		//last child of last child
		if (cells.length && _inner_call) 
			return this.getPrev(cells[cells.length - 1], true);
		if (_inner_call) return view;

		//fallback from top to bottom
		var parent = view.getParentView();
		if (!parent) return this.getPrev(view, true);


		var p_cells = parent.getChildViews();
		if (p_cells) {
			var index = webix.PowerArray.find.call(p_cells, view)-1;
			while (index >= 0) {
				if (this.canFocus(p_cells[index]))
					return this.getPrev(p_cells[index], true);
				index--;
			}
		}

		return parent;
	},

	addHotKey: function(keys, handler, view) {
		webix.assert(handler, "Hot key handler is not defined");
		var pack = this._parse_keys(keys);
		webix.assert(pack.letter, "Unknown key code");
		if (!view) view = null;
		pack.handler = handler;
		pack.view = view;
		

		var code = this._keycode(pack.letter, pack.ctrl, pack.shift, pack.alt, pack.meta);
		if (!this._hotkeys[code]) this._hotkeys[code] = [];
		this._hotkeys[code].push(pack);

		return keys;
	},
	removeHotKey: function(keys, func, view){
		var pack = this._parse_keys(keys);
		var code = this._keycode(pack.letter, pack.ctrl, pack.shift, pack.alt, pack.meta);
		if (!func && !view)
			delete this._hotkeys[code];
		else {
			var t = this._hotkeys[code];
			if (t){
				for (var i = t.length - 1; i >= 0; i--) {
					if (view && t[i].view !== view) continue;
					if (func && t[i].handler !== func) continue;
					t.splice(i,1);
				}
				if (!t.length)
					delete this._hotkeys[code];
			}

		}
	},
	_keycode: function(code, ctrl, shift, alt, meta) {
		return code+"_"+["", (ctrl ? '1' : '0'), (shift ? '1' : '0'), (alt ? '1' : '0'), (meta ? '1' : '0')].join('');
	},

	_check_keycode: function(code, is_any, e){
		var focus = this.getFocus();
		if (this._hotkeys[code])
			return  this._process_calls(this._hotkeys[code], focus, e);
		else if (is_any && this._hotkeys["ANY_0000"])
			return  this._process_calls(this._hotkeys["ANY_0000"], focus, e);

		return true;
	},
	_process_calls:function(calls, focus, e){
		for (var i = 0; i < calls.length; i++) {
			var key = calls[i];
			var call = false;
			if ((key.view !== null) &&		//common hot-key
				(focus !== key.view) &&		//hot-key for current view
				//hotkey for current type of view
				(typeof(key.view) !== 'string' || !focus || focus.name !== key.view)) continue;

			var temp_result = key.handler(focus, e);
			if (!!temp_result === temp_result) return temp_result;
		}
		return true;
	},
	_parse_keys: function(keys) {
		var controls = this._controls;
		var parts = keys.toLowerCase().split(/[\+\-_]/);
		var ctrl, shift, alt, meta;
		ctrl = shift = alt = meta = 0;
		var letter = "";
		for (var i = 0; i < parts.length; i++) {
			if (parts[i] === 'ctrl') ctrl = 1;
			else if (parts[i] === 'shift') shift = 1;
			else if (parts[i] === 'alt') alt = 1;
			else if (parts[i] === 'command') meta = 1;
			else {
				if (controls[parts[i]]) {
					letter = String.fromCharCode(controls[parts[i]]);
				} else {
					letter = parts[i];
				}
			}
		}

		return {
			letter: letter.toUpperCase(),
			ctrl: ctrl,
			shift: shift,
			alt: alt,
			meta: meta,
			debug:keys
		};
	}
};

webix.ready(function() {
	webix.UIManager._enable();

	webix.UIManager.addHotKey("enter", function(view){
		if (view && view.editStop && view._in_edit_mode){
			view.editStop();
			return true;
		}
	});
	webix.UIManager.addHotKey("esc", function(view){
		if (view){
			if (view.editCancel && view._in_edit_mode){
				view.editCancel();
				return true;
			}
			var top = view.getTopParentView();
			if (top && top.setPosition)
				top._hide();
		}
	});
	webix.UIManager.addHotKey("shift+tab", function(view, e){
		if (view && view._custom_tab_handler && !view._custom_tab_handler(false, e))
			return false;

		if (view && view._in_edit_mode){
			if (view.editNext)
				return view.editNext(false);
			else if (view.editStop){
				view.editStop();
				return true;
			}
		} 
			
	});
	webix.UIManager.addHotKey("tab", function(view, e){
		if (view && view._custom_tab_handler && !view._custom_tab_handler(true, e))
			return false;

		if (view && view._in_edit_mode){
			if (view.editNext)
				return view.editNext(true);
			else if (view.editStop){
				view.editStop();
				return true;
			}
		} else
			webix.delay(function(){
				webix.UIManager.setFocus(webix.$$(document.activeElement), true);
			},1);
	});
});

webix.IdSpace = {
	$init:function(){
		this._elements = {};
		this._translate_ids = {};
		this.getTopParentView = webix.bind(function(){ return this;}, this);

		this._run_inner_init_logic();
		this.$ready.push(this._run_after_inner_init_logic);
	},
	$$:function(id){
		return this._elements[id];
	},
	innerId:function(id){
		return this._translate_ids[id];
	},
	_run_inner_init_logic:function(callback){
		this._prev_global_col = webix._global_collection;
		webix._global_collection = this;
	},
	_run_after_inner_init_logic:function(temp){
		for (var name in this._elements){
			var input = this._elements[name];
			if (this.callEvent && input.mapEvent && !input._evs_map.onitemclick)
				input.mapEvent({
					onitemclick:this
				});
			input.getTopParentView = this.getTopParentView;
		}

		webix._global_collection = this._prev_global_col;
		this._prev_global_col = 0;
	},
	ui:function(){
		this._run_inner_init_logic();
		var temp = webix.ui.apply(webix, arguments);
		this._run_after_inner_init_logic();
		return temp;
	}
};


(function(){

var resize = [];
var ui = webix.ui;

if (!webix.ui){
	ui = webix.ui = function(config, parent, id){
		webix._ui_creation = true;
		var node = webix.toNode((config.container||parent)||document.body);

		var top_node;
		var body_child = (node == document.body);
		if (config._settings || (node && webix.isArray(config))){
			top_node = config;
		} else {
			if (node && body_child)
				config.$topView = true;
			if (!config._inner)
				config._inner = {};
			top_node = ui._view(config);
		}

		if (body_child && !top_node.setPosition)
			webix.ui._fixHeight();

		if (top_node._settings && top_node._settings._hidden && !node.$view){
			top_node._settings._container = node;
		} else if (!top_node.$apiOnly){
			if (node.appendChild){
				node.appendChild(top_node._viewobj);
				//resize window with position center or top
				//do not resize other windows and elements
				// which are attached to custom html containers
				if (((!top_node.setPosition || top_node._settings.fullscreen) && node == document.body) || top_node._settings.position )
					resize.push(top_node);
				if (!config.skipResize)
					top_node.adjust();
			} else if (node.destructor){
				//addView or view moving with target id
				if (!id && id!==0 && !webix.isArray(top_node)){
					id = node;
					node = node.getParentView();
				}
				//if target supports view adding
				if (node && node._replace){
					//if source supports view removing
					if (top_node.getParentView && top_node.getParentView())
						top_node.getParentView()._remove(top_node);

					node._replace(top_node, id);
				}
			} else
				webix.assert_error("Not existing parent:"+config.container);
		}
		
		webix._ui_creation = false;
		return top_node;
	};
}

webix.ui.animate = function(ui, parent, config){
	var pobj = webix.$$(parent);
	if (pobj){
		var aniset = config || { type:"slide", direction:"left" };
		var d = pobj._viewobj.cloneNode(true);
		var view = webix.ui(ui, parent);

		view._viewobj.parentNode.appendChild(d);
		var line = webix.animate.formLine(
			view._viewobj,
			d,
			aniset
		);

		aniset.callback = function(){
			webix.animate.breakLine(line);
		};
		webix.animate(line, aniset);

		return view;
	}
};

/*called in baseview $init for calculate scrollSize*/
webix.ui._detectScrollSize = function(){
	var div = webix.html.create("div");
	div.className = "webix_skin_mark";
	div.style.cssText="position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;";

	document.body.appendChild(div);
	var width = div.offsetWidth-div.clientWidth;
	var skin = { 110:"air", 120:"aircompact", 130:"clouds", 140:"web", 150:"terrace", 160:"metro", 170:"light", 180:"glamour", 190:"touch", 200:"flat" , 210:"compact", 220:"material" }[Math.floor(div.offsetHeight/10)*10];
	document.body.removeChild(div);

	if (skin){
		var skinobj = webix.skin[skin];
		if (skinobj && skinobj != webix.skin.$active)
			webix.skin.set(skin);
	}

	if (webix.env.$customScroll) return 0;
	return width;
};
webix.ui.scrollSize = ((webix.env.touch||webix.env.$customScroll)?0:17);
webix.ready(function(){
	var size = webix.ui._detectScrollSize();
	webix.ui.scrollSize = webix.env.touch ? 0 : size;
});

webix.ui._uid = function(name){
	return "$"+name+(this._namecount[name] = (this._namecount[name]||0)+1);
};
webix.ui._namecount = {};

webix.ui._fixHeight = function (){
	webix.html.addStyle("html, body{ height:100%; }");
	document.body.className+=" webix_full_screen";
	webix.ui._fixHeight = function(){};
};
webix.ui.resize = function(){
	if (!webix.ui.$freeze)
		for (var i=resize.length - 1; i>=0; i--){
			//remove destroyed views from resize list
			if (resize[i].$destructed)
				resize.splice(i,1);
			else
				resize[i].adjust();
		}
};
webix.ui.each = function(parent, logic, master, include){
	if (parent){
		var children = include ? [parent] : parent.getChildViews();
		for (var i = 0; i < children.length; i++){
			if (logic.call((master || webix), children[i]) !== false)
				webix.ui.each(children[i], logic, master);
		}
	}
};
webix.event(window, "resize", webix.ui.resize);

ui._delays = {};
ui.delay = function(config){
	webix.ui._delays[config.id] = config;
};
ui.hasMethod = function(view, method){
	var obj = webix.ui[view];
	if (!obj) return false;

	if (obj._webix_proto_wait)
		obj = obj.call(webix);

	return !!webix.ui[view].prototype[method];
};
webix.ui.zIndex = function(){
	return webix.ui.zIndexBase++;
};
webix.ui.zIndexBase = 100;

ui._view = function(config){
	webix.assert_config(config);
	if (config.view){
		var view = config.view;
		webix.assert(ui[view], "unknown view:"+view);
		return new ui[view](config);
	} else if (config.rows || config.cols){
		var cells = config.rows||config.cols;
		var accordion = false;
		for (var i=0; i<cells.length; i++){
			if (cells[i].body && !cells[i].view)
				accordion = true;
		}
		if (accordion){
			return new ui.headerlayout(config);
		} else
			return new ui.layout(config);
	}
	else if (config.cells)
		return new ui.multiview(config);
	else if (config.template || config.content)
		return new ui.template(config);	
	else return new ui.spacer(config);
};

ui.views = {};
webix.$$ = function(id){
	if (!id) return null;
	
	if (ui.views[id]) return ui.views[id];
	if (ui._delays[id]) return webix.ui(ui._delays[id]);
	
	var name = id;
	if (typeof id == "object"){
		if (id._settings)
			return id;
		name = (id.target||id.srcElement)||id;
	}
	return ui.views[webix.html.locate({ target:webix.toNode(name)},"view_id")];
};
if (webix.isUndefined(window.$$)) window.$$=webix.$$;

webix.UIExtension = window.webix_view||{};

webix.protoUI({
	name:"baseview",
	//attribute , which will be used for ID storing
	$init:function(config){
		if (!config.id) 
			config.id = webix.ui._uid(this.name);
		
		this._parent_cell = webix._parent_cell;
		webix._parent_cell = null;

		this.$scope = config.$scope || (this._parent_cell ? this._parent_cell.$scope : null);
		
		if (!this._viewobj){
			this._contentobj = this._viewobj = webix.html.create("DIV",{
				"class":"webix_view"
			});
			this.$view = this._viewobj;
		}
	},
	$skin:false,
	defaults:{
		width:0,
		height:0,
		gravity:1
	},
	getNode:function(){
		return this._viewobj;
	},
	getParentView:function(){
		return this._parent_cell||null;	
	},
	getTopParentView:function(){
		var parent = this.getParentView();
		return parent ? parent.getTopParentView() :  this;
	},
	getFormView:function(){
		var parent = this.getParentView();
		return (!parent || parent.setValues) ? parent : parent.getFormView();
	},
	getChildViews:function(){ return []; },
	isVisible:function(base_id, prev_id){
		if (this._settings.hidden){
            if(base_id){
                if (!this._hidden_render) {
                    this._hidden_render = [];
                    this._hidden_hash = {};
                }
                if (!this._hidden_hash[base_id]){
                    this._hidden_hash[base_id] =  true;
                    this._hidden_render.push(base_id);
                }
            }
			return false;
		}
		
		var parent = this.getParentView();
		if (parent) return parent.isVisible(base_id, this._settings.id);
		
		return true;
	},
	isEnabled:function(){
		if(this._disable_cover)
			return false;

		var parent= this.getParentView();
		if(parent)
			return parent.isEnabled();

		return true;
	},
	disable:function(){
		webix.html.remove(this._disable_cover);
		this._settings.disabled = true;

		this._disable_cover = webix.html.create('div',{
			"class":"webix_disabled"
		});

		if(window.getComputedStyle)
			this._disabled_view_pos = window.getComputedStyle(this._viewobj, null).getPropertyValue("position");
		
		if (this._disabled_view_pos != "absolute")
			this._viewobj.style.position = "relative";
		this._viewobj.appendChild(this._disable_cover);
		webix.html.addCss(this._viewobj,"webix_disabled_view",true);
		webix.UIManager._moveChildFocus(this);
	},
	enable:function(){
		this._settings.disabled = false;

		if (this._disable_cover){
			webix.html.remove(this._disable_cover);
			webix.html.removeCss(this._viewobj,"webix_disabled_view");
			this._disable_cover = null;
			if(this._disabled_view_pos)
				this._viewobj.style.position = this._disabled_view_pos;
		}
	},
	disabled_setter:function(value){
		if (value)
			this.disable();
		else
			this.enable();
		return value;
	},
	container_setter:function(value){
		webix.assert(webix.toNode(value),"Invalid container");
		return true;
	},
	css_setter:function(value){
		if (typeof value == "object")
			value = webix.html.createCss(value);

		this._viewobj.className += " "+value;
		return value;
	},
	id_setter:function(value){
		if (webix._global_collection && webix._global_collection != this){
			var oldvalue = this.config.$id = value;
			webix._global_collection._elements[value] = this;
			value = webix.ui._uid(this.name);
			webix._global_collection._translate_ids[value]=oldvalue;
		}
		webix.assert(!webix.ui.views[value], "Non unique view id: "+value);
		webix.ui.views[value] = this;
		this._viewobj.setAttribute("view_id", value);
		return value;
	},
	$setSize:function(x,y){
		var last = this._last_size;
		if (last && last[0]==x && last[1]==y) {
			webix.debug_size_box(this, [x,y,"not changed"]);
			return false;
		}

		webix.debug_size_box(this, [x,y]);
		
		this._last_size = [x,y];
		this.$width  = this._content_width = x-(this._scroll_y?webix.ui.scrollSize:0);
		this.$height = this._content_height = y-(this._scroll_x?webix.ui.scrollSize:0);

		this._viewobj.style.width = x+"px";
		this._viewobj.style.height = y+"px";

		// temp. fix: Chrome [DIRTY]
		if (webix.env.isWebKit){
			var w = this._viewobj.offsetWidth;
			var h = this._viewobj.offsetHeight;
		}

		return true;
	},
	$getSize:function(dx, dy){
		var s = this._settings;

		var size = [
			s.width || s.minWidth || 0,
			s.width || s.maxWidth || 100000,
			s.height || s.minHeight || 0,
			s.height || s.maxHeight || 100000,
			s.gravity
		];
		size[0]+=dx; size[1]+=dx;
		size[2]+=dy; size[3]+=dy;
		return size;
	},
	show:function(force, animate_settings){
		var parent = this.getParentView();
        var show = !arguments[2];
		if (parent) {
			if(!animate_settings && animate_settings !== false && this._settings.animate)
				if (parent._settings.animate)
					animate_settings = webix.extend((parent._settings.animate?webix.extend({},parent._settings.animate):{}), this._settings.animate, true);

			if (show?parent._show:parent._hide)
				(show?parent._show:parent._hide).call(parent, this, animate_settings);
			if (show)
				this._render_hidden_views();
			if (force && show)  
				parent.show(force);
		}
        else{
            if (this._settings.hidden){
            	if (show){
            		var node = webix.toNode(this._settings._container||document.body);
        			node.appendChild(this._viewobj);
        			this._settings.hidden = false;

        			this.adjust();
        			this._render_hidden_views();
            	}
            } else {
            	if (!show){
            		this._settings.hidden = this._settings._hidden = true;
            		if (this._viewobj){
            			this._settings._container = this._viewobj.parentNode;
        				webix.html.remove(this._viewobj);
        			}
            	}
            }
        }
	},
	_render_hidden_views:function(){
		if (this._hidden_render){
			for (var i=0; i < this._hidden_render.length; i++){
				var ui_to_render = webix.$$(this._hidden_render[i]);
				if (ui_to_render)
					ui_to_render.render();
			}
			this._hidden_render = [];
			this._hidden_hash = {};
		}
	},
	hidden_setter:function(value){
		if (value) this.hide();
		return this._settings.hidden;
	},
	hide:function(){
		this.show(null, null, true);
		webix.UIManager._moveChildFocus(this);
	},
	adjust:function(){
		if(!this._viewobj.parentNode)
			return false;

		var x = this._viewobj.parentNode.offsetWidth||0;
		var y = this._viewobj.parentNode.offsetHeight||0;

		var sizes=this.$getSize(0,0);
		
		//minWidth
		if (sizes[0]>x) x = sizes[0];
		//minHeight
		if (sizes[2]>y) y = sizes[2];

		//maxWidth rule
		if (x>sizes[1]) x = sizes[1];
		//maxHeight rule
		if (y>sizes[3]) y = sizes[3];

		this.$setSize(x,y);
	},
	resize:function(force){
		if (webix._child_sizing_active || webix.ui.$freeze) return;

		var parent = this.getParentView();
		if (parent){
			if (parent.resizeChildren)
				parent.resizeChildren();
			else
				parent.resize();
		} else {
			this.adjust();
		}
	}
}, webix.Settings, webix.Destruction, webix.BaseBind, webix.UIExtension);



/*
	don't render borders itself , but aware of layout , which can set some borders
*/
webix.protoUI({
	name:"view",
	$init:function(config){
		this._set_inner(config);
	},

	//deside, will component use borders or not
	_set_inner:function(config){
		var border_not_set = webix.isUndefined(config.borderless);
		if (border_not_set && !this.setPosition && config.$topView){
			config.borderless = true;
			border_not_set = false;
		}

		if ((border_not_set && this.defaults.borderless) || config.borderless){
			//button and custom borderless
			config._inner = { top:true, left:true, bottom:true, right:true };
		} else {
			//default borders
			if (!config._inner)
				config._inner = {};
			this._contentobj.style.borderWidth="1px";
		}
	},

	$getSize:function(dx, dy){

		var _borders = this._settings._inner;
		if (_borders){
			dx += (_borders.left?0:1)+(_borders.right?0:1);
			dy += (_borders.top?0:1)+(_borders.bottom?0:1);
		}
		
		var size = webix.ui.baseview.prototype.$getSize.call(this, dx, dy);
		
		webix.debug_size_box(this, size, true);
		return size;
	},
	$setSize:function(x,y){
		webix.debug_size_box(this, [x,y]);
			
		var _borders = this._settings._inner;
		if (_borders){
			x -= (_borders.left?0:1)+(_borders.right?0:1);
			y -= (_borders.top?0:1)+(_borders.bottom?0:1);
		}
			
		return webix.ui.baseview.prototype.$setSize.call(this,x,y);
	}/*,
	resize:function(x,y){
		var _borders = this._settings._inner;
		if (_borders){
			if (x>=0)
				x += (_borders.left?0:1)+(_borders.right?0:1);
			if (y>=0)
				y += (_borders.top?0:1)+(_borders.bottom?0:1);
		}
		return webix.ui.baseview.prototype.resize.call(this,x,y);
	}*/
}, webix.ui.baseview);

})();

webix.ui.view.call(webix);

webix.debug_size_indent = 0;
webix.debug_size_step = function(){
	var str = "";
	for (var i=0; i<webix.debug_size_indent; i++)
		str+="|  ";
	return str;
};
webix.debug_size_box_start = function(comp, get){
	if (!webix.debug_size) return;
	if (!webix.debug_size_indent)
		webix.log(get?"--- get sizes ---":"--- set sizes ---");
	webix.log(webix.debug_size_step()+comp.name+"@"+comp.config.id);
	webix.debug_size_indent++;
};
webix.debug_size_box_end = function(comp, sizes){
	if (!webix.debug_size) return;
	webix.debug_size_indent--;
	webix.log(webix.debug_size_step()+sizes.join(","));
};

webix.debug_size_box = function(comp, sizes, get){
	if (!webix.debug_size) return;
	if (!webix.debug_size_indent)
		webix.log(get?"--- get sizes ---":"--- set sizes ---");
	webix.log(webix.debug_size_step()+comp.name+"@"+comp.config.id+" "+sizes.join(","));
};

webix.protoUI({
	name:"spacer",
	defaults:{
		borderless:true
	},
	$init:function(){
		this._viewobj.className += " webix_spacer";
	}
}, webix.ui.view);

webix.protoUI({
	name:"baselayout",
	$init:function(config){
		this.$ready.push(this._parse_cells);
		this._dataobj  = this._contentobj;
		this._layout_sizes = [];
		this._responsive = [];

		if (config.$topView){
			config.borderless = true;
			config._inner = { top:true, left:true, bottom:true, right:true };
		}

		if (config.isolate)
			webix.extend(this, webix.IdSpace);
	},
	rows_setter:function(value){
		this._vertical_orientation = 1;
		this._collection = value;
	},
	cols_setter:function(value){
		this._vertical_orientation = 0;
		this.$view.style.whiteSpace = "nowrap";
		this._collection = value;
	},
	_remove:function(view){
		webix.PowerArray.removeAt.call(this._cells, webix.PowerArray.find.call(this._cells, view));
		this.resizeChildren(true);
	},
	_replace:function(new_view,target_id){
		if (webix.isUndefined(target_id)){
			for (var i=0; i < this._cells.length; i++)
				this._cells[i].destructor();
			this._collection = new_view;
			this._parse_cells();
		} else {
			var source;
			if (typeof target_id == "number"){
				if (target_id<0 || target_id > this._cells.length)
					target_id = this._cells.length;
				var prev_node = (this._cells[target_id]||{})._viewobj;
				webix.PowerArray.insertAt.call(this._cells, new_view, target_id);
				if (!new_view._settings.hidden)
					webix.html.insertBefore(new_view._viewobj, prev_node, this._dataobj);
			} else {
				source = webix.$$(target_id);
				target_id = webix.PowerArray.find.call(this._cells, source);
				webix.assert(target_id!=-1, "Attempt to replace the non-existing view");
				var parent = source._viewobj.parentNode;
				if (parent && !new_view._settings.hidden)
					parent.insertBefore(new_view._viewobj, source._viewobj);

				source.destructor();	
				this._cells[target_id] = new_view;
			}

			if (!this._vertical_orientation)
				this._fix_vertical_layout(new_view);
			
			this._cells[target_id]._parent_cell = this;
		}
		this.resizeChildren(true);

		var form = this.elements ? this : this.getFormView();
		if (form) form._recollect_elements();

		webix.callEvent("onReconstruct",[this]);
	},
	_fix_vertical_layout:function(cell){
		cell._viewobj.style.display = "inline-block";
		cell._viewobj.style.verticalAlign = "top";
	},
	addView:function(view, index){
		if (webix.isUndefined(index))
			index = this._cells.length;
		return webix.ui(view, this, index)._settings.id;
	},
	removeView:function(id){
		var view;
		if (typeof id != "object")
			view = webix.$$(id);
		else
			view = id;

		var target = webix.PowerArray.find.call(this._cells, view);
		if (target >= 0){
			if (this._beforeRemoveView)
				this._beforeRemoveView(target, view);

			var form = this.elements ? this : this.getFormView();

			this._cells.splice(target, 1);
			if (form)
				webix.ui.each(view, function(sub){
					if (sub.name)
						delete form.getCleanValues()[sub.config.name];
				}, form, true);				

			view.destructor();
			this.resizeChildren(true);
			
			if (form)
				form._recollect_elements();
		} else
			webix.assert(false, "Attemp to remove not existing view: "+id);

		webix.callEvent("onReconstruct",[this]);
	},
	reconstruct:function(){
		this._replace(this._collection);
	},
	_hide:function(obj, settings, silent){
		if (obj._settings.hidden) return;
		obj._settings.hidden = true;
		webix.html.remove(obj._viewobj);
        this._hiddencells++;
		if (!silent && !webix._ui_creation)
			this.resizeChildren(true);	
	},
	_signal_hidden_cells:function(view){
		if (view.callEvent)
			view.callEvent("onViewShow",[]);
	},
	resizeChildren:function(){
		if (webix.ui.$freeze) return;

		if (this._layout_sizes){
			var parent = this.getParentView();
			if (parent){
				if (parent.resizeChildren)
					return parent.resizeChildren();
				else
					return parent.resize();
			}
				
			var sizes = this.$getSize(0,0);

			var x,y,nx,ny;
			nx = x = this._layout_sizes[0] || 0;
			ny = y = this._layout_sizes[1] || 0;
			
			if (!parent){
				//minWidth
				if (sizes[0]>x) nx = sizes[0];
				//minHeight
				if (sizes[2]>y) ny = sizes[2];

				//maxWidth rule
				if (x>sizes[1]) nx = sizes[1];
				//maxHeight rule
				if (y>sizes[3]) ny = sizes[3];

				this.$setSize(nx,ny);
			} else
				this._set_child_size(x,y);
		}
	},
	getChildViews:function(){
		return this._cells;
	},
	index:function(obj){
		if (obj._settings)
			obj = obj._settings.id;
		for (var i=0; i < this._cells.length; i++)
			if (this._cells[i]._settings.id == obj)
				return i;
		return -1;
	},
	_show:function(obj, settings, silent){

		if (!obj._settings.hidden) return;
		obj._settings.hidden = false;

        //index of sibling cell, next to which new item will appear
        var index = this.index(obj)+1;
        //locate nearest visible cell
        while (this._cells[index] && this._cells[index]._settings.hidden) index++;
        var view = this._cells[index] ? this._cells[index]._viewobj : null;

        webix.html.insertBefore(obj._viewobj, view, (this._dataobj||this._viewobj));
        this._hiddencells--;

        if (!silent){
            this.resizeChildren(true);
            if (obj.refresh)
                obj.refresh();
        }

        if (obj.callEvent){
        	obj.callEvent("onViewShow", []);
			webix.ui.each(obj, this._signal_hidden_cells);
		}
	},
	showBatch:function(name){
		if (this._settings.visibleBatch == name) return;
		this._settings.visibleBatch = name;
		
		var show = [];
		for (var i=0; i < this._cells.length; i++){
			if (!this._cells[i]._settings.batch) 
				show.push(this._cells[i]);
			else if (this._cells[i]._settings.batch == name)
				show.push(this._cells[i]);
			else
				this._hide(this._cells[i], null, true);
		}
		for (var i=0; i < show.length; i++)
			this._show(show[i], null, true);
		
		this.resizeChildren(true);
	},
	_parse_cells:function(collection){
		this._cells=[];

		webix.assert(collection,this.name+" was incorrectly defined. <br><br> You have missed rows|cols|cells|elements collection"); 
		for (var i=0; i<collection.length; i++){
			webix._parent_cell = this;
			if (!collection[i]._inner)
				collection[i].borderless = true;

			this._cells[i]=webix.ui._view(collection[i], this);
			if (!this._vertical_orientation)
				this._fix_vertical_layout(this._cells[i]);
			
			if (this._settings.visibleBatch && this._settings.visibleBatch != this._cells[i]._settings.batch && this._cells[i]._settings.batch){
				this._cells[i]._settings.hidden = true;
				this._hiddencells++;
			}
			
			if (!this._cells[i]._settings.hidden){
				(this._dataobj||this._contentobj).appendChild(this._cells[i]._viewobj);
				if (this._cells[i].$nospace)
					this._hiddencells++;
			}
		}

		if (this._parse_cells_ext_end)
			this._parse_cells_ext_end(collection);	
	},
	_bubble_size:function(prop, size, vertical){
		if (this._vertical_orientation != vertical)
			for (var i=0; i<this._cells.length; i++){
				this._cells[i]._settings[prop] = size;
				if (this._cells[i]._bubble_size)
					this._cells[i]._bubble_size(prop, size, vertical);
			}
	},
	$getSize:function(dx, dy){
		webix.debug_size_box_start(this, true);
		var minWidth = 0; 
		var maxWidth = 100000;
		var maxHeight = 100000;
		var minHeight = 0;
		if (this._vertical_orientation) maxHeight=0; else maxWidth = 0;
		
		var fixed = 0;
		var fixed_count = 0;
		var gravity = 0;
		this._sizes=[];

		for (var i=0; i < this._cells.length; i++) {
			//ignore hidden cells
			if (this._cells[i]._settings.hidden)
				continue;
			
			var sizes = this._sizes[i] = this._cells[i].$getSize(0,0);

			if (this._cells[i].$nospace){
 				fixed_count++;
 				continue;
 			}

			if (this._vertical_orientation){
				//take max minSize value
				if (sizes[0]>minWidth) minWidth = sizes[0];
				//take min maxSize value
				if (sizes[1]<maxWidth) maxWidth = sizes[1];
				
				minHeight += sizes[2];
				maxHeight += sizes[3];

				if (sizes[2] == sizes[3] && sizes[2] != -1){ fixed+=sizes[2]; fixed_count++; }
				else gravity += sizes[4];
			} else {
				//take max minSize value
				if (sizes[2]>minHeight) minHeight = sizes[2];
				//take min maxSize value
				if (sizes[3]<maxHeight) maxHeight = sizes[3];
				
				minWidth += sizes[0];
				maxWidth += sizes[1];

				if (sizes[0] == sizes[1] && sizes[0] != -1){ fixed+=sizes[0]; fixed_count++; }
				else gravity += sizes[4];
			}
		}

		if (minHeight>maxHeight)
			maxHeight = minHeight;
		if (minWidth>maxWidth)
			maxWidth = minWidth;

		this._master_size = [fixed, this._cells.length - fixed_count, gravity];
		this._desired_size = [minWidth+dx, minHeight+dy];

		//get layout sizes
		var self_size = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
		//use child settings if layout's one was not defined
		if (self_size[1] >= 100000) self_size[1]=0;
		if (self_size[3] >= 100000) self_size[3]=0;

		self_size[0] = (self_size[0] || minWidth ) +dx;
		self_size[1] = Math.max(self_size[0], (self_size[1] || maxWidth ) +dx);
		self_size[2] = (self_size[2] || minHeight) +dy;
		self_size[3] = Math.max(self_size[2], (self_size[3] || maxHeight) +dy);

		webix.debug_size_box_end(this, self_size);

		if (this._settings.responsive)
			self_size[0] = 0;

		return self_size;
	},
	$setSize:function(x,y){
		this._layout_sizes = [x,y];
		webix.debug_size_box_start(this);

		webix.ui.baseview.prototype.$setSize.call(this,x,y);
		this._set_child_size(x,y);

		webix.debug_size_box_end(this, [x,y]);
	},
	_set_child_size_a:function(sizes, min, max){
		min = sizes[min]; max = sizes[max];
		var height = min;

		if (min != max){
			var ps = this._set_size_delta * sizes[4]/this._set_size_gravity;
			if (ps < min){
				height = min;
				this._set_size_gravity -= sizes[4]; 
				this._set_size_delta -= height;
			} else  if (ps > max){
				height = max;
				this._set_size_gravity -= sizes[4]; 
				this._set_size_delta -= height;
			} else {
				return -1;
			}
		}

		return height;
	},
	_responsive_hide:function(cell, mode){
		var target =  webix.$$(mode);

		if (target === "hide" || !target){
			cell.hide();
			webix.delay(this.resize, this);
			cell._responsive_marker = "hide";
		} else{
			//for SideBar in Webix 1.9
			if (!target)
				target = webix.ui({ view:"popup", body:[{}]});

			cell._responsive_width = cell._settings.width;
			cell._responsive_height = cell._settings.height;
			cell._responsive_marker = target._settings.id;
			cell._settings.width = 0;
			if (!cell._settings.height)
				cell._settings.autoheight = true;

			webix.ui(cell, target, this._responsive.length);
		}

		this._responsive.push(cell);
	},
	_responsive_show:function(cell){
		var target = cell._responsive_marker;
		cell._responsive_marker = 0;

		if (target === "hide" || !target){
			cell.show();
			webix.delay(this.resize, this);
		} else {
			cell._settings.width = cell._responsive_width;
			cell._settings.height = cell._responsive_height;
			delete cell._settings.autoheight;

			webix.ui(cell, this, 0);
		}
		this._responsive.pop();
	},
	_responsive_cells:function(x,y){
		if (this._responsive_tinkery) return;
		this._responsive_tinkery = true;

		if (x < this._desired_size[0]){
			for (var i = 0; i < this._cells.length-1; i++){
				var cell = this._cells[i];
				if (!cell._responsive_marker){
					this._responsive_hide(cell, this._settings.responsive);
					break;
				}
			}
		} else  if (this._responsive.length){
			var cell = this._responsive[this._responsive.length-1];
			var dx = cell._responsive_marker == "hide" ? 0 : cell._responsive_width;
			var px = cell.$getSize(dx,0);
			if (px[0] + this._desired_size[0] + this._paddingX + 20 <= x )
				this._responsive_show(cell);
		}

		this._responsive_tinkery = false;
	},
	_set_child_size:function(x,y){
		webix._child_sizing_active = (webix._child_sizing_active||0)+1;

		if (this._settings.responsive)
			this._responsive_cells(x,y);

		this._set_size_delta = (this._vertical_orientation?y:x) - this._master_size[0];
		this._set_size_gravity = this._master_size[2];
		var width = x; var height = y;

		var auto = [];
		for (var i=0; i < this._cells.length; i++){
			//ignore hidden cells
			if (this._cells[i]._settings.hidden)
				continue;

			var sizes = this._sizes[i];

			if (this._vertical_orientation){
				var height = this._set_child_size_a(sizes,2,3);
				if (height < 0)	{ auto.push(i); continue; }
			} else {
				var width = this._set_child_size_a(sizes,0,1);
				if (width < 0)	{ auto.push(i); continue; }
			}
			this._cells[i].$setSize(width,height);
		}

		for (var i = 0; i < auto.length; i++){
			var index = auto[i];
			var sizes = this._sizes[index];
			var dx = Math.round(this._set_size_delta * sizes[4]/this._set_size_gravity);
			this._set_size_delta -= dx; this._set_size_gravity -= sizes[4];
			if (this._vertical_orientation)
				height = dx;
			else {
				width = dx;

			}

			this._cells[index].$setSize(width,height);
		}

		webix._child_sizing_active -= 1;
	},
	_next:function(obj, mode){
		var index = this.index(obj);
		if (index == -1) return null;
		return this._cells[index+mode];
	}, 
	_first:function(){
		return this._cells[0];
	}
}, webix.EventSystem, webix.ui.baseview);




webix.protoUI({
	name:"layout",
	$init:function(config){
		this._hiddencells = 0;
	},
	defaults:{
		type:"line"
	},
	_parse_cells:function(){
		if (this._parse_cells_ext)
			collection = this._parse_cells_ext(collection);

		if (!this._parse_once){
			this._viewobj.className += " webix_layout_"+(this._settings.type||"");
			this._parse_once = 1;
		}

		if (this._settings.margin !== webix.undefined)
			this._margin = this._settings.margin;

		if (this._settings.padding != webix.undefined)
			this._paddingX = this._paddingY = this._settings.padding;
		if (this._settings.paddingX !== webix.undefined)
			this._paddingX = this._settings.paddingX;
		if (this._settings.paddingY !== webix.undefined)
			this._paddingY = this._settings.paddingY;

		if (this._paddingY || this._paddingX)
			this._padding = true;

		//if layout has paddings we need to set the visible border 
		if (this._hasBorders() && !this._settings.borderless){
		 	this._contentobj.style.borderWidth="1px";
			//if layout has border - normal bordering rules are applied
			this._render_borders = true;
		}
	
		
		var collection = this._collection;
	
		if (this._settings.borderless)
			this._settings._inner = { top:true, left:true, right:true, bottom:true};

		this._beforeResetBorders(collection);
		webix.ui.baselayout.prototype._parse_cells.call(this, collection);
		this._afterResetBorders(collection);
	},
	$getSize:function(dx, dy){
		dx=dx||0; dy=dy||0;

		var correction = this._margin*(this._cells.length-this._hiddencells-1);
		if (this._render_borders || this._hasBorders()){
			var _borders = this._settings._inner;
			if (_borders){
				dx += (_borders.left?0:1)+(_borders.right?0:1);
				dy += (_borders.top?0:1)+(_borders.bottom?0:1);
			}
		}

		if (!this._settings.height)
			dy += (this._paddingY||0)*2 + (this._vertical_orientation ? correction : 0);

		if (!this._settings.width)
			dx += (this._paddingX||0)*2 + (this._vertical_orientation ? 0 : correction);
				
		return webix.ui.baselayout.prototype.$getSize.call(this, dx, dy);
	},
	$setSize:function(x,y){

		this._layout_sizes = [x,y];
		webix.debug_size_box_start(this);

		var result;
		if (this._hasBorders()||this._render_borders)
			result = webix.ui.view.prototype.$setSize.call(this,x,y);
		else	
			result = webix.ui.baseview.prototype.$setSize.call(this,x,y);

		//form with scroll
		y = this._content_height;
		x = this._content_width;

		var config = this._settings;
		if (config.scroll){
			y = Math.max(y, this._desired_size[1]);
			x = Math.max(x, this._desired_size[0]);
		}
		
		this._set_child_size(x, y);

		webix.debug_size_box_end(this, [x,y]);
	},
	_set_child_size:function(x,y){
		var correction = this._margin*(this._cells.length-this._hiddencells-1);

		if (this._vertical_orientation){
			y-=correction+this._paddingY*2;
			x-=this._paddingX*2;
		}
		else {
			x-=correction+this._paddingX*2;
			y-=this._paddingY*2;
		}
		return webix.ui.baselayout.prototype._set_child_size.call(this, x, y);
	},
	resizeChildren:function(structure_changed){ 
		if (structure_changed){
			this._last_size = null; //forces children resize
			var config = [];
			for (var i = 0; i < this._cells.length; i++){
				var cell = this._cells[i];
				config[i] = cell._settings;
				var n = ((cell._layout_sizes && !cell._render_borders) || cell._settings.borderless)?"0px":"1px";

				cell._viewobj.style.borderTopWidth=cell._viewobj.style.borderBottomWidth=cell._viewobj.style.borderLeftWidth=cell._viewobj.style.borderRightWidth=n;
			}
			
			this._beforeResetBorders(config);
			for (var i=0; i<config.length; i++)
				if (config[i].borderless && this._cells[i]._set_inner)
					this._cells[i]._set_inner(config[i]);
			this._afterResetBorders(this._cells);
		}

		webix.ui.baselayout.prototype.resizeChildren.call(this);
	},
	_hasBorders:function(){
		return this._padding && this._margin>0 && !this._cleanlayout;
	},
	_beforeResetBorders:function(collection){
		if (this._hasBorders() && (!this._settings.borderless || this._settings.type == "space")){
			for (var i=0; i < collection.length; i++){
				if (!collection[i]._inner || !collection[i].borderless)
					collection[i]._inner={ top:false, left:false, right:false, bottom:false};
			}
		} else {
			for (var i=0; i < collection.length; i++)
				collection[i]._inner=webix.clone(this._settings._inner);
			var mode = false;
			if (this._cleanlayout)
				mode = true;
				
			var maxlength = collection.length;				
			if (this._vertical_orientation){
				for (var i=1; i < maxlength-1; i++)
					collection[i]._inner.top = collection[i]._inner.bottom = mode;
				if (maxlength>1){
					if (this._settings.type!="head")
						collection[0]._inner.bottom = mode;

					while (collection[maxlength-1].hidden && maxlength>1)
						maxlength--;
					if (maxlength>0)
						collection[maxlength-1]._inner.top = mode;
				}
			}
			else {
				for (var i=1; i < maxlength-1; i++)
					collection[i]._inner.left = collection[i]._inner.right= mode;
				if (maxlength>1){
					if (this._settings.type!="head")
						collection[0]._inner.right= mode;
					collection[maxlength-1]._inner.left = mode;

					while (maxlength>1 && collection[maxlength-1].hidden)
						maxlength--;
					if (maxlength>0)
						collection[maxlength-1]._inner.left = mode;
				}
			}

		}
	},
	_fix_container_borders:function(style, inner){
		if (inner.top) 
			style.borderTopWidth="0px";
		if (inner.left) 
			style.borderLeftWidth="0px";
		if (inner.right) 
			style.borderRightWidth="0px";
		if (inner.bottom) 
			style.borderBottomWidth="0px";
	},
	_afterResetBorders:function(collection){
		var start = 0; 
		for (var i=0; i<collection.length; i++){
			var cell = this._cells[i];

			var s_inner = cell._settings._inner;
			if (cell._settings.hidden && this._cells[i+1]){
				var s_next = this._cells[i+1]._settings._inner;
				if (!s_inner.top)
					s_next.top = false;
				if (!s_inner.left)
					s_next.left = false;

				if (i==start) start++;
			}
			this._fix_container_borders(cell._viewobj.style, cell._settings._inner);
		}

		var style = this._vertical_orientation?"marginLeft":"marginTop";
		var contrstyle = this._vertical_orientation?"marginTop":"marginLeft";
		var padding = this._vertical_orientation?this._paddingX:this._paddingY;
		var contrpadding = this._vertical_orientation?this._paddingY:this._paddingX;

		//add top offset to all
		for (var i=0; i<collection.length; i++)
			this._cells[i]._viewobj.style[style] = (padding||0) + "px";			

		//add left offset to first cell
		if (this._cells.length)
			this._cells[start]._viewobj.style[contrstyle] = (contrpadding||0)+"px";

		//add offset between cells
		for (var index=start+1; index<collection.length; index++)
			this._cells[index]._viewobj.style[contrstyle]=this._margin+"px";
		
	},
	type_setter:function(value){
		this._margin = (typeof this._margin_set[value] != "undefined"? this._margin_set[value]: this._margin_set["line"]);
		this._paddingX = this._paddingY = (typeof this._margin_set[value] != "undefined"? this._padding_set[value]: this._padding_set["line"]);
		this._cleanlayout = (value=="material" || value=="clean");
		if (value == "material")
			this._settings.borderless = true;

		return value;
	},
	$skin:function(){
		var skin = webix.skin.$active;
		this._margin_set = skin.layoutMargin;
		this._padding_set = skin.layoutPadding;
	}
}, webix.ui.baselayout);

webix.ui.layout.call(webix);



webix.animate = function(html_element, config){
	var animation = config;
	if (webix.isArray(html_element)){
		for (var i=0; i < html_element.length; i++) {
			if(webix.isArray(config))
				animation = config[i];

			if(animation.type == 'slide'){
				if(animation.subtype == 'out' && i===0) { // next
				    continue;
				}
				if(animation.subtype == 'in' && i==1) { // current
				    continue;
				}
			}
			if(animation.type == 'flip'){
				var animation_copy = webix.clone(animation);
				if(i===0) { // next
				    animation_copy.type = 'flipback';
				}
				if(i==1) { // current
				    animation_copy.callback = null;
				}
				webix.animate(html_element[i], animation_copy);
				continue;
			}
			webix.animate(html_element[i], animation);
		}
		return;
	}
	var node = webix.toNode(html_element);
	if (node._has_animation)
		webix.animate.end(node, animation);
	else
		webix.animate.start(node, animation);
};
webix.animate.end = function(node, animation){
	//stop animation
	node.style[webix.env.transitionDuration] = "1ms";
	node._has_animation = null;
	//clear animation wait order, if any
	if (webix._wait_animate)
		window.clearTimeout(webix._wait_animate);

	//plan next animation, if any
	webix._wait_animate = webix.delay(webix.animate, webix, [node,animation],10);
};
webix.animate.isSupported=function(){
	return !webix.$testmode && !webix.noanimate && webix.env.transform && webix.env.transition && !webix.env.isOpera;
};
webix.animate.formLine=function(next, current, animation){
    var direction = animation.direction;
	current.parentNode.style.position = "relative";
    current.style.position = "absolute";
	next.style.position = "absolute";

	//this is initial shift of second view in animation
	//normally we need to have this value as 0
	//but FF has bug with animation initially invisible elements
	//so we are adjusting this value, to make 1px of second view visible
	var defAniPos = webix.env.isFF ? ( direction == "top" || direction == "left" ? -1 : 1) : 0;

	if(direction=="top"||direction=="bottom"){
		next.style.left="0px";
		next.style.top = (animation.top || defAniPos) + (direction=="top"?1:-1)*current.offsetHeight+"px";
	}
	else{
		next.style.top = (animation.top || 0) + "px";
		next.style.left = defAniPos + (direction=="left"?1:-1)*current.offsetWidth+"px";
	}

	// apply 'keepViews' mode, iframe solution
	//( keepViews won't work in case of "in" and "out" subtypes )
	if(current.parentNode == next.parentNode && animation.keepViews)
		next.style.display = "";
	else
		webix.html.insertBefore(next, current.nextSibling, current.parentNode);

	if(animation.type == 'slide' && animation.subtype == 'out') {
		next.style.left = "0px";
		next.style.top = (animation.top || 0)+"px";
		current.parentNode.removeChild(current);
		webix.html.insertBefore(current, next.nextSibling, next.parentNode);
	}
	return [next, current];
};
webix.animate.breakLine=function(line){
	if(arguments[1])
		line[1].style.display = "none"; // 'keepViews' multiview mode
	else
		webix.html.remove(line[1]); // 1 = current
	webix.animate.clear(line[0]);
	webix.animate.clear(line[1]);
	line[0].style.position="";
};
webix.animate.clear=function(node){
	node.style[webix.env.transform] = "none";
	node.style[webix.env.transition] = "none";
	node.style.top = node.style.left = "";
};
webix.animate.defaults = {
		type: 'slide',
		delay: '0',
		duration: '500',
		timing: 'ease-in-out',
		x: 0,
		y: 0
};
webix.animate.start = function(node, animation){
	//getting config object by merging specified and default options
 	if (typeof animation == 'string')
		animation = {type: animation};

    animation = webix.Settings._mergeSettings(animation,webix.animate.defaults);

	var prefix = webix.env.cssPrefix;
    var settings = node._has_animation = animation;
    var skew_options, scale_type;

    //jshint -W086:true
	switch(settings.type == 'slide' && settings.direction) { // getting new x, y in case it is slide with direction
		case 'right':
			settings.x = node.offsetWidth;
			break;
		case 'left':
			settings.x = -node.offsetWidth;
			break;
		case 'top':
			settings.y = -node.offsetHeight;
			break;
		case 'bottom':
		default:
			settings.y = settings.y||node.offsetHeight;
			break;
	}

    if(settings.type == 'flip' || settings.type == 'flipback') {
    		skew_options = [0, 0];
            scale_type = 'scaleX';
            if(settings.subtype == 'vertical') {
                skew_options[0] = 20;
                scale_type = 'scaleY';
            }
            else
                skew_options[1] = 20;
            if(settings.direction == 'right' || settings.direction == 'bottom') {
                skew_options[0] *= -1; skew_options[1] *= -1;
            }
    }

	var duration = settings.duration + "ms " + settings.timing + " " + settings.delay+"ms";
	var css_general = prefix+"TransformStyle: preserve-3d;"; // general css rules
	var css_transition = '';
	var css_transform = '';

	switch(settings.type) {
		case 'fade': // changes opacity to 0
			css_transition = "opacity " + duration;
			css_general = "opacity: 0;";
			break;
		case 'show': // changes opacity to 1
			css_transition = "opacity " + duration;
			css_general = "opacity: 1;";
			break;
        case 'flip':
            duration = (settings.duration/2) + "ms " + settings.timing + " " + settings.delay+"ms";
            css_transform = "skew("+skew_options[0]+"deg, "+skew_options[1]+"deg) "+scale_type+"(0.00001)";
            css_transition = "all "+(duration);
            break;
        case 'flipback':
            settings.delay += settings.duration/2;
            duration = (settings.duration/2) + "ms " + settings.timing + " " + settings.delay+"ms";
            node.style[webix.env.transform] = "skew("+(-1*skew_options[0])+"deg, "+(-1*skew_options[1])+"deg) "+scale_type+"(0.00001)";
            node.style.left = "0";

            css_transform = "skew(0deg, 0deg) "+scale_type+"(1)";
            css_transition = "all "+(duration);
            break;
		case 'slide': // moves object to specified location
			var x = settings.x +"px";
			var y = settings.y +"px";
            // translate(x, y) OR translate3d(x, y, 0)
			css_transform = webix.env.translate+"("+x+", "+y+((webix.env.translate=="translate3d")?", 0":"")+")";
			css_transition = prefix+"transform " + duration;
			break;
		default:
			break;
	}

	//set styles only after applying transition settings
    webix.delay(function(){
        node.style[webix.env.transition] = css_transition;
        webix.delay(function(){
            if (css_general)
                node.style.cssText += css_general;
            if (css_transform)
                node.style[webix.env.transform] = css_transform;
            var transitionEnded = false;
            var tid = webix.event(node, webix.env.transitionEnd, function(ev){
                node._has_animation = null;
                if (settings.callback) settings.callback.call((settings.master||window), node,settings,ev);
                transitionEnded = true;
                webix.eventRemove(tid);
            });
            window.setTimeout(function(){
                if(!transitionEnded){
                    node._has_animation = null;
                    if (settings.callback) settings.callback.call((settings.master||window), node,settings);
                    transitionEnded = true;
                    webix.eventRemove(tid);
                }
            }, (settings.duration*1+settings.delay*1)*1.3);
        });
    });
};

/*
	Behavior:MouseEvents - provides inner evnets for  mouse actions
*/

webix.MouseEvents={
	$init: function(config){
		config = config || {};

		this._clickstamp = 0;
		this._dbl_sensetive = 300;
		this._item_clicked = null;

		this._mouse_action_extend(config.onClick, "on_click");
		this._mouse_action_extend(config.onContext, "on_context");
		this._mouse_action_extend(config.onDblClick, "on_dblclick");
		this._mouse_action_extend(config.onMouseMove, "on_mouse_move");

		//attach dom events if related collection is defined
		if (this.on_click){
			webix.event(this._contentobj,"click",this._onClick,this);
			if (webix.env.isIE8 && this.on_dblclick)
				webix.event(this._contentobj, "dblclick", this._onDblClick, this);
		}
		if (this.on_context)
			webix.event(this._contentobj,"contextmenu",this._onContext,this);

		if (this.on_mouse_move)
			this._enable_mouse_move();
	},

	_enable_mouse_move:function(){
		if (!this._mouse_move_enabled){
			this.on_mouse_move = this.on_mouse_move || {};
			webix.event(this._contentobj,"mousemove",this._onMouse,this);
			webix.event(this._contentobj,(webix.env.isIE?"mouseleave":"mouseout"),this._onMouse,this);
			this._mouse_move_enabled = 1;
		}

	},

	_mouse_action_extend:function(config, key){
		if (config){
			var now = this[key];
			var step = now ? webix.extend({}, now) : {};
			this[key] = webix.extend(step, config);
		}
	},

	//inner onclick object handler
	_onClick: function(e){
		if(!this.isEnabled())
			return false;

		webix.UIManager._focus_action(this);
		if(this.on_dblclick){
			// emulates double click
			var stamp = (new Date()).valueOf();

			if (stamp - this._clickstamp <= this._dbl_sensetive && this.locate){
				var item = this.locate(e);
				if (""+item == ""+this._item_clicked) {
					this._clickstamp = 0;
					return this._onDblClick(e);
				}
			}
			this._clickstamp = stamp;
		}

		var result = this._mouseEvent(e,this.on_click,"ItemClick");
		return result;
	},
	//inner ondblclick object handler
	_onDblClick: function(e) {
		return this._mouseEvent(e,this.on_dblclick,"ItemDblClick");
	},
	//process oncontextmenu events
	_onContext: function(e) {
		this._mouseEvent(e, this.on_context, "BeforeContextMenu", "AfterContextMenu");
	},
	/*
		event throttler - ignore events which occurs too fast
		during mouse moving there are a lot of event firing - we need no so much
		also, mouseout can fire when moving inside the same html container - we need to ignore such fake calls
	*/
	_onMouse:function(e){
		if (document.createEventObject)	//make a copy of event, will be used in timed call
			e = document.createEventObject(event);
		else if (!webix.$testmode && !webix.isUndefined(e.webkitMovementY) && !e.webkitMovementY && !e.webkitMovementX)
			return; //logitech mouse driver can send false signals in Chrome
			
			
			
			
		if (this._mouse_move_timer)	//clear old event timer
			window.clearTimeout(this._mouse_move_timer);
				
		//this event just inform about moving operation, we don't care about details
		this.callEvent("onMouseMoving",[e]);
		//set new event timer
		this._mouse_move_timer = window.setTimeout(webix.bind(function(){
			//called only when we have at least 100ms after previous event
			if (e.type == "mousemove")
				this._onMouseMove(e);
			else
				this._onMouseOut(e);
		},this),(this._settings.mouseEventDelay||500));
	},

	//inner mousemove object handler
	_onMouseMove: function(e) {
		if (!this._mouseEvent(e,this.on_mouse_move,"MouseMove"))
			this.callEvent("onMouseOut",[e||event]);
	},
	//inner mouseout object handler
	_onMouseOut: function(e) {
		this.callEvent("onMouseOut",[e||event]);
	},
	//common logic for click and dbl-click processing
	_mouseEvent:function(e,hash,name, pair){
		e=e||event;

		if (e.processed) return;
		e.processed = true;

		var trg=e.target||e.srcElement;

		//IE8 can't modify event object
		//so we need to stop event bubbling to prevent double processing
		if (webix.env.isIE8){
			var vid = this._settings.id;
			var wid = trg.w_view;

			if (!wid) trg.w_view = vid; else if (wid !== vid) return;
		}

		var css = "";
		var id = null;
		var found = false;
		//loop through all parents
		while (trg && trg.parentNode){
			if (!found && trg.getAttribute){													//if element with ID mark is not detected yet
				id = trg.getAttribute(this._id);							//check id of current one
				if (id){
					this._item_clicked = id;
					if (this.callEvent){
						//it will be triggered only for first detected ID, in case of nested elements
						if (!this.callEvent("on"+name,[id,e,trg])) return;
						if (pair) this.callEvent("on"+pair,[id,e,trg]);
					}
					//set found flag
					found = true;
				}
			}
			css=trg.className;
			if (css){		//check if pre-defined reaction for element's css name exists
				css = css.toString().split(" ");
				for (var i=0; i<css.length; i++){
					if (hash[css[i]]){
						var functor = webix.toFunctor(hash[css[i]], this.$scope);
						var res =  functor.call(this,e,id||webix.html.locate(e, this._id),trg);
						if(res === false)
							return found;
					}
				}
			}
			trg=trg.parentNode;
		}
			
		return found;	//returns true if item was located and event was triggered
	}
};


webix.protoUI({
	name:"accordionitem",
	$init:function(config){
		this._viewobj.innerHTML = "<div webix_ai_id='"+config.id+"'  class='webix_accordionitem_header'><div class='webix_accordionitem_button' ></div><div class='webix_accordionitem_label' ></div></div><div class='webix_accordionitem_body'></div>";
		
		this._contentobj = this._viewobj;
		this._headobj = this._contentobj.childNodes[0];
		if(!config.header)
			this._headobj.style.display = "none";
		this._headlabel = this._contentobj.childNodes[0].childNodes[1];
		this._headbutton = this._contentobj.childNodes[0].childNodes[0];
		this._bodyobj = this._contentobj.childNodes[1];
		this._viewobj.className +=" webix_accordionitem";
		this._head_cell = this._body_cell = null;
		this._cells = true;
	},
	_remove:function(){ 
		this._body_cell = { destructor:function(){} };	
	},
	_replace:function(new_view){
		this._body_cell.destructor();
		this._body_cell = new_view;
		this._body_cell._parent_cell = this;
		
		this._bodyobj.appendChild(this._body_cell._viewobj);
		this.resize();		
	},
	_id:"webix_ai_id",
	getChildViews:function(){
		return [this._body_cell];
	},
	body_setter:function(value){
		if (typeof value != "object")
			value = {template:value };

		value._inner = { top:true, left:true, right:true, bottom:true};
		this._body_cell = webix.ui._view(value);
		this._body_cell.$view.style.border = "0px solid red";
		this._body_cell._parent_cell = this;

		this._bodyobj.appendChild(this._body_cell._viewobj);
		return value;
	},
	header_setter:function(value){
		if(value)
			value = webix.template(value);
		return value;
	},
	headerAlt_setter:function(value){
		if(value)
			value = webix.template(value);
		return value;
	},
	$getSize:function(dx, dy){
		var size =  this._body_cell.$getSize(0, 0);

		//apply external border to inner content sizes
		var _borders = this._settings._inner;
		if (_borders){
			dx += (_borders.left?0:1)+(_borders.right?0:1);
			dy += (_borders.top?0:1)+(_borders.bottom?0:1);
		}

		var header = 0;
		var self_size = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
		//use child settings if layout's one was not defined
		self_size[0] = (self_size[0] || size[0] ) +dx;
		if (self_size[1] >= 100000)
			self_size[1] = size[1];
		self_size[1] +=	dx;
		
		self_size[2] = (self_size[2] || size[2] ) +dy;
		if (self_size[3] >= 100000)
			self_size[3] = size[3];
		self_size[3] += dy;

		if(this.getParentView()._vertical_orientation){
			if (this._settings.collapsed){
				self_size[2] = self_size[3] = this._getHeaderSize();
			} else if(this._settings.header)
				header = this._settings.headerHeight;
		} else {
			if (this._settings.collapsed)
				self_size[0] = self_size[1] = this._getHeaderSize();
			if(this._settings.header)
				header = this._settings.headerHeight;
		}

		//include header in total height calculation
		self_size[2] += header;
		self_size[3] += header;
		webix.debug_size_box(this, self_size, true);
		return self_size;
	},
	on_click:{
		webix_accordionitem_header:function(e, id){
			this._toggle(e);
			return false;
		},
		webix_accordionitem_header_v:function(e, id){
			this._toggle(e);
			return false;
		}
	},
	_toggle:function(e){
		this.define("collapsed", !this._settings.collapsed);
	},
	collapsed_setter:function(value){  
		if (this._settings.header === false) return;
		//use last layout element if parent is not known yet
		var parent = this.getParentView();
		if(!value)
			this._expand();
		else
			if (!parent || parent._canCollapse(this))
				this._collapse();
			else{
				if(parent._cells.length > 1)
				for (var i=0; i < parent._cells.length; i++)
					if (this != parent._cells[i]){
						parent._cells[i].expand();
						this._collapse();
						//return false
					}
			}

				
		this._settings.collapsed = value;
		if (!value) this.getParentView()._afterOpen(this);
		
		this.refresh();
		if (!webix._ui_creation)
			this.resize();
		
		parent.callEvent("onAfter"+(value?"Collapse":"Expand"), [this._settings.id]);

		this._settings.$noresize = value;

		return value;
	},
	collapse:function(){
		this.define("collapsed", true);
		webix.UIManager._moveChildFocus(this);
	},
	expand:function(){
		this.define("collapsed", false);
	},
	_show: function() {
		this.show();
	},
	_hide: function() {
		this.hide();
	},
	_expand:function(){
		this._bodyobj.style.display = "";
		webix.html.removeCss(this.$view, "collapsed");
		webix.html.removeCss(this._headobj, "collapsed");
	},
	_collapse:function(){
		var vertical = this.getParentView()._vertical_orientation;
		//this._original_size = (vertical?this._settings.height:this._settings.width)||-1;
		
		if(this._settings.headerAlt)
			this._headlabel.innerHTML = this._settings.headerAlt();
		this._bodyobj.style.display = "none";
		webix.html.addCss(this.$view, "collapsed");
		webix.html.addCss(this._headobj, "collapsed");
	},
	refresh:function(){
		var template = this._settings[this._settings.collapsed?"headerAlt":"header"] ||this._settings.header;
		if (template)
			this._headlabel.innerHTML = template();
		var css = this.getParentView()._vertical_orientation?"vertical":"horizontal";
		if(this._viewobj.className.indexOf(" "+css) < 0 ){
			webix.html.addCss(this._viewobj, css);
		}

	},
	_getHeaderSize:function(){
		return (this._settings.collapsed?this._settings.headerAltHeight:this._settings.headerHeight);
	},
	$setSize:function(x,y){ 
		if (webix.ui.view.prototype.$setSize.call(this,x,y)){
			x = this._content_width;
			y = this._content_height;

			var headerSize = this._getHeaderSize();//-(this._settings._inner.top?0:1);
			if (this._settings.header){

				this._headobj.style.height=headerSize+"px";
				this._headobj.style.width="auto";
				this._headobj.style[webix.env.transform]="";

				
				this._headobj.style.borderBottomWidth = (this._settings.collapsed?0:1)+"px";

				if(this.getParentView()._vertical_orientation||!this._settings.collapsed){
					y-=this._getHeaderSize();
				} else if (this._settings.collapsed){
					//-2 - borders
					if (webix.animate.isSupported()){
						this._headobj.style.width = y + "px";
						this._headobj.style.height = x + 3 + "px";
						var d = Math.floor(y/2-x/2)+(x-this._settings.headerAltHeight)/2;
						this._headobj.style[webix.env.transform]="rotate(90deg) translate("+d+"px, "+(d+1)+"px)";
					}
					else { //IE8 fix
						this._headobj.style.width = x + "px";
						this._headobj.style.height = y + 3 + "px";
						this._headlabel.innerHTML = "";
					}

				}
			}
			if(!this._settings.collapsed){
				this._body_cell.$setSize(x,y);
				this._last_size_y = y;
			}
		} else if (!this._settings.collapsed){
			var body = this._body_cell;
			if (this._last_size_y)
				body.$setSize(this._content_width, this._last_size_y);
		}
	},
	$skin:function(){
		var defaults = this.defaults;
		defaults.headerAltHeight = defaults.headerHeight = webix.skin.$active.barHeight;
		if(webix.skin.$active.borderlessAccordion)
			defaults.borderless = true;
	},
	defaults:{
		header:false,
		headerAlt:false,
		body:""
	}
}, webix.MouseEvents, webix.EventSystem, webix.ui.view);

webix.protoUI({
	name:"accordion",
	defaults:{
		panelClass:"accordionitem",
		multi:false,
		collapsed:false
	},
	addView:function(view){
		//adding view to the accordion
		var id = webix.ui.layout.prototype.addView.apply(this, arguments);
		var child = webix.$$(id);
		//repainting sub-panels in the accordion
		if (child.collapsed_setter && child.refresh) child.refresh();
		return id;
	},
	_parse_cells:function(){
		var panel = this._settings.panelClass;
		var cells = this._collection;

		for (var i=0; i<cells.length; i++){
			if ((cells[i].body || cells[i].header)&& !cells[i].view)
				cells[i].view = panel;
			if (webix.isUndefined(cells[i].collapsed))
				cells[i].collapsed = this._settings.collapsed;

		}

	
		this._skin_render_collapse = true;
		webix.ui.layout.prototype._parse_cells.call(this);
		this._skin_render_collapse = false;

		for (var i=0; i < this._cells.length; i++){
			if (this._cells[i].name == panel) 
				this._cells[i].refresh();
			this._cells[i]._accLastChild = false;
		}
		var found = false;
		for (var i= this._cells.length-1; i>=0 &&!found; i--){
			if(!this._cells[i]._settings.hidden){
				this._cells[i]._accLastChild = true;
				found = true;
			}
		}

	},
	_afterOpen:function(view){
		if (this._settings.multi === false && this._skin_render_collapse !== true){
			for (var i=0; i < this._cells.length; i++) {
				if (view != this._cells[i] && !this._cells[i]._settings.collapsed && this._cells[i].collapse)
					this._cells[i].collapse();
			}
		}
	},
	_canCollapse:function(view){
		if (this._settings.multi === true || this._skin_render_collapse) return true;
		//can collapse only if you have other item to open
		for (var i=0; i < this._cells.length; i++)
			if (view != this._cells[i] && !this._cells[i]._settings.collapsed)
				return true;
		return false;
	},
	$skin:function(){
		var defaults = this.defaults;
		if(webix.skin.$active.accordionType)
			defaults.type = webix.skin.$active.accordionType;
	}
}, webix.ui.layout);

webix.protoUI({
	name:"headerlayout",
	defaults:{
		type: "accordion",
		multi:"mixed",
		collapsed:false
	}
}, webix.ui.accordion);





/*
	Behavior:DND - low-level dnd handling
	@export
		getContext
		addDrop
		addDrag
		
	DND master can define next handlers
		onCreateDrag
		onDragIng
		onDragOut
		onDrag
		onDrop
	all are optional
*/



webix.DragControl={
	//has of known dnd masters
	_drag_masters : webix.toArray(["dummy"]),
	/*
		register drop area
		@param node 			html node or ID
		@param ctrl 			options dnd master
		@param master_mode 		true if you have complex drag-area rules
	*/
	addDrop:function(node,ctrl,master_mode){
		node = webix.toNode(node);
		node.webix_drop=this._getCtrl(ctrl);
		if (master_mode) node.webix_master=true;
	},
	//return index of master in collection
	//it done in such way to prevent dnd master duplication
	//probably useless, used only by addDrop and addDrag methods
	_getCtrl:function(ctrl){
		ctrl = ctrl||webix.DragControl;
		var index = this._drag_masters.find(ctrl);
		if (index<0){
			index = this._drag_masters.length;
			this._drag_masters.push(ctrl);
		}
		return index;
	},
	/*
		register drag area
		@param node 	html node or ID
		@param ctrl 	options dnd master
	*/
	addDrag:function(node,ctrl){
	    node = webix.toNode(node);
	    node.webix_drag=this._getCtrl(ctrl);
		webix.event(node,webix.env.mouse.down,this._preStart,node);
		webix.event(node,"dragstart",webix.html.preventEvent);
	},
	//logic of drag - start, we are not creating drag immediately, instead of that we hears mouse moving
	_preStart:function(e){
		if (webix.DragControl._active){
			//if we have nested drag areas, use the top one and ignore the inner one
			if (webix.DragControl._saved_event == e) return;
			webix.DragControl._preStartFalse();
			webix.DragControl.destroyDrag(e);
		}
		webix.DragControl._active=this;

		var evobj = webix.env.mouse.context(e);
		webix.DragControl._start_pos=evobj;

		webix.DragControl._saved_event = e;
		webix.DragControl._webix_drag_mm = webix.event(document.body,webix.env.mouse.move,webix.DragControl._startDrag);
		webix.DragControl._webix_drag_mu = webix.event(document.body,webix.env.mouse.up,webix.DragControl._preStartFalse);

		//need to run here, or will not work in IE
		webix.html.addCss(document.body,"webix_noselect", 1);
	},
	//if mouse was released before moving - this is not a dnd, remove event handlers
	_preStartFalse:function(e){
		webix.DragControl._clean_dom_after_drag();
	},
	//mouse was moved without button released - dnd started, update event handlers
	_startDrag:function(e){
		//prevent unwanted dnd
		var pos = webix.env.mouse.context(e);
		if (Math.abs(pos.x-webix.DragControl._start_pos.x)<5 && Math.abs(pos.y-webix.DragControl._start_pos.y)<5)
			return;

		webix.DragControl._clean_dom_after_drag(true);

		if (!webix.DragControl.createDrag(webix.DragControl._saved_event)) return;
		
		webix.DragControl.sendSignal("start"); //useless for now
		webix.DragControl._webix_drag_mm = webix.event(document.body,webix.env.mouse.move,webix.DragControl._moveDrag);
		webix.DragControl._webix_drag_mu = webix.event(document.body,webix.env.mouse.up,webix.DragControl._stopDrag);
		webix.DragControl._moveDrag(e);

		if (webix.env.touch)
			return webix.html.preventEvent(e);
	},
	//mouse was released while dnd is active - process target
	_stopDrag:function(e){
		webix.DragControl._clean_dom_after_drag();
		webix.DragControl._saved_event = null;

		if (webix.DragControl._last){	//if some drop target was confirmed
			webix.DragControl.$drop(webix.DragControl._active, webix.DragControl._last, e);
			webix.DragControl.$dragOut(webix.DragControl._active,webix.DragControl._last,null,e);
		}
		webix.DragControl.destroyDrag(e);
		webix.DragControl.sendSignal("stop");	//useless for now
	},
	_clean_dom_after_drag:function(still_drag){
		this._webix_drag_mm = webix.eventRemove(this._webix_drag_mm);
		this._webix_drag_mu = webix.eventRemove(this._webix_drag_mu);
		if (!still_drag)
			webix.html.removeCss(document.body,"webix_noselect");
	},
	//dnd is active and mouse position was changed
	_moveDrag:function(e){
		var pos = webix.html.pos(e);
		var evobj = webix.env.mouse.context(e);

		//give possibility to customize drag position
		webix.DragControl.$dragPos(pos, e);

		//adjust drag marker position
		webix.DragControl._html.style.top=pos.y+webix.DragControl.top +"px";
		webix.DragControl._html.style.left=pos.x+webix.DragControl.left+"px";

		if (webix.DragControl._skip)
			webix.DragControl._skip=false;
		else {
			var target = evobj.target = webix.env.touch ? document.elementFromPoint(evobj.x, evobj.y) : evobj.target;
			var touch_event = webix.env.touch ? evobj : e;
			webix.DragControl._checkLand(target, touch_event);
		}
		
		return webix.html.preventEvent(e);
	},
	//check if item under mouse can be used as drop landing
	_checkLand:function(node,e){
		while (node && node.tagName!="BODY"){
			if (node.webix_drop){	//if drop area registered
				if (this._last && (this._last!=node || node.webix_master))	//if this area with complex dnd master
					this.$dragOut(this._active,this._last,node,e);			//inform master about possible mouse-out
				if (!this._last || this._last!=node || node.webix_master){	//if this is new are or area with complex dnd master
					this._last=null;										//inform master about possible mouse-in
					this._landing=this.$dragIn(webix.DragControl._active,node,e);
					if (this._landing)	//landing was rejected
						this._last=node;
					return;				
				} 
				return;
			}
			node=node.parentNode;
		}
		if (this._last)	//mouse was moved out of previous landing, and without finding new one 
			this._last = this._landing = this.$dragOut(this._active,this._last,null,e);
	},
	//mostly useless for now, can be used to add cross-frame dnd
	sendSignal:function(signal){
		webix.DragControl.active=(signal=="start");
	},
	
	//return master for html area
	getMaster:function(t){
		return this._drag_masters[t.webix_drag||t.webix_drop];
	},
	//return dhd-context object
	getContext:function(){
		return this._drag_context;
	},
	getNode:function(){
		return this._html;
	},
	//called when dnd is initiated, must create drag representation
	createDrag:function(e){ 
		var a=webix.DragControl._active;
		webix.DragControl._drag_context = {};
		var master = this._drag_masters[a.webix_drag];
        var drag_container;

		//if custom method is defined - use it
		if (master.$dragCreate){
			drag_container=master.$dragCreate(a,e);
			if (!drag_container) return false;
			drag_container.style.position = 'absolute';
		} else {
		//overvise use default one
			var text = webix.DragControl.$drag(a,e);
			if (!text) return false;
			drag_container = document.createElement("DIV");
			drag_container.innerHTML=text;
			drag_container.className="webix_drag_zone";
			document.body.appendChild(drag_container);
		}
		/*
			dragged item must have topmost z-index
			in some cases item already have z-index
			so we will preserve it if possible
		*/
		drag_container.style.zIndex = Math.max(drag_container.style.zIndex,webix.ui.zIndex());

		webix.DragControl._skipDropH = webix.event(drag_container,webix.env.mouse.move,webix.DragControl._skip_mark);

		if (!webix.DragControl._drag_context.from)
			webix.DragControl._drag_context = {source:a, from:a};

		webix.DragControl._html=drag_container;
		return true;
	},
	//helper, prevents unwanted mouse-out events
	_skip_mark:function(){
		webix.DragControl._skip=true;
	},
	//after dnd end, remove all traces and used html elements
	destroyDrag:function(e){
		var a=webix.DragControl._active;
		var master = this._drag_masters[a.webix_drag];

		if (master && master.$dragDestroy){
			webix.DragControl._skipDropH = webix.eventRemove(webix.DragControl._skipDropH);
			if(webix.DragControl._html)
				master.$dragDestroy(a,webix.DragControl._html,e);
		}
		else{
			webix.html.remove(webix.DragControl._html);
		}
		webix.DragControl._landing=webix.DragControl._active=webix.DragControl._last=webix.DragControl._html=null;
	},
	top:5,	 //relative position of drag marker to mouse cursor
	left:5,

	$dragPos:function(pos, e){
		var m=this._drag_masters[webix.DragControl._active.webix_drag];
		if (m.$dragPos && m!=this)
			m.$dragPos(pos, e, webix.DragControl._html);
	},
	//called when mouse was moved in drop area
	$dragIn:function(s,t,e){
		var m=this._drag_masters[t.webix_drop];
		if (m.$dragIn && m!=this) return m.$dragIn(s,t,e);
		t.className=t.className+" webix_drop_zone";
		return t;
	},
	//called when mouse was moved out drop area
	$dragOut:function(s,t,n,e){
		var m=this._drag_masters[t.webix_drop];
		if (m.$dragOut && m!=this) return m.$dragOut(s,t,n,e);
		t.className=t.className.replace("webix_drop_zone","");
		return null;
	},
	//called when mouse was released over drop area
	$drop:function(s,t,e){
		var m=this._drag_masters[t.webix_drop];
		webix.DragControl._drag_context.from = webix.DragControl.getMaster(s);
		if (m.$drop && m!=this) return m.$drop(s,t,e);
		t.appendChild(s);
	},
	//called when dnd just started
	$drag:function(s,e){
		var m=this._drag_masters[s.webix_drag];
		if (m.$drag && m!=this) return m.$drag(s,e);
		return "<div style='"+s.style.cssText+"'>"+s.innerHTML+"</div>";
	}	
};
/*
	Behavior:DataMove - allows to move and copy elements, heavily relays on DataStore.move
	@export
		copy
		move
*/
webix.DataMove={
	//creates a copy of the item
	copy:function(sid,tindex,tobj, details){
		details = details || {};
		var new_id = details.newId || sid;
		tobj = tobj||this;

		var data = this.getItem(sid);
		webix.assert(data,"Incorrect ID in DataMove::copy");
		
		//make data conversion between objects
		if (tobj)
			data = tobj._externalData(data);
		
		//adds new element same as original
		return tobj.data.add(tobj._externalData(data,new_id),tindex);
	},
	_next_move_index:function(nid, next, source){
		if (next && nid){
			var new_index = this.getIndexById(nid);
			return new_index+(source == this && source.getIndexById(next)<new_index?0:1);
		}
	},
	//move item to the new position
	move:function(sid,tindex,tobj, details){
		details = details || {};
		var new_id = details.newId || sid;

		tobj = tobj||this;
		webix.assert(tobj.data, "moving attempt to component without datastore");
		if (!tobj.data) return;

		//can process an arrya - it allows to use it from onDrag 
		if (webix.isArray(sid)){
			//block separate repaint operations
			if (sid.length > 3) //heuristic value, duplicated below
				this.$blockRender = tobj.$blockRender = true;

			for (var i=0; i < sid.length; i++) {
				//increase index for each next item in the set, so order of insertion will be equal to order in the array
				var nid = this.move(sid[i], tindex, tobj, details);
				tindex = tobj._next_move_index(nid, sid[i+1], this);
			}

			this.$blockRender = tobj.$blockRender = false;
			if (sid.length > 3){
				//repaint whole component
				this.refresh();
				if (tobj != this)
					tobj.refresh();
			}
			return;
		}
		
		var nid = sid; //id after moving

		var data = this.getItem(sid);
		webix.assert(data,"Incorrect ID in DataMove::move");
		
		if (!tobj || tobj == this){
			if (tindex < 0) tindex = this.data.order.length - 1;
			this.data.move(this.getIndexById(sid),tindex);	//move inside the same object
			this.data.callEvent("onDataMove", [sid, tindex]);
		} else {
			//copy to the new object
			nid = tobj.data.add(tobj._externalData(data,new_id),tindex, (details.parent || 0));
			this.data.remove(sid);//delete in old object
		}
		return nid;	//return ID of item after moving
	},
	//move item on one position up
	moveUp:function(id,step){
		return this.move(id,this.getIndexById(id)-(step||1));
	},
	//move item on one position down
	moveDown:function(id,step){
		return this.moveUp(id, (step||1)*-1);
	},
	//move item to the first position
	moveTop:function(id){
		return this.move(id,0);
	},
	//move item to the last position
	moveBottom:function(id){
		return this.move(id,this.data.count()-1);
	},
	/*
		this is a stub for future functionality
		currently it just makes a copy of data object, which is enough for current situation
	*/
	_externalData:function(data,id){
		var newdata = webix.extend({},data);
		newdata.id = (!id || this.data.pull[id])?webix.uid():id;
		

		newdata.$template=null;

		if (this._settings.externalData)
			newdata = this._settings.externalData.call(this, newdata, id);
		return newdata;
	}
};


webix.Movable = {
	move_setter: function (value) { 
		if (value){
			this._move_admin = webix.clone(this._move_admin);
			this._move_admin.master = this;

			webix.DragControl.addDrag(this._headobj, this._move_admin);
		}
		return value;
	},
	_move_admin: {
		$dragCreate:function(object, e){
			var offset = webix.html.offset(object);
			var pos = webix.html.pos(e);
			webix.DragControl.top = offset.y - pos.y;
			webix.DragControl.left = offset.x - pos.x;

			return webix.toNode(this.master._viewobj);
		}, 	
		$dragDestroy:function(node, drag){
			var view = this.master;
			if (view._settings){
				view._settings.top = parseInt(drag.style.top,10);
				view._settings.left = parseInt(drag.style.left,10);
			}

			webix.DragControl.top = webix.DragControl.left = 5;
			this.master.callEvent("onViewMoveEnd", []);
			return;
		},
		$dragPos:function(pos, e){
			this.master.callEvent("onViewMove", [pos, e]);
		}
	}
};



webix.Modality = {
    _modal_set:function(value){
	    if (value){
	    	if (!this._modal_cover){
		        this._modal_cover = webix.html.create('div',{
		        	"class":"webix_modal"
		    	});
		    
		    	/*	with below code we will have the same zIndex for modal layer as for the previous 
					abs positioned element, but because of attaching order modal layer will be on top anyway
		    	*/
		    	var zIndex = this._settings.zIndex||webix.ui.zIndex();

		    	//set topmost modal layer
		    	this._previous_modality = webix._modality;
		    	webix._modality = zIndex;


		    	this._modal_cover.style.zIndex = zIndex-1;
		    	this._viewobj.style.zIndex = zIndex;
		        document.body.appendChild(this._modal_cover);
	        }
	    }
	    else {
	        if (this._modal_cover){
	            webix.html.remove(this._modal_cover);

	            //restore topmost modal layer
	        	//set delay, as current window closing may have not finished click event
	        	//need to wait while it is not fully processed
	        	var topmost = this._previous_modality;
	        	setTimeout(function(){ webix._modality = topmost; }, 1);

	        	this._modal_cover = null;
	        }
	    }
	    return value;
    }
};

	
webix.protoUI({
	name:"window",

	$init:function(config){
		this._viewobj.innerHTML = "<div class='webix_win_content'><div class='webix_win_head'></div><div class='webix_win_body'></div></div>";
		
		this._contentobj = this._viewobj.firstChild;
		this._headobj = this._contentobj.childNodes[0];
		this._dataobj = this._bodyobj = this._contentobj.childNodes[1];
		this._viewobj.className +=" webix_window";
		
		this._head_cell = this._body_cell = null;
		this._settings._inner = {top:false, left:false, right:false, bottom:false }; //set border flags
		if (!config.id) config.id = webix.uid();

		webix.event(this._contentobj, "click", webix.bind(this._ignore_clicks, this));
		
		// hidden_setter handling
		if(config.modal)
			this._modal = true;
	},
	_ignore_clicks:function(e){
		var popups = webix.ui._popups;
		var index = popups.find(this);
		if (index == -1)
			index = popups.length - 1;

		e.click_view = index;
		if (webix.env.isIE8)
			e.srcElement.click_view = index;
	},
	getChildViews:function(){
		if (this._head_cell)
			return [this._head_cell, this._body_cell];
		else
			return [this._body_cell];
	},
	zIndex_setter:function(value){
        this._viewobj.style.zIndex = value;
        return value;
    },
	_remove:function(){ 
		this._body_cell = { destructor:function(){} };	
	},
	_replace:function(new_view){
		this._body_cell.destructor();
		this._body_cell = new_view;
		this._body_cell._parent_cell = this;
		
		this._bodyobj.appendChild(this._body_cell._viewobj);

		var cell = this._body_cell._viewobj.style;
		cell.borderTopWidth = cell.borderBottomWidth = cell.borderLeftWidth = cell.borderRightWidth = "1px";
		this._body_cell._settings._inner = webix.clone(this._settings._inner);

		this.resize(true);
	},
	show:function(node, mode, point){
		if(!this.callEvent("onBeforeShow",arguments))
			return false;

		this._settings.hidden = false;
		this._viewobj.style.zIndex = (this._settings.zIndex||webix.ui.zIndex());
		if (this._settings.modal || this._modal){
			this._modal_set(true);
			this._modal = null; // hidden_setter handling
		}

		var pos, dx, dy;
		mode = mode || {};
		if (!mode.pos)
			mode.pos = this._settings.relative;

		//get position of source html node
		//we need to show popup which pointing to that node
		if (node){
			//if event was provided - get node info from it
			if (typeof node == "object" && !node.tagName){
				/*below logic is far from ideal*/
				if (node.target || node.srcElement){
					pos = webix.html.pos(node);
					dx = 20;
					dy = 5;
				} else
					pos = node;

				
			} else {
				node = webix.toNode(node);
				webix.assert(node,"Not existing target for window:show");
				pos = webix.html.offset(node);
			}	

			//size of body, we need to fit popup inside
			var x = Math.max(window.innerWidth || 0, document.body.offsetWidth);
			var y = Math.max(window.innerHeight || 0, document.body.offsetHeight);

			//size of node, near which popup will be rendered
			dx = dx || node.offsetWidth  || 0;
			dy = dy || node.offsetHeight || 0;
			//size of popup element
			var size = this._last_size;

 			var fin_x = pos.x;
			var fin_y = pos.y;
			var point_y=0;
			var point_x = 0;

			if (this._settings.autofit){
				var delta_x = 6; var delta_y=6; var delta_point = 6;

				//default pointer position - top 
				point = "top";
				fin_y=0; fin_x = 0;
				//if we want to place menu at righ, but there is no place move it to left instead
				if (x - pos.x - dx < size[0] && mode.pos == "right")
					mode.pos = "left";

				if (mode.pos == "right"){
					fin_x = pos.x+delta_x+dx; 
					delta_y = -dy;
					point = "left";
					point_y = Math.round(pos.y+dy/2);
					point_x = fin_x - delta_point;
				} else if (mode.pos == "left"){
					fin_x = pos.x-delta_x-size[0]-1;
					delta_y = -dy;
					point = "right";
					point_y = Math.round(pos.y+dy/2);
					point_x = fin_x + size[0]+1;
				} else  {
					//left border of screen
					if (pos.x < 0){
						fin_x = 0;
					//popup exceed the right border of screen
					} else if (x-pos.x > size[0]){
						fin_x = pos.x; //aligned
					} else{
						fin_x = x-delta_x-size[0]; //not aligned
					}

					point_x = Math.round(pos.x+dx/2);
					//when we have a small popup, point need to be rendered at center of popup
					if (point_x > fin_x + size[0])
						point_x = fin_x + size[0]/2;
				}
				
				//if height is not fixed - use default position
				if ((!size[1] || (y-dy-pos.y-delta_y > size[1])) && mode.pos != "top"){
					//bottom	
					fin_y = dy+pos.y+delta_y - 4;
					if (!point_y){
						point = "top";
						point_y = fin_y-delta_point;
					}
				} else {
					//top
					fin_y = pos.y-delta_y - size[1];
					if (fin_y < 0){
						fin_y = 0; 
						//left|right point can be used, but there is no place for top point
						if (point == "top") point = false;
					} else if (!point_y){
						point = "bottom";
						fin_y --;
						point_y = fin_y+size[1]+1;
					}
				}
			}

			var deltax = (mode.x || 0);
			var deltay = (mode.y || 0);
			this.setPosition(fin_x+deltax, fin_y+deltay);
			if (this._set_point){
				if (point)
					this._set_point(point,point_x+deltax, point_y+deltay);
				else
					this._hide_point();
			}
		} else if (this._settings.position)
			this._setPosition();

		this._viewobj.style.display = "block";
		this._hide_timer = 1;
		webix.delay(function(){ this._hide_timer = 0; }, this, [], (webix.env.touch ? 400 : 100 ));
		
		this._render_hidden_views();
		
		
		if (this.config.autofocus){
			this._prev_focus = webix.UIManager.getFocus();
			webix.UIManager.setFocus(this);
		}

		if (-1 == webix.ui._popups.find(this))
			webix.ui._popups.push(this);

		this.callEvent("onShow",[]);
	}, 
	_hide:function(e){
		//do not hide modal windows
		if (this._settings.hidden || this._settings.modal || this._hide_timer || (e && e.showpopup)) return;
		//do not hide popup, when we have modal layer above the popup
		if (webix._modality && this._settings.zIndex <= webix._modality) return;

		//ignore inside clicks and clicks in child-popups

		if (e){
			var index = webix.env.isIE8 ? e.srcElement.click_view : e.click_view;
			if (!index && index !== 0) index = -1;

			var myindex = webix.ui._popups.find(this);
			if (myindex <= index) return;
		}

		this.hide();
	},
	hidden_setter:function(value){
		if(value) 
			this.hide();
		else
			this.show();
		return !!value;
	},
	hide:function(force){
		if (!force)
			if(this._settings.hidden) return;

		if (this._settings.modal)
			this._modal_set(false);
			
		if (this._settings.position == "top"){
			webix.animate(this._viewobj, {type: 'slide', x:0, y:-(this._content_height+20), duration: 300,
											callback:this._hide_callback, master:this});
		}
		else 
			this._hide_callback();

		if (this._settings.autofocus){
			webix.UIManager.setFocus(this._prev_focus);
			this._prev_focus = null;
		}

		this._hide_sub_popups();
	},
	//hide all child-popups
	_hide_sub_popups:function(){
		var order = webix.ui._popups;
		var index = order.find(this);
		var size = order.length - 1;

		if (index > -1)
			for (var i = size; i > index; i--)
				if (order[i]._hide_point)	//hide only popups, skip windows
					order[i].hide();
		
		order.removeAt(index);
	},
	destructor: function() {
		if (this._settings.autofocus){
			if (!webix._final_destruction)
				webix.UIManager.setFocus(this._prev_focus);
			this._prev_focus = null;
		}
		
		this._hide_sub_popups();
		webix.Destruction.destructor.apply(this, []);
	},
	_hide_callback:function(){
		if (!this.$destructed){
			this._viewobj.style.display = "none";
			this._settings.hidden = true;
			this.callEvent("onHide",[]);
		}
	},
	close:function(){
		this._modal_set(false);

		webix.html.remove(this._viewobj);
		this.destructor(); 
	},
	_inner_body_set:function(value){
		value.borderless = true;
	},
	body_setter:function(value){
		if (typeof value != "object")
			value = {template:value };
		this._inner_body_set(value);

		webix._parent_cell = this;
		this._body_cell = webix.ui._view(value);
		this._body_cell._parent_cell = this;

		this._bodyobj.appendChild(this._body_cell._viewobj);
		return value;
	},
	head_setter:function(value){
		if (value === false) return value;
		if (typeof value != "object")
			value = { template:value, padding:0 };
		
		value.borderless = true;

		webix._parent_cell = this;
		this._head_cell = webix.ui._view(value);
		this._head_cell._parent_cell = this;

		this._headobj.appendChild(this._head_cell._viewobj);
		return value;
	},
	getBody:function(){
		return this._body_cell;
	},
	getHead:function(){
		return this._head_cell;	
	},
	adjust:function(){ return this.resize(); },
	resizeChildren:function(){
		if (this._body_cell)
			this.resize();
	},
	resize:function(){
		webix.ui.baseview.prototype.adjust.call(this);
		this._setPosition(this._settings.left, this._settings.top);
	},
	_setPosition:function(x,y){
		if (this._settings.position){
			this.$view.style.position = "fixed";

			var width = this._content_width;
			var height = this._content_height;
			webix.assert(width && height, "Attempt to show not rendered window");

			var maxWidth = (window.innerWidth||document.documentElement.offsetWidth);
			var maxHeight = (window.innerHeight||document.documentElement.offsetHeight);
			var left = Math.round((maxWidth-width)/2);
			var top = Math.round((maxHeight-height)/2);

			if (typeof this._settings.position == "function"){
				var state = { 	left:left, top:top, 
								width:width, height:height, 
								maxWidth:maxWidth, maxHeight:maxHeight };
				this._settings.position.call(this, state);
				if (state.width != width || state.height != height)
					this.$setSize(state.width, state.height);

				this.setPosition(state.left, state.top);
			} else {
				if (this._settings.position == "top"){
					if (webix.animate.isSupported())
						top = -1*height;
					else
						top = 10;
				}
				this.setPosition(left, top);
			}
			
			if (this._settings.position == "top")
				webix.animate(this._viewobj, {type: 'slide', x:0, y:height-((this._settings.padding||0)*2), duration: 300 ,callback:this._topPositionCallback, master:this});
		} else 
			this.setPosition(x,y);
	},
	_topPositionCallback:function(node){
		webix.animate.clear(node);
		this._settings.top=-((this._settings.padding||0)*2);
		this.setPosition(this._settings.left, this._settings.top);
	},
	setPosition:function(x,y){
		this._viewobj.style.top = y+"px";
		this._viewobj.style.left = x+"px";
		this._settings.left = x; this._settings.top=y;
	},
	$getSize:function(dx, dy){
		var _borders = this._settings._inner;
		if (_borders){
			dx += (_borders.left?0:1)+(_borders.right?0:1);
			dy += (_borders.top?0:1)+(_borders.bottom?0:1);
		}
		//line between head and body
		if (this._settings.head)
			dy += 1;

		var size =  this._body_cell.$getSize(0,0);
		if (this._head_cell){
			var head_size = this._head_cell.$getSize(0,0);
			if (head_size[3]==head_size[2])
				this._settings.headHeight = head_size[3];
			dy += this._settings.headHeight;
		}

		if (this._settings.fullscreen){
			var width = window.innerWidth || document.body.clientWidth;
			var height = window.innerHeight || document.body.clientHeight;
			return [width, width, height, height];
		}

		//get layout sizes
		var self_size = webix.ui.view.prototype.$getSize.call(this, 0, 0);

		//use child settings if layout's one was not defined
		self_size[1] = Math.min(self_size[1],(size[1]>=100000&&self_size[1]>=100000?Math.max(size[0], 300):size[1])+dx);
		self_size[3] = Math.min(self_size[3],(size[3]>=100000&&self_size[3]>=100000?Math.max(size[2], 200):size[3])+dy);

		self_size[0] = Math.min(Math.max(self_size[0],size[0] + dx), self_size[1]);
		self_size[2] = Math.min(Math.max(self_size[2],size[2] + dy), self_size[3]);

		return self_size;
	},
	$setSize:function(x,y){
		webix.ui.view.prototype.$setSize.call(this,x,y);
		x = this._content_width;
		y = this._content_height;
		if (this._settings.head === false) {
			this._headobj.style.display="none";
			this._body_cell.$setSize(x,y);
		} else { 
			this._head_cell.$setSize(x,this._settings.headHeight);
			this._body_cell.$setSize(x,y-this._settings.headHeight);
		}
	},
	$skin:function(){
		this.defaults.headHeight = webix.skin.$active.barHeight;
	},
	defaults:{
		top:0,
		left:0,
		autofit:true,
		relative:"bottom",
		body:"",
		head:"",
		hidden: true,
		autofocus:true
	}
}, webix.ui.view, webix.Movable, webix.Modality, webix.EventSystem);

webix.protoUI({
	name:"popup",
	$init:function(){
		this._settings.head = false;
		this.$view.className += " webix_popup";
		webix.attachEvent("onClick", webix.bind(this._hide, this));
		this.attachEvent("onHide", this._hide_point);
	},
    close:function(){
        webix.html.remove(this._point_element);
        webix.ui.window.prototype.close.call(this);
	},
	$getSize:function(x,y){
		return webix.ui.window.prototype.$getSize.call(this, x+this._settings.padding*2,y+this._settings.padding*2);
	},
	$setSize:function(x,y){
			webix.ui.view.prototype.$setSize.call(this,x,y);
			x = this._content_width-this._settings.padding*2;
			y = this._content_height-this._settings.padding*2;
			this._contentobj.style.padding = this._settings.padding+"px";
			this._headobj.style.display="none";
			this._body_cell.$setSize(x,y);
	},
	//redefine to preserve inner borders
	_inner_body_set:function(){},
	defaults:{
		padding:8
	},
	head_setter:function(){
	},
	_set_point:function(mode, left, top){
		this._hide_point();
		document.body.appendChild(this._point_element = webix.html.create("DIV",{ "class":"webix_point_"+mode },""));
		this._point_element.style.zIndex = webix.ui.zIndex();
		this._point_element.style.top = top+"px";
		this._point_element.style.left = left+"px";
	},
	_hide_point:function(){
		this._point_element = webix.html.remove(this._point_element);
	}
}, webix.ui.window);

webix.ui._popups = webix.toArray();

webix.protoUI({
	name:"suggest",
	defaults:{
		autofocus:false,
		type:"list",
		keyPressTimeout:1,
		body:{
			yCount:10,
			autoheight:true,
			body:true,
			select:true,
			borderless:true,
			navigation:true
		},
		filter:function(item,value){
			if (item.value.toString().toLowerCase().indexOf(value.toLowerCase())===0) return true;
   			return false;
		}
	},
	template_setter:webix.template,
    filter_setter:function(value){
        return webix.toFunctor(value, this.$scope);
    },
	$init:function(obj){
		var temp = {};
		webix.extend(temp, webix.copy(this.defaults.body));
		temp.view = obj.type || this.defaults.type;

		var etemp = this._get_extendable_cell(temp);
		if (obj.body)
			webix.extend(etemp, obj.body, true);

		if (obj.data)
			etemp.data = obj.data;
		if (obj.url)
			etemp.url = obj.url;
		if (obj.datatype)
			etemp.datatype = obj.datatype;

		if (obj.id)
			temp.id = temp.id || (obj.id+"_"+temp.view);

		obj.body = temp;
		this.$ready.push(this._set_on_popup_click);

		this._old_text = {};
	},
	_get_extendable_cell:function(obj){
		return obj;
	},
	_preselectMasterOption: function(data){
		if (data){
			var master, node, text;
			if (this._settings.master){
				master = webix.$$(this._settings.master);
				if (master.options_setter && (node = master.getInputNode())){
					text = this.getItemText(data.id);
					if (webix.isUndefined(node.value))
						node.innerHTML = text;
					else
						node.value = text.replace(/<[^>]*>/g,"");
				}
			}
		}
	},
	setMasterValue:function(data, refresh){
		if (this._settings.master){
			var master = webix.$$(this._settings.master);
			if (refresh && data.id)
				master.refresh();
			else if (master.options_setter)
				master.setValue(data.id);
			else if(master.setValueHere)
				master.setValueHere(data.text||data.value);
			else
				master.setValue(data.text||data.value);
		} else if (this._last_input_target){
			this._last_input_target.value = data.text||data.value;
		}

		if (!refresh){
			this.hide(true);
			if (this._last_input_target)
				this._last_input_target.focus();
		}
		this.callEvent("onValueSuggest", [data]);
		webix.delay(function(){
			 webix.callEvent("onEditEnd",[]);
		});
	},
	getMasterValue:function(){
		if (this._settings.master)
			return webix.$$(this._settings.master).getValue();
		return null;
	},
	getItemText:function(id){
		var item = this.getList().getItem(id);

		if (!item)
			return this._old_text[id] || "";

		if (this._settings.template)
			return this._settings.template.call(this, item, this.type);

		if (this._settings.textValue)
			return item[this._settings.textValue];
		
		var type = this.getList().type;
		var text = type.template.call(type, item, type);

		return (this._old_text[id] = text);
	},
	getSuggestion:function(){
		var list = this.getList();
		var id;

		if (list.getSelectedId)
			id = list.getSelectedId();
		if (!id && list.data.order.length)
			id = list.data.order[0];

		//complex id in datatable
		if (id && typeof id == "object") id = id+"";
		return id;
	},
	getList:function(){
		return this._body_cell;
	},
	_set_on_popup_click:function(){
		var list = this.getList();
		var type = this._settings.type;
		if (list.count){
			list.attachEvent("onItemClick", webix.bind(function(item){
				this.setMasterValue(list.getItem(item));
			}, this));
			list.data.attachEvent("onstoreupdated",webix.bind(function(id, obj, mode){
				if (mode == "delete" && id == this.getMasterValue())
					this.setMasterValue({ id:"", text:"" }, 1);
				else if (mode == "update" && id == this.getMasterValue()){
					this.setMasterValue(obj, 1);
				}
			}, this));
			list.data.attachEvent("onAfterFilter", webix.bind(this._suggest_after_filter, this));
			list.data.attachEvent("onStoreLoad", webix.bind(this._suggest_after_filter, this));
			if (webix.isUndefined(this._settings.fitMaster))
				this._settings.fitMaster = true;
		} else if (type == "calendar"){
			list.attachEvent("onDateSelect", function(date){
				this.getParentView().setMasterValue({ value:date});
			});
			list.attachEvent("onTodaySet", function(date){
				this.getParentView().setMasterValue({ value:date});
			});
			list.attachEvent("onDateClear", function(date){
				this.getParentView().setMasterValue({ value:date});
			});
		} else if (type == "colorboard"){
			list.attachEvent("onSelect", function(value){
				this.getParentView().setMasterValue({ value:value });
			});
		}
	},
	input_setter: function(value) {
		this.linkInput(value);
		return 0;
	},
	linkInput: function(input){
		var node;
		if (input.getInputNode){
			node = input.getInputNode();
			node.webix_master_id = input._settings.id;
		} else
			node = webix.toNode(input);

		webix.event(node,"keydown",function(e){
			if (node != document.body || this.isVisible())
				this._suggestions(e);
		},this);

		this._non_ui_mode = true;
	},
	_suggestions: function(e){
		e = (e||event);
		var list = this.getList();
		
		var trg = e.target||e.srcElement;

		this._last_input_target = trg;
		this._settings.master = trg.webix_master_id;

		window.clearTimeout(this._key_timer);

		var code = e.keyCode;
		//shift and ctrl
		if (code == 16 || code == 17) return;

		// tab - hide popup and do nothing
		if (code == 9)
			return this._tab_key(this,list);

		// escape - hide popup
		if (code == 27)
			return this._escape_key(this,list);

		// enter
		if (code == 13)
			return this._enter_key(this,list);

		// up/down are used for navigation
		if (this._navigate(e)) {
			webix.html.preventEvent(e);
			return false;
		}

		if (webix.isUndefined(trg.value)) return;

		clearTimeout(this._last_delay);
		this._last_delay = webix.delay(function(){
			//focus moved to the different control, suggest is not necessary
			if (!this._non_ui_mode && 
					webix.UIManager.getFocus() != webix.$$(this._settings.master)) return;

			this._resolve_popup = true;
			//for multicombo
			var val = trg.value;

			// used to prevent showing popup when it was initialized
			if (list.config.dataFeed)
				list.filter("value", val);
			else if (list.filter){
				list.filter(webix.bind(function(item){
					return this._settings.filter.call(this,item,val);
				}, this));
			}
		},this, [], this._settings.keyPressTimeout);
	},
	_suggest_after_filter: function() {
		if (!this._resolve_popup) return true;
		this._resolve_popup = false;

		var list = this.getList();
		
		// filtering is complete
		// if there are as min 1 variant it must be shown, hidden otherwise
		if (list.count() >0){
			this.adjust();
			this._dont_unfilter = true;
			this.show(this._last_input_target,null,true);
		} else {
			this.hide(true);
			this._last_input_target = null;
		}
	},

	show:function(node){
		if (!this.isVisible()){
			var list = this.getList();
			if (list.filter && !this._dont_unfilter){
				list.filter("");
				if (list.select)
					this._show_selection(list);
			} else 
				this._dont_unfilter = false;

			if(this.$customWidth){
				this.$customWidth(node);
			}
			if (node.tagName && this._settings.fitMaster){
				this._settings.width = node.offsetWidth -2 ; //2 - borders
			}
			if (list._zoom_level)
				list.render();

			this.adjust();
		}
		webix.ui.popup.prototype.show.apply(this, arguments);
	},
	_show_selection:function(list){
		var value = this.getMasterValue();
		if (value && list.exists && list.exists(value))
			list.select(value);
		else{
			list.unselect();
			list.showItem(list.getFirstId());
		}
	},
	_enter_key: function(popup,list) {
		if (list.count && list.count()){
			if (popup.isVisible()) {
				var value = list.getSelectedId(false, true);
				if (value)
					this.setMasterValue(list.getItem(value));

				popup.hide(true);
			} else {
				popup.show(this._last_input_target);
			}
		} else {
			if (popup.isVisible())
				popup.hide(true);
			
		}
	},
	_escape_key: function(popup, list) {
		return popup.hide(true);
	},
	_tab_key: function(popup, list) {
		return popup.hide(true);
	},


	/*! suggestions navigation: up/down buttons move selection
	 *	@param e
	 *		event object
	 **/
	_navigate: function(e) {
		var list = this.getList();
		var code = e.keyCode;

		if(list.count && list.moveSelection) {
			// up arrow
			if (code === 38 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {

				list.moveSelection("up");
				this._preselectMasterOption(list.getSelectedItem());
				return true;
			}

			// down arrow
			if (code === 40 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
				var visible = this.isVisible();
				if (!visible){
					if (list.count())
						this.show(this._last_input_target);
					else return false;
				}


				var selected = list.getSelectedId();
				if (!selected && list.count)
					list.select(list.getFirstId());
				else if (visible)
					list.moveSelection("down");
				this._preselectMasterOption(list.getSelectedItem());
				return true;
			}
		}	
		return false;
	},
	getValue:function(){
		var value = this.getList().getSelectedId() || "";
		return value.id || value;

	},
	setValue:function(value){
		var list = this.getList();
		if(value){
            if(list.exists(value)){
                list.select(value);
                list.showItem(value);
            }
        }else{
            list.unselect();
            list.showItem(list.getFirstId());
        }
	}
}, webix.ui.popup);


webix.attachEvent("onClick", function(e){
	var element = webix.$$(e);
	if (element && element.touchable){
		//for inline elements - restore pointer to the master element
		element.getNode(e);
		//reaction on custom css elements in buttons
		var trg=e.target||e.srcElement;
		if (trg.className == "webix_disabled")
			return;

		var css = "";
		var id = null;
		var found = false;
		if (trg.className && trg.className.toString().indexOf("webix_view")===0) return;
		//loop through all parents
		while (trg && trg.parentNode){
			if (trg.getAttribute){
				if (trg.getAttribute("view_id"))
					break;
					
				css=trg.className;
				if (css){
					css = css.toString().split(" ");
					for (var i =0; i<css.length; i++){
						if (element.on_click[css[i]]){
							var res =  element.on_click[css[i]].call(element,e,element._settings.id,trg);
							if (res===false)
								return;
						}
					}
				}
			}
			trg=trg.parentNode;
		}


		if (element._settings.click){
			var code = webix.toFunctor(element._settings.click, element.$scope);
			if (code && code.call) code.call(element, element._settings.id, e);
		}



		var popup = element._settings.popup;
		if (element._settings.popup && !element._settings.readonly){
			if (typeof popup == "object" && !popup.name)
				popup = element._settings.popup = webix.ui(popup)._settings.id;

			var popup = webix.$$(popup);
			webix.assert(popup, "Unknown popup");

			if (!popup.isVisible()){
				popup._settings.master = element._settings.id;
				popup.show((element.getInputNode()||element.getNode()),null,true);
			}
		}

		element.callEvent("onItemClick", [element._settings.id, e]);
	}
});


webix.protoUI({
	name:"button",
	touchable:true,
	$skin:function(){
		this.defaults.height = webix.skin.$active.buttonHeight||webix.skin.$active.inputHeight;
		//used in "text"
		this._labelTopHeight = webix.skin.$active.labelTopHeight||15;
	},
	defaults:{
		template:function(obj, common){
			var text = common._inputTemplate(obj, common);
			if (obj.badge) text = text.replace("</button>", "<span class='webix_badge'>"+obj.badge+"</span></button>");
			return "<div class='webix_el_box' style='width:"+obj.awidth+"px; height:"+obj.aheight+"px'>"+ text + "</div>";
		},
		label:"",
		tabFocus:true,
		borderless:true
	},
	_inputTemplate:function(obj){
		var css = "class='webixtype_"+(obj.type||"base")+"' ";
		return "<button type='button' "+css+">"+webix.template.escape(obj.label||obj.value)+"</button>";
	},
	$init:function(config){
		this._viewobj.className += " webix_control webix_el_"+(this.$cssName||this.name);

		this.data = this._settings;
		this._dataobj = this._viewobj;
	},
	hotkey_setter: function(key){
		var control = this;
		this._addElementHotKey(key, function(view,ev){
			var elem = control.$view.firstChild;
			if(elem.dispatchEvent){
				var clickEvent = document.createEvent('MouseEvents');
				clickEvent.initEvent('click', true, true);
				ev.preventDefault();
				elem.dispatchEvent(clickEvent);
			}
		});
	},
	_addElementHotKey: function(key, func, view){
		var keyCode = webix.UIManager.addHotKey(key, func, view);
		this.attachEvent("onDestruct", function(){
			webix.UIManager.removeHotKey(keyCode, func, view);
		});
	},
	tooltip_setter: function(value){
		var box = this._getBox() || this.$view.firstChild;
		if(box)
			box.title = value;
		return value;
	},
	type_setter:function(value){
		if (this._types[value])
			this._inputTemplate = webix.template(this._types[value]);
		if (value == 'prev' || value == 'next')
			this._set_inner_size = this._set_inner_size_next;
		else
			this._set_inner_size = false;
		return value;
	},
	_types:{
		htmlbutton: "<button type='button' class='webix_el_htmlbutton webixtype_base'>#label#</button>",

		prev:"<input type='button' class='webixtype_prev' value='#label#' /><div class='webix_el_arrow webixtype_prev_arrow'></div>",
		next:"<input type='button' class='webixtype_next' value='#label#' /><div class='webix_el_arrow webixtype_next_arrow'></div>",

		imageButton:"<button type='button' class='webix_img_btn_abs webixtype_base' style='width:100%; line-height:#cheight#px'><div class='webix_image' style='width:#dheight#px;height:#dheight#px;background-image:url(#image#);'> </div> #label#</button>",
		imageButtonTop:"<button type='button' class='webix_img_btn_abs webix_img_btn_abs_top webixtype_base'><div class='webix_image' style='width:100%;height:100%;background-image:url(#image#);'> </div> <div class='webix_img_btn_text'>#label#</div></button>",

		image:"<button type='button' class='webix_img_btn' style='line-height:#cheight#px;'><div class='webix_image' style='width:#cheight#px;height:#cheight#px;background-image:url(#image#);'> </div> #label#</button>",
		imageTop:"<button type='button' class='webix_img_btn_top' style='background-image:url(#image#);'><div class='webix_img_btn_text'>#label#</div></button>",

		icon:"<button type='button' class='webix_img_btn' style='line-height:#cheight#px;'><span class='webix_icon_btn fa-#icon#' style='max-width:#cheight#px;'></span>#label#</button>",
		iconButton:"<button type='button' class='webix_img_btn_abs webixtype_base' style='width:100%;'><span class='webix_icon fa-#icon#'></span> #label#</button>",
		iconTop:"<button type='button' class='webix_img_btn_top' style='width:100%;top:4px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#label#</div></button>",
		iconButtonTop:"<button type='button' class='webix_img_btn_abs webix_img_btn_abs_top webixtype_base' style='width:100%;top:0px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#label#</div></button>"

	},
	_findAllInputs: function(){
		var result = [];
		var tagNames = ["input","select","textarea"];
		for(var i=0; i< tagNames.length; i++){
			var inputs = this.$view.getElementsByTagName(tagNames[i]);
			for(var j = 0; j< inputs.length; j++){
				result.push(inputs[j]);
			}
		}
		return result;
	},
	disable: function(){
        var i,
	        elem = this._getBox();
    	webix.ui.baseview.prototype.disable.apply(this, arguments);
		if(elem && elem.className.indexOf(" webix_disabled_box")== -1){
			elem.className += " webix_disabled_box";
			var inputs = this._findAllInputs();
			for(i=0; i< inputs.length; i++)
				inputs[i].setAttribute("disabled",true);
	
			if(this._settings.labelPosition == "top"){
				var label = this._dataobj.firstChild;
				if(label)
					label.className += " webix_disabled_top_label";
			}
		}
	},
	enable: function(){
		webix.ui.baseview.prototype.enable.apply(this, arguments);
		var elem = this._getBox();
		if(elem){
			elem.className = elem.className.replace(" webix_disabled_box","");
			var inputs = this._findAllInputs();
			for(var i=0; i< inputs.length; i++)
				inputs[i].removeAttribute("disabled");

			if(this._settings.labelPosition == "top"){
				var label = this._dataobj.firstChild;
				if(label)
					label.className = label.className.replace(" webix_disabled_top_label","");
			}
		}
	},
	$setSize:function(x,y){
		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			this.render();
		}
	}, 
	setValue:function(value){
		var oldvalue = this._settings.value;
		if (oldvalue == value) return false;
		
		this._settings.value = value;

		if (this._rendered_input)
			this.$setValue(value);

		this.callEvent("onChange", [value, oldvalue]);
	},
	//visual part of setValue
	$setValue:function(value){
//		this._settings.label = value;
		(this.getInputNode()||{}).value = value; 
	},
	getValue:function(){
		//if button was rendered - returning actual value
		//otherwise - returning last set value
		var value = this._rendered_input? this.$getValue() : this._settings.value;
		return (typeof value == "undefined") ? "" : value;
	},
	$getValue:function(){
		return this._settings.value||"";	
	},
	focus:function(){
		var input = this.getInputNode();
		if (input && input.focus) input.focus();
	},
	blur:function() {
		var input = this.getInputNode();
		if (input && input.blur) input.blur();
	},
	//get input element
	getInputNode: function() {
		return this._dataobj.getElementsByTagName('input')[0]||this._dataobj.getElementsByTagName('button')[0];
	},
	//get top-level sub-container
	_getBox:function(){
		for(var i=0;i< this._dataobj.childNodes.length;i++){
			if(this._dataobj.childNodes[i].className.indexOf("webix_el_box")>=0)
				return this._dataobj.childNodes[i];
		}
		return null;
	},
	_sqrt_2:Math.sqrt(2),
	_set_inner_size_next:function(){
		 var arrow = this._getBox().childNodes[1];
		 var button = arrow.previousSibling;
		 var style = this._settings.type == "next"?"right":"left";
		 var height = this._settings.aheight-webix.skin.$active.inputPadding*2-2; //-2 - borders

		/* var ax = Math.round((height)/this._sqrt_2);
		 var ay = Math.round(Math.sqrt(height*height-ax*ax));
		 
		 arrow.style.width = ax-2+"px";
		 arrow.style.height = ay-2+"px";
		 arrow.style.top = Math.round(ax/4) -1 + "px";
		 arrow.style[style] = Math.floor(ax/4)+ "px";

		 button.style.width = this._settings.awidth - 3*ax/4 -2  + "px";
		 button.style.height = height + "px";
		 button.style[style] = 3*ax/4 + "px";*/

		var arrowEdge = height*this._sqrt_2/2;
		arrow.style.width = arrowEdge+"px";
		arrow.style.height = arrowEdge+"px";
		arrow.style.top = (height - arrowEdge)/2 + webix.skin.$active.inputPadding+ "px";
		arrow.style[style] = (height - arrowEdge)/2 +this._sqrt_2/2+ "px";
		button.style.width = this._settings.awidth - height/2 -2  + "px";
		button.style.height = height + 2 + "px";
		button.style[style] =  height/2 + 2 + "px";
		button.style.top = webix.skin.$active.inputPadding+ "px";

	},
	_calck_input_size:function(){
		//use width for both width and inputWidth settings in clever way
		//in form, we can define width for some element smaller than for siblings
		//it will use inputWidth to render the desired view
		this._input_width = this._settings.inputWidth || 
			((this._content_width - this._settings.width > 2)?this._settings.width:0) || this._content_width;
		this._input_height = this._settings.inputHeight;
	},
	render:function(){
		this._calck_input_size();
		this._settings.awidth  = this._input_width||this._content_width;
		this._settings.aheight = this._input_height||this._content_height;

		//image button - image width
		this._settings.bheight = this._settings.aheight+2;
		this._settings.cheight = this._settings.aheight- 2*webix.skin.$active.inputPadding;
		this._settings.dheight = this._settings.cheight - 2; // - borders

		if(webix.AtomRender.render.call(this)){
			this._rendered_input = true;
			if (this._set_inner_size) this._set_inner_size();
			if (this._settings.align){
				var handle = this._dataobj.firstChild;
				if (this._settings.labelPosition == "top" && handle.nextSibling)
					handle = handle.nextSibling;

				switch(this._settings.align){
					case "right":
						handle.style.cssFloat = "right";
						break;
					case "center":
						handle.style.display = "inline-block";
						handle.parentNode.style.textAlign = "center";
						break;
					case "middle":
						handle.style.marginTop = Math.round((this._content_height-this._input_height)/2)+"px";
						break;
					case "bottom": 
						handle.style.marginTop = (this._content_height-this._input_height)+"px";
						break;
					case "left":
						handle.style.cssFloat = "left";
						break;
					default:
						webix.assert(false, "Unknown align mode: "+this._settings.align);
						break;
				}
			}

			if (this.$render)
				this.$render(this.data);

			if (this._settings.disabled)
				this.disable();

			// set tooltip after render
			if (this._settings.tooltip)
				this.define("tooltip",this._settings.tooltip );

			if (this._init_once){
				this._init_once(this.data);
				this._init_once = 0;
			}
		}
	},

	refresh:function(){ this.render(); },

	on_click:{
		_handle_tab_click: function(ev, button){
			var id = webix.html.locate(ev, "button_id");
			if (id && this.callEvent("onBeforeTabClick", [id, ev])){
				this.setValue(id);
				this.callEvent("onAfterTabClick", [id, ev]);
			}
		},
		webix_all_segments:function(ev, button){
			this.on_click._handle_tab_click.call(this, ev, button);
		},
		webix_all_tabs:function(ev, button) {
			this.on_click._handle_tab_click.call(this, ev, button);
		},
		webix_inp_counter_next:function(e, obj, node){ 
			this.next();
		}, 
		webix_inp_counter_prev:function(e, obj, node){ 
			this.prev();
		},
		webix_inp_combo:function(e, obj, node){
			node.focus();
		},
		webix_inp_checkbox_border: function(e, obj, node) { 
			if ((e.target||e.srcElement).tagName != "DIV" && !this._settings.readonly)
				this.toggle();
		},
		webix_inp_checkbox_label: function(e, obj, node) {
			if (!this._settings.readonly)
				this.toggle();
		},
		webix_inp_radio_border: function(e, obj, node) {
			var value = webix.html.locate(e, "radio_id");
			this.setValue(value);
		},
		webix_inp_radio_label: function(e, obj, node) {
			node = node.parentNode.getElementsByTagName('input')[0];
			return this.on_click.webix_inp_radio_border.call(this, node, obj, node);
		},
		webix_tab_more_icon: function(ev,obj, node){
			this.getPopup().resize();
			this.getPopup().show(node,null,true);
		},
		webix_tab_close:function(ev, obj, node){
			var id = webix.html.locate(ev, "button_id");
            if (id && this.callEvent("onBeforeTabClose", [id, ev]))
			    this.removeOption(id);
		}
	},

	//method do not used by button, but  used by other child-views
	_check_options:function(opts){
		webix.assert(opts, this.name+": options not defined");
		for(var i=0;i<opts.length;i++){
			//FIXME: asserts need to be removed in final version			
			webix.assert(!opts[i].text, "Please replace .text with .value in control config");
			webix.assert(!opts[i].label, "Please replace .label with .value in control config");

			if(typeof opts[i]=="string"){
				opts[i] = {id:opts[i], value:opts[i]};
			}
			else {
				if(webix.isUndefined(opts[i].id))
					opts[i].id = opts[i].value;

				if(webix.isUndefined(opts[i].value))
					opts[i].value = opts[i].id;
			}
		}
		return opts;
	},
	_get_div_placeholder: function(obj){
		var placeholder = (obj?obj.placeholder:this._settings.placeholder);
		return (placeholder?"<span class='webix_placeholder'>"+placeholder+"</span>":"");
	}
}, webix.ui.view, webix.AtomRender, webix.Settings, webix.EventSystem);

webix.protoUI({
	name:"label",
	defaults:{
		template:"<div style='height:100%;line-height:#cheight#px'>#label#</div>"
	},
	$skin:function(){
		this.defaults.height = webix.skin.$active.inputHeight;
	},
	focus:function(){ return false; },
	_getBox:function(){
		return this._dataobj.firstChild;
	},
	setHTML:function(html){
		this._settings.template = function(){ return html; };
		this.refresh();
	},
	setValue: function(value){
		this._settings.label = value;
		webix.ui.button.prototype.setValue.apply(this,arguments);
	},
	$setValue:function(value){
		this._dataobj.firstChild.innerHTML = value;
	},
	_set_inner_size:function(){}
}, webix.ui.button);

webix.protoUI({
	name:"icon",
	$skin:function(){
		this.defaults.height = webix.skin.$active.inputHeight;
	},
	defaults:{
		template:function(obj){
			return "<button type='button' "+(!obj.tabFocus?"tabindex='-1'":"")+" style='height:100%;width:100%;' class='webix_icon_button'><span class='webix_icon fa-"+obj.icon+" '></span>"+
				(obj.badge ? "<span class='webix_badge'>"+obj.badge+"</span>":"")+
				"</button>";
		},
		width:33
	},
	_set_inner_size:function(){
		
	}
}, webix.ui.button);



webix.protoUI({
	name:"text",
	_allowsClear:true,
	_init_onchange:function(){
		if (this._allowsClear){

		    webix.event(this.getInputNode(),"change",function(){
		        var newvalue = this.getValue();

		        if (newvalue != this._settings.value)
					this.setValue(this.getValue(), true);
		    },this);

			if (this._settings.suggest)
		   		webix.$$(this._settings.suggest).linkInput(this);
		 }
	},
	$skin:function(){
		this.defaults.height = webix.skin.$active.inputHeight;
		this.defaults.inputPadding = webix.skin.$active.inputPadding;
	},
	$init:function(config){
		if (config.labelPosition == "top")
			if (webix.isUndefined(config.height) && this.defaults.height)  // textarea
				config.height = this.defaults.height + this._labelTopHeight;

		//suggest reference for destructor
		this._destroy_with_me = [];

		this._setSubmitEvent();
		this.attachEvent("onAfterRender", this._init_onchange);
	},
	$renderIcon:function(){
		var config = this._settings;
		if (config.icon){
			var height = config.aheight - 2*config.inputPadding,
				padding = (height - 18)/2 -1;
				return "<span style='height:"+(height-padding)+"px;padding-top:"+padding+"px;' class='webix_input_icon fa-"+config.icon+"'></span>";
			}
			return "";
	},
	_setSubmitEvent: function(config){
		if(!this._skipSubmit){
			var form = this.getFormView();
			if(form){
				this._addElementHotKey("enter", function(view,ev){
					form.callEvent("onSubmit",[view,ev]);
				},this);
			}
		}
	},
	relatedView_setter:function(value){
		this.attachEvent("onChange", function(){
			var value = this.getValue();
			var mode = this._settings.relatedAction;
			var viewid = this._settings.relatedView;
			var view = webix.$$(viewid);
			if (!view){
				var top = this.getTopParentView();
				if (top && top.$$)
					view = top.$$(viewid);
			}

			webix.assert(view, "Invalid relatedView: "+viewid);

			if (mode == "enable"){
				if (value) view.enable(); else view.disable();
			} else {
				if (value) view.show(); else view.hide();
			}
		});
		return value;
	},
	validateEvent_setter:function(value){
		if (value == "blur")
			this.attachEvent("onBlur", this.validate);

		if (value == "key")
			this.attachEvent("onTimedKeyPress", this.validate);

		return value;
	},
	validate:function(){
		var rule = this._settings.validate;
		if (!rule && this._settings.required)
			rule = webix.rules.isNotEmpty;

		var form =this.getFormView();
		var name = this._settings.name;
		var value = this.getValue();
		var data = {}; data[name] = value;

		webix.assert(form, "Validation works only for fields in the form");
		webix.assert(name, "Validation works only for fields with name");

		if (rule && !this.getFormView()._validate(rule, value, data, name))
			return false;
		return true;
	},
	bottomLabel_setter: function(value){
		if(!this._settings.bottomPadding)
			this._settings.bottomPadding = 18;
		return value;
	},
	_getInvalidText: function(){
		var text = this._settings.invalidMessage;
		if(typeof text == "function"){
			text.call(this);
		}
		return text;
	},
	_showBottomText: function(text){
		var config = this._settings;
		if (typeof text != "undefined")
			config.bottomLabel = text;

		var message = (config.invalid ? config.invalidMessage : "" ) || config.bottomLabel || config.bottomPadding;
		if (!message) config.inputHeight = 0;

		if (message && !config.bottomPadding){
			this._restorePadding = 1;
			config.bottomPadding = config.bottomPadding || 18;	
			//textarea
			if (!config.height)
				this.render();
			this.resize();
		} else if (!message && this._restorePadding){
			config.bottomPadding = this._restorePadding = 0;
			//textarea
			if (!config.height)
				this.render();
			this.resize();
		} else
			this.render();
	},
	$getSize: function(){
		var sizes = webix.ui.view.prototype.$getSize.apply(this,arguments);
		var heightInc = this.config.bottomPadding;
		if(heightInc){
			sizes[2] += heightInc;
			sizes[3] += heightInc;
		}
		return sizes;
	},
	$setSize:function(x,y){
		var config = this._settings;

		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			if (!x || !y) return;

			if (config.labelPosition == "top"){
				if (!config.inputHeight)
					config.inputHeight = this._content_height - this._labelTopHeight - (this.config.bottomPadding||0);
				config.labelWidth = 0;
			} else if (config.bottomPadding){
				config.inputHeight = this._content_height - this.config.bottomPadding;
			}
			this.render();
		}
	}, 
	_get_input_width: function(config){
		var width = (this._input_width||0)-(config.label?this._settings.labelWidth:0)- 	4 - (config.iconWidth || 0);

		//prevent js error in IE
		return (width < 0)?0:width;
	},
	_render_div_block:function(obj, common){
		var id = obj.id || webix.uid();
		var width = common._get_input_width(obj);
		var inputAlign = obj.inputAlign || "left";
		var icon = this.$renderIcon?this.$renderIcon(obj):"";
		var height = this._settings.aheight - 2*webix.skin.$active.inputPadding -2;
		var text = (obj.text||obj.value||this._get_div_placeholder(obj));
		var html = "<div class='webix_inp_static' tabindex='0' onclick='' style='line-height:"+height+"px;width: " + width + "px; text-align: " + inputAlign + ";' >"+ text +"</div>";
		return common.$renderInput(obj, html, id);
	},
	_baseInputHTML:function(tag){
		var html = "<"+tag+(this._settings.placeholder?" placeholder='"+this._settings.placeholder+"' ":" ");
		if (this._settings.readonly)
			html += "readonly='true' ";

		var attrs = this._settings.attributes;
		if (attrs)
			for(var prop in attrs)
				html += prop+"='"+attrs[prop]+"' ";
		return html;
	},
	$renderLabel: function(config, id){
		var labelAlign = (config.labelAlign||"left");
		var top = this._settings.labelPosition == "top";
		var labelTop =  top?"display:block;":("width: " + this._settings.labelWidth + "px;");
		var label = "";
		var labelHeight = top?this._labelTopHeight-2:( this._settings.aheight - 2*this._settings.inputPadding);
		if (config.label)
			label = "<label style='"+labelTop+"text-align: " + labelAlign + ";line-height:"+labelHeight+"px;' onclick='' for='"+id+"' class='webix_inp_"+(top?"top_":"")+"label "+(config.required?"webix_required":"")+"'>" + (config.label||"") + "</label>";
		return label;
	},
	$renderInput: function(config, div_start, id) {
		var inputAlign = (config.inputAlign||"left");
		var top = (config.labelPosition == "top");
		var inputWidth = this._get_input_width(config);

		id = id || config.name || webix.uid();

		var label = this.$renderLabel(config,id);

		var html = "";
		if(div_start){
			html += div_start;
		} else {
			html += this._baseInputHTML("input")+"id='" + id + "' type='"+(config.type||this.name)+"' value='" + webix.template.escape(config.value||"") + "' style='width: " + inputWidth + "px; text-align: " + inputAlign + ";'";
			var attrs = config.attributes;
			if (attrs)
				for(var prop in attrs)
					html += " "+prop+"='"+attrs[prop]+"'";
			html += " />";
		}
		var icon = this.$renderIcon?this.$renderIcon(config):"";
		html += icon;

		var result = "";
		//label position, top or left
		if (top)
			result = label+"<div class='webix_el_box' style='width:"+config.awidth+"px; height:"+config.aheight+"px'>"+html+"</div>";
		else
			result = "<div class='webix_el_box' style='width:"+config.awidth+"px; height:"+config.aheight+"px'>"+label+html+"</div>";


		//bottom message width
		var padding = config.awidth-inputWidth-webix.skin.$active.inputPadding*2;
		//bottom message text
		var message = (config.invalid ? config.invalidMessage : "") || config.bottomLabel;
		if (message)
			result +=  "<div class='webix_inp_bottom_label' style='width:"+(inputWidth||config.awidth)+"px;margin-left:"+Math.max(padding,webix.skin.$active.inputPadding)+"px;'>"+message+"</div>";

		return result;
	},		
	defaults:{
		template:function(obj, common){
			return common.$renderInput(obj);
		},
		label:"",
		labelWidth:80
	},
	type_setter:function(value){ return value; },
	_set_inner_size:false,
	$setValue:function(value){
		this.getInputNode().value = value;
	},
	$getValue:function(){
		return this.getInputNode().value;
	},
	suggest_setter:function(value){
		if (value){
			webix.assert(value !== true, "suggest options can't be set as true, data need to be provided instead");

			if (typeof value == "string"){
				var attempt = webix.$$(value);
				if (attempt) 
					return webix.$$(value)._settings.id;

				value = { body: { url:value , dataFeed :value } };
			} else if (webix.isArray(value))
				value = { body: { data: this._check_options(value) } };
			else if (!value.body)
				value.body = {};

			webix.extend(value, { view:"suggest" });

			var view = webix.ui(value);
			this._destroy_with_me.push(view);
			return view._settings.id;
		}
		return false;
	}
}, webix.ui.button);

webix.protoUI({
	name:"segmented",
	_allowsClear:false,
	$init:function(){
		this.attachEvent("onChange", function(value){
			if (this._settings.multiview){
				var top = this.getTopParentView();
				var view = null;

				//get from local isolate
				if (top && top.$$)
					view = top.$$(value);
				//or check globally
				if (!view)
					view = webix.$$(value);

				if(view && view.show)
					view.show();
			}
		});
	},
	defaults:{
		template:function(obj, common){
			if(!obj.options)
				webix.assert(false, "segmented: options undefined");
			var options = obj.options;
			common._check_options(options);
			var width = common._get_input_width(obj);

			var id = webix.uid();
			var html = "<div style='width:"+width+"px' class='webix_all_segments'>";
			var optionWidth = obj.optionWidth || Math.floor(width/options.length);
			if(!obj.value)
				obj.value = options[0].id;

			for(var i=0; i<options.length; i++){
				html+="<button type='button' style='width:"+(options[i].width || optionWidth)+"px' ";
				html+="class='"+((obj.value==options[i].id)?"webix_selected ":"")+"webix_segment_"+((i==options.length-1)?"N":(i>0?1:0))+"' button_id='"+options[i].id+"' >";
				html+= options[i].value+"</button>";
			}
			
			return common.$renderInput(obj, html+"</div>", id);
		}
	},
	$setValue:function(value){
		this.refresh();
	},
	getValue:function(){
		return this._settings.value;
	},
	getInputNode:function(){
		return null;
	},
	optionIndex:function(id){
		var pages = this._settings.options;
		for (var i=0; i<pages.length; i++)
			if (pages[i].id == id)
				return i;
		return -1;
	},
	addOption:function(id, value, show, index){
		var obj = id;
		if (typeof id != "object"){
			value = value || id;
			obj = { id:id, value:value };
		} else {
			id = obj.id;
			index = show;
			show = value;
		}

		if (this.optionIndex(id) < 0)
			webix.PowerArray.insertAt.call(this._settings.options, obj, index);

		if (show)
			this.setValue(id);
	},
	removeOption:function(id, value){
		var index = this.optionIndex(id);
		var options = this._settings.options;

		if (index >= 0)
			webix.PowerArray.removeAt.call(options, index);

		// if we remove a selected option
		if(this._settings.value == id){
			var next_index = Math.min(index, options.length-1);
			if (next_index >= 0){
				this.setValue(options[next_index].id);
				//return options[next_index].id;
			} else {
				this._settings.value = -1;
			}
		}
        this.callEvent("onOptionRemove", [id, this._settings.value]);
		this.refresh();

	},
	_set_inner_size:false
}, webix.ui.text);

webix.protoUI({
	name:"search",
	$skin:function(){
		this.defaults.inputPadding = webix.skin.$active.inputPadding;
	},
	on_click:{
		"webix_input_icon":function(e){
			return this.callEvent("onSearchIconClick", [e]);
		}
	},
	defaults:{
		type:"text",
		icon:"search"
	}
}, webix.ui.text);

webix.protoUI({
	name:"toggle",
	_allowsClear:true,
	$init:function(){
		this.attachEvent("onItemClick", function(){
			this.toggle();
		});
	},
	$setValue:function(value){
		this.render();
	},
	toggle:function(){
		this.setValue(!this.getValue());
	},
	getValue:function(){
		var value = this._settings.value;
		return  (!value||value=="0")?0:1;
	},
	defaults:{
		template:function(obj, common){
			var css = obj.value ? " webix_pressed" : "";
			obj.label = (obj.value ? obj.onLabel : obj.offLabel) || obj.label;
			obj.icon = (obj.value ? obj.onIcon : obj.offIcon) || obj.icon;
			return "<div class='webix_el_box"+css+"' style='width:"+obj.awidth+"px; height:"+obj.aheight+"px'>"+common._inputTemplate(obj, common)+"</div>";
		}
	},
	_set_inner_size:false
}, webix.ui.button);

webix.protoUI({
	name:"select",
	defaults:{
		template:function(obj,common) {
			var options = common._check_options(obj.options);
			var id = obj.name || ("x"+webix.uid());
			var html = common._baseInputHTML("select")+"id='"+id+"' style='width:"+common._get_input_width(obj)+"px;'>";

			var optview = webix.$$(options);
            if(optview && optview.data && optview.data.each){
                optview.data.each(function(option){
                    html+="<option"+((option.id == obj.value)?" selected='true'":"")+" value='"+option.id+"'>"+option.value+"</option>";
                });
            }else
                for(var i=0; i<options.length; i++) {
                    html+="<option"+((options[i].id == obj.value)?" selected='true'":"")+" value='"+options[i].id+"'>"+options[i].value+"</option>";
                }
			html += "</select>";
			return common.$renderInput(obj, html, id);
		}
	},
    options_setter:function(value){
        if(value){
            if(typeof value =="string"){
                var collection = new webix.DataCollection({url:value});
                collection.data.attachEvent("onStoreLoad", webix.bind(this.refresh, this));
                return collection;
            }
            else
                return value;
        }
    },
	//get input element
	getInputNode: function() {
		return this._dataobj.getElementsByTagName('select')[0];
	}
}, webix.ui.text);

webix.protoUI({
	name:"textarea",
	$skin:function(){},
	defaults:{
		template:function(obj, common){ 
			var name = obj.name || obj.id;
			var id = "x"+webix.uid();

			var html = common._baseInputHTML("textarea")+"style='width:"+common._get_input_width(obj)+"px;'";
			html +=" id='"+id+"' name='"+name+"' class='webix_inp_textarea'>"+(obj.value||"")+"</textarea>";

			return common.$renderInput(obj, html, id);
		},
		height:0,
		minHeight:60
	},
	_skipSubmit: true,
	$renderLabel: function(config, id){
		var labelAlign = (config.labelAlign||"left");
		var top = this._settings.labelPosition == "top";
		var labelTop =  top?"display:block;":("width: " + this._settings.labelWidth + "px;");
		var label = "";
		var labelHeight = top?this._labelTopHeight-2:( (webix.skin.$active.inputHeight||this._settings.aheight) - 2*this._settings.inputPadding);
		if (config.label)
			label = "<label style='"+labelTop+"text-align: " + labelAlign + ";' onclick='' for='"+id+"' class='webix_inp_"+(top?"top_":"")+"label "+(config.required?"webix_required":"")+"'>" + (config.label||"") + "</label>";
		return label;
	},
	//get input element
	getInputNode: function() {
		return this._dataobj.getElementsByTagName('textarea')[0];
	}
}, webix.ui.text);

webix.protoUI({
	name:"counter",
	defaults:{
		template:function(config, common){
			var value = (config.value||0);

			var id = config.name || ("x"+webix.uid());
			var html = "<div class='webix_el_group' style='width:"+common._get_input_width(config)+"px'>";
				html +=  "<input type='button' class='webix_inp_counter_prev' value='-' />";
				html += common._baseInputHTML("input")+"type='text' class='webix_inp_counter_value' value='"+value+"'></input>";
				html += "<input id='"+id+"' type='button' class='webix_inp_counter_next' value='+'/><div>";
			return common.$renderInput(config, html, id);
		},
		min:0,
		max:Infinity,
		step:1
	},
	$setValue:function(value){
		this.getInputNode().value = value;
	},
	getInputNode:function(){
		return this._dataobj.getElementsByTagName("input")[1];
	},
	getValue:function(obj){
		return  webix.ui.button.prototype.getValue.apply(this,arguments)*1;
	},
	next:function(step){
		step = this._settings.step;
		this.shift(step);
	},
	prev:function(step){
		step = (-1)*this._settings.step;
		this.shift(step);
	},
	shift:function(step){
		var min = this._settings.min;
		var max = this._settings.max;

		var new_value = this.getValue() + step;
		if (new_value >= min && new_value <= max)
			this.setValue(new_value);
	}
}, webix.ui.text);


webix.protoUI({
	name:"checkbox",
	defaults:{
		checkValue:1,
		uncheckValue:0,
		template:function(config, common) {
			var id = config.name || "x"+webix.uid();
			var rightlabel = "";
			if (config.labelRight){
				rightlabel = "<label class='webix_label_right'>"+config.labelRight+"</label>";
				//user clearly attempts to hide the label, help him
				if (config.labelWidth)
					config.label = config.label || "&nbsp;";
			}
			var checked = (config.checkValue == config.value);
			var margin = Math.floor((common._settings.aheight-16)/2);
			var ch = common._baseInputHTML("input")+"style='margin-top:"+margin+"px;"+(config.customCheckbox?"display:none":"")+"' id='"+id+"' type='checkbox' "+(checked?"checked='1'":"")+"/>";
			var className = "webix_inp_checkbox_border webix_el_group webix_checkbox_"+(checked?"1":"0");
			var html = "<div style='line-height:"+common._settings.cheight+"px' class='"+className+"'>"+ch+(config.customCheckbox||"")+rightlabel+"</div>";
			return common.$renderInput(config, html, id);
		}
	},
	_init_onchange: function(){},
	$setValue:function(value){
		var isChecked = (value == this._settings.checkValue);
		var parentNode = this.getInputNode()?this.getInputNode().parentNode:null;
		if(parentNode){
			parentNode.className = parentNode.className.replace(/(webix_checkbox_)\d/,"$1"+(isChecked?1:0));
		}
		this.getInputNode().checked = isChecked;
	},
	toggle:function(){
		var value = (this.getValue() != this._settings.checkValue)?this._settings.checkValue:this._settings.uncheckValue;
		this.setValue(value);
	},
	getValue:function(){
		var value = this._settings.value;
		return  (value == this._settings.checkValue)?this._settings.checkValue:this._settings.uncheckValue;
	},
	$skin:function(){
		if(webix.skin.$active.customCheckbox)
			this.defaults.customCheckbox = "<a onclick='javascript:void(0)'><label class='webix_custom_checkbox'></label></a>";
	}
}, webix.ui.text);

webix.protoUI({
	name:"radio",
	defaults:{
		template: function(config,common) {
			var options = common._check_options(config.options);
			var html = [];
			var id;

			for (var i=0; i < options.length; i++) {
				var eachid = "x"+webix.uid();
				id = id || eachid;

				if  (i && (options[i].newline || config.vertical))
					html.push("<div class='webix_line_break'></div>");
				var isChecked = (options[i].id == config.value);
				var rd = common._baseInputHTML("input")+"name='"+config.name+"' type='radio' "+(isChecked?"checked='1'":"")+" value='"+options[i].id+"' id='"+eachid+"' style='"+(config.customRadio?"display:none":"")+"' />";
				var input = "<div radio_id='"+options[i].id+"' class='webix_inp_radio_border webix_radio_"+(isChecked?"1":"0")+"'>"+rd+(config.customRadio||"")+"</div>";
				var label = options[i].value || "";
				if (label)
					label = "<label for='"+eachid+"' class='webix_label_right'>" + label + "</label>";

				html.push("<div class='webix_radio_option'>"+input + label+"</div>");
				
			}
			html = "<div class='webix_el_group' style='margin-left:"+(config.label?config.labelWidth:0)+"px;'>"+html.join("")+"</div>";
			
			return common.$renderInput(config, html, id);
		}
	},
	$getSize:function(dx, dy){
		var size = webix.ui.button.prototype.$getSize.call(this, dx, dy);
		if (this._settings.options){
			var count = 1;
			for (var i=0; i < this._settings.options.length; i++)
				if (this._settings.vertical || this._settings.options[i].newline)
					count++;
			size[3] = size[2] = Math.max(size[2], (this._settings.optionHeight||25) * count);
		}
		return size;
	},
	_getInputNode: function(){
		return this._dataobj.getElementsByTagName('input');
	},
	$setValue:function(value){
		var inp = this._getInputNode();

		for (var i=0; i < inp.length; i++){
			if (inp[i].parentNode.getAttribute("radio_id")==value){
				inp[i].className = "webix_inp_radio_on";	
				inp[i].checked = true;
			} else{
				inp[i].className = "webix_inp_radio_on webix_hidden";
				inp[i].checked = false;
			}
			var parentNode = inp[i]?inp[i].parentNode:null;
			if(parentNode){
				parentNode.className = parentNode.className.replace(/(webix_radio_)\d/,"$1"+(inp[i].checked?1:0));
			}

		}
	},
	getValue:function(obj){
		return this._settings.value;
	},
	$skin:function(){
		if(webix.skin.$active.customRadio)
			this.defaults.customRadio = "<a onclick='javascript:void(0)'><label class='webix_custom_radio'></label></a>";
		if(webix.skin.$active.optionHeight)
			this.defaults.optionHeight = webix.skin.$active.optionHeight;
	}
}, webix.ui.text);

webix.protoUI({
	name:"richselect",
	defaults:{
		template:function(obj,common){
			return common._render_div_block(obj, common);
		},
		popupWidth:200,
		icon: "angle-down"
	},
	suggest_setter:function(value){
		return this.options_setter(value);
	},
	options_setter:function(value){
		value = this._suggest_config ? this._suggest_config(value) : value;
		var suggest = (this._settings.popup = this._settings.suggest = webix.ui.text.prototype.suggest_setter.call(this, value));
		var list = webix.$$(suggest).getList();
		if (list)
			list.attachEvent("onAfterLoad", webix.bind(this._reset_value, this));

		return suggest;
	},
	_reset_value:function(){
		var value = this._settings.value;
		if(!webix.isUndefined(value) && !this.getPopup().isVisible() && !this._settings.text)
			this.$setValue(value);
	},

	$skin:function(){
		this.defaults.inputPadding = webix.skin.$active.inputPadding;
	},

	$render:function(obj){
		if (webix.isUndefined(obj.value)) return;
		this.$setValue(obj.value);
	},
	getInputNode: function(){
		return this._dataobj.getElementsByTagName("DIV")[1];
	},
	getPopup: function(){
	 	return webix.$$(this._settings.popup);
	},
	getText:function(){
		var node = this.getInputNode();
		return typeof node.value == "undefined" ? node.innerHTML : node.value;
	},
	$setValue:function(value){
		if (!this._rendered_input) return;

		var text = value;
		var popup = this.getPopup();

		if (popup)
			var text = this.getPopup().getItemText(value);

		if (!text && typeof value == "object" && value.id){
			this.getPopup().getList().add(value);
			text = this.getPopup().getItemText(value.id);
			this._settings.value = value.id;
		}

		this._settings.text = text;

		var node = this.getInputNode();

		if (webix.isUndefined(node.value))
			node.innerHTML = text || this._get_div_placeholder();
		else 
			node.value = text.replace(/<[^>]*>/g,"");
	},
	getValue:function(){
		return this._settings.value||"";
	}
}, webix.ui.text);


webix.protoUI({
	name:"combo",
	$init:function(){
		this.attachEvent("onBlur", webix.bind(function(e){
			if (this._settings.text == this.getText())
				return;
			var data = this.getPopup().getSuggestion();
			if (data && !(this.getInputNode().value==="" && webix.$$(this._settings.suggest).getItemText(data)!=="")){
				this.setValue(data);
			} else if(!this._settings.editable){
				var value = this.getValue();
				this.$setValue(webix.isUndefined(value)?"":value);
			}

		},this));
	},
	getInputNode:function(){
		return this._dataobj.getElementsByTagName('input')[0];
	},
	$render:function(obj){
		if (webix.isUndefined(obj.value)) return;
		this.$setValue(obj.value);
	},
	_init_onchange:function(){
		webix.event(this.getInputNode(),"change",function(){
			var input = this.getInputNode();
			var newvalue = "";
			if (input.value)
				newvalue = webix.$$(this._settings.suggest).getSuggestion() || this._settings.value;
			if (newvalue != this._settings.value)
				this.setValue(newvalue, true);
			else
				this.$setValue(newvalue);
		},this);
		webix.$$(this._settings.suggest).linkInput(this);
	},
	defaults:{
		template:function(config, common){ 
			return common.$renderInput(config);
		},
		icon: "angle-down"
	}
}, webix.ui.richselect);


webix.protoUI({
	name:"datepicker",
	$init:function(){
		this.$ready.push(this._init_popup);
	},
	defaults:{
		template:function(obj, common){
			if(common._settings.type == "time"){
				common._settings.icon = common._settings.timeIcon;
			}
			return obj.editable?common.$renderInput(obj):common._render_div_block(obj, common);
		},
		stringResult:false,
		timepicker:false,
		icon:"calendar",
		icons: true,
		timeIcon: "clock-o"
	},
	$skin:function(){
		this.defaults.inputPadding = webix.skin.$active.inputPadding;
	},
	getPopup: function(){
	 	return webix.$$(this._settings.popup);
	},
	_init_popup:function(){ 
		var obj = this._settings;
		if (obj.suggest)
			obj.popup = obj.suggest;
		else if (!obj.popup){
			var timepicker = this._settings.timepicker;
			obj.popup = obj.suggest = this.suggest_setter({
				type:"calendar", height:240+(timepicker?30:0), width:250, padding:0,
				body: { timepicker:timepicker, type: this._settings.type, icons: this._settings.icons }
			});
		}


		this._init_once = function(){};	
	},
	$render:function(obj){
		if (webix.isUndefined(obj.value)) return;
		this.$setValue(obj.value);
	},	
	_parse_value:function(value){
		var timeMode = this._settings.type == "time";

		//setValue("1980-12-25")
		if (typeof value=="string" && value){
			var formatDate = (timeMode?webix.i18n.parseTimeFormatDate:webix.i18n.parseFormatDate);
			value = formatDate(value);
		}

		if (value){
			//time mode
			if(timeMode){
				//setValue([16,24])
				if(webix.isArray(value)){
					var time = new Date();
					time.setHours(value[0]);
					time.setMinutes(value[1]);
					value = time;
				}
			}
			//setValue(invalid date)
			if(isNaN(value.getTime()))
				value = "";
		}

		return value;
	},
	$setValue:function(value){
		var popup =  webix.$$(this._settings.popup.toString());
		var calendar = popup._body_cell;

		//convert string or array to date
		value = this._parse_value(value);

		//select date in calendar-popup
		calendar.selectDate(value,true);

		//save value
		this._settings.value = (value)?calendar.config.date:"";

		//set visible date
		var timeMode = this._settings.type == "time";
		var timepicker = this.config.timepicker;
		var formatStr = this._formatStr||(timeMode?webix.i18n.timeFormatStr:(timepicker?webix.i18n.fullDateFormatStr:webix.i18n.dateFormatStr));
		this._settings.text = (value?formatStr(this._settings.value):"");

		var node = this.getInputNode();
		if(node.value == webix.undefined){
			node.innerHTML = this._settings.text || this._get_div_placeholder();
		}
		else{
			node.value = this._settings.text || "";
		}
	},
	format_setter:function(value){
		this._formatStr = webix.Date.dateToStr(value);
		this._formatDate = webix.Date.strToDate(value);
		return value;
	},
	getInputNode: function(){
		return this._settings.editable?this._dataobj.getElementsByTagName('input')[0]:this._dataobj.getElementsByTagName("DIV")[1];
	},
	getValue:function(){
		//time mode
		var timeMode = this._settings.type == "time";
		//date and time mode
		var timepicker = this.config.timepicker;

		var value = this._settings.value;

		//input was not rendered, we need to parse value from setValue method
		if (!this._rendered_input)
			value = this._parse_value(value) || null;
		//rendere and in edit mode
		else if (this._settings.editable){
			var formatDate = this._formatDate||(timeMode?webix.i18n.timeFormatDate:(timepicker?webix.i18n.fullDateFormatDate:webix.i18n.dateFormatDate));
			value = formatDate(this.getInputNode().value);
		}

		//return string from getValue
		if(this._settings.stringResult){
			var formatStr = (timeMode?webix.i18n.parseTimeFormatStr:webix.i18n.parseFormatStr);
			return (value?formatStr(value):"");
		}
		
		return value||null;
	},
	getText:function(){
		var node = this.getInputNode();
		return (node?(typeof node.value == "undefined" ? node.innerHTML : node.value):"");
	}
}, webix.ui.text);

webix.protoUI({
	name:"colorpicker",
	$init:function(){
		this.$ready.push(this._init_popup);
	},
	defaults:{
		template:function(obj, common){
			return common._render_div_block(obj, common);
		},
		icon:false
	},
	_init_popup:function(){ 
		var obj = this._settings;
		if (obj.suggest)
			obj.popup = obj.suggest;
		else if (!obj.popup)
			obj.popup = obj.suggest = this.suggest_setter({
				type:"colorboard", height:200
			});
		this._init_once = function(){};	
	},	
	$render:function(obj){
		if (webix.isUndefined(obj.value)) return;
		this.$setValue(obj.value);
	},
	getValue:function(){
		if (this._rendered_input && this._settings.editable)
			return this.getInputNode().value;
		else 
			return this._settings.value;
	},
	$setValue:function(value){ 
		var popup =  webix.$$(this._settings.popup)._body_cell.setValue(value);
		var text = this._settings.icon?"":("<div style='background-color:"+value+";'>&nbsp;</div>"+value);
		this.getInputNode().innerHTML = text;
	}
}, webix.ui.datepicker);


/*
	Renders collection of items
	Behavior uses plain strategy which suits only for relative small datasets
	
*/


webix.RenderStack={
	$init:function(){
		webix.assert(this.data,"RenderStack :: Component doesn't have DataStore");
        webix.assert(webix.template,"webix.template :: webix.template is not accessible");

		//used for temporary HTML elements
		//automatically nulified during destruction
		this._html = document.createElement("DIV");
				
		this.data.attachEvent("onIdChange", webix.bind(this._render_change_id, this));
		this.attachEvent("onItemClick", this._call_onclick);
		
		//create copy of default type, and set it as active one
		if (!this.types){ 
			this.types = { "default" : this.type };
			this.type.name = "default";
		}

		this.type = webix.clone(this.type);
	},
	
	customize:function(obj){ 
		webix.type(this,obj);
	},
	type_setter:function(value){
		if(!this.types[value])
			this.customize(value);
		else {
			this.type = webix.clone(this.types[value]);
			if (this.type.css) 
				this._contentobj.className+=" "+this.type.css;
		}
		if (this.type.on_click)
			webix.extend(this.on_click, this.type.on_click);

		return value;
	},
	
	template_setter:function(value){
		this.type.template=webix.template(value);
	},
	//convert single item to HTML text (templating)
	_toHTML:function(obj){
			var mark = this.data._marks[obj.id];
			//check if related template exist
			webix.assert((!obj.$template || this.type["template"+obj.$template]),"RenderStack :: Unknown template: "+obj.$template);
			this.callEvent("onItemRender",[obj]);
			return this.type.templateStart(obj,this.type, mark)+(obj.$template?this.type["template"+obj.$template]:this.type.template)(obj,this.type,mark)+this.type.templateEnd(obj, this.type,mark);
	},
	//convert item to HTML object (templating)
	_toHTMLObject:function(obj){
		this._html.innerHTML = this._toHTML(obj);
		return this._html.firstChild;
	},
	_render_change_id:function(old, newid){
		var obj = this.getItemNode(old);
		if (obj) {
			obj.setAttribute(this._id, newid);
			this._htmlmap[newid] = this._htmlmap[old];
			delete this._htmlmap[old];
		}
	},
	//calls function that is set in onclick property
	_call_onclick:function(){
		if (this._settings.click){
			var code = webix.toFunctor(this._settings.click, this.$scope);
			if (code && code.call) code.apply(this,arguments);
		}
	},
	//return html container by its ID
	//can return undefined if container doesn't exists
	getItemNode:function(search_id){
		if (this._htmlmap)
			return this._htmlmap[search_id];
			
		//fill map if it doesn't created yet
		this._htmlmap={};
		
		var t = this._dataobj.childNodes;
		for (var i=0; i < t.length; i++){
			var id = t[i].getAttribute(this._id); //get item's
			if (id) 
				this._htmlmap[id]=t[i];
		}
		//call locator again, when map is filled
		return this.getItemNode(search_id);
	},
	//return id of item from html event
	locate:function(e){ return webix.html.locate(e,this._id); },
	/*change scrolling state of top level container, so related item will be in visible part*/
	showItem:function(id){
		var html = this.getItemNode(id);
		if (html&&this.scrollTo){
			var txmin = html.offsetLeft;
			var txmax = txmin + html.offsetWidth;
			var tymin = html.offsetTop;
			var tymax = tymin + html.offsetHeight;
			var state = this.getScrollState();

			var x = state.x;
			if (x > txmin || x + this._content_width < txmax )
				x = txmin;
			var y = state.y;
			if (y > tymin || y + this._content_height < tymax )
				y = tymin - 5;

			this.scrollTo(x,y);
			if(this._setItemActive)
				this._setItemActive(id);
		}
	},
	//update view after data update
	//method calls low-level rendering for related items
	//when called without parameters - all view refreshed
	render:function(id,data,type){
		if (!this.isVisible(this._settings.id) || this.$blockRender)
			return;
		
		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id+", mode:"+(type||"#")+", item:"+(id||"#"));
			
		if (id){
			var cont = this.getItemNode(id); //get html element of updated item
			switch(type){
				case "paint":
				case "update":
					//in case of update - replace existing html with updated one
					if (!cont) return;
					var t = this._htmlmap[id] = this._toHTMLObject(data);
					webix.html.insertBefore(t, cont); 
					webix.html.remove(cont);
					break;
				case "delete":
					//in case of delete - remove related html
					if (!cont) return;
					webix.html.remove(cont);
					delete this._htmlmap[id];
					break;
				case "add":
					//in case of add - put new html at necessary position
					var t = this._htmlmap[id] = this._toHTMLObject(data);
					webix.html.insertBefore(t, this.getItemNode(this.data.getNextId(id)), this._dataobj);
					break;
				case "move":
					//moving without repainting the item
					webix.html.insertBefore(this.getItemNode(id), this.getItemNode(this.data.getNextId(id)), this._dataobj);
					break;
				default:
					webix.assert_error("Unknown render command: "+type);
					break;
			}
		} else {
			//full reset
			if (this.callEvent("onBeforeRender",[this.data])){
				/*if (this.getScrollState)
					var scroll = this.getScrollState();*/
					
				//getRange - returns all elements
				(this._renderobj||this._dataobj).innerHTML = this.data.getRange().map(this._toHTML,this).join("");
				this._htmlmap = null; //clear map, it will be filled at first getItemNode
				this.callEvent("onAfterRender",[]);
                var t = this._dataobj.offsetHeight;
                
				/*if (this.getScrollState)
					this.scrollTo(scroll.x, scroll.y);*/
			}
		}
	}
};







webix.ValidateData = {
	$init:function(){
		if(this._events)
			this.attachEvent("onChange",this.clearValidation);
	},
	clearValidation:function(){
		if(this.elements){
			for(var id in this.elements){
				this._clear_invalid(id);
			}
		}
	},
	validate:function(obj) {
		webix.assert(this.callEvent, "using validate for eventless object");
		
		this.callEvent("onBeforeValidate", []);
		var failed = this._validate_details = {};

		//optimistic by default :) 
		var result =true;
		var rules = this._settings.rules;
		var isHidden = this.isVisible && !this.isVisible();

        //prevent validation of hidden elements
		var elements = {}, hidden = [];
        for(var i in this.elements){
            var name = this.elements[i].config.name;
            //we are ignoring hidden fields during validation
            //if form itself is hidden, we can't separate hidden fiels,
            //so we will vaidate all fields
            if(isHidden || this.elements[i].isVisible())
                elements[name] = this.elements[i];
            else
                hidden.push(name);
        }

		if (rules || elements)
			if(!obj && this.getValues)
				obj = this.getValues();

		if (rules){
			//complex rule, which may chcek all properties of object
			if (rules.$obj)
				result = this._validate(rules.$obj, obj, obj, "") && result;
			
			//all - applied to all fields
			var all = rules.$all;
			if (all)
				for (var key in obj){
                    if(hidden.indexOf(key)!==-1) continue;
					var subresult = this._validate(all, obj[key], obj, key);
					if (!subresult)
						failed[key] = true;
					result =  subresult && result;
				}


			//per-field rules
			for (var key in rules){
                if(hidden.indexOf(key)!==-1) continue;
				if (key.indexOf("$")!==0 && !failed[key]){
					webix.assert(rules[key], "Invalid rule for:"+key);
					var subresult = this._validate(rules[key], obj[key], obj, key);
					if (!subresult)
						failed[key] = true;
					result = subresult && result;
				}
			}
		}

		//check personal validation rules
		if (elements){
			for (var key in elements){
				if (failed[key]) continue;

				var subview = elements[key];
				if (subview.validate){
					var subresult = subview.validate();
					result = subresult && result;
					if (!subresult)
						failed[key] = true;
				} else {
					var input = subview._settings;
					if (input){	//ignore non webix inputs
						var validator = input.validate;
						if (!validator && input.required)
							validator = webix.rules.isNotEmpty;

						if (validator){
							var subresult = this._validate(validator, obj[key], obj, key);
							if (!subresult)
								failed[key] = true;
							result = subresult && result;
						}
					}
				}
			}
		}
	
		this.callEvent("onAfterValidation", [result, this._validate_details]);
		return result;
	},
	_validate:function(rule, data, obj, key){
		if (typeof rule == "string")
			rule = webix.rules[rule];
		if (rule.call(this, data, obj, key)){
			if(this.callEvent("onValidationSuccess",[key, obj]) && this._clear_invalid)
				this._clear_invalid(key, obj);
			return true;
		}
		else {
			if(this.callEvent("onValidationError",[key, obj]) && this._mark_invalid)
				this._mark_invalid(key, obj);
		}
		return false;
	}
};


webix.ValidateCollection = {
	_validate_init_once:function(){
		this.data.attachEvent("onStoreUpdated",webix.bind(function(id, data, mode){
			if (id && (mode == "add" || mode == "update"))
				this.validate(id);
		}, this));
		this.attachEvent("onClearAll",this.clearValidation);

		this._validate_init_once = function(){};
	},
	rules_setter:function(value){
		if (value){
			this._validate_init_once();
		}
		return value;
	},
	clearValidation:function(){
		this.data.clearMark("webix_invalid", true);
	},
	validate:function(id){
		var result = true;
		if (!id)
			for (var key in this.data.pull)
				var result = this.validate(key) && result;
		else {
			this._validate_details = {};
			var obj = this.getItem(id);
			result = webix.ValidateData.validate.call(this, obj);
			if (result){
				if (this.callEvent("onValidationSuccess",[id, obj]))
					this._clear_invalid(id);
			} else {
				if (this.callEvent("onValidationError",[id, obj, this._validate_details]))
					this._mark_invalid(id, this._validate_details);
			}
		}
		return result;
	},
	_validate:function(rule, data, obj, key){
		if (typeof rule == "string")
			rule = webix.rules[rule];

		var res = rule.call(this, data, obj, key);
		if (!res){
			this._validate_details[key] = true;
		}
		return res;
	},
	_clear_invalid:function(id){
		this.data.removeMark(id, "webix_invalid", true);
	},
	_mark_invalid:function(id, details){
		this.data.addMark(id, "webix_invalid", true);
	}
};


webix.rules = {
	isEmail: function(value){
		return (/^[^@]+@[^@]+\.[^@]+$/).test((value || "").toString());
	},
	isNumber: function(value){
		return (parseFloat(value) == value);
	},
	isChecked: function(value){
		return (!!value) || value === "0";
	},
	isNotEmpty: function(value){
		return (value === 0 || value);
	}
};

/*
	Behavior:DataLoader - load data in the component
	
	@export
		load
		parse
*/
webix.DataLoader=webix.proto({
	$init:function(config){
		//prepare data store
		config = config || "";
		
		//list of all active ajax requests
		this._ajax_queue = webix.toArray();

		this.data = new webix.DataStore();
		this.data.attachEvent("onClearAll",webix.bind(this._call_onclearall,this));
		this.data.attachEvent("onServerConfig", webix.bind(this._call_on_config, this));
		this.data.feed = this._feed;
		this.data.owner = config.id;
	},
	_feed:function(from,count,callback){
				//allow only single request at same time
				if (this._load_count)
					return (this._load_count=[from,count,callback]);	//save last ignored request
				else
					this._load_count=true;
				this._feed_last = [from, count];
				this._feed_common.call(this, from, count, callback);
	},
	_feed_common:function(from, count, callback){
		var url = this.data.url;
		if (from<0) from = 0;
		var final_callback = [
			this._feed_callback,
			callback
		];
		if (url && typeof url != "string"){
			var details = { from:from, count:count };
			if (this.getState){
				var state = this.getState();
				details.sort = state.sort;
				details.filter = state.filter;
			}

			this.load(url, final_callback, details);
		} else {
			var finalurl = url+((url.indexOf("?")==-1)?"?":"&")+(this.count()?("continue=true"):"");
			if (count != -1)
				finalurl += "&count="+count;
			if (from)
				finalurl += "&start="+from;

			if (this.getState){
				var state = this.getState();
				if (state.sort)
					finalurl += "&sort["+state.sort.id+"]="+state.sort.dir;
				if (state.filter)
					for (var key in state.filter)
						finalurl +="&filter["+key+"]="+state.filter[key];
			}
			this.load(finalurl, final_callback);
		}
	},
	_feed_callback:function(){
		//after loading check if we have some ignored requests
		var temp = this._load_count;
		var last = this._feed_last;
		this._load_count = false;
		if (typeof temp =="object" && (temp[0]!=last[0] || temp[1]!=last[1]))
			this.data.feed.apply(this, temp);	//load last ignored request
	},
	//loads data from external URL
	load:function(url,call){
		var ajax = webix.AtomDataLoader.load.apply(this, arguments);

		//prepare data feed for dyn. loading
		if (!this.data.url)
			this.data.url = url;

		return ajax;
	},
	//load next set of data rows
	loadNext:function(count, start, callback, url, now){
		var config = this._settings;
		if (config.datathrottle && !now){
			if (this._throttle_request)
				window.clearTimeout(this._throttle_request);
			this._throttle_request = webix.delay(function(){
				this.loadNext(count, start, callback, url, true);
			},this, 0, config.datathrottle);
			return;
		}

		if (!start && start !== 0) start = this.count();
		if (!count)
			count = config.datafetch || this.count();

		this.data.url = this.data.url || url;
		if (this.callEvent("onDataRequest", [start,count,callback,url]) && this.data.url)
			this.data.feed.call(this, start, count, callback);
	},
	_maybe_loading_already:function(count, from){
		var last = this._feed_last;
		if(this._load_count && last){
			if (last[0]<=from && (last[1]+last[0] >= count + from )) return true;
		}
		return false;
	},
	//default after loading callback
	_onLoad:function(text,xml,loader){
		var data;
		if (loader === -1)
			data = xml;
		else {
			//ignore data loading command if data was reloaded 
			this._ajax_queue.remove(loader);
			data = this.data.driver.toObject(text,xml);
		}

		if (data)
			this.data._parse(data);
		else
			return this._onLoadError(text, xml, loader);
		
		//data loaded, view rendered, call onready handler
		this._call_onready();

		this.callEvent("onAfterLoad",[]);
		this.waitData.resolve();
	},
	removeMissed_setter:function(value){
		return (this.data._removeMissed = value);
	},
	//init of dataprocessor delayed after all settings processing
	//because it need to be the last in the event processing chain
	//to get valid validation state
	_init_dataprocessor:function(){
		var url = this._settings.save;

		if (url === true)
			url = this._settings.save = this._settings.url;

		var obj = { master: this };
		
		if (url && url.url)
			webix.extend(obj, url);
		else
			obj.url = url;

		webix.dp(obj);
	},
	save_setter:function(value){
		if (value)
			this.$ready.push(this._init_dataprocessor);
		return value;
	},
	scheme_setter:function(value){
		this.data.scheme(value);
	},
	dataFeed_setter:function(value){
		if (typeof value == "string" && value.indexOf("->") != -1){
			var parts = value.split("->");
			value = webix.proxy(parts[0], parts[1]);
		}

		this.data.attachEvent("onBeforeFilter", webix.bind(function(text, filtervalue){
			//complex filtering, can't be routed to dataFeed
			if (typeof text == "function") return true;

			//we have dataFeed and some text
			if (this._settings.dataFeed && (text || filtervalue)){
				text = text || "id";
				if (filtervalue && typeof filtervalue == "object")
						filtervalue = filtervalue.id;

				this.clearAll();
				var url = this._settings.dataFeed;

				//js data feed
				if (typeof url == "function"){
					var filter = {};
					filter[text] = filtervalue;
					url.call(this, filtervalue, filter);
				} else if (url.$proxy) {
					if (url.load){
						var filterobj = {}; filterobj[text] = filtervalue;
						url.load(this, null, filterobj);
					}
				} else {
				//url data feed
					var urldata = "filter["+text+"]="+encodeURIComponent(filtervalue);
					this.load(url+(url.indexOf("?")<0?"?":"&")+urldata, this._settings.datatype);
				}
				return false;
			}
		},this));
		return value;
	},
	_call_onready:function(){
		if (this._settings.ready && !this._ready_was_used){
			var code = webix.toFunctor(this._settings.ready, this.$scope);
			if (code)
				webix.delay(code, this, arguments);
			this._ready_was_used = true;
		}
	},
	_call_onclearall:function(){
		for (var i = 0; i < this._ajax_queue.length; i++){
			var xhr = this._ajax_queue[i];

			//IE9 and IE8 deny extending of ActiveX wrappers
			try { xhr.aborted = true; } catch(e){ 
				webix._xhr_aborted.push(xhr);
			}
			xhr.abort();
		}

		this._ajax_queue = webix.toArray();
		this.waitData = webix.promise.defer();
	},
	_call_on_config:function(config){
		this._parseSeetingColl(config);
	}
},webix.AtomDataLoader);

//ie8 compatibility
webix._xhr_aborted = webix.toArray();

webix.DataMarks = {
	addCss:function(id, css, silent){
		if (!this.addRowCss && !silent){
			if (!this.hasCss(id, css)){
				var node = this.getItemNode(id);
				if (node){
					node.className += " "+css;
					silent = true;
				}
			}
		}
		return this.data.addMark(id, css, 1, 1, silent);
	},
	removeCss:function(id, css, silent){
		if (!this.addRowCss && !silent){
			if (this.hasCss(id, css)){
				var node = this.getItemNode(id);
				if (node){
					node.className = node.className.replace(css,"").replace("  "," ");
					silent = true;
				}
			}
		}
		return this.data.removeMark(id, css, 1, silent);
	},
	hasCss:function(id, mark){
		return this.data.getMark(id, mark);
	},
	clearCss:function(css, silent){
		return this.data.clearMark(css, 1, silent);
	}
};

/*
	DataStore is not a behavior, it standalone object, which represents collection of data.
	Call provideAPI to map data API

	@export
		exists
		getIdByIndex
		getIndexById
		get
		set
		refresh
		count
		sort
		filter
		next
		previous
		clearAll
		first
		last
*/
webix.DataStore = function(){
	this.name = "DataStore";
	
	webix.extend(this, webix.EventSystem);

	this.setDriver("json");	//default data source is an
	this.pull = {};						//hash of IDs
	this.order = webix.toArray();		//order of IDs
	this._marks = {};
};

webix.DataStore.prototype={
	//defines type of used data driver
	//data driver is an abstraction other different data formats - xml, json, csv, etc.
	setDriver:function(type){
		webix.assert(webix.DataDriver[type],"incorrect DataDriver");
		this.driver = webix.DataDriver[type];
	},
	//process incoming raw data
	_parse:function(data,master){
		this.callEvent("onParse", [this.driver, data]);

		if (this._filter_order)
			this.filter();
			
		//get size and position of data
		var info = this.driver.getInfo(data);

		//generated by connectors only
		if (info._key)
			webix.securityKey = info._key;

		if (info._config)
			this.callEvent("onServerConfig",[info._config]);

		var options = this.driver.getOptions(data);
		if (options)
			this.callEvent("onServerOptions", [options]);

		//get array of records
		var recs = this.driver.getRecords(data);

		this._inner_parse(info, recs);

		//in case of tree store we may want to group data
		if (this._scheme_group && this._group_processing && !this._not_grouped_order)
			this._group_processing(this._scheme_group);

		//optional data sorting
		if (this._scheme_sort){
			this.blockEvent();
			this.sort(this._scheme_sort);
			this.unblockEvent();
		}

		this.callEvent("onStoreLoad",[this.driver, data]);
		//repaint self after data loading
		this.refresh();
	},
	_inner_parse:function(info, recs){
		var from = (info._from||0)*1;
		var subload = true;
		var marks = false;

		if (from === 0 && this.order[0] && this.order[this.order.length-1]){ //update mode
			if (this._removeMissed){
				//update mode, create kill list
				marks = {};
				for (var i=0; i<this.order.length; i++)
					marks[this.order[i]]=true;
			}
			
			subload = false;
			from = this.order.length;
		}

		var j=0;
		for (var i=0; i<recs.length; i++){
			//get hash of details for each record
			var temp = this.driver.getDetails(recs[i]);
			var id = this.id(temp); 	//generate ID for the record
			if (!this.pull[id]){		//if such ID already exists - update instead of insert
				this.order[j+from]=id;	
				j++;
			} else if (subload && this.order[j+from])
				j++;

			if(this.pull[id]){
				webix.extend(this.pull[id],temp,true);//add only new properties
				if (this._scheme_update)
					this._scheme_update(this.pull[id]);
				//update mode, remove item from kill list
				if (marks)
					delete marks[id];
			} else{
				this.pull[id] = temp;
				if (this._scheme_init)
					this._scheme_init(temp);
			}
			
		}

		//update mode, delete items which are not existing in the new xml
		if (marks){
			this.blockEvent();
			for (var delid in marks)
				this.remove(delid);
			this.unblockEvent();
		}

		if (!this.order[info._size-1])
			this.order[info._size-1] = webix.undefined;
	},
	//generate id for data object
	id:function(data){
		return data.id||(data.id=webix.uid());
	},
	changeId:function(old, newid){
		//webix.assert(this.pull[old],"Can't change id, for non existing item: "+old);
		if(this.pull[old])
			this.pull[newid] = this.pull[old];
		
		this.pull[newid].id = newid;
		this.order[this.order.find(old)]=newid;
		if (this._filter_order)
			this._filter_order[this._filter_order.find(old)]=newid;
		if (this._marks[old]){
			this._marks[newid] = this._marks[old];
			delete this._marks[old];
		}


		this.callEvent("onIdChange", [old, newid]);
		if (this._render_change_id)
			this._render_change_id(old, newid);
		delete this.pull[old];
	},
	//get data from hash by id
	getItem:function(id){
		return this.pull[id];
	},
	//assigns data by id
	updateItem:function(id, update){
		var data = this.getItem(id);
		webix.assert(data, "Ivalid ID for updateItem");
		webix.assert(!update || !update.id || update.id == id, "Attempt to change ID in updateItem");

		if (!webix.isUndefined(update) && data !== update)
			webix.extend(data, update, true);

		if (this._scheme_update)
			this._scheme_update(data);

		this.callEvent("onDataUpdate", [id, data]);
		this.callEvent("onStoreUpdated",[id, data, "update"]);
	},
	//sends repainting signal
	refresh:function(id){
		if (this._skip_refresh) return; 
		
		if (id){
			if (this.exists(id))
				this.callEvent("onStoreUpdated",[id, this.pull[id], "paint"]);
		}else
			this.callEvent("onStoreUpdated",[null,null,null]);
	},
	silent:function(code, master){
		this._skip_refresh = true;
		code.call(master||this);
		this._skip_refresh = false;
	},
	//converts range IDs to array of all IDs between them
	getRange:function(from,to){		
		//if some point is not defined - use first or last id
		//BEWARE - do not use empty or null ID
		if (from)
			from = this.getIndexById(from);
		else 
			from = (this.$min||this.startOffset)||0;
		if (to)
			to = this.getIndexById(to);
		else {
			to = this.$max === 0 ? 0 : Math.min(((this.$max||this.endOffset)||Infinity),(this.count()-1));
			if (to<0) to = 0; //we have not data in the store
		}

		if (from>to){ //can be in case of backward shift-selection
			var a=to; to=from; from=a;
		}

		return this.getIndexRange(from,to);
	},
	//converts range of indexes to array of all IDs between them
	getIndexRange:function(from,to){
		to=Math.min((to === 0 ? 0 :(to||Infinity)),this.count()-1);
		
		var ret=webix.toArray(); //result of method is rich-array
		for (var i=(from||0); i <= to; i++)
			ret.push(this.getItem(this.order[i]));
		return ret;
	},
	//returns total count of elements
	count:function(){
		return this.order.length;
	},
	//returns truy if item with such ID exists
	exists:function(id){
		return !!(this.pull[id]);
	},
	//nextmethod is not visible on component level, check DataMove.move
	//moves item from source index to the target index
	move:function(sindex,tindex){
		webix.assert(sindex>=0 && tindex>=0, "DataStore::move","Incorrect indexes");
		if (sindex == tindex) return;

		var id = this.getIdByIndex(sindex);
		var obj = this.getItem(id);

		if (this._filter_order)
			this._move_inner(this._filter_order, 0, 0, this.getIdByIndex(sindex), this.getIdByIndex(tindex));

		this._move_inner(this.order, sindex, tindex);
		
		
		//repaint signal
		this.callEvent("onStoreUpdated",[id,obj,"move"]);
	},
	_move_inner:function(col, sindex, tindex, sid, tid){
		if (sid||tid){
			sindex = tindex = -1;
			for (var i=0; i<col.length; i++){
				if (col[i] == sid && sindex<0)
					sindex = i;
				if (col[i] == tid && tindex<0)
					tindex = i;
			}
		}
		var id = col[sindex];
		col.removeAt(sindex);	//remove at old position
		col.insertAt(id,Math.min(col.length, tindex));	//insert at new position
	},
	scheme:function(config){
		this._scheme = {};
		this._scheme_save = config.$save;
		this._scheme_init = config.$init||config.$change;
		this._scheme_update = config.$update||config.$change;
		this._scheme_serialize = config.$serialize;
		this._scheme_group = config.$group;
		this._scheme_sort = config.$sort;

		//ignore $-starting properties, as they have special meaning
		for (var key in config)
			if (key.substr(0,1) != "$")
				this._scheme[key] = config[key];
	},
	importData:function(target, silent){
		var data = target.data || target;
		this._filter_order = null;

		if (typeof data.serialize == "function"){
			this.order = webix.toArray([].concat(data.order));
			this.pull = data.pull;

			if (data.branch && this.branch){
				this.branch = webix.copy(data.branch);
				this._filter_branch = null;
			}

		} else {
			this.order = webix.toArray();
			this.pull = {};
			var id, obj;

			if (webix.isArray(target))
				for (var key=0; key<target.length; key++){
					obj = id = target[key];
					if (typeof obj == "object")
						id  = obj.id;
					else
						obj = { id:id, value:id };

					this.order.push(obj.id);
					if (this._scheme_init)
						this._scheme_init(obj);
					this.pull[obj.id] = obj;
				}
			else
				for (var key in data){
					this.order.push(key);
					this.pull[key] = { id:key, value: data[key] };
				}
		}

		if (!silent)
			this.callEvent("onStoreUpdated",[]);
	},
	sync:function(source, filter, silent){
		var type = typeof source;
		if (type == "string")
			source = webix.$$("source");

		if (type != "function" && type != "object"){
			silent = filter;
			filter = null;
		}
		
		if (webix.debug_bind){
			this.debug_sync_master = source; 
			webix.log("[sync] "+this.debug_bind_master.name+"@"+this.debug_bind_master._settings.id+" <= "+this.debug_sync_master.name+"@"+this.debug_sync_master._settings.id);
		}

		if (source.name != "DataStore"){
			if (source.data && (source.data.name === "DataStore" || source.data.name === "TreeStore"))
				source = source.data;
			else {
				this._sync_source = source;
				return webix.callEvent("onSyncUnknown", [this, source, filter]);
			}
		}

		var	sync_logic = webix.bind(function(mode, record, data){
			if (this._skip_next_sync) return;
			this.importData(source, true);

			if (filter)
				this.silent(filter);
			if (this._on_sync)
				this._on_sync();

			if (webix.debug_bind)
				webix.log("[sync:request] "+this.debug_sync_master.name+"@"+this.debug_sync_master._settings.id + " <= "+this.debug_bind_master.name+"@"+this.debug_bind_master._settings.id);

			this.callEvent("onSyncApply",[]);

			if (!silent) 
				this.refresh();
			else
				silent = false;
		}, this);



		this._sync_events = [
			source.attachEvent("onStoreUpdated", sync_logic),
			source.attachEvent("onIdChange", webix.bind(function(old, nid){ this.changeId(old, nid); this.refresh(nid); }, this))
		];
		this._sync_source = source;

		//backward data saving
		this._back_sync_handler = this.attachEvent("onStoreUpdated", function(id, data, mode){
			if (mode == "update" || mode == "save"){
				this._skip_next_sync = 1;
				source.updateItem(id, data);
				this._skip_next_sync = 0;
			}
		});

		sync_logic();
	},
	unsync:function(){
		if (this._sync_source){
			var source = this._sync_source;

			if (source.name != "DataStore" &&
					(!source.data || source.data.name != "DataStore")){
				//data sync with external component
				webix.callEvent("onUnSyncUnknown", [this, source]);
			} else {
				//data sync with webix component
				for (var i = 0; i < this._sync_events.length; i++)
					source.detachEvent(this._sync_events[i]);
				this.detachEvent(this._back_sync_handler);
			}

			this._sync_source = null;
		}
	},
	destructor:function(){
		this.unsync();

		this.pull = this.order = this._marks = null;
		this._evs_events = this._evs_handlers = {};
	},
	//adds item to the store
	add:function(obj,index){
		//default values		
		if (this._scheme)
			for (var key in this._scheme)
				if (webix.isUndefined(obj[key]))
					obj[key] = this._scheme[key];
		
		if (this._scheme_init)
			this._scheme_init(obj);
		
		//generate id for the item
		var id = this.id(obj);

		//in case of treetable order is sent as 3rd parameter
		var order = arguments[2]||this.order;
		
		//by default item is added to the end of the list
		var data_size = order.length;
		
		if (webix.isUndefined(index) || index < 0)
			index = data_size; 
		//check to prevent too big indexes			
		if (index > data_size){
			webix.log("Warning","DataStore:add","Index of out of bounds");
			index = Math.min(order.length,index);
		}
		if (this.callEvent("onBeforeAdd", [id, obj, index]) === false) return false;

		webix.assert(!this.exists(id), "Not unique ID");
		
		this.pull[id]=obj;
		order.insertAt(id,index);
		if (this._filter_order){	//adding during filtering
			//we can't know the location of new item in full dataset, making suggestion
			//put at end by default
			var original_index = this._filter_order.length;
			//put at start only if adding to the start and some data exists
			if (!index && this.order.length)
				original_index = 0;

			this._filter_order.insertAt(id,original_index);
		}
		this.callEvent("onAfterAdd",[id,index]);
		//repaint signal
		this.callEvent("onStoreUpdated",[id,obj,"add"]);
		return id;
	},
	
	//removes element from datastore
	remove:function(id){
		//id can be an array of IDs - result of getSelect, for example
		if (webix.isArray(id)){
			for (var i=0; i < id.length; i++)
				this.remove(id[i]);
			return;
		}
		if (this.callEvent("onBeforeDelete",[id]) === false) return false;
		
		webix.assert(this.exists(id), "Not existing ID in remove command"+id);

		var obj = this.getItem(id);	//save for later event
		//clear from collections
		this.order.remove(id);
		if (this._filter_order) 
			this._filter_order.remove(id);
			
		delete this.pull[id];
		if (this._marks[id])
			delete this._marks[id];

		this.callEvent("onAfterDelete",[id]);
		//repaint signal
		this.callEvent("onStoreUpdated",[id,obj,"delete"]);
	},
	//deletes all records in datastore
	clearAll:function(){
		//instead of deleting one by one - just reset inner collections
		this.pull = {};
		this._marks = {};
		this.order = webix.toArray();
		//this.feed = null;
		this._filter_order = this.url = null;
		this.callEvent("onClearAll",[]);
		this.refresh();
	},
	//converts id to index
	getIdByIndex:function(index){
		webix.assert(index >= 0,"DataStore::getIdByIndex Incorrect index");
		return this.order[index];
	},
	//converts index to id
	getIndexById:function(id){
		var res = this.order.find(id);	//slower than getIdByIndex
		if (!this.pull[id])
			return -1;
			
		return res;
	},
	//returns ID of next element
	getNextId:function(id,step){
		return this.order[this.getIndexById(id)+(step||1)];
	},
	//returns ID of first element
	getFirstId:function(){
		return this.order[0];
	},
	//returns ID of last element
	getLastId:function(){
		return this.order[this.order.length-1];
	},
	//returns ID of previous element
	getPrevId:function(id,step){
		return this.order[this.getIndexById(id)-(step||1)];
	},
	/*
		sort data in collection
			by - settings of sorting
		
		or
		
			by - sorting function
			dir - "asc" or "desc"
			
		or
		
			by - property
			dir - "asc" or "desc"
			as - type of sortings
		
		Sorting function will accept 2 parameters and must return 1,0,-1, based on desired order
	*/
	sort:function(by, dir, as){
		var sort = by;	
		if (typeof by == "function")
			sort = {as:by, dir:dir};
		else if (typeof by == "string")
			sort = {by:by.replace(/#/g,""), dir:dir, as:as};

		
		var parameters = [sort.by, sort.dir, sort.as, sort];
		if (!this.callEvent("onBeforeSort",parameters)) return;	
		
		this.order = this._sort_core(sort, this.order);
		if (this._filter_order && this._filter_order.length != this.order.length)
			this._filter_order = this._sort_core(sort, this._filter_order);
		
		//repaint self
		this.refresh();
		
		this.callEvent("onAfterSort",parameters);
	},
	_sort_core:function(sort, order){
		var sorter = this._sort._create(sort);
		if (this.order.length){
			//get array of IDs
			var neworder = webix.toArray();
			for (var i=order.length-1; i>=0; i--)
				neworder[i] = this.pull[order[i]];
			
			neworder.sort(sorter);
			return webix.toArray(neworder.map(function(obj){ 
				webix.assert(obj, "Client sorting can't be used with dynamic loading");
				return this.id(obj);
			},this));
		}
		return order;
	},
	/*
		Filter datasource
		
		text - property, by which filter
		value - filter mask
		
		or
		
		text  - filter method
		
		Filter method will receive data object and must return true or false
	*/
	_filter_reset:function(preserve){
		//remove previous filtering , if any
		if (this._filter_order && !preserve){
			this.order = this._filter_order;
			delete this._filter_order;
		}
	},
	_filter_core:function(filter, value, preserve){
		var neworder = webix.toArray();
		for (var i=0; i < this.order.length; i++){
			var id = this.order[i];
			if (filter(this.getItem(id),value))
				neworder.push(id);
		}
		//set new order of items, store original
		if (!preserve ||  !this._filter_order)
			this._filter_order = this.order;
		this.order = neworder;
	},
	filter:function(text,value,preserve){
		//unfilter call but we already in not-filtered state
		if (!text && !this._filter_order && !this._filter_branch) return;
		if (!this.callEvent("onBeforeFilter", [text, value])) return;
		
		this._filter_reset(preserve);
		if (!this.order.length) return;
		
		//if text not define -just unfilter previous state and exit
		if (text){
			var filter = text;
			value = value||"";
			if (typeof text == "string"){
				text = text.replace(/#/g,"");
				if (typeof value == "function")
					filter = function(obj){
						return value(obj[text]);
					};
				else{
					value = value.toString().toLowerCase();
					filter = function(obj,value){	//default filter - string start from, case in-sensitive
						webix.assert(obj, "Client side filtering can't be used with dynamic loading");
						return (obj[text]||"").toString().toLowerCase().indexOf(value)!=-1;
					};
				}
			}
			
			this._filter_core(filter, value, preserve, this._filterMode);
		}
		//repaint self
		this.refresh();
		
		this.callEvent("onAfterFilter", []);
	},
	/*
		Iterate through collection
	*/
	_obj_array:function(){
		var data = [];
		for (var i = this.order.length - 1; i >= 0; i--)
			data[i]=this.pull[this.order[i]];

		return data;
	},
	each:function(method, master, all){
		var order = this.order;
		if (all)
			order = this._filter_order || order;

		for (var i=0; i<order.length; i++)
			method.call((master||this), this.getItem(order[i]), i);
	},
	_methodPush:function(object,method){
		return function(){ return object[method].apply(object,arguments); };
	},
	/*
		map inner methods to some distant object
	*/
	provideApi:function(target,eventable){
		this.debug_bind_master = target;
			
		if (eventable){
			this.mapEvent({
				onbeforesort:	target,
				onaftersort:	target,
				onbeforeadd:	target,
				onafteradd:		target,
				onbeforedelete:	target,
				onafterdelete:	target,
				ondataupdate:	target/*,
				onafterfilter:	target,
				onbeforefilter:	target*/
			});
		}
			
		var list = ["sort","add","remove","exists","getIdByIndex","getIndexById","getItem","updateItem","refresh","count","filter","getNextId","getPrevId","clearAll","getFirstId","getLastId","serialize","sync"];
		for (var i=0; i < list.length; i++)
			target[list[i]] = this._methodPush(this,list[i]);
			
	},
	addMark:function(id, mark, css, value, silent){
		var obj = this._marks[id]||{};
		this._marks[id] = obj;
		if (!obj[mark]){
			obj[mark] = value||true;	
			if (css){
				var old_css = obj["$css"]||"";
				obj["$css"] = old_css+" "+mark;
			}
			if (!silent)
				this.refresh(id);
		}
		return obj[mark];
	},
	removeMark:function(id, mark, css, silent){
		var obj = this._marks[id];
		if (obj){
			if (obj[mark])
				delete obj[mark];
			if (css){
				var current_css = obj["$css"];
				if (current_css){
					obj["$css"] = current_css.replace(mark, "").replace("  "," ");
				}
			}
			if (!silent) 
				this.refresh(id);
		}
	},
	getMark:function(id, mark){
		var obj = this._marks[id];
		return (obj?obj[mark]:false);
	},
	clearMark:function(name, css, silent){
		for (var id in this._marks){
			var obj = this._marks[id];
			if (obj[name]){
				delete obj[name];
				if (css && obj.$css)
					obj.$css = obj.$css.replace(name, "").replace("  "," ");
				if (!silent)
					this.refresh(id);
			}
		}
	},	
	/*
		serializes data to a json object
	*/
	serialize: function(all){
		var ids = this.order;
		if (all && this._filter_order)
			ids = this._filter_order;

		var result = [];
		for(var i=0; i< ids.length;i++) {
			var el = this.pull[ids[i]];
			if (this._scheme_serialize){
				el = this._scheme_serialize(el);
				if (el===false) continue;
			}
			result.push(el);
		}
		return result;
	},

	_sort:{
		_create:function(config){
			return this._dir(config.dir, this._by(config.by, config.as));
		},
		_as:{
			//handled by dataFeed
			"server":function(){
				return false;
			},
			"date":function(a,b){
				a=a-0; b=b-0;
				return a>b?1:(a<b?-1:0);
			},
			"int":function(a,b){
				a = a*1; b=b*1;
				return a>b?1:(a<b?-1:0);
			},
			"string_strict":function(a,b){
				a = a.toString(); b=b.toString();
				return a>b?1:(a<b?-1:0);
			},
			"string":function(a,b){
				if (!b) return 1;
				if (!a) return -1;
				
				a = a.toString().toLowerCase(); b=b.toString().toLowerCase();
				return a>b?1:(a<b?-1:0);
			}
		},
		_by:function(prop, method){
			if (!prop)
				return method;
			if (typeof method != "function")
				method = this._as[method||"string"];

			webix.assert(method, "Invalid sorting method");
			return function(a,b){
				return method(a[prop],b[prop]);
			};
		},
		_dir:function(prop, method){
			if (prop == "asc" || !prop)
				return method;
			return function(a,b){
				return method(a,b)*-1;
			};
		}
	}
};


webix.DataCollection = webix.proto({
	name:"DataCollection",
	isVisible:function(){ 
		if (!this.data.order.length && !this.data._filter_order && !this._settings.dataFeed) return false;
		return true; 
	},
	$init:function(config){
		this.data.provideApi(this, true);
		var id = (config&&config.id)?config.id:webix.uid();
		this._settings.id =id;
		webix.ui.views[id] = this;
		this.data.attachEvent("onStoreLoad", webix.bind(function(){
			this.callEvent("onBindRequest",[]);
		}, this));
	},
	refresh:function(){ this.callEvent("onBindRequest",[]); }
}, webix.CollectionBind, webix.BindSource, webix.ValidateCollection, webix.DataLoader, webix.EventSystem, webix.BaseBind, webix.Destruction, webix.Settings);





webix.Scrollable = {
	$init:function(config){
		//do not spam unwanted scroll containers for templates 
		if (config && !config.scroll && this._one_time_scroll) 
			return (this._dataobj = (this._dataobj||this._contentobj));
		
		(this._dataobj||this._contentobj).appendChild(webix.html.create("DIV",{ "class" : "webix_scroll_cont" },""));
		this._dataobj=(this._dataobj||this._contentobj).firstChild;
	},
	/*defaults:{
		scroll:true
	},*/
	scroll_setter:function(value){
		if (!value) return false;
		var marker =  (value=="x"?"x":(value=="xy"?"xy":(value=="a"?"xy":"y")));
		if (webix.Touch && webix.Touch.$active){
			this._dataobj.setAttribute("touch_scroll",marker);
			if (this.attachEvent)
				this.attachEvent("onAfterRender", webix.bind(this._refresh_scroll,this));
			this._touch_scroll = true;
		} else {
			if (webix.env.$customScroll){
				webix.CustomScroll.enable(this, marker);
			} else {
				var node = this._dataobj.parentNode.style;
				if (value.toString().indexOf("a")!=-1){
					node.overflowX = node.overflowY = "auto";
				} else {
					if (marker.indexOf("x")!=-1){
						this._scroll_x = true;
						node.overflowX = "scroll";
					}
					if (marker.indexOf("y")!=-1){
						this._scroll_y = true;
						node.overflowY = "scroll";
					}
				}
			}
		}
		return marker;
	},
	_onoff_scroll:function(mode){
		if (!!this._settings.scroll == !!mode) return;

		if (!webix.env.$customScroll){
			var style = this._dataobj.parentNode.style;
			style.overflowX = style.overflowY = mode?"auto":"hidden";
		}

		this._scroll_x = this._scroll_y = !!mode;
		this._settings.scroll = !!mode;
	},
	getScrollState:function(){
		if (webix.Touch && webix.Touch.$active){
			var temp = webix.Touch._get_matrix(this._dataobj);
			return { x : -temp.e, y : -temp.f };
		} else
			return { x : this._dataobj.parentNode.scrollLeft, y : this._dataobj.parentNode.scrollTop };
	},
	scrollTo:function(x,y){
		if (webix.Touch && webix.Touch.$active){
			y = Math.max(0, Math.min(y, this._dataobj.offsetHeight - this._content_height));
			x = Math.max(0, Math.min(x, this._dataobj.offsetWidth - this._content_width));
			webix.Touch._set_matrix(this._dataobj, -x, -y, this._settings.scrollSpeed||"100ms");
		} else {
			this._dataobj.parentNode.scrollLeft=x;
			this._dataobj.parentNode.scrollTop=y;
		}
	},
	_refresh_scroll:function(){
		if (this._settings.scroll.toString().indexOf("x")!=-1){
			this._dataobj.style.width = "100%";
			this._dataobj.style.width = this._dataobj.scrollWidth+"px";
		}
			
		if(webix.Touch && webix.Touch.$active && this._touch_scroll){
			webix.Touch._clear_artefacts();
			webix.Touch._scroll_end();
			var s = this.getScrollState();
			var dx = this._dataobj.offsetWidth - this.$width - s.x;
			var dy = this._dataobj.offsetHeight - this.$height - s.y;

			//if current scroll is outside of data area
			if(dx<0 || dy < 0){
				//scroll to the end of data area
				var x = (dx<0?Math.min(-dx - s.x,0):- s.x);
				var y = (dy<0?Math.min(-dy - s.y,0):- s.y);
				webix.Touch._set_matrix(this._dataobj, x, y, 0);
			}
		}
	}
};

/*
	UI:paging control
*/



webix.protoUI({
	defaults:{
		size:10,	//items on page
		page: 0,	//current page
		group:5,
		template:"{common.pages()}",
		maxWidth:100000,
		height:30,
		borderless:true
	},
	name:"pager",
	on_click:{
		//on paging button click
		"webix_pager_item":function(e,id){
			this.select(id);
		}
	},
	$init:function(config){
		this.data = this._settings;
		this._dataobj = this._viewobj;
		this._viewobj.className += " webix_pager";

        if(config.master===false||config.master === 0)
             this.$ready.push(this._remove_master);
	},
    _remove_master:function(){
        this.refresh();
        this.$master = { refresh:function(){}, select:function(){} };
    },
	select:function(id){
		if (this.$master && this.$master.name == "pager")
			return this.$master.select(id);

		//id - id of button, number for page buttons
		switch(id){
			case "next":
				id = this._settings.page+1;
				break;
			case "prev":
				id = this._settings.page-1;
				break;
			case "first":
				id = 0;
				break;
			case "last":
				id = this._settings.limit-1;
				break;
			default:
				//use incoming id
				break;
		}
		if (id<0) id=0;
		if (id>=this.data.limit) id=this.data.limit-1;

		var old = this.data.page;
		this.data.page = id*1; //must be int

		if (this.refresh()){
			if (!this._settings.animate || !this._animate(old, id*1, this._settings.animate))
				this.$master.refresh();
		}
	},
	_id:"webix_p_id",
	template_setter:webix.template,
	type:{
		template:function(a,b){ return a.template.call(this, a,b); },
		//list of page numbers
		pages:function(obj){
			var html="";
			//skip rendering if paging is not fully initialized
			if (obj.page == -1) return "";
			//current page taken as center of view, calculate bounds of group
			obj.$min = obj.page-Math.round((obj.group-1)/2);
			obj.$max = obj.$min + obj.group*1 - 1;
			if (obj.$min<0){
				obj.$max+=obj.$min*(-1);
				obj.$min=0;
			}
			if (obj.$max>=obj.limit){
				obj.$min -= Math.min(obj.$min,obj.$max-obj.limit+1);
				obj.$max = obj.limit-1;
			}
			//generate HTML code of buttons
			for (var i=(obj.$min||0); i<=obj.$max; i++)
				html+=this.button({id:i, index:(i+1), selected:(i == obj.page ?"_selected":"")});
			return html;
		},
		page:function(obj){
			return obj.page+1;
		},
		//go-to-first page button
		first:function(){
			return this.button({ id:"first", index:webix.locale.pager.first, selected:""});
		},
		//go-to-last page button
		last:function(){
			return this.button({ id:"last", index:webix.locale.pager.last, selected:""});
		},
		//go-to-prev page button
		prev:function(){
			return this.button({ id:"prev", index:webix.locale.pager.prev, selected:""});
		},
		//go-to-next page button
		next:function(){
			return this.button({ id:"next", index:webix.locale.pager.next, selected:""});
		},
		button:webix.template("<button type='button' webix_p_id='{obj.id}' class='webix_pager_item{obj.selected}'>{obj.index}</button>")
	},
	clone:function(pager){
		if (!pager.$view){
			pager.view = "pager";
			pager = webix.ui(pager);
		}

		this._clone = pager;
		pager.$master = this;
		this._refresh_clone();
	},
	refresh:function(){
		var s = this._settings;
		if (!s.count) return;

		//max page number
		s.limit = Math.ceil(s.count/s.size);
		s.page = Math.min(s.limit-1, s.page);
		
		var id = s.page;
		if (id>=0 && (id!=s.old_page) || (s.limit != s.old_limit)){ 
			//refresh self only if current page or total limit was changed
			this.render();
			this._refresh_clone();
			s.old_limit = s.limit;	//save for onchange check in next iteration
			s.old_page = s.page;
			return true;
		}
	},
	apiOnly_setter:function(value){
		return (this.$apiOnly=value);
	},
	_refresh_clone:function(){
		if (this._clone){
			this._clone._settings.count = this._settings.count;
			this._clone._settings.page = this._settings.page;
			this._clone.refresh();
		}
	},
	_animate:function(old, id, config){
		if (old == id) return false;
		if (this._pgInAnimation){
			if(this._pgAnimateTimeout){
				window.clearTimeout(this._pgAnimateTimeout);
			}
			return (this._pgAnimateTimeout = webix.delay(this._animate, this,[old, id, config],100));
		}
		var direction = id > old ? "left" : "right";
		if (config.direction == "top" || config.direction == "bottom")
			direction = id > old ? "top" : "bottom";
		if (config.flip)
			direction = "";

		

		//make copy of existing view
		var top = 0;
		var snode = this.$master._dataobj;
		if (this.$master._body){	//datatable
			snode = this.$master._body;
			top = snode.offsetTop;
			webix.html.addCss(this.$master.$view, "webix_animation");
		}

		var onode = snode.cloneNode(true);
		onode.style.width = snode.style.width = "100%";
		onode.style.backgroundColor = snode.style.backgroundColor = "white";
		
		//redraw page
		this.$master.refresh();
		//append copy next to original
		webix.html.insertBefore(onode, snode.nextSibling, snode.parentNode);

		//animation config
		var line;
		var base = config !== true ? config : {};
		var aniset = webix.extend({
			direction:direction,
			callback:webix.bind(function(){
				aniset.callback = null;
				webix.animate.breakLine(line);
				this._pgInAnimation = false;
				if (this.$master._body)
					webix.html.removeCss(this.$master.$view, "webix_animation");
			},this),
			top:top
		}, base);

		//run animation
		line = webix.animate.formLine(snode, onode, aniset);
		webix.animate([ snode, onode ], aniset );
		this._pgInAnimation = true;
	}
}, webix.MouseEvents, webix.SingleRender, webix.ui.view, webix.EventSystem);

webix.locale.pager = {
	first: " &lt;&lt; ",
	last: " &gt;&gt; ",
	next: " &gt; ",
	prev: " &lt; "
};


webix.PagingAbility = {
	pager_setter:function(pager){
		if (typeof pager == "string"){
			var ui_pager = webix.$$(pager);
			if (!ui_pager){
				this.$blockRender = true;
				webix.delay(function(){
					var obj = webix.$$(pager);

					this._settings.pager = this.pager_setter(obj);
					var s = obj._settings;
					s.count = this.data._count_pager_total(s.level);
					obj.refresh();

					this.$blockRender = false;
					this.render();
				}, this);
				return null;
			}
			pager = ui_pager;
		}

		function check_pager_sizes(repeat){
			if (pager.config.autosize && this.getVisibleCount){
				var count = this.getVisibleCount();
				if (isNaN(count)){
					pager.config.size = 1;
					webix.delay(check_pager_sizes, this, [true]);
				} else if (count != pager.config.size){
					pager.config.size = count;
					pager.refresh();
					if (repeat === true)
						this.refresh();
				}
			}
			
			var s = this._settings.pager;
			//initial value of pager = -1, waiting for real value
			if (s.page == -1) return false;	
			
			this.data.$min = this._count_pager_index(0, s.page*s.size);	//affect data.getRange
			this.data.$max = this._count_pager_index(this.data.$min, s.size);
			this.data.$pagesize = this.data.$max - this.data.$min;

			return true;
		}

		this.attachEvent("onBeforeRender",check_pager_sizes);

		if (!pager.$view){
			pager.view = "pager";
			pager = webix.ui(pager);
		}
		this._pager = pager;
		pager.$master = this;

		this.data.attachEvent("onStoreUpdated", function(){
			var s = pager._settings;
			s.count = this._count_pager_total(s.level);
			pager.refresh();
		});
		this.data._count_pager_total = this._count_pager_total;

		return pager._settings;
	},
	_count_pager_total:function(level){
		if (level && level !== 0){
			var count = 0; 
			this.each(function(obj){
				if (obj.$level == level) count++;
			});
			return count;
		} else
			return this.count();
	},
	_count_pager_index:function(start, count){
		var s = this._settings.pager;

		if (s.level && s.level !== 0){
			var end = start;
			var max = this.data.order.length;

			if (count)
				while (end < max){
					if (this.data.getItem(this.data.order[end]).$level == s.level){
						if (count === 0)
							break;
						else
							count--;
					}
					end++;
				}

			return end;
		} else
			return start+count;
	},
	setPage:function(value){
		if (this._pager)
			this._pager.select(value);
	},
	getPage:function(){
		return this._pager._settings.page;
	},
	getPager:function(){
		return this._pager;
	}
};
/*
	Behavior: AutoTooltip - links tooltip to data driven item
*/

/*
	UI: Tooltip
	
	@export
		show
		hide
*/




webix.protoUI({
	name:"tooltip", 
	defaults:{
		dy:0,
		dx:20
	},
	$init:function(container){
		if (typeof container == "string"){
			container = { template:container };
		}

		this.type = webix.extend({}, this.type);

		//create  container for future tooltip
		this._viewobj = this._contentobj = this._dataobj = document.createElement("DIV");
		this._contentobj.className = "webix_tooltip";
		webix.html.insertBefore(this._contentobj,document.body.firstChild);
	},
	adjust:function(){  },
	//show tooptip
	//pos - object, pos.x - left, pox.y - top
    isVisible:function(){
        return true;
    },
	show:function(data,pos){
		if (this._disabled) return;
		//render sefl only if new data was provided
        if (this.data!=data){
			this.data=webix.extend({},data);
			this.render(data);
		}

		if (this._dataobj.firstChild){
			//show at specified position
			this._contentobj.style.top = pos.y+this._settings.dy+"px";
			this._contentobj.style.left = pos.x+this._settings.dx+"px";
			this._contentobj.style.display="block";
		}
	},
	//hide tooltip
	hide:function(){
		this.data=null; //nulify, to be sure that on next show it will be fresh-rendered
		this._contentobj.style.display="none";
	},
	disable:function(){
		this._disabled = true;
	},
	enable:function(){
		this._disabled = false;
	},
	type:{
		template:webix.template("{obj.id}"),
        templateStart:webix.template.empty,
	    templateEnd:webix.template.empty
	}

}, webix.SingleRender, webix.Settings, webix.EventSystem, webix.ui.view);
		


webix.AutoTooltip = {
	tooltip_setter:function(value){
		if (value){
			if (typeof value == "function")
				value = { template:value };

			var col_mode = !value.template;
			var handlers = [];
			var t = new webix.ui.tooltip(value);
			this._enable_mouse_move();
			handlers[0] = this.attachEvent("onMouseMove",function(id,e){	//show tooltip on mousemove
				if (this.getColumnConfig){
					var config = t.type.column = this.getColumnConfig(id.column);
					if (col_mode){

						//empty tooltip - ignoring
						if (!config.tooltip && config.tooltip != webix.undefined)
							return;
						if (config.tooltip)
							t.type.template = config.tooltip = webix.template(config.tooltip);
						else {
							var text = this.getText(id.row, id.column);
							t.type.template = function(){ return text; };
						}
					}
				}

				if (!webix.DragControl.active)
					t.show(this.getItem(id),webix.html.pos(e));
			});
			handlers[1] = this.attachEvent("onMouseOut",function(id,e){	//hide tooltip on mouseout
				t.hide();
			});
			handlers[2] = this.attachEvent("onMouseMoving",function(id,e){	//hide tooltip just after moving start
				t.hide();
			});
			this.attachEvent("onDestruct",function(){
				if(this.config.tooltip)
					this.config.tooltip.destructor();
			});
			t.attachEvent("onDestruct",webix.bind(function(){
				for(var i = 0; i < handlers.length;i++)
					this.detachEvent(handlers[i]);
			},this));
			return t;
		}
	}
};

webix.protoUI({
	name:"proto",
	$init:function(){
		this.data.provideApi(this, true);
		this._dataobj = this._dataobj || this._contentobj;
		
		//render self , each time when data is updated
		this.data.attachEvent("onStoreUpdated",webix.bind(function(){
			this.render.apply(this,arguments);
		},this));
	},
	$setSize:function(){
		if (webix.ui.view.prototype.$setSize.apply(this, arguments))
			this.render();
	},
	_id:"webix_item",
	on_mouse_move:{
	},
	type:{}
}, webix.PagingAbility, webix.DataMarks, webix.AutoTooltip,webix.ValidateCollection,webix.RenderStack, webix.DataLoader, webix.ui.view, webix.EventSystem, webix.Settings);

webix.Values = {
	$init:function(){
		this.elements = {};
	},
	focus:function(name){
		var target;
		if (name){
			webix.assert(this.elements[name],"unknown input name: "+name);
			target = this.elements[name];
		} else if (this._cells){
			var index = 0;
			do {
				target = this._cells[index];
				index++;
			} while (target && !target.focus);
		}
			
		if (target && target.focus)
			target.focus();
	},
	setValues:function(data, update){
		this._is_form_dirty = update;

		//prevent onChange calls from separate controls
		this.blockEvent();
		this._inner_setValues(data, update);
		this.unblockEvent();
		this.callEvent("onValues",[]);
	},
	_inner_setValues:function(data, update){
		if (update)
			this._values = webix.extend(this.getValues(), data, true);
		else
			this._values = webix.copy(data);
		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id);

		for (var name in this.elements){
			var input = this.elements[name];
			if (input){
				if (!webix.isUndefined(this._values[name]))
					input.setValue(data[name] || this._values[name]);
				else {
					if (input._allowsClear)
						input.setValue("");
					this._values[name] = input.getValue();
				}
			}
		}
	},
	isDirty:function(){
		if (this._is_form_dirty) return true;
		if (this.getDirtyValues(1) === 1)
			return true;

		return false;
	},
	setDirty:function(flag){
		this._is_form_dirty = flag;
		if (!flag)
			this._values = this.getValues();
	},
	getDirtyValues:function(){
		var result = {};
		if (this._values){
			for (var name in this.elements){
				var value = this.elements[name].getValue();
				if (this._values[name] != value){
					result[name] = value;
					//FIXME - used by isDirty
					if (arguments[0])
						return 1;
				}
			}
		}
		return result;
	},
	getCleanValues:function(){
		return this._values;
	},
	getValues:function(filter){
		//get original data		
		var success,
			elem = null,
			data = (this._values?webix.copy(this._values):{});

		//update properties from linked controls
		for (var name in this.elements){
			elem = this.elements[name];
			success = true;
			if(filter){
				if(typeof filter == "object"){
					if(filter.hidden === false)
						success = elem.isVisible();
					if(success && filter.disabled === false)
						success = elem.isEnabled();
				}
				else
					success = filter.call(this,elem);
			}
			if(success)
				data[name] = elem.getValue();
			else
				delete data[name]; //in case of this._values[name]
		}
		return data;
	},
	clear:function(){
		this._is_form_dirty = false;
		var data = {};
		for (var name in this.elements)
			if (this.elements[name]._allowsClear)
				data[name] = this.elements[name]._settings.defaultValue||"";
		
		this.setValues(data);
	},
	_onLoad:function(text,xml,loader){
		var driver = this.data.driver;
		var data;
		if (loader === -1){
			data = xml;
		} else {
			data = driver.toObject(text,xml);
		}

		if (data){
			var top = driver.getRecords(data)[0];
			this.setValues(driver?driver.getDetails(top):text);
		} else
			this._onLoadError(text,xml,loader);
		this.callEvent("onAfterLoad",[]);
		this.waitData.resolve();
	},
	_mark_invalid:function(id,obj,silent){
		var input = this.elements[id];
		if (id && input){
			this._clear_invalid(id,obj,true);
			webix.html.addCss(input._viewobj, "webix_invalid");
			input._settings.invalid = true;
			if(input._settings.invalidMessage && input._showBottomText)
				input._showBottomText();
		}
	},
	_clear_invalid:function(id,obj,silent){
		var input = this.elements[id];
        if(id && input && input.$view && input._settings.invalid){
	        webix.html.removeCss(input._viewobj, "webix_invalid");
	        input._settings.invalid = false;
	        if(input._settings.invalidMessage && !silent && input._showBottomText)
	        	input._showBottomText();
        }
	}
};



webix.protoUI({
	name:"toolbar",
	defaults:{
		type:'toolbar'
	},
	_render_borders:true,
	_form_classname:"webix_toolbar",
	_form_vertical:false,
	$init:function(config){
		if (!config.borderless)
			this._contentobj.style.borderWidth="1px";

		this._contentobj.className+=" "+this._form_classname;
	},
	_recollect_elements:function(){
		var form = this;
		form.elements = {};
		webix.ui.each(this, function(view){
			if (view._settings.name && view.getValue && view.setValue){
				form.elements[view._settings.name] = view;
				if (view.mapEvent)
					view.mapEvent({
						onbeforetabclick:form,
						onaftertabclick:form,
						onitemclick:form,
						onchange:form
					});
			}

			if (view.setValues) return false;
		});
		this.setDirty(false);
	},
	_parse_cells_ext_end:function(){
		this._recollect_elements();
	},
	_parse_cells_ext:function(collection){
		var config = this._settings;
		if (config.elements && !collection){
			this._collection = collection = config.elements;
			this._vertical_orientation = this._form_vertical;
			delete config.elements;
		}

		if (this._settings.elementsConfig)
			this._rec_apply_settings(this._collection, config.elementsConfig);
		
		return collection;
	},
	_rec_apply_settings:function(col, settings){
		for (var i=0; i<col.length; i++){
			var element = col[i];
			webix.extend( element, settings );
			var nextsettings = settings;

			if (element.elementsConfig)
				nextsettings = webix.extend(webix.extend({}, element.elementsConfig), settings);

			var sub;
			if (element.body)
				sub = [element.body];
			else
				sub = element.rows || element.cols || element.cells || element.body;

			if (sub)
				this._rec_apply_settings(sub, nextsettings);
		}
	},
	$getSize:function(dx, dy){
		var sizes = webix.ui.layout.prototype.$getSize.call(this, dx, dy);
		var parent = this.getParentView();
		var index = this._vertical_orientation?3:1;
		if (parent && this._vertical_orientation != parent._vertical_orientation)
			sizes[index]+=100000;
		
		webix.debug_size_box(this, sizes, true);
		return sizes;
	},
	render:function(){
	},
	refresh:function(){
		this.render();
	}
},  webix.Scrollable, webix.AtomDataLoader, webix.Values, webix.ui.layout, webix.ValidateData);


webix.protoUI({
	name:"template",
	$init:function(config){
		var subtype = this._template_types[config.type];
		if (subtype){
			webix.extend(config, subtype);
			
			//will reset borders for "section"
			if (config.borderless){
				delete config._inner;
				this._set_inner(config);
			}
		}

		if (this._dataobj == this._viewobj){
			this._dataobj = webix.html.create("DIV");
			this._dataobj.className = " webix_template";
			this._viewobj.appendChild(this._dataobj);
		} else 
			this._dataobj.className += " webix_template";

		this.attachEvent("onAfterLoad",this._render_me);
		this.attachEvent("onAfterRender", this._correct_width_scroll);
	},
	setValues:function(obj, update){
		this.data = update?webix.extend(this.data, obj, true):obj;
		this.render();
	},
	$skin:function(){
		this._template_types.header.height = this._template_types.section.height = webix.skin.$active.barHeight;
	},
	_template_types:{
		"header":{
			css:"webix_header"
		},
		"section":{
			css:"webix_section",
			borderless:true
		},
		"clean":{
			css:"webix_clean",
			borderless:true
		}
	},
	onClick_setter:function(value){
		this.on_click = webix.extend((this.on_click || {}), value, true);

		if (!this._onClick)
			webix.extend(this, webix.MouseEvents);

		return value;
	},
	defaults:{
		template:webix.template.empty
	},
	_render_me:function(){
		this._not_render_me = false;
		this._probably_render_me();
		this.resize();
	},
	_probably_render_me:function(){
		if (!this._not_render_me){
			this._not_render_me = true;
			this.render();
		}
	},
	src_setter:function(value){
		this._not_render_me = true;
		
		this.callEvent("onBeforeLoad",[]);
		webix.ajax(value, webix.bind(function(text){
			this._settings.template = webix.template(text);
			this._render_me();
			this.callEvent("onAfterLoad",[]);
		}, this));
		return value;
	},
	_correct_width_scroll:function(){
		//we need to force auto height calculation after content change
		//dropping the last_size flag will ensure that inner logic of $setSize will be processed
		if (this._settings.autoheight){
			this._last_size = null;
			this.resize();
		}

		if (this._settings.scroll && this._settings.scroll.indexOf("x") != -1)
			this._dataobj.style.width = this._dataobj.scrollWidth + "px";
	},
	content_setter:function(config){
		if (config){
			this._not_render_me = true;
			this.render = function(){};
			this._dataobj.appendChild(webix.toNode(config));
		}
	},
	refresh:function(){
		this.render();
	},
	setHTML:function(html){
		this._settings.template = function(){ return html; };
		this.refresh();
	},
	setContent:function(content){
		this._dataobj.innerHTML = "";
		this.content_setter(content);
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this,x,y)){
			this._probably_render_me();
			if (this._settings.autoheight){
				var top =this.getTopParentView();
				clearTimeout(top._template_resize_timer);
				top._template_resize_timer = webix.delay(this.resize, this);
			}
		}
	},
	$getSize:function(x,y){
		if (this._settings.autoheight && !this._settings.type)
			this._settings.height = this._get_auto_height();

		return webix.ui.view.prototype.$getSize.call(this,x,y);
	},
	_get_auto_height:function(){
		var size;
			
		this._probably_render_me();
		var padding = webix.skin.$active.layoutPadding.space;
		this._dataobj.style.height = "auto";
		size = this._dataobj.scrollHeight;
		this._dataobj.style.height = "";

		return size;
	},
	_one_time_scroll:true //scroll will appear only if set directly in config
}, webix.Scrollable, webix.AtomDataLoader, webix.AtomRender, webix.EventSystem, webix.ui.view);

webix.protoUI({
	name:"iframe",
	$init:function(config){
		this._dataobj = this._contentobj;
		this._contentobj.innerHTML = "<iframe style='width:100%; height:100%' frameborder='0' onload='var t= $$(\""+config.id+"\"); if (t) t.callEvent(\"onAfterLoad\",[]);' src='about:blank'></iframe>";
	},
	load:function(value){
		this.src_setter(value);
	},
	src_setter:function(value){
		this.getIframe().src = value;
		this.callEvent("onBeforeLoad",[]);
		return value;
	},
	getIframe:function(){
		return this._contentobj.getElementsByTagName("iframe")[0];
	},
	getWindow:function(){
		return this.getIframe().contentWindow;
	}
}, webix.ui.view, webix.EventSystem);

webix.OverlayBox = {
	showOverlay:function(message){
		if (!this._overlay){
			this._overlay = webix.html.create("DIV",{ "class":"webix_overlay" },(message||""));
			webix.html.insertBefore(this._overlay, this._viewobj.firstChild, this._viewobj);
			this._viewobj.style.position = "relative";
		} else 
			this._overlay.innerHTML = message;
	},
	hideOverlay:function(){
		if (this._overlay){
			webix.html.remove(this._overlay);
			this._overlay = null;
		}
	}
};

/*scrollable view with another view insize*/
webix.protoUI({
	name:"scrollview",
	defaults:{
		scroll:"y",
		scrollSpeed:"0ms"
	},
	$init:function(){
		this._viewobj.className += " webix_scrollview";
	},
	body_setter:function(config){
		config.borderless = true;
		this._body_cell = webix.ui._view(config);
		this._body_cell._parent_cell = this;
		this._dataobj.appendChild(this._body_cell._viewobj);
	},
	getChildViews:function(){
		return [this._body_cell];
	},
	getBody:function(){
		return this._body_cell;
	},
	resizeChildren:function(){
		this._desired_size = this._body_cell.$getSize(0, 0);
		this._resizeChildren();
	},
	_resizeChildren:function(){
		var scroll_size = this._native_scroll || webix.ui.scrollSize;
		var cx = Math.max(this._content_width, this._desired_size[0]);
		var cy = Math.max(this._content_height, this._desired_size[2]);
		this._body_cell.$setSize(cx, cy);			
		this._dataobj.style.width = this._body_cell._content_width+"px";
		this._dataobj.style.height = this._body_cell._content_height+"px";
		if (webix.env.touch){
			var state = this.getScrollState();
			var top = this._body_cell._content_height - this._content_height;
			if (top < state.y)
				this.scrollTo(null, top);
		}
	},
	$getSize:function(dx, dy){
		var desired_size = this._desired_size = this._body_cell.$getSize(0, 0);
		var self_sizes   = webix.ui.view.prototype.$getSize.call(this, dx, dy);
		var scroll_size = this._native_scroll || webix.ui.scrollSize;

		if(this._settings.scroll=="x"){
			self_sizes[2] = Math.max(self_sizes[2], desired_size[2]) + scroll_size;
			self_sizes[3] = Math.min(self_sizes[3], desired_size[3]) + scroll_size;
		} else if(this._settings.scroll=="y"){
			self_sizes[0] = Math.max(self_sizes[0], desired_size[0]) + scroll_size;
			self_sizes[1] = Math.min(self_sizes[1], desired_size[1]) + scroll_size;
		}
		return self_sizes;
	},
	$setSize:function(x,y){
		var temp = webix.ui.scrollSize;
		webix.ui.scrollSize = this._native_scroll || temp;

		if (webix.ui.view.prototype.$setSize.call(this,x,y))
			this._resizeChildren();
		
		webix.ui.scrollSize = temp;
	},
	scroll_setter:function(value){
		var custom = webix.env.$customScroll;
		if (typeof value == "string" && value.indexOf("native-") === 0){
			this._native_scroll = 17;
			value = value.replace("native-");
			webix.env.$customScroll = false;
		}

		value =  webix.Scrollable.scroll_setter.call(this, value);

		webix.env.$customScroll = custom;
		return value;
	},
	_replace:function(new_view){
		this._body_cell.destructor();
		this._body_cell = new_view;
		this._body_cell._parent_cell = this;
		
		this._bodyobj.appendChild(this._body_cell._viewobj);
		this.resize();
	},
	showView: function(id){
		var topPos = webix.$$(id).$view.offsetTop-webix.$$(id).$view.parentNode.offsetTop;
		this.scrollTo(0, topPos);
	}
}, webix.Scrollable, webix.ui.view);
/*
	UI:TreeMenu
*/



 

webix.TreeRenderStack={
	$init:function(){
		webix.assert(this.render,"TreeRenderStack :: Object must use RenderStack first");
	},
	_toHTMLItem:function(obj){
		var mark = this.data._marks[obj.id];
		this.callEvent("onItemRender",[obj]);
		return this.type.templateStart(obj,this.type,mark)+(obj.$template?this.type["template"+obj.$template](obj,this.type,mark):this.type.template(obj,this.type,mark))+this.type.templateEnd();
	},
	_toHTMLItemObject:function(obj){
		this._html.innerHTML = this._toHTMLItem(obj);
		return this._html.firstChild;
	},
	//convert single item to HTML text (templating)
	_toHTML:function(obj){
		//check if related template exist
		webix.assert((!obj.$template || this.type["template"+obj.$template]),"RenderStack :: Unknown template: "+obj.$template);
		var html="<div class='webix_tree_branch_"+obj.$level+"'>"+this._toHTMLItem(obj);

		if (obj.open)
			html+=this._toHTMLLevel(obj.id);

		html+="</div>";

		return html;
	},
	_toHTMLLevel:function(id){
		var html = "";
		var leaves = this.data.branch[id];
		if (leaves){
			html+="<div class='webix_tree_leaves'>";
			var last = leaves.length-1;
			for (var i=0; i <= last; i++){
				var obj = this.getItem(leaves[i]);
				this.type._tree_branch_render_state[obj.$level] = (i == last);
				html+=this._toHTML(obj);
			}
			html+="</div>";
		}
		return html;
	},
	//return true when some actual rendering done
	render:function(id,data,type){
		webix.TreeRenderStack._obj = this;	//can be used from complex render

		if (!this.isVisible(this._settings.id) || this.$blockRender)
			return;

		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id);
			
		if (id){
			var cont;
			var item = this.getItem(id);
			if (type!="add"){
				cont = this.getItemNode(id);
				if (!cont) return;
			}
			
			switch(type){
				case "branch":
					var branch = cont.parentNode;
					var node = this._toHTMLObject(item);
					
					webix.html.insertBefore(node, branch); 
					webix.html.remove(branch);
					this._htmlmap = null;
				break;
				case "paint":
				case "update":
					var node = this._htmlmap[id] = this._toHTMLItemObject(item);
					webix.html.insertBefore(node, cont); 
					webix.html.remove(cont);
				break;
				case "delete":
					//deleting not item , but full branch
                    webix.html.remove(cont.parentNode);
				break;
				case "add":
					var parent;
					//we want process both empty value and 0 as string
					//jshint -W041:true
					if (item.$parent == 0){
						parent = this._dataobj.firstChild;
					} else {
						parent  = this.getItemNode(item.$parent);
						if (parent)
							parent = parent.nextSibling;
					}

					if (parent){
						var next = this.data.getNextSiblingId(id);
						next = this.getItemNode(next);
						if (next)
							next = next.parentNode;

						var node = this._toHTMLObject(item);
						this._htmlmap[id] = node.firstChild;
						webix.html.insertBefore(node, next, parent);
					}
				break;
				default:
					return false;
			}
			this.callEvent("onPartialRender", [id,data,type]);
		} else 
			//full reset
			if (this.callEvent("onBeforeRender",[this.data])){
				//will be used for lines management
				this.type._tree_branch_render_state = [];
				//getTopRange - returns all elements on top level
				this._dataobj.innerHTML = this._toHTMLLevel(0);
				
				this._htmlmap = null; //clear map, it will be filled at first getItemNode
				this.callEvent("onAfterRender",[]);
			}

		//clear after usage
		this.type._tree_branch_render_state = 0;
		webix.TreeRenderStack._obj = null;
		return true;
	},
	getItemNode:function(search_id){
		if (this._htmlmap)
			return this._htmlmap[search_id];
			
		//fill map if it doesn't created yet
		this._htmlmap={};
		
		var t = this._dataobj.getElementsByTagName("DIV");
		for (var i=0; i < t.length; i++){
			var id = t[i].getAttribute(this._id); //get item's
			if (id) 
				this._htmlmap[id]=t[i];
		}
		//call locator again, when map is filled
		return this.getItemNode(search_id);
	},
	_branch_render_supported:1
};



/*
	Behavior:SelectionModel - manage selection states
	@export
		select
		unselect
		selectAll
		unselectAll
		isSelected
		getSelectedId
*/
webix.SelectionModel={
	$init:function(){
		//collection of selected IDs
		this._selected = webix.toArray();
		webix.assert(this.data, "SelectionModel :: Component doesn't have DataStore");
         	
		//remove selection from deleted items
		this.data.attachEvent("onStoreUpdated",webix.bind(this._data_updated,this));
		this.data.attachEvent("onStoreLoad", webix.bind(this._data_loaded,this));
		this.data.attachEvent("onAfterFilter", webix.bind(this._data_filtered,this));
		this.data.attachEvent("onIdChange", webix.bind(this._id_changed,this));
		this.$ready.push(this._set_noselect);
	},
	_set_noselect: function(){
		if (this._settings.select=="multiselect" || this._settings.multiselect)
			webix.event(this.$view,"mousedown", function(e){
				var shiftKey = (e||event).shiftKey;
				if(shiftKey){
					webix._noselect_element = this;
					webix.html.addCss(this,"webix_noselect",1);
				}
			});
	},
	_id_changed:function(oldid, newid){
		for (var i = this._selected.length - 1; i >= 0; i--)
			if (this._selected[i]==oldid)
				this._selected[i]=newid;
	},
	_data_filtered:function(){
		for (var i = this._selected.length - 1; i >= 0; i--){
			if (this.data.getIndexById(this._selected[i]) < 0) {
				var id = this._selected[i];
				this.removeCss(id, "webix_selected", true);
				this._selected.splice(i,1);
				this.callEvent("onSelectChange",[id]);
			}
		}	
	},
	//helper - linked to onStoreUpdated
	_data_updated:function(id,obj,type){
		if (type == "delete"){				//remove selection from deleted items
			if (this.loadBranch){
				//hierarchy, need to check all
				for (var i = this._selected.length - 1; i >= 0; i--)
					if (!this.exists(this._selected[i]))
						this._selected.splice(i,1);
			} else
				this._selected.remove(id);
		}
		else if (!id && !this.data.count() && !this.data._filter_order){	//remove selection for clearAll
			this._selected = webix.toArray();
		}
	},
	_data_loaded:function(){
		if (this._settings.select)
			this.data.each(function(obj){
				if (obj && obj.$selected) this.select(obj.id);
			}, this);
	},
	//helper - changes state of selection for some item
	_select_mark:function(id,state,refresh){
		if (!refresh && !this.callEvent("onBeforeSelect",[id,state])) return false;
		
		if (state)
			this.addCss(id, "webix_selected", true);
		else
			this.removeCss(id, "webix_selected", true);

		if (refresh)
			refresh.push(id);				//if we in the mass-select mode - collect all changed IDs
		else{
			if (state)
				this._selected.push(id);		//then add to list of selected items
		else
				this._selected.remove(id);
			this._refresh_selection(id);	//othervise trigger repainting
		}
			
		return true;
	},
	//select some item
	select:function(id,preserve){
		var ctrlKey = arguments[2];
		var shiftKey = arguments[3];
		//if id not provide - works as selectAll
		if (!id) return this.selectAll();

		//allow an array of ids as parameter
		if (webix.isArray(id)){
			for (var i=0; i < id.length; i++)
				this.select(id[i], (i?1:preserve), ctrlKey, shiftKey);
			return;
		}

		webix.assert(this.data.exists(id), "Incorrect id in select command: "+id);
		
		//block selection mode
		if (shiftKey && this._selected.length)
			return this.selectAll(this._selected[this._selected.length-1],id);
		//single selection mode
		if (!ctrlKey && !preserve && (this._selected.length!=1 || this._selected[0]!=id)){
			this._silent_selection = true; //prevent unnecessary onSelectChange event
			this.unselectAll();
			this._silent_selection = false;
		}
		if (this.isSelected(id)){
			if (ctrlKey) this.unselect(id);	//ctrl-selection of already selected item
			return;
		}

		if (this._select_mark(id,true)){	//if not blocked from event
			this.callEvent("onAfterSelect",[id]);
		}
	},
	//unselect some item
	unselect:function(id){
		//if id is not provided  - unselect all items
		if (!id) return this.unselectAll();
		if (!this.isSelected(id)) return;
		
		this._select_mark(id,false);
	},
	//select all items, or all in defined range
	selectAll:function(from,to){
		var range;
		var refresh=[];
		
		if (from||to)
			range = this.data.getRange(from||null,to||null);	//get limited set if bounds defined
		else
			range = this.data.getRange();			//get all items in other case
												//in case of paging - it will be current page only
		range.each(function(obj){ 
			if (!this.data.getMark(obj.id, "webix_selected")){
				this._selected.push(obj.id);	
				this._select_mark(obj.id,true,refresh);
			}
		},this);
		//repaint self
		this._refresh_selection(refresh);
	},
	//remove selection from all items
	unselectAll:function(){
		var refresh=[];
		
		this._selected.each(function(id){
			this._select_mark(id,false,refresh);	//unmark selected only
		},this);
		
		this._selected=webix.toArray();
		this._refresh_selection(refresh);	//repaint self
	},
	//returns true if item is selected
	isSelected:function(id){
		return this._selected.find(id)!=-1;
	},
	/*
		returns ID of selected items or array of IDs
		to make result predictable - as_array can be used, 
			with such flag command will always return an array 
			empty array in case when no item was selected
	*/
	getSelectedId:function(as_array){	
		switch(this._selected.length){
			case 0: return as_array?[]:"";
			case 1: return as_array?[this._selected[0]]:this._selected[0];
			default: return ([].concat(this._selected)); //isolation
		}
	},
	getSelectedItem:function(as_array){
		var sel = this.getSelectedId(true);
		if (sel.length > 1 || as_array){
			for (var i = sel.length - 1; i >= 0; i--)
				sel[i] = this.getItem(sel[i]);
			return sel;
		} else if (sel.length)
			return this.getItem(sel[0]);
	},
	//detects which repainting mode need to be used
	_is_mass_selection:function(obj){
		 // crappy heuristic, but will do the job
		return obj.length>100 || obj.length > this.data.count/2;
	},
	_refresh_selection:function(refresh){
		if (typeof refresh != "object") refresh = [refresh];
		if (!refresh.length) return;	//nothing to repaint
		
		if (this._is_mass_selection(refresh))	
			this.data.refresh();	//many items was selected - repaint whole view
		else
			for (var i=0; i < refresh.length; i++)	//repaint only selected
				this.render(refresh[i],this.data.getItem(refresh[i]),"update");
			
		if (!this._silent_selection)	
		this.callEvent("onSelectChange",[refresh]);
	}
};

webix.ready(function(){
	webix.event(document.body,"mouseup", function(e){
		if(webix._noselect_element){
			webix.html.removeCss(webix._noselect_element,"webix_noselect");
			webix._noselect_element = null;
		}
	});
});
/*
	Behavior:DataMove - allows to move and copy elements, heavily relays on DataStore.move
	@export
		copy
		move
*/
webix.TreeDataMove={
	$init:function(){
		webix.assert(this.data, "DataMove :: Component doesn't have DataStore");
	},
	//creates a copy of the item
	copy:function(sid,tindex,tobj,details){
		details = details || {};
		details.copy = true;
		return this.move(sid, tindex, tobj, details);
	},
	_next_move_index:function(nid, next, source){
		if (next && nid){
			var new_index = this.getBranchIndex(nid);
			return new_index+(source == this && source.getBranchIndex(next)<new_index?0:1);
		}
	},
	_check_branch_child:function(parent, child){
		var t = this.data.branch[parent];
		if (t && t.length){
			for (var i=0; i < t.length; i++) {
				if (t[i] == child) return true;
				if (this._check_branch_child(t[i], child)) return true;
			}
		}
		return false;
	},
	//move item to the new position
	move:function(sid,tindex,tobj, details){
		details = details || {};
		tindex = tindex || 0;
		var new_id = details.newId || sid;
		var target_parent = details.parent || 0;
		
		tobj = tobj||this;
		webix.assert(tobj.data, "moving attempt to component without datastore");
		if (!tobj.data) return;

		if (webix.isArray(sid)){
			for (var i=0; i < sid.length; i++) {
				//increase index for each next item in the set, so order of insertion will be equal to order in the array
				var nid = this.move(sid[i], tindex, tobj, details);
				tindex = tobj._next_move_index(nid, sid[i+1], this);
			}
			return;
		}
		
		if (this != tobj || details.copy){
			new_id = tobj.data.add(tobj._externalData(this.getItem(sid),new_id), tindex, (target_parent || 0));
			if (this.data.branch[sid] && tobj.getBranchIndex){
				var temp = this.data._scheme_serialize;
				this.data._scheme_serialize = function(obj){
					var copy = webix.copy(obj);
					delete copy.$parent; delete copy.$level; delete copy.$child;
					if (tobj.data.pull[copy.id])
						copy.id = webix.uid();
					return copy;
				};
				var copy_data = { data:this.serialize(sid, true), parent:new_id };
				this.data._scheme_serialize = temp;
				tobj.parse(copy_data);
			}
			if (!details.copy)
				this.data.remove(sid);
		} else {
			//move in self
			if (sid == target_parent || this._check_branch_child(sid,target_parent)) return;

			var source = this.getItem(sid);
			var tbranch = this.data.branch[target_parent];
			if (!tbranch) 
				tbranch = this.data.branch[target_parent] = [];
			var sbranch = this.data.branch[source.$parent];

			var sindex = webix.PowerArray.find.call(sbranch, sid);
			if (tindex < 0) tindex = Math.max(tbranch.length - 1, 0);
			//in the same branch
			if (sbranch === tbranch && tindex === sindex) return; //same position

			webix.PowerArray.removeAt.call(sbranch, sindex);
			webix.PowerArray.insertAt.call(tbranch, sid, Math.min(tbranch.length, tindex));

			sbranch = this.data.branch[source.$parent];
			

			if(source.$parent && source.$parent != "0")
				this.getItem(source.$parent).$count--;

			if (target_parent && target_parent != "0"){
				var target = tobj.getItem(target_parent);
				target.$count++;
				this._set_level_rec(source, target.$level+1);
			} else 
				this._set_level_rec(source, 1);

			source.$parent = target_parent;
			tobj.data.callEvent("onDataMove", [sid, tindex, target_parent]);
		}

		this.refresh();
		return new_id;	//return ID of item after moving
	},
	_set_level_rec:function(item, value){
		item.$level = value;
		var branch = this.data.branch[item.id];
		if (branch)
			for (var i=0; i<branch.length; i++)
				this._set_level_rec(this.getItem(branch[i]), value+1);
	},
	//reaction on pause during dnd
	_drag_pause:function(id){
		if (id && !id.header) //ignore drag other header
			this.open(id);
	},
	$dropAllow:function(context){
		if (context.from != context.to) return true;
		for (var i=0; i<context.source.length; i++)
			if (context.source ==  context.target || this._check_branch_child(context.source, context.target)) return false;

		return true;
	},
	/*
		this is a stub for future functionality
		currently it just makes a copy of data object, which is enough for current situation
	*/
	_externalData:function(data,id){
		var new_data = webix.DataMove._externalData.call(this, data, id);
		delete new_data.open;
		return new_data;
	}
};



webix.TreeDataLoader = {
	$init:function(){
		this.data.attachEvent("onStoreUpdated", webix.bind(this._sync_hierarchy, this));

		// #FIXME:  constructor call chain
		//redefine methods
		this._feed_common = this._feed_commonA;
		this.loadNext = this._loadNextA;

		this.$ready.unshift(this._sync_hierarchy);
	},
	_feed_commonA:function(id, some, callback){
		var url = this.data.url;
		this.load(url+((url.indexOf("?")==-1)?"?":"&")+(this.count()?("continue=true&"):"")+"parent="+encodeURIComponent(id),[
			this._feed_callback,
			callback
		]);
	},
	//load next set of data rows
	loadBranch:function(id, callback, url){
		id = id ||0;
		this.data.url = this.data.url || url;
		if (this.callEvent("onDataRequest", [id,callback,this.data.url]) && this.data.url)
			this.data.feed.call(this, id, 0, callback);
	},
	_loadNextA:function(count, start, callback, url, now){
		webix.assert(false, "Dynamical loading not implemented");
	},
	_sync_hierarchy:function(id, data, mode){
		if (!mode || mode == "add" || mode == "delete" || mode == "branch"){
			this.data._sync_to_order(this);
		}
	}
};

webix.TreeStore = {
	name:"TreeStore",
	$init:function() {
		this._filterMode={
			//level:1,
			showSubItems:true
		};
		this.branch = { 0:[] };
		this.attachEvent("onParse", function(driver, data){
			this._set_child_scheme(driver.child);
			var parent = driver.getInfo(data)._parent;
		});
		this.attachEvent("onClearAll", webix.bind(function(){
			this._filter_branch = null;
		},this));
	},
	filterMode_setter:function(mode){
		return webix.extend(this._filterMode, mode, true);
	},
	_filter_reset:function(preserve){
		//remove previous filtering , if any
		if (this._filter_branch && !preserve){
			this.branch = this._filter_branch;
			this.order = webix.toArray(webix.copy(this.branch[0]));
			for (var key in this.branch)
				if (key != "0")	//exclude 0 - virtual root
					this.getItem(key).$count = this.branch[key].length;
			delete this._filter_branch;
		}
	},
	_filter_core:function(filter, value, preserve, filterMode){
		//for tree we have few filtering options
		//- filter leafs only
		//- filter data on specific level
		//- filter data on all levels
		//- in all cases we can show or hide empty folder
		//- in all cases we can show or hide childs for matched item
		
		//set new order of items, store original
		if (!preserve ||  !this._filter_branch){
			this._filter_branch = this.branch;
			this.branch  = webix.clone(this.branch);
		}

		this.branch[0] = this._filter_branch_rec(filter, value, this.branch[0], 1, (filterMode||{}));
	},
	_filter_branch_rec:function(filter, value, branch, level, config){
		//jshint -W041
		var neworder = [];
		
		var allow = (config.level && config.level != level);

		for (var i=0; i < branch.length; i++){
			var id = branch[i];
			var item = this.getItem(id);
			var child_run = false;
			var sub = this.branch[id];

			if (allow){
				child_run = true;
			} else if (filter(this.getItem(id),value)){
				neworder.push(id);
				// open all parents of the found item
				if (config.openParents !== false){
					var parentId = this.getParentId(id);
					while(parentId && parentId != "0"){
						this.getItem(parentId).open = 1;
						parentId = this.getParentId(parentId);
					}
				}
				//in case of of fixed level filtering - do not change child-items
				if (config.level || config.showSubItems)
					continue;
			} else {
				//filtering level, not match
				child_run = true;
			}	

			//if "filter by all levels" - filter childs
			if (allow || !config.level){ 
				if (sub){
					var newsub = this.branch[id] = this._filter_branch_rec(filter, value, sub, level+1, config);
					item.$count = newsub.length;
					if (child_run && newsub.length)
						neworder.push(id);
				}
			}
		}
		return neworder;
	},
	count:function(){
		if (this.order.length)
			return this.order.length;

		//we must return some non-zero value, or logic of selection will think that we have not data at all
		var count=0;
		this.eachOpen(function(){ count++; });
		return count;
	},
	changeId:function(old, newid){
		if (this.branch[old]){
			var branch = this.branch[newid] = this.branch[old];
			for (var i = 0; i < branch.length; i++)
				this.getItem(branch[i]).$parent = newid;
			delete this.branch[old];
		}
		var parent = this.getItem(old).$parent;
		if (parent !== "0"){
			var index = webix.PowerArray.find.call(this.branch[parent], old);
			this.branch[parent][index] = newid;
		}
		return webix.DataStore.prototype.changeId.call(this, old, newid);
	},
	clearAll:function(){
		this.branch = { 0:[] };
		webix.DataStore.prototype.clearAll.call(this);	
	},
	getPrevSiblingId:function(id){
		var order = this.branch[this.getItem(id).$parent];
		var pos = webix.PowerArray.find.call(order, id)-1;
		if (pos>=0)
			return order[pos];
		return null;
	},
	getNextSiblingId:function(id){
		var order = this.branch[this.getItem(id).$parent];
		var pos = webix.PowerArray.find.call(order, id)+1;
		if (pos<order.length)
			return order[pos];
		return null;
	},
	getParentId:function(id){
		return this.getItem(id).$parent;
	},
	getFirstChildId:function(id){
		var order = this.branch[id];
		if (order && order.length)
			return order[0];
		return null;
	},
	isBranch:function(parent){
		return !!this.branch[parent];
	},
	getBranchIndex:function(child){
		var t = this.branch[this.pull[child].$parent];
		return webix.PowerArray.find.call(t, child);
	},
	_set_child_scheme:function(parse_name){

		if (typeof parse_name == "string")
			this._datadriver_child = function(obj){
				var t = obj[parse_name];
				if (t)
					delete obj[parse_name];
				return t;
			};
		else 
			this._datadriver_child = parse_name;
	},
	_inner_parse:function(info, recs){ 
		var parent  = info._parent || 0;

		for (var i=0; i<recs.length; i++){
			//get hash of details for each record
			var temp = this.driver.getDetails(recs[i]);
			if (this._scheme_init)
				this._scheme_init(temp);
			var id = this.id(temp); 	//generate ID for the record
			this.pull[id]=temp;
			this._extraParser(temp, parent);
		}

		if (parent && parent !== "0")
			this.pull[parent].$count = recs.length;
	},
    _extraParser:function(obj, parent, level){
    	//processing top item
    	obj.$parent = parent||0;
		obj.$level = level||(parent!="0"?this.pull[parent].$level+1:1);
		
		if (!this.branch[obj.$parent])
			this.branch[obj.$parent] = [];
			if (this._filter_branch)
				this._filter_branch[obj.$parent] = this.branch[obj.$parent];

		this.branch[obj.$parent].push(obj.id);

    	var child = this._datadriver_child(obj);

    	if (obj.webix_kids){
    		return (obj.$count = -1);
    	}

    	if (!child) //ignore childless
    		return (obj.$count = 0);	

    	//when loading from xml we can have a single item instead of an array
    	if (!webix.isArray(child))
    		child = [child];
    	

    	//processing childrens
		obj.$count = child.length;
		for (var i=0; i < child.length; i++) {
			//extra processing to convert strings to objects
			var item = webix.DataDriver.json.getDetails(child[i]);
			if (this._scheme_init)
				this._scheme_init(item);
			this.pull[this.id(item)]=item;
			this._extraParser(item, obj.id, obj.$level+1);
		}
	}, 
	_sync_to_order:function(master){
		this.order = webix.toArray();
		this._sync_each_child(0, master);
	},
	_sync_each_child:function(start, master){
		var branch = this.branch[start];
		for (var i=0; i<branch.length; i++){
			var id = branch[i];
			this.order.push(id);
			if (this.pull[id].open){
				if (this.pull[id].$count == -1)
					master.loadBranch(id);
				else if (this.pull[id].$count)
					this._sync_each_child(id, master);
			}
		}
	},
	provideApi:function(target,eventable){
		var list = ["getPrevSiblingId","getNextSiblingId","getParentId","getFirstChildId","isBranch","getBranchIndex","filterMode_setter"];
		for (var i=0; i < list.length; i++)
			target[list[i]]=this._methodPush(this,list[i]);

		if (!target.getIndexById)
			webix.DataStore.prototype.provideApi.call(this, target, eventable);
	},
	getTopRange:function(){
		return webix.toArray([].concat(this.branch[0])).map(function(id){
			return this.getItem(id);
		}, this);
	},
	eachChild:function(id, functor, master, all){
		var branch = this.branch;
		if (all && this._filter_branch)
			branch = this._filter_branch;

		var stack = branch[id];
		if (stack)
			for (var i=0; i<stack.length; i++)
				functor.call((master||this), this.getItem(stack[i]));
	},
	each:function(method,master, all, id){
		this.eachChild((id||0), function(item){
			var branch = this.branch;

			method.call((master||this), item);

			if (all && this._filter_branch)
				branch = this._filter_branch;

			if (branch[item.id])
				this.each(method, master, all, item.id);
		}, this, all);
	},	
	eachOpen:function(method,master, id){
		this.eachChild((id||0), function(item){
			method.call((master||this), item);
			if (this.branch[item.id] && item.open)
				this.eachOpen(method, master, item.id);
		});
	},
	eachSubItem:function(id, functor){
		var top = this.branch[id||0];
		if (top)
			for (var i=0; i<top.length; i++){
				var key = top[i];
				if (this.branch[key]){
					functor.call(this, this.getItem(key),true);
					this.eachSubItem(key, functor);
				} else
					functor.call(this, this.getItem(key), false);
			}
	},
	_sort_core:function(sort, order){
		var sorter = this._sort._create(sort);
		for (var key in this.branch){
			var bset =  this.branch[key];
			var data = [];

			for (var i=0; i<bset.length; i++)
				data.push(this.pull[bset[i]]);

			data.sort(sorter);

			for (var i=0; i<bset.length; i++)
				data[i] = data[i].id;

			this.branch[key] = data;
		}
		return order;
	},
	add:function(obj, index, pid){
		var refresh_parent = false;

		this.branch[pid||0] = this.order = webix.toArray(this.branch[pid||0]);
		
		var parent = this.getItem(pid||0);
		if(parent){
			//when adding items to leaf item - it need to be repainted
			if (!this.branch[parent.id])
				refresh_parent = true;
			parent.$count++;	
		}
		obj.$count = 0; 
		obj.$level= (parent?parent.$level+1:1); 
		obj.$parent = (parent?parent.id:0);

		if (this._filter_branch){	//adding during filtering
			var origin = this._filter_branch[pid||0];
			//newly created branch
			if (!origin) origin = this._filter_branch[pid] = this.order;

			//branch can be shared bettwen collections, ignore such cases
			if (this.order !== origin){
				//we can't know the location of new item in full dataset, making suggestion
				//put at end by default
				var original_index = origin.length;
				//put at start only if adding to the start and some data exists
				if (!index && this.branch[pid||0].length)
					original_index = 0;

				origin = webix.toArray(origin);
				origin.insertAt(obj.id,original_index);
			}
		}

		//call original adding logic
		var result = webix.DataStore.prototype.add.call(this, obj, index);


		if (refresh_parent)
			this.refresh(pid);

		return result;
	},
	_rec_remove:function(id, inner){
		var obj = this.pull[id];
        if(this.branch[obj.id] > 0){
        	var branch = this.branch[id];
            for(var i=0;i<branch.length;i++)
                this._rec_remove(branch[i], true);
        }
        delete this.branch[id];
		if(this._filter_branch)
			delete this._filter_branch[id];
        delete this.pull[id];
		if (this._marks[id])
			delete this._marks[id];
	},
	_filter_removed:function(pull, parentId, id){
		var branch = pull[parentId];
		if (branch.length == 1 && branch[0] == id && parentId){
			delete pull[parentId];
		} else
			webix.toArray(branch).remove(id);
	},
	remove:function(id){
		webix.assert(this.exists(id), "Not existing ID in remove command"+id);
		var obj = this.pull[id];
		var parentId = (obj.$parent||0);

		if (this.callEvent("onBeforeDelete",[id]) === false) return false;
		this._rec_remove(id);
		this.callEvent("onAfterDelete",[id]);

		var parent = this.pull[parentId];
		this._filter_removed(this.branch, parentId, id);
		if (this._filter_branch)
			this._filter_removed(this._filter_branch, parentId, id);

		var refresh_parent = 0;
		if (parent){
			parent.$count--;
			if (parent.$count<=0){
				parent.$count=0;
				parent.open = 0;
				refresh_parent = 1;
			}
		}

		//repaint signal
		this.callEvent("onStoreUpdated",[id,obj,"delete"]);
		if (refresh_parent)
			this.refresh(parent.id);
	},
	/*
		serializes data to a json object
	*/
	getBranch:function(id){
		var out = [];
		var items = (this._filter_branch || this.branch)[id];
		if (items)
			for (var i = 0; i < items.length; i++) out[i] = this.pull[items[i]];

		return out;
	},
	serialize: function(id, all){
		var coll = this.branch;
		//use original collection of branches
		if (all && this._filter_branch) coll = this._filter_branch;

		var ids = this.branch[id||0];
		var result = [];
		for(var i=0; i< ids.length;i++) {
			var obj = this.pull[ids[i]];
			var rel;

			if (this._scheme_serialize){
				rel = this._scheme_serialize(obj);
				if (rel===false) continue;
			} else 
				rel = webix.copy(obj);
				
			if (this.branch[obj.id])
				rel.data = this.serialize(obj.id, all);

			result.push(rel);
		}
		return result;
	}
};


webix.TreeType={
	space:function(obj,common){
		var html = "";
		for (var i=1; i<obj.$level; i++)
			html += "<div class='webix_tree_none'></div>";
		return html;
	},
	icon:function(obj,common){
		if (obj.$count){
			if (obj.open)
				return "<div class='webix_tree_open'></div>";
			else
				return "<div class='webix_tree_close'></div>";
		} else
			return "<div class='webix_tree_none'></div>";
	},
	checkbox:function(obj, common){
		if(obj.nocheckbox)
		   return "";
        return "<input type='checkbox' class='webix_tree_checkbox' "+(obj.checked?"checked":"")+(obj.disabled?" disabled":"")+">";
	},	
	folder:function(obj, common){
		if (obj.icon)
			return "<div class='webix_tree_file webix_tree_"+obj.icon+"'></div>";

		if (obj.$count){
			if (obj.open)
				return "<div class='webix_tree_folder_open'></div>";
			else
				return "<div class='webix_tree_folder'></div>";
		}
		return "<div class='webix_tree_file'></div>";
	}
};

webix.TreeAPI = {
	open: function(id) {
		if (!id) return;
		//ignore open for leaf items
		var item = this.getItem(id);
		if (!item.$count || item.open) return;

		if (this.callEvent("onBeforeOpen",[id])){
			item.open=true;
			this.data.callEvent("onStoreUpdated",[id, 0, "branch"]);
			this.callEvent("onAfterOpen",[id]);
		}
	},
	close: function(id) {
		if (!id) return;
		var item = this.getItem(id);
		if (!item.open) return;

		if (this.callEvent("onBeforeClose",[id])){
			item.open=false;
			this.data.callEvent("onStoreUpdated",[id, 0, "branch"]);
			this.callEvent("onAfterClose",[id]);
		}
	},
	openAll: function(id){
		this.data.eachSubItem((id||0), function(obj, branch){
			if (branch)
				obj.open = true;
		});
		this.data.refresh();
	},
	closeAll: function(id){
		this.data.eachSubItem((id||0), function(obj, branch){
			if (branch)
				obj.open = false;
		});
		this.data.refresh();
	},
	_tree_check_uncheck:function(id,mode,e){
		if(this._settings.threeState)
			return this._tree_check_uncheck_3(id,(mode !== null?mode:""));

		var item = this.getItem(id);

		item.checked = (mode !== null?mode:!item.checked);
		this.callEvent("onItemCheck", [id, item.checked, e]);
	},
	isBranchOpen:function(search_id){
		if (search_id == "0") return true;

		var item = this.getItem(search_id);
		if (item.open)
			return this.isBranchOpen(item.$parent);
		return false;
	},
	getOpenItems: function() {
		var open = [];
		for (var id in this.data.branch) {
			if (this.exists(id) && this.getItem(id).open)
				open.push(id);
		}
		return open;
	},
	getState: function(){
		return {
			open: this.getOpenItems(),
			select: this.getSelectedId(true)
		};
	},
	_repeat_set_state:function(tree, open){
		var event = this.data.attachEvent("onStoreLoad", function(){
			tree.setState.call(tree,open);
			tree.data.detachEvent(event);
			tree = null;
		});
	},
	setState: function(state){
		var repeat = false;
		var dyn = false;

		if (state.open){
			this.closeAll();	
			var open = state.open;
			for (var i = 0; i < open.length; i++){
				var item = this.getItem(open[i]);
				if (item && item.$count){
					item.open=true;
					//dynamic loading
					if (item.$count == -1){
						//call the same method after data loading
						this._repeat_set_state(this, state);
						this.refresh();
						return 0;
						//end processing
					}
				}
			}
			this.refresh();
		}


		if (state.select && this.select){			
			var select = state.select;
			this.unselect();
			for (var i = 0; i < select.length; i++)
				if (this.exists(select[i]))
					this.select(select[i], true);
		}

		return 1;
	}
};

webix.TreeClick = {
	webix_tree_open:function(e, id){
		this.close(id);
		return false;
	},
	webix_tree_close:function(e, id){
		this.open(id);
		return false;
	},
	webix_tree_checkbox:function(e,id){
		this._tree_check_uncheck(id, null, e);
		return false;
	}
};

webix.TreeCollection = webix.proto({
	name:"TreeCollection",
	$init:function(){
		webix.extend(this.data, webix.TreeStore, true);
		this.data.provideApi(this,true);
	}
}, webix.TreeDataLoader, webix.DataCollection);

/*
	Behavior:DragItem - adds ability to move items by dnd
	
	dnd context can have next properties
		from - source object
		to - target object
		source - id of dragged item(s)
		target - id of drop target, null for drop on empty space
		start - id from which DND was started
*/


		



webix.DragOrder={
	_do_not_drag_selection:true,
	$drag:function(s,e){
		var html = webix.DragItem.$drag.call(this,s,e);
		if (html){
			var context = webix.DragControl.getContext(); 
			if (this.getBranchIndex)
				this._drag_order_stored_left = this._drag_order_complex?((this.getItem(context.start).$level) * 16):0;
			if (!context.fragile)
				this.addCss(context.start, "webix_transparent");
		}
		return html;
	},
	$dragPos:function(pos,e, node){
		var box = webix.html.offset(this.$view);
		var left = box.x + (this._drag_order_complex?( + box.width - webix.ui.scrollSize - 1):1);

		node.style.display = 'none';
		var html = document.elementFromPoint(left, pos.y);

		if (html != this._last_sort_dnd_node){
			var view = webix.$$(html);
			//this type of dnd is limited to the self
			if (view && view == this){
				var id = this.locate(html);
				if (id && this._translate_id)
					id = this._translate_id(id);

				var start_id = webix.DragControl.getContext().start;				
				if (id){
					if (id != this._last_sort_dnd_node){
						if (id != start_id){
							var details, index;

							if (this.getBranchIndex){
								details = { parent:this.getParentId(id) }; 
								index = this.getBranchIndex(id);
							} else {
								details = {};
								index = this.getIndexById(id);
							}

							if (this.callEvent("onBeforeDropOrder",[start_id, index, e, details])){
								this.move(start_id, index, this, details);
								this._last_sort_dnd_node = id;
							}
						}
						webix.DragControl._last = this._contentobj;
					}
				}
				else {
					id = "$webix-last";
					if (this._last_sort_dnd_node != id){
						if (!this.callEvent("onBeforeDropOrder",[start_id, -1, e, { parent: 0} ])) return;
						this._last_sort_dnd_node  = id;
					}
				}
			}
		}

		node.style.display = 'block';

		
		box.y += this._header_height;

		pos.x = this._drag_order_stored_left||box.x;
		pos.y = pos.y-18;

		if (pos.y < box.y)
			pos.y = box.y; 
		else {
			var max = box.y + this.$view.offsetHeight - 60;
			if (pos.y > max)
				pos.y = max;
		}
		//prevent normal dnd landing checking
		webix.DragControl._skip = true;
	},
	$dragIn:function(){
		return false;
	},
	$drop:function(s,t,e){
		var context = webix.DragControl.getContext();
		var id = context.start;
		this.removeCss(id, "webix_transparent");

		var index = this.getIndexById(id);
		this.callEvent("onAfterDropOrder",[id, index , e]);
		if (context.fragile)
			this.refresh();
	}
};
webix.DragItem={
	//helper - defines component's container as active zone for dragging and for dropping
	_initHandlers:function(obj, source, target){
		if (!source) webix.DragControl.addDrop(obj._contentobj,obj,true);
		if (!target) webix.DragControl.addDrag(obj._contentobj,obj);	
		
		this.attachEvent("onDragOut",function(a,b){ this.$dragMark(a,b); });
	},
	drag_setter:function(value){
		if (value){
			if (value == "order")
				webix.extend(this, webix.DragOrder, true);
			if (value == "inner")
				this._inner_drag_only = true;

			this._initHandlers(this, value == "source", value == "target");
			delete this.drag_setter;	//prevent double initialization
		}
		return value;
	},
	/*
		s - source html element
		t - target html element
		d - drop-on html element ( can be not equal to the target )
		e - native html event 
	*/
	//called when drag moved over possible target
	$dragIn:function(s,t,e){
		var id = this.locate(e) || null;
		var context = webix.DragControl._drag_context;

		//in inner drag mode - ignore dnd from other components
		if ((this._inner_drag_only || context.from._inner_drag_only) && context.from !== this) return false;

		var to = webix.DragControl.getMaster(t);
		//previous target
		var html = (this.getItemNode(id, e)||this._dataobj);
		//prevent double processing of same target
		if (html == webix.DragControl._landing) return html;
		context.target = id;
		context.to = to;

		if (this._auto_scroll_delay)
			this._auto_scroll_delay = window.clearTimeout(this._auto_scroll_delay);
		this._auto_scroll_delay = webix.delay(this._auto_scroll, this, [webix.html.pos(e), id], 250);

		if (!this.$dropAllow(context, e)  || 
			!this.callEvent("onBeforeDragIn",[context, e])){
				context.to = context.target = null;
				return null;
		}
		//mark target only when landing confirmed
		this.$dragMark(context,e);
		return html;
	},
	$dropAllow:function(){
		return true;
	},
	_drag_pause:function(id){
		//may be reimplemented in some components
		// tree for example
	},
	_auto_scroll:function(pos, id){ 
		var yscroll = 1;
		var xscroll = 0;

		var scroll = this._settings.dragscroll;
		if (typeof scroll == "string"){
			xscroll = scroll.indexOf("x") != -1;
			yscroll = scroll.indexOf("y") != -1;
		}

		var data = this._body || this.$view;
		var box = webix.html.offset(data);

		var top = box.y;
		var bottom = top + data.offsetHeight;
		var left = box.x;
		var right = left + data.offsetWidth;

		var scroll = this.getScrollState();
		var reset = false;
		var sense = 40; //dnd auto-scroll sensivity

		var context = webix.DragControl.getContext();

		//extension point
		this._drag_pause(id);

		if (yscroll){
			if (pos.y < (top + sense)){
				this.scrollTo(scroll.x, scroll.y-sense*2);
				reset = true;
			} else if (pos.y > bottom - sense){
				this.scrollTo(scroll.x, scroll.y+sense*2);
				reset = true;
			}
		}

		if (xscroll){
			if (pos.x < (left + sense)){
				this.scrollTo(scroll.x-sense*2, scroll.y);
				reset = true;
			} else if (pos.x > right - sense){
				this.scrollTo(scroll.x+sense*2, scroll.y);
				reset = true;
			}
		}


		
		if (reset && webix.DragControl._active)
			if (context && context.to === this)
				this._auto_scroll_delay = webix.delay(this._auto_scroll, this, [pos], 100);
	},
	//called when drag moved out from possible target
	$dragOut:function(s,t,n,e){ 
		var id = this.locate(e) || null;
		var context = webix.DragControl._drag_context;

		//still over previous target
		if ((context.target||"").toString() == (id||"").toString()) return null;

		if (this._auto_scroll_delay)
			this._auto_scroll_delay = window.clearTimeout(this._auto_scroll_delay);

		//unmark previous target
		context.target = context.to = null;
		this.callEvent("onDragOut",[context,e]);
		return null;
	},
	//called when drag moved on target and button is released
	$drop:function(s,t,e){ 
		if (this._auto_scroll_delay)
			this._auto_scroll_delay = window.clearTimeout(this._auto_scroll_delay);

		var context = webix.DragControl._drag_context;
		//finalize context details
		context.to = this;
		var target = this._translate_id?this._translate_id(context.target):context.target;

		if (this.getBranchIndex){
			if (target){
				context.parent = this.getParentId(target);
				context.index = this.getBranchIndex(target);
			}
		} else
			context.index = target?this.getIndexById(target):this.count();

		//unmark last target
		this.$dragMark({}, e);


		if( context.from && context.from != context.to && context.from.callEvent ){
			context.from.callEvent("onBeforeDropOut", [context,e]);
		}

		if (!this.callEvent("onBeforeDrop",[context,e])) return;
		//moving
		this._context_to_move(context,e);
		
		this.callEvent("onAfterDrop",[context,e]);
	},
	_context_to_move:function(context,e){
		webix.assert(context.from, "Unsopported d-n-d combination");
		if (context.from){	//from different component
			var details = { parent: context.parent, mode: context.pos };
			context.from.move(context.source,context.index,context.to, details);
		}
	},		
	//called when drag action started
	$drag:function(s,e){
		var id = this.locate(e);
		if (this._translate_id) id=this._translate_id(id, true);

		if (id){
			var list = [id];

			if (this.getSelectedId && !this._do_not_drag_selection){ //has selection model
				//if dragged item is one of selected - drag all selected
				var selection = this.getSelectedId(true, true);	

				if (selection && selection.length > 1 && webix.PowerArray.find.call(selection,id)!=-1){
					var hash = {}; 
					var list = [];
					for (var i=0;i<selection.length; i++)
						hash[selection[i]]=true;
					for (var i = 0; i<this.data.order.length; i++){
						var hash_id = this.data.order[i];
						if (hash[hash_id])
							list.push(hash_id);
					}
				}
			}
			//save initial dnd params
			var context = webix.DragControl._drag_context= { source:list, start:id };
			context.fragile = (this.addRowCss && webix.env.touch && ( webix.env.isWebKit || webix.env.isFF ));
			context.from = this;
			
			if (this.callEvent("onBeforeDrag",[context,e])){
				if (webix.Touch)
					webix.Touch._start_context = null;

				//set drag representation
				return context.html||this.$dragHTML(this.getItem(id), e);
			}
		}
		return null;
	},
	$dragHTML:function(obj, e){
		return this._toHTML(obj);
	},
	$dragMark:function(context, ev){
		var target = null;
		if (context.target)
			target = this._translate_id?this._translate_id(context.target):context.target;

		//touch webkit will stop touchmove event if source node removed
		//datatable can't repaint rows without repainting
		if (this._marked && this._marked != target){
			if (!context.fragile) this.removeCss(this._marked, "webix_drag_over");
			this._marked = null;
		}

		if (!this._marked && target){
			this._marked = target;
			if (!context.fragile) this.addCss(target, "webix_drag_over");
			return target;
		}
		
		if (context.to){
			return true;
		}else
			return false;
	}
};



webix.Group = {
	$init:function(){
		webix.extend(this.data, webix.GroupStore);
		//in case of plain store we need to remove store original dataset
		this.data.attachEvent("onClearAll",webix.bind(function(){
			this.data._not_grouped_order = this.data._not_grouped_pull = null;
			this._group_level_count = 0;
		},this));
	},
	group:function(config){
		this.data.ungroup(true);
		this.data.group(config);
	},
	ungroup:function(skipRender){
		this.data.ungroup(skipRender);
	}
};

webix.GroupMethods = {
	sum:function(property, data){
		data = data || this;
		var summ = 0;
		for (var i = 0; i < data.length; i++)
			summ+=property(data[i])*1;

		return summ;
	},
	min:function(property, data){
		data = data || this;
		var min = Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i])*1 < min) min = property(data[i])*1;

		return min*1;
	},
	max:function(property, data){
		data = data || this;
		var max = -Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i])*1 > max) max = property(data[i])*1;

		return max*1;
	},
	count:function(property, data){
		return data.length;
	},
	any:function(property, data){
		return property(data[0]);
	},
	string:function(property, data){
		return property.$name;
	}
};

webix.GroupStore = {
	ungroup:function(skipRender){
		if (this.getBranchIndex)
			return this._ungroup_tree.apply(this, arguments);

		if (this._not_grouped_order){
			this.order = this._not_grouped_order;
			this.pull = this._not_grouped_pull;
			this._not_grouped_pull = this._not_grouped_order = null;
		}
		if(!skipRender){
			this.callEvent("onStoreUpdated",[]);
		}

	},
	_group_processing:function(scheme){
		this.blockEvent();
		this.group(scheme);
		this.unblockEvent();
	},
	_group_prop_accessor:function(val){
		if (typeof val == "function")
			return val;
		var acc = function(obj){ return obj[val]; };
		acc.$name = val;
		return acc;
	},	
	group:function(stats){ 
		if (this.getBranchIndex)
			return this._group_tree.apply(this, arguments);

		var key = this._group_prop_accessor(stats.by);
		if (!stats.map[key])
			stats.map[key] = [key, this._any];
			
		var groups = {};
		var labels = [];
		this.each(function(data){
			var current = key(data);
			if (!groups[current]){
				labels.push({ id:current, $group:true, $row:stats.row });
				groups[current] = webix.toArray();
			}
			groups[current].push(data);
		});
		for (var prop in stats.map){
			var functor = (stats.map[prop][1]||"any");
			var property = this._group_prop_accessor(stats.map[prop][0]);
			if (typeof functor != "function"){
				webix.assert(webix.GroupMethods[functor], "unknown grouping rule: "+functor);
				functor = webix.GroupMethods[functor];
			}

			for (var i=0; i < labels.length; i++) {
				labels[i][prop]=functor.call(this, property, groups[labels[i].id]);
			}
		}
			
		this._not_grouped_order = this.order;
		this._not_grouped_pull = this.pull;
		
		this.order = webix.toArray();
		this.pull = {};
		for (var i=0; i < labels.length; i++){
			var id = this.id(labels[i]);
			this.pull[id] = labels[i];
			this.order.push(id);
		}
		
		this.callEvent("onStoreUpdated",[]);
	},
	_group_tree:function(input, parent){
		this._group_level_count = (this._group_level_count||0) + 1;

		//supports simplified group by syntax
		var stats;
		if (typeof input == "string"){
			stats = { by:this._group_prop_accessor(input), map:{} };
			stats.map[input] = [input];
		} else if (typeof input == "function"){
			stats = { by:input, map:{} };
		} else
			stats = input;
		
		//prepare
		var level;
		if (parent)
			level = this.getItem(parent).$level;
		else {
			parent  = 0;
			level = 0;
		}
		
		var order = this.branch[parent];
		var key = this._group_prop_accessor(stats.by);
		
		//run
		var topbranch = [];
		var labels = [];
		for (var i=0; i<order.length; i++){
			var data = this.getItem(order[i]);
			var current = key(data);
			var current_id = level+"$"+current;
			var ancestor = this.branch[current_id];

			if (!ancestor){
				var newitem = this.pull[current_id] = { id:current_id, value:current, $group:true, $row:stats.row};
				labels.push(newitem);
				ancestor = this.branch[current_id] = [];
				ancestor._formath = [];
				topbranch.push(current_id);
			}
			ancestor.push(data.id);
			ancestor._formath.push(data);
		}

		this.branch[parent] = topbranch;
		for (var prop in stats.map){
			var functor = (stats.map[prop][1]||"any");
			var property = this._group_prop_accessor(stats.map[prop][0]);
			if (typeof functor != "function"){
				webix.assert(webix.GroupMethods[functor], "unknown grouping rule: "+functor);
				functor = webix.GroupMethods[functor];
			}
				
			for (var i=0; i < labels.length; i++)
				labels[i][prop]=functor.call(this, property, this.branch[labels[i].id]._formath);
		}

		for (var i=0; i < labels.length; i++){
			var group = labels[i];

			if (this.hasEvent("onGroupCreated"))
				this.callEvent("onGroupCreated", [group.id, group.value, this.branch[group.id]._formath]);

			if (stats.footer){
				var id = "footer$"+group.id;
				var footer = this.pull[id] = { id:id, $footer:true, value: group.value, $level:level, $count:0, $parent:group.id, $row:stats.footer.row};
				for (var prop in stats.footer){
					var functor = (stats.footer[prop][1]||"any");
					var property = this._group_prop_accessor(stats.footer[prop][0]);
					if (typeof functor != "function"){
						webix.assert(webix.GroupMethods[functor], "unknown grouping rule: "+functor);
						functor = webix.GroupMethods[functor];
					}

					footer[prop]=functor.call(this, property, this.branch[labels[i].id]._formath);
				}
				
				this.branch[group.id].push(footer.id);
				this.callEvent("onGroupFooter", [footer.id, footer.value, this.branch[group.id]._formath]);
			}

			delete this.branch[group.id]._formath;
		}
			

		this._fix_group_levels(topbranch, parent, level+1);
			
		this.callEvent("onStoreUpdated",[]);
	},
	_ungroup_tree:function(skipRender, parent, force){
		//not grouped
		if (!force && !this._group_level_count) return;
		this._group_level_count = Math.max(0, this._group_level_count -1 );

		parent = parent || 0;
		var order = [];
		var toporder = this.branch[parent];
		for (var i=0; i<toporder.length; i++){
			var id = toporder[i];
			var branch = this.branch[id];
			if (branch)
				order = order.concat(branch);

			delete this.pull[id];
			delete this.branch[id];
		}

		this.branch[parent] = order;
		for (var i = order.length - 1; i >= 0; i--) {
			if (this.pull[order[i]].$footer)
				order.splice(i,1);
		}
		this._fix_group_levels(order, 0, 1);

		if (!skipRender)
			this.callEvent("onStoreUpdated",[]);
	},
	_fix_group_levels:function(branch, parent, level){
		if (parent)
			this.getItem(parent).$count = branch.length;

		for (var i = 0; i < branch.length; i++) {
			var item = this.pull[branch[i]];
			item.$level = level;
			item.$parent = parent;
			var next = this.branch[item.id];
			if (next)
				this._fix_group_levels(next, item.id, level+1);
		}
	}
};
webix.clipbuffer = {

	_area: null,
	_blur_id: null,
	_ctrl: 0,

	/*! create textarea or returns existing
	 **/
	init: function() {
		// returns existing textarea
		if (this._area !== null)
			return this._area;

		webix.destructors.push(this);
		// creates new textarea
		this._area = document.createElement('textarea');
		this._area.className = "webix_clipbuffer";
		this._area.setAttribute("webixignore", 1);
		document.body.appendChild(this._area);

		webix.event(document.body, 'keydown', webix.bind(function(e){
			var key = e.keyCode;
			var ctrl = !!(e.ctrlKey || e.metaKey);
			if (key === 86 && ctrl)
				webix.delay(this._paste, this, [], 100);
		}, this));

		return this._area;
	},
	destructor: function(){
		this._area = null;
	},
	/*! set text into buffer
	 **/
	set: function(text) {
		this.init();
		this._area.value = text;
		this.focus();
	},
	/*! select text in textarea
	 **/
	focus: function() {
		this.init();
		this._area.focus();
		this._area.select();
	},
	/*! process ctrl+V pressing
	 **/
	_paste: function() {
		var text = this._area.value;
		var last_active = webix.UIManager.getFocus();
		if (last_active) {
			last_active.callEvent("onPaste", [text]);
			this._area.select();
		}
	}
};


webix.CopyPaste = {
	clipboard_setter: function(value) {
		if (value === true || value === 1) value = "modify";
		this.attachEvent("onAfterSelect", function(id) {
			var item = this.getItem(id);
			var text = this.type.templateCopy(item);
			webix.clipbuffer.set(text, this);
			webix.clipbuffer.focus();
		});
		this.attachEvent("onPaste", function(text) {
			if (!webix.isUndefined(this._paste[this._settings.clipboard]))
				this._paste[this._settings.clipboard].call(this, text);
		});
		this.attachEvent("onFocus", function() {
			webix.clipbuffer.focus();
		});
		return value;
	},
	_paste: {
		// insert new item with pasted value
		insert: function(text) {
			this.add({ value: text });
		},
		// change value of each selected item
		modify: function(text) {
			var sel = this.getSelectedId(true);
			for (var i = 0; i < sel.length; i++) {
				this.getItem(sel[i]).value = text;
				this.refresh(sel[i]);
			}
		},
		// do nothing
		custom: function(text) {}
	},
	templateCopy_setter: function(value) {
		this.type.templateCopy = webix.template(value);
	},
	type:{
		templateCopy: function(item) {
			return this.template(item);
		}
	}
};


webix.KeysNavigation = {
    _navigation_helper:function(mode){
        return function(view, e){
            var tag = (e.srcElement || e.target);

            //ignore clipboard listener
            if (!tag.getAttribute("webixignore")){
                //ignore hotkeys if focus in the common input
                //to allow normal text edit operations
                var name = tag.tagName;
                if (name == "INPUT" || name == "TEXTAREA" || name == "SELECT") return true;
            }

            if (view && view.moveSelection && view.config.navigation && !view._in_edit_mode)
                return view.moveSelection(mode, e.shiftKey);
            return true;
        };
    },
    moveSelection:function(mode, shift){
        //get existing selection
        var selected = this.getSelectedId(true);
        if (selected.length == 1){  //if we have a selection
            selected = selected[0];

            if (mode == "left" && this.close)
                return this.close(selected);
            if (mode == "right" && this.open)
                return this.open(selected);
            else if (mode == "top") {
                selected = this.getFirstId();
            } else if (mode == "bottom") {
                selected = this.getLastId();
            } else if (mode == "up" || mode == "left" || mode == "pgup") {
                var index = this.getIndexById(selected);
                var step = mode == "pgup" ? 10 : 1;
                selected = this.getIdByIndex(Math.max(0, index-step));
            } else if (mode == "down" || mode == "right" || mode == "pgdown") {
                var index = this.getIndexById(selected);
                var step = mode == "pgdown" ? 10 : 1;
                selected = this.getIdByIndex(Math.min(this.count()-1, index+step));
            } else {
                webix.assert(false, "Not supported selection moving mode");
                return;
            }

            this.showItem(selected);
            this.select(selected);
        }
        return false;
    },
    navigation_setter:function(value){
        //using global flag to apply hotkey only once
        if (value && !webix.UIManager._global_nav_grid_hotkeys){
            webix.UIManager._global_nav_grid_hotkeys = true;
            //hotkeys will react on any component but will not work in edit mode
            //you can define moveSelection method to handle navigation keys
            webix.UIManager.addHotKey("up",         this._navigation_helper("up"));
            webix.UIManager.addHotKey("down",       this._navigation_helper("down"));
            webix.UIManager.addHotKey("shift+up",   this._navigation_helper("up"));
            webix.UIManager.addHotKey("shift+down", this._navigation_helper("down"));
            webix.UIManager.addHotKey("shift+right",   this._navigation_helper("right"));
            webix.UIManager.addHotKey("shift+left", this._navigation_helper("left"));
            webix.UIManager.addHotKey("pageup", 	this._navigation_helper("pgup"));
            webix.UIManager.addHotKey("pagedown",   this._navigation_helper("pgdown"));
            webix.UIManager.addHotKey("home", 	    this._navigation_helper("top"));
            webix.UIManager.addHotKey("end", 		this._navigation_helper("bottom"));
            webix.UIManager.addHotKey("right", 	    this._navigation_helper("right"));
            webix.UIManager.addHotKey("left",		this._navigation_helper("left"));

        }

        return value;
    }
};



webix.protoUI({
	name:"tree",
	defaults:{
		scroll:"a"
	},
	$init:function(){
		this._viewobj.className += " webix_tree";

		//map API of DataStore on self
		webix.extend(this.data, webix.TreeStore, true);
		webix.extend(this.on_click, webix.TreeClick);
		this.attachEvent("onAfterRender", this._refresh_scroll);
		this.attachEvent("onPartialRender", this._refresh_scroll);
		this.data.provideApi(this,true);
	},
	//attribute , which will be used for ID storing
	_id:"webix_tm_id",
	//supports custom context menu
	on_context:{},
	on_dblclick:{
		webix_tree_checkbox:function(){
			if(this.on_click.webix_tree_checkbox)
				return this.on_click.webix_tree_checkbox.apply(this,arguments);
		}
	},
	//css class to action map, for onclick event
	on_click:{
		webix_tree_item:function(e,id){
			if(this._settings.activeTitle){
				var item = this.getItem(id);
				if(item.open)
					this.close(id);
				else
					this.open(id);
			}
			if (this._settings.select){
				if (this._settings.select=="multiselect" || this._settings.multiselect){
					if (this._settings.multiselect == "level"){
						//allow only selection on the same level
						var select = this.getSelectedId(true)[0];
						if (select && this.getParentId(id) != this.getParentId(select)) 
							return;
					}
					this.select(id, false, (e.ctrlKey || e.metaKey || (this._settings.multiselect == "touch")), e.shiftKey); 	//multiselection
				} else
					this.select(id);
			}
		}
	},
	_paste: {
		// insert new item with pasted value
		insert: function(text) {
			var parent = this.getSelectedId() ||'0' ;
			this.add({ value: text }, null, parent);
		},
		// change value of each selected item
		modify: function(text) {
			var sel = this.getSelectedId(true);
			for (var i = 0; i < sel.length; i++) {
				this.getItem(sel[i]).value = text;
				this.refresh(sel[i]);
			}
		},
		// do nothing
		custom: function(text) {}
	},
	_drag_order_complex:true,
	$dragHTML:function(obj){
		return "<div class='borderless'>"+this.type.template(obj, this.type)+"</div>";
	},
	
	//css class to action map, for dblclick event
	type:webix.extend({
		//normal state of item
		template:function(obj,common){
			var template = common["template"+obj.level]||common.templateCommon;
			return template.apply(this, arguments);
		},
		classname:function(obj, common, marks){
			var css = "webix_tree_item";

			if (obj.$css){
				if (typeof obj.$css == "object")
					obj.$css = webix.html.createCss(obj.$css);
				css += " "+obj.$css;
			}
			if (marks && marks.$css)
				css += " "+marks.$css;

			return css;
		},
		templateCommon:webix.template("{common.icon()} {common.folder()} <span>#value#</span>"),
		templateStart:webix.template('<div webix_tm_id="#id#" class="{common.classname()}">'),
		templateEnd:webix.template("</div>"),
		templateCopy: webix.template("#value#")
	}, webix.TreeType)
}, webix.AutoTooltip, webix.Group, webix.TreeAPI, webix.DragItem, webix.TreeDataMove, webix.SelectionModel, webix.KeysNavigation, webix.MouseEvents, webix.Scrollable, webix.TreeDataLoader, webix.ui.proto, webix.TreeRenderStack, webix.CopyPaste, webix.EventSystem);

webix.TreeStateCheckbox = {
	_init_render_tree_state: function(){
		if (this._branch_render_supported){
			var old_render = this.render;
			this.render = function(id,data,mode){
				var updated = old_render.apply(this,arguments);

				if(this._settings.threeState && updated && data != "checkbox")
					this._setThirdState.apply(this,arguments);
			};
			this._init_render_tree_state=function(){};
		}
	},
	threeState_setter:function(value){
		if (value)
			this._init_render_tree_state();
		return value;
	},
	_setThirdState:function(id){
		var i,leaves,parents,checkedParents,tree;
		parents = [];
		tree = this;

		/*if item was removed*/
		if(id&&!tree.data.pull[id]){
			id = 0;
		}
		/*sets checkbox states*/
		/*if branch or full reloading*/
		if(!id||tree.data.pull[id].$count){
			leaves = this._getAllLeaves(id);
			leaves.sort(function(a,b){
				return tree.data.pull[b].$level - tree.data.pull[a].$level;
			});
			for(i=0;i < leaves.length;i++){
				if(!i||tree.data.pull[leaves[i]].$parent!=tree.data.pull[leaves[i-1]].$parent)
					parents = parents.concat(tree._setParentThirdState(leaves[i]));
			}
		}
		else{
			/*an item is a leaf */
			parents = parents.concat(tree._setParentThirdState(id));
		}

		checkedParents = {};
		for(i=0;i<parents.length;i++){
			if(!checkedParents[parents[i]]){
				checkedParents[parents[i]] = 1;
				this._setCheckboxIndeterminate(parents[i]);
			}
		}

		tree = null;
	},
	_setCheckboxIndeterminate:function(id){
		var chElem, elem;
		elem = this.getItemNode(id);
		if(elem){
			this.render(id,"checkbox","update");
			/*needed to get the new input obj and to set indeterminate state*/
			if(this.getItem(id).indeterminate){
				elem = this.getItemNode(id);
				chElem = elem.getElementsByTagName("input")[0];
				if(chElem)
					chElem.indeterminate = this.getItem(id).indeterminate;
			}
		}
	},
	_setParentThirdState:function(itemId){
		//we need to use dynamic function creating
		//jshint -W083:true

		var checked, checkedCount,indeterminate, parentId,result,tree,unsureCount,needrender;
		parentId = this.getParentId(itemId);
		tree = this;
		result = [];
		while(parentId && parentId != "0"){
			unsureCount = 0;
			checkedCount = 0;
			this.data.eachChild(parentId,function(obj){
				if(obj.indeterminate){
					unsureCount++;
				}
				else if(obj.checked){
					checkedCount++;
				}
			});

			checked = indeterminate = needrender = false;
			
			var item = this.getItem(parentId);
			if(checkedCount==item.$count){
				checked = true;
			}
			else if(checkedCount>0||unsureCount>0){
				indeterminate = true;
			}
			

			//we need to reset indeterminate in any case :(
			if (indeterminate || indeterminate != item.indeterminate)
				needrender = true;
			item.indeterminate = indeterminate;
			if (item.checked != checked)
				needrender = true;
			item.checked = checked;

			if (needrender){
				result.push(parentId);
				parentId = this.getParentId(parentId);
			} else 
				parentId = 0;

			

		}
		return result;
	},
	/*get all checked items in tree*/
	getChecked:function(){
		var result=[];
		var tree = this;
		this.data.eachSubItem(0,function(obj){
			if (tree.isChecked(obj.id))
				result.push(obj.id);
		});
		return result;
	},
	_tree_check_uncheck_3:function(id, mode){
		var item = this.getItem(id);
		if(item){
			if (mode === "") 
				mode = !item.checked;
			if(item.checked != mode || item.indeterminate){
				item.checked = mode;
				this._correctThreeState(id);
				var parents = this._setParentThirdState(id);
				if (this._branch_render_supported && parents.length < 5){
					for (var i=0; i<parents.length; i++)
						this._setCheckboxIndeterminate(parents[i]);
				} else
					this.refresh();
				this.callEvent("onItemCheck", [id, mode]);
			}
		}
	},
	/*set checked state for item checkbox*/
	checkItem:function(id){
		this._tree_check_uncheck(id, true);
		this.updateItem(id);
	},
	/*uncheckes an item checkbox*/
	uncheckItem:function(id){
		this._tree_check_uncheck(id, false);
		this.updateItem(id);
	},
	_checkUncheckAll: function(id,mode,all){
		var method = mode?"checkItem":"uncheckItem";
		if(!id)
			id = 0;
		else
			this[method](id);
		if(this._settings.threeState){
			if(!id)
				this.data.eachChild(0,function(item){
					this[method](item.id);
				},this,all);
		}
		else
			this.data.each(function(item){
				this[method](item.id);
			},this,all,id);

	},
	/*checkes checkboxes of all items in a branch/tree*/
	checkAll: function(id, all){
		this._checkUncheckAll(id,true,all);

	},
	/*uncheckes checkboxes of all items in a branch/tree*/
	uncheckAll: function(id, all){
		this._checkUncheckAll(id,false,all);
	},
	_correctThreeState:function(id){
		var i,leaves,state;
		var item = this.getItem(id);

		item.indeterminate = false;
		state = item.checked;

		this.data.eachSubItem(id, function(child){
			child.indeterminate = false;
			child.checked = state;
		});
		
		if(this._branch_render_supported && this.isBranchOpen(item.$parent)){ //for tree-render only
			this.render(id,0,"branch");
		}
	},
	/*returns checked state of item checkbox*/
	isChecked:function(id){
		return this.getItem(id).checked;
	},
	/*gets all leaves in a certain branch (in the whole tree if id is not set)*/
	_getAllLeaves:function(parentId){
		var result = [];
		this.data.eachSubItem(parentId, function(obj, branch){
			if (!branch)
				result.push(obj.id);
		});
		return result;
	}	
};

if (webix.ui.tree)
	webix.extend(webix.ui.tree, webix.TreeStateCheckbox, true);
webix.type(webix.ui.tree, {
	name:"lineTree",
	css:"webixLineTree",
	icon:function(obj, common){
		var html = "";
		var open = "";
		for (var i=1; i<=obj.$level; i++){
			if (i==obj.$level)
				var open = (obj.$count?(obj.open?'webix_tree_open ':'webix_tree_close '):'webix_tree_none ');

			var icon = this._icon_src(obj, common, i);
			if (icon)
				html+="<div class='"+open+" webix_tree_img webix_tree_"+icon+"'></div>";
		}
		return html;
	},
	_icon_src:function(obj, common, level){
		var lines = common._tree_branch_render_state; 
		var tree = webix.TreeRenderStack._obj;
		if (lines === 0 && tree){
			//we are in standalone rendering 
			//need to reconstruct rendering state
			var lines_level = obj.$level;
			var branch_id = obj.id;

			lines = [];
			while (lines_level){
				var parent_id = tree.getParentId(branch_id);
				var pbranch = tree.data.branch[parent_id];
				if (pbranch[pbranch.length-1] == branch_id)
					lines[lines_level] = true;	

				branch_id = parent_id;
				lines_level--;
			}

			//store for next round
			common._tree_branch_render_state = lines;
		}
		if (!lines)
			return 0;
		//need to be replaced with image urls
		if (level == obj.$level){
			var mode = 3; //3-way line
			if (!obj.$parent){ //top level
				if (obj.$index === 0)
					mode = 4; //firts top item
			}
			if (lines[obj.$level])
				mode = 2;

			if (obj.$count){
				if (obj.open)
					return "minus"+mode;
				else
					return "plus"+mode;
			} else
				return "line"+mode;
		} else {
			if (!lines[level])
				return "line1";
			return "blank";
		}
	}
});



 	
 




/*
    UI: navigation control
*/
webix.NavigationButtons = {
	_renderPanel:function(){
		webix.html.remove(this._navPanel);


		this._navPanel = webix.html.create("DIV",{
			"class":"webix_nav_panel "+"webix_nav_panel_"+this._settings.navigation.type,
			"style": "z-index:"+webix.ui.zIndex()+";"
		},"");

		this._viewobj.appendChild(this._navPanel);


		this._renderNavItems();
		this._renderNavButtons();
	    this._setLinkEventHandler();
	},
	_setLinkEventHandler: function(){
		var h = [];
		if(this._navPanel)
			h[0] = webix.event(this._navPanel,"click", webix.bind(function(e){
				var elem = (e.srcElement || e.target);
				var found = false;
				while(elem != this._navPanel && !found){
					var bindId = elem.getAttribute(this._linkAttr);
					if(bindId){
						found = true;
						this._showPanelBind(bindId);
					}
					elem = elem.parentNode;
				}
			},this));
		if(this._prevNavButton)
			h[1] = webix.event(this._prevNavButton,"click", webix.bind(function(e){
				this._showNavItem(-1);
			},this));
		if(this._nextNavButton)
			h[1] = webix.event(this._nextNavButton,"click", webix.bind(function(e){
				this._showNavItem(1);
			},this));
		this.attachEvent("onDestruct", function(){
			for(var i=0;i< h.length; i++){
				this.detachEvent(h[i]);
			}
			h = null;
		});
	},
	_showNavItem: function(inc){
		if(this._cells){
			var index = this._active_cell + inc;
			if(index >= this._cells.length || index < 0){
				index = (index < 0?this._cells.length-1:0);
			}
			this.setActiveIndex(index);
		}
	},
	_showPanelBind: function(id){
		if(this._cells)
			webix.$$(id).show();
	},
	_renderNavItems:function(){
		var item, config;
		config = this._settings.navigation;
		if(config.items){
			this._linkAttr = config.linkAttr || "bind_id";

			if(!this._navPanel)
				this._renderPanel();
			else
				this._clearPanel();

			var data = (this._cells?this._cells:this.data.order);
			if(data.length>1){
				for (var i=0; i < data.length; i++){

					item = webix.html.create("DIV",{
						"class":"webix_nav_item webix_nav_"+(i==this._active_cell?"active":"inactive")
					},"<div></div>");
					var id = this._cells?this._cells[i]._settings.id:data[i];
					if(id)
						item.setAttribute(this._linkAttr, id);
					this._navPanel.appendChild(item);
				}


			}
		}
	},
	_clearPanel:function(){
		if (this._navPanel){
			var coll = this._navPanel.childNodes;
			for (var i = coll.length - 1; i >= 0; i--)
				webix.html.remove(coll[i]);
		}
	},
	_renderNavButtons: function(){
		var item, config;
		config = this._settings.navigation;
		if(config.buttons){

			if(this._prevNavButton)
				webix.html.remove(this._prevNavButton);
			if(this._prevNavButton)
				webix.html.remove(this._nextNavButton);

			var zIndex = webix.ui.zIndex();
			this._prevNavButton = webix.html.create(
				"DIV",
				{
					"class":"webix_nav_button_"+config.type+" webix_nav_button_prev ",
					"style":"z-index:"+zIndex+";"
				},
				"<div class=\"webix_nav_button_inner\"></div>"
			);
			this._viewobj.appendChild(this._prevNavButton);

			this._nextNavButton = webix.html.create(
				"DIV",
				{
					"class":"webix_nav_button_"+config.type+" webix_nav_button_next ",
					"style":"z-index:"+zIndex+";"
				},
				"<div class=\"webix_nav_button_inner\"></div>"
			);
			this._viewobj.appendChild(this._nextNavButton);
		}
	}
};








webix.protoUI({
	name:"list",
	_listClassName : "webix_list",
	$init:function(config){ 
		webix.html.addCss(this._viewobj, this._listClassName + (((config.layout||this.defaults.layout) == "x")?"-x":"") );
		this.data.provideApi(this,true);

		this._auto_resize = webix.bind(this._auto_resize, this);
		this.data.attachEvent("onStoreLoad", this._auto_resize);
		this.data.attachEvent("onStoreUpdated", this._auto_resize);
		this.data.attachEvent("onSyncApply", this._auto_resize);
		this.attachEvent("onAfterRender", this._correct_width_scroll);
	},
	$dragHTML:function(obj, e){
		if (this._settings.layout == "y" && this.type.width == "auto"){
			this.type.width = this._content_width;
			var node = this._toHTML(obj);
			this.type.width = "auto";
			return node;
		}
		return this._toHTML(obj);
	},
	defaults:{
		select:false, 
		scroll:true,
		layout:"y"
	},
	_id:"webix_l_id",
	on_click:{
		webix_list_item:function(e,id){
			if (this._settings.select){
                this._no_animation = true;
				if (this._settings.select=="multiselect"  || this._settings.multiselect)
					this.select(id, false, (e.ctrlKey || e.metaKey || (this._settings.multiselect == "touch")), e.shiftKey); 	//multiselection
				else
					this.select(id);
                this._no_animation = false;
			}
		}
	},
	on_dblclick:{
	},
	getVisibleCount:function(){
		return Math.floor(this._content_height / this.type.height);
	},
	_auto_resize:function(){
		if (this._settings.autoheight || this._settings.autowidth)
			this.resize();
	},
	_auto_height_calc:function(count){
		var value = this.data.$pagesize||this.count();

		this._onoff_scroll(count && count < value);
		if (this._settings.autoheight && value < (count||Infinity) ) 
			count = value;
		return Math.max(this.type.height * count,this._settings.minHeight||0);
	},
	_auto_width_calc:function(count){
		var value = this.data.$pagesize||this.count();

		this._onoff_scroll(count && count < value);
		if (this._settings.autowidth && value < (count||Infinity) ) 
			count = value;

		return (this.type.width * count); 
	},
	_correct_width_scroll:function(){
		if (this._settings.layout == "x")
			this._dataobj.style.width = (this.type.width != "auto") ? (this.type.width * this.count() + "px") : "auto";
	},
	$getSize:function(dx,dy){
		if (this._settings.layout == "y"){
			if (this.type.width!="auto")
				this._settings.width = this.type.width + (this._scroll_y?webix.ui.scrollSize:0);
			if (this._settings.yCount || this._settings.autoheight)
				this._settings.height = this._auto_height_calc(this._settings.yCount)||1;
		}
		else {
			if (this.type.height!="auto")
				this._settings.height = this.type.height + (this._scroll_x?webix.ui.scrollSize:0);
			if (this._settings.xCount || this._settings.autowidth)
				this._settings.width = this._auto_width_calc(this._settings.xCount)||1;
		}
		return webix.ui.view.prototype.$getSize.call(this, dx, dy);
	},
	$setSize:function(){
        webix.ui.view.prototype.$setSize.apply(this, arguments);
	},
	type:{
		css:"",
		widthSize:function(obj, common){
			return common.width+(common.width>-1?"px":"");
		},
		heightSize:function(obj, common){
			return common.height+(common.height>-1?"px":"");
		},
		classname:function(obj, common, marks){
			var css = "webix_list_item";
			if (obj.$css){					
				if (typeof obj.$css == "object")
					obj.$css = webix.html.createCss(obj.$css);
				css += " "+obj.$css;
			}
			if (marks && marks.$css)
				css += " "+marks.$css;

			return css;
		},
		template:function(obj){
			return (obj.icon?("<span class='webix_icon fa-"+obj.icon+"'></span> "):"") + obj.value + (obj.badge?("<div class='webix_badge'>"+obj.badge+"</div>"):"");
		},
		width:"auto",
		templateStart:webix.template('<div webix_l_id="#id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden;">'),
		templateEnd:webix.template("</div>")
	},
	$skin:function(){
		this.type.height = webix.skin.$active.listItemHeight;
	}
}, webix.KeysNavigation, webix.DataMove, webix.DragItem, webix.MouseEvents, webix.SelectionModel, webix.Scrollable, webix.ui.proto, webix.CopyPaste);

webix.protoUI({
	name:"grouplist",
	defaults:{
		animate:{
		}
	},
	_listClassName : "webix_grouplist",
	$init:function(){
		webix.extend(this.data, webix.TreeStore, true);
		//needed for getRange
		this.data.count = function(){ return this.order.length; };
		this.data.provideApi(this,true);
		this.data.attachEvent("onClearAll", webix.bind(this._onClear, this));
		this._onClear();
	},
	_onClear:function(){
		this._nested_cursor = [];
		this._nested_chain = [];
	},
	$setSize:function(){
        if (webix.ui.view.prototype.$setSize.apply(this, arguments)){
	        //critical for animations in group list
	        this._dataobj.style.width = this._content_width;
	    }
	},	
	on_click:{
		webix_list_item:function(e,id){
			if (this._in_animation) {
                return false;
            }

			for (var i=0; i < this._nested_chain.length; i++){
				if (this._nested_chain[i] == id){ //one level up
					for (var j=i; j < this._nested_chain.length; j++) {
						this.data.getItem(this._nested_chain[j]).$template="";
					}
					if (!i){ //top level
						this._nested_cursor = this.data.branch[0];
						this._nested_chain = [];
					} else {
						this._nested_cursor= this.data.branch[this._nested_chain[i-1]];
						this._nested_chain.splice(i);
					}
                    this._is_level_down = false;
					return this.render();
				}
			}

			var obj = this.getItem(id);
			if (obj.$count){	//one level down
                this._is_level_down = true;
				this._nested_chain.push(id);
				obj.$template = "Back";
				this._nested_cursor = this.data.branch[obj.id];
				return this.render();
			} else {
				if (this._settings.select){
                    this._no_animation = true;
					if (this._settings.select=="multiselect" || this._settings.multiselect)
						this.select(id, false, ((this._settings.multiselect == "touch") || e.ctrlKey || e.metaKey), e.shiftKey); 	//multiselection
					else
						this.select(id);
                    this._no_animation = false;
				}		
			}
		}
	},
    getOpenState:function(){
        return {parents:this._nested_chain,branch:this._nested_cursor};
    },
	render:function(id,data,type,after){
		var i, lastChain;

		//start filtering processing=>
		this._nested_chain = webix.copy(this._nested_chain);
		this._nested_cursor = webix.copy(this._nested_cursor);

		if(this._nested_chain.length){
			for(i = 0;i<this._nested_chain.length;i++){
				if(!this.data.branch[this._nested_chain[i]]){
					this._nested_chain.splice(i,1);
					i--;
				}
			}
		}
		lastChain =  (this._nested_chain.length?this._nested_chain[this._nested_chain.length-1]:0);
		this._nested_cursor = webix.copy(this.data.branch[lastChain]) ;

		if(!this._nested_cursor.length&&this._nested_chain.length){
			this._nested_cursor =  [lastChain];
			this._nested_chain.pop();
		}
		//<= end filtering processing

		if (this._in_animation) {
            return webix.delay(this.render, this, arguments, 100);
        }        
        for (i=0; i < this._nested_cursor.length; i++)
        	this.data.getItem(this._nested_cursor[i]).$template = "";

		if (!this._nested_cursor.length)
            this._nested_cursor = this.data.branch[0];

		this.data.order = webix.toArray([].concat(this._nested_chain).concat(this._nested_cursor));
			
        if (this.callEvent("onBeforeRender",[this.data])){
            if(this._no_animation || !this._dataobj.innerHTML || !(webix.animate.isSupported() && this._settings.animate) || (this._prev_nested_chain_length == this._nested_chain.length)) { // if dataobj is empty or animation is not supported
				webix.RenderStack.render.apply(this, arguments);
            }
            else {
                //getRange - returns all elements
                if (this.callEvent("onBeforeRender",[this.data])){

                    if(!this._back_scroll_states)
                        this._back_scroll_states = [];

					var next_div = this._dataobj.cloneNode(false);
					next_div.innerHTML = this.data.getRange().map(this._toHTML,this).join("");

					var aniset = webix.extend({}, this._settings.animate);
					aniset.direction = (this._is_level_down)?'left':'right';

					/*scroll position restore*/
					var animArr = [webix.clone(aniset),webix.clone(aniset)];
					if(this._is_level_down){
						this._back_scroll_states.push(this.getScrollState());
						if(webix.Touch&&webix.Touch.$active){
							animArr[0].y = 0;
							animArr[1].y = - this.getScrollState().y;
						}
					}
					else{
						var getScrollState = this._back_scroll_states.pop();
						if(webix.Touch&&webix.Touch.$active){
							animArr[0].y = -getScrollState.y;
							animArr[1].y = - this.getScrollState().y;
						}
					}

					var line = webix.animate.formLine(
						next_div,
						this._dataobj,
						aniset
					);

					/*keeping scroll position*/
					if(webix.Touch&&webix.Touch.$active)
						webix.Touch._set_matrix(next_div, 0,this._is_level_down?0:animArr[0].y, "0ms");

					aniset.master = this;
					aniset.callback = function(){
						this._dataobj = next_div;

						/*scroll position restore*/
						if(!this._is_level_down){
							if(webix.Touch&&webix.Touch.$active){
								webix.delay(function(){
									webix.Touch._set_matrix(next_div, 0,animArr[0].y, "0ms");
								},this);
							} else if (getScrollState) 
								this.scrollTo(0,getScrollState.y);
						}
						else if(!(webix.Touch&&webix.Touch.$active)){
							this.scrollTo(0,0);
						}

						webix.animate.breakLine(line);
						aniset.master = aniset.callback = null;
						this._htmlmap = null; //clear map, it will be filled at first getItemNode
						this._in_animation = false;
						this.callEvent("onAfterRender",[]);
					};
					
					this._in_animation = true;
					webix.animate(line, animArr);
                }
            }
            this._prev_nested_chain_length = this._nested_chain.length;
        }
	},
	templateBack_setter:function(config){
		this.type.templateBack = webix.template(config);
	},
	templateItem_setter:function(config){
		this.type.templateItem = webix.template(config);
	},
	templateGroup_setter:function(config){
		this.type.templateGroup = webix.template(config);
	},
	type:{
		template:function(obj, common){
			if (obj.$count)
				return common.templateGroup(obj, common);
			return common.templateItem(obj, common);
		},
		css:"group",
		classname:function(obj, common, marks){

			return "webix_list_item webix_"+(obj.$count?"group":"item")+(obj.$template?"_back":"")+((marks&&marks.webix_selected)?" webix_selected ":"")+ (obj.$css?obj.$css:"");
		},
		templateStart:webix.template('<div webix_l_id="#id#" class="{common.classname()}" style="width:{common.width}px; height:{common.height}px; padding:{common.padding}px; margin:{common.margin}px; overflow:hidden;">'),
		templateBack:webix.template("#value#"),
		templateItem:webix.template("#value#"),
		templateGroup:webix.template("#value#"),
        templateEnd:function(obj, common){
            var html = '';
            if(obj.$count) html += "<div class='webix_arrow_icon'></div>";
            html += "</div>";
            return html;
        }
	},
	showItem:function(id){
		var obj, parent;
		if(id){
			obj = this.getItem(id);
			parent = obj.$parent;
			
			if (obj.$count)
				parent = obj.id;
		}
		this._nested_cursor = this.data.branch[parent||0];
		this._nested_chain=[];
				
		//build _nested_chain
		while(parent){
			this.getItem(parent).$template = "Back";
			this._nested_chain.unshift(parent);
			parent = this.getItem(parent).$parent;
		} 
		
		//render
		this._no_animation = true;
		this.render();
		this._no_animation = false;
		
		//scroll if necessary
		webix.RenderStack.showItem.call(this,id);
	}
}, webix.Group, webix.ui.list );
webix.type(webix.ui.grouplist,{});


webix.protoUI({
	name:"unitlist",
	_id:"webix_item_id",
	uniteBy_setter: webix.template,
	sort_setter: function(config){
		if(typeof(config)!="object")
			config={};
		this._mergeSettings(config,{
			dir:"asc",
			as:"string"
		});
		return config;
	},
   	render:function(id,data,type,after){
		var config = this._settings;
		if (!this.isVisible(config.id))
			return;
		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+config.id);
		if(!config.uniteBy){
			if (webix.debug_render){
				webix.log("uniteBy is undefined");
			}
			return false;
		}
		if (id){
			var cont = this.getItemNode(id); //get html element of updated item
            if(cont&&type=="update"&&(this._settings.uniteBy.call(this,data)==this.getItem(id).$unitValue)){
                var t = this._htmlmap[id] = this._toHTMLObject(data);
				webix.html.insertBefore(t, cont);
				webix.html.remove(cont);
				return;
			}
		}
		//full reset
		if (this.callEvent("onBeforeRender",[this.data])){
			this.units = null;
			this._setUnits();
			if(this.units){
				this._dataobj.innerHTML = this._getUnitRange().map(this._toHTML, this).join("");
				this._htmlmap = null; 
			}
			this.callEvent("onAfterRender",[]);
		}
	},
	getUnits:function(){
		var result = [];
		if(this.units){
			for(var b in this.units){
				result.push(b);
			}
		}
		return result;	
	},
	getUnitList:function(id){
		return (this.units?this.units[id]:null);
	},
	_toHTML:function(obj){
		//check if related template exist
		var mark = this.data._marks[obj.id];
		webix.assert((!obj.$template || this.type["template"+obj.$template]),"RenderStack :: Unknown template: "+obj.$template);
		this.callEvent("onItemRender",[obj]);
		if(obj.$unit){
			return this.type.templateStartHeader(obj,this.type)+this.type.templateHeader.call(this,obj.$unit)+this.type.templateEnd(obj, this.type);
		}
		return this.type.templateStart(obj,this.type,mark)+(obj.$template?this.type["template"+obj.$template]:this.type.template)(obj,this.type)+this.type.templateEnd(obj, this.type);
	},
	_getUnitRange:function(){
		var data,i,u,unit;
		data = [];
		var min = this.data.$min || 0;
		var max = this.data.$max || Infinity;
		var count = 0;

		for(u in this.units){
			data.push({$unit:u});
			unit = this.units[u];
			for(i=0;i < unit.length;i++){
				if (count == min) data = [{$unit:u}];
				data.push(this.getItem(unit[i]));
				if (count == max) return webix.toArray(data);
				count++;
			}
		}

		return webix.toArray(data);
	},
	_setUnits: function(){
		var list = this;
		this.units = {};
		this.data.each(function(obj){
			var result = list._settings.uniteBy.call(this,obj);
            obj.$unitValue = result;
            if(!list.units[result])
				list.units[result] = [];
			list.units[result].push(obj.id);
		});
	},
	type:{
		headerHeight: 20,
		templateHeader: function(value){
			return "<span class='webix_unit_header_inner'>"+value+"</span>";
		},
		templateStart:function(obj,type,marks){
		 	if(obj.$unit)
				return type.templateStartHeader.apply(this,arguments);
			var className = "webix_list_item webix_list_"+(type.css)+"_item"+((marks&&marks.webix_selected)?" webix_selected":"")+type.classname(obj,type,marks);
			var style = "width:"+type.width+"px; height:"+type.height+"px; padding:"+type.padding+"px; margin:"+type.margin+"px; overflow:hidden;"+(type.layout&&type.layout=="x"?"float:left;":"");
			return '<div webix_item_id="'+obj.id+'" class="'+className+'" style="'+style+'">';
		},
		templateStartHeader:function(obj,type){
			var className = "webix_unit_header webix_unit_"+(type.css)+"_header"+(obj.$selected?"_selected":"");
			var style = "width:"+type.width+"px; height:"+type.headerHeight+"px; overflow:hidden;";
			return '<div webix_unit_id="'+obj.$unit+'" class="'+className+'" style="'+style+'">';
		}			
	},
	$skin:function(){
		this.type.headerHeight = webix.skin.$active.unitHeaderHeight||20;
	}
}, webix.ui.list);

/*
	UI:DataView
*/


 	
/*
	Behavior:EditAbility - enables item operation for the items
	
	@export
		edit
		stopEdit
*/



webix.EditAbility={
	defaults:{
		editaction:"click"
	},
	$init:function(config){
		this._editors = {};
		this._in_edit_mode = 0;
		this._edit_open_time = 0;
		this._contentobj.style.position = "relative";
		if (config)
			config.onDblClick = config.onDblClick || {};

		this.attachEvent("onAfterRender", this._refocus_inline_editor);

		//when we call webix.extend the editable prop can be already set
		if (this._settings.editable)
			this._init_edit_events_once();
	},
	_refocus_try:function(newnode){
		try{ //Chrome throws an error if selectionStart is not accessible
			if (typeof newnode.selectionStart == "number") {
				newnode.selectionStart = newnode.selectionEnd = newnode.value.length;
			} else if (typeof newnode.createTextRange != "undefined") {
				var range = newnode.createTextRange();
				range.collapse(false);
				range.select();
			}
		} catch(e){}
	},
	_refocus_inline_editor:function(){
		var editor = this.getEditor();
		if (editor && editor.$inline && !editor.getPopup){
			var newnode = this._locateInput(editor);
			if (newnode && newnode != editor.node){
				var text = editor.node.value;
				editor.node = newnode;
				newnode.value = text;
				newnode.focus();

				this._refocus_try(newnode);
			} else 
				this.editStop();
		}
	},
	editable_setter:function(value){
		if (value)
			this._init_edit_events_once();
		return value;
	},
	_init_edit_events_once:function(){
		//will close editor on any click outside
		webix.attachEvent("onEditEnd", webix.bind(function(){
			if (this._in_edit_mode)
				this.editStop();
		}, this));
		webix.attachEvent("onClick", webix.bind(function(e){
			//but ignore click which opens editor
			if (this._in_edit_mode && (new Date())-this._edit_open_time > 200){
				if (!this._last_editor || this._last_editor.popupType || !e || this._last_editor.node != e.target)
					this.editStop();
			}
		}, this));
		
		//property sheet has simple data object, without events
		if (this.data.attachEvent)
			this.data.attachEvent("onIdChange", webix.bind(function(oldid, newid){
				this._changeEditorId(oldid, newid);
			}, this));

		//when clicking on row - will start editor
		this.attachEvent("onItemClick", function(id){
			if (this._settings.editable && this._settings.editaction == "click")
				this.edit(id);
		});
		this.attachEvent("onItemDblClick", function(id){
			if (this._settings.editable && this._settings.editaction == "dblclick")
				this.edit(id);
		});
		//each time when we clicking on input, reset timer to prevent self-closing
		this._reset_active_editor = webix.bind(function(){
			this._edit_open_time = new Date();
		},this);

		this._init_edit_events_once = function(){};

		if (this._component_specific_edit_init)
			this._component_specific_edit_init();
	},
	_handle_live_edits:function(){
		webix.delay(function(){
			var editor = this.getEditor();
			if (editor && editor.config.liveEdit){
				var state = { value:editor.getValue(), old: editor.value };
				if (state.value == state.old) return;

				editor.value = state.value;
				this._set_new_value(editor, state.value);
				this.callEvent("onLiveEdit", [state, editor]);
			}
		}, this);
	},
	_show_editor_form:function(id){
		var form = this._settings.form;
		if (typeof form != "string")
			this._settings.form = form = webix.ui(form).config.id;

		var form = webix.$$(form);
		var realform = form.setValues?form:form.getChildViews()[0];

		
		realform.setValues(this.getItem(id.row || id));
		form.config.master = this.config.id;
		form.show( this.getItemNode(id) );

		var first = realform.getChildViews()[0];
		if (first.focus())
			first.focus();
	},
	edit:function(id, preserve, show){
		if (!this.callEvent("onBeforeEditStart", [id])) return;
		if (this._settings.form)
			return this._show_editor_form(id);

		var editor = this._get_editor_type(id);
		if (editor){
			if (this.getEditor(id)) return;
			if (!preserve) this.editStop();
			//save time of creation to prevent instant closing from the same click
			this._edit_open_time = new Date();
			//render html input
			webix.assert(webix.editors[editor], "Invalid editor type: "+editor);
			var type = webix.extend({}, webix.editors[editor]);

			var node = this._init_editor(id, type, show);
			if (type.config.liveEdit)
				this._live_edits_handler = this.attachEvent("onKeyPress", this._handle_live_edits);

			var area = type.getPopup?type.getPopup(node)._viewobj:node;

			if (area)
				webix.event(area, "click", this._reset_active_editor);
			if (node)
				webix.event(node, "change", this._on_editor_change, { view:this, id:id });
			if (show !== false)
				type.focus();

			webix.UIManager.setFocus(this, true);
			this.callEvent("onAfterEditStart", [id]);
			return type;
		}
		return null;
	},
	getEditor:function(id){
		if (!id)
			return this._last_editor;

		return this._editors[id];
	},
	_changeEditorId:function(oldid, newid)	{
		var editor = this._editors[oldid];
		if (editor){
			this._editors[newid] = editor;
			editor.id = newid;
			delete this._editors[oldid];
		}
	},
	_on_editor_change:function(e){
		if (this.view.hasEvent("onEditorChange"))
			this.view.callEvent("onEditorChange", [this.id, this.view.getEditorValue(this.id) ]);
	},
	_get_edit_config:function(id){
		return this._settings;
	},
	_init_editor:function(id, type, show){
		var config = type.config = this._get_edit_config(id);
		var node = type.render();

		if (type.$inline)
			node = this._locateInput(id);
		type.node = node;

		var item = this.getItem(id);
		//value can be configured by editValue option
		var value = item[this._settings.editValue||"value"];
		//if property was not defined - use empty value
		if (webix.isUndefined(value))
			value = "";

		type.setValue(value, item);
		type.value = value;

		this._addEditor(id, type);

		//show it over cell
		if (show !== false)
			this.showItem(id);
		if (!type.$inline)
			this._sizeToCell(id, node, true);

		if (type.afterRender)
			type.afterRender();

		return node;
	},
	_locate_cell:function(id){
		return this.getItemNode(id);
	},
	_locateInput:function(id){
		var cell = this._locate_cell(id);
		if (cell)
			cell = cell.getElementsByTagName("input")[0] || cell;

		return cell;
	},
	_get_editor_type:function(id){
		return this._settings.editor;
	},
	_addEditor:function(id, type){
		type.id = id;
		this._editors[id]= this._last_editor = type;
		this._in_edit_mode++;
	},
	_removeEditor:function(editor){
		if (this._last_editor == editor)
			this._last_editor = 0;
		
		if (editor.destroy)
			editor.destroy();

		delete editor.popup;
		delete editor.node;

		delete this._editors[editor.id];
		this._in_edit_mode--;
	},
	focusEditor:function(id){
		var editor = this.getEditor.apply(this, arguments);
		if (editor && editor.focus)
			editor.focus();
	},
	editCancel:function(){
		this.editStop(null, null, true);
	},
	editStop:function(id){
		if (this._edit_stop) return;
		this._edit_stop = 1;


		var cancel = arguments[2];
		var result = 1;
		if (!id){
			this._for_each_editor(function(editor){
				result = result * this._editStop(editor, cancel);
			});
		} else 
			result = this._editStop(this._editors[id], cancel);

		this._edit_stop = 0;
		return result;
	},
	_cellPosition:function(id){
		var html = this.getItemNode(id);
		return {
			left:html.offsetLeft, 
			top:html.offsetTop,
			height:html.offsetHeight,
			width:html.offsetWidth,
			parent:this._contentobj
		};
	},
	_sizeToCell:function(id, node, inline){
		//fake inputs
		if (!node.style) return;

		var pos = this._cellPosition(id);

		node.style.top = pos.top + "px";
		node.style.left = pos.left + "px";

		node.style.width = pos.width-1+"px";
		node.style.height = pos.height-1+"px";

		node.top = pos.top; //later will be used during y-scrolling

		if (inline) pos.parent.appendChild(node);
	},
	_for_each_editor:function(handler){
		for (var editor in this._editors)
			handler.call(this, this._editors[editor]);
	},
	_editStop:function(editor, ignore){
		if (!editor) return;
		var state = { 
			value : editor.getValue(), 
			old : editor.value
		};
		if (this.callEvent("onBeforeEditStop", [state, editor, ignore])){
			if (!ignore){
				if (state.value != state.old || editor.config.liveEdit)
					this.updateItem(this._set_new_value(editor, state.value));
			}
			if (editor.$inline)
				editor.node = null;
			else
				webix.html.remove(editor.node);

			var popup = editor.config.suggest;
			if (popup && typeof popup == "string")
				webix.$$(popup).hide();

			this._removeEditor(editor);
			if (this._live_edits_handler)
				this.detachEvent(this._live_edits_handler);

			this.callEvent("onAfterEditStop", [state, editor, ignore]);
			return 1;
		}
		return 0;
	},
	validateEditor:function(id){
		var result = true;
		if (this._settings.rules){
			var editor = this.getEditor(id);
			var key = editor.column||this._settings.editValue||"value";
			var rule = this._settings.rules[key];
			var all = this._settings.rules.$all;

			if (rule || all){
				var obj = this.data.getItem(editor.row||editor.id);
				var value = editor.getValue();
				var input = editor.getInputNode();

				if (rule)
					result = rule.call(this, value, obj, key);
				if (all)
					result = all.call(this, value, obj, key) && result;
			
				if (result)
					webix.html.removeCss(input, "webix_invalid");
				else
					webix.html.addCss(input, "webix_invalid");

				webix.callEvent("onLiveValidation", [editor, result, obj, value]);
			}
		}
		return result;
	},
	getEditorValue:function(id){
		var editor;
		if (arguments.length === 0)
			editor = this._last_editor;
		else
			editor = this.getEditor(id);

		if (editor)
			return editor.getValue();
	},
	getEditState:function(){
		return this._last_editor || false;
	},
	editNext:function(next, from){ 
		next = next !== false; //true by default
		if (this._in_edit_mode == 1 || from){
			//only if one editor is active
			var editor_next = this._find_cell_next((this._last_editor || from), function(id){
				if (this._get_editor_type(id))
					return true;
				return false;
			}, next);

			if (this.editStop()){	//if we was able to close previous editor
				if (editor_next){	//and there is a new target
					this.edit(editor_next);	//init new editor
					this._after_edit_next(editor_next);
				}
				return false;
			}
		}
	},
	//stab, used in datatable
	_after_edit_next:function(){},
	_find_cell_next:function(start, check, direction){
		var row = this.getIndexById(start.id);
		var order = this.data.order;
		
		if (direction){
			for (var i=row+1; i<order.length; i++){
				if (check.call(this, order[i]))
					return order[i];
			}
		} else {
			for (var i=row-1; i>=0; i--){
				if (check.call(this, order[i]))
					return order[i];
			}
		}

		return null;
	},
	_set_new_value:function(editor, new_value){
		this.getItem(editor.id)[this._settings.editValue||"value"] = new_value;
		return editor.id;
	}
};


(function(){

function init_suggest(editor, input){
	var suggest = editor.config.suggest;
	if (suggest){
		var box = editor.config.suggest = create_suggest(suggest);
		var boxobj = webix.$$(box);
		if (boxobj && input)
			boxobj.linkInput(input);
	}
}

function create_suggest(config){
	if (typeof config == "string") return config;
	if (config.linkInput) return config._settings.id;

	
	if (typeof config == "object"){
		if (webix.isArray(config))
			config = { data: config };
		config.view = config.view || "suggest";
	} else if (config === true)
		config = { view:"suggest" };

	var obj = webix.ui(config);
	return obj.config.id;
}


/*
	this.node - html node, available after render call
	this.config - editor config
	this.value - original value
	this.popup - id of popup 
*/
webix.editors = {
	"text":{
		focus:function(){
			this.getInputNode(this.node).focus();
			this.getInputNode(this.node).select();
		},
		getValue:function(){
			return this.getInputNode(this.node).value;
		},
		setValue:function(value){
			var input = this.getInputNode(this.node);
			input.value = value;

			init_suggest(this, input);
		},
		getInputNode:function(){
			return this.node.firstChild;
		},
		render:function(){
			return webix.html.create("div", {
				"class":"webix_dt_editor"
			}, "<input type='text'>");
		}
	},
	"inline-checkbox":{
		render:function(){ return {}; },
		getValue:function(){
			return this.node.checked;
		},
		setValue:function(){},
		focus:function(){
			this.node.focus();
		},
		getInputNode:function(){},
		$inline:true
	},
	"inline-text":{
		render:function(){ return {}; },
		getValue:function(){
			return this.node.value;
		},
		setValue:function(){},
		focus:function(){
			this.node.select();
			this.node.focus();
		},
		getInputNode:function(){},
		$inline:true
	},		
	"checkbox":{
		focus:function(){
			this.getInputNode().focus();
		},
		getValue:function(){
			return this.getInputNode().checked;
		},
		setValue:function(value){
			this.getInputNode().checked = !!value;
		},
		getInputNode:function(){
			return this.node.firstChild.firstChild;
		},
		render:function(){
			return webix.html.create("div", {
				"class":"webix_dt_editor"
			}, "<div><input type='checkbox'></div>");
		}
	},		
	"select":{
		focus:function(){
			this.getInputNode().focus();
		},
		getValue:function(){
			return this.getInputNode().value;
		},
		setValue:function(value){
			this.getInputNode().value = value;
		},
		getInputNode:function(){
			return this.node.firstChild;
		},
		render:function(){
			var html = "";
			var options = this.config.options || this.config.collection;
			webix.assert(options,"options not defined for select editor");

			if (options.data && options.data.each)
				options.data.each(function(obj){
					html +="<option value='"+obj.id+"'>"+obj.value+"</option>";
				});
			else {
				if (webix.isArray(options)){
					for (var i=0; i<options.length; i++)
						html +="<option value='"+options[i]+"'>"+options[i]+"</option>";
				} else for (var key in options){
					html +="<option value='"+key+"'>"+options[key]+"</option>";
				}
			}

			return webix.html.create("div", {
				"class":"webix_dt_editor"
			}, "<select>"+html+"</select>");
		}
	},
	popup:{
		focus:function(){
			this.getInputNode().focus();
		},
		destroy:function(){
			this.getPopup().hide();
		},
		getValue:function(){
			return this.getInputNode().getValue()||"";
		},
		setValue:function(value){
			this.getPopup().show(this.node);
			this.getInputNode().setValue(value);
		},
		getInputNode:function(){
			return this.getPopup().getChildViews()[0];
		},
		getPopup:function(){
			if (!this.config.popup)
				this.config.popup = this.createPopup();

			return webix.$$(this.config.popup);
		},
		createPopup:function(){
			var popup = this.config.popup || this.config.suggest;
			if (popup){
				var pobj;
				if (typeof popup == "object" && !popup.name){
					popup.view = popup.view || "suggest";
					pobj = webix.ui(popup);
				} else
					pobj = webix.$$(popup);

				if (pobj.linkInput)
					pobj.linkInput(document.body);
				return pobj;
			}
			
			var type = webix.editors.$popup[this.popupType];
			if (typeof type != "string"){
				type = webix.editors.$popup[this.popupType] = webix.ui(type);
				this.popupInit(type);
			}

			return type._settings.id;
		},

		popupInit:function(popup){
		
		},
		popupType:"text",
		render	:function(){ return {}; },
		$inline:true
	}
};

webix.editors.color = webix.extend({
	focus	:function(){},
	popupType:"color",
	popupInit:function(popup){
		popup.getChildViews()[0].attachEvent("onSelect", function(value){
			webix.callEvent("onEditEnd",[value]);
		});
	}
}, webix.editors.popup);

webix.editors.date = webix.extend({
	focus	:function(){},
	popupType:"date",
	setValue:function(value){
		this._is_string = this.config.stringResult || (value && typeof value == "string");
		webix.editors.popup.setValue.call(this, value);
	},
	getValue:function(){
		return this.getInputNode().getValue(this._is_string?webix.i18n.parseFormatStr:"")||"";
	},
	popupInit:function(popup){
		popup.getChildViews()[0].attachEvent("onDateSelect", function(value){
			webix.callEvent("onEditEnd",[value]);
		});
	}
}, webix.editors.popup);

webix.editors.combo = webix.extend({
	_create_suggest:function(config){
        if(this.config.popup){
            return this.config.popup.config.id;
        }
		else if (config){
			return create_suggest(config);
		} else
			return this._shared_suggest(config);
	},
	_shared_suggest:function(){
		var e = webix.editors.combo;
		return (e._suggest = e._suggest || this._create_suggest(true));
	},
	render:function(){
		var node = webix.html.create("div", {
			"class":"webix_dt_editor"
		}, "<input type='text'>");

		//save suggest id for future reference		
		var suggest = this.config.suggest = this._create_suggest(this.config.suggest);

		if (suggest){
			webix.$$(suggest).linkInput(node.firstChild, true);
			webix.event(node.firstChild, "click",webix.bind(this.showPopup, this));
		}
		return node;
	},
	getPopup:function(){
		return webix.$$(this.config.suggest);
	},
	showPopup:function(){
		var popup = this.getPopup();
        var list = popup.getList();
		var input = this.getInputNode();
        var value = this.getValue();

		popup.show(input);
        if(value ){
           webix.assert(list.exists(value), "Option with ID "+value+" doesn't exist");
            if(list.exists(value)){
                list.select(value);
                list.showItem(value);
            }
        }else{
            list.unselect();
            list.showItem(list.getFirstId());
        }
		popup._last_input_target = input;
	},
	afterRender:function(){
		this.showPopup();
	},
	setValue:function(value){
		this._initial_value = value;
		if (this.config.suggest){
			var sobj = webix.$$(this.config.suggest);
			var data =  this.config.collection || this.config.options;
			if (data)
				sobj.getList().data.importData(data);

			this._initial_text = this.getInputNode(this.node).value = sobj.getItemText(value);
		}
	},
	getValue:function(){
		var value = this.getInputNode().value;
		
		if (this.config.suggest){
			if (value == this._initial_text)
				return this._initial_value;
			return webix.$$(this.config.suggest).getSuggestion();
		} else 
			return value;
	}
}, webix.editors.text);


webix.editors.richselect = webix.extend({
	focus:function(){},
	getValue:function(){
		return this.getPopup().getValue();
	},
	setValue:function(value){
		var suggest =  this.config.collection || this.config.options;
        var list = this.getInputNode();
		if (suggest)
			this.getPopup().getList().data.importData(suggest);

        this.getPopup().show(this.node);
        this.getPopup().setValue(value);
	},
	getInputNode:function(){
		return this.getPopup().getList();
	},
	popupInit:function(popup){
		popup.linkInput(document.body);
	},
	popupType:"richselect"	
}, webix.editors.popup);

webix.editors.password = webix.extend({
	render:function(){
		return webix.html.create("div", {
			"class":"webix_dt_editor"
		}, "<input type='password'>");
	}	
}, webix.editors.text);

webix.editors.$popup = {
	text:{
		view:"popup", width:250, height:150,
		body:{ view:"textarea" }
	},
	color:{
		view:"popup",
		body:{ view:"colorboard" }
	},
	date:{
		view:"popup", width:250, height:250, padding:0,
		body:{ view:"calendar", icons:true, borderless:true }
	},
	richselect:{
		view:"suggest",
		body:{ view:"list", select:true }
	}
};

})(); 
 



/*
	Renders collection of items
	Always shows y-scroll
	Can be used with huge datasets
	
	@export
		show
		render
*/

 

webix.VirtualRenderStack={
	$init:function(){
		webix.assert(this.render,"VirtualRenderStack :: Object must use RenderStack first");
		
		this._htmlmap={}; //init map of rendered elements
        
        //we need to repaint area each time when view resized or scrolling state is changed
        webix.event(this._viewobj,"scroll",webix.bind(this._render_visible_rows,this));
		if(webix.env.touch){
			this.attachEvent("onAfterScroll", webix.bind(this._render_visible_rows,this));
		}
		//here we store IDs of elemenst which doesn't loadede yet, but need to be rendered
		this._unrendered_area=[];
	},
	//return html object by item's ID. Can return null for not-rendering element
	getItemNode:function(search_id){
		//collection was filled in _render_visible_rows
		return this._htmlmap[search_id];
	},
	//adjust scrolls to make item visible
	showItem:function(id){
		var range = this._getVisibleRange();
		var ind = this.data.getIndexById(id);
		//we can't use DOM method for not-rendered-yet items, so fallback to pure math
		var dy = Math.floor(ind/range._dx)*range._y;
		var state = this.getScrollState();
		if (dy<state.y || dy + this._settings.height >= state.y + this._content_height)
			this.scrollTo(0, dy);
	},	
	//repain self after changes in DOM
	//for add, delete, move operations - render is delayed, to minify performance impact
	render:function(id,data,type){
		if (!this.isVisible(this._settings.id) || this.$blockRender)
			return;
		
		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id);
			
		if (id){
			var cont = this.getItemNode(id);	//old html element
			switch(type){
				case "update":
					if (!cont) return;
					//replace old with new
					var t = this._htmlmap[id] = this._toHTMLObject(data);
					webix.html.insertBefore(t, cont); 
					webix.html.remove(cont);
					break;
				default: // "move", "add", "delete"
					/*
						for all above operations, full repainting is necessary
						but from practical point of view, we need only one repainting per thread
						code below initiates double-thread-rendering trick
					*/
					this._render_delayed();
					break;
			}
		} else {
			//full repainting
			if (this.callEvent("onBeforeRender",[this.data])){
				this._htmlmap = {}; 					//nulify links to already rendered elements
				this._render_visible_rows(null, true);	
				// clear delayed-rendering, because we already have repaint view
				this._wait_for_render = false;			
				this.callEvent("onAfterRender",[]);
			}
		}
	},
	//implement double-thread-rendering pattern
	_render_delayed:function(){
		//this flag can be reset from outside, to prevent actual rendering 
		if (this._wait_for_render) return;
		this._wait_for_render = true;	
		
		window.setTimeout(webix.bind(function(){
			this.render();
		},this),1);
	},
	//create empty placeholders, which will take space before rendering
	_create_placeholder:function(height){
		var node = document.createElement("DIV");
			node.style.cssText = "height:"+height+"px; width:100%; overflow:hidden;";
		return node;
	},
	/*
		Methods get coordinatest of visible area and checks that all related items are rendered
		If, during rendering, some not-loaded items was detected - extra data loading is initiated.
		reset - flag, which forces clearing of previously rendered elements
	*/
	_render_visible_rows:function(e,reset){
		this._unrendered_area=[]; //clear results of previous calls
		
		var viewport = this._getVisibleRange();	//details of visible view

		if (!this._dataobj.firstChild || reset){	//create initial placeholder - for all view space
			this._dataobj.innerHTML="";
			this._dataobj.appendChild(this._create_placeholder(viewport._max));
			//register placeholder in collection
			this._htmlrows = [this._dataobj.firstChild];
		}
		
		/*
			virtual rendering breaks all view on rows, because we know widht of item
			we can calculate how much items can be placed on single row, and knowledge 
			of that, allows to calculate count of such rows
			
			each time after scrolling, code iterate through visible rows and render items 
			in them, if they are not rendered yet
			
			both rendered rows and placeholders are registered in _htmlrows collection
		*/

		//position of first visible row
		var t = viewport._from;
			
		while(t<=viewport._height){	//loop for all visible rows
			//skip already rendered rows
			while(this._htmlrows[t] && this._htmlrows[t]._filled && t<=viewport._height){
				t++; 
			}
			//go out if all is rendered
			if (t>viewport._height) break;
			
			//locate nearest placeholder
			var holder = t;
			while (!this._htmlrows[holder]) holder--;
			var holder_row = this._htmlrows[holder];
			
			//render elements in the row			
			var base = t*viewport._dx+(this.data.$min||0);	//index of rendered item
			if (base > (this.data.$max||Infinity)) break;	//check that row is in virtual bounds, defined by paging
			var nextpoint =  Math.min(base+viewport._dx-1,(this.data.$max||Infinity));
			var node = this._create_placeholder(viewport._y);
			//all items in rendered row
			var range = this.data.getIndexRange(base, nextpoint);
			if (!range.length) break; 
			
			var loading = { $template:"Loading" };
			for (var i=0; i<range.length; i++){
				if (!range[i])
	        		this._unrendered_area.push(base+i);
				range[i] = this._toHTML(range[i]||loading);
			}

			node.innerHTML=range.join(""); 	//actual rendering
			for (var i=0; i < range.length; i++)					//register all new elements for later usage in getItemNode
				this._htmlmap[this.data.getIdByIndex(base+i)]=node.childNodes[i];
			
			//correct placeholders
			var h = parseInt(holder_row.style.height,10);
			var delta = (t-holder)*viewport._y;
			var delta2 = (h-delta-viewport._y);
			
			//add new row to the DOOM
			webix.html.insertBefore(node,delta?holder_row.nextSibling:holder_row,this._dataobj);
			this._htmlrows[t]=node;
			node._filled = true;
			
			/*
				if new row is at start of placeholder - decrease placeholder's height
				else if new row takes whole placeholder - remove placeholder from DOM
				else 
					we are inserting row in the middle of existing placeholder
					decrease height of existing one, and add one more, 
					before the newly added row
			*/
			if (delta <= 0 && delta2>0){
				holder_row.style.height = delta2+"px";
				this._htmlrows[t+1] = holder_row;
			} else {
				if (delta<0)
					webix.html.remove(holder_row);
				else
					holder_row.style.height = delta+"px";
				if (delta2>0){ 
					var new_space = this._htmlrows[t+1] = this._create_placeholder(delta2);
					webix.html.insertBefore(new_space,node.nextSibling,this._dataobj);
				}
			}
			
			
			t++;
		}
		
		//when all done, check for non-loaded items
		if (this._unrendered_area.length){
			//we have some data to load
			//detect borders
			var from = this._unrendered_area[0];
			var to = this._unrendered_area.pop()+1;
			if (to>from){
				//initiate data loading
				var count = to - from;
				if (this._maybe_loading_already(count, from)) return;

				count = Math.max(count, (this._settings.datafetch||this._settings.loadahead||0));
				this.loadNext(count, from);
			}
		}
	},
	//calculates visible view
	_getVisibleRange:function(){
		var state = this.getScrollState();
		var top = state.y;
		var width = this._content_width; 
		var height = this._content_height;

		//size of single item
		var t = this.type;

		var dx = Math.floor(width/t.width)||1; //at least single item per row
		
		var min = Math.floor(top/t.height);				//index of first visible row
		var dy = Math.ceil((height+top)/t.height)-1;		//index of last visible row
		//total count of items, paging can affect this math
		var count = this.data.$max?(this.data.$max-this.data.$min):this.data.count();
		var max = Math.ceil(count/dx)*t.height;			//size of view in rows

		return { _from:min, _height:dy, _top:top, _max:max, _y:t.height, _dx:dx};
	},
	_cellPosition:function(id){
		var html = this.getItemNode(id);
		if (!html){
			this.showItem(id);
			this._render_visible_rows();
			html = this.getItemNode(id);
		}
		return {
			left:html.offsetLeft, 
			top:html.offsetTop,
			height:html.offsetHeight,
			width:html.offsetWidth,
			parent:this._contentobj
		};
	}
};


webix.protoUI({
	name:"dataview",
	$init:function(config){
		if (config.sizeToContent)
			//method need to be called before data-loaders
			//so we are using unshift to place it at start
			this.$ready.unshift(this._after_init_call);
		var prerender = config.prerender || this.defaults.prerender;
		if (prerender === false || (prerender !== true && config.height !== "auto" && !config.autoheight))
			webix.extend(this, webix.VirtualRenderStack, true);
		if (config.autoheight)
			config.scroll = false;
	
		this._contentobj.className+=" webix_dataview";
	},
	_after_init_call:function(){
		var test = webix.html.create("DIV",0,this.type.template({}));
		test.style.position="absolute";
		document.body.appendChild(test);
		this.type.width = test.offsetWidth;
		this.type.height = test.offsetHeight;
		
		webix.html.remove(test);
	},
	
	defaults:{
		scroll:true,
		datafetch:50
	},
	_id:"webix_f_id",
	on_click:{
		webix_dataview_item:function(e,id){ 
			if (this._settings.select){
				if (this._settings.select=="multiselect" || this._settings.multiselect)
					this.select(id, false, ((this._settings.multiselect == "touch") || e.ctrlKey || e.metaKey), e.shiftKey); 	//multiselection
				else
					this.select(id);
			}
		}		
	},
	on_dblclick:{
	},
	on_mouse_move:{
	},
	type:{
		//normal state of item
		template:webix.template("#value#"),
		//in case of dyn. loading - temporary spacer
		templateLoading:webix.template("Loading..."),

		width:160,
		height:50,

		classname:function(obj, common, marks){
			var css = "webix_dataview_item ";

			if (common.css) css +=common.css+" ";
			if (obj.$css){
				if (typeof obj.$css == "object")
					obj.$css = webix.html.createCss(obj.$css);
				css +=obj.$css+" ";
			}
			if (marks && marks.$css) css +=marks.$css+" ";
			
			return css;
		},

		templateStart:webix.template('<div webix_f_id="#id#" class="{common.classname()}" style="width:{common.width}px; height:{common.height}px; float:left; overflow:hidden;">'),
		templateEnd:webix.template("</div>")
		
	},
	_calck_autoheight:function(width){
		return (this._settings.height = this.type.height * Math.ceil( this.data.count() / Math.floor(width / this.type.width)));
	},
	autoheight_setter:function(mode){
		if (mode){
			this.data.attachEvent("onStoreLoad", webix.bind(this.resize, this));
			this._contentobj.style.overflowY = "hidden";
		}
		return mode;
	},
	$getSize:function(dx, dy){
		if ((this._settings.xCount >0) && this.type.width != "auto" && !this._autowidth)
			this._settings.width = this.type.width*this._settings.xCount + (this._scroll_y?webix.ui.scrollSize:0);
		if (this._settings.yCount && this.type.height != "auto")
			this._settings.height = this.type.height*this._settings.yCount;

		var width = this._settings.width || this._content_width;
		if (this._settings.autoheight && width){
			this._calck_autoheight(width);
			this.scroll_setter(false);	
		}
		return webix.ui.view.prototype.$getSize.call(this, dx, dy);		
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this, x, y)){
			if (this._settings.autoheight && this._calck_autoheight() != this._content_height)
				return webix.delay(this.resize, this);

			var render = false;
			if (this._settings.yCount && this.type.height == "auto"){
				this.type.height = Math.floor(this._content_height/this._settings.yCount);
				render = true;
			}
			if (this._settings.xCount && (this.type.width == "auto"||this._autowidth)){
				this._autowidth = true; //flag marks that width was set to "auto" initially
				this.type.width = Math.floor(this._content_width/this._settings.xCount);
				render = true;
			}

			if (render || this._render_visible_rows)
				this.render();
		}
	}
}, webix.DataMove, webix.DragItem, webix.MouseEvents, webix.KeysNavigation, webix.SelectionModel, webix.Scrollable, webix.ui.proto);




webix.DataDriver.htmltable={

	//convert json string to json object if necessary
	toObject:function(data){
		data = webix.toNode(data);
		webix.assert(data, "table is not found");
		webix.assert(data.tagName.toLowerCase() === 'table', "Incorrect table object");

		var tr = data.rows;
		webix.html.remove(data);
		return tr;
	},
	//get array of records
	getRecords:function(data){
		var new_data = [];
		//skip header rows if necessary
		var i = (data[0] && data[0]._webix_skip)?1:0;

		for (; i < data.length; i++)
			new_data.push(data[i]);
		return new_data;
	},
	//get hash of properties for single record
	getDetails:function(data){
		var td = data.getElementsByTagName('td');
		data = {};
		//get hash of properties for single record, data named as "data{index}"
		for (var i=0; i < td.length; i++) {
			data['data' + i] = td[i].innerHTML;
		}
		return data;
	},
	//get count of data and position at which new data need to be inserted
	getInfo:function(data){
		// dyn loading is not supported for htmltable
		return { 
			_size:0,
			_from:0
		};
	},
	getOptions:function(){},

	/*! gets header from first table row
	 **/
	getConfig: function(data) {
		var columns = [];
		var td = data[0].getElementsByTagName('th');
		if (td.length) data[0]._webix_skip = true;
		for (var i = 0; i < td.length; i++) {
			var col = {
				id: 'data' + i,
				header: this._de_json(td[i].innerHTML)
			};
			var attrs = this._get_attrs(td[i]);
			col = webix.extend(col, attrs);
			columns.push(col);
		}
		return columns;
	},

	_de_json:function(str){
		var pos = str.indexOf("json://");
		
		if (pos != -1)
			str = JSON.parse(str.substr(pos+7));
		return str;
	},
	
	/*! gets hash of html-element attributes
	 **/
	_get_attrs: function(el) {
		var attr = el.attributes;
		var hash = {};
		for (var i = 0; i < attr.length; i++) {
			hash[attr[i].nodeName] = this._de_json(attr[i].nodeValue);
		}
		hash.width = parseInt(hash.width, 10);
		return hash;
	}
};
webix.protoUI({
	name:"vscroll",
	defaults:{
		scroll:"x",
		scrollStep:40,
		scrollPos:0,
		scrollSize:18,
		scrollVisible:1,
		zoom:1
	},
	$init:function(config){
		var dir = config.scroll||"x";
		var node = this._viewobj = webix.toNode(config.container);
		node.className += " webix_vscroll_"+dir;
		node.innerHTML="<div class='webix_vscroll_body'></div>";
		webix.event(node,"scroll", this._onscroll,this);

		this._last_set_size = 0;
		this._last_scroll_pos = 0;
	},
	_check_quantum:function(value){
		if (value>1500000){
			this._settings.zoom = Math.floor(value/1500000)+1;
			this._zoom_limit = value-this._last_set_size;
			value = Math.floor(value/this._settings.zoom)+this._last_set_size;
		} else {
			this._settings.zoom = 1;
			this._zoom_limit = Infinity;
		}
		return value;
	},	
	scrollWidth_setter:function(value){
		value = this._check_quantum(value);
		this._viewobj.firstChild.style.width = value+"px";
		return value;		
	},
	scrollHeight_setter:function(value){
		value = this._check_quantum(value);
		this._viewobj.firstChild.style.height = value+"px";
		return value;
	},
	sizeTo:function(value, top, bottom){
		value = value-(top||0)-(bottom||0);

		var width = this._settings.scrollSize;
		//IEFix
		//IE doesn't react on scroll-click if it has not at least 1 px of visible content
		if (webix.env.isIE && width)
			width += 1;
		if (!width && this._settings.scrollVisible && !webix.env.$customScroll){
			this._viewobj.style.pointerEvents="none";
			width = 14;
		}

		if (!width){
			this._viewobj.style.display = 'none';
		} else {
			if (top)
				this._viewobj.style.marginTop = top+ "px";
			this._viewobj.style[this._settings.scroll == "x"?"width":"height"] =  Math.max(0,value)+"px";
			this._viewobj.style[this._settings.scroll == "x"?"height":"width"] = width+"px";
		}

		this._last_set_size = value;
	},
	getScroll:function(){
		return this._settings.scrollPos*this._settings.zoom;
	},
	getSize:function(){
		return (this._settings.scrollWidth||this._settings.scrollHeight)*this._settings.zoom;
	},
	scrollTo:function(value){
		if (value<0)
			value = 0;
		var config = this._settings;
		value = Math.min(((config.scrollWidth||config.scrollHeight)-this._last_set_size)*config.zoom, value);

		if (value < 0) value = 0;
		var svalue = value/config.zoom;

		if (this._last_scroll_pos != svalue){
			this._viewobj[config.scroll == "x"?"scrollLeft":"scrollTop"] = svalue;
			this._onscroll_inner(svalue);
			return true;
		}
	},
	_onscroll:function(){	
		var x = this._viewobj[this._settings.scroll == "x"?"scrollLeft":"scrollTop"];
		if (x != this._last_scroll_pos)
			this._onscroll_inner(x);
	},
	_onscroll_inner:function(value){
		this._last_scroll_pos = value;
		this._settings.scrollPos = (Math.min(this._zoom_limit, value*this._settings.zoom) || 0);
		this.callEvent("onScroll",[this._settings.scrollPos]);
	},
	activeArea:function(area, x_mode){
		this._x_scroll_mode = x_mode;
		webix.event(area,"mousewheel",this._on_wheel,this);
		webix.event(area,"DOMMouseScroll",this._on_wheel,this);
	},
	_on_wheel:function(e){
		var dir = 0;
		if (e.wheelDeltaX && Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)){
			//x-scroll
			if (this._x_scroll_mode)
				dir = e.wheelDeltaX / -40;
		} else {
			//y-scroll
			if (!this._x_scroll_mode){
				if (webix.isUndefined(e.wheelDelta))
					dir = e.detail;	
				else
					dir = e.wheelDelta / -40;
			}
		}

		if (dir)
			if (this.scrollTo(this._settings.scrollPos + dir*this._settings.scrollStep))
				return webix.html.preventEvent(e);
	}
}, webix.EventSystem, webix.Settings);


webix.Number={
	format: function(value, config){ 
		if (value === "" || typeof value === "undefined") return value;
		
		config = config||webix.i18n;
		value = parseFloat(value);

		var sign = value < 0 ? "-":"";
		value = Math.abs(value);

		var str = value.toFixed(config.decimalSize).toString();
		str = str.split(".");

		var int_value = "";
		if (config.groupSize){
			var step = config.groupSize;
			var i=str[0].length;
			do {
				i-=step;
				var chunk = (i>0)?str[0].substr(i,step):str[0].substr(0,step+i);
				int_value = chunk+(int_value?config.groupDelimiter+int_value:"");
			} while(i>0);
		} else
			int_value = str[0];

		if (config.decimalSize)
			return sign + int_value + config.decimalDelimiter + str[1];
		else
			return sign + int_value;
	},
	numToStr:function(config){
		return function(value){
			return webix.Number.format(value, config);
		};
	}
};

webix.Date={
	startOnMonday:false,

	toFixed:function(num){
		if (num<10)	return "0"+num;
		return num;
	},
	weekStart:function(date){
		date = this.copy(date);

		var shift=date.getDay();
		if (this.startOnMonday){
			if (shift===0) shift=6;
			else shift--;
		}
		return this.datePart(this.add(date,-1*shift,"day"));
	},
	monthStart:function(date){
		date = this.copy(date);

		date.setDate(1);
		return this.datePart(date);
	},
	yearStart:function(date){
		date = this.copy(date);

		date.setMonth(0);
		return this.monthStart(date);
	},
	dayStart:function(date){
		return this.datePart(date, true);
	},
	dateToStr:function(format,utc){
		if (typeof format == "function") return format;

		if(webix.env.strict){
			return function(date){
				var str = "";
				var lastPos = 0;
				format.replace(/%[a-zA-Z]/g,function(s,pos){
					str += format.slice(lastPos,pos);
					var fn = function(date){
						if( s == "%d")  return webix.Date.toFixed(date.getDate());
						if( s == "%m")  return webix.Date.toFixed((date.getMonth()+1));
						if( s == "%j")  return date.getDate();
						if( s == "%n")  return (date.getMonth()+1);
						if( s == "%y")  return webix.Date.toFixed(date.getFullYear()%100);
						if( s == "%Y")  return date.getFullYear();
						if( s == "%D")  return webix.i18n.calendar.dayShort[date.getDay()];
						if( s == "%l")  return webix.i18n.calendar.dayFull[date.getDay()];
						if( s == "%M")  return webix.i18n.calendar.monthShort[date.getMonth()];
						if( s == "%F")  return webix.i18n.calendar.monthFull[date.getMonth()];
						if( s == "%h")  return webix.Date.toFixed((date.getHours()+11)%12+1);
						if( s == "%g")  return ((date.getHours()+11)%12+1);
						if( s == "%G")  return date.getHours();
						if( s == "%H")  return webix.Date.toFixed(date.getHours());
						if( s == "%i")  return webix.Date.toFixed(date.getMinutes());
						if( s == "%a")  return (date.getHours()>11?"pm":"am");
						if( s == "%A")  return (date.getHours()>11?"PM":"AM");
						if( s == "%s")  return webix.Date.toFixed(date.getSeconds());
						if( s == "%W")  return webix.Date.toFixed(webix.Date.getISOWeek(date));
						return s;
					};
					str += fn(date);
					lastPos = pos + 2;
				});
				str += format.slice(lastPos,format.length);
				return str;
			};

		}

		format=format.replace(/%[a-zA-Z]/g,function(a){
			switch(a){
				case "%d": return "\"+webix.Date.toFixed(date.getDate())+\"";
				case "%m": return "\"+webix.Date.toFixed((date.getMonth()+1))+\"";
				case "%j": return "\"+date.getDate()+\"";
				case "%n": return "\"+(date.getMonth()+1)+\"";
				case "%y": return "\"+webix.Date.toFixed(date.getFullYear()%100)+\""; 
				case "%Y": return "\"+date.getFullYear()+\"";
				case "%D": return "\"+webix.i18n.calendar.dayShort[date.getDay()]+\"";
				case "%l": return "\"+webix.i18n.calendar.dayFull[date.getDay()]+\"";
				case "%M": return "\"+webix.i18n.calendar.monthShort[date.getMonth()]+\"";
				case "%F": return "\"+webix.i18n.calendar.monthFull[date.getMonth()]+\"";
				case "%h": return "\"+webix.Date.toFixed((date.getHours()+11)%12+1)+\"";
				case "%g": return "\"+((date.getHours()+11)%12+1)+\"";
				case "%G": return "\"+date.getHours()+\"";
				case "%H": return "\"+webix.Date.toFixed(date.getHours())+\"";
				case "%i": return "\"+webix.Date.toFixed(date.getMinutes())+\"";
				case "%a": return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";
				case "%A": return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";
				case "%s": return "\"+webix.Date.toFixed(date.getSeconds())+\"";
				case "%W": return "\"+webix.Date.toFixed(webix.Date.getISOWeek(date))+\"";
				default: return a;
			}
		});
		if (utc===true) format=format.replace(/date\.get/g,"date.getUTC");
		return new Function("date","if (!date) return ''; if (!date.getMonth) date=webix.i18n.parseFormatDate(date);  return \""+format+"\";");
	},
	strToDate:function(format,utc){
		if (typeof format == "function") return format;

		var mask=format.match(/%[a-zA-Z]/g);
		var splt="var temp=date.split(/[^0-9a-zA-Z]+/g);";
		var i,t,s;

		if(!webix.i18n.calendar.monthShort_hash){
			s = webix.i18n.calendar.monthShort;
			t = webix.i18n.calendar.monthShort_hash = {};
			for (i = 0; i < s.length; i++)
				t[s[i]]=i;

			s = webix.i18n.calendar.monthFull;
			t = webix.i18n.calendar.monthFull_hash = {};
			for (i = 0; i < s.length; i++)
				t[s[i]]=i;
		}

		if(webix.env.strict){
			return function(date){
				if (!date) return '';
				if (typeof date == 'object') return date;
				var temp=date.split(/[^0-9a-zA-Z]+/g);
				var set=[0,0,1,0,0,0];
				for (i=0; i<mask.length; i++){
					var a = mask[i];
					if( a ==  "%y")
						set[0]=temp[i]*1+(temp[i]>50?1900:2000);
					else if( a ==  "%Y")
						set[0]=temp[i]||0;
					else if( a == "%n" || a == "%m")
						set[1]=(temp[i]||1)-1;
					else if( a ==  "%M")
						set[1]=webix.i18n.calendar.monthShort_hash[temp[i]]||0;
					else if( a ==  "%F")
						set[1]=webix.i18n.calendar.monthFull_hash[temp[i]]||0;
					else if( a == "%j" || a == "%d")
						set[2]=temp[i]||1;
					else if( a == "%g" || a == "%G" || a == "%h" || a == "%H")
						set[3]=temp[i]||0;
					else if( a == "%a" || a == "%A")
						set[3]=set[3]%12+((temp[i]||'').toLowerCase()=='am'?0:12);
					else if( a ==  "%i")
						set[4]=temp[i]||0;
					else if( a ==  "%s")
						set[5]=temp[i]||0;
				}
				if(utc)
					return new Date(Date.UTC(set[0],set[1],set[2],set[3],set[4],set[5]));
				return new Date(set[0],set[1],set[2],set[3],set[4],set[5]);
			};
		}

		for (i=0; i<mask.length; i++){
			switch(mask[i]){
				case "%j":
				case "%d": splt+="set[2]=temp["+i+"]||1;";
					break;
				case "%n":
				case "%m": splt+="set[1]=(temp["+i+"]||1)-1;";
					break;
				case "%y": splt+="set[0]=temp["+i+"]*1+(temp["+i+"]>50?1900:2000);";
					break;
				case "%g":
				case "%G":
				case "%h": 
				case "%H":
							splt+="set[3]=temp["+i+"]||0;";
					break;
				case "%i":
							splt+="set[4]=temp["+i+"]||0;";
					break;
				case "%Y":  splt+="set[0]=temp["+i+"]||0;";
					break;
				case "%a":					
				case "%A":  splt+="set[3]=set[3]%12+((temp["+i+"]||'').toLowerCase()=='am'?0:12);";
					break;					
				case "%s":  splt+="set[5]=temp["+i+"]||0;";
					break;
				case "%M":  splt+="set[1]=webix.i18n.calendar.monthShort_hash[temp["+i+"]]||0;";
					break;
				case "%F":  splt+="set[1]=webix.i18n.calendar.monthFull_hash[temp["+i+"]]||0;";
					break;
				default:
					break;
			}
		}
		var code ="set[0],set[1],set[2],set[3],set[4],set[5]";
		if (utc) code =" Date.UTC("+code+")";
		return new Function("date","if (!date) return ''; if (typeof date == 'object') return date; var set=[0,0,1,0,0,0]; "+splt+" return new Date("+code+");");
	},
		
	getISOWeek: function(ndate) {
		if(!ndate) return false;
		var nday = ndate.getDay();
		if (nday === 0) {
			nday = 7;
		}
		var first_thursday = new Date(ndate.valueOf());
		first_thursday.setDate(ndate.getDate() + (4 - nday));
		var year_number = first_thursday.getFullYear(); // year of the first Thursday
		var ordinal_date = Math.floor( (first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 86400000); //ordinal date of the first Thursday - 1 (so not really ordinal date)
		var weekNumber = 1 + Math.floor( ordinal_date / 7);	
		return weekNumber;
	},
	
	getUTCISOWeek: function(ndate){
		return this.getISOWeek(ndate);
	},
	_correctDate: function(d,d0,inc,checkFunc){
		if(!inc)
			return;
		var incorrect = checkFunc(d,d0);
		if(incorrect){
			var i = (inc>0?1:-1);
			while(incorrect){
				d.setHours(d.getHours()+i);
				incorrect = checkFunc(d,d0);
				i += (inc>0?1:-1);
			}
		}
	},
	add:function(date,inc,mode,copy){
		if (copy) date = this.copy(date);
		var d = webix.Date.copy(date);
		switch(mode){
			case "day":
				date.setDate(date.getDate()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	webix.Date.datePart(d0,true)== webix.Date.datePart(d,true);
				});
				break;
			case "week":
				date.setDate(date.getDate()+7*inc);
				this._correctDate(date,d,7*inc,function(d,d0){
					return 	webix.Date.datePart(d0,true)== webix.Date.datePart(d,true);
				});
				break;
			case "month":
				date.setMonth(date.getMonth()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getMonth() == d.getMonth() && d0.getYear() == d.getYear();
				});
				break;
			case "year":
				date.setYear(date.getFullYear()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getFullYear() == d.getFullYear();
				});
				break;
			case "hour":
				date.setHours(date.getHours()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getHours() == d.getHours() && webix.Date.datePart(d0,true)== webix.Date.datePart(d,true);
				});
				break;
			case "minute": 	date.setMinutes(date.getMinutes()+inc); break;
			default:
				webix.Date.add[mode](date, inc, mode);
				break;
		}
		return date;
	},
	datePart:function(date, copy){
		if (copy) date = this.copy(date);

		// workaround for non-existent hours
		var d = this.copy(date);
		d.setHours(0);
		if(d.getDate()!=date.getDate()){
			date.setHours(1);
		}
		else{
			date.setHours(0);
		}

		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	},
	timePart:function(date, copy){
		if (copy) date = this.copy(date);
		return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
	},
	copy:function(date){
		return new Date(date.valueOf());
	},
	equal:function(a,b){
		if (!a || !b) return false;
		return a.valueOf() === b.valueOf();
	},
	isHoliday:function(day){ 
		day = day.getDay();
		if (day === 0 || day==6) return "webix_cal_event"; 
	}
};


webix.i18n = {
	_dateMethods:["fullDateFormat", "timeFormat", "dateFormat", "longDateFormat", "parseFormat", "parseTimeFormat"],
	parseFormat:"%Y-%m-%d %H:%i",
	parseTimeFormat:"%H:%i",
	numberFormat:webix.Number.format,
	priceFormat:function(value){ return webix.i18n._price_format(webix.i18n.numberFormat(value, webix.i18n._price_settings)); },

	setLocale:function(locale){
		var extend = function(base,source){
			for (var method in source){
				if(typeof(source[method]) == "object" && !webix.isArray(source[method])){
					if(!base[method]){
						base[method] = {};
					}
					extend(base[method],source[method]);
				}
				else
					base[method] = source[method];
			}
		};

		if (typeof locale == "string")
			locale = this.locales[locale];
		if (locale){
			extend(this, locale);
		}
		var helpers = webix.i18n._dateMethods;
		for( var i=0; i<helpers.length; i++){
			var key = helpers[i];
			var utc = webix.i18n[key+"UTC"];
			webix.i18n[key+"Str"] = webix.Date.dateToStr(webix.i18n[key], utc);
			webix.i18n[key+"Date"] = webix.Date.strToDate(webix.i18n[key], utc);
		}

		this._price_format = webix.template(this.price);
		this._price_settings = this.priceSettings || this;

		this.intFormat = webix.Number.numToStr({ groupSize:this.groupSize, groupDelimiter:this.groupDelimiter, decimalSize : 0});
	}
};


webix.i18n.locales={};
webix.i18n.locales["en-US"]={
	groupDelimiter:",",
	groupSize:3,
	decimalDelimiter:".",
	decimalSize:2,

	dateFormat:"%m/%d/%Y",
	timeFormat:"%h:%i %A",
	longDateFormat:"%d %F %Y",
	fullDateFormat:"%m/%d/%Y %h:%i %A",

	price:"${obj}",
	priceSettings:{
        groupDelimiter:",",
        groupSize:3,
        decimalDelimiter:".",
        decimalSize:2
    },
	fileSize: ["b","Kb","Mb","Gb","Tb","Pb","Eb"],
	
	calendar: {
		monthFull:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		dayFull:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    	dayShort:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		hours: "Hours",
		minutes: "Minutes",
		done:"Done",
		clear: "Clear",
		today: "Today"
    },

    controls:{
    	select:"Select"
    }
};
webix.i18n.setLocale("en-US");


/*Data collection mapping logic */

webix.MapCollection = {
    _build_data_map:function(columns){ //for datatable
        var order=[];
        for (var i=0; i<columns.length; i++){
            var map = columns[i].map;
            var id = columns[i].id;
            if (!id) {
                id = columns[i].id = "i"+webix.uid();
                if (!columns[i].header)
                    columns[i].header = "";
            }
            if (map){
                var start = "";
                var end = "";

                if (map.indexOf("(date)")===0){
                    start = "webix.i18n.parseFormatDate("; end=")";
                    if (!columns[i].format) columns[i].format = webix.i18n.dateFormatStr;
                    map = map.replace("(date)","");
                } else if (map.indexOf("(number)")===0){
                    start = "("; end=")*1";
                    map = map.replace("(number)","");
                }

                if (map !== ""){
                    map=map.replace(/\{obj\.([^}]*)\}/g,"\"+(obj.$1||'')+\"");
                    map=map.replace(/#([^#'";, ]+)#/gi,"\"+(obj.$1||'')+\"");
                } else
                    map = "\"+(obj."+id+"||'')+\"";


                order.push("obj."+id+" = "+start+'"'+map+'"'+end+";");
            }

            this._map_options(columns[i]);
        }
        if (order.length){
            try {
                this.data._scheme_init = Function("obj",order.join("\n"));
            } catch(e){
                webix.assert_error("Invalid data map:"+order.join("\n"));
            }
        }
    },
    _map_options:function(element){
        var options = element.options||element.collection;
        if(options){
            if (typeof options === "string"){
                //id of some other view
                var options_view = webix.$$(options);
                //or url
                if (!options_view){
                    options_view = new webix.DataCollection({ url: options });
                    this._destroy_with_me.push(options_view);
                }
                //if it was a view, special check for suggests
                if (options_view.getBody) options_view = options_view.getBody();
                this._bind_collection(options_view, element);
            } else if (!options.loadNext){
                if (options[0] && typeof options[0] == "object"){
                    //[{ id:1, value:"one"}, ...]
                    options = new webix.DataCollection({ data:options });
                    this._bind_collection(options, element);
                    this._destroy_with_me.push(options);
                } else {
                    //["one", "two"]
                    //or
                    //{ 1: "one", 2: "two"}
                    if (webix.isArray(options)){
                        var data = {};
                        for (var ij=0; ij<options.length; ij++) data[options[ij]] = options[ij];
                        element.options = options = data;
                    }
                    element.template = element.template || this._collection_accesser(options, element.id, element.optionslist);
                }
            } else {
                //data collection or view
                this._bind_collection(options, element);
            }
        }
    },
    _bind_collection:function(options, element){
        if (element){
            delete element.options;
            element.collection = options;
            element.template = element.template || this._bind_accesser(options, element.id, element.optionslist);
            var id = options.data.attachEvent("onStoreUpdated", webix.bind(this.refresh, this));
            this.attachEvent("onDestruct", function(){ options.data.detachEvent(id); });
        }
    },
    _collection_accesser:function(options, id, multi){
        if (multi){
            return function(obj, common){
                var value = obj[id] || obj.value;
                if (!value) return "";

                var ids = value.split(",");
                for (var i = 0; i < ids.length; i++)
                    ids[i] = options[ids[i]] || "";
                
                return ids.join(", ");
            };
        } else {
            return function(obj, common){
                return options[obj[id]]||obj.value||"";
            };
        }
    },
    _bind_accesser:function(col, id, multi){
        if (multi) {
            return function(obj, common){
                var value = obj[id] || obj.value;
                if (!value) return "";

                var ids = value.split(",");
                for (var i = 0; i < ids.length; i++){
                    var data = col.data.pull[ids[i]];
                    ids[i] = data ? (data.value  || "") : "";
                }
                
                return ids.join(", ");
            };
        } else {
            return function(obj, common){
                var prop = obj[id]||obj.value,
                    data = col.data.pull[prop];
                if (data && (data.value || data.value ===0))
                    return data.value;
                return "";
            };
        }
    }
};

webix.protoUI({
	name:"datatable",
	defaults:{
		leftSplit:0,
		rightSplit:0,
		columnWidth:100,
		minColumnWidth:20,
		minColumnHeight:26,
		prerender:false,
		autoheight:false,
		autowidth:false,
		header:true,
		fixedRowHeight:true,
		scrollAlignY:true,
		datafetch:50
	},

	$skin:function(){
		var height = webix.skin.$active.rowHeight;
		var defaults = this.defaults;
		defaults.rowHeight = height;
		defaults.headerRowHeight = webix.skin.$active.barHeight;
	},
	on_click:{
		webix_richfilter:function(){
			return false;
		},
		webix_table_checkbox:function(e, id){
			id = this.locate(e);
			
			var item = this.getItem(id.row);
			var col = this.getColumnConfig(id.column);

			var value = (item[id.column] != col.checkValue) ? col.checkValue : col.uncheckValue;
			item[id.column] = value;
			this.callEvent("onCheck", [id.row, id.column, value]);
			this.data.callEvent("onStoreUpdated", [id.row, item, (this._settings.checkboxRefresh?"update":"save")]);
			return false;
		},
		webix_table_radio:function(e){
			var id = this.locate(e);
			
			var item = this.getItem(id.row);
			var col = this.getColumnConfig(id.column);

			var checked = 0;
			this.eachRow(function(rowid){
				var item = this.data.pull[rowid];
				if (item && item[id.column] == col.checkValue)
					item[id.column] = col.uncheckValue;
			});

			item[id.column] = col.checkValue;

			this.callEvent("onCheck", [id.row, id.column, true]);
			this.refresh();
			return false;
		}
	},
	on_dblclick:{
		webix_table_checkbox: function(){
			return this.on_click.webix_table_checkbox.apply(this,arguments);
		}
	},
	on_context:{
	},
	$init:function(config){
		this.on_click = webix.extend({}, this.on_click);
		var html  = "<div class='webix_ss_header'><div class='webix_hs_left'></div><div class='webix_hs_center'></div><div class='webix_hs_right'></div></div><div class='webix_ss_body'><div class='webix_ss_left'><div class='webix_ss_center_scroll'></div></div>";
		    html += "<div class='webix_ss_center'><div class='webix_ss_center_scroll'></div></div>";
		    html += "<div class='webix_ss_right' ><div class='webix_ss_center_scroll'></div></div></div>";
		    html += "<div class='webix_ss_hscroll'></div><div class='webix_ss_footer'><div class='webix_hs_left'></div><div class='webix_hs_center'></div><div class='webix_hs_right'></div></div><div class='webix_ss_vscroll_header'></div><div class='webix_ss_vscroll'></div><div class='webix_ss_vscroll_footer'></div>";

		this._contentobj.innerHTML = html;
		this._top_id = this._contentobj.id = this.name+webix.uid();
		this._contentobj.className +=" webix_dtable";

		this._dataobj = this._contentobj;

		this._header = this._contentobj.firstChild;
		this._body = this._header.nextSibling;
		this._footer = this._body.nextSibling.nextSibling;

		this.data.provideApi(this, true);
		this.data.attachEvent("onParse", webix.bind(this._call_onparse, this));

		this.$ready.push(this._first_render);

		this._columns = [];
		this._headers = [];
		this._footers = [];
		this._rows_cache = [];
		this._active_headers = {};
		this._filter_elements = {};
		this._header_height = this._footer_height = 0;

		//component can create new view
		this._destroy_with_me = [];

		this.data.attachEvent("onServerConfig", webix.bind(this._config_table_from_file, this));
		this.data.attachEvent("onServerOptions", webix.bind(this._config_options_from_file, this));
		this.attachEvent("onViewShow", this._restore_scroll_state);

		webix.callEvent("onDataTable", [this, config]);
	},
	_render_initial:function(){
		this._scrollSizeX = this._scrollSizeY = webix.ui.scrollSize;

		webix.html.addStyle("#"+this._top_id +" .webix_cell { height:"+this._settings.rowHeight+"px; line-height:"+(this._settings.rowLineHeight || this._settings.rowHeight)+"px;" +(this._settings.fixedRowHeight?"":"white-space:normal;")+" }");
		webix.html.addStyle("#"+this._top_id +" .webix_hcell { height:"+this._settings.headerRowHeight+"px; line-height:"+this._settings.headerRowHeight+"px;}");
		this._render_initial = function(){};
	},
	_first_render:function(){
		this.data.attachEvent("onStoreLoad", webix.bind(this.refreshHeaderContent, this));
		this.data.attachEvent("onSyncApply", webix.bind(this.refreshHeaderContent, this));
		this.data.attachEvent("onStoreUpdated", webix.bind(function(){ return this.render.apply(this, arguments); }, this));
		this.data.attachEvent("onStoreUpdated", webix.bind(this._refresh_tracking_header_content, this));
		this.render();
	},
	refresh:function(){
		this.render();
	},
	render:function(id, data, mode){ 
		//pure data saving call
		if (mode == "save") return;
		//during dnd we must not repaint anything in mobile webkit
		if (mode == "move"){
			var context = webix.DragControl.getContext();
			if (context && context.fragile) return;
		}

		if (!this._columns.length){
			var cols = this._settings.columns;
			if (!cols || !cols.length) {
				if (this._settings.autoConfig && this.data.order.length){
					this._dtable_fully_ready = 0;
					this._autoDetectConfig();
				} else
					return;
			}
			this._define_structure();
		}

		if (!this.isVisible(this._settings.id) || this.$blockRender)
			return this._render_initial(); //Chrome 34, Custom Font loading bug

		//replace multiple atomic updates by single big repaint
		if (id && data != -1 && (mode == "paint" || mode == "update")){
			if (this._render_timer)
				clearTimeout(this._render_timer);

			if (!this._render_timer || this._render_timer_id == id){
				this._render_timer_id = id;
				this._render_timer = webix.delay(function(){
					//if only one call - repaint single item
					this.render(id, -1, mode);
				}, this);
			} else {
				this._render_timer_id = null;
				this._render_timer = webix.delay(function(){
					//if ther was a serie of calls - replace them with single full repaint
					this.render();
				}, this);
			}
			return;
		} else if (this._render_timer){
			clearTimeout(this._render_timer);
			this._render_timer = 0;
		}

		if (this.callEvent("onBeforeRender",[this.data])){

			this._render_initial();
			if (!this._dtable_fully_ready)
				this._apply_headers();

			if (this._content_width){
				if (this["_settings"].experimental && (mode == "paint" || mode == "update") && id)
					this._repaint_single_row(id);
				else
					this._check_rendered_cols(true, true);
			}

			if (!id || mode!="update"){
				this._dtable_height = this._get_total_height();
				this._set_split_sizes_y();
			}

			this.callEvent("onAfterRender",[this.data]);
			return true;
		}
	},
	columns_setter:function(value){
		//we need build data mapping before data loading 
		//so moving it in to setter
		this._build_data_map(value);
		return value;
	},
	getColumnConfig:function(id){
		return this._columns_pull[id] || this._hidden_column_hash[id];
	},
	_config_options_from_file:function(colls){
		for (var key in colls){
			var column = this.getColumnConfig(key);
			webix.assert(column, "Orphan collection: "+key);
			var temp = new webix.DataCollection({
				data:colls[key]
			});
			this._destroy_with_me.push(temp);
			this._bind_collection(temp, column);
		}
	},
	//xml has different configuration structure, fixing
	_config_table_from_file:function(config){
		if (config.columns && this._dtable_fully_ready)
			this.refreshColumns();
	},
	_define_structure:function(){
		if (this._settings.columns){
			this._columns = this._settings.columns;
			this._columns_pull = {};

			for (var i = 0; i < this._columns.length; i++){
				var col = this._columns[i];
				this._columns_pull[col.id] = col;

				var format = col.cssFormat;
				if (format)
					col.cssFormat = webix.toFunctor(format, this.$scope);

				col.width = col.width||this._settings.columnWidth;
				if (typeof col.format == "string") 
					col.format = webix.i18n[col.format]||window[col.format];

				//default settings for checkboxes and radios
				if (webix.isUndefined(col.checkValue)) col.checkValue = 1;
				if (webix.isUndefined(col.uncheckValue)) col.uncheckValue = 0;
				
				if (col.css && typeof col.css == "object")
					col.css = webix.html.createCss(col.css);

				var template = col.template;
				if (template){
					if (typeof template == "string")
						template = template.replace(/#\$value#/g,"#"+col.id+"#");
					col.template = webix.template(template);
				}
			}

			this._normalize_headers("header", this._headers);
			this._normalize_headers("footer", this._footers);

			this.callEvent("onStructureLoad",[]);
		}
	},
	_define_structure_and_render:function(){
		this._apply_headers();
	},
	_apply_headers:function(){
		this._rightSplit = this._columns.length-this._settings.rightSplit;
		this._dtable_width = 0;

		for (var i = 0; i < this._columns.length; i++){
			if (!this._columns[i].node){

				var temp = webix.html.create("DIV");
				temp.style.width = this._columns[i].width + "px";
				this._columns[i].node = temp;
			}
			if (i>=this._settings.leftSplit && i<this._rightSplit)
				this._dtable_width += this._columns[i].width;
		}

		var marks = [];
		
		if (this._settings.rightSplit){
			var nr = this._columns.length-this._settings.rightSplit;
			marks[nr]  =" webix_first";
			marks[nr-1]=" webix_last";
		}
		if (this._settings.leftSplit){
			var nl = this._settings.leftSplit;
			marks[nl]  =" webix_first";
			marks[nl-1]=" webix_last";
		}
		marks[0]  = (marks[0]||"")+" webix_first";
		var last_index = this._columns.length-1;
		marks[last_index] = (marks[last_index]||"")+" webix_last";


		for (var i=0; i<this._columns.length; i++){
			var node = this._columns[i].node;
			node.setAttribute("column", i);
			node.className = "webix_column "+(this._columns[i].css||"")+(marks[i]||'');
		}

		this._create_scrolls();		

		this._set_columns_positions();
		this._set_split_sizes_x();
		this._render_header_and_footer();

		this._dtable_fully_ready = true;
	},
	_set_columns_positions:function(){
		var left = 0;
		for (var i = 0; i < this._columns.length; i++){
			var column = this._columns[i];
			if (i == this._settings.leftSplit || i == this._rightSplit)
				left = 0;

			if (column.node){
				column.node.style.left = left+"px";
				if (this._settings.leftSplit || this._settings.rightSplit){
					webix.html.remove(column.node);
					column.attached = false;
				}
			}
			left += column.width;
		}
	},
	_render_header_and_footer:function(){
		if (!this._header_fix_width)
			this._header_fix_width = 0;
		if (this._settings.header) {
			this._refreshHeaderContent(this._header, 0, 1);
			this._normalize_headers("header", this._headers);
			this._header_height = this._headers._summ;
			this._render_header_section(this._header, "header", this._headers);
		}
		if (this._settings.footer){
			this._refreshHeaderContent(this._footer, 0, 1);
			this._normalize_headers("footer", this._footers);
			this._footer_height = this._footers._summ;
			this._render_header_section(this._footer, "footer", this._footers);
		}	

		this.refreshHeaderContent();
		this._size_header_footer_fix();

		if (this._last_sorted)
			this.markSorting(this._last_sorted, this._last_order);
	},
	_normalize_headers:function(collection, heights){
		var rows = 0;
		
		for (var i=0; i<this._columns.length; i++){
			var data = this._columns[i][collection];
			if (!data || typeof data != "object" || !data.length){
				if (webix.isUndefined(data)){
					if (collection == "header")
						data = this._columns[i].id;
					else
						data = "";
				}
				data = [data]; 
			}
			for (var j = 0; j < data.length; j++){
				if (typeof data[j] != "object")
					data[j] = { text:data[j] };
				if (data[j] && data[j].height) heights[j] = data[j].height;
			}
			rows = Math.max(rows, data.length);
			this._columns[i][collection] = data;
		}


		heights._summ = rows;
		for (var i = rows-1; i >= 0; i--){
			heights[i] = heights[i] || this._settings.headerRowHeight;
			heights._summ += heights[i]*1;
		}

		//set null to cells included in col|row spans
		for (var i=0; i<this._columns.length; i++){
			var col = this._columns[i][collection];
			for (var j=0; j<col.length; j++){
				if (col[j] && col[j].rowspan)
					for (var z=1; z<col[j].rowspan; z++)
						col[j+z] = null;
				if (col[j] && col[j].colspan)
					for (var z=1; z<col[j].colspan; z++)
						this._columns[i+z][collection][j] = null;
			}
		}

		//auto-rowspan cells, which has not enough header lines
		for (var i=0; i<this._columns.length; i++){
			var data = this._columns[i][collection];
			if (data.length < rows){
				var end = data.length-1;
				data[end].rowspan = rows - data.length + 1;
				for (var j=end+1; j<rows; j++)
					data[j]=null;
			}
		}
		return rows;
	},
	_find_header_content:function(sec, id){
		var alltd = sec.getElementsByTagName("TD");
		for (var i = 0; i < alltd.length; i++)
			if (alltd[i].getAttribute("active_id") == id)
				return alltd[i];
	},
	getHeaderContent:function(id){
		var obj = this._find_header_content(this._header, id);
		if (!obj)
			obj = this._find_header_content(this._footer, id);

		if (obj){
			var config = this._active_headers[id];
			var type = webix.ui.datafilter[config.content];

			if (type.getHelper) return type.getHelper(obj, config);
			return {
				getValue:function(){ return type.getValue(obj); },
				setValue:function(value){ return type.setValue(obj, value); }
			};
		}
	},
	_summ_next:function(heights, start, i){
		var summ = i ? -1 : 0;

		i += start;
		for (start; start<i; start++) 
			summ+=heights[start] + 1;

		return summ;
	},
	_render_subheader:function(start, end, width, name, heights){
		if (start == end) return "";

		var html = "<table style='width:"+width+"px' cellspacing='0' cellpadding='0'>";
		for (var i = start; i < end; i++){
			html += "<tr>";
			for (var i = start; i < end; i++)
				html += "<th  style='width:"+this._columns[i].width+"px'></th>";
			html += "</tr>";
		}

		var count = this._columns[0][name].length;
		var block_evs = [];

		for (var j = 0; j < count; j++){
			html += "<tr section='"+name+"'>";
			for (var i = start; i < end; i++){
				var header = this._columns[i][name][j];
				if (header === null) continue;

				if (header.content){
					header.contentId = header.contentId||webix.uid();
					header.columnId = this._columns[i].id;
					header.format = this._columns[i].format;

					webix.assert(webix.ui.datafilter, "Filtering extension was not included");
					webix.assert(webix.ui.datafilter[header.content], "Unknown content type: "+header.content);
					
					header.text = webix.ui.datafilter[header.content].render(this, header);
					this._active_headers[header.contentId] = header;
					this._has_active_headers = true;
				}

				html += "<td column='"+(header.colspan?(header.colspan-1+i):i)+"'";

				var hcss = '';
				if (i==start)	
					hcss+="webix_first";
				var column_pos = i + (header.colspan?header.colspan-1:0);
				if (column_pos>=end-1)
					hcss+=" webix_last";
				if (hcss)
					html+=' class="'+hcss+'"';
				
				var cell_height = heights[j];
				var sheight="";
				if (header.contentId)
					html+=" active_id='"+header.contentId+"'";
				if (header.colspan)
					html+=" colspan='"+header.colspan+"'";
				if (header.rowspan){
					html+=" rowspan='"+header.rowspan+"'";
					cell_height = this._summ_next(this._headers, j, header.rowspan);
				}

				if (cell_height != this._settings.headerRowHeight)
					sheight =" style='line-height:"+cell_height+"px; height:"+cell_height+"px;'";

				var css ="webix_hcell";
				var header_css = header.css;
				if (header_css){
					if (typeof header_css == "object")
						header.css = header_css = webix.html.createCss(header_css);
					css+=" "+header_css;
				}
				if (this._columns[i].$selected)
					css += " webix_sel_hcell";
				
				html+="><div class='"+css+"'"+sheight+">";
				
				var text = (header.text===""?"&nbsp;":header.text);
				if (header.rotate)
					text = "<div class='webix_rotate' style='width:"+(cell_height-10)+"px; transform-origin:center "+(cell_height-15)/2+"px;-webkit-transform-origin:center "+(cell_height-15)/2+"px;'>"+text+"</div>";

				html += text + "</div></td>";
			}
			html += "</tr>";
		}
		html+="</tr></table>";	

		return html;
	},
	showItemByIndex:function(row_ind, column_ind){
		var pager = this._settings.pager;
		if (pager){
			var target = Math.floor(row_ind/pager.size);
			if (target != pager.page)
				webix.$$(pager.id).select(target);
		}

		//parameter will be set to -1, to mark that scroll need not to be adjusted
		if (row_ind != -1){
			var state = this._get_y_range();
			if (row_ind < state[0]+1 || row_ind >= state[1]-1 ){
				//not visible currently
				var summ = this._getHeightByIndexSumm(0,row_ind);
				if (row_ind < state[0]+1){
					//scroll top - show row at top of screen
					summ = Math.max(0, summ-1);
				} else {
					//scroll bottom - show row at bottom of screen
					summ += this._getHeightByIndex(row_ind) - this._dtable_offset_height;
					//because of row rounding we neet to scroll some extra
					//TODO: create a better heuristic
					if (row_ind>0)
						summ += this._getHeightByIndex(row_ind-1)-1;
				}	
				this._y_scroll.scrollTo(summ);
			}
		}
		if (column_ind != -1){
			//ignore split columns - they are always visible
			if (column_ind < this._settings.leftSplit) return;
			if (column_ind >= this._rightSplit) return;

			//very similar to y-logic above
			var state = this._get_x_range();
			if (column_ind < state[0]+1 || column_ind >= state[1]-1 ){
				//not visible currently
				var summ = 0;
				for (var i=this._settings.leftSplit; i<column_ind; i++)
					summ += this._columns[i].width;

				/*jsl:ignore*/
				if (column_ind < state[0]+1){
					//scroll to left border
				} else {
					//scroll to right border
					summ += this._columns[column_ind].width - this._center_width;
				}	
				/*jsl:end*/
				this._x_scroll.scrollTo(summ);
			}
		}		
	},
	showCell:function(row, column){
		if (!column || !row){ 
			//if column or row not provided - take from current selection
			var t=this.getSelectedId(true);
			if (t.length == 1){
				column = column || t[0].column;
				row = row || t[0].row;
			}
		}
		//convert id to index
		column = column?this.getColumnIndex(column):-1;
		row = row?this.getIndexById(row):-1;
		this.showItemByIndex(row, column);

	},
	scrollTo:function(x,y){
		if (!this._x_scroll) return;
		if (this._scrollTo_touch)
			return this._scrollTo_touch(x,y);

		if (x !== null)
			this._x_scroll.scrollTo(x);
		if (y !== null)
			this._y_scroll.scrollTo(y);
	},
	getScrollState:function(){
		if (this._getScrollState_touch)
			return this._getScrollState_touch();

		var top = this._getHeightByIndexSumm(0,(this._render_scroll_top||0));
		return {x:(this._scrollLeft||0), y:(top - (this._render_scroll_shift||0))};
	},
	showItem:function(id){
		this.showItemByIndex(this.getIndexById(id), -1);
	},
	_render_header_section:function(sec, name, heights){
		sec.childNodes[0].innerHTML = this._render_subheader(0, this._settings.leftSplit, this._left_width, name, heights);
		sec.childNodes[1].innerHTML = this._render_subheader(this._settings.leftSplit, this._rightSplit, this._dtable_width, name, heights);
		sec.childNodes[1].onscroll = webix.bind(this._scroll_with_header, this);
		sec.childNodes[2].innerHTML = this._render_subheader(this._rightSplit, this._columns.length, this._right_width, name, heights);
	},
	_scroll_with_header:function(){
		var active = this.getScrollState().x;
		var header = this._header.childNodes[1].scrollLeft;
		if (header != active)
			this.scrollTo(header, null);
	},
	_refresh_tracking_header_content:function(){
		this.refreshHeaderContent(true);
	},
	refreshHeaderContent:function(cellTrackOnly){
		//method called from some other events which can provide first parameter
		//most notable - onStoreLoad
		cellTrackOnly = cellTrackOnly === true;
		
		if (this._settings.header)
			this._refreshHeaderContent(this._header, cellTrackOnly);
		if (this._settings.footer)
			this._refreshHeaderContent(this._footer, cellTrackOnly);
	},
	refreshFilter:function(id){
		this._refreshHeaderContent(this._header,0,1,id);
		this._refreshHeaderContent(this._header,0,0,id);
		this._refreshHeaderContent(this._footer,0,1,id);
		this._refreshHeaderContent(this._footer,0,0,id);
	},
	_refreshHeaderContent:function(sec, cellTrackOnly, getOnly, byId){
		if (this._has_active_headers && sec){
			var alltd = sec.getElementsByTagName("TD");

			for (var i = 0; i < alltd.length; i++){
				if (alltd[i].getAttribute("active_id")){
					var obj = this._active_headers[alltd[i].getAttribute("active_id")];
					if (byId && byId != obj.columnId) continue;

					
					var content = webix.ui.datafilter[obj.content];

					if (getOnly)
						obj.value = content.getValue(alltd[i]);
					else if (!cellTrackOnly || content.trackCells){
						content.refresh(this, alltd[i], obj);
					}
				}
			}
		}
	},
	headerContent:[],
	_set_size_scroll_area:function(obj, height, hdx){
		if (this._scrollSizeY){

			obj.style.height = Math.max(height,1)-1+"px";
			obj.style.width = (this._rightSplit?0:hdx)+this._scrollSizeY-1+"px";

			// temp. fix: Chrome [DIRTY]
			if (webix.env.isWebKit)
				var w = obj.offsetWidth;
		} else 
			obj.style.display = "none";
	},
	_size_header_footer_fix:function(){
		if (this._settings.header)
			this._set_size_scroll_area(this._header_scroll, this._header_height, this._header_fix_width);
		if (this._settings.footer)
			this._set_size_scroll_area(this._footer_scroll, this._footer_height, this._header_fix_width);
	},
	_update_scroll:function(x,y){
		this._scrollSizeY = (this._settings.autoheight || this._settings.scrollY === false) ? 0 : webix.ui.scrollSize;
		this._scrollSizeX = (this._settings.autowidth || this._settings.scrollX === false) ? 0 : webix.ui.scrollSize;
		if (this._x_scroll)
			this._x_scroll._viewobj.style.display =  this._scrollSizeX ? "block" : "none";
		if (this._y_scroll)
			this._y_scroll._viewobj.style.display =  this._scrollSizeY ? "block" : "none";
	},
	_create_scrolls:function(){

		this._scrollTop = 0;
		this._scrollLeft = 0;
		var scrx, scry; scrx = scry = 1;

		if (this._settings.autoheight || this._settings.scrollY === false)
			scry = this._scrollSizeY = 0;
		if (this._settings.autowidth || this._settings.scrollX === false)
			scrx = this._scrollSizeX = 0;
		
		if (webix.env.touch) scrx = scry = 0;

		if (!this._x_scroll){
			this._x_scroll = new webix.ui.vscroll({
				container:this._footer.previousSibling,
				scrollWidth:this._dtable_width,
				scrollSize:this._scrollSizeX,
				scrollVisible:scrx
			});

			//fix for scroll space on Mac
			if (scrx && !this._scrollSizeX && !webix.env.$customScroll)
				this._x_scroll._viewobj.style.position="absolute";

			this._x_scroll.attachEvent("onScroll", webix.bind(this._onscroll_x, this));
		}

		if (!this._y_scroll){
			this._header_scroll = this._footer.nextSibling;
			var vscroll_view = this._header_scroll.nextSibling;
			this._footer_scroll = vscroll_view.nextSibling;

			this._y_scroll = new webix.ui.vscroll({
				container:vscroll_view,
				scrollHeight:100,
				scroll:"y",
				scrollSize:this._scrollSizeY,
				scrollVisible:scry
			});
			this._y_scroll.activeArea(this._body);
			this._x_scroll.activeArea(this._body, true);
			this._y_scroll.attachEvent("onScroll", webix.bind(this._onscroll_y, this));
		}

		if (this._content_width)
			this.callEvent("onResize",[this._content_width, this._content_height]);

		if (webix.env.$customScroll)
			webix.CustomScroll.enable(this);

		this._create_scrolls = function(){};
	},
	columnId:function(index){
		return this._columns[index].id;
	},
	getColumnIndex:function(id){
		for (var i = 0; i < this._columns.length; i++)
			if (this._columns[i].id == id) 
				return i;
		return -1;
	},
	_getNodeBox:function(rid, cid){
		var xs=0, xe=0, ye=0, ys=0;
		var i; var zone = 0;
		for (i = 0; i < this._columns.length; i++){
			if (this._rightSplit == i || this._settings.leftSplit == i){
				xs=0; zone++;
			}
			if (this._columns[i].id == cid) 
				break;
			xs+=this._columns[i].width;
		}
		xe+=this._columns[i].width;

		for (i = 0; i < this.data.order.length; i++){
			if (this.data.order[i] ==rid) 
				break;
			ys+=this._getHeightByIndex(i);
		}
		ye+=this._getHeightByIndex(i);
		return [xs,xe,ys-this._scrollTop,ye, this._body.childNodes[zone]];
	},
	_id_to_string:function(){ return this.row; },
	locate:function(node){
		node = node.target||node.srcElement||node;
		while (node && node.getAttribute){
			if (node.getAttribute("view_id"))
				break;
			var cs = node.className;

			var pos = null;
			if (cs.indexOf("webix_cell")!=-1){
				pos = this._locate(node);
				if (pos) 
					pos.row = this.data.order[pos.rind];
			}
			if (cs.indexOf("webix_hcell")!=-1){
				pos = this._locate(node);
				if (pos)
					pos.header = true;
			}

			if (pos){
				pos.column = this._columns[pos.cind].id;
				pos.toString = this._id_to_string;
				return pos;
			}

			node = node.parentNode;
		}
		return null;
	},
	_locate:function(node){
		var cdiv = node.parentNode;
		if (!cdiv) return null;
		var column = (node.getAttribute("column") || cdiv.getAttribute("column"))*1;
		var row = node.getAttribute("row") || 0;
		if (!row)
			for (var i = 0; i < cdiv.childNodes.length; i++)
				if (cdiv.childNodes[i] == node) 
					row = i+this._columns[column]._yr0;

		return { rind:row, cind:column };
	},
	_updateColsSizeSettings:function(silent){
		if (!this._dtable_fully_ready) return;

		this._set_columns_positions();
		this._set_split_sizes_x();
		this._render_header_and_footer();

		if (!silent)
			this._check_rendered_cols(false, false);
	},
	setColumnWidth:function(col, width, skip_update){
		return this._setColumnWidth( this.getColumnIndex(col), width, skip_update);
	},
	_setColumnWidth:function(col, width, skip_update){
		if (isNaN(width)) return;
		var column = this._columns[col];

		if (column.minWidth && width < column.minWidth)
			width = column.minWidth;
		else if (width<this._settings.minColumnWidth)
			width = this._settings.minColumnWidth;		

		var old = column.width;
		if (old !=width){
			if (col>=this._settings.leftSplit && col<this._rightSplit)
				this._dtable_width += width-old;
			
			column.width = width;
			if (column.node) //method can be called from onStructLoad
				column.node.style.width = width+"px";
			else 
				return false;

			if(!skip_update)
				this._updateColsSizeSettings();

			this.callEvent("onColumnResize", [column.id]);
			return true;
		}
		return false;
	},
	_getHeightByIndex:function(index){
		var id = this.data.order[index];
		if (!id) return this._settings.rowHeight;
		return this.data.pull[id].$height || this._settings.rowHeight;
	},
	_getHeightByIndexSumm:function(index1, index2){
		if (this._settings.fixedRowHeight)
			return (index2-index1)*this._settings.rowHeight;
		else {
			var summ = 0;
			for (; index1<index2; index1++)
				summ += this._getHeightByIndex(index1);
			return summ;
		}
	},
	_cellPosition:function(row, column){
		if (arguments.length == 1){
			column = row.column; row = row.row;
		}
		var item = this.getItem(row);
		var config = this.getColumnConfig(column);
		var left = 0;
		var parent = 0;

		for (var index=0; index < this._columns.length; index++){
			if (index == this._settings.leftSplit || index == this._rightSplit)
				left = 0;
			var leftcolumn = this._columns[index];
			if (leftcolumn.id == column){
				var split_column = index<this._settings.leftSplit ? 0 :( index >= this._rightSplit ? 2 : 1);
				parent = this._body.childNodes[split_column].firstChild;
				break;
			}

			left += leftcolumn.width;
		}

		var max = this.data.order.length;
		var top = this._getHeightByIndexSumm((this._render_scroll_top||0),  this.getIndexById(row));

		return {
			parent: parent,
			top:	top + (this._render_scroll_shift||0),
			left:	left,
			width:	config.width,
			height:	(item.$height || this._settings.rowHeight)
		};
	},
	_get_total_height:function(){
		var pager  = this._settings.pager;
		var start = 0;
		var max = this.data.order.length;
		
		if (pager){
			start = pager.size * pager.page;
			max = Math.min(max, start + pager.size);
			if (pager.level){
				start = this.data.$min;
				max = this.data.$max;
			}
		}

		return this._getHeightByIndexSumm(start, max);
	},
	setRowHeight:function(rowId, height){
		if (isNaN(height)) return;
		if (height<this._settings.minColumnHeight)
			height = this._settings.minColumnHeight;

		var item = this.getItem(rowId);
		var old_height = item.$height||this._settings.rowHeight;

		if (old_height != height){
			item.$height = height;
			this.config.fixedRowHeight = false;
			this.render();
			this.callEvent("onRowResize", [rowId]);
		}
	},	
	_onscroll_y:function(value){
		this._body.childNodes[1].scrollTop = this._scrollTop = value;
		if (!this._settings.prerender){
			this._check_rendered_cols();
		}
		else {
			var conts = this._body.childNodes;
			for (var i = 0; i < conts.length; i++){
				conts[i].scrollTop = value;
			}
		}

		if (webix.env.$customScroll) webix.CustomScroll._update_scroll(this._body);
		this.callEvent("onScrollY",[]);
	},
	_onscroll_x:function(value){ 
		this._body.childNodes[1].scrollLeft = this._scrollLeft = value;
		if (this._settings.header)
			this._header.childNodes[1].scrollLeft = value;
		if (this._settings.footer)
			this._footer.childNodes[1].scrollLeft = value;
		if (this._settings.prerender===false)
			this._check_rendered_cols(this._minimize_dom_changes?false:true);

		if (webix.env.$customScroll) webix.CustomScroll._update_scroll(this._body);
		this.callEvent("onScrollX",[]);
	},
	_get_x_range:function(full){
		if (full) return [0,this._columns.length];

		var t = this._scrollLeft;
		
		var xind = this._settings.leftSplit;
		while (t>0){
			t-=this._columns[xind].width;
			xind++;
		}
		var xend = xind;
		if (t) xind--;

		t+=this._center_width;
		while (t>0 && xend<this._rightSplit){
			t-=this._columns[xend].width;
			xend++;
		}

		return [xind, xend];
	},
	getVisibleCount:function(){
		return Math.floor((this._dtable_offset_height) / this.config.rowHeight);
	},
	//returns info about y-scroll position
	_get_y_range:function(full){
		var t = this._scrollTop;
		var start = 0; 
		var end = this.count();

		//apply pager, if defined
		var pager = this._settings.pager;
		if (pager){
			var start = pager.page*pager.size;
			var end = Math.min(end, start+pager.size);
			if (pager.level){
				start = this.data.$min;
				end = this.data.$max;
			}
		}

		//in case of autoheight - request full rendering
		if (this._settings.autoheight)
			return [start, end, 0];

		
		

		if (full) return [start, end];
		var xind = start;
		var rowHeight = this._settings.fixedRowHeight?this._settings.rowHeight:0;
		if (rowHeight){
			var dep = Math.ceil(t/rowHeight);
			t -= dep*rowHeight;
			xind += dep;
		} else
			while (t>0){
				t-=this._getHeightByIndex(xind);
				xind++;
			}

		//how much of the first cell is scrolled out
		var xdef = (xind>0 && t)?-(this._getHeightByIndex(xind-1)+t):0;
		var xend = xind;
		if (t) xind--;

		t+=(this._dtable_offset_height||this._content_height);

		if (rowHeight){
			var dep = Math.ceil(t/rowHeight);
			t-=dep*rowHeight;
			xend+=dep;

			if (xend>end)
				xend = end;
		} else
			while (t>0 && xend<end){
				t-=this._getHeightByIndex(xend);
				xend++;
			}

		return [xind, xend, xdef];
	},
	_repaint_single_row:function(id){
		var item = this.getItem(id);
		var rowindex = this.getIndexById(id);

		var state = this._get_y_range();
		//row not visible
		if (rowindex < state[0] || rowindex >= state[1]) return;

		//get visible column
		var x_range = this._get_x_range();
		for (var i=0; i<this._columns.length; i++){
			var column = this._columns[i];

			//column not visible
			if (i < this._rightSplit && i >= this._settings.leftSplit && ( i<x_range[0] || i > x_range[1]))
				column._yr0 = -999; //ensure that column will not be reused

			if (column.attached && column.node){
				var node =  column.node.childNodes[rowindex-state[0]];
				var value = this._getValue(item, this._columns[i], 0);

				node.innerHTML = value;
				node.className = this._getCss(this._columns[i], value, item, id);
			}
		}
	},
	_check_rendered_cols:function(x_scroll, force){
		if (!this._columns.length) return;

		if (force)
			this._clearColumnCache();

		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id);


		var xr = this._get_x_range(this._settings.prerender);
		var yr = this._get_y_range(this._settings.prerender === true);

		if (x_scroll){
			for (var i=this._settings.leftSplit; i<xr[0]; i++)
				this._hideColumn(i, force);
			for (var i=xr[1]; i<this._rightSplit; i++)
				this._hideColumn(i, force);
		}

		this._render_full_rows = [];
		var rendered = 0;

		for (var i=0; i<this._settings.leftSplit; i++)
			rendered += this._renderColumn(i,yr,force);
		for (var i=xr[0]; i<xr[1]; i++)
			rendered += this._renderColumn(i,yr,force, i == xr[0]);
		for (var i=this._rightSplit; i<this._columns.length; i++)
			rendered += this._renderColumn(i,yr,force);

		this._check_and_render_full_rows(yr[0], yr[1], force);
		this._check_load_next(yr);
	},
	_delete_full_rows:function(start, end){
		this._rows_cache_start = start;
		this._rows_cache_end = end;

		webix.html.remove(this._rows_cache);
		this._rows_cache=[];
	},
	_check_and_render_full_rows:function(start, end, force){
		if (!force && start == this._rows_cache_start && end == this._rows_cache_end)
			return;

		this._delete_full_rows(start, end);

		if (this._render_full_row_some)
			this._render_full_row_some = false;
		else return;

		for (var i=0; i<this._render_full_rows.length; i++){
			var info = this._render_full_rows[i];
			var item = this.getItem(info.id);

			var value;
			if (typeof item.$row == "function"){
				value = item.$row.call(this, item, this.type);
			} else {
				value = this._getValue(item, this.getColumnConfig(item.$row), i);
			}

			var row = this._rows_cache[i] = webix.html.create("DIV", null , value);
			row.className = "webix_cell webix_dtable_colrow";
			row.setAttribute("column", 0);
			row.setAttribute("row", info.index);
			if (item.$height) 
				row.style.height = item.$height+"px";

			row.style.top =  info.top + "px";
			this._body.appendChild(row);
		}
	},
	_check_load_next:function(yr){
		var paging = this._settings.pager;
		var fetch = this._settings.datafetch;
		
		var direction = (!this._last_valid_render_pos || yr[0] >= this._last_valid_render_pos);
		this._last_valid_render_pos = yr[0];

		if (this._data_request_flag){
			if (paging && (!fetch || fetch >= paging.size))
				if (this._check_rows([0,paging.size*paging.page], Math.max(fetch, paging.size), true)) 
					return (this._data_request_flag = null);
					
			this._run_load_next(this._data_request_flag, direction);
			this._data_request_flag = null;
		} else {
			if (this._settings.loadahead)
				var check = this._check_rows(yr, this._settings.loadahead, direction);
		}
	},
	_check_rows:function(view, count, dir){
		var start = view[1];
		var end = start+count;
		if (!dir){
			start = view[0]-count;
			end = view[0];
		}

		if (start<0) start = 0;
		end = Math.min(end, this.data.order.length-1);

		var result = false;			
		for (var i=start; i<end; i++)
			if (!this.data.order[i]){
				if (!result)
					result = { start:i, count:(end-start) };
				else {
					result.last = i;
					result.count = (i-start);
				}
			}
		if (result){			
			this._run_load_next(result, dir);
			return true;
		}
	},
	_run_load_next:function(conf, direction){
		var count = Math.max(conf.count, (this._settings.datafetch||this._settings.loadahead||0));
		var start = direction?conf.start:(conf.last - count+1);
		
		if (this._maybe_loading_already(conf.count, conf.start)) return;
		this.loadNext(count, start);
	},
	_hideColumn:function(index){
		var col = this._columns[index];
		webix.html.remove(col.node);
		col.attached = false;
	},
	_clearColumnCache:function(){
		for (var i = 0; i < this._columns.length; i++)
			this._columns[i]._yr0 = -1;

		if (this._rows_cache.length){
			webix.html.remove(this._rows_cache);
			this._rows_cache = [];
		}
	},
	getText:function(row_id, column_id){
		return this._getValue(this.getItem(row_id), this.getColumnConfig(column_id), 0);
	},
	_getCss:function(config, value, item, id){
		var css = "webix_cell";
				
		if (config.cssFormat){
			var per_css = config.cssFormat(value, item, id, config.id);
			if (per_css){
				if (typeof per_css == "object")
					css+= " "+webix.html.createCss(per_css);
				else
					css+=" "+per_css;
			}
		}

		var row_css = item.$css;
		if (row_css){
			if (typeof row_css == "object")
				item.$css = row_css = webix.html.createCss(row_css);
			css+=" "+row_css;
		}

		var mark = this.data._marks[id];
		if (mark){
			if (mark.$css)
				css+=" "+mark.$css;
			if (mark.$cellCss){
				var mark_marker = mark.$cellCss[config.id];
				if (mark_marker)
					css+=" "+mark_marker;
			}
		}

		if (item.$cellCss){
			var css_marker = item.$cellCss[config.id];
			if (css_marker){
				if (typeof css_marker == "object")
					css_marker = webix.html.createCss(css_marker);
				css += " "+css_marker;
			}
		}

		//cell-selection
		var selected = this.data.getMark(item.id,"webix_selected");
		if ((selected && (selected.$row || selected[config.id]))||config.$selected) css+=this._select_css;

		return css;
	},
	_getValue:function(item, config, i){
		if (!item)
			return "";

		var value;

		value = item[config.id];
		if (value === webix.undefined || value === null)
			value = "";
		else if (config.format)
			value = config.format(value);
		if (config.template)
			value = config.template(item, this.type, value, config, i);

		return value;
	},
	//we don't use render-stack, but still need a place for common helpers
	//so creating a simple "type" holder
	type:{
		checkbox:function(obj, common, value, config){
			var checked = (value == config.checkValue) ? 'checked="true"' : '';
			return "<input class='webix_table_checkbox' type='checkbox' "+checked+">";
		},
		radio:function(obj, common, value, config){
			var checked = (value == config.checkValue) ? 'checked="true"' : '';
			return "<input class='webix_table_radio' type='radio' "+checked+">";
		},
		editIcon:function(){
			return "<span class='webix_icon fa-pencil'></span>";
		},
		trashIcon:function(){
			return "<span class='webix_icon fa-trash'></span>";
		}
	},
	type_setter:function(value){
		if(!this.types || !this.types[value])
			webix.type(this, value);
		else {
			this.type = webix.clone(this.types[value]);
			if (this.type.css) 
				this._contentobj.className+=" "+this.type.css;
		}
		if (this.type.on_click)
			webix.extend(this.on_click, this.type.on_click);

		return value;
	},
	_renderColumn:function(index,yr,force, single){
		var col = this._columns[index];
		if (!col.attached){
			var split_column = index<this._settings.leftSplit ? 0 :( index >= this._rightSplit ? 2 : 1);
			this._body.childNodes[split_column].firstChild.appendChild(col.node);
			col.attached = true;
			col.split = split_column;
		}

		this._render_scroll_top = yr[0];
		this._render_scroll_shift = 0;

		//if columns not aligned during scroll - set correct scroll top value for each column
		var total = 0;
		if (this._settings.scrollAlignY){
			if ((yr[1] == this.data.order.length) || (this.data.$pagesize && yr[1] % this.data.$pagesize === 0 )){
				total = (this._render_scroll_shift = yr[2]);
				col.node.style.top = total+"px";
			 } else if (col._yr2)
				col.node.style.top = "0px";
		} else {
			this._render_scroll_shift = yr[2];
			if (yr[2] != col._yr2){
				total = yr[2];
				col.node.style.top = total+"px";
			}
		}

		if (!force && (col._yr0 == yr[0] && col._yr1 == yr[1])) return 0;
		
		var html="";
		var config = this._settings.columns[index];
		var rowHeight = this._settings.rowHeight;


		for (var i = yr[0]; i < yr[1]; i++){
			var id = this.data.order[i];
			var item = this.data.getItem(id);
			var value;
			if (item){
				if (single && item.$row){
					this._render_full_row_some = true;
					this._render_full_rows.push({ top:total, id:item.id, index:i});
					html+="<div class='webix_cell'></div>";
					total += rowHeight;
					continue;
				}
				var value = this._getValue(item, config, i);
				var css = this._getCss(config, value, item, id);
				
				if (item.$height){
					html+="<div class='"+css+"' style='height:"+item.$height+"px'>"+value+"</div>";
					total += item.$height - rowHeight;
				} else {
					html+="<div class='"+css+"'>"+value+"</div>";
				}
			} else {
				html+="<div class='webix_cell'></div>";
				if (!this._data_request_flag)
					this._data_request_flag = {start:i, count:yr[1]-i};
				else
					this._data_request_flag.last = i;
			}
			total += rowHeight;
		}
		col.node.innerHTML = html;
		col._yr0=yr[0];
		col._yr1=yr[1];
		col._yr2=yr[2];
		return 1;
	},
	_set_split_sizes_y:function(){
		if (!this._columns.length || isNaN(this._content_height*1)) return;
		webix.debug_size_box(this, ["y-sizing"], true);

		var wanted_height = this._dtable_height+(this._scrollSizeX?this._scrollSizeX:0);
		if ((this._settings.autoheight || this._settings.yCount) && this.resize())
			return;

		this._y_scroll.sizeTo(this._content_height, this._header_height, this._footer_height);
		this._y_scroll.define("scrollHeight", wanted_height);

		this._dtable_offset_height =  Math.max(0,this._content_height-this._scrollSizeX-this._header_height-this._footer_height);
		for (var i = 0; i < 3; i++){

			this._body.childNodes[i].style.height = this._dtable_offset_height+"px";
			if (this._settings.prerender)
				this._body.childNodes[i].firstChild.style.height = this._dtable_height+"px";
			else
				this._body.childNodes[i].firstChild.style.height = this._dtable_offset_height+"px";
		}
	},
	_set_split_sizes_x:function(){
		if (!this._columns.length) return;
		if (webix.debug_size) webix.log("  - "+this.name+"@"+this._settings.id+" X sizing");

		var index = 0; 
		this._left_width = 0;
		this._right_width = 0;
		this._center_width = 0;

		while (index<this._settings.leftSplit){
			this._left_width += this._columns[index].width;
			index++;
		}

		index = this._columns.length-1;
		
		while (index>=this._rightSplit){
			this._right_width += this._columns[index].width;
			index--;
		}

		if (!this._content_width) return; 

		if (this._settings.autowidth && this.resize())
			return;

		this._center_width = this._content_width - this._right_width - this._left_width - this._scrollSizeY;

		this._body.childNodes[1].firstChild.style.width = this._dtable_width+"px";

		this._body.childNodes[0].style.width = this._left_width+"px";
		this._body.childNodes[1].style.width = this._center_width+"px";
		this._body.childNodes[2].style.width = this._right_width+"px";
		this._header.childNodes[0].style.width = this._left_width+"px";
		this._header.childNodes[1].style.width = this._center_width+"px";
		this._header.childNodes[2].style.width = this._right_width+"px";
		this._footer.childNodes[0].style.width = this._left_width+"px";
		this._footer.childNodes[1].style.width = this._center_width+"px";
		this._footer.childNodes[2].style.width = this._right_width+"px";

		var delta = this._center_width - this._dtable_width;
		if (delta<0) delta=0; //negative header space has not sense

		if (delta != this._header_fix_width){
			this._header_fix_width = delta;
			this._size_header_footer_fix();
		}

		// temp. fix: Chrome [DIRTY]
		if (webix.env.isWebKit){
			var w = this._body.childNodes[0].offsetWidth;
			w = this._body.childNodes[1].offsetWidth;
			w = this._body.childNodes[2].offsetWidth;
		}

		this._x_scroll.sizeTo(this._content_width-this._scrollSizeY);
		this._x_scroll.define("scrollWidth", this._dtable_width+this._left_width+this._right_width);
	},
	$getSize:function(dx, dy){
		if ((this._settings.autoheight || this._settings.yCount) && this._settings.columns){
			//if limit set - use it
			var desired = ((this._settings.yCount || 0) * this._settings.rowHeight);
			//else try to use actual rendered size
			//if component invisible - this is not valid, so fallback to all rows
			if (!desired) desired =  this.isVisible() ? this._dtable_height : (this.count() * this._settings.rowHeight);
			//add scroll and check minHeight limit
			this._settings.height = Math.max(desired+(this._scrollSizeX?this._scrollSizeX:0)-1, (this._settings.minHeight||0))+this._header_height+this._footer_height;
		}
		if (this._settings.autowidth && this._settings.columns)
			this._settings.width = Math.max(this._dtable_width+this._left_width+this._right_width+this._scrollSizeY,(this._settings.minWidth||0));

		
		var minwidth = this._left_width+this._right_width+this._scrollSizeY;
		var sizes = webix.ui.view.prototype.$getSize.call(this, dx, dy);


		sizes[0] = Math.max(sizes[0]||minwidth);
		return sizes;
	},
	_restore_scroll_state:function(){
		if (this._x_scroll){
			var state = this.getScrollState();
			this._x_scroll._last_scroll_pos = this._y_scroll._last_scroll_pos = -1;
			this.scrollTo(state.x, state.y);
		}
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.apply(this, arguments)){
			if (this._dtable_fully_ready){
				this.callEvent("onResize",[this._content_width, this._content_height]);
				this._set_split_sizes_x();
				this._set_split_sizes_y();
			}
			this.render();
		}
	},
	_on_header_click:function(column){
		var col = this.getColumnConfig(column);
		if (!col.sort) return;

		var order = 'asc';
		if (col.id == this._last_sorted)
			order = this._last_order == "asc" ? "desc" : "asc";
		
		this._sort(col.id, order, col.sort);
	},
	markSorting:function(column, order){
		if (!this._sort_sign)
			this._sort_sign = webix.html.create("DIV");
		webix.html.remove(this._sort_sign);

		if (order){
			var cell = this._get_header_cell(this.getColumnIndex(column));
			if (cell){
				this._sort_sign.className = "webix_ss_sort_"+order;
				cell.style.position = "relative";
				cell.appendChild(this._sort_sign);
			}

			this._last_sorted = column;
			this._last_order = order;
		} else {
			this._last_sorted = this._last_order = null;
		}
	},
	scroll_setter:function(mode){
		if (typeof mode == "string"){
			this._settings.scrollX = (mode.indexOf("x") != -1);
			this._settings.scrollY = (mode.indexOf("y") != -1);
			return mode;
		} else 
			return (this._settings.scrollX = this._settings.scrollY = mode);
	},
	_get_header_cell:function(column){
		var cells = this._header.getElementsByTagName("TD");
		var maybe = null;
		for (var i = 0; i<cells.length; i++)
			if (cells[i].getAttribute("column") == column && !cells[i].getAttribute("active_id")){
				maybe = cells[i].firstChild;
				if ((cells[i].colSpan||0) < 2) return maybe;
			}
		return maybe;
	},
	_sort:function(col_id, direction, type){
		direction = direction || "asc";
		this.markSorting(col_id, direction);

		if (type == "server"){
			this.loadNext(-1, 0, {
				"before":function(){
					var url = this.data.url;
					this.clearAll();
					this.data.url = url;
				}
			}, 0, 1);
		} else {
			if (type == "text"){
				this.data.each(function(obj){ obj.$text = this.getText(obj.id, col_id); }, this);
				type="string"; col_id = "$text";
			}

			if (typeof type == "function")
				this.data.sort(type, direction);
			else
				this.data.sort(col_id, direction, type || "string");
		}
	},

	//because we using non-standard rendering model, custom logic for mouse detection need to be used
	_mouseEvent:function(e,hash,name,pair){
		e=e||event;
		var trg=e.target||e.srcElement;

		//define some vars, which will be used below
		var css_call = [];
		var css='';
		var id = null;
		var found = false;

		//loop through all parents
		while (trg && trg.parentNode){
			if ((css = trg.className)) {
				css = css.toString().split(" ");

				for (var i = css.length - 1; i >= 0; i--)
					if (hash[css[i]])
						css_call.push(hash[css[i]]);
			}

			if (trg.parentNode.getAttribute){

				var column = trg.parentNode.getAttribute("column") || trg.getAttribute("column");
				if (column){ //we need to ignore TD - which is header|footer
					var  isBody = trg.parentNode.tagName == "DIV";
					found = true;
					if (isBody){
						var index = trg.parentNode.getAttribute("row") || trg.getAttribute("row") || ( webix.html.index(trg) + this._columns[column]._yr0 );
						this._item_clicked = id = { row:this.data.order[index], column:this._columns[column].id};
						id.toString = this._id_to_string;
					} else 
						this._item_clicked = id = { column:this._columns[column].id };
					//some custom css handlers was found
					if (css_call.length){
						for (var i = 0; i < css_call.length; i++) {
							var functor = webix.toFunctor(css_call[i], this.$scope);
							var res = functor.call(this,e,id,trg);
							if (res===false) return;
						}
					}
					
					//call inner handler
					if (isBody){
						if(this.callEvent("on"+name,[id,e,trg])&&pair){
							this.callEvent("on"+pair,[id,e,trg]);
						}
					}
					else if (name == "ItemClick"){
						var isHeader = (trg.parentNode.parentNode.getAttribute("section") == "header");
						if (isHeader && this.callEvent("onHeaderClick", [id, e, trg]))
					 		this._on_header_click(id.column);
					 }
					break;
				} 
			}
			
			trg=trg.parentNode;
		}		
		return found;	//returns true if item was located and event was triggered
	},
	



	showOverlay:function(message){
		if (!this._datatable_overlay){
			var t = webix.html.create("DIV", { "class":"webix_overlay" }, "");
			this._body.appendChild(t);
			this._datatable_overlay = t;
		}
		this._datatable_overlay.innerHTML = message;
	},
	hideOverlay:function(){
		if (this._datatable_overlay){
			webix.html.remove(this._datatable_overlay);
			this._datatable_overlay = null;
		}
	},
	mapCells: function(startrow, startcol, numrows, numcols, callback) {
		if (startrow === null && this.data.order.length > 0) startrow = this.data.order[0];
		if (startcol === null) startcol = this.columnId(0);
		if (numrows === null) numrows = this.data.order.length;
		if (numcols === null) numcols = this._settings.columns.length;

		if (!this.exists(startrow)) return;
		startrow = this.getIndexById(startrow);
		startcol = this.getColumnIndex(startcol);
		if (startcol === null) return;

		for (var i = 0; i < numrows && (startrow + i) < this.data.order.length; i++) {
			var row_ind = startrow + i;
			var row_id = this.data.order[row_ind];
			var item = this.getItem(row_id);
			for (var j = 0; j < numcols && (startcol + j) < this._settings.columns.length; j++) {
				var col_ind = startcol + j;
				var col_id = this.columnId(col_ind);
				item[col_id] = callback(item[col_id], row_id, col_id, i, j);
			}
		}
	},
	_call_onparse: function(driver, data){
		if (!this._settings.columns && driver.getConfig)
			this.define("columns", driver.getConfig(data));
	},
	_autoDetectConfig:function(){
		var test = this.getItem(this.getFirstId());
		var res = this._settings.columns = [];
		for (var key in test)
			if (key != "id")
				res.push({ id:key, header:key[0].toUpperCase()+key.substr(1), sort:"string", editor:"text" });
		if (res.length)
			res[0].fillspace = true;
		if (typeof this._settings.select == "undefined")
			this.define("select", "row");
	}
},webix.AutoTooltip, webix.Group, webix.DataMarks, webix.DataLoader,  webix.MouseEvents, webix.MapCollection, webix.ui.view, webix.EventSystem, webix.Settings);

webix.ui.datafilter = {
	textWaitDelay:500,
	"summColumn":{
		getValue:function(){},
		setValue: function(){},
		refresh:function(master, node, value){ 
			var result = 0;
			master.mapCells(null, value.columnId, null, 1, function(value){
				value = value*1;
				if (!isNaN(value))
					result+=value;
				return value;
			});

			if (value.format)
				result = value.format(result);
			if (value.template)
				result = value.template({value:result});

			node.firstChild.innerHTML = result;
		},
		trackCells:true,
		render:function(master, config){ 
			if (config.template)
				config.template = webix.template(config.template);
			return ""; 
		}
	},
	"masterCheckbox":{
		getValue:function(){},
		setValue:function(){},
		getHelper:function(node, config){
			return {
				check:function(){ config.checked = false; node.onclick(); },
				uncheck:function(){ config.checked = true; node.onclick(); },
				isChecked:function(){ return config.checked; }
			};
		},
		refresh:function(master, node, config){
			node.onclick = function(){
				this.getElementsByTagName("input")[0].checked = config.checked = !config.checked;
				var column = master.getColumnConfig(config.columnId);
				var checked = config.checked ? column.checkValue : column.uncheckValue;
				master.data.each(function(obj){
					obj[config.columnId] = checked;
					master.callEvent("onCheck", [obj.id, config.columnId, checked]);
					this.callEvent("onStoreUpdated", [obj.id, obj, "save"]);
				});
				master.refresh();
			};
		},
		render:function(master, config){ 
			return "<input type='checkbox' "+(config.checked?"checked='1'":"")+">"; 
		}
	},
	"textFilter":{
		getInputNode:function(node){ return node.firstChild.firstChild; },
		getValue:function(node){ return this.getInputNode(node).value;  },
		setValue:function(node, value){ this.getInputNode(node).value=value;  },
		refresh:function(master, node, value){
			node.component = master._settings.id;
			master.registerFilter(node, value, this);

			node._comp_id = master._settings.id;
			if (value.value && this.getValue(node) != value.value) this.setValue(node, value.value);
			node.onclick = webix.html.preventEvent;
			webix.event(node, "keydown", this._on_key_down);
		},
		render:function(master, config){
			if (this.init) this.init(config);
		  	config.css = "webix_ss_filter"; 
		  	return "<input "+(config.placeholder?('placeholder="'+config.placeholder+'" '):"")+"type='text'>"; 
		},
		_on_key_down:function(e, node, value){
			var id = this._comp_id;

			//tabbing through filters must not trigger filtering
			//we can improve this functionality by preserving initial filter value
			//and comparing new one with it
			if ((e.which || e.keyCode) == 9) return;

			if (this._filter_timer) window.clearTimeout(this._filter_timer);
			this._filter_timer=window.setTimeout(function(){
				webix.$$(id).filterByAll();
			},webix.ui.datafilter.textWaitDelay);
		}
	},
	"selectFilter":{
		getInputNode:function(node){ return node.firstChild.firstChild; },
		getValue:function(node){ return this.getInputNode(node).value;  },
		setValue:function(node, value){ this.getInputNode(node).value=value; },
		refresh:function(master, node, value){
			//value - config from header { contet: }
			value.compare = value.compare || function(a,b){ return a == b; };

			node.component = master._settings.id;
			master.registerFilter(node, value, this);

			var data;
			if (value.options)
				data = value.options;
			else
				data = master.collectValues(value.columnId);

			//slow in IE
			//http://jsperf.com/select-options-vs-innerhtml
			var select = document.createElement("select");
			for (var i = 0; i < data.length; i++){
				var option = document.createElement("option");
				option.value = data[i].id;
				option.text = data[i].value;
				select.add(option);
			}

			node.firstChild.innerHTML = "";
			node.firstChild.appendChild(select);

			if (value.value) this.setValue(node, value.value);
			node.onclick = webix.html.preventEvent;

			select._comp_id = master._settings.id;
			webix.event(select, "change", this._on_change);
		},
		render:function(master, config){  
			if (this.init) this.$init(config);
			config.css = "webix_ss_filter"; return ""; },
		_on_change:function(e, node, value){ 
			webix.$$(this._comp_id).filterByAll();
		}
	}
};

webix.ui.datafilter.serverFilter = webix.extend({
	_on_key_down:function(e, node, value){
		var id = this._comp_id;
		var code = (e.which || e.keyCode);

		//ignore tab and navigation keys
		if (code == 9 || ( code >= 33 &&  code <= 40)) return;

		if (this._filter_timer) window.clearTimeout(this._filter_timer);
		this._filter_timer=window.setTimeout(function(){

			webix.$$(id).loadNext(-1,0,{
				before:function(){
					var url = this.data.url;
					if (this.editStop) this.editStop();
					this.clearAll();
					this.data.url = url;
				},
				success:function(){
					this.callEvent("onAfterFilter",[]);
				}
			},0,1);

		},webix.ui.datafilter.textWaitDelay);
	}
}, webix.ui.datafilter.textFilter);

webix.ui.datafilter.serverSelectFilter = webix.extend({
	_on_change:function(e, node, value){
		var id = this._comp_id;
		webix.$$(id).loadNext(-1,0,{
			before:function(){
				var url = this.data.url;
				if (this.editStop) this.editStop();
				this.clearAll();
				this.data.url = url;
			},
			success:function(){
				this.callEvent("onAfterFilter",[]);
			}
		},0,1);
	}
}, webix.ui.datafilter.selectFilter);

webix.ui.datafilter.numberFilter = webix.extend({
	init:function(config){
		config.prepare = function(value, filter){
			var equality = (value.indexOf("=") != -1)?1:0;
			var intvalue = this.format(value);
			if (intvalue === "") return "";

			if (value.indexOf(">") != -1) 
				config.compare = this._greater;
			else if (value.indexOf("<") != -1){
				config.compare = this._lesser;
				equality *= -1;
			}
			else {
				config.compare = this._equal;
				equality = 0;
			}

			return intvalue - equality;
		};
	},
	format:function(value){
		return value.replace(/[^0-9]/g,"");
	},
	_greater:function(a,b){ return a*1>b; },
	_lesser:function(a,b){ return a*1<b; },
	_equal:function(a,b){ return a*1==b; }	
}, webix.ui.datafilter.textFilter);

webix.ui.datafilter.dateFilter = webix.extend({
	format:function(value){
		if (value === "") return "";
		var date = new Date();

		if (value.indexOf("today") != -1){
			date = webix.Date.dayStart(date);
		} else if (value.indexOf("now") == -1){
			var parts = value.match(/[0-9]+/g);
			if (!parts||!parts.length) return "";
			if (parts.length < 3){
				parts.reverse();
				date = new Date(parts[0], (parts[1]||1)-1, 1);
			} else
				date = webix.i18n.dateFormatDate(value.replace(/^[>< =]+/,""));
		}
		return date.valueOf();
	}
}, webix.ui.datafilter.numberFilter);

webix.extend(webix.ui.datatable,{
	find:function(config, first){
		var result = [];
		var count = this.data.count();

		for (var i = 0; i < count; i++){
			var data = this.getItem(this.data.order[i]);
			var match = true;
			if (typeof config == "object"){
				for (var key in config)
					if (data[key] != config[key]){
						match = false;
						break;
					}
			} else if (!config(data))
				match = false;

			if (match)
				result.push(data);

			if (first && result.length)
				return result[0];
		}

		return result;
	},
	filterByAll:function(){
		//we need to use dynamic function creating
		//jshint -W083:true
		this.data.silent(function(){
			this.filter();
			var first = false;
			for (var key in this._filter_elements){
				webix.assert(key, "empty column id for column with filtering");

				var record = this._filter_elements[key];
				var originvalue = record[2].getValue(record[0]);

				//saving last filter value, for usage in getState
				var inputvalue = originvalue;
				if (record[1].prepare)
					inputvalue = record[1].prepare.call(record[2], inputvalue, record[1], this);

				//preserve original value
				record[1].value = originvalue;
				var compare = record[1].compare;

				if (!this.callEvent("onBeforeFilter",[key, inputvalue, record[1]])) continue;

				if (inputvalue === "") continue;
				if (compare)
					this.filter(function(obj, value){
						if (!obj) return false;

						var test = obj[key];
						return compare(test, value, obj);
					}, inputvalue, first);
				else
					this.filter(key, inputvalue, first);
				first = true;
			}
		}, this);
		this.refresh();
		this.callEvent("onAfterFilter",[]);
	},
	filterMode_setter:function(mode){
		return webix.extend(this.data._filterMode, mode, true);
	},
	getFilter:function(columnId){
		var filter = this._filter_elements[columnId];
		webix.assert(filter, "Filter doesn't exists for column in question");

		if (filter && filter[2].getInputNode)
			return filter[2].getInputNode(filter[0]);
		return null;
	},
	registerFilter:function(node, config, obj){
		this._filter_elements[config.columnId] = [node, config, obj];
	},
	collectValues:function(id){
		var values = [{ id:"", value:"" }];
		var checks = { "" : true };

		var obj = this.getColumnConfig(id);
		var options = obj.options||obj.collection;

		if (options){
			if (typeof options == "object" && !options.loadNext){
				//raw object
				if (webix.isArray(options))
					for (var i=0; i<options.length; i++) 
						values.push({ id:options[i], value:options[i] });
				else
					for (var key in options) 
						values.push({ id:key, value:options[key] });
				return values;
			} else {
				//view
				if (typeof options === "string")
					options = webix.$$(options);
				if (options.getBody)
					options = options.getBody();

				this._collectValues.call(options, "id", "value", values, checks);
			}
		} else
			this._collectValues(obj.id, obj.id, values, checks);

		
		return values;
	},
	_collectValues:function(id, value,  values, checks){
		this.data.each(function(obj){
			var test = obj ? obj[value] : "";
			if (!checks[test]){
				checks[test] = true;
				values.push({ id:obj[id], value:test });
			}
		}, this, true);
		values.sort(function(a,b){ return a.value > b.value ? 1 : -1;  });
	}
});


webix.extend(webix.ui.datatable, {
	hover_setter:function(value){
		if (value && !this._hover_initialized){
			this._enable_mouse_move();
			this.config.experimental = true;

			this.attachEvent("onMouseMoving", function(e){
				
				var row = this.locate(arguments[0]);
				row = row ? row.row : null;

				if (this._last_hover != row){
					if (this._last_hover)
						this.removeRowCss(this._last_hover, this._settings.hover);
					
					this._delayed_hover_set();
					this._last_hover = row;
				}
			});

			this.attachEvent("onMouseOut", function(){
				if (this._last_hover){
					this.removeRowCss(this._last_hover, this._settings.hover);
					this._last_hover = null;
				}
			});

			this._hover_initialized = 1;
		}
		return value;
	},
	_delayed_hover_set:function(){
		webix.delay(function(){ 
			if (this._last_hover)
				this.addRowCss( this._last_hover, this._settings.hover );
		}, this, [],  5);
	},
	select_setter:function(value){
		if (!this.select && value){
			webix.extend(this, this._selections._commonselect, true);
			if (value === true)
				value = "row";
			else if (value == "multiselect"){
				value = "row";
				this._settings.multiselect = true;
			}
			webix.assert(this._selections[value], "Unknown selection mode: "+value);
			webix.extend(this, this._selections[value], true);
		}
		return value;
	},
	getSelectedId:function(mode){
		return  mode?[]:""; //dummy placeholder
	},
	getSelectedItem:function(mode){
		return webix.SelectionModel.getSelectedItem.call(this, mode);
	},
	_selections:{
		//shared methods for all selection models
		_commonselect:{
			_select_css:' webix_cell_select',
			$init:function(){
				this._reinit_selection();
				this.on_click.webix_cell = webix.bind(this._click_before_select, this);

				//temporary stab, actual handlers need to be created
				this._data_cleared = this._data_filtered = function(){
					this.unselect();
				};

				this.data.attachEvent("onStoreUpdated",webix.bind(this._data_updated,this));
				this.data.attachEvent("onClearAll", webix.bind(this._data_cleared,this));
				this.data.attachEvent("onAfterFilter", webix.bind(this._data_filtered,this));
				this.data.attachEvent("onIdChange", webix.bind(this._id_changed,this));

				this.$ready.push(webix.SelectionModel._set_noselect);
			},
			_id_changed:function(oldid, newid){
				for (var i=0; i<this._selected_rows.length; i++)
					if (this._selected_rows[i] == oldid)
						this._selected_rows[i] = newid;

				for (var i=0; i<this._selected_areas.length; i++){
					var item = this._selected_areas[i];
					if (item.row == oldid){
						oldid = this._select_key(item);
						item.row = newid;
						newid = this._select_key(item);
						item.id = newid;

						delete this._selected_pull[oldid];
						this._selected_pull[newid] = true;
					}
				}
			},
			_data_updated:function(id, obj, type){
				if (type == "delete") 
					this.unselect(id);
			},
			_reinit_selection:function(){
				//list of selected areas
				this._selected_areas=[];
				//key-value hash of selected areas, for fast search
				this._selected_pull={};
				//used to track selected cell objects
				this._selected_rows = [];
			},
			getSelectedId:function(asArray, plain){
				var result;

				//if multiple selections was created - return array
				//in case of single selection, return value or array, when asArray parameter provided
				if (this._selected_areas.length > 1 || asArray){
					result = [].concat(this._selected_areas);
					if (plain)
						for (var i = 0; i < result.length; i++)
							result[i]=result[i].id;
				} else {
					result = this._selected_areas[0];
					if (plain && result)
						return result.id;
				}

				return result;
			},
			_id_to_string:function(){
				return this.row;
			},
			_select:function(data, preserve){
				var key = this._select_key(data);
				//don't allow selection on unnamed columns
				if (key === null) return;
				data.id = key;
				data.toString = this._id_to_string;

				if (!this.callEvent("onBeforeSelect",[data, preserve])) return false;

				//ignore area, if it was already selected and
				// - we are preserving existing selection
				// - this is the only selected area
				// otherwise we need to clear other selected areas
				if (this._selected_pull[key] && (preserve || this._selected_areas.length == 1)) return;

				if (!preserve)
					this._clear_selection();

				this._selected_areas.push(data);
				this._selected_pull[key] = true;

				this.callEvent("onAfterSelect",[data, preserve]);

				
				this._finalize_select(this._post_select(data));
				return true;
			},
			_clear_selection:function(){
				if (!this._selected_areas.length) return false; 

				for (var i=0; i<this._selected_rows.length; i++){
					var item = this.getItem(this._selected_rows[i]);
					if (item)
						this.data.removeMark(item.id, "webix_selected", 0, 1);
				}
				var cols = this._settings.columns;
				if (cols)
					for (var i = 0; i < cols.length; i++) {
						cols[i].$selected = null;
					}
					
				this._reinit_selection();
				return true;
			},
			clearSelection:function(){
				if (this._clear_selection()){
					this.callEvent("onSelectChange",[]);
					this.render();
				}
			},
			_unselect:function(data){
				var key = this._select_key(data);
				if (!key && this._selected_areas.length){
					this.clearSelection();
					this.callEvent("onSelectChange", []);
				}

				//ignore area, if it was already selected
				if (!this._selected_pull[key]) return;

				if (!this.callEvent("onBeforeUnSelect",[data])) return false;

				for (var i = 0; i < this._selected_areas.length; i++){
					if (this._selected_areas[i].id == key){
						this._selected_areas.splice(i,1);
						break;
					}
				}
				
				delete this._selected_pull[key];

				this.callEvent("onAfterUnselect",[data]);
				this._finalize_select(0, this._post_unselect(data));
			},
			_add_item_select:function(id){
				var item = this.getItem(id);
				return this.data.addMark(item.id, "webix_selected", 0, { $count : 0 }, true);

			},
			_finalize_select:function(id){
				if (id)
					this._selected_rows.push(id);
				if (!this._silent_selection){
					this.render();
					this.callEvent("onSelectChange",[]);	
				}
			},
			_click_before_select:function(e, id){
				var preserve = e.ctrlKey || e.metaKey || (this._settings.multiselect == "touch");
				var range = e.shiftKey;

				if (!this._settings.multiselect && this._settings.select != "multiselect")
					preserve = range = false;

				if (range && this._selected_areas.length){
					var last = this._selected_areas[this._selected_areas.length-1];
					this._selectRange(id, last);
				} else {
					if (preserve && this._selected_pull[this._select_key(id)])
						this._unselect(id);
					else
						this._select({ row: id.row, column:id.column }, preserve);
				}
			},
			_mapSelection:function(callback, column, row){
				var cols = this._settings.columns;
				//selected columns only
				if (column){
					var temp = [];
					for (var i=0; i<cols.length; i++)
						if (cols[i].$selected)
							temp.push(cols[i]);
					cols = temp;
				}

				var rows = this.data.order;
				var row_ind = 0;

				for (var i=0; i<rows.length; i++){
					var item = this.getItem(rows[i]);
					if (!item) continue; //dyn loading, row is not available
					var selection = this.data.getMark(item.id, "webix_selected");
					if (selection || column){
						var col_ind = 0;
						for (var j = 0; j < cols.length; j++){
							var id = cols[j].id;
							if (row || column || selection[id]){
								if (callback)
									item[id] = callback(item[id], rows[i], id, row_ind, col_ind);
								else
									return {row:rows[i], column:id};
								col_ind++;
							}
						}
						//use separate row counter, to count only selected rows
						row_ind++;
					}
				}
			}
		}, 

		row : {
			_select_css:' webix_row_select',
			_select_key:function(data){ return data.row; },
			select:function(row_id, preserve){
				//when we are using id from mouse events
				if (row_id) row_id = row_id.toString();

				webix.assert(this.data.exists(row_id), "Incorrect id in select command: "+row_id);
				this._select({ row:row_id }, preserve);
			},
			_post_select:function(data){
				this._add_item_select(data.row).$row = true;
				return data.row;
			},
			unselect:function(row_id){
				this._unselect({row : row_id});
			},
			_post_unselect:function(data){
				this.data.removeMark(data.row, "webix_selected", 0, 1);
				return data.row;
			},
			mapSelection:function(callback){
				return this._mapSelection(callback, false, true);
			},
			_selectRange:function(a,b){
				return this.selectRange(a.row, b.row);
			},
			selectRange:function(row_id, end_row_id){
				var row_start_ind = this.getIndexById(row_id);
				var row_end_ind = this.getIndexById(end_row_id);

				if (row_start_ind>row_end_ind){
					var temp = row_start_ind;
					row_start_ind = row_end_ind;
					row_end_ind = temp;
				}
				
				this._silent_selection = true;
				for (var i=row_start_ind; i<=row_end_ind; i++)
					this.select(this.getIdByIndex(i),true);
				this._silent_selection = false;
				this._finalize_select();
			}
		},

		cell:{
			_select_key:function(data){
				if (!data.column) return null;
			 	return data.row+"_"+data.column; 
			},
			select:function(row_id, column_id, preserve){
				webix.assert(this.data.exists(row_id), "Incorrect id in select command: "+row_id);
				this._select({row:row_id, column:column_id}, preserve);
			},
			_post_select:function(data){
					var sel = this._add_item_select(data.row);
					sel.$count++;
					sel[data.column]=true;
					return data.row;
			},
			unselect:function(row_id, column_id){
				this._unselect({row:row_id, column:column_id});
			},
			_post_unselect:function(data){
				var sel = this._add_item_select(data.row);
					sel.$count-- ;
					sel[data.column] = false;
					if (sel.$count<=0)
						this.data.removeMark(data.row,"webix_selected");
					return data.row;
			},
			mapSelection:function(callback){
				return this._mapSelection(callback, false, false);
			},
			_selectRange:function(a,b){
				return this.selectRange(a.row, a.column, b.row, b.column);
			},

			selectRange:function(row_id, column_id, end_row_id, end_column_id){
				var row_start_ind = this.getIndexById(row_id);
				var row_end_ind = this.getIndexById(end_row_id);

				var col_start_ind = this.getColumnIndex(column_id);
				var col_end_ind = this.getColumnIndex(end_column_id);

				if (row_start_ind>row_end_ind){
					var temp = row_start_ind;
					row_start_ind = row_end_ind;
					row_end_ind = temp;
				}
				
				if (col_start_ind>col_end_ind){
					var temp = col_start_ind;
					col_start_ind = col_end_ind;
					col_end_ind = temp;
				}

				this._silent_selection = true;
				for (var i=row_start_ind; i<=row_end_ind; i++)
					for (var j=col_start_ind; j<=col_end_ind; j++)
						this.select(this.getIdByIndex(i),this.columnId(j),true);
				this._silent_selection = false;
				this._finalize_select();
			}
		},

		column:{
			_select_css:' webix_column_select',
			_select_key:function(data){ return data.column; },
			_id_to_string:function(){
				return this.column;
			},
			//returns box-like area, with ordered selection cells
			select:function(column_id, preserve){
				this._select({ column:column_id }, preserve);
			},
			_post_select:function(data){
				this._settings.columns[this.getColumnIndex(data.column)].$selected = true;
				if (!this._silent_selection)
					this._render_header_and_footer();
			},
			unselect:function(column_id){
				this._unselect({column : column_id});
			},
			_post_unselect:function(data){
				this._settings.columns[this.getColumnIndex(data.column)].$selected = null;
				this._render_header_and_footer();
			},
			mapSelection:function(callback){
				return this._mapSelection(callback, true, false);
			},
			_selectRange:function(a,b){
				return this.selectRange(a.column, b.column);
			},
			selectRange:function(column_id, end_column_id){
				var column_start_ind = this.getColumnIndex(column_id);
				var column_end_ind = this.getColumnIndex(end_column_id);

				if (column_start_ind>column_end_ind){
					var temp = column_start_ind;
					column_start_ind = column_end_ind;
					column_end_ind = temp;
				}
				
				this._silent_selection = true;
				for (var i=column_start_ind; i<=column_end_ind; i++)
					this.select(this.columnId(i),true);
				this._silent_selection = false;

				this._render_header_and_footer();
				this._finalize_select();
			}
		}
	}
});





webix.extend(webix.ui.datatable, {		
	blockselect_setter:function(value){
		if (value && this._block_sel_flag){
			webix.event(this._viewobj, "mousemove", this._bs_move, this);
			webix.event(this._viewobj, "mousedown", this._bs_down, this);
			webix.event(document.body, "mouseup", this._bs_up, this);
			this._block_sel_flag = this._bs_ready = this._bs_progress = false;	
		}
		return value;
	},
	_block_sel_flag:true,
	_childOf:function(e, tag){
		var src = e.target||e.srcElement;
		while (src){
			if (src.getAttribute && src.getAttribute("webixignore")) return false;
			if (src == tag)
				return true;
			src = src.parentNode;
		}
		return false;
	},
	_bs_down:function(e){
		if (this._childOf(e, this._body)){
			this._bs_position = webix.html.offset(this._body);
			var pos = webix.html.pos(e);
			this._bs_ready = [pos.x - this._bs_position.x, pos.y - this._bs_position.y];
		}
	},
	_bs_up:function(){
		if (this._block_panel){
			var start = this._locate_cell_xy.apply(this, this._bs_ready);
			var end = this._locate_cell_xy.apply(this, this._bs_progress);
			if (start.row && end.row)
				this._selectRange(start, end);
			this._block_panel = webix.html.remove(this._block_panel);
		}
		this._bs_ready = this._bs_progress = false;	
	},
	_bs_start:function(){
		this.clearSelection();
		this._block_panel = webix.html.create("div", {"class":"webix_block_selection"},"");
		this._body.appendChild(this._block_panel);
	},
	_bs_move:function(e){
		if (this._bs_ready !== false){
			var pos = webix.html.pos(e);
			var progress = [pos.x - this._bs_position.x, pos.y - this._bs_position.y];

			//prevent unnecessary block selection while dbl-clicking
			if (Math.abs(this._bs_ready[0] - progress[0]) < 5 && Math.abs(this._bs_ready[1] - progress[1]) < 5)
				return;

			if (this._bs_progress === false)
				this._bs_start(e);

			this._bs_progress = progress;
			this._setBlockPosition(this._bs_ready[0], this._bs_ready[1], this._bs_progress[0], this._bs_progress[1]);
		}
	},
	_setBlockPosition:function(x1,y1,x2,y2){
		var style = this._block_panel.style;
		
		var startx = Math.min(x1,x2);
		var endx = Math.max(x1,x2);

		var starty = Math.min(y1,y2);
		var endy = Math.max(y1,y2);

		style.left = startx+"px";
		style.top = starty+"px";
		style.width = (endx-startx)+"px";
		style.height = (endy-starty)+"px";
	},
	_locate_cell_xy:function(x,y){
		if (this._right_width && x>this._left_width + this._center_width)
			x+= this._x_scroll.getSize()-this._center_width-this._left_width-this._right_width; 
		else if (!this._left_width || x>this._left_width)
			x+= this._x_scroll.getScroll();

			
		y += this.getScrollState().y;

		var row = null;
		var column = null;

		if (x<0) x=0;
		if (y<0) y=0;

		var cols = this._settings.columns;
		var rows = this.data.order;

		var summ = 0; 
		for (var i=0; i<cols.length; i++){
			summ+=cols[i].width;
			if (summ>=x){
				column = cols[i].id;
				break;
			}
		}
		if (!column)
			column = cols[cols.length-1].id;

		summ = 0;
		if (this._settings.fixedRowHeight){
			row = rows[Math.floor(y/this._settings.rowHeight)];
		} else for (var i=0; i<rows.length; i++){
			summ+=this._getHeightByIndex(i);
			if (summ>=y){
				row = rows[i];
				break;
			}
		}
		if (!row)
			row = rows[rows.length-1];

		return {row:row, column:column};
	}
});
webix.protoUI({
	name:"resizearea",
	defaults:{
		dir:"x"
	},
	$init:function(config){
		var dir = config.dir||"x";
		var node = webix.toNode(config.container);
        var size = (dir=="x"?"width":"height");
		var margin = (config.margin? config.margin+"px":0);

		this._key_property = (dir == "x"?"left":"top");

		this._viewobj = webix.html.create("DIV",{
			"class"	: "webix_resize_area webix_dir_"+dir
		});
		//[[COMPAT]] FF12 can produce 2 move events
		webix.event(this._viewobj, webix.env.mouse.down, webix.html.stopEvent);

		if(margin){
			if(dir=="x")
				margin = margin+" 0 "+margin;
			else
				margin = "0 "+margin+" 0 "+margin;
		}
		this._dragobj = webix.html.create("DIV",{
			"class"	: "webix_resize_handle_"+dir,
			 "style" : (margin?"padding:"+margin:"")
		},"<div class='webix_handle_content'></div>");

		this._originobj = webix.html.create("DIV",{
			"class"	: "webix_resize_origin_"+dir
		});

        if(config[size]){
            this._originobj.style[size] = config[size]+(config.border?1:0)+"px";
            this._dragobj.style[size] = config[size]+"px";
        }
		if (config.cursor)
			this._dragobj.style.cursor = this._originobj.style.cursor = this._viewobj.style.cursor = config.cursor;
		this._moveev =	webix.event(node, webix.env.mouse.move, this._onmove, this);
		this._upev =	webix.event(document.body, webix.env.mouse.up, this._onup, this);

		this._dragobj.style[this._key_property] = this._originobj.style[this._key_property] = config.start+"px";

		node.appendChild(this._viewobj);
		node.appendChild(this._dragobj);
		node.appendChild(this._originobj);
	},
	_onup:function(){

		this.callEvent("onResizeEnd", [this._last_result]);

		webix.eventRemove(this._moveev);
		webix.eventRemove(this._upev);

		webix.html.remove(this._viewobj);
		webix.html.remove(this._dragobj);
		webix.html.remove(this._originobj);
		this._viewobj = this._dragobj = this._originobj = null;
	},
	_onmove:function(e){
		var pos = webix.html.pos(e);
		this._last_result = (this._settings.dir == "x" ? pos.x : pos.y)+this._settings.start-this._settings.eventPos;
		this._dragobj.style[this._key_property] = this._last_result+"px";
		this.callEvent("onResize", [this._last_result]);
	}
}, webix.EventSystem, webix.Settings);
webix.extend(webix.ui.datatable, {

	resizeRow_setter:function(value){
		this._settings.scrollAlignY = false;
		this._settings.fixedRowHeight = false;
		return this.resizeColumn_setter(value);
	},
	resizeColumn_setter:function(value){
		if (value && this._rs_init_flag){
			webix.event(this._viewobj, "mousemove", this._rs_move, this);
			webix.event(this._viewobj, "mousedown", this._rs_down, this);
			webix.event(this._viewobj, "mouseup", this._rs_up, this);
			this._rs_init_flag = false;
		}
		return value;
	},

	_rs_init_flag:true,

	_rs_down:function(e){
		//if mouse was near border
		if (!this._rs_ready) return;
		this._rs_process = [webix.html.pos(e),this._rs_ready[2]];
		webix.html.denySelect();
	},
	_rs_up:function(){
		this._rs_process = false;
		webix.html.allowSelect();
	},
	_rs_start:function(e){
		e = e||event;
		if(this._rs_progress)
			return;
		var dir  = this._rs_ready[0];
		var node = this._rs_process[1];
		var obj  = this._locate(node);
		if (!obj) return;

		var eventPos = this._rs_process[0];
		var start;

		if (dir == "x"){
			start = webix.html.offset(node).x+this._rs_ready[1] - webix.html.offset(this._body).x;
			eventPos = eventPos.x;
			if (!this._rs_ready[1]) obj.cind-=(node.parentNode.colSpan||1);
		} else {
			start = webix.html.offset(node).y+this._rs_ready[1] - webix.html.offset(this._body).y+this._header_height;
			eventPos = eventPos.y;
			if (!this._rs_ready[1]) obj.rind--;
		}
		if (obj.cind>=0 && obj.rind>=0){
			this._rs_progress = [dir, obj, start];
			
			var resize = new webix.ui.resizearea({
				container:this._viewobj,
				dir:dir,
				eventPos:eventPos,
				start:start,
				cursor:(dir == "x"?"e":"n")+"-resize"
			});
			resize.attachEvent("onResizeEnd", webix.bind(this._rs_end, this));
		}
		this._rs_down = this._rs_ready = false;
	},
	_rs_end:function(result){
		if (this._rs_progress){
			var dir = this._rs_progress[0];
			var obj = this._rs_progress[1];
			var newsize = result-this._rs_progress[2];
			if (dir == "x"){
				
				//in case of right split - different sizing logic applied
				if (this._settings.rightSplit && obj.cind+1>=this._rightSplit &&
					obj.cind !== this._columns.length - 1)
				{
					obj.cind++;
					newsize *= -1;
				}
				
				var oldwidth = this._columns[obj.cind].width;
				this._setColumnWidth(obj.cind, oldwidth + newsize);
			}
			else {
				var rid = this.getIdByIndex(obj.rind);
				var oldheight = this.getItem(rid).$height||this._settings.rowHeight;
				this.setRowHeight(rid, oldheight + newsize);
			}
			this._rs_up();
		}
		this._rs_progress = null;
	},
	_rs_move:function(e){
		if (this._rs_ready && this._rs_process)
			return this._rs_start(e);

		e = e||event;
		var node = e.target||e.srcElement;
		var mode = false; //resize ready flag

		if (node.tagName == "TD" || node.tagName == "TABLE") return ;
		var element_class = node.className||"";
		var in_body = element_class.indexOf("webix_cell")!=-1;
		//ignore resize in case of drag-n-drop enabled
		if (in_body && this.config.drag) return;
		var in_header = element_class.indexOf("webix_hcell")!=-1;
		this._rs_ready = false;
		
		if (in_body || in_header){
			var dx = node.offsetWidth;
			var dy = node.offsetHeight;
			var pos = webix.html.posRelative(e);
			
			if (in_body && this._settings.resizeRow){
				if (pos.y<3){
					this._rs_ready = ["y", 0, node];
					mode = "n-resize";
				} else if (dy-pos.y<4){
					this._rs_ready = ["y", dy, node];
					mode = "n-resize";
				} 
				
			}
			if (this._settings.resizeColumn){
				if (pos.x<3){
					this._rs_ready = ["x", 0, node];
					mode = "e-resize";
				} else if (dx-pos.x<4){
					this._rs_ready = ["x", dx, node];
					mode = "e-resize";
				}
			}
		}
		
		//mark or unmark resizing ready state
		if (this._cursor_timer) window.clearTimeout(this._cursor_timer);
		this._cursor_timer = webix.delay(this._mark_resize_ready, this, [mode], mode?100:0);
	},

	_mark_resize_ready:function(mode){
		if (this._last_cursor_mode != mode){
			this._last_cursor_mode = mode;
			this._viewobj.style.cursor=mode||"default";
		}
	}
});


webix.extend(webix.ui.datatable,webix.PagingAbility);

webix.csv = {
	escape:true,
	delimiter:{
		rows: "\n",
		cols: "\t"
	},
	parse:function(text, sep){
		sep = sep||this.delimiter;
		if (!this.escape)
			return this._split_clip_data(text, sep);

		var lines = text.replace(/\n$/,"").split(sep.rows);

		var i = 0;
		while (i < lines.length - 1) {
			if (this._substr_count(lines[i], '"') % 2 === 1) {
				lines[i] += sep.rows + lines[i + 1];
				delete lines[i + 1];
				i++;
			}
			i++;
		}
		var csv = [];
		for (i = 0; i < lines.length; i++) {
			if (typeof(lines[i]) !== 'undefined') {
				var line = lines[i].split(sep.cols);
				for (var j = 0; j < line.length; j++) {
					if (line[j].indexOf('"') === 0)
						line[j] = line[j].substr(1, line[j].length - 2);
					line[j] = line[j].replace('""', '"');
				}
				csv.push(line);
			}
		}
		return csv;
	},
	_split_clip_data: function(text, sep) {
		var lines = text.split(sep.rows);
		for (var i = 0; i < lines.length; i++) {
			lines[i] = lines[i].split(sep.cols);
		}
		return lines;
	},
	/*! counts how many occurances substring in string **/
	_substr_count: function(string, substring) {
		var arr = string.split(substring);
		return arr.length - 1;
	},
	stringify:function(data, sep){
		sep = sep||this.delimiter;

		if (!this.escape){
			for (var i = 0; i < data.length; i++)
				data[i] = data[i].join(sep.cols);
			return data.join(sep.rows);
		}

		var reg = /\n|\"|;|,/;
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[i].length; j++) {
				if (reg.test(data[i][j])) {
					data[i][j] = data[i][j].replace(/"/g, '""');
					data[i][j] = '"' + data[i][j] + '"';
				}
			}
			data[i] = data[i].join(sep.cols);
		}
		data = data.join(sep.rows);
		return data;
	}
};

webix.TablePaste = {
	clipboard_setter:function(value){
		if (value === true || value === 1) this._settings.clipboard = 'block';
		webix.clipbuffer.init();
		this.attachEvent("onSelectChange",this._sel_to_clip);
		this.attachEvent("onPaste", this._clip_to_sel);

		return value;
	},

	_sel_to_clip: function() {
		if (!this.getEditor || !this.getEditor()){
			var data = this._get_sel_text();
			webix.clipbuffer.set(data);
			webix.UIManager.setFocus(this);
		}
	},

	_get_sel_text: function() {
		var data = [];
		this.mapSelection(function(value, row, col, row_ind, col_ind) {
			if (!data[row_ind]) data[row_ind] = [];
			data[row_ind].push(value);
			return value;
		});

		return webix.csv.stringify(data, this._settings.delimiter);
	},

	_clip_to_sel: function(text) {
		if (!webix.isUndefined(this._paste[this._settings.clipboard])) {
			var data = webix.csv.parse(text, this._settings.delimiter);
			this._paste[this._settings.clipboard].call(this, data);
		}
	},

	_paste: {
		block: function(data) {
			var leftTop = this.mapSelection(null);
			if (!leftTop) return;

			// filling cells with data
			this.mapCells(leftTop.row, leftTop.column, data.length, null, function(value, row, col, row_ind, col_ind) {
				if (data[row_ind] && data[row_ind].length>col_ind) {
					return data[row_ind][col_ind];
				}
				return value;
			});
			this.render();
		},

		selection: function(data) {
			this.mapSelection(function(value, row, col, row_ind, col_ind) {
				if (data[row_ind] && data[row_ind].length>col_ind)
					return data[row_ind][col_ind];
				return value;
			});
			this.render();
		},

		repeat: function(data) {
			this.mapSelection(function(value, row, col, row_ind, col_ind) {
				row = data[row_ind%data.length];
				value = row[col_ind%row.length];
				return value;
			});
			this.render();
		},

		custom: function(text) {}
	}
};

webix.extend(webix.ui.datatable, webix.TablePaste);
/*
	Export for webix.ui.datatable
*/

(function(){


//public methods
webix.extend(webix.ui.datatable,{
	exportToPDF:function(url, config){
		var xml = _get_export_xml(this, config || {});
		url = url || "http://webix-export.appspot.com/export/pdf";
		_send_export(url, xml);
	},
	exportToExcel:function(url, config){
		var xml = _get_export_xml(this, config || {});
		url = url || "http://webix-export.appspot.com/export/excel";
		_send_export(url, xml);
	}
});

	

function _get_export_xml(grid, config){
	var scheme = _get_export_scheme(grid, config);
	var xml = '<rows profile="color">';
	xml += _get_export_abstract('header', 'head', grid, scheme);
	if (grid.config.footer)
		xml += _get_export_abstract('footer', 'foot', grid, scheme);
	xml += _get_export_data(grid, scheme, config);
	xml += '</rows>';
	return xml;
}

function _get_export_abstract(section, tag, grid, scheme){
	var xml = "<" + tag + ">";
	var max = 1;
	
	// detects the bigger value of header/footer rows
	for (var i = 0; i < scheme.length; i++)
		if (scheme[i][section] && scheme[i][section].length > max)
			max = scheme[i][section].length;
	for (var i = 0; i < max; i++) {
		xml += '<columns>';
	
		for (var j = 0; j < scheme.length; j++) {
			var column = scheme[j];

			xml += '<column';
			xml += column.width ? ' width="' + column.width + '"' : '';
			
			var header = column[section][i];
			xml += (header && header.colspan) ? ' colspan="' + header.colspan + '"' : '';
			xml += (header && header.rowspan) ? ' rowspan="' + header.rowspan + '"' : '';
			xml += (column.exportAsTree) ? ' type="tree"' : '';
			xml += ' align="left"';
			xml += '><![CDATA[';
			xml += (column[section][i] ? column[section][i].text : '').replace(/<[^>]*>/g," ");
			xml += ']]></column>';
		}
		xml += '</columns>';
	} 
	xml += "</" + tag + ">";
	return xml;
}


function _get_export_scheme(grid, config){
	var scheme = [];
	var allowed = config.columns;
	if (config.id)
		scheme.push({ id:"id", width:50, header:[{ text:"ID" }], footer:[""] });

	function add_column(source, config){
		var column = source ? webix.clone(source) : {};
		if (typeof config == "object")
			webix.extend(column, config, true);

		scheme.push(column);
	}

	if (allowed){
		for (var key in allowed)
			add_column(grid.getColumnConfig(key), allowed[key]);
	} else {
		var cols = grid._settings.columns;
		for (var i = 0; i < cols.length; i++)
			add_column(cols[i]);
	}
	return scheme;
}

function _get_export_data(grid, scheme, config){
	var xml = '';
	
	var data = grid.data;
	for (var i = 0; i < data.order.length; i++) {
		var id = data.order[i];
		var item = data.pull[id];
		if (config.level && config.level != item.$level) continue;

		var level = item.$level ? ' level="' + (item.$level - 1) + '"' : '';
		xml += '<row id="' + id + '"' + level + '>';
		for (var j = 0; j < scheme.length; j++){
			var value = grid._getValue(item, scheme[j], i);
			xml += '<cell><![CDATA[' + ((value !== null && value !== webix.undefined) ? value.toString().replace(/<[^>]*>/g,"") : "") + ']]></cell>';
		}
		xml += '</row>';
	}

	return xml;
}

function _send_export(url, xml) {
	webix.send(url, { grid_xml : encodeURI(xml) }, null, "_blank");
}


})();

if(!webix.storage)
	webix.storage = {};

webix.storage.local = {
	put:function(name, data){
		if(name && window.JSON && window.localStorage){
			window.localStorage.setItem(name, window.JSON.stringify(data));
		}
	},
	get:function(name){
		if(name && window.JSON && window.localStorage){
			var json = window.localStorage.getItem(name);
			if(!json)
				return null;
			return webix.DataDriver.json.toObject(json);
		}else
			return null;
	},
	remove:function(name){
		if(name && window.JSON && window.localStorage){
			window.localStorage.removeItem(name);
		}
	},
	clear:function(){
		window.localStorage.clear();
	}
};

webix.storage.session = {
	put:function(name, data){
		if(name && window.JSON && window.sessionStorage){
			window.sessionStorage.setItem(name, window.JSON.stringify(data));
		}
	},
	get:function(name){
		if(name && window.JSON && window.sessionStorage){
			var json = window.sessionStorage.getItem(name);
			if(!json)
				return null;
			return webix.DataDriver.json.toObject(json);
		}else
			return null;
	},
	remove:function(name){
		if(name && window.JSON && window.sessionStorage){
			window.sessionStorage.removeItem(name);
		}
	},
	clear:function(){
		window.sessionStorage.clear();
	}
};

webix.storage.cookie = {
	put:function(name, data, domain, expires ){
		if(name && window.JSON){
			document.cookie = name + "=" + window.JSON.stringify(data) +
			(( expires && (expires instanceof Date)) ? ";expires=" + expires.toUTCString() : "" ) +
			(( domain ) ? ";domain=" + domain : "" );
		}
	},
	_get_cookie:function(check_name){
		// first we'll split this cookie up into name/value pairs
		// note: document.cookie only returns name=value, not the other components
		var a_all_cookies = document.cookie.split( ';' );
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false; // set boolean t/f default f

		for (var i = 0; i < a_all_cookies.length; i++ ){
			// now we'll split apart each name=value pair
			a_temp_cookie = a_all_cookies[i].split( '=' );

			// and trim left/right whitespace while we're at it
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			// if the extracted name matches passed check_name
			if (cookie_name == check_name ){
				b_cookie_found = true;
				// we need to handle case where cookie has no value but exists (no = sign, that is):
				if ( a_temp_cookie.length > 1 ){
					cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
				}
				// note that in cases where cookie is initialized but no value, null is returned
				return cookie_value;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if ( !b_cookie_found ){
			return null;
		}
		return null;
	},
	get:function(name){
		if(name && window.JSON){
			var json = this._get_cookie(name);
			if(!json)
				return null;
			return webix.DataDriver.json.toObject(json);
		}else
			return null;
	},
	remove:function(name, domain){
		if(name && this._get_cookie(name)) 
			document.cookie = name + "=" + (( domain ) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	},
	clear:function(domain){
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++)
			document.cookie = /^[^=]+/.exec(cookies[i])[0] + "=" + (( domain ) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";		
	}
};

webix.DataState = {
	getState:function(){
		var cols_n = this.config.columns.length;
		var columns = this.config.columns;
		var settings = { 
			ids:[],
			size:[],
			select:this.getSelectedId(true),
            scroll:this.getScrollState()
		};
		for(var i = 0; i < cols_n; i++){
			settings.ids.push(columns[i].id);
			settings.size.push(columns[i].width);
		}

		if(this._last_sorted){
			settings.sort={
				id:this._last_sorted,
				dir:this._last_order
			};
		}
		if (this._filter_elements) {
			var filter = {};
			var any_filter = 0;
			for (var key in this._filter_elements) {
				if (this._hidden_column_hash[key]) continue;

				var f = this._filter_elements[key];
				f[1].value = filter[key] = f[2].getValue(f[0]);
				any_filter = 1;
			}
			if (any_filter)
				settings.filter=filter;
		}

		settings.hidden = [];
		for (var key in this._hidden_column_hash)
			settings.hidden.push(key);
		
		return settings;
	},
	setState:function(obj){
		var columns = this.config.columns;
		if(!obj) return;

		this._last_sorted = null; 
		this.blockEvent();

        if (obj.hidden){
            var hihash = {};
            for (var i=0; i<obj.hidden.length; i++){
                hihash[obj.hidden[i]] = true;
                if(!this._hidden_column_order.length)
                    this.hideColumn(obj.hidden[i]);
            }

            if(this._hidden_column_order.length){
                for (var i=0; i<this._hidden_column_order.length; i++){
                    var hikey = this._hidden_column_order[i];
                    if (!!hihash[hikey] == !this._hidden_column_hash[hikey])
                        this.hideColumn(hikey, !!hihash[hikey]);
                }
            }
        }

		if (obj.ids){
			var reorder = false;
			var cols = this.config.columns;
			for (var i=0; i<cols.length; i++)
				if (cols[i].id != obj.ids[i])
					reorder = true;
			if (reorder){
				for (var i=0; i<obj.ids.length; i++)
					cols[i] = this.getColumnConfig(obj.ids[i]) || cols[i];
				this.refreshColumns();
			}
		}

		if (obj.size){
			var cols_n = Math.min(obj.size.length, columns.length);
			for(var i = 0; i < cols_n; i++){
				if(columns[i] && columns[i].width != obj.size[i])
					this._setColumnWidth( i, obj.size[i], true);
			}
		}

		if (obj.filter){
			for (var key in this._filter_elements){
				var f = this._filter_elements[key];
				f[2].setValue(f[0], "");
			}
		}
		
		this.unblockEvent();
		this._updateColsSizeSettings(true);
		this.callEvent("onStructureUpdate", []);

		if(obj.sort){
			var column = columns[this.getColumnIndex(obj.sort.id)];
			if (column)
				this._sort(obj.sort.id, obj.sort.dir, column.sort);	
		}
				
		if (obj.filter){
			for (var key in obj.filter) {
				var value = obj.filter[key];
				if (!value) continue;

				if (!this._filter_elements[key]) continue;
				var f = this._filter_elements[key];
				f[2].setValue(f[0], value);
				var contentid = f[1].contentId;
				if (contentid)
					this._active_headers[contentid].value = value;
			}
			this.filterByAll();
		}

		if (obj.select && this.select){
			var select = obj.select;
			this.unselect();
			for (var i = 0; i < select.length; i++)
				if (!select[i].row || this.exists(select[i].row))
					this._select(select[i], true);
		}

        if(obj.scroll)
            this.scrollTo(obj.scroll.x, obj.scroll.y);
	}
};

webix.extend(webix.ui.datatable, webix.DataState);


(function(){
var t = webix.Touch = {
	config:{
		longTouchDelay:1000,
		scrollDelay:150,
		gravity:500,
		deltaStep:30,
		speed:"0ms",
		finish:1500,
		ellastic:true
	},
	limit:function(value){
		t._limited = value !== false;	
	},
	disable:function(){
		t._disabled = true;
	},
	enable:function(){
		t._disabled = false;
	},
	$init:function(){
		t.$init = function(){};

		webix.event(document.body, mouse.down,	t._touchstart);
		webix.event(document.body, mouse.move, 	t._touchmove);
		webix.event(document.body, mouse.up, 	t._touchend);

		webix.event(document.body,"dragstart",function(e){
			return webix.html.preventEvent(e);
		});
		webix.event(document.body,"touchstart",function(e){
			if (t._disabled || t._limited) return;
			//fast click mode for iOS
			//To have working form elements Android must not block event - so there are no fast clicks for Android
			//Selects still don't work with fast clicks
			if (webix.env.isSafari) {
				var tag = e.srcElement.tagName.toLowerCase();
				if (tag == "input" || tag == "textarea" || tag == "select" || tag=="label")
					return true;

				t._fire_fast_event = true;
				return webix.html.preventEvent(e);
			}
		});

		t._clear_artefacts();
		t._scroll = [null, null];
		t.$active = true;
	},
	_clear_artefacts:function(){
		t._start_context = t._current_context = t._prev_context = null;
		t._scroll_mode = t._scroll_node = t._scroll_stat = this._long_touched = null;
		//webix.html.remove(t._scroll);
		//t._scroll = [null, null];
		t._delta = 	{ _x_moment:0, _y_moment:0, _time:0 };

		if (t._css_button_remove){
			webix.html.removeCss(t._css_button_remove,"webix_touch");
			t._css_button_remove = null;
		}
		
		window.clearTimeout(t._long_touch_timer);
		t._was_not_moved = true;
		t._axis_x = true;
		t._axis_y = true;
		if (!t._active_transion)
			t._scroll_end();
	},
	_touchend:function(e){ 
		if (t._start_context){
			if (!t._scroll_mode){
				if(!this._long_touched){
					if (t._axis_y && !t._axis_x){
						t._translate_event("onSwipeX");
					} else if (t._axis_x && !t._axis_y){
						t._translate_event("onSwipeY");
					} else {
						if (webix.env.isSafari && t._fire_fast_event){ //need to test for mobile ff and blackbery 
							t._fire_fast_event = false;
							var target = t._start_context.target;
		
							//dark iOS magic, without delay it can skip repainting
							webix.delay(function(){
								var click_event = document.createEvent('MouseEvents');
								click_event.initEvent('click', true, true);
								target.dispatchEvent(click_event);							
							});
							
						}					
					}
				}
			} else {

				
				var temp = t._get_matrix(t._scroll_node);
				var x = temp.e;
				var y = temp.f;
				var finish = t.config.finish;
				
				var	delta = t._get_delta(e, true);
				var view = webix.$$(t._scroll_node);

				var gravity = (view&&view.$scroll?view.$scroll.gravity:t.config.gravity);
				if (delta._time){ 
					var nx = x + gravity * delta._x_moment/delta._time;
					var ny = y + gravity * delta._y_moment/delta._time;
					
					var cnx = t._scroll[0]?t._correct_minmax( nx, false, false, t._scroll_stat.dx, t._scroll_stat.px):x;
					var cny = t._scroll[1]?t._correct_minmax( ny, false, false , t._scroll_stat.dy, t._scroll_stat.py):y;
					

					var size = Math.max(Math.abs(cnx-x),Math.abs(cny-y));
					if (size < 150) 
						finish = finish*size/150;
					
					if (cnx != x || cny != y)
						finish = Math.round(finish * Math.max((cnx-x)/(nx-x),(cny-y)/(ny-y)));
					
					var result = { e:cnx, f:cny };


				    var view = webix.$$(t._scroll_node);
                    if(view&&view.adjustScroll)
                        view.adjustScroll(result);

						
					//finish = Math.max(100,(t._fast_correction?100:finish));
					finish = Math.max(100,finish);

						
					if (x != result.e || y!=result.f){
						t._set_matrix(t._scroll_node, result.e, result.f, finish+"ms");
						if (t._scroll_master)
							t._scroll_master._sync_scroll(result.e, result.f, finish+"ms");
						t._set_scroll(result.e,result.f,finish+"ms");
					} else {
						t._scroll_end();
					}
				} else 
					t._scroll_end();
			}
		
			t._translate_event("onTouchEnd");
			t._clear_artefacts();
		}
	},
	_touchmove:function(e){
		if (!t._start_context) return;

		var	delta = t._get_delta(e);
		t._translate_event("onTouchMove");

		if (t._scroll_mode){
			t._set_scroll_pos(delta);
		} else {
			t._axis_x = t._axis_check(delta._x, "x", t._axis_x);
			t._axis_y = t._axis_check(delta._y, "y", t._axis_y);
			if (t._scroll_mode){
				var view = t._get_event_view("onBeforeScroll");
				if (view){
					var data = {};
					view.callEvent("onBeforeScroll",[data]);
					if (data.update){
						t.config.speed = data.speed;
						t.config.scale = data.scale;
					}
				}
				t._init_scroller(delta); //apply scrolling
			}
		}

		return webix.html.preventEvent(e);
	},
	_set_scroll_pos:function(){
		if (!t._scroll_node) return;
		var temp = t._get_matrix(t._scroll_node);
		var be = temp.e, bf = temp.f;
		var prev = t._prev_context || t._start_context;

		var view = webix.$$(t._scroll_node);
		var ellastic = (view&&view.$scroll)?view.$scroll.ellastic: t.config.ellastic;
		if (t._scroll[0])
			temp.e = t._correct_minmax( temp.e - prev.x + t._current_context.x , ellastic, temp.e, t._scroll_stat.dx, t._scroll_stat.px);
		if (t._scroll[1])
			temp.f = t._correct_minmax( temp.f - prev.y + t._current_context.y , ellastic, temp.f, t._scroll_stat.dy, t._scroll_stat.py);

		t._set_matrix(t._scroll_node, temp.e, temp.f, "0ms");
		if (t._scroll_master)
			t._scroll_master._sync_scroll(temp.e, temp.f, "0ms");
		t._set_scroll(temp.e, temp.f, "0ms");
	},
	_set_scroll:function(dx, dy, speed){
		
		var edx = t._scroll_stat.px/t._scroll_stat.dx * -dx;
		var edy = t._scroll_stat.py/t._scroll_stat.dy * -dy;
		if (t._scroll[0])
			t._set_matrix(t._scroll[0], edx, 0 ,speed);
		if (t._scroll[1])
			t._set_matrix(t._scroll[1], 0, edy ,speed);
	},
	scrollTo:function(node, x, y, speed){
		t._set_matrix(node,x,y,speed);
	},
	_set_matrix:function(node, xv, yv, speed){
		if(!t._in_anim_frame && window.setAnimationFrame){
			window.setAnimationFrame(function(){
				t._in_anim_frame = true;
				return t._set_matrix(node, xv, yv, speed);
			});
		}
		t._in_anim_frame = null;
		t._active_transion = true;
		if (node){
			var trans = t.config.translate || webix.env.translate;
			node.style[webix.env.transform] = trans+"("+Math.round(xv)+"px, "+Math.round(yv)+"px"+((trans=="translate3d")?", 0":"")+")";
			node.style[webix.env.transitionDuration] = speed;
		}
	},
	_get_matrix:function(node){
		var matrix = window.getComputedStyle(node)[webix.env.transform];
		var tmatrix;

		if (matrix == "none")
			tmatrix = {e:0, f:0};
		else {
            if(window.WebKitCSSMatrix)
                tmatrix = new WebKitCSSMatrix(matrix);
            else if (window.MSCSSMatrix)
            	tmatrix = new MSCSSMatrix(matrix);
			else {
	            // matrix(1, 0, 0, 1, 0, 0) --> 1, 0, 0, 1, 0, 0
	            var _tmatrix = matrix.replace(/(matrix\()(.*)(\))/gi, "$2");
	            // 1, 0, 0, 1, 0, 0 --> 1,0,0,1,0,0
	            _tmatrix = _tmatrix.replace(/\s/gi, "");
	            _tmatrix = _tmatrix.split(',');

	            var tmatrix = {};
	            var tkey = ['a', 'b', 'c', 'd', 'e', 'f'];
	            for(var i=0; i<tkey.length; i++){
	                tmatrix[tkey[i]] = parseInt(_tmatrix[i], 10);
	            }
	        }
        }

        if (t._scroll_master)
        	t._scroll_master._sync_pos(tmatrix);

        return tmatrix;
	},	
	_correct_minmax:function(value, allow, current, dx, px){
		if (value === current) return value;
		
		var delta = Math.abs(value-current);
		var sign = delta/(value-current);
	//	t._fast_correction = true;
		
		
		if (value>0) return allow?(current + sign*Math.sqrt(delta)):0;
		
		var max = dx - px;
		if (max + value < 0)	
			return allow?(current - Math.sqrt(-(value-current))):-max;
			
	//	t._fast_correction = false;
		return value;
	},	
	_init_scroll_node:function(node){
		if (!node.scroll_enabled){ 
			node.scroll_enabled = true;	
			node.parentNode.style.position="relative";
			var prefix = webix.env.cssPrefix;
			node.style.cssText += prefix+"transition: "+prefix+"transform; "+prefix+"user-select:none; "+prefix+"transform-style:flat;";
			node.addEventListener(webix.env.transitionEnd,t._scroll_end,false);
		}
	},
	_init_scroller:function(delta){
		if (t._scroll_mode.indexOf("x") != -1)
			t._scroll[0] = t._create_scroll("x", t._scroll_stat.dx, t._scroll_stat.px, "width");
		if (t._scroll_mode.indexOf("y") != -1)
			t._scroll[1] = t._create_scroll("y", t._scroll_stat.dy, t._scroll_stat.py, "height");
			
		t._init_scroll_node(t._scroll_node);
		window.setTimeout(t._set_scroll_pos,1);
	},
	_create_scroll:function(mode, dy, py, dim){
		if (dy - py <2){
			var matrix = t._get_matrix(t._scroll_node);
			var e = (mode=="y"?matrix.e:0);
			var f = (mode=="y"?0:matrix.f);
			if (!t._scroll_master)
				t._set_matrix(t._scroll_node, e, f, "0ms");
			t._scroll_mode = t._scroll_mode.replace(mode,"");
			return "";
		}

		var scroll = webix.html.create("DIV", {
			"class":"webix_scroll_"+mode
		},"");
		
		scroll.style[dim] = Math.max((py*py/dy-7),10) +"px";
		t._scroll_node.parentNode.appendChild(scroll);
		
		return scroll;
	},
	_axis_check:function(value, mode, old){
		if (value > t.config.deltaStep){
				if (t._was_not_moved){
					t._long_move(mode);
					t._locate(mode);
					if ((t._scroll_mode||"").indexOf(mode) == -1) t._scroll_mode = "";
				}
				return false;
		}
		return old;
	},
	_scroll_end:function(){
        //sending event to the owner of the scroll only
        var result,state,view;
        view = webix.$$(t._scroll_node||this);
        if (view){
        	if (t._scroll_node)
        		result = t._get_matrix(t._scroll_node);
        	else if(view.getScrollState){
                state = view.getScrollState();
                result = {e:state.x, f:state.y};
            }
            webix.callEvent("onAfterScroll", [result]);
            if (view.callEvent)
                 view.callEvent("onAfterScroll",[result]);
        }
		if (!t._scroll_mode){
			webix.html.remove(t._scroll);
			t._scroll = [null, null];
		}
		t._active_transion = false;
	},
	_long_move:function(mode){
		window.clearTimeout(t._long_touch_timer);
		t._was_not_moved = false;	
	},	
	_stop_old_scroll:function(e){
		if (t._scroll[0] || t._scroll[1]){
			t._stop_scroll(e, t._scroll[0]?"x":"y");
		}else
			return true;
	},
	_touchstart :function(e){
		var target = e.target || event.srcElement;
		if (t._disabled || (target.tagName&&target.tagName.toLowerCase() == "textarea" && target.offsetHeight<target.scrollHeight)) return;

		t._start_context = mouse.context(e);

		// in "limited" mode we should have possibility to use slider
		var element = webix.$$(e);

		if (t._limited && !t._is_scroll() && !(element && element.$touchCapture)){
			t._stop_old_scroll(e);
			t._start_context = null;
			return;
		}

		t._translate_event("onTouchStart");

		if (t._stop_old_scroll(e))
			t._long_touch_timer = window.setTimeout(t._long_touch, t.config.longTouchDelay);
		
		if (element && element.touchable && (!target.className || target.className.indexOf("webix_view")!==0)){
			t._css_button_remove = element.getNode(e);
			webix.html.addCss(t._css_button_remove,"webix_touch");
		}	
			
	},
	_long_touch:function(e){
        if(t._start_context){
			t._translate_event("onLongTouch");
			webix.callEvent("onClick", [t._start_context]);
			t._long_touched = true;
			//t._clear_artefacts();
        }
	},
	_stop_scroll:function(e, stop_mode){ 
		t._locate(stop_mode);
		var scroll = t._scroll[0]||t._scroll[1];
		if (scroll){
			var view = t._get_event_view("onBeforeScroll");
			if (view)
				view.callEvent("onBeforeScroll", [t._start_context,t._current_context]);
		}
		if (scroll && (!t._scroll_node || scroll.parentNode != t._scroll_node.parentNode)){
			t._clear_artefacts();
			t._scroll_end();
			t._start_context = mouse.context(e);
		}
		t._touchmove(e);
	},	
	_get_delta:function(e, ch){
		t._prev_context = t._current_context;
		t._current_context = mouse.context(e);
			
		t._delta._x = Math.abs(t._start_context.x - t._current_context.x);
		t._delta._y = Math.abs(t._start_context.y - t._current_context.y);
		
		if (t._prev_context){
			if (t._current_context.time - t._prev_context.time < t.config.scrollDelay){
				t._delta._x_moment = t._delta._x_moment/1.3+t._current_context.x - t._prev_context.x;
				t._delta._y_moment = t._delta._y_moment/1.3+t._current_context.y - t._prev_context.y;
			}
			else {
				t._delta._y_moment = t._delta._x_moment = 0;
			}
			t._delta._time = t._delta._time/1.3+(t._current_context.time - t._prev_context.time);
		}
		
		return t._delta;
	},
	_get_sizes:function(node){
		t._scroll_stat = {
			dx:node.offsetWidth,
			dy:node.offsetHeight,
			px:node.parentNode.offsetWidth,
			py:node.parentNode.offsetHeight
		};
	},
	_is_scroll:function(locate_mode){
		var node = t._start_context.target;
		if (!webix.env.touch && !webix.env.transition && !webix.env.transform) return null;
		while(node && node.tagName!="BODY"){
			if(node.getAttribute){
				var mode = node.getAttribute("touch_scroll");
				if (mode && (!locate_mode || mode.indexOf(locate_mode)!=-1))
					return [node, mode];
			}
			node = node.parentNode;
		}
		return null;
	},
	_locate:function(locate_mode){
		var state = this._is_scroll(locate_mode);
		if (state){
			t._scroll_mode = state[1];
			t._scroll_node = state[0];
			t._get_sizes(state[0]);
		}
		return state;
	},
	_translate_event:function(name){
		webix.callEvent(name, [t._start_context,t._current_context]);
		var view = t._get_event_view(name);
		if (view)
			view.callEvent(name, [t._start_context,t._current_context]);
	},
	_get_event_view:function(name){
		var view = webix.$$(t._start_context);
		if(!view) return null;
		
		while (view){
			if (view.hasEvent&&view.hasEvent(name))	
				return view;
			view = view.getParentView();
		}
		
		return null;
	},	
	_get_context:function(e){
		if (!e.touches[0]) {
			var temp = t._current_context;
			temp.time = new Date();
			return temp;
		}
			
		return {
			target:e.target,
			x:e.touches[0].pageX,
			y:e.touches[0].pageY,
			time:new Date()
		};
	},
	_get_context_m:function(e){
		return {
			target:e.target || e.srcElement,
			x:e.pageX,
			y:e.pageY,
			time:new Date()
		};
	}
};


webix.ready(function(){
	if (webix.env.touch){
		t.$init();
		if (window.MSCSSMatrix)
			webix.html.addStyle(".webix_view{ -ms-touch-action: none; }");
	}
});


var mouse = webix.env.mouse = { down:"mousedown", up:"mouseup", 
								move:"mousemove", context:t._get_context_m };

if (window.navigator.pointerEnabled){
	mouse.down = "pointerdown";
	mouse.move = "pointermove";
	mouse.up   = "pointerup";
} else if (window.navigator.msPointerEnabled){
	mouse.down = "MSPointerDown";
	mouse.move = "MSPointerMove";
	mouse.up   = "MSPointerUp";
} else if (webix.env.touch){
	mouse.down = "touchstart";
	mouse.move = "touchmove";
	mouse.up   = "touchend";
	mouse.context = t._get_context;
}


})();



webix.attachEvent("onDataTable", function(table, config){
	if (webix.env.touch){
		webix.Touch.$init();
		config.scrollSize = 0;
		webix.extend(table, (config.prerender===true)?table._touchNative:table._touch);

		// needed to show datatable scroll
		if(webix.Touch._disabled)
			webix.Touch.limit();

		table.defaults.scrollAlignY = false;

		table._body.setAttribute("touch_scroll","xy");

		table.$ready.push(function(){
			var scrollMode = "";
			var config = this._settings;
			if (!config.autowidth && config.scrollX !== false)
				scrollMode += "x";
			if (!config.autoheight && config.scrollY !== false)
				scrollMode += "y";
			this._body.setAttribute("touch_scroll", scrollMode);
		});
		
		webix.Touch._init_scroll_node(table._body.childNodes[1].firstChild);
		webix.Touch._set_matrix(table._body.childNodes[1].firstChild, 0,0,"0ms");
		table._sync_scroll(0,0,"0ms");
	}
});

webix.extend(webix.ui.datatable, {
	_touchNative:{
		_scrollTo_touch:function(x,y){
			webix.Touch._set_matrix(this._body.childNodes[1].firstChild, 0,0,"0ms");
			this._sync_scroll(x,y,"0ms");
		},
		_getScrollState_touch:function(){
			var temp = webix.Touch._get_matrix(this._body.childNodes[1].firstChild);
			return { x : -temp.e, y : -temp.f };
		},
		$init:function(){
			this.attachEvent("onBeforeScroll", function(){ 
				webix.Touch._scroll_node = this._body.childNodes[1].firstChild;
				webix.Touch._get_sizes(webix.Touch._scroll_node);
				webix.Touch._scroll_master = this;
			});
			this.attachEvent("onTouchEnd", function(){
				webix.Touch._scroll_master = null;
			});
		},
		_sync_scroll:function(x,y,t){
			if (this._settings.leftSplit)
				webix.Touch._set_matrix(this._body.childNodes[0].firstChild,0,y,t);
			if (this._settings.rightSplit)
				webix.Touch._set_matrix(this._body.childNodes[2].firstChild,0,y,t);
			if (this._settings.header)
				webix.Touch._set_matrix(this._header.childNodes[1].firstChild,x,0,t);
			if (this._settings.footer)
				webix.Touch._set_matrix(this._footer.childNodes[1].firstChild,x,0,t);

			this.callEvent("onSyncScroll", [x,y,t]);
		},
		_sync_pos:function(){}
	},
	_touch:{
		_scrollTo_touch:function(x,y){
			webix.delay(function(){
				this.callEvent("onAfterScroll", [{ e: -x, f: -y}]);	
			}, this);
		  	
		},
		$scroll:{
			gravity:0,
			elastic:false
		},
		$init:function(){
			this.attachEvent("onBeforeScroll", function(){
				var t = webix.Touch;
				t._scroll_node = this._body.childNodes[1].firstChild;
				t._get_sizes(t._scroll_node);
				t._scroll_stat.dy = this._dtable_height;
				t._scroll_master = this;

			});
			this.attachEvent("onAfterScroll", function(result){
				webix.Touch._scroll_master = null;
				webix.Touch._fix_f = null;

				this._scrollTop = 0;

				//ipad can delay content rendering if 3d transformation applied
				//switch back to 2d
				var temp = webix.Touch.config.translate;
				webix.Touch.config.translate = "translate";
				this._sync_scroll(result.e, 0, "0ms");
				webix.Touch.config.translate = temp;

				this._scrollLeft = - result.e;
				this._scrollTop = -result.f;


				this.render();
				return false;
			});
		},
		_sync_scroll:function(x,y,t){
			y += this._scrollTop;
			webix.Touch._set_matrix(this._body.childNodes[1].firstChild, x, y, t);
			if (this._settings.leftSplit)
				webix.Touch._set_matrix(this._body.childNodes[0].firstChild,0,y,t);
			if (this._settings.rightSplit)
				webix.Touch._set_matrix(this._body.childNodes[2].firstChild,0,y,t);
			if (this._settings.header)
				webix.Touch._set_matrix(this._header.childNodes[1].firstChild,x,0,t);
			if (this._settings.footer)
				webix.Touch._set_matrix(this._footer.childNodes[1].firstChild,x,0,t);

			this.callEvent("onSyncScroll", [x,y,t]);
		},
		_sync_pos:function(matrix){
			matrix.f -= this._scrollTop;

		}
	}
});
webix.extend(webix.ui.datatable, {
	$init:function(){
		this.data.attachEvent("onStoreLoad", webix.bind(this._adjustColumns, this));
		this.attachEvent("onStructureLoad", this._adjustColumns);

		this.attachEvent("onStructureUpdate", this._resizeColumns);
		this.attachEvent("onResize", this._resizeColumns);
	},
	_adjustColumns:function(){ 
		if (!this.count()) return;

		var resize = false;
		var cols = this._columns;
		for (var i = 0; i < cols.length; i++)
			if (cols[i].adjust)
				resize = this._adjustColumn(i, cols[i].adjust, true) || resize;

		if (resize) 
			this._updateColsSizeSettings();
	},
	_resizeColumns:function(){
		var cols = this._settings.columns;
		var fill = [];
		var summ = 0;

		if (cols && !this._settings.autowidth)
			for (var i = 0; i < cols.length; i++){
				var colfil = cols[i].fillspace;
				if (colfil){
					fill[i] = colfil;
					summ += colfil*1 || 1;
				}
			}

		if (summ)				
			this._fillColumnSize(fill, summ);
	},
	_fillColumnSize:function(fill, summ){
		var cols = this._settings.columns;
		if (!cols) return;

		var width = this._content_width - this._scrollSizeY;
		var resize = false;

		for (var i=0; i<cols.length; i++)
			if (!fill[i]) width -= (cols[i].width || this.config.columnWidth);

		if (width>0){
			for (var i = 0; i < fill.length; i++)
				if (fill[i]){
					var request = Math.min(width, Math.round(width * fill[i]/summ));
					resize = this._setColumnWidth(i, request, true) || resize;
					width = width - cols[i].width;
					summ = summ - fill[i];
				}
		}

		if (resize) 
			this._updateColsSizeSettings(true);
	},
	_getColumnConfigSize:function(ind, headers){
		var d = webix.html.create("DIV",{"class":"webix_view webix_table_cell webix_measure_size webix_cell"},"");
		d.style.cssText = "width:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;";
		document.body.appendChild(d);

		var config = this._settings.columns[ind];
		var max = -Infinity;
		
		//iterator other all loaded data is required
		if (headers != "header")
			for (var i=0; i<this.data.order.length; i++){
				var obj = this.getItem(this.data.order[i]);
				var text = this._getValue(obj, config, i);
				d.innerHTML = text;
				max = Math.max(d.scrollWidth, max);
			}

		if (headers && headers != "data"){
			for (var i=0; i<config.header.length; i++){
				var header = config.header[i];
				if (header){
					d.innerHTML = header.text;
					max = Math.max(d.scrollWidth, max);
				}
			}
		}

		d = webix.html.remove(d);
		//1px to compensate scrollWidth rounding
		return max+1+(webix.env.isIE?webix.skin.$active.layoutPadding.space:0);	
	},
	_adjustColumn:function(ind, headers, ignore){
		if (ind >= 0){
			var width = this._getColumnConfigSize(ind, headers);
			return this._setColumnWidth(ind, width, ignore);
		}
	},
	adjustColumn:function(id, headers){
		this._adjustColumn(this.getColumnIndex(id), headers);
	},
	adjustRowHeight:function(id, silent){
		var config = this.getColumnConfig(id);
		var count = this.data.count();

		var d = webix.html.create("DIV",{"class":"webix_table_cell webix_measure_size webix_cell"},"");
		d.style.cssText = "width:"+config.width+"px; height:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;";
		this.$view.appendChild(d);

		this.data.each(function(obj){
			//in case of dyn. mode - this can be undefined 
			if (obj){
				d.innerHTML = this._getValue(obj, config, 0);
				obj.$height = Math.max(d.scrollHeight, this._settings.rowHeight);
			}
		}, this);

		d = webix.html.remove(d);
		if (!silent)
			this.refresh();
	}
});
webix.extend(webix.ui.datatable,{

	math_setter:function(value){
		if (value)
			this._math_init();
		return value;
	},

	_math_pref: '$',

	_math_init: function() {
		if(webix.env.strict) return;

		this.data.attachEvent("onStoreUpdated", webix.bind(this._parse_row_math, this));
		this.data.attachEvent("onStoreLoad", webix.bind(this._parse_math, this));
		this.attachEvent("onStructureLoad", this._parse_math);
	},
	_parse_row_math:function(id, obj, action){
		if (!id || (action=="delete" || action=="paint")) return;

		if (action == "add")
			this._exprs_by_columns(obj);

		for (var i=0; i<this._columns.length; i++)
			this._parse_cell_math(id, this._columns[i].id, action !== "add");
	},
	_parse_cell_math: function(row, col, _inner_call) {
		var item = this.getItem(row);
		var value;

		// if it's outer call we should use inputted value otherwise to take formula, not calculated value
		if (_inner_call === true)
			value = item[this._math_pref + col] || item[col];
		else {
			value = item[col];
			this._math_recalc = {};
		}

		if (typeof value === "undefined" || value === null) return;

		if (value.length > 0 && value.substr(0, 1) === '=') {
			// calculate math value
			if ((typeof(item[this._math_pref + col]) === 'undefined') || (_inner_call !== true))
				item[this._math_pref + col] = item[col];
			item[col] = this._calculate(value, row, col);
			//this.updateItem(item);
		} else {
			// just a string
			if (typeof(item[this._math_pref + col]) !== 'undefined')
				delete item[this._math_pref + col];
			// remove triggers if they were setted earlier
			this._remove_old_triggers(row, col);
		}
		// recalculate depending cells
		if (typeof(item.depends) !== 'undefined' && typeof(item.depends[col]) !== 'undefined') {
			for (var i in item.depends[col]) {
				var name = item.depends[col][i][0] + '__' + item.depends[col][i][1];
				if (typeof(this._math_recalc[name]) === 'undefined') {
					this._math_recalc[name] = true;
					this._parse_cell_math(item.depends[col][i][0], item.depends[col][i][1], true);
				}
			}
		}
	},

	_set_original_value: function(row, col) {
		var item = this.getItem(row);
		if (typeof(item[this._math_pref + col]) !== 'undefined')
			item[col] = item[this._math_pref + col];
	},

	_parse_math: function(){
		if (!this._columns || !this.count()) return;

		this._exprs_by_columns();


		for (var j = 0; j < this._columns.length; j++){
			var col = this.columnId(j);
			this.data.each(function(obj){
				this._parse_cell_math(obj.id, col);
			}, this);
		}
	},

	_exprs_by_columns: function(row) {
		for (var i = 0; i < this._columns.length; i++){
			if (this._columns[i].math) {
				var col = this.columnId(i);
				var math = '=' + this._columns[i].math;
				math = math.replace(/\$r/g, '#$r#');
				math = math.replace(/\$c/g, '#$c#');
				if (row)
					row[col] = this._parse_relative_expr(math, row.id, col);
				else
					this.data.each(function(obj){
						obj[col] = this._parse_relative_expr(math, obj.id, col);
					}, this);
			}
		}
	},

	_parse_relative_expr: function(expr, row, col) {
		return (webix.template(expr))({ '$r': row, '$c': col });
	},

	_get_calc_value: function(row, col) {
		var item;

		if (this.exists(row))
			item = this.getItem(row);
		else
			return '#out_of_range';

		var value = item[this._math_pref + col] || item[col] || 0;
		value = value.toString();
		if (value.substring(0, 1) !== '=')
			// it's a string
			return value;
		else {
			// TODO: check if value shouldn't be recalculated
			// and return value calculated earlier

			// calculate math expr value right now
			if (typeof(item[this._math_pref + col]) === 'undefined')
				item[this._math_pref + col] = item[col];
			item[col] = this._calculate(value, row, col, true);
			return item[col];
		}
	},

	_calculate: function(value, row, col, _inner_call) {
		// add coord in math trace to detect self-references
		if (_inner_call === true) {
			if (this._in_math_trace(row, col))
				return '#selfreference';
		} else
			this._start_math_trace();
		this._to_math_trace(row, col);

		var item = this.getItem(row);
		value = value.substring(1);

		// get operations list
		var operations = this._get_operations(value);
		var triggers = this._get_refs(value);

		if (operations) {
			value = this._replace_refs(value, triggers);
			value = this._parse_args(value, operations);
		} else {
			value = this._replace_refs(value, triggers, true);
			var triggers = [];
		}

		var exc = this._math_exception(value);
		if (exc !== false)
			return exc;

		// remove from coord from trace when calculations were finished - it's important!
		this._from_math_trace(row, col);

		// process triggers to know which cells should be recalculated when one was changed
		this._remove_old_triggers(row, col);
		for (var i = 0; i < triggers.length; i++) {
			this._add_trigger([row, col], triggers[i]);
		}
		var exc = this._math_exception(value);
		if (exc !== false)
			return exc;

		// there aren't any operations here. returns number or value of another cell
		if (!value) return value;

		// process mathematical expression and getting final result
		value = this._compute(value);
		var exc = this._math_exception(value);
		if (exc !== false)
			return exc;
		return value;
	},

	_get_operations: function(value) {
		// gettings operations list (+-*/)
		var splitter = /(\+|\-|\*|\/)/g;
		var operations = value.replace(/\[[^)]*?\]/g,"").match(splitter);
		return operations;
	},

	/*! gets list of referencies in formula
	 **/
	_get_refs: function(value) {
		var reg = /\[([^\]]+),([^\]]+)\]/g;
		var cells = value.match(reg);
		if (cells === null) cells = [];

		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var tmp = cell;
			cell = cell.substr(1, cell.length - 2);
			cell = cell.split(',');
			cell[0] = this._trim(cell[0]);
			cell[1] = this._trim(cell[1]);
			if (cell[0].substr(0, 1) === ':')
				cell[0] = this.getIdByIndex(cell[0].substr(1));
			if (cell[1].substr(0, 1) === ':')
				cell[1] = this.columnId(cell[1].substr(1));
			cell[2] = tmp;
			cells[i] = cell;
		}

		return cells;
	},

	// replace given list of references by their values
	_replace_refs: function(value, cells, clean) {
		var dell = "(", delr = ")";
		if (clean) dell = delr = "";
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var cell_value = this._get_calc_value(cell[0], cell[1]);
			if (isNaN(cell_value))
				cell_value = '"'+cell_value+'"';
			value = value.replace(cell[2], dell + cell_value + delr);
		}
		return value;
	},

	_parse_args: function(value, operations) {
		var args = [];
		for (var i = 0; i < operations.length; i++) {
			var op = operations[i];
			var temp = this._split_by(value, op);
			args.push(temp[0]);
			value = temp[1];
		}
		args.push(value);

		//var reg = /^(-?\d|\.|\(|\))+$/;
		for (var i = 0; i < args.length; i++) {
			var arg = this._trim(args[i]);
		//	if (reg.test(arg) === false)
		//		return ''; //error
			args[i] = arg;
		}

		var expr = "";
		for (var i = 0; i < args.length - 1; i++) {
			expr += args[i] + operations[i];
		}
		expr += args[args.length - 1];
		return expr;
	},

	_compute: function(expr) {
		try {
			webix.temp_value = '';
			expr = 'webix.temp_value = ' + expr;
			eval(expr);
		} catch(ex) {
			webix.assert(false,"Math error in datatable<br>"+expr);
			webix.temp_value = '';
		}
		var result = webix.temp_value;
		webix.temp_value = null;
		return result.toString();
	},

	_split_by: function(value, splitter) {
		var pos = value.indexOf(splitter);
		var before = value.substr(0, pos);
		var after = value.substr(pos + 1);
		return [before, after];
	},

	_trim: function(value) {
		value = value.replace(/^ */g, '');
		value = value.replace(/ *$/g, '');
		return value;
	},

	_start_math_trace: function() {
		this._math_trace = [];
	},
	_to_math_trace: function(row, col) {
		this._math_trace[row + '__' + col] = true;
	},
	_from_math_trace: function(row, col) {
		if (typeof(this._math_trace[row + '__' + col]) !== 'undefined')
			delete this._math_trace[row + '__' + col];
	},
	_in_math_trace: function(row, col) {
		if (typeof(this._math_trace[row + '__' + col]) !== 'undefined')
			return true;
		else
			return false;
	},

	_add_trigger: function(depends, from) {
		var item = this.getItem(from[0]);
		if (typeof(item.depends) === 'undefined')
			item.depends = {};
		if (typeof(item.depends[from[1]]) === 'undefined')
			item.depends[from[1]] = {};
		item.depends[from[1]][depends[0] + '__' + depends[1]] = depends;

		item = this.getItem(depends[0]);
		if (typeof(item.triggers) === 'undefined')
			item.triggers = {};
		if (typeof(item.triggers[depends[1]]) === 'undefined')
			item.triggers[depends[1]] = {};
		item.triggers[depends[1]][from[0] + '__' + from[1]] = from;
	},

	_remove_old_triggers: function(row, col) {
		if (!this.exists(row, col)) return;
		var item = this.getItem(row, col);
		if (typeof(item.triggers) === 'undefined') return;
		for (var i in item.triggers[col]) {
			var depend = item.triggers[col][i];
			delete this.getItem(depend[0]).depends[depend[1]][row + '__' + col];
		}
	},

	// check if exception syntax exists and returns exception text or false
	_math_exception: function(value) {
		var reg = /#\w+/;
		var match = value.match(reg);
		if (match !== null && match.length > 0)
			return match[0];
		return false;
	}

});




webix.extend(webix.ui.datatable, {

	/////////////////////////
	//    edit start       //
	/////////////////////////
	_get_editor_type:function(id){
		return this.getColumnConfig(id.column).editor;
	},
	getEditor:function(row, column){
		if (!row)
			return this._last_editor;

		if (arguments.length == 1){
			column = row.column;
			row = row.row; 
		}
		
		return ((this._editors[row]||{})[column]);
	},
	_for_each_editor:function(handler){
		for (var row in this._editors){
			var row_editors = this._editors[row];
			for (var column in row_editors)
				if (column!="$count")
					handler.call(this, row_editors[column]);
		}
	},
	_init_editor:function(id, type, show){
		var row = id.row;
		var column  = id.column;
		var col_settings = type.config = this.getColumnConfig(column);
		//show it over cell
		if (show !== false)
			this.showCell(row, column);

		var node = type.render();

		if (type.$inline)
			node = this._locateInput(id);
		type.node = node;
			
		var item = this.getItem(row);
		var format = col_settings.editFormat;

		var value;
		if (this._settings.editMath)
			value = item["$"+column];
		value = value || item[column];

		if (webix.isUndefined(value))
			value="";

		type.setValue(format?format(value):value, item);
		type.value = item[column];
		this._addEditor(id, type);

		if (!type.$inline)
			this._sizeToCell(id, node, true);

		if (type.afterRender)
			type.afterRender();
		
		if (this._settings.liveValidation){
			webix.event(type.node, "keyup", this._bind_live_validation(id, this));
			this.validateEditor(id);
		}

		return node;
	},
	_bind_live_validation:function(id, that){
		return function(){
			that.validateEditor(id);
		};
	},
	_set_new_value:function(editor, new_value){
		var parser = this.getColumnConfig(editor.column).editParse;
		var item = this.getItem(editor.row);

		item[editor.column] = parser?parser(new_value):new_value;
		if (this._settings.editMath)
			delete item["$"+editor.column];
		return editor.row;
	},
	//register editor in collection
	_addEditor:function(id, type, node){
		var row_editors = this._editors[id.row]=this._editors[id.row]||{};

		row_editors.$count = (row_editors.$count||0)+1;

		type.row = id.row; type.column = id.column;
		this._last_editor = row_editors[id.column] = type;

		this._in_edit_mode++;
		this._last_editor_scroll = this.getScrollState();
	},
	_removeEditor:function(editor){
		if (this._last_editor == editor)
			this._last_editor = 0;
		
		if (editor.destroy)
			editor.destroy();
		
		var row = this._editors[editor.row];
		delete row[editor.column];
		row.$count -- ;
		if (!row.$count)
			delete this._editors[editor.row];
		this._in_edit_mode--;
	},
	_changeEditorId:function(oldid, newid)	{
		var editor = this._editors[oldid];
		if (editor){
			this._editors[newid] = editor;
			delete this._editors[oldid];
			for (var key in editor)
				editor[key].row = newid;
		}
	},

	//get html cell by combined id
	_locate_cell:function(id){
		var config = this.getColumnConfig(id.column);
		if (config && config.node && config.attached){
			var index = this.getIndexById(id.row);
			if (index >= config._yr0 && index< config._yr1)
				return config.node.childNodes[index-config._yr0];
		}
		return 0;
	},

	
	/////////////////////////
	//    public methods   //
	/////////////////////////
	editCell:function(row, column, preserve, show){
		column = column || this._settings.columns[0].id;
		return webix.EditAbility.edit.call(this, {row:row, column:column}, preserve, show);
	},
	editRow:function(id, focus){
		if (id && id.row)
			id = id.row;

		var next = false;
		this.eachColumn(function(column){
			this.edit({ row:id, column:column}, next, !next);
			next = true;
		});
	},
	editColumn:function(id, focus){
		if (id && id.column)
			id = id.column;

		var next = false;
		this.eachRow(function(row){
			this.edit({row:row, column:id}, next, !next);
			next = true;
		});
	},
	eachRow:function(handler, all){
		var order = this.data.order;
		if (all) 
			order = this.data._filter_order || order;

		for (var i=0; i<order.length; i++)
			handler.call(this, order[i]);
	},
	eachColumn:function(handler, all){
		for (var i in this._columns_pull){
			var column = this._columns_pull[i];
			handler.call(this, column.id, column);
		}
		if (all){
			for (var i in this._hidden_column_hash){
				var column = this._hidden_column_hash[i];
				handler.call(this, column.id, column);
			}
		}
	},


	////////////////////
	//    edit next   //
	////////////////////
	_after_edit_next:function(editor_next){
		if (this.getSelectedId){	//select related cell when possible
			var sel = this.getSelectedId(true);
			if (sel.length == 1){
				this._select(editor_next);
				return false;
			}
		}
	},
	_custom_tab_handler:function(tab, e){
		if (this._settings.editable && !this._in_edit_mode){
			//if we have focus in some custom input inside of datatable
			if (e.target && e.target.tagName == "INPUT") return true;

			var selection = this.getSelectedId(true);
			if (selection.length == 1){
				this.editNext(tab, selection[0]);
				return false;
			}
		}
		return true;
	},
	_find_cell_next:function(start, check, direction){
		var row = this.getIndexById(start.row);
		var column = this.getColumnIndex(start.column);
		var order = this.data.order;
		var cols = this._columns;

		if (direction){
			for (var i=row; i<order.length; i++){
				for (var j=column+1; j<cols.length; j++){
					var id = { row:order[i], column:cols[j].id};
					if (check.call(this, id))
						return id;
				}
				column = -1;
			}
		} else {
			for (var i=row; i>=0; i--){
				for (var j=column-1; j>=0; j--){
					var id = { row:order[i], column:cols[j].id};
					if (check.call(this, id))
						return id;
				}
				column = cols.length;
			}
		}

		return null;
	},


	/////////////////////////////
	//    scroll correction    //
	/////////////////////////////
	_correct_after_focus_y:function(){
		if (this._in_edit_mode){
			if (this._ignore_after_focus_scroll)
				this._ignore_after_focus_scroll = false;
			else {
				this._y_scroll.scrollTo(this.getScrollState().y+this._body.childNodes[1].firstChild.scrollTop);
				this._body.childNodes[1].firstChild.scrollTop = 0;
				this._ignore_after_focus_scroll = true;
			}
		}
	},
	_correct_after_focus_x:function(){
		if (this._in_edit_mode){
			this._x_scroll.scrollTo(this._body.childNodes[1].scrollLeft);
		}
	},
	_component_specific_edit_init:function(){
		this.attachEvent("onScrollY", this._update_editor_y_pos);
		this.attachEvent("onScrollX", this._update_editor_y_pos);
		this.attachEvent("onScrollY", this._refocus_inline_editor);
		this.attachEvent("onColumnResize", function(){ this.editStop(); });
		this.attachEvent("onAfterFilter", function(){ this.editStop(); });
		this.attachEvent("onRowResize", function(){ this.editStop(); });
		this._body.childNodes[1].firstChild.onscroll = webix.bind(this._correct_after_focus_y, this);
		this._body.childNodes[1].onscroll = webix.bind(this._correct_after_focus_x, this);
	},
	_update_editor_y_pos:function(){
		if (this._in_edit_mode){
			var old  = this._last_editor_scroll;
			this._last_editor_scroll = this.getScrollState();

			var diff = this._last_editor_scroll.y - old.y;
			this._for_each_editor(function(editor){
				if (editor.getPopup){
					var node = this.getItemNode(editor);
					if (node)
						editor.getPopup().show(node);
					else
						editor.getPopup().show({ x:-10000, y:-10000 });
				} else if (!editor.$inline){
					editor.node.top -= diff;
					editor.node.style.top = editor.node.top + "px";
				}
			});
		}
	}

});

webix.extend(webix.ui.datatable, webix.EditAbility);
webix.extend(webix.ui.datatable, {
	$init:function(){
		this._hidden_column_hash = {};
		this._hidden_column_order = [];
		this._hidden_split=[0,0];
	
		this.attachEvent("onStructureLoad", this._hideInitialColumns);
	},
	_hideInitialColumns:function(){
		var cols = this._columns;
		for (var i = cols.length-1; i>=0; i--){
			if (cols[i].hidden)
				this.hideColumn(cols[i].id, true, true);
			else if (cols[i].batch && this.config.visibleBatch && cols[i].batch!=this.config.visibleBatch){
				this.hideColumn(cols[i].id, true, true);
			}
		}

	},
	moveColumn:function(id, index){
		var start_index = this.getColumnIndex(id);
		if (start_index == index) return; //already in place
		var columns = this._settings.columns;

		var start = columns.splice(start_index,1);
		var pos = index - (index>start_index?1:0);
		webix.PowerArray.insertAt.call(columns, start[0], pos);

		//TODO: split handling
		//we can move split line when column dropped after it

		this._refresh_columns();
	},
	isColumnVisible:function(id){
		return !this._hidden_column_hash[id];
	},
	hideColumn:function(id, mode, silent){
		var cols = this._settings.columns;
		var horder = this._hidden_column_order;
		var hhash = this._hidden_column_hash;

		if (mode!==false){
			var index = this.getColumnIndex(id);
			webix.assert(index != -1, "hideColumn: invalid ID or already hidden");

			//in case of second call to hide the same column, command will be ignored
			if (index == -1) return;

			if (!horder.length){
				for (var i=0; i<cols.length; i++)
					horder[i] = cols[i].id;
				this._hidden_split = [this._settings.leftSplit, this._rightSplit];
			}

			
			

			if (index<this._settings.leftSplit)
				this._settings.leftSplit--;
			if (index>=this._rightSplit)	
				this._settings.rightSplit--;
			else 
				this._rightSplit--;

			this._fixColspansHidden(index, cols[index], 0);
			this._hideColumn(index);
			var column  = hhash[id] = cols.splice(index, 1)[0];
			column._yr0 = -1;

			delete this._columns_pull[id];
		} else {
			var column = hhash[id];
			webix.assert(column, "showColumn: invalid ID or already visible");

			//in case of second show command for already visible column - ignoring
			if (!column) return;

			var prev = null;
			var i = 0;
			for (; i<horder.length; i++){
				if (horder[i] == id)
					break;
				if (!hhash[horder[i]])
					prev = horder[i];
			}
			var index = prev?this.getColumnIndex(prev)+1:0;

			webix.PowerArray.insertAt.call(cols,column, index);
			this._fixColspansHidden(index, column, 1);
			delete column.hidden;

			if (i<this._hidden_split[0])
				this._settings.leftSplit++;
			if (i>=this._hidden_split[1])	
				this._settings.rightSplit++;
			else
				this._rightSplit++;
							
			delete hhash[id];
			this._columns_pull[id] = column;
		}
		if (!silent)
			this._refresh_columns();
	},
	_fixColspansHidden:function(ind, config, mod){
		for (var i = config.header.length - 1; i >= 0; i--) {
			if (config.header[i] === null){
				for (var j = ind; j >= 0; j--) {
					var prev = this._columns[j];
					if (prev.header[i] !== null){
						if (prev.header[i].colspan + mod > ind - j)
							prev.header[i].colspan -= mod ? -1 : 1;
						break;
					}
				}
			} else  if (config.header[i].colspan && mod === 0)
				config.header[i].colspan = 1;
		}
	},
	refreshColumns:function(columns){
		this._columns_pull = {};
		//clear rendered data
		for (var i=0; i<this._columns.length; i++){
			var col = this._columns[i];
			this._columns_pull[col.id] = col;
			col.attached = col.node = null;
		}
		for (var i=0; i<3; i++)
			this._body.childNodes[i].firstChild.innerHTML = "";

		//render new structure
		this._columns = this.config.columns = (columns || this.config.columns);

		this._dtable_fully_ready = 0;
		this.callEvent("onStructureUpdate");

		this._define_structure();
		this._update_scroll();
		this.render();	
	},
	_refresh_columns:function(){
		this._dtable_fully_ready = 0;
		this.callEvent("onStructureUpdate");
		
		this._apply_headers();
		this.render();
	},
	showColumn:function(id){
		return this.hideColumn(id, false);
	},
	showColumnBatch:function(batch){
		this.eachColumn(function(id, col){
			if(col.batch){
				if(col.batch == batch && this._hidden_column_hash[col.id])
					this.hideColumn(col.id, false, true);
				else if(col.batch!=batch && !this._hidden_column_hash[col.id])
					this.hideColumn(col.id, true, true);
			}
		}, true);

		this._refresh_columns();
	}
});


webix.extend(webix.ui.datatable, {
	moveSelection:function(mode, shift){
		//get existing selection as array
		var t = this.getSelectedId(true);
		var index = t.length-1;
		
		if (index>=0){
			var row = t[index].row;
			var column = t[index].column;
			var preserve = this._settings.multiselect ? shift : false;

			if (mode == "top" || mode == "bottom") {
				if (row) {
					// first/last row setting
					if (mode == "top") 
						row = this.data.getFirstId();
					else if (mode == "bottom") 
						row = this.data.getLastId();
				}
				if (column) {
					// first/last column setting
					var index = 0;
					if (mode == "bottom") 
						index = this.config.columns.length-1;
					column = this.columnId(index);
				}
			} else if (mode == "up" || mode== "down" || mode == "pgup" || mode == "pgdown"){
				if (row){
					//it seems row's can be seleted
					var index = this.getIndexById(row);
					var step = (mode == "pgup" || mode == "pgdown") ? Math.round(this._dtable_offset_height/this._settings.rowHeight) : 1;
					//get new selection row
					if (mode == "up" || mode == "pgup") index-=step;
					else if (mode == "down" || mode == "pgdown") index+=step;
					//check that we in valid row range
					if (index <0) index=0;
					if (index >=this.data.order.length) index=this.data.order.length-1;

					row = this.getIdByIndex(index);
				}
			} else if (mode == "right" || mode == "left"){
				if (column && this.config.select != "row"){
					//it seems column's can be selected
					var index = this.getColumnIndex(column);
					//get new selected column
					if (mode == "right") index++;
					else if (mode == "left") index--;
					//check that result column index is in valid range
					if (index<0 || index>=this.config.columns.length) return;

					column = this.columnId(index);
				} else if (this.open && mode == "right"){ 
					return this.open(row);
				} else if (this.close && mode == "left"){ 
					return this.close(row);
				}
			} else {
				webix.assert(false, "Not supported selection moving mode");
				return;
			}

			this.showCell(row, column);
			this._select({ row:row, column:column }, preserve);
		}

        return false;
	}
});
webix.extend(webix.ui.datatable, webix.KeysNavigation);




webix.extend(webix.ui.datatable,webix.DataMove);
webix.extend(webix.ui.datatable, {
	$dragHTML:function(item, e){
		var width = this._content_width - this._scrollSizeY;
		var html="<div class='webix_dd_drag' style='width:"+(width-2)+"px;'>";
		var cols = this._settings.columns;
		for (var i=0; i<cols.length; i++){
			var value = this._getValue(item, cols[i]);
			html += "<div style='width:"+cols[i].width+"px;'>"+value+"</div>";
		}
		return html+"</div>";
	},	
	getHeaderNode:function(column_id, row_index){
		var ind = this.getColumnIndex(column_id);
		row_index = row_index || 0;
		var nodes = this._header.childNodes[1].getElementsByTagName("TR")[row_index+1].childNodes;
		for (var i=0; i<nodes.length; i++)
			if (nodes[i].getAttribute("column") == ind)
				return nodes[i].firstChild;
		return null;
	},
	getItemNode:function(id, e){
		if (id && !id.header){
			var row = id.row || id;
			var rowindex = this.getIndexById(row);
			var state = this._get_y_range();
			//row not visible
			if (rowindex < state[0] && rowindex > state[1]) return;

			//get visible column
			var x_range = this._get_x_range();
			var colindex = this._settings.leftSplit ? 0 : x_range[0];
			if (id.column){
				colindex = this.getColumnIndex(id.column);
				//column not visible
				if (colindex < this._rightSplit && colindex >= this._settings.leftSplit && ( colindex<x_range[0] || colindex > x_range[1]))
					return;
			}

			var column = this._settings.columns[colindex];
			if (column.attached && column.node)
				return column.node.childNodes[rowindex-state[0]];
		}
	},
	_translate_id:function(obj, mode){
		if (obj && (!obj.header || !mode))
			return this.data.order[obj.rind];
		return 0;
	},
	dragColumn_setter:function(value){
		var control; //will be defined below
		if (value == "order"){
			control = {
				$drag:webix.bind(function(s,e){
					var id = this.locate(e);
					if (!id || !this.callEvent("onBeforeColumnDrag", [id.column, e])) return false;
					webix.DragControl._drag_context = { from:control, start:id, custom:"column_dnd" };

					var column = this.getColumnConfig(id.column);

					this._relative_column_drag = webix.html.posRelative(e);
					this._limit_column_drag = column.width;

					return "<div class='webix_dd_drag_column' style='width:"+column.width+"px'>"+(column.header[0].text||"&nbsp;")+"</div>";
				}, this),
				$dragPos:webix.bind(function(pos, e, node){
					var context = webix.DragControl.getContext();
					var box = webix.html.offset(this.$view);
					node.style.display = 'none';
					var html = document.elementFromPoint(pos.x, box.y+1);

					var id = (html?this.locate(html):null);

					var start = webix.DragControl.getContext().start.column;
					if (id && id.column != start && (!this._column_dnd_temp_block || id.column != this._last_sort_dnd_node )){
						//ignore normal dnd , and dnd from other components
						if (context.custom == "column_dnd" && webix.$$(html) == this){
							if (!this.callEvent("onBeforeColumnDropOrder",[start, id.column,e])) return;

							var start_index = this.getColumnIndex(start);
							var end_index = this.getColumnIndex(id.column);

							//on touch devices we need to preserve drag-start element till the end of dnd
							if(e.touches){
								this._dragTarget = e.target;
								this._dragTarget.style.display = "none";
								this.$view.parentNode.appendChild(this._dragTarget);
							}

							this.moveColumn(start, end_index+(start_index<end_index?1:0));
							this._last_sort_dnd_node = id.column;
							this._column_dnd_temp_block = true;
						}
					} if (id && id.column == start){
						//flag prevent flickering just after column move
						this._column_dnd_temp_block = false;
					}

					node.style.display = 'block';

					pos.x = pos.x - this._relative_column_drag.x;
					pos.y = box.y;

					if (pos.x < box.x)
						pos.x = box.x; 
					else {
						var max = box.x + this.$view.offsetWidth - this._scrollSizeY-this._limit_column_drag;
						if (pos.x > max)
							pos.x = max;
					}
					webix.DragControl._skip = true;
				
				}, this),
				$dragDestroy:webix.bind(function(a, node){
					webix.html.remove(node);
					//clean dnd source element
					if(this._dragTarget)
						webix.html.remove(this._dragTarget);
					var id = webix.DragControl.getContext().start;
					this.callEvent("onAfterColumnDropOrder",[id.column, this._last_sort_dnd_node, a]);
				}, this)
			};
		} else if (value) {
			control = {
				_inner_drag_only:true,
				$drag:webix.bind(function(s,e){
					var id = this.locate(e);
					if (!id || !this.callEvent("onBeforeColumnDrag", [id.column, e])) return false;
					webix.DragControl._drag_context = { from:control, start:id, custom:"column_dnd" };

					var header = this.getColumnConfig(id.column).header;
					var text = "&nbsp;";
					for (var i = 0; i < header.length; i++)
						if (header[i]){
							text = header[i].text;
							break;
						}

					return "<div class='webix_dd_drag_column'>"+text+"</div>";
				}, this),
				$drop:webix.bind(function(s,t,e){
					var target = e;
					//on touch devices event doesn't point to the actual drop target
					if(e.touches && this._drag_column_last)
						target = this._drag_column_last;

					var id = this.locate(target);

					if (!id) return false;
					var start = webix.DragControl.getContext().start.column;
					if (start != id.column){
						if (!this.callEvent("onBeforeColumnDrop",[start, id.column ,e])) return;
						var start_index = this.getColumnIndex(start);
						var end_index = this.getColumnIndex(id.column);

						this.moveColumn(start, end_index+(start_index<end_index?1:0));
						this.callEvent("onAfterColumnDrop",[start, id.column, e]);
					}
				}, this),
				$dragIn:webix.bind(function(s,t,e){
					var context = webix.DragControl.getContext();
					//ignore normal dnd , and dnd from other components
					
					if (context.custom != "column_dnd" || context.from != control) return false;

					var target = (e.target||e.srcElement);
					while ((target.className||"").indexOf("webix_hcell") == -1){
						target = target.parentNode;
						if (!target) return;
					}

					if (target != this._drag_column_last){	//new target
						if (this._drag_column_last)
							webix.html.removeCss(this._drag_column_last, "webix_dd_over_column");
						webix.html.addCss(target, "webix_dd_over_column");
					}

					return (this._drag_column_last = target);
				}, this),
				$dragDestroy:webix.bind(function(a,h){
					if (this._drag_column_last)
						webix.html.removeCss(this._drag_column_last, "webix_dd_over_column");
					webix.html.remove(h);
				}, this)
			};
		}

		if (value){
			webix.DragControl.addDrag(this._header, control);
			webix.DragControl.addDrop(this._header, control, true);
		}
	}
});
webix.extend(webix.ui.datatable,webix.DragItem);
webix.extend(webix.ui.datatable, {
	_mark_invalid:function(id, details){
		this._clear_invalid_css(id);
		for (var key in details)
			this.addCellCss(id, key, "webix_invalid_cell");

		this.addCss(id, "webix_invalid");
	},
	_clear_invalid:function(id){
		this._clear_invalid_css(id);
		this.removeCss(id, "webix_invalid");
	},
	_clear_invalid_css:function(id){
		var item = this.getItem(id);
		var mark = this.data.getMark(id, "$cellCss");
		if (mark){
			for (var key in mark)
				mark[key] = mark[key].replace("webix_invalid_cell", "").replace("  "," ");
		}
	},

	addRowCss:function(id, css, silent){
		this.addCss(id, css, silent);
	},
	removeRowCss:function(id, css, silent){
		this.removeCss(id, css, silent);
	},
	addCellCss:function(id, name, css, silent){
		var mark = this.data.getMark(id, "$cellCss");
		var newmark = mark || {};

		var style = newmark[name]||"";
		newmark[name] = style.replace(css, "").replace("  "," ")+" "+css;

		if (!mark) this.data.addMark(id, "$cellCss", false, newmark, true);
		if (!silent)
			this.refresh(id);
	},
	removeCellCss:function(id, name, css, silent){
		var mark = this.data.getMark(id, "$cellCss");
		if (mark){
			var style = mark[name]||"";
			if (style)
				mark[name] = style.replace(css, "").replace("  "," ");
			if (!silent)
				this.refresh(id);
		}
	}
});
webix.extend(webix.ui.datatable, webix.ValidateCollection);







webix.TreeTableClick = {};

webix.TreeTablePaste = {
	insert: function(data) {
		var parent = this.getSelectedId(true, true);
		for (var i = 0; i < data.length; i++) {
			var item = {};
			for (var j = 0; j < this._settings.columns.length; j++) {
				item[this._settings.columns[j].id] = data[i][j] || "";
			}
			if (!webix.isUndefined(item.id) && this.exists(item.id))
				item.id = webix.uid();
			this.add(item, null, parent[0]);
		}
	}
};

webix.protoUI({
	name:"treetable",
	$init:function(){
		webix.extend(this.data, webix.TreeStore, true);
		webix.extend(this.type, webix.TreeType);
		webix.extend(this,  webix.TreeDataMove, true);

		for (var key in webix.TreeClick)
			if (!this.on_click[key])
				this.on_click[key] = this._unwrap_id(webix.TreeClick[key]);
		
		this.type.treetable = webix.template("{common.space()}{common.icon()} {common.folder()}");
		this.type.treecheckbox = function(obj, common){
			if (obj.indeterminate && !obj.nocheckbox)
				return "<div class='webix_tree_checkbox webix_indeterminate'></div>";
			else 
				return webix.TreeType.checkbox.apply(this, arguments);
		};
	
		this.data.provideApi(this,true);

	},
	_drag_order_complex:false,
	_unwrap_id:function(original){
		return function (e,id){
			id = id.row;
			return original.call(this,e,id);
		};
	},
	getState:function(){
		var state = webix.DataState.getState.call(this);
		webix.extend(state, webix.TreeAPI.getState.call(this));
		return state;
	},
	setState:function(state){
		if (webix.TreeAPI.setState.call(this, state)){
			//run grid-state only when tree component was fully loaded 
			webix.DataState.setState.call(this, state);	
		}
	},
	clipboard_setter: function(value) {
		webix.extend(this._paste, webix.TreeTablePaste);
		return webix.TablePaste.clipboard_setter.call(this, value);
	}
}, webix.TreeAPI, webix.TreeStateCheckbox, webix.TreeDataLoader, webix.ui.datatable);





webix.Canvas = webix.proto({
	$init:function(container){
		this._canvas_labels = [];
		this._canvas_name =  container.name;
		this._obj = webix.toNode(container.container||container);
		var width = container.width*(window.devicePixelRatio||1);
		var height = container.height*(window.devicePixelRatio||1);
		var style = container.style||"";
		style += ";width:"+container.width+"px;height:"+container.height+"px;";
		this._prepareCanvas(container.name, style ,width, height);
	},
	_prepareCanvas:function(name,style,x,y){
		//canvas has the same size as master object
		this._canvas = webix.html.create("canvas",{ width:x, height:y, canvas_id:name, style:(style||"")});
		this._obj.appendChild(this._canvas);
		//use excanvas in IE
		if (!this._canvas.getContext){
			if (webix.env.isIE){
				webix.require("legacy/excanvas/excanvas.js");	//sync loading
				G_vmlCanvasManager.init_(document);
				G_vmlCanvasManager.initElement(this._canvas);
			} else	//some other not supported browser
				webix.assert(this._canvas.getContext,"Canvas is not supported in the browser");
		}
		return this._canvas;
	}, 
	getCanvas:function(context){
		var ctx = (this._canvas||this._prepareCanvas(this._contentobj)).getContext(context||"2d");
		if(!this._webixDevicePixelRatio){
			this._webixDevicePixelRatio = true;
			ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
		}
		return ctx;
	},
	_resizeCanvas:function(x, y){
		if (this._canvas){
			this._canvas.setAttribute("width", x*(window.devicePixelRatio||1));
			this._canvas.setAttribute("height", y*(window.devicePixelRatio||1));
			this._canvas.style.width = x+"px";
			this._canvas.style.height = y+"px";
			this._webixDevicePixelRatio = false;
		}
	},
	renderText:function(x,y,text,css,w){
		if (!text) return; //ignore empty text
		if (w) w = Math.max(w,0);
		if (y) y = Math.max(y,0);
		var t = webix.html.create("DIV",{
			"class":"webix_canvas_text"+(css?(" "+css):""),
			"style":"left:"+x+"px; top:"+y+"px;"
		},text);
		this._obj.appendChild(t);
		this._canvas_labels.push(t); //destructor?
		if (w)
			t.style.width = w+"px";
		return t;
	},
	renderTextAt:function(valign,align, x,y,t,c,w){
		var text=this.renderText.call(this,x,y,t,c,w);
		if (text){
			if (valign){
				if(valign == "middle")
					text.style.top = parseInt(y-text.offsetHeight/2,10) + "px";
				else
					text.style.top = y-text.offsetHeight + "px";
			}
			if (align){
			    if(align == "left")
					text.style.left = x-text.offsetWidth + "px";
				else
					text.style.left = parseInt(x-text.offsetWidth/2,10) + "px";
			}
		}
		return text;
	},
	clearCanvas:function(skipMap){
		var areas=[], i;

		for(i=0; i < this._canvas_labels.length;i++)
			this._obj.removeChild(this._canvas_labels[i]);
		this._canvas_labels = [];

		if (!skipMap&&this._obj._htmlmap){

			//areas that correspond this canvas layer
			areas = this._getMapAreas();

			//removes areas of this canvas
			while(areas.length){
				areas[0].parentNode.removeChild(areas[0]);
				areas.splice(0,1);
			}
			areas = null;

			//removes _htmlmap object if all its child nodes are removed
			if(!this._obj._htmlmap.getElementsByTagName("AREA").length){
				this._obj._htmlmap.parentNode.removeChild(this._obj._htmlmap);
				this._obj._htmlmap = null;
			}

		}
		//FF breaks, when we are using clear canvas and call clearRect without parameters
		this.getCanvas().clearRect(0,0,this._canvas.offsetWidth, this._canvas.offsetHeight);
	},
	toggleCanvas:function(){
		this._toggleCanvas(this._canvas.style.display=="none");
	},
	showCanvas:function(){
		this._toggleCanvas(true);
	},
	hideCanvas:function(){
		this._toggleCanvas(false);
	},
	_toggleCanvas:function(show){
		var areas, i;

		for(i=0; i < this._canvas_labels.length;i++)
			this._canvas_labels[i].style.display = (show?"":"none");

		if (this._obj._htmlmap){
			areas = this._getMapAreas();
			for( i = 0; i < areas.length; i++){
				if(show)
					areas[i].removeAttribute("disabled");
				else
					areas[i].setAttribute("disabled","true");
			}
		}
		//FF breaks, when we are using clear canvas and call clearRect without parameters
		this._canvas.style.display = (show?"":"none");
	},
	_getMapAreas:function(){
		var res = [], areas, i;

		areas = this._obj._htmlmap.getElementsByTagName("AREA");

		for(i = 0; i < areas.length; i++){
			if(areas[i].getAttribute("userdata") == this._canvas_name){
				res.push(areas[i]);
			}
		}

		return res;
	}
});







webix.color = {
	_toHex:["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],
	toHex:function(number, length){
		number=parseInt(number,10);
		var str = "";
			while (number>0){
				str=this._toHex[number%16]+str;
				number=Math.floor(number/16);
			}
			while (str.length <length)
				str = "0"+str;
		return str;
	},
	hexToDec:function(hex){
		return parseInt(hex, 16);
	},
	toRgb:function(rgb){
		var r,g,b,rgbArr;
		if (typeof(rgb) != 'string') {
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
		} else if (rgb.indexOf('rgb')!=-1) {
			rgbArr = rgb.substr(rgb.indexOf("(")+1,rgb.lastIndexOf(")")-rgb.indexOf("(")-1).split(",");
			r = rgbArr[0];
			g = rgbArr[1];
			b = rgbArr[2];
		} else {
			if (rgb.substr(0, 1) == '#') {
				rgb = rgb.substr(1);
			}
			r = this.hexToDec(rgb.substr(0, 2));
			g = this.hexToDec(rgb.substr(2, 2));
			b = this.hexToDec(rgb.substr(4, 2));
		}
		r = (parseInt(r,10)||0);
		g = (parseInt(g,10)||0);
		b = (parseInt(b,10)||0);
		if (r < 0 || r > 255)
			r = 0;
		if (g < 0 || g > 255)
			g = 0;
		if (b < 0 || b > 255)
			b = 0;
		return [r,g,b];
	},
	hsvToRgb:function(h, s, v){
		var hi,f,p,q,t,r,g,b;
		hi = Math.floor((h/60))%6;
		f = h/60-hi;
		p = v*(1-s);
		q = v*(1-f*s);
		t = v*(1-(1-f)*s);
		r = 0;
		g = 0;
		b = 0;
		switch(hi) {
			case 0:
				r = v; g = t; b = p;
				break;
			case 1:
				r = q; g = v; b = p;
				break;
			case 2:
				r = p; g = v; b = t;
				 break;
			case 3:
				r = p; g = q; b = v;
				break;
			case 4:
				r = t; g = p; b = v;
				break;
			case 5:
				r = v; g = p; b = q;
				break;
			default:
				break;
		}
		r = Math.floor(r*255);
		g = Math.floor(g*255);
		b = Math.floor(b*255);
		return [r, g, b];
	},
	rgbToHsv:function(r, g, b){
		var r0,g0,b0,min0,max0,s,h,v;
		r0 = r/255;
		g0 = g/255;
		b0 = b/255;
		min0 = Math.min(r0, g0, b0);
		max0 = Math.max(r0, g0, b0);
		h = 0;
		s = max0===0?0:(1-min0/max0);
		v = max0;
		if (max0 == min0) {
			h = 0;
		} else if (max0 == r0 && g0>=b0) {
			h = 60*(g0 - b0)/(max0 - min0)+0;
		} else if (max0 == r0 && g0 < b0) {
			h = 60*(g0 - b0)/(max0 - min0)+360;
		} else if (max0 == g0) {
			h = 60*(b0 - r0)/(max0-min0)+120;
		} else if (max0 == b0) {
			h = 60*(r0 - g0)/(max0 - min0)+240;
		}
		return [h, s, v];
	}
};






webix.HtmlMap = webix.proto({
	$init:function(key){
		this._id = "map_"+webix.uid();
		this._key = key;
		this._map = [];
	},
	addRect: function(id,points,userdata) {
		this._createMapArea(id,"RECT",points,userdata);
	},
	addPoly: function(id,points,userdata) {
		this._createMapArea(id,"POLY",points,userdata);
	},
	_createMapArea:function(id,shape,coords,userdata){
		var extra_data = "";
		if(arguments.length==4) 
			extra_data = "userdata='"+userdata+"'";
		this._map.push("<area "+this._key+"='"+id+"' shape='"+shape+"' coords='"+coords.join()+"' "+extra_data+"></area>");
	},
	addSector:function(id,alpha0,alpha1,x,y,R,ky,userdata){
		var points = [];
		points.push(x);
		points.push(Math.floor(y*ky)); 
		for(var i = alpha0; i < alpha1; i+=Math.PI/18){
			points.push(Math.floor(x+R*Math.cos(i)));
			points.push(Math.floor((y+R*Math.sin(i))*ky));
		}
		points.push(Math.floor(x+R*Math.cos(alpha1)));
		points.push(Math.floor((y+R*Math.sin(alpha1))*ky));
		points.push(x);
		points.push(Math.floor(y*ky)); 
		
		return this.addPoly(id,points,userdata);
	},
	render:function(obj){
		var d = webix.html.create("DIV");
		d.style.cssText="position:absolute; width:100%; height:100%; top:0px; left:0px;";
		obj.appendChild(d);
		var src = webix.env.isIE?"":"src='data:image/gif;base64,R0lGODlhEgASAIAAAP///////yH5BAUUAAEALAAAAAASABIAAAIPjI+py+0Po5y02ouz3pwXADs='";
		d.innerHTML="<map id='"+this._id+"' name='"+this._id+"'>"+this._map.join("\n")+"</map><img "+src+" class='webix_map_img' usemap='#"+this._id+"'>";
		
		obj._htmlmap = d; //for clearing routine
		
		this._map = [];
	}
});



webix.protoUI({
	name:"chart",
	$init:function(config){
		this._series = [this._settings];
		this._legend_labels = [];
		this._contentobj.className += " webix_chart";
		this.$ready.push(this._after_init_call);
		/*preset*/
		if(config.preset){
            this._definePreset(config);
        }

		//this.attachEvent("onLocateData", this._switchSerie);
		this.attachEvent("onMouseMove",this._switchSerie);

		this.data.provideApi(this, true);
	},
	_after_init_call:function(){
		this.data.attachEvent("onStoreUpdated",webix.bind(function(){
			this.render();  
		},this));
  	},
	 defaults:{
        color:"RAINBOW",
		alpha:"1",
		label:false,
		value:"{obj.value}",
		padding:{},
		type:"pie",
		lineColor:"#ffffff",
		cant:0.5,
		barWidth: 30,
		line:{
            width:2,
			color:"#1293f8"
        },
		item:{
			radius:3,
			borderColor:"#636363",
            borderWidth:1,
            color: "#ffffff",
            alpha:1,
            type:"r",
            shadow:false
		},
		shadow:true,
		gradient:false,
		border:true,
		labelOffset: 20,
		origin:"auto",
		scale: "linear"
    },
	_id:"webix_area_id",
	on_click:{
		webix_chart_legend_item: function(e,id,obj){
			var series = obj.getAttribute("series_id");
			if(this.callEvent("onLegendClick",[e,series,obj])){
				var config = this._settings;
				var values = config.legend.values;
				var toggle = (values&&values[series].toggle)||config.legend.toggle;
				if((typeof series != "undefined")&&this._series.length>1){
					// hide action
					if(toggle){
						if(obj.className.indexOf("hidden")!=-1){
							this.showSeries(series);
						}
						else{
							this.hideSeries(series);
						}
					}
				}
			}
		}
	},
	on_dblclick:{
	},
	on_mouse_move:{
	},
	locate: function(e){
		return webix.html.locate(e,this._id);
	},
	$setSize:function(x,y){
		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			for(var c in this.canvases){
				this.canvases[c]._resizeCanvas(this._content_width, this._content_height);
			}
			this.render();
		}
	},
	type_setter:function(val){
		webix.assert(this["$render_"+val], "Chart type is not supported, or extension is not loaded: "+val);
		
		if (typeof this._settings.offset == "undefined"){
			this._settings.offset = !(val == "area" || val == "stackedArea");
		}

        if(val=="radar"&&!this._settings.yAxis)
		    this.define("yAxis",{});
        if(val=="scatter"){
            if(!this._settings.yAxis)
                this.define("yAxis",{});
            if(!this._settings.xAxis)
                this.define("xAxis",{});
        }
			
			
		return val;
	},
	removeAllSeries: function(){
		this.clearCanvas();
		if(this._legendObj){
			this._legendObj.innerHTML = "";
			this._legendObj.parentNode.removeChild(this._legendObj);
			this._legendObj = null;
		}
		if(this.canvases){
			this.canvases = {};
		}
		this._contentobj.innerHTML="";
		for(var i = 0; i < this._series.length; i++){
			if(this._series[i].tooltip)
				this._series[i].tooltip.destructor();
		}
	//	this.callEvent("onDestruct",[]);
		this._series = [];
	},
	clearCanvas:function(){
		if(this.canvases&&typeof this.canvases == "object")
			for(var c in this.canvases){
				this.canvases[c].clearCanvas();
			}
	},
	render:function(){
		var bounds, i, data, map, temp;
		if (!this.isVisible(this._settings.id))
			return;

		if (!this.callEvent("onBeforeRender",[this.data]))
			return;
		if(this.canvases&&typeof this.canvases == "object"){
			for(i in this.canvases){
				this.canvases[i].clearCanvas();
			}
		}
		else
			this.canvases = {};
		/*if(this._legendObj){
			for(i=0; i < this._legend_labels.length;i++)
				this._legendObj.removeChild(this._legend_labels[i]);
		}
		this._legend_labels = [];
		*/
		
		if(this._settings.legend){
			if(!this.canvases["legend"])
				this.canvases["legend"] =  this._createCanvas("legend");
			this._drawLegend(
				this.data.getRange(),
				this._content_width,
				this._content_height
			);
		}
		bounds = this._getChartBounds(this._content_width,this._content_height);
		map = new webix.HtmlMap(this._id);
		temp = this._settings;

		if(this._series){
			data = this._getChartData();

			for(i=0; i < this._series.length;i++){
				this._settings = this._series[i];
				if(!this.canvases[i])
					this.canvases[i] = this._createCanvas(i,"z-index:"+(2+i));
				this["$render_"+this._settings.type](
					this.canvases[i].getCanvas(),
					data,
					bounds.start,
					bounds.end,
					i,
					map
				);
			}
		}
		
		map.render(this._contentobj);
		this._contentobj.lastChild.style.zIndex = 100;
		this._applyBounds(this._contentobj.lastChild,bounds);
		this.callEvent("onAfterRender",[]);
		this._settings = temp;
	},
	_applyBounds: function(elem,bounds){
		var style = {};
		style.left = bounds.start.x;
		style.top = bounds.start.y;
		style.width = bounds.end.x-bounds.start.x;
		style.height = bounds.end.y - bounds.start.y;
		for(var prop in style){
			elem.style[prop] = style[prop]+"px";
		}
	},
	_getChartData: function(){
		var axis, axisConfig ,config, data, i, newData,
			start, units, value, valuesHash;
		data = this.data.getRange();
		axis = (this._settings.type.toLowerCase().indexOf("barh")!=-1?"yAxis":"xAxis");
		axisConfig = this._settings[axis];
		if(axisConfig&&axisConfig.units&&(typeof axisConfig.units == "object")){
			config = axisConfig.units;
			units = [];
			if(typeof config.start != "undefined"&&typeof config.end != "undefined" && typeof config.next != "undefined"){
				start = config.start;
				while(start<=config.end){
					units.push(start);
					start = config.next.call(this,start);
				}
			}
			else if(Object.prototype.toString.call(config) === '[object Array]'){
				units = config;
			}
			newData = [];
			if(units.length){
				value = axisConfig.value;
				valuesHash = {};
				for(i=0;i < data.length;i++){
					valuesHash[value(data[i])] = i;
				}
				for(i=0;i< units.length;i++){
					if(typeof valuesHash[units[i]]!= "undefined"){
						data[valuesHash[units[i]]].$unit = units[i];
						newData.push(data[valuesHash[units[i]]]);
					}
					else{
						newData.push({$unit:units[i]});
					}
				}
			}
			return newData;
		}
		return data;
	},
	series_setter:function(config){
		if(typeof config!="object"){
			webix.assert(config,"Chart :: Series must be an array or object");	
		}
		else{

			this._parseSettings(!config.length?config:config[0]);
			this._series = [this._settings];


			for(var i=1;i< config.length;i++)
				this.addSeries(config[i]);
		}
		return config;
	},
	value_setter:webix.template,
    xValue_setter:webix.template,
    yValue_setter:function(config){
        this.define("value",config);
    },
	alpha_setter:webix.template,
	label_setter:webix.template,
	lineColor_setter:webix.template,
	borderColor_setter:webix.template,
	pieInnerText_setter:webix.template,
	gradient_setter:function(config){
		if((typeof(config)!="function")&&config&&(config === true))
			config = "light";
		return config;
	},
	colormap:{
		"RAINBOW":function(obj){
            var pos = Math.floor(this.getIndexById(obj.id)/this.count()*1536);
			if (pos==1536) pos-=1;
			return this._rainbow[Math.floor(pos/256)](pos%256);
		}
	},
	color_setter:function(value){
		return this.colormap[value]||webix.template( value);
	},
    fill_setter:function(value){
        return ((!value||value=="0")?false:webix.template( value));
    },
    _definePreset:function(obj){
        this.define("preset",obj.preset);
        delete obj.preset;
    },
	preset_setter:function(value){
        var a, b, preset;
        this.defaults = webix.extend({},this.defaults);
        preset =  this.presets[value];

        if(typeof preset == "object"){

            for(a in preset){

                if(typeof preset[a]=="object"){
                    if(!this.defaults[a]||typeof this.defaults[a]!="object"){
                         this.defaults[a] = webix.extend({},preset[a]);
                    }
                    else{
                        this.defaults[a] = webix.extend({},this.defaults[a]);
                        for(b in preset[a]){
                            this.defaults[a][b] = preset[a][b];
                        }
                    }
                }else{
                     this.defaults[a] = preset[a];
                }
            }
            return value;
        }
		return false;
	},
	legend_setter:function( config){
		if(!config){
			if(this.legendObj){
				this.legendObj.innerHTML = "";
				this.legendObj = null;
			}
			return false;
		}
		if(typeof(config)!="object")	//allow to use template string instead of object
			config={template:config};

		this._mergeSettings(config,{
			width:150,
			height:18,
			layout:"y",
			align:"left",
			valign:"bottom",
			template:"",
			toggle:(this._settings.type.toLowerCase().indexOf("stacked")!=-1?"":"hide"),
			marker:{
				type:"square",
				width:15,
				height:15,
                radius:3
			},
            margin: 4,
            padding: 3
		});

		config.template = webix.template(config.template);
		return config;
	},
	item_setter:function( config){
		if(typeof(config)!="object")
			config={color:config, borderColor:config};
        this._mergeSettings(config,webix.extend({},this.defaults.item));
		var settings = ["alpha","borderColor","color","radius"];
		this._converToTemplate(settings,config);
		return config;
	},
	line_setter:function( config){
		if(typeof(config)!="object")
			config={color:config};
	    webix.extend(this.defaults.line,config,true);
        config = webix.extend({},this.defaults.line);
		config.color = webix.template(config.color);
		return config;
	},
	padding_setter:function( config){
		if(typeof(config)!="object")
			config={left:config, right:config, top:config, bottom:config};
		this._mergeSettings(config,{
			left:50,
			right:20,
			top:35,
			bottom:40
		});
		return config;
	},
	xAxis_setter:function( config){
		if(!config) return false;
		if(typeof(config)!="object")
			config={ template:config };

		this._mergeSettings(config,{
			title:"",
			color:"#000000",
			lineColor:"#cfcfcf",
			template:"{obj}",
			lines:true
		});
		var templates = ["lineColor","template","lines"];
        this._converToTemplate(templates,config);
		this._configXAxis = webix.extend({},config);
		return config;
	},
    yAxis_setter:function( config){
	    this._mergeSettings(config,{
			title:"",
			color:"#000000",
			lineColor:"#cfcfcf",
			template:"{obj}",
			lines:true,
            bg:"#ffffff"
		});
		var templates = ["lineColor","template","lines","bg"];
        this._converToTemplate(templates,config);
		this._configYAxis = webix.extend({},config);
		return config;
	},
    _converToTemplate:function(arr,config){
        for(var i=0;i< arr.length;i++){
            config[arr[i]] = webix.template(config[arr[i]]);
        }
    },
	_createCanvas: function(name,style,container){
		return new webix.Canvas({container:(container||this._contentobj),name:name,style:(style||""), width: this._content_width, height:this._content_height });
	},
    _drawScales:function(data,point0,point1,start,end,cellWidth){
	    var y = 0;
	    if(this._settings.yAxis){
		    if(!this.canvases["y"])
		        this.canvases["y"] =  this._createCanvas("axis_y");

		    y = this._drawYAxis(this.canvases["y"].getCanvas(),data,point0,point1,start,end);
	    }
	    if (this._settings.xAxis){
		    if(!this.canvases["x"])
		        this.canvases["x"] =  this._createCanvas("axis_x");
		    this._drawXAxis(this.canvases["x"].getCanvas(),data,point0,point1,cellWidth,y);
	    }
	    return y;
	},
	_drawXAxis:function(ctx,data,point0,point1,cellWidth,y){
		var x0 = point0.x-0.5;
		var y0 = parseInt((y?y:point1.y),10)+0.5;
		var x1 = point1.x;
		var unitPos;
		var center = true;



		for(var i=0; i < data.length;i ++){

			if(this._settings.offset === true)
				unitPos = x0+cellWidth/2+i*cellWidth;
			else{
				unitPos = (i==data.length-1)?point1.x:x0+i*cellWidth;
				center = !!i;
			}
			unitPos = Math.ceil(unitPos)-0.5;
			/*scale labels*/
			var top = ((this._settings.origin!="auto")&&(this._settings.type=="bar")&&(parseFloat(this._settings.value(data[i]))<this._settings.origin));
			this._drawXAxisLabel(unitPos,y0,data[i],center,top);
			/*draws a vertical line for the horizontal scale*/

			if((this._settings.offset||i)&&this._settings.xAxis.lines.call(this,data[i]))
				this._drawXAxisLine(ctx,unitPos,point1.y,point0.y,data[i]);
		}

		this.canvases["x"].renderTextAt(true, false, x0,point1.y+this._settings.padding.bottom-3,
			this._settings.xAxis.title,
			"webix_axis_title_x",
			point1.x - point0.x
		);
		this._drawLine(ctx,x0,y0,x1,y0,this._settings.xAxis.color,1);
		/*the right border in lines in scale are enabled*/
		if (!this._settings.xAxis.lines.call(this,{}) || !this._settings.offset) return;
		this._drawLine(ctx,x1+0.5,point1.y,x1+0.5,point0.y+0.5,this._settings.xAxis.color,0.2);
	},
	_drawYAxis:function(ctx,data,point0,point1,start,end){
		var step;
		var scaleParam= {};
		if (!this._settings.yAxis) return;

		var x0 = point0.x - 0.5;
		var y0 = point1.y;
		var y1 = point0.y;
		var lineX = point1.y;

		//this._drawLine(ctx,x0,y0,x0,y1,this._settings.yAxis.color,1);

		if(this._settings.yAxis.step)
			step = parseFloat(this._settings.yAxis.step);

		if(typeof this._configYAxis.step =="undefined"||typeof this._configYAxis.start=="undefined"||typeof this._configYAxis.end =="undefined"){
			scaleParam = this._calculateScale(start,end);
			start = scaleParam.start;
			end = scaleParam.end;
			step = scaleParam.step;

			this._settings.yAxis.end = end;
			this._settings.yAxis.start = start;
		}
		else if(this.config.scale == "logarithmic")
			this._logScaleCalc = true;

		this._setYAxisTitle(point0,point1);
		if(step===0) return;
		if(end==start){
			return y0;
		}
		var stepHeight = (y0-y1)*step/(end-start);
		var c = 0;
		for(var i = start; i<=end; i += step){
			var value = this._logScaleCalc?Math.pow(10,i):i;
			if (scaleParam.fixNum)  value = parseFloat(value).toFixed(scaleParam.fixNum);
			var yi = Math.floor(y0-c*stepHeight)+ 0.5;/*canvas line fix*/
			if(!(i==start&&this._settings.origin=="auto") &&this._settings.yAxis.lines.call(this,i))
				this._drawLine(ctx,x0,yi,point1.x,yi,this._settings.yAxis.lineColor.call(this,i),1);
			if(i == this._settings.origin) lineX = yi;
			/*correction for JS float calculation*/
			if(step<1 && !this._logScaleCalc){
				var power = Math.min(Math.floor(this._log10(step)),(start<=0?0:Math.floor(this._log10(start))));
				var corr = Math.pow(10,-power);
				value = Math.round(value*corr)/corr;
				i = value;
			}
			this.canvases["y"].renderText(0,yi-5,
				this._settings.yAxis.template(value.toString()),
				"webix_axis_item_y",
				point0.x-5
			);
			c++;
		}
		this._drawLine(ctx,x0,y0+1,x0,y1,this._settings.yAxis.color,1);
		return lineX;
	},

	_setYAxisTitle:function(point0,point1){
        var className = "webix_axis_title_y"+(webix._isIE&&webix._isIE !=9?" webix_ie_filter":"");
		var text=this.canvases["y"].renderTextAt("middle",false,0,parseInt((point1.y-point0.y)/2+point0.y,10),this._settings.yAxis.title,className);
        if (text)
			text.style.left = (webix.env.transform?(text.offsetHeight-text.offsetWidth)/2:0)+"px";
	},
	_calculateLogScale: function(nmin,nmax){
		var startPower = Math.floor(this._log10(nmin));
		var endPower = Math.ceil(this._log10(nmax));
		return {start: startPower, step: 1, end: endPower};
	},
	_calculateScale:function(nmin,nmax){
		this._logScaleCalc = false;
		if(this._settings.scale == "logarithmic"){
			var logMin = Math.floor(this._log10(nmin));
			var logMax = Math.ceil(this._log10(nmax));
			if(nmin>0 && nmax > 0 && (logMax-logMin>1) ){
				this._logScaleCalc = true;
				return this._calculateLogScale(nmin,nmax);
			}

		}
	    if(this._settings.origin!="auto"&&this._settings.origin<nmin)
			nmin = this._settings.origin;
		var step,start,end;
	   	step = ((nmax-nmin)/8)||1;
		var power = Math.floor(this._log10(step));
		var calculStep = Math.pow(10,power);
		var stepVal = step/calculStep;
		stepVal = (stepVal>5?10:5);
		step = parseInt(stepVal,10)*calculStep;

		if(step>Math.abs(nmin))
			start = (nmin<0?-step:0);
		else{
			var absNmin = Math.abs(nmin);
			var powerStart = Math.floor(this._log10(absNmin));
			var nminVal = absNmin/Math.pow(10,powerStart);
			start = Math.ceil(nminVal*10)/10*Math.pow(10,powerStart)-step;
			if(absNmin>1&&step>0.1){
				start = Math.ceil(start);
			}
			while(nmin<0?start<=nmin:start>=nmin)
				start -= step;
			if(nmin<0) start =-start-2*step;
			
		}
	     end = start;
		while(end<nmax){
			end += step;
			end = parseFloat((end*1.0).toFixed(Math.abs(power)));
		}
		return { start:start,end:end,step:step,fixNum:power<0?Math.abs(power):0 };
	},
	_getLimits:function(orientation,value){
		var data = this.data._obj_array();

		var maxValue, minValue;
		var axis = ((arguments.length && orientation=="h")?this._configXAxis:this._configYAxis);
		value = value||"value";
		if(axis&&(typeof axis.end!="undefined")&&(typeof axis.start!="undefined")&&axis.step){
		    maxValue = parseFloat(axis.end);
			minValue = parseFloat(axis.start);
		}
		else{
			maxValue = webix.GroupMethods.max(this._series[0][value], data);
			minValue = (axis&&(typeof axis.start!="undefined"))?parseFloat(axis.start):webix.GroupMethods.min(this._series[0][value], data);
			if(this._series.length>1)
			for(var i=1; i < this._series.length;i++){
				var maxI = webix.GroupMethods.max(this._series[i][value], data);
				var minI = webix.GroupMethods.min(this._series[i][value], data);
				if (maxI > maxValue) maxValue = maxI;
		    	if (minI < minValue) minValue = minI;
			}
		}
		return {max:maxValue,min:minValue};
	},
	_log10:function(n){
        var method_name="log";
        return Math[method_name](n)/Math.LN10;
    },
	_drawXAxisLabel:function(x,y,obj,center,top){
		if (!this._settings.xAxis) return;
		var elem = this.canvases["x"].renderTextAt(top, center, x,y-(top?2:0),this._settings.xAxis.template(obj));
		if (elem)
			elem.className += " webix_axis_item_x";
	},
	_drawXAxisLine:function(ctx,x,y1,y2,obj){
		if (!this._settings.xAxis||!this._settings.xAxis.lines) return;
		this._drawLine(ctx,x,y1,x,y2,this._settings.xAxis.lineColor.call(this,obj),1);
	},
	_drawLine:function(ctx,x1,y1,x2,y2,color,width){
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
        ctx.lineWidth = 1;
	},
	_getRelativeValue:function(minValue,maxValue){
	    var relValue, origRelValue;
		var valueFactor = 1;
		if(maxValue != minValue){
			relValue = maxValue - minValue;
		}
		else relValue = minValue;
		return [relValue,valueFactor];
	},
	_rainbow : [
		function(pos){ return "#FF"+webix.color.toHex(pos/2,2)+"00";},
		function(pos){ return "#FF"+webix.color.toHex(pos/2+128,2)+"00";},
		function(pos){ return "#"+webix.color.toHex(255-pos,2)+"FF00";},
		function(pos){ return "#00FF"+webix.color.toHex(pos,2);},
		function(pos){ return "#00"+webix.color.toHex(255-pos,2)+"FF";},
		function(pos){ return "#"+webix.color.toHex(pos,2)+"00FF";}		
	],
	/**
	*   adds series to the chart (value and color properties)
	*   @param: obj - obj with configuration properties
	*/
	addSeries:function(obj){
		var temp = webix.extend({},this._settings);
		this._settings = webix.extend({},temp);
		this._parseSettings(obj,{});
	    this._series.push(this._settings);
		this._settings = temp;
    },
    /*switch global settings to serit in question*/
    _switchSerie:function(id, e, tag) {
	    var tip;

	    if(!tag.getAttribute("userdata"))
	        return;

	    this._active_serie = tag.getAttribute("userdata");
	    if (!this._series[this._active_serie]) return;
	    for (var i=0; i < this._series.length; i++) {
		    tip = this._series[i].tooltip;

		    if (tip)
			    tip.disable();
	    }
	    if(!tag.getAttribute("disabled")){
		    tip = this._series[this._active_serie].tooltip;
		    if (tip)
			    tip.enable();
	    }

    },
	hideSeries:function(series){
		this.canvases[series].hideCanvas();
		if(this._settings.legend.values&&this._settings.legend.values[series])
			this._settings.legend.values[series].$hidden = true;
		this._drawLegend();
	},
	showSeries:function(series){
		this.canvases[series].showCanvas();
		if(this._settings.legend.values&&this._settings.legend.values[series])
			delete this._settings.legend.values[series].$hidden;
		this._drawLegend();

	},
	/**
	*   renders legend block
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: width - the width of the container
	*   @param: height - the height of the container
	*/
	_drawLegend:function(data,width){
		/*position of the legend block*/
		var i, legend, legendContainer, legendHeight, legendItems, legendWidth, style,
			x=0, y= 0, ctx, itemColor, disabled, item;

		data = data||[];
		width = width||this._content_width;
		ctx = this.canvases["legend"].getCanvas();
		/*legend config*/
		legend = this._settings.legend;
		 /*the legend sizes*/

		style = (this._settings.legend.layout!="x"?"width:"+legend.width+"px":"");
		/*creation of legend container*/

		if(this._legendObj){

			this._legendObj.innerHTML = "";
			this._legendObj.parentNode.removeChild(this._legendObj);
		}
		this.canvases["legend"].clearCanvas(true);

		legendContainer = webix.html.create("DIV",{
			"class":"webix_chart_legend",
			"style":"left:"+x+"px; top:"+y+"px;"+style
		},"");
		if(legend.padding){
			legendContainer.style.padding =  legend.padding+"px";
		}
		this._legendObj = legendContainer;
		this._contentobj.appendChild(legendContainer);

		/*rendering legend text items*/
		legendItems = [];
		if(!legend.values)
			for(i = 0; i < data.length; i++){
				legendItems.push(this._drawLegendText(legendContainer,legend.template(data[i])));
			}
		else
			for(i = 0; i < legend.values.length; i++){
				legendItems.push(this._drawLegendText(legendContainer,legend.values[i].text,(typeof legend.values[i].id!="undefined"?typeof legend.values[i].id:i),legend.values[i].$hidden));
			}
		if (legendContainer.offsetWidth === 0)
			legendContainer.style.width = "auto"; 
	   	legendWidth = legendContainer.offsetWidth;
	    legendHeight = legendContainer.offsetHeight;

		/*this._settings.legend.width = legendWidth;
		this._settings.legend.height = legendHeight;*/
		/*setting legend position*/
		if(legendWidth<width){
			if(legend.layout == "x"&&legend.align == "center"){
			    x = (width-legendWidth)/2;
            }
			if(legend.align == "right"){
				x = width-legendWidth;
			}
            if(legend.margin&&legend.align != "center"){
                x += (legend.align == "left"?1:-1)*legend.margin;
            }
        }

		if(legendHeight<this._content_height){
			if(legend.valign == "middle"&&legend.align != "center"&&legend.layout != "x")
				y = (this._content_height-legendHeight)/2;
			else if(legend.valign == "bottom")
				y = this._content_height-legendHeight;
            if(legend.margin&&legend.valign != "middle"){
                y += (legend.valign == "top"?1:-1)*legend.margin;
            }
		}
		legendContainer.style.left = x+"px";
		legendContainer.style.top = y+"px";

		/*drawing colorful markers*/
		ctx.save();
		for(i = 0; i < legendItems.length; i++){
			item = legendItems[i];
			if(legend.values&&legend.values[i].$hidden){
				disabled = true;
				itemColor = (legend.values[i].disableColor?legend.values[i].disableColor:"#d9d9d9");
			}
			else{
				disabled = false;
				itemColor = (legend.values?legend.values[i].color:this._settings.color.call(this,data[i]));
			}
			this._drawLegendMarker(ctx,item.offsetLeft+x,item.offsetTop+y,itemColor,item.offsetHeight,disabled,i);
		}
		ctx.restore();
		legendItems = null;
	},
	/**
	*   appends legend item to legend block
	*   @param: ctx - canvas object
	*   @param: obj - data object that needs being represented
	*/
	_drawLegendText:function(cont,value,series,disabled){
		var style = "";
		if(this._settings.legend.layout=="x")
			style = "float:left;";
		/*the text of the legend item*/
		var text = webix.html.create("DIV",{
			"style":style+"padding-left:"+(10+this._settings.legend.marker.width)+"px",
			"class":"webix_chart_legend_item"+(disabled?" hidden":"")
		},value);
		if(arguments.length>2)
			text.setAttribute("series_id",series);
		cont.appendChild(text);
		return text;
	},
	/**
	*   draw legend colorful marder
	*   @param: ctx - canvas object
	*   @param: x - the horizontal position of the marker
	*   @param: y - the vertical position of the marker
	*   @param: obj - data object which color needs being used
	*/
	_drawLegendMarker:function(ctx,x,y,color,height,disabled,i){
		var p = [];
		var marker = this._settings.legend.marker;
		var values = this._settings.legend.values;
		var type = (values&&values[i].markerType?values[i].markerType:marker.type);
		if(color){
			ctx.strokeStyle = ctx.fillStyle = color;
		}

		if(type=="round"||!marker.radius){
			ctx.beginPath();
			ctx.lineWidth = marker.height;
			ctx.lineCap = marker.type;
			/*start of marker*/
			x += ctx.lineWidth/2+5;
			y += height/2;
			ctx.moveTo(x,y);
			var x1 = x + marker.width-marker.height +1;
			ctx.lineTo(x1,y);
			ctx.stroke();
			ctx.fill();

		}
		else if(type=="item"){
			/*copy of line*/
			if(this._settings.line&&this._settings.type != "scatter" && !this._settings.disableLines){
				ctx.beginPath();
				ctx.lineWidth = this._series[i].line.width;
				ctx.strokeStyle = disabled?color:this._series[i].line.color.call(this,{});
				var x0 = x + 5;
				var y0 = y + height/2;
				ctx.moveTo(x0,y0);
				var x1 = x0 + marker.width;
				ctx.lineTo(x1,y0);
				ctx.stroke();
			}
			/*item copy*/
			var config = this._series[i].item;
			var radius = parseInt(config.radius.call(this,{}),10)||0;
			if(radius){
				ctx.beginPath();
				if(disabled){
					ctx.lineWidth = config.borderWidth;
					ctx.strokeStyle = color;
					ctx.fillStyle = color;
				}
				else{
					ctx.lineWidth = config.borderWidth;
					ctx.fillStyle = config.color.call(this,{});
					ctx.strokeStyle = config.borderColor.call(this,{});
					ctx.globalAlpha = config.alpha.call(this,{});
				}
				ctx.beginPath();
				x += marker.width/2+5;
				y += height/2;
				this._strokeChartItem(ctx,x,y,radius+1,config.type);
				ctx.fill();
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		}else{
			ctx.beginPath();
			ctx.lineWidth = 1;
			x += 5;
			y += height/2-marker.height/2;
			p = [
				[x+marker.radius,y+marker.radius,marker.radius,Math.PI,3*Math.PI/2,false],
				[x+marker.width-marker.radius,y],
				[x+marker.width-marker.radius,y+marker.radius,marker.radius,-Math.PI/2,0,false],
				[x+marker.width,y+marker.height-marker.radius],
				[x+marker.width-marker.radius,y+marker.height-marker.radius,marker.radius,0,Math.PI/2,false],
				[x+marker.radius,y+marker.height],
				[x+marker.radius,y+marker.height-marker.radius,marker.radius,Math.PI/2,Math.PI,false],
				[x,y+marker.radius]
			];
			this._path(ctx,p);
			ctx.stroke();
			ctx.fill();
		}

	},
	/**
	*   gets the points those represent chart left top and right bottom bounds
	*   @param: width - the width of the chart container
	*   @param: height - the height of the chart container
	*/
	_getChartBounds:function(width,height){
		var chartX0, chartY0, chartX1, chartY1;
		
		chartX0 = this._settings.padding.left;
		chartY0 = this._settings.padding.top;
		chartX1 = width - this._settings.padding.right;
		chartY1 = height - this._settings.padding.bottom;	
		
		if(this._settings.legend){
			var legend = this._settings.legend;
			/*legend size*/
			var legendWidth = this._settings.legend.width;
			var legendHeight = this._settings.legend.height;
		
			/*if legend is horizontal*/
			if(legend.layout == "x"){
				if(legend.valign == "center"){
					if(legend.align == "right")
						chartX1 -= legendWidth;
					else if(legend.align == "left")
				 		chartX0 += legendWidth;
			 	}
			 	else if(legend.valign == "bottom"){
			    	chartY1 -= legendHeight;
			 	}
			 	else{
			    	chartY0 += legendHeight;
			 	}
			}
			/*vertical scale*/
			else{
				if(legend.align == "right")
					chartX1 -= legendWidth;
			 	else if(legend.align == "left")
					chartX0 += legendWidth;
			}
		}
		return {start:{x:chartX0,y:chartY0},end:{x:chartX1,y:chartY1}};
	},
	/**
	*   gets the maximum and minimum values for the stacked chart
	*   @param: data - data set
	*/
	_getStackedLimits:function(data){
		var i, j, maxValue, minValue, value;
		if(this._settings.yAxis&&(typeof this._settings.yAxis.end!="undefined")&&(typeof this._settings.yAxis.start!="undefined")&&this._settings.yAxis.step){
			maxValue = parseFloat(this._settings.yAxis.end);
			minValue = parseFloat(this._settings.yAxis.start);
		}
		else{
			for(i=0; i < data.length; i++){
				data[i].$sum = 0 ;
				data[i].$min = Infinity;
				for(j =0; j < this._series.length;j++){
					value = parseFloat(this._series[j].value(data[i])||0);
					if(isNaN(value)) continue;
					if(this._series[j].type.toLowerCase().indexOf("stacked")!=-1)
						data[i].$sum += value;
					if(value < data[i].$min) data[i].$min = value;
				}
			}
			maxValue = -Infinity;
			minValue = Infinity;
			for(i=0; i < data.length; i++){
				if (data[i].$sum > maxValue) maxValue = data[i].$sum ;
				if (data[i].$min < minValue) minValue = data[i].$min ;
			}
			if(minValue>0) minValue =0;
		}
		return {max: maxValue, min: minValue};
	},
	/*adds colors to the gradient object*/
	_setBarGradient:function(ctx,x1,y1,x2,y2,type,color,axis){
		var gradient, offset, rgb, hsv, color0, stops;
		if(type == "light"){
			if(axis == "x")
				gradient = ctx.createLinearGradient(x1,y1,x2,y1);
			else
				gradient = ctx.createLinearGradient(x1,y1,x1,y2);
			stops = [[0,"#FFFFFF"],[0.9,color],[1,color]];
			offset = 2;
		}
		else if(type == "falling"||type == "rising"){
			if(axis == "x")
				gradient = ctx.createLinearGradient(x1,y1,x2,y1);
			else
				gradient = ctx.createLinearGradient(x1,y1,x1,y2);
			rgb = webix.color.toRgb(color);
			hsv = webix.color.rgbToHsv(rgb[0],rgb[1],rgb[2]);
			hsv[1] *= 1/2;
			color0 = "rgb("+webix.color.hsvToRgb(hsv[0],hsv[1],hsv[2])+")";
			if(type == "falling"){
				stops = [[0,color0],[0.7,color],[1,color]];
			}
			else if(type == "rising"){
				stops = [[0,color],[0.3,color],[1,color0]];
			}
			offset = 0;
		}
		else{
			ctx.globalAlpha = 0.37;
			offset = 0;
			if(axis == "x")
				gradient = ctx.createLinearGradient(x1,y2,x1,y1);
			else
				gradient = ctx.createLinearGradient(x1,y1,x2,y1);
			stops = [[0,"#9d9d9d"],[0.3,"#e8e8e8"],[0.45,"#ffffff"],[0.55,"#ffffff"],[0.7,"#e8e8e8"],[1,"#9d9d9d"]];
		}
		this._gradient(gradient,stops);
		return {gradient: gradient,offset: offset};
	},
	/**
	*   returns the x and y position
    *   @param: a - angle
    *   @param: x - start x position
    *   @param: y - start y position
	*   @param: r - destination to the point
	*/
     _getPositionByAngle:function(a,x,y,r){
         a *= (-1);
         x = x+Math.cos(a)*r;
         y = y-Math.sin(a)*r;
         return {x:x,y:y};
    },
	_gradient:function(gradient,stops){
		for(var i=0; i< stops.length; i++){
			gradient.addColorStop(stops[i][0],stops[i][1]);
		}
	},
	_path: function(ctx,points){
		var i, method;
		for(i = 0; i< points.length; i++){
			method = (i?"lineTo":"moveTo");
			if(points[i].length>2)
				method = "arc";
			ctx[method].apply(ctx,points[i]);
		}
	},
	_addMapRect:function(map,id,points,bounds,sIndex){
		map.addRect(id,[points[0].x-bounds.x,points[0].y-bounds.y,points[1].x-bounds.x,points[1].y-bounds.y],sIndex);
	}
}, webix.Group, webix.AutoTooltip, webix.DataLoader, webix.MouseEvents,  webix.EventSystem , webix.ui.view);


webix.extend(webix.ui.chart, {
	$render_pie:function(ctx,data,x,y,sIndex,map){
		this._renderPie(ctx,data,x,y,1,map,sIndex);
		
	},
	/**
	 *   renders a pie chart
	 *   @param: ctx - canvas object
	 *   @param: data - object those need to be displayed
	 *   @param: x - the width of the container
	 *   @param: y - the height of the container
	 *   @param: ky - value from 0 to 1 that defines an angle of inclination (0<ky<1 - 3D chart)
	 */
	_renderPie:function(ctx,data,point0,point1,ky,map,sIndex){
		if(!data.length)
			return;
		var coord = this._getPieParameters(point0,point1);
		/*pie radius*/
		var radius = (this._settings.radius?this._settings.radius:coord.radius);
		if(radius<0)
			return;

		/*real values*/
		var values = this._getValues(data);

		var totalValue = this._getTotalValue(values);

		/*weighed values (the ratio of object value to total value)*/
		var ratios = this._getRatios(values,totalValue);

		/*pie center*/
		var x0 = (this._settings.x?this._settings.x:coord.x);
		var y0 = (this._settings.y?this._settings.y:coord.y);
		/*adds shadow to the 2D pie*/
		if(ky==1&&this._settings.shadow)
			this._addShadow(ctx,x0,y0,radius);

		/*changes vertical position of the center according to 3Dpie cant*/
		y0 = y0/ky;
		/*the angle defines the 1st edge of the sector*/
		var alpha0 = -Math.PI/2;
		var angles = [];
		/*changes Canvas vertical scale*/
		ctx.scale(1,ky);
		/*adds radial gradient to a pie*/
		if (this._settings.gradient){
			var x1 = (ky!=1?x0+radius/3:x0);
			var y1 = (ky!=1?y0+radius/3:y0);
			this._showRadialGradient(ctx,x0,y0,radius,x1,y1);
		}
		for(var i = 0; i < data.length;i++){
			if (!values[i]) continue;
			/*drawing sector*/
			//ctx.lineWidth = 2;
			ctx.strokeStyle = this._settings.lineColor.call(this,data[i]);
			ctx.beginPath();
			ctx.moveTo(x0,y0);
			angles.push(alpha0);
			/*the angle defines the 2nd edge of the sector*/
			var alpha1 = -Math.PI/2+ratios[i]-0.0001;
			ctx.arc(x0,y0,radius,alpha0,alpha1,false);
			ctx.lineTo(x0,y0);

			var color = this._settings.color.call(this,data[i]);
			ctx.fillStyle = color;
			ctx.fill();

			/*text that needs being displayed inside the sector*/
			if(this._settings.pieInnerText)
				this._drawSectorLabel(x0,y0,5*radius/6,alpha0,alpha1,ky,this._settings.pieInnerText(data[i],totalValue),true);
			/*label outside the sector*/
			if(this._settings.label)
				this._drawSectorLabel(x0,y0,radius+this._settings.labelOffset,alpha0,alpha1,ky,this._settings.label(data[i]));
			/*drawing lower part for 3D pie*/
			if(ky!=1){
				this._createLowerSector(ctx,x0,y0,alpha0,alpha1,radius,true);
				ctx.fillStyle = "#000000";
				ctx.globalAlpha = 0.2;
				this._createLowerSector(ctx,x0,y0,alpha0,alpha1,radius,false);
				ctx.globalAlpha = 1;
				ctx.fillStyle = color;
			}
			/*creats map area (needed for events)*/
			map.addSector(data[i].id,alpha0,alpha1,x0-point0.x,y0-point0.y/ky,radius,ky,sIndex);

			alpha0 = alpha1;
		}
		/*renders radius lines and labels*/
		ctx.globalAlpha = 0.8;
		var p;
		for(i=0;i< angles.length;i++){
			p = this._getPositionByAngle(angles[i],x0,y0,radius);
			this._drawLine(ctx,x0,y0,p.x,p.y,this._settings.lineColor.call(this,data[i]),2);
		}
		if(ky==1){
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(x0,y0,radius+1,0,2*Math.PI,false);
			ctx.stroke();
		}
		ctx.globalAlpha =1;

		ctx.scale(1,1/ky);
	},
	/**
	 *   returns list of values
	 *   @param: data array
	 */
	_getValues:function(data){
		var v = [];
		for(var i = 0; i < data.length;i++)
			v.push(parseFloat(this._settings.value(data[i])||0));
		return v;
	},
	/**
	 *   returns total value
	 *   @param: the array of values
	 */
	_getTotalValue:function(values){
		var t=0;
		for(var i = 0; i < values.length;i++)
			t += values[i];
		return  t;
	},
	/**
	 *   gets angles for all values
	 *   @param: the array of values
	 *   @param: total value (optional)
	 */
	_getRatios:function(values,totalValue){
		var value;
		var ratios = [];
		var prevSum = 0;
		totalValue = totalValue||this._getTotalValue(values);
		for(var i = 0; i < values.length;i++){
			value = values[i];

			ratios[i] = Math.PI*2*(totalValue?((value+prevSum)/totalValue):(1/values.length));
			prevSum += value;
		}
		return ratios;
	},
	/**
	 *   returns calculated pie parameters: center position and radius
	 *   @param: x - the width of a container
	 *   @param: y - the height of a container
	 */
	_getPieParameters:function(point0,point1){
		/*var offsetX = 0;
		 var offsetY = 0;
		 if(this._settings.legend &&this._settings.legend.layout!="x")
		 offsetX = this._settings.legend.width*(this._settings.legend.align=="right"?-1:1);
		 var x0 = (x + offsetX)/2;
		 if(this._settings.legend &&this._settings.legend.layout=="x")
		 offsetY = this._settings.legend.height*(this._settings.legend.valign=="bottom"?-1:1);
		 var y0 = (y+offsetY)/2;*/
		var width = point1.x-point0.x;
		var height = point1.y-point0.y;
		var x0 = point0.x+width/2;
		var y0 = point0.y+height/2;
		var radius = Math.min(width/2,height/2);
		return {"x":x0,"y":y0,"radius":radius};
	},
	/**
	 *   creates lower part of sector in 3Dpie
	 *   @param: ctx - canvas object
	 *   @param: x0 - the horizontal position of the pie center
	 *   @param: y0 - the vertical position of the pie center
	 *   @param: a0 - the angle that defines the first edge of a sector
	 *   @param: a1 - the angle that defines the second edge of a sector
	 *   @param: R - pie radius
	 *   @param: line (boolean) - if the sector needs a border
	 */
	_createLowerSector:function(ctx,x0,y0,a1,a2,R,line){
		ctx.lineWidth = 1;
		/*checks if the lower sector needs being displayed*/
		if(!((a1<=0 && a2>=0)||(a1>=0 && a2<=Math.PI)||(Math.abs(a1-Math.PI)>0.003&&a1<=Math.PI && a2>=Math.PI))) return;

		if(a1<=0 && a2>=0){
			a1 = 0;
			line = false;
			this._drawSectorLine(ctx,x0,y0,R,a1,a2);
		}
		if(a1<=Math.PI && a2>=Math.PI){
			a2 = Math.PI;
			line = false;
			this._drawSectorLine(ctx,x0,y0,R,a1,a2);
		}
		/*the height of 3D pie*/
		var offset = (this._settings.pieHeight||Math.floor(R/4))/this._settings.cant;
		ctx.beginPath();
		ctx.arc(x0,y0,R,a1,a2,false);
		ctx.lineTo(x0+R*Math.cos(a2),y0+R*Math.sin(a2)+offset);
		ctx.arc(x0,y0+offset,R,a2,a1,true);
		ctx.lineTo(x0+R*Math.cos(a1),y0+R*Math.sin(a1));
		ctx.fill();
		if(line)
			ctx.stroke();
	},
	/**
	 *   draws a serctor arc
	 */
	_drawSectorLine:function(ctx,x0,y0,R,a1,a2){
		ctx.beginPath();
		ctx.arc(x0,y0,R,a1,a2,false);
		ctx.stroke();
	},
	/**
	 *   adds a shadow to pie
	 *   @param: ctx - canvas object
	 *   @param: x - the horizontal position of the pie center
	 *   @param: y - the vertical position of the pie center
	 *   @param: R - pie radius
	 */
	_addShadow:function(ctx,x,y,R){
		ctx.globalAlpha = 0.5;
		var shadows = ["#c4c4c4","#c6c6c6","#cacaca","#dcdcdc","#dddddd","#e0e0e0","#eeeeee","#f5f5f5","#f8f8f8"];
		for(var i = shadows.length-1;i>-1;i--){
			ctx.beginPath();
			ctx.fillStyle = shadows[i];
			ctx.arc(x+1,y+1,R+i,0,Math.PI*2,true);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	},
	/**
	 *   returns a gray gradient
	 *   @param: gradient - gradient object
	 */
	_getGrayGradient:function(gradient){
		gradient.addColorStop(0.0,"#ffffff");
		gradient.addColorStop(0.7,"#7a7a7a");
		gradient.addColorStop(1.0,"#000000");
		return gradient;
	},
	/**
	 *   adds gray radial gradient
	 *   @param: ctx - canvas object
	 *   @param: x - the horizontal position of the pie center
	 *   @param: y - the vertical position of the pie center
	 *   @param: radius - pie radius
	 *   @param: x0 - the horizontal position of a gradient center
	 *   @param: y0 - the vertical position of a gradient center
	 */
	_showRadialGradient:function(ctx,x,y,radius,x0,y0){
		//ctx.globalAlpha = 0.3;
		ctx.beginPath();
		var gradient;
		if(typeof this._settings.gradient!= "function"){
			gradient = ctx.createRadialGradient(x0,y0,radius/4,x,y,radius);
			gradient = this._getGrayGradient(gradient);
		}
		else gradient = this._settings.gradient(gradient);
		ctx.fillStyle = gradient;
		ctx.arc(x,y,radius,0,Math.PI*2,true);
		ctx.fill();
		//ctx.globalAlpha = 1;
		ctx.globalAlpha = 0.7;
	},
	/**
	 *   returns the calculates pie parameters: center position and radius
	 *   @param: ctx - canvas object
	 *   @param: x0 - the horizontal position of the pie center
	 *   @param: y0 - the vertical position of the pie center
	 *   @param: R - pie radius
	 *   @param: alpha1 - the angle that defines the 1st edge of a sector
	 *   @param: alpha2 - the angle that defines the 2nd edge of a sector
	 *   @param: ky - the value that defines an angle of inclination
	 *   @param: text - label text
	 *   @param: in_width (boolean) - if label needs being displayed inside a pie
	 */
	_drawSectorLabel:function(x0,y0,R,alpha1,alpha2,ky,text,in_width){
		var t = this.canvases[0].renderText(0,0,text,0,1);
		if (!t) return;

		//get existing width of text
		var labelWidth = t.scrollWidth;
		t.style.width = labelWidth+"px";	//adjust text label to fit all text
		if (labelWidth>x0) labelWidth = x0;	//the text can't be greater than half of view

		//calculate expected correction based on default font metrics
		var width = (alpha2-alpha1<0.2?4:8);
		if (in_width) width = labelWidth/1.8;
		var alpha = alpha1+(alpha2-alpha1)/2;

		//position and its correction
		R = R-(width-8)/2;
		var corr_x = - width;
		var corr_y = -8;
		var align = "right";

		//for items in left upper and lower sector
		if(alpha>=Math.PI/2 && alpha<Math.PI || alpha<=3*Math.PI/2 && alpha>=Math.PI){
			corr_x = -labelWidth-corr_x+1;/*correction for label width*/
			align = "left";
		}

		/*
		   calculate position of text
		   basically get point at center of pie sector
		*/
		var offset = 0;

		if(!in_width&&ky<1&&(alpha>0&&alpha<Math.PI))
			offset = (this._settings.height||Math.floor(R/4))/ky;

		var y = (y0+Math.floor((R+offset)*Math.sin(alpha)))*ky+corr_y;
		var x = x0+Math.floor((R+width/2)*Math.cos(alpha))+corr_x;

		/*
		   if pie sector starts in left of right part pie,
		   related text	must be placed to the left of to the right of pie as well
		*/
		var left_end = (alpha2 < Math.PI/2+0.01);
		var left_start = (alpha1 < Math.PI/2);
		if (left_start && left_end){
			x = Math.max(x,x0+3);	//right part of pie
			/*if(alpha2-alpha1<0.2)
				x = x0;*/
		}
		else if (!left_start && !left_end)
			x = Math.min(x,x0-labelWidth);	//left part of pie
		else if (!in_width&&(alpha>=Math.PI/2 && alpha<Math.PI || alpha<=3*Math.PI/2 && alpha>=Math.PI)){
			x += labelWidth/3;
		}


		//we need to set position of text manually, based on above calculations
		t.style.top  = y+"px";
		t.style.left = x+"px";
		t.style.width = labelWidth+"px";
		t.style.textAlign = align;
		t.style.whiteSpace = "nowrap";
	},
	$render_pie3D:function(ctx,data,x,y,sIndex,map){
		this._renderPie(ctx,data,x,y,this._settings.cant,map);
	},
	$render_donut:function(ctx,data,point0,point1,sIndex,map){
        if(!data.length)
			return;
		this._renderPie(ctx,data,point0,point1,1,map,sIndex);
        var config = this._settings;
		var coord = this._getPieParameters(point0,point1);
		var pieRadius = (config.radius?config.radius:coord.radius);
	    var innerRadius = ((config.innerRadius&&(config.innerRadius<pieRadius))?config.innerRadius:pieRadius/3);
        var x0 = (config.x?config.x:coord.x);
		var y0 = (config.y?config.y:coord.y);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
		ctx.arc(x0,y0,innerRadius,0,Math.PI*2,true);
		ctx.fill();
    }
});
		//+pie3d
webix.extend(webix.ui.chart, {
	/**
	*   renders a bar chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: x - the width of the container
	*   @param: y - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_bar:function(ctx, data, point0, point1, sIndex, map){
		var barWidth, cellWidth,
			i,
			limits, maxValue, minValue,
			relValue, valueFactor, relativeValues,
			startValue, unit,
			xax, yax,
			totalHeight = point1.y-point0.y;

		yax = !!this._settings.yAxis;
		xax = !!this._settings.xAxis;

		limits = this._getLimits();
		maxValue = limits.max;
		minValue = limits.min;

		/*an available width for one bar*/
		cellWidth = (point1.x-point0.x)/data.length;


		/*draws x and y scales*/
		if(!sIndex&&!(this._settings.origin!="auto"&&!yax)){
			this._drawScales(data,point0, point1,minValue,maxValue,cellWidth);
		}

		/*necessary for automatic scale*/
		if(yax){
			maxValue = parseFloat(this._settings.yAxis.end);
			minValue = parseFloat(this._settings.yAxis.start);
		}

		/*unit calculation (bar_height = value*unit)*/
		relativeValues = this._getRelativeValue(minValue,maxValue);
		relValue = relativeValues[0];
		valueFactor = relativeValues[1];

		unit = (relValue?totalHeight/relValue:relValue);

		if(!yax&&!(this._settings.origin!="auto"&&xax)){
			/*defines start value for better representation of small values*/
			startValue = 10;
			unit = (relValue?(totalHeight-startValue)/relValue:startValue);
		}
		/*if yAxis isn't set, but with custom origin */
		if(!sIndex&&(this._settings.origin!="auto"&&!yax)&&this._settings.origin>minValue){
			this._drawXAxis(ctx,data,point0,point1,cellWidth,point1.y-unit*(this._settings.origin-minValue));
		}

		/*a real bar width */
		barWidth = parseInt(this._settings.barWidth,10);
		var seriesNumber = 0;
		var seriesIndex = 0;
		for(i=0; i<this._series.length; i++ ){
			if(i == sIndex){
				seriesIndex  = seriesNumber;
			}
			if(this._series[i].type == "bar")
				seriesNumber++;
		}
		if(this._series&&(barWidth*seriesNumber+4)>cellWidth) barWidth = parseInt(cellWidth/seriesNumber-4,10);

		/*the half of distance between bars*/
		var barOffset = (cellWidth - barWidth*seriesNumber)/2;

		/*the radius of rounding in the top part of each bar*/
		var radius = (typeof this._settings.radius!="undefined"?parseInt(this._settings.radius,10):Math.round(barWidth/5));

		var inner_gradient = false;
		var gradient = this._settings.gradient;

		if(gradient && typeof(gradient) != "function"){
			inner_gradient = gradient;
			gradient = false;
		} else if (gradient){
			gradient = ctx.createLinearGradient(0,point1.y,0,point0.y);
			this._settings.gradient(gradient);
		}
		/*draws a black line if the horizontal scale isn't defined*/
		if(!xax){
			this._drawLine(ctx,point0.x,point1.y+0.5,point1.x,point1.y+0.5,"#000000",1); //hardcoded color!
		}

		for(i=0; i < data.length;i ++){

			var value =  parseFloat(this._settings.value(data[i])||0);
			if(this._logScaleCalc)
				value = this._log10(value);

			if(isNaN(value))
				continue;
			if(value>maxValue) value = maxValue;
			value -= minValue;
			value *= valueFactor;

			/*start point (bottom left)*/
			var x0 = point0.x + barOffset + i*cellWidth+(barWidth+1)*seriesIndex;
			var y0 = point1.y;

			if(value<0||(this._settings.yAxis&&value===0&&!(this._settings.origin!="auto"&&this._settings.origin>minValue))){
				this.canvases[sIndex].renderTextAt(true, true, x0+Math.floor(barWidth/2),y0,this._settings.label(data[i]));
				continue;
			}

			/*takes start value into consideration*/
			if(!yax&&!(this._settings.origin!="auto"&&xax)) value += startValue/unit;

			var color = gradient||this._settings.color.call(this,data[i]);


			/*drawing bar body*/
			ctx.globalAlpha = this._settings.alpha.call(this,data[i]);
			var points = this._drawBar(ctx,point0,x0,y0,barWidth,minValue,radius,unit,value,color,gradient,inner_gradient);
			if (inner_gradient){
				this._drawBarGradient(ctx,x0,y0,barWidth,minValue,radius,unit,value,color,inner_gradient);
			}
			/*drawing the gradient border of a bar*/
			if(this._settings.border)
				this._drawBarBorder(ctx,x0,y0,barWidth,minValue,radius,unit,value,color);

			ctx.globalAlpha = 1;

			/*sets a bar label*/
			if(points[0]!=x0)
				this.canvases[sIndex].renderTextAt(false, true, x0+Math.floor(barWidth/2),points[1],this._settings.label(data[i]));
			else
				this.canvases[sIndex].renderTextAt(true, true, x0+Math.floor(barWidth/2),points[3],this._settings.label(data[i]));
			/*defines a map area for a bar*/
			map.addRect(data[i].id,[x0-point0.x,points[3]-point0.y,points[2]-point0.x,points[1]-point0.y],sIndex);
			//this._addMapRect(map,data[i].id,[{x:x0,y:points[3]},{x:points[2],y:points[1]}],point0,sIndex);
		}
	},
	_correctBarParams:function(ctx,x,y,value,unit,barWidth,minValue){
		var xax = this._settings.xAxis;
		var axisStart = y;
		if(!!xax&&this._settings.origin!="auto" && (this._settings.origin>minValue)){
			y -= (this._settings.origin-minValue)*unit;
			axisStart = y;
			value = value-(this._settings.origin-minValue);
			if(value < 0){
				value *= (-1);
				ctx.translate(x+barWidth,y);
				ctx.rotate(Math.PI);
				x = 0;
				y = 0;
			}
			y -= 0.5;
		}

		return {value:value,x0:x,y0:y,start:axisStart};
	},
	_drawBar:function(ctx,point0,x0,y0,barWidth,minValue,radius,unit,value,color,gradient,inner_gradient){
		ctx.save();
		ctx.fillStyle = color;
		var p = this._correctBarParams(ctx,x0,y0,value,unit,barWidth,minValue);
		var points = this._setBarPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,(this._settings.border?1:0));
		if (gradient&&!inner_gradient) ctx.lineTo(p.x0+(this._settings.border?1:0),point0.y); //fix gradient sphreading
		ctx.fill();
		ctx.restore();
		var x1 = p.x0;
		var x2 = (p.x0!=x0?x0+points[0]:points[0]);
		var y1 = (p.x0!=x0?(p.start-points[1]-p.y0):p.y0);
		var y2 = (p.x0!=x0?p.start-p.y0:points[1]);

		return [x1,y1,x2,y2];
	},
	_setBorderStyles:function(ctx,color){
		var hsv,rgb;
		rgb = webix.color.toRgb(color);
		hsv = webix.color.rgbToHsv(rgb[0],rgb[1],rgb[2]);
		hsv[2] /= 1.4;
		color = "rgb("+webix.color.hsvToRgb(hsv[0],hsv[1],hsv[2])+")";
		ctx.strokeStyle = color;
		if(ctx.globalAlpha==1)
			ctx.globalAlpha = 0.9;
	},
	_drawBarBorder:function(ctx,x0,y0,barWidth,minValue,radius,unit,value,color){
		var p;
		ctx.save();
		p = this._correctBarParams(ctx,x0,y0,value,unit,barWidth,minValue);
		this._setBorderStyles(ctx,color);
		this._setBarPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,ctx.lineWidth/2,1);
		ctx.stroke();
		/*ctx.fillStyle = color;
		 this._setBarPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,0);
		 ctx.lineTo(p.x0,0);
		 ctx.fill()


		 ctx.fillStyle = "#000000";
		 ctx.globalAlpha = 0.37;

		 this._setBarPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,0);
		 ctx.fill()
		 */
		ctx.restore();
	},
	_drawBarGradient:function(ctx,x0,y0,barWidth,minValue,radius,unit,value,color,inner_gradient){
		ctx.save();
		var p = this._correctBarParams(ctx,x0,y0,value,unit,barWidth,minValue);
		var gradParam = this._setBarGradient(ctx,p.x0,p.y0,p.x0+barWidth,p.y0-unit*p.value+2,inner_gradient,color,"y");
		var borderOffset = this._settings.border?1:0;
		ctx.fillStyle = gradParam.gradient;
		this._setBarPoints(ctx,p.x0+gradParam.offset,p.y0,barWidth-gradParam.offset*2,radius,unit,p.value,gradParam.offset+borderOffset);
		ctx.fill();
		ctx.restore();
	},
	/**
	 *   sets points for bar and returns the position of the bottom right point
	 *   @param: ctx - canvas object
	 *   @param: x0 - the x position of start point
	 *   @param: y0 - the y position of start point
	 *   @param: barWidth - bar width
	 *   @param: radius - the rounding radius of the top
	 *   @param: unit - the value defines the correspondence between item value and bar height
	 *   @param: value - item value
	 *   @param: offset - the offset from expected bar edge (necessary for drawing border)
	 */
	_setBarPoints:function(ctx,x0,y0,barWidth,radius,unit,value,offset,skipBottom){
		/*correction for displaing small values (when rounding radius is bigger than bar height)*/
		ctx.beginPath();
		//y0 = 0.5;
		var angle_corr = 0;
		if(radius>unit*value){
			var cosA = (radius-unit*value)/radius;
			if(cosA<=1&&cosA>=-1)
				angle_corr = -Math.acos(cosA)+Math.PI/2;
		}
		/*start*/
		ctx.moveTo(x0+offset,y0);
		/*start of left rounding*/
		var y1 = y0 - Math.floor(unit*value) + radius + (radius?0:offset);
		if(radius<unit*value)
			ctx.lineTo(x0+offset,y1);
		/*left rounding*/
		var x2 = x0 + radius;
		if (radius&&radius>0)
			ctx.arc(x2,y1,radius-offset,-Math.PI+angle_corr,-Math.PI/2,false);
		/*start of right rounding*/
		var x3 = x0 + barWidth - radius - offset;
		var y3 = y1 - radius + (radius?offset:0);
		ctx.lineTo(x3,y3);
		/*right rounding*/
		if (radius&&radius>0)
			ctx.arc(x3+offset,y1,radius-offset,-Math.PI/2,0-angle_corr,false);
		/*bottom right point*/
		var x5 = x0 + barWidth-offset;
		ctx.lineTo(x5,y0);
		/*line to the start point*/
		if(!skipBottom){
			ctx.lineTo(x0+offset,y0);
		}
		//	ctx.lineTo(x0,0); //IE fix!
		return [x5,y3];
	}
});	
webix.extend(webix.ui.chart, {
	/**
	*   renders a graphic
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: width - the width of the container
	*   @param: height - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_line:function(ctx, data, point0, point1, sIndex, map){
		var config,i,items,params,x0,x1,x2,y1,y2,y0,res1,res2;
		params = this._calculateLineParams(ctx,data,point0,point1,sIndex);
		config = this._settings;
		if (data.length) {
			x0 = (config.offset?point0.x+params.cellWidth*0.5:point0.x);
			//finds items with data (excludes scale units)
			items= [];
			for(i=0; i < data.length;i++){
				res2 = this._getPointY(data[i],point0,point1,params);
				if(res2){
					x2 = ((!i)?x0:params.cellWidth*i - 0.5 + x0);
					y2 = (typeof res2 == "object"?res2.y0:res2);
					if(i && this._settings.fixOverflow){
						res1 = this._getPointY(data[i-1],point0,point1,params);
						if(res1.out && res1.out == res2.out){
							continue;
						}
						x1 = params.cellWidth*(i-1) - 0.5 + x0;
						y1 = (typeof res1 == "object"?res1.y0:res1);

						if(res1.out){
							y0 = (res1.out == "min"?point1.y:point0.y);
							items.push({x:this._calcOverflowX(x1,x2,y1,y2,y0),y:y0});
						}
						if(res2.out){
							y0 = (res2.out == "min"?point1.y:point0.y);
							items.push({x:this._calcOverflowX(x1,x2,y1,y2,y0),y:y0});
						}

					}
					if(!res2.out)
						items.push({x:x2, y: res2, index: i});
				}
			}

			this._mapStart = point0;
			for(i = 1; i <= items.length; i++){
				//line start position
				x1 = items[i-1].x;
				y1 = items[i-1].y;
				if(i<items.length){
					//line end position
					x2 = items[i].x;
					y2 = items[i].y;
					//line
					this._drawLine(ctx,x1,y1,x2,y2,config.line.color.call(this,data[i-1]),config.line.width);
					//line shadow
					if(config.line&&config.line.shadow){
						ctx.globalAlpha = 0.3;
						this._drawLine(ctx,x1+2,y1+config.line.width+8,x2+2,y2+config.line.width+8,"#eeeeee",config.line.width+3);
						ctx.globalAlpha = 1;
					}
				}
				//item
				if(typeof items[i-1].index != "undefined")
					this._drawItem(ctx,x1,y1,data[items[i-1].index],config.label(data[items[i-1].index]), sIndex, map, point0);
			}

		}
	},
	_calcOverflowX: function(x1,x2,y1,y2,y){
		return  x1 + ( y - y1 )*( x2 - x1 )/( y2 - y1 );
	},
	/**
	*   draws an item and its label
	*   @param: ctx - canvas object
	*   @param: x0 - the x position of a circle
	*   @param: y0 - the y position of a circle
	*   @param: obj - data object
	*   @param: label - (boolean) defines wherether label needs being drawn
	*/
	_drawItem:function(ctx,x0,y0,obj,label,sIndex,map){
		var config = this._settings.item;

		var R = parseInt(config.radius.call(this,obj),10)||0;
		var mapStart = this._mapStart;
		if(R){
			ctx.save();
			if(config.shadow){
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#bdbdbd";
				ctx.fillStyle = "#bdbdbd";
				var alphas = [0.1,0.2,0.3];
				for(var i=(alphas.length-1);i>=0;i--){
					ctx.globalAlpha = alphas[i];
					ctx.strokeStyle = "#d0d0d0";
					ctx.beginPath();
					this._strokeChartItem(ctx,x0,y0+2*R/3,R+i+1,config.type);
					ctx.stroke();
				}
				ctx.beginPath();
				ctx.globalAlpha = 0.3;
				ctx.fillStyle = "#bdbdbd";
				this._strokeChartItem(ctx,x0,y0+2*R/3,R+1,config.type);
				ctx.fill();
			}
			ctx.restore();
			ctx.lineWidth = config.borderWidth;
			ctx.fillStyle = config.color.call(this,obj);
			ctx.strokeStyle = config.borderColor.call(this,obj);
			ctx.globalAlpha = config.alpha.call(this,obj);
			ctx.beginPath();
			this._strokeChartItem(ctx,x0,y0,R+1,config.type);
			ctx.fill();
			ctx.stroke();
			ctx.globalAlpha = 1;
		}
		/*item label*/
		if(label){
			this.canvases[sIndex].renderTextAt(false, true, x0,y0-R-this._settings.labelOffset,this._settings.label.call(this,obj));
		}
		if(map){
			var areaPos = (this._settings.eventRadius||R+1);
			//this._addMapRect(map,obj.id,[{x:x0-areaPos,y:y0-areaPos},{x0+areaPos,y:y0+areaPos}],point0,sIndex);
			map.addRect(obj.id,[x0-areaPos-mapStart.x,y0-areaPos-mapStart.y,x0+areaPos-mapStart.x,y0+areaPos-mapStart.y],sIndex);
		}

	},
	_strokeChartItem:function(ctx,x0,y0,R,type){
		var p=[];
		if(type && (type=="square" || type=="s")){
			R *= Math.sqrt(2)/2;
			p = [
				[x0-R-ctx.lineWidth/2,y0-R],
				[x0+R,y0-R],
				[x0+R,y0+R],
				[x0-R,y0+R],
				[x0-R,y0-R]
			];
		}
		else if(type && (type=="diamond" || type=="d")){
			var corr = (ctx.lineWidth>1?ctx.lineWidth*Math.sqrt(2)/4:0);
			p = [
				[x0,y0-R],
				[x0+R,y0],
				[x0,y0+R],
				[x0-R,y0],
				[x0+corr,y0-R-corr]
			];
		}
		else if(type && (type=="triangle" || type=="t")){
			p = [
				[x0,y0-R],
				[x0+Math.sqrt(3)*R/2,y0+R/2],
				[x0-Math.sqrt(3)*R/2,y0+R/2],
				[x0,y0-R]
			];
		}
		else
			p = [
				[x0,y0,R,0,Math.PI*2,true]
			];
		this._path(ctx,p);
	},
	/**
	*   gets the vertical position of the item
	*   @param: data - data object
	*   @param: y0 - the y position of chart start
	*   @param: y1 - the y position of chart end
	*   @param: params - the object with elements: minValue, maxValue, unit, valueFactor (the value multiple of 10)
	*/
	_getPointY: function(data,point0,point1,params){
		var minValue = params.minValue;
		var maxValue = params.maxValue;
		var unit = params.unit;
		var valueFactor = params.valueFactor;
		/*the real value of an object*/
		var value = this._settings.value(data);
		if(this._logScaleCalc){
			value = this._log10(value);
		}
		/*a relative value*/
		var v = (parseFloat(value||0) - minValue)*valueFactor;
		if(!this._settings.yAxis)
			v += params.startValue/unit;
		/*a vertical coordinate*/
		var y = point1.y - unit*v;
		/*the limit of the max and min values*/
		if(this._settings.fixOverflow && ( this._settings.type == "line" || this._settings.type == "area")){
			if(value > maxValue)
				y = {y: point0.y, y0:  y, out: "max"};
			else if(v<0 || value < minValue)
				y = {y: point1.y, y0:  y, out: "min"};
		}
		else{
			if(value > maxValue)
				y =  point0.y;
			if(v<0 || value < minValue)
				y =  point1.y;
		}
		return y;
	},
	_calculateLineParams: function(ctx,data,point0,point1,sIndex){
		var params = {};

		/*maxValue - minValue*/
		var relValue;

		/*available height*/
		params.totalHeight = point1.y-point0.y;

		/*a space available for a single item*/
		//params.cellWidth = Math.round((point1.x-point0.x)/((!this._settings.offset&&this._settings.yAxis)?(data.length-1):data.length));
		params.cellWidth =(point1.x-point0.x)/((!this._settings.offset)?(data.length-1):data.length);
		/*scales*/
		var yax = !!this._settings.yAxis;

		var limits = (this._settings.type.indexOf("stacked")!=-1?this._getStackedLimits(data):this._getLimits());
		params.maxValue = limits.max;
		params.minValue = limits.min;

		/*draws x and y scales*/
		if(!sIndex)
			this._drawScales(data, point0, point1,params.minValue,params.maxValue,params.cellWidth);

		/*necessary for automatic scale*/
		if(yax){
		    params.maxValue = parseFloat(this._settings.yAxis.end);
			params.minValue = parseFloat(this._settings.yAxis.start);
		}

		/*unit calculation (y_position = value*unit)*/
		var relativeValues = this._getRelativeValue(params.minValue,params.maxValue);
		relValue = relativeValues[0];
		params.valueFactor = relativeValues[1];
		params.unit = (relValue?params.totalHeight/relValue:10);

		params.startValue = 0;
		if(!yax){
			/*defines start value for better representation of small values*/
			params.startValue = 10;
			if(params.unit!=params.totalHeight)
				params.unit = (relValue?(params.totalHeight - params.startValue)/relValue:10);
		}
		return params;
	}
});


webix.extend(webix.ui.chart, {
	/**
	*   renders a bar chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: x - the width of the container
	*   @param: y - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_barH:function(ctx, data, point0, point1, sIndex, map){
		var barOffset, barWidth, cellWidth, color, gradient, i, limits, maxValue, minValue,
			innerGradient, valueFactor, relValue, radius, relativeValues,
			startValue, totalWidth,value,  unit, x0, y0, yax;

		/*an available width for one bar*/
		cellWidth = (point1.y-point0.y)/data.length;

		limits = this._getLimits("h");

		maxValue = limits.max;
		minValue = limits.min;

		totalWidth = point1.x-point0.x;

		yax = !!this._settings.yAxis;

		/*draws x and y scales*/
		if(!sIndex)
			this._drawHScales(ctx,data,point0, point1,minValue,maxValue,cellWidth);

		/*necessary for automatic scale*/
		if(yax){
			maxValue = parseFloat(this._settings.xAxis.end);
			minValue = parseFloat(this._settings.xAxis.start);
		}

		/*unit calculation (bar_height = value*unit)*/
		relativeValues = this._getRelativeValue(minValue,maxValue);
		relValue = relativeValues[0];
		valueFactor = relativeValues[1];

		unit = (relValue?totalWidth/relValue:10);
		if(!yax){
			/*defines start value for better representation of small values*/
			startValue = 10;
			unit = (relValue?(totalWidth-startValue)/relValue:10);
		}


		/*a real bar width */
		barWidth = parseInt(this._settings.barWidth,10);
		if((barWidth*this._series.length+4)>cellWidth) barWidth = cellWidth/this._series.length-4;
		/*the half of distance between bars*/
		barOffset = Math.floor((cellWidth - barWidth*this._series.length)/2);
		/*the radius of rounding in the top part of each bar*/
		radius = (typeof this._settings.radius!="undefined"?parseInt(this._settings.radius,10):Math.round(barWidth/5));

		innerGradient = false;
		gradient = this._settings.gradient;

		if (gradient&&typeof(gradient) != "function"){
			innerGradient = gradient;
			gradient = false;
		} else if (gradient){
			gradient = ctx.createLinearGradient(point0.x,point0.y,point1.x,point0.y);
			this._settings.gradient(gradient);
		}
		/*draws a black line if the horizontal scale isn't defined*/
		if(!yax){
			this._drawLine(ctx,point0.x-0.5,point0.y,point0.x-0.5,point1.y,"#000000",1); //hardcoded color!
		}



		for(i=0; i < data.length;i ++){


			value =  parseFloat(this._settings.value(data[i]||0));
			if(this._logScaleCalc)
				value = this._log10(value);

			if(value>maxValue) value = maxValue;
			value -= minValue;
			value *= valueFactor;

			/*start point (bottom left)*/
			x0 = point0.x;
			y0 = point0.y+ barOffset + i*cellWidth+(barWidth+1)*sIndex;

			if((value<0&&this._settings.origin=="auto")||(this._settings.xAxis&&value===0&&!(this._settings.origin!="auto"&&this._settings.origin>minValue))){
				this.canvases[sIndex].renderTextAt("middle", "right", x0+10,y0+barWidth/2+barOffset,this._settings.label(data[i]));
				continue;
			}
			if(value<0&&this._settings.origin!="auto"&&this._settings.origin>minValue){
				value = 0;
			}

			/*takes start value into consideration*/
			if(!yax) value += startValue/unit;
			color = gradient||this._settings.color.call(this,data[i]);

			/*drawing the gradient border of a bar*/
			if(this._settings.border){
				this._drawBarHBorder(ctx,x0,y0,barWidth,minValue,radius,unit,value,color);
			}

			/*drawing bar body*/
			ctx.globalAlpha = this._settings.alpha.call(this,data[i]);
			var points = this._drawBarH(ctx,point1,x0,y0,barWidth,minValue,radius,unit,value,color,gradient,innerGradient);
			if (innerGradient){
				this._drawBarHGradient(ctx,x0,y0,barWidth,minValue,radius,unit,value,color,innerGradient);

			}
			ctx.globalAlpha = 1;


			/*sets a bar label and map area*/

			if(points[3]==y0){
				this.canvases[sIndex].renderTextAt("middle", "left", points[0]-5,points[3]+Math.floor(barWidth/2),this._settings.label(data[i]));
				map.addRect(data[i].id,[points[0]-point0.x,points[3]-point0.y,points[2]-point0.x,points[3]+barWidth-point0.y],sIndex);

			}else{
				this.canvases[sIndex].renderTextAt("middle", false, points[2]+5,points[1]+Math.floor(barWidth/2),this._settings.label(data[i]));
				map.addRect(data[i].id,[points[0]-point0.x,y0-point0.y,points[2]-point0.x,points[3]-point0.y],sIndex);
			}

		}
	},
	/**
	 *   sets points for bar and returns the position of the bottom right point
	 *   @param: ctx - canvas object
	 *   @param: x0 - the x position of start point
	 *   @param: y0 - the y position of start point
	 *   @param: barWidth - bar width
	 *   @param: radius - the rounding radius of the top
	 *   @param: unit - the value defines the correspondence between item value and bar height
	 *   @param: value - item value
	 *   @param: offset - the offset from expected bar edge (necessary for drawing border)
	 */
	_setBarHPoints:function(ctx,x0,y0,barWidth,radius,unit,value,offset,skipLeft){
		/*correction for displaing small values (when rounding radius is bigger than bar height)*/
		var angle_corr = 0;
		if(radius>unit*value){
			var sinA = (radius-unit*value)/radius;
			angle_corr = -Math.asin(sinA)+Math.PI/2;
		}
		/*start*/
		ctx.moveTo(x0,y0+offset);
		/*start of left rounding*/
		var x1 = x0 + unit*value - radius - (radius?0:offset);
		if(radius<unit*value)
			ctx.lineTo(x1,y0+offset);
		/*left rounding*/
		var y2 = y0 + radius;
		if (radius&&radius>0)
			ctx.arc(x1,y2,radius-offset,-Math.PI/2+angle_corr,0,false);
		/*start of right rounding*/
		var y3 = y0 + barWidth - radius - (radius?0:offset);
		var x3 = x1 + radius - (radius?offset:0);
		ctx.lineTo(x3,y3);
		/*right rounding*/
		if (radius&&radius>0)
			ctx.arc(x1,y3,radius-offset,0,Math.PI/2-angle_corr,false);
		/*bottom right point*/
		var y5 = y0 + barWidth-offset;
		ctx.lineTo(x0,y5);
		/*line to the start point*/
		if(!skipLeft){
			ctx.lineTo(x0,y0+offset);
		}
		//	ctx.lineTo(x0,0); //IE fix!
		return [x3,y5];
	},
	_drawHScales:function(ctx,data,point0,point1,start,end,cellWidth){
		var x = 0;
		if(this._settings.xAxis){
			if(!this.canvases["x"])
				this.canvases["x"] =  this._createCanvas("axis_x");
			x = this._drawHXAxis(this.canvases["x"].getCanvas(),data,point0,point1,start,end);
		}
		if (this._settings.yAxis){
			if(!this.canvases["y"])
				this.canvases["y"] =  this._createCanvas("axis_y");
			this._drawHYAxis(this.canvases["y"].getCanvas(),data,point0,point1,cellWidth,x);
		}
	},
	_drawHYAxis:function(ctx,data,point0,point1,cellWidth,yAxisX){
		if (!this._settings.yAxis) return;
		var unitPos;
		var x0 = parseInt((yAxisX?yAxisX:point0.x),10)-0.5;
		var y0 = point1.y+0.5;
		var y1 = point0.y;
		this._drawLine(ctx,x0,y0,x0,y1,this._settings.yAxis.color,1);



		for(var i=0; i < data.length;i ++){

			/*scale labels*/
			var right = ((this._settings.origin!="auto")&&(this._settings.type=="barH")&&(parseFloat(this._settings.value(data[i]))<this._settings.origin));
			unitPos = y1+cellWidth/2+i*cellWidth;
			this.canvases["y"].renderTextAt("middle",(right?false:"left"),(right?x0+5:x0-5),unitPos,
				this._settings.yAxis.template(data[i]),
				"webix_axis_item_y",(right?0:x0-10)
			);
			if(this._settings.yAxis.lines.call(this,data[i]))
				this._drawLine(ctx,point0.x,unitPos,point1.x,unitPos,this._settings.yAxis.lineColor.call(this,data[i]),1);
		}
		this._drawLine(ctx,point0.x+0.5,y1+0.5,point1.x,y1+0.5,this._settings.yAxis.lineColor.call(this,{}),1);
		this._setYAxisTitle(point0,point1);
	},
	_drawHXAxis:function(ctx,data,point0,point1,start,end){
		var step;
		var scaleParam= {};
		var axis = this._settings.xAxis;
		if (!axis) return;

		var y0 = point1.y+0.5;
		var x0 = point0.x-0.5;
		var x1 = point1.x-0.5;
		var yAxisStart = point0.x;
		this._drawLine(ctx,x0,y0,x1,y0,axis.color,1);

		if(axis.step)
			step = parseFloat(axis.step);

		if(typeof this._configXAxis.step =="undefined"||typeof this._configXAxis.start=="undefined"||typeof this._configXAxis.end =="undefined"){
			scaleParam = this._calculateScale(start,end);
			start = scaleParam.start;
			end = scaleParam.end;
			step = scaleParam.step;
			this._settings.xAxis.end = end;
			this._settings.xAxis.start = start;
			this._settings.xAxis.step = step;
		}

		if(step===0) return;
		var stepHeight = (x1-x0)*step/(end-start);
		var c = 0;
		for(var i = start; i<=end; i += step){
			var value = this._logScaleCalc?Math.pow(10,i):i;
			if(scaleParam.fixNum)  value = parseFloat(value).toFixed(scaleParam.fixNum);
			var xi = Math.floor(x0+c*stepHeight)+ 0.5;/*canvas line fix*/

			if(!(i==start&&this._settings.origin=="auto") &&axis.lines.call(this,i))
				this._drawLine(ctx,xi,y0,xi,point0.y,this._settings.xAxis.lineColor.call(this,i),1);
			if(i == this._settings.origin) yAxisStart = xi+1;
			/*correction for JS float calculation*/
			if(step<1 && !this._logScaleCalc){
				var power = Math.min(Math.floor(this._log10(step)),(start<=0?0:Math.floor(this._log10(start))));
				var corr = Math.pow(10,-power);
				value = Math.round(value*corr)/corr;
				i = value;
			}
			this.canvases["x"].renderTextAt(false, true,xi,y0+2,axis.template(value.toString()),"webix_axis_item_x");
			c++;
		}
		this.canvases["x"].renderTextAt(true, false, x0,point1.y+this._settings.padding.bottom-3,
			this._settings.xAxis.title,
			"webix_axis_title_x",
			point1.x - point0.x
		);
		/*the right border in lines in scale are enabled*/
		if (!axis.lines.call(this,{})){
			this._drawLine(ctx,x0,point0.y-0.5,x1,point0.y-0.5,this._settings.xAxis.color,0.2);
		}
		return yAxisStart;
	},
	_correctBarHParams:function(ctx,x,y,value,unit,barWidth,minValue){
		var yax = this._settings.yAxis;
		var axisStart = x;
		if(!!yax&&this._settings.origin!="auto" && (this._settings.origin>minValue)){
			x += (this._settings.origin-minValue)*unit;
			axisStart = x;
			value = value-(this._settings.origin-minValue);
			if(value < 0){
				value *= (-1);
				ctx.translate(x,y+barWidth);
				ctx.rotate(Math.PI);
				x = 0.5;
				y = 0;
			}
			x += 0.5;
		}

		return {value:value,x0:x,y0:y,start:axisStart};
	},
	_drawBarH:function(ctx,point1,x0,y0,barWidth,minValue,radius,unit,value,color,gradient,inner_gradient){
		ctx.save();
		var p = this._correctBarHParams(ctx,x0,y0,value,unit,barWidth,minValue);
		ctx.fillStyle = color;
		ctx.beginPath();
		var points = this._setBarHPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,(this._settings.border?1:0));
		if (gradient&&!inner_gradient) ctx.lineTo(point1.x,p.y0+(this._settings.border?1:0)); //fix gradient sphreading
		ctx.fill();
		ctx.restore();
		var y1 = p.y0;
		var y2 = (p.y0!=y0?y0:points[1]);
		var x1 = (p.y0!=y0?(p.start-points[0]):p.start);
		var x2 = (p.y0!=y0?p.start:points[0]);

		return [x1,y1,x2,y2];
	},
	_drawBarHBorder:function(ctx,x0,y0,barWidth,minValue,radius,unit,value,color){
		ctx.save();
		var p = this._correctBarHParams(ctx,x0,y0,value,unit,barWidth,minValue);

		ctx.beginPath();
		this._setBorderStyles(ctx,color);
		ctx.globalAlpha =0.9;
		this._setBarHPoints(ctx,p.x0,p.y0,barWidth,radius,unit,p.value,ctx.lineWidth/2,1);

		ctx.stroke();
		ctx.restore();
	},
	_drawBarHGradient:function(ctx,x0,y0,barWidth,minValue,radius,unit,value,color,inner_gradient){
		ctx.save();
		//y0 -= (webix.env.isIE?0:0.5);
		var p = this._correctBarHParams(ctx,x0,y0,value,unit,barWidth,minValue);
		var gradParam = this._setBarGradient(ctx,p.x0,p.y0+barWidth,p.x0+unit*p.value,p.y0,inner_gradient,color,"x");
		ctx.fillStyle = gradParam.gradient;
		ctx.beginPath();
		this._setBarHPoints(ctx,p.x0,p.y0+gradParam.offset,barWidth-gradParam.offset*2,radius,unit,p.value,gradParam.offset);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.restore();
	}
});
		
webix.extend(webix.ui.chart, {
	/**
	*   renders a bar chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: x - the width of the container
	*   @param: y - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_stackedBar:function(ctx, data, point0, point1, sIndex, map){
		var maxValue,minValue;
		/*necessary if maxValue - minValue < 0*/
		var valueFactor;
		/*maxValue - minValue*/
		var relValue;

		var total_height = point1.y-point0.y;

		var yax = !!this._settings.yAxis;
		var xax = !!this._settings.xAxis;

		var limits = this._getStackedLimits(data);
		maxValue = limits.max;
		minValue = limits.min;

		/*an available width for one bar*/
		var cellWidth = Math.floor((point1.x-point0.x)/data.length);

		/*draws x and y scales*/
		if(!sIndex)
			this._drawScales(data,point0, point1,minValue,maxValue,cellWidth);

		/*necessary for automatic scale*/
		if(yax){
			maxValue = parseFloat(this._settings.yAxis.end);
			minValue = parseFloat(this._settings.yAxis.start);
		}

		/*unit calculation (bar_height = value*unit)*/
		var relativeValues = this._getRelativeValue(minValue,maxValue);
		relValue = relativeValues[0];
		valueFactor = relativeValues[1];

		var unit = (relValue?total_height/relValue:10);

		/*a real bar width */
		var barWidth = parseInt(this._settings.barWidth,10);
		if(barWidth+4 > cellWidth) barWidth = cellWidth-4;
		/*the half of distance between bars*/
		var barOffset = Math.floor((cellWidth - barWidth)/2);


		var inner_gradient = (this._settings.gradient?this._settings.gradient:false);

		/*draws a black line if the horizontal scale isn't defined*/
		if(!xax){
			//scaleY = y-bottomPadding;
			this._drawLine(ctx,point0.x,point1.y+0.5,point1.x,point1.y+0.5,"#000000",1); //hardcoded color!
		}

		for(var i=0; i < data.length;i ++){
			var value =  parseFloat(this._settings.value(data[i]||0));
			if(this._logScaleCalc)
				value = this._log10(value);

			if(!value){
				if(!sIndex||!data[i].$startY)
					data[i].$startY = point1.y;
				continue;
			}
			/*adjusts the first tab to the scale*/
			if(!sIndex)
				value -= minValue;

			value *= valueFactor;

			/*start point (bottom left)*/
			var x0 = point0.x + barOffset + i*cellWidth;
			var y0 = point1.y;
			if(!sIndex)
				data[i].$startY = y0;
			else
				y0 = data[i].$startY;

			/*the max height limit*/
			if(y0 < (point0.y+1)) continue;

			if(value<0||(this._settings.yAxis&&value===0)){
				this.canvases["y"].renderTextAt(true, true, x0+Math.floor(barWidth/2),y0,this._settings.label(data[i]));
				continue;
			}

			var color = this._settings.color.call(this,data[i]);



			/*drawing bar body*/
			ctx.globalAlpha = this._settings.alpha.call(this,data[i]);
			ctx.fillStyle = this._settings.color.call(this,data[i]);
			ctx.beginPath();
			var points = this._setStakedBarPoints(ctx,x0-(this._settings.border?0.5:0),y0,barWidth+(this._settings.border?0.5:0),unit,value,0,point0.y);
			ctx.fill();

			/*gradient*/
			if (inner_gradient){
				ctx.save();
				var gradParam = this._setBarGradient(ctx,x0,y0,x0+barWidth,points[1],inner_gradient,color,"y");
				ctx.fillStyle = gradParam.gradient;
				ctx.beginPath();
				points = this._setStakedBarPoints(ctx,x0+gradParam.offset,y0,barWidth-gradParam.offset*2,unit,value,(this._settings.border?1:0),point0.y);
				ctx.fill();
				ctx.restore();
			}
			/*drawing the gradient border of a bar*/
			if(this._settings.border){
				ctx.save();
				this._setBorderStyles(ctx,color);
				ctx.beginPath();

				this._setStakedBarPoints(ctx,x0-0.5,y0,barWidth+1,unit,value,0,point0.y,1);
				ctx.stroke();
				ctx.restore();
			}
			ctx.globalAlpha = 1;

			/*sets a bar label*/
			this.canvases[sIndex].renderTextAt(false, true, x0+Math.floor(barWidth/2),(points[1]+(y0-points[1])/2)-7,this._settings.label(data[i]));
			/*defines a map area for a bar*/
			map.addRect(data[i].id,[x0-point0.x,points[1]-point0.y,points[0]-point0.x,(data[i].$startY||y0)-point0.y],sIndex);

			/*the start position for the next series*/
			data[i].$startY = (this._settings.border?(points[1]+1):points[1]);
		}
	},
	/**
	 *   sets points for bar and returns the position of the bottom right point
	 *   @param: ctx - canvas object
	 *   @param: x0 - the x position of start point
	 *   @param: y0 - the y position of start point
	 *   @param: barWidth - bar width
	 *   @param: radius - the rounding radius of the top
	 *   @param: unit - the value defines the correspondence between item value and bar height
	 *   @param: value - item value
	 *   @param: offset - the offset from expected bar edge (necessary for drawing border)
	 *   @param: minY - the minimum y position for the bars ()
	 */
	_setStakedBarPoints:function(ctx,x0,y0,barWidth,unit,value,offset,minY,skipBottom){
		/*start*/
		ctx.moveTo(x0,y0);
		/*start of left rounding*/
		var y1 = y0 - unit*value+offset;
		/*maximum height limit*/
		if(y1<minY)
			y1 = minY;
		ctx.lineTo(x0,y1);
		var x3 = x0 + barWidth;
		var y3 = y1;
		ctx.lineTo(x3,y3);
		/*right rounding*/
		/*bottom right point*/
		var x5 = x0 + barWidth;
		ctx.lineTo(x5,y0);
		/*line to the start point*/
		if(!skipBottom){
			ctx.lineTo(x0,y0);
		}
		//	ctx.lineTo(x0,0); //IE fix!
		return [x5,y3-2*offset];
	}
});	

webix.extend(webix.ui.chart, {
/**
	*   renders a bar chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: x - the width of the container
	*   @param: y - the height of the container
	*   @param: sIndex - index of drawing chart
	*   @param: map - map object
	*/
	$render_stackedBarH:function(ctx, data, point0, point1, sIndex, map){
		var maxValue,minValue;
		/*necessary if maxValue - minValue < 0*/
		var valueFactor;
		/*maxValue - minValue*/
		var relValue;

		var total_width = point1.x-point0.x;

		var yax = !!this._settings.yAxis;

		var limits = this._getStackedLimits(data);
		maxValue = limits.max;
		minValue = limits.min;

		/*an available width for one bar*/
		var cellWidth = Math.floor((point1.y-point0.y)/data.length);

		/*draws x and y scales*/
		if(!sIndex)
			this._drawHScales(ctx,data,point0, point1,minValue,maxValue,cellWidth);

		/*necessary for automatic scale*/
		if(yax){
			maxValue = parseFloat(this._settings.xAxis.end);
			minValue = parseFloat(this._settings.xAxis.start);
		}

		/*unit calculation (bar_height = value*unit)*/
		var relativeValues = this._getRelativeValue(minValue,maxValue);
		relValue = relativeValues[0];
		valueFactor = relativeValues[1];

		var unit = (relValue?total_width/relValue:10);
		var startValue = 0;
		if(!yax){
			/*defines start value for better representation of small values*/
			startValue = 10;
			unit = (relValue?(total_width-startValue)/relValue:10);
		}

		/*a real bar width */
		var barWidth = parseInt(this._settings.barWidth,10);
		if((barWidth+4)>cellWidth) barWidth = cellWidth-4;
		/*the half of distance between bars*/
		var barOffset = (cellWidth - barWidth)/2;
		/*the radius of rounding in the top part of each bar*/
		var radius = 0;

		var inner_gradient = false;
		var gradient = this._settings.gradient;
		if (gradient){
			inner_gradient = true;
		}
		/*draws a black line if the horizontal scale isn't defined*/
		if(!yax){
			this._drawLine(ctx,point0.x-0.5,point0.y,point0.x-0.5,point1.y,"#000000",1); //hardcoded color!
		}

		var seriesNumber = 0;
		var seriesIndex = 0;
		for(i=0; i<this._series.length; i++ ){
			if(i == sIndex){
				seriesIndex  = seriesNumber;
			}
			if(this._series[i].type == "stackedBarH")
				seriesNumber++;
		}

		for(var i=0; i < data.length;i ++){

			if(!seriesIndex)
				data[i].$startX = point0.x;

			var value =  parseFloat(this._settings.value(data[i]||0));
			if(value>maxValue) value = maxValue;
			value -= minValue;
			value *= valueFactor;

			/*start point (bottom left)*/
			var x0 = point0.x;
			var y0 = point0.y+ barOffset + i*cellWidth;

			if(!seriesIndex)
				data[i].$startX = x0;
			else
				x0 = data[i].$startX;

			if(value<0||(this._settings.yAxis&&value===0)){
				this.canvases["y"].renderTextAt("middle", true, x0+10,y0+barWidth/2,this._settings.label(data[i]));
				continue;
			}

			/*takes start value into consideration*/
			if(!yax) value += startValue/unit;
			var color = this._settings.color.call(this,data[i]);


			/*drawing bar body*/
			ctx.globalAlpha = this._settings.alpha.call(this,data[i]);
			ctx.fillStyle = this._settings.color.call(this,data[i]);
			ctx.beginPath();
			var points = this._setBarHPoints(ctx,x0,y0,barWidth,radius,unit,value,(this._settings.border?1:0));
			if (gradient&&!inner_gradient) ctx.lineTo(point0.x+total_width,y0+(this._settings.border?1:0)); //fix gradient sphreading
			ctx.fill();

			if (inner_gradient){
				var gradParam = this._setBarGradient(ctx,x0,y0+barWidth,x0,y0,inner_gradient,color,"x");
				ctx.fillStyle = gradParam.gradient;
				ctx.beginPath();
				points = this._setBarHPoints(ctx,x0,y0, barWidth,radius,unit,value,0);
				ctx.fill();
			}
			/*drawing the gradient border of a bar*/
			if(this._settings.border){
				this._drawBarHBorder(ctx,x0,y0,barWidth,minValue,radius,unit,value,color);
			}

			ctx.globalAlpha = 1;

			/*sets a bar label*/
			this.canvases[sIndex].renderTextAt("middle",true,data[i].$startX+(points[0]-data[i].$startX)/2-1, y0+(points[1]-y0)/2, this._settings.label(data[i]));
			/*defines a map area for a bar*/
			map.addRect(data[i].id,[data[i].$startX-point0.x,y0-point0.y,points[0]-point0.x,points[1]-point0.y],sIndex);
			/*the start position for the next series*/
			data[i].$startX = points[0];
		}
	}
});
webix.extend(webix.ui.chart, {
	/**
	*   renders a spline chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: width - the width of the container
	*   @param: height - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_spline:function(ctx, data, point0, point1, sIndex, map){
		var config,i,items,j,params,sparam,x,x0,x1,x2,y,y1,y2;
		params = this._calculateLineParams(ctx,data,point0,point1,sIndex);
		config = this._settings;
		this._mapStart = point0;

		/*array of all points*/
		items = [];

		/*drawing all items*/
		if (data.length) {

			/*getting all points*/
			x0 = (config.offset?point0.x+params.cellWidth*0.5:point0.x);
			for(i=0; i < data.length;i ++){
				y = this._getPointY(data[i],point0,point1,params);
				if(y){
					x = ((!i)?x0:params.cellWidth*i - 0.5 + x0);
					items.push({x:x,y:y,index:i});
				}
			}
			sparam = this._getSplineParameters(items);

			for(i =0; i< items.length; i++){
				x1 = items[i].x;
				y1 = items[i].y;
				if(i<items.length-1){
					x2 = items[i+1].x;
					y2 = items[i+1].y;
					for(j = x1; j < x2; j++){
						var sY1 = this._getSplineYPoint(j,x1,i,sparam.a,sparam.b,sparam.c,sparam.d);
						if(sY1<point0.y)
							sY1=point0.y;
						if(sY1>point1.y)
							sY1=point1.y;
						var sY2 = this._getSplineYPoint(j+1,x1,i,sparam.a,sparam.b,sparam.c,sparam.d);
						if(sY2<point0.y)
							sY2=point0.y;
						if(sY2>point1.y)
							sY2=point1.y;
						this._drawLine(ctx,j,sY1,j+1,sY2,config.line.color(data[i]),config.line.width);

					}
					this._drawLine(ctx,x2-1,this._getSplineYPoint(j,x1,i,sparam.a,sparam.b,sparam.c,sparam.d),x2,y2,config.line.color(data[i]),config.line.width);
				}
				this._drawItem(ctx,x1,y1,data[items[i].index],config.label(data[items[i].index]), sIndex, map);
			}
		}
	},
	/*gets spline parameter*/
	_getSplineParameters:function(points){
		var a ,b, c, d, i, s, u, v,
			h = [],
			m = [],
			n = points.length;

		for(i =0; i<n-1;i++){
			h[i] = points[i+1].x - points[i].x;
			m[i] = (points[i+1].y - points[i].y)/h[i];
		}
		u = [];	v = [];
		u[0] = 0;
		u[1] = 2*(h[0] + h[1]);
		v[0] = 0;
		v[1] = 6*(m[1] - m[0]);
		for(i =2; i < n-1; i++){
			u[i] = 2*(h[i-1]+h[i]) - h[i-1]*h[i-1]/u[i-1];
			v[i] = 6*(m[i]-m[i-1]) - h[i-1]*v[i-1]/u[i-1];
		}

		s = [];
		s[n-1] = s[0] = 0;
		for(i = n -2; i>=1; i--)
			s[i] = (v[i] - h[i]*s[i+1])/u[i];

		a = []; b = []; c = [];	d = [];

		for(i =0; i<n-1;i++){
			a[i] = points[i].y;
			b[i] = - h[i]*s[i+1]/6 - h[i]*s[i]/3 + (points[i+1].y-points[i].y)/h[i];
			c[i] = s[i]/2;
			d[i] = (s[i+1] - s[i])/(6*h[i]);
		}
		return {a:a,b:b,c:c,d:d};
	},
	/*returns the y position of the spline point */
	_getSplineYPoint:function(x,xi,i,a,b,c,d){
		return a[i] + (x - xi)*(b[i] + (x-xi)*(c[i]+(x-xi)*d[i]));
	}
});	
webix.extend(webix.ui.chart,{
	/**
	*   renders an area chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: width - the width of the container
	*   @param: height - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_area:function(ctx, data, point0, point1, sIndex, map){

		var align, config, i, mapRect, obj, params, path,
			res1, res2, x0, x1, y1, x2, y2, y0;

		params = this._calculateLineParams(ctx,data,point0,point1,sIndex);
		config = this._settings;

		//the size of map area
		mapRect = (config.eventRadius||Math.floor(params.cellWidth/2));

		if (data.length) {

			// area points
			path = [];

			//the x position of the first item
			x0 = (!config.offset?point0.x:point0.x+params.cellWidth*0.5);

			/*
			 iterates over all data items:
			 calculates [x,y] for area path, adds rect to chart map and renders labels
			 */
			for(i=0; i < data.length;i ++){
				obj = data[i];

				res2 = this._getPointY(obj,point0,point1,params);
				x2 = x0 + params.cellWidth*i ;
				if(res2){
					y2 = (typeof res2 == "object"?res2.y0:res2);
					if(i && this._settings.fixOverflow){
						res1 = this._getPointY(data[i-1],point0,point1,params);
						if(res1.out && res1.out == res2.out){
							continue;
						}
						x1 = params.cellWidth*(i-1) - 0.5 + x0;
						y1 = (typeof res1 == "object"?res1.y0:res1);
						if(res1.out){
							y0 = (res1.out == "min"?point1.y:point0.y);
							path.push([this._calcOverflowX(x1,x2,y1,y2,y0),y0]);
						}
						if(res2.out){
							y0 = (res2.out == "min"?point1.y:point0.y);
							path.push([this._calcOverflowX(x1,x2,y1,y2,y0),y0]);
							if(i == (data.length-1) && y0 == point0.y)
								path.push([x2,point0.y]);
						}
					}
					if(!res2.out){
						path.push([x2,y2]);
						//map
						map.addRect(obj.id,[x2-mapRect-point0.x,y2-mapRect-point0.y,x2+mapRect-point0.x,y2+mapRect-point0.y],sIndex);
					}

					//labels
					if(!config.yAxis){
						align = (!config.offset&&(i == data.length-1)?"left":"center");
						this.canvases[sIndex].renderTextAt(false, align, x2, y2-config.labelOffset,config.label(obj));
					}
				}

			}
			if(path.length){
				path.push([x2,point1.y]);
				path.push([path[0][0],point1.y]);
			}



			//filling area
			ctx.globalAlpha = this._settings.alpha.call(this,data[0]);
			ctx.fillStyle = this._settings.color.call(this,data[0]);
			ctx.beginPath();
			this._path(ctx,path);
			ctx.fill();

			//border
			if(config.border){
				ctx.lineWidth = config.borderWidth||1;
				if(config.borderColor)
					ctx.strokeStyle =  config.borderColor.call(this,data[0]);
				else
					this._setBorderStyles(ctx,ctx.fillStyle);

				ctx.beginPath();
				this._path(ctx,path);
				ctx.stroke();

			}
			ctx.lineWidth = 1;
			ctx.globalAlpha =1;

		}
	},
	
	/**
	*   renders an area chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: width - the width of the container
	*   @param: height - the height of the container
	*   @param: sIndex - index of drawing chart
	*/
	$render_stackedArea:function(ctx, data, point0, point1, sIndex, map){

		var a0, a1, align, config, i, j, lastItem, mapRect, obj, params, path, x, y, yPos;

		params = this._calculateLineParams(ctx,data,point0,point1,sIndex);

		config = this._settings;

		/*the value that defines the map area position*/
		mapRect = (config.eventRadius||Math.floor(params.cellWidth/2));


		/*drawing all items*/
		if (data.length) {

			// area points
			path = [];

			// y item positions
			yPos = [];

			//the x position of the first item
			x = (!config.offset?point0.x:point0.x+params.cellWidth*0.5);


			var setOffset = function(i,y){
				return sIndex?(data[i].$startY?y-point1.y+data[i].$startY:0):y;
			};

			var solveEquation  = function(x,p0,p1){
				var k = (p1.y - p0.y)/(p1.x - p0.x);
				return  k*x + p0.y - k*p0.x;
			};

			/*
			 iterates over all data items:
			 calculates [x,y] for area path, adds rect to chart map and renders labels
			 */

			for(i=0; i < data.length;i ++){
				obj = data[i];

				if(!i){
					y =  setOffset(i,point1.y);
					path.push([x,y]);
				}
				else{
					x += params.cellWidth ;
				}

				y = setOffset(i,this._getPointY(obj,point0,point1,params));

				yPos.push((isNaN(y)&&!i)?(data[i].$startY||point1.y):y);

				if(y){
					path.push([x,y]);

					//map
					map.addRect(obj.id,[x-mapRect-point0.x,y-mapRect-point0.y,x+mapRect-point0.x,y+mapRect-point0.y],sIndex);

					//labels
					if(!config.yAxis){
						align = (!config.offset&&lastItem?"left":"center");
						this.canvases[sIndex].renderTextAt(false, align, x, y-config.labelOffset,config.label(obj));
					}
				}
			}

			// bottom right point
			path.push([x,setOffset(i-1,point1.y)]);

			// lower border from the end to start
			if(sIndex){
				for(i=data.length-2; i > 0; i --){
					x -= params.cellWidth ;
					y =  data[i].$startY;
					if(y)
						path.push([x,y]);
				}
			}

			// go to start point
			path.push([path[0][0],path[0][1]]);

			// filling path
			ctx.globalAlpha = this._settings.alpha.call(this,data[0]);
			ctx.fillStyle = this._settings.color.call(this,data[0]);
			ctx.beginPath();
			this._path(ctx,path);
			ctx.fill();

			// set y positions of the next series
			for(i=0; i < data.length;i ++){
				y =  yPos[i];

				if(!y){
					if(i == data.length-1){
						y = data[i].$startY;
					}
					for(j =i+1; j< data.length; j++){
						if(yPos[j]){
							a0 =  {x:point0.x,y:yPos[0]};
							a1 =  {x:(point0.x+params.cellWidth*j),y:yPos[j]};
							y = solveEquation(point0.x+params.cellWidth*i,a0,a1);
							break;
						}

					}
				}

				data[i].$startY = y;
			}


		}
	}
});
	 	//+stackedArea
webix.extend(webix.ui.chart, {
	$render_radar:function(ctx,data,x,y,sIndex,map){
		this._renderRadarChart(ctx,data,x,y,sIndex,map);
		
	}, 
	/**
	*   renders a pie chart
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: x - the width of the container
	*   @param: y - the height of the container
	*   @param: ky - value from 0 to 1 that defines an angle of inclination (0<ky<1 - 3D chart)
	*/
	_renderRadarChart:function(ctx,data,point0,point1,sIndex,map){
		if(!data.length)
			return;
		var coord = this._getPieParameters(point0,point1);
		/*scale radius*/
		var radius = (this._settings.radius?this._settings.radius:coord.radius);
		/*scale center*/
		var x0 = (this._settings.x?this._settings.x:coord.x);
		var y0 = (this._settings.y?this._settings.y:coord.y);
		/*angles for each unit*/
		var ratioUnits = [];
		for(var i=0;i<data.length;i++)
			ratioUnits.push(1);
		var ratios = this._getRatios(ratioUnits,data.length);
		this._mapStart = point0;
		if(!sIndex)
			this._drawRadarAxises(ratios,x0,y0,radius,data);
		this._drawRadarData(ctx,ratios,x0,y0,radius,data,sIndex,map);
	},
	_drawRadarData:function(ctx,ratios,x,y,radius,data,sIndex,map){
		var alpha0 ,alpha1, config, i, min, max, pos0, pos1, posArr,
			r0, r1, relValue, startAlpha, value, value0, value1, valueFactor,
			unit, unitArr;
		config = this._settings;
		/*unit calculation (item_radius_pos = value*unit)*/
		min = config.yAxis.start;
		max = config.yAxis.end;
		unitArr = this._getRelativeValue(min,max);
		relValue = unitArr[0];
		unit = (relValue?radius/relValue:radius/2);
		valueFactor = unitArr[1];

		startAlpha = -Math.PI/2;
		alpha0 =  alpha1 = startAlpha;
		posArr = [];
		pos1 = 0;
		for(i=0;i<data.length;i++){
			if(!value1){
				value = config.value(data[i]);
				if(this._logScaleCalc)
					value = this._log10(value);
				/*a relative value*/
				value0 = (parseFloat(value||0) - min)*valueFactor;
			}
			else
				value0 = value1;
			r0 = Math.floor(unit*value0);

			value = config.value((i!=(data.length-1))?data[i+1]:data[0]);
			if(this._logScaleCalc)
				value = this._log10(value);

			value1 = (parseFloat(value||0) - min)*valueFactor;
			r1 = Math.floor(unit*value1);
			alpha0 = alpha1;
			alpha1 = ((i!=(data.length-1))?(startAlpha+ratios[i]-0.0001):startAlpha);
			pos0 = (pos1||this._getPositionByAngle(alpha0,x,y,r0));
			pos1 = this._getPositionByAngle(alpha1,x,y,r1);
			/*creates map area*/
			/*areaWidth  = (config.eventRadius||(parseInt(config.item.radius.call(this,data[i]),10)+config.item.borderWidth));
			 map.addRect(data[i].id,[pos0.x-areaWidth,pos0.y-areaWidth,pos0.x+areaWidth,pos0.y+areaWidth],sIndex);*/
			//this._drawLine(ctx,pos0.x,pos0.y,pos1.x,pos1.y,config.line.color.call(this,data[i]),config.line.width)
			posArr.push(pos0);
		}
		if(config.fill)
			this._fillRadarChart(ctx,posArr,data);
		if(!config.disableLines && data.length>2)
			this._strokeRadarChart(ctx,posArr,data);
		if(!config.disableItems || data.length<3)
			this._drawRadarItemMarkers(ctx,posArr,data,sIndex,map);
		posArr = null;
	},
	_drawRadarItemMarkers:function(ctx,points,data,sIndex,map){
		for(var i=0;i < points.length;i++){
			this._drawItem(ctx,points[i].x,points[i].y,data[i],this._settings.label.call(this,data),sIndex,map);
		}
	},
	_fillRadarChart:function(ctx,points,data){
		var pos0,pos1;
		ctx.globalAlpha= this._settings.alpha.call(this,{});

		ctx.beginPath();
		for(var i=0;i < points.length;i++){
			ctx.fillStyle = this._settings.fill.call(this,data[i]);
			pos0 = points[i];
			pos1 = (points[i+1]|| points[0]);
			if(!i){

				ctx.moveTo(pos0.x,pos0.y);
			}
			ctx.lineTo(pos1.x,pos1.y);
		}
		ctx.fill();
		ctx.globalAlpha=1;
	},
	_strokeRadarChart:function(ctx,points,data){
		var pos0,pos1;
		for(var i=0;i < points.length;i++){
			pos0 = points[i];
			pos1 = (points[i+1]|| points[0]);
			this._drawLine(ctx,pos0.x,pos0.y,pos1.x,pos1.y,this._settings.line.color.call(this,data[i]),this._settings.line.width);
		}
	},
	_drawRadarAxises:function(ratios,x,y,radius,data){
		var configY = this._settings.yAxis;
		var configX = this._settings.xAxis;
		var start = configY.start;
		var end = configY.end;
		var step = configY.step;
		var scaleParam= {};
		var config = this._configYAxis;
		if(typeof config.step =="undefined"||typeof config.start=="undefined"||typeof config.end =="undefined"){
			var limits = this._getLimits();
			scaleParam = this._calculateScale(limits.min,limits.max);
			start = scaleParam.start;
			end = scaleParam.end;
			step = scaleParam.step;
			configY.end = end;
			configY.start = start;
		}
		var units = [];
		var i,j,p;
		var c=0;
		var stepHeight = radius*step/(end-start);
		/*correction for small step*/
		var power,corr;
		if(step<1){
			power = Math.min(this._log10(step),(start<=0?0:this._log10(start)));
			corr = Math.pow(10,-power);
		}
		var angles = [];
		if(!this.canvases["scale"])
			this.canvases["scale"] =  this._createCanvas("radar_scale");
		var ctx = this.canvases["scale"].getCanvas();
		for(i = end; i>=start; i -=step){
			var value = this._logScaleCalc?Math.pow(10,i):i;
			if(scaleParam.fixNum)  value = parseFloat(i).toFixed(scaleParam.fixNum);

			units.push(Math.floor(c*stepHeight)+ 0.5);
			if(corr && !this._logScaleCalc){
				value = Math.round(value*corr)/corr;
				i = value;
			}
			var unitY = y-radius+units[units.length-1];

			this.canvases["scale"].renderTextAt("middle","left",x,unitY,
				configY.template(value.toString()),
				"webix_axis_item_y webix_radar"
			);
			if(ratios.length<2){
				this._drawScaleSector(ctx,"arc",x,y,radius-units[units.length-1],-Math.PI/2,3*Math.PI/2,i);
				return;
			}
			var startAlpha = -Math.PI/2;/*possibly need  to moved in config*/
			var alpha0 = startAlpha;
			var alpha1;

			for(j=0;j< ratios.length;j++){
				if(i==end)
					angles.push(alpha0);
				alpha1 = startAlpha+ratios[j]-0.0001;
				this._drawScaleSector(ctx,(ratios.length>2?(config.lineShape||"line"):"arc"),x,y,radius-units[units.length-1],alpha0,alpha1,i,j,data[i]);
				alpha0 = alpha1;
			}
			c++;
		}
		/*renders radius lines and labels*/
		for(i=0;i< angles.length;i++){
			p = this._getPositionByAngle(angles[i],x,y,radius);
			if(configX.lines.call(this,data[i],i))
				this._drawLine(ctx,x,y,p.x,p.y,(configX?configX.lineColor.call(this,data[i]):"#cfcfcf"),1);
			this._drawRadarScaleLabel(ctx,x,y,radius,angles[i],(configX?configX.template.call(this,data[i]):"&nbsp;"));
		}

	},
	_drawScaleSector:function(ctx,shape,x,y,radius,a1,a2,i,j){
		var pos1, pos2;
		if(radius<0)
			return false;
		pos1 = this._getPositionByAngle(a1,x,y,radius);
		pos2 = this._getPositionByAngle(a2,x,y,radius);
		var configY = this._settings.yAxis;
		if(configY.bg){
			ctx.beginPath();
			ctx.moveTo(x,y);
			if(shape=="arc")
				ctx.arc(x,y,radius,a1,a2,false);
			else{
				ctx.lineTo(pos1.x,pos1.y);
				ctx.lineTo(pos2.x,pos2.y);
			}
			ctx.fillStyle =  configY.bg(i,j);
			ctx.moveTo(x,y);
			ctx.fill();
			ctx.closePath();
		}
		if(configY.lines.call(this,i)){
			ctx.lineWidth = 1;
			ctx.beginPath();
			if(shape=="arc")
				ctx.arc(x,y,radius,a1,a2,false);
			else{
				ctx.moveTo(pos1.x,pos1.y);
				ctx.lineTo(pos2.x,pos2.y);
			}
			ctx.strokeStyle = configY.lineColor.call(this,i);
			ctx.stroke();
		}
	},
	_drawRadarScaleLabel:function(ctx,x,y,r,a,text){
		var t = this.canvases["scale"].renderText(0,0,text,"webix_axis_radar_title",1);
		var width = t.scrollWidth;
		var height = t.offsetHeight;
		var delta = 0.001;
		var pos =  this._getPositionByAngle(a,x,y,r+5);
		var corr_x=0,corr_y=0;
		if(a<0||a>Math.PI){
			corr_y = -height;
		}
		if(a>Math.PI/2){
			corr_x = -width;
		}
		if(Math.abs(a+Math.PI/2)<delta||Math.abs(a-Math.PI/2)<delta){
			corr_x = -width/2;
		}
		else if(Math.abs(a)<delta||Math.abs(a-Math.PI)<delta){
			corr_y = -height/2;
		}
		t.style.top  = pos.y+corr_y+"px";
		t.style.left = pos.x+corr_x+"px";
		t.style.width = width+"px";
		t.style.whiteSpace = "nowrap";
	}
});
webix.extend(webix.ui.chart, {

	/**
	*   renders a graphic
	*   @param: ctx - canvas object
	*   @param: data - object those need to be displayed
	*   @param: point0  - top left point of a chart
	*   @param: point1  - right bottom point of a chart
	*   @param: sIndex - index of drawing chart
    *   @param: map - map object
	*/
	$render_scatter:function(ctx, data, point0, point1, sIndex, map){
		if(!this._settings.xValue)
			return webix.log("warning","Undefined propery: xValue");
		/*max in min values*/
		var limitsY = this._getLimits();
		var limitsX = this._getLimits("h","xValue");
		/*render scale*/
		if(!sIndex){
			if(!this.canvases["x"])
				this.canvases["x"] = this._createCanvas("axis_x");
			if(!this.canvases["y"])
				this.canvases["y"] = this._createCanvas("axis_y");
			this._drawYAxis(this.canvases["y"].getCanvas(),data,point0,point1,limitsY.min,limitsY.max);
			this._drawHXAxis(this.canvases["x"].getCanvas(),data,point0,point1,limitsX.min,limitsX.max);
		}
		limitsY = {min:this._settings.yAxis.start,max:this._settings.yAxis.end};
		limitsX = {min:this._settings.xAxis.start,max:this._settings.xAxis.end};
		var params = this._getScatterParams(ctx,data,point0,point1,limitsX,limitsY);
		this._mapStart = point0;
		for(var i=0;i<data.length;i++){
			this._drawScatterItem(ctx,map,point0, point1, params,limitsX,limitsY,data[i],sIndex);
		}
	},
	_getScatterParams:function(ctx, data, point0, point1,limitsX,limitsY){
		var params = {};
		/*available space*/
		params.totalHeight = point1.y-point0.y;
		/*available width*/
		params.totalWidth = point1.x-point0.x;
		/*unit calculation (y_position = value*unit)*/
		this._calcScatterUnit(params,limitsX.min,limitsX.max,params.totalWidth,"X");
		this._calcScatterUnit(params,limitsY.min,limitsY.max,params.totalHeight,"Y");
		return params;
	},
	_drawScatterItem:function(ctx,map,point0, point1,params,limitsX,limitsY,obj,sIndex){
		var x0 = this._calculateScatterItemPosition(params, point1, point0, limitsX, obj, "X");
		var y0 = this._calculateScatterItemPosition(params, point0, point1, limitsY, obj, "Y");
		this. _drawItem(ctx,x0,y0,obj,this._settings.label.call(this,obj),sIndex,map);
	},
	_calculateScatterItemPosition:function(params, point0, point1, limits, obj, axis){
		/*the real value of an object*/
		var value = this._settings[axis=="X"?"xValue":"value"].call(this,obj);
		/*a relative value*/
		var valueFactor = params["valueFactor"+axis];
		var v = (parseFloat(value||0) - limits.min)*valueFactor;
		/*a vertical coordinate*/
		var unit = params["unit"+axis];
		var pos = point1[axis.toLowerCase()] - (axis=="X"?(-1):1)*Math.floor(unit*v);
		/*the limit of the minimum value is  the minimum visible value*/
		if(v<0)
			pos = point1[axis.toLowerCase()];
		/*the limit of the maximum value*/
		if(value > limits.max)
			pos = point0[axis.toLowerCase()];
		/*the limit of the minimum value*/
		if(value < limits.min)
			pos = point1[axis.toLowerCase()];
		return pos;
	},
	_calcScatterUnit:function(p,min,max,size,axis){
		var relativeValues = this._getRelativeValue(min,max);
		axis = (axis||"");
		p["relValue"+axis] = relativeValues[0];
		p["valueFactor"+axis] = relativeValues[1];
		p["unit"+axis] = (p["relValue"+axis]?size/p["relValue"+axis]:10);
	}
});
/*chart presents*/
webix.extend(webix.ui.chart, {
    presets:{
        "simple":{
            item:{
                borderColor: "#ffffff",
                color: "#2b7100",
                shadow: false,
                borderWidth:2
            },
    		line:{
    			color:"#8ecf03",
                width:2
    		}
        },
        "plot":{
            color:"#1293f8",
            item:{
                borderColor:"#636363",
                borderWidth:1,
                color: "#ffffff",
                type:"r",
                shadow: false
            },
    	    line:{
    			color:"#1293f8",
                width:2
    	    }
        },
        "diamond":{
            color:"#b64040",
            item:{
    			borderColor:"#b64040",
    			color: "#b64040",
                type:"d",
                radius:3,
                shadow:true
            },
    		line:{
    			color:"#ff9000",
                width:2
    		}
        },
        "point":{
            color:"#fe5916",
    		disableLines:true,
            fill:false,
            disableItems:false,
            item:{
                color:"#feb916",
                borderColor:"#fe5916",
                radius:2,
                borderWidth:1,
                type:"r"
    	    },
            alpha:1
        },
        "line":{
            line:{
                color:"#3399ff",
                width:2
            },
            item:{
                color:"#ffffff",
                borderColor:"#3399ff",
                radius:2,
                borderWidth:2,
                type:"d"
            },
            fill:false,
            disableItems:false,
            disableLines:false,
            alpha:1
        },
        "area":{
            fill:"#3399ff",
            line:{
                color:"#3399ff",
                width:1
            },
            disableItems:true,
            alpha: 0.2,
            disableLines:false
        },
        "round":{
            item:{
                radius:3,
                borderColor:"#3f83ff",
                borderWidth:1,
                color:"#3f83ff",
                type:"r",
                shadow:false,
                alpha:0.6
            }
        },
        "square":{
             item:{
                radius:3,
                borderColor:"#447900",
                borderWidth:2,
                color:"#69ba00",
                type:"s",
                shadow:false,
                alpha:1
            }
        },
        /*bar*/
        "column":{
            color:"RAINBOW",
            gradient:false,
            barWidth:45,
            radius:0,
            alpha:1,
            border:true
        },
        "stick":{
            barWidth:5,
            gradient:false,
    		color:"#67b5c9",
            radius:2,
            alpha:1,
            border:false
        },
        "alpha":{
            color:"#b9a8f9",
            barWidth:70,
            gradient:"falling",
            radius:0,
            alpha:0.5,
            border:true
        }
    }
});

/*
	UI:Calendar
*/







webix.protoUI({
	name:"calendar",

	defaults:{
		date: new Date(), //selected date, not selected by default
		select: false,
		navigation: true,
		monthSelect: true,
		weekHeader: true,
		weekNumber: false,
		skipEmptyWeeks: false,

		calendarHeader: "%F %Y",
		calendarWeekHeader: "W#",
		//calendarTime: "%H:%i",
		events:webix.Date.isHoliday,
		minuteStep: 5,
		icons: false,
		timepickerHeight: 30,
		headerHeight: 70,
		dayTemplate: function(d){
			return d.getDate();
		},
		width: 259,
		height: 250
	},

	dayTemplate_setter: webix.template,
	calendarHeader_setter:webix.Date.dateToStr,
	calendarWeekHeader_setter:webix.Date.dateToStr,
	calendarTime_setter:function(format){
		this._calendarTime = format;
		return webix.Date.dateToStr(format);
	},
	date_setter:function(date){
		return this._string_to_date(date);
	},
	maxDate_setter:function(date){
		return this._string_to_date(date);
	},
	minDate_setter:function(date){
		return this._string_to_date(date);
	},

	$init: function() {
		this._viewobj.className += " webix_calendar";

		//special dates
		this._special_dates = {};
		this._selected_date_part = this._selected_date = null;
		this._zoom_level = 0;
	},
	type_setter: function(value){
		if(value == "time"){
			this._zoom_in = true;
			this._zoom_level = -1;
		}
		return value;
	},
	$setSize:function(x,y){

		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			//repaint calendar when size changed
			this.render();
		}
	},
	$getSize:function(dx, dy){
		if (this._settings.cellHeight){
			var state = this._getDateBoundaries(this._settings.date);
			this._settings.height = this._settings.cellHeight * state._rows + (webix.skin.$active.calendarHeight||70);
		}
		return webix.ui.view.prototype.$getSize.call(this, dx,dy);
	},
	_getDateBoundaries: function(date, reset) { 
		// addition information about rendering event: 
		// 	how many days from the previous month, 
		// 	next, 
		// 	number of weeks to display and so on
		
		if (!this._set_date_bounds || reset){
			var month = date.getMonth();
			var year = date.getFullYear();

			var next = new Date(year, month+1, 1);
			var start = webix.Date.weekStart(new Date(year, month, 1));

			var days = Math.round((next.valueOf() - start.valueOf())/(60*1000*60*24));
			var rows = this._settings.skipEmptyWeeks?Math.ceil(days/7):6;

			this._set_date_bounds = { _month: month, _start:start, _next:next, _rows: rows};
		}

		return this._set_date_bounds;
	},
	$skin:function(){
		if(webix.skin.$active.calendar){
			if( webix.skin.$active.calendar.width)
				this.defaults.width = webix.skin.$active.calendar.width;
			if( webix.skin.$active.calendar.height)
				this.defaults.height = webix.skin.$active.calendar.height;
			if( webix.skin.$active.calendar.headerHeight)
				this.defaults.headerHeight = webix.skin.$active.calendar.headerHeight;
			if( webix.skin.$active.calendar.timepickerHeight)
				this.defaults.timepickerHeight = webix.skin.$active.calendar.timepickerHeight;
		}

	},
	_getColumnConfigSizes: function(date){ 
		var bounds = this._getDateBoundaries(date);

		var s = this._settings;
		var _columnsHeight = [];
		var _columnsWidth = [];

		var containerWidth = this._content_width - 36;

		var containerHeight = this._content_height - this._settings.headerHeight - 10 - (this._settings.timepicker||this._icons?this._settings.timepickerHeight:0);

		var columnsNumber = (s.weekNumber)?8:7;
		for(var i=0; i<columnsNumber; i++) {
			_columnsWidth[i] = Math.ceil(containerWidth/(columnsNumber-i));
			containerWidth -= _columnsWidth[i];
		}

		var rowsNumber = bounds._rows;
		for (var k = 0; k < rowsNumber; k++) {
			_columnsHeight[k] = Math.ceil(containerHeight/(rowsNumber-k) );
			containerHeight -= _columnsHeight[k];
		}
		return [_columnsWidth, _columnsHeight];
	},
	icons_setter: function(value){
		if(!value)
			this._icons = null;
		else if(typeof value == "object")
			this._icons = value;
		else
			this._icons = this._icons2;
	},
	_icons: [],
	_icons2: [

		{
			template: function(){
				return "<span class='webix_cal_icon_today webix_cal_icon'>"+webix.i18n.calendar.today+"</span>";
			},
			on_click:{
				"webix_cal_icon_today": function(){
					this.setValue(new Date());
					this.callEvent("onTodaySet",[this.getSelectedDate()]);
				}
			}
		},
		{
			template: function(){
				return "<span class='webix_cal_icon_clear webix_cal_icon'>"+webix.i18n.calendar.clear+"</span>";
			},
			on_click:{
				"webix_cal_icon_clear": function(){
					this.setValue("");
					this.callEvent("onDateClear",[this.getSelectedDate()]);
				}
			}
		}
	],
	refresh:function(){ this.render(); },
	render: function() {
		//reset zoom level
		this._zoom_level = 0;
		this._zoom_size = false;

		var s = this._settings;

		if (!this.isVisible(s.id)) return;
		this._current_time = webix.Date.datePart(new Date());

		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+s.id);
		this.callEvent("onBeforeRender",[]);

		var date = this._settings.date;

		var bounds = this._getDateBoundaries(date, true);
		var sizes = this._getColumnConfigSizes(date);
		var width = sizes[0];
		var height = sizes[1];

		var html = "<div class='webix_cal_month'><span class='webix_cal_month_name"+(!this._settings.monthSelect?" webix_readonly":"")+"'>"+s.calendarHeader(date)+'</span>';
		if (s.navigation)
			html += "<div class='webix_cal_prev_button'></div><div class='webix_cal_next_button'></div>";
		html += "</div>";

		if(s.weekHeader)
			html += "<div class='webix_cal_header'>"+this._week_template(width)+"</div>";

		html += "<div class='webix_cal_body'>"+this._body_template(width, height, bounds)+"</div>";

		if (this._settings.timepicker || this._icons){
			html += "<div class='webix_cal_footer'>";
			if(this._settings.timepicker)
				html += this._timepicker_template(date);

			if(this._icons)
				html += this._icons_template();
			html += "</div>";
		}


		this._contentobj.innerHTML = html;

		if(this._settings.type == "time"){
			var time = this._settings.date;
			if(time){
				if(typeof(time) == "string"){
					date = webix.i18n.parseTimeFormatDate(time);
				}
				else if(webix.isArray(time)){
					date.setHours(time[0]);
					date.setMinutes(time[1]);
				}
			}
			this._changeZoomLevel(-1,date);
		}
		this.callEvent("onAfterRender",[]);
	},
	_icons_template: function(date){
		var html =	"<div class='webix_cal_icons'>";
		var icons = this._icons;

		for(var i=0; i < icons.length; i++){
			if(icons[i].template){
				var template = (typeof(icons[i].template) == "function"?icons[i].template: webix.template(icons[i].template));
				html += template.call(this,date);
			}
			if(icons[i].on_click){
				webix.extend(this.on_click,icons[i].on_click);
			}
		}
		html += "</div>";
		return html;
	},
	_timepicker_template:function(date){
		var timeFormat = this._settings.calendarTime||webix.i18n.timeFormatStr;
		return "<div class='webix_cal_time"+(this._icons?" webix_cal_time_icons":"")+"'><span class='webix_icon fa-clock-o'></span> "+timeFormat(date)+"</div>";
	},
	_week_template: function(widths){
		var s = this._settings;
		var week_template = '';
		var correction = 0;

		if(s.weekNumber) {
			correction = 1;
			week_template += "<div class='webix_cal_week_header' style='width: "+widths[0]+"px;' >"+s.calendarWeekHeader()+"</div>"; 
		}
		
		var k = (webix.Date.startOnMonday)?1:0;
		for (var i=0; i<7; i++){ // 7 days total
			var day_index = (k + i) % 7; // 0 - Sun, 6 - Sat as in Locale.date.day_short
			var day = webix.i18n.calendar.dayShort[day_index]; // 01, 02 .. 31
			week_template += "<div day='"+day_index+"' style='width: "+widths[i+correction]+"px;' >"+day+"</div>";
		}
		
		return week_template;
	},
    blockDates_setter:function(value){
        return webix.toFunctor(value, this.$scope);
    },
    _day_css:function(day, bounds){
		var css = "webix_cal_day";
		if (webix.Date.equal(day, this._current_time))
			css += " webix_cal_today";
		if (webix.Date.equal(day, this._selected_date_part))
			css += " webix_cal_select";
		if (day.getMonth() != bounds._month)
			css += " webix_cal_outside";

        if ( (this._settings.blockDates && this._settings.blockDates.call(this,day)) || 
        	 ( day < this._settings.minDate || day > this._settings.maxDate))
        		css+= " webix_cal_day_disabled";

		if (this._settings.events)
			css+=" "+this._settings.events(day);

		return css;
	},
	_body_template: function(widths, heights, bounds){
		var s = this._settings;
		var html = "";
		var day = webix.Date.datePart(webix.Date.copy(bounds._start));
		var start = s.weekNumber?1:0;
		var weekNumber = webix.Date.getISOWeek(webix.Date.add(day,2,"day", true));

		var min = this._settings.minDate || new Date(1,1,1);
        var max = this._settings.maxDate || new Date(9999,1,1);
                

		for (var y=0; y<heights.length; y++){
			html += "<div class='webix_cal_row' style='height:"+heights[y]+"px;line-height:"+heights[y]+"px'>";
			if (start)
				html += "<div class='webix_cal_week_num' style='width:"+widths[0]+"px'>"+weekNumber+"</div>";

			for (var x=start; x<widths.length; x++){
				var css = this._day_css(day, bounds);
				var d = this._settings.dayTemplate.call(this,day);
				html += "<div day='"+x+"' class='"+css+"' style='width:"+widths[x]+"px'><span class='webix_cal_day_inner'>"+d+"</span></div>";
				day = webix.Date.add(day, 1, "day");
				if(day.getHours()){
					day = webix.Date.datePart(day);
				}
			}

			html += "</div>";
			weekNumber++;
		}
		return html;
	},
	_changeDate:function(dir, step, notset){
		var now = this._settings.date;
		if(!step) { step = this._zoom_logic[this._zoom_level]._changeStep; }
		if(!this._zoom_level){
			now = webix.Date.copy(now);
			now.setDate(1);
		}
		var next = webix.Date.add(now, dir*step, "month", true);
		this._changeDateInternal(now, next);
	},
	_changeDateInternal:function(now, next){
		if(this.callEvent("onBeforeMonthChange", [now, next])){
			if (this._zoom_level){
				this._update_zoom_level(next);
			}
			else{
				this.showCalendar(next);
			}
			this.callEvent("onAfterMonthChange", [next, now]);
		}
	},
	_zoom_logic:{
		"-2":{
			_setContent:function(next, i){ next.setMinutes(i); }
		},
		"-1":{
			_setContent:function(next, i){ next.setHours(i); }
		},
		"0":{ 
			_changeStep:1
		},//days
		"1":{	//months
			_getTitle:function(date){ return date.getFullYear(); },
			_getContent:function(i){ return webix.i18n.calendar.monthShort[i]; },
			_setContent:function(next, i){ if(i!=next.getMonth()) next.setDate(1);next.setMonth(i); },
			_changeStep:12
		},
		"2":{	//years
			_getTitle:function(date){ 
				var start = date.getFullYear();
				this._zoom_start_date = start = start - start%10 - 1;
				return start+" - "+(start+10);
			},
			_getContent:function(i){ return this._zoom_start_date+i; },
			_setContent:function(next, i){ next.setFullYear(this._zoom_start_date+i); },
			_changeStep:12*10
		}
	},
	_update_zoom_level:function(date){
		var css, height, i, selected, width;
		var html = "";
		var index = this._settings.weekHeader?2: 1;
		var zlogic = this._zoom_logic[this._zoom_level];
		var sections  = this._contentobj.childNodes;

		if (date)
			this._settings.date = date;


		//store width and height of draw area
		if (!this._zoom_size){
			/*this._reserve_box_height = sections[index].offsetHeight +(index==2?sections[1].offsetHeight:0);*/

			this._reserve_box_height = this._contentobj.offsetHeight - this._settings.headerHeight - this._settings.timepickerHeight;
			this._reserve_box_width = sections[index].offsetWidth;
			this._zoom_size = 1;
		}

		//main section
		if (this._zoom_in){
			//hours and minutes
			height = this._reserve_box_height/6;
			var timeColNum = 6;
			var timeFormat = this._calendarTime||webix.i18n.timeFormat;
			var enLocale = timeFormat.match(/%([a,A])/);
			if(enLocale)
				timeColNum++;
			width = parseInt((this._reserve_box_width-3)/timeColNum,10);

			html += "<div class='webix_time_header'>"+this._timeHeaderTemplate(width,enLocale)+"</div>";
			html += "<div  class='webix_cal_body' style='height:"+this._reserve_box_height+"px'>";
				html += "<div class='webix_hours'>";
				selected = this._settings.date.getHours();
				for (i=0; i<24; i++){
					css="";
					if(enLocale){
						if((selected>11&&i<=11)||(selected<=11&&i>11))
							css = " webix_cal_blurred_hours";
						if(i%4===0){
							var label = (i==4?"AM":(i==16?"PM":""));
							html += "<div class='webix_cal_block_empty"+css+"' style='"+this._getCalSizesString(width,height)+"clear:both;"+"'>"+label+"</div>";
						}
					}
					css += (selected ==  i? " webix_selected" : "");
					var value = webix.Date.toFixed(enLocale&& i>12?i-12:i);
					html += "<div class='webix_cal_block"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+(i%4===0&&!enLocale?"clear:both;":"")+"'>"+value+"</div>";
				}
				html += "</div>";
				html += "<div class='webix_minutes'>";
				selected = this._settings.date.getMinutes();
				for (i=0; i<60; i+=this._settings.minuteStep){
					css = (selected == i ? " webix_selected" : "");
					html += "<div class='webix_cal_block webix_cal_block_min"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+(i%2===0?"clear:both;":"")+"'>"+webix.Date.toFixed(i)+"</div>";
				}
				html += "</div>";
			html += "</div>";
			html += "<div  class='webix_time_footer'>"+this._timeButtonsTemplate()+"</div>";
			this._contentobj.innerHTML = html;
		} else {
			//years and months
			//reset header
			sections[0].firstChild.innerHTML = zlogic._getTitle(this._settings.date);
			height = this._reserve_box_height/3;
			width = this._reserve_box_width/4;
			selected = (this._zoom_level==1?this._settings.date.getMonth():this._settings.date.getFullYear());
			for (i=0; i<12; i++){
				css = (selected == (this._zoom_level==1?i:zlogic._getContent(i)) ? " webix_selected" : "");
				html+="<div class='webix_cal_block"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+"'>"+zlogic._getContent(i)+"</div>";
			}
			if(index-1){
				sections[index-1].style.display = "none";
			}
			sections[index].innerHTML = html;
			if(!sections[index+1]){
				this._contentobj.innerHTML += "<div  class='webix_time_footer'>"+this._timeButtonsTemplate()+"</div>";
			}
			else
				sections[index+1].innerHTML=this._timeButtonsTemplate();
			sections[index].style.height = this._reserve_box_height+"px";
		}
	},
	_getCalSizesString: function(width,height){
		return "width:"+width+"px; height:"+height+"px; line-height:"+height+"px;";
	},
	_timeButtonsTemplate: function(){
		return "<input type='button' style='width:100%' class='webix_cal_done' value='"+webix.i18n.calendar.done+"'>";
	},
	_timeHeaderTemplate: function(width,enLocale){
		var w1 = width*(enLocale?5:4);
		var w2 = width*2;
		return "<div class='webix_cal_hours' style='width:"+w1+"px'>"+webix.i18n.calendar.hours+"</div><div class='webix_cal_minutes' style='width:"+w2+"px'>"+webix.i18n.calendar.minutes+"</div>";
	},
	_changeZoomLevel: function(zoom,date){
		if(this.callEvent("onBeforeZoom",[zoom])){
			this._zoom_level = zoom;
			if(zoom)
				this._update_zoom_level(date);
			else
				this.showCalendar(date);
			this.callEvent("onAfterZoom",[zoom]);
		}
	},
	_mode_selected:function(value){
		var now = this._settings.date;
		var next = webix.Date.copy(now); 
		this._zoom_logic[this._zoom_level]._setContent(next, value);
		var zoom = this._zoom_level-1;
		this._changeZoomLevel(zoom, next);
	},
	// selects date and redraw calendar
	_selectDate: function(date){
		if(this.callEvent("onBeforeDateSelect", [date])){
			this.selectDate(date, true);
			this.callEvent("onDateSelect", [date]);       // should be deleted in a future version
			this.callEvent("onAfterDateSelect", [date]);
		}
	},
	on_click:{
		webix_cal_prev_button: function(e, id, target){
			this._changeDate(-1);
		},
		webix_cal_next_button: function(e, id, target){
			this._changeDate(1);
		},
		webix_cal_day: function(e, id, target){
            if(target.className.indexOf('webix_cal_day_disabled')!==-1)
                return false;
			var cind = webix.html.index(target) - (this._settings.weekNumber?1:0);
			var rind = webix.html.index(target.parentNode);
			var date = webix.Date.add(this._getDateBoundaries()._start, cind + rind*7, "day", true);
			if (this._settings.timepicker){
				date.setHours(this._settings.date.getHours());
				date.setMinutes(this._settings.date.getMinutes());
			}
			this._selectDate(date);

		},
		webix_cal_time:function(e){
			if(this._zoom_logic[this._zoom_level-1]){
				this._zoom_in = true;
				var zoom = this._zoom_level - 1;
				this._changeZoomLevel(zoom);
			}
		},
		webix_cal_done:function(e){
			this._selectDate(this._settings.date);
		},
		webix_cal_month_name:function(e){
			this._zoom_in = false;
			//maximum zoom reached
			if (this._zoom_level == 2 || !this._settings.monthSelect) return;

			var zoom = Math.max(this._zoom_level, 0) + 1;
			this._changeZoomLevel(zoom);
		},
		webix_cal_block:function(e, id, trg){
			if(this._zoom_in){
				var level = (trg.className.indexOf("webix_cal_block_min")!=-1?this._zoom_level-1:this._zoom_level);
				var now = this._settings.date;
				var next = webix.Date.copy(now);
				this._zoom_logic[level]._setContent(next, trg.getAttribute("data-value")*1);
				this._update_zoom_level(next);
			}
			else{
				this._mode_selected(trg.getAttribute("data-value")*1);
			}
		}
	},


	_string_to_date: function(date, format){
		if (!date){
			return webix.Date.datePart(new Date());
		}


		if(typeof date == "string"){
			if (format)
				date = webix.Date.strToDate(format)(date);
			else
				date=webix.i18n.parseFormatDate(date);
		}

		return date;
	},
	showCalendar: function(date) {
		date = this._string_to_date(date);

		//date is already visible, skip update
		this._settings.date = date;
		this.render();
		this.resize();
	},
	getSelectedDate: function() {
        return (this._selected_date)?webix.Date.copy(this._selected_date):this._selected_date;

	},
	getVisibleDate: function() {
		return webix.Date.copy(this._settings.date);
	},
	setValue: function(date, format){
        this.selectDate(date, true);
	},
	getValue: function(format){
		var date = this.getSelectedDate();
		if (format)
			date = webix.Date.dateToStr(format)(date);
		return date;
	},
	selectDate: function(date, show){
        if(date){
            date = this._string_to_date(date);
            this._selected_date = date;
            this._selected_date_part = webix.Date.datePart(webix.Date.copy(date));
        }
        else{ //deselect
            this._selected_date = null;
            this._selected_date_part = null;
	        if(this._settings.date){
		        webix.Date.datePart(this._settings.date);
	        }
        }

		if (show)
			this.showCalendar(date);
		else
			this.render();

		this.callEvent("onChange",[date]);
	}, 
	locate:function(){ return null; }
	
}, webix.MouseEvents, webix.ui.view, webix.EventSystem);







webix.protoUI({
	name:"property",
	$init:function(){
		this._contentobj.className+=" webix_property";
        this._destroy_with_me = [];
	},
	defaults:{
		 nameWidth:100,
		 editable:true
	},
	on_render:{
		checkbox:function(value, config){
			return  "<input type='checkbox' class='webix_property_check' "+(value?"checked":"")+">";
		},
		color:function(value, config){
			return  "<div class=\"webix_property_col_val\"><div class='webix_property_col_ind' style=\"background-color:"+(value||"#FFFFFF")+";\"></div><span>" +value+"</span></div>";
		}
	},
	on_edit:{
		label:false
	},
	_id:"webix_f_id",
	on_click:{
		webix_property_check:function(ev){
			var id = this.locate(ev);
			this.getItem(id).value = !this.getItem(id).value;
			this.callEvent("onCheck",[id, this.getItem(id).value]);
			return false;
		}
	},
	on_dblclick:{
	},
	registerType:function(name, data){
		if (data.template)
			this.on_render[name] = data.template;
		if (data.editor)
			this.on_edit[name] = data.editor;
		if (data.click)
			for (var key in data.click)
				this.on_click[key] = data.click[key];
	},
    elements_setter:function(data){
        this._idToLine = {};
        for(var i =0; i < data.length; i++){
            var line = data[i];
            if (line.type == "multiselect")
            	line.optionslist = true;

            //line.type 	= 	line.type||"label";
            line.id 	=	line.id||webix.uid();
            line.label 	=	line.label||"";
            line.value 	=	line.value||"";
            this._idToLine[line.id] = i;
            this.template = this._map_options(data[i]);
        }
        return data;
    },
	showItem:function(id){
		webix.RenderStack.showItem.call(this, id);
	},
	locate:function(e){
		return webix.html.locate(arguments[0], this._id);
	},
	getItemNode:function(id){
		return this._dataobj.childNodes[this._idToLine[id]];
	},
	getItem:function(id){
		return this._settings.elements[this._idToLine[id]];
	},
	_get_editor_type:function(id){
		var type = this.getItem(id).type;
		if (type == "checkbox") return "inline-checkbox";
		var alter_type = this.on_edit[type];
		return (alter_type === false)?false:(alter_type||type);
	},
	_get_edit_config:function(id){
		return this.getItem(id);
	},
	_find_cell_next:function(start, check , direction){
		var row = this._idToLine[start.id];
		var order = this._settings.elements;
		
		if (direction){
			for (var i=row+1; i<order.length; i++){
				if (check.call(this, order[i].id))
					return order[i].id;
			}
		} else {
			for (var i=row-1; i>=0; i--){
				if (check.call(this, order[i].id))
					return order[i].id;
			}
		}

		return null;
	},
	updateItem:function(){
		this.refresh();
	},
	_cellPosition:function(id){
		var html = this.getItemNode(id);
		return {
			left:html.offsetLeft+this._settings.nameWidth, 
			top:html.offsetTop,
			height:html.firstChild.offsetHeight,
			width:this._data_width,
			parent:this._contentobj
		};
	},
	setValues:function(data, update){
		if(!update) this._clear();
		for(var key in data){
			var line = this.getItem(key);
			if (line)
				line.value = data[key];
		}
		
		this._props_dataset = data;
		this.refresh();
	},
	_onLoad:function(){
		//use setValues after data loading
		return webix.Values._onLoad.apply(this, arguments);
	},
	_clear:function(){
		var lines = this._settings.elements;
		for (var i=0; i<lines.length; i++)
			lines[i].value = "";
	},
	getValues:function(){
		var data = webix.clone(this._props_dataset||{});
		for (var i = 0; i < this._settings.elements.length; i++) {
			var line = this._settings.elements[i];
			if (line.type != "label")
				data[line.id] = line.value;
		}
		return data;
	},
	refresh:function(){
		this.render();
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this, x, y)){
			this._data_width = this._content_width - this._settings.nameWidth;
			this.render();
		}
	},
	$getSize:function(dx,dy){
		if (this._settings.autoheight){
			var count = this._settings.elements.length;
			this._settings.height = Math.max(this.type.height * count,this._settings.minHeight||0);
		}
		return webix.ui.view.prototype.$getSize.call(this, dx, dy);
	},
	_toHTML:function(){
		var html = [];
		var els = this._settings.elements;
		if (els)
			for (var i=0; i<els.length; i++){
				var data = els[i];
				if (data.css && typeof data.css == "object")
					data.css = webix.html.createCss(data.css);

				var pre = '<div webix_f_id="'+data.id+'" class="webix_property_line '+(data.css||'')+'">';
				if (data.type == "label")
					html[i] = pre+"<div class='webix_property_label_line'>"+data.label+"</div></div>";
				else {
					var render = this.on_render[data.type],
                        content;
					var post = "<div class='webix_property_label' style='width:"+this._settings.nameWidth+"px'>"+data.label+"</div><div class='webix_property_value' style='width:"+this._data_width+"px'>";
                    if(data.collection || data.options){
                        content = data.template(data, data.value);
                    }else if(data.format)
                        content = data.format(data.value);
                    else
                        content = data.value;
					if (render)
						content = render.call(this, data.value, data);
					html[i] = pre+post+content+"</div></div>";
				}
			}
		return html.join("");
	},
	type:{
		height:24,
		templateStart:webix.template(""),
		templateEnd:webix.template("</div>")
	},
	$skin: function(){
		this.type.height = webix.skin.$active.propertyItemHeight||24;
	}
}, webix.EditAbility, webix.MapCollection, webix.MouseEvents, webix.Scrollable, webix.SingleRender, webix.AtomDataLoader, webix.EventSystem, webix.ui.view);





webix.protoUI({
	name:"colorboard",
	defaults:{
		template:"<div style=\"width:100%;height:100%;background-color:{obj.val}\"></div>",
		palette:null,
		height:220,
		width:220,
		cols:12,
		rows:10,
		minLightness:0.15,
		maxLightness:1
	},
	$init:function(config){
		webix.event(this._viewobj, "click", webix.bind(function(e){
			var value = webix.html.locate(e, "webix_val");
			this.setValue(value);
			this.callEvent("onSelect", [this._settings.value, e]);
		}, this));
	},
	_findIndex:function(value){
		var pal = this._settings.palette;
		value = value.toUpperCase();
		for(var r= 0, rows= pal.length; r < rows; r++)
			for(var c= 0, cols = pal[r].length; c < cols; c++){
				if(pal[r][c].toUpperCase() == value){
					return {row:r, col:c};
				}
			}
		return null;
	},
	$setSize:function(x,y){
		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			this.render();
		}
	},
	getValue:function(){
		return this._settings.value;
	},
	_getBox:function(){
		return this._viewobj.firstChild;
	},
	setValue:function(value){
		if(!value)
			return;
		if(value.charAt(0) != "#")
			value = '#' + value;

		this._settings.value = value;
		this._drawSelection(value);

		return value;
	},
	_selectBox:null,
	_getSelectBox:function(){
		if( this._selectBox && this._selectBox.parentNode ){
			return this._selectBox;
		}else{
			var div = this._selectBox = document.createElement("div");
			div.className = "webix_color_selector";
			this._viewobj.lastChild.appendChild(div);
			return div;
		}
	},
	_drawSelection:function(value, cell){
		if(this.isVisible()){
			var left = 0, top = 0;

			if(!cell){
				var ind = this._findIndex(value);
				if(ind){
					cell = this._viewobj.lastChild.childNodes[ind.row].childNodes[ind.col];
				}
			}

			if(cell && cell.parentNode && cell.parentNode.parentNode){
				var parent = cell.parentNode;
				left = cell.offsetLeft - parent.offsetLeft ;
				top = - (this.$height - (cell.offsetTop -parent.parentNode.offsetTop )) ;
			}else{
				if (this._selectBox)
					this._selectBox.style.left = "-100px";
				return;
			}

			var div = this._getSelectBox();
			var style =  [
				"left:" + left + "px",
				"top:" + top+"px",
				"width:" + cell.style.width,
				"height:" + cell.style.height
			].join(";");

			if( typeof( div.style.cssText ) !== 'undefined' ) {
				div.style.cssText = style;
			} else {
				div.setAttribute('style',style);
			}
		}
	},


	_initPalette:function(config){
		function numToHex(n){
			return webix.color.toHex(n, 2);
		}
		function rgbToHex(r,g,b){
			return "#"+numToHex( Math.floor(r)) +numToHex( Math.floor(g)) + numToHex(Math.floor(b));
		}
		function hslToRgb(h, s, l){
			var r, g, b;
			if(!s){
				r = g = b = l; // achromatic
			}else{
				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;
				r = hue2rgb(p, q, h + 1/3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1/3);
			}

			return {r:r * 255, g:g * 255, b:b * 255};
		}
		function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if (t < 1/6)
				return p + (q - p) * 6 * t; 
			else if (t <= 1/2)
				return q;
			else if (t < 2/3) 
				return p + (q - p) * (2/3 - t) * 6;
			else
				return p;
		}

		function renderGrayBar(colCount){
			var gray = [],
				val = 255,
				step = val / colCount;

			for(var i=0; i < colCount; i++){
				val = Math.round(val > 0 ? val : 0);
				gray.push(rgbToHex(val, val, val));
				val -= step;
			}
			gray[gray.length - 1] = "#000000";
			return gray;
		}

		var colors = [];
		var colorRows = config.rows - 1;
		var colorStep = 1/config.cols;
		var lightStep = (config.maxLightness - config.minLightness)/colorRows;
		var colorRange = null;

		colors.push(renderGrayBar(config.cols));

		for(var step = 0, lt = config.minLightness; step < colorRows; step++){
			colorRange = [];
			for(var c = 0, col = 0; c < config.cols; c++ ){
				var val = hslToRgb(col, 1, lt );
				colorRange.push(rgbToHex(val.r, val.g, val.b));
				col += colorStep;
			}
			colors.push(colorRange);
			lt+=lightStep;
		}

		this._settings.palette = colors;
	},


	render:function(){
		if(!this.isVisible(this._settings.id))
			return;

		if(!this._settings.palette)
			this._initPalette(this._settings);
		var palette = this._settings.palette;

		this.callEvent("onBeforeRender",[]);
		var config = this._settings,
			itemTpl = webix.template("<div style=\"width:{obj.width}px;height:{obj.height}px;\" webix_val=\"{obj.val}\">" + (config.template||"") + "</div>"),
			data = {width: 0, height:0, val:0},
			width = this.$width,
			height =  this.$height,
			widths = [];

		var html = "<div class=\"webix_color_palette\">";

		var firstRow = (typeof palette[0] == "object") ? palette[0] : palette;
		for(var i=0; i < firstRow.length; i++){
			widths[i] = Math.floor(width/(firstRow.length - i));
			width -= widths[i];
		}

		if(typeof palette[0] == "object"){
			for(var r=0; r < palette.length; r++){
				var cellHeight = Math.floor(height/(palette.length - r));
				height -= cellHeight;
				var row = palette[r];
				html += renderRow(row, widths, cellHeight);
			}
		}else{
			html+= renderRow(palette, widths, height);
		}

		html += "</div>";
		this._viewobj.innerHTML = html;

		function renderRow(row, widths, height){
			var rowHtml = "<div class=\"webix_color_row\">";
			for(var cell = 0; cell < row.length; cell++){
				data.width = widths[cell];
				data.height = height;
				data.val = row[cell];
				rowHtml += itemTpl(data);
			}
			rowHtml += "</div>";
			return rowHtml;
		}
		this._selectBox = null;
		this.callEvent("onAfterRender",[]);
	},
	refresh:function(){ this.render(); }
}, webix.ui.view, webix.EventSystem);


webix.protoUI({
	name:"resizer",
	defaults:{
		width:7, height:7
	},
	$init:function(config){
		webix.assert(this.getParentView(), "Resizer can't be initialized outside a layout");

		var space = this.getParentView()._margin;
		
		webix.event(this._viewobj, webix.env.mouse.down, this._rsDown, this);
		webix.event(document.body, webix.env.mouse.up, this._rsUp, this);

		var dir = this._getResizeDir();

		this._rs_started = false;
		this._resizer_dir = dir;

		this._resizer_dim = (dir=="x"?"width":"height");
		
		if (dir=="x")
			config.height = 0;
		else 
			config.width = 0;

		if (space>0){
			this._viewobj.className += " webix_resizer_v"+dir;
			this._viewobj.style.marginRight = "-"+space+"px";
			if (dir == "x")	
				config.width = space;
			else
				config.height = space;
			this.$nospace = true;
		} else
			this._viewobj.className += " webix_resizer_"+dir;
		
		this._viewobj.innerHTML = "<div class='webix_resizer_content'></div>";
		if (dir == "y" && space>0) this._viewobj.style.marginBottom = "-"+(config.height||this.defaults.height)+"px";
	},
	_rsDown:function(e){
		var cells = this._getResizerCells();
		//some sibling can block resize
		if(cells){
			e = e||event;
			this._rs_started = true;
			this._rs_process = webix.html.pos(e);
			this._rsLimit = [];
			this._rsStart(e, cells[0]);
		}
	},
	_rsUp:function(){
		this._rs_started = false;
		this._rs_process = false;
	},
	_rsStart:function(e, cell){
		var dir,offset, pos,posParent,start;
		e = e||event;
		dir = this._resizer_dir;

		/*layout position:relative to place absolutely positioned elements in it*/
		this.getParentView()._viewobj.style.position = "relative";
		pos = webix.html.offset(this._viewobj);
		posParent = webix.html.offset(this.getParentView()._viewobj);
		start = pos[dir]-posParent[dir];
		offset = webix.html.offset(cell.$view)[dir]- webix.html.offset(this.getParentView().$view)[dir];

		this._rs_progress = [dir,cell, start, offset];
		/*resizer stick (resizerea ext)*/

		this._resizeStick = new webix.ui.resizearea({
			container:this.getParentView()._viewobj,
			dir:dir,
			eventPos:this._rs_process[dir],
			start:start-1,
			height: this.$height,
			width: this.$width,
			border: 1,
			margin: this.getParentView()["_padding"+dir.toUpperCase()]
		});

		/*stops resizing on stick mouseup*/
		this._resizeStick.attachEvent("onResizeEnd", webix.bind(this._rsEnd, this));
		/*needed to stop stick moving when the limit for dimension is reached*/
		this._resizeStick.attachEvent("onResize", webix.bind(this._rsResizeHandler, this));

		webix.html.addCss(document.body,"webix_noselect",1);
	},
	_getResizeDir: function(){
		return this.getParentView()._vertical_orientation?"y":"x";
	},
	_rsResizeHandler:function(){
		var cells,config,cDiff,diff,dir,i,limits,limitSizes,sizes,totalSize;
		if(this._rs_progress){
			cells = this._getResizerCells();
			dir = this._rs_progress[0];
			/*vector distance between resizer and stick*/
			diff = this._resizeStick._last_result -this._rs_progress[2];
			/*new sizes for the resized cells, taking into account the stick position*/
			sizes = this._rsGetDiffCellSizes(cells,dir,diff);
			/*sum of cells dimensions*/
			totalSize = cells[0]["$"+this._resizer_dim]+cells[1]["$"+this._resizer_dim];
			/*max and min limits if they're set*/
			limits = (dir=="y"?["minHeight","maxHeight"]:["minWidth","maxWidth"]);
			for(i=0;i<2;i++){
				config = cells[i]._settings;
				cDiff = (i?-diff:diff);/*if cDiff is positive, the size of i cell is increased*/
				/*if size is bigger than max limit or size is smaller than min limit*/
				var min = config[limits[0]];
				var max = config[limits[1]];

				if(cDiff>0&&max&&max<=sizes[i] || cDiff<0&&(min||3)>=sizes[i]){
					this._rsLimit[i] = (cDiff>0?max:(min||3));
					/*new sizes, taking into account max and min limits*/
					limitSizes = this._rsGetLimitCellSizes(cells,dir);
					/*stick position*/
					this._resizeStick._dragobj.style[(dir=="y"?"top":"left")] = this._rs_progress[3] + limitSizes[0]+"px";
					return;
				}else if(sizes[i]<3){/*cells size can not be less than 1*/
					this._resizeStick._dragobj.style[(dir=="y"?"top":"left")] = this._rs_progress[3] + i*totalSize+1+"px";
				}else{
					this._rsLimit[i] = null;
				}
			}
		}
	},
	_getResizerCells:function(){
		var cells,i;
		cells = this.getParentView()._cells;
		for(i=0; i< cells.length;i++){
			if(cells[i]==this){
				if (!cells[i-1] || cells[i-1]._settings.$noresize) return null;
				if (!cells[i+1] || cells[i+1]._settings.$noresize) return null;
				return [cells[i-1],cells[i+1]];
			}
		}
	 },
	_rsEnd:function(result){
		if (typeof result == "undefined") return;

		var cells,dir,diff,i,size;
		var vertical = this.getParentView()._vertical_orientation;
		this._resizerStick = null;
		if (this._rs_progress){
			dir = this._rs_progress[0];
			diff = result-this._rs_progress[2];
			cells = this._getResizerCells();
			if(cells[0]&&cells[1]){
				/*new cell sizes*/
				size = this._rsGetCellSizes(cells,dir,diff);
				for (var i=0; i<2; i++){
					//cell has not fixed size, of fully fixed layout
					var cell_size = cells[i].$getSize(0,0);
					if (vertical?(cell_size[2] == cell_size[3]):(Math.abs(cell_size[1]-cell_size[0])<3)){
						/*set fixed sizes for both cells*/
						cells[i]._settings[this._resizer_dim]=size[i];
						if (cells[i]._bubble_size)
							cells[i]._bubble_size(this._resizer_dim, size[i], vertical);
					} else {
						var actualSize = cells[i].$view[vertical?"offsetHeight":"offsetWidth"];//cells[i]["$"+this._resizer_dim];
						cells[i]._settings.gravity = size[i]/actualSize*cells[i]._settings.gravity;
					}
				}

				cells[0].resize();

				for (var i = 0; i < 2; i++)
					if (cells[i].callEvent)
						cells[i].callEvent("onViewResize",[]);
				webix.callEvent("onLayoutResize", [cells]);
			}
			this._rs_progress = false;
		}
		this._rs_progress = false;
		this._rs_started = false;
		this._rsLimit = null;
		webix.html.removeCss(document.body,"webix_noselect");
	},
	_rsGetLimitCellSizes: function(cells){
		var size1,size2,totalSize;
		totalSize = cells[0]["$"+this._resizer_dim]+cells[1]["$"+this._resizer_dim];
		if(this._rsLimit[0]){
			size1 = this._rsLimit[0];
			size2 = totalSize-size1;
		}
		else if(this._rsLimit[1]){
			size2 = this._rsLimit[1];
			size1 = totalSize-size2;
		}
		return [size1,size2];
	},
	_rsGetDiffCellSizes:function(cells,dir,diff){
		var sizes =[];
		for(var i=0;i<2;i++)
			sizes[i] = cells[i]["$"+this._resizer_dim]+(i?-1:1)*diff;
		return sizes;
	},
	_rsGetCellSizes:function(cells,dir,diff){
		var i,sizes,totalSize;
		/*if max or min dimentsions are set*/
		if(this._rsLimit[0]||this._rsLimit[1]){
			sizes = this._rsGetLimitCellSizes(cells,dir);
		}
		else{
			sizes = this._rsGetDiffCellSizes(cells,dir,diff);
			for(i =0; i<2;i++ ){
				/*if stick moving is stopped outsize cells borders*/
				if(sizes[i]<0){
					totalSize = sizes[0]+sizes[1];
					sizes[i] =1;
					sizes[1-i] = totalSize-1;
				}
			}

		}
		return sizes;
	}
}, webix.MouseEvents, webix.ui.view);



webix.protoUI({
	name:"multiview",
	defaults:{
		animate:{
		}
	},
	setValue:function(val){
		webix.$$(val).show();
	},
	getValue:function(){
		return this.getActiveId();
	},
	$init:function(){
		this._active_cell = 0;
		this._vertical_orientation = 1;
		this._viewobj.style.position = "relative";
		this._viewobj.className += " webix_multiview";
		this._back_queue = [];
	},
	_ask_render:function(cell_id, view_id){
		var cell = webix.$$(cell_id);
		if (!cell._render_hash){
			cell._render_queue = [];
			cell._render_hash = {};			
		}
		if (!cell._render_hash[view_id]){
			cell._render_hash[view_id]=true;
			cell._render_queue.push(view_id);
		}
	},
	_render_activation:function(cell_id){ 
		var cell = webix.$$(cell_id);
		if(this._settings.keepViews)
			cell._viewobj.style.display = "";
		/*back array*/
		if(this._back_queue[this._back_queue.length-2]!=cell_id){
			if(this._back_queue.length==10)
				this._back_queue.splice(0,1);
			this._back_queue.push(cell_id);
		}
		else 
			this._back_queue.splice(this._back_queue.length-1,1);	
		
		if (cell._render_hash){
			for (var i=0; i < cell._render_queue.length; i++)
				webix.$$(cell._render_queue[i]).render();
				
			cell._render_queue = [];
			cell._render_hash = {};			
		}
	},
	addView:function(){
		var id = webix.ui.baselayout.prototype.addView.apply(this, arguments);
		webix.html.remove(webix.$$(id).$view);
		return id;
	},
	_beforeRemoveView:function(index, view){
		//removing current view
		if (index == this._active_cell){
			var next = Math.max(index-1, 1);
			if (this._cells[next])
				this._show(this._cells[next], false);
		}
		
		if (index < this._active_cell)
			this._active_cell--;
	},
	//necessary, as we want to ignore hide calls for elements in multiview
	_hide:function(){},
	_parse_cells:function(collection){
		collection = collection || this._collection; 

		for (var i=0; i < collection.length; i++)
			collection[i]._inner = this._settings.borderless?{top:1, left:1, right:1, bottom:1}:(this._settings._inner||{});
			
		webix.ui.baselayout.prototype._parse_cells.call(this, collection);
		
		for (var i=1; i < this._cells.length; i++){
			if(this._settings.keepViews)
				this._cells[i]._viewobj.style.display = "none";
			else
				webix.html.remove(this._cells[i]._viewobj);
		}

			
		for (var i=0; i<collection.length; i++){
			var cell = this._cells[i];
			if (cell._cells && !cell._render_borders) continue; 
			
			var _inner = cell._settings._inner;
			if (_inner.top) 
				cell._viewobj.style.borderTopWidth="0px";
			if (_inner.left) 
				cell._viewobj.style.borderLeftWidth="0px";
			if (_inner.right) 
				cell._viewobj.style.borderRightWidth="0px";
			if (_inner.bottom) 
				cell._viewobj.style.borderBottomWidth="0px";
		}
		this._render_activation(this.getActiveId());
	},
	cells_setter:function(value){
		webix.assert(value && value.length,"Multiview must have at least one view in 'cells'");
		this._collection = value;
	},
	_getDirection:function(next, active){
		var dir = (this._settings.animate || {}).direction;
		var vx = (dir == "top" || dir == "bottom");
		return 	 next < active ? (vx?"bottom":"right"):(vx?"top":"left");
	},
	_show:function(obj, animation_options){

		var parent = this.getParentView();
		if (parent && parent.getTabbar)
			parent.getTabbar().setValue(obj._settings.$id || obj._settings.id);

		 if (this._in_animation)
			return webix.delay(this._show, this,[obj, animation_options],100);

		var _next_cell = -1;
		for (var i=0; i < this._cells.length; i++)
			if (this._cells[i]==obj){
				_next_cell = i;
				break;
			}
		if (_next_cell < 0 || _next_cell == this._active_cell)
			return;


		var prev = this._cells[this._active_cell];
		var next = this._cells[ _next_cell ];
		var size = prev.$getSize(0,0);

		//need to be moved in animate
		if((animation_options||typeof animation_options=="undefined")&&webix.animate.isSupported() && this._settings.animate) {
			var aniset = webix.extend({}, this._settings.animate);
			if(this._settings.keepViews)
				aniset.keepViews = true;
        	aniset.direction = this._getDirection(_next_cell,this._active_cell);
        	aniset = webix.Settings._mergeSettings(animation_options||{}, aniset);

			var line = webix.animate.formLine(
				next._viewobj,
                prev._viewobj,
				aniset);
			next.$getSize(0,0);
			next.$setSize(this._content_width,this._content_height);

			var callback_original = aniset.callback;
			aniset.callback = function(){
				webix.animate.breakLine(line,this._settings.keepViews);
				this._in_animation = false;
				if (callback_original) callback_original.call(this);
				callback_original = aniset.master = aniset.callback = null;
				this.resize();
			};
			aniset.master = this;

			this._active_cell = _next_cell;
			this._render_activation(this.getActiveId());

			webix.animate(line, aniset);
			this._in_animation = true;
		}
		else { // browsers which don't support transform and transition
			if(this._settings.keepViews){
				prev._viewobj.style.display = "none";
			}
			else{
				webix.html.remove(prev._viewobj);
				this._viewobj.appendChild(this._cells[i]._viewobj);
			}

			this._active_cell = _next_cell;

			prev.resize();
			this._render_activation(this.getActiveId());
		}

		if (next.callEvent){
			next.callEvent("onViewShow",[]);
			webix.ui.each(next, this._signal_hidden_cells);
		}

		this.callEvent("onViewChange",[prev._settings.id, next._settings.id]);
		
	},
	$getSize:function(dx, dy){
		webix.debug_size_box_start(this, true);
		
		var size = this._cells[this._active_cell].$getSize(0, 0);
		if (this._settings.fitBiggest){
			for (var i=0; i<this._cells.length; i++)
				if (i != this._active_cell){
					var other = this._cells[i].$getSize(0, 0);
					for (var j = 0; j < 4; j++)
						size[j] = Math.max(size[j], other[j]);
				}
		}
		
		
		//get layout sizes
		var self_size = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
		//use child settings if layout's one was not defined
		if (self_size[1] >= 100000) self_size[1]=0;
		if (self_size[3] >= 100000) self_size[3]=0;

		self_size[0] = (self_size[0] || size[0] ) +dx;
		self_size[1] = (self_size[1] || size[1] ) +dx;
		self_size[2] = (self_size[2] || size[2] ) +dy;
		self_size[3] = (self_size[3] || size[3] ) +dy;
		
		webix.debug_size_box_end(this, self_size);
		
		return self_size;
	},
	$setSize:function(x,y){
		this._layout_sizes = [x,y];
		webix.ui.baseview.prototype.$setSize.call(this,x,y);
		this._cells[this._active_cell].$setSize(x,y);
	},
	isVisible:function(base_id, cell_id){
		if (cell_id && cell_id != this.getActiveId()){
			if (base_id)
				this._ask_render(cell_id, base_id);
			return false;
		}
		return webix.ui.view.prototype.isVisible.call(this, base_id, this._settings.id);
	},
	getActiveId:function(){
		return this._cells.length?this._cells[this._active_cell]._settings.id:null;
	},
	back:function(step){		
		step=step||1;
		if(this.callEvent("onBeforeBack",[this.getActiveId(), step])){
			if(this._back_queue.length>step){
				var viewId = this._back_queue[this._back_queue.length-step-1];
				webix.$$(viewId).show();
				return viewId;
			}
			return null;
		}
		return null;

	}
},webix.ui.baselayout);





webix.protoUI({
	name:"form",
	defaults:{
		type:"form",
		autoheight:true
	},
	_default_height:-1,
	_form_classname:"webix_form",
	_form_vertical:true,
	$getSize:function(dx, dy){
		if (this._scroll_y && !this._settings.width) dx += webix.ui.scrollSize;

		var sizes = webix.ui.layout.prototype.$getSize.call(this, dx, dy);

		if (this._settings.scroll || !this._settings.autoheight){
			sizes[2] =  this._settings.height || this._settings.minHeight || 0;
			sizes[3] += 100000;
		}
		
		return sizes;
	}
}, webix.ui.toolbar);




webix.protoUI({
	name:"multiselect",
	$cssName:"richselect",
	defaults:{
        separator:","
	},
	_suggest_config:function(value){
		var isobj = !webix.isArray(value) && typeof value == "object" && !value.name; 
		var suggest = { view:"checksuggest", separator:this.config.separator, buttonText: this.config.buttonText, button: this.config.button };

		if (this._settings.optionWidth)
			suggest.width = this._settings.optionWidth;
		else
			suggest.fitMaster = true;

		if (isobj)
			webix.extend(suggest, value, true);

		var view = webix.ui(suggest);
		var list = view.getList();
		if (typeof value == "string")
			list.load(value);
		else if (!isobj)
			list.parse(value);

		view.attachEvent("onBeforeShow",function(node,mode, point){
			this.setValue(webix.$$(this._settings.master).config.value);
		});

		return view;
	},

	$setValue:function(value){
		if (!this._rendered_input) return;
		var popup = this.getPopup();
		this.getInputNode().innerHTML = popup ? popup.setValue(value) : "";
	},
	getValue:function(){
		return this._settings.value||"";
	}
}, webix.ui.richselect);

webix.editors.multiselect = webix.extend({
	popupType:"multiselect"	
}, webix.editors.richselect);

webix.type(webix.ui.list, {
	name:"multilist",
	templateStart:webix.template('<div webix_l_id="#!id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden;">')
}, "default");

webix.type(webix.ui.list, {
	name:"checklist",
	templateStart:webix.template('<div webix_l_id="#!id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden; white-space:nowrap;">{common.checkbox()}'),
	checkbox: function(obj){
		var icon = obj.$checked?"fa-check-square":"fa-square-o";
		return "<span class='webix_icon "+icon+"'></span>";
	},
	template: webix.template("#value#")
}, "default");


webix.protoUI({
	name:"multisuggest",
	defaults:{
		separator:",",
		type:"layout",
		button:true,
		width:0,
		filter:function(item,value){
			var itemText = this.getItemText(item.id);
			return (itemText.toString().toLowerCase().indexOf(value.toLowerCase())>-1);
		},
		body:{
			rows:[
				{ view:"list", type:"multilist", borderless:true,  autoheight:true, yCount:5, multiselect:"touch", select:true,
				  on:{
					onItemClick: function(id){
						var popup = this.getParentView().getParentView();
						webix.delay(function(){
							webix.$$(popup._settings.master).setValue(popup.getValue());
						});
					}
				}},
				{ view:"button", click:function(){
					var suggest = this.getParentView().getParentView();
					suggest.setMasterValue({ id:suggest.getValue() });
					suggest.hide();
				}}
			]
		}
	},
	_get_extendable_cell:function(obj){
		return obj.rows[0];
	},
	_set_on_popup_click:function(){
		var button = this.getButton();
		var text = (this._settings.button?(this._settings.buttonText || webix.i18n.controls.select):0);
		if(button){
			if(text){
				button._settings.value = text;
				button.refresh();
			}
			else
				button.hide();
		}
	},
	getButton:function(){
		return this.getBody().getChildViews()[1];
	},
	getList:function(){
		return this.getBody().getChildViews()[0];
	},
	setValue:function(value){
		var text = [];
		var list = this.getList();
		list.unselect();

		if (value){
			if (typeof value == "string")
				value = value.split(this.config.separator);
				
			if (value[0]){
				for (var i = 0; i < value.length; i++){
					if (list.exists(value[i])){
						list.select(value[i], true);
						text.push(this.getItemText(value[i]));
					}
				}
			}
		}

		return text.join(this.config.separator+" ");
	},
	getValue:function(){
		return this.getList().getSelectedId(true).sort().join(this.config.separator);
	}
}, webix.ui.suggest);

webix.protoUI({
	name:"checksuggest",
	defaults:{
		button:false,
		body:{
			rows:[
				{ view:"list",  css:"webix_multilist", borderless:true, autoheight:true, yCount:5, select: true,
					type:"checklist",
					on:{
						onItemClick: function(id){
							var item = this.getItem(id);
							item.$checked = item.$checked?0:1;
							this.refresh(id);
							var popup = this.getParentView().getParentView();
							webix.$$(popup._settings.master).setValue(popup.getValue());
						}
					}
				},
				{ view:"button", click:function(){
					var suggest = this.getParentView().getParentView();
					suggest.setMasterValue({ id:suggest.getValue() });
					suggest.hide();
				}}
			]
		}
	},
	_enter_key: function(popup,list) {
		if (list.count && list.count()){
			if (popup.isVisible()) {
				var value = list.getSelectedId(false, true);
				if(value){
					list.getItem(value).$checked = list.getItem(value).$checked?0:1;
					value = this.getValue();
					var master = webix.$$(this._settings.master);
					master._inputValue = "";
					master.setValue(value);
					master.getInputNode().value = "";
				}
				popup.hide(true);
			} else {
				popup.show(this._last_input_target);
			}
		} else {
			if (popup.isVisible())
				popup.hide(true);
		}
	},
	setValue:function(value){
		var i,
			list = this.getList(),
			text = [],
			values = {},
			changed = [];

		value = value || [];
		if (typeof value == "string")
			value = value.split(this.config.separator);

		for ( i = 0; i < value.length; i++){
			values[value[i]] = 1;
		}

		list.data.each(function(item){
			if(item.$checked){
				if(!values[item.id]){
					item.$checked = 0;
					changed.push(item.id);
				}
			}
			else{
				if(values[item.id]){
					item.$checked = 1;
					changed.push(item.id);
				}
			}
			if(item.$checked)
				text.push(this.getItemText(item.id));
		},this,true);

		for( i=0; i < changed.length; i++ ){
			list.refresh(changed[i]);
		}

		return text.join(this.config.separator+" ");
	},
	getValue:function(){
		var values = [];
		this.getList().data.each(function(item){
			if(item.$checked){
				values.push(item.id);
			}
		},this,true);
		return values.sort().join(this.config.separator);
	},
	_preselectMasterOption: function(){}
}, webix.ui.multisuggest);

webix.protoUI({
	name:"multicombo",
	$cssName:"text",
	defaults:{
		separator:",",
		icon: false,
		iconWidth: 0,
		template:function(obj,common){
			return common._render_value_block(obj, common);
		}
	},
	$init:function(){
		this.$view.className += " webix_multicombo";

		this.attachEvent("onBlur", webix.bind(function(e){
			this._inputValue = "";
			this.refresh();
		},this));

		this.attachEvent("onBeforeRender",function(){
			if(!this._inputHeight)
				this._inputHeight = this.config.aheight;
			return true;
		});
		this.attachEvent("onAfterRender", function(){
			this._last_size = null;
		});
	},
	on_click: {
		"webix_multicombo_delete": function(e,view,node){
			var value;
			if(node && (value = node.parentNode.getAttribute("value")))
				this._removeValue(value);
			return false;
		}
	},
	_removeValue: function(value){
		var v = webix.toArray(this._settings.value.split(this._settings.separator));
		v.remove(value);
		this.setValue(v.join(this._settings.separator));
	},
	_suggest_config:function(value){
		var isObj = !webix.isArray(value) && typeof value == "object" && !value.name,
			suggest = { view:"checksuggest", separator:this.config.separator, buttonText: this.config.buttonText, button: this.config.button },
			combo = this;

		if (this._settings.optionWidth)
			suggest.width = this._settings.optionWidth;

		if (isObj)
			webix.extend(suggest, value, true);

		var view = webix.ui(suggest);
		if(!this._settings.optionWidth)
			view.$customWidth = function(node){
				this.config.width = combo._get_input_width(combo._settings);
			};
		view.attachEvent("onBeforeShow",function(node,mode, point){
			this.setValue(webix.$$(this._settings.master).config.value);
			if(node.tagName && node.tagName.toLowerCase() == "input"){
				webix.ui.popup.prototype.show.apply(this, [node.parentNode,mode, point]);
				return false;
			}
		});
		var list = view.getList();
		if (typeof value == "string")
			list.load(value);
		else if (!isObj)
			list.parse(value);

		return view;
	},
	_render_value_block:function(obj, common){

		var id = obj.id || webix.uid();
		var width = common._get_input_width(obj);
		var inputAlign = obj.inputAlign || "left";

		var height = this._inputHeight - 2*webix.skin.$active.inputPadding -2;
		var text = (obj.text||obj.value||this._get_div_placeholder(obj));
		var value = obj.value;

		var list = "<ul class='webix_multicombo_listbox' style='line-height:"+height+"px'></ul>";
		var input = "<input type='text' class='webix_multicombo_input' style='width: "+Math.min(width,(common._inputWidth||7))+"px;height:"+height+"px;max-width:"+(width-20)+"px' value='"+(common._inputValue||"")+"'/>";
		var html = "<div class='webix_inp_static' tabindex='0' onclick='' style='line-height:"+height+"px;width: " + width + "px;  text-align: " + inputAlign + ";height:auto' >"+list+input +"</div>";

		var inputAlign = (obj.inputAlign||"left");
		id = id || obj.name || webix.uid();

		var label = common.$renderLabel(obj,id);


		html +=	"</div>";

		if (top)
			return label+"<div class='webix_el_box' style='width:"+this._settings.awidth+"px; '>"+html+"</div>";
		else
			return "<div class='webix_el_box' style='width:"+this._settings.awidth+"px; min-height:"+this._settings.aheight+"px;'>"+label+html+"</div>";

	},
	_getValueListBox: function(){
		return this._getBox().getElementsByTagName("UL")[0];
	},
	_set_inner_size: function(){
		var popup = this.getPopup();
		if(popup){
			var text = (popup ? popup.setValue(this._settings.value) : "");
			var html = "";
			var listbox = this._getValueListBox();
			if(text){

				var values = this._settings.value.split(this._settings.separator);
				var textArr = text.split(this._settings.separator);

				var height = this._inputHeight - 2*webix.skin.$active.inputPadding - 8;
				for(var i=0; i < textArr.length;i++){
					var content = "<span>"+textArr[i]+"</span><span class='webix_multicombo_delete'>x</span>";
					html += "<li class='webix_multicombo_value' style='line-height:"+height+"px;' value='"+values[i]+"'>"+content+"</li>";
				}
			}

			listbox.innerHTML = html;
		}
		this._resizeToContent();
	},
	_focusAtEnd: function(inputEl){
		if (inputEl && inputEl.value.length){
			if (inputEl.createTextRange){
				var FieldRange = inputEl.createTextRange();
				FieldRange.moveStart('character',inputEl.value.length);
				FieldRange.collapse();
				FieldRange.select();
			}else if (inputEl.selectionStart || inputEl.selectionStart == '0') {
				var elemLen = inputEl.value.length;
				inputEl.selectionStart = elemLen;
				inputEl.selectionEnd = elemLen;
				inputEl.focus();
			}
		}else{
			inputEl.focus();
		}
	},
	_resizeToContent: function(){
		var top = this._settings.labelPosition == "top";
		var inputHeight = Math.max(this._getBox().firstChild.offsetHeight+ 2*webix.skin.$active.inputPadding, this._inputHeight)+ (top?this._labelTopHeight:0);
		var sizes = this.$getSize(0,0);
		if(inputHeight != sizes[2]){
			this._calcHeight = this._getBox().firstChild.offsetHeight + (top?this._labelTopHeight:0);
			var topView =this.getTopParentView();
			clearTimeout(topView._template_resize_timer);
			topView._template_resize_timer = webix.delay(function(){
				this.config.height = this._calcHeight + 2*webix.skin.$active.inputPadding;
				this.resize();
				if(this._typing){
					this._focusAtEnd(this.getInputNode());
					this._typing = false;
				}
				if(this.getPopup().isVisible()||this._typing)
					this.getPopup().show(this._getBox().firstChild);
			}, this);
		}
	},
	getInputNode: function(){
		return this._getBox().getElementsByTagName("INPUT")[0];
	},
	$setValue:function(){
		this._set_inner_size();
	},
	getValue:function(){
		return this._settings.value;
	},
	_calcInputWidth: function(value){
		var tmp = document.createElement("span");
		tmp.className = "webix_multicombo_input";
		tmp.style.visibility = "visible";
		tmp.style.height = "0px";
		tmp.innerHTML = value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		document.body.appendChild(tmp);
		var width = tmp.offsetWidth+10;
		document.body.removeChild(tmp);
		return width;
	},
	_init_onchange:function(){

		// input focus and focus styling
		webix.event(this._getBox(),"click",function(){
			this.getInputNode().focus();
		},this);
		webix.event(this.getInputNode(),"focus",function(){
			if(this._getBox().className.indexOf("webix_focused") == -1)
				this._getBox().className += " webix_focused";

		},this);
		webix.event(this.getInputNode(),"blur",function(){
			this._getBox().className = this._getBox().className.replace(" webix_focused","");
		},this);

		// need for clear click ("x") in IE
		webix.event(this.getInputNode(),"input",function(){
			if(!this.getInputNode().value && this._inputValue){
				this.getInputNode().style.width = "20px";
				this._inputWidth = 20;
				this._inputValue = "";
				this._typing = true;
				this.getPopup().show(this._getBox().firstChild);
				this._resizeToContent();
			}
		},this);
		// resize
		webix.event(this.getInputNode(),"keyup",function(){
			var inp = this.getInputNode();
			var width = this._calcInputWidth(inp.value)+10;
			inp.style.width = width +"px";
			if(width!=this._inputWidth){
				this._inputWidth = width;
				this._inputValue = inp.value;
				this._typing = true;
				this.getPopup().show(this._getBox().firstChild);
				this._resizeToContent();
			}

		},this);

		// remove the last value on Backspace click
		webix.event(this.getInputNode(),"keydown",function(e){
			if (this.isVisible()){
				e = (e||event);
				var node = this._getValueListBox().lastChild;
				if(e.keyCode == 8 && node){
					if(!this.getInputNode().value && ((new Date()).valueOf() - (this._backspaceTime||0) > 500)){
						this._typing = true;
						this._removeValue(node.getAttribute("value"));
					}
					else{
						this._backspaceTime = (new Date()).valueOf();
					}
				}

			}
		},this);
		webix.$$(this._settings.suggest).linkInput(this);
	}
}, webix.ui.richselect);





webix.protoUI({
	name:"menu",
	_listClassName:"webix_menu",
	$init:function(){
		this.data.attachEvent('onStoreUpdated', webix.bind(function(){
			this._hide_sub_menu();
		},this));
		this.attachEvent('onMouseMove', this._mouse_move_menu);
		this.attachEvent('onMouseOut',function(){
			if (this._menu_was_activated() && this._settings.openAction == "click") return;
			if (!this._child_menu_active)
				this._hide_sub_menu();
		});
		this.attachEvent('onItemClick', function(id, e, trg){
			var item = this.getItem(id);
			if (item){
				if (item.$template) return;

				var parent = this.getTopMenu();

				//ignore disabled items
				if (!this.data.getMark(id, "webix_disabled")){
					if (!parent.callEvent("onMenuItemClick", [id, e, trg])){
						e.showpopup = true;
						return;
					}

					if (this != parent)
						parent._call_onclick(id,e,trg);

					//click on group - do not close submenus
					if (!item.submenu){
						parent._hide_sub_menu(true);
						if (parent._hide_on_item_click)
							parent.hide();
					} else {
						if ((this === parent || webix.env.touch ) && parent._settings.openAction == "click"){
							this._mouse_move_activation(id, trg);
						}

						//do not close popups when clicking on menu folder
						e.showpopup = true;
					}
				}
			}
		});

		this.data.attachEvent("onClearAll", function(){
			this._hidden_items = [];
		});
		this.data._hidden_items = [];
	},
	getTopMenu:function(){
		var parent = this;
		while (parent._parent_menu)
			parent = webix.$$(parent._parent_menu);
		return parent;
	},
	_auto_height_calc:function(count){
		if (this._settings.autoheight) count = this.count();

		var height = 0;
		for (var i=0; i<count; i++){
			var item = this.data.pull[this.data.order[i]];
			if (item && item.$template == "Separator")
				height+=4;
			else
				height+=this.type.height;
		}
		return height;
	},
	on_mouse_move:{},
	type:{ 
		css:"menu",
		width:"auto",
		templateStart:function(obj, common, mark){
	        if (obj.$template === "Separator" || obj.$template === "Spacer"){
				return '<div webix_l_id="#id#" class="webix_context_'+obj.$template.toLowerCase()+'">';
			}
			var link = (obj.href?" href='"+obj.href+"' ":"")+(obj.target?" target='"+obj.target+"' ":"");
			return webix.ui.list.prototype.type.templateStart(obj,common,mark).replace(/^<div/,"<a "+link)+((obj.submenu && common.subsign)?"<div class='webix_submenu_icon'></div>":"");
		},
		templateEnd: function(obj, common, mark){
			return (obj.$template === "Separator" || obj.$template === "Spacer")?"</div>":"</a>";
		},
		templateSeparator:webix.template("<div class='sep_line'></div>"),
		templateSpacer:webix.template("<div></div>")
	},
	getMenu: function(id){
		if (!this.data.pull[id]){
			for (var subid in this.data.pull){
				var obj = this.getItem(subid);
				if (obj.submenu){
					var search = this._get_submenu(obj).getMenu(id);
					if (search) return search;
				}
			}
		} else return this;
	},
	getSubMenu:function(id){
		var menu = this.getMenu(id);
		var obj = menu.getItem(id);
		return (obj.submenu?menu._get_submenu(obj):null);
	},
	getMenuItem:function(id){
		return this.getMenu(id).getItem(id);
	},
	_get_submenu:function(data){
		var sub  = webix.$$(data.submenu);
		if (!sub){
			data.submenu = this._create_sub_menu(data);
			sub = webix.$$(data.submenu);
		}
		return sub;
	},
	_mouse_move_menu:function(id, e, target){
		if (!this._menu_was_activated())
			return;

		this._mouse_move_activation(id, target);
	},
	_menu_was_activated:function(){
		var top = this.getTopMenu();
		if (top._settings.openAction == "click"){
			if (webix.env.touch) return false;
			var sub = top._open_sub_menu;
			if (sub && webix.$$(sub).isVisible())
				return true;
			return false;
		}
		return true;
	},
	_mouse_move_activation:function(id, target){
		var data = this.getItem(id);
		if (!data) return;
		
		//clear flag of submenu usage
		this._child_menu_active = null;

		//hide previously opened sub-menu
		if (this._open_sub_menu && data.submenu != this._open_sub_menu)
			this._hide_sub_menu(true);
			
		//show submenu
		if (data.submenu&&!this.config.hidden){

			var sub  = this._get_submenu(data);
			if(this.data.getMark(id,"webix_disabled"))
				return;

			sub.show(target,{ pos:this._settings.subMenuPos });

			sub._parent_menu = this._settings.id;

			this._open_sub_menu = data.submenu;
		}
	},
	disableItem:function(id){
		this.getMenu(id).addCss(id, "webix_disabled");
	},
	enableItem:function(id){
		this.getMenu(id).removeCss(id, "webix_disabled");
	},
	_set_item_hidden:function(id, state){
		var menu = this.data;
		if (menu._hidden_items[id] != state){
			menu._hidden_items[id] = state;
			menu.filter(function(obj){
				return !menu._hidden_items[obj.id];
			});
			this.resize();		
		}
	},
	hideItem:function(id){
		var menu = this.getMenu(id);
		if (menu) menu._set_item_hidden(id, true);
	},
	showItem:function(id){
		var menu = this.getMenu(id);
		if (menu){
			menu._set_item_hidden(id, false);
			return webix.ui.list.prototype.showItem.call(menu, id);
		}
	},
	_hide_sub_menu : function(mode){
		if (this._open_sub_menu){
			//recursive sub-closing
			var sub = webix.$$(this._open_sub_menu);
			if (sub._hide_sub_menu)	//custom context may not have submenu
				sub._hide_sub_menu(mode);
			if (mode || !sub._show_on_mouse_out){
				sub.hide();
				this._open_sub_menu = null;
			}
		}
	},
	_create_sub_menu : function(data){
		var listConfig = {
			view:"submenu",
			data:data.submenu
		};

		var settings = this.getTopMenu()._settings.submenuConfig;
		if (settings)
			webix.extend(listConfig, settings, true);

		var parentData = this.getMenuItem(data.id);
		if(parentData && parentData.config)
			webix.extend(listConfig, parentData.config, true);

		var menu = webix.ui(listConfig);
		return menu._settings.id;
	},
	$skin:function(){
		webix.ui.list.prototype.$skin.call(this);
		this.type.height = webix.skin.$active.menuHeight;
	},
	defaults:{
		scroll:"",
		layout:"x",
		mouseEventDelay:100,
		subMenuPos:"bottom"
	}
}, webix.ui.list);


webix.protoUI({
	name:"submenu",
	$init:function(){
		this._body_cell = webix.clone(this._dummy_cell_interface);
		this._body_cell._view = this;

		this.attachEvent('onMouseOut',function(){
			if (this.getTopMenu()._settings.openAction == "click") 
				return;
			if (!this._child_menu_active && !this._show_on_mouse_out)
				this.hide();
		});

		//inform parent that focus is still in menu
		this.attachEvent('onMouseMoving',function(){
			if (this._parent_menu)
				webix.$$(this._parent_menu)._child_menu_active = true;
		});

	},
	$skin:function(){
		webix.ui.menu.prototype.$skin.call(this);
		webix.ui.popup.prototype.$skin.call(this);

		this.type.height = webix.skin.$active.menuHeight;
	},
	_dummy_cell_interface : {
		$getSize:function(dx, dy){
			//we saving height and width, as list can hardcode new values
			var h = this._view._settings.height*1;
			var w = this._view._settings.width*1;
			var size = webix.ui.menu.prototype.$getSize.call(this._view, dx, dy);
			//restoring
			this._view._settings.height = h;
			this._view._settings.width = w;
			return size;
		},
		$setSize:function(x,y){
			if (this._view._settings.scroll)
				this._view._bodyobj.style.height = y+"px";
		},
		destructor:function(){ this._view = null; }
	},
	//ignore body element
	body_setter:function(){
	},
	defaults:{
		width:150,
		subMenuPos:"right",
		layout:"y",
		autoheight:true
	},
	type:{
		height: webix.skin.menuHeight,
		subsign:true
	}
}, webix.ui.menu, webix.ui.popup);




webix.ContextHelper = {
	defaults:{
		padding:"4",
		hidden:true
	},
	body_setter:function(value){
		value = webix.ui.window.prototype.body_setter.call(this, value);
		this._body_cell._viewobj.style.borderWidth = "0px";
		return value;
	},
	attachTo:function(obj){
		webix.assert(obj, "Invalid target for Context::attach");
		if (obj.on_context)
			obj.attachEvent("onAfterContextMenu", webix.bind(this._show_at_ui, this));
		else 
			webix.event(obj, "contextmenu", this._show_at_node, this);
	},
	getContext:function(){
		return this._area;
	},
	_show_at_node:function(e){

		this._area = webix.toNode(e||event);
		return this._show_at(e);
	},
	_show_at_ui:function(id, e, trg){
		this._area = { obj:webix.$$(e), id:id };
		return this._show_at(e);
	},
	_show_at:function(e){
		var result = this.show(e, null, true);
		//event forced to close other popups|context menus
		webix.callEvent("onClick", [e]);
		
		return (result === false?false:webix.html.preventEvent(e));
	},
	_show_on_mouse_out:true,
	master_setter:function(value){
		this.attachTo(value);
		return null;
	}
};
webix.protoUI({
	name:"context"
}, webix.ContextHelper, webix.ui.popup); 

webix.protoUI({
	name:"contextmenu",
	_hide_on_item_click:true,
	$init: function(config){
		if(config.submenuConfig)
			webix.extend(config,config.submenuConfig);
	}
}, webix.ContextHelper, webix.ui.submenu);

/*

*/

webix.protoUI({
	name:"tabbar",
	$skin:function(){
		var skin = webix.skin.$active;
		var defaults = this.defaults;

		defaults.topOffset = skin.tabTopOffset||0;
		defaults.tabOffset = (typeof skin.tabOffset != "undefined"?skin.tabOffset:10);
		defaults.bottomOffset = skin.tabBottomOffset||0;
		defaults.height = skin.tabbarHeight;

		defaults.tabMargin = skin.tabMargin;
		defaults.inputPadding = skin.inputPadding;
		defaults.tabMinWidth = skin.tabMinWidth||100;
		defaults.tabMoreWidth = skin.tabMoreWidth||40;
	},
	_getTabbarSizes: function(){

		var config = this.config,
			i,
			len = config.options.length, // number of tabs
			totalWidth = this._input_width - config.tabOffset*2,
			limitWidth = config.optionWidth||config.tabMinWidth;

		if(totalWidth/len < limitWidth){
			return { max: (parseInt(totalWidth/limitWidth,10)||1)};
		}
		if(!config.optionWidth){
			for(i=0;i<  config.options.length; i++){
				if(config.options[i].width){
					totalWidth -= config.options[i].width+(!i&&!config .type?config.tabMargin:0);
					len--;
				}
			}
		}

		return {width: (len?totalWidth/len:config.tabMinWidth)};
	},
	_init_popup: function(){
		var obj = this._settings;
		if (!obj.tabbarPopup){
			var popupConfig = {
				view: "popup",
				width: (obj.popupWidth||200),
				body:{
					view: "list",
					borderless: true,
					select: true,
					css: "webix_tab_list",
					autoheight: true, yCount:obj.yCount,
					type:{
						template: obj.popupTemplate
					}
				}
			};
			var view = webix.ui(popupConfig);
			view.getBody().attachEvent("onBeforeSelect",webix.bind(function(id){
				if (id && this.callEvent("onBeforeTabClick", [id])){
						this.setValue(id);
					webix.$$(this._settings.tabbarPopup).hide();
					this.callEvent("onAfterTabClick", [id]);
					return true;
				}
			},this));
			obj.tabbarPopup = view._settings.id;
			this._destroy_with_me.push(view);
		}
		this._init_popup = function(){};
	},
	getPopup: function(){
		this._init_popup();
		return webix.$$(this._settings.tabbarPopup);
	},
	moreTemplate_setter: webix.template,
	popupTemplate_setter: webix.template,
	defaults:{
		popupWidth: 200,
		popupTemplate: "#value#",
		yCount: 7,
		moreTemplate: '<span class="webix_icon fa-ellipsis-h"></span>',
		template:function(obj,common) {
			var contentWidth, html, i, leafWidth, resultHTML, style, sum, verticalOffset, width,
				tabs = obj.options;

			if (!tabs.length){
				html = "<div class='webix_tab_filler' style='width:"+common._input_width+"px; border-right:0px;'></div>";
			} else {
				common._check_options(tabs);
				if (!obj.value && tabs.length)
					obj.value = tabs[0].id;

				tabs = webix.copy(tabs);

				html = "";
				if (obj.tabOffset)
					html += "<div class='webix_tab_filler' style='width:"+obj.tabOffset+"px;'>&nbsp;</div>";
				contentWidth = common._input_width - obj.tabOffset*2-(!obj.type?(obj.tabMargin)*(tabs.length-1):0);
				verticalOffset = obj.topOffset+obj.bottomOffset;

				var sizes = common._getTabbarSizes();

				if(sizes.max && sizes.max < tabs.length){
					//we need popup
					var popup = common.getPopup();
					popup.hide();

					var list = (popup.getBody()||null);
					if(list){
						if(sizes.max){
							var found = false;
							for( i = 0; i < tabs.length && !found; i++)
								if(tabs[i].id== obj.value){
									found = true;
									if((i+1) > sizes.max){
										var displayTabs = tabs.splice( i + 1- sizes.max , sizes.max);
										tabs = displayTabs.concat(tabs);
									}
								}
							list.clearAll();
							list.parse(tabs.slice(sizes.max));
						}
						else{
							list.clearAll();
						}
					}
				} else if (common._settings.tabbarPopup)
					webix.$$(common._settings.tabbarPopup).hide();

				sum = obj.tabOffset;
				var lastTab = false;
				for(i = 0; (i<tabs.length) && !lastTab; i++) {

					// tab width
					if(sizes && sizes.max){
						if(sizes.max == (i + 1)){
							lastTab = true;
						}
						contentWidth = common._input_width - obj.tabOffset*2-(!obj.type&&(sizes.max>1)?(obj.tabMargin)*(sizes.max-1):0);
						width = (contentWidth - obj.tabMoreWidth)/sizes.max ;
					}
					else
						width = sizes.width;

					width = (tabs[i].width||obj.optionWidth||width);

					sum += width + (i&&!obj.type?obj.tabMargin:0);

					if(obj.tabMargin>0&&i&&!obj.type)
					   html += "<div class='webix_tab_filler' style='width:"+obj.tabMargin+"px;'></div>";

					// tab innerHTML
					html += common._getTabHTML(tabs[i],width);


					if(lastTab){
						var iconHeight = common._content_height - (!obj.type?(verticalOffset):0);
						html += '<div class="webix_tab_more_icon" style="width:'+obj.tabMoreWidth+'px;">'+obj.moreTemplate(obj,common)+'</div>';
						sum += obj.tabMoreWidth;
					}
				}



				leafWidth = common._content_width - sum;

				if (leafWidth>0 && !obj.type)
					html += "<div class='webix_tab_filler' style='width:"+leafWidth+"px;'>&nbsp;</div>";
			}

			resultHTML = "";

			// consider top and bottom offset in tabs height (top tabbar)
			style = (verticalOffset&& !obj.type)?"height:"+(common._content_height-verticalOffset)+"px":"";

			//space above tabs (top tabbar)
			if(obj.topOffset && !obj.type)
				resultHTML += "<div class='webix_before_all_tabs' style='width:100%;height:"+obj.topOffset+"px'></div>";

			// tabs html
			resultHTML +=  "<div style='"+style+"' class='webix_all_tabs "+(obj.type?("webixtype_"+obj.type):"")+"'>"+html+"</div>";

			//space below to tabs (top tabbar)
			if(obj.bottomOffset && !obj.type)
				resultHTML += "<div class='webix_after_all_tabs' style='width:100%;height:"+obj.bottomOffset+"px'></div>";

			return resultHTML;
		}
	},
	_getTabHTML: function(tab,width){
		var	html,
			className = '',
			config = this.config;

		if(tab.id== config.value)
			className=" webix_selected";

		if (tab.css)
			className+=" "+tab.css;

		width = (tab.width||width);

		html ='<div class="webix_item_tab'+className+'" button_id="'+tab.id+'" style="width:'+width+'px;">';

		// a tab title
		if(this._tabTemplate){
			var calcHeight = this._content_height- config.inputPadding*2 - 2;
			var height = this._content_height - 2;
			var temp = webix.extend({ cheight: calcHeight, aheight:height }, tab);
			html+= this._tabTemplate(temp);
		}
		else {
			var icon = tab.icon?("<span class='webix_icon fa-"+tab.icon+"'></span> "):"";
			html+=icon + tab.value;
		}

		if (tab.close || config.close)
			html+="<span class='webix_tab_close webix_icon fa-times'></span>";

		html+="</div>";
		return html;
	},
	_types:{
		image:"<div class='webix_img_btn_top' style='height:#cheight#px;background-image:url(#image#);'><div class='webix_img_btn_text'>#value#</div></div>",
		icon:"<div class='webix_img_btn' style='line-height:#cheight#px;height:#cheight#px;'><span class='webix_icon_btn fa-#icon#' style='max-width:#cheight#px;max-height:#cheight#px;'></span>#value#</div>",
		iconTop:"<div class='webix_img_btn_top' style='height:#cheight#px;width:100%;top:0px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#value#</div></div>"
	},
	type_setter:function(value){
		this._settings.tabOffset = 0;
		if (this._types[value])
			this._tabTemplate = webix.template(this._types[value]);
		return value;
	}
}, webix.ui.segmented);

webix.protoUI({
	name:"tabview",
	defaults:{
		type:"clean"
	},
	setValue:function(val){
		this._cells[0].setValue(val);
	},
	getValue:function(){
		return this._cells[0].getValue();
	},
	getTabbar:function(){
		return this._cells[0];
	},
	getMultiview:function(){
		return this._cells[1];
	},
	addView:function(obj){
		var id = obj.body.id = obj.body.id || webix.uid();

		this.getMultiview().addView(obj.body);

		obj.id = obj.body.id;
		obj.value = obj.header;
		delete obj.body;
		delete obj.header;

		var t = this.getTabbar();
		t.addOption(obj);
		t.refresh();

		return id;
	},
	removeView:function(id){
		var t = this.getTabbar();
		t.removeOption(id);
		t.refresh();
	},
	$init:function(config){
		this.$ready.push(this._init_tabview_handlers);

		var cells = config.cells;
		var tabs = [];

		webix.assert(cells && cells.length, "tabview must have cells collection");

		for (var i = cells.length - 1; i >= 0; i--){
			var view = cells[i].body||cells[i];
			if (!view.id) view.id = "view"+webix.uid();
			tabs[i] = { value:cells[i].header, id:view.id, close:cells[i].close, width:cells[i].width };
			cells[i] = view;
		}

		var tabbar = { view:"tabbar", multiview:true };
		var mview = { view:"multiview", cells:cells, animate:(!!config.animate) };

		if (config.value)
			tabbar.value = config.value;

		if (config.tabbar) 
			webix.extend(tabbar, config.tabbar, true);
		if (config.multiview) 
			webix.extend(mview, config.multiview, true);
		
		tabbar.options = tabbar.options || tabs;

		config.rows = [	
			tabbar, mview
		];

		delete config.cells;
		delete config.tabs;
	},
	_init_tabview_handlers:function(){
		this.getTabbar().attachEvent("onOptionRemove", function(id){
			var view = webix.$$(id);
			if (view)
				view.destructor();
		});
	}
}, webix.ui.layout);





webix.protoUI({
	name:"htmlform",
	_default_values: null,
	$init: function(config) {
		this.elements = null;
		if (config.content && (config.container == config.content || !config.container && config.content == document.body))
			this._copy_inner_content = true;
	},
	content_setter:function(content){
		content = webix.toNode(content);
		if (this._copy_inner_content){
			while (content.childNodes.length > 1)
				this._viewobj.childNodes[0].appendChild(content.childNodes[0]);
		} else {
			this._viewobj.childNodes[0].appendChild(content);
		}
		return true;
	},
	render:function(){
		if (!this._default_values) {
			webix.ui.template.prototype.render.apply(this, arguments);
			this._default_values = this.getValues();
		}
	},
	_parse_inputs: function() {
		if (!this.elements)
			this.elements = this._viewobj.querySelectorAll("[name]");
		return this.elements;
	},
	getValues: function() {
		var data = (this._values?webix.clone(this._values):{});
		var els = this._parse_inputs();
		for (var i = 0; i < els.length; i++) {
			if (this._tagname(els[i]) === 'input' &&
				this._attribute(els[i], 'type') === 'radio' &&
				els[i].checked === false) continue;
			data[els[i].name] = this._get_html_value(els[i]);
		}
		return data;
	},
	setValues: function(data, update) {
        if(!update) this.clear(true);
		this.render();

		this._values = webix.clone(data);

		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+this._settings.id);

		var els = this._parse_inputs();
		for (var i = 0; i < els.length; i++) {
			if (!webix.isUndefined(data[els[i].name]))
				this._set_html_value(els[i], data[els[i].name]);
		}

		this.callEvent("onChange",[]);
	},

	focus: function(name) {
		var el;
		if (!webix.isUndefined(name))
			el = this._viewobj.querySelector('[name="' + name + '"]');
		else
			el = this._parse_inputs()[0];
		if (!webix.isUndefined(el)) el.focus();
	},

	clear: function(all) {
			this.render();
			var els = this._parse_inputs();
			for (var i = 0; i < els.length; i++) {
                var cleared = all?"":this._default_values[els[i].name] || "";
                this._set_html_value(els[i], cleared);
			}
	},

	_tagname: function(el) {
		if (!el.tagName) return null;
		return el.tagName.toLowerCase();
	},

	_attribute: function(el, name) {
		if (!el.getAttribute) return null;
		var attr = el.getAttribute(name);
		return (attr.toLowerCase) ? attr.toLowerCase() : null;
	},

	_get_html_value: function(el) {
		var tagname = this._tagname(el);
		if (this._get_value[tagname])
			return this._get_value[tagname].call(this, el);
		return this._get_value.other.call(this, el);
	},

	_get_value: {
		input: function(el) {
			var type = this._attribute(el, 'type');
			if (type === 'checkbox')
				return el.checked;
			return el.value;
		},
		textarea: function(el) {
			return el.value;
		},
		select: function(el) {
			var index = el.selectedIndex;
			return el.options[index].value;
		},
		other: function(el) {
			return el.innerHTML;
		}
	},

	_set_html_value: function(el, value) {
		var tagname = this._tagname(el);
		if (this._set_value[tagname])
			return this._set_value[tagname].call(this, el, value);
		return this._set_value.other.call(this, el, value);
	},

	_set_value: {
		input: function(el, value) {
			var type = this._attribute(el, 'type');
			if (type === 'checkbox')
				el.checked = (value) ? true : false;
			else if (type === 'radio')
				el.checked = (el.value === value) ? true : false;
			else
				el.value = value;
		},
		textarea: function(el, value) {
			el.value = value;
		},
		select: function(el, value) {
            //select first option if no provided and if possible
			el.value = value?value:el.firstElementChild.value||value;
		},
		other: function(el, value) {
			el.innerHTML = value;
		}
	},

	_mark_invalid:function(id,obj){
		this._clear_invalid(id,obj);
		var el = this._viewobj.querySelector('[name="' + id + '"]');
		if (el) webix.html.addCss(el, "invalid");
	},
	_clear_invalid:function(id,obj){
		var el = this._viewobj.querySelector('[name="' + id + '"]');
		if (el) webix.html.removeCss(el, "invalid");
	}

}, webix.ui.template, webix.Values);






webix.dp = function(name){
	if (typeof name == "object" && name._settings)
		name = name._settings.id;

	if (webix.dp._pull[name])
		return webix.dp._pull[name];

	if (typeof name == "string"||typeof name == "number")
		name = { master:webix.$$(name) };

	var dp = new webix.DataProcessor(name);
	var masterId = dp._settings.master._settings.id;
	webix.dp._pull[masterId]=dp;

	webix.$$(masterId).attachEvent("onDestruct",function(){
		webix.dp._pull[this._settings.id] = null;
		delete webix.dp._pull[this._settings.id];
	});

	return dp;
};
webix.dp._pull = {};
webix.dp.$$ = function(id){
	return webix.dp._pull[id];
};


webix.DataProcessor = webix.proto({
	defaults: {
		autoupdate:true,
		updateFromResponse:false,
		mode:"post",
		operationName:"webix_operation",
		trackMove:false
	},


	/*! constructor
	 **/
	$init: function() {
		this.reset();
		this._ignore = false;
		this.name = "DataProcessor";
		this.$ready.push(this._after_init_call);
	},
	reset:function(){
		this._updates = [];
	},
	url_setter:function(value){
		/*
			we can use simple url or mode->url
		*/
		var mode = "";
		if (typeof value == "string"){
			var parts = value.split("->");
			if (parts.length > 1){
				value = parts[1];
				mode = parts[0];
			}
		} else if (value && value.mode){
			mode = value.mode;
			value = value.url;
		}

		if (mode)
			return webix.proxy(mode, value);
		
		return value;
	},
	master_setter:function(value){
		var store = value;
		if (value.name != "DataStore")
			store = value.data;

		this._settings.store = store;
		return value;
	},
	/*! attaching onStoreUpdated event
	 **/
	_after_init_call: function(){
		webix.assert(this._settings.store, "store or master need to be defined for the dataprocessor");
		this._settings.store.attachEvent("onStoreUpdated", webix.bind(this._onStoreUpdated, this));
		this._settings.store.attachEvent("onDataMove", webix.bind(this._onDataMove, this));
	},
	ignore:function(code,master){
		var temp = this._ignore;
		this._ignore = true;
		code.call((master||this));
		this._ignore = temp;
	},
	off:function(){
		this._ignore = true;
	},
	on:function(){
		this._ignore = false;
	},

	_copy_data:function(source){
		var obj = {};
		for (var key in source)	
			if (key.indexOf("$")!==0)
				obj[key]=source[key];
		return obj;
	},
	save:function(id, operation, obj){
		operation = operation || "update";
		this._save_inner(id, (obj || this._settings.store.getItem(id)), operation);
	},
	_save_inner:function(id, obj, operation){
		if (typeof id == "object") id = id.toString();
		if (!id || this._ignore === true || !operation || operation == "paint") return true;

		var store = this._settings.store;
		if (store && store._scheme_serialize)
			obj = store._scheme_serialize(obj);

		var update = { id: id, data:this._copy_data(obj), operation:operation };
		//save parent id
		if (!webix.isUndefined(obj.$parent)) update.data.parent = obj.$parent;

		if (update.operation != "delete"){
			//prevent saving of not-validated records
			var master = this._settings.master;
			if (master && master.data && master.data.getMark && master.data.getMark(id, "webix_invalid"))
				update._invalid = true;

			if (!this.validate(update.data))
				update._invalid = true;
		}

		if (this._check_unique(update))
			this._updates.push(update);
		
		if (this._settings.autoupdate)
			this.send();
			
		return true;
	},
	_onDataMove:function(sid, tindex, parent){
		if (this._settings.trackMove){
			var obj = webix.copy(this._settings.store.getItem(sid));
			var order = this._settings.store.order;

			obj.webix_move_index = tindex;
			obj.webix_move_id = order[tindex+1]||"";
			obj.webix_move_parent = parent;
			this._save_inner(sid, obj, "update");
		}
	},
	_onStoreUpdated: function(id, obj, operation){
		switch (operation) {
			case 'save':
				operation = "update";
				break;
			case 'update':
				operation = "update";
				break;
			case 'add':
				operation = "insert";
				break;
			case 'delete':
				operation = "delete";				
				break;
			default:
				return true;
		}
		return this._save_inner(id, obj, operation);
	},
	_check_unique:function(check){
		for (var i = 0; i < this._updates.length; i++){
			var one = this._updates[i];
			if (one.id == check.id){
				if (check.operation == "delete"){
					if (one.operation == "insert")
						this._updates.splice(i,1);
					else 
						one.operation = "delete";
				}
				one.data = check.data;
				one._invalid = check._invalid;
				return false;
			}
		}
		return true;
	},
	send:function(){
		this._sendData();
	},
	
	_sendData: function(){
		if (!this._settings.url)
			return;

		var marked = this._updates;
		var to_send = [];
		var url = this._settings.url;

		for (var i = 0; i < marked.length; i++) {
			var tosave = marked[i];

			if (tosave._in_progress) continue;
			if (tosave._invalid) continue;

			var id = tosave.id;
			var operation = tosave.operation;
			var precise_url = (typeof url == "object" && !url.$proxy) ? url[operation] : url;
			var proxy = precise_url && (precise_url.$proxy || typeof precise_url === "function");

			if (!precise_url) continue;

			if (this._settings.store._scheme_save)
				this._settings.store._scheme_save(tosave.data);

			if (!this.callEvent("onBefore"+operation, [id, tosave]))
				continue;
			tosave._in_progress = true;

			if (!this.callEvent("onBeforeDataSend", [tosave])) return;

			tosave.data = this._updatesData(tosave.data);

			var callback = this._send_callback({ id:tosave.id, status:tosave.operation });
			if (precise_url.$proxy){
				if (precise_url.save)
					precise_url.save(this.config.master, tosave, this, callback);
				else
					to_send.push(tosave);
			} else {
				if (operation == "insert") delete tosave.data.id;

				
				if (proxy){
					//promise
					precise_url(tosave.id, tosave.operation, tosave.data).then(
						function(data){
							if (data && typeof data.json == "function")
								data = data.json();
							callback.success("", data, -1);
						},
						function(error){
							callback.error("", null, error);
						}
					);
				} else {
					//normal url
					tosave.data[this._settings.operationName] = operation;
					this._send(precise_url, tosave.data, this._settings.mode, operation, callback);
				}
			}

			this.callEvent("onAfterDataSend", [tosave]);
		}

		if (url.$proxy && url.saveAll && to_send.length)
			url.saveAll(this.config.master, to_send, this, this._send_callback({}));
	},


	/*! process updates list to POST and GET params according dataprocessor protocol
	 *	@param updates
	 *		list of objects { id: "item id", data: "data hash", operation: "type of operation"}
	 *	@return
	 *		object { post: { hash of post params as name: value }, get: { hash of get params as name: value } }
	 **/



	_updatesData:function(source){
		var target = {};
		for (var j in source){
			if (j.indexOf("$")!==0)
				target[j] = source[j];
		}
		return target;
	},



	/*! send dataprocessor query to server
	 *	and attach event to process result
	 *	@param url
	 *		server url
	 *	@param get
	 *		hash of get params
	 *	@param post
	 *		hash of post params
	 *	@mode
	 *		'post' or 'get'
	 **/
	_send: function(url, post, mode, operation, callback) {
		webix.assert(url, "url was not set for DataProcessor");

		if (typeof url == "function")
			return url(post, operation, callback);

		webix.ajax()[mode](url, post, callback);
	},
	_send_callback:function(id){
		var self = this;
		return {
			success:function(t,d,l){ return self._processResult(id, t,d,l); },
			error  :function(t,d,l){ return self._processError(id, t,d,l); }
		};
	},
	attachProgress:function(start, end, error){
		this.attachEvent("onBeforeDataSend", start);
		this.attachEvent("onAfterSync", end);
		this.attachEvent("onAfterSaveError", error);
		this.attachEvent("onLoadError", error);
	},
	_processError:function(id, text, data, loader){
		if (id)
			this._innerProcessResult(true, id.id, false, id.status, false, {text:text, data:data, loader:loader});
		else {
			this.callEvent("onLoadError", arguments);
			webix.callEvent("onLoadError", [text, data, loader, this]);
		}
	},
	_innerProcessResult:function(error, id, newid, status, obj, details){
		var update = this.getItemState(id);
		update._in_progress = false;

		if (error){
			if (this.callEvent("onBeforeSaveError", [id, status, obj, details])){
				update._invalid = true;
				this.callEvent("onAfterSaveError", [id, status, obj, details]);
				return;
			}
		} else
			this.setItemState(id, false);

		if (obj && status != "delete" && this._settings.updateFromResponse){
			var item = this._settings.store.getItem(id);
			webix.extend(item, obj, true);
			this._settings.store.refresh(id);
		}

		if (newid && id != newid)
			this._settings.store.changeId(id, newid);
		
		
		this.callEvent("onAfterSave",[obj, id, details]);
		this.callEvent("onAfter"+status, [obj, id, details]);
	},
	processResult: function(state, hash, details){
		//compatibility with custom json response
		var error = (hash && (hash.status == "error" || hash.status == "invalid"));
		var newid = (hash ? ( hash.newid || hash.id ) : false);

		this._innerProcessResult(error, state.id, newid, state.status, hash, details);
	},
	// process saving from result
	_processResult: function(state, text, data, loader){
		this.callEvent("onBeforeSync", [state, text, data, loader]);

		if (loader === -1){
			//callback from promise
			this.processResult(state, data, {});
		} else {
			var proxy = this._settings.url;
			if (proxy.$proxy && proxy.result)
				proxy.result(state, this._settings.master, this, text,  data, loader);
			else {
				var hash;
				if (text){
					hash = data.json();
					//invalid response
					if (text && typeof hash == "undefined")
						hash = { status:"error" };
				}
				this.processResult(state, hash,  {text:text, data:data, loader:loader});
			}
		}

		this.callEvent("onAfterSync", [state, text, data, loader]);
	},


	/*! if it's defined escape function - call it
	 *	@param value
	 *		value to escape
	 *	@return
	 *		escaped value
	 **/
	escape: function(value) {
		if (this._settings.escape)
			return this._settings.escape(value);
		else
			return encodeURIComponent(value);
	},
	getState:function(){
		if (!this._updates.length) return false;
		for (var i = this._updates.length - 1; i >= 0; i--)
			if (this._updates[i]._in_progress)
				return "saving";

		return true;
	},
	getItemState:function(id){
		var index = this._get_stack_index(id);
		return this._updates[index] || null;
	},
	setItemState:function(id, state){
		if (state)
			this.save(id, state);
		else{
			var index = this._get_stack_index(id);
			if (index > -1)
				this._updates.splice(index, 1);
		}
	},
	_get_stack_index: function(id) {
		var index = -1;
		var update = null;
		for (var i=0; i < this._updates.length; i++)
			if (this._updates[i].id == id) {
				index = i;
				break;
			}

		return index;
	}

}, webix.Settings, webix.EventSystem, webix.ValidateData);




webix.jsonp = function(url, params, callback, master){
	var id = "webix_jsonp_"+webix.uid();
	var script = document.createElement('script');
	script.id = id;
	script.type = 'text/javascript';

	var head = document.getElementsByTagName("head")[0];

	if (typeof params == "function"){
		master = callback;
		callback = params;
		params = {};
	}

	if (!params)
		params = {};

	params.jsonp = "webix.jsonp."+id;
	webix.jsonp[id]=function(){
		callback.apply(master||window, arguments);
		script.parentNode.removeChild(script);
		callback = head = master = script = null;
		delete webix.jsonp[id];
	};
	
	var vals = [];
	for (var key in params) vals.push(key+"="+encodeURIComponent(params[key]));
	
	url += (url.indexOf("?") == -1 ? "?" : "&")+vals.join("&");

    script.src = url ;
    head.appendChild(script);
};

webix.markup = {
	namespace:"x",
	attribute:"data-",
	dataTag:"li",
	_dash:/-([a-z])/g,
	_after_dash:function (match) { return match[1].toUpperCase(); },
	_parse_int:{
		width:true,
		height:true,
		gravity:true,
		margin:true,
		padding:true,
		paddingX:true,
		paddingY:true,
		minWidth:true,
		maxWidth:true,
		minHeight:true,
		maxHeight:true,
        headerRowHeight:true
	},
	_view_has_method:function(view, name){
		return webix.ui.hasMethod(view, name);
	},

	init: function(node, target, scope){
		node = node || document.body;

		var els = [];
		var temp = this._get_core_els(node);
		var html = temp.html;
		var ui = null;

		//make copy to prevent node removing effects
		for (var i = temp.length - 1; i >= 0; i--) els[i] = temp[i];
		
		for (var i = 0; i < els.length; i++) {
			var config, temp_config;
			//collect configuration
			config = this._sub_markup(els[i], html);
			config.$scope = scope;
			ui = this._initComponent(config, els[i], html, target);
		}
		return ui;
	},

	parse:function(source, mode){
		//convert from string to object
		if (typeof source == "string")
			source = webix.DataDriver[mode || "xml"].toObject(source, source);

		var els = this._get_core_els(source, mode);
		return this._sub_markup(els[0], els.html);
	},

	_initComponent:function(config, node, html, target){
		if (!target){
			config.container = node.parentNode;
			webix.html.remove(node);
		} else 
			config.container = target;

		if (this._view_has_method(config.view, "setPosition"))
			delete config.container;

		//init ui
		return webix.ui(config);
	},

	_get_core_els:function(node){
		this._full_prefix = this.namespace?(this.namespace+":"):"";
		this._full_prefix_top = this._full_prefix+"ui";

		//xhtml mode
		var els = node.getElementsByTagName(this._full_prefix_top);
		if (!els.length && node.documentElement && node.documentElement.tagName == this._full_prefix_top)
			els = [ node.documentElement ];

		//loading from xml file with valid namespace
		if (!els.length && this.namespace){
			els = node.getElementsByTagName("ui");
			if (!els.length && node.documentElement && node.documentElement.tagName == "ui")
				els = [ node.documentElement ];
		}

		if (!els.length){
			//html mode
			els = this._get_html_tops(node);
			els.html = true;
		}
		return els;
	},

	//html conversion
	_get_html_tops: function(node){
		if (node.getAttribute && node.getAttribute(this.attribute+"view"))
			return [node];

		var els = node.querySelectorAll("["+this.attribute+"view]");

		var tags = []; var marks = [];
		for (var i = 0; i < els.length; i++)
			if (!els[i].parentNode.getAttribute(this.attribute+"view"))
				tags.push(els[i]);

		return tags;
	},



	_sub_markup: function(el, html, json){
		var htmltable = false;
		//ignore top x:ui for xhtml and xml 
		if (!json){
			var name = this._get_name(el, html);
			if (name == "ui"){
				var childs = el.childNodes;
				for (var i = 0; i < childs.length; i++)
					if (childs[i].nodeType == 1){
						return this._sub_markup(childs[i], html);
					}
			}
			json = { view: name };
			if (html && el.tagName.toLowerCase() == "table"){
				json.data = el;
				json.datatype = "htmltable";
				htmltable = true;
			}
		}

		var is_layout = json.view == "cols" || json.view == "rows" || this._view_has_method(json.view, "addView");

		var subs = [];
		var has_tags = 0; 
		var allow_sub_tags = !(html || el.style); //only for xml documents
		var first = el.firstChild;
		while (first){
			//tag node
			if (first.nodeType == 1){
				var name = this._get_name(first, html);
				if (name == "data"){
					has_tags = 1;
					var data = first; first = first.nextSibling;
					json.data = this._handle_data(data, html);
					continue;
				} else if (name == "config"){
					this._get_config_html(first, json, html);
					var confignode = first;
					first = first.nextSibling;

					webix.html.remove(confignode);
					continue;
				} else if (name == "column"){
					has_tags = 1;

					var column = this._tag_to_json(first, html);
					column.header = column.header || column.value;
					column.width = column.width * 1 || "";

					json.columns = json.columns || [];
					json.columns.push(column);
				} else if (name || (is_layout && html)){
					var obj = this._sub_markup(first , html , { view:name });
					if (obj.view == "head")
						json.head = obj.rows ? obj.rows[0] : obj.template;
					else if (obj.view == "body"){
						if (this._view_has_method(json.view, "addView")){
							//multiview, accordion

							//subtag or plain value
							//in case of multiple sub tags, only first will be used
							// #dirty
							subs.push({
								body: (obj.rows ? obj.rows[0] : obj.value),
								header:obj.header || ""
							});
						} else {
							//window, fieldset

							//one sub tag - use it
							//multiple sub tags - create sub layout
							//or use plain text value
							json.body = obj.rows ? ( obj.rows.length == 1 ? obj.rows[0] : { rows:obj.rows } ) : obj.value;
						}
					} else
						subs.push(obj);
				} else if (allow_sub_tags) {
					has_tags = 1;
					var tagName = first.tagName;
					if (html) tagName = tagName.toLowerCase().replace(this._dash, this._after_dash);
					json[tagName] = webix.DataDriver.xml.tagToObject(first);
					
				}
			}

			first = first.nextSibling;
		}

		this._attrs_to_json(el, json, html);

		if (subs.length){
			if (json.stack)
				json[json.stack] = subs;
			else if (this._view_has_method(json.view, "setValues"))
				json["elements"] = subs;
			else if (json.view == "rows"){
				json.view = "layout";
				json.rows = subs;
			} else if (json.view == "cols"){
				json.view = "layout";
				json.cols = subs;
			} else if (this._view_has_method(json.view, "setValue")){
				json["cells"] = subs;
			} else if (this._view_has_method(json.view, "getBody")){
				json.body = subs.length == 1 ? subs[0] : { rows:subs };
			} else
				json["rows"] = subs;
		} else if (!htmltable && !has_tags){
			if (html && !json.template && (!json.view || json.view == "template")){
				json.view = "template";
				json.content = el;
			} else {
				var content = this._content(el, html);
				if (content){
					var target = "template";
					if (this._view_has_method(json.view, "setValue"))
						target = "value";
					json[target] = json[target] || content;	
				}
			}
		}

		return json;
	},

	_empty: function(str) {
		var clean = str.replace(/\s+/gm, '');
		return (clean.length > 0) ? false : true;	 
	},

	_markup_names:{
		body:1,
		head:1,
		data:1,
		rows:1,
		cols:1,
		cells:1,
		elements:1,
		ui:1,
		column:1,
		config:1
	},

	_get_config_html:function(tag, json, html){
		var master = this._attrs_to_json(tag, { });
		if (master.name){
			json[master.name] = master;
			delete master.name;
		} else 
			if (master.stack) json[master.stack] = [];
		else
			json = master;

		var childs = tag.childNodes;
		for (var i = 0; i < childs.length; i++) {
            var sub = null;
			if (childs[i].nodeType == 1 && childs[i].tagName.toLowerCase() == "config" && childs[i].attributes.length)
				sub = this._get_config_html(childs[i], master, html);
            else
                sub = childs[i].innerHTML;
            if (master.stack && sub)
                json[master.stack].push(sub);

		}
		return json;
	},

	_get_name:function(tag, html){
		//value of view attribute or config tag
		if (html)
			return tag.getAttribute(this.attribute+"view") || ( tag.tagName.toLowerCase() == "config" ? "config" : null);
		var name = tag.tagName.toLowerCase();
		if (this.namespace){
			if (name.indexOf(this._full_prefix) === 0 || tag.scopeName == this.namespace)
				return name.replace(this._full_prefix,"");
		} else {
			if (webix.ui[name] || this._markup_names[name])
				return name;
		}
		return 0;
	},

	_handle_data:function(el, html){
		var data = [];

		var records = el.getElementsByTagName(webix.markup.dataTag);
		for (var i=0; i<records.length; i++){
			var rec = records[i];
			if (rec.parentNode.parentNode.tagName != webix.markup.dataTag){
				var json = this._tag_to_json(rec, html);
				//reuse css class 
				if (rec.className) json.$css = rec.className;
				data.push(json);
			}
		}

		webix.html.remove(el);

		return data;
	},
	_content:function(el, html){
		if (el.style) return el.innerHTML;
		if (el.firstChild)
			return el.firstChild.wholeText||el.firstChild.data||"";
		return "";
	},


	_tag_to_json:function(el, html){
		if (!html)
			return webix.DataDriver.xml.tagToObject(el);

		var json = this._attrs_to_json(el, {}, html);
		if (!json.value && el.childNodes.length)
			json.value = this._content(el, html);

		return json;
	},
	_attrs_to_json:function(el, json, html){
		var attrs = el.attributes;
        for (var i=0; i<attrs.length; i++){
            var name = attrs[i].name;
            if (html){
                if (name.indexOf(this.attribute) !== 0)
                    continue;
                name = name.replace(this.attribute,"").replace(this._dash, this._after_dash);
            }

            var value = attrs[i].value;
            if (value.indexOf("json://") != -1)
                value = JSON.parse(value.replace("json://",""));

            if (this._parse_int[name])
                value = parseInt(value,10);

            json[name] = value;
        }
        return json;
	}
};
(function(){
	var _webix_msg_cfg = null;
	function callback(config, result){
			var usercall = config.callback;
			modality(false);
			config.box.parentNode.removeChild(config.box);
			_webix_msg_cfg = config.box = null;
			if (usercall)
				usercall(result,config.details);
	}
	function modal_key(e){
		if (_webix_msg_cfg){
			e = e||event;
			var code = e.which||event.keyCode;
			if (webix.message.keyboard){
				if (code == 13 || code == 32)
					callback(_webix_msg_cfg, true);
				if (code == 27)
					callback(_webix_msg_cfg, false);
			
				if (e.preventDefault)
					e.preventDefault();
				return !(e.cancelBubble = true);
			}
		}
	}
	if (document.attachEvent)
		document.attachEvent("onkeydown", modal_key);
	else
		document.addEventListener("keydown", modal_key, true);
		
	function modality(mode){
		if(!modality.cover || !modality.cover.parentNode){
			modality.cover = document.createElement("DIV");
			//necessary for IE only
			modality.cover.onkeydown = modal_key;
			modality.cover.className = "webix_modal_cover";
			document.body.appendChild(modality.cover);
		}
		modality.cover.style.display = mode?"inline-block":"none";
	}

	function button(text, result, className){
		return "<div class='webix_popup_button"+(className?(" "+className):"")+"' result='"+result+"' ><div>"+text+"</div></div>";
	}

	function info(text){
		if (!t.area){
			t.area = document.createElement("DIV");
			t.area.className = "webix_message_area";
			t.area.style[t.position]="5px";
			document.body.appendChild(t.area);
		}
		t.hide(text.id);
		var message = document.createElement("DIV");
		message.innerHTML = "<div>"+text.text+"</div>";
		message.className = "webix_info webix_" + text.type;
		message.onclick = function(){
			t.hide(text.id);
			text = null;
		};

		if (webix.$testmode)
			message.className += " webix_no_transition";

		if (t.position == "bottom" && t.area.firstChild)
			t.area.insertBefore(message,t.area.firstChild);
		else
			t.area.appendChild(message);
		
		if (text.expire > 0)
			t.timers[text.id]=window.setTimeout(function(){
				t.hide(text.id);
			}, text.expire);

		//styling for animation
		message.style.height = message.offsetHeight-2+"px";

		t.pull[text.id] = message;
		message = null;

		return text.id;
	}
	function _boxStructure(config, ok, cancel){
		var box = document.createElement("DIV");
		box.className = " webix_modal_box webix_"+config.type;
		box.setAttribute("webixbox", 1);
			
		var inner = '';
		if (config.width)
			box.style.width = config.width+(webix.rules.isNumber(config.width)?"px":"");
		if (config.height)
			box.style.height = config.height+(webix.rules.isNumber(config.height)?"px":"");
		if (config.title)
			inner+='<div class="webix_popup_title">'+config.title+'</div>';
		inner+='<div class="webix_popup_text"><span>'+(config.content?'':config.text)+'</span></div><div  class="webix_popup_controls">';
		if (ok || config.ok)
			inner += button(config.ok || "OK", true,"confirm");
		if (cancel || config.cancel)
			inner += button(config.cancel || "Cancel", false);
		if (config.buttons){
			for (var i=0; i<config.buttons.length; i++)
				inner += button(config.buttons[i],i);
		}
		inner += '</div>';
		box.innerHTML = inner;

		if (config.content){
			var node = config.content;
			if (typeof node == "string") 
				node = document.getElementById(node);
			if (node.style.display == 'none')
				node.style.display = "";
			box.childNodes[config.title?1:0].appendChild(node);
		}

		box.onclick = function(e){
			e = e ||event;
			var source = e.target || e.srcElement;
			if (!source.className) source = source.parentNode;
			if (source.className.indexOf("webix_popup_button")!=-1){
				var result = source.getAttribute("result");
				result = (result == "true")||(result == "false"?false:result);
				callback(config, result);
			}
			e.cancelBubble = true;
		};
		config.box = box;
		if (ok||cancel||config.buttons)
			_webix_msg_cfg = config;

		return box;
	}
	function _createBox(config, ok, cancel){
		var box = config.tagName ? config : _boxStructure(config, ok, cancel);
		
		if (!config.hidden)
			modality(true);
		document.body.appendChild(box);
		var x = config.left||Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth) - box.offsetWidth)/2));
		var y = config.top||Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight) - box.offsetHeight)/2));
		if (config.position == "top")
			box.style.top = "-3px";
		else
			box.style.top = y+'px';
		box.style.left = x+'px';
		//necessary for IE only
		box.onkeydown = modal_key;

		box.focus();
		if (config.hidden)
			webix.modalbox.hide(box);

		return box;
	}

	function alertPopup(config){
		return _createBox(config, true, false);
	}
	function confirmPopup(config){
		return _createBox(config, true, true);
	}
	function boxPopup(config){
		return _createBox(config);
	}
	function box_params(text, type, callback){
		if (typeof text != "object"){
			if (typeof type == "function"){
				callback = type;
				type = "";
			}
			text = {text:text, type:type, callback:callback };
		}
		return text;
	}
	function params(text, type, expire, id){
		if (typeof text != "object")
			text = {text:text, type:type, expire:expire, id:id};
		text.id = text.id||t.uid();
		text.expire = text.expire||t.expire;
		return text;
	}
	webix.alert = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "confirm";
		return alertPopup(text);
	};
	webix.confirm = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "alert";
		return confirmPopup(text);
	};
	webix.modalbox = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "alert";
		return boxPopup(text);
	};
	webix.modalbox.hide = function(node){
		if(node){
			while (node && node.getAttribute && !node.getAttribute("webixbox"))
				node = node.parentNode;
			if (node){
				node.parentNode.removeChild(node);
			}
		}

		modality(false);
		_webix_msg_cfg = null;
	};
	var t = webix.message = function(text, type, expire, id){
		text = params.apply(this, arguments);
		text.type = text.type||"info";

		var subtype = text.type.split("-")[0];
		switch (subtype){
			case "alert":
				return alertPopup(text);
			case "confirm":
				return confirmPopup(text);
			case "modalbox":
				return boxPopup(text);
			default:
				return info(text);
		}
	};

	t.seed = (new Date()).valueOf();
	t.uid = function(){return t.seed++;};
	t.expire = 4000;
	t.keyboard = true;
	t.position = "top";
	t.pull = {};
	t.timers = {};

	t.hideAll = function(){
		for (var key in t.pull)
			t.hide(key);
	};
	t.hide = function(id){
		var obj = t.pull[id];
		if (obj && obj.parentNode){
			window.setTimeout(function(){
				obj.parentNode.removeChild(obj);
				obj = null;
			},2000);
			//styling for animation
			obj.style.height = 0;
			obj.className+=" hidden";
			
			if(t.timers[id])
				window.clearTimeout(t.timers[id]);
			delete t.pull[id];
		}
	};
})();
webix.debug_ready(function(){

	var ignore = {
		"_inner":true, 
		"awidth":true,
		"cheight":true,
		"bheight":true,
		"aheight":true
	};

	function get_inspector_config(view){
		var values={};
		var options=[];
		view = webix.$$(view);

		for (var key in view.config){
			if (ignore[key]) continue;
			
			if (typeof view.config[key] == "object") continue;
			if (typeof view.config[key] == "undefined") continue;
			if (typeof view.config[key] == "function") continue;

			if (key == "view" || key == "id")
				options.push({ label:key, id:key});
			else 
				options.push({ label:key, type:"text", id:key});

			if (view.defaults[key] == view.config[key]) 
				options[options.length - 1].css = { "color" : "#888" };

			values[key] = view.config[key];
		}
		options.sort(function(a,b){
			if (!a.css && b.css) return -1;
			if (a.css && !b.css) return 1;
			return (a.id > b.id) ? 1 : ((a.id == b.id) ? 0 : -1);
		});

		return { elements:options, data:values, head:" ["+view.name+"] <strong>"+view._settings.id+"</strong>" };
	}

	function create_inspector(){
		if (!webix.$$("webix_debug_inspector_win"))
			webix.ui({
				id:"webix_debug_inspector_win",
				view:"window", 
				top:2, left: 0, width:350, height:350,
				head:false, autofit:false,
				body:{cols:[
					{ width:10},
					{type:"clean", rows:[
						{ view:"toolbar", elements:[
							{ view:"label", value:"", id:"webix_debug_inspector_head" },
							{ view:"button", width:100, value:"Hide", type:"custom", click:function(){
								webix.debug_inspect();
							}}
						]},
						{
							id:"webix_debug_inspector", nameWidth:150,
							view:"property", scroll:"y",
							elements:[],
							on:{
								onaftereditstop:function(state, editor){
									if (state.old == state.value) return;

									var value = state.value;
									if (value === "true" || value === "false"){
										value = (value === "true");
									} else {
										var intvalue = parseInt(value,10);
										if (intvalue == value)
											value = intvalue;
									}

									var view = webix.$$(this.config.view);
									view.define(editor.id, value);
									if (view.refreshColumns)
										view.refreshColumns();
									else if (view.refresh)
										view.refresh();

									view.resize();
								}
							}
						}
						]
					}]
				}
			});
	}
	function show_inspector(view, ev){
		create_inspector();
		var win = webix.$$("webix_debug_inspector_win");

		if (view){
			var config = get_inspector_config(view);
			var winx = document.body.offsetWidth;
			var winy = document.body.offsetHeight;
			var pos = ev?webix.html.pos(ev):{x:0,y:0};

			win.define("height", Math.max(350, winy-4));
			win.resize();

			var props = webix.$$("webix_debug_inspector");
			props.define("elements", config.elements);
			props.define("view", view);

			win.show({ x:(pos.x > winx/2 )?0:(winx-370), y:0 });
			webix.$$("webix_debug_inspector").setValues(config.data);
			webix.$$("webix_debug_inspector_head").setValue(config.head);
		} else 
			win.hide();
	}
	webix.debug_inspect = show_inspector;

	function infi(value){
		if (value >= 100000)
			return "Any";
		return value;
	}
	function log_level(data, prefix, now){
		window.console.log((data == now?">>":"  ")+prefix + data.name+" / " +data.config.id);
		prefix+="  ";
		if (data._cells)
			for (var i=0; i<data._cells.length; i++){
				log_level(data._cells[i], prefix, now);
			}
		if (data._head_cell)
			log_level(data._head_cell, prefix, now);

		if (data._body_cell)
			log_level(data._body_cell, prefix, now);
	}

	webix.ui({
		view:"contextmenu",
		id:"webix:debugmenu",
		on:{
			onBeforeShow:function(e){
				if (!e.ctrlKey) return false;

				var view = webix.html.locate(e, "view_id");
				if (!view) return false;
				this.config.lastTarget = view;

				webix.blockEvent();
				webix.delay(function(){ webix.unblockEvent(); });
			},
			onShow:function(){
				var view = webix.$$(this.config.lastTarget);
				var info = "<span style='color:#888'>"+view._settings.id + "<sup style='float:right'>["+view.name+"]</sup></span>";
				document.getElementById("webix_debug_cmx").innerHTML = info;
			}
		},
		data:[
			"<div id='webix_debug_cmx'></div>",
			{ id:"inspect", value:"Inspect"},
			{ id:"docs", value:"Documentation"},
			{
				value:"Log to Console", submenu:[
					{ id:"size", value:"Sizes" },
					{ id:"tree", value:"Tree" },
					{ id:"dump", value:"Dump"}
				]
			}		
		],
		click:function(id, ev){
			//mixing two object result in confusion
			var obj = webix.$$(this.config.lastTarget);

			if  (id == "dump"){
				window.console.info("\n"+obj.name+" / "+obj.config.id);
				window.console.log("\nView: ",obj,", Config: ", obj.config, ", Data: ", obj.data);
				window.console.log(obj.$view);
			}

			if (id == "tree"){
				
				var now = obj;
				while (obj.getParentView())
					obj = obj.getParentView();

				window.console.log("");
				log_level(obj, "", now);
			}

			if (id == "size"){
				window.console.info("");
				window.console.info("\n"+obj.name+" / "+obj.config.id);
				window.console.info("\n[min]   ", obj.config.width, " x ", obj.config.height);
				var sizes = obj.$getSize(0,0);
				window.console.info("[max]    ", infi(sizes[1]), " x ", infi(sizes[3])+(obj.config.autoheight?", auto height":""));
				window.console.info("[gravity]   ", obj.config.gravity);

				window.console.info("\n[content]    ", obj._content_width, " x ", obj._content_height);
				window.console.info("[last set]   ", obj._last_size[0], " x ", obj._last_size[1]);
				if (obj._settings._inner)
					window.console.info("\n[borders]   ", "left:", !obj._settings._inner.left,"\ttop:", !obj._settings._inner.top,  "\tright:", !obj._settings._inner.right,  "\tbottom:", !obj._settings._inner.bottom);
				else
					window.console.info("\n[borders]   none");
			}

			if (id == "docs")
				window.open("http://docs.webix.com/api__refs__ui."+obj.name+".html","__blank");

			if (id == "inspect"){
				show_inspector(this.config.lastTarget, ev);
			}
		},
		master:document.body
	});
});




webix.protoUI({
	name:"carousel",
	defaults:{
		scrollSpeed:"300ms",
		type: "clean",
		navigation: {}
	},
	$init:function(config){
		this._viewobj.className += " webix_carousel";
		this._layout = null;
		this._dataobj = null;
		this._active_cell = 0;
		this.$ready.unshift(this._initLayout);
		this.$ready.push(this._after_init_call);
	},

	_initLayout: function(){
		if(this._layout && this._layout.destructor)
			this._layout.destructor();

		var layout = "";

		if(this.config.cols){
			layout = "cols";
			this._vertical_orientation = 0;
		}
		else{
			layout = "rows";
			this._vertical_orientation = 1;
		}

		var config = {borderless: true, type: "clean"};
		config[layout] = webix.copy(this.config[layout]);
		webix.extend(config,(config.layoutConfig||{}),true);

		this._layout = webix.ui._view(config);
		this._layout._parent_cell = this;

		this._viewobj.appendChild(this._layout._viewobj);
		this._cells = this._layout._cells;

		this._layout._show = webix.bind(webix.ui.carousel.prototype._show,this);
		this._layout.adjustScroll = webix.bind(webix.ui.carousel.prototype.adjustScroll,this);

		webix.attachEvent("onReconstruct", webix.bind(function(view){
			if(view == this._layout)
				this._setScroll();
		},this));

		this._contentobj = this._viewobj.firstChild;
	},
	getChildViews:function(){
		return [this._layout];
	},
	getLayout:function(){
		return this._layout;
	},
	_after_init_call:function(){
		this._contentobj.setAttribute("touch_scroll", (this._vertical_orientation?"y":"x"));

		this._layout.attachEvent("onAfterScroll",webix.bind(function(){
			this.callEvent("onShow",[this.getActiveId()]);
		},this));
	},
	adjustScroll:function(matrix){
		var size =  (this._vertical_orientation?this._content_height:this._content_width);

		var correction;
		if (this._vertical_orientation) {
			correction = Math.round(matrix.f/size);
			matrix.f = correction*size;
		} else { 
			correction = Math.round(matrix.e/size);
			matrix.e = correction*size;
		}
		
		this._active_cell = - correction;

		if(this._settings.navigation)
			this._renderNavItems();

		return true;
	},
	_show:function(obj){
		var i, layout, _nextCell, _size, x, y;
		_nextCell = -1;
		layout = this._layout;
		for (i=0; i < layout._cells.length; i++){
			if (layout._cells[i]==obj){
				_nextCell = i;
				break;
			}
		}

		if (_nextCell < 0 || _nextCell == this._active_cell)
			return;

		this._active_cell = _nextCell;
		_size =  (layout._vertical_orientation?this._content_height:this._content_width);

		x = -(layout._vertical_orientation?0:_nextCell*_size);
		y = -(layout._vertical_orientation?_nextCell*_size:0);

		this.scrollTo(x,y);
		this.callEvent("onShow",[layout._cells[this._active_cell]._settings.id]);
		if(this._settings.navigation)
			this._renderPanel();
	},
	scrollTo:function(x,y){
		if (webix.Touch && webix.animate.isSupported())
			webix.Touch._set_matrix(this._contentobj, x,y, this._settings.scrollSpeed||"100ms");
		else{
			this._contentobj.style.marginLeft = x+"px";
			this._contentobj.style.marginTop =  y+"px";
		}
	},
	navigation_setter:function(config){
		this._mergeSettings(config,{
			type: "corner",
			buttons: true,
			items: true
		});
		return config;
	},
	showNext:function(){
		if (this._active_cell < this._layout._cells.length - 1)
			this.setActiveIndex(this._active_cell+1);
	},
	showPrev:function(){
		if (this._active_cell > 0)
			this.setActiveIndex(this._active_cell-1);
	},
	setActiveIndex:function(value){
		webix.assert(value < this._layout._cells.length, "Not existing index in collection");

		var id = this._layout._cells[value]._settings.id;
		webix.$$(id).show();
	},
	getActiveIndex:function(){
		return this._active_cell;
	},
	$getSize:function(dx, dy){
		var layoutSizes = this._layout.$getSize(0, 0);
		var selfSizes   = webix.ui.view.prototype.$getSize.call(this, dx, dy);
		if(this._layout._vertical_orientation){
			selfSizes[0] = Math.max(selfSizes[0], layoutSizes[0]);
			selfSizes[1] = Math.min(selfSizes[1], layoutSizes[1]);

		} else{
			selfSizes[2] = Math.max(selfSizes[2], layoutSizes[2]);
			selfSizes[3] = Math.min(selfSizes[3], layoutSizes[3]);
		}
		return selfSizes;
	},
	$setSize:function(x,y){
		var layout = this._layout;
		var c = layout._cells.length;

		var changed = webix.ui.view.prototype.$setSize.call(this,x,y);
		var yc = this._content_height*(layout._vertical_orientation?c:1);
		var xc = this._content_width*(layout._vertical_orientation?1:c);

		if (changed){
			this._contentobj.style.height = yc+"px";
			this._contentobj.style.width = xc+"px";
			layout.$setSize(xc,yc);
			this._setScroll();
		} else
			layout.$setSize(xc,yc);
	},
	_setScroll: function(){
		var layout = this._layout;
		var activeCell = this._active_cell||0;
		var size =  (layout._vertical_orientation?this._content_height:this._content_width);

		var x = -(layout._vertical_orientation?0:activeCell*size);
		var y = -(layout._vertical_orientation?activeCell*size:0);


		this.scrollTo(x,y);

		if(this._settings.navigation)
			this._renderPanel();
	},
	getActiveId:function(){
		var cell = this._layout._cells[this._active_cell];
		return cell?cell._settings.id:null;
	},
	setActive:function(value){
		webix.$$(value).show();
	}
}, webix.EventSystem,webix.NavigationButtons, webix.ui.view);

/*
	UI:Uploader
*/





webix.type(webix.ui.list, {
	name:"uploader",
	template:"#name#  {common.removeIcon()}{common.percent()}<div style='float:right'>#sizetext#</div>",
	percent:function(obj){
		if (obj.status == 'transfer')
			return "<div style='width:60px; text-align:center; float:right'>"+obj.percent+"%</div>";
		return "<div class='webix_upload_"+obj.status+"'><span class='"+(obj.status =="error"?"error_icon":"fa-ok webix_icon")+"'></span></div>";
	},
	removeIcon:function(obj){
		return "<div class='webix_remove_upload'><span class='cancel_icon'></span></div>";
	},
	on_click:{
		"webix_remove_upload":function(ev, id){
			webix.$$(this.config.uploader).files.remove(id);
		}
	}
});

webix.UploadDriver = {
	flash: {
		$render: function(render_config) {

			if (!window.swfobject)
				webix.require("legacy/swfobject.js"); // sync loading

			var config = this._settings;
			config.swfId = (config.swfId||"webix_swf_"+webix.uid());

			this._getBox().innerHTML += "<div class='webix_upload_flash'><div id='"+config.swfId+"'></div></div>";
			this._upload_area = this._getBox().lastChild;

			// add swf object
			swfobject.embedSWF(webix.codebase+"/legacy/uploader.swf", config.swfId, "100%", "100%", "9", null, {
					uploaderId: config.id,
					ID: config.swfId,
					enableLogs:(config.enableLogs?"1":""),
					paramName:(config.paramName||"upload"),
					multiple:(config.multiple?"Y":"")
			}, {wmode:"transparent"});

			var v = swfobject.getFlashPlayerVersion();

			webix.event(this._viewobj, "click", webix.bind(function() {
				var now_date = new Date();
				if (now_date - (this._upload_timer_click||0)  > 250){
					this.fileDialog();
				}
			}, this));

			this.files.attachEvent("onBeforeDelete", webix.bind(this._stop_file,this));
		},
		$applyFlash: function(name,params){
			return this[name].apply(this,params);
		},
		getSwfObject: function(){
			return swfobject.getObjectById(this._settings.swfId);
		},
		fileDialog:function(){
			if(this.getSwfObject())
				this.getSwfObject().showDialog();
		},
		send: function(id){
			if (typeof id == "function"){
				this._last_assigned_upload_callback = id;
				id = 0;
			}

			if (!id){
				var order = this.files.data.order;
				var complete = true;
				if (order.length)
					for (var i=0; i<order.length; i++)
						complete = this.send(order[i])&&complete;

				if (complete)
					this._upload_complete();

				return;
			}
			var item = this.files.getItem(id);
			if (item.status !== 'client')
				return false;
			item.status = 'transfer';
			if(this.getSwfObject()){
				this.getSwfObject().upload(id, this._settings.upload,this._settings.formData||{});
			}
			return true;

		},
		$beforeAddFileToQueue: function( id, name, size ){
			var type = name.split(".").pop();
			var format = this._format_size(size);
			return this.callEvent("onBeforeFileAdd", [{
				id: id,
				name:name,
				size:size,
				sizetext:format,
				type:type
			}]);
		},
		$addFileToQueue: function(id, name, size){
			if(this.files.exists(id))
				return false;
			if (!this._settings.multiple)
				this.files.clearAll();
			var type = name.split(".").pop();
			var format = this._format_size(size);
			var file_struct = {
				name:name,
				id: id,
				size:size,
				sizetext:format,
				type:type,
				status:"client"
			};
			this.files.add(file_struct);
			this.callEvent("onAfterFileAdd", [file_struct]);

			if (id && this._settings.autosend)
				this.send(id);
		},
		stopUpload: function(id){
			this._stop_file(id);
		},
		_stop_file: function(id) {
			var item = this.files.getItem(id);
			this.getSwfObject().uploadStop(id);
			item.status = "client";
		},
		$onUploadSuccess: function(id,name,response){
			var item = this.files.getItem(id);
			if(item){
				item.status = "server";
				item.progress = 100;
				
				if(response.data && (typeof response.data == "string")){
					response = JSON.parse(response.data);
					webix.extend(item,response,true);
				}
				this.callEvent("onFileUpload", [item,response]);
				this.callEvent("onChange", []);
				this.files.updateItem(id);
			}
		},
		$onUploadFail: function(id){
			var item = this.files.getItem(id);
			item.status = "error";
			delete item.percent;
			this.files.updateItem(id);
			this.callEvent("onFileUploadError", [item, ""]);
		}
	},
	html5: {
		$render: function(config) {
			if (this._upload_area){
				this._contentobj.appendChild(this._upload_area);
				return;
			}
			this.files.attachEvent("onBeforeDelete", this._stop_file);

			var input_config =  {
				"type": "file",
				"class": "webix_hidden_upload",
				tabindex:-1
			};

			if (this._settings.accept)
				input_config.accept = this._settings.accept;

			if (this._settings.multiple)
				input_config.multiple = "true";

			var f = webix.html.create("input",input_config);
			this._upload_area = this._contentobj.appendChild(f);

			webix.event(this._viewobj, 'drop', webix.bind(function(e) { this._drop(e); webix.html.preventEvent(e); }, this));
			webix.event(f, 'change', webix.bind(function() { 
				this._add_files(f.files); 
				if (webix.env.isIE){
					var t = document.createElement("form");
					t.appendChild(this._upload_area);
					t.reset();
					this._contentobj.appendChild(f);
				} else 
					f.value = "";
			}, this));
			webix.event(this._viewobj, "click", webix.bind(function() { 
				var now_date = new Date();
				if (now_date - (this._upload_timer_click||0)  > 250){
					this.fileDialog();
				}
			}, this));

			webix.event(this._viewobj, 'dragenter', webix.html.preventEvent);
			webix.event(this._viewobj, 'dragexit', webix.html.preventEvent);
			webix.event(this._viewobj, 'dragover', webix.html.preventEvent);
		},

		// adding files by drag-n-drop
		_drop: function(e) {
			var files = e.dataTransfer.files;
			if (this.callEvent('onBeforeFileDrop', [files, e]))
				this._add_files(files);
			this.callEvent("onAfterFileDrop",[files, e]);
		},

		fileDialog:function(context){
			this._upload_timer_click = new Date();
			this._last_file_context = context;
			var inputs = this._viewobj.getElementsByTagName("INPUT");
			inputs[inputs.length-1].click();
		},
		send: function(id, details){
			//alternative syntx send(callback)
			if (typeof id == "function"){
				this._last_assigned_upload_callback = id; 
				id = 0;
			}

			if (!id){
				var order = this.files.data.order;
				var complete = true;
				
				if (order.length)
					for (var i=0; i<order.length; i++)
						complete = (!this.send(order[i], details)) && complete;

				if (complete)
					this._upload_complete();

				return;
			}

			var item = this.files.getItem(id);
			if (item.status !== 'client') return false;

			webix.assert(this._settings.upload, "You need to define upload url for uploader component");
			item.status = 'transfer';

			var formData = new FormData();
			formData.append("upload", item.file);

			var headers = {};
				details = details || {};

			if(webix.callEvent("onBeforeAjax",["POST", this._settings.upload, details, xhr, headers, formData])){
				for (var key in details)
					formData.append(key, details[key]);


				var xhr = item.xhr = new XMLHttpRequest();
				xhr.upload.addEventListener('progress', webix.bind(function(e){ this.$updateProgress(id, e.loaded/e.total*100); }, this), false);
				xhr.onload = webix.bind(function(e){ if (!xhr.aborted) this._file_complete(id); }, this);
				xhr.open('POST', this._settings.upload, true);

				for (var key in headers)
					xhr.setRequestHeader(key, headers[key]);

				xhr.send(formData);
			}

			this.$updateProgress(id, 0);
			return true;
		},

		_file_complete: function(id) {
			var item = this.files.getItem(id);
			if (item){
				var response = null;
				if(item.xhr.status == 200)
					response = webix.DataDriver.json.toObject(item.xhr.responseText);
				if (!response || response.status == "error"){
					item.status = "error";
					delete item.percent;
					this.files.updateItem(id);
					this.callEvent("onFileUploadError", [item, response]);
				} else {
					this._complete(id, response);
				}
				delete item.xhr;
			}
		},
		stopUpload: function(id){
			webix.bind(this._stop_file,this.files)(id);
		},
		_stop_file: function(id) {
			var item = this.getItem(id);
			if (typeof(item.xhr) !== 'undefined'){
				item.xhr.aborted = true;
				item.xhr.abort();
			}
			delete item.xhr;
			item.status = "client";
		}
	}
};


webix.protoUI({
	name:"uploader",
	defaults:{
		autosend:true,
		multiple:true
	},
	$cssName:"button",
	_allowsClear:true,

	//will be redefined by upload driver
	send:function(){},
	fileDialog:function(){},
	stopUpload:function(){},

	$init:function(config){
		var driver = webix.UploadDriver.html5;
		this.files = new webix.DataCollection();

		// browser doesn't support XMLHttpRequest2
		if (webix.isUndefined(XMLHttpRequest) || webix.isUndefined((new XMLHttpRequest()).upload))
			driver = webix.UploadDriver.flash;

		webix.assert(driver,"incorrect driver");
		webix.extend(this, driver, true);
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this,x,y)){
			this.render();
		}
	},
	apiOnly_setter:function(value){
		webix.delay(this.render, this);
		return (this.$apiOnly=value);
	},
	_add_files: function(files){
		for (var i = 0; i < files.length; i++)
			this.addFile(files[i]);

	},
	link_setter:function(value){
		if (value)
			webix.delay(function(){
				var view = webix.$$(this._settings.link);
				if (view.sync && view.filter)
					view.sync(this.files);
				else if (view.setValues)
					this.files.data.attachEvent("onStoreUpdated", function(){
						view.setValues(this);
					});
				view._settings.uploader = this._settings.id;
			}, this);
		return value;
	},

	addFile:function(name, size, type){
		var file = null;
		if (typeof name == "object"){
			file = name;
			name = file.name;
			size = file.size;
		}

		var format = this._format_size(size);
		type = type || name.split(".").pop();

		var file_struct = { 
			file:file, 
			name:name, 
			id:webix.uid(), 
			size:size, 
			sizetext:format, 
			type:type, 
			context:this._last_file_context,
			status:"client" 
		};
		if (this.callEvent("onBeforeFileAdd", [file_struct])){
			if (!this._settings.multiple)
				this.files.clearAll();
			
			var id = this.files.add(file_struct);
			this.callEvent("onAfterFileAdd", [file_struct]);
			if (id && this._settings.autosend)
				this.send(id, this._settings.formData);
		}
	},


	addDropZone:function(id){
		var node = webix.toNode(id);

		webix.event(node,"dragover", webix.html.preventEvent);
		webix.event(node,"dragover", function(e){
			webix.html.addCss(node, "webix_drop_file");
		});
		webix.event(node,"dragleave", function(e){
			webix.html.removeCss(node, "webix_drop_file");
		});

		webix.event(node,"drop", webix.bind(function(e){
			webix.html.removeCss(node, "webix_drop_file");

			var data=e.dataTransfer;
			if(data&&data.files.length)
				for (var i = 0; i < data.files.length; i++)
					this.addFile(data.files[i]);

			return webix.html.preventEvent(e);
		}, this));
	},
	
	_format_size: function(size) {
		var index = 0;
		while (size > 1024){
			index++;
			size = size/1024;
		}
		return Math.round(size*100)/100+" "+webix.i18n.fileSize[index];
	},

	_complete: function(id, response) {
		if (response.status === 'server') {
			var item = this.files.getItem(id);

			item.status = "server";
			item.progress = 100;
			webix.extend(item, response, true);

			this.callEvent("onFileUpload", [item, response]);
			this.callEvent("onChange", []);
			this.files.updateItem(id);
		}
		
		if (this.isUploaded())
			this._upload_complete(response);
	},
	_upload_complete:function(response){
		this.callEvent("onUploadComplete", [response]);
		if (this._last_assigned_upload_callback){
			this._last_assigned_upload_callback.call(this, response);
			this._last_assigned_upload_callback = 0;
		}
	},
	isUploaded:function(){
		var order = this.files.data.order;
		for (var i=0; i<order.length; i++)
			if (this.files.getItem(order[i]).status != "server")
				return false;

		return true;
	},

	$updateProgress: function(id, percent) {
		var item = this.files.getItem(id);
		item.percent = Math.round(percent);
		this.files.updateItem(id);
	},
	setValue:function(value){
		if (typeof value == "string")
			value = { value:value, status:"server" };

		this.files.clearAll();
		if (value)
			this.files.parse(value);

		this.callEvent("onChange", []);
	},
	getValue:function(){
		var data = [];
		this.files.data.each(function(obj){
			if (obj.status == "server")
				data.push(obj.value||obj.name);
		});

		return data.join(",");
	}

}, webix.ui.button);

webix.html.addMeta = function(name, value){
	document.getElementsByTagName('head').item(0).appendChild(webix.html.create("meta",{
		name:name,
		content:value
	}));	
	
};

(function(){
	
var orientation = function(){
	var new_orientation = !!(window.orientation%180);
	if (webix.ui.orientation === new_orientation) return;
	webix.ui.orientation = new_orientation;	
	webix.callEvent("onRotate", [new_orientation]);
};
if(webix.env.touch){
	webix.ui.orientation = !!((webix.isUndefined(window.orientation)?90:window.orientation)%180);
	webix.event(window, ("onorientationchange" in window ?"orientationchange":"resize"), orientation);
}


if(webix.env.isFF && window.matchMedia){
	window.matchMedia("(orientation: portrait)").addListener(function() {webix.ui.orientation = false; });
	window.matchMedia("(orientation: landscape)").addListener(function() { webix.ui.orientation = true; });
}
webix.ui.fullScreen = function(){
	if (!webix.env.touch) return;

	webix.html.addMeta("apple-mobile-web-app-capable","yes");
	webix.html.addMeta("viewport","initial-scale=1, maximum-scale=1, user-scalable=no");

	//in ios5 we can have empty offsetHeight just after page loading
	var size = document.body.offsetHeight||document.body.scrollHeight;

	var iphone = navigator.userAgent.indexOf("iPhone")!=-1;
	var ipad = navigator.userAgent.indexOf("iPad")!=-1;

	var version = navigator.userAgent.match(/iPhone OS (\d+)/);
	var iOS7 = version&&(version[1]>=7);


    var iphone_safari = iphone && (size == 356 || size == 208 || size == 306 || size == 158 || size == 444);
    var iphone5 = (window.screen.height==568);

	var fix = function(){
		var x = 0; var y=0;
		if (iphone && !iOS7){
			if (!webix.ui.orientation){
				x = 320;
                y = iphone5?(iphone_safari?504:548):(iphone_safari?416:460);
			} else {
                x = iphone5?568:480;
				y = iphone_safari?268:300;
			}
		} else if (webix.env.isAndroid){

			if(!webix.env.isFF){
				//ipad doesn't change orientation and zoom level, so just ignore those lines
				document.body.style.width = document.body.style.height = "1px";
				document.body.style.overflow="hidden";

				var dmod = window.outerWidth/window.innerWidth; //<1
				x = window.outerWidth/dmod;
				y = window.outerHeight/dmod;
			}
		} else if(!webix.env.isIEMobile){
			x = window.innerWidth;
			y = window.innerHeight;
		}

		if (y){
			document.body.style.height = y+"px";
			document.body.style.width = x+"px";
		}

		webix.ui.$freeze = false;
		webix.ui.resize();
	};

	var onrotate = function(){ 
		webix.ui.$freeze = true;
		if(webix.env.isSafari) 
			fix();
		else
			webix.delay(fix,null, [], 500);
	};


	webix.attachEvent("onRotate", onrotate);
	orientation();
	webix.delay(onrotate);

};


})();
(function(){

if (window.jQuery){

	var $ = jQuery;
	var methods = [];

	var get_id = function(node){
		if (node && node.getAttribute)
			return node.getAttribute("view_id");
	};

	var get_helper = function(name){
		return function(config){
			if (typeof(config) === 'string') {
				if (methods[config] ) {
					return methods[config].apply(this, []);
				}else {
					$.error('Method ' +  config + ' does not exist on jQuery.'.name);
				}
			} else {
				var views = [];
				this.each(function() {
					var view;
					var id;

					//if target a webix component - return it
					var id = get_id(this) || get_id(this.firstChild);
					if (id)
						view = webix.$$(id);
					
					if (!view){
						//do not include data in copy as it can be massive
						var temp_data = config?config.data:0;
						if (temp_data) config.data = null;

						var copy = webix.copy(config||{ autoheight:true, autowidth:true });
						copy.view = name;
						if (temp_data) config.data = copy.data = temp_data;


						if (this.tagName.toLowerCase() === 'table') {
							var div = webix.html.create("div",{
								id:(this.getAttribute("id")||""),
								"class":(this.getAttribute("class")||"")
							},"");
							
							this.parentNode.insertBefore(div, this);
							copy.container = div;
							view = webix.ui(copy);
							view.parse(this, "htmltable");
						} else {
							copy.container = this;
							view = webix.ui(copy);
						}
					}
					views.push(view);
				});
				
				if (views.length === 1) return views[0];
				return views;
			}
		};
	};
	
	var run = function(){
		for (var key in webix.ui){
			var name = "webix_"+key;
			if (!$.fn[name])
				$.fn[name] = get_helper(key);
		}
	};

	run();
	$(run);

}

})();

/*
	Behavior:History - change multiview state on 'back' button

 */

webix.history = {
	track:function(id, url){
		this._init_state(id, url);

		var view = webix.$$(id);
		
		var handler = function(){
			if (webix.history._ignored) return;

			if (view.getValue)
				webix.history.push(id, view.getValue());
		};

		if (view.getActiveId)
			view.attachEvent("onViewChange", handler);
		else
			view.attachEvent("onChange", handler);
	},
	_set_state:function(view, state){
		webix.history._ignored = 1;

		view = webix.$$(view);
		if (view.callEvent("onBeforeHistoryNav", [state]))
			if (view.setValue)
				view.setValue(state);

		webix.history._ignored = 0;
	},
	push:function(view, url, value){
		view = webix.$$(view);
		var new_url = "";
		if (url)
			new_url = "#!/"+url;
		if (webix.isUndefined(value)){
			if (view.getValue)
				value = view.getValue();
			else
				value = url;
		}

		window.history.pushState({ webix:true, id:view._settings.id, value:value }, "", new_url);
	},
	_init_state:function(view, url){
		webix.event(window, "popstate", function(ev){
			if (ev.state && ev.state.webix){
				webix.history._set_state(ev.state.id, ev.state.value);
			}
		});

		var state = window.location.hash;
		webix.noanimate = true;
		if (state && state.indexOf("#!/") === 0)
			webix.history._set_state(view, state.replace("#!/",""));
		else if (url){
			webix.history.push(view, url);
			webix.history._set_state(view, url);
		}
		webix.noanimate = false;
		
		this._init_state = function(){};
	}
};
webix.protoUI({
	name:"fieldset",
	defaults:{
		borderless:true
	},
	$init:function(obj){
		webix.assert(obj.body, "fieldset must have not-empty body");

		this._viewobj.className += " webix_fieldset";
		this._viewobj.innerHTML =  "<fieldset><legend></legend><div></div></fieldset>";
	},
	label_setter:function(value){
		this._viewobj.firstChild.childNodes[0].innerHTML = value;
		return value;
	},
	getChildViews:function(){
		return [this._body_view];
	},
	body_setter:function(config){
		this._body_view = webix.ui(config, this._viewobj.firstChild.childNodes[1]);
		this._body_view._parent_cell = this;
		return config;
	},
	getBody:function(){
		return this._body_view;
	},
	$getSize:function(x,y){
		webix.debug_size_box_start(this, true);
		x+=18; y+=45;
		var t = this._last_body_size = this._body_view.$getSize(x,y);
		webix.debug_size_box_end(this, t);
		return t;
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this, x,y)){
			y = Math.min(this._last_body_size[3], y);
			x = Math.min(this._last_body_size[1], x);
			this._body_view.$setSize(x-18,y-45);
		}
	}
}, webix.ui.view);


webix.protoUI({
	name:"slider",
    $touchCapture:true,
    defaults:{
        min:0,
        max:100,
        value:50,
        step:1,
        title:false,
		template:function(obj, common){
            var id = common._handle_id = "x" +(obj.id || webix.uid());
            var html = "<div class='webix_slider_title'></div><div class='webix_slider_box'><div class='webix_slider_left'>&nbsp;</div><div class='webix_slider_right'></div><div class='webix_slider_handle' id='"+id+"'>&nbsp;</div></div>";
            return common.$renderInput(obj, html, id);
		}
	},
	type_setter:function(type){
		this._viewobj.className += " webix_slider_"+type;
	},
    title_setter:function(value){
        if (typeof value == 'string')
            return webix.template(value);
        return value;
    },
    _get_slider_handle:function(){
        //not very good, but reliable enough
        return document.getElementById(this._handle_id);
    },
    _set_inner_size:function(){
        
        var handle = this._get_slider_handle();
        var config = this._settings;

        //10 - padding of webix_slider_box ( 20 = 10*2 )
        //8 - width of handle / 2 

        if (handle){    //view is rendered for sure
            var width = this._get_input_width(config);

	        var value = config.value%config.step?(Math.round(config.value/config.step)*config.step):config.value;
	        value =  Math.max(Math.min(value,config.max),config.min);
            var max = config.max - config.min;
            var left = Math.ceil((width - 20) * (value-config.min) / max);
            var right = width-20-left;

            handle.style.left = 10 + left - 8 + "px";
            handle.parentNode.style.width = width+"px";
	        //1px border
	        right = Math.min(Math.max(right,2),width-22);
	        left = Math.min(Math.max(left,2),width-22);
	        //width for left and right bars
            var part = handle.previousSibling;
            part.style.width = right + "px";
            var last = part.previousSibling;
            last.style.width = left + "px";

            if (this._settings.title){
                handle.parentNode.previousSibling.innerHTML = this._settings.title(this._settings, this);
            }
        }
    },
    refresh:function(){
        this._set_inner_size();
    },
    $setValue:function(){
        this.refresh();
    },
    $getValue:function(){
        return this._settings.value;
    },
    $init:function(){
	    if(webix.env.touch){
		    this.attachEvent("onTouchStart" , webix.bind(this._on_mouse_down_start, this));
	    }
	    else
            webix.event(this._viewobj, "mousedown", webix.bind(this._on_mouse_down_start, this));
    },
    _on_mouse_down_start:function(e){
        var trg = e.target || e.srcElement;
	    if(this._mouse_down_process){
		    this._mouse_down_process(e);
	    }

	    var value = this._settings.value;
	    if(webix.isArray(value))
		    value = webix.copy(value);

        if (trg.className.indexOf("webix_slider_handle")!=-1){
            this._start_value = value;
            return this._start_handle_dnd.apply(this,arguments);
        } else if (trg.className.indexOf("webix_slider") != -1){
            this._start_value = value;

            this._settings.value = this._get_value_from_event.apply(this,arguments);

            this._start_handle_dnd(e);
        }
    },
    _start_handle_dnd:function(e){
	    if(webix.env.touch){
		    this._handle_drag_events = [
			    this.attachEvent("onTouchMove" , webix.bind(this._handle_move_process, this)),
		        this.attachEvent("onTouchEnd"  , webix.bind(this._handle_move_stop, this))
		    ];
	    }
		else
	        this._handle_drag_events = [
	            webix.event(document.body, "mousemove", webix.bind(this._handle_move_process, this)),
	            webix.event(document.body, "mouseup", webix.bind(this._handle_move_stop, this))
	        ];
        webix.html.addCss(document.body,"webix_noselect");
    },
    _handle_move_stop:function(e){
        //detach event handlers
	    if(this._handle_drag_events){
		    if(webix.env.touch){
			    webix.detachEvent(this._handle_drag_events[0]);
			    webix.detachEvent(this._handle_drag_events[1]);
		    }
		    else{
			    webix.eventRemove(this._handle_drag_events[0]);
			    webix.eventRemove(this._handle_drag_events[1]);
		    }
		    this._handle_drag_events = [];
	    }

        webix.html.removeCss(document.body,"webix_noselect");

        var value = this._settings.value;
	    if(webix.isArray(value))
		    value = webix.copy(value);

	    this._settings.value = this._start_value;
        this.setValue(value);
    },
    _handle_move_process:function(e){

        this._settings.value = this._get_value_from_event.apply(this,arguments);

        this.refresh();
        this.callEvent("onSliderDrag", []);
    },
	_get_value_from_event:function(event,touchContext){
		// this method takes 2 arguments in case of touch env
		var pos = 0;
		if(webix.env.touch){
			pos = touchContext?touchContext.x: event.x;
		}
		else
			pos = webix.html.pos(event).x;
		return this._get_value_from_pos(pos);
	},
    _get_value_from_pos:function(pos){
        var config = this._settings;
        //10 - padding of slider box
        var max = config.max - config.min;
        var left = webix.html.offset(this._get_slider_handle().parentNode).x;
        var newvalue = Math.ceil((pos-left) * max / this._get_input_width(config));
        newvalue = Math.round((newvalue+config.min)/config.step) * config.step;
        return Math.max(Math.min(newvalue, config.max), config.min);
    },
    _init_onchange:function(){} //need not ui.text logic
}, webix.ui.text);

/*webix.require core/proxy.js*/


/*
	view.load("offline->some.php")

	or

	view.load( webix.proxy("offline", "some.php") );

	or

	view.load( webix.proxy("offline", "post->url.php") );
*/

webix.proxy.offline = {
	$proxy:true,

	storage: webix.storage.local,
	cache:false,
	data:"",

	_is_offline : function(){
		if (!this.cache && !webix.env.offline){
			webix.call("onOfflineMode",[]);
			webix.env.offline = true;
		}
	},
	_is_online : function(){
		if (!this.cache && webix.env.offline){
			webix.env.offline = false;
			webix.call("onOnlineMode", []);
		}
	},

	load:function(view, callback){
		var mycallback = {
			error:function(){
				//assuming offline mode
				var text = this.getCache() || this.data;

				var loader = { responseText: text };
				var data = webix.ajax.prototype._data(loader);

				this._is_offline();
				webix.ajax.$callback(view, callback, text, data, loader);
			},
			success:function(text, data, loader){
				this._is_online();
				webix.ajax.$callback(view, callback, text, data, loader);

				this.setCache(text);
			}
		};

		//in cache mode - always load data from cache
		if (this.cache && this.getCache())
			mycallback.error.call(this);
		else {
			//else try to load actual data first
			if (this.source.$proxy)
				this.source.load(this, mycallback);
			else
				webix.ajax(this.source, mycallback, this);
		}
	},
	getCache:function(){
		return this.storage.get(this._data_name());
	},
	clearCache:function(){
		this.storage.remove(this._data_name());
	},
	setCache:function(text){
		this.storage.put(this._data_name(), text);
	},
	_data_name:function(){
		if (this.source.$proxy)
			return this.source.source + "_$proxy$_data";
		else 
			return this.source + "_$proxy$_data";
	},
	saveAll:function(view, update, dp, callback){
		this.setCache(view.serialize());
		webix.ajax.$callback(view, callback, "", update);
	},
	result:function(id, master, dp, text, data){
		for (var i = 0; i < data.length; i++)
			dp.processResult({ id: data[i].id, status: data[i].operation }, {}, {});
	}
};

webix.proxy.cache = {
	init:function(){
		webix.extend(this, webix.proxy.offline);
	},
	cache:true
};

webix.proxy.local = {
	init:function(){
		webix.extend(this, webix.proxy.offline);
	},
	cache:true,
	data:[]
};

if (window.angular)

(function(){

  function id_helper($element){
    //we need uniq id as reference
    var id = $element.attr("id");
    if (!id){
      id = webix.uid();
      $element.attr("id", id);
    }
    return id;
  }

  function locate_view_id($element){
    if (typeof $element.attr("webix-ui") != "undefined")
      return $element.attr("id");
    return locate_view_id($element.parent());
  }




//creates webix ui components
angular.module("webix", [])
  .directive('webixUi', [ "$parse", function($parse) {
    return {
      restrict: 'A',
      scope: false,
      link:function ($scope, $element, $attrs, $controller){
        var dataname = $attrs["webixUi"];
        var callback = $attrs["webixReady"];
        var wxRoot = null;
        var id = id_helper($element);

        $element.ready(function(){  
          if (wxRoot) return;

          if (callback)
            callback = $parse(callback);

          //destruct components
          $element.bind('$destroy', function() {
            if(wxRoot) wxRoot.destructor();
          });

          //webix-ui attribute has some value - will try to use it as configuration
          if (dataname){
            //configuration
            var watcher = function(data){
              if (wxRoot) wxRoot.destructor();
              if ($scope[dataname]){
                var config = webix.copy($scope[dataname]);
                config.$scope =$scope;
                wxRoot = webix.ui(config, $element[0]);
                if (callback)
                  callback($scope, { root: wxRoot });
              }
            };
            $scope.$watch(dataname, watcher);
            watcher();
          } else {
          //if webix-ui is empty - init inner content as webix markup
            if (!$attrs["view"])
              $element.attr("view", "rows");
            
            var ui = webix.markup;
            var tmp_a = ui.attribute; ui.attribute = "";
            //FIXME - memory leaking, need to detect the moment of dom element removing and destroy UI
            if (typeof $attrs["webixRefresh"] != "undefined")
              wxRoot = ui.init($element[0], $element[0], $scope);
            else
              wxRoot = ui.init($element[0], null, $scope);

            ui.attribute = tmp_a;

            if (callback)
              callback($scope, { root: wxRoot });
          }

          //size of ui
          $scope.$watch(function() {
            return $element[0].offsetWidth + "." + $element[0].offsetHeight;
          }, function() {
            if (wxRoot) wxRoot.adjust();
          });

        });
      }
    };
  }])

  .directive('webixShow', [ "$parse", function($parse) {
    return {
      restrict: 'A',
      scope: false,

      link:function ($scope, $element, $attrs, $controller){
        var attr = $parse($attrs["webixShow"]);
        var id = id_helper($element);

        if (!attr($scope))
            $element.attr("hidden", "true");

        $scope.$watch($attrs["webixShow"], function(){
          var view = webix.$$(id);
          if (view){
            if (attr($scope)){
              webix.$$(id).show();
              $element[0].removeAttribute("hidden");
            } else
              webix.$$(id).hide();
          }
        });

      }
    };
  }])

  .directive('webixEvent', [ "$parse", function($parse) {
    var wrap_helper = function($scope, view, eventobj){
      var ev = eventobj.split("=");
      var action = $parse(ev[1]);
      var name = ev[0].trim();
      view.attachEvent(name, function(){              
        return action($scope, { id:arguments[0], details:arguments });
      });
    };

    return {
      restrict: 'A',
      scope: false,
      
      link:function ($scope, $element, $attrs, $controller){
        var events = $attrs["webixEvent"].split(";");
        var id = id_helper($element);

        setTimeout(function(){
          var first = $element[0].firstChild;
          if (first && first.nodeType == 1)
            id = first.getAttribute("view_id") || id;

          var view = webix.$$(id);
          for (var i = 0; i < events.length; i++) {
            wrap_helper($scope, view, events[i]);
          }
        });

      }
    };
  }])

  .directive('webixElements', [ "$parse", function($parse) {
    return {
      restrict: 'A',
      scope: false,

      link:function ($scope, $element, $attrs, $controller){

        var data = $attrs["webixElements"];
        var id = id_helper($element);
        
        if ($scope.$watchCollection)
          $scope.$watchCollection(data, function(collection){
            setTimeout(function(){
              var view = webix.$$(id);
              if (view){
                view.define("elements", collection);
                view.refresh();
              }
            },1);
          });
      }

    };
  }])

  .directive('webixData', [ "$parse", function($parse) {
    return {
      restrict: 'A',
      scope: false,

      link:function ($scope, $element, $attrs, $controller){

        var data = $attrs["webixData"];
        var id = id_helper($element);
        
        if ($scope.$watchCollection)
          $scope.$watchCollection(data, function(collection){
            if (collection){
              setTimeout(function(){
                var first = $element[0].firstChild;
                if (first && first.nodeType == 1)
                id = first.getAttribute("view_id") || id;
              
                var view = webix.$$(id);
                if (view){
                  if (view.options_setter){
                    view.define("options", collection);
                    view.refresh();
                  }else{
                    if (view.clearAll)
                      view.clearAll();
                    view.parse(collection);
                  }
                }
              },1);
            }
          });
      }

    };
  }]);
})();
if (window.Backbone)
(function(){

	var cfg = {
		use_id : false
	};

	function _start_ext_load(cal){
		cal._backbone_loading = true;
		cal.callEvent("onBeforeLoad", []);
		cal.blockEvent();
	}
	function _finish_ext_load(cal){
		cal.unblockEvent();
		cal._backbone_loading = false;
		cal.refresh();
	}

webix.attachEvent("onUnSyncUnknown", function(wData, bData){
	var whandlers = wData._sync_events;
	var handlers = wData._sync_backbone_events;

	for (var i = 0; i < whandlers.length; i++)
		wData.detachEvent(whandlers[i]);

	for (var i = 0; i < handlers.length; i++)
		bData.off.apply(bData, handlers[i]);        
});

webix.attachEvent("onSyncUnknown", function(wData, bData, config){
	if (config) cfg = config;
	if (cfg.get && typeof cfg.get == "string")
		cfg.get = cfg.get.split(",");

	//remove private properties
	function sanitize(ev){
		if (cfg.use_id)
			return ev;

		var obj = {};
		for (var key in ev)
			if (key != "id")
				obj[key] = ev[key];

		return obj;
	}
	
	function _get_id(model){
		return cfg.use_id ? model.id : model.cid;
	}

	function datareset(wData, bData){
		var data = [];
		bData.each(function(model){
			var cid = _get_id(model);
			var ev =  copymodel(model);
			ev.id = cid;
			data.push(ev);
		});
		wData.clearAll();
		wData._parse(data);
	}

	function copymodel(model){
		if (cfg.get){
			var data = {};
			for (var i = 0; i < cfg.get.length; i++){
				var key = cfg.get[i];
				data[key] = model.get(key);
			}
			return data;
		}
		return model.toJSON();
	}

	var handlers = [
		["change", function(model, info){
			var cid = _get_id(model);
			var ev = wData.pull[cid] = copymodel(model);
			ev.id = cid;

			if (wData._scheme_update)
				wData._scheme_update(ev);
			wData.refresh(ev.id);
		}],
		["remove", function(model, changes){
			var cid = _get_id(model);
			if (wData.pull[cid])
				wData.remove(cid);
		}],
		["add", function(model, changes){
			var cid = _get_id(model);
			if (!wData.pull[cid]){
				var ev =  copymodel(model);
				ev.id = cid;
				if (wData._scheme_init)
					wData._scheme_init(ev); 
				wData.add(ev);
			}
		}],
		["reset", function(model, changes){
			datareset(wData, bData);
		}],
		["request", function(obj){
			if (obj instanceof Backbone.Collection)
				_start_ext_load(wData);
		}],
		["sync", function(obj){
			if (obj instanceof Backbone.Collection)
				_finish_ext_load(wData);
		}],
		["error", function(obj){
			if (obj instanceof Backbone.Collection)
				_finish_ext_load(wData);
		}]
	];

	for (var i = 0; i < handlers.length; i++)
        bData.bind.apply(bData, handlers[i]);


    var whandlers = [
		wData.attachEvent("onAfterAdd", function(id){
			if (!bData.get(id)){
				var data = sanitize(wData.getItem(id));
				var model = new bData.model(data);

				var cid = _get_id(model);
				if (cid != id)
					this.changeId(id, cid);

				bData.add(model);
				bData.trigger("webix:add", model);
			}
			return true;
		}),
		wData.attachEvent("onDataUpdate", function(id){
			var ev = bData.get(id);
			var upd = sanitize(wData.getItem(id));

			ev.set(upd);
			bData.trigger("webix:change", ev);

			return true;
		}),
		wData.attachEvent("onAfterDelete", function(id){
			var model = bData.get(id);
			if (model){
				bData.trigger("webix:remove", model);
				bData.remove(id);
			}
			return true;
		})
	];

	wData._sync_source = bData;
    wData._sync_events = whandlers;
    wData._sync_backbone_events = handlers;

	if (bData.length || wData.count()){
		datareset(wData, bData);
	}
});

window.WebixView = Backbone.View.extend({
	tagName:"div",
	//startign from backbone 1.1, this.options is not saved automatically
	initialize : function (options) {
		this.options = options || {};
	},
	render:function(){
		if (this.beforeRender) this.beforeRender.apply(this, arguments);

		var config = this.config || this.options.config;
		var el = this.el ? $(this.el)[0] : document.body;
		//clear previous content if any
		if (el && !el.config) el.innerHTML = "";
		this.root = webix.ui(webix.copy(config), el);
		
		if (this.afterRender) this.afterRender.apply(this, arguments);
		return this;
	},
	destroy:function(){
		if (this.root) this.root.destructor();
	},
	getRoot:function(){
		return this.root;
	},
	getChild:function(id){
		webix.assert(this.root.$$, "You need to set isolate property for top view");
		return this.root.$$(id);
	}
});

})();






webix.ActiveContent = {
	$init:function(config){  
		if (config.activeContent){
			this.$ready.push(this._init_active_content_list);
			
			this._active_holders = {};
			this._active_holders_item = {};
			this._active_holders_values = {};
			this._active_references = {};
			
			for (var key in config.activeContent){
				this[key] = this._bind_active_content(key);
				if (config.activeContent[key].earlyInit){
					var temp = webix._parent_cell; webix._parent_cell = null;
					this[key].call(this,{},this, config.activeContent);
					webix._parent_cell=temp;
				}
			}
		}
	},
	_init_active_content_list:function(){
		webix.event(this.$view, "blur", function(ev){
			var el = webix.$$(ev);
			if (el !== this && el.getValue  && el.setValue){
				el.getNode(ev);

				var newvalue = el.getValue();
				if (newvalue != el._settings.value)
					el.setValue(newvalue);
			}
		}, this, true);

		if (this.filter){
			for (var key in this._settings.activeContent){
				this.type[key] = this[key];
				this[key] = this._locate_active_content_by_id(key);
			}
			//really bad!	
			this.type.masterUI = this;
		}
	},
	_locate_active_content_by_id:function(key){
		return function(id){
			var button = this._active_references[key];
			var button_id = button._settings.id;
			var html = this.getItemNode(id).getElementsByTagName("DIV");
			for (var i=0; i < html.length; i++) {
				if (html[i].getAttribute("view_id") == button_id){
					button._viewobj = button._dataobj = html[i];
					break;
				}
			}
			return button;
		};
	},
	_get_active_node:function(el, key, master){
		return function(e){
			if (e){
				var trg=e.target||e.srcElement;
				while (trg){
					if (trg.getAttribute && trg.getAttribute("view_id")){
						el._dataobj = el._viewobj = el.$view = trg;
						if (master.locate){
							var id = master.locate(trg.parentNode);
							var value = master._active_holders_values[key][id];
							el._settings.value = value;
							el._settings.$masterId = id;
						}
						return trg;
					}
					trg = trg.parentNode;
				}				
			}
			return el._viewobj;
		};
	},
	_set_new_active_value:function(key, master){
		return function(value){
			var data = master.data;
			if (master.filter){
				var id = master.locate(this._viewobj.parentNode);
				data = master.getItem(id);
				//XMLSerializer - FF "feature"
				this.refresh();
				master._active_holders_item[key][id]=this._viewobj.outerHTML||(new XMLSerializer().serializeToString(this._viewobj));
				master._active_holders_values[key][id] = value;
			}
			data[key] = value;
		};
	},
	_bind_active_content:function(key){ 
		return function(obj, common, active){
			var object = common._active_holders?common:common.masterUI;

			if (!object._active_holders[key]){
				var d = document.createElement("DIV");
				
				active = active || object._settings.activeContent;
				var el = webix.ui(active[key], d);
				d.firstChild.setAttribute("onclick", "event.processed = true; if (webix.env.isIE8) event.srcElement.w_view = '"+el._settings.id+"';");

				el.getNode = object._get_active_node(el, key, object);

				el.attachEvent("onChange", object._set_new_active_value(key, object));
				
				object._active_references[key] = el;
				object._active_holders[key] = d.innerHTML;
				object._active_holders_item[key] = {};
				object._active_holders_values[key] = {};
			}
			if (object.filter && obj[key] != object._active_holders_values[key] && !webix.isUndefined(obj[key])){
				var el = object._active_references[key];
				el.blockEvent();
				//in IE we can lost content of active element during parent repainting
				if (!el.$view.firstChild) el.refresh();
				el.setValue(obj[key]);
				el.refresh();
				el.unblockEvent();
				
				object._active_holders_values[key][obj.id] = obj[key];
				object._active_holders_item[key][obj.id] = el._viewobj.outerHTML||(new XMLSerializer().serializeToString(el._viewobj));
			}
			
			return object._active_holders_item[key][obj.id]||object._active_holders[key];
		};
	}
};
webix.ProgressBar = {
	$init:function(){
		if (webix.isUndefined(this._progress) && this.attachEvent){
			this.attachEvent("onBeforeLoad", this.showProgress);
			this.attachEvent("onAfterLoad", this.hideProgress);
			this._progress = null;
		}
	},
	showProgress:function(config){
		// { position: 0 - 1, delay: 2000ms by default, css : name of css class to use }
		if (!this._progress){

			config = webix.extend({
				position:0,
				delay: 2000,
				type:"icon",
				icon:"refresh",
				hide:false
			}, (config||{}), true);

			var incss = (config.type == "icon") ? ("fa-"+config.icon+" fa-spin") : "";



			this._progress = webix.html.create(
				"DIV",
				{ "class":"webix_progress_"+config.type},
				"<div class='webix_progress_state "+incss+"'></div>"
			);
			this._viewobj.style.position = "relative";
			webix.html.insertBefore(this._progress, this._viewobj.firstChild, this._viewobj);

			if(!webix.Touch.$active){
				if(this.getScrollState){
					var scroll = this.getScrollState();
					if(this._viewobj.scrollWidth != this.$width){
						this._progress.style.left = scroll.x +"px";
					}
					if(this._viewobj.scrollHeight != this.$height){
						if(config.type != "bottom"){
							this._progress.style.top = scroll.y +"px";
						} else {
							this._progress.style.top =  scroll.y + this.$height - this._progress.offsetHeight +"px";
						}

					}
				}
			}


			this._progress_delay = 1;
		}

		if (config && config.type != "icon")
			webix.delay(function(){
				if (this._progress){
					var position = config.position || 1;
					//check for css-transition support
					if(this._progress.style[webix.env.transitionDuration] !== webix.undefined || !config.delay){
						this._progress.firstChild.style.width = position*100+"%";
						if (config.delay)
							this._progress.firstChild.style[webix.env.transitionDuration] = config.delay+"ms";
					} else{
					//if animation is not supported fallback to timeouts [IE9]
						var count = 0,
							start = 0,
							step = position/config.delay*30,
							view = this;

						if(this._progressTimer){
							//reset the existing progress
							window.clearInterval(this._progressTimer);
							start = this._progress.firstChild.offsetWidth/this._progress.offsetWidth*100;
						}
						this._progressTimer = window.setInterval(function(){
							if(count*30 == config.delay){
								window.clearInterval(view._progressTimer);
							}
							else{
								view._progress.firstChild.style.width = start+count*step*position*100+"%";
								count++;
							}
						},30);
					}

					if (config.hide)
						webix.delay(this.hideProgress, this, [1], config.delay);

				}
				this._progress_delay = 0;
			}, this);
		
	},
	hideProgress:function(now){
		if (this._progress_delay)
			now = true;

		if (this._progress){
			if (now){
				if(this._progressTimer)
					window.clearInterval(this._progressTimer);
				webix.html.remove(this._progress);
				this._progress = null;
			} else {
				this.showProgress({ position:1.1, delay:300 , hide:true });
			}
		}		
	}
};

/*
	UI:Video
*/

webix.protoUI({
	name:"video",
	$init:function(config){
		if (!config.id) config.id = webix.uid();
		this.$ready.push(this._init_video);
	},
	_init_video:function(){
		var c = this._settings;
		this._contentobj  = webix.html.create("video",{
			"class":"webix_view_video",
			"style":"width:100%;height:100%;",
			"autobuffer":"autobuffer"
		},"");
		if(c.poster)
			this._contentobj.poster=c.poster;

		if(c.src){
			if(typeof c.src!= "object")
				c.src = [c.src];
			for(var i = 0; i < c.src.length;i++)
				this._contentobj.innerHTML += ' <source src="'+ c.src[i]+'">';
		}
		/*if(this._contentobj.addEventListener)
		this._contentobj.addEventListener('click', function(videoNode) { 
          return function() { 
            videoNode.play(); 
          }; 
        }(this._contentobj),false); */
	
		if(c.controls)
			this._contentobj.controls=true;
		if(c.autoplay)
			this._contentobj.autoplay=true;
		this._viewobj.appendChild(this._contentobj);
	},
	getVideo:function(){
		return this._contentobj;
	},
	defaults:{
		src:"",
		controls: true
	}
}, webix.ui.view);
