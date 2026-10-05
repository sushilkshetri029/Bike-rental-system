<?php

include 'functions.php';

function db()
{
    static $connection = null;

    if ($connection) {
        return $connection;
    }

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $username = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: '';
    $database = getenv('DB_NAME') ?: 'vehicle_rs';

    mysqli_report(MYSQLI_REPORT_OFF);

    $server = mysqli_connect($host, $username, $password);
    if (!$server) {
        die('MySQL is not running or is not configured. Start the MySQL service in XAMPP/WAMP, then refresh the page.');
    }
    mysqli_set_charset($server, 'utf8mb4');

    mysqli_query($server, sprintf(
        'CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
        str_replace('`', '``', $database),
    ));
    mysqli_close($server);

    $connection = mysqli_connect($host, $username, $password, $database);
    if (!$connection) {
        die('Unable to connect to the rental database.');
    }
    mysqli_set_charset($connection, 'utf8mb4');

    mysqli_query($connection,
        'CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(80) NOT NULL,
            last_name VARCHAR(80) NOT NULL,
            email VARCHAR(190) NOT NULL UNIQUE,
            phone VARCHAR(30) DEFAULT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM("admin", "customer") NOT NULL DEFAULT "customer",
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    mysqli_query($connection,
        'CREATE TABLE IF NOT EXISTS bikes (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            number_plate VARCHAR(30) DEFAULT NULL,
            rate_usd DECIMAL(10,2) NOT NULL DEFAULT 0,
            rate_npr DECIMAL(10,2) NOT NULL DEFAULT 0,
            image_url VARCHAR(255) NOT NULL,
            short_description VARCHAR(255) DEFAULT NULL,
            is_new TINYINT(1) NOT NULL DEFAULT 0,
            rating TINYINT UNSIGNED NOT NULL DEFAULT 100,
            status ENUM("available", "maintenance", "hidden") NOT NULL DEFAULT "available",
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $numberPlateColumnResult = mysqli_query($connection, "SHOW COLUMNS FROM bikes LIKE 'number_plate'");
    if ($numberPlateColumnResult && mysqli_num_rows($numberPlateColumnResult) === 0) {
        mysqli_query($connection, 'ALTER TABLE bikes ADD COLUMN number_plate VARCHAR(30) DEFAULT NULL AFTER name');
    }

    mysqli_query($connection,
        'CREATE TABLE IF NOT EXISTS bookings (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED DEFAULT NULL,
            bike_id INT UNSIGNED DEFAULT NULL,
            customer_name VARCHAR(120) NOT NULL,
            email VARCHAR(190) NOT NULL,
            contact VARCHAR(40) NOT NULL,
            pickup_date DATE NOT NULL,
            return_date DATE DEFAULT NULL,
            notes TEXT DEFAULT NULL,
            status ENUM("pending", "confirmed", "completed", "cancelled") NOT NULL DEFAULT "pending",
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
            CONSTRAINT fk_bookings_bike FOREIGN KEY (bike_id) REFERENCES bikes(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $returnDateColumnResult = mysqli_query($connection, "SHOW COLUMNS FROM bookings LIKE 'return_date'");
    if ($returnDateColumnResult && mysqli_num_rows($returnDateColumnResult) === 0) {
        mysqli_query($connection, 'ALTER TABLE bookings ADD COLUMN return_date DATE DEFAULT NULL AFTER pickup_date');
    }

    $bikeCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS bike_count FROM bikes');
    $bikeCountRow = mysqli_fetch_assoc($bikeCountResult);
    $bikeCount = (int) ($bikeCountRow['bike_count'] ?? 0);
    if ($bikeCount === 0) {
        $seedBikes = [
            ['Bajaj Pulsar 150', 50, 6000, '/png/bajaj-pulsar-150.png', 'Comfortable city and highway ride.', 1, 90],
            ['Bajaj Pulsar 220', 40, 4800, '/png/bajaj-pulsar-220.png', 'Balanced power and daily ride comfort.', 1, 100],
            ['Yamaha FZS V2', 30, 3600, '/png/yamaha-fzs-v2.png', 'Lightweight, efficient, and dependable.', 0, 100],
        ];

        $stmt = mysqli_prepare($connection,
            'INSERT INTO bikes (name, rate_usd, rate_npr, image_url, short_description, is_new, rating, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, "available")'
        );

        foreach ($seedBikes as $bike) {
            [$name, $rateUsd, $rateNpr, $imageUrl, $description, $isNew, $rating] = $bike;
            mysqli_stmt_bind_param($stmt, 'sddssii', $name, $rateUsd, $rateNpr, $imageUrl, $description, $isNew, $rating);
            mysqli_stmt_execute($stmt);
        }
        mysqli_stmt_close($stmt);
    }

    return $connection;
}

function db_fetch_all($result)
{
    $rows = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    return $rows;
}
