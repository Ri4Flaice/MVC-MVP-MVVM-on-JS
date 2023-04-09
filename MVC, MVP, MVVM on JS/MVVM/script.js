class Task__List {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }
}

class Task__View__Model {
    constructor(model) {
        this.model = model;
        this.tasks = ko.observableArray([]);
        this.newTask = ko.observable('');
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.updateTasks();
    }

    addTask() {
        const task = this.newTask().trim();
        if (task !== '') {
            this.model.addTask(task);
            this.updateTasks();
            this.newTask('');
        }
    }

    removeTask(task) {
        const index = this.tasks().indexOf(task);
        if (index !== -1) {
            this.model.removeTask(index);
            this.updateTasks();
        }
    }
    
    updateTasks() {
        this.tasks(this.model.tasks);
    }
}

const model = new Task__List();
const viewModel = new Task__View__Model(model);
ko.applyBindings(viewModel, document.getElementById('todo-list'));