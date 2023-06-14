<?php

namespace Webmate\Plugin;

use Webmate\Core\Components;

require_once 'Content.php';
require_once 'LayoutManager.php';

/**
 * This file will create Custom Rest API End Points.
 */



class Api
{

    private $auth = null;

    private $fields = [
        PLUGIN_DB_PREFIX . '_data'
    ];



    function __construct($auth)
    {
        $this->auth = $auth;
    }

    public function init()
    {
        //remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        //add_filter('rest_pre_serve_request', [$this, 'initCors']);
        $this->create_rest_fields();
        $this->create_rest_routes();
        $this->add_cors_support();
    }

    public function add_cors_support()
    {
        $enable_cors = defined('WEBMATE_AUTH_CORS_ENABLE') ? constant('WEBMATE_AUTH_CORS_ENABLE') : true;
        if ($enable_cors) {
            $headers = apply_filters('jwt_auth_cors_allow_headers', 'Access-Control-Allow-Headers, Content-Type, Authorization');
            header(sprintf('Access-Control-Allow-Headers: %s', $headers));
        }
    }


    private function create_rest_fields()
    {
        foreach ($this->fields as $field) {
            register_rest_field(
                // TODO: Add support for custom post types.
                ['post', 'page', 'webmate_layout'],
                $field,
                array(
                    'get_callback'    => function ($object) use ($field) {
                        // Get field as single value from post meta.
                        $meta = $this->get_post_meta_field($object, $field);
                        $ret =  $meta ? (object) $meta : new \stdClass;

                        $ret->post_type = $object['type'];

                        $postTypeObject = get_post_type_object($ret->post_type);

                        $ret->rest_base = strtolower($postTypeObject->rest_base);


                        $ret->is_front_page = \get_option('page_on_front') == $object['id'];
                        $ret->is_page_for_posts = \get_option('page_for_posts') == $object['id'];

                        $ret->id = $object['id'];
                        $ret->title = $object['title']['rendered'];
                        $ret->slug = $object['slug'];

                        $ret->layouts = $this->get_layouts();
                        $ret->internal_url = $ret->is_front_page ? "http://localhost" : "http://localhost/{$object['type']}/{$object['id']}";
                        $ret->layout = $this->get_layout($ret->internal_url);


                        return $ret;
                    },
                    'update_callback' => function ($value, $object) use ($field) {
                        // Update the field/meta value.
                        $this->update_post_meta_field($object, $field, $value);
                    },
                    'schema' => null
                )
            );
        }
    }

    private function get_layout($internal_url)
    {
        $manager = new LayoutManager($this->get_layouts());
        return $manager->get_layout($internal_url);
    }

    private function get_layouts()
    {
        $meta = PLUGIN_DB_PREFIX . '_data';
        $args = array(
            'post_type' => 'webmate_layout',

        );
        $posts = get_posts($args);
        $layouts = [];
        foreach ($posts as $layout) {

            $layouts[] = $this->get_post_meta_field(['id' => $layout->ID], $meta);;
        }

        return $layouts;
    }
    private function get_post_meta_field($object, $field)
    {
        $data = get_post_meta($object['id'], $field, true);

        return empty($data) ? new Content : $data;
    }

    private function update_post_meta_field($object, $field, $data)
    {
        update_post_meta($object->ID, $field, $data);
    }

    private function create_rest_routes()
    {


        register_rest_route(PLUGIN_NAME . '/v1', '/posts/edit/(?P<id>[\d]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'edit_post'],
            'permission' => 'edit_posts',
            'permission_callback' => [$this, 'get_permission']
        ]);

        register_rest_route(PLUGIN_NAME . '/v1', '/token', array(
            'methods' => 'POST',
            'callback' => array($this->auth, 'generate_token'),
            'permission_callback' => [$this, 'get_permission']
        ));

        register_rest_route(PLUGIN_NAME . '/v1', '/token/validate', array(
            'methods' => 'POST',
            'callback' => array($this->auth, 'validate_token'),
            'permission_callback' => [$this, 'get_permission']
        ));

        register_rest_route(PLUGIN_NAME . '/v1', '/front-page', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_front_page'],
            'permission_callback' => [$this, 'get_permission']
        ));

        register_rest_route(PLUGIN_NAME . '/v1', '/components/get', array(
            'methods' => 'POST',
            'callback' => [$this, 'get_component'],
            //'permission' => 'edit_posts',
            'permission_callback' => [$this, 'get_permission']
        ));

        register_rest_route(PLUGIN_NAME . '/v1', '/post-page', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_post_page'],
            'permission_callback' => [$this, 'get_permission']
        ));
    }

    public function get_component($request)
    {
        $contentComponent = ($request->get_param('contentComponent'));
        $depth = (string)($request->get_param('depth'));
        $path = (string)($request->get_param('path'));

        $render = Components::render($contentComponent, $depth, $path, true);

        return rest_ensure_response(compact('register', 'render', 'contentComponent', 'depth', 'path'));
    }


    public function edit_post($request)
    {
        $id = (int)($request->get_param('id'));



        return rest_ensure_response(compact('id'));
    }

    public function get_permission($request)
    {
        $attributes = $request->get_attributes();

        if (empty($attributes['permission'])) {
            return true;
        }
        return current_user_can('edit_posts');
    }

    public function get_front_page($request)
    {
        return $this->get_option_post_page('page_on_front');
    }

    public function get_post_page($request)
    {
        return $this->get_option_post_page('page_for_posts');
    }

    private function get_option_post_page($option)
    {
        // Get the ID of the static frontpage. If not set it's 0
        $pid  = (int) \get_option($option);

        // Get the corresponding post object (let's show our intention explicitly)
        $post = ($pid > 0) ? \get_post($pid) : null;

        // No static frontpage is set
        if (!is_a($post, '\WP_Post'))
            return new \WP_Error(
                'front-page-error',
                \esc_html__(sprintf('No Static Frontpage for %s', $option), PLUGIN_NAME),
                ['status' => 404]
            );


        $request = new \WP_REST_Request('GET', '/wp/v2/pages/' . $pid);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $data = $server->response_to_data($response, false);


        return $data;
    }
}
