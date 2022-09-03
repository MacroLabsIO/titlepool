import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import AboutUs from "../screens/AboutUs";
import ConnectWallet from "../screens/ConnectWallet";
import Create from "../screens/Create";
import Explore from "../screens/Explore";
import ExploreSingleItem from "../screens/ExploreSingleItem";
import Profile from "../screens/Profile";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Wallet from "../screens/Wallet";
import UpcomingListings from "../screens/UpcomingListings";
import { useWallet } from "@solana/wallet-adapter-react";

const NavigationContainer = React.memo(() => {
  const { currentUser } = useContext(AuthContext)
  const { publicKey } = useWallet();

  return (
    <Routes>
      <Route path="/" element={ currentUser ? <Explore /> : <SignIn />} />
      <Route path="/preview" element={<ExploreSingleItem />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/connect-wallet" element={<ConnectWallet />} />
      <Route path="/upcoming-listings" element={<UpcomingListings />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<Create />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  );
});

export default NavigationContainer;
