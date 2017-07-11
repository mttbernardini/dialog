# Asynchronous Modal Dialog - AMD #

This project is a light JS library providing basic modal dialogs for webpages, aiming to replace the built-in `alert()`, `prompt()` and `confirm()` which instead block the current execution of JavaScript (hence the name "asynchronous").

The library provides one function `dialog()` in the global namespace (`window`), taking as argument an object of properties.

```js
prop = {
	type: "alert",
	title: "Message",
	content: "Hello, world!"
	callback: myFunc // Will be called when the dialog is closed
};

dialog(prop); // Shows the dialog box
```


## How to use ##

The inclusion on a project is really simple and only consist of adding the script and the default stylesheet:

```html
<link rel="stylesheet" type="text/css" href="dialog/style.css">
<script type="text/javascript" src="dialog/script.js"></script>
```


## Documentation ##

A short and effective documentation for all the supported properties can be found at the beginning of the `script.js` file.

A more detailed documentation providing examples can be found in the [wiki][1]


## Live demo ##

You can see three live examples [here][3].


## Compatibility ##

The codes (script and style) are compatible with all major browsers. They were tested with IE8, Chrome, Opera, Firefox and Safari Mobile, with success. The stylesheet is also W3C valid.


## License and sharing ##

&copy; 2015 Matteo Bernardini, [@mttbernardini][4].

This project is licensed under the MIT License.  
Please refer to the LICENSE file for further information.


[1]: https://github.com/mttbernardini/dialog/wiki
[2]: http://github.com/mttbernardini/dialog/issues
[3]: http://mttbernardini.github.io/dialog/demo.html
[4]: https://twitter.com/mttbernardini
