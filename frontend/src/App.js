import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import DiscussionPage from "./pages/DiscussionPage";
import VisitProfile from "./pages/VisitProfile";

// MaterialUI
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    paddingRight: "2rem",
    paddingLeft: "16rem",
    [theme.breakpoints.down("lg")]: {
      margin: "0",
      paddingLeft: "0",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0",
      paddingLeft: "1rem",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Sidebar />
      <main>
        <Container
          maxWidth="xl"
          className={classes.containerStyles}
          disableGutters
        >
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/profiles/:id" component={VisitProfile} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/discussion/:id" component={DiscussionPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
