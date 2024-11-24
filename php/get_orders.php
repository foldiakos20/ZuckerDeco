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
$query ="SELECT `id`, 
								`card_number`, 
								`expiration`, 
								`cvv`, 
								DATE(`date`) AS `date`,
								`total` 
					 FROM `orders` 
					WHERE `user_id` = :user_id
			 ORDER BY `id`;";

// Execute query
$result = $db->execute($query, $args);

// Check result
if (!is_null($result)) {

	// Each orders
	foreach($result as $i => $item) {

		// Set query
		$query ="SELECT `orders_item`.`id`, 
										`orders_item`.`order_id`, 
										`orders_item`.`product_id`,
										`products`.`name`,
										`products`.`product_type` AS `type`,
										`products_type`.`name` AS `type_name`,
										`products`.`img`, 
										`orders_item`.`price`,
										`orders_item`.`quantity`, 
										`orders_item`.`price` * `orders_item`.`quantity` AS `total` 
							 FROM `orders_item`
				 INNER JOIN `products`
						 		 ON `products`.`id` = `orders_item`.`product_id`
		 		 INNER JOIN `products_type`
						 		 ON `products_type`.`type` = `products`.`product_type` 
							WHERE `orders_item`.`order_id` = ?
					 ORDER BY `orders_item`.`id`;";

		// Execute query
		$result[$i]["items"] = $db->execute($query, array($item["id"]));
	}
}

// Close connection
$db = null;

// Set response
Util::setResponse($result);