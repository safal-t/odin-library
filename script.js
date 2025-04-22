const NEWBOOKBTN = document.querySelector(".new-book-btn");
const MODAL = document.querySelector(".modal")
const NEWBOOKFORM = document.querySelector(".new-book-form")
const CONTAINER = document.querySelector(".card-container")

const myLibrary = []

function Book(title, author, numberOfPages, publishedDate) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages
    this.readStatus = false;
    this.publishedDate = publishedDate
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    if (this.readStatus == true) {
        this.readStatus = false;
    } else {
        this.readStatus = true;
    }
}

function makeNewBook(title, author, numberOfPages) {
    const newBook = new Book(title, author, numberOfPages);
    return newBook;
}

function addBookLibrary(book) {
    myLibrary.push(book); 
} 

function addLibaryToPage(array) {
    CONTAINER.innerHTML = "";
    for (const book of array) {
        addBookToPage(book)
    }
}

function addBookToPage(book) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    newDiv.innerText += book.title;
    newDiv.dataset.id = book.id;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn", "card-btn");
    removeBtn.innerText = "remove book";
    removeBtn.addEventListener("click", function() {
        removeBtn.parentElement.remove()
    })

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn", "card-btn")
    readBtn.innerText = book.readStatus ? "have read" : "not read"
    readBtn.addEventListener("click", function() {
        book.changeReadStatus()
        readBtn.innerText = book.readStatus ? "have read" : "not read"
    })

    newDiv.append(removeBtn, readBtn);
    CONTAINER.append(newDiv);
}

// Event Listeners
NEWBOOKBTN.addEventListener("click", function() {
    MODAL.showModal()
})

NEWBOOKFORM.addEventListener("submit", function(event) {
    event.preventDefault();

    // access each input form the form 
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const numberOfPages = document.querySelector("#book-pages").value;
    
    // create a new Book with those inputs 
    addBookToPage(makeNewBook(title, author, numberOfPages)); 
    NEWBOOKFORM.reset();
    MODAL.close()
})

// Adding some books to the library
addBookLibrary(makeNewBook("The Great Gatsby", "F. Scott Fitzgerald", 100));

// Display the library
addLibaryToPage(myLibrary);