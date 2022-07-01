import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

import { useLogoutMutation } from 'redux/auth/authApi';
import { getIsLogin, getUser, setCredentials } from 'redux/auth/authSlice';

export default function AppBar() {
  const isLogin = useSelector(getIsLogin);
  const user = useSelector(getUser);

  const [logoutUser, { isSuccess }] = useLogoutMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    isSuccess &&
      dispatch(setCredentials({ user: null, token: null, isLogin: false }));
  }, [dispatch, isSuccess]);
  return (
    <header>
      <Navbar bg="primary fs-1 text" variant="dark">
        <Container>
          <Navbar.Brand className="fs-1 text">Phone Book</Navbar.Brand>
          <Nav className="ml-auto">
            {!isLogin ? (
              <>
                <Nav.Item>
                  <Link to={'/login'} className=" nav-link">
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={'/register'} className=" nav-link">
                    Register
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Navbar.Brand className="fs-1 text">
                  Welcome, {user.name}
                </Navbar.Brand>
                <Image
                  height="80"
                  roundedCircle
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb27o8jm1S83NE9rfR8vboWxYgwGthqPJVvq1kreMuqR0czE0BxNxBiL425oZwySXj6r0&usqp=CAU"
                />
                <Nav.Item>
                  <Link to={'/'} className=" nav-link " onClick={logoutUser}>
                    Logout
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
