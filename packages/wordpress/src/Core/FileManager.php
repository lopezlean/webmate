<?php

namespace Webmate\Core;

use Webmate\Core\File\File;

class FileManager
{
    private $files = [];

    public function add(File $file)
    {
        // create an id
        $id = $file->getName();

        $this->files[] = $file;
    }

    public function get(string $name): ?File
    {
        foreach ($this->files as $file) {
            if ($file->getName() === $name) {
                return $file;
            }
        }

        return null;
    }

    public function getFiles(): array
    {
        return $this->files;
    }
}
