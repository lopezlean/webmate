<?php

namespace Webmate\Frontend;

use Webmate\Admin\User;


class Preview
{

    public function isPreviewMode()
    {
        $post_id = 0;
        if (!isset($_GET['webmate-preview'])) {
            return false;
        }

        if (empty($post_id)) {
            $post_id = get_the_ID();
        }

        if (!User::canEditPost($post_id)) {

            return false;
        }

        if ($post_id !== (int) $_GET['webmate-preview']) {

            return false;
        }

        return true;
    }

    public function init()
    {
        if (is_admin() || !$this->isPreviewMode()) {
            return;
        }


        add_filter('the_content', [$this, 'wrapContent'], 999999);
        // Disable the WP admin bar in preview mode.
        add_filter('show_admin_bar', '__return_false');

        add_action('wp_enqueue_scripts', function () {
        });
    }

    public function wrapContent($content)
    {
        $content = '<div class="webmate-preview" id="webmate-data-body-location"></div>';

        return $content;
    }

    public function __construct()
    {
        add_action('template_redirect', [$this, 'init'], 0);
    }
}
