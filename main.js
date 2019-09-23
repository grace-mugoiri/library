/* eslint-env browser */

const container = document.querySelector('#gridcontainer');
const addBookButton = document.querySelector('#newBookButton');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const addFormButton = document.querySelector('#addForm');
const formDiv = document.querySelector('#newbook');


const myLibrary = [];
let initialRender = false;
formDiv.style.display = 'none';

// Book constructor
function Book(title, author, pages, read, rendered) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.beenRead = function () { this.read = !this.read; };
  this.rendered = rendered;
}
function beenRead(readStatusButton) {
  const i = readStatusButton.getAttribute('data-id');
  const book = myLibrary[i];
  book.beenRead();

  return book.read;
}

function removeBook(deleteBook) {
  const i = deleteBook.getAttribute('data-id');

  myLibrary.splice(i, 1);
}

// Display the form
function showForm() {
  if (formDiv.style.display === 'none') { formDiv.style.display = 'block'; }
  if (addFormButton.style.display === 'block') { addFormButton.style.display = 'none'; }
}
addFormButton.addEventListener('click', showForm);

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function resetForm() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  inputRead.checked = false;
  formDiv.style.display = 'none';
}
function render(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].rendered === false) {
      const div = document.createElement('div');
      div.dataset.id = i;
      div.classList.add('cards');
      div.textContent = `Book : ${array[i].title}`;
      div.textContent += `Author : ${array[i].author}`;
      div.textContent += `Pages : ${array[i].pages} pages`;

      const readStatusButton = document.createElement('button');

      if (array[i].read === true) { readStatusButton.textContent = 'READ?: Yes'; } else { readStatusButton.textContent = 'READ: No'; }
      readStatusButton.classList.add('readbutton');
      readStatusButton.dataset.id = i;
      readStatusButton.addEventListener('click', () => {
        if (beenRead(readStatusButton)) {
          readStatusButton.textContent = 'READ: Yes';
        } else { readStatusButton.textContent = 'READ: No'; }
      });

      div.appendChild(readStatusButton);

      const deleteBook = document.createElement('button');
      deleteBook.textContent = 'Delete Book';
      deleteBook.classList.add('deletebutton');
      deleteBook.dataset.id = i;
      deleteBook.addEventListener('click', () =>{
        removeBook(deleteBook);
        container.removeChild(div);
      });

      div.appendChild(deleteBook);
      if (initialRender === false) {
        container.appendChild(div);
      }
      else {
        container.insertBefore(div, container.children[2]);
      }
      array[i].rendered = true;
    }
  }
  initialRender = true;
}

const createBook = () => {
  let passed;
  if ((inputTitle.value === null || inputTitle.value === '') || (inputAuthor.value === null || inputAuthor.value === '')
    || (inputPages.value === null || inputPages.value === '') || (Number.isNaN(inputPages.value))) {
    if (Number.isNaN(inputPages.value)) { inputPages.value = 'Add number of pages'; }
    alert('All fields must be entered');
    passed = false;
  } else {
    let readBook = false;
    if (inputRead.checked) { readBook = true; } else { readBook = false; }

    addBookToLibrary(new Book(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      readBook,
      false,
    ));
    render(myLibrary);
    passed = true;
  }
  if (passed === true) {
    resetForm();
  }
};
addBookButton.addEventListener('click', createBook);

addBookToLibrary(new Book('Tesa Kent Jewels', 'Tesa Kent', 200, true, false));
addBookToLibrary(new Book('What Women want ', 'Some Chic', 456, false, false));
addBookToLibrary(new Book('Face it', 'Kira Leigh', 754, true, false));
addBookToLibrary(new Book('Underworld', 'Samuel Jackson', 674, true, false));
render(myLibrary);
