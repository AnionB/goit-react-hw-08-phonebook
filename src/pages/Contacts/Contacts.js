import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import React from 'react';
import { Container } from 'react-bootstrap';

export default function Contacts() {
  return (
    <Container>
      <h1 className="mb-4">Add contact</h1>
      <ContactForm />
      <h1 className="mb-4">Filter</h1>
      <Filter />
      <h1 className="mb-4">Contact list</h1>
      <ContactList />
    </Container>
  );
}
