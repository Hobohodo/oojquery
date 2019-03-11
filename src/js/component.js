'use strict';

let ToDoList = function(name) {
  /** @param {{Element}} */
  this.el = document.querySelector(`[data-list=${name}]`);

  /** @param {{Element}} */
  this.input = this.el.querySelector('#new-task');

  /** @param {{Element}} */
  this.addButton = this.el.querySelector('#add-button');

  /** @param {{Element}} */
  this.list = this.el.querySelector('.task-list');

  /**
   * Add a task to the list
   * @param entry {string}
   */
  this.addTask = function(entry) {
    if (entry.length > 0 && typeof entry != 'undefined') {
      let taskItem = this.createTaskElement(entry);
      this.list.appendChild(taskItem);
    }
  };

  /**
   * Clear the value from the input and add it to the list
   */
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

    /**
     * Use delegated events to avoid refreshing them every time the list content changes.
     */
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

/**
 * Prototype methods are inherited by any variable of the given type, and so could be given to objects
 * that aren't necessarily ToDoLists.
 * 'this' in a prototype method refers to the object calling it.
 */
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
