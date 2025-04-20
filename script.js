const myLibrary = []

function Book(title, author, numberOfPages, publishedDate) {
    this.title = title;
    this.author = author;
    this.numberOfPages = this.numberOfPages
    this.readStatus = false;
    this.publishedDate = publishedDate
    this.id = crypto.randomUUID();
}

function addBookToMyLibrary(title, author, publishedDate) {
    const newBook = new Book(title, author, publishedDate);
    myLibrary.push(newBook); 
} 

function addLibaryToPage(array) {
    const container = document.querySelector(".card-container")
    for (const book of array) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("book-card")
            newDiv.innerText += book.title;
            container.append(newDiv);
    } 
}




// Adding some books to the library
addBookToMyLibrary("The Great Gatsby", "F. Scott Fitzgerald", 100, "1925");
addBookToMyLibrary("To Kill a Mockingbird", "Harper Lee", 200, "1960");
addBookToMyLibrary("1984", "George Orwell", 300, "1949");

// Display the library
addLibaryToPage(myLibrary);