const notesContainer = document.getElementById('notes');
const noteInput = document.getElementById('noteInput');
const colorSelect = document.getElementById('colorSelect');
const searchInput = document.getElementById('searchInput');

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  displayNotes(notes);
}

function displayNotes(notes) {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.style.background = note.color;
    noteDiv.innerHTML = `
      <span class="delete" onclick="deleteNote(${index})">❌</span>
      <div ondblclick="editNote(${index})">
        <div class="color-tag" style="background:${note.color}"></div>
        <span>${note.text}</span>
        <small>Last updated: ${note.date}</small>
      </div>
    `;

    notesContainer.appendChild(noteDiv);
  });
}

function addNote() {
  const noteText = noteInput.value.trim();
  const noteColor = colorSelect.value;
  if (noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
      text: noteText,
      color: noteColor,
      date: new Date().toLocaleString(),
    };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    loadNotes();
  }
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes();
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newText = prompt('Edit your note:', notes[index].text);
  if (newText !== null) {
    notes[index].text = newText.trim();
    notes[index].date = new Date().toLocaleString();
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
  }
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const filtered = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );
  displayNotes(filtered);
});

loadNotes();
