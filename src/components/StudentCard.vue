<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import Student from '../models/Student';

const props = defineProps({
    student: {
        type: Student,
        required: true
    },
    edit: {
        type: Function,
        required: true
    }
})

const { student } = toRefs(props);
const edit = () => props.edit(student.value);

student.value.img = student.value.img || '/blank.png';
</script>

<template>
    <div class="card">
        <button class="edit-button" @click="edit"><img src="../assets/icon/edit.png" width="20px" /></button>
        <img :src="student.img" width="200px" class="profile-picture">
        <h2>{{ student.name }} {{ student.surname }}</h2>
        <p>{{ student.company }}</p>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    background-color: #36b5d7;
    padding: 1rem;
    width: fit-content;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem #aaa;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.edit-button {
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    border-radius: 50%;
    border: none;
    background-color: white;
    color: white;
    font-weight: bold;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    width: 32px;
    height: 32px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card:hover .edit-button {
    opacity: 0.8;
    transform: translate(-50%, 0) scale(1.2);
}

.edit-button:hover {
    background-color: #b2c92d;
    cursor: pointer;
}

.profile-picture {
    border-radius: 0.7rem;
}
</style>