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

// Set current datetime
$args['date'] = date('Y-m-d H:i:s');

// Merge arguments with default
$args = Util::objMerge(array(
  "name" => null,
  "email" => null, 
  "message" => null,
  "date" => null
), $args, true);

// Set query
$query = "INSERT INTO `offers` 
          (`name`, `email`, `message`, `date`) VALUES";

// Execute query with arguments
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Az üzenetet nem sikerült regisztrálni!');
}

// Set response
Util::setResponse(
  "Az üzenetet sikeressen regisztráltuk.\nHamarossan felvesszük Önnel a kapcsolatot!");
?>