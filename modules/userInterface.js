import Book from './book.js';
import StoreBooks from './storage.js';
import { DateTime } from './luxon.js';

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

  static currentDate() {
    const refreshFunc = () => {
      let theDay, theMonth, theHour, theMinute;

      `${DateTime.now().day}`.length === 1 ? (theDay = `0${DateTime.now().day}`) : (theDay = `${DateTime.now().day}`);
      `${DateTime.now().month}`.length === 1
        ? (theMonth = `0${DateTime.now().month}`)
        : (theMonth = `${DateTime.now().month}`);
      `${DateTime.now().hour}`.length === 1
        ? (theHour = `0${DateTime.now().hour}`)
        : (theHour = `${DateTime.now().hour}`);
      `${DateTime.now().minute}`.length === 1
        ? (theMinute = `0${DateTime.now().minute}`)
        : (theMinute = `${DateTime.now().minute}`);

      const date = `${theDay}.${theMonth}.${DateTime.now().year}`;
      const time = `${theHour}: ${theMinute}`;
      const displayDateTime = document.querySelectorAll('.section__date');

      displayDateTime.forEach((display) => (display.textContent = `${date}, ${time}`));
    };

    setInterval(refreshFunc, 1000);
  }

  static emptyListMessage() {
    const emptyMessage = document.querySelector('.hero__description');

    if (booksList.childElementCount > 0) {
      emptyMessage.innerHTML = '';
    } else {
      emptyMessage.innerHTML =
        '<span>Empty!</span>The book list is empty. Click the "add" link on the navigation bar to add a new book.';
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
    formTitle.innerHTML =
      '<span class="success-message"><i class="fa-regular fa-circle-check"></i> New book added!</span>';
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
