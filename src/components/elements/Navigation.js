import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { Web3DataContext } from "../../context/Web3Context";
import DrugAuht from "../../contracts/DrugAuth.json";
const Navigation = () => {
  const { provider, address, onConnectClick, balance, usdtBalance } =
    useContext(Web3DataContext);

  console.log("Navigation  balance:", { balance, address });
  return (
    <>
      <Menu.Header as="a" href="/" className="logo">
        Token <span> dApp</span>
      </Menu.Header>

      <Menu.Item position="right" className="right-menu">
        {provider && !address ? (
          <Button
            as="button"
            className="ui button login"
            onClick={onConnectClick}
          >
            Connect Metamask
          </Button>
        ) : provider && address ? (
          <>
            <Button as="button" className="ui button login">
              {address}
            </Button>
            <Button
              as="button"
              className="ui button login"
              onClick={onConnectClick}
            >
              ETH:{balance}
            </Button>
            <Button
              as="button"
              className="ui button login"
              onClick={onConnectClick}
            >
              USDT: {usdtBalance}
            </Button>
          </>
        ) : (
          <Button as="button" className="ui button login">
            {" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install Metamask{" "}
            </a>
          </Button>
        )}
      </Menu.Item>
    </>
  );
};

export default Navigation;
