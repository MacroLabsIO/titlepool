import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './styles.scss';

const AboutUs = React.memo(() => {

    return (
        <div className="about-us pt-5 pb-5">
            <Header />
            <Image src="/about-bg.png" alt="about-us" width="100%" height="240px" className="mt-4" />
            <Container className="mt-5 p-5">
                <Row>
                    <Col xs={12}>
                        <h1 className="section-title">How It Works</h1>
                    </Col>

                    <Col xs={6} className="d-flex align-items-center mt-5">
                        <h1 className="sub-title">1. Tons Of Research</h1>
                    </Col>
                    <Col xs={6} className="d-flex align-items-center justify-content-center mt-5">
                        <h6 className="info-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                            dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                        </h6>
                    </Col>

                    <Col xs={6} className="d-flex align-items-center mt-5">
                        <h6 className="info-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                            dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                        </h6>
                    </Col>
                    <Col xs={6} className="d-flex align-items-center justify-content-center mt-5">
                        <h1 className="sub-title">2. Interactive Design</h1>
                    </Col>

                    <Col xs={6} className="d-flex align-items-center mt-5">
                        <h1 className="sub-title">3. Tons Of Research</h1>
                    </Col>
                    <Col xs={6} className="d-flex align-items-center justify-content-center mt-5 mb-5">
                        <h6 className="info-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                            dolor sit amet, consectetur adipiscing elit. Elit metus massa a congue faucibus.
                        </h6>
                    </Col>

                    <Col xs={12} className="mt-5 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="section-title w-auto mb-5">Our Story</h1>
                        <h6 className="info-text w-100 mb-5 max-width-1020">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus auctor semper aliquam, 
                            rhoncus, enim purus in. Volutpat odio pharetra, quisque leo vitae, ut viverra. Venenatis 
                            urna id in pharetra tellus turpis. Maecenas mollis facilisi sed at. Dolor condimentum 
                            libero nunc ullamcorper quis proin pellentesque in eget. Cursus a rhoncus fringilla 
                            amet, maecenas adipiscing arcu. Ultrices eros sed commodo egestas mattis. Tristique 
                            varius a, nascetur nisl massa, lobortis. Venenatis at elementum nulla pulvinar. Mauris 
                            nunc, erat tempor turpis risus sed dictum faucibus velit. Sit nunc dolor dolor fringilla 
                            nec nisl, vitae etiam vel. Ac adipiscing tincidunt nec molestie. Faucibus et pellentesque .
                        </h6>
                    </Col>

                    <Col xs={12} className="mt-5 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="section-title w-auto mb-5">Our Mission</h1>
                        <h6 className="info-text w-100 mb-5 max-width-1020">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus auctor semper aliquam, 
                            rhoncus, enim purus in. Volutpat odio pharetra, quisque leo vitae, ut viverra. 
                            Venenatis urna id in pharetra tellus turpis. Maecenas mollis facilisi sed at. Dolor 
                            condimentum libero nunc ullamcorper quis proin pellentesque in eget.
                        </h6>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
});

export default AboutUs;