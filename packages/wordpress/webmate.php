<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://webmate.app
 * @since             1.0.0
 * @package           Webmate
 *
 * @wordpress-plugin
 * Plugin Name:       Webmate
 * Plugin URI:        http://webmate.app
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Mocla
 * Author URI:        http://webmate.app
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       webmate
 */


namespace Webmate;

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

define('PLUGIN_NAME', 'webmate');
define('PLUGIN_DB_PREFIX', '_webmate');
define('PLUGIN_DISPLAY_NAME', 'Webmate');
/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define(PLUGIN_NAME . '_VERSION', '0.0.1');

define('PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('PLUGIN_URL', trailingslashit(plugins_url('/', __FILE__)));



require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';


/**
 * The code that runs during plugin activation.
 * This action is Contented in includes/class-components-activator.php
 */
function activate_plugin_name()
{
}

/**
 * The code that runs during plugin deactivation.
 * This action is Contented in includes/class-components-deactivator.php
 */
function deactivate_plugin_name()
{
}

register_activation_hook(__FILE__, 'activate_plugin_name');
register_deactivation_hook(__FILE__, 'deactivate_plugin_name');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */

//require plugin_dir_path( __FILE__ ) . 'includes/plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_plugin_name()
{
	require_once PLUGIN_PATH . '/src/Plugin/Plugin.php';
	$plugin = new \Webmate\Plugin\Plugin();
	$plugin->run();
}
run_plugin_name();
