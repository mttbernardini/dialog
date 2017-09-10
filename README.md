# dialog.js #

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a61ce490dd304193865a6b93f793e8b4)](https://www.codacy.com/app/mttbernardini/dialog?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mttbernardini/dialog&amp;utm_campaign=Badge_Grade)

This project is a light JS library providing basic asynchronous modal dialogs for webpages, aiming to replace the built-in `alert()`, `prompt()` and `confirm()` which instead block JavaScript execution.

The library provides one function `dialog()` in the global namespace (`window`), taking as argument an object of properties and returning a `Promise` resolving to the result object.

```js
prop = {
	type: "alert",
	title: "Message",
	content: "Hello, world!",
};

dialog(prop).then(myFunc);
// Shows the dialog box and calls `myFunc` after closing it
```


## How to use ##

The inclusion on a project is straightforward and only consist of adding the script and the default stylesheet:

```html
<link rel="stylesheet" type="text/css" href="/path/to/dialog_default.css">
<script type="text/javascript" src="/path/to/dialog.js"></script>
```


## Documentation ##

A short and effective documentation for all the supported properties can be found at the beginning of the `dialog.js` file.

A more detailed documentation providing examples can be found in the [wiki][1]


## Live demo ##

You can see three live examples [here][2].


## Compatibility ##

The software is compatible with all major browsers. A polyfill might be needed in order to support `Promise`s, no other ES6 features are used.

The stylesheet is W3C valid. A prefixer (like [-prefix-free][3]) might be needed in order to add vendor prefixes.


## License and sharing ##

© 2015 Matteo Bernardini, [@mttbernardini][4].

This project is licensed under the MIT License.  
Please refer to the LICENSE file for further information.


[1]: https://github.com/mttbernardini/dialog/wiki
[2]: https://mttbernardini.github.io/dialog/demo.html
[3]: https://github.com/LeaVerou/prefixfree
[4]: https://twitter.com/mttbernardini
