# Asynchronous Modal Dialog - AMD #

## The differences ##

There are various types of dialog windows, generally they are divided into Modal dialogs and Modeless dialogs.

The difference between those is that the modal dialog requires an input from the user, it cannot be hidden and it doesn't allow to focus the opener window till the dialog is closed.

The modeless dialog instead allows to focus the opener window cause it doesn't require the response from the user, so it can be hidden too.


## The problem ##

What are the behaviors of the modal dialogs and modeless dialogs in JavaScript? The modal dialogs block the execution of the script till the user gives the input, and the modeless dialogs don't exist in the pure JavaScript.

So, if you need to show a modal dialog to the user and in the meantime do some other code in JavaScript you can't by using the default dialogs offered by JavaScript (alert(), prompt() and confirm()), because they block the execution of any code.


## The solution ##

Using JQuery in you project will make it easier to find a nice plugin which does this task (also better than this library). However, if you're not planning to use JQuery, it seems meaningless to import that huge framework to only integrate a plugin: at this point this library is the perfect solution if you only need the customizable dialogs and nothing else.

So I solved the problem making a function named `dialog()` which provides an asynchronous modal dialog: *modal*, because the user cannot hide it or focus the opener document (using CSS), *asynchronous*, because it allows the execution of code not related with the dialog.


## *Fast Documentation* ##

You can read the short documentation at the beginning of the `script.js` file.


## How it works ##

Using the main function is very easy. First of all you have to include the script and the style (which you can modify) of the AMD in the `<head>` of your page:

```html
	<link rel="stylesheet" type="text/css" href="dialog/style.css">
	<script type="text/javascript" src="dialog/script.js"></script>
```


### The `dialogSettings` object ###

The JavaScript code integrates 3 objects, the first it's a global object which includes the default values and behaviors of the function that shows the dialog: `dialogSettings`, which has the following properties (all strings):

- `defType`			default to *"alert"*, specify the default type of the dialog. Its possible values are *"alert"*, *"prompt"* and *"confirm"*.
- `defTitle` 		default to *"Message"*, specify the default title of the dialog.
- `defContent`		default to *"<i>Missing text</i>"*, specify the default message of the dialog.
- `okText`			default to *"OK"*, specify the text of the ok button.
- `continueText`	default to *"Continue"*, specify the text of the continue button.
- `cancelText`		default to *"Cancel"*, specify the text of the cancel button.


Changing this properties may be useful to localize the dialog box. For example, adding this code to the personal html page will show a confirm dialog with content in Italian, if the function `dialog()` is called without parameters:

```javascript
	dialogSettings = {
	  defType: "confirm",
	  defTitle: "Conferma",
	  defContent: "Contenuto non impostato",
	  okText: "Accetta",
	  continueText: "Continua",
	  cancelText: "Annulla"
	};

	// Show the default dialog
	dialog();
```

### The `dialog()` function ###

The second object is the main function that will show the dialog box: `dialog()`.

To specify the content, the type, the tile, etc... of the dialog you have to pass an object as first parameter to the function which has the following properties:

- String	`type`			specify the type of the dialog. Its possible values are *"alert"*, *"prompt"* or *"confirm"*.
- String	`title`			specify the title of the dialog. HTML is *not* supported.
- String	`content`		specify the message of the dialog. HTML is *not* supported.
- String	`placeholder`	if you selected a *prompt* dialog, this will be a placeholder text for the input box.
- String	`id`			specify an identifier that it will be returned with the `returnObj` object.
- Function	`callback`		specify the function to be executed when the dialog is closed. Its first argument will be the `returnObj`.
- Object	`vars`			is an object which works like a memory, where you can set the value of some variables that will be returned in the homonym object of the `returnObj` object.


This is an example of an AMD:

```javascript
	var parameters = {
	  type: "prompt",
	  title: "Example",
	  content: "What's your name?",
	}

	// Show the dialog
	dialog(parameters);
```


### The `returnObj` object and the `callback` parameter of the `dialog()` function ###

The last object is the most important one which allows to know, when the user has closed the dialog box, if he has chosen ok, continue or cancel, what text he has typed in the input box, etc...

In fact, cause this kind of dialog boxes are asynchronous they allow the execution of the rest of the code (since when calling the function `dialog()` it doesn't return anything), so to know when the user has closed the dialog box a listener is added to the buttons *ok*, *continue* and *cancel*, which, when fired, executes the function passed with the `callback` parameter. The first argument of the callback function will be the `returnObj`, which contains the following parameters:

- Boolean	`action`	true if the user has pressed ok or continue, false for cancel.
- String	`value`		is the value of the input box that is shown with the prompt dialog box. If the dialog box requested is not a prompt dialog it's set to *undefined*.
- String	`id`		is the same identifier passed when calling the `dialog()` function.
- Object	`vars`		is the same object passed when calling the `dialog()` function. Its utility could be, for example, to pass some variables between some subsequent dialogs.


This is the previous example, but with some callback functions:

```javascript
	var parameters = {
	  type: "prompt",
	  title: "Example",
	  content: "What's your name?",
	  callback: check,
	  id: "first",
	  vars: {foo: "bar"}
	}

	function check(obj) {
	  if (obj.id=="first" && obj.action)
	  dialog({
	    type: "confirm",
	    content: "Do you want your name printed on a message?",
	    vars: {foo: obj.vars.foo, name: obj.value!=""?obj.value:"Unnamed"},
	    callBack: check,
	    id: "second"
	  });
	  else if (obj.id=="second" && obj.action)
	  dialog({
	    //NB: default type is alert, so we don't need to specify it
	    title: "Print out",
	    content: "Hello "+obj.vars.name+"\nFoo: "+obj.vars.foo
	  });
	}

	// Start the chain
	dialog(parameters);
```


## Live demo ##

You can see the three live examples reported on this guide [here][2].


## Compatibility ##

The codes (script and style) are compatible with all major browsers. They were tested with IE8, Chrome, Opera, Firefox and Safari Mobile, with success. The stylesheet is also W3C valid.

Anyway the codes are offered with NO WARRANTY and AS IS. If you find bugs you might report them on the [github project page][1].


## Changelog ##

You can also see the changelog of the various releases with the date of when they have been released.

Please refer to the changelog.md file.


## License and sharing ##

Made by: Matteo Bernardini, [@mttbernardini][3].

This project is shared with the MIT license.  
Please refer to the LICENSE file for further information.


[1]: http://github.com/mttbernardin/dialog/issues
[2]: http://mttbernardini.github.io/dialog/demo.html
[3]: https://twitter.com/mttbernardini
