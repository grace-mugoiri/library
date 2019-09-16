
const container = document.querySelector("#gridcontainer");
const addBookButton = document.querySelector("#newBookButton");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");
const addFormButton = document.querySelector("#addForm");
const formDiv = document.querySelector("#newbook");


let myLibrary = [];
let initialRender = false;
formDiv.style.display = 'none';

// Book constructor 
function Book(title, author, pages, read, rendered){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.beenRead = function() {this.read = !this.read;}
    this.rendered = rendered;
}

// Display the form 
function showForm(){
    if (formDiv.style.display === "none") { formDiv.style.display = "block"; }
    if (addFormButton.style.display === "block") { addFormButton.style.display = "none"; }
}
addFormButton.addEventListener("click", showForm);

function addBookToLibrary(book) {
    myLibrary.push(book);
}
function resetForm(){
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputRead.checked = false;
    formDiv.style.display = 'none';
}

const createBook = () => {
    let passed;
    if ((inputTitle.value == null || inputTitle.value == "") || (inputAuthor.value == null || inputAuthor.value == "") || (inputPages.value == null || inputPages.value == "") || (isNaN(inputPages.value))) {
        if(isNaN(inputPages.value)) {inputPages.value = "Add number of pages"; }
        alert ("All fields must be entered");
        passed = false;
    }
    else {
        let readBook = false;
        if (inputRead.checked) { readBook = true; } else { readBook = false; }

        addBookToLibrary(new Book(
            inputTitle.value,
            inputAuthor.value,
            inputPages.value,
            readBook, 
            false)
        );
        render(myLibrary);
        passed = true;
    }
    if (passed === true) {
        resetForm();
    }
}
addBookButton.addEventListener("click", createBook);

function render(array) {
    for(var i = array.length -1; i >= 0; i--) {
        if(array[i].rendered == false) {
            const div = document.createElement("div");
            div.dataset.id = i;
            div.classList.add("cards");
            div.textContent = `Book : ${array[i].title}`;
            div.textContent += `Author : ${array[i].author}`;
            div.textContent += `Pages : ${array[i].pages} pages`;

            let readStatus = document.createElement("button");
            if(array[i].read == true) { readStatus.textContent = "READ?: Yes"; }
            else {readStatus.textContent = "READ: No"; }
            readStatus.classList.add("readbutton");
            readStatus.dataset.id = i;
            readStatus.addEventListener("click", beenRead);
            function beenRead() {
                let i = this.getAttribute("data-id");
                let book = myLibrary[i];
                book.beenRead();
                
                if(book.read == true) {this.textContent = "READ: Yes";}
                else {this.textContent = "READ: No"; }
            }
            div.appendChild(readStatus);
            let deleteBook = document.createElement("button");
            deleteBook.textContent = "Delete Book";
            deleteBook.classList.add("deletebutton");
            deleteBook.dataset.id = i;
            deleteBook.addEventListener("click", removeBook);
            function removeBook() {
                let i = this.getAttribute("data-id");
                container.removeChild(div);
                myLibrary.splice(i, 1);
            }
            div.appendChild(deleteBook);
            if (initialRender == false) {container.appendChild(div); }
            else { container.insertBefore(div, container.children[2]); }
            array[i].rendered = true;
        }
    }
    initialRender = true;
}

addBookToLibrary(new Book('Tesa Kent Jewels', 'Tesa Kent', 200, true, false));
addBookToLibrary(new Book('What Women want ', 'Some Chic', 456, false, false));
addBookToLibrary(new Book('Face it', 'Kira Leigh', 754, true, false));
addBookToLibrary(new Book('Face it', 'Kira Leigh', 754, true, false));
render(myLibrary);
