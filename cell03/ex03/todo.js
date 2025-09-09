

function getCookie(name) {
    const cookies = document.cookie.split('; ')
    for (let c of cookies) {
        const [key, val] = c.split('=')
        if (key === name) return JSON.parse(decodeURIComponent(val))
    }
    return []
}

function setCookie(name, value, days = 7) {
    const d = new Date()
    d.setTime(d.getTime() + (days*24*60*60*1000))
    const expires = "expires=" + d.toUTCString()
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + "; " + expires + "; path=/"
}

let todolist = getCookie("todolist")
function renderList() {
    const list = document.getElementById("ft_list")
    list.innerHTML = ""
    todolist.forEach((task, index) => {
        const div = document.createElement("div")
        div.className = "todo"
        div.textContent = task
        div.addEventListener("click", () => {
        if (confirm("Do you want to delete this TO DO?")) {
            todolist.splice(index,1)
            setCookie("todolist", todolist)
            renderList()
        }
        })
        list.appendChild(div)
    })
}

function newTodo() {
    const task = prompt("Enter a new TO DO:")
    if (task && task.trim() !== ""){
        todolist.push(task.trim()) 
        setCookie("todolist", todolist)
        renderList()
    }
}

renderList()
