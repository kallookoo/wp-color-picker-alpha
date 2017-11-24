# wp-color-picker-alpha
* Overwrite [Automattic Iris][1] for enabled Alpha Channel in wpColorPicker
* Overwrite [WordPress Color Picker][4] for better implementation of overwriting the Iris

> Only run in input and is defined data alpha in true

## Screenshots
###### wpColorPicker

![wpcolorpicker-01](https://cloud.githubusercontent.com/assets/747817/5768333/12c1779e-9d10-11e4-94ad-055a063f571c.png)

###### wpColorPicker in mode Alpha Channel

![wpcolorpicker-02](https://cloud.githubusercontent.com/assets/747817/5768335/17eae354-9d10-11e4-95cf-14868124309c.png)
![wpcolorpicker-03](https://cloud.githubusercontent.com/assets/747817/5768336/1b6ff956-9d10-11e4-80e1-7bcf3fde8ea8.png)

## Installation
Download and copy script inside folder dist in you theme options or plugin.
For call this script use this code:
```
wp_enqueue_style( 'wp-color-picker' );
wp_enqueue_script( 'wp-color-picker-alpha', $url_to_script, array( 'wp-color-picker' ), $current_version, $in_footer );
```

## Usage
Add class `.color-picker` and `data-alpha="true"` in input.

> This class is optional but then need to call wpColorPicker yourself to the class you want.

###### Optional
 * data-reset-alpha:
  * For set Alpha Channel for disabled transparency after press color palette.

 * data-custom-width:
  * By default the input width is 100 on rgba mode
  * For disabled default input witdh in mode rgba ( Possible values: "false", "0" )
  * For change default input width in mode rgba ( change the number you want, "in pixels" )

## License
Licensed under the GPLv2 license.

## Support
If you would like to contribute please fork the project and [report bugs][2] or submit [pull requests][3].

## Tested
If only tested in Firefox and WordPress last versions

## Testing
For only testing download or clone [wp-color-picker-alpha-plugin](https://github.com/kallookoo/wp-color-picker-alpha-plugin) inside WordPress plugins folder and activate.


## Changelog
###### v2.1.3
 * Fix issue [#13](../../pull/13), Thanks for @jtsternberg, see [#15](../../pull/15)
 
###### v2.1.2
 * Declare some global variables when is deprecated or not
 * Change method to check WordPress version, recommended by @webaware, see [comments][5]

###### v2.1.1
 * Change method to check WordPress version

###### v2.1
 * Resolve issues with wp-color-picker.css, see [#12](../../pull/12)
  > The variable wpColorPickerL10n is used to check if it is earlier than version 4.9 and adjusts the content,
  > only tested in 4.8.3 and 4.9-RC2-42156.

###### v2.0
 * Add support for WordPress 4.9, also works in lower versions, only tested in version 4.8

###### v1.2.2
 * Pull, see [#7](../../pull/7)

###### v1.2.1
 * Pull, see [#4](../../pull/4)

###### v1.2
 * Add functionality to change the width of the element, see [#2](../../issues/2)

###### v1.1
 * Fixed issue [#1](../../issues/1)
 * Show Iris error always, but if not is empty input
 * Fixed option reset, not reset in first time
 * Fixed width input with data alpha is true and plugin initialize

###### v1.0.0
Initial Release


[1]: http://automattic.github.io/Iris/
[2]: https://github.com/kallookoo/wp-color-picker-alpha/issues
[3]: https://github.com/kallookoo/wp-color-picker-alpha/pulls
[4]: https://github.com/WordPress/WordPress/blob/master/wp-admin/js/color-picker.js
[5]: https://github.com/kallookoo/wp-color-picker-alpha/commit/41fe4dfa0aa5abe98e905075c1b98ceff39fd704#commitcomment-25592012
