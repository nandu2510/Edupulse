
import { UserRole, Priority, User, Announcement, Task, ClassSession, PerformanceMetric, LibraryBook, CampusEvent, Material, StudentRecord } from './types';

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

export const MOCK_FACULTY: User = {
  id: "FA202",
  name: "Dr. Sarah Chen",
  email: "s.chen@vitb.edu.in",
  role: UserRole.FACULTY,
  institutionCode: INSTITUTION_CODE,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  department: "Computer Science"
};

export const MOCK_STUDENT_RECORDS: StudentRecord[] = [
  { id: 'S01', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', attendance: 85, cgpa: 8.42, lastAssessment: 88, status: 'Excellent', department: 'CS' },
  { id: 'S02', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', attendance: 62, cgpa: 6.10, lastAssessment: 55, status: 'At Risk', department: 'CS' },
  { id: 'S03', name: 'Emily Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', attendance: 78, cgpa: 7.50, lastAssessment: 72, status: 'Average', department: 'CS' },
  { id: 'S04', name: 'Michael Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', attendance: 95, cgpa: 9.20, lastAssessment: 94, status: 'Excellent', department: 'CS' },
  { id: 'S05', name: 'Sophia Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia', attendance: 70, cgpa: 6.80, lastAssessment: 68, status: 'Average', department: 'CS' },
  { id: 'S06', name: 'David Clark', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', attendance: 45, cgpa: 5.20, lastAssessment: 42, status: 'At Risk', department: 'CS' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Mid-Term Examination Schedule Released",
    content: "The mid-term exams for Semester 4 start from October 15th. Check the portal for your specific timetable. Absence from mid-terms requires immediate medical proof submission.",
    priority: Priority.URGENT,
    postedBy: "Registrar Office",
    date: "2024-09-20",
    deadline: "2024-10-15",
    isRead: false
  },
  {
    id: "ann-2",
    title: "Google Career Launchpad Drive",
    content: "Google is visiting VITB for 2025 graduates. High GPA students in CS/IT are prioritized. Ensure your portfolio is up to date.",
    priority: Priority.ACADEMIC,
    postedBy: "Placement Cell",
    date: "2024-09-18",
    deadline: "2024-09-22",
    isRead: false
  },
  {
    id: "ann-3",
    title: "Hack-a-thon 2025 Registration Open",
    content: "Our annual developer challenge is live. Form teams of 3 and submit your problem statement by next week.",
    priority: Priority.EVENT,
    postedBy: "Dept. of Computer Science",
    date: "2024-10-01",
    deadline: "2024-10-10",
    isRead: false
  }
];

export const MOCK_TASKS: Task[] = [
  { id: "t1", title: "ML Assignment 2", dueDate: "2024-09-25", status: 'Pending', category: 'Assignment' },
  { id: "t2", title: "Project Proposal Draft", dueDate: "2024-09-28", status: 'Pending', category: 'Submission' },
  { id: "t3", title: "Web Dev Lab Viva", dueDate: "2024-09-21", status: 'Completed', category: 'Exam' },
  { id: "t4", title: "Ethics in Tech Essay", dueDate: "2024-10-05", status: 'Pending', category: 'Assignment' }
];

export const MOCK_SCHEDULE: ClassSession[] = [
  { id: "c1", subject: "Machine Learning", time: "09:00 AM - 10:30 AM", room: "LT-402", instructor: "Dr. Sarah Chen", day: "Monday" },
  { id: "c2", subject: "Compiler Design", time: "10:45 AM - 12:15 PM", room: "Online (Teams)", instructor: "Prof. Sarah Chen", link: "https://teams.microsoft.com/l/meetup/...", day: "Monday" },
  { id: "c3", subject: "Advanced AI", time: "02:00 PM - 03:30 PM", room: "LT-102", instructor: "Dr. Sarah Chen", day: "Tuesday" },
  { id: "c4", subject: "Discrete Maths", time: "09:00 AM - 10:30 AM", room: "LT-201", instructor: "Prof. Alan Turing", day: "Tuesday" },
];

export const MOCK_PERFORMANCE: PerformanceMetric[] = [
  { subject: "Algorithm Design", score: 85, average: 72 },
  { subject: "Computer Networks", score: 78, average: 65 },
  { subject: "Operating Systems", score: 92, average: 80 },
  { subject: "Linear Algebra", score: 88, average: 70 }
];

export const MOCK_LIBRARY: LibraryBook[] = [
  { id: "b1", title: "Clean Code", author: "Robert C. Martin", dueDate: "2024-09-22", fine: 0, status: 'Issued' },
  { id: "b2", title: "Deep Learning with Python", author: "Francois Chollet", dueDate: "2024-10-15", fine: 0, status: 'Issued' },
  { id: "b3", title: "The Pragmatic Programmer", author: "David Thomas", dueDate: "2024-11-01", fine: 0, status: 'Issued' }
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
    description: "Deep dive into the world of Generative AI and its institutional impact.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "e2",
    title: "Eco-Tech Fest",
    organizer: "Green Club",
    date: "2024-10-12",
    time: "10:00 AM",
    location: "North Grounds",
    registered: true,
    description: "Sustainable tech exhibition and circular economy workshops.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
  }
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', subject: 'Machine Learning', title: 'Lecture 1: Intro to NN', type: 'PDF', uploadedBy: 'Dr. Sarah Chen', date: '2024-09-15', url: '#' },
  { id: 'm2', subject: 'Compiler Design', title: 'Parse Tree Handouts', type: 'Notes', uploadedBy: 'Dr. Sarah Chen', date: '2024-09-20', url: '#' },
];
