import React, { useContext } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./styles.scss";
import firebase from '../../context/firebase';

const Header = React.memo(() => {
    const { currentUser } = useContext(AuthContext)
    const { publicKey } = useWallet();
    const navigate = useNavigate();

    return (
        <Navbar variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <Image src="logo.png" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="ms-auto my-2 my-lg-0">
                        <Nav.Link>
                            <Link to="/">Explore</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/about-us">About Us</Link>
                        </Nav.Link>
                    </Nav>
                    {(currentUser && publicKey) &&
                        <>
                            <Nav.Link>
                                <Link to="/wallet">Wallet</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/profile">Profile</Link>
                            </Nav.Link>

                            <Button
                                className="button-alt ms-3"
                                onClick={() => navigate("/create")}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Create
                            </Button>
                            {/* <Image
                                onClick={() => navigate("/profile")}
                                className="user-avatar ms-3"
                                src="/avatars/user-1.png"
                            /> */}

                            <WalletMultiButton className="ms-2" />

                        </> }
                        <>
                            
                            { currentUser && 
                            <>
                            <Button
                                onClick={() => {
                                    signOut(getAuth(firebase), () => {
                                        navigate("/");
                                    });
                                }}
                                className="button-primary ms-3">
                                Sign Out
                            </Button> 
                            </>}
                            { !currentUser && <Button
                                onClick={() => navigate("/sign-up")}
                                className="button-primary ms-3">
                                Sign Up 
                            </Button> }
                            
                        </>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;
