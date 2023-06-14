import React, { useState, useEffect } from 'react';
import { Frame, Container, Title, SubTitle } from './App.styled';
import { ContactForm } from 'components/contactForm';
import { ContactList } from 'components/contactList';
import { Filter } from 'components/filter';
import { nanoid } from 'nanoid';
import defaultContacts from '../../data/contacts.json';

export const App = () => {
  const localStorageKey = 'contacts';
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(localStorageKey);
    return savedContacts ? JSON.parse(savedContacts) : defaultContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandler = newContact => {
    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicateName) {
      return alert(`${newContact.name} is already in contacts`);
    }

    const newContactId = nanoid();
    const updatedContacts = [...contacts, { ...newContact, id: newContactId }];
    setContacts(updatedContacts);
  };

  const onDeleteHandler = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const onFilterContacts = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Frame>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={onSubmitHandler} />

        <SubTitle>Contacts</SubTitle>
        <Filter value={filter} onChange={onFilterContacts} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteHandler}
        />
      </Frame>
    </Container>
  );
};



// import React, { useState, useEffect } from 'react';
// import { Frame, Container, Title, SubTitle } from './App.styled';
// import { ContactForm } from 'components/contactForm';
// import { ContactList } from 'components/contactList';
// import { Filter } from 'components/filter';
// import { nanoid } from 'nanoid';
// import defaultContacts from '../../data/contacts.json';


// export const App = () => {
// const [contacts, setContacts] = useState(defaultContacts);
// const [filter, setFilter] = useState('');
// const localStorageKey = 'contacts';

// const savedContacts = localStorage.getItem(localStorageKey);



// useEffect(() => {
// if (savedContacts) {
// setContacts(JSON.parse(savedContacts));
// }
// }, []);

// useEffect(() => {
// localStorage.setItem(localStorageKey, JSON.stringify(contacts));
// }, [contacts]);

//   const onSubmitHandler = newContact => {
//     const isDuplicateName = contacts.some(
//       contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
//     );

//     if (isDuplicateName) {
//       return alert(`${newContact.name} is already in contacts`);
//     }

//     const newContactId = nanoid();
//     const updatedContacts = [...contacts, { ...newContact, id: newContactId }];
//     setContacts(updatedContacts);
//   };

//   const onDeleteHandler = id => {
//     const updatedContacts = contacts.filter(contact => contact.id !== id);
//     setContacts(updatedContacts);
//   };

//   const onFilterContacts = event => {
//     const filterValue = event.target.value;
//     setFilter(filterValue);
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <Container>
//       <Frame>
//         <Title>Phonebook</Title>
//         <ContactForm onSubmit={onSubmitHandler} />

//         <SubTitle>Contacts</SubTitle>
//         <Filter value={filter} onChange={onFilterContacts} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={onDeleteHandler}
//         />
//       </Frame>
//     </Container>
//   );
// };
