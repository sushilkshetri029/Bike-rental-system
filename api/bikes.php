<?php

include dirname(__FILE__) . '/../includes/db.php';

header('Content-Type: application/json; charset=utf-8');

 $result = mysqli_query(db(),
    'SELECT id, name, number_plate, rate_usd, rate_npr, image_url, short_description, is_new, rating, status
     FROM bikes
    WHERE status IN ("available", "maintenance")
     ORDER BY (number_plate IS NULL), id ASC'
);

echo json_encode([
    'success' => true,
    'bikes' => db_fetch_all($result),
], JSON_UNESCAPED_SLASHES);
