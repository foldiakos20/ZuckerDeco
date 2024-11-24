<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query
$query ="SELECT `users`.`type`,
								`type`.`name` AS `type_name`,
								`users`.`name`,
								`users`.`born`,
								`users`.`gender`,
								`users`.`address`,
								`users`.`country_code`,
								`users`.`phone`
					 FROM `users`
		 INNER JOIN `type`
						 ON `type`.`id` = `users`.`type` AND
						 		`type`.`type` = 'USER'
					WHERE `users`.`id` = :id AND
								`users`.`valid` = 1
					LIMIT 1;";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not found
if (is_null($result)) {

	// Set error
	Util::setError("A felhasználó nem létezik!");
}

// Simplifies result
$result = $result[0];

// Set response
Util::setResponse($result);