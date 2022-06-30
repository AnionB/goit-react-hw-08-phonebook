import React, {
  // useEffect,
  useState,
} from 'react';
import { useAuth } from 'redux/auth/authSlice';
import { useLoginMutation } from 'redux/auth/authApi';

// import styles from './Login.module.css';

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
  const [
    loginUser,
    // { data, isSuccess }
  ] = useLoginMutation();
  const { changeCredentials } = useAuth();
  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await loginUser({ email, password });
    data && changeCredentials(data);
    data && clearInput();
    error && console.log(error);

    clearInput();
  };
  // useEffect(() => {
  //   isSuccess && console.log('Yra login ', data);
  // }, [data, isSuccess]);

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Login</button>
    </form>
  );
}
