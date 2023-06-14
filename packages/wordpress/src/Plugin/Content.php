<?php

namespace Webmate\Plugin;

/*
Math typescript Content with php
type Content = {
  post_type?: string;
  layout?: ContentLayout | null;
  content: Array<ContentComponent>;
};
type ContentComponent = {
  id: string;
  component: string;
  properties: any;
  children?: Array<ContentComponent>;
};

type ContentLayout = {
  header?: Array<ContentComponent>;
  footer?: Array<ContentComponent>;
};
*/


class ContentComponent
{

  public string $id;
  public string $component;
  public array $properties = [];
  public array $children = [];
}
class ContentLayout
{
}

class Content
{
  public string $post_type = 'post';
  public $layout = '';
  public array $content = [];
  public array $header = [];
  public array $footer = [];
}
