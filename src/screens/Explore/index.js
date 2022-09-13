import React, { useState, useRef } from "react";
import {
  faArrowRight,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { PublicKey } from "@solana/web3.js";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Auctions, CandyShopDataValidator } from "@liqnft/candy-shop";
import "./styles.scss";

const Explore = React.memo(() => {
  const navigate = useNavigate();
  const [selectedCategory, setCategory] = useState("All");

  const candyShopRef = useRef(
    new CandyShop({
      candyShopCreatorAddress: new PublicKey("CwpGjez3RTGuCKUZ3nMqyE4uyuX9s4DJzon5nDGryTkc"), // Candy Shop owner address
      treasuryMint: new PublicKey("So11111111111111111111111111111111111111112"), // Candy Shop transaction currency
      candyShopProgramId: new PublicKey("csbMUULiQfGjT8ezT16EoEBaiarS6VWRevTw1JMydrS"), // Candy Shop program ID
      env: "devnet", // network
    })
  );

  const topFeaturedList = [
    {
      title: "Avatar",
      thumbnail: "/movies/avatar.png",
      username: "James Cameron",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "Worldwide",
      exhibition: "Digital & Television",
    },
    {
      title: "Clerks",
      thumbnail: "/movies/clerks.png",
      username: "Kevin Smith",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United States",
      exhibition: "Television",
    },
    {
      title: "El Mariachi",
      thumbnail: "/movies/elmariach.png",
      username: "Robert Rodriguez",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United Kingdom",
      exhibition: "Digital",
    },
    {
      title: "Boyhood",
      thumbnail: "/movies/boyhood.png",
      username: "Richard Linklater",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "Europe",
      exhibition: "Web",
    },
  ];

  const liveAuctionsList = [
    {
      title: "Jesus Camp",
      thumbnail: "/movies/jesus-camp.png",
      username: "Rachel Grady",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "Worldwide",
      exhibition: "Digital",
      timeRemaining: "01:28 Hrs",
    },
    {
      title: "Paranormal Activiy",
      thumbnail: "/movies/paranormal.png",
      username: "Oren Peli",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United States",
      exhibition: "Television",
      timeRemaining: "02:24 Hrs",
    },
    {
      title: "Lotawana",
      thumbnail: "/movies/lotawana.png",
      username: "Trevor Hawkins",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United Kingdom",
      exhibition: "Digital & Television",
      timeRemaining: "00:28 Hrs",
    },
    {
      title: "Souvenirs",
      thumbnail: "/movies/souvenirs.png",
      username: "Anna Mikami",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "Asia",
      exhibition: "Netflix",
      timeRemaining: "05:32 Hrs",
    },
  ];

  const exploreList = [
    {
      title: "Midsommar",
      thumbnail: "/movies/midsommar.png",
      username: "Jack Reynor",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "Worldwide",
      exhibition: "Digital",
    },
    {
      title: "Greenland",
      thumbnail: "/movies/greenland.png",
      username: "Gerad Butler",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United States",
      exhibition: "Television",
    },
    {
      title: "Nocturnal Animals",
      thumbnail: "/movies/nocturnal.png",
      username: "Tom Ford",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "United Kingdom",
      exhibition: "Digital & Television",
    },
    {
      title: "Midway",
      thumbnail: "/movies/midway.png",
      username: "Wes Tooke",
      userAvatar: "/avatars/user-1.png",
      terrirtory: "South",
      exhibition: "Amazon Prime",
    },
  ];

  return (
    <div className="explore pt-5 pb-5">
      <Header />
      <Container className="mt-5 pt-5 pb-5 container-padding">
        <CandyShopDataValidator>
          <Row>
            <Col xs={3} className="d-flex align-items-center">
              <div className="category-dropdown custom_dropdown d-flex">
                <div className="category">Categories</div>
                <DropdownButton
                  title={
                    <span>
                      {selectedCategory}{" "}
                      <FontAwesomeIcon icon={faChevronDown} className="ms-3" />
                    </span>
                  }
                  id="category-dropdown"
                >
                  <Dropdown.Item onClick={() => setCategory("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory("Featured")}>
                    Featured
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory("Trending")}>
                    Trending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory("Latest")}>
                    Latest
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory("Top Rated")}>
                    Top Rated
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Col>
            <Col xs={9}>
              <InputGroup className="search-bar">
                <InputGroup.Text className="left">
                  <FontAwesomeIcon icon={faSearch} color="#767676" />
                </InputGroup.Text>
                <FormControl
                  aria-label="Search"
                  placeholder="Search your interests"
                />
                <InputGroup.Text className="right">
                  <Button>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Col>

            <Col xs={12}>
              <h1 className="heading mb-4 mt-5">Top Featured</h1>
            </Col>
            {candyShopRef.current && (
              <Auctions
                // wallet={wallet}
                candyShop={candyShopRef.current}
                walletConnectComponent={<WalletMultiButton />}
              />
            )}
            {topFeaturedList.map((item) => (
              <Col xs={3}>
                {/* <ItemCard
                                title={item.title}
                                thumbnail={item.thumbnail}
                                username={item.username}
                                userAvatar={item.userAvatar}
                                terrirtory={item.terrirtory}
                                exhibition={item.exhibition}
                                onClick={() => navigate('/preview')}
                            /> */}
              </Col>
            ))}

            {/* <Col xs={12}>
              <h1 className="heading mb-4 mt-5">Live Auctions</h1>
            </Col>
            {liveAuctionsList.map((item) => (
              <Col xs={3}>
                <ItemCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  username={item.username}
                  userAvatar={item.userAvatar}
                  terrirtory={item.terrirtory}
                  exhibition={item.exhibition}
                  timeRemaining={item.timeRemaining}
                  onClick={() => navigate("/preview")}
                />
              </Col>
            ))}

            <Col xs={12}>
              <h1 className="heading mb-4 mt-5">Explore</h1>
            </Col>
            {exploreList.map((item) => (
              <Col xs={3}>
                <ItemCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  username={item.username}
                  userAvatar={item.userAvatar}
                  terrirtory={item.terrirtory}
                  exhibition={item.exhibition}
                  timeRemaining={item.timeRemaining}
                  onClick={() => navigate("/preview")}
                />
              </Col>
            ))} */}

            <Col xs={12} className="d-flex justify-content-center mt-5">
              <Button className="button-primary mt-4">Show More</Button>
            </Col>
          </Row>
        </CandyShopDataValidator>
      </Container>
      <Footer />
    </div>
  );
});

export default Explore;
