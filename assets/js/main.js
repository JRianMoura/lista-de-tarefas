const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

const saveTodo = (text) =>{
  const todo = document.createElement("div")
  todo.classList.add("todo")

  const todoTitle = document.createElement("h3")
  todoTitle.innerText = text
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish-todo")
  doneBtn.innerHTML = '<i class="fa fa-check"></i>' 
  todo.appendChild(doneBtn)
  
  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-todo")
  editBtn.innerHTML = '<i class="fa fa-pen"></i>' 
  todo.appendChild(editBtn)
  
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("remove-todo")
  deleteBtn.innerHTML = '<i class="fa fa-xmark"></i>' 
  todo.appendChild(deleteBtn)

  todoList.appendChild(todo)
  todoInput.value = "";
  todoInput.focus();

  salvarTarefas();
}

const toggleForms = () =>{
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) =>{
    let todoTitle = todo.querySelector("h3");
    if(todoTitle.innerText === oldInputValue){
      todoTitle.innerText = text;
    }
  })

}

todoForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  const inputValue = todoInput.value
  if (inputValue){
    saveTodo(inputValue)
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div")
  let todoTitle;

  if(parentEl && parentEl.querySelector("h3")){
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if(targetEl.classList.contains("finish-todo")){
   parentEl.classList.toggle("done")
  }

  if(targetEl.classList.contains("edit-todo")){
    toggleForms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }

  if(targetEl.classList.contains("remove-todo")){
    parentEl.remove();
    salvarTarefas();
  }
});

cancelEditBtn.addEventListener("click", (e) =>{
  preventDefault();
  toggleForms();
})

editForm.addEventListener("submit", (e) =>{
  e.preventDefault();

  const editInputValue = editInput.value
  
  if(editInputValue){
    updateTodo(editInputValue)
  }

  toggleForms();
})

salvarTarefas = () => {
  const h3Tarefas = todoList.querySelectorAll("h3");
  const listaDeTarefas = [];

  for (let todoList of h3Tarefas){
    tarefaTexto = todoList.innerText;
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
  
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);  
  
  for(let tarefa of listaDeTarefas) {
    saveTodo(tarefa);
  }
}

adicionaTarefasSalvas();

