'use strict';

const privateMethods = {
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
  },

  /**
   * This method takes a string and naively tries to create a bunch of html. Private because it's bad.
   * @param name {string}
   * @returns {HTMLElement}
   */
  render(name) {
    let container = document.createElement('section');
    container.classList.add('list-container');
    container.setAttribute('data-list', name);

    container.innerHTML += `
    <h3><label for='new-task'>${name}</label></h3>
    <section class="new-task">
      <input id="new-task" type="text">
      <button id="add-button">add</button>
    </section>
    <h3>Tasks</h3>
    <ul class="task-list"></ul>
    `;
    return container;
  }
};

class ToDoList {
  constructor(name) {

    /** @param {{Element}} */
    this.el = document.querySelector(`[data-list=${name}]`);

    //This check is naive and done to show an example of rendering html from js.
    if(this.el == null) {
      document.querySelector('body').append(privateMethods.render(name));
      this.el = document.querySelector(`[data-list=${name}]`);
    }

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
      let taskItem = privateMethods.createTaskElement(entry);
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

  deleteTask(taskItem) {
    let containingList = taskItem.closest('.task-list');
    containingList.removeChild(taskItem);
  }

  toggleCompleted(taskItem) {
    taskItem.classList.toggle('completed');
  }
}

/**
 * There is no export for this file because the consuming html page needs to be able to create ToDoLists
 * and I don't know how to do that using the module Import on such short notice.
 * @param name
 * @returns {ToDoList}
 */
function createToDoList(name) {
  return new ToDoList(name);
}

