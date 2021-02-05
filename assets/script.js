const myLibrary = [];

function Book(title, author, pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(library) {
  const bookBody = document.querySelector('#books_body');
  bookBody.innerHTML = '';

  library.forEach(book => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status ? 'Read already' : 'Not yet'}</td>
      <td>remove</td>
    `;
    bookBody.appendChild(tr);
  });
}

const newBook = new Book('Nimo', 'captain nimo', 198, true);
addBookToLibrary(newBook);
displayLibrary(myLibrary);

const newBookButton = document.getElementById('new_book_button');
const addBookForm = document.getElementById('book_form');
const submitBookButton = document.getElementById('submit_book');

newBookButton.addEventListener('click', function() {
  addBookForm.style.display = addBookForm.style.display === 'none' ? 'block' : 'none';
});

addBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const book = new Book();
  book.title = event.target.elements.title.value;
  book.author = event.target.elements.author.value;
  book.pages = event.target.elements.pages.value;
  book.status = event.target.elements.status.checked;
  addBookToLibrary(book);
  displayLibrary(myLibrary);
  event.target.elements.title.value = '';
  event.target.elements.author.value = '';
  event.target.elements.pages.value = '';
  event.target.elements.status.checked = false;
});
