<?php

namespace Webmate\Core;


class ComponentRegisterControl
{
    public string $name;
    public string $title;
    public string $type;
    public $defaultValue;
    public $properties;
    public bool $responsive;
    public $getValue;
    public $setValue;
    public $conditions;


    public function __construct(
        string $name,
        string $title,
        string $type,
        $defaultValue = null,
        $properties = null,
        bool $responsive = false,
        $getValue = null,
        $setValue = null,
        $conditions = null
    ) {
        // assign properties
        $this->name = $name;
        $this->title = $title;
        $this->type = $type;
        $this->defaultValue = $defaultValue;
        $this->properties = $properties;
        $this->responsive = $responsive;
        $this->getValue = $getValue;
        $this->setValue = $setValue;
        $this->conditions = $conditions;
    }
}
