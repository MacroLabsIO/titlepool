import axios from "axios";
import {
  pinata_api_key,
  pinata_secret_api_key,
  pinJSONToIPFS,
  pinFileToIPFS,
  jwt
} from "../constants/common";
import {
  Metadata,
  METADATA_REPLACE,
  METADATA_SCHEMA,
} from "@liqnft/candy-shop-sdk";
import { deserializeUnchecked } from "borsh";
import { PDFDocument } from 'pdf-lib';
import moment from 'moment';

export const normalizeMetadata = (metadata, wallet, imageURI, ContractURI) => {
  let normalized = {
    name: metadata.filmName,
    symbol: "Titlepool",
    description: "This is a NFT from Titlepool site",
    seller_fee_basis_points: metadata.royaltyPerc * 100,
    image: imageURI,
    external_url: "",
    edition: 0,
    collection: "Titlepool NFTs",
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

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'pinata_api_key': `${pinata_api_key}`,
        'pinata_secret_api_key': `${pinata_secret_api_key}`,
        'Content-Type': 'application/json',
      },
      data: body
    };

    const res = await axios(config);
    const ipfsHash = res.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  } catch (e) {
    throw e;
  }
};

export const uploadFiles = async (file) => {
  console.log("uploading files");
  try {
    let data = new FormData();
    data.append("file", file);

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      headers: {
        'pinata_api_key': `${pinata_api_key}`,
        'pinata_secret_api_key': `${pinata_secret_api_key}`,
        "Content-Type": "multipart/form-data"
      },
      data: data
    };

    const res = await axios(config);
    const ipfsHash = res.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  } catch (e) {
    throw e;
  }
};

export const uploadPDFContract = async (metadata) => {
  console.log("writing to pdf");
  try {

    const url = 'https://gateway.pinata.cloud/ipfs/QmR3agULK83U1dbBvxf1gcnqSX1u21LVPsNL2sA1uyhyJg';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const form = pdfDoc.getForm();

    const dateToday = moment().format("MMM Do YYYY");

    form.getTextField('Date1').setText(dateToday);
    form.getTextField('Seller1').setText('test');
    form.getTextField('SellerAddress1').setText('test');
    form.getTextField('SellerEmail1').setText('test');
    form.getTextField('MovieTitle1').setText(metadata.filmName);
    form.getTextField('Date2').setText(dateToday);
    form.getTextField('Seller2').setText('02-04-22');
    form.getTextField('MovieTitle2').setText(metadata.filmName);
    form.getTextField('Territory1').setText(metadata.territory);
    form.getTextField('Term1').setText(metadata.term);
    form.getTextField('Territory2').setText(metadata.territory);
    form.getTextField('Right1').setText(metadata.right);
    form.getTextField('Right2').setText(metadata.right);
    form.getTextField('Date3').setText(dateToday);
    form.getTextField('Term2').setText(metadata.term);
    form.getTextField('Runtime').setText('02-04-22');
    form.getTextField('Seller3').setText('02-04-22');
    form.getTextField('Seller4').setText('02-04-22');
    form.getTextField('SellerEmail2').setText('02-04-22');
    form.getTextField('Seller5').setText('02-04-22');
    form.getTextField('SellerAddress2').setText('02-04-22');
    form.getTextField('Seller6').setText('02-04-22');
    form.getTextField('Seller7').setText('02-04-22');
    form.getTextField('SellerEmail3').setText('02-04-22');
    form.getTextField('SellerAddress3').setText('02-04-22');

    const pdfBytes = await pdfDoc.save()

    const file = new File([pdfBytes], "contract.pdf", {
      type: "application/pdf",
    });

    return await uploadFiles(file);

  } catch (e) {
    throw e
  }
}

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
