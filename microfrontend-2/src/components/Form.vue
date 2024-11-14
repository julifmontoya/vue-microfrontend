<script setup>
import { reactive } from "vue";

// Create a reactive data object to store form values
const formData = reactive({
  email: "",
  name: "",
  address: "",
  message: "",
});

const onSubmit = () => {
  console.log("Form submitted!", formData);
  // Reset each property to an empty string
  formData.email = "";
  formData.name = "";
  formData.address = "";
  formData.message = "";
};
</script>

<template>
  <div class="form-container">
    <h2>MicroFrontEnd #2</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-15">
        <label for="email" class="label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="formData.email"
        />
      </div>

      <div class="mb-15">
        <label for="name" class="label">Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="formData.name"
        />
      </div>

      <div class="mb-15">
        <label for="address" class="label">Address</label>
        <input
          type="text"
          id="address"
          class="form-control"
          v-model="formData.address"
        />
      </div>

      <div class="mb-15">
        <label for="message" class="label">Message</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="formData.message"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Send</button>
    </form>
    <br />
    {{ formData }}
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 8px;
}

h2 {
  text-align: center;
}

.mb-15 {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  font-weight: 500;
  padding: 10px;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 1px 0 #007bff;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
