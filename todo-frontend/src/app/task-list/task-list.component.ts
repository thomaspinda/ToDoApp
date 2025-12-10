import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';//Directivas *ngFor
import { FormsModule } from '@angular/forms';//Formularios
import { TodoItem } from '../models/todo-item.model';
import { TodoListService } from '../todo-list';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  //Inyectar el servicio
  private todoService = inject(TodoListService);

  //Propiedades para la lógica
  tasks: TodoItem[] = [];
  newTaskDescription: string = '';

  ngOnInit(): void {
    this.loadTasks();
  }
  loadTasks(){
    this.todoService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tareas cargadas: ', data);
      },
      error: (err) =>{
        console.log('Error al cargar las tareas', err);
        
      }
    });
  }
  addTask(){
    if (this.newTaskDescription.trim().length === 0){
      return;//No añadir tareas vacías
    }
      //Crea un objeto con sólo la descripción
    const taskToAdd = { description: this.newTaskDescription.trim() };

    this.todoService.addTask(taskToAdd).subscribe({
          next: (addedTask) => {
            // Añadir la tarea devuelta por el backend a nuestra lista local
            this.tasks.push(addedTask);
            this.newTaskDescription = ''; // Limpiar el input
          },
          error: (err) => {
            console.error('Error al añadir tarea:', err);
      }
    });
  }
}

