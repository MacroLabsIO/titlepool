import React from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./styles.scss";

const Header = React.memo(() => {
  const { isLogin } = useUserContext();
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
            {/* <Nav.Link>
              <Link to="/upcoming-listings">Upcoming Listings</Link>
            </Nav.Link> */}
            <Nav.Link>
              <Link to="/about-us">About Us</Link>
            </Nav.Link>
          </Nav>
          {publicKey ? (
            <>
              <Nav.Link>
                <Link to="/wallet">My Wallet</Link>
              </Nav.Link>
              <Button
                className="button-primary ms-5"
                onClick={() => navigate("/create")}
              >
                <FontAwesomeIcon icon={faPlus} /> Create
              </Button>
              <Image
                onClick={() => navigate("/profile")}
                className="user-avatar ms-5"
                src="/avatars/user-1.png"
              />
              <WalletMultiButton className="button-primary ms-5" />
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/sign-up")}
                className="button-primary ms-5"
              >
                Sign Up
              </Button>
              <WalletMultiButton className="button-primary ms-5" />
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
