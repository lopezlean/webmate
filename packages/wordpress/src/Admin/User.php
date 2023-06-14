<?php

namespace Webmate\Admin;

class User
{

    static public function canEditPost($post_id)
    {
        if (!current_user_can('edit_post', $post_id)) {
            return false;
        }

        return true;
    }
}
