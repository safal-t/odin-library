const NEWBOOKBTN = document.querySelector(".new-book-btn");
const MODAL = document.querySelector(".modal")
const NEWBOOKFORM = document.querySelector(".new-book-form")
const CONTAINER = document.querySelector(".card-container")

const myLibrary = []

function Book(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages
    this.readStatus = false;
    // this.publishedDate = publishedDate
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    this.readStatus = this.readStatus ? false : true; 
}

function makeNewBook(title, author, numberOfPages) {
    return new Book(title, author, numberOfPages);
}

function addBookLibrary(book) {
    myLibrary.push(book); 
} 

function addBookToPage(book) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    newDiv.innerText += book.title;
    newDiv.dataset.id = book.id;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn", "card-btn");
    removeBtn.innerText = "remove book";

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn", "card-btn")
    readBtn.innerText = book.readStatus ? "have read" : "not read"

    newDiv.append(removeBtn, readBtn);
    CONTAINER.append(newDiv);
}

function addLibaryToPage(array) {
    CONTAINER.innerHTML = "";
    for (const book of array) {
        addBookToPage(book)
    }
}

function removeBook(bookCard) {
    const bookId = bookCard.dataset.id;
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        bookCard.remove();
    }
}

function toggleReadStatus(bookCard, button) {
    const bookId = bookCard.dataset.id;
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.changeReadStatus();
        button.innerText = book.readStatus ? "have read" : "not read";
    }
}

// Event Listeners
NEWBOOKBTN.addEventListener("click", () => {
    MODAL.showModal()
})

NEWBOOKFORM.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const numberOfPages = document.querySelector("#book-pages").value;
    
    const newBook = makeNewBook(title, author, numberOfPages);
    addBookLibrary(newBook); 
    addBookToPage(newBook)
    NEWBOOKFORM.reset()
    MODAL.close()
})

CONTAINER.addEventListener("click", (event) => {
    const bookCard = event.target.parentElement;
    if (event.target.classList.contains("remove-btn")) {
        removeBook(bookCard);
    } else if (event.target.classList.contains("read-btn")) {
        toggleReadStatus(bookCard, event.target);
    }
});

// Display the library
addLibaryToPage(myLibrary);