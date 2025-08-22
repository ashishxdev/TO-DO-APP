const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const taskCounter = document.getElementById("task-counter")

function updatecounter(){
    const totaltask = listContainer.getElementsByTagName("li").length;
    const checkedtasks = listContainer.querySelectorAll(".checked").length;
    const pendingtasks = totaltask - checkedtasks;
    taskCounter.innerHTML = `You have ${pendingtasks} pending tasks.`;
}

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addtask();
    }
});

function addtask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); 
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"; // \u00d7 multiplication sign
        li.appendChild(span);
    }
    inputBox.value = "";
    updatecounter()
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        updatecounter()
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        updatecounter()
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updatecounter()
}
showTask();