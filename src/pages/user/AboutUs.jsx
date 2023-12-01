import React from "react";
import { Container, Row } from "react-bootstrap";
import "../../styles/user/auth.scss";

const AboutUs = () => {
  return (
    <section className="auth">
      <Container>
        <Row>
          <h1 className="auth__title"> About Us</h1>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
