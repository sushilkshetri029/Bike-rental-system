<?php

include 'includes/db.php';

$returnTo = trim((string) ($_GET['return_to'] ?? $_POST['return_to'] ?? ''));
if (!preg_match('/^index\.php(?:\?hire_bike=\d+)?$/', $returnTo)) {
  $returnTo = 'index.php';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = trim((string) ($_POST['form_action'] ?? ''));
  $failRegister = function ($message) use ($returnTo) {
    flash('error', $message);
    redirect('auth.php?return_to=' . urlencode($returnTo) . '#register');
  };

  switch ($action) {
    case 'login':
      $email = trim((string) ($_POST['email'] ?? ''));
      $password = (string) ($_POST['password'] ?? '');

      $connection = db();
      $stmt = mysqli_prepare($connection, 'SELECT id, first_name, last_name, email, password_hash, role FROM users WHERE email = ? LIMIT 1');
      mysqli_stmt_bind_param($stmt, 's', $email);
      mysqli_stmt_execute($stmt);
      $userResult = mysqli_stmt_get_result($stmt);
      $user = mysqli_fetch_assoc($userResult);
      mysqli_stmt_close($stmt);

      if (!$user || !password_verify($password, (string) $user['password_hash'])) {
        flash('error', 'Invalid email or password.');
        redirect('auth.php');
      }

      $_SESSION['user'] = [
        'id' => (int) $user['id'],
        'first_name' => $user['first_name'],
        'last_name' => $user['last_name'],
        'email' => $user['email'],
        'role' => $user['role'],
      ];

      flash('success', 'Welcome back, ' . $user['first_name'] . '.');
      redirect(($user['role'] ?? '') === 'admin' ? 'dashboard.php' : $returnTo);

    case 'register':
      $firstName = trim((string) ($_POST['first_name'] ?? ''));
      $lastName = trim((string) ($_POST['last_name'] ?? ''));
      $email = trim((string) ($_POST['email'] ?? ''));
      $phone = trim((string) ($_POST['phone'] ?? ''));
      $password = (string) ($_POST['password'] ?? '');
      $confirmPassword = (string) ($_POST['confirm_password'] ?? '');

      if ($firstName === '' || $lastName === '' || $email === '' || $phone === '' || $password === '') {
        $failRegister('Please fill in every required field.');
      }

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $failRegister('Please enter a valid email address.');
      }

      if (!preg_match('/^(97|98)\d{8}$/', $phone)) {
        $failRegister('Phone number must be 10 digits and start with 97 or 98.');
      }

      if ($password !== $confirmPassword) {
        $failRegister('Passwords do not match.');
      }

      $connection = db();
      $stmt = mysqli_prepare($connection, 'SELECT id FROM users WHERE email = ? LIMIT 1');
      mysqli_stmt_bind_param($stmt, 's', $email);
      mysqli_stmt_execute($stmt);
      $existingUser = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
      mysqli_stmt_close($stmt);
      if ($existingUser) {
        $failRegister('An account with this email already exists.');
      }

      $userCountResult = mysqli_query($connection, 'SELECT COUNT(*) AS user_count FROM users');
      $userCountRow = mysqli_fetch_assoc($userCountResult);
      $userCount = (int) ($userCountRow['user_count'] ?? 0);
      $role = $userCount === 0 ? 'admin' : 'customer';
      $passwordHash = password_hash($password, PASSWORD_DEFAULT);

      $insert = mysqli_prepare($connection,
        'INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
         VALUES (?, ?, ?, ?, ?, ?)'
      );
      mysqli_stmt_bind_param($insert, 'ssssss', $firstName, $lastName, $email, $phone, $passwordHash, $role);
      mysqli_stmt_execute($insert);
      mysqli_stmt_close($insert);

      $_SESSION['user'] = [
        'id' => mysqli_insert_id($connection),
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'role' => $role,
      ];

      flash('success', $role === 'admin' ? 'Your admin account is ready.' : 'Your account has been created.');
      redirect($role === 'admin' ? 'dashboard.php' : $returnTo);
    }
}

$flashError = flash('error');
$flashSuccess = flash('success');
$viewer = current_user();
$isLoggedIn = $viewer !== null;
$firstName = e($isLoggedIn ? ($viewer['first_name'] ?? 'Account') : 'Account');
$showDashboardLink = $isLoggedIn && (($viewer['role'] ?? '') === 'admin');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vehicle-RS | Sign In</title>
  <meta name="description" content="Sign in or create a Vehicle-RS account">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
  <script defer src="script.js"></script>
