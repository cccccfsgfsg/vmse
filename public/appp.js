// public/app.js

const form = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');

const loadNotes = async () => {
  notesList.innerHTML = '';
  const res = await fetch('/notes');
  const notes = await res.json();

  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note';
    li.innerHTML = `
      <strong>${note.title}</strong><br />
      ${note.content}
      <button onclick="deleteNote('${note._id}')">Удалить</button>
    `;
    notesList.appendChild(li);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  loadNotes();
});

const deleteNote = async (id) => {
  await fetch(`/notes/${id}`, { method: 'DELETE' });
  loadNotes();
};

loadNotes();
