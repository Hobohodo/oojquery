
var $;
//only run after document is loaded
$(document).ready(function () {
  //input elements, used to add tasks below
  var taskInput = document.getElementById('new-task');
  var addButton = document.getElementById('add-button');

  //Where the tasks live, used to assign complete/delete event handlers
  var incompleteTaskHolder = document.getElementById('incomplete-tasks');


  /**
   * This method isn't needed by the page, can we make it private?
   * @param entry {string}
   * @returns {HTMLElement}
   */
  var createTaskElement = function (entry) {
    var listItem = document.createElement('li');
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


  /**
   * Move the value from the task input to the list and clear the input
   */
  var addTask = function () {
    var listItem = createTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem);

    taskInput.value = '';
  };

  var deleteTask = function (event) {
    //Prevent the normal toggleComplete event from firing
    event.stopPropagation();

    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
  };

  addButton.addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
  });
  /**
   * Fire event when 'enter' is pressed
   */
  taskInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      addTask();
    }
  });


  var bindTaskEvents = function (taskListItem) {
    var deleteButton = taskListItem.querySelector('span.delete');

    //change completed status
    taskListItem.addEventListener('click', function(event) {
      event.target.classList.toggle('completed');
    });

    //Bind deleteTask to delete button.
    deleteButton.addEventListener('click', deleteTask);
  };

  //add events to tasks that exist on page load
  for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i]);
  }
});
