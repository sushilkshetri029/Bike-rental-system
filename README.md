# Vehicle-RS

Vehicle-RS is now a PHP + MySQL rental site that runs on XAMPP.

## What is included

- Public homepage in `index.php`
- Login and registration in `auth.php`
- Admin dashboard in `dashboard.php`
- Logout in `logout.php`
- Bike data API in `api/bikes.php`
- Automatic database bootstrap and seed data in `includes/db.php`

## How to run on XAMPP

1. Copy the project folder into your XAMPP web root, usually `C:\xampp\htdocs\Vehicle Rental New`.
2. Start Apache and MySQL from the XAMPP control panel.
3. Open `http://localhost/Vehicle%20Rental%20New/index.php` in your browser.
4. Create the first account from `auth.php`; the first registered user becomes the admin automatically.
5. Open `dashboard.php` after logging in as admin to manage bikes, users, and bookings.

## Notes

- The database is created automatically the first time the PHP app connects.
- Default bike records are seeded automatically if the bikes table is empty.
- The public bike cards read live data from MySQL, so dashboard changes show up on the homepage.
- If MySQL uses custom credentials, set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in your environment.
