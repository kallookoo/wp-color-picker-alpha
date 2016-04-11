<?php
/**
 * Plugin Name: WP Color Picker Alpha
 * Plugin URI: https://github.com/23r9i0/wp-color-picker-alpha
 * Description: Plugin to test wp-color-picker-alpha script
 * Version: 1.2.2
 * Author: Sergio P.A. ( 23r9i0 )
 * Author URI: http://dsergio.com/
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

defined( 'ABSPATH' ) or exit;

class WP_Color_Picker_Alpha {

	private static $_instance = null;

	private $_plugin_hook = null;

	private $_defaults_colors = array(
		'alpha_color'                => 'rgba(192,57,43,0.5)',
		'alpha_color_clear'          => 'rgba(211,84,0,0.5)',
		'alpha_color_reset'          => 'rgba(231,76,60,0.5)',
		'alpha_color_reset_clear'    => 'rgba(230,126,34,0.5)',
		'alpha_color_custom_width'   => 'rgba(142,68,173,0.5)',
		'alpha_color_disabled_width' => 'rgba(155,89,182,0.5)',
		'normal_color'               => '#16a085',
		'normal_color_clear'         => '#27ae60',
	);

	private $_current_colors = array();

	public static function instance() {
		if ( ! isset( self::$_instance ) )
			self::$_instance = new self;

		return self::$_instance;
	}

	private function __construct() {
		$this->_current_colors = get_option( 'wp-color-picker-alpha', $this->_defaults_colors );

		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}

	public function admin_menu() {
		$this->_plugin_hook = add_options_page(
			'Color Picker Alpha',
			'Color Picker Alpha',
			'manage_options',
			'color-picker-alpha-test',
			array( $this, 'add_options_page' )
		);
	}

	public function add_options_page() {
		?>
		<div class="wrap">
			<h2>Color Picker Alpha Test</h2>
			<form method="post" action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>">
			<?php settings_fields( 'wp-color-picker-alpha-register' ); ?>
			<?php do_settings_sections( $this->_plugin_hook ); ?>
			<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	public function admin_init() {
		register_setting( 'wp-color-picker-alpha-register', 'wp-color-picker-alpha' );

		// Normal Color
		add_settings_section( 'wp-color-picker-alpha-normal_color', 'Color Without Alpha Channel', '__return_false', $this->_plugin_hook );
		add_settings_field( 'normal_color', 'Color with default color', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha-normal_color',
			array(
				'alpha'         => 0,
				'current_color' => $this->_current_colors['normal_color'],
				'default_color' => $this->_defaults_colors['normal_color'],
				'name'          => 'normal_color',
			)
		);
		add_settings_field( 'normal_color_clear', 'Color without default color', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha-normal_color',
			array(
				'alpha'         => 0,
				'current_color' => $this->_current_colors['normal_color_clear'],
				'name'          => 'normal_color_clear',
			)
		);

		// Alpha Color
		add_settings_section( 'wp-color-picker-alpha_alpha_color', 'Color With Alpha Channel', '__return_false', $this->_plugin_hook );
		add_settings_field( 'alpha_color', 'Color with default color', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 1,
				'current_color' => $this->_current_colors['alpha_color'],
				'default_color' => $this->_defaults_colors['alpha_color'],
				'name'          => 'alpha_color',
			)
		);
		add_settings_field( 'alpha_color_clear', 'Color without default color', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 1,
				'current_color' => $this->_current_colors['alpha_color_clear'],
				'name'          => 'alpha_color',
			)
		);
		add_settings_field( 'alpha_color_reset', 'Color with default color and reset Alpha Channel', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 2,
				'current_color' => $this->_current_colors['alpha_color_reset'],
				'default_color' => $this->_defaults_colors['alpha_color_reset'],
				'name'          => 'alpha_color_reset',
			)
		);
		add_settings_field( 'alpha_color_reset_clear', 'Color without default color and reset Alpha Channel', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 2,
				'current_color' => $this->_current_colors['alpha_color_reset_clear'],
				'name'          => 'alpha_color_reset_clear',
			)
		);

		add_settings_field( 'alpha_color_custom_width', 'Color with default color and custom rgba width', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 1,
				'current_color' => $this->_current_colors['alpha_color_custom_width'],
				'default_color' => $this->_defaults_colors['alpha_color_custom_width'],
				'name'          => 'alpha_color_custom_width',
				'width'         => 200,
			)
		);

		add_settings_field( 'alpha_color_disabled_width', 'Color with default color and disabled rgba width', array( $this, 'field_color' ), $this->_plugin_hook, 'wp-color-picker-alpha_alpha_color',
			array(
				'alpha'         => 1,
				'current_color' => $this->_current_colors['alpha_color_disabled_width'],
				'default_color' => $this->_defaults_colors['alpha_color_disabled_width'],
				'name'          => 'alpha_color_disabled_width',
				'width'         => 'false',
			)
		);
	}

	public function field_color( $args ) {
		$attributes = isset( $args['current_color'] ) ? ' value="'.$args['current_color'].'"' : ' value=""';

		if ( isset( $args['default_color'] ) )
			$attributes .= ' data-default-color="' . $args['default_color'] . '"';

		if ( isset( $args['alpha'] ) ) {
			switch ( $args['alpha'] ) {
				case 1:
					$attributes .= ' data-alpha="true"';
					break;
				case 2:
					$attributes .= ' data-alpha="true"';
					$attributes .= ' data-reset-alpha="true"';
					break;
				default:
					break;
			}
		}

		if ( isset( $args['width'] ) )
			$attributes .= ' data-custom-width="' . $args['width'] . '"';

		if ( isset( $args['name'] ) )
			printf( '<input type="text" class="color-picker" name="wp-color-picker-alpha[%1$s]"%2$s>', $args['name'], $attributes );
	}

	public function admin_enqueue_scripts( $hook ) {
		if ( $this->_plugin_hook !== $hook )
				return;

		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker-alpha', plugins_url( 'wp-color-picker-alpha.js', __FILE__ ), array( 'wp-color-picker' ), time() );
	}

	public static function deactivation() {
		delete_option( 'wp-color-picker-alpha' );
	}
}

add_action( 'plugins_loaded', 'WP_Color_Picker_Alpha::instance' );
register_deactivation_hook( __FILE__, 'WP_Color_Picker_Alpha::deactivation' );
