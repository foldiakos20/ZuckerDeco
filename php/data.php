<?php

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

$content = file_get_contents('./data/types.json');
$types = Util::jsonDecode($content);

$content = file_get_contents('./data/data.json');
$data = Util::jsonDecode($content);

function getIndexOfKeyValue($arr, $key, $value) {
	if (is_array($arr)) {
		foreach($arr as $i => $item) {
			if (is_array($item) && 
					isset($item[$key]) && 
					$item[$key] === $value) {
				return $i;
			}
		}
	}
	return -1;
}

foreach($data as $i => $item) {
	$item['id'] = $i;
	$ind = getIndexOfKeyValue($types, 'id', $item['type']);
	if ($ind !== -1) {
		$item['typeName'] = $types[$ind]['name'];
	}
	$data[$i] = Util::ObjMerge(array(
		"id"				=> null,
		"name"			=> null,
		"img"				=> null,
		"type"			=> null,
		"typeName"	=> null,
		"price"			=> null
	), $item, true);
}

$content = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('./data/data_new.json', $content);
echo $content;