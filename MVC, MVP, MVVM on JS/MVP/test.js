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

class Task__View {
    constructor() {
        this.addTaskInput = document.querySelector('#new-task-input');
        this.addTaskButton = document.querySelector('#add-task-button');
        this.taskList = document.querySelector('#task-list');
        this.taskTemplate = document.querySelector('#task-template');
    }

    bindAddTask(handler) {
        this.addTaskButton.addEventListener('click', () => {
            const task = this.addTaskInput.value.trim();
            if (task !== '') {
                handler(task);
                this.addTaskInput.value = '';
            }
        });
    }

    bindRemoveTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                const index = parseInt(event.target.parentNode.dataset.index);
                handler(index);
            }
        });
    }

    render(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const template = this.taskTemplate.content.cloneNode(true);
            template.querySelector('.task-name').textContent = task;
            template.querySelector('.delete-button').parentNode.dataset.index = index;
            this.taskList.appendChild(template);
        });
    }
}

class Task__Presenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindRemoveTask(this.handleRemoveTask);
        this.render();
    }

    handleAddTask = task => {
        this.model.addTask(task);
        this.render();
    }

    handleRemoveTask = index => {
        this.model.removeTask(index);
        this.render();
    }

    render() {
        this.view.render(this.model.tasks);
    }
}

const model = new Task__List();
const view = new Task__View();
const presenter = new Task__Presenter(model, view);
