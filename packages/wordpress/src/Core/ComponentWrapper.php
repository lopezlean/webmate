<?php
// binding class for component-wrapper.tsx

namespace Webmate\Core;


class ComponentWrapper implements Component
{
    //constructor
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'my_custom_styles']);
    }

    function my_custom_styles()
    {

        // Define your custom styles as an array of CSS rules
        $custom_styles = array(
            'div { background-color: #f7f7f7; }',
            'div { max-width: 100%; }',
            'div{ font-size: 20px; }',
        );

        // Convert the array of styles into a single string
        $custom_styles_string = implode("\n", $custom_styles);

        // Add the dynamic styles to the page header using wp_add_inline_style()
        wp_add_inline_style('my-theme-style', $custom_styles_string);
    }
    public function render($props)
    {
        $props['className'] = empty($props['className']) ? 'webmate-component-wrapper' : $props['className'];
        return <<<HTML
        <div class="{$props['className']}">
            {$props['children']}
        </div>
        HTML;
    }
}
