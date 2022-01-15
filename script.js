// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)  
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)
filterOption.addEventListener('click', filterTodo)

// disabling input so that user can't submit an empty string
todoButton.disabled = true
todoInput.onkeyup = () => {
    if(todoInput.value.length > 0){
        todoButton.disabled = false
    } else {
        todoButton.disabled = true
    }
}

// Functions
function addTodo(event){
    event.preventDefault()

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // add todo to local storage
    saveLocalTodos(todoInput.value)

    // Check Mark Button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check">'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // Check Trash Button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash">'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append To List
    todoList.appendChild(todoDiv)

    // Clear Todo Input Value
    todoButton.disabled = true
    todoInput.value = ''

}

function deleteTodo(e) {
    const item = e.target
    // delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }

    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else {
                    todo.style.display = 'none'
                } 
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else {
                    todo.style.display = 'none'
                }
        }
    })
}
// Local Storage manipulation

function checkLocalStorage(){
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}

function saveLocalTodos(todo){
    let todos = checkLocalStorage()

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos = checkLocalStorage()

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        // Create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // Check Mark Button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check">'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // Check Trash Button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash">'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        // Append To List
        todoList.appendChild(todoDiv)

    })
}

function removeLocalTodos(todo){
    let todos = checkLocalStorage()
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}