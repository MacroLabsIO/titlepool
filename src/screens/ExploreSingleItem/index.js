// import React, { useEffect, useState, useRef } from "react";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Container,
//   Col,
//   Form,
//   Image,
//   Row,
//   Button,
//   Modal,
// } from "react-bootstrap";
// import Header from "../../components/Header";
// import PlayerCard from "../../components/PlayerCard";
// import BackButton from "../../components/BackButton";
// import { shortAddress } from "../../utils/utils";
// import {
//   SYSTEM,
//   TOKEN_PROGRAM_ID,
//   WRAPPED_SOL_MINT,
//   AUCTION_ID,
//   METAPLEX_ID,
// } from "../../utils/ids";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// import axios from "axios";
// import {
//   PublicKey,
//   Transaction,
//   Keypair,
//   SYSVAR_RENT_PUBKEY,
//   TransactionInstruction,
//   SystemProgram,
// } from "@solana/web3.js";
// import {
//   AccountLayout,
//   createInitializeAccountInstruction,
// } from "@solana/spl-token";
// import { CandyShop } from "@liqnft/candy-shop-sdk";
// import BN from "bn.js";
// import DateTimePicker from "react-datetime-picker";
// import "./styles.scss";
// import { useNavigate } from "react-router-dom";
// import { Connection, programs, actions, utils } from "@metaplex/js";
// import { SetWhitelistedCreatorArgs } from "@metaplex-foundation/mpl-metaplex";
// import { serialize } from "borsh";
// import {
//   sendTransactions,
//   sendTransaction,
// } from "../../contexts/connection.tsx";
// const {
//   metaplex: {
//     Store,
//     AuctionManager,
//     WHITELIST_CREATOR_SCHEMA,
//     InitAuctionManagerV2Args,
//     StartAuctionArgs,
//     AuctionManagerV2Data,
//     AUCTION_SCHEMA,
//     SetAuthorityArgs,
//     auctionProgramId,
//     vaultProgramId,
//     SafetyDepositBox,
//     SafetyDepositConfig,
//     AmountRange,
//     ValidateSafetyDepositBoxV2Args,
//     SAFETY_DEPOSIT_BOX_SCHEMA,
//   },
//   metadata: { Metadata },
//   auction: {
//     Auction,
//     WinnerLimit,
//     PriceFloor,
//     WinnerLimitType,
//     PriceFloorType,
//   },
//   vault: { Vault },
// } = programs;

// const ExploreSingleItem = React.memo((props) => {
//   const navigate = useNavigate();
//   const [auctionstart, setAuctionstart] = useState(null);
//   const wallet = useWallet();
//   const { connection } = useConnection();
//   const [showModal, setShowModal] = useState(false);
//   const [isWalletConnected, setWalletConnected] = useState(false);
//   const [isBidPlaced, setBidPlaced] = useState(false);
//   const [modalType, setModalType] = useState("wallet");
//   const { state } = useLocation();
//   const { item, onWallet } = state;
//   const [isLoading, setIsLoading] = useState(false);
//   const [auctionOptions, setAuctionOptions] = useState({
//     startingBid: "",
//     startTime: Date.now(),
//     biddingPeriod: "",
//     tickSize: "",
//     buyNowPrice: "",
//   });
//   const [mintMessage, setMintMessage] = useState("");

//   const candyShopRef = useRef(
//     new CandyShop({
//       candyShopCreatorAddress: new PublicKey("CwpGjez3RTGuCKUZ3nMqyE4uyuX9s4DJzon5nDGryTkc"), // Candy Shop owner address
//       treasuryMint: new PublicKey("So11111111111111111111111111111111111111112"), // Candy Shop transaction currency
//       candyShopProgramId: new PublicKey("csbMUULiQfGjT8ezT16EoEBaiarS6VWRevTw1JMydrS"), // Candy Shop program ID
//       env: "devnet", // network
//     })
//   );

//   const onConnectWallet = () => {
//     setShowModal(true);
//     setWalletConnected(true);
//   };

//   const onPlaceBid = () => {
//     setModalType("bid");
//     setShowModal(true);
//     setBidPlaced(true);
//   };

//   const putOnAuction = async () => {};

//   const [savedStore, setSavedStore] = useState();

