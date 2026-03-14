
function novaTask() {
    const Task = document.querySelector("#newTask").value; //pega o valor
    Task.innerHTML = Task; // escreve no dom

    if (Task === "") {
        alert("Digite a task!");
    } else {

        const lista = document.querySelector("#lista")
        const novaTask = document.createElement("li");

        novaTask.classList.add("elementoTask")
        novaTask.id = "taskStyle";

        novaTask.innerHTML = '<input type="checkbox" id="check"> ' + Task + '<button class="btnApagar" onclick="btnApagar(this)"><img src="./Assets/excluir.svg" alt="icon de apagar"></button>';

        lista.appendChild(novaTask)

        document.querySelector("#newTask").value = "";
        console.log(lista)
    }
}

function btnApagar(apagar) {
    apagar.parentElement.remove();
}

