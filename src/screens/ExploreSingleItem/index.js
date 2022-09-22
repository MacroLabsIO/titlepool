import _ from 'lodash';
import React, { useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
	Container,
	Col,
	Form,
	Image,
	Row,
	Button,
	Modal,
} from "react-bootstrap";
import Header from "../../components/Header";
import PlayerCard from "../../components/PlayerCard";
import BackButton from "../../components/BackButton";
import { shortAddress } from "../../utils/utils";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
	PublicKey,
} from "@solana/web3.js";
import { CandyShop } from "@liqnft/candy-shop-sdk";
import BN from "bn.js";
import DateTimePicker from "react-datetime-picker";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../context/firebase';

const ExploreSingleItem = React.memo((props) => {
	const { currentUser } = useContext(AuthContext)
	const navigate = useNavigate();
	const [auctionstart, setAuctionstart] = useState(null);
	const wallet = useWallet();
	const { connection } = useConnection();
	const [showModal, setShowModal] = useState(false);
	const [isWalletConnected, setWalletConnected] = useState(false);
	const [isBidPlaced, setBidPlaced] = useState(false);
	const [modalType, setModalType] = useState("wallet");
	const { state } = useLocation();
	const { item, onWallet } = state;
	const [isLoading, setIsLoading] = useState(false);
	const [auctionOptions, setAuctionOptions] = useState({
		startingBid: "",
		startTime: Date.now(),
		biddingPeriod: "",
		tickSize: "",
		buyNowPrice: "",
	});
	const [mintMessage, setMintMessage] = useState("");
	const playersList = [
		{
			id: 1,
			name: "Sam Worthing",
			avatar: "/players/player-1.png",
		},
		{
			id: 2,
			name: "Stephen Lang",
			avatar: "/players/player-2.png",
		},
		{
			id: 3,
			name: "Michelle Rodriguez",
			avatar: "/players/player-3.png",
		},
		{
			id: 4,
			name: "Zoe Saldana",
			avatar: "/players/player-4.png",
		},
	];

	const candyShopRef = useRef(
		new CandyShop({
			candyShopCreatorAddress: new PublicKey("CwpGjez3RTGuCKUZ3nMqyE4uyuX9s4DJzon5nDGryTkc"), // Candy Shop owner address
			treasuryMint: new PublicKey("So11111111111111111111111111111111111111112"), // Candy Shop transaction currency
			candyShopProgramId: new PublicKey("csbMUULiQfGjT8ezT16EoEBaiarS6VWRevTw1JMydrS"), // Candy Shop program ID
			env: "devnet", // network
		})
	);

	const getMintAddress = async (tokenAccount) => {
		let tokenMint;
		const dbRef = ref(getDatabase(firebase));
		const snapshot = await get(child(dbRef, 'nft/' + currentUser.email.split('@')[0]));
		if (snapshot.exists()) {
			const data = snapshot.val();
			_.mapValues(data, (o) => {
				if (_.has(o, item.tokenAccount)) {
					_.map(o, (data) => {
						tokenMint = JSON.parse(data).mint_address;
					});
				}
			})
		}
		return tokenMint;
	}

	const onAuctionConfirm = async () => {
		const tokenMint = await getMintAddress(item.tokenAccount);

		const { startingBid, startTime, biddingPeriod, tickSize, buyNowPrice } = auctionOptions;

		candyShopRef.current.createAuction({
				tokenAccount: new PublicKey(item.tokenAccount),
				tokenMint: new PublicKey(tokenMint),
				wallet,
				startingBid: new BN(startingBid * 10 ** 9),
				startTime: startTime,
				biddingPeriod: new BN(biddingPeriod * 60),
				tickSize: new BN(tickSize * 10 ** 9),
				buyNowPrice: buyNowPrice > 0 ? new BN(buyNowPrice * 10 ** 9) : null
			})
			.then(() => {
				console.log('OKAY')
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="explore-single-item pt-5 pb-5">
			<Header />
			<Container className="position-relative">
				<div
					className="position-absolute"
					style={{ top: "95px", left: "12px" }}>
					<BackButton />
				</div>
			</Container>
			<Container className="mt-5 pt-5 pb-5 container-padding">
				<Row>
					<Col xs={6}>
						<div className="item-image">
							<div
								className="image-filter"
								style={{ background: `url(${item.image})` }}
							></div>
							<Image className="img-fluid" src={item.image} />
						</div>

						<div className="info-table mt-5">
							<div className="table-item d-flex">
								<div className="type">Territory</div>
								<div className="value">{item?.attributes[0]?.value}</div>
							</div>
							<div className="table-item d-flex">
								<div className="type">Term</div>
								<div className="value">{item?.attributes[1]?.value}</div>
							</div>
							<div className="table-item d-flex">
								<div className="type">Exhibition</div>
								<div className="value">{item?.attributes[2]?.value}</div>
							</div>
							<div className="table-item d-flex">
								<div className="type">Genre</div>
								<div className="value">{item?.attributes[3]?.value}</div>
							</div>
							<div className="table-item d-flex">
								<div className="type">Runtime</div>
								<div className="value">163 Mins</div>
							</div>
							<div className="table-item d-flex">
								<div className="type">Language</div>
								<div className="value">English</div>
							</div>
						</div>

						<a
							href={item?.attributes[8]?.value}
							target="_blank"
							rel="noopener noreferrer"
							className="watch-btn mt-4">
							<h6>View Contract PDF</h6>

							<div className="watch-icon">
								<Image src="/file-icon.svg" alt="watch" />
							</div>
						</a>

						<a
							href={item?.attributes[8]?.value}
							target="_blank"
							rel="noopener noreferrer"
							className="watch-btn mt-4">
							<h6>Watch Screener</h6>

							<div className="watch-icon">
								<Image src="/play-icon.png" alt="watch" />
							</div>
						</a>
					</Col>
					<Col xs={6}>
						<h1 className="heading mt-4">{item.name}</h1>
						<p className="description mt-4">{item.description}</p>

						<div className="created-by mt-4">
							<h6 className="mb-2">Created By</h6>
							<div className="d-flex align-items-center">
								<Image className="avatar" src="/avatars/user-1.png" />
								<h6 className="owner-name ms-2 mb-0">
									{shortAddress(item?.properties?.creators[0]?.address)}
								</h6>
							</div>
						</div>

						<div className="info-card mt-5">
							{onWallet ? (
								<Form className="create-form">
									<Form.Group className="input-primary mb-1 ">
										<Form.Label className="label">Starting Bid</Form.Label>
										<Form.Control
											value={auctionOptions.startingBid}
											onChange={(e) =>
												setAuctionOptions({
													...auctionOptions,
													startingBid: e.target.value,
												})
											}
											required
											type="number"
											placeholder="0.01"
										/>
									</Form.Group>
									<Form.Group className="input-primary mb-1 ">
										<Form.Label className="label">Start Time</Form.Label>
										<br />
										<DateTimePicker
											className={"calendar"}
											onChange={(e) => {
												setAuctionstart(e);
												if (e) {
													setAuctionOptions({
														...auctionOptions,
														startTime: new BN(e.getTime() / 1000)
													});
												}
											}}
											disableClock={true}
											value={auctionstart}
										/>
									</Form.Group>
									<Form.Group className="input-primary mb-1 ">
										<Form.Label className="label">
											Bidding Period (minutes)
										</Form.Label>
										<Form.Control
											value={auctionOptions.biddingPeriod}
											onChange={(e) =>
												setAuctionOptions({
													...auctionOptions,
													biddingPeriod: e.target.value,
												})
											}
											required
											type="number"
											placeholder="600"
										/>
									</Form.Group>
									<Form.Group className="input-primary mb-1 ">
										<Form.Label className="label">Minimum Incremental Bid</Form.Label>
										<Form.Control
											value={auctionOptions.tickSize}
											onChange={(e) =>
												setAuctionOptions({
													...auctionOptions,
													tickSize: e.target.value,
												})
											}
											required
											type="number"
											placeholder="0.01"
										/>
									</Form.Group>
									<Form.Group className="input-primary mb-1 ">
										<Form.Label className="label">
											Buy Now Price (0 for no buy now feature)
										</Form.Label>
										<Form.Control
											value={auctionOptions.buyNowPrice}
											onChange={(e) =>
												setAuctionOptions({
													...auctionOptions,
													buyNowPrice: e.target.value,
												})
											}
											required
											type="number"
											placeholder="10"
										/>
									</Form.Group>
									<Button
										className="wallet-button mt-4"
										onClick={onAuctionConfirm}
										disabled={isLoading}
									//   onClick={onConnectWallet}
									>
										Put on Auction
									</Button>
									{mintMessage && (
										<h5 className="mint-message">{mintMessage}</h5>
									)}
								</Form>
							) : (
								<>
									<h6 className="small-title">Time Left</h6>
									<h1 className="time-text">
										10:10 <span>Hrs</span>
									</h1>
									{/* {isWalletConnected ? (
                    !isBidPlaced ? (
                      <Button className="bid-button mt-4" onClick={onPlaceBid}>
                        Place Bid
                      </Button>
                    ) : (
                      <Button className="bid-placed-button mt-4">
                        Bid Placed
                      </Button>
                    )
                  ) : (
                    <Button
                      className="wallet-button mt-4"
                      onClick={clickMe}
                      //   onClick={onConnectWallet}
                    >
                      Connect Wallet{" "}
                      <FontAwesomeIcon icon={faPlus} className="ms-2" />
                    </Button>
                  )} */}
								</>
							)}
						</div>

						<div className="info-card mt-5">
							<h6 className="small-title mb-3">NOTABLE PLAYERS</h6>
							{playersList.map((item) => (
								<PlayerCard
									id={item.id}
									name={item.name}
									avatar={item.avatar}
								/>
							))}
						</div>
					</Col>
				</Row>
			</Container>
			<Modal
				show={showModal}
				aria-labelledby="centered-modal"
				centered
				className="custom-popup">
				<Modal.Body className="d-flex flex-column justify-content-center align-items-center">
					<h1 className="m-0">
						{modalType === "wallet"
							? "Wallet Connected"
							: "Bid Placed Successfully"}
					</h1>
					{modalType === "wallet" ? (
						<Image src="/check-green.png" />
					) : (
						<Image src="/check-blue.png" />
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
});

export default ExploreSingleItem;