//   const test = async () => {
//     // const account = Keypair.generate();
//     // console.log("wallet", account._keypair);
//     const { storeId } = await createStore(wallet);
//     console.log("1");
//     const whitelistedtx = await whiteListCreators("", "", storeId);
//     console.log("2");
//     const { ExternalPriceAccount, AuctionCurrency, ExternalPriceAccountTX } =
//       await createExternalPriceAccount_1(wallet);
//     console.log("3");
//     const {
//       CreateVaultTX,
//       vault,
//       fractionMint,
//       redeemTreasury,
//       fractionTreasury,
//     } = await createVaultAccount_1(
//       wallet,
//       ExternalPriceAccount,
//       AuctionCurrency
//     );
//     console.log("4");
//     const { saftyDepositTokenStore } = await addTokensTovault_1(
//       wallet,
//       "",
//       vault
//     );
//     console.log("5");
//     const { CloseVaultTX } = await closeVault_1(
//       wallet,
//       vault,
//       new PublicKey(WRAPPED_SOL_MINT)
//     );
//     console.log("6");
//     const { CreateAuctionTX, auction } = await createAuction_1(
//       wallet,
//       vault,
//       new PublicKey(WRAPPED_SOL_MINT)
//     );
//     console.log("7");
//     const {
//       CreateAuctionManagerTX,
//       auctionManager,
//       tokenTracker,
//       acceptPaymentAccount,
//     } = await createAuctionManager_1(
//       wallet,
//       vault,
//       auction,
//       storeId,
//       new PublicKey(WRAPPED_SOL_MINT)
//     );
//     console.log("8");

//     const { UpdateAuctionAuthority, txBatchupd } =
//       await updateAuctionAuthority_1(wallet, auction, auctionManager);
//     console.log("9", { UpdateAuctionAuthority, txBatchupd });

//     console.log("?", {
//       CreateAuctionManagerTX,
//       auctionManager,
//       tokenTracker,
//       acceptPaymentAccount,
//     });
//   };

//   const createStore = async (wallet) => {
//     try {
//       // create params needed for store creation
//       const params = {
//         connection: connection, // connection to the cluster
//         wallet: wallet, // wallet
//         isPublic: true, // whether the store is public or not
//       };
//       const store = await actions.initStoreV2(params);
//       setSavedStore(store);
//       console.log(store);
//       return store; // return the store
//     } catch (e) {
//       console.log(e);
//       return null;
//     }
//   };

//   const whiteListCreators = async (wallet11, uri, store) => {
//     try {
//       // const creators = (await axios.get(uri)).data.properties.creators;
//       const creators = [
//         { address: "CwpGjez3RTGuCKUZ3nMqyE4uyuX9s4DJzon5nDGryTkc" }
//       ];

//       const metaplexProgramId = "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98";

//       const recentBlockHash = await connection.getLatestBlockhash();
//       let trx_responses = [];
//       for (let i = 0; i < creators.length; i++) {
//         let creator = creators[i].address;

//         console.log("store", creator, store);
//         let whitelistedCreatorPDA =
//           await programs.metaplex.WhitelistedCreator.getPDA(store, creator);

//         let manualTransaction = new Transaction({
//           recentBlockhash: recentBlockHash.blockhash,
//           feePayer: wallet.publicKey,
//         });

//         let data = Buffer.from(
//           serialize(
//             SetWhitelistedCreatorArgs.SCHEMA,
//             new SetWhitelistedCreatorArgs({ activated: true })
//           )
//         );

//         let keys = [
//           {
//             pubkey: whitelistedCreatorPDA,
//             isSigner: false,
//             isWritable: true,
//           },
//           {
//             pubkey: wallet.publicKey,
//             isSigner: true,
//             isWritable: false,
//           },
//           {
//             pubkey: wallet.publicKey,
//             isSigner: true,
//             isWritable: false,
//           },
//           {
//             pubkey: new PublicKey(creator),
//             isSigner: false,
//             isWritable: false,
//           },
//           {
//             pubkey: store,
//             isSigner: false,
//             isWritable: false,
//           },
//           {
//             pubkey: SYSTEM,
//             isSigner: false,
//             isWritable: false,
//           },
//           {
//             pubkey: SYSVAR_RENT_PUBKEY,
//             isSigner: false,
//             isWritable: false,
//           },
//         ];
//         manualTransaction.add(
//           new TransactionInstruction({
//             keys,
//             programId: new PublicKey(metaplexProgramId),
//             data: data,
//           })
//         );
//         let transactionBuffer = manualTransaction.serializeMessage();
//         // let signature = Buffer.from(
//         //   nacl.sign.detached(transactionBuffer, wallet.secretKey)
//         // );
//         // manualTransaction.addSignature(wallet.publicKey, signature);
//         console.log(wallet, "wallet");
//         // manualTransaction.sign([wallet]);
//         await wallet.signTransaction(manualTransaction);

//         let isVerifiedSignature = manualTransaction.verifySignatures();
//         if (!isVerifiedSignature) throw new Error("Signatures are not valid.");

