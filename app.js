const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [];

function render() {
  listElement.innerText = "";
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }

  const newNote = {
    title: inputElement.value,
    completed: false,
  };

  notes.push(newNote);
  render();
  inputElement.value = "";
};

listElement.onclick = function (event) {
  const btn = event.target;
  const li = btn.closest("li");
  if (!li) return;

  const index = li.querySelector("span[data-index]").dataset.index;
  if (
    btn.classList.contains("btn-success") ||
    btn.classList.contains("btn-warning")
  ) {
    // Переключить выполнено
    notes[index].completed = !notes[index].completed;
    render();
  } else if (btn.classList.contains("btn-danger")) {
    // Удалить заметку
    notes.splice(index, 1);
    render();
  }
};

function getNoteTemplate(note, index) {
  return `<li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="${
            note.completed ? "text-decoration-line-through" : ""
          }" data-index="${index}">${note.title}</span>
          <span>
            <span class="btn btn-small btn-${
              note.completed ? "warning" : "success"
            }" title="Выполнено">&check;</span>
            <span class="btn btn-small btn-danger" title="Удалить">&times;</span>
          </span>
        </li>`;
}
