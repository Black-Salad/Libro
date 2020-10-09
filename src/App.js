import React from "react";
import { Route } from "react-router-dom";
import Login from "./pages/account/Login";
import BookshelfPage from "./pages/BookshelfPage";
import Register from "./pages/account/Register";
import Viewnotes from "./pages/note/Viewnotes";
import Writenote from "./pages/note/Writenote";
import ViewnoteDetail from "./pages/note/ViewnoteDetail";
import Modifynote from "./pages/note/Modifynote";
import Searchnotes from "./pages/note/Searchnotes";
import Room from "./pages/user/Room";

import Setting from "./pages/user/Setting";
import Bookshelf from "./pages/Bookshelf";
import Searchbooks from "./pages/Searchbooks";
import Navigate from "./pages/Navigate";
import Myprofile from "./pages/Myprofile";
import BookshelfMore from "./pages/BookshelfMore";

function App() {
  return (
    <>
<Route exact path="/" component={BookshelfPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/viewnotes" component={Viewnotes} />
      <Route path="/writenote" component={Writenote} />
      <Route path="/viewnotedetail/:noteIDX" component={ViewnoteDetail} />
      <Route path="/modifynote/:noteIDX" component={Modifynote} />
      <Route path="/room/:userIDX" component={Room} />
      <Route path="/searchnotes/:bookISBN" component={Searchnotes} />
      <Route path="/searchbooks" component={Searchbooks} />
      <Route path="/navigate" component={Navigate} />
      <Route path="/myprofile" component={Myprofile} />
      <Route path="/setting" component={Setting} />
      <Route path="/bookshelfmore" component={BookshelfMore} />
    </>
  );
}

export default App;
