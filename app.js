const { homecontent, login_screen, admincontent, studentcontent , facultycontent, clubcontent, attendance_view_content, attendance_take_content, attendance_student_list_content, attendance_admin_edit_content, content404 } = require("./script/content");
const { profile } = require("./script/profile");
//-------------------------------------------Dependencies--------------------------------------------------------------//
const { exec } = require("child_process");
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/src", express.static(path.join(__dirname, "src"), {
  dotfiles: "deny",
  index: false,
  fallthrough: false
}));

//-------------------------------------------DB Config--------------------------------------------------------------//
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

//-------------------------------------------Key Functions--------------------------------------------------------------//
function generateKey(length = 50) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

async function createUniqueKey() {
  const conn = await getConnection();
  let unique = false, newKey = "";

  while (!unique) {
    newKey = generateKey();
    const [rows] = await conn.execute("SELECT sk FROM userx WHERE sk = ? LIMIT 1", [newKey]);
    if (rows.length === 0) unique = true;
  }
  await conn.end();
  return newKey;
}

//-------------------------------------------Login and Security--------------------------------------------------------------//
async function login_check(req, res, next) {
  try {
    const sk = req.cookies.sk;
    if (!sk) {
      return res.redirect("/Login?msg=3");
    }

    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM userx WHERE sk = ?", [sk]);

    if (rows.length === 0) {
      await conn.end();
      return res.redirect("/Login?msg=1");
    }

    const user = rows[0];

    if (!user.id) {
      await conn.execute("DELETE FROM userx WHERE sk = ?", [sk]);
      await conn.end();
      return res.redirect("/Login?msg=2");
    }

    if (!user.rolex) {
      await conn.execute("UPDATE userx SET rolex='2' WHERE sk=? AND id=?", [sk, user.id]);
      user.rolex = "2";
    }

    req.user = user;
    await conn.end();
    return next();
  } catch (err) {
    console.error("Login check error:", err);
    if (!res.headersSent) {
      return res.status(500).send("Internal server error");
    }
  }
}

function role_check(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(String(req.user.rolex))) {
            return res.redirect("/dashboard");
        }
        next();
    };
}


//-------------------------------------------Routes--------------------------------------------------------------//
app.get("/", async (req, res) => {
  return res.send(homecontent);
});

// Login Page
app.get("/Login", async (req, res) => {
  const sk = req.cookies.sk;
  if (sk) {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM userx WHERE sk = ?", [sk]);
    await conn.end();
    if (rows.length > 0) return res.redirect("/dashboard");
  }
  const msg = parseInt(req.query.msg) || 0;
  return login_screen(res, msg);
});

// Login POST
app.post("/loginx", async (req, res) => {
  const { id, pass } = req.body;
  const conn = await getConnection();

  const [rows] = await conn.execute("SELECT * FROM userx WHERE id = ? AND pass = ?", [id, pass]);

  if (rows.length === 0) {
    await conn.end();
    return res.redirect("/Login?msg=4");
  }

  const key = await createUniqueKey();
  await conn.execute("UPDATE userx SET sk=? WHERE id=?", [key, id]);
  await conn.end();

  res.cookie("sk", key, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "strict"
  });
  return res.redirect("/dashboard");
});

// Dashboard
app.get("/dashboard", login_check, (req, res) => {

  switch (String(req.user.rolex)) {
    case "1": // Admin
      return admincontent(res, req.user);
    case "2": // Student
      return studentcontent(res, req.user);
    case "3": // Faculty
      return facultycontent(res, req.user);
    case "4": // Staff (No change for staff yet)
      return res.send(`
        <html>
          <head><title>Staff Dashboard</title></head>
          <body>
            <h2>Welcome, ${req.user.namex || "Staff"} (${req.user.id})</h2>
            <p>Email: ${req.user.email}</p>
            <h3>Staff Dashboard</h3>
            <p><a href="/logout">Logout</a></p>
          </body>
        </html>
      `);
    case "5": // Club
      return clubcontent(res, req.user);
    default:
      return res.redirect("/logout");
  }
});

