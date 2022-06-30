import { useContacts } from 'redux/contacts/contactsSlice';

import {
  useGetContactsQuery,
  useDelContactMutation,
  // useEditContactMutation,
} from 'redux/contacts/contactsApi';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ContactList() {
  const { filter } = useContacts();
  const { data: contactList, isLoading, isError } = useGetContactsQuery();

  const [delCon, { isLoading: isUpdating, isSuccess, error }] =
    useDelContactMutation();
  const filteredContactList = () =>
    contactList.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  useEffect(() => {
    isSuccess && toast.warning('Контакт успешно удален');

    !isSuccess &&
      error &&
      toast.error(' что-то пошло не так, попробуй еще разок');
  }, [error, isSuccess]);

  return (
    <>
      {isError && <p>Что-то пошло не так...</p>}
      {isLoading && <p>Loading...</p>}
      {contactList && (
        <ul>
          {filteredContactList().map(({ id, name, phone }) => (
            <li key={id}>
              {name} : {phone}
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => delCon(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
