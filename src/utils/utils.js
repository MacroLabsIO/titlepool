import axios from "axios";
import {
  pinata_api_key,
  pinata_secret_api_key,
  pinJSONToIPFS,
  pinFileToIPFS,
} from "../constants/common";
import {
  Metadata,
  METADATA_REPLACE,
  METADATA_SCHEMA,
} from "@liqnft/candy-shop-sdk";
import { deserializeUnchecked } from "borsh";

export const normalizeMetadata = (metadata, wallet, imageURI, ContractURI) => {
  let normalized = {
    name: metadata.filmName,
    symbol: "Title Pool",
    description: "This is a NFT from Title Pool site",
    seller_fee_basis_points: metadata.royaltyPerc * 100,
    image: imageURI,
    external_url: "",
    edition: 0,
    collection: "Title Pool NFTs",
    attributes: [
      {
        trait_type: "territory",
        value: metadata.territory,
      },
      {
        trait_type: "term",
        value: metadata.term,
      },
      {
        trait_type: "exhibitionType",
        value: metadata.exhibitionType,
      },
      {
        trait_type: "genre",
        value: metadata.genre,
      },
      {
        trait_type: "genre2",
        value: metadata.genre2,
      },
      {
        trait_type: "genre3",
        value: metadata.genre3,
      },
      {
        trait_type: "contractFile",
        value: ContractURI,
      },
      {
        trait_type: "imbdLink",
        value: metadata.imbdLink,
      },
      {
        trait_type: "screenerLink",
        value: metadata.screenerLink,
      },
    ],
    properties: {
      files: [
        {
          uri: imageURI,
          type: "image/png",
        },
      ],
      category: "image",
      creators: [
        {
          address: wallet,
          share: 90,
        },
        {
          address: "2TZ6QgL7JJmqkf9rBFrxMPRTKV2gMQaDVqb3LyBHj87d",
          share: 10,
        },
      ],
    },
  };
  return normalized;
};

export const uploadMetadata = async (data) => {
  console.log("uploading metadata", data);
  try {
    let body = {
      pinataMetadata: {
        name: data.name,
      },
      pinataContent: data,
    };
    const headers = { pinata_api_key, pinata_secret_api_key };
    const {
      data: { IpfsHash },
    } = await axios.post(pinJSONToIPFS, body, { headers });
    return `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  } catch (e) {
    throw e;
  }
};

export const uploadFiles = async (file) => {
  console.log("uploading files");
  try {
    let data = new FormData();

    data.append("file", file);

    const headers = { pinata_api_key, pinata_secret_api_key };

    const {
      data: { IpfsHash },
    } = await axios.post(pinFileToIPFS, data, { headers });

    return `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  } catch (e) {
    throw e;
  }
};

export const safeAwait = (promise, finallyCallback) => {
  return promise
    .then((data) => {
      return { result: data, error: undefined };
    })
    .catch((error) => {
      return { result: undefined, error: error };
    })
    .finally(() => {
      if (finallyCallback && typeof finallyCallback === "function") {
        finallyCallback();
      }
    });
};

export const parseMetadata = (buffer) => {
  const metadata = (0, deserializeUnchecked)(METADATA_SCHEMA, Metadata, buffer);
  metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, "");
  metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, "");
  metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, "");
  return metadata;
};

export const shortAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};
