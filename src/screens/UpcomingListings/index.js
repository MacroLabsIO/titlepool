import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import './styles.scss';

const UpcomingListings = React.memo(() => {

    const navigate = useNavigate();

    const upcomingListings = [
        {
            title: "The Informer",
            thumbnail: "/movies/the-informer.png",
            username: "Rachel Grady",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Worldwide",
            exhibition: "Digital",
            timeRemaining: "01:28 Hrs"
        },
        {
            title: "Logan Lucky",
            thumbnail: "/movies/logan-lucky.png",
            username: "Oren Peli",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United States",
            exhibition: "Television",
            timeRemaining: "02:24 Hrs",
            isFavorite: true,
        },
        {
            title: "Lost In Translation",
            thumbnail: "/movies/lost.png",
            username: "Trevor Hawkins",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "United Kingdom",
            exhibition: "Digital & Television",
            timeRemaining: "00:28 Hrs"
        },
        {
            title: "The Hunt",
            thumbnail: "/movies/the-hunt.png",
            username: "Anna Mikami",
            userAvatar: "/avatars/user-1.png",
            terrirtory: "Asia",
            exhibition: "Netflix",
            timeRemaining: "05:32 Hrs"
        }
    ]

    return (
        <div className="upcoming-listings pt-5 pb-5">
            <Header />
            <Container className="mt-5 pt-5 pb-5 container-padding">
                <Row>
                    <Col xs={12}>
                        <h1 className="heading mb-2">Upcoming Auctions</h1>
                        <h6 className="sub-heading mb-5">Starts Live in:</h6>
                    </Col>
                    {upcomingListings.map((item) => (
                        <Col xs={3}>
                            <ItemCard
                                upcoming
                                title={item.title}
                                thumbnail={item.thumbnail}
                                username={item.username}
                                userAvatar={item.userAvatar}
                                terrirtory={item.terrirtory}
                                exhibition={item.exhibition}
                                timeRemaining={item.timeRemaining}
                                isFavorite={item.isFavorite}
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

export default UpcomingListings;