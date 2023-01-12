import Book from './book.js';
import StoreBooks from './storage.js';

export const booksList = document.querySelector('.hero__collection');

export default class UserInterface {
  static loadBooks() {
    const books = StoreBooks.getBooks();

    books.forEach((book) => {
      UserInterface.addBook(book);
    });
  }

  static clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static emptyListMessage() {
    const emptyMessage = document.querySelector('.hero__description');

    if (booksList.childElementCount > 0) {
      emptyMessage.innerHTML = '';
    } else {
      emptyMessage.innerHTML = '<span>Empty!</span>The book list is empty. Click the "add" link on the navbar and add anew book.';
    }
  }

  static addBook(book) {
    const newBook = document.createElement('li');
    newBook.className = 'hero__book';
    newBook.innerHTML = `
      <p class='hero__book-title'>${book.title}</p>
      <p class='hero__book-author'>${book.author}</p>
      <button class='hero__book-remove' id='${Book.id}'>Remove</button>
      `;
    booksList.appendChild(newBook);
  }

  static bookAddSuccess() {
    const formTitle = document.querySelector('.section__title');
    formTitle.innerHTML = '<span class="success-message"><i class="fa-regular fa-circle-check"></i> New book added!</span>';
    setTimeout(() => {
      formTitle.innerHTML = 'Add new book';
    }, 2000);
  }

  static removeBook(target) {
    if (target.classList.contains('hero__book-remove')) {
      target.parentElement.remove();
    }
  }
}