// Logout
app.get("/logout", async (req, res) => {
  const sk = req.cookies.sk;
  const { m } = req.query; 
  if (sk) {
    const conn = await getConnection();
    await conn.execute("UPDATE userx SET sk=NULL WHERE sk=?", [sk]);
    await conn.end();
  }

  res.clearCookie("sk", { httpOnly: true, secure: false, sameSite: "strict" });
  if (m == 1) { // Use == because query parameters are strings
    return res.redirect("/Login?msg=6");
  }
  return res.redirect("/Login?msg=5");
});

// --------------------------- Profile --------------------------- //

// View Profile
app.get("/profile", login_check, async (req, res) => {
  const m = req.query.m;
  return profile(res , req.user, m);
});

// Update Profile (name + email only)
app.post("/edit_profile", login_check, async (req, res) => {
  const sk = req.cookies.sk;
  const { namex , last_name , email } = req.body;

  try {
	if (namex=="" || last_name=="" || email=="")
	{
		return res.redirect("/profile?m=1");
	}
    const conn = await getConnection();
    await conn.execute("UPDATE userx SET namex=?, last_name=?, email=? WHERE sk=?", [namex, last_name, email, sk]);
    await conn.end();
	return res.redirect("/profile?m=2");
  } catch (err) {
    console.error("Profile update error:", err);
    return res.redirect("/404-NotFound");
  }
});

// Change Password
app.post("/change_password", login_check, async (req, res) => {
  const sk = req.cookies.sk;
  const { oldpass, newpass, confirmpass } = req.body;

  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT pass FROM userx WHERE sk=?", [sk]);

    if (rows.length === 0) {
      await conn.end();
      return res.redirect("/logout");
    }
	
    if (newpass !== confirmpass) {
      await conn.end();
      return res.redirect("/profile?m=4");
    }

    if (rows[0].pass !== oldpass) {
      await conn.end();
      return res.redirect("/profile?m=3");
    }

    await conn.execute("UPDATE userx SET pass=? WHERE sk=?", [newpass, sk]);
    await conn.end();

    return res.redirect("/logout?m=1");
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).send("Error changing password");
  }
});


// --------------------------- Attendance Routes --------------------------- //

// Student: View Attendance (Role 2)
app.get("/student/view_attendance", login_check, role_check(['2']), async (req, res) => {
    try {
        const studentId = req.user.id;
        const conn = await getConnection();
        
        const [attendanceRecords] = await conn.execute(
            `SELECT 
                a.attendance_date, 
                a.slot, 
                a.is_present, 
                c.class_name 
             FROM attendance a
             JOIN classx c ON a.class_id = c.class_id
             WHERE a.student_id = ?
             ORDER BY a.attendance_date DESC, a.slot DESC`, 
            [studentId]
        );
        
        await conn.end();
        return attendance_view_content(res, req.user, attendanceRecords);

    } catch (err) {
        console.error("Student View Attendance Error:", err);
        return res.status(500).send("Error loading attendance data.");
    }
});


// Faculty: Take Attendance (Role 3) - Selection Form
app.get("/faculty/take_attendance", login_check, role_check(['3']), async (req, res) => {
    try {
        const facultyId = req.user.id;
        const conn = await getConnection();
        
        // Fetch classes assigned to this faculty
        const [classes] = await conn.execute(
            "SELECT class_id, class_name FROM classx WHERE faculty_id = ?", 
            [facultyId]
        );
        
        await conn.end();
        let msg = req.query.msg ? (req.query.msg === '1' ? 'Attendance saved successfully!' : 'Error saving attendance.') : '';
        
        // Handle case where faculty is not assigned any classes
        if (classes.length === 0) {
             msg = "No classes are currently assigned to you. Please contact the administrator.";
        }
        
        return attendance_take_content(res, req.user, classes, msg, true); // true for isFaculty

    } catch (err) {
        console.error("Faculty Take Attendance Form Error:", err);
        return res.status(500).send("Error loading faculty classes.");
    }
});

