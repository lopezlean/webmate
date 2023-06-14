<?php

namespace Webmate\Plugin;

use Webmate\Frontend\Frontend;
use Webmate\Frontend\Preview;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin
 * @subpackage Plugin/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Plugin
 * @subpackage Plugin/includes
 * @author     Your Name <email@example.com>
 */




use Webmate\Admin\Admin;
use Webmate\Core\Components;

class Plugin
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Plugin_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $jwt;
	protected $editor;
	protected $frontend;
	protected $preview;
	protected $layout;
	protected $api;
	protected $loader;
	protected $routes;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $Plugin    The string used to uniquely identify this plugin.
	 */
	protected $Plugin;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{
		if (defined(PLUGIN_NAME . '_VERSION')) {
			$this->version = constant(PLUGIN_NAME . '_VERSION');
		} else {
			$this->version = 'dev';
		}
		$this->Plugin = 'webmate';



		$this->load_dependencies();
		$this->set_locale();

		$this->define_public_hooks();
		$this->define_admin_hooks();
	}


	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Plugin_Loader. Orchestrates the hooks of the plugin.
	 * - Plugin_i18n. Defines internationalization functionality.
	 * - Plugin_Admin. Defines all hooks for the admin area.
	 * - Plugin_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{
		$this->loader = new Loader();
		$this->jwt = new Auth();
		$this->api = new Api($this->jwt);
		$this->editor = new Editor($this->jwt);
		$this->layout = new Layout();
		$this->frontend = new Frontend();
		$this->preview = new Preview();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Plugin_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new I18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		add_filter('wp_save_post_revision_check_for_changes', '__return_false');


		$plugin_admin = new Admin($this->get_plugin(), $this->get_version());

		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
		$this->loader->add_action('post_row_actions', $plugin_admin, 'filter_post_row_actions', 11, 2);
		$this->loader->add_action('page_row_actions', $plugin_admin, 'filter_post_row_actions', 11, 2);
		$this->loader->add_action('admin_footer', $plugin_admin, 'add_admin_edit_button');
		$this->loader->add_action('admin_action_' . PLUGIN_NAME, $this->editor, 'init');

		$this->loader->add_action('admin_notices', $this, 'admin_notices');

		$this->loader->add_action('save_post', $this->editor, 'save_post');
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks()
	{


		$this->loader->add_action('rest_api_init', $this->api, 'init');
		$this->loader->add_action('init', Components::class, 'init');
		$this->loader->add_action('init', $this->frontend, 'init');
		$this->loader->add_action('init', $this->layout, 'init');
		$this->loader->add_filter('rest_pre_dispatch', $this->jwt, 'rest_pre_dispatch', 10, 2);
		$this->loader->add_filter('determine_current_user', $this->jwt, 'determine_current_user', 10);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin()
	{
		return $this->Plugin;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Plugin_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}


	public function admin_notices()
	{
		if (defined('WEBMATE_AUTH_SECRET_KEY')) {
			return;
		}

		// TODO : provide a admin area to define this key

		echo '<div class="notice notice-warning is-dismissible">
				<p>Webmate WEBMATE_AUTH_SECRET_KEY is not defined. Please define it in wp-config.php to avoid security problems.</p>
			</div>';
	}
}
