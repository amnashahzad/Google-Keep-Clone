const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

noteForm.addEventListener('submit', addNote);
noteList.addEventListener('click', handleNoteAction);

// Load notes from local storage when the page loads
window.addEventListener('load', () => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(note => {
            createNoteItem(note);
        });
    }
});

function addNote(event) {
    event.preventDefault();
    const noteText = noteInput.value;

    if (noteText.trim() !== '') {
        createNoteItem(noteText);
        saveNotesToLocalStorage();
        noteInput.value = '';
    }
}

function createNoteItem(noteText) {
    const noteItem = document.createElement('li');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
        <span>${noteText}</span>
        <div class="note-buttons">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>
    `;
    noteList.appendChild(noteItem);
}

function handleNoteAction(event) {
    const target = event.target;
    const noteItem = target.closest('.note-item');
    
    if (target.classList.contains('edit-button')) {
        handleEditNoteItem(noteItem);
    } else if (target.classList.contains('delete-button')) {
        handleDeleteNoteItem(noteItem);
    }
}

function handleEditNoteItem(noteItem) {
    const noteText = noteItem.querySelector('span');
    const newText = prompt('Edit your note:', noteText.textContent);

    if (newText !== null) {
        noteText.textContent = newText;
        saveNotesToLocalStorage();
    }
}

function handleDeleteNoteItem(noteItem) {
    noteItem.remove();
    saveNotesToLocalStorage();
}

function saveNotesToLocalStorage() {
    const noteItems = Array.from(noteList.querySelectorAll('.note-item'));
    const notes = noteItems.map(noteItem => noteItem.querySelector('span').textContent);
    localStorage.setItem('notes', JSON.stringify(notes));
}
