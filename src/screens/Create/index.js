import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import TimePicker from "../../components/TimePicker";
import FileUploader from "../../components/FileUpload";
import {
  territories,
  terms,
  exhibitionTypes,
  genreList,
  projectTypeList,
  initialMetadata,
} from "../../utils/createOptions";
import "./styles.scss";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  uploadFiles,
  normalizeMetadata,
  uploadMetadata,
  uploadPDFContract
} from "../../utils/utils";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { AuthContext } from "../../context/AuthProvider";
import { getDatabase, ref, set, push } from "firebase/database";
import firebase from "../../context/firebase"

const Create = React.memo(() => {
  const navigate = useNavigate();
  const wallet = useWallet();
  const { currentUser } = useContext(AuthContext)
  const { connection } = useConnection();
  const [metadata, setMetadata] = useState(initialMetadata);
  const [isLoading, setIsLoading] = useState(false);
  const [sellType, setSellType] = useState("direct");
  const [mintMessage, setMintMessage] = useState("");

  const handleMint = async () => {
    setIsLoading(true);
    setMintMessage("Minting...");
    try {
      setMintMessage("Uploading Image...");
      let imageURI = await uploadFiles(metadata.thumbnail);
      setMintMessage("Uploading Contract...");
      let ContractURI = await uploadPDFContract(metadata);
      setMintMessage("Uploading Metadata...");
      let NftMetadata = normalizeMetadata(
        metadata,
        wallet.publicKey.toString(),
        imageURI,
        ContractURI
      );

      let uri = await uploadMetadata(NftMetadata);

      setMintMessage("Sending Transaction...");
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
      const response = await metaplex
      .nfts()
      .create({
          uri: uri,
          name: metadata.filmName,
          sellerFeeBasisPoints: metadata.royaltyPerc*100
      })
      .run();


      const [address] = await PublicKey.findProgramAddress(
        [
          wallet.publicKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          response.mintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      console.log("response", response, address.toString());

      let data = JSON.stringify({
        creator: wallet.publicKey.toString(),
        mint_address: response.mintAddress.toString(),
        token_address: address.toString(),
      });

      setMintMessage("Updating Database...");
      const db = getDatabase(firebase);
      const postListRef = ref(db, 'nft/' + currentUser.email.split('@')[0]);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        [address]: data
      });

      setMintMessage("NFT Minted! Click on 'MY WALLET' to view...");
    } catch (error) {
      setMintMessage(
        `Something went wrong, \n complete all fields and try again`
      );
      console.log("Error", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="create pt-5 pb-5">
      <Header />
      <Container className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
        <div
          className="position-absolute"
          style={{ top: "95px", left: "12px" }}
        >
          <BackButton />
        </div>
        <Col xs={6} className="mt-5">
          <h1 className="mt-5 mb-4">Create NFT</h1>
          <Form className="create-form">
            <Form.Group className="input-primary mb-5">
              <Form.Label className="label">Film Name</Form.Label>
              <Form.Control
                value={metadata.filmName}
                onChange={(e) =>
                  setMetadata({ ...metadata, filmName: e.target.value })
                }
                required
                id="filmname"
                type="text"
                placeholder="E.g. Avatar"
              />
            </Form.Group>

            {/* <Form.Group className="input-primary mb-5">
              <Form.Label className="label">Reserve Price </Form.Label>
              <Form.Control
                required
                value={metadata.reservePrice}
                onChange={(e) =>
                  setMetadata({ ...metadata, reservePrice: e.target.value })
                }
                id="reserve-price"
                type="text"
                placeholder="$ 0.5 "
              />
            </Form.Group> */}

            <FileUploader
              handleFile={(e) => setMetadata({ ...metadata, thumbnail: e })}
              file={metadata.thumbnail}
              accept="image/*"
              label="Upload Thumbnail Image"
            />

            {/* <Form.Group className="mb-5">
              <Form.Label className="label">Schedule Listing Time</Form.Label>
              <div className="d-flex">
                <div className="me-4 w-100">
                  <CustomDatePicker />
                </div>
                <TimePicker />
              </div>
            </Form.Group> */}

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Territory</Form.Label>
              <Form.Select
                defaultValue="territory"
                required
                value={metadata.territory}
                onChange={(e) =>
                  setMetadata({ ...metadata, territory: e.target.value })
                }
                id="territory"
                aria-label="Territory"
              >
                <option value="territory" disabled>
                  Territory
                </option>
                {territories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Term</Form.Label>
              <Form.Select
                defaultValue="term"
                required
                value={metadata.term}
                onChange={(e) =>
                  setMetadata({ ...metadata, term: e.target.value })
                }
                id="term"
                aria-label="Term"
              >
                <option value="term" disabled>
                  Term
                </option>
                {terms.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Exhibition Type</Form.Label>
              <Form.Select
                defaultValue="exhibition"
                required
                value={metadata.exhibitionType}
                onChange={(e) =>
                  setMetadata({ ...metadata, exhibitionType: e.target.value })
                }
                id="exhibition-type"
                aria-label="Exhibition-Type"
              >
                <option value="exhibition" disabled>
                  Exhibition
                </option>
                {exhibitionTypes.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Genre (1)</Form.Label>
              <Form.Select
                defaultValue="genre"
                required
                value={metadata.genre}
                onChange={(e) =>
                  setMetadata({ ...metadata, genre: e.target.value })
                }
                id="genre"
                aria-label="Genre"
              >
                <option value="genre" disabled>
                  Genre
                </option>
                {genreList.sort().map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Genre (2)</Form.Label>
              <Form.Select
                value={metadata.genre2}
                onChange={(e) =>
                  setMetadata({ ...metadata, genre2: e.target.value })
                }
                defaultValue="genre"
                id="genre2"
                aria-label="Genre2"
              >
                <option value="genre" disabled>
                  Genre
                </option>
                {genreList.sort().map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Genre (3)</Form.Label>
              <Form.Select
                value={metadata.genre3}
                onChange={(e) =>
                  setMetadata({ ...metadata, genre3: e.target.value })
                }
                defaultValue="genre"
                id="genre3"
                aria-label="Genre3"
              >
                <option value="genre" disabled>
                  Genre
                </option>
                {genreList.sort().map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="select-primary mb-5">
              <Form.Label className="label">Project Type</Form.Label>
              <Form.Select
                value={metadata.projectType}
                onChange={(e) =>
                  setMetadata({ ...metadata, projectType: e.target.value })
                }
                defaultValue="type"
                id="projectType"
                aria-label="ProjectType"
              >
                <option value="type" disabled>
                  Project Type
                </option>
                {projectTypeList.sort().map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
              <FontAwesomeIcon icon={faCaretDown} />
            </Form.Group>

            <Form.Group className="input-primary mb-5">
              <Form.Label className="label">Runtime</Form.Label>
              <Form.Control
                value={metadata.runtime}
                onChange={(e) =>
                  setMetadata({ ...metadata, runtime: e.target.value })
                }
                required
                id="runtime"
                type="text"
                placeholder="Runtime (e.g. 1 hour 30 minutes)"
              />
            </Form.Group>

            <Form.Group className="input-primary mb-5">
              <Form.Label className="label">IMBD Link</Form.Label>
              <Form.Control
                required
                value={metadata.imbdLink}
                onChange={(e) =>
                  setMetadata({ ...metadata, imbdLink: e.target.value })
                }
                id="imdb-link"
                type="text"
                placeholder="https://www.imdb.com/"
              />
            </Form.Group>

            <Form.Group className="input-primary mb-5">
              <Form.Label className="label">Screener Link</Form.Label>
              <Form.Control
                required
                value={metadata.screenerLink}
                onChange={(e) =>
                  setMetadata({ ...metadata, screenerLink: e.target.value })
                }
                id="screener-link"
                type="text"
                placeholder="https://www.youtube.com/"
              />
            </Form.Group>

            <Form.Group className="input-primary mb-5">
              <Form.Label className="label">Royalty Percentage</Form.Label>
              <Form.Control
                required
                value={metadata.royaltyPerc}
                onChange={(e) =>
                  setMetadata({ ...metadata, royaltyPerc: e.target.value })
                }
                id="royalty-percent"
                type="text"
                placeholder="(1-100%) We recommend a 50% royalty split"
              />
            </Form.Group>

            {/* <div key="sell-checkbox" className="checkbox-primary mb-4">
              <Form.Check
                defaultChecked
                type="radio"
                id="direct-sell-checkbox"
                label="Direct Sell"
                name="group-sell"
                onClick={() => setSellType("direct")}
              />

              <Form.Check
                type="radio"
                id="auction-checkbox"
                label="Auction"
                name="group-sell"
                onClick={() => setSellType("auction")}
              />
            </div> */}

            {/* {sellType === "direct" ? (
              <>
                <Form.Group className="input-primary mb-5 d-flex flex-column align-items-center">
                  <div>
                    <Form.Label className="label">Price</Form.Label>
                    <Form.Control id="price" type="text" placeholder="Price" />
                  </div>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-5 d-flex flex-column align-items-center">
                  <div>
                    <Form.Label className="label">Auction Duration</Form.Label>
                    <TimePicker type />
                  </div>
                </Form.Group>
              </>
            )} */}

            <div className="d-flex justify-content-center mb-5">
              {/* <Button
                // type="submit"
                className="button-secondary"
                style={{ width: "213px" }}
                onClick={() => navigate("/preview")}
              >
                {sellType === "direct" ? "Set Price" : "Submit"}
              </Button> */}
              <Button
                // type="submit"
                disabled={isLoading}
                className="button-secondary"
                style={{ width: "213px" }}
                onClick={handleMint}
              >
                MINT
              </Button>
            </div>
            {mintMessage && <h5 className="mint-message">{mintMessage}</h5>}
          </Form>
        </Col>
      </Container>
      <Footer />
    </div>
  );
});

export default Create;
