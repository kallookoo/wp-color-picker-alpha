# Changelog

## v3.0.4

### Fixed

* Issue [#50](../../issues/50)

## v3.0.3

### Added

* Add option to change the debounce timeout

### Changed

* Merge the [#49](../../pull/49) to add the skip debounce timeout.

## v3.0.2

### Fixed

* Issue [#47](../../issues/47)

## v3.0.1

### Fixed

* Issue [#46](../../issues/46)

## v3.0.0

### Changed

* Rewrite the code, now only the necessary methods are overwritten to try to give better compatibility.
* Issue [#4](../../issues/4)
* Issue [#19](../../issues/19)
* Issue [#23](../../issues/23)
* Issue [#26](../../issues/26)
* Issue [#30](../../issues/30)
* Issue [#35](../../issues/35)
* Issue [#36](../../issues/36)

## v2.1.4

### Fixed

* Fix issue [#31](../../issues/31), Thanks for @webaware

## v2.1.3

### Fixed

* Fix issue [#13](../../pull/13), Thanks for @jtsternberg, see [#15](../../pull/15)

## v2.1.2

### Added

* Declare some global variables when is deprecated or not

### Changed

* Change method to check WordPress version, recommended by @webaware, see [comments][212]

## v2.1.1

### Changed

* Change method to check WordPress version

## v2.1.0

### Fixed

* Resolve issues with wp-color-picker.css, see [#12](../../pull/12)

  > The variable wpColorPickerL10n is used to check if it is earlier than version 4.9 and adjusts the content,
  > only tested in 4.8.3 and 4.9-RC2-42156.

## v2.0.0

### Added

* Add support for WordPress 4.9, also works in lower versions, only tested in version 4.8

## v1.2.2

### Changed

* Pull, see [#7](../../pull/7)

## v1.2.1

### Changed

* Pull, see [#4](../../pull/4)

## v1.2.0

### Added

* Add functionality to change the width of the element, see [#2](../../issues/2)

## v1.1.0

### Fixed

* Fixed issue [#1](../../issues/1)
* Show Iris error always, but if not is empty input
* Fixed option reset, not reset in first time
* Fixed width input with data alpha is true and plugin initialize

## v1.0.1

### Fixed

* Fix working in multiple color pickers.

### Added

* Add new option via data for set Alpha Channel in 100%.

## v1.0.0

### Added

* Initial Release.

[212]: https://github.com/kallookoo/wp-color-picker-alpha/commit/41fe4dfa0aa5abe98e905075c1b98ceff39fd704#commitcomment-25592012
