# AmbatuGrow ERP - Inventory & Warehouse Management System

A high-fidelity sandbox ERP simulation portal designed to track agricultural stock, dispatch secure transfers, and manage warehouse location capacities.

---

## 🚀 Technology Stack
* **Backend:** Laravel 11.x (PHP 8.2+)
* **Database:** SQLite (Embedded)
* **Frontend:** Laravel Blade, Tailwind CSS, Vite, Vanilla ES6 JavaScript
* **Icons & Charts:** Lucide Icons, Chart.js

---

## 🛠️ Prerequisites
Before running this application on another computer, ensure you have the following installed:
1. **PHP (8.2 or higher)** with SQLite extensions enabled (`php_pdo_sqlite`, `php_sqlite3`).
2. **Composer** (PHP dependency manager).
3. **Node.js (v18 or higher) & NPM** (Frontend asset bundler).
4. **Git** (Version control).

---

## 💻 Step-by-Step Installation Guide

Follow these commands in your terminal to set up the application from scratch:

### 1. Clone the Repository
```bash
git clone https://github.com/CardboardB0X/AmbatuGrow-Inventory.git
cd AmbatuGrow-Inventory
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install NPM Packages
```bash
npm install
```

### 4. Configure the Environment
Create your local environment file by copying `.env.example`:
```bash
copy .env.example .env
```
*(On macOS/Linux, run `cp .env.example .env`)*

Inside the `.env` file, configure it to use SQLite by changing these values:
```env
DB_CONNECTION=sqlite
# DB_DATABASE can be left blank for SQLite auto-creation, or set to database/database.sqlite
```

### 5. Generate the Application Encryption Key
```bash
php artisan key:generate
```

### 6. Set Up the Database (Migrate & Seed)
Create the database file and load the sandbox seed data (roles, users, warehouses, seed inventory):
```bash
# Create SQLite file if it doesn't exist
type nul > database/database.sqlite
# Run migrations and seed data
php artisan migrate:fresh --seed
```

### 7. Compile Frontend Assets
Build the production JS and CSS bundles using Vite:
```bash
npm run build
```

### 8. Serve the Application
Start the local Laravel development server:
```bash
php artisan serve
```
Open your web browser and navigate to: **`http://127.0.0.1:8000`**

---

## 🔑 Sandbox Credentials (Role-Based Access)

To test the multi-role access controls, sign in using the credentials below:

| Username | Password | Role | Features Available |
| :--- | :--- | :--- | :--- |
| **admin** | `admin123` | **System Administrator** | Full edit details modal, product discontinuation (cascade delete), warehouse transfers, PO generation. |
| **officer** | `officer123` | **Inventory Officer** | Stock transactions adjustments, warehouse transfers, PO preview. *(Edit & Delete catalog controls are hidden)* |

---

## 🌟 Core Features Implemented

1. **Three-Tier Collapsible Sidebar:**
   * **Tier 1:** Vertical switcher displaying active **Inventory System** and locked buttons with padlock overlays for **Procurement**, **Logistics**, and **Finance** departments. Clicking locked modules logs unauthorized access alerts.
   * **Tier 2:** Collapses to `7rem` (showing symbols only) and expands to `20rem` on hover (revealing text labels smoothly).
   * **Tier 3:** Location breadcrumb trails and active user badges.
2. **Inventory Tracking:** Searchable SKU grid displaying quantities, base values, and status badges (`In Stock`, `Low Stock`, `Overstocked`).
3. **Stock Transactions:** Form to input delivery imports (Stock-In) or output orders (Stock-Out) with automated console ledger tracking.
4. **Warehouse Location Tracking:** Interactive capacity meters showing occupancy percentages for Zones A, B, and C across primary warehouses.
5. **Inventory Reporting & Alerts:** Displays low-stock items with a **"Generate PO"** dispatch wizard. Calculates reorder deficits automatically and simulates 3-second transit arrivals.
6. **Currency Selector Converter:** Toggles pricing symbols and divides rates by `58.00` to convert PHP valuations to USD globally in real time.

---

## 🛠️ Troubleshooting & Fixes

### 1. Vite Asset Build Errors
* **Problem:** Clicking buttons does not run operations or styles look raw.
* **Fix:** Vite assets need to be compiled. Run `npm run build` to generate the production package in `public/build/`. For real-time updates, run `npm run dev`.

### 2. SQLite Database is Locked or Missing Table
* **Problem:** Errors on login saying database tables do not exist.
* **Fix:** The database file was not initialized. Verify that `database/database.sqlite` exists and run:
  ```bash
  php artisan migrate:fresh --seed
  ```

### 3. File Permissions / Read-Only Database
* **Problem:** SQLite returns a database read-only or permission denied exception on adjustments.
* **Fix:** Ensure the web server user has write access to both `database/database.sqlite` and the parent folder `database/`.
  * *Windows:* Open properties of the `database` folder and uncheck "Read-only".
  * *Linux:* Run `chmod -R 775 database/` and `chown -R www-data:www-data database/`.
