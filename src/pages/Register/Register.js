import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from 'redux/auth/authSlice';
import { useRegisterMutation } from 'redux/auth/authApi';
// import styles from './Register.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { changeCredentials } = useAuth();

  const [registerUser, { data, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    isSuccess && console.log('Yra ', data);
  }, [data, isSuccess]);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        console.log(e.target.name);
    }
  };

  const clearInput = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await registerUser({ name, email, password });
    data && changeCredentials(data);
    data && clearInput();
    error && console.log(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Name</p>
      <input
        onChange={handleChange}
        value={name}
        type="text"
        name="name"
        required
      />

      <p>E-mail</p>
      <input
        onChange={handleChange}
        value={email}
        type="email"
        name="email"
        required
      />
      <p>Password</p>
      <input
        onChange={handleChange}
        value={password}
        type="password"
        name="password"
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
