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
    removeBtn.addEventListener("click", () => {
        removeBtn.parentElement.remove()
    })

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn", "card-btn")
    readBtn.innerText = book.readStatus ? "have read" : "not read"
    readBtn.addEventListener("click", () => {
        book.changeReadStatus()
        readBtn.innerText = book.readStatus ? "have read" : "not read"
    })

    newDiv.append(removeBtn, readBtn);
    CONTAINER.append(newDiv);
}

function addLibaryToPage(array) {
    CONTAINER.innerHTML = "";
    for (const book of array) {
        addBookToPage(book)
    }
}

// Event Listeners
NEWBOOKBTN.addEventListener("click", () => {
    MODAL.showModal()
})

NEWBOOKFORM.addEventListener("submit", event => {
    event.preventDefault();

    // access each input form the form 
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const numberOfPages = document.querySelector("#book-pages").value;
    
    // create a new Book with those inputs 
    addBookToPage(makeNewBook(title, author, numberOfPages)); 
    NEWBOOKFORM.reset()
    MODAL.close()
})

// Adding some books to the library
const testBook = makeNewBook("The Great Gatsby", "F. Scott Fitzgerald", 100);
addBookLibrary(testBook)
// Display the library
addLibaryToPage(myLibrary);