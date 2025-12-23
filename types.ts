
export enum UserRole {
  ADMIN = 'ADMIN',
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT'
}

export enum Priority {
  URGENT = 'Urgent',
  ACADEMIC = 'Academic',
  EVENT = 'Event',
  GENERAL = 'General'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionCode: string;
  avatar: string;
  department?: string;
  studentId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  postedBy: string;
  date: string;
  deadline?: string;
  isRead: boolean;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  category: 'Assignment' | 'Exam' | 'Submission';
}

export interface ClassSession {
  id: string;
  subject: string;
  time: string;
  room: string;
  instructor: string;
  link?: string;
  day: string;
}

export interface PerformanceMetric {
  subject: string;
  score: number;
  average: number;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  dueDate: string;
  fine: number;
  status: 'Issued' | 'Overdue';
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  registered: boolean;
  description: string;
  image: string;
}

export interface Material {
  id: string;
  subject: string;
  title: string;
  type: 'PDF' | 'Slides' | 'Notes';
  uploadedBy: string;
  date: string;
  url: string;
}
