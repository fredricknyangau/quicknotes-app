const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
    notesList.replaceChildren();

    for (const note of notes) {
        const item = document.createElement("li");
        item.classList.add("note-card", `category-${note.category}`);

        const text = document.createElement("p");
        text.classList.add("note-text");
        text.textContent = note.text;

        const meta = document.createElement("div");
        meta.classList.add("note-meta");

        const category = document.createElement("span");
        category.classList.add("note-category");
        category.textContent = note.category[0].toUpperCase() + note.category.slice(1);

        const date = document.createElement("time");
        date.dateTime = note.createdAt;
        date.textContent = new Date(note.createdAt).toLocaleString();

        meta.append(category, date);
        item.append(text, meta);
        notesList.append(item);
    }
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: noteInput.value.trim(),
        category: noteCategory.value,
        createdAt: new Date().toISOString(),
    };

    notes.push(note);
    render();
    noteInput.value = "";
});

render();
