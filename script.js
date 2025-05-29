const button = document.getElementsByClassName("add-todo-btn")[0];
const text = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");
const todoItem = document.querySelector(".todo-item");




button.addEventListener("click", () => {


    const trimmed = text.value.trim();
    if (trimmed === "") return;


    if(checkDuplicateTodos(trimmed)){
        console.log("already exist");
        text.value = "";
        return;
        
    }


    const template = document.querySelector(".todo-temp");
    const cloneli = template.content.firstElementChild.cloneNode(true);
    cloneli.querySelector("span").textContent =  trimmed;
    cloneli.style.display = "flex";
    todoList.appendChild(cloneli);
    text.value = "";
    const container = document.querySelector(".todo-list");
    container.scrollTop = container.scrollHeight;
    container.scrollTop = 0;

    addtodoStorage(trimmed);

});


function checkDuplicateTodos(inputText) {

    const todoListAry = document.querySelectorAll(".todo-item");

    if (todoListAry === null) return false;

    for (const e of todoListAry) {
        const span = e.querySelector("span");
        if (span && span.textContent.trim() === inputText) {
            return true;
        }
    }
    return false;
}

const search = document.querySelector("#search-todo");

search.addEventListener("input" , (e) => {


    const alltodos = document.querySelectorAll(".todo-item");

    for (const e of alltodos) {
        const span = e.querySelector("span");
        const todo = span.closest(".todo-item");

        if(search.value === "") todo.style.display = "flex";


        if (span.textContent.trim().toLowerCase().includes(search.value)) {
            todo.style.display = "flex";
        }
        else{
            todo.style.display = "none" ;
        }
    }

});


todoList.addEventListener("click", function(e){

    let todos = JSON.parse(localStorage.getItem("todos"));

    if(e.target.matches("dlt-todo, .dlt")){

        const item = e.target.closest(".todo-item");
        const text = item.querySelector("span").textContent.trim();

        item.remove();

        todos = todos.filter(todo => todo !== text);

        localStorage.setItem("todos", JSON.stringify(todos));
    }

});

const bigcontainer = document.querySelector(".todo-list");





    
    bigcontainer.addEventListener("click", function(e) {


        if (e.target.matches(".edit-todo, .edit")){

            const container = e.target.closest(".todo-item");

            const elements = {
            textbox: container.querySelector(".edit-input"),
            span: container.querySelector("span"),
            edit: container.querySelector(".edit-todo"),
            dlt: container.querySelector(".dlt-todo"),
            check: container.querySelector(".check-todo"),
            cancel: container.querySelector(".cancel-todo")
            };


            elements.edit.style.display = "none";
            elements.dlt.style.display = "none";
            elements.check.style.display = "inline-block";
            elements.cancel.style.display = "inline-block";

            elements.textbox.style.display = "block";
            elements.textbox.value = elements.span.textContent;
            elements.span.style.display = "none";
        
            elements.cancel.addEventListener("click" , () => {

                elements.edit.style.display = "inline-block";
                elements.dlt.style.display = "inline-block";
                elements.check.style.display = "none";
                elements.cancel.style.display = "none";
                elements.textbox.style.display = "none";
                elements.span.style.display= "block";
            

            });

            elements.check.addEventListener("click" , () => {

                elements.edit.style.display = "inline-block";
                elements.dlt.style.display = "inline-block";
                elements.check.style.display = "none";
                elements.cancel.style.display = "none";

                elements.span.textContent= elements.textbox.value;
                elements.textbox.style.display = "none";
                elements.span.style.display="block";

            });
        } 

    });

function getTodosFromStorage(){
    let todos

    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else 
    {                
       todos =  JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


const addtodoStorage = newTodo => {

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {

    const ftodos = localStorage.getItem("todos");
    
    if(!ftodos || JSON.parse(ftodos).length ===0 ) return;

    let todos = JSON.parse(localStorage.getItem("todos"));


    const template = document.querySelector(".todo-temp");

    todos.forEach(e => {
        
    const cloneli = template.content.firstElementChild.cloneNode(true)
    cloneli.querySelector("span").textContent = e;
    cloneli.style.display = "flex";
    todoList.appendChild(cloneli);
    });

}

loadTodos();

const dltAll = document.querySelector(".delete-all");

dltAll.addEventListener("click", function(e) {


    if(confirm("Tüm todoları silmek istediğine emin misin?")){

        alltodo = document.querySelectorAll(".todo-item");
        
        alltodo.forEach(e => {

            e.remove();

        });

         localStorage.removeItem("todos");

    }




});