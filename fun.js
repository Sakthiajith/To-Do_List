//select DOM elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);


function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => createTaskElement(task.text, task.completed));
 }
// Add a new task
function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText === ""){
        alert("The task is empty!!!");
        return;
    }
    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value=""; //clear task
}

// Create a task element
function createTaskElement(taskText, isCompleted){

    const taskDiv=document.createElement("div");
    taskDiv.classList.add("task");
    if(isCompleted) taskDiv.classList.add("completed");

    const taskContent=document.createElement("span");
    taskContent.textContent=taskText;
    taskDiv.appendChild(taskContent);

    const buttonDiv= document.createElement("div");
    buttonDiv.classList.add("buttons");

     // Complete button
     const completeButton = document.createElement("button");
     completeButton.textContent="Complete";
     completeButton.onclick= () =>toggleComplete(taskDiv, taskText);
     buttonDiv.appendChild(completeButton);

     //edit button
     const editButton = document.createElement("button");
     editButton.textContent = "Edit";
     editButton.onclick = () => editTask(taskDiv, taskContent, taskText);
     buttonDiv.appendChild(editButton);

     //delete button
     const deleteButton = document.createElement("button");
     deleteButton.textContent="delete";
     deleteButton.onclick = () => deleteTask(taskDiv, taskText);
     buttonDiv.appendChild(deleteButton);

     taskDiv.appendChild(buttonDiv);
     taskList.appendChild(taskDiv)
}

// Save task to local storage
    function saveTask(taskText, isCompleted){
        const tasks=JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({text: taskText, completed:isCompleted});
        localStorage.setItem("tasks",JSON.stringify(tasks));

    }

    //toggle task completion
    function toggleComplete(taskDiv, taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const task = tasks.find((t) => t.text === taskText);
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      
        taskDiv.classList.toggle("completed");
      }

    //Edit task
    function editTask(taskDiv, taskContent, oldText){ 
        const newTaskText = prompt("Edit your task", taskContent.taskContent);
        if(newTaskText === null || newTaskText.trim() === "")
            return;

        taskContent.textContent = newTaskText;

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const task = tasks.find((t)=> t.text === oldText);
        task.text = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }

    //delete task
    function deleteTask(taskDiv, taskText){
        taskDiv.remove();
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const updatedTasks = tasks.filter((t)=> t.text !== taskText);
        localStorage.setItem("tasks",JSON.stringify(updatedTasks));
    }