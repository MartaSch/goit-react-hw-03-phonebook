import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ContactsForm.module.css';
import { nanoid } from 'nanoid';
const initialState = {
    name: "",
    number: "",
}

class ContactForm extends Component {
    state = { ...initialState};

    handleInput = (evt) => {
      const { name, value } = evt.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.onSubmit({ ...this.state });
        this.reset()
    }
      reset = () => {
        this.setState({ ...initialState });
      }

      render() {
        const { name, number } = this.state;
        const nameInputId = nanoid();
        const numberInputId = nanoid();

        return (
          <>
          <h1 className={css.phonebookTitle}>Phonebook</h1>
          <div className={css.borderContainer}>
            <form className = {css.contactsForm} onSubmit={this.handleSubmit}>
            <label htmlFor={nameInputId} className = {css.label}>
            Name
            <input id={nameInputId} className = {css.input}
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  value={name}
  onChange={this.handleInput}
  required
/>
</label>
<label htmlFor= {numberInputId} className = {css.label}>Number
<input id={numberInputId} className = {css.input}
  type="tel"
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  value={number}
  onChange={this.handleInput}
  required
/>
</label>
<button className = {css.addButton} type='submit'>Add contact</button>
</form>
</div>
</>
        )
      }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;