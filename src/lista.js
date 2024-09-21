// Array para armazenar as tarefas
let tasks = [];

// Função para renderizar a lista de tarefas
function renderTasks() {
    const taskList = document.getElementById('lista-tarefas');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item'); // Classe para estilização

        // Div para o checkbox e texto
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container'); // Classe para estilização

        // Checkbox para riscar o texto
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = () => toggleStrike(index, checkbox.checked);
        taskContainer.appendChild(checkbox);

        // Elemento span para o texto da tarefa
        const span = document.createElement('span');
        span.textContent = task;
        span.id = `task-${index}`;
        taskContainer.appendChild(span);

        li.appendChild(taskContainer); // Adiciona o contêiner à lista

        // Div para os botões
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container'); // Classe para estilização

        // Botão de edição (com imagem)
        const editButton = document.createElement('button');
        editButton.className = "item-action";
        const editIcon = document.createElement('img');
        editIcon.src = 'icons/lapis.png'; // Caminho da imagem do lápis
        editIcon.alt = 'Editar'; // Texto alternativo
        editIcon.classList.add('icon-image'); // Classe para estilização
        editButton.appendChild(editIcon);
        editButton.onclick = () => editTask(index);
        buttonContainer.appendChild(editButton); // Adiciona o botão de editar ao contêiner

        // Botão de remoção (com imagem)
        const deleteButton = document.createElement('button');
        deleteButton.className = "item-action";
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'icons/lixeira.png'; // Caminho da imagem da lixeira
        deleteIcon.alt = 'Remover'; // Texto alternativo
        deleteIcon.classList.add('icon-image'); // Classe para estilização
        deleteButton.appendChild(deleteIcon);
        deleteButton.onclick = () => removeTask(index);
        buttonContainer.appendChild(deleteButton); // Adiciona o botão de deletar ao contêiner

        li.appendChild(buttonContainer); // Adiciona o contêiner de botões à lista
        taskList.appendChild(li);
    });
}


// Função para adicionar uma tarefa
function addTask(task) {
    tasks.push(task);
    renderTasks();
}


// Função para riscar o texto se o checkbox estiver selecionado
function toggleStrike(index, isChecked) {
    const taskText = document.getElementById(`task-${index}`);
    if (isChecked) {
        taskText.classList.add('strikethrough'); // Adiciona a classe se o checkbox estiver marcado
    } else {
        taskText.classList.remove('strikethrough'); // Remove a classe se não estiver marcado
    }
}

// Função para editar uma tarefa
function editTask(index) {
    const newTask = prompt('Edite sua tarefa:', tasks[index]);
    if (newTask !== null) {
        tasks[index] = newTask;
        renderTasks();
    }
}

// Função para remover uma tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Adiciona evento ao formulário
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value;

    // Adiciona a nova tarefa
    addTask(taskValue);

    // Limpa o campo de entrada
    taskInput.value = '';
});

// Renderiza a lista ao carregar a página
renderTasks();
