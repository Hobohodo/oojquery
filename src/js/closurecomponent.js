const components = {};

components.toDoList = (function() {
  'use strict';

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

  //The effective constructor. Event listeners are assigned here because you shouldn't call them again.
  function _initList(name) {
    let list = new ToDoList(name);

    list.addButton.addEventListener('click', function(e) {
      e.preventDefault();
      list.addTaskFromInput();
    });
    list.input.addEventListener('keyup', function(e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        list.addTaskFromInput();
      }
    });

    list.list.addEventListener('click', function(e) {
      if (e.target.matches('.delete > *')) {
        list.deleteTask(e.target.closest('.task-item'));
      } else if (e.target.matches('.task-item')) {
        list.toggleCompleted(e.target);
      }
    });
    return list;
  }

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

  };
  
  ToDoList.prototype.deleteTask = function(taskItem) {
    let containingList = taskItem.closest('.task-list');
    containingList.removeChild(taskItem);
  };
  
  ToDoList.prototype.toggleCompleted = function(taskItem) {
    taskItem.classList.toggle('completed');
  };

  return function(name) {
    return _initList(name);
  };
})();
