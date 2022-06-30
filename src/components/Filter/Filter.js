import { useContacts } from 'redux/contacts/contactsSlice';

export default function Filter() {
  const { filtrChange, filter } = useContacts();
  return (
    <>
      <p>Find contact by name</p>
      <input
        onChange={e => filtrChange(e.target.value)}
        type="text"
        name="filter"
        value={filter}
      />
    </>
  );
}
