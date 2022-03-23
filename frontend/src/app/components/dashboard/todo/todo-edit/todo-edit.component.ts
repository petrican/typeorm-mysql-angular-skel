import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getTodoBranch } from '../store/todo.selectors';
import * as TodoActions from '../store/todo.actions';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent implements OnInit, OnDestroy {
  hasErrors = false;
  todoInput: string = '';
  todoId: number = 0;

  private subTodos!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subTodos = this.store.select(getTodoBranch).subscribe((todo) => {
      if (todo.editedItem?.action) {
        this.todoInput = todo.editedItem.action;
        this.todoId = todo.editedItem.id;
      }
    });
  }

  onFormSubmit(form: NgForm) {
    const todoUpdate = form.value.todoInput;

    this.store.dispatch(
      TodoActions.updateTodoStart({
        todoItem: { id: this.todoId, action: this.todoInput },
      })
    );
    form.resetForm();
  }

  onClose() {
    this.store.dispatch(TodoActions.cancelEdit({ isEdited: false }));
  }

  ngOnDestroy(): void {
    this.subTodos.unsubscribe();
  }
}
