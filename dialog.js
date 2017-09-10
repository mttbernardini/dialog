/*
 * dialog.js is a utility which can replace the default JavaScript dialog windows for webpages (alert(), prompt(), confirm())
 *
 * Version: 3.0
 * Copyright (c) 2015 Matteo Bernardini
 * Licensed under the MIT License (refer to the LICENSE file for further information).
 *
 * Check this project on GitHub:
 * https://github.com/mttbernardin/dialog
 *
 */

/**
 * The library provides 3 types of objects.
 *
 * ## A global Object `dialogSettings`, used to modify the default behavior of the dialog boxes ##
 *
 * __object_key__   __type__   __default_value__   __comment__
 * defType          string     "alert"             Default type
 * defTitle         string     "Message"           Default title
 * defContent       string     "Missing text"      Default message of the dialog
 * okText           string     "OK"                Label for the <ok> button
 * continueText     string     "Continue"          Label for the <continue> button
 * cancelText       string     "Cancel"            Label for the <cancel> button
 *
 *
 * ## The main Function `dialog(opt)`, returns a Promise and takes the following options as properties of the Object `opt` ##
 *
 * __object_key__   __type__   __comment__
 * type             string     Type of the dialog window. Possible values are ['alert', 'prompt', 'confirm']
 * title            string     Text which will be displayed as the title of the dialog window
 * content          string     Message of the dialog window
 * placeholder      string     If the type is 'prompt', this will define a placeholder text for the input box
 * id               string     Identifier which can be referenced afterwards in the resolved object (see below)
 * data             Object     Object of convenience that will be referenced in the resolved object (see below)
 *
 *
 * ## The resolved Object of the Promise ##
 *
 * __object_key__   __type__   __comment__
 * id               string     Identifier passed when calling the `dialog()` function, defaults to `undefined`
 * data             Object     Reference of the object passed with the `dialog()` function, defaults to `undefined`
 * action           boolean    `true` if the user has pressed <ok> or <continue>, `false` for <cancel>
 * value            string     If the type of the requested dialog window was 'prompt' it will contain
 *                             the value inserted in the input box, otherwise it will be `undefined`
 *
 */


"use strict";

var dialogSettings = new Object();

function dialog(params) {

	params         = params         || new Object();
	dialogSettings = dialogSettings || new Object();

	// == Default Values == //
	dialogSettings.defTitle     =  dialogSettings.defTitle      ||  "Message";
	dialogSettings.defType      =  dialogSettings.defType       ||  "alert";
	dialogSettings.defContent   =  dialogSettings.defContent    ||  "Missing text";
	dialogSettings.okText       =  dialogSettings.okText        ||  "OK";
	dialogSettings.continueText =  dialogSettings.continueText  ||  "Continue";
	dialogSettings.cancelText   =  dialogSettings.cancelText    ||  "Cancel";

	// == Switch between default values or passed values == //
	params.title    =  params.title    ||  dialogSettings.defTitle;
	params.type     =  params.type     ||  dialogSettings.defType;
	params.content  =  params.content  ||  dialogSettings.defContent;


	// == Creating elements == //
	var parts = ["window", "wrapper", "title", "body", "message", "prompt", "actions", "ok-btn", "cancel-btn"],
	    elms  = {};

	for (var i = 0, partName; partName = parts[i]; i++) {
		if (partName.indexOf("btn") !== -1) {
			elms[partName] = document.createElement("button");
			elms[partName].setAttribute("type", "button");
		} else {
			elms[partName] = document.createElement("div");
		}
		elms[partName].className = "dialog-" + partName;
	}

	var prompt = document.createElement("input");
	prompt.setAttribute("type", "text");
	prompt.className = "dialog-prompt-input";


	// == Arranging elements == //
	elms["window"].appendChild(elms["wrapper"]);
	elms["wrapper"].appendChild(elms["title"]);
	elms["wrapper"].appendChild(elms["body"]);
	elms["body"].appendChild(elms["message"]);
	elms["actions"].appendChild(elms["ok-btn"]);

	switch (params.type) {
		case "prompt":
			elms["prompt"].appendChild(prompt);
			elms["body"].appendChild(elms["prompt"]);
		case "confirm": // or "prompt", notice no break here
			elms["actions"].appendChild(elms["cancel-btn"]);
	}

	elms["body"].appendChild(elms["actions"]);


	// == Assigning values == //
	elms["title"].textContent       =  params.title;
	elms["message"].textContent     =  params.content;
	elms["ok-btn"].textContent      =  params.type === "confirm" ? dialogSettings.continueText : dialogSettings.okText;
	elms["cancel-btn"].textContent  =  dialogSettings.cancelText;
	prompt.placeholder              =  params.placeholder || "";


	// == Appending to body & focus == //
	var dialogWindow = elms["window"];
	dialogWindow.setAttribute("data-dialog-type", params.type);

	document.body.appendChild(dialogWindow);

	if (params.type === "prompt")
		prompt.focus();



	// == Return promise == //
	return new Promise(function(resolve, reject) {

		// Will be triggered when closing the dialog
		function action(e, userAction) {
			e = e || window.event;
			var target = e.target ? e.target : e.srcElement;

			if (typeof userAction === "boolean" || target.tagName.toLowerCase() === "button") {
				document.removeEventListener("keyup", useKeys, false);
				document.body.removeChild(dialogWindow);
				resolve({
					id:     params.id,
					action: typeof userAction === "boolean" ? userAction : target.className.indexOf("ok") !== -1,
					value:  params.type === "prompt" ? prompt.value : void 0,
					data:   params.data
				});
			}
		}

		// Handler for keyboard events
		function useKeys(e) {
			e = e || window.event;
			if (e.keyCode === 13) // ENTER key
				action(null, true);
			else if (e.keyCode === 27 && params.type !== "alert") // ESC key
				action(null, false);
		}

		document.addEventListener("keyup", useKeys, false);
		elms["actions"].addEventListener("click", action, false);

	});
}
