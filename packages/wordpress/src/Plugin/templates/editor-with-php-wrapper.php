<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Editor</title>
    <?php wp_head(); ?>
    <style>
        html,
        body

        /*,
        iframe*/
            {
            width: 100%;
            height: 100%;
            border: 0;
            margin: 0;
            padding: 0;
        }

        .screen-reader-text {
            position: absolute;
            top: -10000em;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }
    </style>

    <?php wp_head(); ?>
</head>


<body>


    <webmate-container>Test</webmate-container>
    <div id="app" />





</body>
<?php




wp_footer();
/** This action is Contented in wp-admin/admin-footer.php */
do_action('admin_print_footer_scripts');
?>



</html>
