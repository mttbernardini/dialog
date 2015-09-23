/*
The code of the Asynchronous Modal Dialog Window, which can replace the default JavaScript dialog windows (alert(); prompt(); confirm())
The code integrates 3 elements. The first is a global object named "dialogSettings" that you can use to modify the default behaviors of the dialog window, which are:
- The default type: dialogSettings.defType (alert)
- The default title: dialogSetings.defTitle (Message)
- The default content: dialogSettings.defContent (<i>Missing text</i>)
- The default content of the ok button: dialogSettings.okText (OK)
- The default content of the continue button: dialogSettings.continueText (Continue)
- The default content of the cancenl button: dialogSettings.cancelText (Cancel)

The second object is the main function, called dialog() which needs the following parameters, passed as object on the first parameter:
- type: the type of the dialog window, alert, prompt or confirm
- title: the text which will be displayed as the title of the dialog window
- content: the text of the content of the dialog window
- id: is and identifier which can be get afterwards with the response of the callBack
- vars: is an object which can be used for passing variables between multiple dialog window, and then with the final callBack which is the final function, or to remember the local variables of the calling function
- callBack: is a string which includes the code to be executed when the dialog window is closed

The last object is an object that will be returned in the callBack if requested, is named returnObj and contain the following properties:
- id: responses the identifier passed when calling the function, default to null
- vars: is an object which contains the passed variables with the "vars" argument
- boolean: responses the Boolean value that is true if the user has pressed OK or continue, and false for cancel
- value: if the type of the requested dialog window is "prompt" it will contain the value inserted in the input box, instead it will be undefined.

Version: 1.0
Made by: Matteo Bernardini, @mttbernardini
Shared with license CC, by-nc-sa:
Attribution: You are free to distribute this code, download it and use it, but you must declare who's the owner.
No Commercial: You aren't allowed to use this code for commercial or lucrative purposes.
Share Alike: you are free to edit this code as you like, but you must include this commented part which includes the description, the version, the owner, and the license which you cannot modify.

To see the integral declaration of the license see here: http://creativecommons.org/licenses/by-nc-sa/3.0/
To have more information about the use of the code see here: http://inviodeidatistp.altervista.org/libary/dialog/
*/

//First of all, cause IE uses attachEvent instead of addEventListener we make an unique function
function addEvent(elm, handler, func, useCapture) {
  if (document.addEventListener) elm.addEventListener(handler, func, useCapture);
  else if (document.attachEvent) elm.attachEvent("on"+handler, func);
}
function removeEvent(elm, handler, func, useCapture) {
  if (document.removeEventListener) elm.removeEventListener(handler, func, useCapture);
  else if (document.detachEvent) elm.detachEvent("on"+handler, func);
}

function dialog(item) {

//default values
item = item || new Object();
if (typeof(dialogSettings)=="undefined") dialogSettings = new Object();
dialogSettings.defTitle = dialogSettings.defTitle || "Message";
dialogSettings.defType = dialogSettings.defType || "alert";
dialogSettings.defContent = dialogSettings.defContent || "<i>Missing text</i>";
dialogSettings.okText = dialogSettings.okText || "OK";
dialogSettings.continueText = dialogSettings.continueText || "Continue";
dialogSettings.cancelText = dialogSettings.cancelText || "Cancel";

//Switch between default values or passed values
item.title = item.title || dialogSettings.defTitle;
item.type = item.type || dialogSettings.defType;
item.content = item.content || dialogSettings.defContent;
item.defValue = item.defValue || null;
item.callBack = item.callBack || null;
item.vars = item.vars || null;
item.id = item.id || null;
var inputtag = document.createElement("input");
inputtag.setAttribute("type", "text");
var structure = '<div data-type="inner"><div data-type="title">Titolo del popup</div><div data-type="content"><div data-type="text">Contenuto</div><div data-type="prompt">'+inputtag.outerHTML+'</div><div data-type="actions"><button type="button" data-type="ok">'+dialogSettings.okText+'</button><button type="button" data-type="cancel">'+dialogSettings.cancelText+'</button></div></div></div>';

//show dialogWindow
var elm = document.createElement("div");
elm.id = "dialogWindow";
document.body.appendChild(elm);
elm.innerHTML = structure;
var i, sec, retBool, retValue;

//Ovrloop over the elemens of the dialogWindow
for (i=0; (sec = elm.getElementsByTagName("div")[i]); i++) {

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
      item.defValue != null ? sec.children[0].placeholder = item.defValue : sec.children[0].placeholder = "";
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
    function useKeys(e) {
      e = e || window.event;
      for (var i=0; sec=elm.getElementsByTagName("div")[i]; i++) {
       if (sec.getAttribute("data-type")=="actions") {
        if (e.keyCode == 13) { sec.children[0].click(); removeEvent(document, "keyup", useKeys, false); }
        else if (e.keyCode == 27 && sec.children[1].style.display == "inline-block") { sec.children[1].click(); removeEvent(document, "keyup", useKeys, false); }
       }
      }
    }
    addEvent(document, "keyup", useKeys, false);
    //Listener when pressing buttons
    addEvent(sec, "click", function(e) {
      e = e || window.event;
      var target = (e.target) ? e.target : e.srcElement;
      if (target.getAttribute("data-type") == "ok") retBool=true;
      if (target.getAttribute("data-type") == "cancel") retBool=false;
      if (target.getAttribute("data-type") == "ok" || target.getAttribute("data-type") == "cancel") {
       document.body.removeChild(elm);
       //Callback function if defined
       if (item.callBack != null) {
        var returnObj = {id: item.id, boolean: retBool, value: retValue, vars: item.vars};
        eval(item.callBack);
       }
      }
    }, false);
  }

}

}
