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
  library.forEach(book => {
    const bookBody = document.querySelector('#books_body');
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
