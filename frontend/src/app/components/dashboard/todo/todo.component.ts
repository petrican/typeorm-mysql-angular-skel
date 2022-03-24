import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as TodoActions from './store/todo.actions';
import { getTodoBranch } from './store/todo.selectors';
import { TodoDataItem } from './store/todo.types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  hasErrors = false;
  todoInput: string = '';
  todoItems!: TodoDataItem[];
  isEdited: boolean | undefined = false;

  private subTodos!: Subscription;

  @ViewChild('addTodoInput') addTodoInput!: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TodoActions.readAll({ loading: true }));
    this.subTodos = this.store.select(getTodoBranch).subscribe((todo) => {
      this.todoItems = todo.items;
      this.isEdited = todo.isEdited;
      if (!this.isEdited) {
        setTimeout(() => {
          this.addTodoInput && this.addTodoInput.nativeElement.focus();
        }, 100);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    const newTodo = form.value.todoInput;
    this.store.dispatch(TodoActions.create({ todo: newTodo }));
    form.resetForm();
    this.addTodoInput.nativeElement.focus();
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.remove({ id }));
  }

  onInitEdit(todoItem: TodoDataItem) {
    this.store.dispatch(TodoActions.initEdit({ todoItem }));
  }

  ngOnDestroy(): void {
    this.subTodos.unsubscribe();
  }
}