// Club: Take Attendance (Role 5) - Selection Form
app.get("/club/take_attendance", login_check, role_check(['5']), async (req, res) => {
    try {
        const clubId = req.user.id;
        const conn = await getConnection();
        
        // Fetch activities managed by this club
        const [classes] = await conn.execute(
            "SELECT class_id, class_name FROM classx WHERE club_id = ?", 
            [clubId]
        );
        
        await conn.end();
        let msg = req.query.msg ? (req.query.msg === '1' ? 'Attendance saved successfully!' : 'Error saving attendance.') : '';
        
        // Handle case where club manager is not assigned any activities
        if (classes.length === 0) {
             msg = "No club activities are currently assigned to you. Please contact the administrator.";
        }
        
        return attendance_take_content(res, req.user, classes, msg, false); // false for isFaculty (i.e. isClub)

    } catch (err) {
        console.error("Club Take Attendance Form Error:", err);
        return res.status(500).send("Error loading club activities.");
    }
});


// Admin: Edit Attendance (Role 1) - Selection Form
app.get("/admin/edit_attendance", login_check, role_check(['1']), async (req, res) => {
    try {
        const conn = await getConnection();
        
        // Admin can edit any class/activity
        const [classes] = await conn.execute(
            "SELECT class_id, class_name FROM classx"
        );
        
        await conn.end();
        let msg = req.query.msg ? (req.query.msg === '1' ? 'Attendance saved successfully!' : 'Error saving attendance.') : '';
        
        if (classes.length === 0) {
            msg = "No classes or activities exist in the system to edit.";
        }
        
        // Renders the selection form with all classes
        return attendance_admin_edit_content(res, req.user, classes, msg);

    } catch (err) {
        console.error("Admin Edit Attendance Form Error:", err);
        return res.status(500).send("Error loading classes for admin edit.");
    }
});


// All Roles (Faculty/Club/Admin): Load Student List for Marking
app.get("/attendance/select_students", login_check, role_check(['1', '3', '5']), async (req, res) => {
    const { class_id, slot, date, admin_edit, role } = req.query;
    const userId = req.user.id;
    const userRole = String(req.user.rolex);

    // 1. Basic Validation
    if (!class_id || !slot || !date || !['1', '2', '3'].includes(slot)) {
        return res.status(400).send("Invalid class, slot, or date parameters.");
    }

    try {
        const conn = await getConnection();

        // 2. Authorization Check (Prevent non-admins from accessing unauthorized classes or future dates)
        const [classRows] = await conn.execute("SELECT class_id, class_name, faculty_id, club_id FROM classx WHERE class_id = ?", [class_id]);
        if (classRows.length === 0) {
            await conn.end();
            return res.status(404).send("Class not found.");
        }
        const classInfo = classRows[0];
        
        let isAuthorized = false;
        if (userRole === '1') { // Admin is always authorized
            isAuthorized = true;
        } else if (userRole === '3' && String(classInfo.faculty_id) === String(userId)) { // Faculty authorized for their class
            isAuthorized = true;
        } else if (userRole === '5' && String(classInfo.club_id) === String(userId)) { // Club authorized for their activity
            isAuthorized = true;
        }

        // Additional non-admin security check: restrict date to current or past day
        const today = new Date().toISOString().substring(0, 10);
        if (userRole !== '1' && date > today) {
            await conn.end();
            return res.status(403).send("Faculty/Club cannot take attendance for future dates.");
        }

        if (!isAuthorized) {
            await conn.end();
            return res.status(403).send("Unauthorized access to this class/activity's attendance.");
        }

        // 3. Fetch Students enrolled in the class
        const [studentRows] = await conn.execute(
            `SELECT u.id, u.namex, u.last_name 
             FROM userx u
             JOIN enrollment e ON u.id = e.student_id
             WHERE e.class_id = ? 
             ORDER BY u.last_name, u.namex`, 
            [class_id]
        );

        // 4. Fetch existing Attendance Records for this class/slot/date
        const [attendanceRecords] = await conn.execute(
            `SELECT student_id, is_present FROM attendance WHERE class_id = ? AND slot = ? AND attendance_date = ?`, 
            [class_id, slot, date]
        );
        
        await conn.end();

        const data = {
            class_id: class_id,
            class_name: classInfo.class_name,
            slot: slot,
            date: date
        };
        
        // Check if no students are enrolled
        if (studentRows.length === 0) {
            return attendance_student_list_content(res, req.user, data, studentRows, attendanceRecords, "No students are currently enrolled in this class/activity. Cannot record attendance.");
        }


        return attendance_student_list_content(res, req.user, data, studentRows, attendanceRecords);

    } catch (err) {
        console.error("Load Students Error:", err);
        return res.status(500).send("Error loading student data.");
    }
});


