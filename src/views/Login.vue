<template>
  <div class="login-container">
    <div class="left-section">
      <img src="/assets/img/login/circle.png" alt="Background Circle" class="circle-img" />
      <img src="/assets/img/login/acad-img.png" alt="Login Illustration" class="illustration" />
    </div>
    <div class="right-section">
      <div class="login-box">
        <img src="/assets/img/login/sta-rita-logo.png" alt="School Logo" class="school-logo" />
        <h2>Sta. Rita Highschool</h2>
        <p>Record Keeping Management System</p>

        <form @submit.prevent="login">
          <div class="input-group">
            <input type="email" v-model="email" placeholder="Enter Domain Address" required />
            <label>Email Domain</label>
          </div>

          <div class="input-group">
            <div class="password-field">
              <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter Password"
                required />
              <label>Password</label>
              <span @click="togglePassword" class="toggle-password">
                <img :src="showPassword ? '/assets/img/login/iconoir_eye.png' : '/assets/img/login/iconoir_closed.png'"
                  alt="Toggle Password Visibility" class="eye-icon" />
              </span>
            </div>
          </div>

          <div class="options">
            <div class="remember-me">
              <input type="checkbox" v-model="rememberMe" id="remember" class="check-box" />
              <p>Remember me</p>
            </div>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" class="login-btn">Login</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        <p class="version">v1.0</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { loginTeacher } from '../service/authService.js';
import teachersData from '../data/teachers.json';

const router = useRouter();
const emit = defineEmits(['logged-in']);

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const errorMessage = ref('');

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  errorMessage.value = '';

  // Superadmin check
  const superadmin = teachersData.superadmin?.find(
    sa => sa.username === email.value && sa.password === password.value
  );

  if (superadmin) {
    const superAdminCredentials = {
      superadmin_ID: superadmin.superadmin_ID,
      username: superadmin.username,
      firstName: superadmin.firstName,
      lastName: superadmin.lastName,
      middleName: superadmin.middleName || '',
      isAdmin: true,
      isSuperAdmin: true
    };
    localStorage.setItem('user', JSON.stringify(superAdminCredentials));
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('isSuperAdmin', 'true');
    localStorage.setItem('superadminID', superadmin.superadmin_ID);

    emit('logged-in', superAdminCredentials);
    router.push('/superadmin/dashboard'); // Ensure this route exists
    return;
  }

  // Admin check
  const admin = teachersData.admin?.find(
    a => a.username === email.value && a.password === password.value
  );

  if (admin) {
    const adminCredentials = {
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
      middleName: admin.middleName || '',
      isAdmin: true,
      isSuperAdmin: false
    };
    localStorage.setItem('user', JSON.stringify(adminCredentials));
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('isSuperAdmin', 'false');

    emit('logged-in', adminCredentials);
    router.push('/admin/dashboard');
    return;
  }

  // Teacher check
  try {
    const data = await loginTeacher(email.value, password.value);

    const teacherCredentials = {
      teacher_ID: data.teacher_ID,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      employeeNo: data.employeeNo || '',
      contactNumber: data.contactNumber || '',
      address: data.address || '',
      position: data.position || '',
      education: data.education || '',
      research: data.research || [],
      avatar: data.avatar || null,
      isAdmin: false,
      isSuperAdmin: false
    };

    localStorage.setItem('user', JSON.stringify(teacherCredentials));
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isSuperAdmin', 'false');
    localStorage.setItem('teacherID', data.teacher_ID);
    localStorage.setItem('token', data.token);

    emit('logged-in', teacherCredentials);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error || 'Invalid email or password.';
  }
};
</script>



<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  margin-left: -20px;
  background-color: #547fad;
  overflow: hidden;
}

.left-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  position: relative;
  overflow: hidden;
}

.circle-img {
  position: absolute;
  height: 620px;
  width: 620px;
  left: -150px;
  /* top: 20px;  */
  z-index: 1;
  animation: circleAnimation 3s forwards;
}

@keyframes circleAnimation {
  from {
    opacity: 0;
    transform: scale(0.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.illustration {
  width: 75%;
  z-index: 10;
  animation: slideInFromLeft 2s ease-out forwards;
}

.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
  min-width: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.login-box {
  text-align: center;
  width: 450px;
  padding: 30px;
  border: 5px;
}

.school-logo {
  display: block;
  margin: 0 auto 10px auto;
  width: 150px;
}

h2 {
  color: #295f98;
  font-weight: 500;
  margin: 0;
}

p {
  color: #295f98;
  font-weight: 500;
  margin: 0 0 30px 0;
}

label {
  display: block;
  text-align: left;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-field {
  position: relative;
  width: 100%;
}

.input-group {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.input-group label {
  position: absolute;
  top: -15px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 12px;
  color: #295f98;
}

.input-group input,
.password-field input {
  width: 100%;
  padding: 15px;
  border: 1px solid #295f98;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: #fff;
  box-sizing: border-box;
}

.input-group input::placeholder {
  font-size: 12px;
  color: #aaa;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: -30px;
  margin-top: -30px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.remember-me p {
  margin-top: 28px;
  font-weight: 400;
}

.check-box {
  margin: 0;
}

.forgot-password {
  color: #295f98;
  text-decoration: none;
  white-space: nowrap;
}

.login-btn {
  width: 100%;
  background-color: #295f98;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.version {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>