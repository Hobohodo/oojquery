var $;

let ToDoList = function(name) {

  /** @param {{Element}} */
  this.el = document.querySelector(`[data-list=${name}]`);

  /** @param {{Element}} */
  this.input = this.el.querySelector('#new-task');

  /** @param {{Element}} */
  this.addButton = this.el.querySelector('#add-button');

  /** @param {{Element}} */
  this.list = this.el.querySelector('.task-list');

  this.addTask = function() {
    let instance = this;

    if(instance.input.value.length == 0) {
      alert('no task entered into todo list');
    }

    instance.list.appendChild(instance.createTaskElement(instance.input.value));

    instance.input.value = null;
  };

  this.initEventListeners = function() {
    let instance = this;
  
    instance.addButton.addEventListener('click', function(e) {
      e.preventDefault();
      instance.addTask();
    });
    instance.input.addEventListener('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        instance.addTask();
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
  listItem.innerText = entry;

  var deleteSpan = document.createElement('span');
  deleteSpan.className = 'delete';

  var deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash');

  listItem.appendChild(deleteSpan);
  deleteSpan.appendChild(deleteIcon);

  return listItem;
};

$(document).ready(function() {
  new ToDoList('existing').init();
});