
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
    const $list = $("#ft_list")
    $list.empty()
    todolist.forEach((task, index) => {
        const $div = $("<div>").addClass("todo").text(task)
        $div.click(() => {
        if (confirm("Do you want to delete this TO DO?")) {
            todolist.splice(index, 1)
            setCookie("todolist", todolist)
            renderList()
        }
        })
        $list.append($div)
    })
}

function newTodo() {
    const task = prompt("Enter a new TO DO:")
    if (task && task.trim() !== "") {
        todolist.push(task.trim())
        setCookie("todolist", todolist)
        console.log(task)
        renderList()
    }
}

$(document).ready(function() {
  renderList()
})
