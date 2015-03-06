<?php
/**
 * Plugin Name: Color Picker Alpha
 * Plugin URI: https://github.com/23r9i0/wp-color-picker-alpha-test
 * Description: Plugin to test wp-color-picker-alpha
 * Version: 1.0
 * Author: Sergio P.A. ( 23r9i0 )
 * Author URI: http://dsergio.com/
 * License: GPL2
 */

defined( 'ABSPATH' ) or exit;

add_action( 'plugins_loaded', 'ColorPickerAlphaTest::instance' );
register_deactivation_hook( __FILE__, 'ColorPickerAlphaTest::deactivation' );

class ColorPickerAlphaTest {

	private static $_instance = null;

	private $_plugin = null;

	private $_defaults_colors = array(
		'normal'      => '#2980b9',
		'alpha'       => 'rgba(22,160,133, 0.5)',
		'alpha-reset' => 'rgba(192,57,43,0.5)'
	);

	private $_current_colors = array();

	public static function instance() {
		if ( ! isset( self::$_instance ) )
			self::$_instance = new self;

		return self::$_instance;
	}

	private function __construct() {
		$this->_current_colors = get_option( 'ColorPickerAlphaTest', $this->_defaults_colors );

		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}

	public function admin_menu() {
		$this->_plugin = add_options_page(
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
			<?php settings_fields( 'cpat-register' ); ?>
			<?php do_settings_sections( $this->_plugin ); ?>
			<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	public function admin_init() {
		register_setting( 'cpat-register', 'ColorPickerAlphaTest' );

		// Normal Color
		add_settings_section( 'cpat_normal_color', '', '__return_false', $this->_plugin );
		add_settings_field( 'normal_color', 'Color Without Alpha', array( $this, 'field_color' ), $this->_plugin, 'cpat_normal_color',
			array(
				'alpha'         => 0,
				'current_color' => $this->_current_colors['normal'],
				// 'default_color' => $this->_defaults_colors['normal'],
				'name'          => 'normal',
			)
		);

		// Alpha Color
		add_settings_section( 'cpat_alpha_color', '', '__return_false', $this->_plugin );
		add_settings_field( '', 'Color With Alpha', array( $this, 'field_color' ), $this->_plugin, 'cpat_alpha_color',
			array(
				'alpha'         => 1,
				'current_color' => $this->_current_colors['alpha'],
				// 'default_color' => $this->_defaults_colors['alpha'],
				'name'          => 'alpha',
			)
		);

		// Alpha Color with reset
		add_settings_section( 'cpat_alpha_reset_color', '', '__return_false', $this->_plugin );
		add_settings_field( '', 'Color With Alpha And Reset Option', array( $this, 'field_color' ), $this->_plugin, 'cpat_alpha_reset_color',
			array(
				'alpha'         => 2,
				'current_color' => $this->_current_colors['alpha-reset'],
				'default_color' => $this->_defaults_colors['alpha-reset'],
				'name'          => 'alpha-reset',
			)
		);
	}

	public function field_color( $args ) {
		$attributes = '';

		if ( isset( $args['current_color'] ) )
			$attributes .= ' value="'.$args['current_color'].'"';

		if ( isset( $args['default_color'] ) )
			$attributes .= ' data-default-color="'.$args['default_color'].'"';

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

		if ( isset( $args['name'] ) )
			printf( '<input type="text" class="color-picker"%1$s name="ColorPickerAlphaTest[%2$s]">', $attributes, $args['name'] );
	}

	public function admin_enqueue_scripts( $hook ) {
		if ( $this->_plugin != $hook )
			return;

		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker-alpha', plugins_url( 'wp-color-picker-alpha.js', __FILE__ ), array( 'wp-color-picker' ), time() );
	}

	public static function deactivation() {
		delete_option( 'ColorPickerAlphaTest' );
	}
}
