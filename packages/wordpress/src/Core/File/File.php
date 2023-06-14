<?php

namespace Webmate\Core\File;

class File
{
    const DEFAULT_DIRECTORY = 'css' . DIRECTORY_SEPARATOR;
    const UPLOAD_DIRECTORY = PLUGIN_NAME;
    private string $directory = self::DEFAULT_DIRECTORY;
    private string $name;
    private string $path;

    static private $wordpressUploadsDirectory = [];

    public function _construct(string $filename)
    {
        $this->name = $filename;
        $this->buildPath();
    }

    public static function getUploadDirectory(): string
    {
        $directory = self::getWordpressUploadsDirectory();

        return $directory['basedir'] . '/' . self::UPLOAD_DIRECTORY;
    }

    public function setDirectory(string $directory)
    {
        // if directory doesn't end with a slash, add it
        if (substr($directory, -1) !== DIRECTORY_SEPARATOR) {
            $directory .= DIRECTORY_SEPARATOR;
        }
        $this->directory = $directory;
    }
    public function getDirectory(): string
    {
        return $this->directory;
    }


    private static function getWordpressUploadsDirectory(): string
    {
        global $blog_id;
        if (empty(self::$wordpressUploadsDirectory[$blog_id])) {
            self::$wordpressUploadsDirectory[$blog_id] = wp_upload_dir(null, false);
        }

        return self::$wordpressUploadsDirectory[$blog_id];
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPath()
    {
        return set_url_scheme(self::getUploadDirectory() . $this->directory . $this->name);
    }

    private function buildPath()
    {
        $path = self::getUploadDirectory() . $this->directory;

        if (!is_dir($path)) {
            wp_mkdir_p($path);
        }

        $this->path = $path . $this->name;
    }
}
