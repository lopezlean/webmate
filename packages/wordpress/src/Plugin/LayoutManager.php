<?php

namespace Webmate\Plugin;

require_once 'UrlPattern.php';


class LayoutManager
{
    private $layouts = [];

    function __construct($layouts)
    {
        $this->layouts = $layouts;
        $this->sort_layouts();
    }

    private function sort_layouts()
    {
        usort($this->layouts, function ($a, $b) {
            return $a->weight - $b->weight;
        });
    }

    public function get_layout($internal_url)
    {
        $internal_url = str_replace('http://localhost', '', $internal_url);
        $internal_url = $internal_url ? $internal_url : '/';
        foreach ($this->layouts as $layout) {
            foreach ($layout['display_pattern'] as $pattern) {
                $display_pattern = new UrlPattern($pattern);

                if ($display_pattern->match($internal_url)) {
                    return $layout;
                }
            }
        }
        return null;
    }
}
