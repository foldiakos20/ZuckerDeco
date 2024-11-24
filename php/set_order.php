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
$query ="SELECT CAST( SUM(`quantity` * `price`) as UNSIGNED) AS `total`
					 FROM `shopping_cart`
					WHERE `user_id` = ?;";

// Execute query
$total = $db->execute($query, array($args["order"]["user_id"]));

// Check/Set total
if (is_null($total) || 
	 ($total = $total[0]["total"]) !== $args["order"]["total"]) {

	// Set error
	Util::setError('A kosár tartalma megváltozott!', $db);
}

// Get date now
$dateNow = date("Y-m-d H:i:s");

// Set query
$query ="INSERT INTO `orders` 
										(`user_id`, `card_number`, `expiration`, `cvv`, `date`, `total`) 
							VALUES";

// Execute query
$order = $db->execute($query, array(
	$args["order"]["user_id"], 
	$args["order"]["card_number"],
	$args["order"]["expiration"], 
	$args["order"]["cvv"], 
	$dateNow,
	$total
));

// Check not success
if (!$order['affectedRows']) {

	// Set error
	Util::setError('A rendelést nem sikerült felvenni!');
}

$query = "INSERT INTO `orders_item` 
					(`order_id`, `product_id`, `quantity`, `price`) 
					VALUES";

// Set parameters
$params = array();
foreach($args["items"] as $item) {
	$params = array_merge($params, array(
		$order["lastInsertId"],
		$item["product_id"],
		$item["quantity"],
		$item["price"]
	));
}

// Execute query
$orderItems = $db->execute($query, $params);

// Check not success
if (!$orderItems['affectedRows']) {

	// Set error
	Util::setError('A rendelés sorait nem sikerült felvenni!');
}

// Set query
$query ="DELETE FROM `shopping_cart`
							 WHERE `user_id` = ?;";

// Execute query
$result = $db->execute($query, array($args["order"]["user_id"]));

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('A kosarat nem sikerült kiüríteni!');
}

// Set response
Util::setResponse("Köszönjük a rendelését!");