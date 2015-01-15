# wpColorPicker ( support rbga value )

- Overwrite [Automattic Iris][1] for enabled Alpha Channel in wpColorPicker
- Only run in input and is defined data alpha in true

## Screenshot
![wpcolorpicker](https://cloud.githubusercontent.com/assets/747817/5768233/05f7afd4-9d0f-11e4-819c-6fcf905045c2.gif)

## Instalation
Download and add script in you theme options or plugin.

## Usage

- Add class `.color-picker` and `data-alpha="true"` in input
- This class is optional but then need to call yourself to the class you want

### Examples

```
<input type="text" class="color-picker" data-alpha="true">
<input type="text" class="color-picker" value="#ffbc00" data-alpha="true">
<input type="text" class="color-picker" value="rgba(255,0,0,0.25)" data-alpha="true">
<input type="text" class="color-picker" data-default-color="#ffbc00" value="#ffbc00" data-alpha="true">
<input type="text" class="color-picker" data-default-color="rgba(255,0,0,0.25)" value="#ffbc00" data-alpha="true">
```

## License
Copyright (c) 2015 Sergio P.A. (23r9i0).
Licensed under the GPLv2 license.

## Support
If you would like to contribute please fork the project and [report bugs][2] or submit [pull requests][3].

## Tested
- If only tested in Firefox last version and WordPress last version

## Changelog
#### v1.0.0
- Initial Release


[1]: http://automattic.github.io/Iris/
[2]: https://github.com/23r9i0/wp-color-picker-alpha/issues
[3]: https://github.com/23r9i0/wp-color-picker-alpha/pulls
