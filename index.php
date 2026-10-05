<?php

include 'includes/db.php';

$bookingMessage = null;
$bookingError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!is_logged_in()) {
        flash('error', 'Please sign in before hiring a vehicle.');
        redirect('auth.php');
    }

    $name = trim((string) ($_POST['name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $contact = trim((string) ($_POST['contact'] ?? ''));
    $pickupDate = trim((string) ($_POST['pickupDate'] ?? ''));
    $dropDate = trim((string) ($_POST['dropDate'] ?? ''));
    $bikeIdRaw = trim((string) ($_POST['bike_id'] ?? ''));
    $bikeId = $bikeIdRaw !== '' && ctype_digit($bikeIdRaw) ? (int) $bikeIdRaw : null;

    $pickupDateValue = DateTimeImmutable::createFromFormat('!Y-m-d', $pickupDate);
    $dropDateValue = DateTimeImmutable::createFromFormat('!Y-m-d', $dropDate);
    $datesAreValid = $pickupDateValue !== false
        && $dropDateValue !== false
        && $pickupDateValue->format('Y-m-d') === $pickupDate
        && $dropDateValue->format('Y-m-d') === $dropDate;

    if ($name === '' || $email === '' || $contact === '' || $pickupDate === '' || $dropDate === '') {
        $bookingError = 'Please complete every field before confirming your hire.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $bookingError = 'Please enter a valid email address.';
    } elseif (!preg_match('/^(97|98)\d{8}$/', $contact)) {
        $bookingError = 'Phone number must be 10 digits and start with 97 or 98.';
    } elseif (!$datesAreValid) {
        $bookingError = 'Please enter valid pickup and drop dates.';
    } elseif ($dropDateValue < $pickupDateValue) {
        $bookingError = 'Drop date cannot be before the pickup date.';
    } else {
        $connection = db();
        $userId = current_user()['id'] ?? null;
        $stmt = mysqli_prepare($connection,
            'INSERT INTO bookings (user_id, bike_id, customer_name, email, contact, pickup_date, return_date, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, "pending")'
        );
        mysqli_stmt_bind_param($stmt, 'iisssss', $userId, $bikeId, $name, $email, $contact, $pickupDate, $dropDate);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        $bookingMessage = 'Your hire request was submitted successfully.';
    }
}

$html = file_get_contents(__DIR__ . '/html/index.html');

$replacementMap = [
    'href="#" class="nav-right-item link-rd sign-in-link no-wrap"' => 'href="auth.php" class="nav-right-item link-rd sign-in-link no-wrap"',
    'href="#" class="nav-right-item link-rd sign-in-link no-wrap full-width flex-center"' => 'href="auth.php" class="nav-right-item link-rd sign-in-link no-wrap full-width flex-center"',
];

$html = str_replace(array_keys($replacementMap), array_values($replacementMap), $html);

$flashMarkup = '';
if ($bookingMessage !== null) {
    $flashMarkup = '<div class="form-alert success">' . e($bookingMessage) . '</div>';
}
if ($bookingError !== null) {
    $flashMarkup = '<div class="form-alert error">' . e($bookingError) . '</div>';
}

if ($flashMarkup !== '') {
    $html = str_replace('<main class="home">', '<main class="home">' . $flashMarkup, $html);
}

if (is_logged_in()) {
    $user = current_user();
    $authLabel = e($user['first_name'] ?? 'Account');
    $dashboardLink = is_admin() ? '<a href="dashboard.php" class="user-menu-item" role="menuitem">Dashboard</a>' : '';
    $desktopMenu = '
        <div class="user-menu">
            <button type="button" class="nav-right-item link-rd sign-in-link no-wrap user-menu-button" aria-expanded="false">
                ' . $authLabel . ' <i class="fa-solid fa-chevron-down user-menu-caret" aria-hidden="true"></i>
            </button>
            <div class="user-menu-list" role="menu">
                ' . $dashboardLink . '
                <a href="logout.php" class="user-menu-item user-menu-item-danger" role="menuitem">Logout</a>
            </div>
        </div>
    ';
    $html = preg_replace('/<a href="auth\.php" class="nav-right-item link-rd sign-in-link no-wrap">Sign In<\/a>/', $desktopMenu, $html, 1);
}

echo $html;
