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

student.value.picture = student.value.picture || '/blank.png';
</script>

<template>
    <div class="card">
        <button class="edit-button" @click="edit"><img src="../assets/icon/edit.png" width="20px" /></button>
        <img :src="student.picture" width="200px" height="200px" class="profile-picture">
        <div class="info">
            <h2>{{ student.lastname }} {{ student.firstname }}</h2>
            <p>{{ student.company }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    background-color: var(--dark-blue);
    padding: 1rem;
    width: fit-content;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem #868686;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    animation: scaleAnimation 0.5s ease-out;
}

.card:hover {
    box-shadow: 0 0 0.5rem #fff;
    opacity: 1;
}

@keyframes scaleAnimation {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

.info {
    padding: 0.5rem;
    text-align: center;
}

h2,
p {
    color: white;
    font-family: 'Roboto Light 300', sans-serif;
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
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
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
    background-color: var(--green);
    cursor: pointer;
}

.profile-picture {
    border-radius: 0.7rem;
}
</style>