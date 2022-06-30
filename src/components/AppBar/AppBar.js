import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'redux/auth/authApi';
import { getIsLogin, useAuth } from 'redux/auth/authSlice';
import styles from './AppBar.module.css';

export default function AppBar() {
  const isLogin = useSelector(getIsLogin);
  const [logoutUser, { isSuccess }] = useLogoutMutation();
  const { changeCredentials } = useAuth();

  useEffect(() => {
    isSuccess && changeCredentials({ user: null, token: null, isLogin: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header>
      <nav className={styles.navBar}>
        <h1 onClick={handleClick}>Phone Book</h1>
        <div className={styles.linkThumb}>
          {!isLogin ? (
            <>
              {' '}
              <Link to={'/login'} className={styles.navLink}>
                Login
              </Link>
              <Link to={'/register'} className={styles.navLink}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to={'/'} className={styles.navLink} onClick={logoutUser}>
                Logout
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
