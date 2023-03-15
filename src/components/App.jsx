import React, { useEffect } from 'react';
import { useState } from 'react';

import shortid from 'shortid';

import { ContactForm } from './contactForm/contactForm';
import { ContactList } from './contactList/contactList';
import { Filter } from './filter/filter';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    // записать из localStorage, если пустой вернуть []
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  // запись из формы в state.contacts
  const addNewContact = (name, number) => {
    const keyID = shortid.generate();
    const contact = {
      id: keyID,
      name: name,
      number: number,
    };

    // запись всех имен в массив
    let nameContact = [];
    contacts.forEach(contact =>
      nameContact.push(contact.name.toLocaleLowerCase())
    );

    // если имя совпадает, то Alert если нет, добавка в contacts
    nameContact.includes(name.toLocaleLowerCase())
      ? alert(`"${name}" is already in contacts!`)
      : setContacts(prevState => [...prevState, contact]);
  };

  // РАБОТА с localStorage

  useEffect(() => {
    // если произошли изменения, то записываем components в   localeStorage
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Фильтрация
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const getVisibleContacts = () => {
    const normalaizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalaizeFilter)
    );
  };

  // удаление из contacts
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  // отфильтрованный Contacts
  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.conteinerApp}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm addNewContact={addNewContact} />
      <div>
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    </div>
  );
}

export { App };
