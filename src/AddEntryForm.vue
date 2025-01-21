<template>
    <div class="add-entry-form">
      <h2>Add New Entry</h2>
      <form @submit.prevent="addEntry">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="number" v-model="age" required />
        </div>
        <button type="submit" class="btn-submit">Add Entry</button>
      </form>
      <p class="view-entries">
        <router-link to="/entries">View Entries</router-link>
      </p>
      <button @click="navigateBack" class="btn-back">Back</button>
    </div>
  </template>
  
  <script>
  import { addEntry } from "../src/services/Api";
  
  export default {
    data() {
      return {
        name: "",
        age: null,
      };
    },
    methods: {
      async addEntry() {
        await addEntry({ name: this.name, age: this.age });
        alert("Entry added successfully!");
        this.name = "";
        this.age = null;
      },
      navigateBack() {
        this.$router.go(-1); // Navigates to the previous page
      },
    },
  };
  </script>
  
  <style scoped>
  .add-entry-form {
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
    font-family: 'Courier New', Courier, monospace;
  }
  
  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    color: #000000;
    
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 85%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
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
    font-family: 'Courier New', Courier, monospace;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  
  .view-entries {
    text-align: center;
    margin-top: 15px;
    font-family: 'Courier New', Courier, monospace;
  }
  
  

  .router-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .router-link:hover {
    text-decoration: underline;
  }
  
  .btn-back {
    width: 50%;
    padding: 10px;
    background-color: #6c757d;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  </style>
  