const container = document.querySelector("#gridContainer");
const addBookButton = document.querySelector("#newBookButton");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");
const addFormButtom = document.querySelector("#addform");
const formDiv = document.querySelector("#newbook");


let myLibrary = [];

// Book constructor 
function Book(author, title, pages, read, rendered) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;

    this.beenRead = function() {
        this.read = !this.read;
    }
    this.rendered = rendered
}

// Add book to the array 
function addBookToLibrary() {
    myLibrary.push(book);
}

// Display the form 
function showForm() {
    if (formDiv.style.dispaly === "none") {
        formDiv.style.dispaly = "block";
    }

    if (addFormButtom.style.dispaly === "block") {
        addFormButtom.style.dispaly = "none";
    }
}
// const thebook = new Book("King Kong")
// thebook.theTitle()