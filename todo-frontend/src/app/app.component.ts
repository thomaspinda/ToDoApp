import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  template: `
      <app-task-list></app-task-list>
      `,
    styleUrl: './app.component.css'
  })
export class AppComponent {
  title = 'todo-frontend';
}