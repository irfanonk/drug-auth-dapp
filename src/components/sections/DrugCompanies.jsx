import React, { useContext, useEffect } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { Web3DataContext } from "../../context/Web3Context";

export default function DrugCompanies() {
  const { drugAuthContract } = useContext(Web3DataContext);

  useEffect(() => {
    if (drugAuthContract) {
      async function getCompanyAddresses() {
        const _companyAdresses = await drugAuthContract.getCompanies();
        console.log("_companyAdresses", _companyAdresses);
      }
      getCompanyAddresses();
    }
  }, [drugAuthContract]);

  const onAddCompany = async (inputData) => {
    console.log("inputData", inputData.target);
    try {
      const _address = "0xf81cE08F1371aeCcEd9E9e3fdd44D77C65AF6CfE";
      const _companyName = "accoutn 3";
      console.log("creatin tx...");
      const tx = await drugAuthContract.addCompany(_address, _companyName);
      console.log("executing tx..");
      const result = await tx.wait();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container style={{ minHeight: "90vh" }}>
      <Form>
        <Form.Field>
          <label>Address</label>
          <input placeholder="Address" />
        </Form.Field>
        <Form.Field>
          <label>Company Name</label>
          <input placeholder="Company Name" />
        </Form.Field>
        <Button onClick={onAddCompany} type="submit">
          Add Company
        </Button>
      </Form>
    </Container>
  );
}