// All Roles (Faculty/Club/Admin): POST Route to Record/Update Attendance
app.post("/attendance/record", login_check, role_check(['1', '3', '5']), async (req, res) => {
    const { class_id, slot, date, present_students, is_admin_edit } = req.body;
    const userId = req.user.id;
    const userRole = String(req.user.rolex);

    // 1. Basic Validation
    if (!class_id || !slot || !date || !['1', '2', '3'].includes(slot)) {
        return res.status(400).send("Invalid attendance data.");
    }

    let conn;
    try {
        conn = await getConnection();

        // 2. Authorization Check (Re-check authorization and non-admin date restriction)
        const [classRows] = await conn.execute("SELECT faculty_id, club_id FROM classx WHERE class_id = ?", [class_id]);
        if (classRows.length === 0) {
            await conn.end();
            return res.status(404).send("Class not found.");
        }
        const classInfo = classRows[0];

        let isAuthorized = false;
        if (userRole === '1') {
            isAuthorized = true;
        } else if (userRole === '3' && String(classInfo.faculty_id) === String(userId)) {
            isAuthorized = true;
        } else if (userRole === '5' && String(classInfo.club_id) === String(userId)) {
            isAuthorized = true;
        }

        // Additional non-admin security check: restrict date to current or past day, but for non-admin, must not be a day in the future.
        const today = new Date().toISOString().substring(0, 10);
        if (userRole !== '1' && date > today) {
             await conn.end();
            return res.status(403).send("Faculty/Club cannot record attendance for future dates.");
        }
        
        if (!isAuthorized) {
            await conn.end();
            return res.status(403).send("Unauthorized to record attendance for this class/activity.");
        }


        // 3. Get list of *all* enrolled student IDs
        const [enrolledStudents] = await conn.execute(
            `SELECT student_id FROM enrollment WHERE class_id = ?`, 
            [class_id]
        );

        // This correctly handles the case where present_students is an array, a single string, or undefined (no boxes checked)
        const presentStudentIds = Array.isArray(present_students) ? present_students.map(id => String(id)) : (present_students ? [String(present_students)] : []);
        const allStudentIds = enrolledStudents.map(row => String(row.student_id));

        await conn.beginTransaction();

        // 4. Process Attendance
        for (const studentId of allStudentIds) {
            const isPresent = presentStudentIds.includes(studentId);
            
            // Upsert logic: INSERT OR UPDATE
            await conn.execute(
                `INSERT INTO attendance (student_id, class_id, attendance_date, slot, is_present, recorded_by)
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE is_present = ?, recorded_by = ?`,
                [studentId, class_id, date, slot, isPresent, userId, isPresent, userId]
            );
        }

        await conn.commit();
        await conn.end();

        // 5. Redirect based on role and success
        if (userRole === '1' && is_admin_edit === 'true') {
            return res.redirect("/admin/edit_attendance?msg=1");
        } else if (userRole === '3') {
            return res.redirect("/faculty/take_attendance?msg=1");
        } else if (userRole === '5') {
            return res.redirect("/club/take_attendance?msg=1");
        }
        
        return res.redirect("/dashboard");

    } catch (err) {
        if (conn) await conn.rollback();
        console.error("Record Attendance Error:", err);
        // Redirect with error message
        if (userRole === '1') {
            return res.redirect("/admin/edit_attendance?msg=0");
        } else if (userRole === '3') {
            return res.redirect("/faculty/take_attendance?msg=0");
        } else if (userRole === '5') {
            return res.redirect("/club/take_attendance?msg=0");
        }
        return res.status(500).send("Error recording attendance.");
    }
});


//-------------------------------------------404 Handler--------------------------------------------------------------//
app.get("/404-NotFound", (req, res) => {
  return res.status(404).send(content404);
});

app.use((req, res) => {
  return res.redirect("/404-NotFound");
});

//-------------------------------------------Start Server--------------------------------------------------------------//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started http://127.0.0.1:${PORT}`);
  exec(`start http://127.0.0.1:${PORT}`);
});