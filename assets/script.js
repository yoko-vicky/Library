function getSavedLibrary() {
  const libraryJSON = localStorage.getItem('library');

  try {
    return libraryJSON ? JSON.parse(libraryJSON) : [];
  } catch (e) {
    return [];
  }
}

const myLibrary = getSavedLibrary();

function Book(title, author, pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addLibraryToLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
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

    let td = document.createElement('td');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('change_status_button');
    checkBtn.setAttribute('data-attribute', index);
    checkBtn.textContent = book.status ? 'Unread it?' : 'Read it?';
    td.appendChild(checkBtn);
    tr.appendChild(td);
    checkBtn.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-attribute');
      changeStatusToBook(index);
      addLibraryToLocalStorage();
      displayLibrary(myLibrary);
    });

    td = document.createElement('td');
    const rmBtn = document.createElement('button');
    rmBtn.classList.add('remove_button');
    rmBtn.setAttribute('data-attribute', index);
    rmBtn.textContent = 'remove';
    td.appendChild(rmBtn);
    tr.appendChild(td);
    rmBtn.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-attribute');
      removeBookFromLibrary(index);
      addLibraryToLocalStorage();
      displayLibrary(myLibrary);
    });
  });
}

const newBookButton = document.getElementById('new_book_button');
const addBookForm = document.getElementById('book_form');

newBookButton.addEventListener('click', () => {
  addBookForm.style.display = addBookForm.style.display === 'none' ? 'block' : 'none';
});

function setValues(book, el) {
  book.title = el.title.value;
  book.author = el.author.value;
  book.pages = el.pages.value;
  book.status = el.status.checked;
}

function clearValues(el) {
  el.title.value = '';
  el.author.value = '';
  el.pages.value = '';
  el.status.checked = false;
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book();
  setValues(book, event.target.elements)
  addBookToLibrary(book);
  addLibraryToLocalStorage();
  displayLibrary(myLibrary);
  clearValues(event.target.elements)
});

// RUNNING CODE
displayLibrary(myLibrary);
