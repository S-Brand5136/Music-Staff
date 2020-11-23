import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

// MaterialUI Imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Drawer,
  Divider,
  CssBaseline,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
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
    backgroundColor: "#854442",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Sidebar(props) {
  const { window, history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [categories, setCategories] = useState([
    "General",
    "Music Theory",
    "Instrument Talk",
    "New Music",
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useDispatch();

  const drawer = (
    <>
      <List>
        <ListItem>
          <ListItemText id="header">
            <Typography variant="h4">Music Staff</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          {userInfo ? (
            <ListItemText>
              <Typography id="userId" variant="p">
                {userInfo.name}
              </Typography>
            </ListItemText>
          ) : (
            <Box>
              <Button
                size="small"
                style={{ margin: "0rem 1rem 0rem 1.3rem" }}
                disableElevation={true}
                variant="contained"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button size="small" disableElevation={true} variant="contained">
                <Link to="/register">Register</Link>
              </Button>
            </Box>
          )}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {userInfo && (
              <Box id="iconsBox">
                <Button>
                  <AccountCircle className="icon" />
                </Button>
                <Button size="small" style={{ lineHeight: "0" }}>
                  <Link to="/profile">
                    <Forum className="icon" />
                  </Link>
                </Button>
                <Button>
                  <ExitToApp
                    className="icon"
                    onClick={() => dispatch(logout())}
                  />
                </Button>
              </Box>
            )}
          </ListItemIcon>
        </ListItem>
        <Divider />
        {categories.map((category) => (
          <ListItem key={category} className="categoryItem">
            <ListItemText>{category}</ListItemText>
            <ListItemIcon>
              <ArrowRight fontSize="large" style={{ color: "#fff4e6" }} />
            </ListItemIcon>
            <Divider />
          </ListItem>
        ))}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
}

export default Sidebar;
