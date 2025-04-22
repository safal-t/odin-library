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

function addBookToMyLibrary(title, author, numberOfPages) {
    const newBook = new Book(title, author, numberOfPages);
    myLibrary.push(newBook); 
    return newBook;
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

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn", "card-btn")
    readBtn.innerText = book.readStatus ? "have read" : "not read"

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
    addBookToPage(addBookToMyLibrary(title, author, numberOfPages)); 
    NEWBOOKFORM.reset();
    MODAL.close()
})




// Adding some books to the library
addBookToMyLibrary("The Great Gatsby", "F. Scott Fitzgerald", 100);
addBookToMyLibrary("To Kill a Mockingbird", "Harper Lee", 200);
addBookToMyLibrary("1984", "George Orwell", 300);

// Display the library
addLibaryToPage(myLibrary);