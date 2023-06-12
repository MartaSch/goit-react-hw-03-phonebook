import PropTypes from 'prop-types';
import css from './ContactList.module.css'
import { nanoid } from "nanoid";

const ContactList = ({ listContacts, onDeleteContact }) => {
    return (
        <div>
        <ul className = {css.contactList}> 
            {listContacts.map(({ id, name, number }) =>(
                <li className={css.listElements} key={nanoid()}>
                    <span>{name}: {number}</span>
                    <button className = {css.deleteButton} type='button' onClick={()=> onDeleteContact(id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
        </div>
    )
}

ContactList.propTypes = {
    onDeleteContact: PropTypes.func,
    listContacts: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    )
}
export default ContactList;