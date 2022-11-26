import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  Loader,
  Segment,
  Card,
  Icon,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { Web3DataContext } from "../../context/Web3Context";
import ResponsiveContainer from "../containers/ResponsiveContainer";
import { timeConverter } from "../utils/helpers";

export default function DrugCompany() {
  const { drugAuthContract } = useContext(Web3DataContext);
  const params = useParams();
  const { address } = params;

  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isDrugAdding, setIsDrugAdding] = useState(false);

  useEffect(() => {
    if (drugAuthContract) {
      (async () => {
        const _company = await drugAuthContract.getCompany(address);
        console.log("_comapny", _company);
        const time = timeConverter(_company.registeredAt);
        setCompany({
          address: address,
          companyName: _company.companyName,
          registeredAt: time,
        });
      })();
    }
  }, [drugAuthContract]);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    const drugCode = data.target.drugCode.value;
    const drugName = data.target.drugName.value;
    console.log("data", drugCode, drugName);

    setIsDrugAdding(true);
    try {
      const tx = await drugAuthContract.addDrug(drugCode, drugName);
      const result = await tx.wait();
      console.log("result", result);
      setSuccess("Successfully added drug");
    } catch (error) {
      console.log("error", error);
      setError(error.reason);
    } finally {
      setIsDrugAdding(false);
    }
  };

  return (
    <ResponsiveContainer>
      <Segment
        style={{
          minHeight: "90vh",
        }}
      >
        <Segment>
          {!company ? (
            <Loader inverted />
          ) : (
            <Card
              style={{
                minWidth: 450,
              }}
            >
              <Card.Content header={company.companyName} />
              <Card.Content description={company.address} />
              <Card.Content extra>
                <Icon name="user" />
                {company.registeredAt}
              </Card.Content>
            </Card>
          )}
        </Segment>
        <Segment>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label>Drug Code</label>
              <input name="drugCode" type="number" placeholder="Drug code" />
            </Form.Field>
            <Form.Field>
              <label>Drug Name</label>
              <input name="drugName" placeholder="Drug Name" />
            </Form.Field>
            <Button disabled={isDrugAdding} type="submit">
              Add Drug
            </Button>
            {isDrugAdding && <Loader active inline />}
          </Form>
          {error && (
            <Message negative>
              <Message.Header>{error}</Message.Header>
            </Message>
          )}
          {success && (
            <Message positive>
              <Message.Header>{success}</Message.Header>
            </Message>
          )}
        </Segment>
      </Segment>
    </ResponsiveContainer>
  );
}
