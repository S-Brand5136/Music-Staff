import React, { useState } from "react";

// MaterialUI Imports
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  CssBaseline,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [categories, setCategories] = useState([
    "General",
    "Music Theory",
    "Instrument Talk",
    "New Music",
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <List>
        <ListItem classNme="sidebar-header">
          <ListItemText id="header">
            <h1>Music Staff</h1>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar />
          <ListItemText>
            <Typography variant="p">Brandon Shemilt</Typography>
          </ListItemText>
          <ListItemIcon className="icons">
            <AccountCircle />
            <Forum />
            <ExitToApp />
          </ListItemIcon>
        </ListItem>
        <Divider />
        {categories.map((category) => (
          <ListItem className="categoryItem">
            <ListItemText>{category}</ListItemText>
            <ListItemIcon>
              <ArrowRight />
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
      <Typography variant="h6" noWrap>
        Responsive drawer
      </Typography>
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
