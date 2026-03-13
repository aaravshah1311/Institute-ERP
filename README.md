<h1 align="center">🏫 Institute ERP</h1>
<p align="center">
  <em>Role-based institute management platform for administration, student/faculty workflows, attendance tracking, and profile management.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-Web_Framework-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Status-Active-0ea5e9?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <a href="https://aaravshah1311.is-great.net">
    <img src="https://img.shields.io/badge/Made%20By-Aarav%20Shah-4fd1d6?style=for-the-badge" alt="Made By Aarav Shah" />
  </a>
</p>

---

## 🚀 Overview

**Institute ERP** is a Node.js + Express web application designed for educational institutions to manage user access and core academic operations through role-based dashboards.

The system currently supports:

- secure login/session handling,
- role-aware dashboards (Admin, Student, Faculty, Staff, Club),
- profile management,
- attendance flows (view, take, edit, and student listing),
- MySQL-backed persistent storage.

---

## ✨ Core Features

- 🔐 Authentication with secure cookie-based session key (`sk`)
- 👥 Multi-role dashboard routing
- 🧑‍💼 Admin panel experience
- 🎓 Student dashboard experience
- 🧑‍🏫 Faculty dashboard experience
- 🏢 Staff and Club role handling
- ✅ Attendance management workflows
- 👤 Profile view/edit support
- 🛡️ Security headers via Helmet + CSP

---

## 🧱 Project Structure

```text
Institute-ERP/
├── app.js                # Main server and route handling
├── app.sql               # MySQL schema/data setup script
├── start.bat             # Optional Windows startup helper
├── script/
│   ├── content.js        # HTML content builders for pages/dashboards
│   └── profile.js        # Profile-related UI/content logic
├── src/
│   ├── *.css             # Styling files
│   ├── *.svg             # Vector assets
│   └── *.png             # Image assets
└── README.md
```

---

## ⚙️ Installation

### 1) Install Node.js and npm

Choose one method:

#### Windows/macOS (recommended)

1. Download the **LTS** version from: https://nodejs.org/
2. Install using the setup wizard.
3. Verify installation:

```bash
node -v
npm -v
```

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y nodejs npm
node -v
npm -v
```

> Tip: If your distro installs an old Node.js version, use NodeSource or nvm to install a current LTS release.

### 2) Install MySQL Server

Install MySQL Community Server from: https://dev.mysql.com/downloads/mysql/

After installation, verify:

```bash
mysql --version
```

### 3) Clone the repository

```bash
git clone https://github.com/aaravshah1311/Institute-ERP.git
cd Institute-ERP
```

### 4) Install project dependencies

```bash
npm install express mysql2 body-parser cookie-parser dotenv helmet
```

---

## 🗄️ Database Setup (MySQL)

### 1) Create database/tables using included SQL file

Run from the project root:

```bash
mysql -u <your_mysql_user> -p < app.sql
```

This imports all schema/data defined in `app.sql`.

### 2) Confirm DB accessibility

Make sure:

- MySQL server is running,
- credentials are valid,
- host and port match your `.env` settings.

---

## 🔐 Environment Variables (`.env`)

Create a `.env` file in the project root:

```env
DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

### Notes

- `DB_HOST`: usually `127.0.0.1` for local MySQL
- `DB_USER` / `DB_PASS`: your MySQL login credentials
- `DB_NAME`: must match the database expected by `app.sql` data
- `DB_PORT`: default MySQL port is `3306`

---

## ▶️ Run the Application

Start the server:

```bash
node app.js
```

Open in browser:

```text
http://127.0.0.1:3206
```

---

## 🧪 Common Setup Checklist

- [ ] Node.js and npm installed
- [ ] MySQL server installed and running
- [ ] Database imported using `app.sql`
- [ ] `.env` file created with valid DB credentials
- [ ] Dependencies installed
- [ ] Server starts without errors

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (`mysql2/promise`)
- **Middleware:** `body-parser`, `cookie-parser`, `dotenv`
- **Security:** `helmet` (CSP + headers)
- **Rendering Pattern:** Server-generated HTML via JS content modules

---

## 📌 Troubleshooting

- **Cannot connect to database**
  - Re-check `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT` in `.env`.
- **Login/session issues**
  - Clear browser cookies and retry authentication.
- **Port already in use**
  - Stop the process using port `3000`, then restart the app.
- **Static files not loading**
  - Confirm `/src` assets exist and paths are unchanged.

---

## 👤 Author

**Aarav Shah**

- GitHub: https://github.com/aaravshah1311/
- Portfolio: https://aaravshah1311.is-great.net

---

<div align="center">
  <sub>Built to simplify institutional operations with practical role-based ERP workflows.</sub>
</div>
