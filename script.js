/*

Asynchronous Modal Dialog Window, a utility which can replace the default JavaScript dialog windows (alert(); prompt(); confirm())

The program integrates 3 elements.

## The first is a global Object named `dialogSettings` that you can use to modify the default behavior of the dialog windows ##

__object_key__	__type__	__default_value__		__comment__
defType		String		"alert"				default type
defTitle	String		"Message"			default title
defContent	String		"<i>Missing text</i>"		default body of the dialog
okText		String		"OK"				default content of the <ok> button
continueText	String		"Continue"			default content of the <continue> button
cancelText	String		"Cancel"			default content of the <cancel> button


## The second element is the main Function, `dialog()`, which needs the following options, passed with an object as first argument ##

__object_key__	__type__	__comment__
type		String		type of the dialog window. Possible values are ['alert', 'prompt', 'confirm']
title		String		text which will be displayed as the title of the dialog window
content		String		body of the dialog window
id		String		identifier which can be retrieved afterwards in the `returnObj`, on the callback function
vars		Object		object of convenience that will be returned in the `returnObj`, on the callback function
callback	Function	function to be called when the dialog window is closed


## The last one is an Object that will be returned in the callback function as first argument, named `returnObj` for convenience of this guide ##

__object_key__	__type__	__comment__
id		String		identifier passed when calling the `dialog()` function, defaults to undefined
vars		Object		same object passed with the function (NB: same reference), defaults to undefined
action		Boolean		`true` if the user has pressed <ok> or <continue>, `false` for <cancel>
value		String		if the type of the requested dialog window was "prompt" it will contain the value inserted in the input box, otherwise it will be undefined

================================================================================================

Version: 2.0.0
Made by: Matteo Bernardini, @mttbernardini
Shared with license CC, by-nc-sa:
Attribution: You are free to distribute this code, download it and use it, but you must declare who's the owner.
No Commercial: You aren't allowed to use this code for commercial or lucrative purposes.
Share Alike: you are free to edit this code as you like, but you must include this commented part which includes the description, the version, the owner, and the license which you cannot modify.

To see the integral declaration of the license see here: http://creativecommons.org/licenses/by-nc-sa/3.0/
Check this project on GitHub: http://github.com/mttbernardin/dialog

*/



// Backwards compatibility with IE < 9
if (!window.addEventListener) {
	Object.defineProperties(Element.prototype, {
		"addEventListener": {
			value: function(evt, handler, capture) {
				this.attachEvent('on'+evt, handler);
			}
		},
		"removeEventListener": {
			value: function(evt, handler, capture) {
				this.detachEvent('on'+evt, handler);
			}
		},
	});
}


// MAIN FUNCTION //

function dialog(item) {

	item = item || new Object();
	if (typeof(dialogSettings)=="undefined") dialogSettings = new Object();

	// == Default Values == //
	dialogSettings.defTitle		=	dialogSettings.defTitle		||  "Message";
	dialogSettings.defType		=	dialogSettings.defType		||  "alert";
	dialogSettings.defContent	=	dialogSettings.defContent	||  "<i>Missing text</i>";
	dialogSettings.okText		=	dialogSettings.okText		||  "OK";
	dialogSettings.continueText	=	dialogSettings.continueText	||  "Continue";
	dialogSettings.cancelText	=	dialogSettings.cancelText	||  "Cancel";

	// == Switch between default values or passed values == //
	item.title			=	item.title			||  dialogSettings.defTitle;
	item.type			=	item.type			||  dialogSettings.defType;
	item.content			=	item.content			||  dialogSettings.defContent;

	function action(e, el) {
		e = e || window.event;
		var target = el || (e.target ? e.target : e.srcElement), retBool;
		if (target.getAttribute("data-type") == "ok")
			retBool = true;
		if (target.getAttribute("data-type") == "cancel")
			retBool = false;
		if (target.getAttribute("data-type") == "ok" || target.getAttribute("data-type") == "cancel") {
			document.body.removeChild(elm);
			//Callback function if defined
			if (item.callback) {
				var returnObj = {id: item.id, action: retBool, value: retValue, vars: item.vars};
				item.callback(returnObj);
			}
		}
	}
	
	function useKeys(e) {
		e = e || window.event;
		for (var i=0; sec = elm.getElementsByTagName("div")[i]; i++) {
			if (sec.getAttribute("data-type")=="actions") {
				if (e.keyCode == 13) {
					action(null, sec.children[0]);
					document.removeEventListener("keyup", useKeys, false);
				}
				else if (e.keyCode == 27 && sec.children[1].style.display == "inline-block") {
					action(null, sec.children[1]);
					document.removeEventListener("keyup", useKeys, false);
				}
			}
		}
	}

	var inputtag = document.createElement("input");
	inputtag.setAttribute("type", "text");
	var structure = '<div data-type="inner"><div data-type="title">Titolo del popup</div><div data-type="content"><div data-type="text">Contenuto</div><div data-type="prompt">'+inputtag.outerHTML+'</div><div data-type="actions"><button type="button" data-type="ok">'+dialogSettings.okText+'</button><button type="button" data-type="cancel">'+dialogSettings.cancelText+'</button></div></div></div>';

	//show dialogWindow
	var elm = document.createElement("div");
	elm.id = "dialogWindow";
	document.body.appendChild(elm);
	elm.innerHTML = structure;
	var i, sec, retBool, retValue;

	// Loop through the elements of the dialogWindow
	for (var i=0; sec = elm.getElementsByTagName("div")[i]; i++) {

	  //Setting global actions
	  if (sec.getAttribute("data-type")=="title") sec.innerHTML = item.title;
	  if (sec.getAttribute("data-type")=="text") { sec.innerHTML = item.content; sec.style.wordWrap="break-word"; }
	  
	  //Case "alert" (default)
	  if (item.type == "alert") {
		if (sec.getAttribute("data-type")=="prompt") sec.style.display="none";
		if (sec.getAttribute("data-type")=="actions") {
		  sec.children[0].innerHTML = "OK";
		  sec.children[1].style.display="none";
		}
	  }
	  
	  //Case "confirm"
	  else if (item.type == "confirm") {
		if (sec.getAttribute("data-type")=="prompt") sec.style.display="none";
		if (sec.getAttribute("data-type")=="actions") {
		  sec.children[0].innerHTML = dialogSettings.continueText;
		  sec.children[1].style.display = "inline-block";
		}
	  }
	  
	  //Case "prompt"
	  else if (item.type == "prompt") {
		if (sec.getAttribute("data-type")=="prompt") {
		  sec.style.display="block";
		  var v=sec.children[0];
		  v.value = "";
		  item.defValue ? sec.children[0].placeholder = item.defValue : sec.children[0].placeholder = "";
		  v.focus();
		}
		if (sec.getAttribute("data-type")=="actions") {
		  sec.children[0].onclick=function() {retValue=v.value};
		  sec.children[0].innerHTML = "OK";
		  sec.children[1].style.display = "inline-block";
		}
	  }
	  
	  //Generic actions of pressing buttons
	  if (sec.getAttribute("data-type")=="actions") {
		//Add function to press enter and esc to click to ok and cancel
		document.addEventListener("keyup", useKeys, false);
		//Listener when pressing buttons
		sec.addEventListener("click", action, false);
	  }

	}

}
