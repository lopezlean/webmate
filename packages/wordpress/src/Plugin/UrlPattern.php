<?php

namespace Webmate\Plugin;

class UrlPattern
{
    protected const PATTERN_IS_WILDCARD      = 1;
    protected const PATTERN_CHECKS_BEGINNING = 2;
    protected const PATTERN_CHECKS_ENDING    = 4;

    protected int $type;
    protected string $pattern;

    public function __construct(string $pattern)
    {
        $this->type    = $this->getPatternType($pattern);
        $this->pattern = $this->getTrimmedPattern($pattern);
    }

    protected function getPatternType(string $pattern): int
    {
        $flags = 0;

        if (str_starts_with($pattern, '^')) {
            $flags |= static::PATTERN_CHECKS_BEGINNING;
        }

        if (str_ends_with($pattern, '$')) {
            $flags |= static::PATTERN_CHECKS_ENDING;
        }

        if (str_contains($pattern, '?') || str_contains($pattern, '*')) {
            $flags |= static::PATTERN_IS_WILDCARD;
        }

        return $flags;
    }

    protected function getTrimmedPattern(string $pattern): string
    {
        if ($pattern === '/') {
            return $pattern;
        }

        if (str_starts_with($pattern, '^')) {
            $pattern = substr($pattern, 1);
        }

        if (str_ends_with($pattern, '$')) {
            $pattern = substr($pattern, 0, -1);
        }

        return trim($pattern, "/ \t\n\r\0\x0B");
    }

    public function match(?string $url): bool
    {
        $url = ($url !== null && $url !== '/') ? trim($url, '/') : $url;

        if (empty($url)) {
            return false;
        }

        if ($url === $this->pattern) {
            return true;
        }

        $state = [];
        if ($this->type & static::PATTERN_IS_WILDCARD) {
            $state[] = fnmatch($this->pattern, $url);
        }

        if ($this->type & static::PATTERN_CHECKS_BEGINNING) {
            $state[] = str_starts_with($url, $this->pattern);
        }

        if ($this->type & static::PATTERN_CHECKS_ENDING) {
            $state[] = str_ends_with($url, $this->pattern);
        }

        return array_reduce($state, fn ($_, $value) => is_null($_) ? $value : $_ && $value, null) ?: false;
    }
}
