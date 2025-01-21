<template>
    <div class="login-form">
      <h2 v-if="isRegistering">Register</h2>
      <h2 v-else>Login</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" required />
          <p v-if="emailError" class="error">{{ emailError }}</p>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>
        <button type="submit" class="btn-submit">{{ isRegistering ? 'Register' : 'Login' }}</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
  
      <p class="toggle-text">
        {{ isRegistering ? 'Already have an account?' : "Don't have an account?" }}
        <a href="#" @click="toggleMode">{{ isRegistering ? 'Login' : 'Register' }}</a>
      </p>
    </div>
  </template>
  
  <script>
  import { loginUser, registerUser } from "../src/services/Api";
  import { useRouter } from "vue-router";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
        isRegistering: false, // Determines whether the form is for login or registration
      };
    },
  
    watch: {
      email(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = emailPattern.test(value) ? "" : "Please enter a valid email.";
      },
      password(value) {
        this.passwordError = value.length >= 8 ? "" : "Password must be at least 8 characters long.";
      },
    },
  
    setup() {
      const router = useRouter();
      return { router };
    },
  
    methods: {
      toggleMode() {
        this.isRegistering = !this.isRegistering;
        this.errorMessage = "";
        this.email = "";
        this.password = "";
      },
      async handleSubmit() {
        try {
          if (this.isRegistering) {
            const response = await registerUser(this.email, this.password);
            alert(response.message);
            this.toggleMode(); // Switch to login mode after successful registration
          } else {
            const response = await loginUser(this.email, this.password);
            alert(response.message);
            this.router.push("/add-entry"); // Redirect to Add Entry page after login
          }
        } catch (error) {
          this.errorMessage = error.response?.data?.message || "An error occurred.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    color: #000307;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
 .form-group input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    justify-content: center;
  }
  
  .btn-submit {
    width: 80%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  
  .toggle-text {
    text-align: center;
    margin-top: 15px;
    color: #000307;
    font-family: 'Courier New', Courier, monospace;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  