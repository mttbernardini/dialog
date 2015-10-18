/*

Asynchronous Modal Dialog Window, a utility which can replace the default JavaScript dialog windows (alert(); prompt(); confirm())

The program integrates 3 elements.

## The first is a global Object named `dialogSettings` that you can use to modify the default behavior of the dialog windows ##

__object_key__	__type__	__default_value__		__comment__
defType			String		"alert"					default type
defTitle		String		"Message"				default title
defContent		String		"<i>Missing text</i>"	default body of the dialog
okText			String		"OK"					default content of the <ok> button
continueText	String		"Continue"				default content of the <continue> button
cancelText		String		"Cancel"				default content of the <cancel> button


## The second element is the main Function, `dialog()`, which needs the following options, passed with an object as first argument ##

__object_key__	__type__	__comment__
type			String		type of the dialog window. Possible values are ['alert', 'prompt', 'confirm']
title			String		text which will be displayed as the title of the dialog window
content			String		body of the dialog window
placeholder		String		if the type is 'prompt', this will define a placeholder text for the input box
id				String		identifier which can be retrieved afterwards in the `returnObj`, on the callback function
vars			Object		object of convenience that will be returned in the `returnObj`, on the callback function
callback		Function	function to be called when the dialog window is closed


## The last one is an Object that will be returned in the callback function as first argument, named `returnObj` for convenience of this guide ##

__object_key__	__type__	__comment__
id				String		identifier passed when calling the `dialog()` function, defaults to undefined
vars			Object		same object passed with the function (NB: same reference), defaults to undefined
action			Boolean		`true` if the user has pressed <ok> or <continue>, `false` for <cancel>
value			String		if the type of the requested dialog window was "prompt" it will contain the value inserted in the input box, otherwise it will be undefined

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

function dialog(params) {

	params = params || new Object();
	if (typeof(dialogSettings)=="undefined") dialogSettings = new Object();

	// == Default Values == //
	dialogSettings.defTitle		=	dialogSettings.defTitle		||  "Message";
	dialogSettings.defType		=	dialogSettings.defType		||  "alert";
	dialogSettings.defContent	=	dialogSettings.defContent	||  "<i>Missing text</i>";
	dialogSettings.okText		=	dialogSettings.okText		||  "OK";
	dialogSettings.continueText	=	dialogSettings.continueText	||  "Continue";
	dialogSettings.cancelText	=	dialogSettings.cancelText	||  "Cancel";

	// == Switch between default values or passed values == //
	params.title	=	params.title	||  dialogSettings.defTitle;
	params.type		=	params.type		||  dialogSettings.defType;
	params.content	=	params.content	||  dialogSettings.defContent;


	// Will be triggered when closing the dialog
	function action(e, el) {
		e = e || window.event;
		var target = el || (e.target ? e.target : e.srcElement);

		if (target.getAttribute("data-action") == "ok" || target.getAttribute("data-action") == "cancel") {
			document.body.removeChild(elm);
			//Callback function if defined
			if (params.callback) {
				var returnObj = {id: params.id, action: !!target.getAttribute("data-action")=="ok", value: retValue, vars: params.vars};
				params.callback(returnObj);
			}
		}
	}
	
	// Handler for keys event
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


	// == Creating elements == //
	var struct = {
		"div":		["window", "wrapper", "title", "body", "message", "prompt", "actions"],
		"button":	["ok", "cancel"]
		};
	var elms = {};
	
	for (var i in struct) {
		for (var j in struct) {
			elms[i] = {};
			elms[i][struct[i][j]] = document.createElement(struct[i]);
			elms[i][struct[i][j]].className = "dialog-" + struct[i][j];
			if (struct[i] == "button") {
				elms[i][struct[i][j]].className += "-button";
				elms[i][struct[i][j]].type = "button";
				elms[i][struct[i][j]].setAttribute("data-action", struct[i][j]);
			}
		}
	}

	var prompt = document.createElement("input");
	prompt.setAttribute("type", "text");
	prompt.className = "dialog-prompt-input";


	// == Arranging elements == //
	elms["div"]["window"].appendChild(elms["div"]["wrapper"]);
	elms["div"]["wrapper"].appendChild(elms["div"]["title"]);
	elms["div"]["wrapper"].appendChild(elms["div"]["body"]);
	elms["div"]["body"].appendChild(elms["div"]["message"]);
	elms["div"]["actions"].appendChild(elms["button"]["ok"]);
	
	switch (params.type) {
		case "prompt":
			elms["div"]["prompt"].appendChild(prompt);
			elms["div"]["body"].appendChild(elms["div"]["prompt"]);
		case "confirm":
			elms["div"]["actions"].appendChild(elms["button"]["cancel"]);
	}


	// == Assigning values == //	
	elms["div"]["title"].textValue = params.title;
	elms["div"]["text"].textValue = params.content;
	elms["button"]["ok"].textValue = params.type == "confirm" ? dialogSettings.continueText : dialogSettings.okText;
	prompt.placeholder = params.placeholder;
	
	var popupWindow = elms["div"]["window"];
	popupWindow.setAttribute("data-dialog-type", params.type);


	// == Adding event listeners == //	
	document.addEventListener("keyup", useKeys, false);
	elms["div"]["actions"].addEventListener("click", action, false);

}
