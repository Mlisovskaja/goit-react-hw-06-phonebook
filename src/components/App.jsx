import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import PhonebookForm from './Phonebook/PhonebookForm';
import Filter from './Phonebook/Filter';
import ContactsList from './Phonebook/ContactsList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts list`);
      return false;
    }

    setContacts(contacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...contacts];
    });
    return true;
  };

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const deleteName = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  };

  const FilteredContacts = getFilteredContacts();
  const isName = Boolean(FilteredContacts.length);

  return (
    <>
      <PhonebookForm onSubmit={addContact} />
      <Filter handleChange={handleFilter} />
      {isName && (
        <ContactsList deleteName={deleteName} contacts={FilteredContacts} />
      )}
      {/* {!isName && <p>No contacts in list</p>} */}
    </>
  );
};

export default App;
