//home content
const homecontent=
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Institute Manager</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="src/home.css" rel="stylesheet">
</head>
<body>

  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">Institute Management System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/About">About</a></li>
          <li class="nav-item"><a class="nav-link" href="/Contact">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="/Login">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero text-center py-5 flex-grow-1">
    <div class="container">
      <h1 class="fw-bold mb-3">Welcome to the Secure Student Portal</h1>
      <p class="lead text-muted mb-4">
        Access your academic resources, track progress, explore new learning opportunities, 
        and stay connected with your institution – all in one secure place.
      </p>
      <a href="/Login" class="btn btn-gradient px-4 py-2">Get Started</a>
    </div>
  </section>

  <footer class="text-center py-3">
    Powered by Aarav Programmers | © 2025 Institute Manager
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;

//login content
function login_screen(res, code = 0) {
  const messages = {
    1: "Session expired, please login again",
    2: "Improper user removed, please login again",
    3: "Please login first",
    4: "Invalid username or password",
    5: "Logged out successfully",
	6: "Password Changed Successfully"
  };

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Secure Institute Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="src/login.css">
  </head>
  <body>
    <div class="login-card text-center">
	  <a href="/" class="back-btn"><img src="src/back.svg" alt="Back" class="back-icon"></a>
      <h2>Secure Institute Login</h2>
      <p class="ai-badge">Powered by Aarav Programmers</p>
      ${messages[code] ? `<p class="text-danger">${messages[code]}</p>` : ""}
      <form action="/loginx" method="POST">
        <div class="mb-3">
          <input type="number" class="form-control" placeholder="User ID" name="id" required>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="Password" name="pass" required>
        </div>
        <div class="mb-3 text-end">
          <a href="/forget_password" class="forgot-link">Forgot Password?</a>
        </div>
        <button type="submit" class="btn btn-login w-100">Login</button>
      </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `);
}

//admin content
function admincontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Admin Panel</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
			    <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/view_students">📘 View Students</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/view_faculty">👨‍🏫 View Faculty</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/new_user">➕ Create New User</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/edit_attendance">✍️ Edit Attendance</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/custom_msg">💬 Create Custom Message</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/create_class">🏫 Create Class/Batch</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/assign_faculty">📌 Assign Faculty</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Admin Panel</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Admin Panel</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}
//Student Content
function studentcontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Student Dashboard</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
				<li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="/student/reasult">📊 My Results</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/view_attendance">👁️ View Attendance</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/assignments">📝 Assignments</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/class">🎓 Class</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/certificates">📜 Certificates</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/evant-registration">🗓️ Event Registration</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Student Dashboard</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Student Dashboard</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}

//Faculty Content
function facultycontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Faculty Dashboard</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
			   <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
               <li class="nav-item"><a class="nav-link" href="/faculty/reasult">👩‍🏫 My Class</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/rechecking">📂 My Assignments</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/assignments">📝 Assignments</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/take_attendance">✍️ Take Attendance</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/certificates">📅 Time Table</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Faculty Dashboard</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Faculty Dashboard</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}

//Club Content (Role 5) - NEW
function clubcontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Club Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Club Dashboard</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
			   <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
               <li class="nav-item"><a class="nav-link" href="/club/take_attendance">✍️ Take Attendance</a></li>
               <li class="nav-item"><a class="nav-link" href="/club/events">🎉 Manage Events</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Club Dashboard</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Club Dashboard</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}

// Attendance View Content (Student Role 2) - NEW
function attendance_view_content(res, user, attendanceData, msg = '') {
    // Ensuring tableRows is safe
    let tableRows = attendanceData.map(record => {
        const status = record.is_present ? '<span class="badge bg-success">Present</span>' : '<span class="badge bg-danger">Absent</span>';
        const formattedDate = new Date(record.attendance_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return `
            <tr>
                <td>${formattedDate}</td>
                <td>Slot ${record.slot}</td>
                <td>${record.class_name}</td>
                <td>${status}</td>
            </tr>
        `;
    }).join('');

    if (attendanceData.length === 0) {
        tableRows = '<tr><td colspan="4" class="text-center">No attendance records found.</td></tr>';
    }

    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>View Attendance</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="src/dashboard.css" rel="stylesheet">
    </head>
    <body>
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
            <div class="offcanvas-header">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Student Dashboard</h5>
            </div>
            <div class="offcanvas-body d-flex flex-column p-0">
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" href="/student/reasult">📊 My Results</a></li>
                    <li class="nav-item"><a class="nav-link active" href="/student/view_attendance">👁️ View Attendance</a></li>
                    <li class="nav-item"><a class="nav-link" href="/student/assignments">📝 Assignments</a></li>
                    <li class="nav-item"><a class="nav-link" href="/student/class">🎓 Class</a></li>
                    <li class="nav-item"><a class="nav-link" href="/student/certificates">📜 Certificates</a></li>
                    <li class="nav-item"><a class="nav-link" href="/student/evant-registration">🗓️ Event Registration</a></li>
                </ul>
                <div class="sidebar-footer">
                    <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                    <a href="/logout" class="btn btn-logout w-100">Logout</a>
                </div>
            </div>
        </div>

        <div class="page-wrapper">
            <nav class="top-navbar d-flex align-items-center">
                <div class="d-flex align-items-center navbar-toggle-content">
                    <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">☰</button>
                    <span class="navbar-brand">Student Dashboard</span>
                </div>
            </nav>

            <main class="main-content">
                <h1 class="mb-4 gradient-text">My Attendance Records</h1>
                ${msg ? `<div class="alert alert-info">${msg}</div>` : ''}

                <div class="card info-card">
                    <div class="card-body">
                        <h3 class="h5 mb-3 fw-bold">Recent Attendance</h3>
                        <div class="table-responsive">
                            <table class="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Slot</th>
                                        <th>Class/Activity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <a href="/logout" class="btn fixed-logout-btn">Logout</a>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            const sidebar = document.getElementById('offcanvasSidebar');
            const wrapper = document.querySelector('.page-wrapper');
            sidebar.addEventListener('show.bs.offcanvas', () => { wrapper.classList.add('toggled'); });
            sidebar.addEventListener('hide.bs.offcanvas', () => { wrapper.classList.remove('toggled'); });
        </script>
    </body>
    </html>
    `);
}