</head>
<body data-page="auth">
<nav class="navbar-wrapper home">
  <div class="nav-inner-overlay"></div>
    <div class="nav-left">
      <a href="index.php" class="logo nav-left-item link-rd">
        <img class="logo-image image-fit" src="public/logo.png" width="50" height="50" alt="VehicleRS">
        <div class="logo-text no-wrap">Vehicle-RS</div>
      </a>
    </div>
    <div class="nav-middle nav-desktop">
      <a href="index.php#bikes-section" data-nav="ride" class="nav-middle-item link-rd">Ride</a>
      <a href="about-us.html" data-nav="about-us" class="nav-middle-item link-rd">About</a>
    </div>
    <div class="nav-right nav-desktop">
      <?php if ($isLoggedIn): ?>
        <div class="user-menu">
          <button type="button" class="nav-right-item link-rd sign-in-link no-wrap user-menu-button" aria-expanded="false">
            <?php echo $firstName; ?> <i class="fa-solid fa-chevron-down user-menu-caret" aria-hidden="true"></i>
          </button>
          <div class="user-menu-list" role="menu">
            <?php if ($showDashboardLink): ?><a href="dashboard.php" class="user-menu-item" role="menuitem">Dashboard</a><?php endif; ?>
            <a href="logout.php" class="user-menu-item user-menu-item-danger" role="menuitem">Logout</a>
          </div>
        </div>
      <?php else: ?>
        <a href="auth.php" class="nav-right-item link-rd sign-in-link no-wrap">Sign In</a>
      <?php endif; ?>
    </div>
  </nav>

  <main class="auth-shell">
    <div class="auth-layout" data-auth-page>
      <section class="auth-card shadow" aria-label="Authentication forms">
        <div class="auth-card-inner">
          <div class="auth-card-header">
            <h2>Welcome back</h2>
            <p>Switch between login and register without losing the theme or the layout language of the site.</p>
            <?php if ($flashError !== null): ?>
              <div class="auth-message error"><?php echo e($flashError); ?></div>
            <?php endif; ?>
            <?php if ($flashSuccess !== null): ?>
              <div class="auth-message success"><?php echo e($flashSuccess); ?></div>
            <?php endif; ?>
          </div>

          <div class="auth-tabs" role="tablist" aria-label="Authentication options">
            <button class="auth-tab active" type="button" data-auth-tab="login" aria-selected="true">Login</button>
            <button class="auth-tab" type="button" data-auth-tab="register" aria-selected="false">Register</button>
          </div>

          <div class="auth-panels">
            <form class="auth-panel-form" data-auth-panel="login" method="post" action="auth.php">
              <input type="hidden" name="form_action" value="login">
              <input type="hidden" name="return_to" value="<?php echo e($returnTo); ?>">
              <div class="auth-field-grid">
                <div class="auth-field">
                  <label for="login-email">Email address</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-envelope field-icon" aria-hidden="true"></i>
                    <input id="login-email" name="email" type="email" placeholder="Enter your email" required>
                  </div>
                </div>
                <div class="auth-field auth-password">
                  <label for="login-password">Password</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-lock field-icon" aria-hidden="true"></i>
                    <input id="login-password" name="password" type="password" placeholder="Enter your password" required>
                    <button class="auth-password-toggle" type="button" data-toggle-password="login-password" aria-label="Show password"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>

              <div class="auth-row-meta">
                <label><input type="checkbox"> Remember me</label>
                <a href="#">Forgot password?</a>
              </div>

              <button class="auth-submit" type="submit">Login to account</button>

              <div class="auth-social">
                <div class="auth-social-divider">or continue with</div>
                <div class="auth-social-buttons">
                  <a href="#" class="auth-social-button"><i class="fa-brands fa-google" aria-hidden="true"></i> Google</a>
                  <a href="#" class="auth-social-button"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i> Facebook</a>
                  <a href="#" class="auth-social-button"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp</a>
                </div>
              </div>

              <p class="auth-switch">New here? <a href="#register">Create an account</a></p>
            </form>

            <form class="auth-panel-form" data-auth-panel="register" method="post" action="auth.php" hidden>
              <input type="hidden" name="form_action" value="register">
              <input type="hidden" name="return_to" value="<?php echo e($returnTo); ?>">
              <div class="auth-field-grid">
                <div class="auth-field-row">
                  <div class="auth-field">
                    <label for="register-first-name">First name</label>
                    <div class="input-wrapper auth-input-wrapper">
                      <i class="fa-solid fa-user field-icon" aria-hidden="true"></i>
                      <input id="register-first-name" name="first_name" type="text" placeholder="First name" required>
                    </div>
                  </div>
                  <div class="auth-field">
                    <label for="register-last-name">Last name</label>
                    <div class="input-wrapper auth-input-wrapper">
                      <i class="fa-solid fa-user field-icon" aria-hidden="true"></i>
                      <input id="register-last-name" name="last_name" type="text" placeholder="Last name" required>
                    </div>
                  </div>
                </div>

                <div class="auth-field">
                  <label for="register-email">Email address</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-envelope field-icon" aria-hidden="true"></i>
                    <input id="register-email" name="email" type="email" placeholder="Enter your email" required>
                  </div>
                </div>

                <div class="auth-field">
                  <label for="register-phone">Phone number</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-phone field-icon" aria-hidden="true"></i>
                    <input id="register-phone" name="phone" type="tel" inputmode="numeric" pattern="(?:97|98)[0-9]{8}" minlength="10" maxlength="10" placeholder="Enter phone number" required>
                  </div>
                </div>

                <div class="auth-field auth-password">
                  <label for="register-password">Password</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-lock field-icon" aria-hidden="true"></i>
                    <input id="register-password" name="password" type="password" placeholder="Create password" required>
                    <button class="auth-password-toggle" type="button" data-toggle-password="register-password" aria-label="Show password"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
                  </div>
                </div>

                <div class="auth-field auth-password">
                  <label for="register-confirm-password">Confirm password</label>
                  <div class="input-wrapper auth-input-wrapper">
                    <i class="fa-solid fa-lock field-icon" aria-hidden="true"></i>
                    <input id="register-confirm-password" name="confirm_password" type="password" placeholder="Confirm your password" required>
                    <button class="auth-password-toggle" type="button" data-toggle-password="register-confirm-password" aria-label="Show password"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>

              <div class="auth-row-meta">
                <label><input type="checkbox" required> I agree to the terms and conditions</label>
              </div>

              <button class="auth-submit" type="submit">Create account</button>

              <p class="auth-switch">Already have an account? <a href="#login">Login instead</a></p>
            </form>
          </div>
        </div>
      </section>
    </div>
  </main>

  <footer class="footer-wrapper home">
    <div class="footer-top">
      <div class="footer-top-left">
        <h4 class="footer-top-left-title footer-titles line-title">More On Vehicle-RS</h4>
        <ul class="more-on-company footer-lists">
          <li class="more-on-item"><a href="about-us.html" class="link-rd">About Us</a></li>
          <li class="more-on-item"><a href="#" class="link-rd">Privacy Policy</a></li>
          <li class="more-on-item"><a href="#" class="link-rd">Terms &amp; Conditions</a></li>
        </ul>
      </div>
      <div class="footer-top-middle">
        <h4 class="footer-top-mid-title footer-titles line-title">Locations</h4>
        <ul class="company-locations footer-lists">
          <li class="more-on-item">Chitwan</li>
        </ul>
      </div>
      <ul class="footer-top-right">
        <li class="company-details">
          <div class="company-details-icon"><i class="fa-solid fa-phone" aria-hidden="true"></i></div>
          <div class="company-infos">
            <h5 class="company-infos-title">Contact Number</h5>
            <div class="company-infos-desc flex flex-center gap-10">
              <a href="tel:9844310032" class="link-rd link-hover">9844310032</a>
              <div class="line line-vertical"></div>
              <a href="tel:9865005257" class="link-rd link-hover">9865005257</a>
            </div>
          </div>
        </li>
        <li class="company-details">
          <div class="company-details-icon"><i class="fa-solid fa-envelope" aria-hidden="true"></i></div>
          <div class="company-infos">
            <h5 class="company-infos-title">Email Address</h5>
            <a href="mailto:vehicle-rs@gmail.com" class="company-infos-desc link-hover">vehicle-rs@gmail.com</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-separator"></div>
    <div class="footer-bottom">
      <a href="index.php" class="footer-bottom-logo footer-bottom-desktop">
        <img src="public/logo.png" class="footer-logo" width="45" height="45" alt="Vehicle-RS footer">
        <div class="footer-bottom-logo-text">Vehicle-RS</div>
      </a>
      <div class="footer-bottom-text footer-bottom-desktop">Copyright &copy; | www.vehicle-rs.com - <span data-year></span> | All Right Reserved</div>
      <ul class="footer-bottom-platforms">
        <li class="footer-platform-item"><a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a></li>
        <li class="footer-platform-item"><a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
        <li class="footer-platform-item"><a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a></li>
      </ul>
    </div>
  </footer>
</body>
</html>
