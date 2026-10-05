<?php

include dirname(__FILE__) . '/../includes/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$user = current_user();

echo json_encode([
    'logged_in' => $user !== null,
    'is_admin' => $user !== null && ($user['role'] ?? '') === 'admin',
    'user' => $user === null ? null : [
        'id' => (int) ($user['id'] ?? 0),
        'first_name' => (string) ($user['first_name'] ?? ''),
        'last_name' => (string) ($user['last_name'] ?? ''),
        'email' => (string) ($user['email'] ?? ''),
        'role' => (string) ($user['role'] ?? ''),
    ],
], JSON_UNESCAPED_SLASHES);
