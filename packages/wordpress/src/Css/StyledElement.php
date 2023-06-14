<?php

namespace Webmate\Css;

use ScssPhp\ScssPhp\Compiler;


class StyledElement
{

  protected $styles;
  protected $compiledStyles;
  protected $selector;
  static $compiler = null;



  public function __construct(string $styles, string $selector)
  {

    $this->styles = ".$selector{ $styles }";
    $this->selector = $selector;


    if (!static::$compiler) {
      static::$compiler = new Compiler();
    }
  }

  public function render()
  {
    $this->compiledStyles = static::$compiler->compileString($this->styles)->getCss();

    return $this->compiledStyles;
  }

  public function __toString()
  {
    return $this->render();
  }

  public function getSelector()
  {
    return $this->selector;
  }
}
