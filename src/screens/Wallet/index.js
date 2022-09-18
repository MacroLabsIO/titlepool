import _ from 'lodash';
import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../context/AuthProvider";
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../context/firebase';
import { token } from '@metaplex-foundation/js';


const Wallet = React.memo(() => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext)
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
				const token = _.find(tokenList, (o) => {
					return _.has(o, tokenAccountAddress);
				});
				if (token) {
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
		const dbRef = ref(getDatabase(firebase));
		get(child(dbRef, 'nft/' + currentUser.email.split('@')[0]))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					const data = snapshot.val();
					const tokenList = [];
					_.mapValues(data, (o) => {
						tokenList.push(o);
					})
					setTokenList(tokenList);
				} else {
					console.log("No data available");
				}
			}).catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		if (currentUser) {
			updateTokenList();
		}
	}, [currentUser]);

	useEffect(() => {
		if (!_.isEmpty(tokenList)) {
			getUserNfts();
		}
	}, [tokenList, wallet]);

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
