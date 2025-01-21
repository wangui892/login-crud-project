import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../LoginForm.vue";
import AddEntryForm from "../AddEntryForm.vue";
import EntryTable from "../EntryTable.vue";

const routes = [
  { path: "/", name: "Login", component: LoginForm },
  { path: "/add-entry", name: "AddEntry", component: AddEntryForm },
  { path: "/entries", name: "Entries", component: EntryTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;