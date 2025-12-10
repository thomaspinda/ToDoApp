using Microsoft.AspNetCore.Mvc;
using TodoApi.Models; //Importe del modelo TodoItem

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private static List<TodoItem> _todoItems = new List<TodoItem> //Lista estática en memoria para simular DB
        {
            new TodoItem{ Id = 1, Description = "Configurar el Backend de .NET Core"},
            new TodoItem{ Id = 2, Description = "Crear el componente Angular", IsCompleted = true},

        };
        private static int _nextId = _todoItems.Count + 1;//contador de IDs únicos

        //GET: Obtener todas las tareas
        //Petición GET /api/TodoItems
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodoItems()
        {
            return _todoItems;
        }

        // POST: Crear una tarea nueva
        //Petición POST /api/TodoItems
        [HttpPost]
        public ActionResult<TodoItem> PostTOdoItem(TodoItem todoItem)
        {
            todoItem.Id = _nextId++; //Asiga el siguiente Id y actualiza el contador
            todoItem.IsCompleted = false; //Asegura que la nueva tarea no esté completada por defecto
            _todoItems.Add(todoItem);//Agregar a la 'Base de Datos' juas juas
            return CreatedAtAction(nameof(GetTodoItems), new { id = todoItem.Id }, todoItem);//Devolver una respuesta HTTP 201 Created y la tarea creada
        }
    }
}