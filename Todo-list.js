const appForm = document.querySelector('.app__form')
const appFormInput = document.querySelector('.app__form-input')
const appFormBtn = document.querySelector('.app__form-btn')
const taskList = document.querySelector('.task__list')
const btnFilter = document.querySelectorAll('.btn-filter')
let todos = [], filterTodo = [], btnValue = 'all'

const renderTodo = () => {
    taskList.innerHTML = '' // mỗi lần render thì taskList rỗng để làm sạch các item trước đó, vì là taskList chứa toàn 
    // toàn bộ task nên khi set nó lại giá trị rỗng, để tránh trường hợp item cũ re-render
    filterTodo.map(item => {
        const taskItem = document.createElement('div')
        taskItem.className = 'task__item'
        const taskName = document.createElement('p')
        taskName.innerText = item.todo
        if (item.done) {
            taskName.classList.add('red')
        }
        const taskItemBtn = document.createElement('div')
        taskItemBtn.className = 'task__item-btn'
        const taskBtnDel = document.createElement('button')
        taskBtnDel.onclick = () => { handleDeleteTodo(item.id) }
        const taskBtnDone = document.createElement('button')
        taskBtnDone.onclick = () => { handleDoneTodo(item.id) }
        taskBtnDel.innerText = 'X'
        taskBtnDone.innerText = 'Done'

        taskList.appendChild(taskItem)
        taskItem.appendChild(taskName)
        taskItem.appendChild(taskItemBtn)
        taskItemBtn.appendChild(taskBtnDel)
        taskItemBtn.appendChild(taskBtnDone)
    });
}

appForm.onsubmit = e => {
    e.preventDefault()
    const newTodo = {
        id: Math.random().toString(16),
        todo: appFormInput.value,
        done: false
    }

    filterTodo = [...todos, newTodo]

    if (appFormInput.value.trim()) {
        todos.push(newTodo);
        appFormInput.value = '';
        renderTodo();
    }
}

const handleDeleteTodo = id => {
    todos = todos.filter(item => item.id !== id)
    filterTodo = todos
    renderTodo()
}

const handleDoneTodo = id => {
    todos = todos.filter(todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });
    renderTodo();
}

btnFilter.forEach(button => {
    button.onclick = () => {
        if (button.value === 'done') {
            filterTodo = todos.filter(todo => todo.done)
            renderTodo()
        } else if (button.value === 'notDone') {
            filterTodo = todos.filter(todo => !todo.done)
            renderTodo()
        } else {
            filterTodo = todos
            renderTodo()
        }
    }
})