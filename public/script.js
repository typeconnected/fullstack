const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');
const statusEl = document.getElementById('status');

async function fetchTodos() {
  try {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    renderTodos(todos);
    statusEl.textContent = `✅ Database connected — ${todos.length}টা টাস্ক`;
  } catch (err) {
    statusEl.textContent = '❌ Server/DB এ কানেক্ট করা যাচ্ছে না';
  }
}

function renderTodos(todos) {
  list.innerHTML = '';
  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';
  todos.forEach(todo => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = todo.title;
    span.onclick = () => toggleTodo(todo.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'মুছুন';
    delBtn.className = 'del';
    delBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addTodo(title) {
  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  fetchTodos();
}

async function toggleTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'PATCH' });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  fetchTodos();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  addTodo(title);
  input.value = '';
});

fetchTodos();
