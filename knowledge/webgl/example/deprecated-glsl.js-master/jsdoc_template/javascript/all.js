/**
 * @fileOverview Contains standard code in the namespace 'wbos' and code specifically written for Codeview in the namespace 'codeview'
 * @author Wouter Bos (www.thebrightlines.com)
 * @since 1.0 - 2010-09-10
 * @version 1.0 - 2010-09-10
 */






if (typeof(wbos) == "undefined") {
	/**
	 * @namespace Standard code of Wouter Bos (wbos)
	 */
	wbos = {}
}
if (typeof(wbos.CssTools) == "undefined") {
	/**
	 * @namespace Namespace for CSS-related functionality
	 */
	wbos.CssTools = {}
}




/**
 * @namespace Fallback for CSS advanced media query
 * @class
 * @since 1.0 - 2010-09-10
 * @version 1.0 - 2010-09-10
 */
wbos.CssTools.MediaQueryFallBack = ( function() {
	var config = {
		cssScreen: "/css/screen.css",
		cssHandheld: "/css/handheld.css",
		mobileMaxWidth: 660,
		testDivClass: "cssLoadCheck",
		dynamicCssLinkId: "DynCssLink",
		resizeDelay: 30
	}
	var noMediaQuery = false;
	var delay;
	var currentCssMediaType;

	// Adding events to elements in the DOM without overwriting it
	function addEvent(element, newFunction, eventType) {
		var oldEvent = eval("element." + eventType);
		var eventContentType = eval("typeof element." + eventType)
		
		if ( eventContentType != 'function' ) {
			eval("element." + eventType + " = newFunction")
		} else {
			eval("element." + eventType + " = function(e) { oldEvent(e); newFunction(e); }")
		}
	}
	
	// Get the the inner width of the browser window
	function getWindowWidth() {
		if (window.innerWidth) {
			return window.innerWidth;
		} else if (document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		} else if (document.body.clientWidth) {
			return document.body.clientWidth;
		} else{
			return 0;	
		}
	}
	
	function addCssLink(cssHref) {
		var cssNode = document.createElement('link');
		var windowWidth;
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.media = 'screen, handheld, fallback';
		cssNode.href = cssHref;
		document.getElementsByTagName("head")[0].appendChild(cssNode);
	}
	


	/* Start public */
	return {
  		/**
		 * Adds link to CSS in the head if no CSS is loaded
		 *
		 * @since 1.0 - 2010-08-21
		 * @version 1.0 - 2010-08-21
		 * @param {String|Object} cssScreen URL to CSS file for larger screens
		 * @param {String|Object} cssHandheld URL to CSS file for smaller screens
		 * @param {Number} mobileMaxWidth Maximum  width for handheld devices
		 * @example
		 * wbos.CssTools.MediaQueryFallBack.LoadCss(['screen.css', 'screen2.css'], 'mobile.css', 480)
		 */
		LoadCss: function(cssScreen, cssHandheld, mobileMaxWidth) {
			// Set config values
			if (typeof(cssScreen) != "undefined") {
				config.cssScreen = cssScreen;	
			}
			if (typeof(cssHandheld) != "undefined") {
				config.cssHandheld = cssHandheld;	
			}
			if (typeof(mobileMaxWidth) != "undefined") {
				config.mobileMaxWidth = mobileMaxWidth;	
			}
			
			// Check if CSS is loaded
			var cssloadCheckNode = document.createElement('div');
			cssloadCheckNode.className = config.testDivClass;
			document.getElementsByTagName("body")[0].appendChild(cssloadCheckNode);
			if (cssloadCheckNode.offsetWidth != 100 && noMediaQuery == false) {
				noMediaQuery = true;
			}
			cssloadCheckNode.parentNode.removeChild(cssloadCheckNode)
			
			if (noMediaQuery == true) {
				// Browser does not support Media Queries, so JavaScript will supply a fallback 
				var cssHref = "";
				
				// Determines what CSS file to load
				if (getWindowWidth() <= config.mobileMaxWidth) {
					cssHref = config.cssHandheld;
					newCssMediaType = "handheld";
				} else {
					cssHref = config.cssScreen;
					newCssMediaType = "screen";
				}
				
				// Add CSS link to <head>
<script id="Users/tangbin/git/tangbindu.github.io/knowledge/webgl/example/water/dist/js/vertex.glsl" type="x-shader/x-vertex" >
// file=""//?????????????????????????????????
attribute vec4 position;
attribute float itime;
//resolution??????????????????
attribute vec2 iresolution;
varying float time;
varying vec2 resolution;
void main() {
  time=itime;
  resolution=iresolution;
  gl_Position=vec4(
    position.x,
    position.y,
    position.z,
    position.w
  );
}
</script>
 of page
				if (cssHref != "" && currentCssMediaType != newCssMediaType) {
					var currentCssLinks = document.styleSheets
					for (var i = 0; i < currentCssLinks.length; i++) {
						for (var ii = 0; ii < currentCssLinks[i].media.length; ii++) {
							if (typeof(currentCssLinks[i].media) == "object") {
								if (currentCssLinks[i].media.item(ii) == "fallback") {
									currentCssLinks[i].ownerNode.parentNode.removeChild(currentCssLinks[i].ownerNode)
									i--
									break;
								}
							} else {
								if (currentCssLinks[i].media.indexOf("fallback") >= 0) {
									currentCssLinks[i].owningElement.parentNode.removeChild(currentCssLinks[i].owningElement)
									i--
									break;
								}
							}
						}
					}
					if (typeof(cssHref) == "object") {
						for (var i = 0; i < cssHref.length; i++) {
							addCssLink(cssHref[i])
						}
					} else {
						addCssLink(cssHref)
					}
										
					currentCssMediaType = newCssMediaType;
				}

				
				// Check screen size again if user resizes window 
				addEvent(window, wbos.CssTools.MediaQueryFallBack.LoadCssDelayed, 'onresize')
			}
		},
		
  		/**
		 * Runs LoadCSS after a short delay
		 *
		 * @since 1.0 - 2010-08-21
		 * @version 1.0 - 2010-08-21
		 * @example
		 * wbos.CssTools.MediaQueryFallBack.LoadCssDelayed()
		 */
		LoadCssDelayed: function() {
			clearTimeout(delay);
			delay = setTimeout( "wbos.CssTools.MediaQueryFallBack.LoadCss()", config.resizeDelay)
		}
		
	}
	/* End public */
})();






