<?php

namespace Webmate\Css;

function styled($tag, $styles)
{
    // create unique selector
    $selector = "styled-$tag-" . md5($styles);
    return new class($styles, $selector) extends StyledElement
    {
    };
}
