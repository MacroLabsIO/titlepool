import React from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Image } from "react-bootstrap";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.scss';

const Footer = React.memo(() => {

    return (
        <footer>
            <Container className="p-5 pb-0">
                <Row>
                    <Col xs={2}>
                        <ul>
                            <li className="heading">Quick Links</li>
                            <li><a href="/" className="footer-link">Explore</a></li>
                            <li><a href="/" className="footer-link">Upcoming Listings</a></li>
                            <li><a href="/about-us" className="footer-link">About Us</a></li>
                        </ul>
                    </Col>
                    <Col xs={2}>
                        <ul>
                            <li className="heading">Company</li>
                            <li><a href="mailto:contact@titlepool.io" className="footer-link">Contact Us</a></li>
                            <li><a href="https://docsend.com/view/2e68umynfnpx9dns" target="_blank" className="footer-link" rel="noreferrer">Invest</a></li>
                            {/* <li>Media Highlights</li> */}
                        </ul>
                    </Col>
                    <Col xs={4} className="ms-auto">
                        <div className="subscribe">
                            <h6 className="heading">Subscribe</h6>
                            <InputGroup className="subscribe-input mb-3">
                                <FormControl
                                    placeholder="Email address"
                                    aria-label="subscriber-email-address"
                                    aria-describedby="subscriber-address"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <FontAwesomeIcon icon={faArrowRight} color="#ffffff" />
                                </Button>
                            </InputGroup>
                        </div>
                    </Col>

                    <Col xs={12}>
                        <hr style={{ marginTop: "100px", marginBottom: "25px" }} />
                    </Col>

                    <Col xs={12} className="d-flex align-items-center justify-content-between">
                        <Image src="/logo-2.svg" />

                        <ul className="bottom-list d-flex">
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                        </ul>

                        <div className="socials d-flex">
                            <Button className="social-button me-3">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Button>
                            <Button className="social-button me-3">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Button>
                            <Button className="social-button">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
});

export default Footer;