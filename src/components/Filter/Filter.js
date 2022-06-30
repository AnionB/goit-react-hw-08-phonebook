import { useContacts } from 'redux/contacts/contactsSlice';
import { Form, Container } from 'react-bootstrap';

export default function Filter() {
  const { filtrChange, filter } = useContacts();
  return (
    <Container>
      <Form.Group
        className="mb-4 border border-1 p-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form>
          <Form.Label className="mb-4">Find contact by name</Form.Label>
          <Form.Control
            className="mb-4"
            onChange={e => filtrChange(e.target.value)}
            type="text"
            name="filter"
            value={filter}
          />
        </Form>
      </Form.Group>
    </Container>
  );
}
