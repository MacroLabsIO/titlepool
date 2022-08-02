import React, { useEffect } from "react";
import { Container, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./styles.scss";

const ConnectWallet = React.memo(() => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      navigate("/");
    }
  }, [publicKey]);

  return (
    <div className="connect-wallet">
      <Header />
      <div className="d-flex h-100">
        <div style={{ width: "25%" }}>
          <Image src="/splash-2.png" alt="" width="100%" height="100%" />
        </div>
        <div style={{ width: "75%" }}>
          <Container className="d-flex flex-column justify-content-center h-100 p-5">
            <Col xs={12} className="p-5 pb-0">
              <BackButton onClick={() => navigate("/")} />

              <h1>Connect Your Wallet</h1>
              <h6>
                Connect with available wallet providers or create <br /> new
                wallet
              </h6>

              <div className="phantom-card p-4 mt-5 mb-5">
                <WalletMultiButton className="btn btn-ghost mr-2" />
                <h3 className="mt-3">Phantom</h3>
                <h6>Connect with ypur Google, Facebook, Twitter or Discord</h6>
              </div>

              <h6 className="mb-5">
                We do not own your private keys and cannot access <br /> your
                funds without confirmation.
              </h6>

              <div className="buttons">
                <Button
                  className="button-secondary me-4"
                  onClick={() => navigate("/")}
                  style={{ width: "213px" }}
                >
                  Continue
                </Button>
                <Button
                  className="button-primary"
                  onClick={() => navigate("/")}
                  style={{ width: "159px" }}
                >
                  Skip
                </Button>
              </div>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
});

export default ConnectWallet;
