const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const count = document.getElementById("count");
const ding = new Audio("ding.mp3");
let tasks = [];
if (localStorage.getItem("todo_ding_tasks")) {
    tasks = JSON.parse(localStorage.getItem("todo_ding_tasks"));
}
function saveTasks() {
    localStorage.setItem("todo_ding_tasks", JSON.stringify(tasks));
}
function updateCount() {
    count.textContent = tasks.length;
}
function render() {
    list.innerHTML = "";
    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.className = "item";
        let check = document.createElement("div");
        check.className = "check-anim";
        if (task.done) check.classList.add("checked");
        let txt = document.createElement("div");
        txt.className = "text";
        txt.textContent = task.text;
        if (task.done) txt.classList.add("done");
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "ghost";
        check.addEventListener("click", () => {
            task.done = !task.done;
            if (task.done) {
                ding.currentTime = 0;
                ding.play().catch(() => {});
            }
            render();
        });
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t !== task);
            render();
        });
        li.appendChild(check);
        li.appendChild(txt);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
    updateCount();
    saveTasks();
}
function addTask() {
    let text = input.value.trim();
    if (text === "") return;

    tasks.unshift({
        text: text,
        done: false
    });
    input.value = "";
    render();
}
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});
clearBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.done);
    render();
});
render();
