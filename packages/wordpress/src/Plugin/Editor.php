<?php

namespace Webmate\Plugin;


use Webmate\Core\Components;

class Editor
{
    public $token = null;
    private $jwt = null;

    function __construct($jwt)
    {
        $this->jwt = $jwt;
    }



    public function init($die)
    {



        // Send MIME Type header like WP admin-header.
        @header('Content-Type: ' . get_option('html_type') . '; charset=' . get_option('blog_charset'));

        add_filter('show_admin_bar', '__return_false');

        // Remove all WordPress actions
        remove_all_actions('wp_head');
        remove_all_actions('wp_print_styles');
        remove_all_actions('wp_print_head_scripts');
        remove_all_actions('wp_footer');

        // Handle `wp_head`
        add_action('wp_head', 'wp_enqueue_scripts', 1);
        add_action('wp_head', 'wp_print_styles', 8);
        add_action('wp_head', 'wp_print_head_scripts', 9);
        add_action('wp_head', 'wp_site_icon');


        // Handle `wp_footer`
        add_action('wp_footer', 'wp_print_footer_scripts', 20);
        add_action('wp_footer', 'wp_auth_check_html', 30);


        // Handle `wp_enqueue_scripts`
        remove_all_actions('wp_enqueue_scripts');

        // Also remove all scripts hooked into after_wp_tiny_mce.
        remove_all_actions('after_wp_tiny_mce');

        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts'], 999999);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_styles'], 999999);

        // Setup default heartbeat options
        add_filter('heartbeat_settings', function ($settings) {
            $settings['interval'] = 15;
            return $settings;
        });

        // Tell to WP Cache plugins do not cache this request.

        do_action('/' . PLUGIN_NAME . '/editor/init');



        include(dirname(__FILE__) . '/templates/editor-with-php-wrapper.php');
        // From the action it's an empty string, from tests its `false`
        if (false !== $die) {
            die;
        }
    }

    public function enqueue_scripts()
    {
        remove_action('wp_enqueue_scripts', [$this, __FUNCTION__], 999999);

        global $wp_styles, $wp_scripts;


        // Reset global variable
        $wp_styles = new \WP_Styles(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
        $wp_scripts = new \WP_Scripts(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited


        // disable auth check
        // TODO: remove this callback after get the token
        add_filter('authenticate', function ($u, $p) {
            return wp_get_current_user();
        }, 10, 2);


        // create a fake request
        $request = new \WP_REST_Request;
        $request['username'] = 'empty';
        $request['password'] = 'empty';

        //get token
        $this->token = $token = $this->jwt->generate_token($request);



        wp_enqueue_script('jquery');
        wp_localize_script('jquery', 'appLocalizer', [
            'apiUrl' => get_rest_url(),
            'nonce' => wp_create_nonce('wp_rest'),
            'token' => $token['token']
        ]);

        wp_enqueue_script('wp-auth-check');

        $this->enqueue_editor_scripsts();

        do_action('webmate/editor/enqueue_scripts');
    }

    private function enqueue_editor_scripsts()
    {
        add_filter('script_loader_tag', function ($tag, $handle) {
            if ('webmate-bundle' !== $handle) {
                return $tag;
            }

            return str_replace(' src', ' onload="initComponents()" src', $tag);
        }, 10, 2);

        $components = Components::toJavascript();
        $script =
            <<<JS
                    // generate body

                    const mockups = [];
                    for(let i = 0; i < 1; i++){
                        mockups.push({
                                id: "" + i + 1,
                                component: 'container',
                                properties: {
                                    style: {
                                        backgroundColor: 'red',
                                        height: '100px',
                                        width: '100px'
                                    },
                                    children:[
                                        {
                                            id: "child-" + i + 1,
                                            component: 'container'
                                        }
                                    ]
                                },
                                
                            })
                    }
                    
                    window.CONTENT = {
                        id: 'id',
                        title: 'title',
                        type: '',
                        slug: '',
                        data: {
                            body: mockups
                        }
                    };
                    function initComponents(){
                        $components
                    }
                    
            JS;


        wp_enqueue_script(
            'webmate-bundle',
            /* add webpack serve url */
            'http://localhost:8080/main.bundle.js',
            [],
            "1.0",
            true
        );
        wp_add_inline_script('webmate-bundle', $script, 'before');
    }

    public function enqueue_styles()
    {
        global $wp_version;
        wp_enqueue_style('wp-auth-check');
        wp_enqueue_style('heartbeat');

        wp_enqueue_media();
        wp_enqueue_style(
            'media',
            admin_url('/css/media.min.css'),
            [],
            $wp_version
        );

        wp_register_script(
            'image-edit',
            '/wp-admin/js/image-edit.min.js',
            [
                'jquery',
                'json2',
                'imgareaselect',
            ],
            $wp_version,
            true
        );

        wp_enqueue_script('image-edit');
    }

    public function save_post($post_id)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!empty($_POST["_webmate_data"])) {
            //var_dump(1);
            //        update_metadata( 'post', $this->post->ID, $key, $value );

            update_metadata('post', $post_id, "_webmate_data", $_POST["_webmate_data"]);
        }
    }
}
