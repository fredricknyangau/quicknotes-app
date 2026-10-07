const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function render() {
    notesList.replaceChildren();
    noteCount.textContent = notes.length === 0
        ? "You have no notes yet."
        : `You have ${notes.length} ${notes.length === 1 ? "note" : "notes"}.`;

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

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            notes = notes.filter((currentNote) => currentNote.id !== note.id);
            render();
        });

        meta.append(category, date, deleteButton);
        item.append(text, meta);
        notesList.append(item);
    }
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    if (!text) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (noteInput.value.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";
    const note = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text,
        category: noteCategory.value,
        createdAt: new Date().toISOString(),
    };

    notes.push(note);
    render();
    noteInput.value = "";
});

render();
