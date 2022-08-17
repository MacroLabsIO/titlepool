import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import axios from "axios";
import "./styles.scss";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token";
import { MetadataProgramPubkey } from "../../utils/ids";
import { safeAwait, parseMetadata, shortAddress } from "../../utils/utils";
import { PublicKey } from "@solana/web3.js";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import { CreateAuction } from "@liqnft/candy-shop";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NavLink } from "react-router-dom";

const Wallet = React.memo(() => {
  const navigate = useNavigate();
  const [tokenList, setTokenList] = useState([]);
  const [userNfts, setUserNfts] = useState([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const getUserNfts = async () => {
    const validTokenAccounts = await getValidTokenAccounts(
      connection,
      wallet.publicKey
    );
    let titlePoolNfts = [];
    await Promise.all(
      validTokenAccounts.map(async (tokenAccountAddress) => {
        if (tokenList.includes(tokenAccountAddress)) {
          const tokenAccount = await (0, getAccount)(
            connection,
            new PublicKey(tokenAccountAddress)
          );
          const [nftMetadataPublicKey] = await PublicKey.findProgramAddress(
            [
              Buffer.from("metadata"),
              MetadataProgramPubkey.toBuffer(),
              tokenAccount.mint.toBuffer(),
            ],
            MetadataProgramPubkey
          );
          const nftMetadataAccountInfo = await safeAwait(
            connection.getAccountInfo(nftMetadataPublicKey)
          );

          const tokenInfo = parseMetadata(nftMetadataAccountInfo.result.data);
          // const { data } = await axios.get(tokenInfo.data.uri);
          const { data } = await axios.get(
            `https://gateway.ipfs.io/ipfs${tokenInfo.data.uri.split("ipfs")[1]}`
          );
          console.log(
            `https://ipfs.io/ipfs${tokenInfo.data.uri.split("ipfs")[1]}`,
            "uri"
          );
          data.tokenAccount = tokenAccountAddress;
          titlePoolNfts.push(data);
        }
        return;
      })
    );

    console.log(titlePoolNfts);
    setUserNfts(titlePoolNfts);
  };

  const getValidTokenAccounts = async (connection, walletAddress) => {
    // Filter out invalid token which is not NFT.
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );
    return tokenAccounts.value
      .filter((account) => {
        const tokenAmount = account.account.data.parsed.info.tokenAmount;
        const tokenAmountIsOne = Number(tokenAmount.amount) === 1;
        const tokenDecimalsIsZero = Number(tokenAmount.decimals) === 0;
        if (tokenAmountIsOne && tokenDecimalsIsZero) return true;
        return false;
      })
      .map((account) => account.pubkey.toString());
  };

  const updateTokenList = async () => {
    let tokens = [];

    const dbInfo = await axios.get(
      "https://title-pool-test.herokuapp.com/nft/list"
    );
    dbInfo.data.nfts.map((el) => {
      if (el.token_address !== "") {
        tokens.push(el.token_address);
      }
      return;
    });

    setTokenList(tokens);
  };

  useEffect(() => {
    updateTokenList();
  }, []);

  useEffect(() => {
    getUserNfts();
  }, [tokenList, wallet]);

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

  return (
    <div className="explore pt-5 pb-5">
      <Header />
      <Container className="mt-5 pt-5 pb-5 container-padding">
        <Row>
          <Col xs={12}>
            <h1 className="heading mb-4 mt-5">Your Items</h1>
          </Col>
          {userNfts.map((item) => (
            <Col xs={3}>
              <ItemCard
                title={item?.name}
                thumbnail={item?.image}
                username={shortAddress(item?.properties?.creators[0]?.address)}
                userAvatar={item?.userAvatar || null}
                terrirtory={item?.attributes[0]?.value}
                exhibition={item?.attributes[2]?.value}
                onClick={() =>
                  navigate("/preview", {
                    state: {
                      item: { ...item },
                      onWallet: true,
                    },
                  })
                }
              />
            </Col>
          ))}

          {/* <Col xs={12}>
            <h1 className="heading mb-4 mt-5">Items On Auction</h1>
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
          ))} */}
        </Row>
      </Container>
      <Footer />
    </div>
  );
});

export default Wallet;
