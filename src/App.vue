<!-- App.vue -->
<template>
  <div class="app">
    <TaskManager :selectedTask="selectedTask" @update-tasks="updateTasksList" @clear-selection="clearSelection" />
    <TaskList :tasks="tasks" @update-tasks="updateTasksList" @clear-all="clearAllTasks" @edit-task="editTask" />
  </div>
</template>

<script>
import TaskManager from './components/TaskManager.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskManager,
    TaskList
  },
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      selectedTask: null // Track selected task for editing
    };
  },
  methods: {
    updateTasksList(tasks) {
      this.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    clearAllTasks() {
      this.tasks = [];
      localStorage.removeItem('tasks');
    },
    editTask(task) {
      this.selectedTask = task;
    },
    clearSelection() {
      this.selectedTask = null;
    }
  }
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  margin: 0 auto; /* Center horizontally */
  width: 50%; /* Set width to 50% */
}

</style>
