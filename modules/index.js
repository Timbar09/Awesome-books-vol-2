import Book from './book.js';
import StoreBooks from './storage.js';
import UserInterface, { booksList } from './userInterface.js';

window.addEventListener('load', () => {
  UserInterface.currentDate();
  UserInterface.loadBooks();
  UserInterface.emptyListMessage();
  UserInterface.pointToAddLink();
});

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    const addBookSection = document.querySelector('#add-book');
    const contactSection = document.querySelector('#contact');
    const bookListSection = document.querySelector('#books-list');

    if (index === 0) {
      if (bookListSection.classList.contains('close')) {
        bookListSection.classList.remove('close');
      }
      addBookSection.classList.add('close');
      contactSection.classList.add('close');
    } else if (index === 1) {
      if (addBookSection.classList.contains('close')) {
        addBookSection.classList.remove('close');
      }
      bookListSection.classList.add('close');
      contactSection.classList.add('close');
    } else if (index === 2) {
      if (contactSection.classList.contains('close')) {
        contactSection.classList.remove('close');
      }
      bookListSection.classList.add('close');
      addBookSection.classList.add('close');
    }
  });
});

const form = document.querySelector('.form__content');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const authorText = document.querySelector('.book-author').value;
  const titleText = document.querySelector('.book-title').value;

  const book = new Book(authorText, titleText);

  StoreBooks.addBook(book);
  UserInterface.addBook(book);
  UserInterface.bookAddSuccess();
  UserInterface.clearForm();
  UserInterface.emptyListMessage();
  UserInterface.pointToAddLink();
});

booksList.addEventListener('click', (e) => {
  UserInterface.removeBook(e.target);
  UserInterface.emptyListMessage();
  UserInterface.pointToAddLink();
  StoreBooks.removeBook(e.target);
});
