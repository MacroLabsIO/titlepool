import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './styles.scss';

const AboutUs = React.memo(() => {

    return (
        <div className="about-us mt-3 pb-5">
            <Header />
            <Image src="/about-bg.png" alt="about-us" width="100%" height="240px" className="mt-4" />
            <Container className="mt-5 p-5">
                <Row>
                    <Col xs={12}>
                        <h1 className="section-title">How It Works</h1>
                    </Col>

                    <Col xs={6} className="d-flex align-items-center mt-5 pb-5">
                        <h1 className="sub-title">For Filmmakers</h1>
                    </Col>
                    <Col xs={6} className="d-flex align-items-center justify-content-center mt-5 pb-5">
                        <h6 className="info-text">
                        <b>1.</b> Determine which rights you want to sell and for how long you should be the owner of these rights.
                        <br />
                        <b> 2. Mint your contract</b> - a trackable NFT will be generated with a written contract attached
                        <br />
                        <b> 3. List your NFT</b> - Buyers will be able to bid for the selected rights to your film, ensuring you get a fair market price for very specific privileges.
                        </h6>
                    </Col>

                    <hr />

                    <Col xs={6} className="d-flex align-items-center mt-5 pb-5">
                        <h6 className="info-text">
                        <b>1. Search for exciting projects that matter to your audiences</b> - Rights and terms listed clearly on each hot sheet
                        <br />
                        <b> 2. Place a bid</b> - Winning a contract will place it directly in your inventory
                        <br />
                        <b> 3. Exercise or sell your newly acquired rights</b> - Clear rights designations ensure everyone knows what’s within their privileges. Selling the rights onward ensures easy and straightforward payments to all parties.
                        </h6>
                    </Col>
                    <Col xs={6} className="d-flex align-items-center justify-content-center mt-5 pb-5">
                        <h1 className="sub-title">For Buyers</h1>
                    </Col>

                    <Col xs={12} className="mt-5 d-flex flex-column justify-content-center align-items-center pb-5">
                        <h1 className="section-title w-auto mb-5 mt-5">Who We Are</h1>
                        <h6 className="info-text w-100 mb-5 max-width-1020">
                        Titlepool is a product of StudioFest. StudioFest is a production, financing, and distribution company dedicated to discovering and elevating fresh filmmaking talent from around the world.
                        StudioFest prides itself on creating innovative, high impact solutions for the filmmakers of today. Whether it’s revolutionizing the festival landscape or demystifying the industry, StudioFest strives to shape a better, creator focused future.
                        </h6>
                    </Col>

                    <Col xs={12} className="mt-5 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="section-title w-auto mb-5">Our Mission</h1>
                        <h6 className="info-text w-100 mb-5 max-width-1020">
                        Titlepool was created with the goal of streamlining the sales and distribution pipeline, by offering all participants a clear and straightforward way to sell and buy film rights. Through Titlepool, filmmakers and buyers can enjoy instant payments and complete transparency, taking months off of the sales timeline and accelerating their company’s success.
                        </h6>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
});

export default AboutUs;
