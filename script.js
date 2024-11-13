// Retrieve todo from local storage or initialize an empty array -----> can view stored todos by clicking inspect, then going to application tab, then opening local storage for web application

let todo = JSON.parse(localStorage.getItem("todo")) || []; // let command creates a variable.... values can be changed, const command makes a constant.....JSON -> JAvascript object notation, a way to format javascript code that is easily read......parse()-> converts String JSON into an object....local -> retrieves stored item..... or it is equal to an empty array
const todoInput = document.getElementById("todoInput"); // what we want to reference within the body... get ahold of user input (making a copy of the id"todo" from HTML)
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn"); // use querySelector to target a class
const deleteButton = document.getElementById("deleteButton");

// Initilize Project --> Thing constructor to initialize doc
        // document ensures that method applies to whole page ... eventListener ensures that every second the code is paying attention to events
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") { //checks if we press enter
            event.preventDefault(); // prevents default behaviour of browser
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim(); //text value...trim is an inbuilt function --> gets rid of extra trailing white space
    if (newTask !== "") { // if new task is not empty
        todo.push({ // {} means that you are adding it as an object --> allowing us to add 2 things at a time
            text: newTask, // name of task
            disabled: false, // checked off?
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    console.log("test");
}

function displayTasks() {
    todoList.innerHTML = ""; //innerHTML means HTML inside list --> allows us to add newest todo instead of doubling todos
    todo.forEach((item, index) => { //=> way of writing function.... item is the todo
        const p = document.createElement("p"); // how you create html element while in js
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}> 
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
            </div>
        `; // this is a back tick, js knows all the stuff inside is HTML code... can be found next to 1 ...... the yellow is javascript allowing us to reference variables ..... ? asks if it is true, if so give it the check attribute, if not give empty
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`); // sets const todo item to todo that we click on, name and index
    const existingText = todo[index].text; // sets equal to text
    const inputElement = document.createElement("input");

    inputElement.value = existingText; // ensures that user doesn't start from scratch
    todoItem.replaceWith(inputElement); // element replaced with what is already existing
    inputElement.focus(); //means that when we start wiritng it will automatically write on th einput we click on
    inputElement.addEventListener("blur", function () { // when we click out of the element, it is not longer focused on the element (a blur) .... when we click out update the input
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
} 

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
