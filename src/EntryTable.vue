<template>
    <div class="entry-table">
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in paginatedEntries" :key="entry.id">
            <td>{{ entry.id }}</td>
            <td v-if="editingEntry !== entry.id">
              {{ entry.name }}
            </td>
            <td v-if="editingEntry === entry.id">
              <input v-model="editName" />
            </td>
            <td v-if="editingEntry !== entry.id">
              {{ entry.age }}
            </td>
            <td v-if="editingEntry === entry.id">
              <input v-model="editAge" type="number" />
            </td>
            <td>
              <button v-if="editingEntry !== entry.id" class="btn-edit" @click="startEdit(entry)">Edit</button>
              <button v-if="editingEntry === entry.id" class="btn-save" @click="saveEdit(entry.id)">Save</button>
              <button class="btn-delete" @click="deleteEntry(entry.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button v-if="hasMoreEntries" class="btn-load-more" @click="loadMore">Load More</button>
      <button class="btn-back" @click="navigateBack">Back</button>
    </div>
  </template>
  
  <script>
  import { getEntries, deleteEntryById, updateEntry } from "../src/services/Api";
  import { useRouter } from "vue-router";
  
  export default {
    data() {
      return {
        entries: [],
        paginatedEntries: [],
        currentPage: 1,
        itemsPerPage: 3,
        editingEntry: null,
        editName: "",
        editAge: null,
      };
    },
    computed: {
      hasMoreEntries() {
        return this.currentPage * this.itemsPerPage < this.entries.length;
      },
    },
    async mounted() {
      this.entries = await getEntries();
      this.paginateEntries();
    },
    methods: {
      paginateEntries() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        this.paginatedEntries = this.entries.slice(0, end);
      },
      loadMore() {
        this.currentPage++;
        this.paginateEntries();
      },
      startEdit(entry) {
        this.editingEntry = entry.id;
        this.editName = entry.name;
        this.editAge = entry.age;
      },
      async saveEdit(id) {
        const updatedEntry = { name: this.editName, age: this.editAge };
        await updateEntry(id, updatedEntry);
  
        const index = this.entries.findIndex(entry => entry.id === id);
        this.entries[index] = { ...this.entries[index], ...updatedEntry };
  
        this.editingEntry = null;
        this.paginateEntries();
      },
      async deleteEntry(id) {
        await deleteEntryById(id);
        this.entries = this.entries.filter(entry => entry.id !== id);
        this.paginateEntries();
      },
      navigateBack() {
        this.$router.go(-1); // Navigates to the previous page
      },
    },
  };
  </script>
  
  <style scoped>
  .entry-table {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    color: #000102;
  }
  
  .styled-table th,
  .styled-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .styled-table th {
    background-color: #007bff;
    color: #fff;
  }
  
  .styled-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .styled-table tr:hover {
    background-color: #ddd;
  }
  
  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 12px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-edit {
    background-color: #ffc107;
    color: #fff;
  }
  
  .btn-edit:hover {
    background-color: #e0a800;
  }
  
  .btn-save {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-save:hover {
    background-color: #218838;
  }
  
  .btn-delete {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-delete:hover {
    background-color: #c82333;
  }
  
  .btn-load-more {
    background-color: #007bff;
    color: #fff;
    width: 100%;
  }
  
  .btn-load-more:hover {
    background-color: #0056b3;
  }
  
  .btn-back {
    background-color: #6c757d;
    color: #fff;
    width: 100%;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  </style>
  