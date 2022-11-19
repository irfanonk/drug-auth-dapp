import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import DrugAuth from "../contracts/DrugAuth.json";
const Web3DataContext = createContext(null);
function Web3DataProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [drugAuthContract, setDrugAuthContract] = useState(null);

  useEffect(() => {
    const eth = window?.ethereum || null;
    const _provider = eth
      ? new ethers.providers.Web3Provider(eth, "any")
      : null;
    setProvider(_provider);
    if (_provider) {
      (async () => {
        const _signer = _provider.getSigner();
        setSigner(_signer);
        console.log("_signer", _signer);
        const _address = (await _signer.getAddress()) || null;
        console.log("_address", _address);

        if (_address) {
          const _balance = await _provider.getBalance(_address);
          console.log("_balance", _balance, ethers.utils.formatEther(_balance));
          setBalance(ethers.utils.formatEther(_balance));
          setAddress(_address);
        }

        const _drugAuhtContract = new ethers.Contract(
          "0x593D558090738a12E173ABC1547AcE9d5A3ecD5C",
          DrugAuth.abi,
          _signer
        );
        setDrugAuthContract(_drugAuhtContract);
        const drugAdmin = await _drugAuhtContract.DRUGADMIN();
        console.log("drugAdmin", drugAdmin);
      })();
    }
  }, []);

  const onConnectClick = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const _signer = provider.getSigner();
      setSigner(_signer);
      const _address = await _signer.getAddress();
      console.log("_address", _address);
      setAddress(_address);
      const _balance = await provider.getBalance(_address);
      setBalance(ethers.utils.formatEther(_balance));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Web3DataContext.Provider
      value={{
        provider,
        signer,
        address,
        balance,
        drugAuthContract,
        onConnectClick,
      }}
    >
      {children}
    </Web3DataContext.Provider>
  );
}

export { Web3DataProvider, Web3DataContext };
