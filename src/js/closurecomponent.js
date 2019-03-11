const components = components || {};
var $;

components.toDoList = (function(name) {
  'use strict';

  let defaultOptions = {
    name: '',
  };

  let _createTaskElement = function(entry) {
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
  };

  let ToDoList = function(name) {
    /** @param {{Element}} */
    this.el = document.querySelector(`[data-list=${name}]`);

    /** @param {{Element}} */
    this.input = this.el.querySelector('#new-task');

    /** @param {{Element}} */
    this.addButton = this.el.querySelector('#add-button');

    /** @param {{Element}} */
    this.list = this.el.querySelector('.task-list');

    this.addTask = function(entry) {
      if (entry.length > 0 && typeof entry != 'undefined') {
        let taskItem = _createTaskElement(entry);
        this.list.appendChild(taskItem);
      }
    };

    this.addTaskFromInput = function() {
      this.addTask(this.input.value);
      this.input.value = null;
    };

    this.initEventListeners = function() {
      let instance = this;
  
      instance.addButton.addEventListener('click', function(e) {
        e.preventDefault();
        instance.addTaskFromInput();
      });
      instance.input.addEventListener('keyup', function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
          instance.addTaskFromInput();
        }
      });
  
      instance.list.addEventListener('click', function(e) {
        if (e.target.matches('.delete > *')) {
          instance.deleteTask(e.target.closest('.task-item'));
        } else if (e.target.matches('.task-item')) {
          instance.toggleCompleted(e.target);
        }
      });
    };
  
    this.init = function() {
      this.initEventListeners();
    };

  };

  ToDoList.prototype.createTaskElement = function(entry) {
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
  };
  
  ToDoList.prototype.deleteTask = function(taskItem) {
    let containingList = taskItem.closest('.task-list');
    containingList.removeChild(taskItem);
  };
  
  ToDoList.prototype.toggleCompleted = function(taskItem) {
    taskItem.classList.toggle('completed');
  };

  return new ToDoList(name).init();
})();
