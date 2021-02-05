const LibraryModule = (function () {
  const getSavedLibrary = () => {
    const libraryJSON = localStorage.getItem('library');

    try {
      return libraryJSON ? JSON.parse(libraryJSON) : [];
    } catch (e) {
      return [];
    }
  };

  function Book(title, author, pages, status = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  const addBookToLibrary = (book, library) => {
    library.push(book);
  };

  const addLibraryToLocalStorage = (library) => {
    localStorage.setItem('library', JSON.stringify(library));
  };

  const removeBookFromLibrary = (index, library) => {
    library.splice(index, 1);
  };

  const changeStatusToBook = (index, library) => {
    library[index].status = !library[index].status;
  };

  const displayLibrary = (library) => {
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
      checkBtn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-attribute');
        changeStatusToBook(index, library);
        addLibraryToLocalStorage(library);
        displayLibrary(library);
      });

      td = document.createElement('td');
      const rmBtn = document.createElement('button');
      rmBtn.classList.add('remove_button');
      rmBtn.setAttribute('data-attribute', index);
      rmBtn.textContent = 'remove';
      td.appendChild(rmBtn);
      tr.appendChild(td);
      rmBtn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-attribute');
        removeBookFromLibrary(index, library);
        addLibraryToLocalStorage(library);
        displayLibrary(library);
      });
    });
  };

  const addClassToDisplayForm = () => {
    document.getElementById('book_form').classList.toggle('open');
  };

  const setValues = (book, el) => {
    book.title = el.title.value;
    book.author = el.author.value;
    book.pages = el.pages.value;
    book.status = el.status.checked;
  };

  const generateBook = (e) => {
    const book = new Book();
    setValues(book, e.target.elements);
    return book;
  };

  const clearValues = (el) => {
    el.title.value = '';
    el.author.value = '';
    el.pages.value = '';
    el.status.checked = false;
  };

  const submitForm = (e, library) => {
    addBookToLibrary(generateBook(e), library);
    addLibraryToLocalStorage(library);
    displayLibrary(library);
    clearValues(e.target.elements);
  };

  return {
    getSavedLibrary,
    addClassToDisplayForm,
    submitForm,
    displayLibrary,
  };
}());

const myLibrary = LibraryModule.getSavedLibrary();

document.getElementById('new_book_button').addEventListener('click', () => {
  LibraryModule.addClassToDisplayForm();
});

document.querySelector('#book_form').addEventListener('submit', (e) => {
  e.preventDefault();
  LibraryModule.submitForm(e, myLibrary);
});

// RUNNING CODE
LibraryModule.displayLibrary(myLibrary);
