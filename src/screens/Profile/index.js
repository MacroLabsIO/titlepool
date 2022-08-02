import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import ItemCard from "../../components/ItemCard";
import './styles.scss';

const Profile = React.memo(() => {

    const navigate = useNavigate();

    const filmsMinted = [
        {
            title: "True Lies",
            thumbnail: "/movies/true-lies.png",
            username: "James Cameron",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Worldwide",
            exhibition: "Digital",
        },
        {
            title: "Terminator",
            thumbnail: "/movies/terminator.png",
            username: "James Cameron",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United States",
            exhibition: "Television",
        },
        {
            title: "Titanic",
            thumbnail: "/movies/titanic.png",
            username: "James Cameron",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United Kingdom",
            exhibition: "Digital & Television",
        },
        {
            title: "Avatar",
            thumbnail: "/movies/avatar.png",
            username: "James Cameron",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Asia",
            exhibition: "Netflix",
        }
    ]

    const filmRightsPurchased = [
        {
            title: "Tenet",
            thumbnail: "/movies/tenet.png",
            username: "Rachel Grady",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Worldwide",
            exhibition: "Digital",
        },
        {
            title: "Fast & Furious",
            thumbnail: "/movies/fast.png",
            username: "Oren Peli",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United States",
            exhibition: "Television",
        },
        {
            title: "Pulp Fiction",
            thumbnail: "/movies/pulp.png",
            username: "Trevor Hawkins",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United Kingdom",
            exhibition: "Digital & Television",
        },
        {
            title: "Django Unchained",
            thumbnail: "/movies/django.png",
            username: "Anna Mikami",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Asia",
            exhibition: "Netflix",
        }
    ]

    return (
        <div className="profile pt-5 pb-5">
            <Header />
            <Container className="position-relative">
                <div className="position-absolute" style={{ top: "95px", left: "12px" }}>
                    <BackButton />
                </div>
            </Container>
            <Container className="container-padding mt-5 pt-5 pb-5">
                <Row>
                    <Col xs={12} className="mt-5 mt-xl-0">
                        <div className="profile-info d-flex align-items-center mt-5 mt-xl-0">
                            <Image className="profile-avatar" src="/avatars/user-1.png" alt="profile-image" />
                            <div className="ms-5 d-flex flex-column align-items-start">
                                <h1>James Cameron</h1>
                                <div className="profile-badge mt-2">
                                    Filmmaker
                                </div>
                            </div>
                        </div>
                        <h6 className="sub-title mt-4">
                            IMBD LINK: <span><a href="https//www.imdb.com/name/nm0000138/bio">https//www.imdb.com/name/nm0000138/bio</a></span>
                        </h6>
                    </Col>

                    <h6 className="sub-title mt-5 mb-4">
                        Films Minted
                    </h6>
                    {filmsMinted.map((item) => (
                        <Col xs={3} className="mb-5">
                            <ItemCard
                                title={item.title}
                                thumbnail={item.thumbnail}
                                username={item.username}
                                userAvatar={item.userAvatar}
                                terrirtory={item.terrirtory}
                                exhibition={item.exhibition}
                                onClick={() => navigate('/preview')}
                            />
                        </Col>
                    ))}

                    <h6 className="sub-title mt-5 mb-4">
                        Film Rights Purchased
                    </h6>
                    {filmRightsPurchased.map((item) => (
                        <Col xs={3} className="mb-5">
                            <ItemCard
                                title={item.title}
                                thumbnail={item.thumbnail}
                                username={item.username}
                                userAvatar={item.userAvatar}
                                terrirtory={item.terrirtory}
                                exhibition={item.exhibition}
                                onClick={() => navigate('/preview')}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
});

export default Profile;