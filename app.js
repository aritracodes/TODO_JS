// Selector
const todoInput = document.querySelector('#todoInput');
const todoButton = document.querySelector('#todoButton');
const todoList = document.querySelector('#todoList');
    
// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addtodo);
todoList.addEventListener('click', trashCheck);

// function
function addtodo(event) {
    event.preventDefault();
    
    const ulList = document.createElement('li');
    ulList.classList.add('flex', 'space-x-2', 'items-center', 'justify-center', 'w-full');
    todoList.appendChild(ulList);

    const ulInput = document.createElement('input');
    ulInput.disabled = true;
    ulInput.classList.add('w-2/3', 'focus:outline-none', 'bg-white', 'px-1', 'py-1');
    ulInput.value = todoInput.value;
    ulList.appendChild(ulInput);

    saveLocalTodos(todoInput.value);
    
    
    const ulButton1 = document.createElement('button');
    ulButton1.classList.add('check-btn');
    ulButton1.innerHTML = '<i class="fas fa-check pointer-events-none"></i>';
    ulList.appendChild(ulButton1);
    
    const ulButton2 = document.createElement('button');
    ulButton2.classList.add('trash-btn');
    ulButton2.innerHTML = '<i class="fas fa-trash-alt pointer-events-none"></i>';
    
    ulList.appendChild(ulButton2);

    todoInput.value = "";
}

function trashCheck(e) {
    const item = e.target;
    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentElement;
        // todo.classList.add("anim");
        removeLocalStorage(todo);
        todo.remove();
    }

    if (item.classList[0] == 'check-btn') {
        const checktodo = item.parentElement;
        checktodo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
    const ulList = document.createElement('li');
    ulList.classList.add('flex', 'space-x-2', 'items-center', 'justify-center', 'w-full');
    todoList.appendChild(ulList);

    const ulInput = document.createElement('input');
    ulInput.disabled = true;
    ulInput.classList.add('w-2/3', 'focus:outline-none', 'bg-white', 'px-1', 'py-1');
    ulInput.value = todo;
    ulList.appendChild(ulInput);
    
    
    const ulButton1 = document.createElement('button');
    ulButton1.classList.add('check-btn');
    ulButton1.innerHTML = '<i class="fas fa-check pointer-events-none"></i>';
    ulList.appendChild(ulButton1);
    
    const ulButton2 = document.createElement('button');
    ulButton2.classList.add('trash-btn');
    ulButton2.innerHTML = '<i class="fas fa-trash-alt pointer-events-none"></i>';
    ulList.appendChild(ulButton2);
    });
}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const Todoval = todo.children[0].value;
    todos.splice(todos.indexOf(Todoval), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}