/**!
 * wp-color-picker-alpha
 *
 * Overwrite Automattic Iris for enabled Alpha Channel in wpColorPicker
 * Only run in input and is defined data alpha in true
 *
 * Version: 3.0.0
 * https://github.com/kallookoo/wp-color-picker-alpha
 * Licensed under the GPLv2 license or later.
 */

( function( $, undef ) {

	var wpColorPickerAlpha = {
		'version' : 300
	};

	// Always try to use the last version of this script.
	if ( 'wpColorPickerAlpha' in window && 'version' in window.wpColorPickerAlpha ) {
		var version = parseInt( window.wpColorPickerAlpha.version, 10 );
		if ( ! isNaN( version ) && version >= wpColorPickerAlpha.version ) {
			return;
		}
	}

	// Prevent multiple initiations
	if ( Color.fn.hasOwnProperty( 'to_s' ) ) {
		return;
	}

	// Create new method to replace the `Color.toString()` inside the scripts.
	Color.fn.to_s = function( type ) {
		type = ( type || 'rgb' );
		// Change hex to rgba to return the correct color.
		if ( 'hex' === type && this._alpha < 1 ) {
			type = 'rgb';
		}

		/**
		 * Possible types: rgb, hsl or hex
		 */
		return this.toCSS( type ).replace( /\s+/g, '' );
	}

	// Register the global variable.
	window.wpColorPickerAlpha = wpColorPickerAlpha;

	// Background image encoded
	var backgroundImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==';

	/**
	 * Iris
	 */
	$.widget( 'a8c.iris', $.a8c.iris, {
		/**
		 * Alpha options
		 *
		 * @type {Object}
		 */
		alphaOptions: {
			alphaEnabled: false,
			alphaCustomWidth: 100,
			alphaReset: false,
			alphaColorType: 'hex',
			isDeprecated: false,
		},
		/**
		 * Get the current color or the new color.
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @param {Object|*} The color instance if not defined return the cuurent color.
		 *
		 * @return {string} The element's color.
		 */
		_getCurrentColor: function( color ) {
			if ( color === undef ) {
				color = this._color;
			}
			if ( this.alphaOptions.alphaEnabled  ) {
				return color.to_s( this.alphaOptions.alphaColorType );
			}
			return color.toString();
		},
		/**
		 * Binds event listeners to the Iris.
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @return {void}
		 */
		_addInputListeners: function( input ) {
			var self = this,
				debounceTimeout = 100,
				callback = function( event ){
					var val = input.val(),
						color = new Color( val ),
						val = val.replace( /^(#|(rgb|hsl)a?)/, '' ),
						type = ( self.alphaOptions.alphaColorType || 'hex' );

					input.removeClass( 'iris-error' );
					// we gave a bad color
					if ( color.error ) {
						// don't error on an empty input - we want those allowed
						if ( val !== '' ) {
							input.addClass( 'iris-error' );
						}
					} else {
						if ( ! ( color.toString() === self._color.toString() && color._alpha === self.color._alpha ) ) {
							if ( event.type !== 'keyup' ) {
								// let's not do this on keyup for hex shortcodes
								if ( 'hex' === type && val.match( /^[0-9a-fA-F]{3}$/ ) ) {
									return;
								}
								self._setOption( 'color', self._getCurrentColor( color ) );
							}
						}
					}
				};

			input.on( 'change', callback ).on( 'keyup', self._debounce( callback, debounceTimeout ) );

			// If we initialized hidden, show on first focus. The rest is up to you.
			if ( self.options.hide ) {
				input.one( 'focus', function() {
					self.show();
				});
			}
		},
		/**
		 * Create the controls sizes
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @param {bool} reset Set to True for recreate the controls sizes.
		 *
		 * @return {void}
		 */
		_dimensions: function( reset ) {
			this._super( reset );

			if ( this.alphaOptions.alphaEnabled ) {
				var self = this,
					opts = self.options,
					controls = self.controls,
					square = controls.square,
					strip = self.picker.find( '.iris-strip' ),
					innerWidth, squareWidth, stripWidth, stripMargin, totalWidth;

				/**
				 * I use Math.round() to avoid possible size errors,
				 * this function returns the value of a number rounded
				 * to the nearest integer.
				 *
				 * The width to append all widgets,
				 * if border is enabled, 22 is subtracted.
				 * 20 for css left and right property
				 * 2 for css border
				 */
				innerWidth = Math.round( self.picker.outerWidth(true) - ( opts.border ? 22 : 0 ) );
				// The width of the draggable, aka square.
				squareWidth = Math.round( square.outerWidth() );
				// The width for the sliders
				stripWidth = Math.round( ( innerWidth - squareWidth ) / 2 );
				// The margin for the sliders
				stripMargin = Math.round( stripWidth / 2 );
				// The total width of the elements.
				totalWidth = Math.round( squareWidth + ( stripWidth * 2 ) + ( stripMargin * 2 ) );

				// Check and change if necessary.
				while ( totalWidth > innerWidth ) {
					stripWidth = Math.round( stripWidth - 2.5 );
					stripMargin = Math.round( stripMargin - 1 );
					totalWidth = Math.round( squareWidth + ( stripWidth * 2 ) + ( stripMargin * 2 ) );
				}


				square.css( 'margin', '0' );
				strip.width( stripWidth ).css( 'margin-left', stripMargin + 'px' );
			}
		},
		/**
		 * Callback to update the controls and the current color.
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @return {void}
		 */
		_change: function() {
			var self = this,
				active = self.active;

			self._super();

			if ( self.alphaOptions.alphaEnabled ) {
				var	controls     = self.controls,
					alpha        = parseInt( self._color._alpha * 100 ),
					color        = self._color.toRgb(),
					gradient     = [
						'rgb(' + color.r + ',' + color.g + ',' + color.b + ') 0%',
						'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0) 100%'
					],
					target       = self.picker.closest( '.wp-picker-container' ).find( '.wp-color-result' );

				self.options.color = self._getCurrentColor();
				// Generate background slider alpha, only for CSS3 old browser fuck!! :)
				controls.stripAlpha.css( { 'background' : 'linear-gradient(to bottom, ' + gradient.join( ', ' ) + '), url(' + backgroundImage + ')' } );
				// Update alpha value
				if ( active ) {
					controls.stripAlphaSlider.slider( 'value', alpha );
				}

				if ( ! self._color.error ) {
					self.element.removeClass( 'iris-error' ).val( self._getCurrentColor() );
				}

				self.picker.find( '.iris-palette-container' ).on( 'click.palette', '.iris-palette', function() {
					var color = $( this ).data( 'color' );
					if ( self.alphaOptions.alphaReset ) {
						self._color._alpha = 1;
						color = self._getCurrentColor();
					}
					self._setOption( 'color', color );
				} );
			}
		},
		/**
		 * Paint dimensions.
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @param {string} origin  Origin (position).
		 * @param {string} control Type of the control,
		 *
		 * @return {void}
		 */
		_paintDimension: function( origin, control ) {
			var self = this,
				color = false;

			// Fix for slider hue opacity.
			if ( self.alphaOptions.alphaEnabled && 'strip' === control ) {
				color = self._color;
				self._color = new Color( color.toString() ).setHSpace( self.options.mode );
				self.hue = self._color.h();
			}

			self._super( origin, control );

			// Restore the color after paint.
			if ( color ) {
				self._color = color;
			}
		},
		/**
		 * To update the options, see original source to view the available options.
		 *
		 * @since 3.0.0
		 *
		 * @param {string} key   The Option name.
		 * @param {mixed} value  The Option value to update.
		 *
		 * @return {void}
		 */
		_setOption: function( key, value ) {
			var self = this,
				el = self.element;

			if ( 'alphaOptions' === key ) {
				if ( typeof value === 'object' ) {
					self.alphaOptions = $.extend( {}, self.alphaOptions, value );
				}

				if ( ! self.alphaOptions.alphaEnabled ) {
					return;
				}

				// Update the width element
				if ( self.alphaOptions.alphaCustomWidth ) {
					el.width( parseInt( el.width() + self.alphaOptions.alphaCustomWidth, 10 ) );
				}

				// Create Alpha controls
				var stripAlpha = self.controls.strip.clone(false, false),
					stripAlphaSlider = stripAlpha.find( '.iris-slider-offset' ),
					controls = {
						stripAlpha       : stripAlpha,
						stripAlphaSlider : stripAlphaSlider
					};

				stripAlpha.addClass( 'iris-strip-alpha' );
				stripAlphaSlider.addClass( 'iris-slider-offset-alpha' );
				stripAlpha.appendTo( self.picker.find( '.iris-picker-inner' ) );

				// Push new controls
				self.controls = $.extend( true, self.controls, controls );

				// Create slider
				self.controls.stripAlphaSlider.slider( {
					orientation : 'vertical',
					min         : 0,
					max         : 100,
					step        : 1,
					value       : parseInt( self._color._alpha * 100 ),
					slide       : function( event, ui ) {
						self.active = 'strip';
						// Update alpha value
						self._color._alpha = parseFloat( ui.value / 100 );
						self._change.apply( self, arguments );
					}
				} );

				// Update dimensions
				self._dimensions(true);

				// Update with valid format of the current color
				self._setOption( 'color', self._getCurrentColor() );


			// Set the valid color in Alpha Mode.
			} else if ( self.alphaOptions.alphaEnabled && 'color' === key ) {
				// cast to string in case we have a number
				value = '' + value;
				newColor = new Color( value ).setHSpace( self.options.mode );
				if ( ! newColor.error ) {
					self._color = newColor;
					self.options.color = self._getCurrentColor();
					self.active = 'external';
					self._change();
				}
			} else {
				return self._super( key, value );
			}
		},
		/**
		 * Returns the iris object if no new color is provided. If a new color is provided, it sets the new color.
		 *
		 * @param newColor {string|*} The new color to use. Can be undefined.
		 *
		 * @since 3.0.0
		 *
		 * @return {string} The element's color.
		 */
		color: function( newColor ) {
			if ( newColor === true ) {
				return this._color.clone();
			}
			if ( newColor === undef ) {
				return this._getCurrentColor();
			}
			this.option( 'color', newColor );
		}
	} );

	/**
	 * wpColorPicker
	 */
	$.widget( 'wp.wpColorPicker', $.wp.wpColorPicker, {
		/**
		 * Creates the color picker.
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @return {void}
		 */
		_create: function() {
			/**
			 * Define the defaults, it changes later.
			 *
			 * It is declared here because for some reason
			 * when there are several instances the values
			 * of the previous one are used.
			 *
			 * @type {Object}
			 */
			this._alphaOptions = {
				alphaEnabled: false,
				alphaCustomWidth: 100,
				alphaReset: false,
				alphaColorType: 'hex',
				isDeprecated: false,
			};

			return this._super();
		},
		/**
		 * Binds event listeners to the color picker and create options, etc...
		 *
		 * @since 3.0.0
		 * @access private
		 *
		 * @return {void}
		 */
		_addListeners: function() {
			var self = this,
				el = self.element;

			if ( ! ( 'alphaEnabled' in self.options && self.options.alphaEnabled ) ) {
				return self._super();
			}

			// Check if valid to prevent errors.
			if ( ! ( self.options.alphaEnabled && el.is( 'input' ) && self.options.type === 'full' ) ) {
				return self._super();
			}

			var options = {
				alphaEnabled: true,
				isDeprecated: self.toggler.is( 'a' ),
			};

			$.each( self._alphaOptions, function( k, v ) {
				if ( 'alphaEnabled' === k || 'isDeprecated' === k ) {
					return true;
				}

				var value = ( k in self.options ? self.options[k] : undef );
				switch( k ) {
					case 'alphaCustomWidth':
						value = ( value === undef ? v : value );
						value = ( value ? parseInt( value, 10 ) : 0 );
						value = ( isNaN( value ) ? v : value );
						break;
					case 'alphaColorType':
						if ( value === undef || ! value.match( /^(hex|rgb|hsl)$/ ) ) {
							var color = self.initialValue;
							if ( !!color && self.options.defaultColor ) {
								color = self.options.defaultColor;
							}

							if ( color && color.match( /^(rgb|hsl)/ ) ) {
								value = color.substring( 0, 3 );
							}
						} else {
							value = v;
						}
						break;
					default:
						value = ( value === undef ? v : !!value );
						break;
				}
				options[k] = value;

			} );

			self._alphaOptions = $.extend( self._alphaOptions, options );

			self.toggler.css( { 'background-image' : 'url(' + backgroundImage + ')' } );
			if ( self._alphaOptions.isDeprecated ) {
				self.toggler.html( '<span class="color-alpha" />' );
			} else {
				self.toggler.css( { 'position' : 'relative' } ).append('<span class="color-alpha" />');
			}

			self.colorAlpha = self.toggler.find( 'span.color-alpha' );

			self.colorAlpha.css( {
				'width'                     : '30px',
				'height'                    : '100%',
				'position'                  : 'absolute',
				'top'                       : 0,
				'left'                      : 0,
				'border-top-left-radius'    : '2px',
				'border-bottom-left-radius' : '2px',
				'background-color'          : el.val()
			} );

			el.iris( {
				alphaOptions: self._alphaOptions,
				/**
				 * @summary Handles the onChange event if one has been defined in the options.
				 *
				 * Handles the onChange event if one has been defined in the options and additionally
				 * sets the background color for the toggler element.
				 *
				 * @since 3.0.0
				 *
				 * @param {Event} event    The event that's being called.
				 * @param {HTMLElement} ui The HTMLElement containing the color picker.
				 *
				 * @returns {void}
				 */
				change: function( event, ui ) {
					var instance = el.iris('instance');

					if ( self._alphaOptions.isDeprecated ) {
						self.toggler.css( { 'background-image' : 'url(' + backgroundImage + ')' } );
					}
					/**
					 * Call the Iris instance to get the CSS color.
					 * Not use the ui.color because no if defined the type
					 */
					self.colorAlpha.css( { 'background-color': instance.color() } );

					if ( $.isFunction( self.options.change ) ) {
						self.options.change.call( this, event, ui );
					}
				}
			} );


			/**
			 * Prevent any clicks inside this widget from leaking to the top and closing it.
			 *
			 * @since 3.0.0
			 *
			 * @param {Event} event The event that's being called.
			 *
			 * @return {void}
			 */
			self.wrap.on( 'click.wpcolorpicker', function( event ) {
				event.stopPropagation();
			});

			/**
			 * Open or close the color picker depending on the class.
			 *
			 * @since 3.0.0
			 */
			self.toggler.click( function() {
				if ( self.toggler.hasClass( 'wp-picker-open' ) ) {
					self.close();
				} else {
					self.open();
				}
			});

			/**
			 * Checks if value is empty when changing the color in the color picker.
			 * If so, the background color is cleared.
			 *
			 * @since 3.0.0
			 *
			 * @param {Event} event The event that's being called.
			 *
			 * @return {void}
			 */
			el.on( 'change', function( event ) {
				var val = $( this ).val();

				if ( el.hasClass( 'iris-error' ) || val === '' || val.match( /^(#|(rgb|hsl)a?)$/ ) ) {
					if ( self._alphaOptions.isDeprecated ) {
						self.toggler.removeAttr( 'style' );
					}

					self.colorAlpha.css( 'background-color', '' );

					// fire clear callback if we have one
					if ( $.isFunction( self.options.clear ) ) {
						self.options.clear.call( this, event );
					}
				}
			} );

			/**
			 * Enables the user to either clear the color in the color picker or revert back to the default color.
			 *
			 * @since 3.0.0
			 *
			 * @param {Event} event The event that's being called.
			 *
			 * @return {void}
			 */
			self.button.on( 'click', function( event ) {
				if ( $( this ).hasClass( 'wp-picker-clear' ) ) {
					if ( self._alphaOptions.isDeprecated ) {
						self.toggler.removeAttr( 'style' );
					}
					self.colorAlpha.css( 'background-color', '' );

					el.val( '' );

					if ( $.isFunction( self.options.clear ) ) {
						self.options.clear.call( this, event );
					}

					el.trigger( 'change' );
				} else if ( $( this ).hasClass( 'wp-picker-default' ) ) {
					el.val( self.options.defaultColor ).change();
				}
			});
		},
		/**
		 * Returns the iris object if no new color is provided. If a new color is provided, it sets the new color.
		 *
		 * @param newColor {string|*} The new color to use. Can be undefined.
		 *
		 * @since 3.0.0
		 *
		 * @return {string} The element's color.
		 */
		color: function( newColor ) {
			if ( newColor === undef ) {
				if ( this._alphaOptions.alphaEnabled ) {
					return this.element.iris('instance').color();
				}
				return this.element.iris( 'option', 'color' );
			}
			this.element.iris( 'option', 'color', newColor );
		},
	} );

	/**
	 * Auto call this Color Picker version.
	 *
	 * @since 1.0.0
	 */
	$( document ).ready( function() {
		$( '.color-picker' ).wpColorPicker();

	} );

} ( jQuery ) );