//         let rawTransaction = Buffer.from(
//           manualTransaction.serialize()
//         ).toString("base64");
//         const sentTx = await connection.sendEncodedTransaction(rawTransaction);
//         trx_responses.push(sentTx);
//       }
//       return trx_responses;
//     } catch (e) {
//       console.log(e);
//       return null;
//     }
//   };

//   const createExternalPriceAccount_1 = async (UserWallet) => {
//     try {
//       // passing in the wallet and the devnet cluster connection for the same
//       const params = {
//         connection: connection,
//         wallet: UserWallet,
//       };
//       // call lib function to create ext account
//       const { txId, externalPriceAccount, priceMint } =
//         await actions.createExternalPriceAccount(params);
//       // return the data
//       return {
//         ExternalPriceAccount: externalPriceAccount,
//         AuctionCurrency: priceMint,
//         ExternalPriceAccountTX: txId,
//       };
//     } catch (e) {
//       console.log("External Price account creation failed", e);
//       return {
//         ExternalPriceAccount: null,
//         AuctionCurrency: null,
//         ExternalPriceAccountTX: null,
//       };
//     }
//   };

//   const createVaultAccount_1 = async (
//     UserWallet,
//     ExternalPriceAccount,
//     AuctionCurrency
//   ) => {
//     try {
//       const params = {
//         connection: connection,
//         wallet: UserWallet,
//         priceMint: AuctionCurrency,
//         externalPriceAccount: ExternalPriceAccount,
//       };
//       // call lib function to create vault account
//       const { txId, vault, fractionMint, redeemTreasury, fractionTreasury } =
//         await actions.createVault(params);
//       // return the data
//       return {
//         CreateVaultTX: txId,
//         vault: vault,
//         fractionMint: fractionMint,
//         redeemTreasury: redeemTreasury,
//         fractionTreasury: fractionTreasury,
//       };
//     } catch (e) {
//       console.log("Error creating vault", e);
//       return {
//         txId: null,
//         vault: null,
//         fractionMint: null,
//         redeemTreasury: null,
//         fractionTreasury: null,
//       };
//     }
//   };

//   const addTokensTovault_1 = async (UserWallet, NFT_toauction, vault) => {
//     try {
//       // get token account for token mint
//       // let token_account = await getAssociatedTokenAddress(
//       //   NFT_toauction,
//       //   UserWallet.publicKey,
//       //   true
//       // );
//       let token_account = new PublicKey(item.tokenAccount);
//       let tokenMint;
//       var config = {
//         method: "get",
//         url: `https://title-pool-test.herokuapp.com/nft/getMint?tokenAddress=${item.tokenAccount}`,
//         headers: {},
//       };

