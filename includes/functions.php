<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function redirect($path)
{
    header('Location: ' . $path);
    exit;
}

function flash($key, $message = null)
{
    if ($message !== null) {
        $_SESSION['flash'][$key] = $message;
        return null;
    }

    $value = $_SESSION['flash'][$key] ?? null;
    unset($_SESSION['flash'][$key]);

    return is_string($value) ? $value : null;
}

function current_user()
{
    return isset($_SESSION['user']) && is_array($_SESSION['user']) ? $_SESSION['user'] : null;
}

function is_logged_in()
{
    return current_user() !== null;
}

function is_admin()
{
    $user = current_user();

    return $user !== null && ($user['role'] ?? '') === 'admin';
}

function require_login()
{
    if (!is_logged_in()) {
        flash('error', 'Please sign in to continue.');
        redirect('auth.php');
    }
}

function require_admin()
{
    if (!is_admin()) {
        flash('error', 'Admin access required.');
        redirect('auth.php');
    }
}

function csrf_token()
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(16));
    }

    return $_SESSION['csrf_token'];
}

function verify_csrf($token)
{
    return isset($_SESSION['csrf_token']) && is_string($token) && hash_equals($_SESSION['csrf_token'], $token);
}

function format_date($date)
{
    $timestamp = strtotime($date);

    return $timestamp ? date('M j, Y', $timestamp) : $date;
}
