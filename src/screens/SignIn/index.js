import React from "react";
import { Container, Form, InputGroup, FormControl, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useUserContext } from "../../context/UserProvider";
import './styles.scss';

const SignIn = React.memo(() => {

    const { setIsLogin } = useUserContext();
    const navigate = useNavigate();

    const onSignIn = () => {
        navigate('/connect-wallet');
        setIsLogin(true);
    }

    return (
        <div className="App">
            <div className="sign-in pt-5 pb-5">
                <Header />
                <Container className="d-flex flex-column align-items-end justify-content-center h-100">
                    <Col xs={12} lg={6}>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="input-primary mb-3">
                            <FormControl id="basic-url" type="email" aria-describedby="basic-addon3" placeholder="Eg. example@email.com" />
                        </InputGroup>

                        <Form.Label className="mt-4">Password</Form.Label>
                        <InputGroup className="input-primary mb-3">
                            <FormControl id="basic-url" type="password" aria-describedby="basic-addon3" placeholder="Password" />
                        </InputGroup>

                        <div className="text-end">
                            <Link to="/" className="forgot-password">Forgot Password</Link>
                        </div>

                        <div className="buttons d-flex flex-column align-items-center mt-5">
                            <Button className="button-secondary" onClick={() => navigate('/sign-up')}>Sign Up</Button>
                            <Button className="button-primary mt-4" onClick={onSignIn}>Sign In</Button>
                        </div>
                    </Col>
                </Container>
            </div>
        </div>
    );
});

export default SignIn;