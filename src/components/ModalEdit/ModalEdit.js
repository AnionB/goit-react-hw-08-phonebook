import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useEditContactMutation } from 'redux/contacts/contactsApi';
import { toast } from 'react-toastify';

export function ModalEdit(props) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [editContact, { isSuccess, error }] = useEditContactMutation();

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
  useEffect(() => {
    if (props.contact) {
      setName(props.contact.name);
      setNumber(props.contact.number);
      setId(props.contact.id);
    }
  }, [props.contact, props.show]);

  useEffect(() => {
    isSuccess && toast.success('Контакт успешно изменен');

    !isSuccess &&
      error &&
      toast.error(' что-то пошло не так, попробуй еще разок');
  }, [error, isSuccess]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            editContact({ id, name, number });
            props.onHide();
          }}
        >
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
