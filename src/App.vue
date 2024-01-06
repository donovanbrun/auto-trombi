<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import StudentCard from './components/StudentCard.vue';
import StudentModal from './components/StudentModal.vue';
import Student from './models/Student';
import * as StudentService from './services/Storage';

defineComponent({
    components: {
        StudentCard,
    },
})

const students = ref<Student[]>(StudentService.getStudents());
students.value.sort((a, b) => a.name.localeCompare(b.name));
const selectedStudent = ref<Student>(new Student(0, '', '', '', '', ''));
const showModal = ref(false);
const editMode = ref(false);
const search = ref('');

const open = () => {
    selectedStudent.value = new Student(0, '', '', '', '', '');
    showModal.value = true;
}

const close = () => {
    selectedStudent.value = new Student(0, '', '', '', '', '');
    showModal.value = false;
    editMode.value = false;
}

const edit = (student: Student) => {
    selectedStudent.value = Object.assign({}, student);
    showModal.value = true;
    editMode.value = true;
}

const addStudent = () => {
    const student = selectedStudent.value;
    if (student) {
        student.id = Math.random() * Number.MAX_SAFE_INTEGER;
        students.value.push(student);
        StudentService.setStudents(students.value);
    }
    close();
}

const editStudent = () => {
    const student = selectedStudent.value;
    if (student) {
        const index = students.value.findIndex(s => s.id === student.id);
        students.value[index] = student;
        StudentService.setStudents(students.value);
    }
    close();
}

const onSearch = (event: any) => {
    search.value = event.target.value;
    if (search.value === '') {
        students.value = StudentService.getStudents();
        students.value.sort((a, b) => a.name.localeCompare(b.name));
        return;
    }
    students.value = StudentService.getStudents().filter(s => s.name.toLowerCase().includes(search.value.toLowerCase()) || s.surname.toLowerCase().includes(search.value.toLowerCase()));
    students.value.sort((a, b) => a.name.localeCompare(b.name));
}

</script>

<template>
    <div class="header">
        <h1>Auto-trombi</h1>
        <input type="text" placeholder="Search..." :value="search" v-on:change="onSearch" />
        <button @click="open()">Add</button>
    </div>
    <div class="list">
        <StudentCard v-for="student in students" :key="student.id" :student="student" :edit="edit" />
    </div>
    <StudentModal :show="showModal" :close="close" :edit-mode="editMode" :student="selectedStudent" :add="addStudent"
        :edit="editStudent" />
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

h1 {
    color: white;
    font-family: 'Roboto Light 300', sans-serif;
}

input {
    width: 20rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: white;
    color: var(--light-blue);
    font-weight: bold;
    font-family: 'Roboto Light 300', sans-serif;
    font-size: 1rem;
}

input::placeholder {
    color: var(--light-blue);
}

input:focus {
    outline: var(--green) auto 1px;
}

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 1rem;
}

button {
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    border: none;
    background-color: white;
    box-shadow: var(--green) 0 0 0.5rem;
    color: var(--light-blue);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease-in, transform 0.2s ease-in;
    font-family: 'Roboto Light 300', sans-serif;
}

button:hover {
    background-color: var(--green);
    transform: scale(1.1);
}
</style>