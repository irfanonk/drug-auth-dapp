import React, { useContext, useState } from "react";
import {
  Segment,
  Button,
  Form,
  Message,
  Label,
  Container,
} from "semantic-ui-react";
import ResponsiveContainer from "../../components/containers/ResponsiveContainer";
import PageHeading from "../../components/sections/PageHeading";

import LiveSection from "./LiveSection";
import ExploreSection from "./ExploreSection";
import ThriveSection from "./ThriveSection";
import DrugCompanies from "./DrugCompanies";
import { Web3DataContext } from "../../context/Web3Context";
import { BigNumber, ethers } from "ethers";

const HomepageLayout = () => {
  const { usdtContract, address, usdtBalance, setUsdtBalance, getUSDTBalance } =
    useContext(Web3DataContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    color: "",
    text: "",
  });

  const onSubmitTransfer = async (e) => {
    // console.log("onSubmit  e:", e.target["address"].value);
    const address = e.target["address"].value;
    const amount = e.target["amount"].value;
    console.log("onSubmit  amount:", address, typeof amount);

    if (!address || !amount || amount == "0") {
      displayMessage("red", "Please fill the inputs");
      return;
    }
    setLoading(true);
    try {
      const txResponse = await usdtContract.transfer(
        address,
        ethers.utils.parseUnits(amount, 18)
      );
      const txReceipt = await txResponse.wait();
      console.log("onSubmit  txReceipt:", txReceipt);
      setLoading(false);
      displayMessage("green", `Transaction successful`);

      getUSDTBalance();
    } catch (error) {
      console.log("onSubmit  error:", error);
      setLoading(false);
      displayMessage("red", error?.message || JSON.stringify(error));
    }
  };
  const onSubmitTransferFrom = async (e) => {
    // console.log("onSubmit  e:", e.target["address"].value);
    const fromAddress = e.target["fromAddress"].value;
    const toAddress = e.target["toAddress"].value;
    const amount = e.target["amount"].value;
    // console.log("onSubmit  amount:", address, typeof amount);

    if (!fromAddress || !toAddress || !amount || amount == "0") {
      displayMessage("red", "Please fill the inputs");
      return;
    }
    setLoading(true);
    try {
      const txResponse = await usdtContract.transferFrom(
        fromAddress,
        toAddress,
        ethers.utils.parseUnits(amount, 18)
      );
      const txReceipt = await txResponse.wait();
      console.log("onSubmit  txReceipt:", txReceipt);
      setLoading(false);
      displayMessage(
        "green",
        `From ${fromAddress} to ${toAddress} Transaction successful`
      );

      getUSDTBalance();
    } catch (error) {
      console.log("onSubmit  error:", error);
      setLoading(false);
      displayMessage("red", error?.message || JSON.stringify(error));
    }
  };

  const onSubmitApprove = async (e) => {
    const address = e.target["address"].value;
    const amount = e.target["amount"].value;
    console.log("onSubmit  amount:", address, typeof amount);

    if (!address || !amount || amount == "0") {
      displayMessage("red", "Please fill the inputs");
      return;
    }
    setLoading(true);
    try {
      const txResponse = await usdtContract.approve(
        address,
        ethers.utils.parseUnits(amount, 18)
      );
      const txReceipt = await txResponse.wait();
      console.log("onSubmit  txReceipt:", txReceipt);
      setLoading(false);
      displayMessage("green", `Allowance successful`);
    } catch (error) {
      console.log("onSubmit  error:", error);
      setLoading(false);
      displayMessage("red", error?.message || JSON.stringify(error));
    }
  };

  const onSubmitAllowance = async (e) => {
    const ownerAddress = e.target["ownerAddress"].value;
    const spenderAddress = e.target["spenderAddress"].value;
    if (!ownerAddress || !spenderAddress) {
      displayMessage("red", "Please fill the inputs");
      return;
    }
    setLoading(true);

    try {
      const allowance = await usdtContract.allowance(
        ownerAddress,
        spenderAddress
      );
      console.log("onSubmitAllowance  allowance:", allowance);
      let messageText = `${ownerAddress} is allowed to spend ${ethers.utils.formatEther(
        allowance
      )}`;
      setLoading(false);
      displayMessage("blue", messageText, 15000);
    } catch (error) {
      console.log("onSubmit  error:", error);
      setLoading(false);
      displayMessage("red", error?.message || JSON.stringify(error));
    }
  };

  const displayMessage = (color, msg, duration) => {
    setMessage({
      color,
      text: msg,
    });

    setTimeout(() => {
      setMessage({
        color: "",
        text: "",
      });
    }, duration || 10000);
  };

  return (
    <ResponsiveContainer>
      <Container style={{ display: "flex", gap: 20 }}>
        <Segment
          style={{
            width: "30vw",
            padding: 20,
          }}
          size="small"
        >
          <Form onSubmit={onSubmitTransfer} loading={loading}>
            <Label>Transfer</Label>
            <Form.Input
              type="text"
              label="Address"
              name="address"
              placeholder="0x00"
            />
            <Form.Input
              type="number"
              label="Amount"
              name="amount"
              placeholder="20"
            />
            <Button color="green" type="submit">
              Transfer
            </Button>
          </Form>
        </Segment>
        <Segment
          style={{
            width: "30vw",
            padding: 20,
          }}
          size="small"
        >
          <Form onSubmit={onSubmitApprove} loading={loading}>
            <Label>Approve</Label>
            <Form.Input
              type="text"
              label="Address"
              name="address"
              placeholder="0x00"
            />
            <Form.Input
              type="number"
              label="Amount"
              name="amount"
              placeholder="20"
            />
            <Button color="blue" type="submit">
              Approve
            </Button>
          </Form>
        </Segment>
        <Segment
          style={{
            width: "30vw",
            padding: 20,
          }}
          size="small"
        >
          <Form onSubmit={onSubmitAllowance} loading={loading}>
            <Label>Allowances</Label>
            <Form.Input
              type="text"
              label="Owner Address"
              name="ownerAddress"
              placeholder="0x00"
            />
            <Form.Input
              type="text"
              label="Spender Address"
              name="spenderAddress"
              placeholder="0x00"
            />
            <Button color="blue" type="submit">
              Get Allowance
            </Button>
          </Form>
        </Segment>
        <Segment
          style={{
            width: "30vw",
            padding: 20,
          }}
          size="small"
        >
          <Form onSubmit={onSubmitTransferFrom} loading={loading}>
            <Label>Transfer From</Label>
            <Form.Input
              type="text"
              label="From"
              name="fromAddress"
              placeholder="0x00"
            />
            <Form.Input
              type="text"
              label="To"
              name="toAddress"
              placeholder="0x00"
            />
            <Form.Input
              type="number"
              label="Amount"
              name="amount"
              placeholder="20"
            />
            <Button color="blue" type="submit">
              TransferFrom
            </Button>
          </Form>
        </Segment>
      </Container>
      {message.text ? (
        <Message color={message.color}>{message.text}</Message>
      ) : (
        false
      )}
    </ResponsiveContainer>
  );
};
export default HomepageLayout;
