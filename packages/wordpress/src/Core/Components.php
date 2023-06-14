<?php

namespace Webmate\Core;

use Webmate\Components\BaseComponents;

class Components
{
    private static ComponentRegisterArray $componentsMap;
    private static $initialized = false;

    static public function init()
    {
        if (static::$initialized) {
            return;
        }

        static::privateInit();
    }

    static private  function privateInit()
    {
        if (!isset(static::$componentsMap)) {
            static::$componentsMap = new ComponentRegisterArray();
        }

        // if componentsMap are empty init base components
        if (count(static::$componentsMap) === 0) {
            BaseComponents::init();
        }
    }

    static public function register(ComponentRegister $register)
    {

        static::$componentsMap[$register->name] = $register;
    }

    static public function get(string $name)
    {

        if (!isset(static::$componentsMap[$name])) {
            return null;
        }
        return static::$componentsMap[$name];
    }


    static public function render(array $contentComponent, string $depth, string $path, $isEditorMode = false): string
    {
        $component = static::get($contentComponent['component']);

        if ($component) {
            $_wrapper = new ComponentWrapper;
            $defaultProps = [
                'depth' => $depth,
                'path' => $path,
            ];

            // check if is preview iframe mode, if it is, children will be rendered by react so we don't need to render it here
            if ($isEditorMode) {
                $child_data = json_encode($contentComponent['properties']['children']);
                $contentComponent['properties']['children'] = <<<HTML
                    <div data-webmate-children='$child_data'></div>
                HTML;
            } else {
                // render childrens
                if (!empty($contentComponent['properties']['children'])) {
                    if (!is_array($contentComponent['properties']['children'])) {
                        $contentComponent['properties']['children'] = [$contentComponent['properties']['children']];
                    }
                    $renderedChildrens = "";
                    foreach ($contentComponent['properties']['children'] as $key => $child) {
                        $renderedChildrens = Components::render($child, $depth + 1, "$path.properties.children.$key");
                    }
                    $contentComponent['properties']['children'] = $renderedChildrens;
                }
            }
            $children = $component->component->render(array_merge($defaultProps, compact('_wrapper'), $contentComponent['properties']));
            return $_wrapper->render(array_merge($defaultProps,  $contentComponent['properties'], compact('children')));
        }

        return 'Failed to render component';
    }

    static public function toJSON()
    {

        return json_encode(static::$componentsMap);
    }

    static public function toJavascript()
    {
        $id = (int)$_GET['post'];
        $permalink = get_the_permalink($id);

        $json = static::toJSON();
        return <<<JS
            const components = JSON.parse('$json');
            //const componentsMap = new Map();
            for (const key in components) {
                components[key].component = Webmate.BaseComponents.Wordpress;
            }
            
            Webmate.Components.registerComponents(components);
            Webmate.Components.setRootLayout(Webmate.BaseComponents.AsyncHtmlRootLayout,{
                endpoint: '$permalink?webmate-preview=$id', 
            });
            
        JS;
    }
}
