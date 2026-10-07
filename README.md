# QuickNotes

QuickNotes is a lightweight browser-based note-taking app for capturing short thoughts and organizing them into Personal, Work, and Study categories. Notes can be searched, deleted, and kept between visits using the browser's local storage.

## Features

- Add notes with Personal, Work, or Study categories.
- Validate that notes contain text and are no longer than 200 characters.
- Search notes by one or more case-insensitive words.
- Delete individual notes.
- Show category and creation date for each note.
- Save notes locally so they remain after refreshing the page.
- Display helpful note counts and empty-search messages.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.
3. Add, search, or delete notes. Your notes are stored in that browser's local storage.

## What I learned

- How semantic HTML sections, forms, labels, and inputs make an interface more accessible.
- How to render user-provided text safely with DOM methods and `textContent`.
- How to manage an array of objects and update the interface after adding or deleting data.
- How `localStorage` and JSON serialization can persist data in the browser.
- How to filter data in response to search input and make the layout responsive with CSS.
