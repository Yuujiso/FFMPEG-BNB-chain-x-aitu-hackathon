import "../styles/navbar.css";
import { AiFillHome, AiFillHdd, AiFillPlusCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-top">
          <div
            className="profile"
            onClick={() => setModal((lastState) => !lastState)}
          >
            <span className="logo-icon">
              <BsFillPersonFill />
            </span>{" "}
            {account ? "profile" : "log in"}
          </div>
        </div>
        <div className="navbar-left">
          <ul>
            <Link to="/">
              <li>
                <span className="navbar-icons">
                  <AiFillHome />
                </span>{" "}
                Main
              </li>
            </Link>
            <li>
              <span className="navbar-icons">
                <BiSearch />
              </span>{" "}
              Search
            </li>
            <li>
              <span className="navbar-icons">
                <AiFillHdd />
              </span>{" "}
              Populars
            </li>
            <li>
              <span className="navbar-icons">
                <AiFillPlusCircle />
              </span>{" "}
              Start Stream
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
      <div
        className="modal"
        style={modal ? { display: "block " } : { display: "none" }}
      >
        <div className="modal-main">
          <div className="modal-text-section">
            {account && (
              <div className="modal-text">
                {" "}
                Account: <span>{account}</span>{" "}
              </div>
            )}
            {account && (
              <div className="modal-text">
                Balance:{" "}
                <span>
                  {balance} {balance ? "ETH" : null}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={
              account
                ? () => {
                    setModal((prevState) => !prevState);
                  }
                : connectHandler
            }
          >
            {account ? "close" : "Connect Account"}
          </button>

          {errorMessage ? <div>Error: {errorMessage}</div> : null}
        </div>
      </div>
    </>
  );
}
