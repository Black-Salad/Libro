import React from "react";
import { Route } from "react-router-dom";
import Login from "./pages/account/Login";
import LookForPassword from "./pages/account/LookForPassword";
import BookshelfPage from "./pages/BookshelfPage";
import Register from "./pages/account/Register";
import Viewnotes from "./pages/note/Viewnotes";
import Writenote from "./pages/note/Writenote";
import ViewnoteDetail from "./pages/note/ViewnoteDetail";
import Modifynote from "./pages/note/Modifynote";
import Searchnotes from "./pages/note/Searchnotes";
import Room from "./pages/user/Room";
import Follow from "./pages/user/Follow";
import Follower from "./pages/user/Follower";

import Setting from "./pages/user/Setting";
import Searchbooks from "./pages/Searchbooks";
import Navigate from "./pages/Navigate";
import BookshelfMore from "./pages/BookshelfMore";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <>
      <Route exact path="/" component={BookshelfPage} />
      <Route path="/bookshelf/:userIDX" component={BookshelfPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/lookforpassword" component={LookForPassword} />
      <Route path="/viewnotes" component={Viewnotes} />
      <Route path="/writenote" component={Writenote} />
      <Route path="/viewnotedetail/:noteIDX" component={ViewnoteDetail} />
      <Route path="/modifynote/:noteIDX" component={Modifynote} />
      <Route path="/room/:userIDX" component={Room} />
      <Route path="/follow/:userIDX" component={Follow} />
      <Route path="/follower/:userIDX" component={Follower} />
      <Route path="/searchnotes/:bookISBN" component={Searchnotes} />
      <Route path="/searchbooks" component={Searchbooks} />
      <Route path="/navigate" component={Navigate} />
      <Route path="/setting" component={Setting} />
      <Route path="/bookshelfmore/:userIDX/:kind" component={BookshelfMore} />
      <Route path="/timeline" component={Timeline} />
    </>
  );
}

export default App;
