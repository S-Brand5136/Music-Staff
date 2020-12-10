import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import DiscussionPage from "./pages/DiscussionPage";
import VisitProfile from "./pages/VisitProfile";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <main>
        <Container disableGutters style={{ marginRight: "13rem" }}>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/profile/:id" component={VisitProfile} />
          <Route path="/createpage" component={CreatePage} />
          <Route path="/discussion/:id" component={DiscussionPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
