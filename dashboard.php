<?php

include 'includes/db.php';

require_admin();

$connection = db();

function dashboard_bike_image_url(array $bike): string
{
    $imageUrl = trim((string) ($bike['image_url'] ?? ''));
    $imagePath = ltrim($imageUrl, '/');

    if ($imagePath !== '' && is_file(__DIR__ . '/' . $imagePath)) {
        return $imagePath;
    }

    if ($imagePath !== '' && is_file(__DIR__ . '/public/' . $imagePath)) {
        return 'public/' . $imagePath;
    }

    $bikeName = strtolower(trim((string) ($bike['name'] ?? '')));
    if (strpos($bikeName, 'pulsar 220') !== false && is_file(__DIR__ . '/public/png/bajaj-pulsar-220.png')) {
        return 'public/png/bajaj-pulsar-220.png';
    }

    if (strpos($bikeName, 'hunter') !== false && is_file(__DIR__ . '/public/png/bajaj-pulsar-150.png')) {
        return 'public/png/bajaj-pulsar-150.png';
    }

    return 'public/png/yamaha-fzs-v2.png';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf((string) ($_POST['csrf_token'] ?? null))) {
        flash('error', 'Security check failed. Please try again.');
        redirect('dashboard.php');
    }

    $action = trim((string) ($_POST['dashboard_action'] ?? ''));

    if ($action === 'save_bike') {
            $bikeId = (int) ($_POST['bike_id'] ?? 0);
            $name = trim((string) ($_POST['name'] ?? ''));
            $numberPlate = trim((string) ($_POST['number_plate'] ?? ''));
            $rateUsd = (float) ($_POST['rate_usd'] ?? 0);
            $rateNpr = (float) ($_POST['rate_npr'] ?? 0);
            $imageUrl = '';
            if ($bikeId > 0) {
                $currentImageStmt = mysqli_prepare($connection, 'SELECT image_url FROM bikes WHERE id = ? LIMIT 1');
                mysqli_stmt_bind_param($currentImageStmt, 'i', $bikeId);
                mysqli_stmt_execute($currentImageStmt);
                $currentImage = mysqli_fetch_assoc(mysqli_stmt_get_result($currentImageStmt));
                $imageUrl = (string) ($currentImage['image_url'] ?? '');
                mysqli_stmt_close($currentImageStmt);
            }
            $shortDescription = trim((string) ($_POST['short_description'] ?? ''));
            $rating = max(0, min(100, (int) ($_POST['rating'] ?? 100)));
            $isNew = isset($_POST['is_new']) ? 1 : 0;
            $status = in_array(($_POST['status'] ?? 'available'), ['available', 'maintenance', 'hidden'], true) ? (string) $_POST['status'] : 'available';

            $imageUpload = $_FILES['image'] ?? null;
            if ($imageUpload && $imageUpload['error'] !== UPLOAD_ERR_NO_FILE) {
                if ($imageUpload['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($imageUpload['tmp_name'])) {
                    flash('error', 'The bike image could not be uploaded.');
                    redirect('dashboard.php' . ($bikeId > 0 ? '?edit_bike=' . $bikeId : ''));
                }

                $imageInfo = getimagesize($imageUpload['tmp_name']);
                $allowedMimeTypes = [
                    'image/jpeg' => 'jpg',
                    'image/png' => 'png',
                    'image/webp' => 'webp',
                ];
                $extension = $imageInfo !== false ? ($allowedMimeTypes[$imageInfo['mime'] ?? ''] ?? null) : null;
                if ($extension === null || $imageUpload['size'] > 5 * 1024 * 1024) {
                    flash('error', 'Please upload a JPG, PNG, or WebP image smaller than 5 MB.');
                    redirect('dashboard.php' . ($bikeId > 0 ? '?edit_bike=' . $bikeId : ''));
                }

                $uploadDirectory = __DIR__ . '/public/uploads';
                if (!is_dir($uploadDirectory) && !mkdir($uploadDirectory, 0755, true)) {
                    flash('error', 'The image upload folder could not be created.');
                    redirect('dashboard.php' . ($bikeId > 0 ? '?edit_bike=' . $bikeId : ''));
                }

                $filename = bin2hex(random_bytes(16)) . '.' . $extension;
                if (!move_uploaded_file($imageUpload['tmp_name'], $uploadDirectory . '/' . $filename)) {
                    flash('error', 'The bike image could not be saved.');
                    redirect('dashboard.php' . ($bikeId > 0 ? '?edit_bike=' . $bikeId : ''));
                }
                $imageUrl = 'public/uploads/' . $filename;
            }

            if ($name === '' || $imageUrl === '') {
                flash('error', 'Bike name and image are required.');
                redirect('dashboard.php' . ($bikeId > 0 ? '?edit_bike=' . $bikeId : ''));
            }

            if ($bikeId > 0) {
                $stmt = mysqli_prepare($connection,
                    'UPDATE bikes
                   SET name = ?, number_plate = ?, rate_usd = ?, rate_npr = ?, image_url = ?,
                     short_description = ?, is_new = ?, rating = ?, status = ?
                   WHERE id = ?'
                );
                $shortDescriptionValue = $shortDescription !== '' ? $shortDescription : null;
                $numberPlateValue = $numberPlate !== '' ? $numberPlate : null;
                mysqli_stmt_bind_param($stmt, 'ssddssiisi', $name, $numberPlateValue, $rateUsd, $rateNpr, $imageUrl, $shortDescriptionValue, $isNew, $rating, $status, $bikeId);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);
                flash('success', 'Bike updated successfully.');
            } else {
                $stmt = mysqli_prepare($connection,
                    'INSERT INTO bikes (name, number_plate, rate_usd, rate_npr, image_url, short_description, is_new, rating, status)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
                );
                $shortDescriptionValue = $shortDescription !== '' ? $shortDescription : null;
                $numberPlateValue = $numberPlate !== '' ? $numberPlate : null;
                mysqli_stmt_bind_param($stmt, 'ssddssiis', $name, $numberPlateValue, $rateUsd, $rateNpr, $imageUrl, $shortDescriptionValue, $isNew, $rating, $status);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);
                flash('success', 'Bike added successfully.');
            }

            redirect('dashboard.php');
        }

        if ($action === 'delete_bike') {
            $bikeId = (int) ($_POST['bike_id'] ?? 0);
            $stmt = mysqli_prepare($connection, 'DELETE FROM bikes WHERE id = ?');
            mysqli_stmt_bind_param($stmt, 'i', $bikeId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            flash('success', 'Bike removed successfully.');
            redirect('dashboard.php');
        }

        if ($action === 'update_booking_status') {
            $bookingId = (int) ($_POST['booking_id'] ?? 0);
            $status = in_array(($_POST['status'] ?? 'pending'), ['pending', 'confirmed', 'completed', 'cancelled'], true) ? (string) $_POST['status'] : 'pending';
            $stmt = mysqli_prepare($connection, 'UPDATE bookings SET status = ? WHERE id = ?');
            mysqli_stmt_bind_param($stmt, 'si', $status, $bookingId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            flash('success', 'Booking status updated.');
            redirect('dashboard.php');
        }

        if ($action === 'delete_booking') {
            $bookingId = (int) ($_POST['booking_id'] ?? 0);
            $stmt = mysqli_prepare($connection, 'DELETE FROM bookings WHERE id = ?');
            mysqli_stmt_bind_param($stmt, 'i', $bookingId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            flash('success', 'Booking deleted successfully.');
            redirect('dashboard.php');
        }

        if ($action === 'update_user_role') {
            $userId = (int) ($_POST['user_id'] ?? 0);
            $role = in_array(($_POST['role'] ?? 'customer'), ['admin', 'customer'], true) ? (string) $_POST['role'] : 'customer';
            $stmt = mysqli_prepare($connection, 'UPDATE users SET role = ? WHERE id = ?');
            mysqli_stmt_bind_param($stmt, 'si', $role, $userId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            flash('success', 'User role updated.');
            redirect('dashboard.php');
        }

        if ($action === 'delete_user') {
            $userId = (int) ($_POST['user_id'] ?? 0);
            $stmt = mysqli_prepare($connection, 'DELETE FROM users WHERE id = ?');
            mysqli_stmt_bind_param($stmt, 'i', $userId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            flash('success', 'User deleted successfully.');
            redirect('dashboard.php');
    }
}

$editBikeId = (int) ($_GET['edit_bike'] ?? 0);
$editBike = null;
if ($editBikeId > 0) {
    $stmt = mysqli_prepare($connection, 'SELECT * FROM bikes WHERE id = ? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 'i', $editBikeId);
    mysqli_stmt_execute($stmt);
    $editBike = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt)) ?: null;
    mysqli_stmt_close($stmt);
}

  $usersCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM users');
  $usersCountRow = mysqli_fetch_assoc($usersCountResult);
  $bikesCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bikes');
  $bikesCountRow = mysqli_fetch_assoc($bikesCountResult);
  $bookingsCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bookings');
  $bookingsCountRow = mysqli_fetch_assoc($bookingsCountResult);
  $pendingCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bookings WHERE status = "pending"');
  $pendingCountRow = mysqli_fetch_assoc($pendingCountResult);
  $confirmedCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bookings WHERE status = "confirmed"');
  $confirmedCountRow = mysqli_fetch_assoc($confirmedCountResult);
  $completedCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bookings WHERE status = "completed"');
  $completedCountRow = mysqli_fetch_assoc($completedCountResult);
  $cancelledCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS item_count FROM bookings WHERE status = "cancelled"');
  $cancelledCountRow = mysqli_fetch_assoc($cancelledCountResult);

$stats = [
    'users' => (int) ($usersCountRow['item_count'] ?? 0),
    'bikes' => (int) ($bikesCountRow['item_count'] ?? 0),
    'bookings' => (int) ($bookingsCountRow['item_count'] ?? 0),
    'pending' => (int) ($pendingCountRow['item_count'] ?? 0),
    'confirmed' => (int) ($confirmedCountRow['item_count'] ?? 0),
    'completed' => (int) ($completedCountRow['item_count'] ?? 0),
    'cancelled' => (int) ($cancelledCountRow['item_count'] ?? 0),
];

  $bikes = db_fetch_all(mysqli_query($connection, 'SELECT * FROM bikes ORDER BY id DESC'));
  $bookings = db_fetch_all(mysqli_query($connection,
    'SELECT bookings.*, bikes.name AS bike_name, bikes.number_plate
     FROM bookings
     LEFT JOIN bikes ON bikes.id = bookings.bike_id
     ORDER BY bookings.id DESC'
  ));
  $users = db_fetch_all(mysqli_query($connection, 'SELECT id, first_name, last_name, email, phone, role, created_at FROM users ORDER BY id DESC'));
$flashError = flash('error');
$flashSuccess = flash('success');
$currentUser = current_user();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vehicle-RS | Dashboard</title>
  <meta name="description" content="Vehicle-RS admin dashboard">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="dashboard.css">
  <script defer src="script.js"></script>
</head>
<body data-page="dashboard">
  <nav class="navbar-wrapper home">
    <div class="nav-inner-overlay"></div>

    <div class="nav-left">
      <a href="index.php" class="logo nav-left-item link-rd">
        <img class="logo-image image-fit" src="html/logo.png" width="50" height="50" alt="VehicleRS">
        <div class="logo-text no-wrap">Vehicle-RS</div>
      </a>
    </div>
    <div class="nav-middle nav-desktop">
      <a href="index.php#bikes-section" data-nav="ride" class="nav-middle-item link-rd">Ride</a>
      <a href="about-us.html" data-nav="about-us" class="nav-middle-item link-rd">About</a>
    </div>

    <div class="nav-right nav-desktop">
      <div class="user-menu">
        <button type="button" class="nav-right-item link-rd sign-in-link no-wrap user-menu-button" aria-expanded="false">
          <?php echo e($currentUser['first_name'] ?? 'Admin'); ?> <i class="fa-solid fa-chevron-down user-menu-caret" aria-hidden="true"></i>
        </button>
        <div class="user-menu-list" role="menu">
          <a href="dashboard.php" class="user-menu-item" role="menuitem">Dashboard</a>
          <a href="logout.php" class="user-menu-item user-menu-item-danger" role="menuitem">Logout</a>
        </div>
      </div>
    </div>

  </nav>

  <main class="dashboard-shell">
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar" aria-label="Admin navigation">
        <a class="dashboard-brand" href="dashboard.php">
          <span class="dashboard-brand-mark"><i class="fa-solid fa-gauge-high" aria-hidden="true"></i></span>
          <span><strong>Admin Panel</strong><small>Manage Platform</small></span>
        </a>
        <p class="dashboard-nav-label">Management</p>
        <nav class="dashboard-nav">
          <a class="is-active" href="#dashboard-overview" data-dashboard-view="overview"><i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>Dashboard</a>
          <a href="#fleet-management" data-dashboard-view="vehicles"><i class="fa-solid fa-motorcycle" aria-hidden="true"></i>Vehicles</a>
          <a href="#booking-management" data-dashboard-view="bookings"><i class="fa-solid fa-calendar-check" aria-hidden="true"></i>Bookings</a>
          <a href="#user-management" data-dashboard-view="users"><i class="fa-solid fa-users" aria-hidden="true"></i>Users</a>
        </nav>
      </aside>

      <div class="dashboard-content">
        <section class="dashboard-heading" id="dashboard-overview">
          <div>
            <p class="dashboard-eyebrow">Admin dashboard</p>
            <h1 id="dashboard-page-title">Dashboard</h1>
            <p class="dashboard-copy" id="dashboard-page-copy">A quick overview of your vehicle rental platform.</p>
          </div>
          <a href="index.php" class="btn btn-blue link-rd fit-content">View site</a>
        </section>

        <?php if ($flashError !== null): ?>
          <div class="auth-message error"><?php echo e($flashError); ?></div>
        <?php endif; ?>
        <?php if ($flashSuccess !== null): ?>
          <div class="auth-message success"><?php echo e($flashSuccess); ?></div>
        <?php endif; ?>

        <section class="dashboard-stats-grid dashboard-view-item" data-dashboard-view="overview" aria-label="Dashboard summary">
      <article class="dashboard-stat-card">
        <span class="stat-icon"><i class="fa-solid fa-motorcycle" aria-hidden="true"></i></span>
        <div class="stat-value"><?php echo e($stats['bikes']); ?></div>
        <div class="stat-label">Total Vehicles</div>
        <small>Active listings</small>
      </article>
      <article class="dashboard-stat-card">
        <span class="stat-icon"><i class="fa-solid fa-users" aria-hidden="true"></i></span>
        <div class="stat-value"><?php echo e($stats['users']); ?></div>
        <div class="stat-label">Total Users</div>
        <small>Registered users</small>
      </article>
      <article class="dashboard-stat-card">
        <span class="stat-icon"><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i></span>
        <div class="stat-value"><?php echo e($stats['pending']); ?></div>
        <div class="stat-label">Total Pending</div>
        <small>Awaiting approval</small>
      </article>
      <article class="dashboard-stat-card">
        <span class="stat-icon"><i class="fa-solid fa-circle-check" aria-hidden="true"></i></span>
        <div class="stat-value"><?php echo e($stats['completed']); ?></div>
        <div class="stat-label">Total Completed</div>
        <small>Completed bookings</small>
      </article>
        </section>

        <section class="dashboard-grid dashboard-view-group" id="bike-management">
      <div class="dashboard-panel dashboard-view-item" id="bike-form" data-dashboard-view="overview">
        <div class="dashboard-panel-header">
          <h2><?php echo $editBike !== null ? 'Edit bike' : 'Add a bike'; ?></h2>
          <p>Public listings are driven from this table and update the homepage slider automatically.</p>
        </div>

        <form class="dashboard-form" method="post" enctype="multipart/form-data" action="dashboard.php<?php echo $editBike !== null ? '?edit_bike=' . (int) $editBike['id'] : ''; ?>">
          <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
          <input type="hidden" name="dashboard_action" value="save_bike">
          <input type="hidden" name="bike_id" value="<?php echo e((string) ($editBike['id'] ?? 0)); ?>">
          <div class="dashboard-field-grid">
            <div class="dashboard-field">
              <label for="bike-name">Bike name</label>
              <input id="bike-name" name="name" type="text" value="<?php echo e($editBike['name'] ?? ''); ?>" required>
            </div>
            <div class="dashboard-field">
              <label for="bike-number-plate">Number plate</label>
              <input id="bike-number-plate" name="number_plate" type="text" value="<?php echo e($editBike['number_plate'] ?? ''); ?>" maxlength="30" required>
            </div>
            <div class="dashboard-field-row">
              <div class="dashboard-field">
                <label for="bike-rate-usd">Rate USD</label>
                <input id="bike-rate-usd" name="rate_usd" type="number" step="0.01" value="<?php echo e((string) ($editBike['rate_usd'] ?? '')); ?>" required>
              </div>
              <div class="dashboard-field">
                <label for="bike-rate-npr">Rate NPR</label>
                <input id="bike-rate-npr" name="rate_npr" type="number" step="0.01" value="<?php echo e((string) ($editBike['rate_npr'] ?? '')); ?>" required>
              </div>
            </div>
            <div class="dashboard-field">
              <label for="bike-image">Bike image</label>
              <input id="bike-image" name="image" type="file" accept="image/jpeg,image/png,image/webp" <?php echo $editBike === null ? 'required' : ''; ?>>
              <?php if ($editBike !== null): ?>
                <small>Choose a new image only if you want to replace the current one.</small>
              <?php endif; ?>
            </div>
            <div class="dashboard-field">
              <label for="bike-description">Short description</label>
              <textarea id="bike-description" name="short_description" rows="3"><?php echo e($editBike['short_description'] ?? ''); ?></textarea>
            </div>
            <div class="dashboard-field-row">
              <div class="dashboard-field">
                <label for="bike-rating">Rating</label>
                <input id="bike-rating" name="rating" type="number" min="0" max="100" value="<?php echo e((string) ($editBike['rating'] ?? 100)); ?>">
              </div>
              <div class="dashboard-field">
                <label for="bike-status">Status</label>
                <select id="bike-status" name="status">
                  <?php foreach (['available' => 'Available', 'maintenance' => 'Maintenance', 'hidden' => 'Hidden'] as $value => $label): ?>
                    <option value="<?php echo e($value); ?>" <?php echo (($editBike['status'] ?? 'available') === $value) ? 'selected' : ''; ?>><?php echo e($label); ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>
            <label class="dashboard-check">
              <input type="checkbox" name="is_new" <?php echo !empty($editBike['is_new']) ? 'checked' : ''; ?>> Mark as new
            </label>
          </div>
          <div class="dashboard-actions">
            <button class="btn btn-blue" type="submit"><?php echo $editBike !== null ? 'Update bike' : 'Save bike'; ?></button>
            <?php if ($editBike !== null): ?>
              <a class="btn btn-gray-light link-rd" href="dashboard.php">Cancel</a>
            <?php endif; ?>
          </div>
        </form>
      </div>

      <div class="dashboard-panel dashboard-view-item booking-dashboard-panel" id="booking-management" data-dashboard-view="bookings">
        <div class="dashboard-panel-header">
          <h2>Bookings</h2>
          <p>Update booking status as requests move from pending to complete.</p>
        </div>
        <div class="dashboard-table-wrap">
          <table class="dashboard-table booking-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Plate</th>
                <th>Booking date</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <?php if ($bookings === []): ?>
                <tr>
                  <td class="dashboard-empty-state" colspan="8">No bookings have been submitted yet.</td>
                </tr>
              <?php else: ?>
              <?php foreach ($bookings as $booking): ?>
                <tr>
                  <td>
                    <strong><?php echo e($booking['customer_name']); ?></strong>
                  </td>
                  <td><?php echo e($booking['contact']); ?></td>
                  <td><?php echo e($booking['number_plate'] ?? '—'); ?></td>
                  <td><?php echo e(format_date((string) $booking['created_at'])); ?></td>
                  <td><?php echo e(format_date((string) $booking['pickup_date'])); ?></td>
                  <td><?php echo e(format_date((string) ($booking['return_date'] ?? ''))); ?></td>
                  <td><span class="status-badge status-<?php echo e((string) $booking['status']); ?>"><?php echo e(ucfirst((string) $booking['status'])); ?></span></td>
                  <td class="booking-status-cell">
                    <div class="booking-status-actions">
                      <form method="post" action="dashboard.php" class="dashboard-inline-form">
                        <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
                        <input type="hidden" name="dashboard_action" value="update_booking_status">
                        <input type="hidden" name="booking_id" value="<?php echo e((string) $booking['id']); ?>">
                        <select name="status" aria-label="Change booking status">
                          <?php foreach (['pending' => 'Pending', 'confirmed' => 'Confirmed', 'completed' => 'Completed', 'cancelled' => 'Cancelled'] as $value => $label): ?>
                            <option value="<?php echo e($value); ?>" <?php echo $booking['status'] === $value ? 'selected' : ''; ?>><?php echo e($label); ?></option>
                          <?php endforeach; ?>
                        </select>
                        <button type="submit" class="btn btn-blue">Save</button>
                      </form>
                      <form method="post" action="dashboard.php" class="booking-delete-form" onsubmit="return confirm('Delete this booking?');">
                        <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
                        <input type="hidden" name="dashboard_action" value="delete_booking">
                        <input type="hidden" name="booking_id" value="<?php echo e((string) $booking['id']); ?>">
                        <button type="submit" class="btn btn-yellow">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="dashboard-view-group dashboard-vehicle-section">
      <div class="dashboard-panel dashboard-view-item" id="fleet-management" data-dashboard-view="vehicles">
        <div class="dashboard-panel-header">
          <div class="dashboard-section-heading">
            <div>
              <h2>Vehicles</h2>
              <p>Manage every vehicle available for rental.</p>
            </div>
            <a class="btn btn-blue link-rd" href="#bike-form" data-dashboard-action-view="overview">Add vehicle</a>
          </div>
        </div>
        <div class="dashboard-table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>Vehicle name</th>
                <th>Image</th>
                <th>Plate no.</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php if ($bikes === []): ?>
                <tr>
                    <td class="dashboard-empty-state" colspan="6">No vehicles have been added yet.</td>
                </tr>
              <?php else: ?>
                <?php foreach ($bikes as $bike): ?>
                <tr>
                    <td>
                      <strong><?php echo e($bike['name']); ?></strong><br>
                    </td>
                    <td><img class="dashboard-bike-thumb" src="<?php echo e(dashboard_bike_image_url($bike)); ?>" alt="<?php echo e((string) $bike['name']); ?>"></td>
                    <td><?php echo e($bike['number_plate'] ?? '—'); ?></td>
                    <td>$<?php echo e((string) $bike['rate_usd']); ?> / NPR <?php echo e((string) $bike['rate_npr']); ?></td>
                    <td><span class="status-badge status-<?php echo e((string) $bike['status']); ?>"><?php echo e(ucfirst((string) $bike['status'])); ?></span></td>
                    <td class="dashboard-row-actions">
                      <div class="dashboard-vehicle-actions">
                        <a href="dashboard.php?edit_bike=<?php echo e((string) $bike['id']); ?>" class="btn btn-gray-light link-rd">Edit</a>
                      <form method="post" action="dashboard.php" onsubmit="return confirm('Delete this bike?');">
                        <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
                        <input type="hidden" name="dashboard_action" value="delete_bike">
                        <input type="hidden" name="bike_id" value="<?php echo e((string) $bike['id']); ?>">
                        <button type="submit" class="btn btn-yellow">Delete</button>
                      </form>
                      </div>
                  </td>
                </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="dashboard-view-group dashboard-user-section">
      <div class="dashboard-panel dashboard-view-item" id="user-management" data-dashboard-view="users">
        <div class="dashboard-panel-header">
          <div class="dashboard-section-heading">
            <div>
              <h2>Users</h2>
              <p>Manage every registered user and their access role.</p>
            </div>
          </div>
        </div>
        <div class="dashboard-table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php if ($users === []): ?>
                <tr>
                  <td class="dashboard-empty-state" colspan="5">No users have registered yet.</td>
                </tr>
              <?php else: ?>
                <?php foreach ($users as $user): ?>
                <tr>
                  <td>
                    <strong><?php echo e($user['first_name'] . ' ' . $user['last_name']); ?></strong>
                  </td>
                  <td><?php echo e($user['email']); ?></td>
                  <td><?php echo e($user['phone'] ?? '—'); ?></td>
                  <td>
                    <span class="status-badge status-<?php echo e((string) $user['role']); ?>">
                      <?php echo $user['role'] === 'admin' ? 'Admin' : 'User'; ?>
                    </span>
                  </td>
                  <td>
                    <div class="dashboard-user-actions">
                      <form method="post" action="dashboard.php" class="dashboard-role-form">
                      <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
                      <input type="hidden" name="dashboard_action" value="update_user_role">
                      <input type="hidden" name="user_id" value="<?php echo e((string) $user['id']); ?>">
                      <select name="role" aria-label="User role">
                        <option value="customer" <?php echo $user['role'] === 'customer' ? 'selected' : ''; ?>>User</option>
                        <option value="admin" <?php echo $user['role'] === 'admin' ? 'selected' : ''; ?>>Admin</option>
                      </select>
                      <button type="submit" class="btn btn-blue">Change</button>
                      </form>
                      <form method="post" action="dashboard.php" class="dashboard-user-delete" onsubmit="return confirm('Delete this user?');">
                        <input type="hidden" name="csrf_token" value="<?php echo e(csrf_token()); ?>">
                        <input type="hidden" name="dashboard_action" value="delete_user">
                        <input type="hidden" name="user_id" value="<?php echo e((string) $user['id']); ?>">
                        <button type="submit" class="btn btn-yellow">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>
    </section>
      </div>
    </div>

        <script>
          (function () {
            const navigationItems = document.querySelectorAll('.dashboard-nav [data-dashboard-view], [data-dashboard-action-view]');
            const sidebarItems = document.querySelectorAll('.dashboard-nav [data-dashboard-view]');
            const viewItems = document.querySelectorAll('.dashboard-view-item');
            const viewGroups = document.querySelectorAll('.dashboard-view-group');

            function showDashboardView(view) {
              viewItems.forEach(function (item) {
                item.hidden = item.dataset.dashboardView !== view;
              });
              viewGroups.forEach(function (group) {
                group.hidden = !group.querySelector('.dashboard-view-item:not([hidden])');
              });
              sidebarItems.forEach(function (item) {
                item.classList.toggle('is-active', item.dataset.dashboardView === view);
              });
            }

            navigationItems.forEach(function (item) {
              item.addEventListener('click', function (event) {
                event.preventDefault();
                const view = item.dataset.dashboardView || item.dataset.dashboardActionView;
                showDashboardView(view);
                history.replaceState(null, '', item.getAttribute('href'));
              });
            });

            showDashboardView('overview');
          }());
        </script>

        <div class="booking-modal-backdrop" id="booking-modal-backdrop" hidden>
      <div class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <button class="booking-modal-close" type="button" aria-label="Close hire form">×</button>
        <h2 id="booking-modal-title">Hire this vehicle</h2>
        <p id="booking-modal-bike-name">Selected vehicle</p>
        <form action="index.php" method="post" class="booking-modal-form">
          <input type="hidden" name="bike_id" id="booking-bike-id" value="">
          <input type="hidden" name="bike_name" id="booking-bike-name" value="">
          <label>Name<input class="input" type="text" name="name" required></label>
          <label>Email<input class="input" type="email" name="email" required></label>
          <label>Phone number<input class="input" type="tel" name="contact" pattern="(?:97|98)[0-9]{8}" minlength="10" maxlength="10" required></label>
          <label>Pickup date<input class="input" type="date" name="pickupDate" id="booking-pickup-date" required></label>
          <label>Drop date<input class="input" type="date" name="dropDate" id="booking-drop-date" required></label>
          <div class="booking-modal-actions">
            <button type="button" class="btn btn-gray-light booking-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-blue">Confirm Hire</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</body>
</html>
