// id to keep track of which element to remove
let currentIdx = 0;

const $toDoForm = $('#toDoForm');
const $list = $('#list');

// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i < savedTodos.length; i++) {
  $('ul').append(`
    <li id=${i}>
      <button type="button" id="remove">X</button>
      <input type="checkbox" class="strikethrough"/>
      <span>${savedTodos[i].task}</span>
    </li>
  `);
  $('li').isCompleted = false;

  // save to localStorage
  $('li').isCompleted = savedTodos[i].isCompleted ? true : false;
  if ($('li').isCompleted) {
    $('ul').style.textDecoration = 'line-through';
  }
}

$toDoForm.on('submit', e => {
  e.preventDefault();

  const input = $('#textInput').val();
  const addToList = addToDo({ input, currentIdx, isCompleted: false });

  currentIdx++;

  $list.prepend(addToList);
  $toDoForm.trigger('reset');

  // save to localStorage
  savedTodos.unshift({ id: currentIdx, task: input, isCompleted: false });
  localStorage.setItem('todos', JSON.stringify(savedTodos));
});

// DELETE A TODO
$('ul').on('click', 'button', e => {
  // remove it from the DOM
  $(e.target).closest('li').remove();

  // remove it from localStorage
  savedTodos.splice(e.target.id, 1);
  localStorage.setItem('todos', JSON.stringify(savedTodos)); //BUG
});

// accepts an input value and currentIdx and returns a string of HTML
addToDo = todo => {
  return `
    <li id=${todo.currentIdx}>
      <button type="button" id="remove">X</button>
      <label for="checkbox">
        <input type="checkbox" class="strikethrough"/>
      </label>
      <span>${todo.input}</span>
    </li>
  `;
};
