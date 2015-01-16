/**
 * wp-color-picker-alpha
 *
 * Overwrite Automattic Iris for enabled Alpha Channel in wpColorPicker
 * Only run in input and is defined data alpha in true
 *
 * Version: 1.0.0
 * https://github.com/23r9i0/wp-color-picker-alpha
 * Copyright (c) 2015 Sergio P.A. (23r9i0).
 * Licensed under the GPLv2 license.
 */
( function( $ ) {
    // Variable for some backgrounds
    var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==';

    // Add support for return rbga in Color Plugin
    Color.fn.toString = function() {
        if ( this._alpha < 1 )
            return this.toCSS( 'rgba', this._alpha ).replace( /\s+/g, '' );

        var hex = parseInt( this._color, 10 ).toString( 16 );

        if ( this.error )
            return '';

        if ( hex.length < 6 ) {
            for ( var i = 6 - hex.length - 1; i >= 0; i-- ) {
                hex = '0' + hex;
            }
        }

        return '#' + hex;
    };

    /**
     * Overwrite iris
     */
    $.widget( 'a8c.iris', $.a8c.iris, {
        _create: function() {
            this._super();

            // Global option for check is mode rbga is enabled
            this.options.alpha = this.element.data( 'alpha' ) || false;

            // Is not input disabled
            if ( ! this.element.is( ':input' ) ) {
                this.options.alpha = false;
            }

            if ( typeof this.options.alpha !== 'undefined' && this.options.alpha ) {
                var self = this,
                    el = self.element,
                    _html = '<div class="iris-strip iris-slider iris-alpha-slider"><div class="iris-slider-offset iris-slider-offset-alpha"></div></div>',
                    aContainer = $( _html ).appendTo( self.picker.find( '.iris-picker-inner' ) ),
                    aSlider = aContainer.find( '.iris-slider-offset-alpha' ),
                    controls = {
                        aContainer: aContainer,
                        aSlider: aSlider
                    };

                // Set default width for input reset
                self.options.defaultWidth = el.width();

                // Push new controls
                $.each( controls, function( k, v ){
                    self.controls[k] = v;
                });

                // Change size strip and add margin for sliders
                self.controls.square.css({'margin-right': '0'});
                var emptyWidth = ( self.picker.width() - self.controls.square.width() - 20 ),
                    stripsMargin = emptyWidth/6,
                    stripsWidth = (emptyWidth/2) - stripsMargin;

                $.each( [ 'aContainer', 'strip' ], function( k, v ) {
                    self.controls[v].width( stripsWidth ).css({ 'margin-left': stripsMargin + 'px' });
                });

                // Add new slider
                self._initControls();

                // For updated widget
                self._change();
            }
        },
        _initControls: function() {
            this._super();

            if ( this.options.alpha ) {
                var self = this,
                    controls = self.controls;

                controls.aSlider.slider({
                    orientation: 'vertical',
                    min: 0,
                    max: 100,
                    step: 1,
                    value: parseInt( self._color._alpha*100 ),
                    slide: function( event, ui ) {
                        // Update alpha value
                        self._color._alpha = parseFloat( ui.value/100 );
                        self._change.apply( self, arguments );
                    }
                });
            }
        },
        _change: function() {
            this._super();

            if ( this.options.alpha ) {
                var self = this,
                    el = self.element,
                    controls = self.controls,
                    alpha = parseInt( self._color._alpha*100 ),
                    color = self._color.toRgb(),
                    gradient = [
                        'rgb(' + color.r + ',' + color.g + ',' + color.b + ') 0%',
                        'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0) 100%'
                    ],
                    defaultWidth = self.options.defaultWidth,
                    target = self.picker.closest('.wp-picker-container').find( '.wp-color-result' ),
                    targetStyle = 'background:url(' + image + ')';

                // Generate background slider alpha, only for CSS3 old browser fuck!! :)
                controls.aContainer.css({ 'background': 'linear-gradient(to bottom, ' + gradient.join( ', ' ) + '), url(' + image + ')' });

                // Override default background color in input
                // The wpColorPicker not change background color
                if ( target.length > 0 ) {
                    target.attr( 'style', targetStyle ).html('<span />');
                    target.find('span').css({
                        'width': '100%',
                        'height': '100%',
                        'position': 'absolute',
                        'top': 0,
                        'left': 0,
                        'border-top-left-radius': '3px',
                        'border-bottom-left-radius': '3px',
                        'background': self._color.toString()
                    });
                }

                if ( target.hasClass('wp-picker-open') ) {
                    // Update alpha value
                    controls.aSlider.slider( 'value', alpha );

                    /**
                     * Disabled change opacity in default slider Saturation ( only is alpha enabled )
                     * and change input width for view all value
                     */
                    if ( self._color._alpha < 1 ) {
                        var style = controls.strip.attr( 'style' ).replace( /rgba\(([0-9]+,)(\s+)?([0-9]+,)(\s+)?([0-9]+)(,(\s+)?[0-9\.]+)\)/g, 'rgb($1$3$5)' );

                        controls.strip.attr( 'style', style );

                        el.width( parseInt( defaultWidth+100 ) );

                        var reset = el.data('reset-alpha') || false;
                        if ( reset ) {
                            self.picker.find( '.iris-palette-container' ).on( 'click.palette', '.iris-palette', function() {
                                self._color._alpha = 1;
                                self.active = 'external';
                                self._change();
                            });
                        }
                    } else {
                        el.width( defaultWidth );
                    }
                }
            }
        }
    } );
}( jQuery ) );

// Auto Call plugin is class is color-picker
jQuery( document ).ready( function( $ ) {
  $( '.color-picker' ).wpColorPicker();
} );