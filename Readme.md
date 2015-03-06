# wp-color-picker-alpha
Overwrite [Automattic Iris][1] for enabled Alpha Channel in wpColorPicker

Overwrite [WordPress Color Picker][4] for better implementation of overwriting the Iris

Only run in input and is defined data alpha in true

## Screenshot
###### wpColorPicker

![wpcolorpicker-01](https://cloud.githubusercontent.com/assets/747817/5768333/12c1779e-9d10-11e4-94ad-055a063f571c.png)

###### wpColorPicker in mode Alpha Channel

![wpcolorpicker-02](https://cloud.githubusercontent.com/assets/747817/5768335/17eae354-9d10-11e4-95cf-14868124309c.png)
![wpcolorpicker-03](https://cloud.githubusercontent.com/assets/747817/5768336/1b6ff956-9d10-11e4-80e1-7bcf3fde8ea8.png)

## Instalation
Download and add script in you theme options or plugin.

## Usage
Add class `.color-picker` and `data-alpha="true"` in input.

> This class is optional but then need to call wpColorPicker yourself to the class you want.

###### Optional
Add `data-reset-alpha="true"` for set Alpha Channel for disabled transparency after press color palette.

###### Examples
```
<input type="text" class="color-picker" data-alpha="true">
<input type="text" class="color-picker" data-alpha="true" data-reset-alpha="true">
<input type="text" class="color-picker" value="#ffbc00" data-alpha="true">
<input type="text" class="color-picker" value="#ffbc00" data-alpha="true" data-reset-alpha="true">
<input type="text" class="color-picker" value="rgba(255,0,0,0.25)" data-alpha="true">
<input type="text" class="color-picker" value="rgba(255,0,0,0.25)" data-alpha="true" data-reset-alpha="true">
<input type="text" class="color-picker" data-default-color="#ffbc00" value="#ffbc00" data-alpha="true">
<input type="text" class="color-picker" data-default-color="#ffbc00" value="#ffbc00" data-alpha="true" data-reset-alpha="true">
<input type="text" class="color-picker" data-default-color="rgba(255,0,0,0.25)" value="#ffbc00" data-alpha="true">
<input type="text" class="color-picker" data-default-color="rgba(255,0,0,0.25)" value="#ffbc00" data-alpha="true" data-reset-alpha="true">
```

## License
Copyright (c) 2015 Sergio P.A. (23r9i0).

Licensed under the GPLv2 license.

## Support
If you would like to contribute please fork the project and [report bugs][2] or submit [pull requests][3].

## Tested
If only tested in Firefox last version and WordPress last version

## Changelog
###### v1.1
Fixed issue #1

###### v1.0.0
Initial Release


[1]: http://automattic.github.io/Iris/
[2]: https://github.com/23r9i0/wp-color-picker-alpha/issues
[3]: https://github.com/23r9i0/wp-color-picker-alpha/pulls
[4]: https://github.com/WordPress/WordPress/blob/master/wp-admin/js/color-picker.js
