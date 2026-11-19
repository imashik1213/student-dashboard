export const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};

export const facultyCredentials = {
  username: 'faculty',
  password: 'faculty123',
};

export const initialFaculties = [
  {
    id: 'FAC001',
    employeeId: 'FAC001',
    name: 'Dr. Priya Menon',
    username: 'faculty',
    password: 'faculty123',
    department: 'Computer Science & Engineering',
    email: 'priya.menon@MSAJCEA.edu',
    phone: '+91 98410 22145',
    designation: 'Associate Professor',
    isActive: true,
  },
];

const seedStudent = {
  password: 'student123',
  isActive: true,
  id: '21CS1048',
  registerNumber: '21CS1048',
  name: 'Arjun Kumar',
  firstName: 'Arjun',
  department: 'Computer Science & Engineering',
  shortDepartment: 'CSE',
  year: 'III Year',
  semester: '6th Semester',
  academicYear: '2025 - 2026',
  dob: '18 March 2004',
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  email: 'arjun.kumar@MSAJCEA.edu',
  address: '24, Green Avenue, Anna Nagar, Chennai - 600040',
  fatherName: 'R. Kumar',
  emergencyContact: '+91 94440 81920',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85',
  validity: 'Jun 2026',
  overallAttendance: 87,
  cgpa: 8.72,
  sgpa: 9.18,
  subjectsCount: 6,
  unreadNotifications: 4,
  status: 'active',
  college: {
    name: 'Mohamed Sathak AJ College of Engineering and Architecture',
    shortName: 'MSAJCEA',
    address: '12 College Road, Chennai, Tamil Nadu - 600025',
    phone: '+91 44 2456 7800',
    email: 'admin@msajcea.edu',
  },
};

export const initialStudents = [seedStudent];

export const student = seedStudent;

export const attendance = [
  { code: 'CS601', name: 'Computer Networks', working: 42, present: 38, percentage: 90 },
  { code: 'CS602', name: 'Operating Systems', working: 40, present: 35, percentage: 88 },
  { code: 'CS603', name: 'Database Management', working: 38, present: 34, percentage: 89 },
  { code: 'CS604', name: 'Machine Learning', working: 36, present: 29, percentage: 81 },
  { code: 'CS605', name: 'Software Engineering', working: 34, present: 28, percentage: 82 },
  { code: 'CS606', name: 'Professional Ethics', working: 30, present: 27, percentage: 90 },
];

export const results = [
  { code: 'CS501', name: 'Design and Analysis of Algorithms', internal: 43, semester: 81, total: 124, grade: 'A+' },
  { code: 'CS502', name: 'Database Management Systems', internal: 45, semester: 78, total: 123, grade: 'A+' },
  { code: 'CS503', name: 'Computer Networks', internal: 41, semester: 76, total: 117, grade: 'A' },
  { code: 'CS504', name: 'Operating Systems', internal: 44, semester: 84, total: 128, grade: 'O' },
  { code: 'CS505', name: 'Machine Learning', internal: 42, semester: 79, total: 121, grade: 'A+' },
  { code: 'CS506', name: 'Software Engineering', internal: 40, semester: 73, total: 113, grade: 'A' },
];

export const timetable = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Computer Networks', faculty: 'Dr. Priya Menon', room: 'CSE-302' },
    { time: '10:15 - 11:15', subject: 'Operating Systems', faculty: 'Prof. Rajesh Iyer', room: 'CSE-204' },
    { time: '11:30 - 12:30', subject: 'Database Management', faculty: 'Dr. Anita Rao', room: 'CSE-301' },
    { time: '14:00 - 16:00', subject: 'Machine Learning Lab', faculty: 'Prof. S. Karthik', room: 'LAB-04' },
  ],
  Tuesday: [
    { time: '09:00 - 10:00', subject: 'Machine Learning', faculty: 'Prof. S. Karthik', room: 'CSE-305' },
    { time: '10:15 - 11:15', subject: 'Software Engineering', faculty: 'Dr. Kavitha Singh', room: 'CSE-207' },
    { time: '11:30 - 12:30', subject: 'Professional Ethics', faculty: 'Prof. Daniel Jose', room: 'A-102' },
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'Database Management', faculty: 'Dr. Anita Rao', room: 'CSE-301' },
    { time: '10:15 - 12:15', subject: 'Networks Laboratory', faculty: 'Dr. Priya Menon', room: 'LAB-02' },
    { time: '14:00 - 15:00', subject: 'Computer Networks', faculty: 'Dr. Priya Menon', room: 'CSE-302' },
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'Operating Systems', faculty: 'Prof. Rajesh Iyer', room: 'CSE-204' },
    { time: '10:15 - 11:15', subject: 'Machine Learning', faculty: 'Prof. S. Karthik', room: 'CSE-305' },
    { time: '11:30 - 12:30', subject: 'Mentoring Hour', faculty: 'Dr. Anita Rao', room: 'CSE-301' },
  ],
  Friday: [
    { time: '09:00 - 11:00', subject: 'DBMS Laboratory', faculty: 'Dr. Anita Rao', room: 'LAB-01' },
    { time: '11:30 - 12:30', subject: 'Software Engineering', faculty: 'Dr. Kavitha Singh', room: 'CSE-207' },
    { time: '14:00 - 15:00', subject: 'Placement Training', faculty: 'Prof. Nisha Varma', room: 'Auditorium' },
  ],
};

export const notifications = [
  { id: 1, category: 'Exams', title: 'Semester examination schedule released', message: 'The 6th semester timetable is available in the examination portal. Hall tickets will be issued on 22 Nov.', date: '18 Nov 2026', read: false, type: 'warning' },
  { id: 2, category: 'Attendance', title: 'Attendance below 85% in Machine Learning', message: 'Your current Machine Learning attendance is 81%. Attend upcoming classes to meet the minimum requirement.', date: '17 Nov 2026', read: false, type: 'error' },
  { id: 3, category: 'Announcement', title: 'National Technical Symposium registration', message: 'Registrations for TechNova 2026 are open. Register through the campus activities office before 30 Nov.', date: '15 Nov 2026', read: false, type: 'primary' },
  { id: 4, category: 'Exams', title: 'Internal assessment II marks published', message: 'Internal assessment II marks for all 6th semester subjects have been published.', date: '13 Nov 2026', read: false, type: 'success' },
  { id: 5, category: 'Announcement', title: 'Campus library extended hours', message: 'The central library will remain open until 9:00 PM during the examination preparation period.', date: '10 Nov 2026', read: true, type: 'primary' },
];
