
var $;

$(document).ready(function () {
  var taskInput = document.getElementById('new-task');
  var addButton = document.getElementById('add-button');
  var incompleteTaskHolder = document.getElementById('incomplete-tasks');//ul of #incomplete-tasks


  var createTaskElement = function (entry) {
    var listItem = document.createElement('li');
    listItem.innerText = entry;

    var deleteSpan = document.createElement('span');
    deleteSpan.className = 'delete';

    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');

    listItem.appendChild(deleteSpan);
    deleteSpan.appendChild(deleteIcon);

    return listItem;
  };


  var addTask = function () {
    var listItem = createTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem);

    taskInput.value = '';
  };

  var deleteTask = function (event) {
    //Prevent any other event from firing
    event.stopPropagation();

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
  };

  addButton.addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
  });
  taskInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      addTask();
    }
  });


  var bindTaskEvents = function (taskListItem) {
    console.log('bind list item events for item with ' + taskListItem.innerText);
    var deleteButton = taskListItem.querySelector('span.delete');

    //toggling completed
    taskListItem.addEventListener('click', function(event) {
      event.target.classList.toggle('completed');
    });

    //Bind deleteTask to delete button.
    deleteButton.addEventListener('click', deleteTask);
  };

  //cycle over incompleteTaskHolder ul list items
  //for each list item
  for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i]);
  }
});
