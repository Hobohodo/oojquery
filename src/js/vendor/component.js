let $;

let ToDoList = function(element) {

  this.el = $(element);

  this.input = this.el.find('#new-task');

  this.addButton = this.el.find('#add-button');

  this.list = this.el.find('.task-list');

  this.addTask = function(taskEntry) {

  }

};

ToDoList.prototype.createTaskElement = function(entry) {

};

ToDoList.prototype.addTask = function() {

};
