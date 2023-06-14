<?php


namespace Webmate\Core;

class ComponentRegister
{
    public string $name;
    public string $displayName;
    public Component $component;
    public array $controls;
    public array $defaultProperties;
    public bool $isContainer;
    public bool $hide;
    public string $group;

    public function __construct(
        string $name,
        string $displayName,
        Component $component,
        array $controls = [],
        array $defaultProperties = [],
        bool $isContainer = false,
        bool $hide = false,
        string $group = ''
    ) {
        // assign properties
        $this->name = $name;
        $this->displayName = $displayName;
        $this->component = $component;
        $this->controls = $controls;
        $this->defaultProperties = $defaultProperties;
        $this->isContainer = $isContainer;
        $this->hide = $hide;
        $this->group = $group;
    }
}
