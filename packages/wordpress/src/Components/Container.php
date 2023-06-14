<?php

namespace Webmate\Components;


use Webmate\Core\Component;

class Container implements Component
{

    public function render($props)
    {
        $depth = !empty($props['depth']) ? absint($props['depth']) + 1 : 1;
        return
            <<<HTML
                <webmate-container class="container">
                    <h{$depth}>{$props['title']}</h{$depth}>
                    <small>{$props['path']}</small>
                    <div class="here-is-the-children">{$props['children']}</div>
                    <pre>

                    </pre>
                    
                </webmate-container>
            HTML;
    }
}
