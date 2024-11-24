<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Get gallery images
$result = glob("./img/{$args['type']}/*.{jpg,jpeg,png,gif,tiff,webp}", GLOB_BRACE);

// Check images, when is not empty, then randomize
if (is_array($result) && !empty($result)) shuffle($result);

// Set response
Util::setResponse($result); 