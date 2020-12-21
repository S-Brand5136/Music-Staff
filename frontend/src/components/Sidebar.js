import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import {
  getDiscussionsByCategory,
  setCategory,
} from "../actions/discussionActions";

// MaterialUI Imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Drawer,
  CssBaseline,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowRight,
  ExitToApp,
  Forum,
  Menu,
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#363538",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  MuiPaper: {
    backgroundColor: "transparent",
  },
  MuiList: {
    paddingTop: "0",
  },
  MuiButtonBase: {
    padding: "2rem 0 2rem 1rem",
    color: "#f6f6f6",
  },
  MuiTypography: {
    color: "white",
  },
}));

const Sidebar = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscussionsByCategory("General"));
    dispatch(setCategory("General"));
  }, [dispatch]);

  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const categories = [
    "General",
    "Music Theory",
    "Instrument Talk",
    "New Music",
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const forumCategoryClickHandler = (category) => {
    dispatch(getDiscussionsByCategory(category));
    dispatch(setCategory(category));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List className={classes.MuiList}>
      <Paper className={classes.MuiPaper} elevation={6}>
        <ListItem>
          <ListItemText id="header">
            <Typography variant="h4">Music Staff</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          {userInfo ? (
            <ListItemText>
              <Typography
                id="userId"
                variant="subtitle2"
                className={classes.MuiTypography}
                align="center"
              >
                Welcome, {userInfo.name}
              </Typography>
            </ListItemText>
          ) : (
            <Box>
              <Link to="/login">
                <Button
                  size="small"
                  style={{
                    margin: "0rem 1rem 0rem 1.3rem",
                  }}
                  disableElevation={true}
                  variant="contained"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="small"
                  disableElevation={true}
                  variant="contained"
                >
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {userInfo && (
              <Box id="iconsBox">
                <Button style={{ lineHeight: "0" }}>
                  <Link to="/profile">
                    <AccountCircle className="icon" />
                  </Link>
                </Button>
                <Button size="small" style={{ lineHeight: "0" }}>
                  <Link to="/">
                    <Forum className="icon" />
                  </Link>
                </Button>
                <Button>
                  <Link to="/" style={{ position: "relative", top: ".25rem" }}>
                    <ExitToApp
                      className="icon"
                      onClick={() => dispatch(logout())}
                    />
                  </Link>
                </Button>
              </Box>
            )}
          </ListItemIcon>
        </ListItem>
      </Paper>
      {categories.map((category) => (
        <Link to="/" key={category}>
          <ListItem
            button
            key={category}
            onClick={() => forumCategoryClickHandler(category)}
            className={classes.MuiButtonBase}
          >
            <ListItemText>{category}</ListItemText>
            <ListItemIcon>
              <ArrowRight fontSize="large" style={{ color: "#fff4e6" }} />
            </ListItemIcon>
          </ListItem>
        </Link>
      ))}
    </List>
  );

  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <Menu />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Sidebar;
