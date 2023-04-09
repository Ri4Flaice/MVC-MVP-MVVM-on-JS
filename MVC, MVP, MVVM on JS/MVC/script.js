class Task__List {
    constructor() {
        this.tasks = [];
    }

    Task__add(task) {
        this.tasks.push(task);
    }

    Task__remove(index) {
        this.tasks.splice(index, 1);
    }
  }
  class Task__View {
        constructor() {
            this.addTaskForm = document.querySelector('#addTaskForm');
            this.newTaskInput = document.querySelector('#newTaskInput');
            this.taskList = document.querySelector('#taskList');
        }

        bindAddTask(handler) {
            this.addTaskForm.addEventListener('submit', event => {
                event.preventDefault();
                if (this.newTaskInput.value) {
                handler(this.newTaskInput.value);
                this.newTaskInput.value = '';
                }
            });
        }

        bindRemoveTask(handler) {
            this.taskList.addEventListener('click', event => {
                if (event.target.tagName.toLowerCase() === 'button') {
                const index = parseInt(event.target.parentElement.getAttribute('data-index'));
                handler(index);
                }
            });
        }

        Provide(tasks) {
            this.taskList.innerHTML = tasks.map((task, index) => `
                <li>
                    ${task}
                    <button type="button" data-index="${index}">Remove</button>
                </li>
            `).join('');
        }
}
class Task__Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindRemoveTask(this.handleRemoveTask);
    
        this.Provide();
    }

    handleAddTask = task => {
        this.model.Task__add(task);
        this.Provide();
    }

    handleRemoveTask = index => {
        this.model.Task__remove(index);
        this.Provide();
    }

    Provide() {
        this.view.Provide(this.model.tasks);
      }
}

const model = new Task__List();
const view = new Task__View();
const controller = new Task__Controller(model, view);