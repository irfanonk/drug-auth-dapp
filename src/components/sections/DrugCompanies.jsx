import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Segment,
  List,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import { Web3DataContext } from "../../context/Web3Context";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { timeConverter } from "../utils/helpers";

export default function DrugCompanies() {
  const { drugAuthContract, address } = useContext(Web3DataContext);

  const [companies, setCompanies] = useState(null);
  const [error, setError] = useState("");
  const [isCompanyAdding, setIsCompanyAdding] = useState(false);

  useEffect(() => {
    if (drugAuthContract) {
      async function getCompanyAddresses() {
        const _companyAdresses = await drugAuthContract.getCompanies();
        console.log("_companyAdresses", _companyAdresses);

        const _companies = [];
        _companyAdresses.forEach(async (_compAddr) => {
          const _company = await drugAuthContract.getCompany(_compAddr);
          // console.log("_company", _company);

          const time = timeConverter(_company.registeredAt);
          // console.log("timeStamp", timeStamp, time);

          _companies.push({
            companyName: _company.companyName,
            registeredAt: time,
            address: _compAddr,
          });
          if (_companyAdresses.length === _companies.length) {
            setCompanies(_companies);
            console.log("_companies", _companies);
          }
        });
      }
      getCompanyAddresses();
    }
  }, [drugAuthContract]);

  const onSubmit = async (data) => {
    setError("");

    const address = data.target.address.value;
    const companyName = data.target.companyName.value;

    if (!ethers.utils.isAddress(address)) {
      console.log("not a valid address");
      setError("Please Provide a valid address");
      return;
    }
    const isNameExist = companies.find(
      (item) => item.companyName === companyName
    );
    if (isNameExist) {
      setError("Name already added");
      return;
    }
    setIsCompanyAdding(true);
    try {
      console.log("creatin tx...");
      const tx = await drugAuthContract.addCompany(address, companyName);
      console.log("executing tx..");
      const result = await tx.wait();
      console.log("result", result);

      const newCompany = {
        address: address,
        companyName: companyName,
        registeredAt: "",
      };
      const _companies = [...companies, newCompany];
      setCompanies(_companies);
    } catch (error) {
      console.log("error", error.reason);
      setError(error.reason);
    } finally {
      setIsCompanyAdding(false);
    }
  };

  return (
    <Container style={{ minHeight: "90vh" }}>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Address</label>
          <input name="address" placeholder="Address" />
        </Form.Field>
        <Form.Field>
          <label>Company Name</label>
          <input name="companyName" placeholder="Company Name" />
        </Form.Field>
        <Button disabled={isCompanyAdding} type="submit">
          Add Company
        </Button>
        {isCompanyAdding && <Loader active inline />}
      </Form>
      {error && (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Segment>
        <List divided relaxed>
          {!companies ? (
            <Dimmer inverted active>
              <Loader />
            </Dimmer>
          ) : (
            companies.map((item, i) => {
              return (
                <List.Item key={i}>
                  <List.Icon
                    name="braille"
                    size="large"
                    verticalAlign="middle"
                  />
                  <Link
                    style={{
                      pointerEvents: item.address === address ? "auto" : "none",
                    }}
                    to={item.address}
                  >
                    <List.Content>
                      <List.Header as="a"> {item?.companyName} </List.Header>
                      <List.Description as="a">
                        {item?.registeredAt}
                      </List.Description>
                      <List.Description as="a">
                        {item?.address}
                      </List.Description>
                    </List.Content>
                  </Link>
                </List.Item>
              );
            })
          )}
        </List>
      </Segment>
    </Container>
  );
}
