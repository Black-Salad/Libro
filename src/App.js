import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/account/Login";
import Bookshelf from "./pages/Bookshelf";
import Viewnotes from "./pages/Viewnotes";
import Writenote from "./pages/Writenote";
import Searchbooks from "./pages/Searchbooks";
import Navigate from "./pages/Navigate";
import Setting from "./pages/Setting";
import Myprofile from "./pages/Myprofile";
import Register from "./pages/account/Register";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Bookshelf} />
      <Route path="/login" component={Login} />
      <Route path="/viewnotes" component={Viewnotes} />
      <Route path="/writenote" component={Writenote} />
      <Route path="/search" component={Searchbooks} />
      <Route path="/navigate" component={Navigate} />
      <Route path="/myprofile" component={Myprofile} />
      <Route path="/setting" component={Setting} />
      <Route path="/register" component={Register} />
    </Layout>
  );
}

export default App;
