import Student from "../models/Student";
import { raw } from "./RawData";

function generateStudents(): Student[] {
    return raw.map((student) => new Student(student?.id, student?.lastname, student?.firstname, student?.company, student?.picture, student?.companyLogo));
}

export function getStudents(): Student[] {
    const students = localStorage.getItem('students');
    if (students) return JSON.parse(students);
    else {
        const raw = generateStudents();
        setStudents(raw);
        return raw;
    }
}

export function setStudents(students: Student[]) {
    localStorage.setItem('students', JSON.stringify(students));
}