// Attendance Take Content (Faculty Role 3, Club Role 5) - NEW
function attendance_take_content(res, user, classList, msg = '', isFaculty = true) {
    const roleName = isFaculty ? 'Faculty' : 'Club';
    const routePrefix = isFaculty ? 'faculty' : 'club';
    const sidebarHtml = isFaculty ? `
        <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="/faculty/reasult">👩‍🏫 My Class</a></li>
        <li class="nav-item"><a class="nav-link" href="/faculty/rechecking">📂 My Assignments</a></li>
        <li class="nav-item"><a class="nav-link" href="/faculty/assignments">📝 Assignments</a></li>
        <li class="nav-item"><a class="nav-link active" href="/faculty/take_attendance">✍️ Take Attendance</a></li>
        <li class="nav-item"><a class="nav-link" href="/faculty/certificates">📅 Time Table</a></li>
    ` : `
        <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
        <li class="nav-item"><a class="nav-link active" href="/club/take_attendance">✍️ Take Attendance</a></li>
        <li class="nav-item"><a class="nav-link" href="/club/events">🎉 Manage Events</a></li>
    `;

    // Ensuring classOptions is safe even if classList is empty
    const classOptions = classList.map(c => 
        `<option value="${c.class_id}">${c.class_name} (${c.class_id})</option>`
    ).join('');
    
    // Set max date for non-Admin users to today
    const maxDateAttribute = `max="${new Date().toISOString().substring(0, 10)}"`;
    const actionUrl = `/attendance/select_students?role=${routePrefix}`;


    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Take Attendance</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="src/dashboard.css" rel="stylesheet">
    </head>
    <body>
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
            <div class="offcanvas-header">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">${roleName} Dashboard</h5>
            </div>
            <div class="offcanvas-body d-flex flex-column p-0">
                <ul class="nav flex-column">
                    ${sidebarHtml}
                </ul>
                <div class="sidebar-footer">
                    <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                    <a href="/logout" class="btn btn-logout w-100">Logout</a>
                </div>
            </div>
        </div>

        <div class="page-wrapper">
            <nav class="top-navbar d-flex align-items-center">
                <div class="d-flex align-items-center navbar-toggle-content">
                    <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">☰</button>
                    <span class="navbar-brand">${roleName} Dashboard</span>
                </div>
            </nav>

            <main class="main-content">
                <h1 class="mb-4 gradient-text">Mark Attendance</h1>
                ${msg ? `<div class="alert alert-info">${msg}</div>` : ''}

                <div class="card info-card">
                    <div class="card-body">
                        <h3 class="h5 mb-3 fw-bold">Select Class and Slot</h3>
                        <form action="${actionUrl}" method="GET">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="class_id" class="form-label">Class/Activity</label>
                                    <select class="form-control" id="class_id" name="class_id" required ${classList.length === 0 ? 'disabled' : ''}>
                                        <option value="">-- Select Class --</option>
                                        ${classOptions}
                                    </select>
                                    ${classList.length === 0 ? '<small class="text-danger">No classes/activities found.</small>' : ''}
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="slot" class="form-label">Slot (1-3)</label>
                                    <select class="form-control" id="slot" name="slot" required ${classList.length === 0 ? 'disabled' : ''}>
                                        <option value="">-- Select Slot --</option>
                                        <option value="1">Slot 1</option>
                                        <option value="2">Slot 2</option>
                                        <option value="3">Slot 3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="date" class="form-label">Date</label>
                                <input type="date" class="form-control" id="date" name="date" value="${new Date().toISOString().substring(0, 10)}" required ${maxDateAttribute} ${classList.length === 0 ? 'disabled' : ''}>
                            </div>
                            <button type="submit" class="btn btn-profile w-100" ${classList.length === 0 ? 'disabled' : ''}>Load Students</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
        <a href="/logout" class="btn fixed-logout-btn">Logout</a>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            const sidebar = document.getElementById('offcanvasSidebar');
            const wrapper = document.querySelector('.page-wrapper');
            sidebar.addEventListener('show.bs.offcanvas', () => { wrapper.classList.add('toggled'); });
            sidebar.addEventListener('hide.bs.offcanvas', () => { wrapper.classList.remove('toggled'); });
        </script>
    </body>
    </html>
    `);
}

// Attendance Student List Content (Helper for Faculty/Club POST) - NEW
function attendance_student_list_content(res, user, classInfo, students, attendanceRecords, msg = '', isReadOnly = false) {
    const roleName = user.rolex == 3 ? 'Faculty' : user.rolex == 5 ? 'Club' : 'Admin';
    const isEditing = user.rolex == 1; // Only Admin can edit past records freely

    const studentsHtml = students.map(student => {
        const isPresent = attendanceRecords.some(r => r.student_id == student.id && r.is_present);
        const checked = isPresent ? 'checked' : '';
        const disabled = isReadOnly ? 'disabled' : '';

        return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${student.namex} ${student.last_name} (${student.id})</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="student_${student.id}" name="present_students" value="${student.id}" ${checked} ${disabled}>
                    <label class="form-check-label" for="student_${student.id}">Present</label>
                </div>
            </li>
        `;
    }).join('');

    const backUrl = isEditing ? '/admin/edit_attendance' : (user.rolex == 3 ? '/faculty/take_attendance' : '/club/take_attendance');
    const submitButton = (students.length > 0 && !isReadOnly) ? `<button type="submit" class="btn btn-profile w-100">Save Attendance</button>` : '';
    const actionUrl = isReadOnly ? '' : "/attendance/record";
    const readOnlyMessage = isReadOnly ? '<p class="text-warning fw-bold mt-3">Attendance is locked for this date and slot, or you are not authorized to edit it.</p>' : '';
    const noStudentsMessage = students.length === 0 ? '<p class="text-danger fw-bold mt-3">No students are currently enrolled in this class/activity. Cannot record attendance.</p>' : '';
    const dateFormatted = new Date(classInfo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mark Attendance for ${classInfo.class_name}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="src/dashboard.css" rel="stylesheet">
    </head>
    <body>
        <div class="page-wrapper">
            <nav class="top-navbar d-flex align-items-center">
                <div class="d-flex align-items-center navbar-toggle-content">
                    <a href="${backUrl}" class="btn btn-sm btn-light me-3">← Back to Selection</a>
                    <span class="navbar-brand">${roleName} Panel</span>
                </div>
            </nav>

            <main class="main-content">
                <h1 class="mb-4 gradient-text">Attendance for ${classInfo.class_name}</h1>
                <h2 class="h5 mb-3">Date: ${dateFormatted} | Slot: ${classInfo.slot}</h2>
                ${msg ? `<div class="alert alert-success">${msg}</div>` : ''}

                <div class="card info-card">
                    <div class="card-body">
                        <form action="${actionUrl}" method="POST">
                            <input type="hidden" name="class_id" value="${classInfo.class_id}">
                            <input type="hidden" name="slot" value="${classInfo.slot}">
                            <input type="hidden" name="date" value="${classInfo.date}">
                            <input type="hidden" name="is_admin_edit" value="${isEditing ? 'true' : 'false'}">

                            <h3 class="h5 mb-3 fw-bold">Students in Class (Check to mark Present)</h3>
                            ${readOnlyMessage}
                            ${noStudentsMessage}
                            <ul class="list-group mb-4">
                                ${studentsHtml}
                            </ul>
                            ${submitButton}
                        </form>
                    </div>
                </div>
            </main>
        </div>
        <a href="/logout" class="btn fixed-logout-btn">Logout</a>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `);
}

// Attendance Admin Edit Content (Admin Role 1) - NEW
function attendance_admin_edit_content(res, user, classList, msg = '') {
    const classOptions = classList.map(c => 
        `<option value="${c.class_id}">${c.class_name} (${c.class_id})</option>`
    ).join('');
    
    // Disable form if no classes exist
    const isDisabled = classList.length === 0 ? 'disabled' : '';

    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit Attendance (Admin)</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="src/dashboard.css" rel="stylesheet">
    </head>
    <body>
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
            <div class="offcanvas-header">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Admin Panel</h5>
            </div>
            <div class="offcanvas-body d-flex flex-column p-0">
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/view_students">📘 View Students</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/view_faculty">👨‍🏫 View Faculty</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/new_user">➕ Create New User</a></li>
                    <li class="nav-item"><a class="nav-link active" href="/admin/edit_attendance">✍️ Edit Attendance</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/custom_msg">💬 Create Custom Message</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/create_class">🏫 Create Class/Batch</a></li>
                    <li class="nav-item"><a class="nav-link" href="/admin/assign_faculty">📌 Assign Faculty</a></li>
                </ul>
                <div class="sidebar-footer">
                    <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                    <a href="/logout" class="btn btn-logout w-100">Logout</a>
                </div>
            </div>
        </div>

        <div class="page-wrapper">
            <nav class="top-navbar d-flex align-items-center">
                <div class="d-flex align-items-center navbar-toggle-content">
                    <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">☰</button>
                    <span class="navbar-brand">Admin Panel</span>
                </div>
            </nav>

            <main class="main-content">
                <h1 class="mb-4 gradient-text">Edit Past Attendance</h1>
                ${msg ? `<div class="alert alert-info">${msg}</div>` : ''}

                <div class="card info-card">
                    <div class="card-body">
                        <h3 class="h5 mb-3 fw-bold">Select Attendance Record to Edit</h3>
                        <form action="/attendance/select_students" method="GET">
                            <input type="hidden" name="admin_edit" value="true">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="class_id" class="form-label">Class/Activity</label>
                                    <select class="form-control" id="class_id" name="class_id" required ${isDisabled}>
                                        <option value="">-- Select Class --</option>
                                        ${classOptions}
                                    </select>
                                    ${classList.length === 0 ? '<small class="text-danger">No classes/activities found.</small>' : ''}
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="slot" class="form-label">Slot (1-3)</label>
                                    <select class="form-control" id="slot" name="slot" required ${isDisabled}>
                                        <option value="">-- Select Slot --</option>
                                        <option value="1">Slot 1</option>
                                        <option value="2">Slot 2</option>
                                        <option value="3">Slot 3</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="date" class="form-label">Date</label>
                                    <input type="date" class="form-control" id="date" name="date" value="${new Date().toISOString().substring(0, 10)}" required ${isDisabled}>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-profile w-100" ${isDisabled}>Load Students for Edit</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
        <a href="/logout" class="btn fixed-logout-btn">Logout</a>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            const sidebar = document.getElementById('offcanvasSidebar');
            const wrapper = document.querySelector('.page-wrapper');
            sidebar.addEventListener('show.bs.offcanvas', () => { wrapper.classList.add('toggled'); });
            sidebar.addEventListener('hide.bs.offcanvas', () => { wrapper.classList.remove('toggled'); });
        </script>
    </body>
    </html>
    `);
}


//404 content
const content404 =
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 - Page Not Found</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="src/home.css" rel="stylesheet">
</head>
<body>

  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">Institute Management System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/About">About</a></li>
          <li class="nav-item"><a class="nav-link" href="/Contact">Contact</a></li>
		  <li class="nav-item"><a class="nav-link" href="/Login">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero text-center py-5 flex-grow-1 d-flex align-items-center">
    <div class="container">
      <h1 class="fw-bold mb-3 display-1">404</h1>
      <h2 class="mb-3">Page Not Found</h2>
      <p class="lead text-muted mb-4">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <a href="/" class="btn btn-gradient px-4 py-2">Go Back Home</a>
    </div>
  </section>

  <footer class="text-center py-3">
    Powered by Aarav Programmers | © 2025 Institute Manager
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;
module.exports = { homecontent , login_screen , admincontent , studentcontent , facultycontent , clubcontent , attendance_view_content , attendance_take_content, attendance_student_list_content, attendance_admin_edit_content , content404 };