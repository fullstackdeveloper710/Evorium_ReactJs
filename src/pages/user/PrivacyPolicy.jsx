import React from "react";
import { Container, Row } from "react-bootstrap";
import "../../styles/user/auth.scss";

function PrivacyPolicy() {
  return (
    <>
      <section className="auth">
        <Container>
          <Row>
            {/* <Col md={6} sm={4}> */}

            <div className="text-block">
              <h1 className="auth__title"> 1. Privacy Policy</h1>
              <div>
                <p className="text-white">
                  A privacy policy on your website is a legal document informing
                  users about how you collect and handle their personal data,
                  who you share it with, if you sell it, and any other relevant
                  details.
                  <br />
                  <p>You might also call a privacy policy as:</p>
                  <ul>
                    <li>Privacy Agreement</li>
                    <li>Privacy Clause</li>
                    <li>Privacy Notice</li>
                    <li>Privacy Page</li>
                    <li>Privacy Policy Statement</li>
                  </ul>
                </p>
                <h1 className="auth__title">
                  {" "}
                  2. Why You Need a Privacy Policy
                </h1>
                <p className="text-white">
                  Almost every business that collects data through a website,
                  mobile app, or desktop app must publish a privacy policy due
                  to one or all of the following:
                  <br />
                  <ul>
                    <li>Data privacy laws</li>
                    <li>Third-party service requirements</li>
                    <li>
                      Maintaining trust and transparency between your business
                      and customers
                    </li>
                  </ul>
                </p>
                <h1 className="auth__title">
                  {" "}
                  3. Privacy Policies are Required by Third-Party Services
                </h1>
                <p className="text-white">
                  Do you use Google Analytics, WordPress plugins, or other
                  third-party services? If so, you’ll need a privacy policy.
                  <br />
                  Many third-party companies require you to provide consumers
                  with a privacy policy to use their tools and resources, even
                  if your website doesn’t fall under laws like the GDPR or CCPA.
                  <p>
                    Examples of third-party services that require you to have a
                    privacy policy:
                  </p>
                  <ul>
                    <li>Amazon</li>
                    <li>Apple</li>
                    <li>ClickBank</li>
                    <li>
                      Google (AdSense, Ad Words, Analytics, and Play Store)
                    </li>
                    <li>Facebook</li>
                    <li>Twitter Lead Generation</li>
                  </ul>
                  <br />
                  <p>
                    Your privacy policy should clearly state what third parties
                    can access user data and explain how and why the information
                    is shared. You must also link the third parties’ privacy
                    policies directly from your own privacy policy so your users
                    can read through the other agreements and choose if they
                    consent to how those services handle their data.
                  </p>
                </p>
              </div>
            </div>
            {/* </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default PrivacyPolicy;
