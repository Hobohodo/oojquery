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

  addTask(entry) {
    if (entry.length > 0 && typeof entry != 'undefined') {
      let taskItem = this.createTaskElement(entry);
      this.list.appendChild(taskItem);
    }
  }

  addTaskFromInput() {
    let instance = this;
    instance.addTask(instance.input.value);
    instance.input.value = null;
  }

  initEventListeners() {
    let instance = this;
    instance.addButton.addEventListener('click', function (e) {
      e.preventDefault();
      instance.addTaskFromInput();
    });
    instance.input.addEventListener('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        instance.addTaskFromInput();
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