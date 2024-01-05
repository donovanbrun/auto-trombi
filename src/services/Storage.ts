import Student from "@/models/Student";

export function getStudents(): Student[] {
    const students = localStorage.getItem('students');
    if (students) return JSON.parse(students);
    return [];
}

export function setStudents(students: Student[]) {
    localStorage.setItem('students', JSON.stringify(students));
}