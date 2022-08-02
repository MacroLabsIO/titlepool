import React from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './styles.scss';
import CustomDatePicker from "../../components/CustomDatePicker";

const SignUp = React.memo(() => {

    const rolesList = [
        "Filmmaker", "Sales Agent", "Distributor", "Exhibitor", "Investor", "Studio"
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="sign-up pt-5 pb-5">
            <Header />
            <Container className="d-flex flex-column align-items-center justify-content-center h-100">
                <Col xs={6} className="mt-5">
                    <Form className="signup-form mt-5" onSubmit={handleSubmit}>
                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">First Name</Form.Label>
                            <Form.Control required id="firstname" type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Last Name</Form.Label>
                            <Form.Control required id="lastname" type="text" placeholder="Last name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">IMBD Profile Link</Form.Label>
                            <Form.Control required id="imbdlink" type="text" placeholder="IMBD profile link" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Address</Form.Label>
                            <Form.Control required id="address" type="text" placeholder="Select country" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Street Address</Form.Label>
                            <Form.Control required id="street-address" type="text" placeholder="Street address" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Street Address Link 2</Form.Label>
                            <Form.Control id="street-address-2" type="text" placeholder="Street address" />
                        </Form.Group>

                        <div className="input-pair d-flex flex-row justify-content-between">
                            <Form.Group className="input-primary mb-5">
                                <Form.Label className="label">City</Form.Label>
                                <Form.Control required id="city" type="text" placeholder="City" />
                            </Form.Group>
                            <Form.Group className="input-primary mb-5">
                                <Form.Label className="label">State/Province</Form.Label>
                                <Form.Control required id="state" type="text" placeholder="State" />
                            </Form.Group>
                        </div>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Postal/Zip-Code</Form.Label>
                            <Form.Control required id="postal" type="text" placeholder="Zip code" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Company Name</Form.Label>
                            <Form.Control required id="company" type="text" placeholder="Company name" />
                        </Form.Group>

                        <Form.Group className="input-primary mb-5">
                            <Form.Label className="label">Phone Number</Form.Label>
                            <Form.Control required id="phone" type="text" placeholder="+00 0000 000" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="label">Date of Birth</Form.Label>
                            <CustomDatePicker />
                        </Form.Group>

                        <Form.Group className="select-primary mb-5">
                            <Form.Label className="label">User Role</Form.Label>
                            <Form.Select defaultValue="role" id="role" aria-label="role">
                                <option value="role" disabled>Role</option>
                                {rolesList.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </Form.Select>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Form.Group>

                        <Form.Group className="checkbox-primary mb-5">
                            <Form.Check
                                required
                                id="checkbox"
                                type="checkbox"
                                label="I certify that I’m 18 years or older, and agree to the terms and conditions."
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mb-5">
                            <Button
                                type="submit"
                                className="button-secondary"
                                style={{ width: "213px" }}
                            >
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Container>
            <Footer />
        </div>
    );
});

export default SignUp;