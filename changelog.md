# Changelog of AMD versions #

## Version 3 ##

### 3.0 ###

*Released on 2017-09-10*

- Removed polifyll for `addEventListener` on IE8.
- `dialog()` now returns a `Promise` for the `returnObj` (no more callbacks).
- renamed `vars` in `data`, both in the options for `dialog` and in the `Promise` resolved object.

NB: These changes break compatibility with v2.x. Please read the new documentation for further details.

NB: This version drops support for older browsers and IE. Consider using polyfills for `addEventListener` and `Promise` for browsers not supporting them.


## Version 2 ##

### 2.1 ###

*Released on 2017-07-14*

- `returnObj.value` is correctly set to `undefined` if a dialog is not of "prompt" type.
- Renamed button classes (`dialog-continue-button` → `dialog-continue-btn`, `dialog-cancel-button` → `dialog-cancel-btn`).
- Removed unneeded `data-action` attributes on dialog buttons.
- Simplified code (increased readability).

### 2.0.1 ###

*Released on 2017-02-18*

- Minor bugfixes.

### 2.0.0 ###

*Released on 2015-10-18*

- Reconception of the majority of the code.
- Uploaded the project on GitHub.
- Removed `data-*` attributes for styling, now using classes (refer to style.css file to see new classes used).
- Renamed callBack → callback, is now a reference to a function (with `returnObj` passed as first argument), not an executable string (not `eval` anymore!).
- Renamed returnObj.boolean → returnObj.action (same behavior).
- Title and content can't contain HTML anymore. However LF characters and whitespaces are preserved.
- Adding to the DOM only the visible elements (removed `display: none` hack).
- Fixed a bug with the `keyup` event listener.

NB: These changes break compatibility with v1.x. Please read the new documentation for further details.


## Version 1 ##

### 1.1 ###

*Released on 2012-13-09*

- Fixed a problem with the xhtml syntax. Now the function works good both in html and xhtml, automatically.

### 1.0 ###

*Released on 2012-08-07*

- This is the first version of the code, which includes the 3 objects `dialogSettings`, `dialog()` and `returnObj`.
- The code integrates the default stylesheet. The semitransparent background of the dialog doesn't work with IE < 9.
- When pressing <kbd>enter</kbd> the script will emulate the *ok* or *continue* button click, and the <kbd>esc</kbd> key will emulate the *cancel* button click when the cancel button is shown.
