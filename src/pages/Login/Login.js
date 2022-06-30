import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth } from 'redux/auth/authSlice';
import { useLoginMutation } from 'redux/auth/authApi';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
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
    setEmail('');
    setPassword('');
  };

  const [loginUser] = useLoginMutation();

  const { changeCredentials } = useAuth();
  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await loginUser({ email, password });
    data && changeCredentials(data);
    data && clearInput();
    error && console.log(error);
    error && toast.error(' чтото пошло не так, или неправильный логин-пароль');

    clearInput();
  };

  return (
    <Container>
      <Form.Group className="mb-4 border border-1 p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Label className="mb-4">E-mail</Form.Label>
          <Form.Control
            className="mb-4"
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            required
          />
          <Form.Label className="mb-4">Password</Form.Label>
          <Form.Control
            className="mb-4"
            onChange={handleChange}
            value={password}
            type="password"
            name="password"
            required
          />

          <Button className="mb-4" type="submit">
            Login
          </Button>
        </Form>
      </Form.Group>
    </Container>
  );
}
