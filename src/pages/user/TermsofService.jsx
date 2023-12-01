import React from "react";
import { Container, Row } from "react-bootstrap";
function TermsofService() {
  return (
    <>
      <section className="auth">
        <Container>
          <Row>
            {/* <Col md={6} sm={4}> */}
            <div className="text-block">
              {" "}
              <h1 className="auth__title">Terms of Service</h1>
              <div className="text-block">
                <p className="text-white">
                  One of the purposes of a terms of service policy is to explain
                  the rules and guidelines your users must follow while
                  accessing your services, which helps set their expectations.
                  By clearly communicating what’s allowed and prohibited on your
                  website or app and explaining to your users the consequences
                  of breaking those rules, you make it easier for your business
                  to prevent users from abusing your services or causing harm to
                  others. Terms of Service Limit Your Liabilities You can
                  include various disclaimers within your terms of service to
                  help protect your website or app from being held liable for
                  things like: Loss of profits Personal injury Warranty issues
                  Misrepresented products Computer issues Establishing what your
                  business is and isn’t liable for in a ToS agreement limits
                  what you can be sued for and may save you thousands in legal
                  fees.
                </p>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TermsofService;
