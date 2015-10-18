# Changelog of AMD versions #


## Version 1 ##

### 1.0 ###

*Released on 2012-08-07*

- This is the first version of the code, which includes the 3 objects `dialogSettings`, `dialog()` and `returnObj`.
- The code integrates the default stylesheet. The semitransparent background of the dialog doesn't work with IE less than 9.
- When pressing enter on the keyboard the script will emulate the ok or continue button click, and the esc key will emulate the cancel button click if the cancel button is shown.

### 1.1 ###

*Released on 2012-13-09*

- Fixed a problem with the xhtml syntax. Now the function works good both in html and xhtml, automatically.


## Version 2 ##

### 2.0.0 ###

*Released on 2015-10-18*

- Reconception of the majority of the code
- Uploaded the project on GitHub
- ^ Removed `data-*` attributes for styling → using classes (refer to style.css file to see new classes used)
- ^ callBack → callback, is now a reference to a function (with returnObj passed as first argument), not an executable string (not eval anymore!)
- ^ returnObj.boolean → returnObj.action (same behavior)
- ^ title and content can't contain HTML anymore. However LF characters and whitespaces are preserved.
- Adding to the DOM only the visible elements (removed display: none; hack)
- Fixed a bug with the `keyup` event listener

^ Caution! These changes break the compatibility with older versions. Please read the new documentation for further details.

