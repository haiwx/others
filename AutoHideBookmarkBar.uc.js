(function(){
	var cssStr = (function(){/*
	@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
	@-moz-document url("chrome://browser/content/browser.xul") {
	#main-window:not([inFullscreen]):not([disablechrome])
	#navigator-toolbox:not([customizing]) {
	  margin-bottom: -27px;
	}



	#browser {
	  border-top:1px solid #AAAAAB!important;
	}


	#main-window[disablechrome] #navigator-toolbox ~ #browser {
	  margin-top:0px!important;
	}


	#main-window:not([inFullscreen="true"]) #navigator-toolbox:not([customizing]) > #PersonalToolbar {
	  -moz-box-ordinal-group: 51 !important;
	  padding: 0 5px !important;
	  overflow-y: hidden !important;
	  max-height: 0px !important;
	  min-height: 0px !important;
	  box-shadow:0 1px 0px rgba(170,170,171,1)!important;
	  position:relative;
	  transition: max-height .0s ease-in-out .0s ;
	}

	#main-window:not([inFullscreen="true"])  #navigator-toolbox:not([customizing])  #PersonalToolbar:hover,
	#main-window:not([inFullscreen="true"])  #navigator-toolbox:not([customizing]) #nav-bar[autohideBMB]:hover ~ #PersonalToolbar{
	  transition: max-height .0s ease-in-out .0s ;
	  max-height: 25px !important;
	}
	#PersonalToolbar {
    height:26px !important;
    }
	}
	*/}).toString().replace(/^.+\s|.+$/g,"");
	var style = document.createProcessingInstruction("xml-stylesheet", "type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
	var main = document.getElementById("main-window");
	document.insertBefore(style, main);

	function autoHideBMB(){
		var urlinput = document.getAnonymousElementByAttribute(document.getElementById("urlbar"), "class", "textbox-input-box urlbar-input-box"),
			navbar = document.getElementById("nav-bar");
			
		var timeout;
		urlinput.addEventListener("mouseover", function(){
			 if (!timeout) {
				urlinput.addEventListener("mousedown", function (){
					clearTimeout(timeout);
					removeBMB();
				}, false);
			 }
			 timeout = setTimeout(function () {
				if(!navbar.hasAttribute("autohideBMB") && (!gURLBar.hasAttribute("focused") || gBrowser.currentURI.spec.contains("about:"))) {
					navbar.setAttribute("autohideBMB","true");
				}
			 },300)
		}, false);
		
		function removeBMB(e){
			if(timeout) clearTimeout(timeout);
			if(navbar.hasAttribute("autohideBMB")) {
				setTimeout(function(){navbar.removeAttribute("autohideBMB");},80);
			}
		}
		navbar.addEventListener("mouseout", removeBMB, false);
	}
	autoHideBMB();
	window.addEventListener("aftercustomization", autoHideBMB, false)
})();