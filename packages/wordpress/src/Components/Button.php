<?php

namespace Webmate\Components;


use Webmate\Core\Component;


use function Webmate\Css\styled;





class Button implements Component
{

    public function getStyles($props)
    {
        $fontSize = $props['title'] === "1" ? "16px" : "20px";
        return styled('button', "
                background-color: red;
                color: white;
                padding: 10px;
                border-radius: 5px;
                border: none;
                font-size: {$fontSize};
                font-weight: bold;
                cursor: pointer;
                li{
                    list-style: none;
                }
        ");
    }
    public function render($props)
    {


        $styles = ($this->getStyles($props));
        return
            <<<HTML
                <style>{$styles}</style>
                <button class="{$styles->getSelector()}">{$props['title']}</button>
            HTML;
    }
}
