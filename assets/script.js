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

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function changeStatusToBook(index) {
  myLibrary[index].status = !myLibrary[index].status;
}

function displayLibrary(library) {
  const bookBody = document.querySelector('#books_body');
  bookBody.innerHTML = '';

  library.forEach((book, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status ? 'Read already' : 'Not yet'}</td>
    `;
    bookBody.appendChild(tr);

    const td = document.createElement('td');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('change_status_button');
    checkBtn.setAttribute('data-attribute', index);
    checkBtn.textContent = book.status ? 'Unread it?' : 'Read it?';
    td.appendChild(checkBtn);
    tr.appendChild(td);
    checkBtn.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-attribute');
      changeStatusToBook(index);
      displayLibrary(myLibrary);
    });

    const td = document.createElement('td');
    const rmBtn = document.createElement('button');
    rmBtn.classList.add('remove_button');
    rmBtn.setAttribute('data-attribute', index);
    rmBtn.textContent = 'remove';
    td.appendChild(rmBtn);
    tr.appendChild(td);
    rmBtn.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-attribute');
      removeBookFromLibrary(index);
      displayLibrary(myLibrary);
    });
  });
}

const newBook = new Book('Nimo', 'captain nimo', 198, true);
addBookToLibrary(newBook);
displayLibrary(myLibrary);

const newBookButton = document.getElementById('new_book_button');
const addBookForm = document.getElementById('book_form');

newBookButton.addEventListener('click', () => {
  addBookForm.style.display = addBookForm.style.display === 'none' ? 'block' : 'none';
});

addBookForm.addEventListener('submit', (event) => {
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
