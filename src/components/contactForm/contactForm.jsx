import PropTypes from 'prop-types';
import React from 'react';
import {useState} from 'react';
import css from './contactForm.module.css'


function ContactForm ({addNewContact}) {

const [name, setName] = useState('');
const [number, setNumber] = useState('');



  //   запись из input в state
  const handleInputChange = event => {
switch(event.currentTarget.name){
case 'name': setName(event.currentTarget.value);
break;
case 'number': setNumber(event.currentTarget.value);
break;
default:return;
}
  };

  const handleSubmit = event => {
    event.preventDefault();
    addNewContact(name, number)
      reset();
          }

  
  // Очистка формы
  const reset = () => {
    setName('');
    setNumber('');
  };

 

    return (
      <form onSubmit={handleSubmit}>
        <label className={css.lable}> Name
          <input
          className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <lable className={css.lable}> Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </lable>
        <button className={css.addBtn} type="submit">Add contact</button>
      </form>
    );
  
}

export { ContactForm };

ContactForm.propTypes = {
  addNewContact: PropTypes.func,
};