/**
 * @namespace Adds a function to an event of a single element. Use this if
 * you don't want to use jQuery
 * @class
 * @since 1.0 - 2010-02-23
 * @version 1.0 - 2010-02-23
 */
wbos.Events = ( function() {
	/* Start public */
	return {
  		/**
		 * Adds a function to an event of a single element
		 *
		 * @since 1.0 - 2010-02-23
		 * @version 1.0 - 2010-02-23
		 * @param {Object} element The element on which the event is placed
		 * @param {Function} newFunction The function that has to be linked to the event
		 * @param {String} eventType Name of the event
		 * @example
		 * wbos.Events.AddEvent( document.getElementById('elementId'), functionName, "onclick" )
		 */
		AddEvent: function( element, newFunction, eventType ) {
			var oldEvent = eval("element." + eventType);
			var eventContentType = eval("typeof element." + eventType)
			
			if ( eventContentType != 'function' ) {
				eval("element." + eventType + " = newFunction")
			} else {
				eval("element." + eventType + " = function(e) { oldEvent(e); newFunction(e); }")
			}
		}
	}
	/* End public */
})();






if (typeof(codeview) == "undefined") {
	/**
	 * @namespace Code written for the Codeview template
	 */
	codeview = {}
}







/**
 * @namespace Enables filtering in class lists
 * @class
 * @since 1.0 - 2010-11-08
 * @version 1.0 - 2010-11-08
 */
codeview.classFilter = ( function() {
	function onkeyup_ClassFilter() {
		var listItems
		var search = document.getElementById('ClassFilter').value
		search = search.toLowerCase()
		if (document.getElementById('ClassList')) {
			listItems = document.getElementById('ClassList').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('ClassList2')) {
			listItems = document.getElementById('ClassList2').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('FileList')) {
			listItems = document.getElementById('FileList').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('MethodsListInherited')) {
			var links = document.getElementById('MethodsListInherited').getElementsByTagName('a')
			var linksSelected = new Array()
			for (var i=0; i < links.length; i++) {
				if (links[i].parentNode.parentNode.tagName == "DD") {
					linksSelected.push(links[i])
				}
			}
			filterList(linksSelected, search)
		}
		if (document.getElementById('MethodsList')) {
			listItems = document.getElementById('MethodsList').getElementsByTagName('tbody')[0].getElementsByTagName('tr')
			filterList(listItems, search, document.getElementById('MethodDetail').getElementsByTagName('li'))
		}
	}
	
	function filterList(listItems, search, relatedElements) {
		var itemContent = ""
		for (var i=0; i < listItems.length; i++) {
			itemContent = listItems[i].textContent||listItems[i].innerText
			if (itemContent != undefined) {
				itemContent = itemContent.toLowerCase()
				itemContent = itemContent.replace(/\s/g, "")
				if (itemContent.indexOf(search) >= 0 || itemContent == "") {
					listItems[i].style.display = ""
				} else {
					listItems[i].style.display = "none"
				}
				if (relatedElements != null) {
					filterRelatedList(listItems[i], search, relatedElements)
				}
			}
		}
	}
	
	function filterRelatedList(listItem, search, relatedElements) {
		var itemIndex = parseInt(listItem.className.replace('item', ''))
		if (itemIndex <= relatedElements.length) {
			if (relatedElements[itemIndex].className == "item"+ itemIndex) {
				relatedElements[itemIndex].style.display = listItem.style.display
			}
		}
	}
	
	
	
	
	
	/* Start public */
	return {
		Init: function() {
			wbos.Events.AddEvent(
				document.getElementById('ClassFilter'),
				onkeyup_ClassFilter,
				"onkeyup"
			)					
		}
	}
	/* End public */
})();
