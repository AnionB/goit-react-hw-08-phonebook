import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useMatch, useNavigate } from 'react-router-dom';

export default function StartPage() {
  const match = useMatch('/');
  const navigate = useNavigate();
  useEffect(() => {
    !match && navigate('/login', { replace: true });
  }, [match, navigate]);
  return (
    <Container className="d-flex justify-content-center">
      <h2 className="mb-4">
        Welcome to Phone Book page! <br />
        Login please!
      </h2>
    </Container>
  );
}
