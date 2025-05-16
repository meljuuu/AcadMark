<template>

    <!-- Add Faculty Modal -->
    <transition name="modal-fade" @after-leave="emitClose">
      <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
        <div class="modal-content">
          <h2 class="modal-title">Add Faculty</h2>
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="form.firstName" required />
              </div>
              <div class="form-group">
                <label>Middle Name</label>
                <input type="text" v-model="form.middleName" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="form.lastName" required />
              </div>
              <div class="form-group">
                <label>Suffix</label>
                <input type="text" v-model="form.suffix" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label>Employee Number</label>
                <input type="text" v-model="form.employeeNumber" required />
              </div>
              <div class="form-group">
                <label>Educational Attainment</label>
                <input type="text" v-model="form.educationalAttainment" />
              </div>
              <div class="form-group">
                <label>Teaching Position</label>
                <input type="text" v-model="form.teachingPosition" required />
              </div>
              <div class="form-group">
                <label>Subject</label>
                <select v-model="form.subject" required>
                  <option disabled value="">Select a subject</option>
                  <option>Social Studies</option>
                  <option>English</option>
                  <option>Science</option>
                  <option>Mathematics</option>
                </select>
              </div>
            </div>
  
            <br />
            <h2 class="modal-title">Account Setup</h2>
  
            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="form.email" required />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="form.password" required />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="form.confirmPassword" required />
              </div>
            </div>
  
            <br />
            <h2 class="modal-title">Accession</h2>
  
            <div class="checkbox-group">
              <label><input type="checkbox" v-model="form.roles.teacher" /> Teacher</label>
              <label><input type="checkbox" v-model="form.roles.admin" /> Admin</label>
              <label><input type="checkbox" v-model="form.roles.recordKeeping" /> Record</label>
            </div>
  
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
              <button type="submit" class="submit-btn">Add</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  
  const emit = defineEmits(['close'])
  const showModal = ref(true)
  
  const form = reactive({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    employeeNumber: '',
    educationalAttainment: '',
    teachingPosition: '',
    subject: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: {
      teacher: false,
      admin: false,
      recordKeeping: false
    }
  })
  
  function submitForm() {
    console.log('Form submitted:', form)
  }
  
  function closeModal() {
    showModal.value = false
  }
  
  function emitClose() {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: white;
    padding: 20px 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 900px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
  }
  
  .modal-title {
    margin: 0 0 20px 0;
    font-weight: 700;
    font-size: 16px;
    text-align: left;
    color: #295f98;
  }
  
  .form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 12px;
  }
  
  input,
  select {
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .checkbox-group {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;
  }
  
  .submit-btn {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .cancel-btn {
    background-color: #6c757d;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .cancel-btn:hover {
    background-color: #5a6268;
  }
  
  /* Modal transition */
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
  