
import { UserRole, Priority, User, Announcement, Task, ClassSession, PerformanceMetric, LibraryBook, CampusEvent, Material } from './types';

export const INSTITUTION_CODE = "VITB";

export const MOCK_USER: User = {
  id: "ST101",
  name: "Alex Johnson",
  email: "alex.j@vitb.edu.in",
  role: UserRole.STUDENT,
  institutionCode: INSTITUTION_CODE,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  department: "Computer Science",
  studentId: "2023CSE015"
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Mid-Term Examination Schedule Released",
    content: "The mid-term exams for Semester 4 start from October 15th. Check the portal for your specific timetable. Attendance above 75% is mandatory for hall ticket issuance.",
    priority: Priority.URGENT,
    postedBy: "Registrar Office",
    date: "2024-09-20",
    deadline: "2024-10-15",
    isRead: false
  },
  {
    id: "ann-2",
    title: "Google Career Launchpad Placement Drive",
    content: "Google is visiting VITB for 2025 graduates. Interested students must register by Friday evening (Sept 22). Venue: Seminar Hall A.",
    priority: Priority.ACADEMIC,
    postedBy: "Placement Cell",
    date: "2024-09-18",
    deadline: "2024-09-22",
    isRead: false
  },
  {
    id: "ann-3",
    title: "Annual Tech Fest: Innovate 2024",
    content: "Registrations are open for the flagship technical symposium of VITB. Hackathons, workshops and project expos.",
    priority: Priority.EVENT,
    postedBy: "Student Council",
    date: "2024-09-15",
    isRead: true
  },
  {
    id: "ann-4",
    title: "Library Maintenance Notice",
    content: "The central library will be closed this Sunday for digital inventory updates.",
    priority: Priority.GENERAL,
    postedBy: "Librarian",
    date: "2024-09-12",
    isRead: true
  }
];

export const MOCK_TASKS: Task[] = [
  { id: "t1", title: "ML Assignment 2", dueDate: "2024-09-25", status: 'Pending', category: 'Assignment' },
  { id: "t2", title: "Project Proposal Draft", dueDate: "2024-09-28", status: 'Pending', category: 'Submission' },
  { id: "t3", title: "Web Dev Lab Viva", dueDate: "2024-09-21", status: 'Completed', category: 'Exam' }
];

export const MOCK_SCHEDULE: ClassSession[] = [
  { id: "c1", subject: "Machine Learning", time: "09:00 AM - 10:30 AM", room: "LT-402", instructor: "Dr. Ramesh Kumar", day: "Monday" },
  { id: "c2", subject: "Compiler Design", time: "10:45 AM - 12:15 PM", room: "Online (Teams)", instructor: "Prof. Sarah Chen", link: "https://teams.microsoft.com/l/meetup/...", day: "Monday" },
  { id: "c3", subject: "Database Systems", time: "02:00 PM - 03:30 PM", room: "Lab-2", instructor: "Dr. Anita Sharma", day: "Monday" },
  { id: "c4", subject: "Operating Systems", time: "09:00 AM - 10:30 AM", room: "LT-101", instructor: "Dr. V. Prasad", day: "Tuesday" },
  { id: "c5", subject: "Aptitude Training", time: "11:00 AM - 01:00 PM", room: "Auditorium", instructor: "Placement Cell", day: "Tuesday" }
];

export const MOCK_PERFORMANCE: PerformanceMetric[] = [
  { subject: "Algorithm Design", score: 85, average: 72 },
  { subject: "Computer Networks", score: 78, average: 65 },
  { subject: "Operating Systems", score: 92, average: 80 },
  { subject: "Cloud Computing", score: 88, average: 75 }
];

export const MOCK_LIBRARY: LibraryBook[] = [
  { id: "b1", title: "Clean Code", author: "Robert C. Martin", dueDate: "2024-09-22", fine: 0, status: 'Issued' },
  { id: "b2", title: "Introduction to Algorithms", author: "Cormen", dueDate: "2024-09-10", fine: 120, status: 'Overdue' },
  { id: "b3", title: "React Design Patterns", author: "A. Freeman", dueDate: "2024-10-05", fine: 0, status: 'Issued' }
];

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: "e1",
    title: "AI & Future Seminar",
    organizer: "ACM Student Chapter",
    date: "2024-10-02",
    time: "4:00 PM",
    location: "Main Auditorium",
    registered: false,
    description: "Deep dive into the world of Generative AI with industry experts.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "e2",
    title: "Inter-College Cricket Finals",
    organizer: "Sports Club",
    date: "2024-09-28",
    time: "10:00 AM",
    location: "Sports Ground",
    registered: true,
    description: "VITB vs SRM-K. Support our team!",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "e3",
    title: "Eco-Drive Plantation",
    organizer: "Nature Club",
    date: "2024-10-10",
    time: "08:00 AM",
    location: "Campus Garden",
    registered: false,
    description: "Helping green the campus, one sapling at a time.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
  }
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', subject: 'Machine Learning', title: 'Lecture 1: Intro to Neural Networks', type: 'PDF', uploadedBy: 'Dr. Ramesh Kumar', date: '2024-09-15', url: '#' },
  { id: 'm2', subject: 'Machine Learning', title: 'Assignment 1 Guidelines', type: 'PDF', uploadedBy: 'Dr. Ramesh Kumar', date: '2024-09-18', url: '#' },
  { id: 'm3', subject: 'Compiler Design', title: 'Lexical Analysis Slides', type: 'Slides', uploadedBy: 'Prof. Sarah Chen', date: '2024-09-10', url: '#' },
  { id: 'm4', subject: 'Operating Systems', title: 'Process Management Notes', type: 'Notes', uploadedBy: 'Dr. V. Prasad', date: '2024-09-22', url: '#' },
  { id: 'm5', subject: 'Database Systems', title: 'SQL Practice Sheet', type: 'PDF', uploadedBy: 'Dr. Anita Sharma', date: '2024-09-20', url: '#' },
];
