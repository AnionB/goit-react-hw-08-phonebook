import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Form, Button, Container } from 'react-bootstrap';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contacts/contactsApi';
import { getIsLogin } from 'redux/auth/authSlice';

export default function ContactForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const { data: contactsArray, refetch } = useGetContactsQuery();
  const isLogin = useSelector(getIsLogin);
  useEffect(() => {
    isLogin && refetch();
  }, [refetch, isLogin]);

  const [addCont, { isLoading: isUpdating, isSuccess, error }] =
    useAddContactMutation();

  useEffect(() => {
    isSuccess && toast.success('Контакт успешно добавлен') && clearForm();

    !isSuccess &&
      error &&
      toast.error(' что-то пошло не так, попробуй еще разок');
  }, [error, isSuccess]);

  function addContact(contact) {
    if (
      contactsArray.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.error(contact.name + ' is already in contact');
      return;
    }

    addCont(contact);
  }

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        console.log(e.target.name);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({
      name,
      number,
    });
  };

  const clearForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Container>
      <Form.Group
        className="mb-4 border border-1 p-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Label className="mb-4">Name</Form.Label>
          <Form.Control
            className="mb-4"
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <Form.Label className="mb-4">Number</Form.Label>
          <Form.Control
            className="mb-4"
            onChange={handleChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <Button type="submit" disabled={isUpdating} className="mb-4">
            Add contact
          </Button>
        </Form>
      </Form.Group>
    </Container>
  );
}
