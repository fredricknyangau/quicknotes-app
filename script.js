const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const savedNotes = localStorage.getItem("quicknotes-notes");
let notes = savedNotes === null ? [] : JSON.parse(savedNotes);

function saveNotes() {
    localStorage.setItem("quicknotes-notes", JSON.stringify(notes));
}

function render() {
    notesList.replaceChildren();
    noteCount.textContent = notes.length === 0
        ? "You have no notes yet."
        : `You have ${notes.length} ${notes.length === 1 ? "note" : "notes"}.`;

    const searchTerms = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const visibleNotes = notes.filter((note) => {
        const noteText = note.text.toLowerCase();
        return searchTerms.every((term) => noteText.includes(term));
    });

    if (searchTerms.length > 0 && visibleNotes.length === 0) {
        const noResults = document.createElement("li");
        noResults.classList.add("no-results");
        noResults.textContent = "No notes match your search.";
        notesList.append(noResults);
        return;
    }

    for (const note of visibleNotes) {
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
            saveNotes();
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
    saveNotes();
    render();
    noteInput.value = "";
});

searchInput.addEventListener("input", render);

render();
