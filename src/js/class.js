'use strict';

/**
 * This constant isn't exported and so can't be accessed from outside.
 * @type {{createTaskElement(string): HTMLElement}}
 */
const privateMethods = {
  /**
   * @param entry {string}
   * @returns {HTMLElement}
   */
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
};


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

    //regression, event listener assigning is public
    this.initEventListeners();
  }

  addTask(entry) {
    if (entry.length > 0 && typeof entry != 'undefined') {
      let taskItem = privateMethods.createTaskElement(entry);
      this.list.appendChild(taskItem);
    }
  }

  addTaskFromInput() {
    let instance = this;
    instance.addTask(instance.input.value);
    instance.input.value = null;
  }

  /**
   * This method should probably be private, it's not needed by users of the ToDoList
   */
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

  deleteTask(taskItem) {
    let containingList = taskItem.closest('.task-list');
    containingList.removeChild(taskItem);
  }

  toggleCompleted(taskItem) {
    taskItem.classList.toggle('completed');
  }
}

export default ToDoList;
