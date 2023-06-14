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
        body,
        iframe {
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
    <script>
        function init() {

            const editorFrame = Content.getElementById("iframe-editor");
            /*
            editorFrame.contentWindow.postMessage({
                type: 'api_credentials',
                content: appLocalizer,
            }, '*');
            */

            window.addEventListener("message", (event) => {
                if (event.data &&
                    event.data.type == "open_media_manager") {

                    const frame = wp.media({
                        type: 'image',
                        button: {
                            text: 'Insert'
                        },
                        multiple: false,
                    }).on('select', function() {
                        var attachment = frame.state().get('selection').first().toJSON();

                        editorFrame.contentWindow.postMessage({
                            control_id: event.data.control_id,
                            type: 'set_media_control_value',
                            value: attachment.url,
                        }, '*');
                    });

                    frame.open();
                }
            });

        }
    </script>
    <?php wp_head(); ?>
</head>

<body>
    <?php

    $permalink = ltrim(str_replace(home_url(), '', get_permalink($_GET['post'])), '/');



    ?>
    <iframe src="<?= defined('WEBMATE_URL') ?  constant('WEBMATE_URL') : 'http://localhost:3000' ?>/<?= $permalink ?>?webmate.token=<?= $this->token['token'] ?>&webmate.editing=1" id="iframe-editor" onload="init()" allow="clipboard-read; clipboard-write"></iframe>
</body>
<?php




wp_footer();
/** This action is Contented in wp-admin/admin-footer.php */
do_action('admin_print_footer_scripts');
?>



</html>
