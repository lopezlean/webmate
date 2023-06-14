<?php

namespace Webmate\Plugin;

class Layout
{



	public function init()
	{
		register_post_type(
			'webmate_layout',
			array(
				'labels'      => array(
					'name'          => __('Layouts', PLUGIN_NAME),
					'singular_name' => __('Layout',  PLUGIN_NAME),
				),
				'public'      => true,
				'show_in_rest' => true,
				'has_archive' => false,
				'rest_base' => 'layouts'
			)
		);
	}
}
