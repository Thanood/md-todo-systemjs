import { autoinject, TaskQueue } from 'aurelia-framework';
import { AddTodoModal } from "../resources/elements/modals/add-todo-modal";
import { StorageService } from '../resources/services/storage/storage-service';
import { Todo } from "../models/todo";

@autoinject()
export class TodoList {
  addTodoModal: AddTodoModal;
  bottomModal: any;
  tapTarget: any;
  todos: Todo[] = [];

  editTodo: Todo;

  constructor(private storage: StorageService, private taskQueue: TaskQueue) { }

  attached() {
    if (this.storage.get('tapTargetDisplayed') !== true) {
      this.taskQueue.queueTask(() => {
        this.tapTarget.open();
        this.storage.set('tapTargetDisplayed', true);
      });
    }
    const todos = this.storage.get('todos');
    if (todos) {
      this.todos = todos.map(t => {
        if (typeof t.dueDate === 'string') {
          t.dueDate = Date.parse(t.dueDate);
        }
        return t;
      });
    }
  }

  addTodo() {
    this.addTodoModal.open();
  }

  finishEditTodo() {
    this.storage.set('todos', this.todos);
    this.bottomModal.close();
  }

  openBottomModal(todo) {
    this.editTodo = todo;
    this.bottomModal.open();
  }

  returnFalse() {
    return false;
  }

  saveTodo(todo: Todo) {
    console.log('saveTodo', todo);
    this.todos.push(todo);
    this.storage.set('todos', this.todos);
  }
}
