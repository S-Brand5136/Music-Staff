import React, { useState } from "react";
import PropTypes from "prop-types";
import DiscussPageItem from "../components/DiscussPageItem";
import DiscussionListItem from "../components/DiscussionListItem";

// MaterialUI imports
import {
  AppBar,
  Box,
  makeStyles,
  List,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  MuiAppbar: {
    backgroundColor: "#363538",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProfileTabTable = ({ userInfo, userProfile }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.MuiAppbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Switch between a users posed discussions and comments"
        >
          <Tab label="Discussions" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          {userProfile.discussions.map((item) => (
            <DiscussionListItem discussion={item} />
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {userProfile.comments.map((item) => (
          <DiscussPageItem data={item} />
        ))}
      </TabPanel>
    </div>
  );
};

export default ProfileTabTable;
