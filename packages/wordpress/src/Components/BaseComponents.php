<?php

namespace Webmate\Components;

use Webmate\Core\ComponentRegister;
use Webmate\Core\Components;


class BaseComponents
{
    static public function init()
    {
        Components::register(
            new ComponentRegister(
                'container',
                'Container',
                new Container,
                [
                    [
                        'defaultValue' => 'Default text',
                        'name' => 'title',
                        'title' => 'Title',
                        'type' => 'text'
                    ]
                ],
                // default properties
                [
                    'title' => 'Default title',
                ],
                true

            )
        );

        Components::register(
            new ComponentRegister(
                'button',
                'Button',
                new Button,
                [
                    [
                        'defaultValue' => 'Default text',
                        'name' => 'title',
                        'title' => 'Title',
                        'type' => 'text'
                    ]
                ],
                // default properties
                [
                    'title' => 'Default title',
                ],
                false

            )
        );

        
    }
}
