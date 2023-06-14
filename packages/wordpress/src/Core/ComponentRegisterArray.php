<?php

namespace Webmate\Core;

class ComponentRegisterArray extends \ArrayObject
{
    public function offsetSet($index, $newval): void
    {
        if ($newval instanceof ComponentRegister) {
            parent::offsetSet($index, $newval);
            return;
        }
        throw new \InvalidArgumentException('Value must be a ComponentRegister');
    }
}
