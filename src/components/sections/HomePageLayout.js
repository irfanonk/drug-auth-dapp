import React from "react";
import { Segment } from "semantic-ui-react";
import ResponsiveContainer from "../../components/containers/ResponsiveContainer";
import PageHeading from "../../components/sections/PageHeading";

import LiveSection from "./LiveSection";
import ExploreSection from "./ExploreSection";
import ThriveSection from "./ThriveSection";
import DrugCompanies from "./DrugCompanies";

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment vertical>
      <DrugCompanies />
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
