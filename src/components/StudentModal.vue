<template>
    <div class="modal" v-if="show" @click="(e) => closeModal(e)">
        <div class="modal-content">
            <div class="header">
                <button @click="close()" class="close-button">X</button>
                <h1 v-if="editMode">Edit student</h1>
                <h1 v-else>Add student</h1>
            </div>
            <div class="form">
                <div class="section">
                    <h2>Student</h2>
                    <div class="input-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" v-model="student!.name" />
                        <label for="surname">Surname</label>
                        <input type="text" id="surname" v-model="student!.surname" />
                    </div>
                    <div>
                        <p>Picture</p>
                        <div class="drop-zone" @dragover.prevent @dragenter.prevent @dragleave="dragging = false"
                            @drop.prevent="(e: any) => handleDrop(e, 'profile')" :class="{ 'drag-over': dragging }">
                            <p v-if="!student!.img">Drop an image</p>
                            <img v-if="student!.img" :src="student!.img" id="image" alt="Image preview" width="200px" />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h2>Company</h2>
                    <div class="input-group">
                        <label for="company">Name</label>
                        <input type="text" id="company" v-model="student!.company" />
                    </div>
                    <div>
                        <p>Logo</p>
                        <div class="drop-zone" @dragover.prevent @dragenter.prevent @dragleave="dragging = false"
                            @drop.prevent="(e: any) => handleDrop(e, 'company')" :class="{ 'drag-over': dragging }">
                            <p v-if="!student!.companyLogo">Drop an image</p>
                            <img v-if="student!.companyLogo" :src="student!.companyLogo" id="image" alt="Image preview"
                                width="200px" />
                        </div>
                    </div>
                </div>

            </div>
            <button v-if="editMode" @click="edit()">Save</button>
            <button v-else @click="add()">Add</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import Student from '../models/Student';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    close: {
        type: Function,
        required: true
    },
    editMode: {
        type: Boolean,
        required: true
    },
    student: {
        type: Student,
        required: true
    },
    add: {
        type: Function,
        required: true
    },
    edit: {
        type: Function,
        required: true
    }
})


const show = toRef(props, 'show');
const close = () => props.close();
const editMode = toRef(props, 'editMode');
const student = toRef(props, 'student');
const add = () => props.add();
const edit = () => props.edit();

const closeModal = (event: any) => {
    if (event.target.classList.contains('modal')) {
        close()
    }
}

const dragging = ref(false);

const handleDrop = (event: any, type: string) => {
    dragging.value = false;

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        previewImage(file, type);
    }
}

const previewImage = (file: any, type: string) => {
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.result && student.value)
            if (type === 'company')
                student.value.companyLogo = reader.result.toString();
            else
                student.value.img = reader.result.toString();
    };

    reader.readAsDataURL(file);
}
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    width: 80%;
    min-height: 30%;
    max-height: 95vh;
    border-radius: 20px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
    width: 0px;
}

h1,
h2,
p,
label {
    font-family: 'Roboto Light 300', sans-serif;
}

.header {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #021f43;
    color: white;
    border-radius: 20px 20px 0px 0px;
    padding: 10px 0px;
}

.form {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    gap: 50px;
    flex-wrap: wrap;
}

.section {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #021f43;
}

button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #021f43;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.close-button {
    position: absolute;
    right: 25px;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.close-button:hover {
    transform: scale(1.1);
    color: red;
}

.drop-zone {
    border: 2px dashed #ccc;
    margin-top: 5px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.drag-over {
    background-color: #f0f8ff;
}
</style>