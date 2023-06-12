import ContactForm from './ContactsForm/ContactsForm';
import ContactList from "./ContactList/ContactList"
import { Component } from "react";
import { nanoid } from "nanoid"
import Filter from "./Filter/Filter";

const LOCAL_KEY = 'contactPhonebook'

class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

componentDidUpdate = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts))
}

componentDidMount = () => {
  const savedContacts = localStorage.getItem(LOCAL_KEY)
  if(savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    this.setState({ contacts: parsedContacts});
    return
  }

}

  addContact = ({ id, name, number }) => {
     const contact = {
      id: nanoid(),
      name,
      number,
     }
     const nameContacts = this.state.contacts.find(
      contact => contact.name === name
     )
     if(nameContacts) {
      alert(`${name} is already in contacts`);
     } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts]
      }))
     }
    };
  
  deleteContact = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  handleFilter = e => {
   this.setState({ filter: e.currentTarget.value })
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  render () {
    return (
      <div>
    <ContactForm
    onSubmit={this.addContact}
    />
    <Filter
      handleFilter={this.handleFilter}
    />
    <ContactList
      listContacts = {this.getFilteredContacts()}
      onDeleteContact={this.deleteContact}
    />
    </div>
    )
  }
}
export default App;