//       await axios(config)
//         .then(function (response) {
//           if (response?.data?.nft[0]?.mint_address) {
//             tokenMint = new PublicKey(response.data.nft[0].mint_address);
//           } else {
//             throw "can't find mint address";
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       let nft = [
//         {
//           tokenAccount: token_account,
//           tokenMint,
//           // tokenMint: NFT_toauction,
//           amount: new BN(1),
//         },
//       ];
//       // create json as for some reason it is not working direlcty from the code
//       const params = {
//         connection: connection,
//         wallet: UserWallet,
//         vault: vault,
//         nfts: nft,
//       };
//       // call lib function to create vault account
//       const { safetyDepositTokenStores } = await actions.addTokensToVault(
//         params
//       );
//       // return the data
//       return { saftyDepositTokenStore: safetyDepositTokenStores };
//     } catch (e) {
//       console.log("Error adding tokens to vault", e);
//       return {
//         txId: null,
//         vault: null,
//         fractionMint: null,
//         redeemTreasury: null,
//         fractionTreasury: null,
//       };
//     }
//   };

//   const closeVault_1 = async (wallet_user, vault, pricemint) => {
//     try {
//       // create json as for some reason it is not working direlcty from the code
//       const params = {
//         connection: connection,
//         wallet: wallet_user,
//         vault: vault,
//         priceMint: pricemint,
//       };
//       // call lib function to create vault account
//       const { txId } = await actions.closeVault(params);
//       // return the data
//       return { CloseVaultTX: txId };
//     } catch (e) {
//       console.log(e);
//       return {
//         txId: null,
//         vault: null,
//         fractionMint: null,
//         redeemTreasury: null,
//         fractionTreasury: null,
//       };
//     }
//   };

//   const createAuction_1 = async (wallet_user, vault, priceMint) => {
//     try {
//       // create json as for some reason it is not working direlcty from the code
//       let params_1 = {
//         instruction: 1,
//         winners: new WinnerLimit({
//           type: WinnerLimitType.Capped,
//           usize: new BN(1),
//         }),
//         auctionGap: new BN(1),
//         endAuctionAt: new BN(888888888),
//         tokenMint: priceMint.toString(),
//         priceFloor: new PriceFloor({
//           type: PriceFloorType.Minimum,
//           minPrice: new BN(1),
//         }),
//         tickSize: new BN(1),
//         gapTickSizePercentage: 1,
//       };
//       const params = {
//         connection: connection,
//         wallet: wallet_user,
//         vault: vault,
//         auctionSettings: params_1,
//       };
//       // call lib function to create vault accoun
//       const { txId, auction } = await actions.initAuction(params);
//       // return the data
//       return { CreateAuctionTX: txId, auction: auction };
//     } catch (e) {
//       console.log(e);
//       return {
//         txId: null,
//         vault: null,
//         fractionMint: null,
//         redeemTreasury: null,
//         fractionTreasury: null,
//       };
//     }
//   };

//   const createAuctionManager_1 = async (
//     wallet_user,
//     vault,
//     auction,
//     store,
//     pricemint
//   ) => {
//     try {
//       let instructions = [];
//       let signers = [];

//       const accountRentExempt =
//         await connection.getMinimumBalanceForRentExemption(AccountLayout.span);

//       const { auctionManagerKey } = await getAuctionKeys(vault);

//       const acceptPayment = await createTokenAccount(
//         instructions,
//         wallet.publicKey,
//         accountRentExempt,
//         new PublicKey(pricemint),
//         new PublicKey(auctionManagerKey),
//         signers
//       );

//       console.log({ auctionManagerKey, acceptPayment, instructions, signers });

//       const { tokenTracker } = await initAuctionManagerV2(
//         vault,
//         wallet.publicKey.toBase58(),
//         wallet.publicKey.toBase58(),
//         acceptPayment.toBase58(),
//         store.toBase58(),
//         programs.core.TupleNumericType.U8,
//         programs.core.TupleNumericType.U8,
//         new BN(10),
//         instructions
//       );

//       console.log({ tokenTracker });

//       const newInstructions = [instructions];
//       const newSigners = [signers];

//       // await sendTransaction(connection, wallet, instructions, signers);

//       return {
//         CreateAuctionManagerTX: instructions,
//         auctionManager: auctionManagerKey,
//         tokenTracker: tokenTracker,
//         acceptPaymentAccount: acceptPayment,
//       };
//     } catch (e) {
//       console.log(e);
//       return {
//         txId: null,
//         vault: null,
//         fractionMint: null,
//         redeemTreasury: null,
//         fractionTreasury: null,
//       };
//     }
//   };

//   const initAuctionManagerV2 = async (
//     vault,
//     auctionManagerAuthority,
//     payer,
//     acceptPaymentAccount,
//     store,
//     amountType,
//     lengthType,
//     maxRanges,
//     instructions
//   ) => {
//     const { auctionKey, auctionManagerKey } = await getAuctionKeys(vault);

//     const value = new InitAuctionManagerV2Args({
//       amountType,
//       lengthType,
//       maxRanges,
//     });

//     const tokenTracker = await PublicKey.findProgramAddress(
//       [
//         Buffer.from("metaplex"),
//         new PublicKey(METAPLEX_ID).toBuffer(),
//         new PublicKey(auctionManagerKey).toBuffer(),
//         Buffer.from("totals"),
//       ],
//       new PublicKey(METAPLEX_ID)
//     );

//     console.log(tokenTracker, "token tracker");

//     // const tokenTracker = await getAuctionWinnerTokenTypeTracker(
//     //   auctionManagerKey,
//     // );

//     const data = Buffer.from(serialize(InitAuctionManagerV2Args.SCHEMA, value));

//     const keys = [
//       {
//         pubkey: new PublicKey(auctionManagerKey),
//         isSigner: false,
//         isWritable: true,
//       },
//       {
//         pubkey: new PublicKey(tokenTracker),
//         isSigner: false,
//         isWritable: true,
//       },
//       {
//         pubkey: new PublicKey(vault),
//         isSigner: false,
//         isWritable: false,
//       },

//       {
//         pubkey: new PublicKey(auctionKey),
//         isSigner: false,
//         isWritable: false,
//       },
//       {
//         pubkey: new PublicKey(auctionManagerAuthority),
//         isSigner: false,
//         isWritable: false,
//       },
//       {
//         pubkey: new PublicKey(payer),
//         isSigner: true,
//         isWritable: false,
//       },
//       {
//         pubkey: new PublicKey(acceptPaymentAccount),
//         isSigner: false,
//         isWritable: false,
//       },
//       {
//         pubkey: new PublicKey(store),
//         isSigner: false,
//         isWritable: false,
//       },
//       {
//         pubkey: SystemProgram.programId,
//         isSigner: false,
//         isWritable: false,
//       },
//       {
//         pubkey: SYSVAR_RENT_PUBKEY,
//         isSigner: false,
//         isWritable: false,
//       },
//     ];
//     await instructions.push(
//       new TransactionInstruction({
//         keys,
//         programId: new PublicKey(METAPLEX_ID),
//         data,
//       })
//     );
//     return { tokenTracker, instructions };
//   };

//   const createUninitializedAccount = async (
//     instructions,
//     payer,
//     amount,
//     signers
//   ) => {
//     const account = await Keypair.generate();
//     instructions.push(
//       SystemProgram.createAccount({
//         fromPubkey: payer,
//         newAccountPubkey: account.publicKey,
//         lamports: amount,
//         space: AccountLayout.span,
//         programId: TOKEN_PROGRAM_ID,
//       })
//     );

//     signers.push(account);

//     return account.publicKey;
//   };

//   const createTokenAccount = async (
//     instructions,
//     payer,
//     accountRentExempt,
//     mint,
//     owner,
//     signers
//   ) => {
//     const account = await createUninitializedAccount(
//       instructions,
//       payer,
//       accountRentExempt,
//       signers
//     );

//     await instructions.push(
//       createInitializeAccountInstruction(TOKEN_PROGRAM_ID, mint, account, owner)
//     );

//     return account;
//   };

//   const getAuctionKeys = async (vault) => {
//     const auctionKey = (
//       await PublicKey.findProgramAddress(
//         [
//           Buffer.from("auction"),
//           new PublicKey(AUCTION_ID).toBuffer(),
//           new PublicKey(vault).toBuffer(),
//         ],
//         new PublicKey(AUCTION_ID)
//       )
//     )[0];

//     const result = await PublicKey.findProgramAddress(
//       [Buffer.from("metaplex"), new PublicKey(auctionKey).toBuffer()],
//       new PublicKey(METAPLEX_ID)
//     );

//     const auctionManagerKey = [result[0].toBase58(), result[1]];

//     return { auctionKey, auctionManagerKey };
//   };

//   const updateAuctionAuthority_1 = async (wallet, auction, auctionManager) => {
//     try {
//       let tokenTxBatch = [];
//       const network = "devnet";
//       const recentBlockHash = await connection.getLatestBlockhash();
//       let manualTransaction = new Transaction({
//         recentBlockhash: recentBlockHash.blockhash,
//         feePayer: wallet.publicKey,
//       });
//       const data = Buffer.from(
//         serialize(StartAuctionArgs.SCHEMA, new StartAuctionArgs(5))
//       );
//       const keys = [
//         {
//           pubkey: new PublicKey(auction),
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: wallet.publicKey,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: new PublicKey(auctionManager),
//           isSigner: false,
//           isWritable: false,
//         },
//       ];
//       manualTransaction.add(
//         new TransactionInstruction({
//           keys,
//           programId: new PublicKey(AUCTION_ID),
//           data: data,
//         })
//       );
//       tokenTxBatch.push(manualTransaction);
//       return { UpdateAuctionAuthority: "", txBatchupd: tokenTxBatch };
//     } catch (e) {
//       console.log(e);
//       return { UpdateAuctionAuthority: null };
//     }
//   };

//   const updateVaultAuthority = async (wallet, vault, auctionManager) => {
//     try {
//       const network = "devnet";
//       let tokenTxBatch = new utils.transactionbtch.TransactionsBatch({
//         transactions: [],
//       });
//       const recentBlockHash = await connection.getLatestBlockhash();
//       let manualTransaction = new Transaction({
//         recentBlockhash: recentBlockHash.blockhash,
//         feePayer: wallet.publicKey,
//       });
//       const data = Buffer.from([10]);
//       const keys = [
//         {
//           pubkey: vault,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: wallet.publicKey,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: auctionManager,
//           isSigner: false,
//           isWritable: false,
//         },
//       ];
//       manualTransaction.add(
//         new TransactionInstruction({
//           keys,
//           programId: new PublicKey(vaultProgramId),
//           data: data,
//         })
//       );
//       tokenTxBatch.addTransaction(manualTransaction);
//       return { UpdateVaultAuthority: "", txbatchudp1: tokenTxBatch };
//     } catch (e) {
//       throw e;
//       console.log(e);
//       return { UpdateVaultAuthority: null };
//     }
//   };

//   const validateAuction_1 = async (
//     wallet,
//     vault,
//     nft,
//     store,
//     tokenStore,
//     tokenTracker,
//     auctionManagerPDA
//   ) => {
//     try {
//       let tokenTxBatch = new utils.transactionbtch.TransactionsBatch({
//         transactions: [],
//       });
//       const storeId = await programs.metaplex.Store.getPDA(new PublicKey(""));
//       const auctionPDA = await programs.auction.Auction.getPDA(vault);
//       const auctionManagerPDA = await programs.metaplex.AuctionManager.getPDA(
//         auctionPDA
//       );
//       // const loadedVault = await programs.vault.Vault.load(connection, vault);
//       const sdb = await SafetyDepositBox.getPDA(vault, nft);
//       const recentBlockHash = await connection.getLatestBlockhash();
//       const whitelistedCreator =
//         await programs.metaplex.WhitelistedCreator.getPDA(
//           store,
//           wallet.adapter._wallet.publicKey
//         );
//       const metadata = await Metadata.getPDA(nft);
//       const safetyDepositConfigKey =
//         await programs.metaplex.SafetyDepositConfig.getPDA(
//           auctionManagerPDA,
//           sdb
//         );
//       localStorage.setItem("safetyDepositbox", sdb.toString());
//       localStorage.setItem(
//         "safetyDepositConfigKey",
//         safetyDepositConfigKey.toString()
//       );
//       const edition = await programs.metadata.Edition.getPDA(
//         new PublicKey(nft)
//       );
//       const originalAuthority = await PublicKey.findProgramAddress(
//         [
//           Buffer.from("metaplex"),
//           auctionPDA.toBuffer(),
//           new PublicKey(metadata).toBuffer(),
//         ],
//         new PublicKey("p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98")
//       );
//       const safetyDepositConfigArgs = new SafetyDepositConfig({
//         key: 9,
//         auctionManager: SystemProgram.programId.toBase58(),
//         order: new BN(0),
//         winningConfigType: 0,
//         amountType: programs.core.TupleNumericType.U8,
//         lengthType: programs.core.TupleNumericType.U8,
//         amountRanges: [
//           new AmountRange({ amount: new BN(1), length: new BN(1) }),
//         ],
//         participationConfig: null,
//         participationState: null,
//       });
//       const value = new ValidateSafetyDepositBoxV2Args(safetyDepositConfigArgs);
//       const data = Buffer.from(serialize(SAFETY_DEPOSIT_BOX_SCHEMA, value));
//       console.log("vsdb data", data);
//       let manualTransaction = new Transaction({
//         // recentBlockhash: recentBlockHash.blockhash,
//         feePayer: wallet.adapter._wallet.publicKey,
//       });
//       const keys = [
//         {
//           pubkey: safetyDepositConfigKey,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: tokenTracker,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: auctionManagerPDA,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: metadata,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: originalAuthority[0],
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: whitelistedCreator,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: storeId,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: sdb,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: tokenStore,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: nft,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: edition,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: vault,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: wallet.adapter._wallet.publicKey,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: wallet.adapter._wallet.publicKey,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: wallet.adapter._wallet.publicKey,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: SystemProgram.programId,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: SYSVAR_RENT_PUBKEY,
//           isSigner: false,
//           isWritable: false,
//         },
//       ];
//       manualTransaction.add(
//         new TransactionInstruction({
//           keys,
//           programId: new PublicKey(
//             "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98"
//           ),
//           data,
//         })
//       );
//       tokenTxBatch.addTransaction(manualTransaction);
//       return { ValidateSaftyDepositBoxTX: "", txbatchvalid: tokenTxBatch };
//     } catch (e) {
//       console.log(e);
//       return { ValidateSaftyDepositBoxTX: null };
//     }
//   };

//   const startAuction = async (wallet, store, auction, auctionManager) => {
//     try {
//       let tokenTxBatch = new utils.transactionbtch.TransactionsBatch({
//         transactions: [],
//       });
//       const tx = new programs.metaplex.StartAuction(
//         { feePayer: new PublicKey(wallet.publicKey) },
//         {
//           store: store,
//           auction: auction,
//           auctionManager: auctionManager,
//           auctionManagerAuthority: wallet.publicKey,
//         }
//       );
//       tokenTxBatch.addTransaction(tx);
//       return { StartAuctionTX: "", txbatchstart: tokenTxBatch };
//     } catch (e) {
//       throw e;
//       console.log(e);
//       return { StartAuctionTX: null };
//     }
//   };

//   const clickMe = async () => {
//     setIsLoading(true);
//     setMintMessage("Putting for Auction...");
//     try {
//       let tokenMint;
//       var config = {
//         method: "get",
//         url: `https://title-pool-test.herokuapp.com/nft/getMint?tokenAddress=${item.tokenAccount}`,
//         headers: {},
//       };

//       await axios(config)
//         .then(function (response) {
//           if (response?.data?.nft[0]?.mint_address) {
//             tokenMint = new PublicKey(response.data.nft[0].mint_address);
//           } else {
//             throw "can't find mint address";
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });

