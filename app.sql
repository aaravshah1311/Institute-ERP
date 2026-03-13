DROP DATABASE user_managment;
CREATE DATABASE user_managment;
USE user_managment;

CREATE TABLE userx (
  id BIGINT UNIQUE,
  namex CHAR(50),
  last_name CHAR(50),
  email VARCHAR(100) UNIQUE,
  pass VARCHAR(50),
  rolex INT(2),
  dept INT(2),
  sk VARCHAR(55) UNIQUE
);

-- New Table: Classes/Activities (for both academic and club attendance)
CREATE TABLE classx (
    class_id INT PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    class_type ENUM('Academic', 'Club/Activity') NOT NULL,
    faculty_id BIGINT,
    club_id BIGINT,
    FOREIGN KEY (faculty_id) REFERENCES userx(id),
    FOREIGN KEY (club_id) REFERENCES userx(id)
);

-- New Table: Enrollment (Links Students to Classes/Activities)
CREATE TABLE enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES userx(id),
    FOREIGN KEY (class_id) REFERENCES classx(class_id),
    UNIQUE KEY unique_enrollment (student_id, class_id)
);

-- New Table: Attendance (Stores slot-wise records)
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    class_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    slot INT(1) NOT NULL CHECK (slot IN (1, 2, 3)),
    is_present BOOLEAN NOT NULL,
    recorded_by BIGINT, -- The user (Faculty/Club/Admin) who last recorded it
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES userx(id),
    FOREIGN KEY (class_id) REFERENCES classx(class_id),
    FOREIGN KEY (recorded_by) REFERENCES userx(id),
    UNIQUE KEY unique_attendance (student_id, class_id, attendance_date, slot)
);

-- Sample Data: Users (Admin, Faculty, Students, Club Manager)
INSERT INTO userx (id, namex, last_name, email, pass, rolex, dept)
VALUES 
    (249020307001, 'Aarav', 'Shah', 'aaravprogrammers@gmail.com', 'admin', 1, 1), -- Admin (Login: 249020307001 / admin)
    (1000, 'Dr.', 'Faculty', 'faculty@inst.com', 'pass', 3, 2), -- Faculty (Login: 1000 / pass)
    (2000, 'Student', 'One', 'student@inst.com', 'pass', 2, 2), -- Student 1 (Login: 2000 / pass)
    (3000, 'Student', 'Two', 'student2@inst.com', 'pass', 2, 2), -- Student 2 (Login: 3000 / pass)
    (5000, 'AI', 'Club', 'club@inst.com', 'pass', 5, 10); -- Club/Activity Manager (Login: 5000 / pass)

-- Sample Data: Class/Activity
INSERT INTO classx (class_id, class_name, class_type, faculty_id, club_id)
VALUES 
    (101, 'Advanced Node.js', 'Academic', 1000, NULL), -- Taught by Dr. Faculty
    (501, 'Robotics Workshop', 'Club/Activity', NULL, 5000); -- Managed by AI Club

-- Sample Data: Enrollment
INSERT INTO enrollment (student_id, class_id, enrollment_date)
VALUES 
    (2000, 101, CURDATE()), -- Student One in Node.js
    (2000, 501, CURDATE()), -- Student One in Robotics
    (3000, 101, CURDATE()); -- Student Two in Node.js

-- Sample Data: Attendance (Past Records)
INSERT INTO attendance (student_id, class_id, attendance_date, slot, is_present, recorded_by)
VALUES 
    (2000, 101, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 1, TRUE, 1000), -- 2 days ago, Slot 1: S-One Present
    (3000, 101, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 1, FALSE, 1000), -- 2 days ago, Slot 1: S-Two Absent
    (2000, 101, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 2, TRUE, 1000), -- 1 day ago, Slot 2: S-One Present
    (2000, 501, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 3, TRUE, 5000); -- 1 day ago, Slot 3: S-One Present in Club

select * from userx;
select * from classx;
select * from enrollment;
select * from attendance;