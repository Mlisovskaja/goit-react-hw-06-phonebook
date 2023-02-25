import { useSelector, useDispatch } from 'react-redux';

import PhonebookForm from '../Phonebook/PhonebookForm';
import Filter from '../Phonebook/Filter';
import ContactsList from '../Phonebook/ContactsList';

import { addContact, deleteContact } from '../redux/contacts/contacts-slice';
import { setFilter } from '../redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

const ContactsPage = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts list`);
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isName = Boolean(filteredContacts.length);

  return (
    <>
      <PhonebookForm onSubmit={handleAddContact} />
      <Filter value={filter} handleChange={handleFilter} />
      {isName && (
        <ContactsList
          deleteName={handleDeleteContact}
          contacts={filteredContacts}
        />
      )}
      {/* {!isName && <p>No contacts in list</p>} */}
    </>
  );
};

export default ContactsPage;