//       const { startingBid, startTime, biddingPeriod, tickSize, buyNowPrice } =
//         auctionOptions;
//       setMintMessage("Sending Transaction...");

//       const receipt = await candyShopRef.current.createAuction({
//         tokenAccount: new PublicKey(item.tokenAccount),
//         tokenMint,
//         wallet,
//         startingBid: new BN(startingBid * 10 ** 9),
//         startTime: new BN(startTime),
//         biddingPeriod: new BN(biddingPeriod * 60),
//         tickSize: new BN(tickSize * 10 ** 9),
//         buyNowPrice: buyNowPrice > 0 ? new BN(buyNowPrice * 10 ** 9) : null,
//       });
//       console.log("receipt", receipt);
//       setMintMessage("Success! Going back to your wallet...");
//       setTimeout(() => {
//         navigate("/wallet");
//       }, 4000);
//     } catch (error) {
//       console.log(error);
//       setMintMessage(
//         `Something went wrong, \n complete all fields and try again`
//       );
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     if (isWalletConnected || isBidPlaced) {
//       setTimeout(() => {
//         setShowModal(false);
//       }, 1500);
//     }
//     console.log(state, "props");
//   }, [isWalletConnected, isBidPlaced]);

//   const playersList = [
//     {
//       id: 1,
//       name: "Sam Worthing",
//       avatar: "/players/player-1.png",
//     },
//     {
//       id: 2,
//       name: "Stephen Lang",
//       avatar: "/players/player-2.png",
//     },
//     {
//       id: 3,
//       name: "Michelle Rodriguez",
//       avatar: "/players/player-3.png",
//     },
//     {
//       id: 4,
//       name: "Zoe Saldana",
//       avatar: "/players/player-4.png",
//     },
//   ];

//   return (
//     <div className="explore-single-item pt-5 pb-5">
//       <Header />
//       <Container className="position-relative">
//         <div
//           className="position-absolute"
//           style={{ top: "95px", left: "12px" }}
//         >
//           <BackButton />
//         </div>
//       </Container>
//       <Container className="mt-5 pt-5 pb-5 container-padding">
//         <Row>
//           <Col xs={6}>
//             <div className="item-image">
//               <div
//                 className="image-filter"
//                 style={{ background: `url(${item.image})` }}
//               ></div>
//               <Image className="img-fluid" src={item.image} />
//             </div>

//             <div className="info-table mt-5">
//               <div className="table-item d-flex">
//                 <div className="type">Territory</div>
//                 <div className="value">{item?.attributes[0]?.value}</div>
//               </div>
//               <div className="table-item d-flex">
//                 <div className="type">Term</div>
//                 <div className="value">{item?.attributes[1]?.value}</div>
//               </div>
//               <div className="table-item d-flex">
//                 <div className="type">Exhibition</div>
//                 <div className="value">{item?.attributes[2]?.value}</div>
//               </div>
//               <div className="table-item d-flex">
//                 <div className="type">Genre</div>
//                 <div className="value">{item?.attributes[3]?.value}</div>
//               </div>
//               <div className="table-item d-flex">
//                 <div className="type">Runtime</div>
//                 <div className="value">163 Mins</div>
//               </div>
//               <div className="table-item d-flex">
//                 <div className="type">Language</div>
//                 <div className="value">English</div>
//               </div>
//             </div>

//             <a
//               href={item?.attributes[8]?.value}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="watch-btn mt-4"
//             >
//               <h6>Watch Screener</h6>

//               <div className="watch-icon">
//                 <Image src="/play-icon.png" alt="watch" />
//               </div>
//             </a>
//           </Col>
//           <Col xs={6}>
//             <h1 className="heading mt-4">{item.name}</h1>
//             <p className="description mt-4">{item.description}</p>

//             <div className="created-by mt-4">
//               <h6 className="mb-2">Created By</h6>
//               <div className="d-flex align-items-center">
//                 <Image className="avatar" src="/avatars/user-1.png" />
//                 <h6 className="owner-name ms-2 mb-0">
//                   {shortAddress(item?.properties?.creators[0]?.address)}
//                 </h6>
//               </div>
//             </div>

//             <div className="info-card mt-5">
//               {onWallet ? (
//                 <Form className="create-form">
//                   <Form.Group className="input-primary mb-1 ">
//                     <Form.Label className="label">Starting Bid</Form.Label>
//                     <Form.Control
//                       value={auctionOptions.startingBid}
//                       onChange={(e) =>
//                         setAuctionOptions({
//                           ...auctionOptions,
//                           startingBid: e.target.value,
//                         })
//                       }
//                       required
//                       type="number"
//                       placeholder="0.01"
//                     />
//                   </Form.Group>
//                   <Form.Group className="input-primary mb-1 ">
//                     <Form.Label className="label">Start Time</Form.Label>
//                     <br />
//                     <DateTimePicker
//                       className={"calendar"}
//                       onChange={(e) => {
//                         setAuctionstart(e);
//                         if (e) {
//                           setAuctionOptions({
//                             ...auctionOptions,
//                             startTime: e.getTime() / 1000,
//                           });
//                           console.log("time", e.getTime() / 1000);
//                         }
//                       }}
//                       disableClock={true}
//                       value={auctionstart}
//                     />
//                   </Form.Group>
//                   <Form.Group className="input-primary mb-1 ">
//                     <Form.Label className="label">
//                       Bidding Period (minutes)
//                     </Form.Label>
//                     <Form.Control
//                       value={auctionOptions.biddingPeriod}
//                       onChange={(e) =>
//                         setAuctionOptions({
//                           ...auctionOptions,
//                           biddingPeriod: e.target.value,
//                         })
//                       }
//                       required
//                       type="number"
//                       placeholder="600"
//                     />
//                   </Form.Group>
//                   <Form.Group className="input-primary mb-1 ">
//                     <Form.Label className="label">Tick Size</Form.Label>
//                     <Form.Control
//                       value={auctionOptions.tickSize}
//                       onChange={(e) =>
//                         setAuctionOptions({
//                           ...auctionOptions,
//                           tickSize: e.target.value,
//                         })
//                       }
//                       required
//                       type="number"
//                       placeholder="0.01"
//                     />
//                   </Form.Group>
//                   <Form.Group className="input-primary mb-1 ">
//                     <Form.Label className="label">
//                       Buy Now Price (0 for no buy now feature)
//                     </Form.Label>
//                     <Form.Control
//                       value={auctionOptions.buyNowPrice}
//                       onChange={(e) =>
//                         setAuctionOptions({
//                           ...auctionOptions,
//                           buyNowPrice: e.target.value,
//                         })
//                       }
//                       required
//                       type="number"
//                       placeholder="10"
//                     />
//                   </Form.Group>
//                   <Button
//                     className="wallet-button mt-4"
//                     onClick={test}
//                     disabled={isLoading}
//                     //   onClick={onConnectWallet}
//                   >
//                     Put on Auction
//                   </Button>
//                   {mintMessage && (
//                     <h5 className="mint-message">{mintMessage}</h5>
//                   )}
//                 </Form>
//               ) : (
//                 <>
//                   <h6 className="small-title">Time Left</h6>
//                   <h1 className="time-text">
//                     10:10 <span>Hrs</span>
//                   </h1>
//                   {isWalletConnected ? (
//                     !isBidPlaced ? (
//                       <Button className="bid-button mt-4" onClick={onPlaceBid}>
//                         Place Bid
//                       </Button>
//                     ) : (
//                       <Button className="bid-placed-button mt-4">
//                         Bid Placed
//                       </Button>
//                     )
//                   ) : (
//                     <Button
//                       className="wallet-button mt-4"
//                       onClick={clickMe}
//                       //   onClick={onConnectWallet}
//                     >
//                       Connect Wallet{" "}
//                       <FontAwesomeIcon icon={faPlus} className="ms-2" />
//                     </Button>
//                   )}
//                 </>
//               )}
//             </div>

//             <div className="info-card mt-5">
//               <h6 className="small-title mb-3">NOTABLE PLAYERS</h6>
//               {playersList.map((item) => (
//                 <PlayerCard
//                   id={item.id}
//                   name={item.name}
//                   avatar={item.avatar}
//                 />
//               ))}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <Modal
//         show={showModal}
//         aria-labelledby="centered-modal"
//         centered
//         className="custom-popup"
//       >
//         <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
//           <h1 className="m-0">
//             {modalType === "wallet"
//               ? "Wallet Connected"
//               : "Bid Placed Successfully"}
//           </h1>
//           {modalType === "wallet" ? (
//             <Image src="/check-green.png" />
//           ) : (
//             <Image src="/check-blue.png" />
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// });

// export default ExploreSingleItem;
