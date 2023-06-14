<?php

namespace Webmate\Core;

class Page
{
    private $content;
    private $post;
    public function __construct()
    {
        add_action('template_redirect', [$this, 'init']);
    }

    public function init()
    {
        // get current post or page
        $this->post = get_post();
        if (!$this->post) {
            return;
        }
        // get post content from _webmate_data meta
        $this->content = get_post_meta($this->post->ID, '_webmate_data', true);

        // mockup content
        $this->content = [
            "id" => "1",
            "title" => "Article",
            "data" => [
                "body" => [
                    [
                        "id" => "container",
                        "component" => "container",
                        "properties" => [
                            "title" => "Container title",
                            "children" => [
                                [
                                    "id" => "container2",
                                    "component" => "container",
                                    "properties" => [
                                        "title" => "Button title container",
                                        "children" => [
                                            [
                                                "id" => "button",
                                                "component" => "button",
                                                "properties" => [
                                                    "title" => "Button title"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }

    public function build()
    {
        if (!$this->content) {
            return;
        }
        $html = '';
        $depth = 0;
        $path = 'content.data.body';
        foreach ($this->content['data']['body'] as $contentComponent) {

            $html .= Components::render($contentComponent, $depth, $path);
        }
        return $html;
    }
}
