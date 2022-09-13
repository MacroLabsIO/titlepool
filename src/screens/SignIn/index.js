import React, { useState } from "react";
import { Container, Form, InputGroup, FormControl, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Header from "../../components/Header";
import firebase from "../../context/firebase"
import './styles.scss';

const SignIn = React.memo(() => {

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSignIn = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        
        signInWithEmailAndPassword(getAuth(firebase), data.email, data.password)
        .then((userCredential) => {
            navigate('/connect-wallet');
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage.split(': ')[1]);
        });
    }

    return (
        <div className="App">
            <div className="sign-in pt-5 pb-5">
                <Header />
                <Container className="d-flex flex-column align-items-end justify-content-center h-100">
                    <Col xs={12} lg={6}>
                        <Form className="signup-form mt-5" onSubmit={onSignIn}>

                            <Form.Label>Email</Form.Label>
                            <InputGroup className="input-primary mb-3">
                                <FormControl id="email" type="email" name="email" aria-describedby="basic-addon3" placeholder="Eg. example@email.com" />
                            </InputGroup>

                            <Form.Label className="mt-4">Password</Form.Label>
                            <InputGroup className="input-primary mb-3">
                                <FormControl id="password" type="password" name="password" aria-describedby="basic-addon3" placeholder="Password" />
                            </InputGroup>

                            { error &&  <Form.Label className="error-text">{error}</Form.Label> } 


                            <div className="text-end">
                                <Link to="/" className="forgot-password">Forgot Password</Link>
                            </div>

                            <div className="buttons d-flex flex-column align-items-center mt-5">
                                <Button className="button-secondary" onClick={() => navigate('/sign-up')}>Sign Up</Button>
                                <Button className="button-primary mt-4" type="submit">Sign In</Button>
                            </div>
                        </Form>
                    </Col>
                </Container>
            </div>
        </div>
    );
});

export default SignIn;