import React, { useEffect, useState, createContext, Children } from "react";
import { ethers } from "ethers";
import DrugAuth from "../contracts/DrugAuth.json";
import ERC20 from "../contracts/ERC20.json";

// const Web3DataContext = createContext(null);

// function Web3DataProvider({ children }) {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [address, setAddress] = useState("");
//   const [balance, setBalance] = useState("");
//   const [usdtBalance, setUsdtBalance] = useState("");

//   const [usdtContract, setUsdtContract] = useState(null);

//   useEffect(() => {
//     const eth = window?.ethereum || null;
//     const _provider = eth
//       ? new ethers.providers.Web3Provider(eth, "any")
//       : null;
//     // console.log("useEffect  _provider:", _provider);

//     setProvider(_provider);
//     if (_provider) {
//       (async () => {
//         const _signer = _provider.getSigner();
//         setSigner(_signer);
//         // console.log("_signer", _signer);
//         const _address = (await _signer.getAddress()) || null;
//         // console.log("_address", _address);

//         if (_address) {
//           const _balance = await _provider.getBalance(_address);
//           // console.log("_balance", _balance, ethers.utils.formatEther(_balance));
//           setBalance(ethers.utils.formatEther(_balance));
//           setAddress(_address);
//         }

//         const usdtContract = new ethers.Contract(
//           "0x6175a8471C2122f778445e7E07A164250a19E661",
//           ERC20.abi,
//           _signer
//         );
//         // console.log("usdtContract:",  usdtContract);

//         setUsdtContract(usdtContract);
//         if (_address) {
//           const usdtBalance = await usdtContract.balanceOf(_address);
//           // console.log("usdtBalance:", ethers.utils.formatEther(usdtBalance));
//           setUsdtBalance(ethers.utils.formatEther(usdtBalance));

//         }
//       })();
//     }
//   }, []);

//   const getUSDTBalance = async () => {
//     const usdtBalance = await usdtContract.balanceOf(address);
//     setUsdtBalance(ethers.utils.formatEther(usdtBalance));
//   };

//   const onConnectClick = async () => {
//     try {
//       await provider.send("eth_requestAccounts", []);
//       const _signer = provider.getSigner();
//       setSigner(_signer);
//       const _address = await _signer.getAddress();
//       // console.log("_address", _address);
//       setAddress(_address);
//       const _balance = await provider.getBalance(_address);
//       setBalance(ethers.utils.formatEther(_balance));
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   return (
//     <Web3DataContext.Provider
//       value={{
//         provider,
//         signer,
//         address,
//         balance,
//         usdtBalance,
//         usdtContract,
//         setUsdtBalance,
//         onConnectClick,
//         getUSDTBalance,
//       }}
//     >
//       {children}
//     </Web3DataContext.Provider>
//   );
// }

// export { Web3DataProvider, Web3DataContext };

const Web3DataContext = createContext(null);

function Web3DataProvider(props) {
  const [balance, setBalance] = useState("0.02");
  const [address, setAddress] = useState("0x000");
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const eth = window?.ethereum || null;
    const _provider = eth
      ? new ethers.providers.Web3Provider(eth, "any")
      : null;
    // console.log("useEffect  _provider:", _provider);

    setProvider(_provider);
    if (_provider) {
      (async () => {
        const _signer = _provider.getSigner();
        // setSigner(_signer);
        // console.log("_signer", _signer);
        const _address = (await _signer.getAddress()) || null;
        // console.log("_address", _address);

        if (_address) {
          const _balance = await _provider.getBalance(_address);
          // console.log("_balance", _balance, ethers.utils.formatEther(_balance));
          setBalance(ethers.utils.formatEther(_balance));
          setAddress(_address);
        }

        // const usdtContract = new ethers.Contract(
        //   "0x6175a8471C2122f778445e7E07A164250a19E661",
        //   ERC20.abi,
        //   _signer
        // );
        // // console.log("usdtContract:",  usdtContract);

        // setUsdtContract(usdtContract);
        // if (_address) {
        //   const usdtBalance = await usdtContract.balanceOf(_address);
        //   // console.log("usdtBalance:", ethers.utils.formatEther(usdtBalance));
        //   setUsdtBalance(ethers.utils.formatEther(usdtBalance));

        // }
      })();
    }
  }, []);

  return (
    <Web3DataContext.Provider
      value={{
        balance,
        address,
      }}
    >
      {props.children}
    </Web3DataContext.Provider>
  );
}

export { Web3DataContext, Web3DataProvider };
