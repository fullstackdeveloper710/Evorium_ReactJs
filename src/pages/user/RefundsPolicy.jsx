import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
function RefundsPolicy() {
  return (
    <>
      <section className="auth">
        <Container>
          <Row>
            {/* <Col md={6} sm={4}> */}
            <div className="text-block">
              <h1 className="auth__title">Refunds Policy</h1>
              <p className="text-white">
                When your business operates in the digital ecosystem, it is very
                important to operate within the legal boundaries to avoid any
                potential issues. And if you’re involved in the e-commerce
                business, whether it’s an online store, digital software, or a
                SaaS, a couple of the most basic legal aspects you must address
                are handing return or exchange requests and processing refund
              </p>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default RefundsPolicy;
