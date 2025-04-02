<template>
    <div class="profile-container">
        <!-- Left Section: Profile Card -->
        <div class="profile-card">
            <div class="avatar" @click="triggerFileInput">
                <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" accept="image/*" />
                <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" class="avatar-image" />
                <span v-else class="default-avatar"></span>
            </div>
            <h2 class="teacher-name">Teacher Robert!</h2>
            <h3 class="teacher-position">Teacher IV</h3>
        </div>

        <!-- Right Section: Profile Details -->
        <div class="profile-details">
            <table>
                <tr>
                    <th>Full Name:</th>
                    <td>
                        <input v-if="isEditingProfile" v-model="profile.fullName" type="text" class="edit-input" />
                        <span class="teacher-details" v-else>{{ profile.fullName }}</span>
                    </td>
                </tr>
                <tr>
                    <th>Employee No.:</th>
                    <td>
                        <input v-if="isEditingProfile" v-model="profile.employeeNo" type="text" class="edit-input" />
                        <span class="teacher-details" v-else>{{ profile.employeeNo }}</span>
                    </td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>
                        <input v-if="isEditingProfile" v-model="profile.email" type="email" class="edit-input" />
                        <span class="teacher-details" v-else>{{ profile.email }}</span>
                    </td>
                </tr>
                <tr>
                    <th>Phone Number:</th>
                    <td>
                        <input v-if="isEditingProfile" v-model="profile.phone" type="text" class="edit-input" />
                        <span class="teacher-details" v-else>{{ profile.phone }}</span>
                    </td>
                </tr>
                <tr>
                    <th>Address:</th>
                    <td>
                        <input v-if="isEditingProfile" v-model="profile.address" type="text" class="edit-input" />
                        <span class="teacher-details" v-else>{{ profile.address }}</span>
                    </td>
                </tr>
            </table>

            <!-- Edit Button for Profile Details -->
            <div class="button-container">
                <button class="edit-button" @click="toggleEditProfile">
                    {{ isEditingProfile ? 'Cancel' : 'Edit' }}
                </button>
                <button v-if="isEditingProfile" class="save-button" @click="saveProfile">Save</button>
            </div>
        </div>
    </div>

    <!-- Educational Attainment & Research Innovation Sections -->
    <div class="info-section">
        <div class="educ-info-card">
            <h3>Educational Attainment</h3>
            <div v-if="isEditingEducation">
                <textarea v-model="profile.education" class="edit-textarea"></textarea>
            </div>
            <p v-else >{{ profile.education }} </p>

            <!-- Edit Button for Education -->
            <div class="button-container">
                <button class="edit-button" @click="toggleEditEducation">
                    {{ isEditingEducation ? 'Cancel' : 'Edit' }}
                </button>
                <button v-if="isEditingEducation" class="save-button" @click="saveEducation">Save</button>
            </div>
        </div>

        <div class="research-info-card">
            <h3>Research Innovation</h3>
            <div v-if="isEditingResearch">
                <textarea v-model="profile.research" class="edit-textarea"></textarea>
            </div>
            <p v-else>{{ profile.research }}</p>

            <!-- Edit Button for Research -->
            <div class="button-container">
                <button class="edit-button" @click="toggleEditResearch">
                    {{ isEditingResearch ? 'Cancel' : 'Edit' }}
                </button>
                <button v-if="isEditingResearch" class="save-button" @click="saveResearch">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfilePage",
    data() {
        return {
            isEditingProfile: false,
            isEditingEducation: false,
            isEditingResearch: false,
            avatarSrc: null,
            profile: {
                fullName: "Robert L. Reyes",
                employeeNo: "126421941594134",
                email: "Teacher@gmail.com",
                phone: "092654848948",
                address: "12# street brgy something",
                education: "Bachelor of Science in Computer Science - Gordon College",
                research: "Developing a Smart Moving Dustbin for Automated Waste Collection"
            }
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.avatarSrc = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        toggleEditProfile() {
            this.isEditingProfile = !this.isEditingProfile;
        },
        saveProfile() {
            this.isEditingProfile = false;
            alert("Profile updated successfully!");
        },
        toggleEditEducation() {
            this.isEditingEducation = !this.isEditingEducation;
        },
        saveEducation() {
            this.isEditingEducation = false;
            alert("Educational Attainment updated successfully!");
        },
        toggleEditResearch() {
            this.isEditingResearch = !this.isEditingResearch;
        },
        saveResearch() {
            this.isEditingResearch = false;
            alert("Research Innovation updated successfully!");
        }
    }
};
</script>

<style scoped>
/* Layout */
.profile-container {
    display: flex;
    gap: 20px;
    margin-top: 140px;
    padding: 30px;
    align-items: flex-start;
}

.profile-card {
    width: 400px;
    height: 350px;
    border: 1px solid #E0E0E0;
    background: #F5F5F5;
    text-align: center;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* Avatar */
.avatar {
    width: 200px;
    height: 200px;
    background: #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 10px;
    cursor: pointer;
}

.default-avatar {
    font-size: 40px;
}

.avatar-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.teacher-name {
    color: #292929;
    font-size: 34px;
}

.teacher-position {
    color: #292929;
    font-size: 24px;
    font-weight: 600;
}

/* Profile Details */
.profile-details {
    flex: 1;
    border: 1px solid #E0E0E0;
    height: 350px;
    background: #F5F5F5;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.teacher-details {
    font-size: 20px;
    color: #292929;
}

table {
    width: 100%;
    border-collapse: collapse;
}

tr {
    border-bottom: 1px solid #E0E0E0;
}

th {
    text-align: left;
    padding: 10px;
    font-weight: bold;
    width: 30%;
    font-size: 20px;
}

.edit-input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

/* Education & Research Sections */
.info-section {
    display: flex;
    /* gap: 20px; */
    justify-content: center;
    margin-bottom: 30px;
}

.educ-info-card {
    width: 400px;
    height: 350px;
    border: 1px solid #E0E0E0;
    background: #F5F5F5;
    margin-right: 170px;
    margin-top: -10px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; 
    justify-content: space-between;
}

.educ-info-card h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}

.educ-info-card p {
    margin-bottom: 150px;
    font-size: 16px;
}

.research-info-card {
    border: 1px solid #E0E0E0;
    padding: 20px;
    border-radius: 5px;
}

.edit-textarea {
    width: 100%;
    padding: 6px;
    margin-bottom: 150px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

/* Buttons */
.edit-button {
    width: 115px;
    height: 30px;
    padding: 5px 20px;
    background: #0056b3;
    font-size: 12px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.edit-button:hover {
    background: #004494;
}

.save-button {
    width: 115px;
    height: 30px;
    padding: 5px 20px;
    background: #28a745;
    font-size: 12px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.save-button:hover {
    background: #218838;
}
</style>
