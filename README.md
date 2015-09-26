# Asynchronous Modal Dialog - AMD #

## The difference ##

There are various types of dialog windows, generally they are divided into Modal dialogs and Modeless dialogs.
The difference between those is that the modal dialog requires an input from the user, it cannot be hidden and it doesn't allow to focus the opener window till the dialog is closed.
The modeless dialog instead allows to focus the opener window cause it doesn't require the response from the user, so it can be hidden too.

## The problem ##

What are the behaviors of the modal dialogs and modeless dialogs in JavaScript? The modal dialogs block the execution of the script till the user gives the input, and the modeless dialogs don't exist in the pure JavaScript.
So, if you need to show a modal dialog to the user and in the meantime do some other code in JavaScript you can't by using the default dialogs offered by JavaScript (alert(), prompt() and confirm()), because they block the execution of any code.

## The solution ##

Using JQuery in you project will make it easier to find a nice plugin which does this task (also better than this library). However, if you're not planning to use JQuery, it seems meaningless to import that huge framework to only integrate a plugin: at this point this library is the perfect solution if you only need the personalized dialogs and nothing else.
So I solved the problem making a function named `dialog()` which provides an asynchronous modal dialog: *modal*, because the user cannot hide it or focus the opener window, *asynchronous*, because it allows the execution of code not related with the dialog.

## How it works ##

How to use the main function is very easy. First of all you have to include the script and the style (which you can modify) of the AMD in the `<head>` of your page:

```
	<link rel="stylesheet" type="text/css" href="dialog/style.css">
	<script type="text/javascript" src="dialog/script.js"></script>
```

### The `dialogSettings` object ###

The JavaScript code integrates 3 objects, the first it's a global object which includes the default values and behaviors of the function that shows the dialog: `dialogSettings`, which has the following properties:
- `defType`: default to *"alert"*, specify the default type of the dialog. Its possible values are *"alert"*, *"prompt"* and *"confirm"*.
- `defTitle`: default to *"Message"*, specify the default title of the dialog.
- `defContent`: default to *"<i>Missing text</i>"*, specify the default content of the dialog.
- `okText`: default to *"OK"*, specify the text of the ok button.
- `continueText`: default to *"Continue"*, specify the text of the continue button.
- `cancelText`: default to *"Cancel"*, specify the text of the cancel button.

Changing this properties may be useful to localize the dialog box. For example, adding this code to the personal html page will show a confirm dialog with content in Italian, if the function `dialog()` is called without parameters:

```
	<script type="text/javascript">
	dialogSettings = {
	  defType: "confirm",
	  defTitle: "Conferma",
	  defContent: "<i>Contenuto non impostato</i>",
	  okText: "Accetta",
	  continueText: "Continua",
	  cancelText: "Annulla"
	};
	</script>

	<button onclick="dialog()">Try it</button>
```

### The `dialog()` function ###

The second object is the main function that will show the dialog box: `dialog()`.
To specify the content, the type, the tile, etc... of the dialog you have to pass an object as first parameter to the function which has the following properties:

- `type`: specify the type of the dialog. Its possible values are *"alert"*, *"prompt"* and *"confirm"*.
- `title`: specify the title of the dialog. It's a string which can include HTML code too.
- `content`: specify the content of the dialog. It's a string which can include HTML code too.
- `id`: specify an identifier that it will be returned with the `returnObj` object. It's a string.
- `callBack`: specify the code to be executed when the dialog is closed. It's a string which includes JavaScript code.
- `vars`: is an object which works like a memory, where you can set the value of some variables they will be returned in the homonym object of the `returnObj` object.


This is an example of an AMD:

```
<script type="text/javascript">
var parameters = {
  type: "prompt",
  title: "Example",
  content: "What's your name?",
}
</script>

<button onclick="dialog(parameters)">Try it</button>
```


### The `returnObj` object and the `callBack` parameter of the `dialog()` function ###

The last object is the most important one which allows to know, when the user has closed the dialog box, if he has chosen ok, continue or cancel, what text he has typed in the input box, etc...<br>
In fact, cause this kind of dialog boxes are asynchronous they allow the execution of the rest of the code (since when calling the function `dialog()` it doesn't return anything), so to know when the user has closed the dialog box the function adds a listener to the buttons *ok*, *continue* and *cancel*, which when fired runs the code content in the string passed in the `callBack` parameter. If requested, in the callback you can use this object, named `returnObj`, generated automatically, which contains the following parameters:

- `boolean`: is a Boolean value that is set to true if the user has pressed ok or continue, and false for cancel.
- `value`: is the value of the input box that is shown with the prompt dialog box, so it's a string. If the dialog box requested is not a prompt dialog it's set to *undefined*.
- `id`: is the same identifier passed when calling the `dialog()` function. It's a string.
- `vars`: is the same object passed when calling the `dialog()` function. Its utility may be to pass some variables between some subsequent dialogs, for example.


This is the previous example, but with some callback functions:

```
<script type="text/javascript">
var parameters = {
  type: "prompt",
  title: "Example",
  content: "What's your name?",
  callBack: "check(returnObj)",
  id: "first",
  vars: {foo: "bar"}
}

function check(obj) {
  if (obj.id=="first" && obj.boolean)
  dialog({
    type: "confirm",
    content: "Do you want your name printed on a message?",
    vars: {foo: obj.vars.foo, name: obj.value!=""?obj.value:"Unnamed"},
    callBack: "check(returnObj)",
    id: "second"
  });
  else if (obj.id=="second" && obj.boolean)
  dialog({
    //NB: default type is alert, so we don't need to specify it
    title: "Print out",
    content: "Hello "+obj.vars.name+"<br>Foo: "+obj.vars.foo
  });
}
</script>

<button onclick="dialog(parameters)">Try it</button>
```

## Live demo ##

You can see this documentation in html with running examples [here][1].


## Compatibility ##

The codes (script and style) are compatible with all major browsers. They were tested with IE8, Chrome, Opera, Firefox and Safari Mobile, with success. The stylesheet is also W3C valid.

Anyway the codes are offered with NO WARRANTY and AS IS. If you find bugs you might report them on the github project page.


## Changelog ##

You can also see the changelog of the various releases with the date of when they have been released.

You can see the changelog [here][2]</a>.

## License and sharing ##

Version: 1.0
Made by: Matteo Bernardini, [@mttbernardini][4].
This project is shared with license CC, by-nc-sa:

- **Attribution**: You are free to distribute the codes, download it and use it, but you must declare who's the owner.
- **No Commercial**: You aren't allowed to use the codes for commercial or lucrative purposes.
- **Share Alike**: you are free to edit the codes as you like, but please leave the commented part of the codes which includes the description, the version, the owner, and the license. If you modify the code you must re-share it with the same license.

To see the integral declaration of the Creative Commons license [see here][3].


[1]: http://mttbernardini.github.io/dialog
[2]: http://mttbernardini.github.io/dialog/changelog.html#1.1
[3]: http://creativecommons.org/licenses/by-nc-sa/3.0/
[4]: https://twitter.com/mttbernardini
