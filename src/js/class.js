'use strict';

class ToDoList {
  constructor(name) {
    /** @param {{Element}} */
    this.el = document.querySelector(`[data-list=${name}]`);

    /** @param {{Element}} */
    this.input = this.el.querySelector('#new-task');

    /** @param {{Element}} */
    this.addButton = this.el.querySelector('#add-button');

    /** @param {{Element}} */
    this.list = this.el.querySelector('.task-list');

    this.initEventListeners();
  }

  addTask() {
    let instance = this;
    if (instance.input.value.length == 0) {
      return alert('no task entered into todo list');
    }
    instance.list.appendChild(instance.createTaskElement(instance.input.value));
    instance.input.value = null;
  }

  initEventListeners() {
    let instance = this;
    instance.addButton.addEventListener('click', function (e) {
      e.preventDefault();
      instance.addTask();
    });
    instance.input.addEventListener('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        instance.addTask();
      }
    });
    instance.list.addEventListener('click', function (e) {
      if (e.target.matches('.delete > *')) {
        instance.deleteTask(e.target.closest('.task-item'));
      }
      else if (e.target.matches('.task-item')) {
        instance.toggleCompleted(e.target);
      }
    });
  }

  createTaskElement(entry) {
    let listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.innerText = entry;
    var deleteSpan = document.createElement('span');
    deleteSpan.className = 'delete';
    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    listItem.appendChild(deleteSpan);
    deleteSpan.appendChild(deleteIcon);

    return listItem;
  }

  deleteTask(taskItem) {
    let containingList = taskItem.closest('.task-list');
    containingList.removeChild(taskItem);
  }

  toggleCompleted(taskItem) {
    taskItem.classList.toggle('completed');
  }
}

export default ToDoList;