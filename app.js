/* DOM Selectors */
const form = document.querySelector('.todo-form'),
      ul = document.querySelector('.todo-list'),
      clear = document.querySelector('.clear-all'),
      search = document.querySelector('.search-form input');

/* Event Handlers */

const handleSubmit = e => {

    // Prevent form from submitting
    e.preventDefault();

    // Get user input value
    const todo = form.todo.value;

    // Reset input field
    form.reset();

    // Update UI
    if (todo) {
        addTodo(todo);
    }

    // Update local storage
    if (!localStorage.getItem('todos')) {
        const storageArr = [todo];
        localStorage.setItem('todos', JSON.stringify(storageArr));
    } else {
        const storageArr = JSON.parse(localStorage.getItem('todos'));
        storageArr.push(todo);
        localStorage.setItem('todos', JSON.stringify(storageArr));
    }
    
};

const handleCheckOrDelete = e => {

    // Check if check button is pressed
    if (e.target.parentElement.name === 'checkBtn') { 
        checkTodo(e);
    }

    // Check if delete button is pressed
    if (e.target.parentElement.name === 'deleteBtn') {
        deleteTodo(e);
    }

};

const clearAll = () => {

    // Clear list
    ul.innerHTML = '';

    // Update local storage
    localStorage.removeItem('todos'); 

};

const searchTodos = () => {

    // Get user input value
    const term = search.value.trim().toLowerCase();

    // Filter todos
    filterTodos(term);

};

/* Helpers */

const addTodo = todo => {

    // Update UI
    const li = document.createElement('li');


    li.innerHTML = `
              <span class="todo-item">${todo}</span>
              <button name="checkBtn">
                <i class="fas fa-check-square"></i>
              </button>
              <button name="deleteBtn">
                <i class="fas fa-trash"></i>
              </button>
    `;  

    ul.appendChild(li);
    li.classList.add('list-item');

};

const checkTodo = e => {

    const item = e.target.parentElement.parentElement;
    item.classList.toggle('todo-line');

    e.target.classList.toggle('todo-line-btn');

};

const deleteTodo = e => {
   
    // Update UI
   const item = e.target.parentElement.parentElement;

   item.classList.add('remove-todo');

   item.addEventListener('transitionend', () => {
     item.remove();
   })

   // Delete todo from local storage
   const storageArr = JSON.parse(localStorage.getItem('todos'));
   const todoText = item.querySelector('span').textContent;
   const todoIndex = storageArr.indexOf(todoText);
   storageArr.splice(todoIndex, 1);
   localStorage.setItem('todos', JSON.stringify(storageArr));   
   
}

const filterTodos = term => {

    // Filter li's with no term in it
    Array.from(ul.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term)) 
        .forEach(todo => todo.classList.add('filtered'));

    // Filter li's with term in it - opposite
    Array.from(ul.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term)) 
        .forEach(todo => todo.classList.remove('filtered'));

};

/* Event Listeners */

window.addEventListener('DOMContentLoaded', () =>{
    
    form.addEventListener('submit', handleSubmit);
    ul.addEventListener('click', handleCheckOrDelete);
    clear.addEventListener('click', clearAll);
    search.addEventListener('keyup', searchTodos);

    // Update UI From local storage
    if(localStorage.getItem('todos')) {
        let storageArr = JSON.parse(localStorage.getItem('todos'));

        storageArr.forEach(item => {
            addTodo(item);
        });
    }

});