import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
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
import ViewnoteDetail from "./pages/ViewnoteDetail";
import Modifynote from "./pages/Modifynote";
import BookshelfMore from "./pages/BookshelfMore";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Bookshelf} />
      <Route path="/login" component={Login} />
      <Route path="/viewnotes" component={Viewnotes} />
      <Route path="/writenote" component={Writenote} />
      <Route path="/modifynote/:idx" component={Modifynote} />
      <Route path="/search" component={Searchbooks} />
      <Route path="/navigate" component={Navigate} />
      <Route path="/myprofile" component={Myprofile} />
      <Route path="/setting" component={Setting} />
      <Route path="/register" component={Register} />
      <Route path="/viewnotedetail/:idx" component={ViewnoteDetail} />
      <Route path="/bookshelfmore" component={BookshelfMore} />
    </Layout>
  );
}

export default App;
