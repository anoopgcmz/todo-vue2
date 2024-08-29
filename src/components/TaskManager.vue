<!-- components/TaskManager.vue -->
<template>
  <div class="task-manager">
    <input v-model="description" placeholder="Add a new task" />
    <select v-model="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <button @click="selectedTask ? updateTask() : addTask()">
      {{ selectedTask ? 'Update Task' : 'Add Task' }}
    </button>
    <button v-if="selectedTask" @click="cancelEdit">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['selectedTask'],
  data() {
    return {
      description: this.selectedTask ? this.selectedTask.description : '',
      priority: this.selectedTask ? this.selectedTask.priority : 'medium'
    };
  },
  watch: {
    selectedTask(newTask) {
      // When a new task is selected for editing, update the local state
      if (newTask) {
        this.description = newTask.description;
        this.priority = newTask.priority;
      } else {
        this.clearForm();
      }
    }
  },
  methods: {
    addTask() {
      if (this.description.trim()) {
        const newTask = {
          id: Date.now(),
          description: this.description,
          priority: this.priority,
        };
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(newTask);
        this.$emit('update-tasks', tasks);
        this.clearForm();
      }else{
        alert('Please enter a task description');
      }
    },
    updateTask() {
      if (this.description.trim()) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === this.selectedTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex].description = this.description;
          tasks[taskIndex].priority = this.priority;
          this.$emit('update-tasks', tasks);
          this.clearForm();
        }
      }
    },
    cancelEdit() {
      this.clearForm();
      this.$emit('clear-selection');
    },
    clearForm() {
      this.description = '';
      this.priority = 'medium';
    }
  }
};
</script>

<style>
.task-manager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
}
input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
