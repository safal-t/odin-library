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
    const book = new Book(title, author, numberOfPages);
    myLibrary.push(book);
    return book
}

function addBookToPage(book) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    newDiv.dataset.id = book.id;


    const title = document.createElement("h2");
    title.innerText += book.title;

    const author = document.createElement("p")
    author.innerText += book.author;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn", "card-btn");
    removeBtn.innerText = "remove book";

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn", "card-btn")
    readBtn.innerText = book.readStatus ? "have read" : "not read"

    newDiv.append(title, author, removeBtn, readBtn);
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

// Add some initial books to the library
const book1 = makeNewBook("The Hobbit", "J.R.R. Tolkien", 310);
const book2 = makeNewBook("1984", "George Orwell", 328);
const book3 = makeNewBook("To Kill a Mockingbird", "Harper Lee", 281);
const book4 = makeNewBook("Pride and Prejudice", "Jane Austen", 279);
const book5 = makeNewBook("The Great Gatsby", "F. Scott Fitzgerald", 180);
const book6 = makeNewBook("Moby Dick", "Herman Melville", 635);
const book7 = makeNewBook("War and Peace", "Leo Tolstoy", 1225);
const book8 = makeNewBook("The Catcher in the Rye", "J.D. Salinger", 277);
const book9 = makeNewBook("The Lord of the Rings", "J.R.R. Tolkien", 1178);
const book10 = makeNewBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309);

// Display the library
addLibaryToPage(myLibrary);

