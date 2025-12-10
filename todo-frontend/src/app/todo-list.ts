import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoItem } from "./models/todo-item.model";

@Injectable({
  providedIn: 'root'
})
export class TodoListService{

  private apiUrl = 'http://localhost:5157/api/TodoItems'//URL base de la API de .NET Core
  private http = inject(HttpClient);//Inyectar HttpClient para hacer las peticiones
  constructor(){ }

  //Metodo para OBTENER todas las tareas
  getTasks(): Observable<TodoItem[]>{
    return this.http.get<TodoItem[]>(this.apiUrl);//Hace una petición GET a la API
  }
  //MEtodo para CREAR una nueva tarea
  addTask(newTask: Omit<TodoItem, 'id' | 'isCompleted'>): Observable<TodoItem>{
    //El Backend sólo espera la descripción, el id y el estado se añaden automáticamente
    return this.http.post<TodoItem>(this.apiUrl, newTask);
  }
}