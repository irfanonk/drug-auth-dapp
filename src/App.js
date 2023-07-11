import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomepageLayout from "./components/sections/HomePageLayout";
import DrugCompany from "./components/sections/DrugCompany";

import Article from "./components/sections/Article";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomepageLayout} />
        <Route path="/:address" component={DrugCompany} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
