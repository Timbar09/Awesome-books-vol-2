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
    const refreshTime = () => {
      let theDay = '';
      let theMonth = '';
      let theHour = '';
      let theMinute = '';

      const luxonDay = DateTime.now().day;
      const luxonMonth = DateTime.now().month;
      const luxonHour = DateTime.now().hour;
      const luxonMinute = DateTime.now().minute;

      if (luxonDay < 10) {
        theDay = `0${luxonDay}`;
      } else {
        theDay = `${luxonDay}`;
      }

      if (luxonMonth < 10) {
        theMonth = `0${luxonMonth}`;
      } else {
        theMonth = `${luxonMonth}`;
      }

      if (luxonHour < 10) {
        theHour = `0${luxonHour}`;
      } else {
        theHour = `${luxonHour}`;
      }

      if (luxonMinute < 10) {
        theMinute = `0${luxonMinute}`;
      } else {
        theMinute = `${luxonMinute}`;
      }

      const date = `${theDay}.${theMonth}.${DateTime.now().year}`;
      const time = `${theHour}: ${theMinute}`;
      const displayDateTime = document.querySelectorAll('.section__date');

      displayDateTime.forEach((display) => {
        display.textContent = `${date}, ${time}`;
      });
    };

    setInterval(refreshTime, 1000);
  }

  static emptyListMessage() {
    const emptyMessage = document.querySelector('.hero__description');

    if (booksList.childElementCount > 0) {
      emptyMessage.innerHTML = '';
    } else {
      emptyMessage.innerHTML = '<span>Empty!</span>The book list is empty. <span class="addbook-pointer">Click the "add" link on the navigation bar</span> to add a new book.';
    }
  }

  static pointToAddLink() {
    if (document.querySelector('.hero__description').innerHTML.length > 0) {
      const addPointer = document.querySelector('.addbook-pointer');

      addPointer.addEventListener('click', () => {
        const addLink = document.querySelector('#add-book-link');

        addLink.classList.add('highlight');

        addLink.addEventListener('animationend', () => {
          addLink.classList.remove('highlight');
        });
      });
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
