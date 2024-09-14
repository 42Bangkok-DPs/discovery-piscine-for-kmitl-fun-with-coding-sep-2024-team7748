function addTodo(text, addToTop = true) { 
    const todoItem = $('<div>').addClass('todo-item').text(text);

    todoItem.on('click', function () {
        const confirmDelete = confirm('Do you want to remove this task?');
        if (confirmDelete) {
            $(this).remove();
            saveTodos();
        }
    });

    if (addToTop) {
        $('#ft_list').prepend(todoItem); 
    } else {
        $('#ft_list').append(todoItem);
    }

    saveTodos(); 
}

function createNewTodo() {
    const todoText = prompt('Enter a new task:');
    if (todoText) {
        addTodo(todoText); 
    }
}

function saveTodos() {
    const todos = [];
    $('#ft_list .todo-item').each(function() {
        todos.push($(this).text());
    });

    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie = `todos=${JSON.stringify(todos)}; expires=${date.toUTCString()}; path=/`;
}

function loadTodos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(cookie => cookie.startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(todoCookie.split('=')[1]);
        $.each(todos, function(index, todo) {
            addTodo(todo, false); 
        });
    }
}

$(document).ready(function() {
    $('#newTask').on('click', createNewTodo); 

    loadTodos(); 
});