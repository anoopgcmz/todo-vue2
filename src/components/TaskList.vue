<!-- components/TaskList.vue -->
<template>
    <div class="task-list">
        <button @click="clearAllTasks" v-if="tasks.length" class="clear-all-button">
            Clear All Tasks
        </button>
        <div v-for="task in sortedTasks" :key="task.id" class="task-item" :class="task.priority">
            <div class="task-content">
                <span>{{ task.description }} - <strong>{{ task.priority }}</strong></span>
                <div class="button-group">
                    <button @click="editTask(task)" class="custom-button">Edit</button>
                    <button @click="deleteTask(task.id)" class="custom-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["tasks"],
    computed: {
        sortedTasks() {
            return [...this.tasks].sort((a, b) => {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        },
    },
    methods: {
        deleteTask(id) {
            const tasks = this.tasks.filter((task) => task.id !== id);
            this.$emit("update-tasks", tasks);
        },
        editTask(task) {
            console.log(">>>>>", task);
            this.$emit("edit-task", task);
        },
        clearAllTasks() {
            if (confirm("Are you sure you want to clear all tasks?")) {
                this.$emit("clear-all");
            }
        },
    },
};
</script>

<style>
.task-list {
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
}

.task-item {
  display: flex; /* Aligns child elements horizontally */
  justify-content: space-between; /* Creates space between text and buttons */
  align-items: center; /* Aligns items vertically in the center */
  padding: 8px;
  border-bottom: 1px solid #ddd;
  margin: 2px;
}

.task-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}


.task-item.high {
    background-color: red;
    color: white;
}

.task-item.medium {
    background-color: orange;
    color: white;
}

.task-item.low {
    background-color: yellow;
    color: black;
}


.button-group {
  margin-left: auto; /* Ensures buttons stay on the right */
}

.custom-button {
  margin-left: 8px; /* Adds some space between the buttons */
}

.custom-button:hover {
    background-color: #0056b3;
}

.clear-all-button {
    margin-bottom: 15px;
    padding: 8px 12px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.clear-all-button:hover {
    background-color: #cc0000;
}
</style>
