<?php

namespace Webmate\Frontend;

use Webmate\Core\Page;



class Frontend
{

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */

    private $removedContentFilters = [];

    private $page =  null;

    public function __construct()
    {
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function init()
    {

        if (is_admin() && !wp_doing_ajax()) {
            return;
        }

        $this->page = new Page;

        do_action('webmate/frontend/init');
        add_filter('webmate/editor/enqueue_scripts', [$this, 'enqueueScripts']);

        add_filter('the_content', [$this, 'filterContent'], 9);
    }

    private function removeWordpressFilters()
    {
        $filters = [
            'wpautop',
            'shortcode_unautop',
            'wptexturize',
        ];

        foreach ($filters as $filter) {
            // Check if another plugin/theme do not already removed the filter.
            if (has_filter('the_content', $filter)) {
                remove_filter('the_content', $filter);
                $this->removedContentFilters[] = $filter;
            }
        }
    }

    private function restoreWordpressFilters()
    {
        foreach ($this->removedContentFilters as $filter) {
            add_filter('the_content', $filter);
        }
        $this->removedContentFilters = [];
    }

    public function filterContent($content)
    {
        return $this->page->build();
    }

    public function enqueueScripts()
    {
    }
}
