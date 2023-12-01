import React from "react";
import { Col, Container, Row, Image, Accordion } from "react-bootstrap";
import {
  FacebookIcon,
  TikTokIcon,
  TwitterIcon,
  InstagramIcon,
  FooterLogo,
  OpenSea,
} from "../../assets/icons/user";
import "../../styles/user/footer.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../navigation/constants";
import { useTranslation } from "react-i18next";
// import OpenSea from "../assets/icons/user/overSea.png";
function FooterEvorium() {
  const { t, i18n } = useTranslation();
  const {
    usrPrivacy,
    usrRefundPolicy,
    usrTermCon,
    usrFaq,
    usrContactUs,
    usrAboutUs,
    usrEditProfile,
  } = ROUTES;
  return (
    <>
      <section className="footer">
        <Container>
          <Row>
            <Col md={4}>
              <div className="footer_1">
                <div className="footer-logo-widget">
                  <FooterLogo />
                </div>
                <ul className="social-icons sc-1">
                  <li>
                    <Link to="/">
                      <InstagramIcon />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <TwitterIcon />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Image src={OpenSea} alt="union" className="openSea" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {" "}
                      <TikTokIcon />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <FacebookIcon />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={8}>
              <Row className="right-widget desktop-menu">
                <Col md={3}>
                  <div className="links-wraper">
                    <h4>{t("navigation")}</h4>
                    <ul>
                      <li>
                        <a href="#">{t("AllProducts")}</a>
                      </li>
                      <li>
                        <a href="#">{t("ValueKits")}</a>
                      </li>
                      <li>
                        <a href="#">{t("Bestsellers")}</a>
                      </li>
                      <li>
                        <a href="#">{t("PreviousCollection")}</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="links-wraper">
                    <h4>{t("Need help?")}</h4>
                    <ul>
                      <li>
                        <Link to={usrFaq}>{t("FAQ")}</Link>
                      </li>
                      <li>
                        <a href="#">{t("TrackOrder")}</a>
                      </li>
                      <li>
                        <a href="#">{t("Quadplay")}</a>
                      </li>
                      <li>
                        <Link to={usrContactUs}>{t("ContactUs")}</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="links-wraper">
                    <h4>{t("evoriumfam")}</h4>
                    <ul>
                      <li>
                        <Link to={usrAboutUs}>{t("About")} </Link>
                      </li>
                      <li>
                        <a href="#">{t("Rewards")}</a>
                      </li>
                      <li>
                        <a href="#">{t("Affiliation")}</a>
                      </li>
                      <li>
                        <Link to={usrEditProfile}>{t("MyAccount")}</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="links-wraper">
                    <h4>{t("legalinfo")}</h4>
                    <ul>
                      <li>
                        <Link to={usrTermCon}>{t("terms")}</Link>
                      </li>
                      <li>
                        <Link to={usrPrivacy}>{t("privacy")}</Link>
                      </li>
                      <li>
                        <Link to={usrRefundPolicy}>{t("refunds")}</Link>
                      </li>
                      <li>
                        <a href="#">{t("previouscollection")}</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className="mobile-menu d-block d-md-none">
                <Col md={12}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>NAVIGATION</Accordion.Header>
                      <Accordion.Body>
                        <div className="links-wraper">
                          <ul>
                            <li>
                              <a href="#">All Products</a>
                            </li>
                            <li>
                              <a href="#">Value Kits</a>
                            </li>
                            <li>
                              <a href="#">Bestsellers</a>
                            </li>
                            <li>
                              <a href="#">Previous Collection</a>
                            </li>
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>ABOUT US?</Accordion.Header>
                      <Accordion.Body>
                        <div className="links-wraper">
                          <ul>
                            <li>
                              <a href="#">FAQ</a>
                            </li>
                            <li>
                              <a href="#">Track Your Order</a>
                            </li>
                            <li>
                              <a href="#">Quadplay</a>
                            </li>
                            <li>
                              <a href="#">Contact Us</a>
                            </li>
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>EVORIUM FAM'</Accordion.Header>
                      <Accordion.Body>
                        <div className="links-wraper">
                          <ul>
                            <li>
                              <a href="#">About us </a>
                            </li>
                            <li>
                              <a href="#">Rewards & Loyalty</a>
                            </li>
                            <li>
                              <a href="#">Affiliation Club</a>
                            </li>
                            <li>
                              <a href="#">My Account</a>
                            </li>
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header> LEGAL INFO</Accordion.Header>
                      <Accordion.Body>
                        <div className="links-wraper">
                          <ul>
                            <li>
                              <a href="#">Terms Of Service</a>
                            </li>
                            <li>
                              <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                              <a href="#">Refunds Policy</a>
                            </li>
                            <li>
                              <a href="#">Previous Collection</a>
                            </li>
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <ul className="social-icons sc-2 d-none">
                <li>
                  <Link to="/">
                    <InstagramIcon />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <TwitterIcon />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <Image src={OpenSea} alt="union" className="openSea" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    {" "}
                    <TikTokIcon />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FacebookIcon />
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>

          <div className="copy-right">
            <div className="brand-name">
              <p>© 2023 EVORIUM</p>
            </div>
            <div className="privacy-links">
              <Link to={usrTermCon}>{t("terms")}</Link>
              <Link to={usrRefundPolicy}>{t("refunds")}</Link>
              <Link to={usrPrivacy}>{t("privacy")}</Link>
            </div>
            <div className="email-div">
              <a href="mailto:contact@evorium.com" target="_blank">
                contact@evorium.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default FooterEvorium;
