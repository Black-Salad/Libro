import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/account/Login";
import BookshelfPage from "./pages/BookshelfPage";
import Viewnotes from "./pages/note/Viewnotes";
import Writenote from "./pages/note/Writenote";
import Searchbooks from "./pages/Searchbooks";
import Navigate from "./pages/Navigate";
import Setting from "./pages/Setting";
import Myprofile from "./pages/Myprofile";
import Register from "./pages/account/Register";
import ViewnoteDetail from "./pages/note/ViewnoteDetail";
import Modifynote from "./pages/note/Modifynote";
import BookshelfMore from "./pages/BookshelfMore";
import Room from "./pages/room/Room";

function App() {
  return (
    <>
      <Layout>
        <Route exact path="/" component={BookshelfPage} />
        <Route path="/login" component={Login} />
        <Route path="/viewnotes" component={Viewnotes} />
        <Route path="/writenote" component={Writenote} />
        <Route path="/modifynote/:noteIDX" component={Modifynote} />
        <Route path="/search" component={Searchbooks} />
        <Route path="/navigate" component={Navigate} />
        <Route path="/myprofile" component={Myprofile} />
        <Route path="/setting" component={Setting} />
        <Route path="/register" component={Register} />
        <Route path="/bookshelfmore" component={BookshelfMore} />
        <Route path="/viewnotedetail/:noteIDX" component={ViewnoteDetail} />
        <Route path="/Room" component={Room} />
      </Layout>
    </>
  );
}

export default App;
